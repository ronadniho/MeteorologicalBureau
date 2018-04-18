using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.OleDb;
using System.Configuration;
using System.Text;
using CollegeAPP.Model;
using Newtonsoft.Json;

namespace CollegeAPP.backHTML
{
    /// <summary>
    /// backHtmlHelp 的摘要说明
    /// </summary>
    public class backHtmlHelp : IHttpHandler
    {
        public static string data = "";
        public void ProcessRequest(HttpContext context)
        {
            string func = context.Request["func"];
            data = "";
            switch (func)
            {
                case "getNodeInfo":
                    getNodeInfo(context);
                    break;
                case "delNode":
                    delNode(context);
                    break;
                case "update":
                    updateNode(context);
                    break;
                case "saveNew":
                    saveNode(context);
                    break;
                case "delInfo":
                    delInfo(context);
                    break;
                case "fbInfo":
                    fblInfo(context);
                    break;
                case "qxfbInfo":
                    cancelFB(context);
                    break;
                case "deleQuestion":
                    deleteQuestionByid(context);
                    break;
                case "addQuestionClass":
                    addClassQuestion(context);
                    break;
                case "selectInfo":
                    selectInfo(context);
                    break;
                case "changeIndex":
                    changeIndex(context);
                    break;
                case "getLogData":
                    getLogData(context);
                    break;
                case "getAllLogData":
                    getAllLogData(context);
                    break;
                case "getQuestion":
                    getQuestion(context);
                    break;
                case "getMenuData":
                    getMenuData(context);
                    break;
                case "getVideoInfo":
                    getVideoInfo(context);
                    break;
                case "getFuntionData":
                    getFuntionData(context);
                    break;
                case "getLoginData":
                    getLoginData(context);
                    break;
                case "getStudentLoginData":
                    getStudentLoginData(context);
                    break;
                case "getXXKData":
                    getXXKData(context);
                    break;
                case "getGroupData":
                    getGroupData(context);
                    break;
                case "ZdInfo":
                    ZdInfo(context);
                    break;
                case "getQuestionData":
                    getQuestionData(context);
                    break;
                case "getStudengScoreData":
                    getStudengScoreData(context);
                    break;
                case "deleteNoticeByid":
                    deleteNoticeByid(context);
                    break;
                case "submitComment":
                    submitComment(context);
                    break;
                case "submitTemplate":
                    submitTemplate(context);
                    break;
            }
            context.Response.Write(data);
        }

        private void selectInfo(HttpContext context)
        {
            string id = context.Request["ids"];
            string subInfo_id = context.Request["subInfo_id"];
            using (OleDbConnection conn = new OleDbConnection(ConfigurationManager.AppSettings["OLEDB_connString"]))
            {
                conn.Open();
                OleDbCommand comm = conn.CreateCommand();
                comm.CommandText = "select count(*) from app_videostudy_relation where info_id=:info_id and finfo_id=:finfo_id";
                comm.Parameters.Add(new OleDbParameter("info_id", subInfo_id));
                comm.Parameters.Add(new OleDbParameter("finfo_id", id));
                if (Convert.ToInt32(comm.ExecuteScalar()) == 0)
                {
                    comm.Parameters.Clear();
                    comm.CommandText = "insert into app_videostudy_relation (info_id,finfo_id,showorder) values (:info_id,:finfo_id,:showorder)";
                    comm.Parameters.Add(new OleDbParameter("info_id", subInfo_id));
                    comm.Parameters.Add(new OleDbParameter("finfo_id", id));
                    comm.Parameters.Add(new OleDbParameter("showorder", 1));
                    comm.ExecuteNonQuery();
                    data = id;

                    comm.Parameters.Clear();
                    comm.CommandText = "update app_videostudy set VIDEO_LEVEL=1 where info_id=:fid";
                    comm.Parameters.Add(new OleDbParameter("fid", id));
                    comm.ExecuteNonQuery();

                    comm.Parameters.Clear();
                    comm.CommandText = "update app_videostudy set VIDEO_LEVEL=2 where info_id=:info_id";
                    comm.Parameters.Add(new OleDbParameter("info_id", subInfo_id));
                    comm.ExecuteNonQuery();
                    CommonSQL.doLog(comm, "内容管理:新增内容 ", "内容管理");
                }
                else
                {
                    data = id;
                }
            }
        }

        [Serializable]
        public class commentItem
        {
            public string info_id { get; set; }
            public string userId { get; set; }
            public string pid { get; set; }
            public string pnid { get; set; }
            public string opinion { get; set; }
            public string username { get; set; }
        }

        public void submitComment(HttpContext context)
        {
            string items = HttpUtility.UrlDecode(context.Request["items"]);
            items = "[" + items + "]"; ;
            List<commentItem> paramsList = JsonConvert.DeserializeObject<List<commentItem>>(items);
            string returnVal = "1";
            string info_id = "";
            string pid = "";
            string pnid = "";
            string opinion = "";
            string username = "";
            string userId = "";
            using (OleDbConnection conn = new OleDbConnection(ConfigurationManager.AppSettings["OLEDB_connString"]))
            {
                foreach (commentItem paramStu in paramsList)
                {
                    info_id = paramStu.info_id;
                    pid = paramStu.pid;
                    pnid = paramStu.pnid;
                    opinion = paramStu.opinion;
                    username = paramStu.username;
                    userId = paramStu.userId;
                }
                conn.Open();
                try
                {

                    OleDbCommand commList = conn.CreateCommand();
                    commList.CommandText = @" delete from g_opinion where pid='" + pid + "' and pnid='" + pnid + "'  ";
                    commList.ExecuteNonQuery();
                    commList.CommandText = @" INSERT INTO g_opinion
		      (id,pid,pnid,userId,USERNAME,MUSERID,MUSERNAME,content,LASTUPDATEDATE,STATUS)
		    values (1, '" + pid + "', '" + pnid + "', '" + userId + "', '" + username + "', '" + userId + "', '" + username + "','" + opinion + "', sysdate, 1) ";
                    commList.ExecuteNonQuery();
                }
                catch (Exception e)
                {
                }
                finally
                {
                    conn.Close();
                }
            }
        }

