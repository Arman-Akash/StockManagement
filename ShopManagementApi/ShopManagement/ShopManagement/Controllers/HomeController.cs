using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace ShopManagement.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        public IActionResult Get()
        {
            return new ContentResult()
            {
                Content = @"<h3 style='text-align:center; margin-top: 100px'>
                                Hey, What are you doing here!!! 
                                This page is not meant for you.
                            </h3>",
                ContentType = "text/html",
            };
        }
    }
}
