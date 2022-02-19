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
	public interface ITransferRepository
	{
		Task<int> UpdateAsync(Transfer transfer);
	}

	public class TransferRepository : ITransferRepository
	{
		private readonly ShopManagementDbContext _context;
		public TransferRepository(ShopManagementDbContext context)
		{
			_context = context;
		}

		public Task<int> UpdateAsync(Transfer transfer)
		{
			var existingUnitType = _context.Transfers
				.Where(p => p.Id == transfer.Id)
				.Include(p => p.TransferDetails)
				.SingleOrDefault();

			// Update parent
			_context.Entry(existingUnitType).CurrentValues.SetValues(transfer);

			// Delete children
			foreach (var existingChild in existingUnitType.TransferDetails.ToList())
			{
				if (!transfer.TransferDetails.Any(c => c.Id == existingChild.Id))
					_context.TransferDetails.Remove(existingChild);
			}

			// Update and Insert children
			foreach (var childModel in transfer.TransferDetails)
			{
				var existingChild = existingUnitType.TransferDetails
					.Where(c => c.Id == childModel.Id && c.Id != default(int))
					.SingleOrDefault();

				if (existingChild != null)
					// Update child
					_context.Entry(existingChild).CurrentValues.SetValues(childModel);
				else
				{
					// Insert child
					existingUnitType.TransferDetails.Add(childModel);
				}
			}

			return _context.SaveChangesAsync();
		}
	}
}