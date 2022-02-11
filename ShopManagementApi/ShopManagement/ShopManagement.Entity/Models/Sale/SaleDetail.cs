using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ShopManagement.Entity.Models
{
    public class SaleDetail : BaseModel
    {
        public int SaleId { get; set; }
        public Sale Sale { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public decimal? Quantity { get; set; }
        public decimal? Rate { get; set; }
        public decimal? Amount { get; set; }
    }
}
