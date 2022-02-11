using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopManagement.Data.Migrations
{
    public partial class ProductReceiveTableChange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductReceiveDetails_ProductReceives_ProductReceiveId",
                table: "ProductReceiveDetails");

            migrationBuilder.DropIndex(
                name: "IX_ProductReceiveDetails_ProductReceiveId",
                table: "ProductReceiveDetails");

            migrationBuilder.DropColumn(
                name: "ProductReceiveId",
                table: "ProductReceiveDetails");

            migrationBuilder.AddColumn<int>(
                name: "ReceiveId",
                table: "ProductReceiveDetails",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ProductReceiveDetails_ReceiveId",
                table: "ProductReceiveDetails",
                column: "ReceiveId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductReceiveDetails_ProductReceives_ReceiveId",
                table: "ProductReceiveDetails",
                column: "ReceiveId",
                principalTable: "ProductReceives",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductReceiveDetails_ProductReceives_ReceiveId",
                table: "ProductReceiveDetails");

            migrationBuilder.DropIndex(
                name: "IX_ProductReceiveDetails_ReceiveId",
                table: "ProductReceiveDetails");

            migrationBuilder.DropColumn(
                name: "ReceiveId",
                table: "ProductReceiveDetails");

            migrationBuilder.AddColumn<int>(
                name: "ProductReceiveId",
                table: "ProductReceiveDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ProductReceiveDetails_ProductReceiveId",
                table: "ProductReceiveDetails",
                column: "ProductReceiveId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductReceiveDetails_ProductReceives_ProductReceiveId",
                table: "ProductReceiveDetails",
                column: "ProductReceiveId",
                principalTable: "ProductReceives",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