        [Serializable]
        public class commentTemplate
        {
            public string userId { get; set; }
            public string opinion { get; set; }
            public string moduleId { get; set; }
            public string actName { get; set; }
        }

        public void submitTemplate(HttpContext context)
        {
            string items = HttpUtility.UrlDecode(context.Request["items"]);
            items = "[" + items + "]"; ;
            List<commentTemplate> paramsList = JsonConvert.DeserializeObject<List<commentTemplate>>(items);
            string returnVal = "1";
            string moduleId = "";
            string opinion = "";
            string actName = "";
            string userId = "";
            using (OleDbConnection conn = new OleDbConnection(ConfigurationManager.AppSettings["OLEDB_connString"]))
            {
                foreach (commentTemplate paramStu in paramsList)
                {
                    moduleId = paramStu.moduleId;
                    opinion = paramStu.opinion;
                    actName = paramStu.actName;
                    userId = paramStu.userId;
                }
                conn.Open();
                try
                {
                    OleDbCommand commList = conn.CreateCommand();
                    commList.CommandText = @" INSERT INTO g_opinion_template
			(id, userId, content, type, actName) values((select max(id)+1 from G_OPINION_TEMPLATE),'" + userId + "','" + opinion + "','" + moduleId + "','" + actName + "') ";
                    commList.ExecuteNonQuery();
                }
                catch (Exception e)
                {
                }
                finally
                {
                    conn.Close();
                }
            }
        }
        private void delNode(HttpContext context)
        {
            string id = context.Request["id"];
            if (!string.IsNullOrEmpty(id))
            {
                OleDbConnection M_Conn = new OleDbConnection(ConfigurationManager.AppSettings["OLEDB_connString"]);
                try
                {
                    string sql = "";
                    sql = "delete from app_mobilemenu where info_id= " + id + " or finfo_id=" + id;
                    OleDbCommand M_Comm = new OleDbCommand();
                    M_Conn.Open();
                    M_Comm.Connection = M_Conn;
                    M_Comm.CommandText = sql;
                    M_Comm.ExecuteNonQuery();
                    CommonSQL.doLog(M_Comm, "栏目管理:删除栏目", "栏目管理");
                }
                catch (Exception e)
                {
                }
                finally
                {
                    M_Conn.Close();
                    data = "1";
                }
            }
        }
        private void delInfo(HttpContext context)
        {
            string ids = context.Request["ids"];
            if (!string.IsNullOrEmpty(ids))
            {
                string[] idlist = ids.Split(',');
                ids = "";
                foreach (string item in idlist)
                {
                    ids += "'" + item + "',";
                }
                ids = ids.TrimEnd(',');
                OleDbConnection M_Conn = new OleDbConnection(ConfigurationManager.AppSettings["OLEDB_connString"]);
                try
                {
                    string sql = "";
                    sql = "update  app_videostudy set status=-1 where info_id in (" + ids + " )";
                    OleDbCommand M_Comm = new OleDbCommand();
                    M_Conn.Open();
                    M_Comm.Connection = M_Conn;
                    M_Comm.CommandText = sql;
                    M_Comm.ExecuteNonQuery();
                    data = "1";
                    CommonSQL.doLog(M_Comm, "内容管理:删除内容 ", "内容管理");
                }
                catch (Exception e)
                {
                }
                finally
                {
                    M_Conn.Close();
                }
            }
        }

        private void changeIndex(HttpContext context)
        {
            string ids = context.Request["id"];
            string menuid = context.Request["menuid"];
            if (!string.IsNullOrEmpty(ids))
            {
                OleDbConnection M_Conn = new OleDbConnection(ConfigurationManager.AppSettings["OLEDB_connString"]);
                try
                {
                    string sql = "";
                    OleDbCommand M_Comm = new OleDbCommand();
                    M_Conn.Open();
                    M_Comm.Connection = M_Conn;

                    string[] idlist = ids.Split(',');
                    ids = "";
                    foreach (string item in idlist)
                    {
                        ids += "'" + item + "',";

                        sql = "update app_mobilemenu set playcount=playcount+(select playcount from app_videostudy where info_id='" + item + "') where info_id=" + menuid;
                        M_Comm.CommandText = sql;
                        M_Comm.ExecuteNonQuery();

                        sql = "update app_mobilemenu set playcount=playcount-(select playcount from app_videostudy where info_id='" + item + "') where info_id=(select menuid from app_videostudy where info_id='" + item + "')";
                        M_Comm.CommandText = sql;
                        M_Comm.ExecuteNonQuery();
                    }
                    ids = ids.TrimEnd(',');

                    sql = "update  app_videostudy set menuid=" + menuid + " where info_id in (" + ids + " )";
                    M_Comm.CommandText = sql;
                    M_Comm.ExecuteNonQuery();
                    data = "1";
                    CommonSQL.doLog(M_Comm, "内容管理:移动内容 ", "内容管理");
                }
                catch (Exception e)
                {
                    M_Conn.Close();
                }
                finally
                {
                    M_Conn.Close();
                }
            }
        }

        private void fblInfo(HttpContext context)
        {
            string ids = context.Request["ids"];
            if (!string.IsNullOrEmpty(ids))
            {
                string[] idlist = ids.Split(',');
                ids = "";
                foreach (string item in idlist)
                {
                    ids += "'" + item + "',";
                }
                ids = ids.TrimEnd(',');
                OleDbConnection M_Conn = new OleDbConnection(ConfigurationManager.AppSettings["OLEDB_connString"]);
                try
                {
                    string sql = "";
                    sql = "update  app_videostudy set status=1 where info_id in (" + ids + " )";
                    OleDbCommand M_Comm = new OleDbCommand();
                    M_Conn.Open();
                    M_Comm.Connection = M_Conn;
                    M_Comm.CommandText = sql;
                    M_Comm.ExecuteNonQuery();
                    sql = "update  app_mobilemenu set LASTUPDATETIME=sysdate where info_id = (select menuid from app_videostudy where info_id in (" + ids + " ) and rownum=1 )";
                    M_Comm.CommandText = sql;
                    M_Comm.ExecuteNonQuery();
                    data = "1";
                    CommonSQL.doLog(M_Comm, "内容管理:发布内容 ", "内容管理");
                }
                catch (Exception e)
                {
                }
                finally
                {
                    M_Conn.Close();
                }
            }
        }

