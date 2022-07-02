using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ShopManagement.Entity.Models
{
    public partial class Transfer : BaseModel
    {
        public Transfer()
        {
            TransferDetails = new HashSet<TransferDetail>();
        }
        public string TransferChallan { get; set; }
        public DateTime TransferDate { get; set; }
        public string VehicleNo { get; set; }
        public string Details { get; set; }
        public int BranchId { get; set; }
        public Branch Branch { get; set; }
        public int TransferedBranchId { get; set; }
        public Branch TransferedBranch { get; set; }
        public int? UserId { get; set; }
        public User User { get; set; }
        public int? ReceivedUserId { get; set; }
        public User ReceivedUser { get; set; }
        public bool RcvFlg { get; set; }
        public bool IsPrinted { get; set; }
        public string Status { get; set; }
        public ICollection<TransferDetail> TransferDetails { get; set; }
    }
}
