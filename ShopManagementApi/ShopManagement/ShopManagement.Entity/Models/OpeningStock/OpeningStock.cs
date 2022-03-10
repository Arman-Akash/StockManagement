using System;
using System.Collections.Generic;
using System.Text;

namespace ShopManagement.Entity.Models
{
    public class OpeningStock : BaseModel
    {
        public int? BranchId { get; set; }
        public Branch Branch { get; set; }
        public DateTime? StockEntryDate { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public decimal Quantity { get; set; }
        public decimal Amount { get; set; }
    }
}
