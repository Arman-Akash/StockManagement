using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopManagement.Data.Migrations
{
    public partial class ProductTypeAndSubTypeNameChanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_ProductTypes_ProductTypeId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductTypes_ProductSubTypes_ProductSubTypeId",
                table: "ProductTypes");

            migrationBuilder.DropIndex(
                name: "IX_ProductTypes_ProductSubTypeId",
                table: "ProductTypes");

            migrationBuilder.DropIndex(
                name: "IX_Products_ProductTypeId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ProductSubTypeId",
                table: "ProductTypes");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "ProductTypes");

            migrationBuilder.DropColumn(
                name: "SubType",
                table: "ProductSubTypes");

            migrationBuilder.DropColumn(
                name: "ProductTypeId",
                table: "Products");

            migrationBuilder.AddColumn<int>(
                name: "ProductTypeId",
                table: "ProductTypes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "SubType",
                table: "ProductTypes",
                maxLength: 100,
                nullable: true,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "ProductSubTypes",
                maxLength: 100,
                nullable: true,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "ProductSubTypeId",
                table: "Products",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ProductTypes_ProductTypeId",
                table: "ProductTypes",
                column: "ProductTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_ProductSubTypeId",
                table: "Products",
                column: "ProductSubTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ProductTypes_ProductSubTypeId",
                table: "Products",
                column: "ProductSubTypeId",
                principalTable: "ProductTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductTypes_ProductSubTypes_ProductTypeId",
                table: "ProductTypes",
                column: "ProductTypeId",
                principalTable: "ProductSubTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_ProductTypes_ProductSubTypeId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductTypes_ProductSubTypes_ProductTypeId",
                table: "ProductTypes");

            migrationBuilder.DropIndex(
                name: "IX_ProductTypes_ProductTypeId",
                table: "ProductTypes");

            migrationBuilder.DropIndex(
                name: "IX_Products_ProductSubTypeId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ProductTypeId",
                table: "ProductTypes");

            migrationBuilder.DropColumn(
                name: "SubType",
                table: "ProductTypes");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "ProductSubTypes");

            migrationBuilder.DropColumn(
                name: "ProductSubTypeId",
                table: "Products");

            migrationBuilder.AddColumn<int>(
                name: "ProductSubTypeId",
                table: "ProductTypes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "ProductTypes",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SubType",
                table: "ProductSubTypes",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "ProductTypeId",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ProductTypes_ProductSubTypeId",
                table: "ProductTypes",
                column: "ProductSubTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_ProductTypeId",
                table: "Products",
                column: "ProductTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ProductTypes_ProductTypeId",
                table: "Products",
                column: "ProductTypeId",
                principalTable: "ProductTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductTypes_ProductSubTypes_ProductSubTypeId",
                table: "ProductTypes",
                column: "ProductSubTypeId",
                principalTable: "ProductSubTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
