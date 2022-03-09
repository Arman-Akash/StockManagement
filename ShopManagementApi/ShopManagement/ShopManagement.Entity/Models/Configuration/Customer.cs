using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ShopManagement.Entity.Models
{
    public class Customer : BaseModel
    {
        public int BranchId { get; set; }
        public Branch Branch { get; set; }
        public string Name { get; set; }
        public string Details { get; set; }
        public string Address { get; set; }
        public string MobileNo { get; set; }
    }
}
