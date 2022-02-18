using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Rotativa.AspNetCore;
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
        public ReportController(ILogError logError)
        {
            _logError = logError;
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
    }
}
