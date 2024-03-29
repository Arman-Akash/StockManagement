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

namespace ShopManagement.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SaleController : ControllerBase
    {
        private readonly IRepository<Sale> _repository;
        private readonly ILogError _logError;

        public SaleController(IRepository<Sale> _repository, ILogError _logError)
        {
            this._repository = _repository;
            this._logError = _logError;
        }

        [HttpGet]
        public async Task<ListResult<Sale>> Get()
        {
            var result = new ListResult<Sale>()
            {
                Data = await _repository.Get()
                .Include(e => e.SaleDetails)
                .ThenInclude(e => e.Product)
                .ThenInclude(e => e.Unit)
                .ToListAsync()
            };

            return result;
        }

        [HttpGet("{id}")]
        public async Task<Result<Sale>> Get(int id)
        {
            var result = new Result<Sale>();
            var item = await _repository.Get()
                .Where(e => e.Id == id)
                .Include(e => e.SaleDetails)
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

        [HttpGet("OrderNo")]
        public async Task<Result<string>> OrderNo()
        {
            var odrNo = "";
            var lastRef = await _repository.Get()
                .Where(e => e.SaleDate.Year == DateTime.Now.Year)
                .OrderByDescending(e => e.Id)
                .Select(e => e.ChallanNo)
                .FirstOrDefaultAsync();

            if (lastRef == null)
            {
                odrNo = "ODR/" + "0001/" + DateTime.Now.ToString("MM") + "/" + DateTime.Now.ToString("yy");
            }
            else
            {
                var num = lastRef.Split('/')[1];
                odrNo = "ODR/" + (Convert.ToInt32(num) + 1).ToString().PadLeft(4, '0') + "/" + DateTime.Now.ToString("MM") + "/" + DateTime.Now.ToString("yy");
            }

            return new Result<string>
            {
                Data = odrNo
            };
        }

        //[HttpGet("ReceiptNo")]
        //public async Task<Result<string>> ReceiptNo()
        //{
        //    var recNo = "";
        //    var lastRef = await _repository.Get()
        //        .Where(e => e.SaleDate.Value.Year == DateTime.Now.Year)
        //        .OrderByDescending(e => e.Id)
        //        .Select(e => e.MoneyReceiptNo)
        //        .FirstOrDefaultAsync();

        //    if (lastRef == null)
        //    {
        //        recNo = "SAL/" + "0001/" + DateTime.Now.ToString("MM") + "/" + DateTime.Now.ToString("yy");
        //    }
        //    else
        //    {
        //        var num = lastRef.Split('/')[1];
        //        recNo = "SAL/" + (Convert.ToInt32(num) + 1).ToString().PadLeft(4, '0') + "/" + DateTime.Now.ToString("MM") + "/" + DateTime.Now.ToString("yy");
        //    }

        //    return new Result<string>
        //    {
        //        Data = recNo
        //    };
        //}

        [HttpPost]
        public async Task<Result<Sale>> Post(Sale sell)
        {
            var result = new Result<Sale>();

            if (!ModelState.IsValid)
            {
                result.Success = false;
                result.Message = ResponseMessage.BAD_REQUEST;
                return result;
            }

            try
            {
                await _repository.InsertAsync(sell);
                result.Data = sell;
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
        public async Task<Result<Sale>> Put(int id, Sale sell)
        {
            var result = new Result<Sale>();

            if (id != sell.Id || !ModelState.IsValid)
            {
                result.Success = false;
                result.Message = ResponseMessage.BAD_REQUEST;
                return result;
            }
            try
            {
                await _repository.UpdateAsync(sell);
                result.Data = sell;
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

            var sell = await _repository.FindAsync(id);
            if (sell == null)
            {
                result.Success = false;
                result.Message = ResponseMessage.NOT_FOUND;
                return result;
            }

            try
            {
                await _repository.DeleteAsync(sell);
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