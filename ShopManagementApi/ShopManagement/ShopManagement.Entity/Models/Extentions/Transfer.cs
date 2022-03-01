using System;
using System.Collections.Generic;
using System.Text;

namespace ShopManagement.Entity.Models
{
    public partial class Transfer
    {
        public string BranchName
        {
            get { return Branch?.Name; }
        }
        public string TransferBranchName
        {
            get { return TransferedBranch?.Name; }
        }

        public string UserName
        {
            get { return User?.Username; }
        }

        public string ReceivedUserName
        {
            get { return ReceivedUser?.Username; }
        }
    }
}
