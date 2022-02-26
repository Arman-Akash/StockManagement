using System;
using System.Collections.Generic;
using System.Text;

namespace ShopManagement.Entity.Models.Seeds
{
    public class BranchSeedData
    {
        public static List<Branch> Branches = new List<Branch>()
        {
            new Branch { Id = 1, Name = "Warehouse" }
        };
    }
}
