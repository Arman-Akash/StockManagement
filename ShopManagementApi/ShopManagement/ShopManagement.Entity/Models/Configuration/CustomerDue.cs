using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ShopManagement.Entity.Models
{
    public class CustomerDue :BaseModel
    {
        public int CustomerId { get; set; }
        public Customer  Customer { get; set; }
        public decimal CreditAmount { get; set; }


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
