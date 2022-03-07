using System;
using System.Collections.Generic;
using System.Text;

namespace ShopManagement.Entity.Models
{
    public partial class PaymentReceive
    {
        public string BranchName 
        { 
            get { return Branch?.Name;} 
        }

        public string CustomerName
        {
            get { return Customer?.Name;}
        }
    }
}
