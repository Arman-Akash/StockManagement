﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopManagement.Data.Migrations
{
    public partial class CustomerDueAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "PaidAmount",
                table: "Sales",
                type: "decimal(15, 2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateTable(
                name: "CustomerDues",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedTime = table.Column<DateTime>(nullable: true),
                    UpdatedTime = table.Column<DateTime>(nullable: true),
                    ModifierId = table.Column<int>(nullable: true),
                    CustomerId = table.Column<int>(nullable: false),
                    CreditAmount = table.Column<decimal>(type: "decimal(15, 2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomerDues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CustomerDues_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CustomerDues_Users_ModifierId",
                        column: x => x.ModifierId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CustomerDues_CustomerId",
                table: "CustomerDues",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_CustomerDues_ModifierId",
                table: "CustomerDues",
                column: "ModifierId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomerDues");

            migrationBuilder.DropColumn(
                name: "PaidAmount",
                table: "Sales");
        }
    }
}
