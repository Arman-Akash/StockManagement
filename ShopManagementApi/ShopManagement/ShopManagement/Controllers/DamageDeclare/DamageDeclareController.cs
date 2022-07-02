using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopManagement.Entity.Models;
using ShopManagement.Repository;
using ShopManagement.Utility;
using ShopManagement.Utility.StaticData;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace ShopManagement.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin, Warehouse")]
    public class DamageDeclareController : ControllerBase
    {
        private readonly IRepository<DamageDeclare> _repository;
        private readonly ILogError _logError;

        public DamageDeclareController(IRepository<DamageDeclare> _repository, ILogError _logError)
        {
            this._repository = _repository;
            this._logError = _logError;
        }

        [HttpGet]
        public async Task<ListResult<DamageDeclare>> Get()
        {
            var result = new ListResult<DamageDeclare>()
            {
                Data = await _repository.Get()
                .Include(e => e.Branch)
                .Include(e => e.Product)
                .ThenInclude(e => e.Unit)
                .OrderByDescending(e => e.Id)
                .ToListAsync()
            };

            return result;
        }

        [HttpGet("{id}")]
        public async Task<Result<DamageDeclare>> Get(int id)
        {
            var result = new Result<DamageDeclare>();
            var item = await _repository.Get()
                .Where(e => e.Id == id)
                .Include(e => e.Branch)
                .Include(e => e.Product)
                .ThenInclude(e => e.Unit)
                .FirstOrDefaultAsync();
            if (item == null)
            {
                result.StatusCode = HttpStatusCode.NotFound;
                result.Message = ResponseMessage.NOT_FOUND;
            }
            result.Data = item;
            return result;
        }

        [HttpPost]
        public async Task<Result<DamageDeclare>> Post(DamageDeclare damageDeclare)
        {
            var result = new Result<DamageDeclare>();

            if (!ModelState.IsValid)
            {
                result.Success = false;
                result.Message = ResponseMessage.BAD_REQUEST;
                return result;
            }

            try
            {
                await _repository.InsertAsync(damageDeclare);
                result.Data = damageDeclare;
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
        public async Task<Result<DamageDeclare>> Put(int id, DamageDeclare damageDeclare)
        {
            var result = new Result<DamageDeclare>();

            if (id != damageDeclare.Id || !ModelState.IsValid)
            {
                result.Success = false;
                result.Message = ResponseMessage.BAD_REQUEST;
                return result;
            }
            try
            {
                await _repository.UpdateAsync(damageDeclare);
                result.Data = damageDeclare;
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

            var productSubType = await _repository.FindAsync(id);
            if (productSubType == null)
            {
                result.Success = false;
                result.Message = ResponseMessage.NOT_FOUND;
                return result;
            }

            try
            {
                await _repository.DeleteAsync(productSubType);
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
