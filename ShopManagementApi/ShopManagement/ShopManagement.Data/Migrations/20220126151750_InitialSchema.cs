using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopManagement.Data.Migrations
{
    public partial class InitialSchema : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedTime = table.Column<DateTime>(nullable: true),
                    UpdatedTime = table.Column<DateTime>(nullable: true),
                    ModifierId = table.Column<int>(nullable: true),
                    Username = table.Column<string>(maxLength: 200, nullable: true),
                    Email = table.Column<string>(maxLength: 200, nullable: true),
                    Phone = table.Column<string>(maxLength: 100, nullable: true),
                    Hash = table.Column<string>(maxLength: 100, nullable: true),
                    Salt = table.Column<string>(maxLength: 100, nullable: true),
                    Permissions = table.Column<string>(maxLength: 1000, nullable: true),
                    IsActive = table.Column<bool>(nullable: true, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_users_users_ModifierId",
                        column: x => x.ModifierId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "institutes",
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
                    table.PrimaryKey("PK_institutes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_institutes_users_ModifierId",
                        column: x => x.ModifierId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "logs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedTime = table.Column<DateTime>(nullable: true),
                    UpdatedTime = table.Column<DateTime>(nullable: true),
                    ModifierId = table.Column<int>(nullable: true),
                    TableName = table.Column<string>(maxLength: 100, nullable: false),
                    Data = table.Column<string>(nullable: false),
                    IPAddress = table.Column<string>(nullable: true),
                    OS = table.Column<string>(nullable: true),
                    Browser = table.Column<string>(nullable: true),
                    OperationType = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_logs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_logs_users_ModifierId",
                        column: x => x.ModifierId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "product-sub-types",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedTime = table.Column<DateTime>(nullable: true),
                    UpdatedTime = table.Column<DateTime>(nullable: true),
                    ModifierId = table.Column<int>(nullable: true),
                    SubType = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_product-sub-types", x => x.Id);
                    table.ForeignKey(
                        name: "FK_product-sub-types_users_ModifierId",
                        column: x => x.ModifierId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "roles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedTime = table.Column<DateTime>(nullable: true),
                    UpdatedTime = table.Column<DateTime>(nullable: true),
                    ModifierId = table.Column<int>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    OrganogramLavel = table.Column<int>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_roles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_roles_users_ModifierId",
                        column: x => x.ModifierId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "suppliers",
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
                    table.PrimaryKey("PK_suppliers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_suppliers_users_ModifierId",
                        column: x => x.ModifierId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "units",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedTime = table.Column<DateTime>(nullable: true),
                    UpdatedTime = table.Column<DateTime>(nullable: true),
                    ModifierId = table.Column<int>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_units", x => x.Id);
                    table.ForeignKey(
                        name: "FK_units_users_ModifierId",
                        column: x => x.ModifierId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "product-types",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedTime = table.Column<DateTime>(nullable: true),
                    UpdatedTime = table.Column<DateTime>(nullable: true),
                    ModifierId = table.Column<int>(nullable: true),
                    Type = table.Column<string>(maxLength: 100, nullable: true, defaultValue: ""),
                    ProductSubTypeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_product-types", x => x.Id);
                    table.ForeignKey(
                        name: "FK_product-types_users_ModifierId",
                        column: x => x.ModifierId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_product-types_product-sub-types_ProductSubTypeId",
                        column: x => x.ProductSubTypeId,
                        principalTable: "product-sub-types",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "user-roles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedTime = table.Column<DateTime>(nullable: true),
                    UpdatedTime = table.Column<DateTime>(nullable: true),
                    ModifierId = table.Column<int>(nullable: true),
                    UserId = table.Column<int>(nullable: false),
                    RoleId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user-roles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_user-roles_users_ModifierId",
                        column: x => x.ModifierId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_user-roles_roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_user-roles_users_UserId",
                        column: x => x.UserId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "products",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedTime = table.Column<DateTime>(nullable: true),
                    UpdatedTime = table.Column<DateTime>(nullable: true),
                    ModifierId = table.Column<int>(nullable: true),
                    ProductTypeId = table.Column<int>(nullable: false),
                    UnitId = table.Column<int>(nullable: false),
                    ProductCode = table.Column<string>(maxLength: 100, nullable: false),
                    ProductName = table.Column<string>(maxLength: 100, nullable: false),
                    Origin = table.Column<string>(maxLength: 100, nullable: true),
                    ReOrderLebel = table.Column<decimal>(type: "decimal(15, 2)", nullable: true),
                    PackSize = table.Column<decimal>(type: "decimal(15, 2)", nullable: true),
                    ManufactureDate = table.Column<DateTime>(nullable: true),
                    ExpireDate = table.Column<DateTime>(nullable: true),
                    ShelfNo = table.Column<string>(maxLength: 100, nullable: true),
                    Details = table.Column<string>(maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_products", x => x.Id);
                    table.ForeignKey(
                        name: "FK_products_users_ModifierId",
                        column: x => x.ModifierId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_products_product-types_ProductTypeId",
                        column: x => x.ProductTypeId,
                        principalTable: "product-types",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_products_units_UnitId",
                        column: x => x.UnitId,
                        principalTable: "units",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OpeningStock",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedTime = table.Column<DateTime>(nullable: true),
                    UpdatedTime = table.Column<DateTime>(nullable: true),
                    ModifierId = table.Column<int>(nullable: true),
                    InstituteId = table.Column<int>(nullable: true),
                    StockEntryDate = table.Column<DateTime>(nullable: true),
                    ProductId = table.Column<int>(nullable: false),
                    Quantity = table.Column<decimal>(type: "decimal(15, 2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpeningStock", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OpeningStock_institutes_InstituteId",
                        column: x => x.InstituteId,
                        principalTable: "institutes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OpeningStock_users_ModifierId",
                        column: x => x.ModifierId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OpeningStock_products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_institutes_ModifierId",
                table: "institutes",
                column: "ModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_logs_ModifierId",
                table: "logs",
                column: "ModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_OpeningStock_InstituteId",
                table: "OpeningStock",
                column: "InstituteId");

            migrationBuilder.CreateIndex(
                name: "IX_OpeningStock_ModifierId",
                table: "OpeningStock",
                column: "ModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_OpeningStock_ProductId",
                table: "OpeningStock",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_products_ModifierId",
                table: "products",
                column: "ModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_products_ProductCode",
                table: "products",
                column: "ProductCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_products_ProductName",
                table: "products",
                column: "ProductName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_products_ProductTypeId",
                table: "products",
                column: "ProductTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_products_UnitId",
                table: "products",
                column: "UnitId");

            migrationBuilder.CreateIndex(
                name: "IX_product-sub-types_ModifierId",
                table: "product-sub-types",
                column: "ModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_product-types_ModifierId",
                table: "product-types",
                column: "ModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_product-types_ProductSubTypeId",
                table: "product-types",
                column: "ProductSubTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_roles_ModifierId",
                table: "roles",
                column: "ModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_suppliers_ModifierId",
                table: "suppliers",
                column: "ModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_units_ModifierId",
                table: "units",
                column: "ModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_user-roles_ModifierId",
                table: "user-roles",
                column: "ModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_user-roles_RoleId",
                table: "user-roles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_user-roles_UserId",
                table: "user-roles",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_users_ModifierId",
                table: "users",
                column: "ModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_users_Username",
                table: "users",
                column: "Username",
                unique: true,
                filter: "[Username] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "logs");

            migrationBuilder.DropTable(
                name: "OpeningStock");

            migrationBuilder.DropTable(
                name: "suppliers");

            migrationBuilder.DropTable(
                name: "user-roles");

            migrationBuilder.DropTable(
                name: "institutes");

            migrationBuilder.DropTable(
                name: "products");

            migrationBuilder.DropTable(
                name: "roles");

            migrationBuilder.DropTable(
                name: "product-types");

            migrationBuilder.DropTable(
                name: "units");

            migrationBuilder.DropTable(
                name: "product-sub-types");

            migrationBuilder.DropTable(
                name: "users");
        }
    }
}
