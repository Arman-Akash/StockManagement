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
    public class SaleController : ControllerBase
    {
        private readonly IRepository<Sale> _repository;
        private readonly IRepository<SaleDetail> _saleDetailsRepository;
        private readonly ISaleRepository _saleRepository;
        private readonly ILogError _logError;

        public SaleController(IRepository<Sale> _repository,
            ISaleRepository _saleRepository,
            IRepository<SaleDetail> _saleDetailsRepository,
            ILogError _logError)
        {
            this._repository = _repository;
            this._saleRepository = _saleRepository;
            this._saleDetailsRepository = _saleDetailsRepository;
            this._logError = _logError;
        }

        [HttpGet]
        public async Task<ListResult<Sale>> Get()
        {
            var result = new ListResult<Sale>()
            {
                Data = await _repository.Get()
                .Include(e => e.Customer)
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
                .Include(e => e.Customer)
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

        //[HttpGet("ChallanNo")]
        //public async Task<Result<string>> OrderNo()
        //{
        //    var clnNo = "";
        //    var lastRef = await _repository.Get()
        //        .Where(e => e.SaleDate.Year == DateTime.Now.Year)
        //        .OrderByDescending(e => e.Id)
        //        .Select(e => e.ChallanNo)
        //        .FirstOrDefaultAsync();

        //    if (lastRef == null)
        //    {
        //        clnNo = "CLN/" + "0001/" + DateTime.Now.ToString("MM") + "/" + DateTime.Now.ToString("yy");
        //    }
        //    else
        //    {
        //        var num = lastRef.Split('/')[1];
        //        clnNo = "CLN/" + (Convert.ToInt32(num) + 1).ToString().PadLeft(4, '0') + "/" + DateTime.Now.ToString("MM") + "/" + DateTime.Now.ToString("yy");
        //    }

        //    return new Result<string>
        //    {
        //        Data = clnNo
        //    };
        //}

        [HttpPost("SaleReport")]
        public async Task<IEnumerable<SaleDetailVM>> Search(SaleDetailVM saleVM)
        {
            var result = _saleDetailsRepository.Get()
                .Include(e => e.Product)
                .Include(e => e.Product.Unit)
                .AsQueryable();

            if (saleVM.StartDate != null)
            {
                result = result.Where(e => e.Sale.SaleDate >= saleVM.StartDate);
            }

            if (saleVM.EndDate != null)
            {
                result = result.Where(e => e.Sale.SaleDate <= saleVM.EndDate);
            }

            if (saleVM.BranchId != 0)
            {
                result = result.Where(e => e.Sale.BranchId == saleVM.BranchId);
            }
            if (saleVM.BranchId != 0)
            {
                result = result.Where(e => e.Sale.BranchId == saleVM.BranchId);
            }
            //if (!String.IsNullOrWhiteSpace(saleVM.ReceiptNo))
            //{
            //    result = result.Where(e => e.ReceiptNo.Contains(saleVM.ReceiptNo));
            //}

            return await result.Select(e => new SaleDetailVM
            {
                Id = e.Id,
                ProductId = e.ProductId,
                ProductName = e.Product.ProductCodeName,
                UnitName = e.Product.Unit.Name,
                Quantity = e.Quantity,
                Amount = e.Amount
            })
             .ToListAsync();
        }

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
                sell.BranchId = User.GetBranchId();
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
                sell.BranchId = User.GetBranchId();
                await _saleRepository.UpdateAsync(sell);
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