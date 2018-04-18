using System;
using System.Collections.Generic;
using System.Data.OleDb;
using System.Linq;
using System.Web;

namespace CollegeAPP.backHTML
{
    /// <summary>
    /// upUserPhoto 的摘要说明
    /// </summary>
    public class upUserPhoto : IHttpHandler
    {
        public static string ConnectionString = System.Configuration.ConfigurationManager.AppSettings["OLEDB_connString"];
        public void ProcessRequest(HttpContext context)
        {
            var info_id = context.Request.QueryString["info_id"];
            var userType = context.Request.QueryString["userType"];
            //System.Drawing.Image img1 = System.Drawing.Image.FromStream(context.Request.InputStream);
            string path = AppDomain.CurrentDomain.SetupInformation.ApplicationBase + @"\staticresource\userphoto\";
            System.Drawing.Image img1 = System.Drawing.Image.FromStream(HttpContext.Current.Request.InputStream);
            string guid = Guid.NewGuid().ToString();
            string fileFullPath = guid + "_orgin.jpg";
            img1.Save(path + fileFullPath, System.Drawing.Imaging.ImageFormat.Jpeg);
            using (OleDbConnection conn = new OleDbConnection(ConnectionString))
            {
                conn.Open();
                OleDbCommand comm = conn.CreateCommand();
                string sql = "update jw_xyxx set userphoto=:userphoto where info_id=:info_id";
                if (userType == "teacher")
                {
                    sql = "update g_users set userphoto=:userphoto where id=:info_id";
                }
                comm.CommandText = sql;
                comm.Parameters.Add(new OleDbParameter("userphoto", guid+".jpg"));
                comm.Parameters.Add(new OleDbParameter("info_id", info_id));
                comm.ExecuteNonQuery();
            }
            picture.MakeThumbnail(path + fileFullPath, path + fileFullPath.Replace("_orgin",""), 200, 200, "W", "JPG");
            context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(new {  message = "上传成功", result = true, fileFullPath = fileFullPath.Replace("_orgin","") }));
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}