        /// <summary>
        /// 置顶，取消置顶
        /// </summary>
        /// <param name="context"></param>
        private void ZdInfo(HttpContext context)
        {
            string ids = context.Request["ids"];
            string funType = context.Request["funType"];
            if (!string.IsNullOrEmpty(ids))
            {
                string[] idlist = ids.Split(',');
                ids = "";
                foreach (string item in idlist)
                {
                    ids += "'" + item + "',";
                }
                ids = ids.TrimEnd(',');
                OleDbConnection M_Conn = new OleDbConnection(ConfigurationManager.AppSettings["OLEDB_connString"]);
                try
                {
                    string sql = "";
                    if (funType == "1")
                    {
                        sql = "update  app_videostudy set istop=1 where info_id in (" + ids + " )";
                    }
                    else
                    {
                        sql = "update  app_videostudy set istop=0 where info_id in (" + ids + " )";
                    }
                    OleDbCommand M_Comm = new OleDbCommand();
                    M_Conn.Open();
                    M_Comm.Connection = M_Conn;
                    M_Comm.CommandText = sql;
                    M_Comm.ExecuteNonQuery();
                    data = "1";
                    if (funType == "1")
                    {
                        CommonSQL.doLog(M_Comm, "内容管理:置顶内容 ", "内容管理");
                    }
                    else
                    {
                        CommonSQL.doLog(M_Comm, "内容管理:取消置顶内容 ", "内容管理");
                    }
                }
                catch (Exception e)
                {
                }
                finally
                {
                    M_Conn.Close();
                }
            }
        }

        private void cancelFB(HttpContext context)
        {
            string ids = context.Request["ids"];
            if (!string.IsNullOrEmpty(ids))
            {
                string[] idlist = ids.Split(',');
                ids = "";
                foreach (string item in idlist)
                {
                    ids += "'" + item + "',";
                }
                ids = ids.TrimEnd(',');
                OleDbConnection M_Conn = new OleDbConnection(ConfigurationManager.AppSettings["OLEDB_connString"]);
                try
                {
                    string sql = "";
                    sql = "update  app_videostudy set status=0 where info_id in (" + ids + " )";
                    OleDbCommand M_Comm = new OleDbCommand();
                    M_Conn.Open();
                    M_Comm.Connection = M_Conn;
                    M_Comm.CommandText = sql;
                    M_Comm.ExecuteNonQuery();
                    data = "1";
                    CommonSQL.doLog(M_Comm, "内容管理:取消发布内容 ", "内容管理");
                }
                catch (Exception e)
                {
                }
                finally
                {
                    M_Conn.Close();
                }
            }
        }

        private void updateNode(HttpContext context)
        {
            string id = context.Request["id"];
            if (!string.IsNullOrEmpty(id))
            {
                string title = HttpContext.Current.Server.UrlDecode(context.Request["title"]);
                string type = context.Request["type"];
                string order = context.Request["order"];
                string jianjie = context.Request["content"];
                string url = HttpContext.Current.Server.UrlDecode(context.Request["url"]);
                OleDbConnection M_Conn = new OleDbConnection(ConfigurationManager.AppSettings["OLEDB_connString"]);
                try
                {
                    string sql = "";
                    sql = "update app_mobilemenu set title='" + title + "',url='" + url + "',orderby='" + order + "',type='" + type + "',content='" + jianjie + "'  where info_id= " + id;
                    OleDbCommand M_Comm = new OleDbCommand();
                    M_Conn.Open();
                    M_Comm.Connection = M_Conn;
                    M_Comm.CommandText = sql;
                    M_Comm.ExecuteNonQuery();
                    data = "1";
                    CommonSQL.doLog(M_Comm, "栏目管理:更新" + title, "栏目管理");
                }
                catch (Exception e)
                {
                }
                finally
                {
                    M_Conn.Close();
                }
            }
        }

        private void saveNode(HttpContext context)
        {
            string fid = context.Request["fid"];
            if (!string.IsNullOrEmpty(fid))
            {
                string title = HttpContext.Current.Server.UrlDecode(context.Request["title"]);
                string type = context.Request["type"];
                string order = context.Request["order"];
                string jianjie = context.Request["content"];
                string url = HttpContext.Current.Server.UrlDecode(context.Request["url"]);
                OleDbConnection M_Conn = new OleDbConnection(ConfigurationManager.AppSettings["OLEDB_connString"]);
                try
                {
                    string sql = "";
                    sql = "insert into app_mobilemenu (info_id,finfo_id,title,url,orderby,type,pic,content) values( (select nvl(max(to_number(info_id)),0)+1 from app_mobilemenu )," + fid + ", '" + title + "','" + url + "','" + order + "','" + type + "',' ','" + jianjie + "')  ";
                    OleDbCommand M_Comm = new OleDbCommand();
                    M_Conn.Open();
                    M_Comm.Connection = M_Conn;
                    M_Comm.CommandText = sql;
                    M_Comm.ExecuteNonQuery();
                    data = "1";
                    CommonSQL.doLog(M_Comm, "栏目管理:新增" + title, "栏目管理");
                }
                catch (Exception e)
                {
                }
                finally
                {
                    M_Conn.Close();
                }
            }
        }


        private void getNodeInfo(HttpContext context)
        {
            string id = context.Request["id"];
            string returnVal = "";
            if (!string.IsNullOrEmpty(id))
            {
                string sql = "";
                sql = "select * from app_mobilemenu where info_id= " + id;
                OleDbCommand M_Comm = new OleDbCommand();
                OleDbConnection M_Conn = new OleDbConnection(ConfigurationManager.AppSettings["OLEDB_connString"]);
                M_Conn.Open();
                M_Comm.Connection = M_Conn;
                try
                {
                    M_Comm.CommandText = sql;
                    OleDbDataReader M_Reader = M_Comm.ExecuteReader();
                    if (M_Reader.Read())
                    {
                        returnVal = "{order:\"" + M_Reader["orderby"].ToString() + "\", type:\"" + M_Reader["type"].ToString() + "\", title:\"" + M_Reader["title"].ToString() + "\" , url:\"" + M_Reader["url"].ToString() + "\", jianjie:\"" + M_Reader["content"].ToString() + "\"},";
                    }

                }
                catch (Exception e)
                {
                }
                finally
                {
                    M_Conn.Close();
                }
            }
            data = returnVal.TrimEnd(',');

        }

