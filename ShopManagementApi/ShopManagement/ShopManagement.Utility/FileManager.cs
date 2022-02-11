using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ShopManagement.Utility
{
    public static class FileManager
    {
        private static readonly string[] _allowedDocTypes = new string[] { "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/octet-stream", "application/msword",
        "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation"};
        private static readonly string[] _allowedImageTypes = new string[] { "image/jpeg", "image/png" };

        public static List<string> UploadImage(string folder, IFormFileCollection imageCollection)
        {
            List<string> fileNames = new List<string>();

            foreach (var img in imageCollection)
            {
                if (img != null)
                {
                    if (img.Length > 0 && img.IsVerified(_allowedImageTypes))
                    {
                        string fileName = $"{Guid.NewGuid()}{Path.GetExtension(img.FileName)}";
                        fileNames.Add(fileName);
                        string absoluteFilePath = Path.Combine(folder, fileName);

                        using (Image image = Image.FromStream(img.OpenReadStream()))
                        {
                            //compress the image size and save
                            int _size = image.Width < 1080 ? image.Width : 1080;
                            try
                            {
                                image.Resize(_size).Save(absoluteFilePath, image.RawFormat);
                            }
                            catch (Exception exp)
                            {
                                throw exp;
                                //new LogError().Error(exp);
                            }
                        }
                    }
                }
            }

            return fileNames;
        }

        public static async Task<string> UploadFile(string folder, IFormFile file)
        {
            string fileName;
            if (file.Length > 0 && (file.IsVerified(_allowedDocTypes) || file.IsVerified(_allowedImageTypes)))
            {
                fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
                string absoluteFilePath = Path.Combine(folder, fileName);

                using (var stream = new FileStream(absoluteFilePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }
            else
                return string.Empty;

            return fileName;
        }

        public static async Task<string> UploadVideo(string folder, IFormFile video)
        {
            string fileName = "";

            if (video.Length > 0)
            {
                fileName = $"{Guid.NewGuid()}{Path.GetExtension(video.FileName)}";
                string absoluteFilePath = Path.Combine(folder, fileName);

                using (var stream = new FileStream(absoluteFilePath, FileMode.Create))
                {
                    await video.CopyToAsync(stream);
                }
            }

            return fileName;
        }

        public static void DeleteFile(params string[] files)
        {
            foreach (var absoluteFilePath in files)
            {
                if (File.Exists(absoluteFilePath))
                {
                    try
                    {
                        File.Delete(absoluteFilePath);
                    }
                    catch (IOException exception)
                    {
                        throw;
                    }
                }
            }
        }

        public static async Task<Stream> DownloadFile(string filePath)
        {
            try
            {
                byte[] result;

                using (FileStream SourceStream = File.Open(filePath, FileMode.Open))
                {
                    result = new byte[SourceStream.Length];
                    await SourceStream.ReadAsync(result, 0, (int)SourceStream.Length);
                }

                Stream stream = new MemoryStream(result);

                return stream;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        private static bool IsVerified(this IFormFile file, string[] allowedTypes)
        {
            if (allowedTypes.Contains(file.ContentType))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
