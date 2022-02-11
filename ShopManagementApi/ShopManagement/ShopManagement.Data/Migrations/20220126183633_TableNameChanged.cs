using Microsoft.EntityFrameworkCore.Migrations;

namespace ShopManagement.Data.Migrations
{
    public partial class TableNameChanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_logs_Users_ModifierId",
                table: "logs");

            migrationBuilder.DropForeignKey(
                name: "FK_roles_Users_ModifierId",
                table: "roles");

            migrationBuilder.DropForeignKey(
                name: "FK_user-roles_Users_ModifierId",
                table: "user-roles");

            migrationBuilder.DropForeignKey(
                name: "FK_user-roles_roles_RoleId",
                table: "user-roles");

            migrationBuilder.DropForeignKey(
                name: "FK_user-roles_Users_UserId",
                table: "user-roles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_roles",
                table: "roles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_logs",
                table: "logs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_user-roles",
                table: "user-roles");

            migrationBuilder.RenameTable(
                name: "roles",
                newName: "Roles");

            migrationBuilder.RenameTable(
                name: "logs",
                newName: "Logs");

            migrationBuilder.RenameTable(
                name: "user-roles",
                newName: "UserRoles");

            migrationBuilder.RenameIndex(
                name: "IX_roles_ModifierId",
                table: "Roles",
                newName: "IX_Roles_ModifierId");

            migrationBuilder.RenameIndex(
                name: "IX_logs_ModifierId",
                table: "Logs",
                newName: "IX_Logs_ModifierId");

            migrationBuilder.RenameIndex(
                name: "IX_user-roles_UserId",
                table: "UserRoles",
                newName: "IX_UserRoles_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_user-roles_RoleId",
                table: "UserRoles",
                newName: "IX_UserRoles_RoleId");

            migrationBuilder.RenameIndex(
                name: "IX_user-roles_ModifierId",
                table: "UserRoles",
                newName: "IX_UserRoles_ModifierId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Roles",
                table: "Roles",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Logs",
                table: "Logs",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserRoles",
                table: "UserRoles",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Logs_Users_ModifierId",
                table: "Logs",
                column: "ModifierId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Roles_Users_ModifierId",
                table: "Roles",
                column: "ModifierId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserRoles_Users_ModifierId",
                table: "UserRoles",
                column: "ModifierId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserRoles_Roles_RoleId",
                table: "UserRoles",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserRoles_Users_UserId",
                table: "UserRoles",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Logs_Users_ModifierId",
                table: "Logs");

            migrationBuilder.DropForeignKey(
                name: "FK_Roles_Users_ModifierId",
                table: "Roles");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRoles_Users_ModifierId",
                table: "UserRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRoles_Roles_RoleId",
                table: "UserRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_UserRoles_Users_UserId",
                table: "UserRoles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Roles",
                table: "Roles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Logs",
                table: "Logs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserRoles",
                table: "UserRoles");

            migrationBuilder.RenameTable(
                name: "Roles",
                newName: "roles");

            migrationBuilder.RenameTable(
                name: "Logs",
                newName: "logs");

            migrationBuilder.RenameTable(
                name: "UserRoles",
                newName: "user-roles");

            migrationBuilder.RenameIndex(
                name: "IX_Roles_ModifierId",
                table: "roles",
                newName: "IX_roles_ModifierId");

            migrationBuilder.RenameIndex(
                name: "IX_Logs_ModifierId",
                table: "logs",
                newName: "IX_logs_ModifierId");

            migrationBuilder.RenameIndex(
                name: "IX_UserRoles_UserId",
                table: "user-roles",
                newName: "IX_user-roles_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserRoles_RoleId",
                table: "user-roles",
                newName: "IX_user-roles_RoleId");

            migrationBuilder.RenameIndex(
                name: "IX_UserRoles_ModifierId",
                table: "user-roles",
                newName: "IX_user-roles_ModifierId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_roles",
                table: "roles",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_logs",
                table: "logs",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_user-roles",
                table: "user-roles",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_logs_Users_ModifierId",
                table: "logs",
                column: "ModifierId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_roles_Users_ModifierId",
                table: "roles",
                column: "ModifierId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_user-roles_Users_ModifierId",
                table: "user-roles",
                column: "ModifierId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_user-roles_roles_RoleId",
                table: "user-roles",
                column: "RoleId",
                principalTable: "roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_user-roles_Users_UserId",
                table: "user-roles",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
