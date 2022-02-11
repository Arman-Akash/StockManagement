using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ShopManagement.Entity.ViewModels
{
    public class ChangePassword
    {
        [Required]
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
