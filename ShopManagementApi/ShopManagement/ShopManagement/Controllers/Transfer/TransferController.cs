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
        private readonly IRepository<TransferDetail> _transferDetailRepository;
        private readonly ITransferRepository _transferRepository;
        private readonly ILogError _logError;

        public TransferController(IRepository<Transfer> _repository,
            IRepository<TransferDetail> _transferDetailRepository,
            ITransferRepository _transferReposioty,
            ILogError _logError)
        {
            this._repository = _repository;
            this._transferDetailRepository = _transferDetailRepository;
            this._transferRepository = _transferReposioty;
            this._logError = _logError;
        }

        [HttpGet]
        public async Task<ListResult<TransferVM>> Get()
        {
            var loggedInBraanch = User.GetBranchId();
            var result = new ListResult<TransferVM>()
            {
                Data = await _repository.Get()
                .Where(e => e.BranchId == loggedInBraanch)
                .Select( e => new TransferVM
                { 
                    Id = e.Id,
                    TransferChallan = e.TransferChallan,
                    TransferDate = e.TransferDate,
                    TransferedBranchId  = e.TransferedBranchId,
                    TransferedBranch = e.TransferedBranch.Name,
                    BranchId = e.BranchId,
                    TransferBranch = e.Branch.Name,
                    VehicleNo = e.VehicleNo,
                    Details = e.Details,
                    Status = e.Status,
                    IsPrinted = e.IsPrinted
                })
                //.Include(e => e.Branch)
                //.Include(e => e.TransferedBranch)
                //.Include(e => e.User)
                //.Include(e => e.ReceivedUser)
                //.Include(e => e.TransferDetails)
                //.ThenInclude(e => e.Product)
                //.ThenInclude(e => e.Unit)
                .OrderByDescending(e => e.Id)
                .ToListAsync()
            };

            return result;
        }

        [HttpGet("Receive")]
        public async Task<ListResult<Transfer>> Receive()
        {
            var loggedInBraanch = User.GetBranchId();
            var result = new ListResult<Transfer>()
            {
                Data = await _repository.Get()
                .Where(e => e.BranchId == loggedInBraanch)
                .Include(e => e.Branch)
                .Include(e => e.TransferedBranch)
                .Include(e => e.User)
                .Include(e => e.ReceivedUser)
                .Include(e => e.TransferDetails)
                .ThenInclude(e => e.Product)
                .ThenInclude(e => e.Unit)
                .ToListAsync()
            };

            return result;
        }

        //[HttpGet("TransferredProduct")]
        //public async Task<ListResult<TransferVM>> TransferredProduct()
        //{
        //    var loggedInBraanch = User.GetBranchId();
        //    return new ListResult<TransferVM>
        //    {
        //        Data = await _repository.Get()
        //        .Where(e => e.BranchId == loggedInBraanch)
        //        .Include(e => e.TransferDetails)
        //        .Include(e => e.Branch)
        //        .Include(e => e.User)
        //        .Select(e => new TransferVM
        //        {
        //            TransferedBranchId = e.TransferedBranchId,
        //            TransferedBranch = e.Branch.Name,
        //            BranchId = e.BranchId,
        //            TransferBranch = e.TransferedBranch.Name
        //        })
        //        .ToListAsync()
        //    };
        //}

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
                .Include(e => e.ReceivedUser)
                .OrderByDescending(e => e.Id)
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

        //[HttpGet("TransferChallan")]
        //public async Task<Result<string>> TransferChallan()
        //{
        //    var recNo = "";
        //    var lastRef = await _repository.Get()
        //        .Where(e => e.TransferDate.Year == DateTime.Now.Year)
        //        .OrderByDescending(e => e.Id)
        //        .Select(e => e.TransferChallan)
        //        .FirstOrDefaultAsync();

        //    if (lastRef == null)
        //    {
        //        recNo = "TC/" + "0001/" + DateTime.Now.ToString("MM") + "/" + DateTime.Now.ToString("yy");
        //    }
        //    else
        //    {
        //        var num = lastRef.Split('/')[1];
        //        recNo = "TC/" + (Convert.ToInt32(num) + 1).ToString().PadLeft(4, '0') + "/" + DateTime.Now.ToString("MM") + "/" + DateTime.Now.ToString("yy");
        //    }

        //    return new Result<string>
        //    {
        //        Data = recNo
        //    };
        //}

        [HttpGet("LastTransferPrice/{productId}")]
        public async Task<Result<decimal>> LastTransferPrice(int productId)
        {
            var result = new Result<decimal>();
            result.Data = await _transferDetailRepository
                .Get().Where(e => e.ProductId == productId)
                .OrderByDescending(e => e.Id)
                .Select(e => e.Rate)
                .FirstOrDefaultAsync();

            return result;
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
                transfer.BranchId = User.GetBranchId();
                transfer.UserId = User.GetUserId();
                transfer.Status = "Pending";
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

        [HttpPost("TransferReport")]
        public async Task<ListResult<TransferDetailVM>> Search(TransferDetailVM transferVM)
        {
            var listResult = new ListResult<TransferDetailVM>();

            var result = _transferDetailRepository.Get()
                .Include(e => e.Product)
                .Include(e => e.Product.Unit)
                .AsQueryable();

            if (transferVM.StartDate != null)
            {
                result = result.Where(e => e.Transfer.TransferDate >= transferVM.StartDate);
            }

            if (transferVM.EndDate != null)
            {
                result = result.Where(e => e.Transfer.TransferDate <= transferVM.EndDate);
            }

            if (transferVM.BranchId != 0)
            {
                result = result.Where(e => e.Transfer.BranchId == transferVM.BranchId);
            }
            if (transferVM.ProductId != 0)
            {
                result = result.Where(e => e.ProductId == transferVM.ProductId);
            }

            listResult.Data = await result.Select(e => new TransferDetailVM
            {
                Id = e.Id,
                TransferDate = e.Transfer.TransferDate,
                ProductId = e.ProductId,
                ProductName = e.Product.ProductCodeName,
                UnitName = e.Product.Unit.Name,
                Quantity = e.Quantity,
                Amount = e.Amount
            })
             .OrderByDescending(e => e.Id)
             .ToListAsync();

            return listResult;
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