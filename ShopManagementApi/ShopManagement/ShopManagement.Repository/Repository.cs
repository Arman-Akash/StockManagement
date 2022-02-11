using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using ShopManagement.Data;
using ShopManagement.Entity.Models;
using ShopManagement.Utility;
using ShopManagement.Utility.StaticData;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ShopManagement.Repository
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        private readonly ShopManagementDbContext _context;
        private readonly DbSet<TEntity> _dbSet;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public Repository(ShopManagementDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _dbSet = _context.Set<TEntity>();
            _httpContextAccessor = httpContextAccessor;
        }

        public virtual Task<int> InsertAsync(TEntity entity)
        {
            _dbSet.Add(entity);
            return _context.SaveChangesAsync();
        }

        public virtual Task<int> InsertRangeAsync(List<TEntity> entities)
        {
            _dbSet.AddRange(entities);
            return _context.SaveChangesAsync();
        }

        public virtual IQueryable<TEntity> Get()
        {
            return _dbSet.AsQueryable();
        }

        public virtual IQueryable<TEntity> Get(Expression<Func<TEntity, bool>> filter)
        {
            return _dbSet.Where(filter).AsQueryable();
        }

        public virtual async Task<IEnumerable<TEntity>> GetAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public virtual async Task<Pagination<TEntity>> GetAsync(int pageNumber, int pageSize)
        {
            var result = new Pagination<TEntity>
            {
                Data = await _dbSet
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(),

                Count = _dbSet.Count()
            };
            result.Pageconfig = new PageConfig(result.Count, pageNumber, pageSize);

            return result;
        }

        public virtual async Task<Pagination<TEntity>> GetAsync(Expression<Func<TEntity,
            bool>> filter, int pageNumber, int pageSize)
        {
            var result = new Pagination<TEntity>
            {
                Data = await _dbSet
                .Where(filter)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync(),

                Count = _dbSet.Count()
            };
            result.Pageconfig = new PageConfig(result.Count, pageNumber, pageSize);

            return result;
        }

        public virtual TEntity Find(int id)
        {
            return _dbSet.Find(id);
        }

        public virtual async Task<TEntity> FindAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public virtual Task<int> UpdateAsync(TEntity entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity));
            }

            var model = entity.GetType();
            // retrive the created time from database (old value)
            // remove this portion after add create date on controller
            var id = model.GetProperty(nameof(BaseModel.Id)).GetValue(entity, null);
            //try
            {
                var oldEntity = _dbSet.Find(id);
                _context.Entry(oldEntity).State = EntityState.Detached;
                var oldTime = oldEntity.GetType().GetProperty(nameof(BaseModel.CreatedTime)).GetValue(oldEntity, null);
                model.GetProperty(nameof(BaseModel.CreatedTime)).SetValue(entity, oldTime);
                model.GetProperty(nameof(BaseModel.UpdatedTime)).SetValue(entity, DateTime.Now);
                try
                {
                    _dbSet.Attach(entity);
                }
                catch
                {
                    _context.Entry(entity).State = EntityState.Detached;
                    _dbSet.Attach(entity);
                }
                _context.Entry(entity).State = EntityState.Modified;
                return _context.SaveChangesAsync();
            }
            //catch(Exception exp)
            //{
            //	throw exp; //KeyNotFoundException();
            //}
        }

        public virtual Task<int> UpdateRangeAsync(List<TEntity> entities)
        {
            foreach (var entity in entities)
            {
                var model = entity.GetType();
                System.Reflection.PropertyInfo ct = model.GetProperty(nameof(BaseModel.CreatedTime));
                ct.SetValue(entity, DateTime.Now);

                var id = model.GetProperty(nameof(BaseModel.Id)).GetValue(entity, null);
                var oldEntity = _dbSet.Find(id);
                _context.Entry(oldEntity).State = EntityState.Detached;
                var oldTime = oldEntity.GetType().GetProperty(nameof(BaseModel.CreatedTime))
                    .GetValue(oldEntity, null);

                model.GetProperty(nameof(BaseModel.CreatedTime)).SetValue(entity, oldTime);
                model.GetProperty(nameof(BaseModel.UpdatedTime)).SetValue(entity, DateTime.Now);

                try
                {
                    _dbSet.Attach(entity);
                }
                catch
                {
                    _context.Entry(entity).State = EntityState.Detached;
                    _dbSet.Attach(entity);
                }
                _context.Entry(entity).State = EntityState.Modified;
            }
            return _context.SaveChangesAsync();
        }

        public virtual Task<int> DeleteAsync(int id)
        {
            var item = _dbSet.Find(id);
            return DeleteAsync(item);
        }

        public virtual Task<int> DeleteAsync(TEntity entity)
        {
            if (_context.Entry(entity).State == EntityState.Detached)
            {
                _dbSet.Attach(entity);
            }

            var log = Logger.Log(entity, _httpContextAccessor);
            _context.Logs.Add(log);
            _dbSet.Remove(entity);
            return _context.SaveChangesAsync();
        }

        public virtual Task<int> DeleteRangeAsync(List<TEntity> entities)
        {
            var log = Logger.Log(entities, _httpContextAccessor);
            _context.Logs.Add(log);
            _dbSet.RemoveRange(entities);
            return _context.SaveChangesAsync();
        }

        public virtual Task<int> AddOrUpdateAsync(TEntity entity)
        {
            _dbSet.Update(entity);
            return _context.SaveChangesAsync();
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }
    }
}