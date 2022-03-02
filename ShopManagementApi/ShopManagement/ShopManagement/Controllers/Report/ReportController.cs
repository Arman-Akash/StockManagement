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

        public ReportController(ILogError logError, IRepository<Sale> _saleRepository)
        {
            _logError = logError;
            this._saleRepository = _saleRepository;
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

            return new ViewAsPdf("SaleReport", sale);
        }
    }
}
