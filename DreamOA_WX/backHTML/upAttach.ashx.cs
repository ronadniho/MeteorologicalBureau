using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.OleDb;
using System.IO;

namespace CollegeAPP.backHTML
{
    /// <summary>
    /// upAttach 的摘要说明
    /// </summary>
    public class upAttach : IHttpHandler
    {
        public static string ConnectionString = System.Configuration.ConfigurationManager.AppSettings["OLEDB_connString"];
        public void ProcessRequest(HttpContext context)
        {
            var file = context.Request.Files;
            var info_id = context.Request.Form["info_id"];
            //System.Drawing.Image img1 = System.Drawing.Image.FromStream(context.Request.InputStream);
            string path = AppDomain.CurrentDomain.SetupInformation.ApplicationBase + @"\staticresource\attach\";
            using (OleDbConnection conn = new OleDbConnection(ConnectionString))
            {
                conn.Open();
                OleDbCommand comm = conn.CreateCommand();
                //comm.CommandText = "delete APP_ATTACH where finfo_id=:finfo_id";
                //comm.Parameters.Add(new OleDbParameter("info_id", info_id));
                for (int i = 0; i < context.Request.Files.Count;i++ )
                {
                    var c = context.Request.Files[i];
                    var orignsname = c.FileName;
                    var filename = c.FileName.Substring(c.FileName.LastIndexOf("."));
                    var guid = Guid.NewGuid().ToString();
                    var fileFullname = guid + filename;
                    c.SaveAs(path+fileFullname);
                    comm.Parameters.Clear();
                    string sql = "insert into  APP_ATTACH (id,finfo_id,FILENAME,PATH,ORGINNAME) values (:id,:finfo_id,:FILENAME,:PATH,:ORGINNAME)";

                    comm.CommandText = sql;
                    comm.Parameters.Add(new OleDbParameter("id", guid));
                    comm.Parameters.Add(new OleDbParameter("finfo_id", info_id));
                    comm.Parameters.Add(new OleDbParameter("FILENAME", fileFullname));
                    comm.Parameters.Add(new OleDbParameter("PATH", path));
                    comm.Parameters.Add(new OleDbParameter("ORGINNAME", orignsname));
                    comm.ExecuteNonQuery();

                }

            }





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