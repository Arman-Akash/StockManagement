using System;
using System.Collections.Generic;
using System.Text;

namespace ShopManagement.Entity.ViewModels
{
    public class CustomerDueVM
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public int BranchId { get; set; }
        public string BranchName { get; set; }
        public decimal Amount { get; set; }
    }
}