        /// <summary>
        /// 查询日志
        /// </summary>
        /// <param name="context"></param>
        private void getLogData(HttpContext context)
        {
            string uname = context.Request["uname"];
            string utime = context.Request["utime"];
            string tmonth = context.Request["tmonth"];
            string utype = context.Request["utype"];
            string uindex = context.Request["uindex"];
            string returnVal = "[";
            if (!string.IsNullOrEmpty(utime) && !string.IsNullOrEmpty(tmonth))
            {
                string sql = "";
                string sqlWhere = "";
                if (!string.IsNullOrEmpty(uname))
                {
                    sqlWhere += "  and username like '%" + uname + "%' ";
                }
                if (!string.IsNullOrEmpty(utype) && utype != "全部")
                {
                    sqlWhere += "  and handlecategory = '" + utype + "' ";
                }
                sql = "select * from (select username,handletime,handlecategory,handle,datacount,rownum as orderText from ( ";
                sql += " select username,handletime,handlecategory,handle,(select count(*) from app_log_" + utime + "_" + tmonth + " where 1=1 " + sqlWhere + ") as datacount,rownum as orderText from app_log_" + utime + "_" + tmonth + " order by handletime desc) where 1=1 ";
                if (sqlWhere != "")
                {
                    sql += sqlWhere;
                }
                if (!string.IsNullOrEmpty(uindex))
                {
                    sql += " ) where orderText > (" + uindex + "-1) * 10 and orderText <= " + uindex + " * 10 ";
                }

                OleDbCommand M_Comm = new OleDbCommand();
                OleDbConnection M_Conn = new OleDbConnection(ConfigurationManager.AppSettings["OLEDB_connString"]);
                M_Conn.Open();
                M_Comm.Connection = M_Conn;
                try
                {
                    M_Comm.CommandText = sql;
                    OleDbDataReader M_Reader = M_Comm.ExecuteReader();

                    while (M_Reader.Read())
                    {
                        returnVal += "{username:\"" + M_Reader["username"].ToString() + "\", handletime:\"" + M_Reader["handletime"].ToString() + "\", handlecategory:\"" + M_Reader["handlecategory"].ToString() + "\" , handle:\"" + M_Reader["handle"].ToString() + "\", datacount:\"" + M_Reader["datacount"].ToString() + "\"},";
                    }

                }
                catch (Exception e)
                {
                }
                finally
                {
                    M_Conn.Close();
                }
            }
            returnVal = returnVal.TrimEnd(',');
            data = returnVal + "]";

        }

        /// <summary>
        /// 总体状态查询
        /// </summary>
        /// <param name="context"></param>
        private void getAllLogData(HttpContext context)
        {
            string returnVal = "[";
            string sql = @" select * from ( select (select count(*) from(select distinct bcid from app_log_Login)) as classcount,
                                 (select count(*) from app_log_Login) as peoplecount,
                                 (select count(*) from app_mobilemenu) as menucount,
                                 ( select count(*) from app_videostudy) as videocpunt from dual)";

            OleDbCommand M_Comm = new OleDbCommand();
            OleDbConnection M_Conn = new OleDbConnection(ConfigurationManager.AppSettings["OLEDB_connString"]);
            M_Conn.Open();
            M_Comm.Connection = M_Conn;
            try
            {
                M_Comm.CommandText = sql;
                OleDbDataReader M_Reader = M_Comm.ExecuteReader();

                while (M_Reader.Read())
                {
                    returnVal += "{classcount:\"" + M_Reader["classcount"].ToString() + "\", peoplecount:\"" + M_Reader["peoplecount"].ToString() + "\", menucount:\"" + M_Reader["menucount"].ToString() + "\" , videocpunt:\"" + M_Reader["videocpunt"].ToString() + "\"},";
                }

            }
            catch (Exception e)
            {
            }
            finally
            {
                M_Conn.Close();
            }
            returnVal = returnVal.TrimEnd(',');
            data = returnVal + "]";
        }

        /// <summary>
        /// 需求统计查询
        /// </summary>
        /// <param name="context"></param>
        private void getQuestion(HttpContext context)
        {
            string returnVal = "[";
            string sql = @"  select id,name,dataflag,(select count(*) from dsfa_question_publish_user where qid=qa.id) as qacount from dsfa_question qa ";

            OleDbCommand M_Comm = new OleDbCommand();
            OleDbConnection M_Conn = new OleDbConnection(ConfigurationManager.AppSettings["OLEDB_connString"]);
            M_Conn.Open();
            M_Comm.Connection = M_Conn;
            try
            {
                M_Comm.CommandText = sql;
                OleDbDataReader M_Reader = M_Comm.ExecuteReader();

                while (M_Reader.Read())
                {
                    returnVal += "{id:\"" + M_Reader["id"].ToString() + "\", name:\"" + M_Reader["name"].ToString() + "\", dataflag:\"" + M_Reader["dataflag"].ToString() + "\" , qacount:\"" + M_Reader["qacount"].ToString() + "\"},";
                }

            }
            catch (Exception e)
            {
            }
            finally
            {
                M_Conn.Close();
            }
            returnVal = returnVal.TrimEnd(',');
            data = returnVal + "]";
        }

