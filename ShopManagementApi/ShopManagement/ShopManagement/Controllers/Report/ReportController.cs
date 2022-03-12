using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Rotativa.AspNetCore;
using ShopManagement.Entity.Models;
using ShopManagement.Repository;
using ShopManagement.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShopManagement.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : Controller
    {
        private readonly ILogError _logError;
        private readonly IRepository<Sale> _saleRepository;
        private readonly IRepository<Transfer> _transferRepository;

        public ReportController(ILogError logError,
            IRepository<Transfer> _transferRepository,
            IRepository<Sale> _saleRepository)
        {
            _logError = logError;
            this._saleRepository = _saleRepository;
            this._transferRepository = _transferRepository;
        }

        [HttpGet("Index")]
        public IActionResult Index()
        {
            return new ViewAsPdf();
        }

        [HttpGet("DeliveryChallan")]
        public IActionResult DeliveryChallan()
        {
            return new ViewAsPdf();
        }

        [HttpGet("SaleReport/{id}")]
        public IActionResult SaleReport(int id)
        {
            var sale = _saleRepository.Get()
                .Where(e => e.Id == id)
                .Include(e => e.Customer)
                .Include(e => e.SaleDetails)
                .ThenInclude(e => e.Product)
                .ThenInclude(e => e.Unit)
                .FirstOrDefault();

            return new ViewAsPdf("SaleReport", sale)
                 {
                     PageWidth = 200,
                     PageHeight = 150
                 };
        }

        [HttpGet("TransferReport/{id}")]
        public IActionResult TransferReport(int id)
        {
            var transfer = _transferRepository.Get()
                .Where(e => e.Id == id)
                .Include(e => e.Branch)
                .Include(e => e.TransferDetails)
                .ThenInclude(e => e.Product)
                .ThenInclude(e => e.Unit)
                .FirstOrDefault();

            return new ViewAsPdf("TransferReport", transfer)
            {
                PageWidth = 150,
                PageHeight = 200
            };
            //return View(transfer) ;
        }
    }
}
