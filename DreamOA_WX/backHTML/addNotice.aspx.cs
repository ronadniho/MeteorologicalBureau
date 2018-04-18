using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CollegeAPP.backHTML
{
    public partial class addNotice : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["info_id"] != null)
            {
                hidUid.Value = Session["info_id"].ToString();
            }
        }
    }
}