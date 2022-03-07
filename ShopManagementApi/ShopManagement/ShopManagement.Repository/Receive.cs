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
	public interface IReceiveRepository
	{
		Task<int> UpdateAsync(Purchase receive);
	}

	public class ReceiveRepository : IReceiveRepository
	{
		private readonly ShopManagementDbContext _context;
		public ReceiveRepository(ShopManagementDbContext context)
		{
			_context = context;
		}

		public Task<int> UpdateAsync(Purchase receive)
		{
			var existingUnitType = _context.Purchases
				.Where(p => p.Id == receive.Id)
				.Include(p => p.Details)
				.SingleOrDefault();

			// Update parent
			_context.Entry(existingUnitType).CurrentValues.SetValues(receive);

			// Delete children
			foreach (var existingChild in existingUnitType.Details.ToList())
			{
				if (!receive.Details.Any(c => c.Id == existingChild.Id))
					_context.PurchaseDetails.Remove(existingChild);
			}

			// Update and Insert children
			foreach (var childModel in receive.Details)
			{
				var existingChild = existingUnitType.Details
					.Where(c => c.Id == childModel.Id && c.Id != default(int))
					.SingleOrDefault();

				if (existingChild != null)
					// Update child
					_context.Entry(existingChild).CurrentValues.SetValues(childModel);
				else
				{
					// Insert child
					existingUnitType.Details.Add(childModel);
				}
			}

			return _context.SaveChangesAsync();
		}
	}
}
