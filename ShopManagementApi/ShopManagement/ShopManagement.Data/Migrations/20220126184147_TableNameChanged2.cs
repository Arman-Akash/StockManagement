using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopManagement.Data.Migrations
{
    public partial class TableNameChanged2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OpeningStock_Branches_BranchId",
                table: "OpeningStock");

            migrationBuilder.DropForeignKey(
                name: "FK_OpeningStock_Users_ModifierId",
                table: "OpeningStock");

            migrationBuilder.DropForeignKey(
                name: "FK_OpeningStock_Products_ProductId",
                table: "OpeningStock");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductSubType_Users_ModifierId",
                table: "ProductSubType");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductTypes_ProductSubType_ProductSubTypeId",
                table: "ProductTypes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductSubType",
                table: "ProductSubType");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OpeningStock",
                table: "OpeningStock");

            migrationBuilder.RenameTable(
                name: "ProductSubType",
                newName: "ProductSubTypes");

            migrationBuilder.RenameTable(
                name: "OpeningStock",
                newName: "OpeningStocks");

            migrationBuilder.RenameIndex(
                name: "IX_ProductSubType_ModifierId",
                table: "ProductSubTypes",
                newName: "IX_ProductSubTypes_ModifierId");

            migrationBuilder.RenameIndex(
                name: "IX_OpeningStock_ProductId",
                table: "OpeningStocks",
                newName: "IX_OpeningStocks_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_OpeningStock_ModifierId",
                table: "OpeningStocks",
                newName: "IX_OpeningStocks_ModifierId");

            migrationBuilder.RenameIndex(
                name: "IX_OpeningStock_BranchId",
                table: "OpeningStocks",
                newName: "IX_OpeningStocks_BranchId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductSubTypes",
                table: "ProductSubTypes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OpeningStocks",
                table: "OpeningStocks",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OpeningStocks_Branches_BranchId",
                table: "OpeningStocks",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OpeningStocks_Users_ModifierId",
                table: "OpeningStocks",
                column: "ModifierId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OpeningStocks_Products_ProductId",
                table: "OpeningStocks",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductSubTypes_Users_ModifierId",
                table: "ProductSubTypes",
                column: "ModifierId",
                principalTable: "Users",
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OpeningStocks_Branches_BranchId",
                table: "OpeningStocks");

            migrationBuilder.DropForeignKey(
                name: "FK_OpeningStocks_Users_ModifierId",
                table: "OpeningStocks");

            migrationBuilder.DropForeignKey(
                name: "FK_OpeningStocks_Products_ProductId",
                table: "OpeningStocks");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductSubTypes_Users_ModifierId",
                table: "ProductSubTypes");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductTypes_ProductSubTypes_ProductSubTypeId",
                table: "ProductTypes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductSubTypes",
                table: "ProductSubTypes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_OpeningStocks",
                table: "OpeningStocks");

            migrationBuilder.RenameTable(
                name: "ProductSubTypes",
                newName: "ProductSubType");

            migrationBuilder.RenameTable(
                name: "OpeningStocks",
                newName: "OpeningStock");

            migrationBuilder.RenameIndex(
                name: "IX_ProductSubTypes_ModifierId",
                table: "ProductSubType",
                newName: "IX_ProductSubType_ModifierId");

            migrationBuilder.RenameIndex(
                name: "IX_OpeningStocks_ProductId",
                table: "OpeningStock",
                newName: "IX_OpeningStock_ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_OpeningStocks_ModifierId",
                table: "OpeningStock",
                newName: "IX_OpeningStock_ModifierId");

            migrationBuilder.RenameIndex(
                name: "IX_OpeningStocks_BranchId",
                table: "OpeningStock",
                newName: "IX_OpeningStock_BranchId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductSubType",
                table: "ProductSubType",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OpeningStock",
                table: "OpeningStock",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_OpeningStock_Branches_BranchId",
                table: "OpeningStock",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OpeningStock_Users_ModifierId",
                table: "OpeningStock",
                column: "ModifierId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OpeningStock_Products_ProductId",
                table: "OpeningStock",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductSubType_Users_ModifierId",
                table: "ProductSubType",
                column: "ModifierId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProductTypes_ProductSubType_ProductSubTypeId",
                table: "ProductTypes",
                column: "ProductSubTypeId",
                principalTable: "ProductSubType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
