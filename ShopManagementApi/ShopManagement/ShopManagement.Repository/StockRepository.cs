using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using ShopManagement.Data;
using ShopManagement.Entity.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace ShopManagement.Repository
{
    public interface IStockRepository
    {
        public Task<(decimal, decimal)> GetStock(int productId, int branchId);
        public Task<List<OpeningStockVM>> GetAllStock(int branchId);
        public Task<List<OpeningStockVM>> GetAllReorder(int branchId);
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
                    ProductName = e.ProductCode + " - " + e.ProductName,
                    UnitName = e.Unit.Name
                })
                .ToListAsync();

            foreach(var product in products)
            {
                (product.Quantity, product.Amount) = await GetStock(product.Id, branchId);
            }

            return products;
        }

        public async Task<List<OpeningStockVM>> GetAllReorder(int branchId)
        {
            var products = await _context.Products
                .Select(e => new OpeningStockVM
                {
                    Id = e.Id,
                    ProductName = e.ProductCode + " " + e.ProductName,
                    UnitName = e.Unit.Name,
                    ReorderLabel = e.ReOrderLebel
                })
                .ToListAsync();

            foreach (var product in products)
            {
                (product.Quantity, product.Amount) = await GetStock(product.Id, branchId);
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
                    ProductName = e.ProductCode + " " + e.ProductName,
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

        public async Task<(decimal, decimal)> GetStock(int productId, int branchId)
        {
            decimal stock = 0;
            decimal amount = 0;

            var purchase = await _context.PurchaseDetails
                .Where(e => e.ProductId == productId && e.Receive.BranchId == branchId)
                .GroupBy(x => true)
                .Select(x => new
                {
                    qty = x.Sum(e => e.Quantity),
                    amount = x.Sum(e => e.Amount)
                })
                .FirstOrDefaultAsync();

            var os = await _context.OpeningStocks
                .Where(e => e.BranchId == branchId && e.ProductId == productId)
                .GroupBy(x => true)
                .Select(x => new
                {
                    qty = x.Sum(e => e.Quantity),
                    amount = x.Sum(e => e.Amount)
                })
                .FirstOrDefaultAsync();

            var transferRcv = await _context.TransferDetails
                .Where(e => e.Transfer.TransferedBranchId == branchId
                    && e.Transfer.RcvFlg
                    && e.ProductId == productId)
                .GroupBy(x => true)
                .Select(x => new
                {
                    qty = x.Sum(e => e.Quantity),
                    amount = x.Sum(e => e.Amount)
                })
                .FirstOrDefaultAsync();

            var transfer = await _context.TransferDetails
                .Where(e => e.Transfer.BranchId == branchId
                && e.ProductId == productId)
                .GroupBy(x => true)
                .Select(x => new
                {
                    qty = x.Sum(e => e.Quantity),
                    amount = x.Sum(e => e.Amount)
                })
                .FirstOrDefaultAsync();

            var sold = await _context.SaleDetails
                .Where(e => e.ProductId == productId && e.Sale.BranchId == branchId)
                .GroupBy(x => true)
                .Select(x => new
                {
                    qty = x.Sum(e => e.Quantity),
                    amount = x.Sum(e => e.Amount)
                })
                .FirstOrDefaultAsync();

            stock = purchase.qty + os.qty + transferRcv.qty - transfer.qty - sold.qty;
            amount = purchase.amount + os.amount + transferRcv.amount - transfer.amount - sold.amount;

            return (stock, amount);
        }
    }
}
