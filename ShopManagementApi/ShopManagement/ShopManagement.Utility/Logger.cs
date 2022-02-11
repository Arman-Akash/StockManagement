using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;
using System.Linq;

namespace ShopManagement.Utility
{
    public static class Logger
    {
        public static Entity.Models.Log Log<T>(T model, IHttpContextAccessor httpContextAccessor)
        {
            Entity.Models.Log log = new Entity.Models.Log
            {
                CreatedTime = DateTime.Now,

                IPAddress = GetClientIp(httpContextAccessor.HttpContext),

                //get user id from claims
                //log.ModifierId = Convert.ToInt32(httpContext.User.Identity.Name);
                TableName = model.GetType().Name,

                Data = JsonConvert.SerializeObject(model, Formatting.Indented,
                new JsonSerializerSettings()
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                }),

                OperationType = httpContextAccessor.HttpContext.Request.Method
            };

            return log;
        }

        public static string GetClientIp(HttpContext httpContext)
        {
            var forwardedIp = httpContext.Request.Headers["X-Forwarded-For"].ToString().Split(',').FirstOrDefault();
            return String.IsNullOrWhiteSpace(forwardedIp) ?
                httpContext.Connection.RemoteIpAddress.MapToIPv4().ToString() :
                forwardedIp.ToString();
        }
    }
}