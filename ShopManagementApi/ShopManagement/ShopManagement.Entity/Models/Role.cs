using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ShopManagement.Entity.Models
{
    public class Role : BaseModel
    {
        public string Name { get; set; }
        public int? OrganogramLavel { get; set; }
        public string Description { get; set; }
    }
}
