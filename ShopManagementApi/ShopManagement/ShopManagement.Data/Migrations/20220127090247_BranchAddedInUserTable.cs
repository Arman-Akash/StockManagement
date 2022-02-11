using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopManagement.Data.Migrations
{
    public partial class BranchAddedInUserTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Branches_ModifierId",
                table: "Branches");

            migrationBuilder.AddColumn<int>(
                name: "BranchId",
                table: "Users",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Branches_ModifierId",
                table: "Branches",
                column: "ModifierId",
                unique: true,
                filter: "[ModifierId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Branches_ModifierId",
                table: "Branches");

            migrationBuilder.DropColumn(
                name: "BranchId",
                table: "Users");

            migrationBuilder.CreateIndex(
                name: "IX_Branches_ModifierId",
                table: "Branches",
                column: "ModifierId");
        }
    }
}
