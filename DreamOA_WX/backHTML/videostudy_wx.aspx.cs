using Qiniu.RS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CollegeAPP.backHTML
{
    public partial class videostudy_wx : System.Web.UI.Page
    {
        public static string EncodeBase64(Encoding encode, string source)
        {
            string en = "";
            byte[] bytes = encode.GetBytes(source);
            try
            {
                en = Convert.ToBase64String(bytes);
            }
            catch
            {
                en = source;
            }
            return en;
        }
        public string ConnectionString = System.Configuration.ConfigurationManager.AppSettings["OLEDB_connString"];
        protected void Page_Load(object sender, EventArgs e)
        {
            hid_transcodeNotifyUrl.Value = System.Configuration.ConfigurationManager.AppSettings["transcodeNotifyUrl"];
            qCloudSecret_id.Value = System.Configuration.ConfigurationManager.AppSettings["qCloudSecret_id"];
            qCloudSecret_key.Value = System.Configuration.ConfigurationManager.AppSettings["qCloudSecret_key"];
            string bucketName = "a001";
            PutPolicy put = new PutPolicy(bucketName);
            string strKey = DateTime.Now.ToString("yyyy_MM_dd_HH_mm_ss");
            string strKey_low = "a001:" + strKey + "_low.m3u8";//qbucket:qkey
            string strKey_high = "a001:" + strKey + "_high.m3u8";//qbucket:qkey
            put.PersistentOps += @"avthumb/m3u8/segtime/10/vb/320k/s/512x288|saveas/" + EncodeBase64(Encoding.UTF8, "a001:"+Guid.NewGuid().ToString() + ".m3u8") + ";avthumb/flv/vb/320k/s/512x288|saveas/" + EncodeBase64(Encoding.UTF8, "a001:"+Guid.NewGuid().ToString() + ".flv");//10秒切1片
            put.PersistentNotifyUrl = System.Configuration.ConfigurationManager.AppSettings["transcodeNotifyUrl"];
            hid_qiniu_key.Value = put.Token();
            put.PersistentOps = @"avthumb/mp3/ab/256k|saveas/" + EncodeBase64(Encoding.UTF8, "a001:" + Guid.NewGuid().ToString() + ".mp3");
            hid_qiniu_key_mp3.Value = put.Token();
        }
    }
}