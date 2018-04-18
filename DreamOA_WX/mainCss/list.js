//分页列表
var url = "";
function pagingInit(className, totalAmount, perAmount, nowPage, linkFunc) {
    if (className == "")
        className = "sabrosus";
    var maxShowPage = 7;
    document.getElementById("div_paging").className = className;
    var pages = Math.ceil(totalAmount / perAmount);

    var urlObj = parseUrlToObject(location.href);
    url = location.href.split('?')[0] + "?";

    for (var key in urlObj) {
        if (key != "totalAmount" && key != "perAmount" && key != "nowPage") {
            url += key + "=" + urlObj[key] + "&";
        }
    }
    if (linkFunc == null || linkFunc == "")
        linkFunc = "moduleGoLink";

    var outPut = "<lable>";
    if (nowPage == 1)
        outPut += '<span class="disabled"> < </span>';
    else
        outPut += '<a href="javascript:' + linkFunc + '(\'' + url + 'totalAmount=' + totalAmount + '&perAmount=' + perAmount + '&nowPage=1\')"> < </a>';

    var iPage = 1;
    if (nowPage - Math.floor(maxShowPage / 2) > 1)
        iPage = nowPage - Math.floor(maxShowPage / 2);

    if (pages - iPage < maxShowPage)
        iPage = pages - maxShowPage + 1;

    if (iPage < 1)
        iPage = 1;

    var iCount = 1;
    while (iPage < pages + 1) {
        if (iPage == nowPage)
            outPut += '<span class="current">' + iPage + '</span>';
        else
            outPut += '<a href="javascript:' + linkFunc + '(\'' + url + 'totalAmount=' + totalAmount + '&perAmount=' + perAmount + '&nowPage=' + iPage + '\')"> ' + iPage + ' </a>';
        iPage++;
        iCount++;
        if (iCount > maxShowPage)
            break;
    }

    if (nowPage >= pages)
        outPut += '<span class="disabled"> > </span>';
    else
        outPut += '<a href="javascript:' + linkFunc + '(\'' + url + 'totalAmount=' + totalAmount + '&perAmount=' + perAmount + '&nowPage=' + pages + '\')"> > </a>';

    outPut += "<span style=\"font-size:14px;\">共【" + totalAmount + "】条记录 每页显示：<select style=\"font-size:14px;\" onchange=\"" + linkFunc + "('" + unescape(url) + "totalAmount=" + totalAmount + "&perAmount=' + this.value + '&nowPage=1')\"></span>";

    for (var iNums = 10; iNums < 101; iNums = iNums + 10) {
        if (perAmount == iNums)
            outPut += "<option selected value=" + iNums + ">" + iNums + "</option>";
        else
            outPut += "<option value=" + iNums + ">" + iNums + "</option>";
    }
    outPut += "</select>";
    var strInput = "&nbsp;<input type='text' id='txtGo' value='" + nowPage + "' style='width:30px;text-align:center;_height:22px;vertical-align:top;' />&nbsp;<a style=\"padding-top:2px;\" href=javascript:goPage('" + className + "'," + totalAmount + "," + perAmount + "," + nowPage + ",'')> GO </a>";
    outPut += strInput;
    outPut += "</lable>";
    document.getElementById("div_paging").innerHTML = outPut;
}
function goPage(className, totalAmount, perAmount, nowPage, linkFunc) {
    var pageIndex = document.getElementById("txtGo").value;
    var reg = new RegExp("^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$");
    if (!reg.test(pageIndex)) {
        pageIndex = 1;
    }
    var pages = Math.ceil(totalAmount / perAmount);
    if (pageIndex > pages) {
        pageIndex = 1;
    }
    location.href = url + 'totalAmount=' + totalAmount + '&perAmount=' + perAmount + '&nowPage=' + pageIndex;
}


