using System;
using System.Collections.Generic;
using System.Text;

namespace ShopManagement.Entity.Models
{
    public class PurchaseDetail : BaseModel
    {
        public int ReceiveId { get; set; }
        public Purchase Receive { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public decimal Quantity { get; set; }
        public decimal Rate { get; set; }
        public decimal Amount { get; set; }
        public DateTime? ManufactureDate { get; set; }
        public DateTime? ExpireDate { get; set; }
        public string ShelfNo { get; set; }
    }
}
