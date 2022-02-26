using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ShopManagement.Entity.Models
{
    public class ProductSubType : BaseModel
    {
        public string SubType { get; set; }
        public int ProductTypeId { get; set; }
        public ProductType ProductType { get; set; }

        [NotMapped]
        public string ProductTypeName
        {
            get
            {
                return ProductType?.Type;
            }
        }
    }
}
