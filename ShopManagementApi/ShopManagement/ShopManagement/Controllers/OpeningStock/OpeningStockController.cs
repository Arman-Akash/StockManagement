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

namespace ShopManagement.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OpeningStockController : ControllerBase
    {
        private readonly IRepository<OpeningStock> _repository;
        private readonly IRepository<Product> _productRepository;
        private readonly ILogError _logError;

        public OpeningStockController(IRepository<OpeningStock> _repository,
            IRepository<Product> _productRepository, ILogError _logError)
        {
            this._repository = _repository;
            this._productRepository = _productRepository;
            this._logError = _logError;
        }

        [HttpGet]
        public async Task<ListResult<OpeningStock>> Get()
        {
            var result = new ListResult<OpeningStock>()
            {
                Data = await _repository.GetAsync()
            };

            return result;
        }

        /*
          // Log in User Store Information
        [HttpGet("LogInUserStoreItems")]
        public async Task<ListResult<OpeningStock>> LogInUserStoreItems()
        {
            var userId = Convert.ToInt32(User.Claims.FirstOrDefault(x => x.Type.Equals("user_id"))?.Value);

            if (userId == 0)
                return new ListResult<OpeningStock>();

            var result = new ListResult<OpeningStock>();

            //get employee office information
            var empOffice = await _empOfficialInfoService.Get()
                .Where(e => e.EmployeeId == userId)
                .Include(e => e.Office)
                .ThenInclude(e => e.OfficeType)
                .Select(e => e.Office)
                .FirstOrDefaultAsync();

            if (empOffice != null && empOffice.OfficeType.Type.Equals("store", StringComparison.OrdinalIgnoreCase))
            {
                var itemList = await _itemService.Get()
                    .Include(e => e.Unit)
                    .Where(e => e.ItemCategory.Name == "Stationary")
                    .ToListAsync();

                var openingStockItem = await _service.Get()
                    .Where(e => e.StoreId == empOffice.Id)
                    .ToListAsync();

                var items = new List<OpeningStock>();
                foreach (var item in itemList)
                {
                    var oldStock = openingStockItem.Where(e => e.ItemId == item.Id)
                        .FirstOrDefault();

                    var newItem = new OpeningStock
                    {
                        ItemId = item.Id,
                        ItemName = item.Name,
                        StoreId = empOffice.Id,
                        UnitName = item.Unit?.Name
                    };

                    if (oldStock != null)
                    {
                        newItem.Id = oldStock.Id;
                        newItem.Quantity = oldStock.Quantity;
                    }

                    items.Add(newItem);
                }
                result.Data = items;
            }

            return result;
        }*/

        [HttpPost]
        public async Task<Result<OpeningStock>> Post(OpeningStock openingStock)
        {
            var result = new Result<OpeningStock>();

            if (!ModelState.IsValid)
            {
                result.Success = false;
                result.Message = ResponseMessage.BAD_REQUEST;
                return result;
            }

            try
            {
                await _repository.InsertAsync(openingStock);
                result.Data = openingStock;
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
        public async Task<Result<OpeningStock>> Put(int id, OpeningStock openingStock)
        {
            var result = new Result<OpeningStock>();

            if (id != openingStock.Id || !ModelState.IsValid)
            {
                result.Success = false;
                result.Message = ResponseMessage.BAD_REQUEST;
                return result;
            }
            try
            {
                await _repository.UpdateAsync(openingStock);
                result.Data = openingStock;
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

            var openingStock = await _repository.FindAsync(id);
            if (openingStock == null)
            {
                result.Success = false;
                result.Message = ResponseMessage.NOT_FOUND;
                return result;
            }

            try
            {
                await _repository.DeleteAsync(openingStock);
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