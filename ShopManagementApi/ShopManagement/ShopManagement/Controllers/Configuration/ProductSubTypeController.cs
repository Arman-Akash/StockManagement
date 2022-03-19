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
    public class ProductSubTypeController : ControllerBase
    {
        private readonly IRepository<ProductSubType> _repository;
        private readonly ILogError _logError;

        public ProductSubTypeController(IRepository<ProductSubType> _repository, ILogError _logError)
        {
            this._repository = _repository;
            this._logError = _logError;
        }

        [HttpGet]
        public async Task<ListResult<ProductSubType>> Get()
        {
            var result = new ListResult<ProductSubType>()
            {
                Data = await _repository.Get()
                .Include(e => e.ProductType)
                .ToListAsync()
            };

            return result;
        }

        [HttpGet("{id}")]
        public async Task<Result<ProductSubType>> Get(int id)
        {
            var result = new Result<ProductSubType>();
            var item = await _repository.Get()
                .Where(e => e.Id == id)
                .Include(e => e.ProductType)
                .FirstOrDefaultAsync();
            if (item == null)
            {
                result.StatusCode = HttpStatusCode.NotFound;
                result.Message = ResponseMessage.NOT_FOUND;
            }
            result.Data = item;
            return result;
        }

        [HttpGet("GetByProductType/{productTypeId}")]
        public async Task<ListResult<ProductSubType>> GetByProductType(int productTypeId)
        {
            return new ListResult<ProductSubType>
            {
                Data = await _repository.Get()
                .Where(e => e.ProductTypeId == productTypeId)
                .Select(e => new ProductSubType
                {
                    Id = e.Id,
                    ProductTypeId = e.ProductTypeId,
                    SubType = e.SubType
                })
                .ToListAsync()
            };
        }

        [Authorize(Roles = "Admin, Warehouse")]
        [HttpPost]
        public async Task<Result<ProductSubType>> Post(ProductSubType productSubType)
        {
            var result = new Result<ProductSubType>();

            if (!ModelState.IsValid)
            {
                result.Success = false;
                result.Message = ResponseMessage.BAD_REQUEST;
                return result;
            }

            try
            {
                await _repository.InsertAsync(productSubType);
                result.Data = productSubType;
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

        [Authorize(Roles = "Admin, Warehouse")]
        [HttpPut("{id}")]
        public async Task<Result<ProductSubType>> Put(int id, ProductSubType productSubType)
        {
            var result = new Result<ProductSubType>();

            if (id != productSubType.Id || !ModelState.IsValid)
            {
                result.Success = false;
                result.Message = ResponseMessage.BAD_REQUEST;
                return result;
            }
            try
            {
                await _repository.UpdateAsync(productSubType);
                result.Data = productSubType;
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

        [Authorize(Roles = "Admin, Warehouse")]
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
