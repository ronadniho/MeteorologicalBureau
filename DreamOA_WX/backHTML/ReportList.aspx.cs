using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text.RegularExpressions;
using System.Data;
using System.IO;
using System.Data.OleDb;
using System.Configuration;

namespace CollegeAPP.ReportCenter
{
    public partial class ReportList : System.Web.UI.Page
    {
        public string StrRqKeyValue = string.Empty;
        public DataTable dataTable = new DataTable();
        public ReportModule module = new ReportModule();
        public int xh = 0;
        public long tabIndex = 0;
        public string rowcount = "0";
        public int iPageRows = 100, iPageIndex = 1;
        public string ConnectionString = System.Configuration.ConfigurationManager.AppSettings["OLEDB_connString"];
        protected void Page_Load(object sender, EventArgs e)
        {
            var ShowHeader = Request.QueryString["ShowHeader"];
            if (ShowHeader == "1")
            {
                Header_tr.Style[HtmlTextWriterStyle.Display] = "none";
            }

            if (!IsPostBack)
            {
                LoadData(false);
            }
            xh = ((iPageIndex - 1) * iPageRows) + 1;
        }

        /// <summary>
        /// 加载
        /// </summary>
        private void LoadData(bool forprint)
        {
            if (string.IsNullOrEmpty(Request.QueryString["category"]))
            {
                return;
            }
            //获取参数传送到导出
            foreach (var c in Request.QueryString.AllKeys)
            {
                if (StrRqKeyValue != "")
                {
                    StrRqKeyValue += "&" + c + "=" + Request.QueryString[c];
                }
                else
                {
                    StrRqKeyValue = c + "=" + Request.QueryString[c];
                }
            }

            //分页信息
            if (!String.IsNullOrEmpty(Request.QueryString["nowPage"]))
            {
                try
                {
                    iPageIndex = Convert.ToInt32(Request.QueryString["nowPage"]);
                    if (IsPostBack)
                    {
                        iPageIndex = 1;
                    }
                }
                catch { }
            }
            if (!String.IsNullOrEmpty(Request.QueryString["perAmount"]))
            {
                try
                {
                    iPageRows = Convert.ToInt32(Request.QueryString["perAmount"]);
                }
                catch { }
            }
            string category = Request.QueryString["category"];
            module = ReportHelp.getModule(category);
            string serchSqlFor = string.Empty;
            string serchSql = SerchTxt.Value;
            if (!IsPostBack)
            {
                if (!string.IsNullOrEmpty(Request.QueryString["nowPage"]))
                {
                    if (Session["ReportListSerchField" + "_" + category] != null)
                    {
                        serchSql = Session["ReportListSerchField" + "_" + category].ToString();
                    }
                }
                else
                {
                    Session["ReportListSerchField" + "_" + category] = null;
                }
                if (!string.IsNullOrEmpty(module.additional_sql)
                    && string.IsNullOrEmpty(Request.QueryString["nowPage"]))
                {
                    module.sql = module.sql + module.additional_sql;
                }
            }
            else
            {
                Session["ReportListSerchField" + "_" + category] = serchSql;
            }

            serchModule mod = null;
            List<serchModule> modules = new List<serchModule>();
            foreach (string v in serchSql.Split('|'))
            {
                if (string.IsNullOrEmpty(v.Trim()))
                {
                    continue;
                }

                string[] vSplit = v.Split('$');
                mod = new serchModule();
                mod.val = vSplit[1];
                mod.colume = vSplit[0];
                mod.type = vSplit[2];
                modules.Add(mod);
                switch (vSplit[2])
                {
                    case "txt":
                        serchSqlFor += " and " + vSplit[0] + " like '%" + vSplit[1] + "%' ";
                        break;
                    case "drp":
                        serchSqlFor += " and " + vSplit[0] + "='" + vSplit[1] + "' ";
                        break;
                    case "drpGreater":
                        serchSqlFor += " and " + vSplit[0] + ">'" + vSplit[1] + "' ";
                        break;
                    case "drpLess":
                        serchSqlFor += " and " + vSplit[0] + "<'" + vSplit[1] + "' ";
                        break;
                    case "st":
                        serchSqlFor += " and " + vSplit[0] + " >= to_date('" + vSplit[1] + "','yyyy-MM-dd') ";
                        break;
                    case "et":
                        serchSqlFor += " and " + vSplit[0] + " <= to_date('" + Convert.ToDateTime(vSplit[1]).ToString("yyyy-MM-dd") + "','yyyy-MM-dd') ";
                        break;
                    case "checkBox":
                        serchSqlFor += "and " + vSplit[0] + " in (" + vSplit[1] + ")";
                        break;
                    case "txtst":
                        serchSqlFor += " and " + vSplit[0] + ">=" + vSplit[1];
                        break;
                    case "txted":
                        serchSqlFor += " and " + vSplit[0] + "<=" + vSplit[1];
                        break;
                    case "SPcheckBox":
                        SerchField sf = module.SerchFields.Find(delegate(SerchField p) { return p.type == "SPcheckBox"; });
                        if (sf != null)
                        {
                            serchSqlFor += ReportHelp.getSPCheckBoxSQL(sf, vSplit[1]);
                        }
                        break;
                }
            }
            if (!string.IsNullOrEmpty(Request.QueryString["sql"]))
            {
                //serchSqlFor += " AND " + DSOA.Common.Public.ToStringFromBase64(Server.UrlDecode(Request.QueryString["sql"]));
            }
            string SerchHtml = string.Empty;
            int itemnum = 0;
            if (category == "BMGZL")
            {
                if (serchSqlFor.Trim().Length > 0)
                {
                    //serchSqlFor = serchSqlFor.Trim(" and".ToCharArray());
                    string bcsql = serchSqlFor.Replace("DDSerch", "bc.PXSJ");
                    string othersql = serchSqlFor.Replace("DDSerch", "createtime");
                    module.sql = module.sql.Replace("[bc_serch]", bcsql).Replace("[other_serch]", othersql);
                }
                else
                {
                    module.sql = module.sql.Replace("[bc_serch]", " and bc.pxsj>=to_date('" + new DateTime(DateTime.Now.Year, 1, 1).ToString("yyyy-MM-dd") + "','yyyy-MM-dd') and bc.pxsj<=to_date('" + new DateTime(DateTime.Now.Year + 1, 1, 1).ToString("yyyy-MM-dd") + "','yyyy-MM-dd')");
                    module.sql = module.sql.Replace("[other_serch]", " and createtime>=to_date('" + new DateTime(DateTime.Now.Year, 1, 1).ToString("yyyy-MM-dd") + "','yyyy-MM-dd') and createtime<=to_date('" + new DateTime(DateTime.Now.Year + 1, 1, 1).ToString("yyyy-MM-dd") + "','yyyy-MM-dd')");
                }
            }
            else
            {
                if (serchSqlFor.Trim().Length > 0)
                {
                    if (module.sql.IndexOf("where") > 0 || module.sql.IndexOf("WHERE") > 0)
                    {
                        module.sql += " " + serchSqlFor;
                    }
                    else
                    {
                        module.sql += " where " + serchSqlFor.Trim(" and".ToCharArray());
                    }
                }
            }
            LoadMiddle(module, serchSqlFor);
            foreach (var c in Request.QueryString.AllKeys)
            {
                module.sql = module.sql.Replace("[" + c + "]", Request.QueryString[c]);
            }
            foreach (var c in Session.Keys)
            {
                string s = c.ToString().ToLower();
                if (module.sql.IndexOf("[" + s + "]") > -1 && Session[c.ToString()] != null)
                {
                    module.sql = module.sql.Replace("[" + s + "]", Session[c.ToString()].ToString());
                }
            }
            if (module.buttons != null)
            {
                foreach (var c in Request.QueryString.AllKeys)
                {
                    foreach (var d in module.buttons)
                    {
                        if (d != null && !string.IsNullOrEmpty(d.success))
                        {
                            d.success = d.success.Replace("[" + c + "]", Request.QueryString[c]);
                        }
                    }
                }
            }
            if (!string.IsNullOrEmpty(orderByColumn.Value))
            {
                module.orderbySql = "ORDER BY " + orderByColumn.Value + " " + orderBy.Value;
            }
            else
            {
                if (!string.IsNullOrEmpty(Request.QueryString["orderByColumn"])
                    && !string.IsNullOrEmpty(Request.QueryString["orderBy"]))
                {
                    module.orderbySql = "ORDER BY " + Request.QueryString["orderByColumn"] + " " + Request.QueryString["orderBy"];
                    orderByColumn.Value = Request.QueryString["orderByColumn"];
                    orderBy.Value = Request.QueryString["orderBy"];
                }
            }
            try
            {
                if (module.pageing)
                {
                    dataTable = ReportHelp.getDataSource(LoadData(module.sql + module.orderbySql));
                }
                else
                {
                    dataTable = ReportHelp.getDataSource(module.sql + module.orderbySql);
                    pageing.Style.Add("display", "none");
                }
            }
            catch (Exception ex)
            {
                ErrLog.Log(module.sql);
                throw ex;
            }
            dataTable.Columns.Add("ReportLinkHref");
            dataTable.Columns.Add("Script");

            //存放根据规则不要显示列
            List<displayColume> forHiddenColumn = new List<displayColume>();

            string link = string.Empty;
            string script = string.Empty;
            string _matchvalue = string.Empty;
            Regex _regex = null;
            MatchCollection _matchcollection = null;
            foreach (displayColume colmue in module.displayColumes)
            {
                if (!string.IsNullOrEmpty(colmue.hiddenFor))
                {
                    if (Request.Url.AbsoluteUri.IndexOf(colmue.hiddenFor) > -1)
                    {
                        forHiddenColumn.Add(colmue);
                    }
                }
                if (!string.IsNullOrEmpty(colmue.hiddenForRole))
                {

                }
                if (string.IsNullOrEmpty(colmue.link) && string.IsNullOrEmpty(colmue.script))
                {
                    continue;
                }
                dataTable.Columns.Add("ReportLinkHref_" + colmue.dbcolume);
                dataTable.Columns.Add("Script_" + colmue.dbcolume);

                foreach (DataRow dr in dataTable.Rows)
                {
                    link = colmue.link;
                    script = colmue.script;

                    #region "取数据源中的值"
                    if (!string.IsNullOrEmpty(link) && link.IndexOf("[") != -1 && link.IndexOf("]") != -1)
                    {
                        _regex = new Regex(@"\[(?<content>[^\[\]].*?)\]");
                        _matchcollection = _regex.Matches(link);
                        foreach (Match _match in _matchcollection)
                        {
                            _matchvalue = _match.Value.Replace("[", "").Replace("]", "");
                            if (!string.IsNullOrEmpty(_matchvalue))
                            {
                                link = link.Replace(_match.Value, dr[_matchvalue].ToString());
                            }
                        }
                    }

                    if (!string.IsNullOrEmpty(script) && script.IndexOf("[") != -1 && script.IndexOf("]") != -1)
                    {
                        _regex = new Regex(@"\[(?<content>[^\[\]].*?)\]");
                        _matchcollection = _regex.Matches(script);
                        foreach (Match _match in _matchcollection)
                        {
                            _matchvalue = _match.Value.Replace("[", "").Replace("]", "");
                            if (!string.IsNullOrEmpty(_matchvalue))
                            {
                                script = script.Replace(_match.Value, dr[_matchvalue].ToString());
                            }
                        }
                    }
                    #endregion

                    dr["ReportLinkHref_" + colmue.dbcolume] = "../" + link;
                    dr["Script_" + colmue.dbcolume] = script;
                    foreach (DataColumn dc in dataTable.Columns)
                    {
                        dr["ReportLinkHref_" + colmue.dbcolume] = dr["ReportLinkHref_" + colmue.dbcolume].ToString().Replace("[" + dc.ColumnName.ToUpper() + "]", dr[dc.ColumnName.ToUpper()].ToString());
                        dr["Script_" + colmue.dbcolume] = dr["Script_" + colmue.dbcolume].ToString().Replace("[" + dc.ColumnName.ToUpper() + "]", dr[dc.ColumnName.ToUpper()].ToString());
                    }
                }
            }

            foreach (displayColume c in forHiddenColumn)
            {
                module.displayColumes.Remove(c);
            }

            foreach (SerchField field in module.SerchFields)
            {
                itemnum = itemnum + field.occupy;
                SerchHtml += "<div style='min-width:" + Convert.ToInt32(100 / module.serchRowItemCount) * field.occupy + "%;float:left;margin-top:5px;'>";
                //SerchHtml += "<div style='width:*;float:left;margin-top:5px;margin-left:5px;'>";
                switch (field.type)
                {
                    case "textBox":
                        if (field.needSerchRange)
                        {
                            SerchHtml += field.zhName + "：" + "<input value='" + ReportHelp.getval(modules, field.dbColume, "txtst") + "'  style='width:50px' onblur='checkisNum(this);'  dbcolume='" + field.dbColume + "' type='text' id='txtst_" + itemnum + "'/>";
                            SerchHtml += "至" + "<input value='" + ReportHelp.getval(modules, field.dbColume, "txted") + "'  style='width:50px' onblur='checkisNum(this);'  dbcolume='" + field.dbColume + "' type='text' id='txted_" + itemnum + "'/>";
                        }
                        else
                        {
                            SerchHtml += field.zhName + "：" + "<input value='" + ReportHelp.getval(modules, field.dbColume, "txt") + "' dbcolume='" + field.dbColume + "' type='text' id='txt_" + itemnum + "'/>";
                        }
                        break;
                    case "dropDownList":
                        SerchHtml += field.zhName + "：" + "<select id='drp_" + itemnum + "' dbcolume='" + field.dbColume + "'>";
                        Dictionary<string, string> drpSource = new Dictionary<string, string>();
                        //如果是SQL绑定的下拉框则查询SQL语句，其他的绑定R_CODE
                        if (field.source.ToLower().StartsWith("select "))
                        {
                            field.source = replaceSQL(field.source);
                            drpSource = ReportHelp.getDrpSource(field.source);
                        }
                        else
                        {
                            drpSource = GetR_CODEByClass(field.source);
                        }
                        SerchHtml += "<option></option>";
                        foreach (KeyValuePair<string, string> kvp in drpSource)
                        {
                            string selectedVal = ReportHelp.getval(modules, field.dbColume, "drp");
                            if (selectedVal != kvp.Value)
                            {
                                SerchHtml += "<option value='" + kvp.Value + "'>" + kvp.Key + "</option>";
                            }
                            else
                            {
                                SerchHtml += "<option value='" + kvp.Value + "' selected='selected'>" + kvp.Key + "</option>";
                            }
                        }
                        SerchHtml += "</select>";
                        if (field.serchByOrder)
                        {
                            string greaterVal = ReportHelp.getval(modules, field.dbColume, "drpGreater");
                            string lessVal = ReportHelp.getval(modules, field.dbColume, "drpLess");
                            SerchHtml = getSerchByOrderHTML(greaterVal, lessVal, itemnum, SerchHtml);
                        }
                        break;
                    case "checkBox":
                        SerchHtml += field.zhName + "：<div style='margin:3px;' class='checkBoxDiv'>";
                        Dictionary<string, string> checkBoxSource = GetKeyValueBySQL(field.source);
                        foreach (KeyValuePair<string, string> kvp in checkBoxSource)
                        {
                            string selectedVal = ReportHelp.getval(modules, field.dbColume, "checkBox");
                            selectedVal = selectedVal.Trim("'".ToCharArray());
                            if (selectedVal == kvp.Value)
                            {
                                SerchHtml += "<input type='checkbox' checked='checked'  dbcolume='" + field.dbColume + "' name='chk_" + itemnum + "_" + field.dbColume + "' value='" + kvp.Value + "'/>&nbsp;" + kvp.Key + "";
                            }
                            else
                            {
                                SerchHtml += "<input type='checkbox'  dbcolume='" + field.dbColume + "' name='chk_" + itemnum + "_" + field.dbColume + "' value='" + kvp.Value + "'/>&nbsp;" + kvp.Key + "";
                            }
                        }
                        if (SerchHtml.EndsWith("</br>"))
                        {
                            SerchHtml = SerchHtml.TrimEnd("</br>".ToCharArray());
                        }
                        SerchHtml += "</div>";
                        break;
                    case "SPcheckBox":
                        SerchHtml += "<div style='margin:3px;' class='SPcheckBoxDiv'>";
                        List<SPCheckBox> spcheckBoxList = field.spCheckBox;
                        foreach (var kvp in spcheckBoxList)
                        {
                            string selectedVal = ReportHelp.getval(modules, field.dbColume, "SPcheckBox");
                            selectedVal = selectedVal.Trim("'".ToCharArray());
                            if (selectedVal == kvp.value)
                            {
                                SerchHtml += "<input type='checkbox' checked='checked'  dbcolume='" + field.dbColume + "' name='chk_" + itemnum + "_" + field.dbColume + "' value='" + kvp.value + "'/>&nbsp;" + kvp.text + "";
                            }
                            else
                            {
                                SerchHtml += "<input type='checkbox'  dbcolume='" + field.dbColume + "' name='chk_" + itemnum + "_" + field.dbColume + "' value='" + kvp.value + "'/>&nbsp;" + kvp.text + "";
                            }
                        }
                        if (SerchHtml.EndsWith("</br>"))
                        {
                            SerchHtml = SerchHtml.TrimEnd("</br>".ToCharArray());
                        }
                        SerchHtml += "</div>";
                        break;
                    case "time":
                        SerchHtml += field.zhName + "：" + "<input style='width:75px' value='" + ReportHelp.getval(modules, field.dbColume, "st") + "'  dbcolume='" + field.dbColume + "' type='text' id='time_" + itemnum + "_st' readOnly=\"readonly\" /> <img id=\"Image_blqx1\" style=\"cursor: hand;\" readOnly=\"readonly\" onclick=\"WdatePicker({dateFmt:'yyyy-MM-dd',el:'time_" + itemnum + "_st'})\" src=\"../images/time.ico\" border=\"0\">";
                        //,maxDate:'#F{$dp.$D(\'time_" + itemnum + "_et\')'
                        SerchHtml += "~<input style='width:75px' value='" + ReportHelp.getval(modules, field.dbColume, "et") + "'  dbcolume='" + field.dbColume + "' type='text' id='time_" + itemnum + "_et' readOnly=\"readonly\" /> <img id=\"Image_blqx1\" style=\"cursor: hand;\" readOnly=\"readonly\" onclick=\"WdatePicker({dateFmt:'yyyy-MM-dd',el:'time_" + itemnum + "_et'})\" src=\"../images/time.ico\" border=\"0\">";
                        //,minDate:'#F{$dp.$D(\'time_" + itemnum + "_st\')'
                        break;
                }
                SerchHtml += "</div>";
            }
            SerchField.InnerHtml = SerchHtml;
            
            //该导出已不用  2015年3月9日 10:25:35
            //module.needCheckBox = !forprint;

            string strScript = "<script language=javascript>\n";
            strScript += "pagingInit(\"sabrosus\", " + rowcount + ", " + iPageRows.ToString() + ", " + iPageIndex.ToString() + ",'');\n";
            strScript += "</script>\n";
            lblScript.Text = strScript;

            registerJS(module);

            init_Showsuo(module);
        }

