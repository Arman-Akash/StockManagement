using System.Drawing;
using System.Drawing.Drawing2D;
using System.IO;


namespace ShopManagement.Utility
{
    public static class ImageHandler
    {
        public static Image Resize(this Image image, int size)
        {
            int width, height;

            if (image.Width > image.Height)
            {
                width = size;
                height = (int)((image.Height / (double)image.Width) * size);
            }
            else
            {
                height = size;
                width = (int)((image.Width / (double)image.Height) * size);
            }

            var resized = new Bitmap(width, height);

            using (var graphics = Graphics.FromImage(resized))
            {
                graphics.CompositingQuality = CompositingQuality.HighSpeed;
                graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                graphics.CompositingMode = CompositingMode.SourceCopy;
                graphics.DrawImage(image, 0, 0, width, height);
            }

            return resized;
        }

        public static byte[] ToByteArray(this Image image)
        {
            using (var stream = new MemoryStream())
            {
                image.Save(stream, image.RawFormat);
                return stream.ToArray();
            }
        }
    }
}