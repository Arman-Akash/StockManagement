using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ShopManagement.Data;
using ShopManagement.Entity.Models;

namespace ShopManagement.Repository
{
	public interface IReceiveRepository : IRepository<Receive>
	{

	}

	public class ReceiveRepository : Repository<Receive>, IReceiveRepository
	{
		private readonly ShopManagementDbContext _context;
		public ReceiveRepository(ShopManagementDbContext context, IHttpContextAccessor httpContextAccessor)
			: base(context, httpContextAccessor)
		{
			_context = context;
		}

		public override Task<int> UpdateAsync(Receive receive)
		{
			var existingUnitType = _context.Receives
				.Where(p => p.Id == receive.Id)
				.Include(p => p.ReceiveDetails)
				.SingleOrDefault();

			// Update parent
			_context.Entry(existingUnitType).CurrentValues.SetValues(receive);

			// Delete children
			foreach (var existingChild in existingUnitType.ReceiveDetails.ToList())
			{
				if (!receive.ReceiveDetails.Any(c => c.Id == existingChild.Id))
					_context.ReceiveDetails.Remove(existingChild);
			}

			// Update and Insert children
			foreach (var childModel in receive.ReceiveDetails)
			{
				var existingChild = existingUnitType.ReceiveDetails
					.Where(c => c.Id == childModel.Id && c.Id != default(int))
					.SingleOrDefault();

				if (existingChild != null)
					// Update child
					_context.Entry(existingChild).CurrentValues.SetValues(childModel);
				else
				{
					// Insert child
					existingUnitType.ReceiveDetails.Add(childModel);
				}
			}

			return _context.SaveChangesAsync();
		}
	}
}
