using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Xml;
using System.Text;
using System.Diagnostics;
using System.Reflection;
using System.IO;
using System.Data.OleDb;

namespace CollegeAPP.ReportCenter
{
    public class ChartHelp
    {
        static string ConnectionString = System.Configuration.ConfigurationManager.AppSettings["OLEDB_connString"];

		public static List<SerchField> getSearchFields(XmlNode root, string path)
		{
			List<SerchField> serchFields = new List<SerchField>();
			foreach (XmlNode xnode in root.SelectSingleNode(path).ChildNodes)
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
				if (xnode.Attributes["defaultValue"] != null)
				{
					field.defaultValue = xnode.Attributes["defaultValue"].Value;
				}
				if (xnode.Attributes["param"] != null)
				{
					field.param = xnode.Attributes["param"].Value;
				}
				serchFields.Add(field);
			}
			return serchFields;
		}

		public static Chart getChart(XmlDocument xd, string itempath, string chartpath)
		{
			//生成图表用数据
			Chart chart = new Chart();
			XmlNode chartnode = xd.SelectSingleNode(chartpath);
			chart.type = getXmlAttriValue(chartnode, "type");
			chart.logicType = getXmlAttriValue(chartnode, "logicType");
			chart.style = getXmlAttriValue(chartnode, "style");
			chart.yPointLeft = getXmlAttriValue(chartnode, "yPointLeft");
			chart.yPointRight = getXmlAttriValue(chartnode, "yPointRight");
			chart.yTitleLeft = getXmlAttriValue(chartnode, "yTitleLeft");
			chart.yTitleRight = getXmlAttriValue(chartnode, "yTitleRight");
			chart.yminLeft = getXmlAttriValue(chartnode, "yMinLeft");
			chart.yminRight = getXmlAttriValue(chartnode, "yMinRight");
			//图标文字说明
			chart.chartRemark = getXmlAttriValue(chartnode, "chartRemark");
			chart.CanExportData = getXmlAttriValue(chartnode, "CanExportData");
			chart.CanShowTableData = getXmlAttriValue(chartnode, "CanShowTableData");
			chart.ShowFloatDiv = getXmlAttriValue(chartnode, "ShowFloatDiv");
			chart.SplitTableDbColumn = getXmlAttriValue(chartnode, "SplitTableDbColumn");
			chart.TitleData = getXmlAttriValue(chartnode, "TitleData");
			chart.SubtitleData = getXmlAttriValue(chartnode, "SubtitleData");
			//显示基准线；
			string xmlLine = getXmlAttriValue(chartnode, "isShowDatumLine");
			if (!String.IsNullOrEmpty(xmlLine) && xmlLine.ToLower() == "true")
			{
				chart.isShowDatumLine = xmlLine.ToLower(); //是否显示基准线；
				if (getXmlAttriValue(chartnode, "avgDbColume") != "")
				{
					chart.avgDbColume = xd.SelectSingleNode(chartpath).Attributes["avgDbColume"].Value;
				}
				else
				{
					string avgLine = getXmlAttriValue(chartnode, "avgAsDatumLine");//平均数为基准线
					if (!string.IsNullOrEmpty(avgLine))
					{
						string avgAsDatumLine = avgLine.ToLower();
						chart.avgAsDatumLine = avgAsDatumLine;
						if (avgAsDatumLine.ToLower() == "false")
						{
							//设定固定值为基准线；
							string datumLineValue = string.Empty;
							string xmllinevalue = getXmlAttriValue(chartnode, "datumLineValue");
							if (!string.IsNullOrEmpty(xmllinevalue))
							{
								datumLineValue = xmllinevalue;
							}
							chart.datumLineValue = datumLineValue;
						}
					}
				}
			}
			chart.columes = getColumnsList(xd, itempath, chartpath + "/columes");
			chart.exportcolumes = getColumnsList(xd, itempath, chartpath + "/exportcolumns"); //要导出的列；
			return chart;
		}

