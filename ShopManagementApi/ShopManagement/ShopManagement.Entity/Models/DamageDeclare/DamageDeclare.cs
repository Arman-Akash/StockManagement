using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ShopManagement.Entity.Models
{
    public class DamageDeclare : BaseModel
    {
        public int BranchId { get; set; }
        public Branch Branch { get; set; }
        public DateTime Date { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public decimal Quantity { get; set; }

        [NotMapped]
        public string BranchName
        {
            get
            {
                return Branch?.Name;
            }
        }

        [NotMapped]
        public string UnitName
        {
            get
            {
                return Product?.Unit.Name;
            }
        }

        [NotMapped]
        public string ProductName
        {
            get
            {
                return Product?.ProductCode+"-"+Product.ProductName;
            }
        }
    }
}
