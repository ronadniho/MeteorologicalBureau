<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ReportList.aspx.cs" Inherits="CollegeAPP.ReportCenter.ReportList" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>
        <%=module.zhName %></title>
    <base target="_self" />
    <%--  <link rel="stylesheet" href="../Css/main.css" />
    <link rel="stylesheet" href="../Css/bluenew/list.css" />
    <link rel='stylesheet' href="../css/pageindex.css" type='text/css' />
    <link rel="stylesheet" href="../Css/jboxSkin/Blue/jbox.css" type="text/css" />
    <link rel="stylesheet" href="../js/jquery-ui-themes-1.8.10/themes/redmond/jquery.ui.all.css" />
    <link href="../Js/multiselect/jquery.multiselect.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../Js/jquery.js"></script>
    <script type="text/javascript" src="../My97DatePicker/WdatePicker.js"></script>
    <script type="text/javascript" src="../js/public.js"></script>
    <script type="text/javascript" src="../js/list.js"></script>
    <script type="text/javascript" src="../js/jquery-ui-1.8.13/jquery-ui-1.8.13.custom.min.js"></script>
    <script type="text/javascript" src="../js/jquery-ui-1.8.13/jquery.ui.datepicker-zh-CN.js"></script>
    <script type="text/javascript" src="../Js/jquery.jBox-2.3.min.js"></script>
    <script type="text/javascript" src="../Js/multiselect/src/jquery.multiselect.js"></script>
    <script src="../Js/uploadify/Js/jquery.uploadify.v2.1.0.min.js" type="text/javascript"></script>
    <script src="../Js/uploadify/Js/swfobject.js" type="text/javascript"></script>
    <link href="../Js/uploadify/Css/uploadify.css" rel="stylesheet" type="text/css" />--%>
    <link href="css/list.css" rel="stylesheet" />
    <link href="css/main.css" rel="stylesheet" />
    <link href="css/pageindex.css" rel="stylesheet" />
    <link href="css/jbox.css" rel="stylesheet" />
    <link href="css/jquery.ui.all.css" rel="stylesheet" />
    <link href="css/jquery.multiselect.css" rel="stylesheet" />
    <script src="css/jquery.js"></script>
    <script src="css/public.js"></script>
    <script src="css/jquery-ui-1.8.13.custom.min.js"></script>
    <script src="css/jquery.jBox-2.3.min.js"></script>
    <script src="css/jquery.multiselect.js"></script>
    <script src="css/jquery.ui.datepicker-zh-CN.js"></script>
    <script src="css/list.js"></script>
    <script src="css/WdatePicker.js"></script>
    <style type="text/css">
        .TR_BORDER, .TR_BORDER TD {
            border: 1px solid #99ccff;
        }

        table td, th {
            font-family: Arial;
        }
    </style>
    <script type="text/javascript">

        //返回选中行的某列值，支持多选。 index为调用该函数传进来的参数  表示第几列
        function returnVals(index) {
            var names = "";
            $("#tbl_class input:checked").each(function () {
                names += $(this).parent().parent().children().eq(index).text() + ",";
            });
            names = names.substr(0, names.length - 1);
            return names;
        }
        $(function () {
            $(":button,:submit").each(function () {
                if ($(this).val().length > 3) {
                    //$(this).attr("class", "buttonfour");
                }
            });
            $(".orderbyImg").each(function () {
                if ($(this).attr("orderColumn") == $("#orderByColumn").val()) {
                    if ($("#orderBy").val() == "asc") {
                        $(this).attr("src", $(this).attr("src").replace("sortdefult", "sort_up"));
                    }
                    else if ($("#orderBy").val() == "desc") {
                        $(this).attr("src", $(this).attr("src").replace("sortdefult", "sort_below"));
                    }
                }
            });
            //日期检索
            $(":text[id^='time_']").each(function () {
                if ($(this).attr("id").indexOf("st") > 0) {
                    //绑定日期控件
                    //                    var stId = $(this).attr("id");
                    //                    var serchtml = "#" + $(this).attr("id") + ",#" + $(this).attr("id").replace("st", "et");
                    //                    var dates = $(serchtml).datepicker({
                    //                        showButtonPanel: false,
                    //                        changeMonth: true,
                    //                        changeYear: true,
                    //                        numberOfMonths: 1,
                    //                        shortYearCutoff: 50,
                    //                        onSelect: function (selectedDate) {
                    //                            var option = this.id == stId ? "minDate" : "maxDate";
                    //                            var instance = $(this).data("datepicker");
                    //                            var date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
                    //                            dates.not(this).datepicker("option", option, date);
                    //                        }
                    //                    });
                }
            });
            //计算列
            $(".cla").each(function () {
                if ($(this).attr("cla") != "") {
                    var dbcolume = $(this).attr("dbcolume");
                    var calType = $(this).attr("cla");
                    var calNum = 0.0;
                    var calNumint = 0;
                    var calColumeCount = 0;
                    var calSymbol = "";
                    $("td[dbcolume='" + dbcolume + "'][class!='cla']").each(function () {
                        calColumeCount++;
                        if (isNaN($.trim($(this).text()).charAt($.trim($(this).text()).length - 1))) {
                            calSymbol = $.trim($(this).text()).charAt($.trim($(this).text()).length - 1);
                        }
                        if (!isNaN(parseFloat($.trim($(this).text())))) {
                            calNum += parseFloat($.trim($(this).text()));
                        }
                        if (!isNaN(parseInt($.trim($(this).text())))) {
                            calNumint += parseInt($.trim($(this).text()));
                        }
                    });
                    if (calType == "sum") {
                        if (!isNaN(calNum)) {
                            $(this).html(changeTwoDecimal_f(calNum) + calSymbol);
                        }
                        if (calNum.toString().indexOf(".") == -1) {
                            if (!isNaN(calNumint)) {
                                $(this).html(calNumint + calSymbol);
                            }
                        }
                    }
                    if (calType == "avg") {
                        if (!isNaN(calNum / calColumeCount)) {
                            $(this).html(changeTwoDecimal_f(calNum / calColumeCount) + calSymbol);
                        }
                    }
                }
            });
        });

        //上传学员文集
        function btnUpLoadFile_Click() {
            var url = "UpLoadDialog.aspx";
            var div = $("<div id='div_UpLoad' title='文件上传'></div>").appendTo($("body"));
            div.load(url, {});
            div.dialog({
                autoOpen: true,
                height: 300,
                width: 450,
                modal: true,
                resizable: false,
                bgiframe: true,
                close: function () {
                    div.dialog("destroy");
                    div.html("").remove();
                    window.location.reload();
                }
            });
        }

        function checkisNum(c) {
            if (isNaN($(c).val())) {
                alert("请输入数字");
                $(c).val("0");
            }
        }

        function getSerchVal() {
            var serchString = "";
            //获取文本框的SQL
            $(":text[id^='txt_']").each(function () {
                if ($(this).val() == "") {
                    return;
                }
                serchString += $(this).attr("dbcolume") + "$" + $(this).val() + "$txt|";

            });
            //获取范围
            $(":text[id^='txtst_']").each(function () {
                if ($(this).val() == "") {
                    return;
                }
                serchString += $(this).attr("dbcolume") + "$" + $(this).val() + "$txtst|";

            });
            $(":text[id^='txted_']").each(function () {
                if ($(this).val() == "") {
                    return;
                }
                serchString += $(this).attr("dbcolume") + "$" + $(this).val() + "$txted|";

            });
            //获取时间检索段的SQL
            $(":text[id$='st']").each(function () {
                if ($(this).val() == "") {
                    return;
                }
                serchString += $(this).attr("dbcolume") + "$" + $(this).val() + "$st|";
            });
            $(":text[id$='et']").each(function () {
                if ($(this).val() == "") {
                    return;
                }
                serchString += $(this).attr("dbcolume") + "$" + $(this).val() + "$et|";
            });
            //获取多选框的SQL
            $(".checkBoxDiv").each(function () {
                if ($(this).find(":checkbox[checked='checked']").length == 0) {
                    return;
                }
                var checkVal = "";
                $(this).find(":checkbox").each(function (index) {

                    if ($(this)[0].checked) {
                        checkVal += "'" + $(this).val() + "',";
                    }
                });
                if (checkVal.length > 0) {
                    checkVal = checkVal.substr(0, checkVal.length - 1);
                    serchString += $(this).find(":checkbox[checked='checked']").attr("dbcolume") + "$" + checkVal + "$checkBox|";
                }
            });
            //获取SP多选框的SQL
            $(".SPcheckBoxDiv").each(function () {
                if ($(this).find(":checkbox[checked='checked']").length == 0) {
                    return;
                }
                var checkVal = "";
                $(this).find(":checkbox").each(function (index) {

                    if ($(this)[0].checked) {
                        checkVal += $(this).val() + ",";
                    }
                });
                if (checkVal.length > 0) {
                    checkVal = checkVal.substr(0, checkVal.length - 1);
                    serchString += $(this).find(":checkbox[checked='checked']").attr("dbcolume") + "$" + checkVal + "$SPcheckBox|";
                }
            });
            //获取下拉框的SQL
            $("select[id^='drp_']").each(function () {
                if ($(this).val() == "") {
                    return;
                }
                //检索下拉框对应的【以上】或者【以下】下拉框
                var orderByControlID = $(this).attr("id").replace("drp_", "drpOrder_");
                if ($("#" + orderByControlID).length > 0) {
                    var orderByControl = $("#" + orderByControlID);
                    if ($(orderByControl).val() != "") {
                        switch ($(orderByControl).val()) {
                            case "UP":
                                serchString += $(this).attr("dbcolume") + "$" + $(this).val() + "$drpGreater|";
                                break;
                            case "DOWN":
                                serchString += $(this).attr("dbcolume") + "$" + $(this).val() + "$drpLess|";
                                break;
                        }
                    }
                    else {
                        serchString += $(this).attr("dbcolume") + "$" + $(this).val() + "$drp|";
                    }
                }
                else {
                    serchString += $(this).attr("dbcolume") + "$" + $(this).val() + "$drp|";
                }
            });
            $("#SerchTxt").val(serchString);
        }
        function closeDialog() {
            $("#div_Export").dialog("close");
        }
        function WinClose() {
            $.jBox.close();
        }
        function ExportExcel() {
            var keydata = checkSelected();
            var keyrowid = checkSelectedxh();
            var keyid = $(".forChecked").attr("dbcolume");
            var StrRqKeyValue = "<%=StrRqKeyValue %>";
            var where = "";
            if (keydata.length > 0 && keyid != undefined && keyid != ""
                && StrRqKeyValue.indexOf("keydata") < 0
                && StrRqKeyValue.indexOf("keyid") < 0
                && StrRqKeyValue.indexOf("keyrowid") < 0) {
                where = "&keydata=" + keydata + "&keyid=" + keyid + "&keyrowid=" + keyrowid;
            }
            if (StrRqKeyValue.indexOf("orderByColumn") < 0
                && StrRqKeyValue.indexOf("orderBy") < 0) {
                where += "&orderByColumn=" + $("#orderByColumn").val() + "&orderBy=" + $("#orderBy").val();
            }
            var url = "SelectExports.aspx?" + StrRqKeyValue + where;
            OpenJBox(url, "数据导出");
        }
        function DownFileAttach(url) {
            $('#frame').attr("src", url);
        }

        function OpenJBoxWH(url, title, myWidth, myHeight) {
            var width = myWidth;
            var height = myHeight;
            var tops = 0;
            tops = (document.documentElement.clientHeight - eval(height)) / 2;
            $.jBox("iframe:" + url, {
                title: title,
                top: eval(tops),
                width: eval(width),
                height: eval(height),
                draggable: false,
                buttons: {}
            });
            $(".jbox-body").css("height", "0px");
        }
        function OpenJBox(url, title) {
            var width = 550;
            var height = 380;
            OpenJBoxWH(url, title, width, height);
        }

        function PJExport(url) {
            $('#frame').attr("src", url);
        }

        function openthis(c) {
            window.open(c, '_blank', 'top=0,left=0,height=' + (screen.availHeight - 30) + ',width=' + (screen.availWidth - 10) + ',resizable=1,scrollbars=1');
        }
        function doScript(c) {
            eval($(c).attr("script"));
        }
        function checkAll(c) {
            if ($(c)[0].checked) {
                $(".forChecked").attr("checked", "checked");
            }
            else {
                $(".forChecked").removeAttr("checked");
            }
        }
        function checkSelected() {
            var ids = "";
            $(".forChecked").each(function () {
                if ($(this)[0].checked) {
                    ids += $(this).val() + ",";
                }
            });
            if (ids.length > 0) {
                ids = ids.substr(0, ids.length - 1);
            }
            return ids;
        }
        function checkSelectedxh() {
            var xhs = "";
            $(".forChecked").each(function () {
                if ($(this)[0].checked) {
                    xhs += $(this).attr("dbrowid") + ",";
                }
            });
            if (xhs.length > 0) {
                xhs = xhs.substr(0, xhs.length - 1);
            }
            return xhs;
        }
        function uncheck(c) {
            var strArray = new Array();
            strArray = c.split(",");
            $(".forChecked").each(function () {
                if ($(this)[0].checked) {
                    for (var i = 0; i < strArray.length; i++) {
                        if (strArray[i] == $(this).val()) {
                            $(this)[0].checked = false;
                        }
                    }
                }
            });
        }
        function show(id, name) {
            var url = "DownLoad.aspx?id=" + id + "&name=" + escape(name);
            window.open(url);
            //$("#iframe1").attr("src", url);
        }

        function deleteFunction(infoid) {
            if (infoid.length > 0) {
                if (confirm("是否确定要删除此记录？")) {
                    var ajax = {};
                    ajax.type = "POST";
                    ajax.url = "MapHandler.ashx";
                    ajax.data = "MethodName=DeleteBjGx&id=" + infoid;
                    ajax.success = function (data) {
                        alert("删除成功！");
                        window.location.reload();
                    };
                    ajax.error = function (xmlhttp) {
                        alert("删除失败！");
                    };
                    $.ajax(ajax);
                }
            }
        }
        function buttonClick(c) {
            var ids = "";
            $(".forChecked").each(function () {
                if ($(this)[0].checked) {
                    ids += $(this).val() + ",";
                }
            });
            if (ids.length > 0) {
                ids = ids.substr(0, ids.length - 1);
            }
            var isFontButton = $(c).attr("isfontButton");
            if (isFontButton == "True") {
                eval($(c).attr("success"));
            }
            else {
                var param = $(c).attr("ajaxParam");
                var str = "{'" + param + "':'" + ids + "'}";
                var json = eval("(" + str + ")");
                ajaxHandler($(c).attr("ajaxClass"), $(c).attr("ajaxFunction"), json, function (data) {
                    if ($(c).attr("success") != "") {
                        eval($(c).attr("success"));
                        $("#checkall")[0].checked = false;
                        $(".forChecked").each(function () {
                            $(this)[0].checked = false;
                        });
                    }
                });
            }
        }
        function hiddenThis() {
            $(":checkbox").hide();
        }
        function do_order(c) {
            var orderBy = $("#orderBy");
            if ($(orderBy).val() == "asc") {
                $(orderBy).val("desc");
            }
            else {
                $(orderBy).val("asc");
            }
            $("#orderByColumn").val($(c).attr("orderColumn"));
            //$("#orderBy").val($(c).attr("order"));
            $("#btn_serch1").click();
        }
        function moduleGoLink(url) {
            url = url.replace("&orderByColumn=" + getQueryStringByName("orderByColumn"), "");
            url = url.replace("&orderBy=" + getQueryStringByName("orderBy"), "");
            window.location.href = url += "&orderByColumn=" + $("#orderByColumn").val() + "&orderBy=" + $("#orderBy").val();
        }
        function getQueryStringByName(name) {
            var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
            if (result == null || result.length < 1) {
                return "";
            }
            return result[1];
        }
    </script>
    <script type="text/javascript">
        $.fn.outerHTML = function () {
            $this = $(this);
            var h = $this.html();
            var s = $this.wrap("<div></div>").parent().html();
            $this.empty().html(h);
            return s;
        };
        $(function () {
            var _Height = 0;
            $("#txtGo").css("height", 16);
             <%if (module.isSerch)
               { %>
            _Height += $('.Header_tr').height();
            <%} %>
                <%if (module.pageing)
                  { %>
            _Height += $('#pageing').height();
              <%} %>
            _Height += $("#middleDIV").height();

            $("#ListDiv").height(window.document.documentElement.clientHeight - _Height - 15 - $("#divBtnBottom").height() - $("#tabMsg").height());
            <% if (1 == 2)
               { %>
            var height = document.documentElement.clientHeight - $('.Header_tr').height() - $("#folatHead").height() - $('#pageing').height() - $("#middleDIV").height() - 15;
            var tabHeight = $("#tbl_class").height();
            if (tabHeight > height) {
                $("#ListDiv").attr("style", "overflow-y:auto;");
                $("#ListDiv").height(height);
                $("#tbl_class").attr("width", $("#ListDiv").width() - 17);
            } else {
                $("#tbl_class").attr("width", "100%");
                $("#ListDiv").height(height);
            }
            <%}
               else
               { %>
            var BodysWidth = document.body.clientWidth;
            var tabWidth = $('#tbl_class').width();

            $("#tbl_class").attr("width", $("#ListDiv").width() - 17);
            <%} %>
            var offsetOld = $("#tbl_class").offset();
            var array = new Array();
            $("#tbl_class > tbody > tr:lt(1)").each(function (index1) {
                var arrayTr = new Array();
                $(this).children().each(function (index2) {
                    arrayTr.push($(this).innerWidth());
                });
                array.push(arrayTr);
            });
            var trHead = $("#tbl_class > tbody > tr:lt(1)").clone();
            //表头2行的OuterHtml
            var DoubleHtml = "";
            $(trHead).each(function () {
                DoubleHtml += $(this).outerHTML();
            });
            var tableHead = "<table id='newtable'  cellspacing='0' cellpadding='0' rules='all' bordercolor='#99ccff' border='0' style='min-width:100%;vertical-align:middle;border-collapse:collapse;filter: progid:DXImageTransform.Microsoft.Alpha(opacity=100);'>" + DoubleHtml + "</table>";
            tableHead = "<div id='folatHead'>" + $(tableHead).outerHTML() + "</div>"; //black

            // $("#main").append($(tableHead));
            $("#ListDiv").append($(tableHead));

            //设置div的定位
            $("#folatHead").css("position", "absolute");
            $("#folatHead").css("top", offsetOld.top + "px");
            $("#folatHead").css("left", offsetOld.left + "px");

            $("#folatHead > table > tbody > tr:lt(1)").each(function (index1) {
                $(this).children().each(function (index2) {//添加第一行的样式
                    $(this).css("border", "0px solid  #99ccff");
                    //$(this).css("backgroundColor", "#99ccff");
                });
            });

            //添加层浮到最上面
            $("#folatHead").css("z-index", "1"); //2  控制表头在最前端 ，0 取消
            //添加层改为不透明
            $("#folatHead").css("filter", "progid:DXImageTransform.Microsoft.Alpha(opacity=100)");

            $("#folatHead").width($("#tbl_class").width())//设置层的宽度就是表格的宽度
            //计算每列不固定的宽度赋值给新的表头
            $("#tbl_class > tbody > tr:lt(1)").children().each(function (index) {
                $($("#newtable > tbody > tr:lt(1)").children()[index]).width($(this).outerWidth() - 1);
                $($("#newtable > tbody > tr:lt(1)").children()[index]).height($(this).height() + 1);
            });

            //横向滚动时浮动表头跟着滚动
            $('#ListDiv').scroll(function () {
                $('#folatHead').css('left', $("#tbl_class").offset().left);
            });
            //间隔行背景色

            $('#tbl_class tr:even').css('background-color', '#edf3fe');



            $(window).resize(function () {
                $('#folatHead').css('width', $("#tbl_class").css('width'));
                $('#folatHead').css('left', $("#tbl_class").offset().left);
            });
            init_shousuo();
        });
        function init_shousuo() {
            if ($("#iszhankai").val() == "False") {
                showsuo();
            }
        }
        function changeValue(c) {
            var tableName = $(c).attr("table");
            var value = escape($(c).val());
            var keyColumn = $(c).attr("keyColumn");
            var keyColumnValue = $(c).attr("keyColumnValue");
            var dbcolumn = $(c).attr("dbcolumn");
            var dataType = $(c).attr("data_type");
            var minValue = $(c).attr("minValue");
            var maxValue = $(c).attr("maxValue");
            var canUpdate = false;
            switch (dataType) {
                case "text":
                    canUpdate = true;
                    break;
                case "num":
                    if (isNaN(parseFloat(value))) {
                        alert("必须输入数字");
                        $(c).val("0");
                        return;
                    }
                    var valueNum = parseFloat(value);
                    if (valueNum > maxValue || valueNum < minValue) {
                        alert("输入的值超过范围限制");
                        $(c).val("0");
                        return;
                    }
                    canUpdate = true;
                    break;
            }
            if (canUpdate) {
                ajaxHandler("CollegeAPP.ReportCenter.ReportListHelper", "changeRowUpdate", { table: tableName, value: value, keyColumn: keyColumn, dbcolumn: dbcolumn, keyColumnValue: keyColumnValue }, function () {
                });
            }
        }
    </script>
    <script type="text/javascript">
        function showsuo() {
            if ($("#SerchFile").css("display") == "none") {
                zhankai();
            }
            else {
                shouqi();
            }
        }

        function shouqi() {
            document.getElementById("imgShift").src = document.getElementById("imgShift").src.replace("ss03.gif", "ss03_1.gif");
            var sheight = $('#SerchFile').height();
            $("#SerchFile").hide();

            //设置浮动表头位置
            var offs = $('#folatHead').offset().top;
            $('#folatHead').offset({ top: offs - sheight });

            //设置内容高度
            var DHeight = $('#ListDiv').height();
            $('#ListDiv').height(DHeight + sheight);
            $("#iszhankai").val("False");
        }
        function zhankai() {
            document.getElementById("imgShift").src = document.getElementById("imgShift").src.replace("ss03_1.gif", "ss03.gif");
            $("#SerchFile").show();
            var sheight = $('#SerchFile').height();

            //设置浮动表头位置
            var offs = $('#folatHead').offset().top;
            $('#folatHead').offset({ top: offs + sheight });

            //设置内容高度
            var DHeight = $('#ListDiv').height();
            $('#ListDiv').height(DHeight - sheight);
            $("#iszhankai").val("True");
        }
    </script>
    <script type="text/javascript" language="javascript">
        //对检索框输入内容判断，去除非法字符输入
        function check() {
            var result = false;
            var reg = /[|]+/;
            var str = $("#txt_1").val();
            result = result || reg.test(str);
            str = $("#txt_2").val();
            result = result || reg.test(str);
            if (!result) {
                getSerchVal();
            }
            else {
                alert("请去除输入中的非法字符 \|");
            }
            return !result;
        }
    </script>
