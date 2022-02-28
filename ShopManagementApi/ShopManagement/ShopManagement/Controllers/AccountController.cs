using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ShopManagement.Utility.StaticData;
using ShopManagement.Utility;
using ShopManagement.Repository;
using ShopManagement.Entity.ServiceModels;
using ShopManagement.Entity.Models;
using ShopManagement.Entity.ViewModels;
using System.Net;

namespace ShopManagement.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = RoleName.Admin)]
    public class AccountController : ControllerBase
    {
        private readonly IUserRepository _repository;
        private readonly AuthConfiguration _authConfiguration;
        private readonly ILogError _logError;
        private readonly IRepository<UserRole> _userRoleRepository;

        public AccountController(IUserRepository _repository,
            IOptions<AuthConfiguration> configuration,
            IRepository<UserRole> _userRoleRepository,
            ILogError _logError)
        {
            this._repository = _repository;
            _authConfiguration = configuration.Value;
            this._userRoleRepository = _userRoleRepository;
            this._logError = _logError;
        }

        [HttpGet]
        public async Task<ListResult<User>> Get()
        {
            var result = new ListResult<User>
            {
                Data = await _repository.Get()
                    .Include(e => e.Branch)
                    .Include(e => e.Roles)
                    .ThenInclude(e => e.Role)
                    .ToListAsync()
            };

            return result;
        }

        [HttpGet("{id}")]
        public async Task<Result<User>> Get(int id)
        {
            var result = new Result<User>();
            var item = await _repository.Get()
                .Where(e => e.Id == id)
                .Include(e => e.Branch)
                .Include(e => e.Roles)
                .FirstOrDefaultAsync();
            if (item == null)
            {
                result.StatusCode = HttpStatusCode.NotFound;
                result.Message = ResponseMessage.NOT_FOUND;
            }
            result.Data = item;
            return result;
        }

        [HttpPost("CreateUser")]
        public async Task<Result> CreateUser(UserLogin newUser)
        {
            var result = new Result();
            try
            {
                var user = new User();
                (user.Salt, user.Hash) = PasswordManager.HashPassword(newUser.Password);

                user.Username = newUser.Username;
                if(newUser.BranchId != 0)
                {
                    user.BranchId = newUser.BranchId;
                }
                user.Permissions = newUser.Permissions;
                user.IsActive = true;
                await _repository.InsertAsync(user);
            }
            catch (Exception exp)
            {
                _logError.Error(exp);
                result.Success = false;
                result.Message = ResponseMessage.SERVER_ERROR;
            }

            return result;
        }

        [HttpPut("updateUser/{id}")]
        public async Task<Result> UpdateUser(int id, User updatedUser)
        {
            var result = new Result();
            if (id != updatedUser.Id)
            {
                result.Message = ResponseMessage.BAD_REQUEST;
                result.Success = false;
                return result;
            }
            try
            {
                var user = _repository.Get(e => e.Id == updatedUser.Id)
                    .Include(e => e.Branch)
                    .Include(e => e.Roles)
                    .FirstOrDefault();

                if (user == null)
                {
                    result.Message = "User" + ResponseMessage.NOT_FOUND;
                    result.Success = false;
                    return result;
                }

                if (!String.IsNullOrWhiteSpace(updatedUser.Password))
                {
                    (user.Salt, user.Hash) = PasswordManager.HashPassword(updatedUser.Password);
                }

                user.Username = updatedUser.Username;
                user.Permissions = updatedUser.Permissions;
                user.BranchId = updatedUser.BranchId;
                await _userRoleRepository.DeleteRangeAsync(user.Roles.ToList());
                user.Roles = updatedUser.Roles;
                user.IsActive = updatedUser.IsActive;
                user.UpdatedTime = DateTime.Now;
                await _repository.UpdateAsync(user);

                result.Message = ResponseMessage.SUCCESSFULLY_UPDATED;
                result.Success = true;
                return result;
            }
            catch (Exception exp)
            {
                _logError.Error(exp);
                result.Message = ResponseMessage.Get(exp);
                result.Success = false;

                return result;
            }
        }

        [Authorize]
        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword(ChangePassword newPassword)
        {
            var userId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type.Equals("user_id"))?.Value);
            var user = await _repository.FindAsync(userId);
            (user.Salt, user.Hash) = PasswordManager.HashPassword(newPassword.Password);

            await _repository.UpdateAsync(user);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var user = await _repository.FindAsync(id);
                await _repository.DeleteAsync(user);
                return Ok(new Result { Message = "Successfully deleted" });
            }
            catch (Exception exp)
            {
                return Content(exp.Message);
            }
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate(UserLogin user)
        {
            if (ModelState.IsValid)
            {
                try
                {

                    var _user = _repository.Validate(user);
                    if (_user.Username == null)
                    {
                        return Unauthorized();
                    }

                    var claims = new[]
                    {
                    new Claim(JwtRegisteredClaimNames.Sub, _user.Username),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(ClaimTypes.Role, _user.RoleNames),
                    new Claim("user_id", _user.Id.ToString()),
                    new Claim("branch_id", _user.BranchId?.ToString())
                };

                    var token = new JwtSecurityToken
                    (
                        issuer: _authConfiguration.Issuer,
                        audience: _authConfiguration.Audience,
                        claims: claims,
                        expires: DateTime.UtcNow.AddDays(60),
                        notBefore: DateTime.UtcNow,
                        signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authConfiguration.SigningKey)),
                                SecurityAlgorithms.HmacSha256)
                    );

                    return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token), user_id = _user.Id, username = _user.Username, roles = _user.RoleNames, permissions = _user.Permissions, branch_id = _user.BranchId });
                }
                catch(Exception exp)
                {
                    _logError.Error(exp);
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }

            return BadRequest();
        }
    }
}