        /// <summary>
        /// 默认收缩还是展开检索栏
        /// </summary>
        protected void init_Showsuo(ReportModule module)
        {
            if (!IsPostBack)
            {
                iszhankai.Value = module.iszhankai.ToString();
            }
        }

        /// <summary>
        /// 设置排序条件
        /// </summary>
        protected string getSerchByOrderHTML(string greaterVal, string lessVal, int itemnum, string SerchHtml)
        {
            SerchHtml += "&nbsp;&nbsp;<select id='drpOrder_" + itemnum + "'>";
            if (string.IsNullOrEmpty(greaterVal) && string.IsNullOrEmpty(lessVal))
            {
                SerchHtml += "<option value='' selected='selected'></option>";
            }
            else
            {
                SerchHtml += "<option value=''></option>";
            }
            if (string.IsNullOrEmpty(greaterVal))
            {
                SerchHtml += "<option value='UP'>以上</option>";
            }
            else
            {
                SerchHtml += "<option value='UP' selected='selected'>以上</option>";
            }
            if (string.IsNullOrEmpty(lessVal))
            {
                SerchHtml += "<option value='DOWN'>以下</option>";
            }
            else
            {
                SerchHtml += "<option value='DOWN' selected='selected'>以下</option>";
            }
            SerchHtml += "</select>";

            return SerchHtml;
        }

