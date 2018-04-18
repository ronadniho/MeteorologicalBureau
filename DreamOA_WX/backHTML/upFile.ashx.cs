using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.OleDb;
using System.IO;
using System.Net;
using System.Text;

namespace CollegeAPP.backHTML
{
    /// <summary>
    /// upFile 的摘要说明
    /// </summary>
    public class upFile : IHttpHandler
    {
        //以下字段配置在web.config
        private static string ftpServerIP = System.Configuration.ConfigurationManager.AppSettings["remoteFTP"];
        public static string ConnectionString = System.Configuration.ConfigurationManager.AppSettings["OLEDB_connString"];
        public void ProcessRequest(HttpContext context)
        {
            var file = context.Request.Files[0];
            var info_id = context.Request.Form["info_id"];
            var category = context.Request.Form["category"];
            //System.Drawing.Image img1 = System.Drawing.Image.FromStream(context.Request.InputStream);
            string path = AppDomain.CurrentDomain.SetupInformation.ApplicationBase + @"\staticresource\";
            var filename = file.FileName.Substring(file.FileName.LastIndexOf("."));
            var fileFullname = info_id + filename;
            if (category == "titlepic")
            {
                file.SaveAs(path + fileFullname);
                picture.MakeThumbnail(path + fileFullname, (path + fileFullname).Replace(info_id, info_id + "_mid"), 500, 0, "W", filename.ToUpper().Substring(1));
                picture.MakeThumbnail(path + fileFullname, (path + fileFullname).Replace(info_id, info_id + "_small"), 80, 80, "Cut", filename.ToUpper().Substring(1));

            }
            else
            {
                //file.SaveAs(path + fileFullname);
                Upload(file.InputStream, fileFullname);
                //file.SaveAs(System.Configuration.ConfigurationManager.AppSettings["remoteDisck"] + fileFullname);
            }
            using (OleDbConnection conn = new OleDbConnection(ConnectionString))
            {
                conn.Open();
                OleDbCommand comm = conn.CreateCommand();
                string sql = "update APP_VIDEOSTUDY set title_pic=:guid where info_id=:info_id";
                if (category == "video")
                {
                    sql = sql.Replace("title_pic", "VIDEOPATH");
                }
                comm.CommandText = sql;
                comm.Parameters.Add(new OleDbParameter("guid", fileFullname));
                comm.Parameters.Add(new OleDbParameter("info_id", info_id));
                comm.ExecuteNonQuery();
            }
            if (category == "video")
            {
                context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(new { videopath = fileFullname,info_id=info_id}));
            }

        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

        








        //ftp的上传功能
        private void Upload(Stream filestream,string filename)
        {

            string uri = "ftp://" + ftpServerIP + "/" +filename;
            FtpWebRequest reqFTP;

            // 根据uri创建FtpWebRequest对象 
            reqFTP = (FtpWebRequest)FtpWebRequest.Create(new Uri("ftp://" + ftpServerIP + "/" + filename));

            // ftp用户名和密码
            //reqFTP.Credentials = new NetworkCredential(ftpUserID, ftpPassword);

            // 默认为true，连接不会被关闭
            // 在一个命令之后被执行
            reqFTP.KeepAlive = false;

            // 指定执行什么命令
            reqFTP.Method = WebRequestMethods.Ftp.UploadFile;

            // 指定数据传输类型
            reqFTP.UseBinary = true;

            // 上传文件时通知服务器文件的大小
            reqFTP.ContentLength = filestream.Length;

            // 缓冲大小设置为2kb
            int buffLength = 4096;

            byte[] buff = new byte[buffLength];
            int contentLen;

            // 打开一个文件流 (System.IO.FileStream) 去读上传的文件
            Stream fs = filestream;
            try
            {
                // 把上传的文件写入流
                Stream strm = reqFTP.GetRequestStream();

                // 每次读文件流的2kb
                contentLen = fs.Read(buff, 0, buffLength);

                // 流内容没有结束
                while (contentLen != 0)
                {
                    // 把内容从file stream 写入 upload stream
                    strm.Write(buff, 0, contentLen);

                    contentLen = fs.Read(buff, 0, buffLength);
                }

                // 关闭两个流
                strm.Close();
                fs.Close();
                //this.Page.RegisterStartupScript("", "<script>alert('成功')</script>");
            }
            catch (Exception ex)
            {
                // MessageBox.Show(ex.Message, "Upload Error");
                //Response.Write("Upload Error：" + ex.Message);
            }
        }


        //从ftp服务器上下载文件的功能
        private void Download(string filePath, string fileName)
        {
            FtpWebRequest reqFTP;

            try
            {
                FileStream outputStream = new FileStream(filePath + "\\" + fileName, FileMode.Create);

                reqFTP = (FtpWebRequest)FtpWebRequest.Create(new Uri("ftp://" + ftpServerIP + "/" + fileName));

                reqFTP.Method = WebRequestMethods.Ftp.DownloadFile;

                reqFTP.UseBinary = true;

                //reqFTP.Credentials = new NetworkCredential(ftpUserID, ftpPassword);

                FtpWebResponse response = (FtpWebResponse)reqFTP.GetResponse();

                Stream ftpStream = response.GetResponseStream();

                long cl = response.ContentLength;

                int bufferSize = 2048;

                int readCount;

                byte[] buffer = new byte[bufferSize];

                readCount = ftpStream.Read(buffer, 0, bufferSize);

                while (readCount > 0)
                {
                    outputStream.Write(buffer, 0, readCount);

                    readCount = ftpStream.Read(buffer, 0, bufferSize);
                }

                ftpStream.Close();

                outputStream.Close();

                response.Close();
            }
            catch (Exception ex)
            {
                //Response.Write("Download Error：" + ex.Message);
            }
        }

        //从ftp服务器上获得文件列表
        public string[] GetFileList()
        {
            string[] downloadFiles;
            StringBuilder result = new StringBuilder();
            FtpWebRequest reqFTP;
            // HttpWebRequest reqFTP;
            try
            {
                reqFTP = (FtpWebRequest)FtpWebRequest.Create(new Uri("ftp://" + ftpServerIP + "/"));
                reqFTP.UseBinary = true;
                //reqFTP.Credentials = new NetworkCredential(ftpUserID, ftpPassword);
                reqFTP.Method = WebRequestMethods.Ftp.ListDirectory;
                WebResponse response = reqFTP.GetResponse();
                StreamReader reader = new StreamReader(response.GetResponseStream());
                string line = reader.ReadLine();
                while (line != null)
                {
                    result.Append(line);
                    result.Append("\n");
                    line = reader.ReadLine();
                }
                // to remove the trailing '\n'        
                result.Remove(result.ToString().LastIndexOf('\n'), 1);
                reader.Close();
                response.Close();
                return result.ToString().Split('\n');
            }
            catch (Exception ex)
            {
                downloadFiles = null;
                return downloadFiles;
            }
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            //Upload("F:\\美国队长DVD中字.rmvb");
        }
        protected void Button2_Click(object sender, EventArgs e)
        {

        }
    }

}