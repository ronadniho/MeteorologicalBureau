using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.IO;
using System.Data.OleDb;

namespace CollegeAPP.UserAdmin
{
    public partial class userphoto : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            byte[] b = null;
            if (!string.IsNullOrEmpty(Request.QueryString["userid"]))
            {
                using (OleDbConnection conn = new OleDbConnection(System.Configuration.ConfigurationManager.AppSettings["OLEDB_connString"]))
                {
                    conn.Open();
                    OleDbCommand cmd = conn.CreateCommand();
                    try
                    {
                        string sql = "select zp from g_users where id=" + Request.QueryString["userid"];
                        cmd.CommandText = sql;
                        object obj = cmd.ExecuteScalar();
                        if (obj != null)
                        {
                            b = (byte[])obj;
                        }
                        else
                        {
                            b = new byte[0];
                        }
                        if (b.Length > 0)
                        {
                            Response.Clear();
                            Response.ContentType = "image/jpeg";
                            Response.BinaryWrite(b);
                        }
                        else
                        {
                            string path = Server.MapPath("../Images/tongxunlu.png");
                            b = File.ReadAllBytes(path);

                            Response.Clear();
                            Response.ContentType = "image/jpeg";
                            Response.BinaryWrite(b);
                        }
                    }
                    catch
                    { }
                    finally
                    {
                        conn.Close();
                    }
                }
            }
            if (b != null || b.Length > 0)
            {
                Response.End();
            }
        }
    }
}
