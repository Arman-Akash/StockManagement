using System;
using System.Collections.Generic;
using System.Text;

namespace ShopManagement.Entity.ServiceModels
{
    public class AuthConfiguration
    {
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string SigningKey { get; set; }
    }
}
