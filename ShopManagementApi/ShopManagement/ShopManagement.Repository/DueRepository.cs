using Microsoft.EntityFrameworkCore;
using ShopManagement.Data;
using ShopManagement.Entity.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopManagement.Repository
{
    public interface IDueRepository
    {
        public Task<decimal> GetDue(int customerId, int branchId);
        public Task<List<CustomerDueVM>> GetAllDue(int branchId);
    }

    public class DueRepository : IDueRepository
    {
        private readonly ShopManagementDbContext _context;
        public DueRepository(ShopManagementDbContext _context )
        {
            this._context = _context;
        }

        public async Task<decimal> GetDue(int customerId, int branchId)
        {
            decimal due = 0;

            var saleTime = await _context.Sales
                .Where(e => e.CustomerId == customerId && e.BranchId == branchId)
                .GroupBy(x => true)
                .Select(x => new
                {
                    camount = x.Sum(e => e.Amount),
                    pamount = x.Sum(e => e.PaidAmount)
                })
                .FirstOrDefaultAsync();

            var openingDue = await _context.CustomerDues
                .Where(e => e.Customer.BranchId == branchId && e.CustomerId == customerId)
                .GroupBy(x => true)
                .Select(x => new
                {
                    amount = x.Sum(e => e.CreditAmount)
                })
                .FirstOrDefaultAsync();

            var paymentRcv = await _context.PaymentReceives
                .Where(e => e.BranchId == branchId
                    && e.CustomerId == customerId)
                .GroupBy(x => true)
                .Select(x => new
                {
                    amount = x.Sum(e => e.Amount)
                })
                .FirstOrDefaultAsync();

            due = openingDue.amount + saleTime.camount - saleTime.pamount - paymentRcv.amount;

            return (due);
        }

        public async Task<List<CustomerDueVM>> GetAllDue(int branchId)
        {
            var customers = await _context.Customers
                .Select(e => new CustomerDueVM
                {
                    Id = e.Id,
                    CustomerId = e.Id,
                    BranchId = e.BranchId,
                    CustomerName = e.Name,
                    BranchName = e.Branch.Name
                })
                .ToListAsync();

            foreach (var customer in customers)
            {
                (customer.Amount) = await GetDue(customer.Id, branchId);
            }

            return customers;
        }
    }
}
