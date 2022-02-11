using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopManagement.Data.Migrations
{
    public partial class ProductReceiveTableChange2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductReceiveDetails_Users_ModifierId",
                table: "ProductReceiveDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductReceiveDetails_Products_ProductId",
                table: "ProductReceiveDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductReceiveDetails_ProductReceives_ReceiveId",
                table: "ProductReceiveDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductReceives_Users_ModifierId",
                table: "ProductReceives");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductReceives",
                table: "ProductReceives");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductReceiveDetails",
                table: "ProductReceiveDetails");

            migrationBuilder.RenameTable(
                name: "ProductReceives",
                newName: "Receives");

            migrationBuilder.RenameTable(
                name: "ProductReceiveDetails",
                newName: "ReceiveDetails");

            migrationBuilder.RenameIndex(
                name: "IX_ProductReceives_ModifierId",
                table: "Receives",
                newName: "IX_Receives_ModifierId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductReceiveDetails_ReceiveId",
                table: "ReceiveDetails",
                newName: "IX_ReceiveDetails_ReceiveId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductReceiveDetails_ProductId",
                table: "ReceiveDetails",
                newName: "IX_ReceiveDetails_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_ProductReceiveDetails_ModifierId",
                table: "ReceiveDetails",
                newName: "IX_ReceiveDetails_ModifierId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Receives",
                table: "Receives",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ReceiveDetails",
                table: "ReceiveDetails",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ReceiveDetails_Users_ModifierId",
                table: "ReceiveDetails",
                column: "ModifierId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ReceiveDetails_Products_ProductId",
                table: "ReceiveDetails",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ReceiveDetails_Receives_ReceiveId",
                table: "ReceiveDetails",
                column: "ReceiveId",
                principalTable: "Receives",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Receives_Users_ModifierId",
                table: "Receives",
                column: "ModifierId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReceiveDetails_Users_ModifierId",
                table: "ReceiveDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_ReceiveDetails_Products_ProductId",
                table: "ReceiveDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_ReceiveDetails_Receives_ReceiveId",
                table: "ReceiveDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_Receives_Users_ModifierId",
                table: "Receives");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Receives",
                table: "Receives");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ReceiveDetails",
                table: "ReceiveDetails");

            migrationBuilder.RenameTable(
                name: "Receives",
                newName: "ProductReceives");

            migrationBuilder.RenameTable(
                name: "ReceiveDetails",
                newName: "ProductReceiveDetails");

            migrationBuilder.RenameIndex(
                name: "IX_Receives_ModifierId",
                table: "ProductReceives",
                newName: "IX_ProductReceives_ModifierId");

            migrationBuilder.RenameIndex(
                name: "IX_ReceiveDetails_ReceiveId",
                table: "ProductReceiveDetails",
                newName: "IX_ProductReceiveDetails_ReceiveId");

            migrationBuilder.RenameIndex(
                name: "IX_ReceiveDetails_ProductId",
                table: "ProductReceiveDetails",
                newName: "IX_ProductReceiveDetails_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_ReceiveDetails_ModifierId",
                table: "ProductReceiveDetails",
                newName: "IX_ProductReceiveDetails_ModifierId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductReceives",
                table: "ProductReceives",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductReceiveDetails",
                table: "ProductReceiveDetails",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductReceiveDetails_Users_ModifierId",
                table: "ProductReceiveDetails",
                column: "ModifierId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductReceiveDetails_Products_ProductId",
                table: "ProductReceiveDetails",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductReceiveDetails_ProductReceives_ReceiveId",
                table: "ProductReceiveDetails",
                column: "ReceiveId",
                principalTable: "ProductReceives",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductReceives_Users_ModifierId",
                table: "ProductReceives",
                column: "ModifierId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