		public static List<Colume> getColumnsList(XmlDocument xd, string itempath, string chartpath)
		{
			XmlNode root = xd.SelectSingleNode(itempath);
			List<Colume> columes = new List<Colume>();
			if (root != null)
			{
				XmlNode node = root.SelectSingleNode(chartpath);
				if (node != null)
				{
					int length = node.ChildNodes.Count;
					for (int i = 0; i < length; i++)
					{
						XmlNode xnode = node.ChildNodes[i];
						Colume colume = new Colume();
						colume.cnName = getXmlAttriValue(xnode, "CName");
						colume.SortRule = getXmlAttriValue(xnode, "SortRule");
						colume.ExportCName = getXmlAttriValue(xnode, "ExportCName");
						colume.dbColume = getXmlAttriValue(xnode, "dbColume");
						colume.type = getXmlAttriValue(xnode, "type");
						colume.Color = getXmlAttriValue(xnode, "Color");
						colume.showType = getXmlAttriValue(xnode, "showType");
						colume.Condition = getXmlAttriValue(xnode, "Condition");
						colume.Width = getXmlAttriValue(xnode, "Width");
						colume.Link = getXmlAttriValue(xnode, "Link");
						if (xnode.ChildNodes.Count > 0)
						{
							colume.onclick = getXmlInnerText(xnode.ChildNodes[0]);
						}
						columes.Add(colume);
					}
				}
			}
			return columes;
		}

		private static string getXmlInnerText(XmlNode node)
		{
			if (node.InnerText == null)
			{
				return "";
			}
			else
			{
				return node.InnerText;
			}
		}

		/// <summary>
		/// 得到xml指定节点的属性值；
		/// </summary>
		/// <param name="node"></param>
		/// <param name="AttriName"></param>
		/// <returns></returns>
		private static string getXmlAttriValue(XmlNode node, string AttriName)
		{
			if (node.Attributes[AttriName] == null)
			{
				return "";
			}
			else
			{
				return node.Attributes[AttriName].Value;
			}
			//return IfThen(node.Attributes[AttriName] == null, "", node.Attributes[AttriName].Value);
		}

        public static ReportModule getModule(string category)
        {
			ReportModule module = null;
			XmlDocument xd = loadXMLDoc();
            //图表用
			string itempath = "/root/items/item[@category='" + category + "']";
			XmlNode root = xd.SelectSingleNode("/root/items/item[@category='" + category + "' and @isChart='1']");
			if (root != null)
			{
				module = new ReportModule();
				module.category = category;
				module.zhName = root.Attributes["zhName"].Value;
				module.pageing = Convert.ToBoolean(root.Attributes["ispageing"].Value);
				module.sql = xd.SelectSingleNode(itempath + "/sql").InnerText;
				module.orderbySql = xd.SelectSingleNode(itempath + "/orderbysql").InnerText;

				//检索条件
				string searchpath = itempath + "/serchFields";
				module.SerchFields = getSearchFields(root, searchpath);

				//获得chart
				string chartpath = itempath + "/chart";
				module.chart = getChart(xd, itempath, chartpath);
			}
            return module;
        }

		/// <summary>
		/// 
		/// </summary>
		/// <returns></returns>
		public static XmlDocument loadXMLDoc()
		{
			XmlDocument xd = new XmlDocument();
			xd.Load(HttpContext.Current.Server.MapPath("~/xml/Chart.xml"));
			return xd;
		}

		/// <summary>
		/// 当前饼图是否存在子饼图
		/// </summary>
		/// <param name="category">当前类别</param>
		/// <returns>Boolean：存在返回true，反之为false;</returns>
		public static Boolean existsChildChart(string category)
		{
			Boolean isExists=false;
			XmlDocument xd = loadXMLDoc();
			XmlNode root = xd.SelectSingleNode("/root/items/item[@category='" + category + "' and @isChart='1']/childchart");
			if(null!=root)
				isExists = true;
			return isExists;
		}


