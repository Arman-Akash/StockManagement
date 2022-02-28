using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopManagement.Data.Migrations
{
    public partial class RecviedUserIdAddedInTransfer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ReceivedUserId",
                table: "Transfers",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transfers_ReceivedUserId",
                table: "Transfers",
                column: "ReceivedUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transfers_Users_ReceivedUserId",
                table: "Transfers",
                column: "ReceivedUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transfers_Users_ReceivedUserId",
                table: "Transfers");

            migrationBuilder.DropIndex(
                name: "IX_Transfers_ReceivedUserId",
                table: "Transfers");

            migrationBuilder.DropColumn(
                name: "ReceivedUserId",
                table: "Transfers");
        }
    }
}
