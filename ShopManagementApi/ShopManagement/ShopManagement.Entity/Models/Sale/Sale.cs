using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ShopManagement.Entity.Models
{
    [Table("sale")]
    public class Sale : BaseModel
    {
        public Sale()
        {
            SaleDetails = new HashSet<SaleDetail>();
        }
        public DateTime SaleDate { get; set; }

        //public string BuyerName { get; set; }
        //public string BuyerAddress { get; set; }
        //public string BuyerPhnNo { get; set; }
        public int? CustomerId { get; set; }
        public Customer Customer { get; set; }
        public string ChallanNo { get; set; }
        public ICollection<SaleDetail> SaleDetails { get; set; }
    }
}
