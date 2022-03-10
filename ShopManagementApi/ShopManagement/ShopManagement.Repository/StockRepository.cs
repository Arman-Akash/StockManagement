using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using ShopManagement.Data;
using ShopManagement.Entity.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ShopManagement.Repository
{
    public interface IStockRepository
    {
        public Task<decimal> GetStock(int productId, int branchId);
        public Task<List<OpeningStockVM>> GetAllStock(int branchId);
        Task<List<OpeningStockVM>> GetOpeningStock(int subTypeId, int branchId);
    }

    public class StockRepository : IStockRepository
    {
        private readonly ShopManagementDbContext _context;

        public StockRepository(ShopManagementDbContext _context)
        {
            this._context = _context;
        }

        public async Task<List<OpeningStockVM>> GetAllStock(int branchId)
        {
            var products = await _context.Products
                .Select(e => new OpeningStockVM
                {
                    Id = e.Id,
                    ProductName = e.ProductName,
                    UnitName = e.Unit.Name
                })
                .ToListAsync();

            foreach(var product in products)
            {
                product.Quantity = await GetStock(product.Id, branchId);
            }

            return products;
        }

        public async Task<List<OpeningStockVM>> GetOpeningStock(int subTypeId, int branchId)
        {
            var productList = await _context.Products
                .Where(e => e.ProductSubTypeId == subTypeId)
                .Select(e => new OpeningStockVM
                {
                    ProductId = e.Id,
                    ProductName = e.ProductCode + " - " + e.ProductName,
                    UnitName = e.Unit.Name,
                    BranchId = branchId
                })
                .ToListAsync();

            foreach (var product in productList)
            {
                var os = _context.OpeningStocks
                    .Where(e => e.ProductId == product.ProductId
                        && e.BranchId == branchId)
                    .FirstOrDefault();

                if (os != null)
                {
                    product.Quantity = os.Quantity;
                    product.Amount = os.Amount;
                    product.Id = os.Id;
                }
            }

            return productList;
        }

        public async Task<decimal> GetStock(int productId, int branchId)
        {
            decimal stock = 0;

            stock += await _context.PurchaseDetails
                .Where(e => e.ProductId == productId && e.Receive.BranchId == branchId)
                .SumAsync(e => e.Quantity);

            var os = await _context.OpeningStocks
                .Where(e => e.BranchId == branchId && e.ProductId == productId)
                .SumAsync(e => e.Quantity);

            var transferRcv = await _context.TransferDetails
                .Where(e => e.Transfer.TransferedBranchId == branchId
                    && e.Transfer.RcvFlg
                    && e.ProductId == productId)
                .SumAsync(e => e.Quantity);

            var transfer = await _context.TransferDetails
                .Where(e => e.Transfer.BranchId == branchId
                && e.ProductId == productId)
                .SumAsync(e => e.Quantity);

            var sold = await _context.SaleDetails
                .Where(e => e.ProductId == productId && e.Sale.BranchId == branchId)
                .SumAsync(e => e.Quantity);

            stock += os + transferRcv - transfer - sold;

            return stock;
        }
    }
}
