using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ShopManagement.WebApi.Controllers
{
	public static class ControllerExtensions
	{
		public static int GetUserId(this ClaimsPrincipal user)
		{
            return Convert.ToInt32(user.Claims.FirstOrDefault(x => x.Type.Equals("user_id"))?.Value);
		}

		public static int GetBranchId(this ClaimsPrincipal user)
		{
			return Convert.ToInt32(user.Claims.FirstOrDefault(x => x.Type.Equals("branch_id"))?.Value);
		}
	}
}
