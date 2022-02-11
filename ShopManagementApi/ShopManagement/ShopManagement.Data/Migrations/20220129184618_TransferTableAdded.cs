using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopManagement.Data.Migrations
{
    public partial class TransferTableAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "purchases",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedTime = table.Column<DateTime>(nullable: true),
                    UpdatedTime = table.Column<DateTime>(nullable: true),
                    ModifierId = table.Column<int>(nullable: true),
                    TransferDate = table.Column<DateTime>(nullable: false, defaultValueSql: "getdate()"),
                    BranchId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    RcvFlg = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_purchases", x => x.Id);
                    table.ForeignKey(
                        name: "FK_purchases_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_purchases_Users_ModifierId",
                        column: x => x.ModifierId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_purchases_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "purchase-details",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedTime = table.Column<DateTime>(nullable: true),
                    UpdatedTime = table.Column<DateTime>(nullable: true),
                    ModifierId = table.Column<int>(nullable: true),
                    TransferId = table.Column<int>(nullable: false),
                    ProductId = table.Column<int>(nullable: false),
                    Quantity = table.Column<decimal>(type: "decimal(15, 2)", nullable: false),
                    Rate = table.Column<decimal>(type: "decimal(15, 2)", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(15, 2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_purchase-details", x => x.Id);
                    table.ForeignKey(
                        name: "FK_purchase-details_Users_ModifierId",
                        column: x => x.ModifierId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_purchase-details_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_purchase-details_purchases_TransferId",
                        column: x => x.TransferId,
                        principalTable: "purchases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_purchase-details_ModifierId",
                table: "purchase-details",
                column: "ModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_purchase-details_ProductId",
                table: "purchase-details",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_purchase-details_TransferId",
                table: "purchase-details",
                column: "TransferId");

            migrationBuilder.CreateIndex(
                name: "IX_purchases_BranchId",
                table: "purchases",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_purchases_ModifierId",
                table: "purchases",
                column: "ModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_purchases_UserId",
                table: "purchases",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "purchase-details");

            migrationBuilder.DropTable(
                name: "purchases");
        }
    }
}
