﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CollegeAPP.backHTML
{
    public static class picture
    {
        /// <summary>
        /// 生成缩略图
        /// </summary>
        /// <param name="originalImagePath">源图路径（物理路径）</param>
        /// <param name="thumbnailPath">缩略图路径（物理路径）</param>
        /// <param name="width">缩略图宽度</param>
        /// <param name="height">缩略图高度</param>
        /// <param name="mode">生成缩略图的方式</param> 
        public static void MakeThumbnail(string originalImagePath, string thumbnailPath, int width, int height, string mode, string type)
        {
            System.Drawing.Image originalImage = System.Drawing.Image.FromFile(originalImagePath);

            int towidth = width;
            int toheight = height;

            int x = 0;
            int y = 0;
            int ow = originalImage.Width;
            int oh = originalImage.Height;

            switch (mode)
            {
                case "HW"://指定高宽缩放（可能变形） 
                    break;
                case "W"://指定宽，高按比例 
                    toheight = originalImage.Height * width / originalImage.Width;
                    break;
                case "H"://指定高，宽按比例
                    towidth = originalImage.Width * height / originalImage.Height;
                    break;
                case "Cut"://指定高宽裁减（不变形） 
                    if ((double)originalImage.Width / (double)originalImage.Height > (double)towidth / (double)toheight)
                    {
                        oh = originalImage.Height;
                        ow = originalImage.Height * towidth / toheight;
                        y = 0;
                        x = (originalImage.Width - ow) / 2;
                    }
                    else
                    {
                        ow = originalImage.Width;
                        oh = originalImage.Width * height / towidth;
                        x = 0;
                        y = (originalImage.Height - oh) / 2;
                    }
                    break;
                case "DB"://等比缩放（不变形，如果高大按高，宽大按宽缩放） 
                    if ((double)originalImage.Width / (double)towidth < (double)originalImage.Height / (double)toheight)
                    {
                        toheight = height;
                        towidth = originalImage.Width * height / originalImage.Height;
                    }
                    else
                    {
                        towidth = width;
                        toheight = originalImage.Height * width / originalImage.Width;
                    }
                    break;
                case "BD"://等比缩放（不变形，如果高大按高，宽大按宽缩放） 

                    towidth = originalImage.Width * height / originalImage.Height;

                    toheight = originalImage.Height * width / originalImage.Width;

                    break;
                default:
                    break;
            }

            //新建一个bmp图片
            System.Drawing.Image bitmap = new System.Drawing.Bitmap(towidth, toheight);

            //新建一个画板
            System.Drawing.Graphics g = System.Drawing.Graphics.FromImage(bitmap);

            //设置高质量插值法
            g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.High;

            //设置高质量,低速度呈现平滑程度
            g.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;

            //清空画布并以透明背景色填充
            g.Clear(System.Drawing.Color.Transparent);

            //在指定位置并且按指定大小绘制原图片的指定部分
            g.DrawImage(originalImage, new System.Drawing.Rectangle(0, 0, towidth, toheight),
            new System.Drawing.Rectangle(x, y, ow, oh),
            System.Drawing.GraphicsUnit.Pixel);

            try
            {
                //保存缩略图
                if (type == "JPG")
                {
                    bitmap.Save(thumbnailPath, System.Drawing.Imaging.ImageFormat.Jpeg);
                }
                if (type == "BMP")
                {
                    bitmap.Save(thumbnailPath, System.Drawing.Imaging.ImageFormat.Bmp);
                }
                if (type == "GIF")
                {
                    bitmap.Save(thumbnailPath, System.Drawing.Imaging.ImageFormat.Gif);
                }
                if (type == "PNG")
                {
                    bitmap.Save(thumbnailPath, System.Drawing.Imaging.ImageFormat.Png);
                }
            }
            catch (System.Exception e)
            {
                throw e;
            }
            finally
            {
                originalImage.Dispose();
                bitmap.Dispose();
                g.Dispose();
            }
        }
    }
}