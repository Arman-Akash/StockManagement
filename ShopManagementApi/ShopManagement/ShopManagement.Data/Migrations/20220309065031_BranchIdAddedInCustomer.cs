using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopManagement.Data.Migrations
{
    public partial class BranchIdAddedInCustomer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomerDues_Branches_BranchId",
                table: "CustomerDues");

            migrationBuilder.DropForeignKey(
                name: "FK_CustomerDues_Customers_CustomerId",
                table: "CustomerDues");

            migrationBuilder.DropForeignKey(
                name: "FK_CustomerDues_Users_ModifierId",
                table: "CustomerDues");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CustomerDues",
                table: "CustomerDues");

            migrationBuilder.RenameTable(
                name: "CustomerDues",
                newName: "PaymentReceives");

            migrationBuilder.RenameIndex(
                name: "IX_CustomerDues_ModifierId",
                table: "PaymentReceives",
                newName: "IX_PaymentReceives_ModifierId");

            migrationBuilder.RenameIndex(
                name: "IX_CustomerDues_CustomerId",
                table: "PaymentReceives",
                newName: "IX_PaymentReceives_CustomerId");

            migrationBuilder.RenameIndex(
                name: "IX_CustomerDues_BranchId",
                table: "PaymentReceives",
                newName: "IX_PaymentReceives_BranchId");

            migrationBuilder.AddColumn<int>(
                name: "BranchId",
                table: "Customers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_PaymentReceives",
                table: "PaymentReceives",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Customers_BranchId",
                table: "Customers",
                column: "BranchId");

            migrationBuilder.AddForeignKey(
                name: "FK_Customers_Branches_BranchId",
                table: "Customers",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PaymentReceives_Branches_BranchId",
                table: "PaymentReceives",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PaymentReceives_Customers_CustomerId",
                table: "PaymentReceives",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PaymentReceives_Users_ModifierId",
                table: "PaymentReceives",
                column: "ModifierId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Customers_Branches_BranchId",
                table: "Customers");

            migrationBuilder.DropForeignKey(
                name: "FK_PaymentReceives_Branches_BranchId",
                table: "PaymentReceives");

            migrationBuilder.DropForeignKey(
                name: "FK_PaymentReceives_Customers_CustomerId",
                table: "PaymentReceives");

            migrationBuilder.DropForeignKey(
                name: "FK_PaymentReceives_Users_ModifierId",
                table: "PaymentReceives");

            migrationBuilder.DropIndex(
                name: "IX_Customers_BranchId",
                table: "Customers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PaymentReceives",
                table: "PaymentReceives");

            migrationBuilder.DropColumn(
                name: "BranchId",
                table: "Customers");

            migrationBuilder.RenameTable(
                name: "PaymentReceives",
                newName: "CustomerDues");

            migrationBuilder.RenameIndex(
                name: "IX_PaymentReceives_ModifierId",
                table: "CustomerDues",
                newName: "IX_CustomerDues_ModifierId");

            migrationBuilder.RenameIndex(
                name: "IX_PaymentReceives_CustomerId",
                table: "CustomerDues",
                newName: "IX_CustomerDues_CustomerId");

            migrationBuilder.RenameIndex(
                name: "IX_PaymentReceives_BranchId",
                table: "CustomerDues",
                newName: "IX_CustomerDues_BranchId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CustomerDues",
                table: "CustomerDues",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerDues_Branches_BranchId",
                table: "CustomerDues",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerDues_Customers_CustomerId",
                table: "CustomerDues",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerDues_Users_ModifierId",
                table: "CustomerDues",
                column: "ModifierId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
