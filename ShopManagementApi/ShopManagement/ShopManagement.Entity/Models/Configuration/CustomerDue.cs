using System;
using System.Collections.Generic;
using System.Text;

namespace ShopManagement.Entity.Models
{
    public class CustomerDue : BaseModel
    {
        public DateTime CreditDate { get; set; }
        public int BranchId { get; set; }
        public Branch Branch { get; set; }
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
        public string Type { get; set; } //Credit /Cash
        public string ChallanNo { get; set; }
        public decimal Amount { get; set; }

    }
}
