using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopManagement.Data.Migrations
{
    public partial class notNullQuantity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Rate",
                table: "SaleDetails",
                type: "decimal(15, 2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(15, 2)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "Quantity",
                table: "SaleDetails",
                type: "decimal(15, 2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(15, 2)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "Amount",
                table: "SaleDetails",
                type: "decimal(15, 2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(15, 2)",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Rate",
                table: "SaleDetails",
                type: "decimal(15, 2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(15, 2)");

            migrationBuilder.AlterColumn<decimal>(
                name: "Quantity",
                table: "SaleDetails",
                type: "decimal(15, 2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(15, 2)");

            migrationBuilder.AlterColumn<decimal>(
                name: "Amount",
                table: "SaleDetails",
                type: "decimal(15, 2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(15, 2)");
        }
    }
}
