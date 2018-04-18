using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.OleDb;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CollegeAPP.backHTML
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        public static string MD5(string str)
        {
            byte[] b = Encoding.Default.GetBytes(str);
            b = new MD5CryptoServiceProvider().ComputeHash(b);
            string ret = "";
            for (int i = 0; i < b.Length; i++)
                ret += b[i].ToString("x").PadLeft(2, '0');
            return ret;
        }

        /// <summary>
        /// 登录验证密码
        /// </summary>
        /// <param name="LoginName"></param>
        /// <param name="PassWord"></param>
        /// <param name="PassWord21"></param>
        /// <param name="_strScript"></param>
        /// <returns></returns>
        public bool CheckLogin(string LoginName, string PassWord)
        {
            string sSql = "";
            OleDbCommand M_Comm = new OleDbCommand();
            OleDbConnection M_Conn = new OleDbConnection(ConfigurationManager.AppSettings["OLEDB_connString"]);
            M_Conn.Open();
            M_Comm.Connection = M_Conn;
            try
            {
                string sLoginName = LoginName.Trim().ToUpper();
                string sPassWord = PassWord;

                sSql = "SELECT maincode,PSD,MD5PSD,ID,UTYPE,menuview,MENUTYPE,PAGECOLOR,UNAME,HAVE_LOGIN,LOGNAME,SKIN_ID,ISNATIVE,IP,STATUS,WORKNO,CWNO,AREACODE,MOBILE_EMAIL,EMAIL,KJJB  FROM G_USERS ";
                sSql += "WHERE (UPPER(LOGNAME)=? OR UNAME=? OR UPPER(LOGNAME_DEFAULT)=?) AND ISNATIVE=1 AND (STATUS>=0 OR STATUS=-2) AND UTYPE IN (0,9)"; //AND MAINCODE='"+TxtMainCode.Text.Trim().ToUpper()+"'";
                OleDbParameter[] parms = new OleDbParameter[] { 
					new OleDbParameter("LOGNAME",sLoginName),
					new OleDbParameter("UNAME",sLoginName),
					new OleDbParameter("LOGNAME_DEFAULT",sLoginName)
				};
                M_Comm.CommandText = sSql;
                M_Comm.Parameters.AddRange(parms);
                OleDbDataReader M_Reader = M_Comm.ExecuteReader();
                if (M_Reader.Read())
                {
                    //中埔没有通用密码登陆
                    if (M_Reader["MD5PSD"].ToString().ToUpper() == MD5(sPassWord).ToUpper())
                    {
                        Session["info_id"] = M_Reader["ID"].ToString().Trim();
                        Session["username"] = M_Reader["UNAME"].ToString().Trim();
                        Session["logname"] = M_Reader["LOGNAME"].ToString().Trim();
                        Session["PSD"] = M_Reader["PSD"].ToString().Trim();
                        Session["MD5PSD"] = M_Reader["MD5PSD"].ToString().Trim();
                        Session["mobile_email"] = M_Reader["mobile_email"].ToString().Trim();

                        //记录LOG时用到
                        Session["classid"] = "";
                        Session["classname"] = "";
                        Session["type"] = "teacher";
                    }
                }
                M_Conn.Close();
                OleDbCommand M_Comm2 = new OleDbCommand();
                M_Conn.Open();
                M_Comm2.Connection = M_Conn;
                if (Session["info_id"] != null)
                {
                    string strRoleList = "";
                    sSql = "SELECT DISTINCT B.UNAME FROM G_GRPS A,G_USERS B WHERE A.GRP_ID = B.ID AND B.STATUS >= 0 AND B.UTYPE = 3 AND A.USER_ID = " + Session["info_id"];
                    M_Comm2.CommandText = sSql;
                    OleDbDataReader M_Reader2 = M_Comm2.ExecuteReader();
                    while (M_Reader2.Read())
                    {
                        strRoleList += M_Reader2["UNAME"].ToString() + ",";
                    }
                    M_Conn.Close();
                    strRoleList += "全部人员,";
                    Session["user_role"] = strRoleList;
                    Session["userpowers"] = strRoleList;
                }
            }
            catch (System.IndexOutOfRangeException E)
            {
                M_Conn.Close();
                return false;
            }
            finally
            {
                M_Conn.Close();
            }
            //Session["maincode"] = "";
            return true;
        }

        protected void btnLogin_Click(object sender, EventArgs e)
        {
            if (CheckLogin(txtName.Text.Trim(), txtPsd.Value.Trim()))
            {
                Response.Redirect("main.aspx");
            }
        }
    }
}