        /// <summary>
        /// 栏目统计查询
        /// </summary>
        /// <param name="context"></param>
        private void getMenuData(HttpContext context)
        {
            string returnVal = "[";
            string sql = @" select 
                                (select sum(playcount)  from app_mobilemenu where info_id =19) as wjz,
                                (select sum(playcount)  from app_mobilemenu where info_id =29)as wsp,
                                (select sum(playcount)  from app_mobilemenu where info_id =30) as wal,
                                (select sum(playcount) from app_mobilemenu where info_id =31)  as wlt ,
                                (select sum(playcount) from app_mobilemenu where info_id =32) as wxc,
                                (select sum(playcount) from app_mobilemenu where info_id =24) as xxts,
                                (select sum(playcount) from app_mobilemenu where info_id =22) as xxsk,
                                (select sum(playcount) from app_mobilemenu where info_id =23) as lzdd,
                                (select sum(playcount) from app_mobilemenu where info_id =21) as dxjygs,
                                (select sum(playcount) from app_mobilemenu where info_id =33) as ggkf,
                                (select playcount from app_mobilemenu where info_id =20) as gkk,
                                (select playcount from app_mobilemenu where info_id =34) as wlxy
                                 from dual ";

            OleDbCommand M_Comm = new OleDbCommand();
            OleDbConnection M_Conn = new OleDbConnection(ConfigurationManager.AppSettings["OLEDB_connString"]);
            M_Conn.Open();
            M_Comm.Connection = M_Conn;
            try
            {
                M_Comm.CommandText = sql;
                OleDbDataReader M_Reader = M_Comm.ExecuteReader();

                while (M_Reader.Read())
                {
                    returnVal += "{wjz:\"" + M_Reader["wjz"].ToString() + "\", wsp:\"" + M_Reader["wsp"].ToString() + "\", wal:\"" + M_Reader["wal"].ToString() + "\" , wlt:\"" + M_Reader["wlt"].ToString() + "\",";
                    returnVal += "wxc:\"" + M_Reader["wxc"].ToString() + "\", xxts:\"" + M_Reader["xxts"].ToString() + "\", xxsk:\"" + M_Reader["xxsk"].ToString() + "\" , lzdd:\"" + M_Reader["lzdd"].ToString() + "\",";
                    returnVal += "dxjygs:\"" + M_Reader["dxjygs"].ToString() + "\", ggkf:\"" + M_Reader["ggkf"].ToString() + "\", gkk:\"" + M_Reader["gkk"].ToString() + "\" , wlxy:\"" + M_Reader["wlxy"].ToString() + "\"},";
                }

            }
            catch (Exception e)
            {
            }
            finally
            {
                M_Conn.Close();
            }
            returnVal = returnVal.TrimEnd(',');
            data = returnVal + "]";
        }

        /// <summary>
        /// 内容统计查询
        /// </summary>
        /// <param name="context"></param>
        private void getVideoInfo(HttpContext context)
        {
            string title = context.Request["title"];
            string orderby = context.Request["orderby"];
            string uindex = context.Request["uindex"];
            string returnVal = "[";
            string sql = "";
            string sqlWhere = "";
            if (!string.IsNullOrEmpty(title))
            {
                sqlWhere += "  and title like '%" + title + "%' ";
            }
            if (!string.IsNullOrEmpty(orderby) && orderby != "全部")
            {
                switch (orderby)
                {
                    case "访问正序":
                        sqlWhere += " order by playcount asc ";
                        break;
                    case "访问倒序":
                        sqlWhere += " order by playcount desc ";
                        break;
                    case "收藏正序":
                        sqlWhere += " order by mark asc ";
                        break;
                    case "收藏倒序":
                        sqlWhere += " order by mark desc ";
                        break;
                    case "点赞正序":
                        sqlWhere += " order by good asc ";
                        break;
                    case "点赞倒序":
                        sqlWhere += " order by good desc ";
                        break;
                    default:
                        break;
                }
            }
            sql = @"select * from ( select title,playcount,good,mark,menuname,datacount,rownum as orderText from (
                        select video.title,DECODE(playcount, null,0,playcount) AS playcount,(select count(*) from app_faorite where comtype=2 and finfo_id=video.info_id) as good,
                        (select count(*) from app_faorite where comtype=3 and finfo_id=video.info_id) as mark,
                        (select title from app_mobilemenu where info_id=(select finfo_id from app_mobilemenu where app_mobilemenu.info_id=video.menuid)) as menuname,
                        (select count(*) from APP_VIDEOSTUDY where CATEGORY!=0 and title like '%" + title + @"%') as datacount
                        from APP_VIDEOSTUDY video WHERE CATEGORY!=0 ";
            if (sqlWhere != "")
            {
                sql += sqlWhere;
            }
            if (!string.IsNullOrEmpty(uindex))
            {
                sql += " )) where orderText > (" + uindex + "-1) * 10 and orderText <= " + uindex + " * 10 ";
            }

            OleDbCommand M_Comm = new OleDbCommand();
            OleDbConnection M_Conn = new OleDbConnection(ConfigurationManager.AppSettings["OLEDB_connString"]);
            M_Conn.Open();
            M_Comm.Connection = M_Conn;
            try
            {
                M_Comm.CommandText = sql;
                OleDbDataReader M_Reader = M_Comm.ExecuteReader();

                while (M_Reader.Read())
                {
                    returnVal += "{title:\"" + M_Reader["title"].ToString() + "\", playcount:\"" + M_Reader["playcount"].ToString() + "\", good:\"" + M_Reader["good"].ToString() + "\" , mark:\"" + M_Reader["mark"].ToString() + "\", menuname:\"" + M_Reader["menuname"].ToString() + "\", datacount:\"" + M_Reader["datacount"].ToString() + "\"},";
                }

            }
            catch (Exception e)
            {
            }
            finally
            {
                M_Conn.Close();
            }

            returnVal = returnVal.TrimEnd(',');
            data = returnVal + "]";

        }

