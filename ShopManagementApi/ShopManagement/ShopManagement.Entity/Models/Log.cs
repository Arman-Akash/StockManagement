using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ShopManagement.Entity.Models
{
    public class Log : BaseModel
    {
        public string TableName { get; set; }
        public string Data { get; set; }
        public string IPAddress { get; set; }
        public string OS { get; set; }
        public string Browser { get; set; }
        public string OperationType { get; set; }
    }
}
