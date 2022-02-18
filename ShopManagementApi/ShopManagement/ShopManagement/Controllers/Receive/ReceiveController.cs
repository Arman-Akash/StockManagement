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
using ShopManagement.Entity.ViewModels;

namespace ShopManagement.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ReceiveController : ControllerBase
    {
        private readonly IRepository<Receive> _repository;
        private readonly ILogError _logError;

        public ReceiveController(IRepository<Receive> _repository, ILogError _logError)
        {
            this._repository = _repository;
            this._logError = _logError;
        }

        [HttpGet]
        public async Task<ListResult<Receive>> Get()
        {
            var result = new ListResult<Receive>()
            {
                Data = await _repository.Get()
                .Include(e => e.ReceiveDetails)
                .ToListAsync()
            };

            return result;
        }

        [HttpGet("{id}")]
        public async Task<Result<Receive>> Get(int id)
        {
            var result = new Result<Receive>();
            var item = await _repository.Get()
                .Where(e => e.Id == id)
                .Include(e => e.ReceiveDetails)
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

        [HttpGet("RcvSerNo")]
        public async Task<Result<string>> ReceiptNo()
        {
            var recNo = "";
            var lastRef = await _repository.Get()
                .Where(e => e.RcvDate.Year == DateTime.Now.Year)
                .OrderByDescending(e => e.Id)
                .Select(e => e.RcvSerNo)
                .FirstOrDefaultAsync();

            if (lastRef == null)
            {
                recNo = "WHR/" + "0001/" + DateTime.Now.ToString("MM") + "/" + DateTime.Now.ToString("yy");
            }
            else
            {
                var num = lastRef.Split('/')[1];
                recNo = "WHR/" + (Convert.ToInt32(num) + 1).ToString().PadLeft(4, '0') + "/" + DateTime.Now.ToString("MM") + "/" + DateTime.Now.ToString("yy");
            }

            return new Result<string>
            {
                Data = recNo
            };
        }

        [HttpPost]
        public async Task<Result<Receive>> Post(Receive purchase)
        {
            var result = new Result<Receive>();

            if (!ModelState.IsValid)
            {
                result.Success = false;
                result.Message = ResponseMessage.BAD_REQUEST;
                return result;
            }

            try
            {
                await _repository.InsertAsync(purchase);
                result.Data = purchase;
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
        //public async Task<IEnumerable<ProductReceiveVM>> Search(ProductReceiveVM purchaseVM)
        //{
        //    var result = _repository.Get()
        //        .Include(e => e.ProductReceiveDetails)
        //        .AsQueryable();

        //    if (purchaseVM.StartDate != null)
        //    {
        //        result = result.Where(e => e.ProductReceiveDate >= purchaseVM.StartDate);
        //    }

        //    if (purchaseVM.EndDate != null)
        //    {
        //        result = result.Where(e => e.ProductReceiveDate <= purchaseVM.EndDate);
        //    }

        //    if (purchaseVM.SupplierId != 0)
        //    {
        //        result = result.Where(e => e.SupplierId == purchaseVM.SupplierId);
        //    }
        //    if (!String.IsNullOrWhiteSpace(purchaseVM.ReceiptNo))
        //    {
        //        result = result.Where(e => e.ReceiptNo.Contains(purchaseVM.ReceiptNo));
        //    }
        //    if (!String.IsNullOrWhiteSpace(purchaseVM.TransactionType))
        //    {
        //        result = result.Where(e => e.TransactionType.Contains(purchaseVM.TransactionType));
        //    }

        //    return await result.Select(e => new ProductReceiveVM
        //    {
        //        SupplierName = e.Supplier.Name,
        //        ReceiptNo = e.ReceiptNo,
        //        TransactionType = e.TransactionType,
        //        ProductReceiveDate = e.ProductReceiveDate
        //    })
        //     .ToListAsync();
        //}


        //[HttpPut("{id}")]
        //public async Task<Result<Receive>> Put(int id, Receive purchase)
        //{
        //    var result = new Result<Receive>();

        //    if (id != purchase.Id || !ModelState.IsValid)
        //    {
        //        result.Success = false;
        //        result.Message = ResponseMessage.BAD_REQUEST;
        //        return result;
        //    }
        //    try
        //    {
        //        await _repository.UpdateAsync(purchase);
        //        result.Data = purchase;
        //        result.Message = ResponseMessage.SUCCESSFULLY_UPDATED;
        //        return result;
        //    }
        //    catch (Exception exp)
        //    {
        //        // keep log
        //        _logError.Error(exp);
        //        result.Message = ResponseMessage.Get(exp);
        //        result.Success = false;

        //        return result;
        //    }
        //}

        [HttpPut("{id}")]
        public async Task<Result<Receive>> Put(int id, Receive receive)
        {
            var result = new Result<Receive>();

            if (id != receive.Id || !ModelState.IsValid)
            {
                result.Success = false;
                result.Message = ResponseMessage.BAD_REQUEST;
                return result;
            }
            try
            {
                await _repository.UpdateAsync(receive);
                result.Data = receive;
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

            var purchase = await _repository.FindAsync(id);
            if (purchase == null)
            {
                result.Success = false;
                result.Message = ResponseMessage.NOT_FOUND;
                return result;
            }

            try
            {
                await _repository.DeleteAsync(purchase);
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