        /// <summary>
        /// 访问统计查询
        /// </summary>
        /// <param name="context"></param>
        private void getFuntionData(HttpContext context)
        {
            string tyear = context.Request["tyear"];
            string tmonth = context.Request["tmonth"];
            if (!string.IsNullOrEmpty(tyear) && !string.IsNullOrEmpty(tmonth))
            {
                string returnVal = "[";

                string sql = "select itemname,visitcount as fw from app_log_FunctionVisit";

                OleDbCommand M_Comm = new OleDbCommand();
                OleDbConnection M_Conn = new OleDbConnection(ConfigurationManager.AppSettings["OLEDB_connString"]);
                M_Conn.Open();
                M_Comm.Connection = M_Conn;
                try
                {
                    M_Comm.CommandText = sql;
                    OleDbDataReader M_Reader = M_Comm.ExecuteReader();

                    while (M_Reader.Read())
                    {
                        returnVal += "{itemname:\"" + M_Reader["itemname"].ToString() + "\", fw:\"" + M_Reader["fw"].ToString() + "\"},";
                        //returnVal += "{jxpj:\"" + M_Reader["jxpj"].ToString() + "\", kbcx:\"" + M_Reader["kbcx"].ToString() + "\", xxbm:\"" + M_Reader["xxbm"].ToString() + "\" , bjxx:\"" + M_Reader["bjxx"].ToString() + "\",";
                        //returnVal += "xyxz:\"" + M_Reader["xyxz"].ToString() + "\", dtdh:\"" + M_Reader["dtdh"].ToString() + "\", tzgg:\"" + M_Reader["tzgg"].ToString() + "\" , zjzp:\"" + M_Reader["zjzp"].ToString() + "\",";
                        //returnVal += "ydjx:\"" + M_Reader["ydjx"].ToString() + "\", bjjl:\"" + M_Reader["bjjl"].ToString() + "\", fwrx:\"" + M_Reader["fwrx"].ToString() + "\" , xctw:\"" + M_Reader["xctw"].ToString() + "\"},";
                    }
                }
                catch (Exception e)
                {
                }
                finally
                {
                    M_Conn.Close();
                }
                returnVal = returnVal.TrimEnd(',');
                data = returnVal + "]";
            }
        }

        /// <summary>
        /// 登录统计查询
        /// </summary>
        /// <param name="context"></param>
        private void getLoginData(HttpContext context)
        {
            string tyear = context.Request["tyear"];
            string tmonth = context.Request["tmonth"];
            if (!string.IsNullOrEmpty(tyear) && !string.IsNullOrEmpty(tmonth))
            {
                string returnVal = "[";
                string sql = @" select classid,
                                   classname,
                                   loginCount,
                                   (select count(*)
                                      from app_log_" + tyear + @"_" + tmonth + @"
                                     where handle = '微信登录'
                                       and classid = LOGINTAB.classid) as weixin,
                                   (select count(*)
                                      from app_log_" + tyear + @"_" + tmonth + @"
                                     where handle = 'APP登录'
                                       and classid = LOGINTAB.classid) as app
                              from (select classid, classname, count(*) as loginCount
                                      from app_log_" + tyear + @"_" + tmonth + @"
                                     where classid is not null AND handle IN( '微信登录', 'APP登录')
                                     group by classid, classname) LOGINTAB ";

                OleDbCommand M_Comm = new OleDbCommand();
                OleDbConnection M_Conn = new OleDbConnection(ConfigurationManager.AppSettings["OLEDB_connString"]);
                M_Conn.Open();
                M_Comm.Connection = M_Conn;
                try
                {
                    M_Comm.CommandText = sql;
                    OleDbDataReader M_Reader = M_Comm.ExecuteReader();

                    while (M_Reader.Read())
                    {
                        returnVal += "{classid:\"" + M_Reader["classid"].ToString() + "\", classname:\"" + M_Reader["classname"].ToString() + "\", loginCount:\"" + M_Reader["loginCount"].ToString() + "\" , weixin:\"" + M_Reader["weixin"].ToString() + "\", app:\"" + M_Reader["app"].ToString() + "\"},";
                    }

                }
                catch (Exception e)
                {
                }
                finally
                {
                    M_Conn.Close();
                }
                returnVal = returnVal.TrimEnd(',');
                data = returnVal + "]";
            }
        }

        /// <summary>
        /// 查询登录人次
        /// </summary>
        /// <param name="context"></param>
        private void getStudentLoginData(HttpContext context)
        {
            string tyear = context.Request["tyear"];
            string tmonth = context.Request["tmonth"];
            string classid = context.Request["classid"];
            if (!string.IsNullOrEmpty(tyear) && !string.IsNullOrEmpty(tmonth))
            {
                string returnVal = "[";
                string sql = @" select USERNAME,COUNT(*) as logCount from app_log_" + tyear + @"_" + tmonth + @"  where classid ='" + classid + "' AND handle IN( '微信登录', 'APP登录') group by classid,USERNAME ";

                OleDbCommand M_Comm = new OleDbCommand();
                OleDbConnection M_Conn = new OleDbConnection(ConfigurationManager.AppSettings["OLEDB_connString"]);
                M_Conn.Open();
                M_Comm.Connection = M_Conn;
                try
                {
                    M_Comm.CommandText = sql;
                    OleDbDataReader M_Reader = M_Comm.ExecuteReader();

                    while (M_Reader.Read())
                    {
                        returnVal += "{username:\"" + M_Reader["username"].ToString() + "\", logcount:\"" + M_Reader["logcount"].ToString() + "\"},";
                    }

                }
                catch (Exception e)
                {
                }
                finally
                {
                    M_Conn.Close();
                }
                returnVal = returnVal.TrimEnd(',');
                data = returnVal + "]";
            }
        }