        /// <summary>
        /// 注册JS
        /// </summary>
        protected void registerJS(ReportModule module)
        {
            if (!string.IsNullOrEmpty(module.customJS))
            {
                Page.ClientScript.RegisterClientScriptInclude("customJS", ".." + module.customJS);
            }
        }

        /// <summary>
        /// 分页信息
        /// </summary>
        private string LoadData(string cmdStr)
        {
            int iStart = iPageRows * (iPageIndex - 1);
            int iEnd = iPageRows * iPageIndex;

            string conn_name = "OLEDB_connString";
            if (!string.IsNullOrEmpty(Request.QueryString["oledbConnection"]))
            {
                conn_name = Request.QueryString["oledbConnection"];
            }
            OleDbConnection myConn = new OleDbConnection(ConfigurationManager.AppSettings[conn_name]);
            myConn.Open();
            OleDbCommand myCmd = new OleDbCommand();
            OleDbDataReader myRead = null;
            try
            {
                myCmd = new OleDbCommand("SELECT COUNT(*) AS SUNNUM FROM (" + cmdStr + ")", myConn);
                myRead = myCmd.ExecuteReader();
                if (myRead.Read())
                {
                    rowcount = myRead["SUNNUM"].ToString();
                }
                myRead.Close();
            }
            catch (OleDbException E)
            {
                throw (E);
            }
            finally
            {
                if (myCmd != null)
                {
                    myCmd.Dispose();
                }
                myConn.Close();
            }
            string sDataSQL = "SELECT * FROM(SELECT ROWNUM ROWNUMBER,X.* FROM(" + cmdStr + ") X ) WHERE ROWNUMBER>" + iStart + " and ROWNUMBER <= " + iEnd;

            string strScript = "<script language=javascript>\n";
            strScript += "pagingInit(\"sabrosus\", " + rowcount + ", " + iPageRows.ToString() + ", " + iPageIndex.ToString() + ",'');\n";
            strScript += "</script>\n";
            lblScript.Text = strScript;

            return sDataSQL;
        }