</head>
<body>
    <form runat="server" id="form1">
        <input type="hidden" id="iszhankai" runat="server" value="true" />
        <input type="hidden" id="orderByColumn" runat="server" />
        <input type="hidden" id="orderBy" runat="server" />
        <div id="main" style="overflow-x: hidden;">
            <input type="hidden" runat="server" id="SerchTxt" />
            <table style="width: 100%;" height="100%" cellpadding="0" cellspacing="0" id="tab"
                border="0">
                <tr class="Header_tr" runat="server" id="Header_tr">
                    <td height="46" align="center">
                        <table style="width: 100%;" height="46" border="0" align="center" cellpadding="0"
                            cellspacing="0" id="tabMain" class="tabMain">
                            <tr>
                                <td colspan="4">
                                    <table border="0" cellspacing="0" cellpadding="0" align="center" style="background-color: #DEEBF7; width: 100%;">
                                        <tr>
                                            <td height="28" valign="middle" class="fileIndexLab">
                                                <table border="0" cellspacing="0" cellpadding="0" style="width: 100%;" align="left"
                                                    class="tabM">
                                                    <tbody>
                                                        <tr>
                                                            <td height="24" width="350">
                                                                <div class="bt02" align="center" style="text-align: left" style="margin-left: 30px;">
                                                                    <%-- <asp:Label ID="lbl_info" runat="server" Text="">--%>
                                                                    <%if (module.isSerch)
                                                                      { %>
                                                                    <%=module.zhName%>
                                                                    <% } %>
                                                                    <%--</asp:Label>--%>
                                                                </div>
                                                            </td>
                                                            <td valign="bottom" width="*">
                                                                <div align="right" style="min-height: 100%;">
                                                                    <table border="0" cellspacing="0" cellpadding="0">
                                                                        <tbody>
                                                                            <tr class="fileIndexMag">
                                                                                <td>
                                                                                    <%foreach (var c in module.buttons)
                                                                                      {
                                                                                          if (c.showPositon == CollegeAPP.ReportCenter.showPosition.Top)
                                                                                          { %>
                                                                                    <input type="button" onclick="buttonClick(this);" success="<%=c.success %>" ajaxparam="<%=c.ajaxParam %>"
                                                                                        value="<%=c.buttonName.Trim() %>" ajaxclass="<%=c.ajaxClass %>"
                                                                                        ajaxfunction="<%=c.ajaxFunction %>" isfontbutton="<%=c.isFontButton %>" />&nbsp;&nbsp;
                                                                                <%}
                                                                                      }
                                                                                %>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="height: 2px"></td>
                            </tr>
                            <tr height="30">
                                <td>
                                    <table border="0" cellspacing="0" cellpadding="3" style="border: solid 1px #a0cff7; width: 100%;">
                                        <tbody>
                                            <tr>
                                                <td bgcolor="#e5f7fb" colspan="2">
                                                    <table border="0" cellspacing="0" cellpadding="0" style="width: 100%;" align="center">
                                                        <tbody>
                                                            <tr>
                                                                <td class="tq" height="30" width="150" style="text-align: left;">
                                                                    <strong>查询条件 </strong>
                                                                </td>
                                                                <td>
                                                                    <span style="color: #015299; text-decoration: none;" id="divAdvSearch" runat="server">&nbsp;</span>
                                                                </td>
                                                                <td align="right"></td>
                                                                <td width="*" align="right">
                                                                    <asp:Button Height="25" ID="btn_serch1" Text="检索" ToolTip="检索"
                                                                        runat="server" OnClick="btn_serch_Click" OnClientClick="return check()" />


 

                                                                    <input type="button" value="折叠" onclick="showsuo()" id="imgShift"/>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr id="SerchFile">
                                                <td bgcolor="#f5fdfe" colspan="2">
                                                    <%if (module.isSerch)
                                                      { %>
                                                    <div style="width: 100%;">
                                                        <div runat="server" id="SerchField" style="margin-top: 5px; width: 80%; float: left; text-align: left;">
                                                        </div>
                                                        <div style="width: 20%; float: left; margin-top: 5px;">
                                                            <%int buttonNum = 1; %>
                                                            <%foreach (var c in module.buttons)
                                                              {
                                                                  if (c.showPositon == CollegeAPP.ReportCenter.showPosition.OldPlace)
                                                                  { %>
                                                            <span style="margin: 3px; margin-top: 10px;">
                                                                <input type="button" onclick="buttonClick(this);" success="<%=c.success %>" ajaxparam="<%=c.ajaxParam %>"
                                                                    value="<%=c.buttonName.Trim() %>" ajaxclass="<%=c.ajaxClass %>"
                                                                    ajaxfunction="<%=c.ajaxFunction %>" isfontbutton="<%=c.isFontButton %>" /></span>
                                                            <%}
                                                                  if (buttonNum % 2 == 0)
                                                                  { %>
                                                           <%-- <br />--%>
                                                            <%} %>
                                                            <% buttonNum++;
                                                              } %>
                                                        </div>
                                                        <div style="clear: both;">
                                                        </div>
                                                        
                                                    </div>
                                                    <%--<fieldset id="serchField" style="margin: 5px">
                                                        <legend>
                                                            <%=module.zhName%></legend>
                                                        <div style="width: 100%;">
                                                            <div runat="server" id="SerchField" style="margin-top: 5px; width: 80%; float: left;">
                                                            </div>
                                                            <div style="width: 19%; float: left; margin-top: 5px;">
                                                                <asp:Button ID="btn_serch" runat="server" Text="检索" CssClass="button" OnClick="btn_serch_Click"
                                                                    OnClientClick="getSerchVal()" />&nbsp;&nbsp;
                                                                <%if(module.needPrint){ %>
                                                                    <asp:Button ID="btn_export" runat="server" Text="导出" CssClass="button" OnClientClick="hiddenThis();"
                                                                    OnClick="btn_export_Click" />
                                                                <%} %>
                                                                <%int buttonNum = 1; %>
                                                            <%foreach (var c in module.buttons)
                                                              { %>
                                                            <input type="button" onclick="buttonClick(this);" success="<%=c.success %>" ajaxparam="<%=c.ajaxParam %>"
                                                                class="button" value="<%=c.buttonName.Trim() %>" ajaxclass="<%=c.ajaxClass %>"
                                                                ajaxfunction="<%=c.ajaxFunction %>" isfontbutton="<%=c.isFontButton %>" />
                                                            <%if (buttonNum % 1 == 0)
                                                              { %>
                                                            &nbsp;&nbsp;
                                                            <%} %>
                                                            <%} %>
                                                            </div>
                                                            <div style="clear: both;"></div>
                                                             <div style="width: 100%; vertical-align: middle;">
                                                        </div>
                                                        </div>
                                                    </fieldset>--%>
                                                    <%} %>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class="Header_tr">
                    <td height="3px"></td>
                </tr>
                <tr id="middleTR" runat="server" style="display: none">
                    <td>
                        <div id="middleDIV" runat="server" style="vertical-align: middle;">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="vertical-align: top; white-space: nowrap; margin-top: 3px;">
                        <table border="0" cellpadding="0" cellspacing="0" style="border: solid 1px #a0cff7; width: 100%;">
                            <tr>
                                <td>
                                    <table id="tabMsg" cellspacing="0" cellpadding="0" width="100%" bgcolor="#e5f7fb"
                                        align="left" style="border-top-width: 0px; border-top-style: none; border-right-width: 0px; border-right-style: none; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: #A0CFF7; border-left-width: 0px; border-left-style: none;">
                                        <tbody>
                                            <tr>
                                                <td style="font-weight: bold; color: #FF6600; text-decoration: none; text-align: center;"
                                                    height="30" width="60">
                                                    <strong>信息列表</strong>
                                                </td>
                                                <td align="right">
                                                    <%foreach (var c in module.buttons)
                                                      {
                                                          if (c.showPositon == CollegeAPP.ReportCenter.showPosition.Middle)
                                                          { %>
                                                    <input type="button" onclick="buttonClick(this);" success="<%=c.success %>" ajaxparam="<%=c.ajaxParam %>"
                                                        class="button02" value="<%=c.buttonName.Trim() %>" ajaxclass="<%=c.ajaxClass %>"
                                                        ajaxfunction="<%=c.ajaxFunction %>" isfontbutton="<%=c.isFontButton %>" />
                                                    <%}
                                                      }
                                                    %>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div id="DivList" runat="server">

                                        <div id="ListDiv" style="overflow: auto;">

                                            <%--<div id="ListDiv" style="overflow-y:auto;">--%>
                                            <table id="tbl_class" style="border-collapse: collapse;" bordercolor="#99ccff" border="0">

                                                <tr bgcolor="#edf3fe" style="height: 30px;">

                                                    <%if (module.needCheckBox)
                                                      { %>
                                                    <%if (module.checkBoxType == "radio")
                                                      { %>
                                                    <th align="center" width="20px"></th>
                                                    <%}
                                                      else
                                                      { %>
                                                    <th align="center" width="20px">
                                                        <input type="checkbox" id="Checkbox1" onclick="checkAll(this);" />
                                                    </th>
                                                    <%} %>
                                                    <%} %>
                                                    <th style="line-height: 20px; color: #015299;" align="center" width="30px">序号
                                                    </th>
                                                    <%foreach (CollegeAPP.ReportCenter.displayColume colume in module.displayColumes)
                                                      { %>
                                                    <th style="line-height: 20px; color: #015299" align="center" width="<%=colume.width %>">
                                                        <%if (!colume.orderby)
                                                          { %>
                                                        <%=colume.zhName%>
                                                        <%}
                                                          else
                                                          { %>
                                                        <a style="cursor: pointer" href="javascript:void(0)" onclick="do_order(this)" ordercolumn="<%=colume.dbcolume %>">
                                                            <%=colume.zhName%>
                                                            <img src="../Css/bluenew/images/sortdefult.gif" class="orderbyImg" ordercolumn="<%=colume.dbcolume %>" /></a>
                                                        <%} %>
                                                    </th>
                                                    <%} %>
                                                </tr>
                                                <%if (dataTable.Rows.Count > 0)
                                                  { %>
                                                <%foreach (System.Data.DataRow dr in dataTable.Rows)
                                                  {
                                                      var dbrowid = xh++;
                                                %>
                                                <tr height="30px">
                                                    <%if (module.needCheckBox)
                                                      { %>
                                                    <%if (module.checkBoxType == "radio")
                                                      { %>
                                                    <td align="center" style="width: 20px">
                                                        <input type="radio" class="forChecked" name="Column_radio" dbrowid="<%=dbrowid %>"
                                                            dbcolume="<%=module.keyColume %>" value="<%=dr[module.keyColume] %>" />
                                                    </td>
                                                    <%}
                                                      else
                                                      { %>
                                                    <td align="center" style="width: 20px">
                                                        <input type="checkbox" class="forChecked" dbrowid="<%=dbrowid %>" dbcolume="<%=module.keyColume %>"
                                                            value="<%=dr[module.keyColume] %>" />
                                                    </td>
                                                    <%} %>
                                                    <%} %>
                                                    <td align="center" style="width: 30px">
                                                        <%=dbrowid %>
                                                        <%if (!string.IsNullOrEmpty(module.keyColume))
                                                          { %>
                                                        <input class="rowkeyval" type="hidden" value="<%=dr[module.keyColume] %>" />
                                                        <%} %>
                                                    </td>
                                                    <%int columnNum = 0; %>
                                                    <%foreach (CollegeAPP.ReportCenter.displayColume colume in module.displayColumes)
                                                      { %>
                                                    <%columnNum++; %>
                                                    <td align="<%=colume.align %>" dbcolume="<%=colume.dbcolume %>" style="line-height: 20px;"
                                                        width="<%=colume.width %>">
                                                        <%
                                                          if (colume.update)
                                                          { %>
                                                        <input style="width: 90%" type="text" id="input_text_<%=colume.dbcolume+"_"+xh.ToString() %>"
                                                            onblur="changeValue(this)" dbcolumn="<%=colume.dbcolume %>" tabindex="<%=dataTable.Rows.Count*columnNum+xh %>"
                                                            value="<%=dr[colume.dbcolume].ToString() %>" keycolumn="<%=module.keyColume %>"
                                                            keycolumnvalue="<%=dr[module.keyColume] %>" data_type="<%=colume.dataType %>"
                                                            maxvalue="<%=colume.maxValue %>" minvalue="<%=colume.minValue %>" table="<%=module.keyTable %>" />
                                                        <% continue;
                                                                  } %>
                                                        <%if (string.IsNullOrEmpty(colume.Format))
                                                          {%>
                                                        <%
                                                              string displayWord = dr[colume.dbcolume].ToString();
                                                              if (colume.wordLength != 0)
                                                              {
                                                                  if (displayWord.Length > colume.wordLength)
                                                                  {
                                                                      displayWord = displayWord.Substring(0, colume.wordLength) + "...";
                                                                  }
                                                              }
                                                        %>
                                                        <%if (!string.IsNullOrEmpty(colume.displayDBColumn) || !String.IsNullOrEmpty(colume.roles))
                                                          { %>
                                                        <%if (!checkNeedLink(dr, colume.displayDBColumn, colume.roles))
                                                          { continue; }  %>
                                                        <%} %>
                                                        <%if (string.IsNullOrEmpty(colume.link))
                                                          { %>
                                                        <%if (string.IsNullOrEmpty(colume.script))
                                                          {
                                                              if (colume.wordLength != 0)
                                                              {
                                                              
                                                        %>
                                                        <span title="<%=dr[colume.dbcolume] %>">
                                                            <%=displayWord%></span>
                                                        <%
                                                              }
                                                              else
                                                              {
                                                              
                                                        %>
                                                        <span>
                                                            <%=displayWord%></span>
                                                        <%
                                                                      }
                                                          }
                                                          else
                                                          { %>
                                                        <a href="javascript:void(0);" title="<%=dr[colume.dbcolume] %>" script="<%=dr["Script_"+colume.dbcolume]%>"
                                                            onclick="doScript(this)">
                                                            <%=displayWord%></a>
                                                        <%} %>
                                                        <%}
                                                          else
                                                          { %>
                                                        <a href="javascript:void(0);" title="<%=dr[colume.dbcolume] %>" onclick="openthis('<%=dr["ReportLinkHref_"+colume.dbcolume] %>')">
                                                            <%=displayWord%></a>
                                                        <%} %>
                                                        <%}
                                                          else
                                                          {
                                                              try
                                                              {
                                                                  if (colume.Type.ToLower().Equals("decimal"))
                                                                  {
                                                        %>
                                                        <%=Convert.ToDecimal(dr[colume.dbcolume]).ToString(colume.Format)%>
                                                        <%
                                                                  }
                                                                  else
                                                                  {
                                                                      if (dr[colume.dbcolume] != null && dr[colume.dbcolume] != DBNull.Value)
                                                                      {%>
                                                        <%=Convert.ToDateTime(dr[colume.dbcolume]).ToString(colume.Format)%>
                                                        <%}
                                                                          }
                                                              }
                                                              catch { }
                                                          } %>
                                                    </td>
                                                    <%} %>
                                                </tr>
                                                <%}
                                                  }
                                                  else
                                                  { 
                                                %>
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 20px;">
                                                    <tr>
                                                        <td width="30%"></td>
                                                        <td bgcolor="#a7ddf0">
                                                            <table border="0" cellspacing="2" cellpadding="0" width="100%" height="70">
                                                                <tr>
                                                                    <td bgcolor="#eeeeee" align="center">没有查询到相关数据！
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                        <td width="30%"></td>
                                                    </tr>
                                                </table>
                            </tr>
                            <% 
                                                  } %>
                            <%if (module.isCal)
                              { %>
                            <tr>
                                <td align="center" style="line-height: 20px">计算
                                </td>
                                <%if (module.needCheckBox)
                                  { %>
                                <td align="center" style="line-height: 20px"></td>
                                <%} %>
                                <%foreach (CollegeAPP.ReportCenter.displayColume colume in module.displayColumes)
                                  { %>
                                <td align="<%=colume.align %>" class="cla" dbcolume="<%=colume.dbcolume %>" cla="<%=colume.Cal %>"></td>
                                <%} %>
                            </tr>
                            <%} %>
                        </table>
        </div>
        </div>
                                </td>
                            </tr>
                        </table>
                        <div id="pageing" runat="server">
                            <div id="div_paging">
                            </div>
                            <asp:Label ID="lblScript" runat="server"></asp:Label>
                        </div>
        <div style="text-align: center;" id="divBtnBottom">
            <%foreach (var c in module.buttons)
              {
                  if (c.showPositon == CollegeAPP.ReportCenter.showPosition.Bottom)
                  { %>
            <input type="button" onclick="buttonClick(this);" success="<%=c.success %>" ajaxparam="<%=c.ajaxParam %>"
                value="<%=c.buttonName.Trim() %>" ajaxclass="<%=c.ajaxClass %>"
                ajaxfunction="<%=c.ajaxFunction %>" isfontbutton="<%=c.isFontButton %>" />
            <%}
              }
            %>
        </div>
        </td>
                </tr>
            </table>
            <iframe id="frame" style="display: none"></iframe>
        </div>
    </form>
</body>
</html>
