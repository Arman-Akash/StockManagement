using System;
using System.Collections.Generic;
using System.Text;

namespace ShopManagement.Entity.Models
{
    public partial class PaymentReceive : BaseModel
    {
        public int No { get; set; }
        public DateTime Date { get; set; }
        public int BranchId { get; set; }
        public Branch Branch { get; set; }
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
        public DateTime? InvoiceDate { get; set; }
        public string InvoiceNo { get; set; }
        public string PaymentType { get; set; }//Full/Partial
        public string PaidBy { get; set; } //Checque /Cash/
        public DateTime PaymentDate { get; set; }
        public string Bank { get; set; }
        public string BankBranchName { get; set; }
        public decimal Amount { get; set; }

    }
}