		/// <summary>
		/// 当前母饼图上点击，是否传递动态参数
		/// </summary>
		/// <param name="category">当前类别</param>
		/// <returns>Boolean：存在返回true，反之为false;</returns>
		public static Boolean existsParentChartClickParam(string category)
		{
			Boolean isExists = false;
			XmlDocument xd = loadXMLDoc();
			XmlNode root = xd.SelectSingleNode("/root/items/item[@category='" + category + "' and @isChart='1']/childchart");
			if (null != root)
			{
				if (root.Attributes["parentchartclickparam"] != null && root.Attributes["parentchartclickparam"].Value.ToLower() == "true")
				{
					isExists = true;
				}
			}
			return isExists;
		}


		/// <summary>
		/// 获取子图；
		/// </summary>
		/// <param name="category"></param>
		/// <returns></returns>
		public static ReportModule getChildCharts(string category)
		{
			//List<ReportModule> rmlist = new List<ReportModule>();
			XmlDocument xd = loadXMLDoc();
			//节点路径
			string itempath = "/root/items/item[@category='" + category + "']";
			string childpath = itempath + "/childchart";
			XmlNode root = xd.SelectSingleNode(childpath);

			//子饼图数据源属性；
			ReportModule module= null;
			if (root != null)
			{
				module = new ReportModule();
				//子饼图childchart 属性；
				module.category = category;
				module.zhName = root.Attributes["zhName"].Value;
				//module.pageing = Convert.ToBoolean(root.Attributes["ispageing"].Value);
				//子饼图childchart 执行SQL；
				module.sql = root.SelectSingleNode(childpath + "/childsql").InnerText;
				module.orderbySql = root.SelectSingleNode(childpath + "/childorderbysql").InnerText;
				//检索条件
				XmlNode searchroot = xd.SelectSingleNode("/root/items/item[@category='" + category + "' and @isChart='1']");
				string searchpath = itempath + "/serchFields";
				module.SerchFields = getSearchFields(searchroot, searchpath);

				module.chart = getChart(xd, itempath, childpath);
			}
			return module;
		}
        public static DataTable getDataSource(string sql,List<System.Data.OleDb.OleDbParameter> Params)
        {
            DataTable returnTable = new DataTable();
            using (OleDbConnection conn = new OleDbConnection(ConnectionString))
            {
                OleDbCommand comm = conn.CreateCommand();
                comm.CommandText = sql;

                foreach (OleDbParameter param in Params)
                {
                    comm.Parameters.Add(param);
                }
                OleDbDataAdapter oda = new OleDbDataAdapter(comm);
                oda.Fill(returnTable);
            }
            return returnTable;
        }
		public static DataTable getDataSource(string[] NoSetSQL, string SetSQL)
		{
			DataTable returnTable = new DataTable();
			//using ()
			//{
			OleDbConnection conn = new OleDbConnection(ConnectionString);
			conn.Open();
			OleDbTransaction myTran = null;
			myTran = conn.BeginTransaction();
			OleDbCommand comm = new OleDbCommand();
			comm.Connection = conn;
			comm.Transaction = myTran;// 

			for (int i = 0; i < NoSetSQL.Length; i++)
			{
				comm.CommandText = NoSetSQL[i];
				comm.ExecuteNonQuery();
			}
			myTran.Commit();
			comm = conn.CreateCommand();
			comm.CommandText = SetSQL;
			OleDbDataAdapter oda = new OleDbDataAdapter(comm);
			oda.Fill(returnTable);
			//}
			conn.Close();
			return returnTable;
		}
    }



    //图表用
    public class series
    {
		public series()
		{
		}
        public series(string name)
        {
            this.Name = name;
			//this.Color = string.Empty;
            this.Data = new List<double>();
			this.ArryData = new List<List<double>>();
        }
		public series(string name,string showtype)
		{
			this.Name = name;
			this.type = showtype;
			this.Data = new List<double>();
			this.ArryData = new List<List<double>>();
		}
        string name;

        public string Name
        {
            get { return name; }
            set { name = value; }
        }

		string type;

		public string Type
		{
			get { return type; }
			set { type = value; }
		}

		string color;
		public string Color
		{
			get { return color; }
			set { color = value; }
		}

        List<double> data;
        public List<double> Data
        {
            get { return data; }
            set { data = value; }
        }

		List<List<double>> arrydata;
		public List<List<double>> ArryData
		{
			get { return arrydata; }
			set { arrydata = value; }
		}
    }

    public class Chart
    {
        public string type { set; get; }
		public string logicType { set; get; }
        public string style { set; get; }
		public string yminLeft { set; get; }
		public string yminRight { set; get; }
        public string yTitleLeft { set; get; }
		public string yTitleRight { set; get; }
        public string yPointLeft { set; get; }
		public string yPointRight { set; get; }
		public string datumLineValue { set; get; }
		public string avgAsDatumLine { set; get; }
		public string isShowDatumLine { set; get; }
		public string avgDbColume { set; get; }
		public string chartRemark { set; get; }
		public string CanExportData {set;get; }
		public string CanShowTableData { set; get; }
		public string ShowFloatDiv { set; get; }
		public string SplitTableDbColumn { set; get; }
		public string TitleData { set; get; }
		public string SubtitleData { set; get; }
        public List<Colume> columes { set; get; }
		public List<Colume> exportcolumes { set; get; }
    }

    public class Colume
    {
        public string type { set; get; }
        public string dbColume { set; get; }
		public string SortRule { set; get; }
		public string ExportCName { set; get; }
        public string cnName { set; get; }
		public string Color{set;get;}
		public string showType { set; get; }
		public string tooltip { set; get; }
		public string Condition { set; get; }
		public string onclick { set; get; }
		public string Width { set; get; }
		public string Link { set; get; }
    }

	public class ErrLog
	{
		/// <summary>
		///  增加错误日志
		/// </summary>
		/// <param name="error"></param>
		public static void Log(int v)
		{
			Log(v.ToString());
		}

		public static void Log(Exception ex)
		{
			Log(ex, ex.ToString());
		}

		public static void Log(Exception e, string info)
		{
			StringBuilder s = new StringBuilder();
			s.Append(e.Message);
			s.Append(Environment.NewLine);
			StackTrace st = new StackTrace(true);
			for (int i = 1; i < st.FrameCount; i++)
			{
				//不记录Log函数。
				StackFrame sf = st.GetFrame(i);
				if (sf.GetFileLineNumber() <= 0)
				{
					continue;
				}

				MethodInfo mi = sf.GetMethod() as MethodInfo;
				if (mi == null || mi.Name == "Log")
				{
					continue;
				}
				ParameterInfo[] pi = mi.GetParameters();
				StringBuilder temp = new StringBuilder();
				for (int j = 0; j < pi.Length; j++)
				{
					if (j > 0) temp.Append(", ");
					temp.Append(pi[j].ParameterType.Name + " " + pi[j].Name);
				}
				s.Append(String.Format("	文件{0,-20} 第{1,4:G}行 第{2,4:G}列 {3}({4})",
					System.IO.Path.GetFileName(sf.GetFileName()),
					sf.GetFileLineNumber(),
					sf.GetFileColumnNumber(),
					mi.Name,
					"")); //temp
				s.Append(Environment.NewLine);
			}
			s.Append(info);
			Log(s);
		}

		public static void Log(string error)
		{
			try
			{
				if (!Directory.Exists(MapPath("~/log")))
				{
					Directory.CreateDirectory(MapPath("~/log"));
				}

				string filename = MapPath("~/log/error" + DateTime.Now.ToString("yyyyMMdd") + ".log");
				System.IO.TextWriter f = new System.IO.StreamWriter(filename, true, System.Text.ASCIIEncoding.Default);
				f = TextWriter.Synchronized(f); //多线程化
				f.WriteLine(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + " " + "test"+ " " + "" + " " + error);
				f.Close();
			}
			catch { return; }
		}

		/// <summary>
		/// 增加错误日志
		/// </summary>
		/// <param name="error"></param>
		public static void Log(object error)
		{
			Log(error.ToString());
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="url"></param>
		/// <returns></returns>
		public static string MapPath(string url)
		{
			string s = url;
			try
			{
				s = System.Web.HttpContext.Current.Server.MapPath(url);
			}
			catch { }
			return s;
		}
	}
}
