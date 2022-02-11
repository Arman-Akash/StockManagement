using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopManagement.Data.Migrations
{
    public partial class SaleTableAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_purchase-details_Users_ModifierId",
                table: "purchase-details");

            migrationBuilder.DropForeignKey(
                name: "FK_purchase-details_Products_ProductId",
                table: "purchase-details");

            migrationBuilder.DropForeignKey(
                name: "FK_purchase-details_purchases_TransferId",
                table: "purchase-details");

            migrationBuilder.DropForeignKey(
                name: "FK_purchases_Branches_BranchId",
                table: "purchases");

            migrationBuilder.DropForeignKey(
                name: "FK_purchases_Users_ModifierId",
                table: "purchases");

            migrationBuilder.DropForeignKey(
                name: "FK_purchases_Users_UserId",
                table: "purchases");

            migrationBuilder.DropPrimaryKey(
                name: "PK_purchases",
                table: "purchases");

            migrationBuilder.DropPrimaryKey(
                name: "PK_purchase-details",
                table: "purchase-details");

            migrationBuilder.RenameTable(
                name: "purchases",
                newName: "Transfers");

            migrationBuilder.RenameTable(
                name: "purchase-details",
                newName: "TransferDetails");

            migrationBuilder.RenameIndex(
                name: "IX_purchases_UserId",
                table: "Transfers",
                newName: "IX_Transfers_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_purchases_ModifierId",
                table: "Transfers",
                newName: "IX_Transfers_ModifierId");

            migrationBuilder.RenameIndex(
                name: "IX_purchases_BranchId",
                table: "Transfers",
                newName: "IX_Transfers_BranchId");

            migrationBuilder.RenameIndex(
                name: "IX_purchase-details_TransferId",
                table: "TransferDetails",
                newName: "IX_TransferDetails_TransferId");

            migrationBuilder.RenameIndex(
                name: "IX_purchase-details_ProductId",
                table: "TransferDetails",
                newName: "IX_TransferDetails_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_purchase-details_ModifierId",
                table: "TransferDetails",
                newName: "IX_TransferDetails_ModifierId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Transfers",
                table: "Transfers",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TransferDetails",
                table: "TransferDetails",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "sale",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedTime = table.Column<DateTime>(nullable: true),
                    UpdatedTime = table.Column<DateTime>(nullable: true),
                    ModifierId = table.Column<int>(nullable: true),
                    SaleDate = table.Column<DateTime>(nullable: false, defaultValueSql: "getdate()"),
                    CustomerId = table.Column<int>(nullable: true),
                    ChallanNo = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_sale", x => x.Id);
                    table.ForeignKey(
                        name: "FK_sale_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_sale_Users_ModifierId",
                        column: x => x.ModifierId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SaleDetails",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedTime = table.Column<DateTime>(nullable: true),
                    UpdatedTime = table.Column<DateTime>(nullable: true),
                    ModifierId = table.Column<int>(nullable: true),
                    SaleId = table.Column<int>(nullable: false),
                    ProductId = table.Column<int>(nullable: false),
                    Quantity = table.Column<decimal>(type: "decimal(15, 2)", nullable: true),
                    Rate = table.Column<decimal>(type: "decimal(15, 2)", nullable: true),
                    Amount = table.Column<decimal>(type: "decimal(15, 2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SaleDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SaleDetails_Users_ModifierId",
                        column: x => x.ModifierId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SaleDetails_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SaleDetails_sale_SaleId",
                        column: x => x.SaleId,
                        principalTable: "sale",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_sale_CustomerId",
                table: "sale",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_sale_ModifierId",
                table: "sale",
                column: "ModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_SaleDetails_ModifierId",
                table: "SaleDetails",
                column: "ModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_SaleDetails_ProductId",
                table: "SaleDetails",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_SaleDetails_SaleId",
                table: "SaleDetails",
                column: "SaleId");

            migrationBuilder.AddForeignKey(
                name: "FK_TransferDetails_Users_ModifierId",
                table: "TransferDetails",
                column: "ModifierId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TransferDetails_Products_ProductId",
                table: "TransferDetails",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_TransferDetails_Transfers_TransferId",
                table: "TransferDetails",
                column: "TransferId",
                principalTable: "Transfers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Transfers_Branches_BranchId",
                table: "Transfers",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Transfers_Users_ModifierId",
                table: "Transfers",
                column: "ModifierId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Transfers_Users_UserId",
                table: "Transfers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TransferDetails_Users_ModifierId",
                table: "TransferDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_TransferDetails_Products_ProductId",
                table: "TransferDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_TransferDetails_Transfers_TransferId",
                table: "TransferDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_Transfers_Branches_BranchId",
                table: "Transfers");

            migrationBuilder.DropForeignKey(
                name: "FK_Transfers_Users_ModifierId",
                table: "Transfers");

            migrationBuilder.DropForeignKey(
                name: "FK_Transfers_Users_UserId",
                table: "Transfers");

            migrationBuilder.DropTable(
                name: "SaleDetails");

            migrationBuilder.DropTable(
                name: "sale");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Transfers",
                table: "Transfers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TransferDetails",
                table: "TransferDetails");

            migrationBuilder.RenameTable(
                name: "Transfers",
                newName: "purchases");

            migrationBuilder.RenameTable(
                name: "TransferDetails",
                newName: "purchase-details");

            migrationBuilder.RenameIndex(
                name: "IX_Transfers_UserId",
                table: "purchases",
                newName: "IX_purchases_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Transfers_ModifierId",
                table: "purchases",
                newName: "IX_purchases_ModifierId");

            migrationBuilder.RenameIndex(
                name: "IX_Transfers_BranchId",
                table: "purchases",
                newName: "IX_purchases_BranchId");

            migrationBuilder.RenameIndex(
                name: "IX_TransferDetails_TransferId",
                table: "purchase-details",
                newName: "IX_purchase-details_TransferId");

            migrationBuilder.RenameIndex(
                name: "IX_TransferDetails_ProductId",
                table: "purchase-details",
                newName: "IX_purchase-details_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_TransferDetails_ModifierId",
                table: "purchase-details",
                newName: "IX_purchase-details_ModifierId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_purchases",
                table: "purchases",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_purchase-details",
                table: "purchase-details",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_purchase-details_Users_ModifierId",
                table: "purchase-details",
                column: "ModifierId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_purchase-details_Products_ProductId",
                table: "purchase-details",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_purchase-details_purchases_TransferId",
                table: "purchase-details",
                column: "TransferId",
                principalTable: "purchases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_purchases_Branches_BranchId",
                table: "purchases",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_purchases_Users_ModifierId",
                table: "purchases",
                column: "ModifierId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_purchases_Users_UserId",
                table: "purchases",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
