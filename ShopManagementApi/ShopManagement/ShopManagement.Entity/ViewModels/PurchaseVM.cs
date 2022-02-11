using System;
using System.Collections.Generic;
using System.Text;

namespace ShopManagement.Entity.ViewModels
{
    public class PurchaseVM
    {
        public DateTime TransferDate { get; set; }
        public string ReceiptNo { get; set; }
        public int? CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string TransactionType { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
