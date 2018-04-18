using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.OleDb;
namespace CollegeAPP.backHTML
{
    public partial class addQuestion : System.Web.UI.Page
    {
        public string ConnectionString = System.Configuration.ConfigurationManager.AppSettings["OLEDB_connString"];
        protected void Page_Load(object sender, EventArgs e)
        {

        }
    }
}