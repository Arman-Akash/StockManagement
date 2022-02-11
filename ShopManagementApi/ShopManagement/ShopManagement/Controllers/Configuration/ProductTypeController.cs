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
    [Authorize]
    public class ProductTypeController : ControllerBase
    {
        private readonly IRepository<ProductType> _repository;
        private readonly ILogError _logError;

        public ProductTypeController(IRepository<ProductType> _repository, ILogError _logError)
        {
            this._repository = _repository;
            this._logError = _logError;
        }

        [HttpGet]
        public async Task<ListResult<ProductType>> Get()
        {
            var result = new ListResult<ProductType>()
            {
                Data = await _repository.Get()
                .Include(e => e.ProductSubType)
                .ToListAsync()
            };

            return result;
        }

        [HttpGet("{id}")]
        public async Task<Result<ProductType>> Get(int id)
        {
            var result = new Result<ProductType>();
            var item = await _repository.Get()
                .Where(e => e.Id == id)
                .Include(e => e.ProductSubType)
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
        public async Task<Result<ProductType>> Post(ProductType supplier)
        {
            var result = new Result<ProductType>();

            if (!ModelState.IsValid)
            {
                result.Success = false;
                result.Message = ResponseMessage.BAD_REQUEST;
                return result;
            }

            try
            {
                await _repository.InsertAsync(supplier);
                result.Data = supplier;
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
        public async Task<Result<ProductType>> Put(int id, ProductType supplier)
        {
            var result = new Result<ProductType>();

            if (id != supplier.Id || !ModelState.IsValid)
            {
                result.Success = false;
                result.Message = ResponseMessage.BAD_REQUEST;
                return result;
            }
            try
            {
                await _repository.UpdateAsync(supplier);
                result.Data = supplier;
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

            var supplier = await _repository.FindAsync(id);
            if (supplier == null)
            {
                result.Success = false;
                result.Message = ResponseMessage.NOT_FOUND;
                return result;
            }

            try
            {
                await _repository.DeleteAsync(supplier);
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