        /// <summary>
        /// 查询登录人次
        /// </summary>
        /// <param name="context"></param>
        private void getXXKData(HttpContext context)
        {
            string start = context.Request["start"];
            string end = context.Request["end"];
            string type = context.Request["type"];
            if (!string.IsNullOrEmpty(start) && !string.IsNullOrEmpty(end))
            {
                string returnVal = "[";
                //                string sql = @"    select bt,DECODE(isfromweixin,'0',count(*),0) as pc,DECODE(isfromweixin,'1',count(*),0) as app
                //                                      from(   
                //                                   select *
                //                                     from jw_xyxk xk
                //                                    inner join (select info_id, g.bt
                //                                                  from JW_BCGL bc
                //                                                 inner join G_INFOS g
                //                                                    on g.ID = bc.INFO_ID
                //                                                 where PXSJ >=
                //                                                       to_date('"+start+@"', 'yyyy-MM-dd hh24:mi:ss')
                //                                                   and PXSJ_JS <=
                //                                                       to_date('"+end+@"', 'yyyy-MM-dd hh24:mi:ss')) stuKc
                //                                       on xk.bcinfo_id = stuKc.info_id
                //                                       ) group by bt,isfromweixin ";

                string sql = @"    select bcname as bt,
                                       DECODE(itemname, 'PC端', totaldata, 0) as pc,
                                       DECODE(itemname, '移动端', totaldata, 0) as app
                                  from app_charttotal chart
                                 where category = 'XXK' and  totaldate >= to_date('" + start + @"', 'yyyy-MM-dd hh24:mi:ss')
                                                and totaldate <=
                                                    to_date('" + end + @"', 'yyyy-MM-dd hh24:mi:ss')
                                  ";

                if (type != "1")
                {
                    //                    sql = @"    select bcname as bt,
                    //                                       DECODE(itemname, 'PC端', count(*), 0) as pc,
                    //                                       DECODE(itemname, '移动端', count(*), 0) as app
                    //                                  from app_charttotal chart
                    //                                 INNER JOIN (select info_id
                    //                                               from JW_BCGL bc
                    //                                              inner join G_INFOS g
                    //                                                 on g.ID = bc.INFO_ID
                    //                                              where PXSJ >= to_date('" + start + @"', 'yyyy-MM-dd hh24:mi:ss')
                    //                                                and PXSJ_JS <=
                    //                                                    to_date('" + end + @"', 'yyyy-MM-dd hh24:mi:ss')) kc
                    //                                    on chart.bcid = kc.info_id
                    //                                 where category = 'PJ'
                    //                                 group by bcname, itemname ";

                    sql = @"    select bcname as bt,
                                       DECODE(itemname, 'PC端', totaldata, 0) as pc,
                                       DECODE(itemname, '移动端', totaldata, 0) as app
                                  from app_charttotal chart
                                 where category = 'PJ' and  totaldate >= to_date('" + start + @"', 'yyyy-MM-dd hh24:mi:ss')
                                                and totaldate <=
                                                    to_date('" + end + @"', 'yyyy-MM-dd hh24:mi:ss') ";
                }

                OleDbCommand M_Comm = new OleDbCommand();
                OleDbConnection M_Conn = new OleDbConnection(ConfigurationManager.AppSettings["OLEDB_connString"]);
                M_Conn.Open();
                M_Comm.Connection = M_Conn;
                try
                {
                    M_Comm.CommandText = sql;
                    OleDbDataReader M_Reader = M_Comm.ExecuteReader();

                    while (M_Reader.Read())
                    {
                        returnVal += "{bt:\"" + M_Reader["bt"].ToString() + "\", pc:\"" + M_Reader["pc"].ToString() + "\", app:\"" + M_Reader["app"].ToString() + "\"},";
                    }

                }
                catch (Exception e)
                {
                }
                finally
                {
                    M_Conn.Close();
                }
                returnVal = returnVal.TrimEnd(',');
                data = returnVal + "]";
            }
        }

        /// <summary>
        /// 群组统计查询
        /// </summary>
        /// <param name="context"></param>
        private void getGroupData(HttpContext context)
        {
            string start = context.Request["start"];
            string end = context.Request["end"];
            if (!string.IsNullOrEmpty(start) && !string.IsNullOrEmpty(end))
            {
                string returnVal = "[";
                string sql = @"  select classid,bt,chatnum,TO_CHAR(createtime,'YYYY-MM-DD') as createtime
                                 from APP_LOG_CHAT chat
                                inner join (select info_id, g.bt
                                              from JW_BCGL bc
                                             inner join G_INFOS g
                                                on g.ID = bc.INFO_ID
                                             where PXSJ >=
                                                   to_date('" + start + @"', 'yyyy-MM-dd hh24:mi:ss')
                                               and PXSJ_JS <=
                                                   to_date('" + end + @"', 'yyyy-MM-dd hh24:mi:ss')) stuKc
                                   on chat.classid = stuKc.info_id ";

                OleDbCommand M_Comm = new OleDbCommand();
                OleDbConnection M_Conn = new OleDbConnection(ConfigurationManager.AppSettings["OLEDB_connString"]);
                M_Conn.Open();
                M_Comm.Connection = M_Conn;
                try
                {
                    M_Comm.CommandText = sql;
                    OleDbDataReader M_Reader = M_Comm.ExecuteReader();

                    while (M_Reader.Read())
                    {
                        returnVal += "{classid:\"" + M_Reader["classid"].ToString() + "\", bt:\"" + M_Reader["bt"].ToString() + "\", chatnum:\"" + M_Reader["chatnum"].ToString() + "\", createtime:\"" + M_Reader["createtime"].ToString() + "\"},";
                    }

                }
                catch (Exception e)
                {
                }
                finally
                {
                    M_Conn.Close();
                }
                returnVal = returnVal.TrimEnd(',');
                data = returnVal + "]";
            }
        }

        /// <summary>
        /// 问答统计查询
        /// </summary>
        /// <param name="context"></param>
        private void getQuestionData(HttpContext context)
        {
            string start = context.Request["start"];
            string end = context.Request["end"];
            if (!string.IsNullOrEmpty(start) && !string.IsNullOrEmpty(end))
            {
                string returnVal = "[";
                string sql = @" select bcid,bt,sum(questionnum) as questionnum,sum(answernum) as answernum,sum(samequestionnum) as samequestionnum
                   from ( select bcid,bt,questionnum,answernum,samequestionnum from app_qarelation chat
                                inner join (select info_id, g.bt
                                              from JW_BCGL bc
                                             inner join G_INFOS g
                                                on g.ID = bc.INFO_ID
                                             where PXSJ >=
                                                   to_date('" + start + @"', 'yyyy-MM-dd hh24:mi:ss')
                                               and PXSJ_JS <=
                                                   to_date('" + end + @"', 'yyyy-MM-dd hh24:mi:ss')) stuKc
                                   on chat.bcid = stuKc.info_id) group by bcid,bt ";

                OleDbCommand M_Comm = new OleDbCommand();
                OleDbConnection M_Conn = new OleDbConnection(ConfigurationManager.AppSettings["OLEDB_connString"]);
                M_Conn.Open();
                M_Comm.Connection = M_Conn;
                try
                {
                    M_Comm.CommandText = sql;
                    OleDbDataReader M_Reader = M_Comm.ExecuteReader();

                    while (M_Reader.Read())
                    {
                        returnVal += "{bcid:\"" + M_Reader["bcid"].ToString() + "\", bt:\"" + M_Reader["bt"].ToString() + "\", questionnum:\"" + M_Reader["questionnum"].ToString() + "\", answernum:\"" + M_Reader["answernum"].ToString() + "\", samequestionnum:\"" + M_Reader["samequestionnum"].ToString() + "\"},";
                    }

                }
                catch (Exception e)
                {
                }
                finally
                {
                    M_Conn.Close();
                }
                returnVal = returnVal.TrimEnd(',');
                data = returnVal + "]";
            }
        }

