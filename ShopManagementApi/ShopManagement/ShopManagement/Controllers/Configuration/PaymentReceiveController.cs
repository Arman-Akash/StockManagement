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
    public class PaymentReceiveController : ControllerBase
    {
        private readonly IRepository<PaymentReceive> _repository;
        private readonly ILogError _logError;

        public PaymentReceiveController(IRepository<PaymentReceive> _repository, ILogError _logError)
        {
            this._repository = _repository;
            this._logError = _logError;
        }

        [HttpGet]
        public async Task<ListResult<PaymentReceive>> Get()
        {
            var loggedInBraanch = User.GetBranchId();
            var result = new ListResult<PaymentReceive>()
            {

                Data = await _repository.Get()
                .Where(e => e.BranchId == loggedInBraanch)
                .Include(e => e.Branch)
                .Include(e => e.Customer)
                .OrderByDescending(e => e.Id)
                .ToListAsync()
            };

            return result;
        }

        [HttpGet("{id}")]
        public async Task<Result<PaymentReceive>> Get(int id)
        {
            var result = new Result<PaymentReceive>();
            var item = await _repository.Get()
                .Where(e => e.Id == id)
                .Include(e => e.Branch)
                .Include(e => e.Customer)
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
        public async Task<Result<PaymentReceive>> Post(PaymentReceive paymentReceive)
        {
            var result = new Result<PaymentReceive>();

            if (!ModelState.IsValid)
            {
                result.Success = false;
                result.Message = ResponseMessage.BAD_REQUEST;
                return result;
            }

            try
            {
                paymentReceive.BranchId = User.GetBranchId();
                await _repository.InsertAsync(paymentReceive);
                result.Data = paymentReceive;
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
        public async Task<Result<PaymentReceive>> Put(int id, PaymentReceive paymentReceive)
        {
            var result = new Result<PaymentReceive>();

            if (id != paymentReceive.Id || !ModelState.IsValid)
            {
                result.Success = false;
                result.Message = ResponseMessage.BAD_REQUEST;
                return result;
            }
            try
            {
                await _repository.UpdateAsync(paymentReceive);
                result.Data = paymentReceive;
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

            var paymentReceive = await _repository.FindAsync(id);
            if (paymentReceive == null)
            {
                result.Success = false;
                result.Message = ResponseMessage.NOT_FOUND;
                return result;
            }

            try
            {
                await _repository.DeleteAsync(paymentReceive);
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