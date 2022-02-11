using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ShopManagement.Entity.Models
{
    public class Branch : BaseModel
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string PhnNumber { get; set; }
        public string Email { get; set; }
        public string Location { get; set; }
    }
}
