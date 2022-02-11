using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace ShopManagement.Entity.Models
{
    // Common properties for every entities
    public class BaseModel
    {
        public virtual int Id { get; set; }
        public virtual DateTime? CreatedTime { get; set; }
        public virtual DateTime? UpdatedTime { get; set; }
        public virtual int? ModifierId { get; set; }
        [ForeignKey("ModifierId")]
        public virtual User ModifiedBy { get; set; }
    }
}
