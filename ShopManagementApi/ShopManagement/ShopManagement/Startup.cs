using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Rotativa.AspNetCore;
using ShopManagement.Data;
using ShopManagement.Entity.ServiceModels;
using ShopManagement.Repository;
using ShopManagement.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopManagement
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                // this defines a CORS policy called "default"
                options.AddPolicy("default", policy =>
                {
                    policy.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();

                    //policy.WithOrigins("https://localhost:3000")
                    //    .AllowAnyHeader()
                    //    .AllowAnyMethod();
                });
            });
            var connectionString = Configuration.GetConnectionString(nameof(ShopManagementDbContext));
            services.AddDbContextPool<ShopManagementDbContext>(options =>
                options.UseSqlServer(connectionString)
            );

            services.AddHttpContextAccessor();
            services.AddScoped<ILogError, LogError>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped<IReceiveRepository, ReceiveRepository>();
            services.AddScoped<ITransferRepository, TransferRepository>();


            var authConfiguration = Configuration.GetSection("AuthConfiguration");

            services.Configure<AuthConfiguration>(authConfiguration);
            var authConfig = authConfiguration.Get<AuthConfiguration>();

            services.AddAuthentication("Bearer")
                .AddJwtBearer(jwtBearerOptions =>
                {
                    jwtBearerOptions.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateActor = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = authConfig.Issuer,
                        ValidAudience = authConfig.Audience,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authConfig.SigningKey))
                    };
                });

            services.AddControllersWithViews().AddNewtonsoftJson(option =>
            {
                option.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;

                option.SerializerSettings.DateFormatString = "dd-MMM-yyyy";

                //option.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseStaticFiles();

            app.UseCors("default");

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            RotativaConfiguration.Setup(env.WebRootPath);
        }
    }
}
