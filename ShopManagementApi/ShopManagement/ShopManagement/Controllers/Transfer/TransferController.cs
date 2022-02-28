﻿using Microsoft.AspNetCore.Authorization;
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
using ShopManagement.Entity.ViewModels;

namespace ShopManagement.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TransferController : ControllerBase
    {
        private readonly IRepository<Transfer> _repository;
        private readonly ITransferRepository _transferRepository;
        private readonly ILogError _logError;

        public TransferController(IRepository<Transfer> _repository,
            ITransferRepository _transferReposioty,
            ILogError _logError)
        {
            this._repository = _repository;
            this._transferRepository = _transferReposioty;
            this._logError = _logError;
        }

        [HttpGet]
        public async Task<ListResult<Transfer>> Get()
        {
            var result = new ListResult<Transfer>()
            {
                Data = await _repository.Get()
                .Include(e => e.TransferDetails)
                .Include(e => e.Branch)
                .Include(e => e.User)
                .ToListAsync()
            };

            return result;
        }

        [HttpGet("RevPendingByTransferredId")]
        public async Task<ListResult<Transfer>> RevPendingByTransferredId()
        {
            var loggedInBraanch = User.GetBranchId();
            var result = new ListResult<Transfer>()
            {
                Data = await _repository.Get()
                .Where(e => e.TransferedBranchId == loggedInBraanch)
                .Include(e => e.TransferDetails)
                .Include(e => e.Branch)
                .Include(e => e.User)
                .ToListAsync()
            };

            return result;
        }

        [HttpGet("{id}")]
        public async Task<Result<Transfer>> Get(int id)
        {
            var result = new Result<Transfer>();
            var item = await _repository.Get()
                .Where(e => e.Id == id)
                .Include(e => e.TransferDetails)
                .ThenInclude(e => e.Product)
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

        [HttpGet("TransferChallan")]
        public async Task<Result<string>> TransferChallan()
        {
            var recNo = "";
            var lastRef = await _repository.Get()
                .Where(e => e.TransferDate.Year == DateTime.Now.Year)
                .OrderByDescending(e => e.Id)
                .Select(e => e.TransferChallan)
                .FirstOrDefaultAsync();

            if (lastRef == null)
            {
                recNo = "TC/" + "0001/" + DateTime.Now.ToString("MM") + "/" + DateTime.Now.ToString("yy");
            }
            else
            {
                var num = lastRef.Split('/')[1];
                recNo = "TC/" + (Convert.ToInt32(num) + 1).ToString().PadLeft(4, '0') + "/" + DateTime.Now.ToString("MM") + "/" + DateTime.Now.ToString("yy");
            }

            return new Result<string>
            {
                Data = recNo
            };
        }

        [HttpPost]
        public async Task<Result<Transfer>> Post(Transfer transfer)
        {
            var result = new Result<Transfer>();

            if (!ModelState.IsValid)
            {
                result.Success = false;
                result.Message = ResponseMessage.BAD_REQUEST;
                return result;
            }

            try
            {
                transfer.BranchId = User.GetBranchId();
                transfer.UserId = User.GetUserId();
                transfer.Status = "Pending";
                await _repository.InsertAsync(transfer);
                result.Data = transfer;
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

        //[HttpPost("Search")]
        //public async Task<IEnumerable<PurchaseVM>> Search(PurchaseVM transferVM)
        //{
        //    var result = _repository.Get()
        //        .Include(e => e.TransferDetails)
        //        .Include(e => e.Customer)
        //        .AsQueryable();

        //    if (transferVM.StartDate != null)
        //    {
        //        result = result.Where(e => e.TransferDate >= transferVM.StartDate);
        //    }

        //    if (transferVM.EndDate != null)
        //    {
        //        result = result.Where(e => e.TransferDate <= transferVM.EndDate);
        //    }

        //    if (transferVM.CustomerId != 0)
        //    {
        //        result = result.Where(e => e.SupplierId == transferVM.CustomerId);
        //    }
        //    if (!String.IsNullOrWhiteSpace(transferVM.ReceiptNo))
        //    {
        //        result = result.Where(e => e.ReceiptNo.Contains(transferVM.ReceiptNo));
        //    }
        //    if (!String.IsNullOrWhiteSpace(transferVM.TransactionType))
        //    {
        //        result = result.Where(e => e.TransactionType.Contains(transferVM.TransactionType));
        //    }

        //    return await result.Select(e => new PurchaseVM
        //    {
        //        CustomerName = e.Customer.Name,
        //        ReceiptNo = e.ReceiptNo,
        //        TransactionType = e.TransactionType,
        //        TransferDate = e.TransferDate
        //    })
        //     .ToListAsync();
        //}


        [HttpPut("{id}")]
        public async Task<Result<Transfer>> Put(int id, Transfer transfer)
        {
            var result = new Result<Transfer>();

            if (id != transfer.Id || !ModelState.IsValid)
            {
                result.Success = false;
                result.Message = ResponseMessage.BAD_REQUEST;
                return result;
            }
            try
            {
                await _transferRepository.UpdateAsync(transfer);
                result.Data = transfer;
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

        [HttpPut("Receive/{id}")]
        public async Task<Result<Transfer>> Receive(int id, Transfer transfer)
        {
            var result = new Result<Transfer>();

            if (id != transfer.Id || !ModelState.IsValid)
            {
                result.Success = false;
                result.Message = ResponseMessage.BAD_REQUEST;
                return result;
            }
            try
            {
                transfer.TransferedBranchId = User.GetBranchId();
                transfer.ReceivedUserId = User.GetUserId();
                transfer.Status = "Received";
                transfer.RcvFlg = true;
                await _transferRepository.UpdateAsync(transfer);
                result.Data = transfer;
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

            var transfer = await _repository.FindAsync(id);
            if (transfer == null)
            {
                result.Success = false;
                result.Message = ResponseMessage.NOT_FOUND;
                return result;
            }

            try
            {
                await _repository.DeleteAsync(transfer);
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