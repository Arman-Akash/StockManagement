using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopManagement.Entity.ViewModels;
using ShopManagement.Repository;
using ShopManagement.Utility;
using ShopManagement.Utility.StaticData;
using ShopManagement.WebApi.Controllers;
using System;
using System.Threading.Tasks;

namespace ShopManagement.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DueController : ControllerBase
    {
        private readonly ILogError _logError;
        private readonly IDueRepository _repository;
        public DueController(IDueRepository _repository, ILogError _logError)
        {
                this._logError = _logError;
                this._repository = _repository;
        }

        [HttpGet("GetDue/{customerId}")]
        public async Task<Result<decimal>> GetDue(int customerId)
        {
            var result = new Result<decimal>();
            try
            {
                var due = await _repository.GetDue(customerId, User.GetBranchId());
                result.Data = due;
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

        [HttpGet("GetDueByBranch/{branchId}")]
        public async Task<ListResult<CustomerDueVM>> GetDueByBranch(int branchId)
        {
            var result = new ListResult<CustomerDueVM>();
            result.Data = await _repository.GetAllDue(branchId);
            return result;
        }

    }
}
