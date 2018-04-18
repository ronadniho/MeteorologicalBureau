using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml;
using System.Data;
using System.IO;
using System.Data.OleDb;

namespace CollegeAPP.ReportCenter
{
    public enum showPosition { Top, Middle, Bottom, OldPlace };
    public class ReportHelp
    {
        static string ConnectionString = System.Configuration.ConfigurationManager.AppSettings["OLEDB_connString"];

        public static ReportModule getModule(string category)
        {
            if (!string.IsNullOrEmpty(HttpContext.Current.Request.QueryString["oledbConnection"]))
            {
                ConnectionString = System.Configuration.ConfigurationManager.AppSettings[HttpContext.Current.Request.QueryString["oledbConnection"]];
            }
            ReportModule module = new ReportModule();

            #region XML对象
            XmlDocument xd = new XmlDocument();
            if (File.Exists(HttpContext.Current.Server.MapPath("~/xml/Report_" + category + ".xml")))
            {
                xd.Load(HttpContext.Current.Server.MapPath("~/xml/Report_" + category + ".xml"));
            }
            else
            {
                xd.Load(HttpContext.Current.Server.MapPath("~/xml/Report.xml"));
            }
            XmlNode root = xd.SelectSingleNode("/root/items/item[@category='" + category + "']");
            module.category = category;
            module.zhName = root.Attributes["zhName"].Value;
            module.pageing = Convert.ToBoolean(root.Attributes["ispageing"].Value);
            if (root.Attributes["isCal"] != null)
            {
                module.isCal = Convert.ToBoolean(root.Attributes["isCal"].Value);
            }
            else
            {
                module.isCal = true;
            }
            if (root.Attributes["isSerch"] != null)
            {
                module.isSerch = Convert.ToBoolean(root.Attributes["isSerch"].Value);
            }
            else
            {
                module.isSerch = true;
            }
            if (root.Attributes["needPrint"] != null)
            {
                module.needPrint = Convert.ToBoolean(root.Attributes["needPrint"].Value);
            }
            else
            {
                module.needPrint = true;
            }
            if (root.Attributes["customJS"] != null)
            {
                module.customJS = root.Attributes["customJS"].Value;
            }
            if (root.Attributes["iszhankai"] != null)
            {
                module.iszhankai = Convert.ToBoolean(root.Attributes["iszhankai"].Value);
            }
            module.sql = xd.SelectSingleNode("/root/items/item[@category='" + category + "']/sql").InnerText;
            module.orderbySql = xd.SelectSingleNode("/root/items/item[@category='" + category + "']/orderbysql").InnerText;
            if (xd.SelectSingleNode("/root/items/item[@category='" + category + "']/additional_sql") != null)
            {
                module.additional_sql = xd.SelectSingleNode("/root/items/item[@category='" + category + "']/additional_sql").InnerText;
            }
            //列表页中部文字配置
            if (xd.SelectSingleNode("/root/items/item[@category='" + category + "']/middleDisplay") != null)
            {
                module.middleSQL = xd.SelectSingleNode("/root/items/item[@category='" + category + "']/middleDisplay").Attributes["sql"].Value;
                module.middleHTML = xd.SelectSingleNode("/root/items/item[@category='" + category + "']/middleDisplay").InnerText;
            }
            #endregion

            #region 检索条件

            List<SerchField> serchFields = new List<SerchField>();
            //判断每行显示几个检索条件
            if (root.SelectSingleNode("/root/items/item[@category='" + category + "']/serchFields").Attributes["rowItemCount"] != null)
            {
                module.serchRowItemCount = Convert.ToInt32(root.SelectSingleNode("/root/items/item[@category='" + category + "']/serchFields").Attributes["rowItemCount"].Value);
            }
            else
            {
                module.serchRowItemCount = 3;
            }
            foreach (XmlNode xnode in root.SelectSingleNode("/root/items/item[@category='" + category + "']/serchFields").ChildNodes)
            {
                SerchField field = new SerchField();
                field.dbColume = xnode.Attributes["dbcolume"].Value;
                field.serchType = xnode.Attributes["serchType"].Value;
                if (xnode.Attributes["source"] != null)
                {
                    field.source = xnode.Attributes["source"].Value;
                }
                field.type = xnode.Attributes["type"].Value;
                field.zhName = xnode.InnerText;
                if (xnode.Attributes["occupy"] != null)
                {
                    field.occupy = Convert.ToInt32(xnode.Attributes["occupy"].Value);
                }
                if (xnode.Attributes["serchByOrder"] != null)
                {
                    field.serchByOrder = Convert.ToBoolean(xnode.Attributes["serchByOrder"].Value);
                }
                else
                {
                    field.serchByOrder = false;
                }
                if (xnode.Attributes["needSerchRange"] != null)
                {
                    field.needSerchRange = Convert.ToBoolean(xnode.Attributes["needSerchRange"].Value);
                }
                //特殊复选框
                if (field.type == "SPcheckBox")
                {
                    List<SPCheckBox> spCheckBoxList = new List<SPCheckBox>();
                    foreach (XmlNode xn in xnode.ChildNodes)
                    {
                        SPCheckBox box = new SPCheckBox();
                        box.text = xn.InnerText;
                        box.source = xn.Attributes["source"].Value;
                        box.value = xn.Attributes["value"].Value;
                        spCheckBoxList.Add(box);
                    }
                    field.spCheckBox = spCheckBoxList;
                }
                serchFields.Add(field);
            }
            module.SerchFields = serchFields;

            #endregion

            #region 加载按钮
            if (root.SelectSingleNode("/root/items/item[@category='" + category + "']/buttons") != null)
            {
                List<Buttons> buttons = new List<Buttons>();
                module.buttons = buttons;
                foreach (XmlNode c in root.SelectSingleNode("/root/items/item[@category='" + category + "']/buttons").ChildNodes)
                {
                    if (c.Attributes["authority"] != null)
                    {
                        if (string.IsNullOrEmpty(c.Attributes["authority"].Value))
                        {
                            //if (!DSOA.JW.jxjh.JXJH_help.IsRight(c.Attributes["authority"].Value))
                            //{
                            //    continue;
                            //}
                        }
                    }
                    Buttons btn = new Buttons();
                    if (c.Attributes["showPosition"] != null)
                    {
                        switch (c.Attributes["showPosition"].Value)
                        {
                            case "Top":
                                btn.showPositon = showPosition.Top;
                                break;
                            case "Middle":
                                btn.showPositon = showPosition.Middle;
                                break;
                            case "Bottom":
                                btn.showPositon = showPosition.Bottom;
                                break;
                            default:
                                btn.showPositon = showPosition.Top;
                                break;
                        }
                    }
                    else
                    {
                        btn.showPositon = showPosition.OldPlace;
                    }
                    if (c.Attributes["isfontButton"] != null)
                    {
                        btn.isFontButton = Convert.ToBoolean(c.Attributes["isfontButton"].Value);
                    }
                    else
                    {
                        btn.isFontButton = false;
                    }
                    if (btn.isFontButton == false)
                    {
                        btn.ajaxClass = c.Attributes["ajaxClass"].Value;
                        btn.ajaxFunction = c.Attributes["ajaxFunction"].Value;
                        btn.ajaxParam = c.Attributes["ajaxParam"].Value;
                    }
                    btn.buttonName = c.InnerText;
                    if (c.Attributes["success"] != null)
                    {
                        btn.success = c.Attributes["success"].Value;
                    }

                    buttons.Add(btn);
                }
            }
            #endregion

            #region 列的集合
            List<displayColume> columes = new List<displayColume>();
            XmlNode ColumesStatus = root.SelectSingleNode("/root/items/item[@category='" + category + "']/columes");

            if (ColumesStatus.Attributes["needCheckBox"] != null)
            {
                module.needCheckBox = Convert.ToBoolean(ColumesStatus.Attributes["needCheckBox"].Value);
            }

			if (ColumesStatus.Attributes["keyColume"] != null)
			{
				module.keyColume = ColumesStatus.Attributes["keyColume"].Value.ToUpper();
			}
            if (ColumesStatus.Attributes["keyTable"] != null)
            {
                module.keyTable = ColumesStatus.Attributes["keyTable"].Value.ToUpper();
            }
            if (ColumesStatus.Attributes["checkBoxType"] != null)
            {
                module.checkBoxType = ColumesStatus.Attributes["checkBoxType"].Value;
            }
            foreach (XmlNode xnode in root.SelectSingleNode("/root/items/item[@category='" + category + "']/columes").ChildNodes)
            {
                displayColume field = new displayColume();
                field.dbcolume = xnode.Attributes["dbcolume"].Value;
                if (xnode.Attributes["format"] != null)
                {
                    field.Format = xnode.Attributes["format"].Value;
                }
                if (xnode.Attributes["update"] != null)
                {
                    field.update = Convert.ToBoolean(xnode.Attributes["update"].Value);
                }
                if (xnode.Attributes["Cal"] != null)
                {
                    field.Cal = xnode.Attributes["Cal"].Value;
                }
                if (xnode.Attributes["link"] != null)
                {
                    field.link = xnode.Attributes["link"].Value;
                }
                if (xnode.Attributes["script"] != null)
                {
                    field.script = xnode.Attributes["script"].Value;
                }
                if (xnode.Attributes["wordLength"] != null)
                {
                    field.wordLength = Convert.ToInt32(xnode.Attributes["wordLength"].Value);
                }
                if (xnode.Attributes["displayDBColumn"] != null)
                {
                    field.displayDBColumn = xnode.Attributes["displayDBColumn"].Value;
                }
                if (xnode.Attributes["hiddenFor"] != null)
                {
                    field.hiddenFor = xnode.Attributes["hiddenFor"].Value;
                }
                if (xnode.Attributes["hiddenForRole"] != null)
                {
                    field.hiddenForRole = xnode.Attributes["hiddenForRole"].Value;
                }
                if (xnode.Attributes["orderby"] != null)
                {
                    field.orderby = Convert.ToBoolean(xnode.Attributes["orderby"].Value);
                }
                if (xnode.Attributes["data_type"] != null)
                {
                    field.dataType = xnode.Attributes["data_type"].Value;
                }
                if (xnode.Attributes["maxValue"] != null)
                {
                    field.maxValue = xnode.Attributes["maxValue"].Value;
                }
                if (xnode.Attributes["minValue"] != null)
                {
                    field.minValue = xnode.Attributes["minValue"].Value;
                }
                if (xnode.Attributes["roles"] != null)
                {
                    field.roles = xnode.Attributes["roles"].Value;
                }
                if (xnode.Attributes["type"] != null)
                    field.Type = xnode.Attributes["type"].Value;
                field.align = xnode.Attributes["align"].Value;
                field.zhName = xnode.InnerText;
                field.width = xnode.Attributes["width"].Value;
                columes.Add(field);
            }
            module.displayColumes = columes;
            #endregion

            return module;
        }

