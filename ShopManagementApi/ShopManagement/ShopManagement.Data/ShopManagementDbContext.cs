using Microsoft.EntityFrameworkCore;
using System.Linq;
using ShopManagement.Entity.Models;

namespace ShopManagement.Data
{
	public class ShopManagementDbContext : DbContext
	{
		public ShopManagementDbContext(DbContextOptions<ShopManagementDbContext> options) : base(options)
		{ }
		#region Configuration
		public DbSet<Branch> Branches { get; set; }
		public DbSet<Customer> Customers { get; set; }
		public DbSet<Unit> Units { get; set; }
		public DbSet<ProductSubType> ProductSubTypes { get; set; }
		public DbSet<OpeningStock> OpeningStocks { get; set; }
		public DbSet<ProductType> ProductTypes { get; set; }
		public DbSet<Product> Products { get; set; }
        #endregion

        #region Receive

        public DbSet<Sale> Sales { get; set; }
        public DbSet<SaleDetail> SaleDetails { get; set; }
		public DbSet<Transfer> Transfers { get; set; }
		public DbSet<TransferDetail> TransferDetails  { get; set; }
		public DbSet<Receive> Receives { get; set; }
		public DbSet<ReceiveDetail> ReceiveDetails { get; set; }

		#endregion


		public DbSet<Log> Logs { get; set; }
		public DbSet<Role> Roles { get; set; }
		public DbSet<User> Users { get; set; }
		public DbSet<UserRole> UserRoles { get; set; }
		protected override void OnModelCreating(ModelBuilder builder)
		{
			foreach (var relationship in builder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
			{
				relationship.DeleteBehavior = DeleteBehavior.Restrict;
			}

			builder.Entity<Log>(entity =>
			{
				entity.Property(e => e.Data)
					.IsRequired();

				entity.Property(e => e.TableName)
					.IsRequired()
					.HasMaxLength(100);
			});

			builder.Entity<User>(entity =>
			{
				entity.HasIndex(e => e.Username)
					.IsUnique();

				entity.Property(e => e.Username)
					.HasMaxLength(200);

				entity.Property(e => e.Email)
					.HasMaxLength(200);

				entity.Property(e => e.Phone)
					.HasMaxLength(100);

				entity.Property(e => e.Hash)
					.HasMaxLength(100);

				entity.Property(e => e.Salt)
					.HasMaxLength(100);

				entity.HasOne(e => e.Branch)
					.WithMany()
					.HasForeignKey(e => e.BranchId);

				entity.Property(e => e.Permissions)
					.HasMaxLength(1000);

				entity.Property(e => e.IsActive)
					.HasDefaultValue(true);

				entity.HasMany(e => e.Roles)
					.WithOne(e => e.User)
					.HasForeignKey(e => e.UserId);
			});

			#region Configuration

			builder.Entity<Branch>(entity =>
			{
				entity.HasIndex(e => e.Name)
					.IsUnique();

				entity.Property(e => e.Name)
					.HasDefaultValue(string.Empty)
					.HasMaxLength(100);

				entity.Property(e => e.Type)
					.HasDefaultValue(string.Empty)
					.HasMaxLength(100);
			});

			builder.Entity<Unit>(entity =>
			{
				entity.HasIndex(e => e.Name)
					.IsUnique();

				entity.Property(e => e.Name)
					.HasDefaultValue(string.Empty)
					.HasMaxLength(100);
			});

			builder.Entity<Customer>(entity =>
			{

				entity.Property(e => e.Name)
					.HasDefaultValue(string.Empty)
					.HasMaxLength(100);

				entity.Property(e => e.Details)
					.HasDefaultValue(string.Empty)
					.HasMaxLength(500);

				entity.Property(e => e.Address)
					.HasDefaultValue(string.Empty)
					.HasMaxLength(100);

				entity.Property(e => e.MobileNo)
					.HasDefaultValue(string.Empty)
					.HasMaxLength(500);
			});

			builder.Entity<ProductSubType>(entity =>
			{
				entity.Property(e => e.SubType)
					.HasDefaultValue(string.Empty)
					.HasMaxLength(100);
			});

			builder.Entity<ProductType>(entity =>
			{
				entity.Property(e => e.Type)
					.HasDefaultValue(string.Empty)
					.HasMaxLength(100);

				entity.HasOne(e => e.ProductSubType)
					.WithMany()
					.HasForeignKey(e => e.ProductSubTypeId);
			});

			builder.Entity<Product>(entity =>
			{
				entity.HasIndex(e => e.ProductCode)
					.IsUnique();

				entity.Property(e => e.ProductCode)
				    .IsRequired()
				    .HasMaxLength(100);

				entity.Property(e => e.ProductName)
				   .IsRequired()
				   .HasMaxLength(100);

				entity.Property(e => e.Origin)
                   .HasMaxLength(100);

                entity.Property(e => e.Details)
                   .HasMaxLength(500);

				entity.HasOne(e => e.Unit)
					.WithMany()
					.HasForeignKey(e => e.UnitId);

				entity.HasOne(e => e.ProductType)
				    .WithMany()
				    .HasForeignKey(e => e.ProductTypeId);

				entity.Property(e => e.ReOrderLebel)
				    .HasColumnType("decimal(15, 2)");

				entity.Property(e => e.PackSize)
					.HasColumnType("decimal(15, 2)");
            });

            #endregion

            #region ProductReceive

            builder.Entity<Receive>(entity =>
            {
				entity.Property(e => e.RcvDate)
					.HasDefaultValueSql("getdate()");

				entity.Property(e => e.RcvFrom)
					.HasDefaultValue(string.Empty)
					.HasMaxLength(100);

				entity.Property(e => e.Comment)
					.HasDefaultValue(string.Empty)
					.HasMaxLength(100);
			});

            builder.Entity<ReceiveDetail>(entity =>
            {
                entity.HasOne(e => e.Receive)
                    .WithMany(e => e.ReceiveDetails)
                    .HasForeignKey(e => e.ReceiveId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(e => e.Product)
                    .WithMany()
                    .HasForeignKey(e => e.ProductId);

                entity.Property(e => e.Quantity)
                    .HasColumnType("decimal(15, 2)");

                entity.Property(e => e.Rate)
                    .HasColumnType("decimal(15, 2)");

                entity.Property(e => e.Amount)
                    .HasColumnType("decimal(15, 2)");

				entity.Property(e => e.ShelfNo)
				   .HasMaxLength(100);
			});

			#endregion

			#region ProductReceive

			builder.Entity<Transfer>(entity =>
			{
				entity.HasIndex(e => e.TransferChallan)
					.IsUnique();

				entity.Property(e => e.TransferChallan)
					.IsRequired()
					.HasMaxLength(100);

				entity.Property(e => e.TransferDate)
					.HasDefaultValueSql("getdate()");

				entity.HasOne(e => e.Branch)
					.WithMany()
					.HasForeignKey(e => e.BranchId);

				entity.HasOne(e => e.User)
					.WithMany()
					.HasForeignKey(e => e.UserId);
			});

			builder.Entity<TransferDetail>(entity =>
			{
				entity.HasOne(e => e.Transfer)
					.WithMany(e => e.TransferDetails)
					.HasForeignKey(e => e.TransferId)
					.OnDelete(DeleteBehavior.Cascade);

				entity.HasOne(e => e.Product)
					.WithMany()
					.HasForeignKey(e => e.ProductId);

				entity.Property(e => e.Quantity)
					.HasColumnType("decimal(15, 2)");

				entity.Property(e => e.Rate)
					.HasColumnType("decimal(15, 2)");

				entity.Property(e => e.Amount)
					.HasColumnType("decimal(15, 2)");
			});

            #endregion
            #region Sale
            builder.Entity<Sale>(entity =>
            {
				entity.Property(e => e.SaleDate)
					.HasDefaultValueSql("getdate()");

				entity.HasOne(e => e.Customer)
					.WithMany()
					.HasForeignKey(e => e.CustomerId);
			});

            builder.Entity<SaleDetail>(entity =>
            {
                entity.HasOne(e => e.Sale)
                    .WithMany(e => e.SaleDetails)
                    .HasForeignKey(e => e.SaleId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(e => e.Product)
                    .WithMany()
                    .HasForeignKey(e => e.ProductId);

                entity.Property(e => e.Quantity)
                    .HasColumnType("decimal(15, 2)");

                entity.Property(e => e.Rate)
                    .HasColumnType("decimal(15, 2)");

                entity.Property(e => e.Amount)
                    .HasColumnType("decimal(15, 2)");
            });

            #endregion

            #region OpeningStock

            builder.Entity<OpeningStock>(entity =>
			{
				entity.HasOne(e => e.Branch)
					.WithMany()
					.HasForeignKey(e => e.BranchId);

				entity.HasOne(e => e.Product)
					.WithMany()
					.HasForeignKey(e => e.ProductId);

				entity.Property(e => e.Quantity)
					.HasColumnType("decimal(15, 2)");
			});

			#endregion
		}
    }
}

