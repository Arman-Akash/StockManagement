using System;
using System.Collections.Generic;
using System.Text;

namespace ShopManagement.Entity.ViewModels
{
    public class SaleVM
    {
        public int Id { get; set; }
        public DateTime SaleDate { get; set; }
        public string OrderNo { get; set; }
        public string BillNo { get; set; }
        public int BranchId { get; set; }
        public string BranchName { get; set; }
        public int? CustomerId { get; set; }
        public string CustomerName { get; set; }
        public decimal Amount { get; set; }
        public string TransactionType { get; set; }
        public decimal PaidAmount { get; set; }
    }
}