//锁表格
function LockTable(TableID, FixColumnNumber, width, height, FixPix, HeadHeight, HeadColor, OddColor, LockColor ) {
    /// <summary>

    ///     锁表头和列

    /// </summary>

    /// <param name="TableID" type="String">
    ///     要锁定的Table的ID
    /// </param>
    /// <param name="FixColumnNumber" type="Number">
    ///     要锁定列的个数
    /// </param>
    /// <param name="width" type="Number">
    ///     显示的宽度
    /// </param>
    /// <param name="height" type="Number">
    ///     显示的高度
    /// </param>
    /// <param name="FixPix" type="Number">
    ///     数据行的高度
    /// </param>
    /// <param name="HeadHeight" type="Number">
    ///     标题行的高度
    /// </param>
    /// <param name="HeadColor" type="String">
    ///     标题行的背景色
    /// </param>
    /// <param name="OddColor" type="String">
    ///     间隔行的背景色
    /// </param>
    /// <param name="LockColor" type="String">
    ///     锁定行的背景色
    /// </param>


//    var d = new Date();
//    $("#div_all_pc").after("<br/>" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds());
    var tableLayout = $("#" + TableID + "_tableLayout");

    if ($(tableLayout).length != 0) {

        //$("#" + TableID + "_tableLayout").before($("#" + TableID));
        //$("#" + TableID + "_tableLayout").empty();
        $(tableLayout).width(width);
        $(tableLayout).height(height);

    }

    else {
        $("#" + TableID).after("<div id='" + TableID + "_tableLayout' style='overflow:hidden;height:" + height + "px; width:" + width + "px;'></div>");


        $('<div id="' + TableID + '_tableFix"></div>'

    + '<div id="' + TableID + '_tableHead"></div>'

    + '<div id="' + TableID + '_tableColumn"></div>'

    + '<div id="' + TableID + '_tableData"></div>').appendTo("#" + TableID + "_tableLayout");





        var oldtable = $("#" + TableID);


        var tableFixClone = oldtable.clone(true);

        tableFixClone.attr("id", TableID + "_tableFixClone");

        $("#" + TableID + "_tableFix").append(tableFixClone);

        var tableHeadClone = oldtable.clone(true);

        tableHeadClone.attr("id", TableID + "_tableHeadClone");

        $("#" + TableID + "_tableHead").append(tableHeadClone);

        var tableColumnClone = oldtable.clone(true);

        tableColumnClone.attr("id", TableID + "_tableColumnClone");


        $("#" + TableID + "_tableColumn").append(tableColumnClone);

        $("#" + TableID + "_tableData").append(oldtable);


    }


    $("#" + TableID + "_tableColumnClone").find("tr:gt(1)").removeAttr("style");

    $("#" + TableID + "_tableLayout table").css("margin", "0");





    var HeadHeight = HeadHeight;

    HeadHeight += 2;

    //alert(HeadHeight);
    var tableHead = $("#" + TableID + "_tableHead");
    $(tableHead).css("height", HeadHeight);

    $("#" + TableID + "_tableFix").css("height", HeadHeight);





    var ColumnsWidth = 0;

    var ColumnsNumber = 0;

    $("#" + TableID + "_tableColumn tr:last td:lt(" + FixColumnNumber + ")").each(function () {

        ColumnsWidth += $(this).outerWidth(true);

        ColumnsNumber++;

    });

    ColumnsWidth += 2;

    if ($.browser.msie) {

        switch ($.browser.version) {

            case "7.0":

                if (ColumnsNumber >= 3) ColumnsWidth--;

                break;

            case "8.0":

                if (ColumnsNumber >= 2) ColumnsWidth--;

                break;

        }

    }

    $("#" + TableID + "_tableColumn").css("width", ColumnsWidth);

    $("#" + TableID + "_tableFix").css("width", ColumnsWidth);





    $("#" + TableID + "_tableData").scroll(function () {

        $(tableHead).scrollLeft($("#" + TableID + "_tableData").scrollLeft());

        $("#" + TableID + "_tableColumn").scrollTop($("#" + TableID + "_tableData").scrollTop());

    });



    $("#" + TableID + "_tableFix").css({ "overflow": "hidden", "position": "relative", "z-index": "50", "background-color": HeadColor });

    $(tableHead).css({ "overflow": "hidden", "width": width - FixPix, "position": "relative", "z-index": "45", "background-color": HeadColor });

    //非锁定列用间隔行颜色
    if (OddColor != "") {
        $("#" + TableID + "_tableData tr:odd").css({ "background-color": OddColor });
    }

    $("#" + TableID + "_tableData").css({ "overflow": "scroll", "width": width, "height": height, "position": "relative", "z-index": "35" });

    $("#" + TableID + "_tableColumn").css({ "overflow": "hidden", "height": height - FixPix, "position": "relative", "z-index": "40" });

    //锁定列用特殊颜色
    if (LockColor != "") {
        $("#" + TableID + "_tableColumn").css({ "background-color": LockColor });
    }
    else {
       $("#" + TableID + "_tableColumn").css({ "background-color": "#FFFFFF" });
    }


   if ($(tableHead).width() > $("#" + TableID + "_tableFix table").width()) {

       $(tableHead).css("width", $("#" + TableID + "_tableFix table").width());

        $("#" + TableID + "_tableData").css("width", $("#" + TableID + "_tableFix table").width() + FixPix);

    }

    if ($("#" + TableID + "_tableColumn").height() > $("#" + TableID + "_tableColumn table").height()) {

        $("#" + TableID + "_tableColumn").css("height", $("#" + TableID + "_tableColumn table").height());

        $("#" + TableID + "_tableData").css("height", $("#" + TableID + "_tableColumn table").height() + FixPix);

    }



    $("#" + TableID + "_tableFix").offset($("#" + TableID + "_tableLayout").offset());

    $(tableHead).offset($("#" + TableID + "_tableLayout").offset());

    $("#" + TableID + "_tableColumn").offset($("#" + TableID + "_tableLayout").offset());

    $("#" + TableID + "_tableData").offset($("#" + TableID + "_tableLayout").offset());
//    d = new Date();
//    $("#div_all_pc").after("<br/>" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds());
}
