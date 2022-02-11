
using System.Linq;
using Microsoft.EntityFrameworkCore;
using ShopManagement.Entity.Models;
using ShopManagement.Data;
using ShopManagement.Entity.ViewModels;
using ShopManagement.Utility;
using Microsoft.AspNetCore.Http;

namespace ShopManagement.Repository
{
    public interface IUserRepository : IRepository<User>
    {
        User Validate(UserLogin user);
    }

    public class UserRepository : Repository<User>, IUserRepository
    {
        private readonly ShopManagementDbContext _context;
        public UserRepository(ShopManagementDbContext context, IHttpContextAccessor httpContextAccessor)
            : base(context, httpContextAccessor)
        {
            _context = context;
        }

        public User Validate(UserLogin user)
        {
            User loggedInUser = new User();
            //using (ShetuDbContext context = new ShetuDbContext())
            var item = _context.Users
                    .Where(u => u.Username == user.Username && u.IsActive == true)
                    .Include(e => e.Roles)
                    .ThenInclude(r => r.Role)
                    .SingleOrDefault();

            if (item != null)
            {
                if (PasswordManager.VerifyPassword(user.Password, item.Salt, item.Hash))
                {
                    loggedInUser = item;
                }
            }

            return loggedInUser;
        }
    }
}
