<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="QueryLog.aspx.cs" Inherits="CollegeAPP.backHTML.QueryLog" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8">
    <title>学在中浦院后台管理</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <%--<link href="bootstrap/css/bootstrapPage.min.css" rel="stylesheet" />--%>
    <link href="bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet">
    <link href="bootstrap/css/site.css" rel="stylesheet">
    <script src="../Script/ztree/js/jquery-1.4.4.min.js"></script>
    <script type="text/javascript">
        var datalength = "";
        function loadData(pageindex) {
            var uname = $("#hidname").val();
            var utime = $("#hidyear").val();
            var tmonth = $("#hidmonth").val();
            var utype = $("#hidtype").val();
            var html = "";            
            $.ajax({
                type: "post",
                url: "backHtmlHelp.ashx",
                data: { uname: uname, utime: utime, tmonth: tmonth, utype: utype, uindex: pageindex, func: "getLogData" },
                success: function (data) {
                    if (data != "" && data != null) {
                        var content = eval("(" + data + ")");
                        if (content.length > 0) {
                            for (var i = 0; i < content.length; i++) {
                                html += "<tr>";
                                html += "<td>" + content[i].username + "</td>";
                                html += "<td>" + content[i].handletime + "</td>";
                                html += "<td>" + content[i].handlecategory + "</td>";
                                html += "<td>" + content[i].handle + "</td>";
                                html += "</tr>";
                            }
                        } else {
                            html += "<tr>";
                            html += "<td colspan='4' style='text-align:center;'>暂无数据</td>";
                            html += "</tr>";
                        }
                    }                   
                    $("#tbody").html(html);
                }
            });            
        }
        
        function firstLoad(pageindex)
        {
            // 存储查询条件
            $("#hidname").val($("#txtName").val());
            $("#hidyear").val($("#selYear option:selected").text());
            $("#hidmonth").val($("#selMonth option:selected").text());
            $("#hidtype").val($("#logType option:selected").text());

            var uname = $("#txtName").val();
            var utime = $("#selYear option:selected").text();
            var tmonth = $("#selMonth option:selected").text();
            var utype = $("#logType option:selected").text();
            var html = "";
            $.ajax({
                type: "post",
                url: "backHtmlHelp.ashx",
                data: { uname: uname, utime: utime, tmonth: tmonth, utype: utype, uindex: pageindex, func: "getLogData" },
                success: function (data) {
                    if (data != "" && data != null) {
                        var content = eval("(" + data + ")");
                        if (content.length > 0) {
                            datalength = content[0].datacount;
                            for (var i = 0; i < content.length; i++) {
                                html += "<tr>";
                                html += "<td>" + content[i].username + "</td>";
                                html += "<td>" + content[i].handletime + "</td>";
                                html += "<td>" + content[i].handlecategory + "</td>";
                                html += "<td>" + content[i].handle + "</td>";
                                html += "</tr>";
                            }
                        } else {
                            datalength = 0;
                            html += "<tr>";
                            html += "<td colspan='4' style='text-align:center;'>暂无数据</td>";
                            html += "</tr>";
                        }
                    }
                    $("#tbody").html(html);
                    var totalCount = Number(datalength) || 0, showCount = 10,
                     limit = Number(10) || 10;
                    $('#callBackPager').extendPagination({
                        totalCount: totalCount,
                        showCount: showCount,
                        limit: limit,
                        callback: function (curr, limit, totalCount) {
                            //createTable(curr, limit, totalCount);
                            loadData(curr);
                        }
                    });
                }
            });
        }

        $(document).ready(function () {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth();
            var option = "";
            for (var i = 0; i < 5; i++) {
                option += "<option value='" + (year - i) + "'>" + (year - i) + "</option>";                
            }
            $("#selYear").append(option);
            $("#selMonth option")[month].selected = true;

            $("#hidname").val($("#txtName").val());
            $("#hidyear").val($("#selYear option:selected").text());
            $("#hidmonth").val( $("#selMonth option:selected").text());
            $("#hidtype").val($("#logType option:selected").text());

            firstLoad(1);
            
        })        
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div class="container">
            <legend>日志查询</legend>
            <input type="hidden" id="hidname" value="" />
            <input type="hidden" id="hidyear" value="" />
            <input type="hidden" id="hidmonth" value="" />
            <input type="hidden" id="hidtype" value="" />
            <div class="navbar">
                <div class="navbar-inner">
                    <div class="container">
                        <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></a>
                        <div class="nav-collapse">
                            <ul class="nav">
                                <li>
                                    <a>操作人</a>
                                </li>
                                <li class="dropdown">
                                    <input type="text" style="margin-top:5px;" id="txtName" value="" />
                                </li>
                                <li class="dropdown">
                                    <a>操作时间</a>
                                </li>
                                <li class="dropdown">
                                   <select class="btn btn-default dropdown-toggle" style="width:90px;" id="selYear">
                                       
                                    </select>  
                                </li>
                                <li class="dropdown">
                                    <select class="btn btn-default dropdown-toggle" style="width:70px;" id="selMonth">
                                        <option value="01">01</option>
                                         <option value="02">02</option>
                                         <option value="03">03</option>
                                         <option value="04">04</option>
                                        <option value="05">05</option>
                                        <option value="06">06</option>
                                        <option value="07">07</option>
                                        <option value="08">08</option>
                                        <option value="09">09</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select>                                   
                                </li>
                                <li class="dropdown">
                                    <a>日志类型</a>
                                </li>
                                <li class="dropdown">
                                    <select class="btn btn-default dropdown-toggle" style="width:115px;" id="logType">
                                        <option value="全部" selected="selected">全部</option>
                                         <option value="登录">登录</option>
                                         <option value="功能访问">功能访问</option>
                                         <option value="内容访问">内容访问</option>
                                        <option value="个人信息">个人信息</option>
                                        <option value="栏目管理">栏目管理</option>
                                        <option value="内容管理">内容管理</option>
                                    </select> 
                                </li>
                            </ul>
                            <ul class="nav pull-right">
                                <li>
                                    <input type="button" class="btn btn-small" onclick="firstLoad(1)" value="查询" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">

                <div class="span12">
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>操作人
                                </th>
                                <th>操作时间
                                </th>
                                <th>日志类型
                                </th>
                                <th>日志内容
                                </th>
                            </tr>
                        </thead>
                        <tbody id="tbody">
                        </tbody>
                    </table>
                    <div id="callBackPager"></div>
                </div>
            </div>
        </div>
        <script src="bootstrap/js/jquery.min.js"></script>
        <script src="bootstrap/js/bootstrap.min.js"></script>
        <script src="bootstrap/js/site.js"></script>
        <script src="bootstrap/js/extendPagination.js"></script>
    </form>
</body>
</html>
