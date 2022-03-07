using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopManagement.Data.Migrations
{
    public partial class CustomerDuetableChangeToPaymentReceive : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChallanNo",
                table: "CustomerDues");

            migrationBuilder.DropColumn(
                name: "CreditDate",
                table: "CustomerDues");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "CustomerDues");

            migrationBuilder.AddColumn<string>(
                name: "Bank",
                table: "CustomerDues",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BankBranchName",
                table: "CustomerDues",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "CustomerDues",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "InvoiceDate",
                table: "CustomerDues",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "InvoiceNo",
                table: "CustomerDues",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "No",
                table: "CustomerDues",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "PaidBy",
                table: "CustomerDues",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "PaymentDate",
                table: "CustomerDues",
                nullable: false,
                defaultValueSql: "getdate()");

            migrationBuilder.AddColumn<string>(
                name: "PaymentType",
                table: "CustomerDues",
                maxLength: 100,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Bank",
                table: "CustomerDues");

            migrationBuilder.DropColumn(
                name: "BankBranchName",
                table: "CustomerDues");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "CustomerDues");

            migrationBuilder.DropColumn(
                name: "InvoiceDate",
                table: "CustomerDues");

            migrationBuilder.DropColumn(
                name: "InvoiceNo",
                table: "CustomerDues");

            migrationBuilder.DropColumn(
                name: "No",
                table: "CustomerDues");

            migrationBuilder.DropColumn(
                name: "PaidBy",
                table: "CustomerDues");

            migrationBuilder.DropColumn(
                name: "PaymentDate",
                table: "CustomerDues");

            migrationBuilder.DropColumn(
                name: "PaymentType",
                table: "CustomerDues");

            migrationBuilder.AddColumn<string>(
                name: "ChallanNo",
                table: "CustomerDues",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreditDate",
                table: "CustomerDues",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "getdate()");

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "CustomerDues",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);
        }
    }
}
