using System.IO;
using System.Net;
using System.Text;
using System.Web;

namespace CollegeAPP.backHTML
{
    /// <summary>
    /// OaHandle 的摘要说明
    /// </summary>
    public class OaHandle : IHttpHandler
    {
        public static string data = "";
        public void ProcessRequest(HttpContext context)
        {
            string func = context.Request["func"];
            data = "";
            switch (func)
            {
                case "HttpPost":
                    PostMoths(context);
                    break;
                case "HttpGet":
                    HttpGet(context);
                    break;
            }
            context.Response.Write(data);
        }

        private string HttpPost(HttpContext context)
        {
            string url = context.Request["url"];
            string postData = context.Request["postData"];
            postData = "flowParams=<Root><Flow><Type>0</Type><Key>211140</Key><Objclass>JD_JBXX</Objclass><UserID>2086</UserID><Pid>5040</Pid><Pnid>2</Pnid><WfID>679</WfID></Flow></Root>&nodeID=7&istz=false";
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create("http://222.204.170.27:8080/ezweb/action?getFlowNodes=2");

            request.Method = "POST";

            request.ContentType = "application/x-www-form-urlencoded";
            // 此处 有巨坑 ezweb 需要传 UserAgent 属性 add by litong 2016-07-18 
            request.UserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1";

            request.ContentLength = Encoding.UTF8.GetByteCount(postData);

            //request.CookieContainer = cookie;

            Stream myRequestStream = request.GetRequestStream();

            StreamWriter myStreamWriter = new StreamWriter(myRequestStream, Encoding.GetEncoding("gb2312"));

            myStreamWriter.Write(postData);

            myStreamWriter.Close();



            HttpWebResponse response = (HttpWebResponse)request.GetResponse();



            //response.Cookies = cookie.GetCookies(response.ResponseUri);

            Stream myResponseStream = response.GetResponseStream();

            StreamReader myStreamReader = new StreamReader(myResponseStream, Encoding.GetEncoding("utf-8"));

            string retString = myStreamReader.ReadToEnd();

            myStreamReader.Close();

            myResponseStream.Close();



            return retString;

        }

        
        public string PostMoths(HttpContext context)
        {
            string url = context.Request["postUrl"];
            string param = context.Request["postData"]; //HttpUtility.UrlDecode(  HttpUtility.UrlDecode(
            //string url = "http://222.204.170.27:8080/ezweb/action?getFlowNodes=2";
            //param = "__DATA={'flowParams':'<Root><Flow><Type>0</Type><Key>356135</Key><Objclass>FW</Objclass><UserID>2086</UserID><Pid>6581</Pid><Pnid>3</Pnid><WfID>678</WfID></Flow></Root>','nodeID':'14','istz':'false'}";
            param = "__DATA=" + param;
            string strURL = url;
            System.Net.HttpWebRequest request;
            request = (System.Net.HttpWebRequest)WebRequest.Create(strURL);
            request.Method = "POST";
            //request.ContentType = "application/json;charset=UTF-8";
            request.ContentType = "application/x-www-form-urlencoded;charset=UTF-8";
            request.UserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1";
            string paraUrlCoded = param;
            byte[] payload;
            payload = System.Text.Encoding.UTF8.GetBytes(paraUrlCoded);
            request.ContentLength = payload.Length;
            Stream writer = request.GetRequestStream();
            writer.Write(payload, 0, payload.Length);
            writer.Close();
            System.Net.HttpWebResponse response;
            response = (System.Net.HttpWebResponse)request.GetResponse();
            System.IO.Stream s;
            s = response.GetResponseStream();
            string StrDate = "";
            string strValue = "";
            StreamReader Reader = new StreamReader(s, Encoding.UTF8);
            while ((StrDate = Reader.ReadLine()) != null)
            {
                strValue += StrDate + "\r\n";
            }
            if (strValue != "")
            {
                data = strValue;
            }
            else
            {
                data = "[]";
            }

            return data;
        }
        
        public string HttpGet(HttpContext context)
        {
            string url = HttpUtility.UrlDecode(context.Request["items"]);
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);

            request.Method = "GET";
            // 此处 有巨坑 ezweb 需要传 UserAgent 属性 add by litong 2016-07-18 
            request.UserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1";
            
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();

            Stream myResponseStream = response.GetResponseStream();

            StreamReader myStreamReader = new StreamReader(myResponseStream, Encoding.GetEncoding("utf-8"));

            string retString = myStreamReader.ReadToEnd();

            myStreamReader.Close();

            myResponseStream.Close();

            data = retString;

            return data;

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