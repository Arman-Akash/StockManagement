using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ShopManagement.Entity.Models
{
    public class TransferDetail : BaseModel
    {
        public int TransferId { get; set; }
        public Transfer Transfer { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public decimal Quantity { get; set; }
        public decimal Rate { get; set; }
        public decimal Amount { get; set; }
    }
}
