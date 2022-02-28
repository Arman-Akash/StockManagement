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
            get { return Branch?.Name; }
        }

        public string UserName
        {
            get { return User?.Username; }
        }
    }
}
