using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ShopManagement.Entity.Models
{
    public class Product : BaseModel
    {
        public int ProductSubTypeId { get; set; }
        public ProductSubType ProductSubType { get; set; }
        public int UnitId { get; set; }
        public Unit Unit { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public string Origin { get; set; }
        public decimal? ReOrderLebel { get; set; }
        public decimal? PackSize { get; set; }
        public string Details { get; set; }

        [NotMapped]
        public string ProductSubTypeName
        {
            get
            {
                return ProductSubType?.SubType;
            }
        }

        [NotMapped]
        public string ProductCodeName
        {
            get
            {
                return ProductCode+" "+ProductName;
            }
        }

        [NotMapped]
        public string UnitName
        {
            get
            {
                return Unit?.Name;
            }
        }
    }
}