        public static ReportModule getModuleExport(string category)
        {
            if (!string.IsNullOrEmpty(HttpContext.Current.Request.QueryString["oledbConnection"]))
            {
                ConnectionString = System.Configuration.ConfigurationManager.AppSettings[HttpContext.Current.Request.QueryString["oledbConnection"]];
            }
            ReportModule module = new ReportModule();

            #region XML对象
            XmlDocument xd = new XmlDocument();
            if (File.Exists(HttpContext.Current.Server.MapPath("~/xml/Report_" + category + ".xml")))
            {
                xd.Load(HttpContext.Current.Server.MapPath("~/xml/Report_" + category + ".xml"));
            }
            else
            {
                xd.Load(HttpContext.Current.Server.MapPath("~/xml/Report.xml"));
            }
            XmlNode root = xd.SelectSingleNode("/root/items/item[@category='" + category + "']");
            module.category = category;
            module.zhName = root.Attributes["zhName"].Value;
            module.pageing = Convert.ToBoolean(root.Attributes["ispageing"].Value);
            if (root.Attributes["isCal"] != null)
            {
                module.isCal = Convert.ToBoolean(root.Attributes["isCal"].Value);
            }
            else
            {
                module.isCal = true;
            }
            if (root.Attributes["isSerch"] != null)
            {
                module.isSerch = Convert.ToBoolean(root.Attributes["isSerch"].Value);
            }
            else
            {
                module.isSerch = true;
            }
            if (root.Attributes["needPrint"] != null)
            {
                module.needPrint = Convert.ToBoolean(root.Attributes["needPrint"].Value);
            }
            else
            {
                module.needPrint = true;
            }
            module.sql = xd.SelectSingleNode("/root/items/item[@category='" + category + "']/sql").InnerText;
            module.orderbySql = xd.SelectSingleNode("/root/items/item[@category='" + category + "']/orderbysql").InnerText;
            #endregion

            #region 列的集合
            List<displayColume> columes = new List<displayColume>();
            XmlNode ColumesStatus = root.SelectSingleNode("/root/items/item[@category='" + category + "']/columes");

            if (ColumesStatus.Attributes["needCheckBox"] != null)
            {
                module.needCheckBox = Convert.ToBoolean(ColumesStatus.Attributes["needCheckBox"].Value);
                module.keyColume = ColumesStatus.Attributes["keyColume"].Value.ToUpper();
            }
            if (ColumesStatus.Attributes["checkBoxType"] != null)
            {
                module.checkBoxType = ColumesStatus.Attributes["checkBoxType"].Value;
            }
            foreach (XmlNode xnode in root.SelectSingleNode("/root/items/item[@category='" + category + "']/columes").ChildNodes)
            {
                displayColume field = new displayColume();
                field.dbcolume = xnode.Attributes["dbcolume"].Value;
                if (xnode.Attributes["format"] != null)
                {
                    field.Format = xnode.Attributes["format"].Value;
                }
                if (xnode.Attributes["Cal"] != null)
                {
                    field.Cal = xnode.Attributes["Cal"].Value;
                }
                if (xnode.Attributes["link"] != null)
                {
                    field.link = xnode.Attributes["link"].Value;
                }
                if (xnode.Attributes["script"] != null)
                {
                    field.script = xnode.Attributes["script"].Value;
                }
                if (xnode.Attributes["wordLength"] != null)
                {
                    field.wordLength = Convert.ToInt32(xnode.Attributes["wordLength"].Value);
                }
                if (xnode.Attributes["type"] != null)
                    field.Type = xnode.Attributes["type"].Value;
                field.align = xnode.Attributes["align"].Value;
                field.zhName = xnode.InnerText;
                field.width = xnode.Attributes["width"].Value;
                columes.Add(field);
            }
            module.displayColumes = columes;
            #endregion

            #region 导出列集合

            List<exportcolume> ecolumes = new List<exportcolume>();
            XmlNode eColumes = root.SelectSingleNode("/root/items/item[@category='" + category + "']/exportcolumes");
            if (eColumes != null)
            {
                string etitle = string.Empty;//导出标题
                if (eColumes.Attributes["etitle"] != null)
                    etitle = eColumes.Attributes["etitle"].Value.Trim();

                XmlNodeList xnodes = root.SelectSingleNode("/root/items/item[@category='" + category + "']/exportcolumes").ChildNodes;
                if (xnodes != null)
                {
                    foreach (XmlNode xnode in xnodes)
                    {
                        exportcolume efield = new exportcolume();
                        efield.etitle = etitle;
                        efield.ecolume = string.Empty;
                        if (xnode.Attributes["ecolume"] != null)
                            efield.ecolume = xnode.Attributes["ecolume"].Value.Trim();

                        efield.eType = string.Empty;
                        if (xnode.Attributes["etype"] != null)
                            efield.eType = xnode.Attributes["etype"].Value.Trim();

                        efield.eFormat = string.Empty;
                        if (xnode.Attributes["eformat"] != null)
                            efield.eFormat = xnode.Attributes["eformat"].Value.Trim();

                        efield.eCal = string.Empty;
                        if (xnode.Attributes["eCal"] != null)
                            efield.eCal = xnode.Attributes["eCal"].Value.Trim();

                        efield.eWidth = string.Empty;
                        if (xnode.Attributes["ewidth"] != null)
                            efield.eWidth = xnode.Attributes["ewidth"].Value.Trim();

                        efield.eIndex = 0;
                        if (xnode.Attributes["eindex"] != null && !string.IsNullOrEmpty(xnode.Attributes["eindex"].Value))
                            efield.eIndex = Convert.ToInt32(xnode.Attributes["eindex"].Value.Trim());

                        efield.ezhName = xnode.InnerText;

                        ecolumes.Add(efield);
                    }
                    ecolumes.Sort(delegate(exportcolume x, exportcolume y) { return x.eIndex - y.eIndex; });
                }
            }
            module.exportColumes = ecolumes;

            #endregion

            return module;
        }