        /// <summary>
        /// 检索事件
        /// </summary>
        protected void btn_serch_Click(object sender, EventArgs e)
        {
            LoadData(false);
        }

        /// <summary>
        /// 加载代码
        /// </summary>
        protected void LoadMiddle(ReportModule module, string where)
        {
            if (string.IsNullOrEmpty(module.middleSQL))
            {
                return;
            }
            string sql = module.middleSQL;
            //if (sql.IndexOf("where") > 0 ||sql.IndexOf("WHERE") > 0)
            //{
            //   sql += " " + where;
            //}
            //else
            //{
            //    sql += " where " + where.Trim(" and".ToCharArray());
            //}
            sql = replaceSQL(sql);
            DataTable dt = ReportHelp.getDataSource(sql);
            string middleHTML = module.middleHTML;
            if (dt != null && dt.Rows.Count > 0)
            {
                foreach (DataColumn dc in dt.Columns)
                {
                    if (middleHTML.IndexOf("[" + dc.ColumnName.ToUpper() + "]") > -1)
                    {
                        middleHTML = middleHTML.Replace("[" + dc.ColumnName.ToUpper() + "]", dt.Rows[0][dc.ColumnName.ToUpper()].ToString());
                    }
                }
            }
            middleTR.Style[HtmlTextWriterStyle.Display] = "block";
            middleDIV.InnerHtml = middleHTML;
        }
        /// <summary>
        ///根据Class来获取R_CODE的ShowValue和DataValue，ShowValue为KEY
        /// </summary>
        /// <param name="classname"></param>
        public static Dictionary<string, string> GetR_CODEByClass(string classname)
        {
            Dictionary<string, string> li = new Dictionary<string, string>();
            //SortedList li = new SortedList();
            using (OleDbConnection conn = new OleDbConnection(System.Configuration.ConfigurationManager.AppSettings["OLEDB_connString"]))
            {
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }
                OleDbCommand comm = conn.CreateCommand();
                comm.CommandText = "select * from r_code where class=:class order by showorder";
                comm.Parameters.Add(new OleDbParameter("class", classname));
                using (OleDbDataReader odr = comm.ExecuteReader())
                {
                    while (odr.Read())
                    {
                        li.Add(odr["showvalue"].ToString().Trim(), odr["datavalue"].ToString().Trim());
                    }
                }
            }
            return li;
        }
        /// <summary>
        /// 数据导出 已停用
        /// </summary>
        protected void btn_export_Click(object sender, EventArgs e)
        {
            LoadData(true);

            //DivList.RenderControl();

            StringWriter sw = new StringWriter();
            HtmlTextWriter htw = new HtmlTextWriter(sw);
            DivList.RenderControl(htw);
            Response.ContentEncoding = System.Text.Encoding.GetEncoding("gb2312");
            Response.AddHeader("Content-Disposition", "attachment;filename=" + HttpUtility.UrlEncode("课表.xls"));
            Response.Write(sw.ToString());
            Response.End();
        }

