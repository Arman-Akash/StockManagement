using System;
using System.Collections.Generic;
using System.Text;

namespace ShopManagement.Entity.ViewModels
{
    public class PurchaseDetailVM
    {
        public int Id { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime? BillStartDate { get; set; }
        public DateTime? BillEndDate { get; set; }
        public DateTime RcvDate { get; set; }
        public DateTime? BillOfEntryDate { get; set; }
        public string BillOfEntryNo { get; set; }
        public string LcNumber { get; set; }
        public int BranchId { get; set; }
        public string BranchName { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string UnitName { get; set; }
        public decimal Quantity { get; set; }
        public decimal Amount { get; set; }
    }
}
