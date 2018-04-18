<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="main.aspx.cs" Inherits="CollegeAPP.backHTML.main" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
        <meta charset="utf-8">
		<title>学在中浦院后台管理</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
		<link href="bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet">
		<link href="bootstrap/css/site.css" rel="stylesheet">
    <script type="text/javascript">
        function changeIndex(index)
        {
            for (var i = 0; i < 5; i++) {
                $("input:button").attr("class", "btn btn-large");
            }

            if (index == 1)
            {
                $("#mainTab").attr("src", "MenuTree.aspx");
                $("#btnMenu").attr("class", "btn btn-primary btn-large");
            }
            else if (index == 2) {
                $("#mainTab").attr("src", "MenuTreeUpdate.aspx");
                $("#btnNews").attr("class", "btn btn-primary btn-large");
            } else if (index == 3) {
                $("#mainTab").attr("src", "QueryLog.aspx");
                $("#btnLog").attr("class", "btn btn-primary btn-large");
            } else if (index == 4) {
                $("#mainTab").attr("src", "Analysis.html");
                $("#btnAnalysis").attr("class", "btn btn-primary btn-large");
            }
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div class="container">
			<div class="row">
				<div class="span12">
                    <img style="height:150px;" src="bootstrap/img/top.png" />
					
					<div style="margin-top:5px;">
						<p>
                            <input type="button" runat="server" id="btnMenu" visible="false" class="btn btn-large" onclick="changeIndex(1)" value="栏目管理" />
                            <input type="button" runat="server" id="btnNews" visible="false" class="btn btn-large" onclick="changeIndex(2)" value="内容管理" />
                            <input type="button" runat="server" id="btnLog" visible="false" class="btn btn-large" onclick="changeIndex(3)" value="日志查询" />
                            <input type="button" runat="server" id="btnAnalysis" visible="false" class="btn btn-large" onclick="changeIndex(4)" value="统计分析" />
						</p>
					</div>
					<div style="height:800px; background-color:#eee">
						<iframe id="mainTab" src="" style="width:100%;height:100%"></iframe>
					</div>
				</div>
			</div>
		</div>
		<script src="bootstrap/js/jquery.min.js"></script>
		<script src="bootstrap/js/bootstrap.min.js"></script>
		<script src="bootstrap/js/site.js"></script>
    </form>
</body>
</html>
