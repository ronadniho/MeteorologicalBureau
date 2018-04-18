using CollegeAPP.Tools;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CollegeAPP.backHTML
{
    /// <summary>
    /// videoCallBack 的摘要说明
    /// </summary>
    public class videoCallBack : IHttpHandler
    {
        private HttpResponse _Response = null;
        private HttpRequest _Request = null;
        private HttpServerUtility _Server = null;
        public void ProcessRequest(HttpContext context)
        {
            _Response = context.Response;
            _Request = context.Request;
            _Server = context.Server;

            byte[] byts = new byte[_Request.InputStream.Length];
            _Request.InputStream.Read(byts, 0, byts.Length);
            string req = System.Text.Encoding.UTF8.GetString(byts);
            req = _Server.UrlDecode(req);

            string param = _Request.QueryString.ToString();

            //string strParam = "" + _Request.Form.ToString();

            //context.Response.ContentType = "text/plain";
            //context.Response.Write("Hello World");
            JObject jobj = new JObject();
            jobj = (JObject)Newtonsoft.Json.JsonConvert.DeserializeObject(req);
            ErrLog.Log(req);
            _Response.Write("回调结果(Request.QueryString.ToString())：" + req);
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