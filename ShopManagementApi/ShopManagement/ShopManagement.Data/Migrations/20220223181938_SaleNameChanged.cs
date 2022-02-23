using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopManagement.Data.Migrations
{
    public partial class SaleNameChanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_sale_Customers_CustomerId",
                table: "sale");

            migrationBuilder.DropForeignKey(
                name: "FK_sale_Users_ModifierId",
                table: "sale");

            migrationBuilder.DropForeignKey(
                name: "FK_SaleDetails_sale_SaleId",
                table: "SaleDetails");

            migrationBuilder.DropPrimaryKey(
                name: "PK_sale",
                table: "sale");

            migrationBuilder.RenameTable(
                name: "sale",
                newName: "Sales");

            migrationBuilder.RenameIndex(
                name: "IX_sale_ModifierId",
                table: "Sales",
                newName: "IX_Sales_ModifierId");

            migrationBuilder.RenameIndex(
                name: "IX_sale_CustomerId",
                table: "Sales",
                newName: "IX_Sales_CustomerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Sales",
                table: "Sales",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SaleDetails_Sales_SaleId",
                table: "SaleDetails",
                column: "SaleId",
                principalTable: "Sales",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Sales_Customers_CustomerId",
                table: "Sales",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Sales_Users_ModifierId",
                table: "Sales",
                column: "ModifierId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SaleDetails_Sales_SaleId",
                table: "SaleDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_Sales_Customers_CustomerId",
                table: "Sales");

            migrationBuilder.DropForeignKey(
                name: "FK_Sales_Users_ModifierId",
                table: "Sales");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Sales",
                table: "Sales");

            migrationBuilder.RenameTable(
                name: "Sales",
                newName: "sale");

            migrationBuilder.RenameIndex(
                name: "IX_Sales_ModifierId",
                table: "sale",
                newName: "IX_sale_ModifierId");

            migrationBuilder.RenameIndex(
                name: "IX_Sales_CustomerId",
                table: "sale",
                newName: "IX_sale_CustomerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_sale",
                table: "sale",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_sale_Customers_CustomerId",
                table: "sale",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_sale_Users_ModifierId",
                table: "sale",
                column: "ModifierId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_SaleDetails_sale_SaleId",
                table: "SaleDetails",
                column: "SaleId",
                principalTable: "sale",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
