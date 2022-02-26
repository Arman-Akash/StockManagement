using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
                result.Data = await _repository.GetStock(productId, User.GetBranchId());
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
    }
}
