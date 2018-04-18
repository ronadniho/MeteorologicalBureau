using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CollegeAPP.backHTML
{
    public partial class main : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // 判断 seesion 里面 含有值
            if (Session["info_id"] != null)
            {
                // 判断是否含有该选项的权限
                if (Regex.Matches(Session["user_role"].ToString(), "栏目管理").Count == 1)
                {
                    this.btnMenu.Visible = true;
                }
                if (Regex.Matches(Session["user_role"].ToString(), "内容管理").Count == 1)
                {
                    this.btnNews.Visible = true;
                }
                if (Regex.Matches(Session["user_role"].ToString(), "日志查询").Count == 1)
                {
                    this.btnLog.Visible = true;
                }
                if (Regex.Matches(Session["user_role"].ToString(), "统计分析").Count == 1)
                {
                    this.btnAnalysis.Visible = true;
                }
            }
            else
            {
                Response.Write("<Script Language=JavaScript>alert('请先登录后再进行操作！');</Script>");
                //Response.Redirect("Login.aspx");
                ClientScript.RegisterStartupScript(this.GetType(), "MyScript", "window.parent.location.href='Login.aspx';", true);
            }            
        }
    }
}