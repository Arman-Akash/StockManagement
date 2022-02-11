using System;
using System.Collections.Generic;
using System.Text;

namespace ShopManagement.Entity.Models
{
    public class Receive : BaseModel
    {
        public Receive()
        {
            ReceiveDetails = new HashSet<ReceiveDetail>();
        }
        public DateTime RcvDate { get; set; }
        public string ChallanNo { get; set; }
        public string RcvSerNo { get; set; }
        public string RcvFrom { get; set; }
        public string Comment { get; set; }
        public ICollection<ReceiveDetail> ReceiveDetails { get; set; }
    }
}