        /// <summary>
        /// 替换下拉框SQL
        /// </summary>
        protected string replaceSQL(string sql)
        {
            string returnSQL = string.Empty;
            foreach (var c in Request.QueryString.AllKeys)
            {
                sql = sql.Replace("[" + c + "]", Request.QueryString[c]);
            }
            foreach (var c in Session.Keys)
            {
                string s = c.ToString().ToLower();
                if (sql.IndexOf("[" + s + "]") > -1 && Session[c.ToString()] != null)
                {
                    sql = sql.Replace("[" + s + "]", Session[c.ToString()].ToString());
                }
            }
            returnSQL = sql;
            return returnSQL;
        }
        /// <summary>
        ///根据SQL来获取SQL中的ShowValue和DataValue，ShowValue为KEY
        /// </summary>
        /// <param name="classname"></param>
        public static Dictionary<string, string> GetKeyValueBySQL(string sql)
        {
            Dictionary<string, string> li = new Dictionary<string, string>();
            using (OleDbConnection conn = new OleDbConnection(System.Configuration.ConfigurationManager.AppSettings["OLEDB_connString"]))
            {
                if (conn.State == ConnectionState.Closed)
                {
                    conn.Open();
                }
                OleDbCommand comm = conn.CreateCommand();
                comm.CommandText = sql;
                using (OleDbDataReader odr = comm.ExecuteReader())
                {
                    while (odr.Read())
                    {
                        li.Add(odr["showvalue"].ToString().Trim(), odr["datavalue"].ToString().Trim());
                    }
                }
            }
            return li;
        }
        /// <summary>
        /// 判断某一行中某个超链是否显示
        /// </summary>
        /// <param name="dr">该行数据</param>
        /// <param name="dbColumn">用来判断的字段，0代表不显示，1代表显示。</param>
        /// <param name="roles">权限</param>
        protected bool checkNeedLink(DataRow dr, string dbColumn, string roles)
        {
            bool returnVal = true;
            if (!string.IsNullOrEmpty(dbColumn))
            {
                foreach (string column in dbColumn.Split(','))
                {
                    if (!string.IsNullOrEmpty(column) && Convert.ToInt32(dr[column]) == 0)
                    {
                        returnVal = false;
                    }
                }
            }
            if (!string.IsNullOrEmpty(roles))
            {

            }
            return returnVal;
        }
    }
}