        /// <summary>
        /// 问答统计查询
        /// </summary>
        /// <param name="context"></param>
        private void getStudengScoreData(HttpContext context)
        {
            string bcid = context.Request["bcid"];
            if (!string.IsNullOrEmpty(bcid))
            {
                string returnVal = "[";
                string sql = @"  select userid,xm,questionnum,answernum,samequestionnum from app_qarelation chat
                                inner join jw_xyxx xy on chat.userid=xy.info_id
                                where chat.bcid=" + bcid;
                sql += " union ";
                sql += @"  select userid,uname as xm,questionnum,answernum,samequestionnum from app_qarelation chat
                                inner join G_USERS js on chat.userid=js.id 
                                where chat.bcid=" + bcid;

                OleDbCommand M_Comm = new OleDbCommand();
                OleDbConnection M_Conn = new OleDbConnection(ConfigurationManager.AppSettings["OLEDB_connString"]);
                M_Conn.Open();
                M_Comm.Connection = M_Conn;
                try
                {
                    M_Comm.CommandText = sql;
                    OleDbDataReader M_Reader = M_Comm.ExecuteReader();

                    while (M_Reader.Read())
                    {
                        returnVal += "{userid:\"" + M_Reader["userid"].ToString() + "\", xm:\"" + M_Reader["xm"].ToString() + "\", questionnum:\"" + M_Reader["questionnum"].ToString() + "\", answernum:\"" + M_Reader["answernum"].ToString() + "\", samequestionnum:\"" + M_Reader["samequestionnum"].ToString() + "\"},";
                    }

                }
                catch (Exception e)
                {
                }
                finally
                {
                    M_Conn.Close();
                }
                returnVal = returnVal.TrimEnd(',');
                data = returnVal + "]";
            }
        }

        private void addClassQuestion(HttpContext context)
        {
            string qid = context.Request["qid"];

            if (!string.IsNullOrEmpty(qid))
            {
                string fid = context.Request["ids"];
                fid = fid.TrimEnd(',');
                string guid = context.Request["nguid"];
                OleDbConnection M_Conn = new OleDbConnection(ConfigurationManager.AppSettings["OLEDB_connString"]);
                try
                {
                    string sql = "";

                    OleDbCommand M_Comm = new OleDbCommand();
                    M_Conn.Open();
                    M_Comm.Connection = M_Conn;

                    sql = " delete from app_questionClass where qid='" + qid + "'";
                    M_Comm.CommandText = sql;
                    M_Comm.ExecuteNonQuery();
                    if (fid != "")
                    {
                        for (int i = 0; i < fid.Split(',').Length; i++)
                        {
                            sql = " insert into app_questionClass values('" + guid + "','" + qid + "','" + fid.Split(',')[i] + "')";
                            M_Comm.CommandText = sql;
                            M_Comm.ExecuteNonQuery();
                        }
                    }

                    data = "1";
                }
                catch (Exception e)
                {
                }
                finally
                {
                    M_Conn.Close();
                }
            }
        }

        private void deleteQuestionByid(HttpContext context)
        {
            string ids = context.Request["ids"];
            if (!string.IsNullOrEmpty(ids))
            {
                string[] idlist = ids.Split(',');
                ids = "";
                foreach (string item in idlist)
                {
                    ids += "'" + item + "',";
                }
                ids = ids.TrimEnd(',');
                OleDbConnection M_Conn = new OleDbConnection(ConfigurationManager.AppSettings["OLEDB_connString"]);
                try
                {
                    string sql = "";
                    OleDbCommand M_Comm = new OleDbCommand();
                    M_Conn.Open();
                    M_Comm.Connection = M_Conn;
                    int intCount = 0;
                    sql = " select * from dsfa_question_publish_user where qid in (" + ids + ") ";
                    M_Comm.CommandText = sql;
                    OleDbDataReader M_Reader = M_Comm.ExecuteReader();
                    if (M_Reader.Read())
                    {
                        intCount++;
                    }
                    M_Reader.Close();
                    if (intCount == 0)
                    {
                        sql = "delete  app_questionClass where qid in (" + ids + " )";
                        M_Comm.CommandText = sql;
                        M_Comm.ExecuteNonQuery();
                        sql = "delete  dsfa_question where id in (" + ids + " )";
                        M_Comm.CommandText = sql;
                        M_Comm.ExecuteNonQuery();
                        data = "1";
                    }
                    else
                    {
                        data = "0";
                    }
                }
                catch (Exception e)
                {
                }
                finally
                {
                    M_Conn.Close();
                }
            }
        }

        private void deleteNoticeByid(HttpContext context)
        {
            string ids = context.Request["ids"];
            if (!string.IsNullOrEmpty(ids))
            {
                string[] idlist = ids.Split(',');
                ids = "";
                foreach (string item in idlist)
                {
                    ids += "'" + item + "',";
                }
                ids = ids.TrimEnd(',');
                OleDbConnection M_Conn = new OleDbConnection(ConfigurationManager.AppSettings["OLEDB_connString"]);
                try
                {
                    string sql = "";
                    OleDbCommand M_Comm = new OleDbCommand();
                    M_Conn.Open();
                    M_Comm.Connection = M_Conn;
                    sql = "delete  JW_JSGG where id in (" + ids + " )";
                    M_Comm.CommandText = sql;
                    M_Comm.ExecuteNonQuery();
                    data = "1";
                }
                catch (Exception e)
                {
                }
                finally
                {
                    M_Conn.Close();
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