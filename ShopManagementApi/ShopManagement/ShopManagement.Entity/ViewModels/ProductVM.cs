using System;
using System.Collections.Generic;
using System.Text;

namespace ShopManagement.Entity.ViewModels
{
    public class ProductVM
    {
        public int ProductSubTypeId { get; set; }
        public string ProductSubTypeName { get; set; }
        public int UnitId { get; set; }
        public string UnitName { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public string ProductCodeName { get; set; }
        public string Origin { get; set; }
        public decimal? ReOrderLebel { get; set; }
        public string PackSize { get; set; }
        public string Details { get; set; }
    }
}
