using ShopManagement.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ShopManagement.Repository
{
    public interface IRepository<TEntity> where TEntity : class
    {
        IQueryable<TEntity> Get();
        IQueryable<TEntity> Get(Expression<Func<TEntity, bool>> filter);
        Task<IEnumerable<TEntity>> GetAsync();
        Task<Pagination<TEntity>> GetAsync(int pageNumber, int pageSize);
        Task<Pagination<TEntity>> GetAsync(Expression<Func<TEntity,
            bool>> filter, int pageNumber, int pageSize);
        TEntity Find(int id);
        Task<TEntity> FindAsync(int id);
        Task<int> InsertAsync(TEntity entity);
        Task<int> InsertRangeAsync(List<TEntity> entities);
        Task<int> UpdateAsync(TEntity entity);
        Task<int> UpdateRangeAsync(List<TEntity> entities);
        Task<int> DeleteAsync(int id);
        Task<int> DeleteAsync(TEntity entity);
        Task<int> DeleteRangeAsync(List<TEntity> entities);
        Task<int> AddOrUpdateAsync(TEntity entity, bool saveChanges = true);
        Task<int> AddOrUpdateRangeAsync(List<TEntity> entities, bool saveChanges = true);
        Task<int> SaveChangesAsync();
    }
}