        public static DataTable getDataSource(string sql)
        {
			string conn_name = string.Empty;
			if (string.IsNullOrEmpty(HttpContext.Current.Request.QueryString["oledbConnection"]))
			{
				conn_name = "OLEDB_connString";
			}
			else
			{
				conn_name = HttpContext.Current.Request.QueryString["oledbConnection"];
			}
			ConnectionString = System.Configuration.ConfigurationManager.AppSettings[conn_name];
            DataTable returnTable = new DataTable();
            using (OleDbConnection conn = new OleDbConnection(ConnectionString))
            {
                OleDbDataAdapter oda = new OleDbDataAdapter(sql, conn);
                oda.Fill(returnTable);
            }
            return returnTable;
        }
        /// <summary>
        /// 获取下拉框不是R_CODE的
        /// </summary>
        /// <param name="sql"></param>
        /// <returns></returns>
        public static Dictionary<string, string> getDrpSource(string sql)
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            using (OleDbConnection conn = new OleDbConnection(ConnectionString))
            {
                conn.Open();
                OleDbCommand comm = conn.CreateCommand();
                comm.CommandText = sql;
                using (OleDbDataReader odr = comm.ExecuteReader())
                {
                    while (odr.Read())
                    {
                        dic.Add(odr["showValue"].ToString(), odr["dataValue"].ToString());
                    }
                }
            }
            return dic;
        }

