using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;

namespace ShopManagement.Entity.Models
{
	public class User : BaseModel
	{
		public User()
		{
			Roles = new HashSet<UserRole>();
		}

		public string Username { get; set; }
		public string Email { get; set; }
		public string Phone { get; set; }
		public string Hash { get; set; }
		public string Salt { get; set; }
		public string Permissions { get; set; }
		public bool? IsActive { get; set; }
        public int? BranchId { get; set; }
        public Branch Branch { get; set; }
        public ICollection<UserRole> Roles { get; set; }

		[NotMapped]
		public string RoleNames
		{
			get
			{
				var data = Roles.Select(e => e.Role?.Name).ToList();
				if (data.Count > 0)
				{
					return data.Aggregate((i, j) => i + ", " + j);
				}
				return "";
			}
		}

		[NotMapped]
		public string Password { get; set; }

		[NotMapped]
		public string BranchName
		{
			get
			{
				return Branch?.Name;
			}
		}
	}
}
