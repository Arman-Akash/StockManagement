using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopManagement.Data.Migrations
{
    public partial class ProductReceiveTableAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Branches_ModifierId",
                table: "Branches");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Units",
                maxLength: 100,
                nullable: true,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "SubType",
                table: "ProductSubTypes",
                maxLength: 100,
                nullable: true,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Customers",
                maxLength: 100,
                nullable: true,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "MobileNo",
                table: "Customers",
                maxLength: 500,
                nullable: true,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Details",
                table: "Customers",
                maxLength: 500,
                nullable: true,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Customers",
                maxLength: 100,
                nullable: true,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "ProductReceives",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedTime = table.Column<DateTime>(nullable: true),
                    UpdatedTime = table.Column<DateTime>(nullable: true),
                    ModifierId = table.Column<int>(nullable: true),
                    RcvDate = table.Column<DateTime>(nullable: false, defaultValueSql: "getdate()"),
                    ChallanNo = table.Column<string>(nullable: true),
                    RcvFrom = table.Column<string>(maxLength: 100, nullable: true, defaultValue: ""),
                    Comment = table.Column<string>(maxLength: 100, nullable: true, defaultValue: "")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductReceives", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductReceives_Users_ModifierId",
                        column: x => x.ModifierId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ProductReceiveDetails",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedTime = table.Column<DateTime>(nullable: true),
                    UpdatedTime = table.Column<DateTime>(nullable: true),
                    ModifierId = table.Column<int>(nullable: true),
                    ProductReceiveId = table.Column<int>(nullable: false),
                    ProductId = table.Column<int>(nullable: false),
                    Quantity = table.Column<decimal>(type: "decimal(15, 2)", nullable: false),
                    Rate = table.Column<decimal>(type: "decimal(15, 2)", nullable: true),
                    Amount = table.Column<decimal>(type: "decimal(15, 2)", nullable: true),
                    ManufactureDate = table.Column<DateTime>(nullable: true, defaultValueSql: "getdate()"),
                    ExpireDate = table.Column<DateTime>(nullable: true, defaultValueSql: "getdate()"),
                    ShelfNo = table.Column<string>(maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductReceiveDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductReceiveDetails_Users_ModifierId",
                        column: x => x.ModifierId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ProductReceiveDetails_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ProductReceiveDetails_ProductReceives_ProductReceiveId",
                        column: x => x.ProductReceiveId,
                        principalTable: "ProductReceives",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_BranchId",
                table: "Users",
                column: "BranchId");

            migrationBuilder.CreateIndex(
                name: "IX_Units_Name",
                table: "Units",
                column: "Name",
                unique: true,
                filter: "[Name] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Branches_ModifierId",
                table: "Branches",
                column: "ModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductReceiveDetails_ModifierId",
                table: "ProductReceiveDetails",
                column: "ModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductReceiveDetails_ProductId",
                table: "ProductReceiveDetails",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductReceiveDetails_ProductReceiveId",
                table: "ProductReceiveDetails",
                column: "ProductReceiveId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductReceives_ModifierId",
                table: "ProductReceives",
                column: "ModifierId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Branches_BranchId",
                table: "Users",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Branches_BranchId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "ProductReceiveDetails");

            migrationBuilder.DropTable(
                name: "ProductReceives");

            migrationBuilder.DropIndex(
                name: "IX_Users_BranchId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Units_Name",
                table: "Units");

            migrationBuilder.DropIndex(
                name: "IX_Branches_ModifierId",
                table: "Branches");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Units",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 100,
                oldNullable: true,
                oldDefaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "SubType",
                table: "ProductSubTypes",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 100,
                oldNullable: true,
                oldDefaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Customers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 100,
                oldNullable: true,
                oldDefaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "MobileNo",
                table: "Customers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 500,
                oldNullable: true,
                oldDefaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "Details",
                table: "Customers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 500,
                oldNullable: true,
                oldDefaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Customers",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 100,
                oldNullable: true,
                oldDefaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Branches_ModifierId",
                table: "Branches",
                column: "ModifierId",
                unique: true,
                filter: "[ModifierId] IS NOT NULL");
        }
    }
}
