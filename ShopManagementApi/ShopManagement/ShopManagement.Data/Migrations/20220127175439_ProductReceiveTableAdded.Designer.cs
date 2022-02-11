﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ShopManagement.Data;

namespace ShopManagement.Data.Migrations
{
    [DbContext(typeof(ShopManagementDbContext))]
    [Migration("20220127175439_ProductReceiveTableAdded")]
    partial class ProductReceiveTableAdded
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.19")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ShopManagement.Entity.Models.Branch", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("CreatedTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Location")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ModifierId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100)
                        .HasDefaultValue("");

                    b.Property<string>("PhnNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("UpdatedTime")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("ModifierId");

                    b.HasIndex("Name")
                        .IsUnique()
                        .HasFilter("[Name] IS NOT NULL");

                    b.ToTable("Branches");
                });

            modelBuilder.Entity("ShopManagement.Entity.Models.Customer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100)
                        .HasDefaultValue("");

                    b.Property<DateTime?>("CreatedTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Details")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(500)")
                        .HasMaxLength(500)
                        .HasDefaultValue("");

                    b.Property<string>("MobileNo")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(500)")
                        .HasMaxLength(500)
                        .HasDefaultValue("");

                    b.Property<int?>("ModifierId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100)
                        .HasDefaultValue("");

                    b.Property<DateTime?>("UpdatedTime")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("ModifierId");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("ShopManagement.Entity.Models.Log", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Browser")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("CreatedTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("IPAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ModifierId")
                        .HasColumnType("int");

                    b.Property<string>("OS")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OperationType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TableName")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<DateTime?>("UpdatedTime")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("ModifierId");

                    b.ToTable("Logs");
                });

            modelBuilder.Entity("ShopManagement.Entity.Models.OpeningStock", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("BranchId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("CreatedTime")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ModifierId")
                        .HasColumnType("int");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<decimal>("Quantity")
                        .HasColumnType("decimal(15, 2)");

                    b.Property<DateTime?>("StockEntryDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("UpdatedTime")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("BranchId");

                    b.HasIndex("ModifierId");

                    b.HasIndex("ProductId");

                    b.ToTable("OpeningStocks");
                });

            modelBuilder.Entity("ShopManagement.Entity.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("CreatedTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Details")
                        .HasColumnType("nvarchar(500)")
                        .HasMaxLength(500);

                    b.Property<int?>("ModifierId")
                        .HasColumnType("int");

                    b.Property<string>("Origin")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<decimal?>("PackSize")
                        .HasColumnType("decimal(15, 2)");

                    b.Property<string>("ProductCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<string>("ProductName")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<int>("ProductTypeId")
                        .HasColumnType("int");

                    b.Property<decimal?>("ReOrderLebel")
                        .HasColumnType("decimal(15, 2)");

                    b.Property<int>("UnitId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("UpdatedTime")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("ModifierId");

                    b.HasIndex("ProductCode")
                        .IsUnique();

                    b.HasIndex("ProductName")
                        .IsUnique();

                    b.HasIndex("ProductTypeId");

                    b.HasIndex("UnitId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("ShopManagement.Entity.Models.ProductReceive", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ChallanNo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Comment")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100)
                        .HasDefaultValue("");

                    b.Property<DateTime?>("CreatedTime")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ModifierId")
                        .HasColumnType("int");

                    b.Property<DateTime>("RcvDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("getdate()");

                    b.Property<string>("RcvFrom")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100)
                        .HasDefaultValue("");

                    b.Property<DateTime?>("UpdatedTime")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("ModifierId");

                    b.ToTable("ProductReceives");
                });

            modelBuilder.Entity("ShopManagement.Entity.Models.ProductReceiveDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal?>("Amount")
                        .HasColumnType("decimal(15, 2)");

                    b.Property<DateTime?>("CreatedTime")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("ExpireDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("getdate()");

                    b.Property<DateTime?>("ManufactureDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValueSql("getdate()");

                    b.Property<int?>("ModifierId")
                        .HasColumnType("int");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<int>("ProductReceiveId")
                        .HasColumnType("int");

                    b.Property<decimal>("Quantity")
                        .HasColumnType("decimal(15, 2)");

                    b.Property<decimal?>("Rate")
                        .HasColumnType("decimal(15, 2)");

                    b.Property<string>("ShelfNo")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<DateTime?>("UpdatedTime")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("ModifierId");

                    b.HasIndex("ProductId");

                    b.HasIndex("ProductReceiveId");

                    b.ToTable("ProductReceiveDetails");
                });

            modelBuilder.Entity("ShopManagement.Entity.Models.ProductSubType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("CreatedTime")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ModifierId")
                        .HasColumnType("int");

                    b.Property<string>("SubType")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100)
                        .HasDefaultValue("");

                    b.Property<DateTime?>("UpdatedTime")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("ModifierId");

                    b.ToTable("ProductSubTypes");
                });

            modelBuilder.Entity("ShopManagement.Entity.Models.ProductType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("CreatedTime")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ModifierId")
                        .HasColumnType("int");

                    b.Property<int>("ProductSubTypeId")
                        .HasColumnType("int");

                    b.Property<string>("Type")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100)
                        .HasDefaultValue("");

                    b.Property<DateTime?>("UpdatedTime")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("ModifierId");

                    b.HasIndex("ProductSubTypeId");

                    b.ToTable("ProductTypes");
                });

            modelBuilder.Entity("ShopManagement.Entity.Models.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("CreatedTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ModifierId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("OrganogramLavel")
                        .HasColumnType("int");

                    b.Property<DateTime?>("UpdatedTime")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("ModifierId");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("ShopManagement.Entity.Models.Unit", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("CreatedTime")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ModifierId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100)
                        .HasDefaultValue("");

                    b.Property<DateTime?>("UpdatedTime")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("ModifierId");

                    b.HasIndex("Name")
                        .IsUnique()
                        .HasFilter("[Name] IS NOT NULL");

                    b.ToTable("Units");
                });

            modelBuilder.Entity("ShopManagement.Entity.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("BranchId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("CreatedTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(200)")
                        .HasMaxLength(200);

                    b.Property<string>("Hash")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<bool?>("IsActive")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(true);

                    b.Property<int?>("ModifierId")
                        .HasColumnType("int");

                    b.Property<string>("Permissions")
                        .HasColumnType("nvarchar(1000)")
                        .HasMaxLength(1000);

                    b.Property<string>("Phone")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<string>("Salt")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<DateTime?>("UpdatedTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(200)")
                        .HasMaxLength(200);

                    b.HasKey("Id");

                    b.HasIndex("BranchId");

                    b.HasIndex("ModifierId");

                    b.HasIndex("Username")
                        .IsUnique()
                        .HasFilter("[Username] IS NOT NULL");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("ShopManagement.Entity.Models.UserRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("CreatedTime")
                        .HasColumnType("datetime2");

                    b.Property<int?>("ModifierId")
                        .HasColumnType("int");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("UpdatedTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ModifierId");

                    b.HasIndex("RoleId");

                    b.HasIndex("UserId");

                    b.ToTable("UserRoles");
                });

            modelBuilder.Entity("ShopManagement.Entity.Models.Branch", b =>
                {
                    b.HasOne("ShopManagement.Entity.Models.User", "ModifiedBy")
                        .WithMany()
                        .HasForeignKey("ModifierId");
                });

            modelBuilder.Entity("ShopManagement.Entity.Models.Customer", b =>
                {
                    b.HasOne("ShopManagement.Entity.Models.User", "ModifiedBy")
                        .WithMany()
                        .HasForeignKey("ModifierId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("ShopManagement.Entity.Models.Log", b =>
                {
                    b.HasOne("ShopManagement.Entity.Models.User", "ModifiedBy")
                        .WithMany()
                        .HasForeignKey("ModifierId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("ShopManagement.Entity.Models.OpeningStock", b =>
                {
                    b.HasOne("ShopManagement.Entity.Models.Branch", "Branch")
                        .WithMany()
                        .HasForeignKey("BranchId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("ShopManagement.Entity.Models.User", "ModifiedBy")
                        .WithMany()
                        .HasForeignKey("ModifierId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("ShopManagement.Entity.Models.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("ShopManagement.Entity.Models.Product", b =>
                {
                    b.HasOne("ShopManagement.Entity.Models.User", "ModifiedBy")
                        .WithMany()
                        .HasForeignKey("ModifierId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("ShopManagement.Entity.Models.ProductType", "ProductType")
                        .WithMany()
                        .HasForeignKey("ProductTypeId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("ShopManagement.Entity.Models.Unit", "Unit")
                        .WithMany()
                        .HasForeignKey("UnitId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("ShopManagement.Entity.Models.ProductReceive", b =>
                {
                    b.HasOne("ShopManagement.Entity.Models.User", "ModifiedBy")
                        .WithMany()
                        .HasForeignKey("ModifierId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("ShopManagement.Entity.Models.ProductReceiveDetail", b =>
                {
                    b.HasOne("ShopManagement.Entity.Models.User", "ModifiedBy")
                        .WithMany()
                        .HasForeignKey("ModifierId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("ShopManagement.Entity.Models.Product", "Product")
                        .WithMany()
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("ShopManagement.Entity.Models.ProductReceive", "ProductReceive")
                        .WithMany("ProductReceiveDetails")
                        .HasForeignKey("ProductReceiveId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ShopManagement.Entity.Models.ProductSubType", b =>
                {
                    b.HasOne("ShopManagement.Entity.Models.User", "ModifiedBy")
                        .WithMany()
                        .HasForeignKey("ModifierId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("ShopManagement.Entity.Models.ProductType", b =>
                {
                    b.HasOne("ShopManagement.Entity.Models.User", "ModifiedBy")
                        .WithMany()
                        .HasForeignKey("ModifierId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("ShopManagement.Entity.Models.ProductSubType", "ProductSubType")
                        .WithMany()
                        .HasForeignKey("ProductSubTypeId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("ShopManagement.Entity.Models.Role", b =>
                {
                    b.HasOne("ShopManagement.Entity.Models.User", "ModifiedBy")
                        .WithMany()
                        .HasForeignKey("ModifierId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("ShopManagement.Entity.Models.Unit", b =>
                {
                    b.HasOne("ShopManagement.Entity.Models.User", "ModifiedBy")
                        .WithMany()
                        .HasForeignKey("ModifierId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("ShopManagement.Entity.Models.User", b =>
                {
                    b.HasOne("ShopManagement.Entity.Models.Branch", "Branch")
                        .WithMany()
                        .HasForeignKey("BranchId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("ShopManagement.Entity.Models.User", "ModifiedBy")
                        .WithMany()
                        .HasForeignKey("ModifierId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("ShopManagement.Entity.Models.UserRole", b =>
                {
                    b.HasOne("ShopManagement.Entity.Models.User", "ModifiedBy")
                        .WithMany()
                        .HasForeignKey("ModifierId");

                    b.HasOne("ShopManagement.Entity.Models.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("ShopManagement.Entity.Models.User", "User")
                        .WithMany("Roles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
