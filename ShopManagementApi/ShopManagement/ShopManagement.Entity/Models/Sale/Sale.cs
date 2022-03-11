using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ShopManagement.Entity.Models
{
    public class Sale : BaseModel
    {
        public Sale()
        {
            SaleDetails = new HashSet<SaleDetail>();
        }
        public DateTime SaleDate { get; set; }

        //public string BuyerName { get; set; }
        public string OrderNo { get; set; }
        public string BillNo { get; set; }
        public int BranchId { get; set; }
        public Branch Branch { get; set; }
        public int? CustomerId { get; set; }
        public Customer Customer { get; set; }
        public decimal Amount { get; set; }
        public string TransactionType { get; set; }
        public ICollection<SaleDetail> SaleDetails { get; set; }


        [NotMapped]
        public string CustomerName
        {
            get
            {
                return Customer?.Name;
            }
        }
    }
}
