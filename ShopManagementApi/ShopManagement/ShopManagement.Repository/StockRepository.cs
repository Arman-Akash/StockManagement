using Microsoft.EntityFrameworkCore;
using ShopManagement.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopManagement.Repository
{
    public interface IStockRepository
    {
        public Task<decimal> GetStock(int productId, int branchId);
    }

    public class StockRepository: IStockRepository
    {
        private readonly ShopManagementDbContext _context;

        public StockRepository(ShopManagementDbContext _context)
        {
            this._context = _context;
        }

        public async Task<decimal> GetStock(int productId, int branchId)
        {
            decimal stock = 0;
            if(branchId == 1)
            {
                stock += await _context.ReceiveDetails
                    .Where(e => e.ProductId == productId)
                    .SumAsync(e => e.Quantity);
            }


            var transferRcv = await _context.TransferDetails
                .Where(e => e.Transfer.TransferedBranchId == branchId)
                .SumAsync(e => e.Quantity);

            var transfer = await _context.TransferDetails
                .Where(e => e.Transfer.BranchId == branchId)
                .SumAsync(e => e.Quantity);

            stock += transferRcv - transfer;

            return stock;
        }
    }
}
