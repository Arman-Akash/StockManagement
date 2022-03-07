using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopManagement.Data.Migrations
{
    public partial class ReceiveFieldChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChallanNo",
                table: "Receives");

            migrationBuilder.DropColumn(
                name: "RcvSerNo",
                table: "Receives");

            migrationBuilder.AddColumn<DateTime>(
                name: "BillOfEntryDate",
                table: "Receives",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BillOfEntryNo",
                table: "Receives",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LcNumber",
                table: "Receives",
                maxLength: 100,
                nullable: true,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BillOfEntryDate",
                table: "Receives");

            migrationBuilder.DropColumn(
                name: "BillOfEntryNo",
                table: "Receives");

            migrationBuilder.DropColumn(
                name: "LcNumber",
                table: "Receives");

            migrationBuilder.AddColumn<string>(
                name: "ChallanNo",
                table: "Receives",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RcvSerNo",
                table: "Receives",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
