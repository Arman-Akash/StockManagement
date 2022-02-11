using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ShopManagement.Entity.Models
{
    public class ProductType : BaseModel
    {
        public string Type { get; set; }
        public int ProductSubTypeId { get; set; }
        public ProductSubType ProductSubType { get; set; }

        [NotMapped]
        public string ProductSubTypeName
        {
            get
            {
                return ProductSubType?.SubType;
            }
        }
    }
}
