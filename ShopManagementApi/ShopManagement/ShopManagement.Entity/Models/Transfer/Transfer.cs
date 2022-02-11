using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ShopManagement.Entity.Models
{
    public class Transfer : BaseModel
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
        public int? UserId { get; set; }
        public User User { get; set; }
        public bool RcvFlg { get; set; }
        public ICollection<TransferDetail> TransferDetails { get; set; }

        [NotMapped]
        public string BranchName
        {
            get { return Branch.Name; }
        }

        [NotMapped]
        public string UserName
        {
            get { return User?.Username; }
        }
    }
}
