using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using ShopManagement.Entity.ViewModels;
using ShopManagement.Repository;
using ShopManagement.Utility;
using ShopManagement.Utility.StaticData;
using ShopManagement.WebApi.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopManagement.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class StockController : ControllerBase
    {
        private readonly IStockRepository _repository;
        private readonly ILogError _logError;
        public StockController(IStockRepository repository, ILogError _logError)
        {
            _repository = repository;
            this._logError = _logError;
        }

        [HttpGet("GetStock/{productId}")]
        public async Task<Result<decimal>> GetStock(int productId)
        {
            var result = new Result<decimal>();
            try
            {
                var stock = await _repository.GetStock(productId, User.GetBranchId());
                result.Data = stock.Item1;
            }
            catch (Exception exp)
            {
                // keep log;
                _logError.Error(exp);
                result.Message = ResponseMessage.Get(exp);
                result.Success = false;

                return result;
            }
            return result;
        }

        [HttpGet("GetStockByBranch/{branchId}")]
        public async Task<ListResult<OpeningStockVM>> GetStockByBranch(int branchId)
        {
            var result = new ListResult<OpeningStockVM>();
            result.Data = await _repository.GetAllStock(branchId);
            return result;
        }
    }
}
