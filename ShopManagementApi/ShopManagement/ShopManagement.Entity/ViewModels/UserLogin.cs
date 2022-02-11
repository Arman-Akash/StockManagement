using ShopManagement.Entity.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ShopManagement.Entity.ViewModels
{
    public class UserLogin
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
        public int BranchId { get; set; }
        public string Permissions { get; set; }
        public string Token { get; set; }
    }
}
