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
	public interface ISaleRepository
	{
		Task<int> UpdateAsync(Sale sale);
	}

	public class SaleRepository : ISaleRepository
	{
		private readonly ShopManagementDbContext _context;
		public SaleRepository(ShopManagementDbContext context)
		{
			_context = context;
		}

		public Task<int> UpdateAsync(Sale sale)
		{
			var existingUnitType = _context.Sales
				.Where(p => p.Id == sale.Id)
				.Include(p => p.SaleDetails)
				.SingleOrDefault();

			// Update parent
			_context.Entry(existingUnitType).CurrentValues.SetValues(sale);

			// Delete children
			foreach (var existingChild in existingUnitType.SaleDetails.ToList())
			{
				if (!sale.SaleDetails.Any(c => c.Id == existingChild.Id))
					_context.SaleDetails.Remove(existingChild);
			}

			// Update and Insert children
			foreach (var childModel in sale.SaleDetails)
			{
				var existingChild = existingUnitType.SaleDetails
					.Where(c => c.Id == childModel.Id && c.Id != default(int))
					.SingleOrDefault();

				if (existingChild != null)
					// Update child
					_context.Entry(existingChild).CurrentValues.SetValues(childModel);
				else
				{
					// Insert child
					existingUnitType.SaleDetails.Add(childModel);
				}
			}

			return _context.SaveChangesAsync();
		}
	}
}