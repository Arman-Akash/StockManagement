using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ShopManagement.Utility.StaticData;
using ShopManagement.Repository;
using ShopManagement.Entity.Models;
using ShopManagement.Utility;

namespace ShopManagement.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = RoleName.Admin)]
    public class RoleController : ControllerBase
    {
        private readonly IRepository<Role> _repository;
        private readonly ILogError _logError;

        public RoleController(IRepository<Role> _repository, ILogError _logError)
        {
            this._repository = _repository;
            this._logError = _logError;
        }

        [HttpGet]
        public async Task<ListResult<Role>> Get()
        {
            var result = new ListResult<Role>()
            {
                Data = await _repository.GetAsync()
            };

            return result;
        }

        [HttpGet("GetName")]
        public async Task<ListResult<Role>> GetName()
        {
            var result = new ListResult<Role>()
            {
                Data = await _repository.Get()
                    .ToListAsync()
            };
            return result;
        }

        [HttpPost]
        public async Task<Result<Role>> Post(Role item)
        {
            var result = new Result<Role>();

            if (!ModelState.IsValid)
            {
                result.Success = false;
                result.Message = ResponseMessage.BAD_REQUEST;
                return result;
            }

            try
            {
                await _repository.InsertAsync(item);
                result.Data = item;
                result.Message = ResponseMessage.SUCCESSFULLY_CREATED;
                return result;
            }
            catch (Exception exp)
            {
                // keep log;
                _logError.Error(exp);
                result.Message = ResponseMessage.Get(exp);
                result.Success = false;

                return result;
            }
        }

        [HttpPut("{id}")]
        public async Task<Result<Role>> Put(int id, Role item)
        {
            var result = new Result<Role>();

            if (id != item.Id || !ModelState.IsValid)
            {
                result.Success = false;
                result.Message = ResponseMessage.BAD_REQUEST;
                return result;
            }
            try
            {
                await _repository.UpdateAsync(item);
                result.Data = item;
                result.Message = ResponseMessage.SUCCESSFULLY_UPDATED;
                return result;
            }
            catch (Exception exp)
            {
                // keep log
                _logError.Error(exp);
                result.Message = ResponseMessage.Get(exp);
                result.Success = false;

                return result;
            }
        }

        [HttpDelete("{id}")]
        public async Task<Result> Delete(int id)
        {
            var result = new Result();

            var item = await _repository.FindAsync(id);
            if (item == null)
            {
                result.Success = false;
                result.Message = ResponseMessage.NOT_FOUND;
                return result;
            }

            try
            {
                await _repository.DeleteAsync(item);
                result.Message = ResponseMessage.SUCCESSFULLY_DELETED;
                return result;
            }
            catch (Exception exp)
            {
                // keep log
                _logError.Error(exp);
                result.Message = ResponseMessage.Get(exp);
                result.Success = false;

                return result;
            }
        }
    }
}
