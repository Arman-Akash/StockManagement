using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopManagement.Data.Migrations
{
    public partial class RemarsAddedInSaleTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Remarks",
                table: "Sales",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ChequeNo",
                table: "PaymentReceives",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Remarks",
                table: "Sales");

            migrationBuilder.DropColumn(
                name: "ChequeNo",
                table: "PaymentReceives");
        }
    }
}
