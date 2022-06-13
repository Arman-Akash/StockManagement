using System;
using System.Collections.Generic;
using System.Text;

namespace ShopManagement.Entity.ViewModels
{
    public class OpeningStockVM
    {
        public int Id { get; set; }
        public int BranchId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal Quantity { get; set; }
        public decimal Amount { get; set; }
        public decimal Price { get; set; }
        public string UnitName { get; set; }
        public decimal? ReorderLabel { get; set; }
    }
}
