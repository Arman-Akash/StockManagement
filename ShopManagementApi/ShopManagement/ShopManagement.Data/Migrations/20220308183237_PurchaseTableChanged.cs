using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopManagement.Data.Migrations
{
    public partial class PurchaseTableChanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChallanNo",
                table: "Purchases");

            migrationBuilder.DropColumn(
                name: "RcvSerNo",
                table: "Purchases");

            migrationBuilder.AddColumn<DateTime>(
                name: "BillOfEntryDate",
                table: "Purchases",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BillOfEntryNo",
                table: "Purchases",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LcNumber",
                table: "Purchases",
                maxLength: 100,
                nullable: true,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BillOfEntryDate",
                table: "Purchases");

            migrationBuilder.DropColumn(
                name: "BillOfEntryNo",
                table: "Purchases");

            migrationBuilder.DropColumn(
                name: "LcNumber",
                table: "Purchases");

            migrationBuilder.AddColumn<string>(
                name: "ChallanNo",
                table: "Purchases",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RcvSerNo",
                table: "Purchases",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
