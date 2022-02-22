using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopManagement.Data.Migrations
{
    public partial class TransferedBranchId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TransferedBranchId",
                table: "Transfers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Transfers_TransferedBranchId",
                table: "Transfers",
                column: "TransferedBranchId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transfers_Branches_TransferedBranchId",
                table: "Transfers",
                column: "TransferedBranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transfers_Branches_TransferedBranchId",
                table: "Transfers");

            migrationBuilder.DropIndex(
                name: "IX_Transfers_TransferedBranchId",
                table: "Transfers");

            migrationBuilder.DropColumn(
                name: "TransferedBranchId",
                table: "Transfers");
        }
    }
}