        public static string getval(List<serchModule> modules, string colume, string type)
        {
            string val = string.Empty;
            foreach (serchModule modoule in modules)
            {
                if (modoule.colume == colume && modoule.type.IndexOf(type)==0)
                {
                    val = modoule.val;
                }
            }
            return val;
        }

        public static string getSPCheckBoxSQL(SerchField sf, string values)
        {
            string returnVal = string.Empty;
            List<SPCheckBox> spList = sf.spCheckBox.FindAll(delegate(SPCheckBox box) { return ("," + values + ",").IndexOf("," + box.value + ",") > -1; });
            if (spList.Count > 0)
            {
                returnVal += " and (";
                foreach (var c in spList)
                {
                    returnVal += sf.dbColume + " in  (" + c.source + ") or ";
                }
                if (returnVal.EndsWith("or "))
                {
                    returnVal = returnVal.TrimEnd("or ".ToCharArray());
                }
                returnVal += " )";
            }
            return returnVal;
        }
    }

    public class ReportModule
    {
        /// <summary>
        /// 页面参数Category
        /// </summary>
        public string category { set; get; }
        /// <summary>
        /// 检索条件框的中文名
        /// </summary>
        public string zhName { set; get; }
        /// <summary>
        /// 数据源的SQL，不带ORderBY
        /// </summary>
        public string sql;
        /// <summary>
        /// OrderBy条件
        /// </summary>
        public string orderbySql;
        /// <summary>
        /// 额外附加的SQL，只有第一次加载时才会加在普通SQL后面，orderbysql前面
        /// </summary>
        public string additional_sql;
        /// <summary>
        /// 是否需要分页
        /// </summary>
        public bool pageing;
        /// <summary>
        /// 是否需要计算列
        /// </summary>
        public bool isCal;
        /// <summary>
        /// 是否需要复选框列
        /// </summary>
        public bool needCheckBox;
        /// <summary>
        /// 复选框的Value属性对应的字段值
        /// </summary>
        public string keyColume;
        /// <summary>
        /// 行内编辑的表名
        /// </summary>
        public string keyTable;
        /// <summary>
        /// 复选框还是单选框
        /// </summary>
        public string checkBoxType;
        public List<SerchField> SerchFields { set; get; }
        public List<displayColume> displayColumes { set; get; }
        public List<exportcolume> exportColumes { set; get; }
        public DataTable dataSource;
        public Chart chart { set; get; }
        public int serchRowItemCount { set; get; }
        public List<Buttons> buttons { set; get; }
        public bool isSerch { set; get; }
        /// <summary>
        /// 是否需要导出按钮
        /// </summary>
        public bool needPrint { set; get; }
        /// <summary>
        /// 检索页中部的数据源
        /// </summary>
        public string middleSQL { set; get; }
        /// <summary>
        /// 检索页中部的HTML模板
        /// </summary>
        public string middleHTML { set; get; }
        /// <summary>
        /// 自定义引用JS
        /// </summary>
        public string customJS { set; get; }
        /// <summary>
        /// 检索拦是否展开
        /// </summary>
        public bool iszhankai { set; get; }

        public ReportModule()
        {
            iszhankai = true;
        }
    }

    public class Buttons
    {
        /// <summary>
        /// 按钮显示的名称
        /// </summary>
        public string buttonName { set; get; }
        /// <summary>
        /// 按钮显示的位置
        /// </summary>
        public showPosition showPositon { get; set; }
        /// <summary>
        /// 传递到后台的参数
        /// </summary>
        public string ajaxParam { set; get; }
        /// <summary>
        /// 后台类名。必须是静态类。并且包含完整命名空间
        /// </summary>
        public string ajaxClass { set; get; }
        /// <summary>
        /// 后台类中的方法名，默认参数为HttpContext
        /// </summary>
        public string ajaxFunction { set; get; }
        /// <summary>
        /// 按钮执行完成后事件
        /// </summary>
        public string success { set; get; }
        /// <summary>
        /// 是否前台按钮，如果前台按钮则没有AJAX调用
        /// </summary>
        public bool isFontButton { set; get; }
    }

    public class SerchField
    {
        public string type { set; get; }
        public string serchType { set; get; }
        public string dbColume { set; get; }
        public string source { set; get; }
        public string zhName { set; get; }
        public string defaultValue { set; get; }
        public int occupy { set; get; }
        public bool serchByOrder { set; get; }
        /// <summary>
        /// 代表替换的SQL里的参数
        /// </summary>
        public string param { set; get; }
        public List<SPCheckBox> spCheckBox { set; get; }
        public bool needSerchRange { set; get; }
        public SerchField()
        {
            this.occupy = 1;
            this.serchByOrder = false;
            this.needSerchRange = false;
        }
    }

    public class SPCheckBox
    {
        public string source { set; get; }
        public string text { set; get; }
        public string value { set; get; }
    }
    /// <summary>
    /// 显示[列]对象
    /// </summary>
    public class displayColume
    {
        public string dbcolume { set; get; }
        public string Type { set; get; }
        public string Format { set; get; }
        public string Cal { set; get; }
        public string zhName { set; get; }
        public string align { set; get; }
        public string width { set; get; }
        public string link { set; get; }
        public string script { set; get; }
        public int wordLength { set; get; }
        public string displayDBColumn { set; get; }
        public string roles { set; get; }
        public string hiddenFor { set; get; }
        public string hiddenForRole { set; get; }
        public bool orderby { set; get; }
        public bool update { set; get; }
        public string dataType { set; get; }
        public string maxValue { set; get; }
        public string minValue { set; get; }
        public displayColume()
        {
            this.orderby = false;
            this.update = false;
            this.dataType = "text";
        }
    }
    /// <summary>
    /// 导出[列]对象
    /// </summary>
    public class exportcolume
    {
        //标题
        public string etitle { set; get; }
        //数据源列
        public string ecolume { set; get; }
        //文本名
        public string ezhName { set; get; }
        //合计格式[avg,sum]
        public string eCal { set; get; }
        //数据转换格式
        public string eFormat { set; get; }
        //数据源类型
        public string eType { set; get; }
        //自定义宽度
        public string eWidth { set; get; }
        //索引排序
        public int eIndex { set; get; }
    }
    
    public class serchModule
    {
        public string colume { set; get; }
        public string type { set; get; }
        public string val { set; get; }
        public string nowoperator { set; get; }
    }
}