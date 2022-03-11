using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopManagement.Data.Migrations
{
    public partial class AmountAddedInSaleTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChallanNo",
                table: "Sales");

            migrationBuilder.AddColumn<decimal>(
                name: "Amount",
                table: "Sales",
                type: "decimal(15, 2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "BillNo",
                table: "Sales",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OrderNo",
                table: "Sales",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TransactionType",
                table: "Sales",
                maxLength: 100,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Sales");

            migrationBuilder.DropColumn(
                name: "BillNo",
                table: "Sales");

            migrationBuilder.DropColumn(
                name: "OrderNo",
                table: "Sales");

            migrationBuilder.DropColumn(
                name: "TransactionType",
                table: "Sales");

            migrationBuilder.AddColumn<string>(
                name: "ChallanNo",
                table: "Sales",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
