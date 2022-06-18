using ShopManagement.Entity.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace ShopManagement.Entity.ViewModels
{
    public class TransferVM
    {
        public int Id { get; set; }
        public string TransferChallan { get; set; }
        public DateTime TransferDate { get; set; }
        public string VehicleNo { get; set; }
        public string Details { get; set; }
        public int BranchId { get; set; }
        public string TransferBranch { get; set; }
        public int TransferedBranchId { get; set; }
        public string TransferedBranch { get; set; }
        public int? UserId { get; set; }
        public string User { get; set; }
        public int? ReceivedUserId { get; set; }
        public string ReceivedUser { get; set; }
        public bool RcvFlg { get; set; }
        public string Status { get; set; }
    }
}
