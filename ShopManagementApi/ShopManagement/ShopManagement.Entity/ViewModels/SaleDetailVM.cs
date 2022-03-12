using System;
using System.Collections.Generic;
using System.Text;

namespace ShopManagement.Entity.ViewModels
{
    public class SaleDetailVM
    {
        public int Id { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int BranchId { get; set; }
        public string BranchName { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string UnitName { get; set; }
        public decimal Quantity { get; set; }
        public decimal Amount { get; set; }
    }
}
