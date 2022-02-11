using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopManagement.Data.Migrations
{
    public partial class TableNameAndProductTableChanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_logs_users_ModifierId",
                table: "logs");

            migrationBuilder.DropForeignKey(
                name: "FK_OpeningStock_institutes_InstituteId",
                table: "OpeningStock");

            migrationBuilder.DropForeignKey(
                name: "FK_OpeningStock_users_ModifierId",
                table: "OpeningStock");

            migrationBuilder.DropForeignKey(
                name: "FK_OpeningStock_products_ProductId",
                table: "OpeningStock");

            migrationBuilder.DropForeignKey(
                name: "FK_products_users_ModifierId",
                table: "products");

            migrationBuilder.DropForeignKey(
                name: "FK_products_product-types_ProductTypeId",
                table: "products");

            migrationBuilder.DropForeignKey(
                name: "FK_products_units_UnitId",
                table: "products");

            migrationBuilder.DropForeignKey(
                name: "FK_product-sub-types_users_ModifierId",
                table: "product-sub-types");

            migrationBuilder.DropForeignKey(
                name: "FK_product-types_users_ModifierId",
                table: "product-types");

            migrationBuilder.DropForeignKey(
                name: "FK_product-types_product-sub-types_ProductSubTypeId",
                table: "product-types");

            migrationBuilder.DropForeignKey(
                name: "FK_roles_users_ModifierId",
                table: "roles");

            migrationBuilder.DropForeignKey(
                name: "FK_units_users_ModifierId",
                table: "units");

            migrationBuilder.DropForeignKey(
                name: "FK_user-roles_users_ModifierId",
                table: "user-roles");

            migrationBuilder.DropForeignKey(
                name: "FK_user-roles_users_UserId",
                table: "user-roles");

            migrationBuilder.DropForeignKey(
                name: "FK_users_users_ModifierId",
                table: "users");

            migrationBuilder.DropTable(
                name: "institutes");

            migrationBuilder.DropTable(
                name: "suppliers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_users",
                table: "users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_units",
                table: "units");

            migrationBuilder.DropPrimaryKey(
                name: "PK_products",
                table: "products");

            migrationBuilder.DropIndex(
                name: "IX_OpeningStock_InstituteId",
                table: "OpeningStock");

            migrationBuilder.DropPrimaryKey(
                name: "PK_product-types",
                table: "product-types");

            migrationBuilder.DropPrimaryKey(
                name: "PK_product-sub-types",
                table: "product-sub-types");

            migrationBuilder.DropColumn(
                name: "ExpireDate",
                table: "products");

            migrationBuilder.DropColumn(
                name: "ManufactureDate",
                table: "products");

            migrationBuilder.DropColumn(
                name: "ShelfNo",
                table: "products");

            migrationBuilder.DropColumn(
                name: "InstituteId",
                table: "OpeningStock");

            migrationBuilder.RenameTable(
                name: "users",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "units",
                newName: "Units");

            migrationBuilder.RenameTable(
                name: "products",
                newName: "Products");

            migrationBuilder.RenameTable(
                name: "product-types",
                newName: "ProductTypes");

            migrationBuilder.RenameTable(
                name: "product-sub-types",
                newName: "ProductSubType");

            migrationBuilder.RenameIndex(
                name: "IX_users_Username",
                table: "Users",
                newName: "IX_Users_Username");

            migrationBuilder.RenameIndex(
                name: "IX_users_ModifierId",
                table: "Users",
                newName: "IX_Users_ModifierId");

            migrationBuilder.RenameIndex(
                name: "IX_units_ModifierId",
                table: "Units",
                newName: "IX_Units_ModifierId");

            migrationBuilder.RenameIndex(
                name: "IX_products_UnitId",
                table: "Products",
                newName: "IX_Products_UnitId");

            migrationBuilder.RenameIndex(
                name: "IX_products_ProductTypeId",
                table: "Products",
                newName: "IX_Products_ProductTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_products_ProductName",
                table: "Products",
                newName: "IX_Products_ProductName");

            migrationBuilder.RenameIndex(
                name: "IX_products_ProductCode",
                table: "Products",
                newName: "IX_Products_ProductCode");

            migrationBuilder.RenameIndex(
                name: "IX_products_ModifierId",
                table: "Products",
                newName: "IX_Products_ModifierId");

            migrationBuilder.RenameIndex(
                name: "IX_product-types_ProductSubTypeId",
                table: "ProductTypes",
                newName: "IX_ProductTypes_ProductSubTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_product-types_ModifierId",
                table: "ProductTypes",
                newName: "IX_ProductTypes_ModifierId");

            migrationBuilder.RenameIndex(
                name: "IX_product-sub-types_ModifierId",
                table: "ProductSubType",
                newName: "IX_ProductSubType_ModifierId");

            migrationBuilder.AddColumn<int>(
                name: "BranchId",
                table: "OpeningStock",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Units",
                table: "Units",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Products",
                table: "Products",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductTypes",
                table: "ProductTypes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductSubType",
                table: "ProductSubType",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Branches",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedTime = table.Column<DateTime>(nullable: true),
                    UpdatedTime = table.Column<DateTime>(nullable: true),
                    ModifierId = table.Column<int>(nullable: true),
                    Name = table.Column<string>(maxLength: 100, nullable: true, defaultValue: ""),
                    PhnNumber = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Location = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Branches", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Branches_Users_ModifierId",
                        column: x => x.ModifierId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedTime = table.Column<DateTime>(nullable: true),
                    UpdatedTime = table.Column<DateTime>(nullable: true),
                    ModifierId = table.Column<int>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Details = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true),
                    MobileNo = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Customers_Users_ModifierId",
                        column: x => x.ModifierId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OpeningStock_BranchId",
                table: "OpeningStock",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_Branches_ModifierId",
                table: "Branches",
                column: "ModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_Branches_Name",
                table: "Branches",
                column: "Name",
                unique: true,
                filter: "[Name] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Customers_ModifierId",
                table: "Customers",
                column: "ModifierId");

            migrationBuilder.AddForeignKey(
                name: "FK_logs_Users_ModifierId",
                table: "logs",
                column: "ModifierId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OpeningStock_Branches_BranchId",
                table: "OpeningStock",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OpeningStock_Users_ModifierId",
                table: "OpeningStock",
                column: "ModifierId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OpeningStock_Products_ProductId",
                table: "OpeningStock",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Users_ModifierId",
                table: "Products",
                column: "ModifierId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ProductTypes_ProductTypeId",
                table: "Products",
                column: "ProductTypeId",
                principalTable: "ProductTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Units_UnitId",
                table: "Products",
                column: "UnitId",
                principalTable: "Units",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductSubType_Users_ModifierId",
                table: "ProductSubType",
                column: "ModifierId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductTypes_Users_ModifierId",
                table: "ProductTypes",
                column: "ModifierId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductTypes_ProductSubType_ProductSubTypeId",
                table: "ProductTypes",
                column: "ProductSubTypeId",
                principalTable: "ProductSubType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_roles_Users_ModifierId",
                table: "roles",
                column: "ModifierId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Units_Users_ModifierId",
                table: "Units",
                column: "ModifierId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_user-roles_Users_ModifierId",
                table: "user-roles",
                column: "ModifierId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_user-roles_Users_UserId",
                table: "user-roles",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Users_ModifierId",
                table: "Users",
                column: "ModifierId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_logs_Users_ModifierId",
                table: "logs");

            migrationBuilder.DropForeignKey(
                name: "FK_OpeningStock_Branches_BranchId",
                table: "OpeningStock");

            migrationBuilder.DropForeignKey(
                name: "FK_OpeningStock_Users_ModifierId",
                table: "OpeningStock");

            migrationBuilder.DropForeignKey(
                name: "FK_OpeningStock_Products_ProductId",
                table: "OpeningStock");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_Users_ModifierId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_ProductTypes_ProductTypeId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_Units_UnitId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductSubType_Users_ModifierId",
                table: "ProductSubType");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductTypes_Users_ModifierId",
                table: "ProductTypes");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductTypes_ProductSubType_ProductSubTypeId",
                table: "ProductTypes");

            migrationBuilder.DropForeignKey(
                name: "FK_roles_Users_ModifierId",
                table: "roles");

            migrationBuilder.DropForeignKey(
                name: "FK_Units_Users_ModifierId",
                table: "Units");

            migrationBuilder.DropForeignKey(
                name: "FK_user-roles_Users_ModifierId",
                table: "user-roles");

            migrationBuilder.DropForeignKey(
                name: "FK_user-roles_Users_UserId",
                table: "user-roles");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Users_ModifierId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Branches");

            migrationBuilder.DropTable(
                name: "Customers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Units",
                table: "Units");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Products",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_OpeningStock_BranchId",
                table: "OpeningStock");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductTypes",
                table: "ProductTypes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductSubType",
                table: "ProductSubType");

            migrationBuilder.DropColumn(
                name: "BranchId",
                table: "OpeningStock");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "users");

            migrationBuilder.RenameTable(
                name: "Units",
                newName: "units");

            migrationBuilder.RenameTable(
                name: "Products",
                newName: "products");

            migrationBuilder.RenameTable(
                name: "ProductTypes",
                newName: "product-types");

            migrationBuilder.RenameTable(
                name: "ProductSubType",
                newName: "product-sub-types");

            migrationBuilder.RenameIndex(
                name: "IX_Users_Username",
                table: "users",
                newName: "IX_users_Username");

            migrationBuilder.RenameIndex(
                name: "IX_Users_ModifierId",
                table: "users",
                newName: "IX_users_ModifierId");

            migrationBuilder.RenameIndex(
                name: "IX_Units_ModifierId",
                table: "units",
                newName: "IX_units_ModifierId");

            migrationBuilder.RenameIndex(
                name: "IX_Products_UnitId",
                table: "products",
                newName: "IX_products_UnitId");

            migrationBuilder.RenameIndex(
                name: "IX_Products_ProductTypeId",
                table: "products",
                newName: "IX_products_ProductTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_Products_ProductName",
                table: "products",
                newName: "IX_products_ProductName");

            migrationBuilder.RenameIndex(
                name: "IX_Products_ProductCode",
                table: "products",
                newName: "IX_products_ProductCode");

            migrationBuilder.RenameIndex(
                name: "IX_Products_ModifierId",
                table: "products",
                newName: "IX_products_ModifierId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductTypes_ProductSubTypeId",
                table: "product-types",
                newName: "IX_product-types_ProductSubTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductTypes_ModifierId",
                table: "product-types",
                newName: "IX_product-types_ModifierId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductSubType_ModifierId",
                table: "product-sub-types",
                newName: "IX_product-sub-types_ModifierId");

            migrationBuilder.AddColumn<DateTime>(
                name: "ExpireDate",
                table: "products",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ManufactureDate",
                table: "products",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ShelfNo",
                table: "products",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "InstituteId",
                table: "OpeningStock",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_users",
                table: "users",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_units",
                table: "units",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_products",
                table: "products",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_product-types",
                table: "product-types",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_product-sub-types",
                table: "product-sub-types",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "institutes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModifierId = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true, defaultValue: ""),
                    PhnNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdatedTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_institutes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_institutes_users_ModifierId",
                        column: x => x.ModifierId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "suppliers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Details = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MobileNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ModifierId = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdatedTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_suppliers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_suppliers_users_ModifierId",
                        column: x => x.ModifierId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OpeningStock_InstituteId",
                table: "OpeningStock",
                column: "InstituteId");

            migrationBuilder.CreateIndex(
                name: "IX_institutes_ModifierId",
                table: "institutes",
                column: "ModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_suppliers_ModifierId",
                table: "suppliers",
                column: "ModifierId");

            migrationBuilder.AddForeignKey(
                name: "FK_logs_users_ModifierId",
                table: "logs",
                column: "ModifierId",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OpeningStock_institutes_InstituteId",
                table: "OpeningStock",
                column: "InstituteId",
                principalTable: "institutes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OpeningStock_users_ModifierId",
                table: "OpeningStock",
                column: "ModifierId",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OpeningStock_products_ProductId",
                table: "OpeningStock",
                column: "ProductId",
                principalTable: "products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_products_users_ModifierId",
                table: "products",
                column: "ModifierId",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_products_product-types_ProductTypeId",
                table: "products",
                column: "ProductTypeId",
                principalTable: "product-types",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_products_units_UnitId",
                table: "products",
                column: "UnitId",
                principalTable: "units",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_product-sub-types_users_ModifierId",
                table: "product-sub-types",
                column: "ModifierId",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_product-types_users_ModifierId",
                table: "product-types",
                column: "ModifierId",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_product-types_product-sub-types_ProductSubTypeId",
                table: "product-types",
                column: "ProductSubTypeId",
                principalTable: "product-sub-types",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_roles_users_ModifierId",
                table: "roles",
                column: "ModifierId",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_units_users_ModifierId",
                table: "units",
                column: "ModifierId",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_user-roles_users_ModifierId",
                table: "user-roles",
                column: "ModifierId",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_user-roles_users_UserId",
                table: "user-roles",
                column: "UserId",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_users_users_ModifierId",
                table: "users",
                column: "ModifierId",
                principalTable: "users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
