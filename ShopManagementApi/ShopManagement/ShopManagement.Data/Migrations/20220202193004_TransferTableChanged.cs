using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopManagement.Data.Migrations
{
    public partial class TransferTableChanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Products_ProductName",
                table: "Products");

            migrationBuilder.AddColumn<string>(
                name: "Details",
                table: "Transfers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TransferChallan",
                table: "Transfers",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "VehicleNo",
                table: "Transfers",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transfers_TransferChallan",
                table: "Transfers",
                column: "TransferChallan",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Transfers_TransferChallan",
                table: "Transfers");

            migrationBuilder.DropColumn(
                name: "Details",
                table: "Transfers");

            migrationBuilder.DropColumn(
                name: "TransferChallan",
                table: "Transfers");

            migrationBuilder.DropColumn(
                name: "VehicleNo",
                table: "Transfers");

            migrationBuilder.CreateIndex(
                name: "IX_Products_ProductName",
                table: "Products",
                column: "ProductName",
                unique: true);
        }
    }
}
