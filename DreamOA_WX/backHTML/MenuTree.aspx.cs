using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.OleDb;
using System.Configuration;
using System.Text;
using System.Text.RegularExpressions;
using System.Data;

namespace CollegeAPP.backHTML
{
    public partial class MenuTree : System.Web.UI.Page
    {
        protected StringBuilder TreeList = new StringBuilder();
        string Node;
        protected void Page_Load(object sender, EventArgs e)
        {
            // 判断 seesion 里面 含有值
            if (Session["info_id"] != null)
            {
                LoadPage();
            }
            else
            {
                Response.Write("<Script Language=JavaScript>alert('请先登录后再进行操作！');</Script>");
                //Response.Redirect("Login.aspx");
                ClientScript.RegisterStartupScript(this.GetType(), "MyScript", "window.parent.location.href='Login.aspx';", true);
            }
        }

        /// <summary>
        /// 获取config树的数据
        /// </summary>
        private void LoadPage()
        {
            string sql = "";
            sql = "select * from app_mobilemenu order by to_number(finfo_id) ,orderby";
            string Class;
            TreeList.Clear();
            try
            {
                    DataTable dt = new DataTable();
                    using (OleDbConnection cn = new OleDbConnection(System.Configuration.ConfigurationManager.AppSettings["OLEDB_connString"]))
                    {
                        OleDbDataAdapter ODA = new OleDbDataAdapter(sql, cn);
                        ODA.Fill(dt);
                        ODA.Dispose();
                    }
                    for (int i = 0; i < dt.Rows.Count; i++)
                    {
                        Class = dt.Rows[i]["title"].ToString();
                        Node = "{id:" + dt.Rows[i]["info_id"].ToString() + ", pId:" + dt.Rows[i]["finfo_id"].ToString() + ", name:\"" + Class + "\" , checkname:\"" + Class.ToUpper() + "\"},";
                        TreeList.Append(Node);//生成父节点 
                    }
                    //M_Comm.CommandText = sql;
                    //OleDbDataAdapter.d
                    //OleDbDataReader M_Reader = M_Comm.ExecuteReader();
                    //while (M_Reader.Read())
                    //{
                    //    Class = M_Reader["title"].ToString();
                    //    // 判断是否含有该选项的权限
                    //    if (Regex.Matches(Session["user_role"].ToString(), Class).Count == 1)
                    //    {
                    //        Node = "{id:" + M_Reader["info_id"].ToString() + ", pId:" + M_Reader["finfo_id"].ToString() + ", name:\"" + Class + "\" , checkname:\"" + Class.ToUpper() + "\"},";
                    //        TreeList.Append(Node);//生成父节点 
                    //    }
                    //}
                    treeAllJson.Value = TreeList.ToString().Trim(",".ToCharArray());//传至前台

            }
            catch (Exception e)
            {
            }
            finally
            {
            }

        }

        public void AddValue(DataTable dt, string keyValue)
        {
            DataRow[] rows = dt.Select(" info_id='" + keyValue + "' ");
            for (int i = 0; i < rows.Length; i++)
            {
                Node = "{id:" + rows[i]["info_id"].ToString() + ", pId:" + rows[i]["finfo_id"].ToString() + ", name:\"" + rows[i]["title"] + "\" , checkname:\"" + rows[i]["title"].ToString().ToUpper() + "\"},";
                TreeList.Append(Node);//生成父节点 

                AddValue(dt, rows[i]["finfo_id"].ToString());

            }
        }

        public void AddsonValue(DataTable dt, string keyValue)
        {
            string id = "";
            DataRow[] rows = dt.Select(" finfo_id in (" + keyValue + ") ");
            for (int i = 0; i < rows.Length; i++)
            {
                Node = "{id:" + rows[i]["info_id"].ToString() + ", pId:" + rows[i]["finfo_id"].ToString() + ", name:\"" + rows[i]["title"] + "\" , checkname:\"" + rows[i]["title"].ToString().ToUpper() + "\"},";
                TreeList.Append(Node);//生成父节点    
                id += rows[i]["info_id"].ToString() + ",";

            }
            if (rows.Length > 0)
            {
                AddsonValue(dt, id.Substring(0, id.Length - 1));
            }
        }
    }
}