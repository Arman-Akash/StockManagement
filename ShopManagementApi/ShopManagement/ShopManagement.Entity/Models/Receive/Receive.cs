using System;
using System.Collections.Generic;
using System.Text;

namespace ShopManagement.Entity.Models
{
    public class Purchase : BaseModel
    {
        public Purchase()
        {
            Details = new HashSet<PurchaseDetail>();
        }
        public DateTime RcvDate { get; set; }
        public string ChallanNo { get; set; }
        public string RcvSerNo { get; set; }
        public string RcvFrom { get; set; }
        public string Comment { get; set; }
        public int BranchId { get; set; }
        public Branch Branch { get; set; }
        public ICollection<PurchaseDetail> Details { get; set; }
    }
}
