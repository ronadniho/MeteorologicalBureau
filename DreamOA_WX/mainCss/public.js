//以下函数来自列表
function addRecordAll(finfo_id, folder) {
    if (parent.document.getElementById("ddlist_Obj").value == "" || parent.document.getElementById("ddlist_Obj").value == "-1") {
        alert("请选择拟稿文件类别！");
        return;
    }
    addRecord(parent.document.getElementById("ddlist_Obj").value, finfo_id, folder);
}
//身份证验证
function checkIDCard(idcard) {
    var Errors = new Array("验证通过!", "身份证号码位数不对!", "出生日期超出范围或含有非法字符!", "身份证号码校验错误!", "身份证地区非法!");
    var area = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" }

    var Y, JYM;
    var S, M;
    var idcard_array = new Array();
    idcard_array = idcard.split("");
    if (area[parseInt(idcard.substr(0, 2))] == null) {
         return false;
    }

    switch (idcard.length) {
        case 15:
            if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;
            } else {
                ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;
            }
            if (ereg.test(idcard)) {
                return true;
            }
            else {
                return false;
            }
            break;
        case 18:
            //18位身份号码检测
            if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
                ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;
            } else {
                ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;
            }
            if (ereg.test(idcard)) {
                S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
    + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9
    + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10
    + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5
    + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8
    + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4
    + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2
    + parseInt(idcard_array[7]) * 1
    + parseInt(idcard_array[8]) * 6
    + parseInt(idcard_array[9]) * 3;
                Y = S % 11;
                M = "F";
                JYM = "10X98765432";
                M = JYM.substr(Y, 1);
                if (M == idcard_array[17]) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
            break;
        default:
            return false;
    }
}
function addRecord(obj, finfo_id, folder) {
    if ($("#tr_0")[0] != null && $("#tr_0")[0] != "undefined")
        return;
    var myDate = new Date();
    $.ajax({ type: "POST", url: "FormAnalysis.aspx", data: "info_id=0&obj=" + obj + "&finfo_id=" + finfo_id + "&folder=" + folder + "&timestamp=" + myDate.getTime() + "",
        success: function (msg) {
            if (msg != "") {
                $("#sending").css("display", "none");
                var tmpaa = "<tr id='tr_0'>";
                for (var i = 0; i < $("#tr_title").children("td").length; i++) {
                    if (i == $("#tr_title").children("td").length - 1)
                        tmpaa += "<td align=center><a href=javascript:commitRecord('0','" + obj + "','" + finfo_id + "','add') style='padding-left:3px;' id='edit_0'><img src=../css/bluenew/images/submit.gif></a></td>";
                    else
                        tmpaa += "<td></td>";
                }

                tmpaa += "</tr>";
                $(tmpaa).insertAfter($("#TabList tr:eq(0)"));
                try {
                    var pos1 = msg.indexOf('divMain');
                    var pos2 = msg.lastIndexOf('</div>');
                    var fields = msg.substring(pos1 + 9, pos2);
                    var colInfo = fields.split("<span></span>");

                    pos1 = msg.indexOf('divHidden');
                    pos2 = msg.indexOf('</div>', pos1 + 1);
                    var hiddeninfo = msg.substring(pos1 + 11, pos2);
                    $("#tr_0").children("td")[0].innerHTML += hiddeninfo;

                    for (var i = 0; i < colInfo.length; i++) {
                        $("#tr_0").children("td")[i + 1].innerHTML = colInfo[i];
                    }
                }
                catch (err) {
                }
            }
        }
    });
}

function editRecord(info_id, obj, finfo_id, folder) {
    var myDate = new Date();
    $.ajax({ type: "POST", url: "FormAnalysis.aspx", data: "info_id=" + info_id + "&obj=" + obj + "&finfo_id=" + finfo_id + "&folder=" + folder + "&timestamp=" + myDate.getTime() + "",
        success: function (msg) {
            if (msg != "") {
                try {
                    var pos1 = msg.indexOf('divMain');
                    var pos2 = msg.lastIndexOf('</div>');
                    var fields = msg.substring(pos1 + 9, pos2);
                    var colInfo = fields.split("<span></span>");
                    pos1 = msg.indexOf('divHidden');
                    pos2 = msg.indexOf('</div>', pos1 + 1);
                    var hiddeninfo = msg.substring(pos1 + 11, pos2);
                    $("#tr_" + info_id).children("td")[0].innerHTML += hiddeninfo;

                    for (var i = 0; i < colInfo.length; i++) {
                        if (colInfo[i] != "")
                            $("#tr_" + info_id).children("td")[i + 1].innerHTML = colInfo[i];
                    }
                    $("#edit_" + info_id)[0].innerHTML = $("#edit_" + info_id)[0].innerHTML.replace("edit.gif", "submit.gif");
                    $("#edit_" + info_id)[0].href = "javascript:commitRecord('" + info_id + "','" + obj + "','" + finfo_id + "','update')";
                }
                catch (err) {
                }
            }
        }
    });
}

function deleteRecord(info_id) {
    var myDate = new Date();
    $.ajax({ type: "POST", url: "ListFormSave.aspx", data: "info_id=" + info_id + "&act=delete&timestamp=" + myDate.getTime() + "",
        success: function (msg) {
            if (msg != "") {
                try {
                    $("#tr_" + info_id).remove();
                }
                catch (err) {
                }
            }
        }
    });
}

function commitRecord(info_id, obj, finfo_id, act) {
    var myDate = new Date();
    var controls = ($("#hidinfo_" + info_id)[0].value).split(',');
    var fields = ($("#hidfield_" + info_id)[0].value).split(',');
    var controltype = ($("#hidcontrol_" + info_id)[0].value).split(',');

    var parameter = ($("#hidparam_" + info_id)[0].value).split(',');
    var form_id = $("#hidformid_" + info_id)[0].value;
    var table = $("#hidtable_" + info_id)[0].value;

    var submitdata = "<Root>";
    for (var i = 0; i < controls.length; i++) {
        var field = fields[i].split(".");
        var dataInfo = $("#" + controls[i])[0].value;

        if (controltype[i] == "WH" && controls[i].indexOf("_TxtDataControl") == -1) {
            dataInfo += ";" + $("#" + controls[i] + "").find("option:selected").text();
        }
        if (controltype[i] == "CODE" && $("#" + controls[i])[0].value != $("#" + controls[i] + "ID")[0].value) {
            dataInfo += ";" + $("#" + controls[i] + "ID")[0].value;
        }
        if (controltype[i] == "USER" && $("#" + controls[i])[0].value != "") {
            dataInfo += ";" + $("#" + controls[i] + "2")[0].value;
        }

        submitdata += "<Data Id=\"" + controls[i] + "\" Table=\"" + field[0] + "\" Column=\"" + field[1] + "\" ColType=\"" + field[2] + "\" Control=\"" + controltype[i] + "\" Param=\"" + parameter[i] + "\"><![CDATA[" + dataInfo + "]]></Data>";
    }
    submitdata += "</Root>";

    $.ajax({ type: "POST", url: "ListFormSave.aspx", data: "info_id=" + info_id + "&obj=" + obj + "&finfo_id=" + finfo_id + "&form_id=" + form_id + "&table=" + table + "&act=" + act + "&data=" + submitdata + "&timestamp=" + myDate.getTime() + "",
        success: function (msg) {
            if (msg != "") {
                if (msg.indexOf("Error|") == -1) {
                    var newInfo_id = msg;
                    var base64Filter = base64encode(" AND G_INFOS.ID=" + msg);
                    $.ajax({ type: "GET", url: "ListView.aspx", data: "folder=0&obj=" + obj + "&finfo_id=" + finfo_id + "&filter=" + base64Filter + "&timestamp=" + myDate.getTime() + "",
                        success: function (msg) {
                            if (msg != "") {
                                var pos1 = msg.indexOf("tr_" + newInfo_id);
                                pos1 = msg.indexOf(">", pos1 + 1);
                                var pos2 = msg.indexOf("</tr>", pos1 + 1);
                                $("#tr_" + info_id).html(msg.substring(pos1 + 1, pos2));
                            }
                        }
                    });
                }
                else {
                    msg = msg.replace("Error|", "");
                    msg = msg.replace("正在中止线程。", "");
                    alert(msg.replace("Error|", ""));
                }
            }
        }
    });
}

//以下函数来自表单
function saveFYYJ(info_id) {
    showSaving();
    var myDate = new Date();
    $.ajax({ type: "POST", url: "../FormAction.aspx", data: "text=" + escape($("#textFYYJ")[0].value) + "&info_id=" + info_id + "&act=savefyyj&timestamp=" + myDate.getTime() + "", success: function (msg) { if (msg == "") alert('分阅意见保存成功！'); else alert(msg); hideSaving(); } });
}

//获取url参数
function getUrlParam(paramName) {
    var url = window.location.href;
    var oRegex = new RegExp('[\?&]' + paramName + '=([^&]+)', 'i');
    var oMatch = oRegex.exec(url);
    if (oMatch && oMatch.length > 1) {
        return decodeURI(oMatch[1]);
    } else {
        return "";
    }
}

function parseUrlToObject(url) {
    var args = new Object();
    var str = url;
    var queryargs = str.split('?');

    if (queryargs.length == 2) {
        var query = queryargs[1];
        var pairs = query.split('&');

        for (var i = 0; i < pairs.length; i++) {
            var pos = pairs[i].indexOf('=');
            if (pos == -1) continue;
            var argname = pairs[i].substring(0, pos);
            var value = pairs[i].substring(pos + 1);
            args[argname] = (value);
        }
    }
    return args;
}

//1.js验证只能输入数字.
function checkValidateNumber(oEvent) {
    /*
    var e = oEvent;
    var validKey = ",8,35,36,37,39,189,190,229,";
    if (e.keyCode > 47 && e.keyCode < 58 || validKey.indexOf("," + e.keyCode + ",") != -1) {

    return true;
    }
    */
    return true;
}

//以Div层打开新窗口页面
function openJbox(title, url, width, height) {
    if (width == "")
        width = 800;
    if (height == "")
        height = 600;
    var tops = 0;
    tops = (document.body.clientHeight - eval(height)) / 2;
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

function closeJbox() {
    top.$.jBox.close();
}

function divRefreshParent(info_id) {
    var urlObj = parseUrlToObject(location.href);
    var url = location.href.split('?')[0] + "?";

    for (var key in urlObj) {
        if (key != "info_id")
            url += key + "=" + urlObj[key] + "&";
    }
    url += "info_id=" + info_id;
    moduleGoLink(url);
   }
   function divRefreshParentView(info_id,isView) {
   	var urlObj = parseUrlToObject(location.href);
   	var url = location.href.split('?')[0] + "?";

   	for (var key in urlObj) {
   		if (key != "info_id")
   			url += key + "=" + urlObj[key] + "&";
   	}
   	url += "info_id=" + info_id;
   	if (isView == 1) {
   		url = url.replace("isview=&", "isview=1&");
   		url = url.replace("isview=0&", "isview=1&");
   	}
   	moduleGoLink(url);
   }
function RefreshPage(guid) {
    var urlObj = parseUrlToObject(location.href);
    var url = location.href.split('?')[0] + "?";

    for (var key in urlObj) {
        if (key != "guid" && key != "type")
            url += key + "=" + urlObj[key] + "&";
    }
    url += "guid=" + guid;
    url += "&type=update";
    moduleGoLink(url);
}

//模式窗口内切换链接
function moduleGoLink(url) {
    var link = document.createElement("a");
    link.href = url;
    document.body.appendChild(link);
    try {
        link.click();
    }
    catch (err) {
        location.href = url;
    }
}

//模式窗口打开新窗口
function moduleOpenWindow(url, id) {
    var openobj = window;
    if (typeof (window.dialogArguments) == "object")
        openobj = window.dialogArguments;
    openobj.open(url, id, 'top=0,left=0,width=' + (screen.availWidth - 10) + ',height=' + (screen.availHeight - 30) + ',resizable=1,scrollbars=1');
}

//模式窗口打开新窗口
function moduleOpenWindow(url, id,width,height) {
	var openobj = window;
	if (typeof (window.dialogArguments) == "object") {
		openobj = window.dialogArguments;
	}
	if (width == 0) {
		width = screen.availWidth - 10;
	}
	if (height == 0) {
		height = screen.availHeight - 30;
	}
	var top = (screen.availHeight - height) / 2;
	var left=(screen.availWidth - width) / 2;
	openobj.open(url, id, 'top=' + top + ',left=' + left + ',width=' + (width) + ',height=' + (height) + ',resizable=1,scrollbars=1');
}

//模式窗口刷新父窗口
function moduleRefreshParent() {
    var openobj = window;
    if (typeof (window.dialogArguments) == "object")
        openobj = window.dialogArguments;
    openobj.location.href = openobj.location.href;
}

function openFile(url, newwin) {
    if (newwin == "1") {
        top.window.open(url, "_blank", 'top=0,left=0,width=' + (screen.availWidth - 10) + ',height=' + (screen.availHeight - 30) + ',resizable=1,scrollbars=1');
        return;
    }
    var iframe;
    if (document.getElementById("iframeFile") != null) {
        iframe = document.getElementById("iframeFile");
        iframe.src = url;
    }
    else {
        try {
            iframe = document.createElement('<iframe name="iframeFile">');
        }
        catch (ex) {
            iframe = document.createElement('iframe');
        }

        iframe.id = 'iframeFile';
        iframe.name = 'iframeFile';
        iframe.width = 0;
        iframe.height = 0;
        iframe.marginHeight = 0;
        iframe.marginWidth = 0;
        iframe.style.display = "none";
        iframe.src = url;

        var objBody = document.getElementsByTagName("body").item(0);
        objBody.insertBefore(iframe, objBody.firstChild);
    }

}

function adjustAttach(id, mid, adjid, adjmid, act) {
    showSaving();
    var myDate = new Date();
    $.ajax({ type: "GET", url: "../HandleAttach.aspx", data: "mid=" + mid + "&adjid=" + adjid + "&id=" + id + "&adjmid=" + adjmid + "&act=adjust&timestamp=" + myDate.getTime() + "", success: function (msg) { if (msg == "") moduleGoLink(location.href); else alert(msg); hideSaving(); } });
}

function deleteAttach(mid) {
    showSaving();
    var myDate = new Date();
    $.ajax({ type: "GET", url: "../HandleAttach.aspx", data: "mid=" + mid + "&act=delete&timestamp=" + myDate.getTime() + "", success: function (msg) { if (msg == "") moduleGoLink(location.href); else alert(msg); hideSaving(); } });
}
function adjustAttach_hytz(id, mid, adjid, adjmid, act) {
    var myDate = new Date();
    $.ajax({ type: "GET", url: "../FormBuilder/HandleAttach.aspx", data: "mid=" + mid + "&adjid=" + adjid + "&id=" + id + "&adjmid=" + adjmid + "&act=adjust&timestamp=" + myDate.getTime() + "", success: function (msg) { if (msg == "") moduleGoLink(location.href); else alert(msg); } });
}

function deleteAttach_hytz(mid) {
    var myDate = new Date();
    $.ajax({ type: "GET", url: "../FormBuilder/HandleAttach.aspx", data: "mid=" + mid + "&act=delete&timestamp=" + myDate.getTime() + "", success: function (msg) { if (msg == "") moduleGoLink(location.href); else alert(msg); } });
}

function moveInputFile(objname) {
    var obj = document.getElementById(objname);
    var realPos = getAbsPoint(event.srcElement);
    obj.style.left = parseInt(realPos[0]) - 238;
    obj.style.filter = "alpha(opacity = 0)";
    obj.style.opacity = "0";
}

function getAbsPoint(e) {
    var x = e.offsetLeft, y = e.offsetTop;
    while (e = e.offsetParent) {
        x += e.offsetLeft;
        y += e.offsetTop;
    }
    return [x, y];
}

function changeButtonPic(obj, strPic) {
    obj.style.backgroundImage = "url(" + strPic + ")";
}

function open_win(url, winid, args) {
    window.open(url, winid, args);
}
function reload(sel, name) {
    var value = new String();
    var text = new String();
    var valuename = name + "_DataControlValue";
    var textname = name + "_DataControlText";
    var indexname = name + "_DataControlIndex";
    value = "";
    text = "";
    for (var i = 0; i < sel.length; i++) {
        if (value.length <= 0) {
            value = sel.options[i].value;
        }
        else {
            value += "," + sel.options[i].value;
        }
        if (text.length <= 0) {
            text = sel.options[i].text;
        }
        else {
            text += "," + sel.options[i].text;
        }
    }
    document.forms[0][valuename].value = value;
    document.forms[0][textname].value = text;
    document.forms[0][indexname].value = sel.selectedIndex;
}
function catch_keydown(sel) {
    switch (event.keyCode) {
        case 13:
            //Enter;
            sel.options[sel.length] = new Option("", "", false, true);
            event.returnValue = false;
            break;
        case 27:
            //Esc;
            alert("text:" + sel.options[sel.selectedIndex].text + ", value:" + sel.options[sel.selectedIndex].value + ";");
            event.returnValue = false;
            break;
        case 46:
            //Delete;
            if (confirm("删除当前选项！？")) {
                sel.options[sel.selectedIndex] = null;
                if (sel.length > 0) {
                    sel.options[0].selected = true;
                }
            }
            event.returnValue = false;
            break;
        case 8:
            //Back Space;
            var s = sel.options[sel.selectedIndex].text;
            sel.options[sel.selectedIndex].text = s.substr(0, s.length - 1);
            sel.options[sel.selectedIndex].value = sel.options[sel.selectedIndex].text
            event.returnValue = false;
            break;
    }
}
function catch_press(sel) {
    sel.options[sel.selectedIndex].text = sel.options[sel.selectedIndex].text + String.fromCharCode(event.keyCode);
    sel.options[sel.selectedIndex].value = sel.options[sel.selectedIndex].text;
    event.returnValue = false;
}
function Ztc(Name, Parms) {
    var str = new String();
    var bt;
    var rtn;
    str = Parms;
    pos = str.indexOf(",");
    bt = str.substring(0, pos);
    Parms = str.substring(pos + 1, str.length);
    bt = bt + "_DataControl";
    bt = document.forms[0][bt].value;
    var url = " ../../Modules/IFrameBridge.aspx?Title=主题词标引&Url=..%2FBase%2FGetZtcMain.aspx%3FName%3D" + Name + "%26Parms%3D" + Parms + "%26BT%3D" + bt;
    rtn = window.showModalDialog(url, window, 'dialogTop:0px;dialogLeft:0px;dialogWidth:800px;dialogHeight:600px;scroll:yes;edge: raised; center: No; help: No; resizable: No; status: No; unadorned:Yes;');
}
function SelectCar(Name, Driver, CarID, CarType) {
    var url = "../../selwindow/Sel_car.aspx?car_id='+CarID+'&c2='+Driver+'&c9='+CarType+'";
    window.showModalDialog(url, window, 'dialogTop:0px;dialogLeft:0px;dialogWidth:700px;dialogHeight:600px;scroll:1;status:0;help:0');
}

function selHandleStatus(Name, showtext) {
    var newName = Name + ":TxtBoxYj";
    document.forms[0][newName].value = showtext;
}

function SelectYj(Name, Parms) {
    var newName = Name + ":TxtBoxYj";
    //qianf add escape() 2004-2-25
    var fdate = document.forms[0][newName].value;
    if (document.forms[0][Name + ":rdListHandleStatus"] != null) {
        for (var icount = 0; icount < document.forms[0][Name + ":rdListHandleStatus"].length; icount++) {
            if (document.forms[0][Name + ":rdListHandleStatus"][icount].checked == true) {
                fdate += "handlestatus=" + document.forms[0][Name + ":rdListHandleStatus"][icount].value;
                break;
            }
        }
    }

    var strTextvalue = escape(escape(fdate));
    var url = " ../../Modules/IFrameBridge.aspx?Title=意见&Url=..%2Fmodules%2FAttitudeTemplate.aspx%3FName%3D" + Name + "%26Parms%3D" + Parms + "&strValue=" + strTextvalue;
    rtn = window.showModalDialog(url, window, 'dialogWidth:800px;dialogHeight:600px;scroll:No;edge: raised; center: Yes; help: No; resizable: No; status: No; unadorned:Yes;');
    top.location.href = top.location.href;
}
function Select(Name, Title, Parms, sObj, sInfoId) {
    var w = (window.screen.availWidth - 650) / 2;
    var h = (window.screen.availHeight - 550) / 2;
    var obj = sObj;
    var info_id = sInfoId;
    var fpath = "../../";
    if (location.href.toLowerCase().indexOf("/aspxfile/") == -1)
        fpath = "../";

    if (Parms.indexOf("坐落房屋") != -1) {
        var url = fpath + "AssetManagement/SelectBuilding.aspx?Title=" + Title + "&Name=" + Name + "&obj=" + obj + "&info_id=" + info_id + "&Parms=" + Parms;
        window.showModalDialog(url, window, 'dialogWidth:800px;dialogHeight:600px;scroll:No;edge: raised; center: Yes; help: No; resizable: No; status: No; unadorned:Yes;');
    }
    else if (Parms.indexOf("存放地点") != -1) {
        var url = fpath + "AssetManagement/SelectRoom.aspx?Title=" + Title + "&Name=" + Name + "&obj=" + obj + "&info_id=" + info_id + "&Parms=" + Parms;
        window.showModalDialog(url, window, 'dialogWidth:900px;dialogHeight:600px;scroll:No;edge: raised; center: Yes; help: No; resizable: No; status: No; unadorned:Yes;');
    }
    else if (Parms.indexOf("选择资产") != -1) {
        var url = fpath + "AssetManagement/SelectSingleAsset.aspx?Title=" + Title + "&Name=" + Name + "&obj=" + obj + "&info_id=" + info_id + "&Parms=" + Parms;
        window.showModalDialog(url, window, 'dialogWidth:900px;dialogHeight:600px;scroll:No;edge: raised; center: Yes; help: No; resizable: No; status: No; unadorned:Yes;');
    }
    else {
        var url = fpath + "selwindow/SelWin.aspx?Title=" + Title + "&Name=" + Name + "&obj=" + obj + "&Parms=" + Parms;
        window.open(url, 'window', 'top=' + h + ',left=' + w + ',width=650,height=550,scrollbars=1,resizable=1');
    }
}
function SelectUser(Name, Title, Parms, attr, area) {
    //var url="../../selwindow/SelUser.aspx?Title="+Title+"&Name="+Name+"&Parms="+Parms;
    var checkSub = "";
    //此处为了避免出现四位attr  2013年9月26日 12:17:38
    if (attr.length ==4) {
        checkSub = attr.substring(3);
        attr = attr.substring(0, 3);
      //  alert(attr+"==="+checkSub);
    }
    var fpath = "../../";
    if (location.href.toLowerCase().indexOf("/aspxfile/") == -1)
        fpath = "../";
    var url = fpath + "selwindow/CurlSelAll.aspx?attr=" + attr + "&area=" + area + "&CtrlName=" + Name + "_DataControl&CtrlID=" + Name + "_DataControl2&Sp=、&isMuti=" + Parms + "&checksub=" + checkSub + "";
    window.showModalDialog(url, window, 'dialogWidth:700px;dialogHeight:550px;center:1;scroll:1;status:0;help:0');
}
function SetYjData(name, flddata) {
    //qianf add unescape() 2004-2-25
    document.forms[0][name].value = unescape(flddata);
}
function SetData(name, flddata) {
    name = name + "_DataControl";
    document.forms[0][name].value = flddata;
}
//来自表单的函数END


function ToolbarOnMouseOver(e) {
    e.bgColor = "#CEE7FF";
    e.style.borderColor = "#00557D";
}
function ToolbarOnMouseOut(e) {
    e.bgColor = "";
    e.style.borderColor = "buttonface";
}

//判断是否是正整数
//obj,控件的ID
//objname,控件的中文含义

function IsPositiveInteger(obj, objname) {
    if (!/^([1-9]\d*|[1-9]\d*\.\d+|0)$/.test(obj.value)) {
        alert("对不起," + objname + "应该输入正数!");
        obj.focus();
        return false;
    }
    else {
        return true;
    }
}

function ShowHidePageControl(ShowControlID, HiddenControlIDList) {
    var formatChar = ",";
    var ArrUnfosID = HiddenControlIDList.split(formatChar);

    for (var i = 0; i < ArrUnfosID.length; i++) {
        document.getElementById(ArrUnfosID[i]).style.display = "none";
    }
    document.getElementById(ShowControlID).style.display = "";
}

/*
函数功能：标签卡1.0
作    者：Curl.Z
时    间：2007-1-17
遗留问题：因为页面切图的问题，所以目前暂时调用TabStrip_Tab100_Unfocus，这样的结果是不灵活。标签的宽度只能是100px

参数说明：
[OnfusID]：获得焦点的空间的ID。
[UnfosIDList]：失去焦点的控件的ID组合。中间以“,”分割。
[FrameID]：iframe的ID。
[FrameURL]：iframe的页面指向。

*/
function TabStrip(OnfusID, UnfosIDList, FrameID, FrameURL) {
    var formatChar = ",";
    var ArrUnfosID = UnfosIDList.split(formatChar);

    for (var i = 0; i < ArrUnfosID.length; i++) {
        document.getElementById(ArrUnfosID[i]).className = "TabStrip_Tab100_Unfocus";
        document.getElementById(ArrUnfosID[i] + "_Font").className = "TabStrip_Tab_Font_Unfocus";
    }
    document.getElementById(OnfusID).className = "TabStrip_Tab100_Onfocus";
    document.getElementById(OnfusID + "_Font").className = "TabStrip_Tab_Font_Onfocus";
    document.all(FrameID).src = FrameURL;
}

function open_window(url) {
    //window.open(url,'win1','top=0,left=0,height=540,width=790,resizable=1,scrollbars=1,status=yes')
    //window.alert("YES");
    window.showModalDialog(url, window, "dialogHeight:" + parseInt(screen.availHeight * 0.95, 10) + "px;dialogWidth:" + screen.availWidth + "px; dialogTop: 20px; dialogLeft: 20px; edge: raised; center: Yes; help: No; resizable: No; status: No; unadorned:Yes;");
    window.location.href = window.location.href;
    return;
}

function open_windowShow(url) {
    window.open(url, null, "top=0,left=0,height=" + parseInt(screen.availHeight * 0.95, 10) + "px,width= " + parseInt(screen.availWidth) + "px,resizable=1,scrollbars=1,status=yes");
    return;
}

function open_windowShowBox(url) {
    window.open(url, 'winshowBox', 'top=0,left=0,height=540,width=790,resizable=1,scrollbars=1,status=yes');
    window.location.href = window.location.href;
    return;
}
function open_windowSmall(url) {
    window.open(url, "windowSmall", "top=0,left=0,height=440,width= 540,resizable=1,scrollbars=1,status=yes");
    return;
}
function open_windowShowModalBox(sFileName, sTitle) {
    sFileName = escape(sFileName);
    window.showModalDialog("../Modules/IFrameBridge.aspx?Title=" + sTitle + "&url=" + sFileName, window, "dialogHeight:" + parseInt(screen.availHeight * 0.95, 10) + "px;dialogWidth:" + screen.availWidth + "px; dialogTop: 20px; dialogLeft: 20px; edge: raised; center: Yes; help: No; resizable: No; status: No; unadorned:Yes;");
    window.location.href = window.location.href;
    //window.open(sFileName);
}

function open_windowYj(url) {
    window.open(url, 'winshowTwo', 'top=0,left=0,height=540,width=790,resizable=1,scrollbars=0');
    return;
}
function open_windowShowTwo(url) {
    window.open(url, 'winshowTwo', 'top=0,left=0,height=540,width=790,resizable=1,scrollbars=0');
    return;
}
function open_windowAdd(url) {
    window.open(url, 'addressadd', 'top=0,left=0,width=690,height=540');
    return;
}
function isInteger(str) {

    var flag;
    var c;
    var i;
    var icount;

    flag = true;
    if (str == null || str == "") {
        return flag;
    }
    c = str.substr(0, 1);
    if (!((c == "+") || (c == "-") || ((c >= "0") && (c <= "9")))) {
        flag = false;
        return flag;
    }
    if ((str == "+") || (str == "-")) {
        flag = false;
        return flag;
    }
    for (i = 1; i < str.length; i++) {
        c = str.substr(i, 1);
        if (!(((c >= "0") && (c <= "9")))) {
            flag = false;
            return flag;
        }
    }
    return flag;
}

function isNumber(str) {
    var flag;
    var c;
    var i;
    var icount;

    flag = true;
    if (str == null || str == "") {
        return flag;
    }

    c = str.substr(0, 1);
    if (!((c == "+") || (c == "-") || ((c >= "0") && (c <= "9")))) {
        flag = false;
        return flag;
    }

    for (i = 1; i < str.length; i++) {
        c = str.substr(i, 1);
        if (!(((c >= "0") && (c <= "9")) || (c == "."))) {
            flag = false;
            return flag;
        }
    }

    icount = 0;
    for (i = 0; i < str.length; i++) {
        c = str.substr(i, 1);
        if (c == ".") {
            icount = icount + 1;
        }
    }
    if (icount > 1) {
        flag = false;
    }

    return flag;

}

function strunit_J(strSource, intUnit, charDivide) { //? strSource 所属组,及其选项
    var intStart, intEnd, i;   //start  end  i
    var intCount, intLen;    //count  length
    var strTemp;                  //temp variable

    if (null == strSource || 0 == strSource.length) {
        return ("");
    }

    intLen = strSource.length;   //5 
    intStart = 0;
    intCount = 0;

    for (i = 0; i < intLen; i++) {
        strTemp = strSource.substr(i, 1)//? get group's the i string 	

        if (strTemp == charDivide) {
            intCount = parseInt(intCount) + 1; //intCount++
            if (intCount == intUnit) { //
                intEnd = i;
                break;
            }
            else {
                intStart = parseInt(i) + 1;
            }
        }
    }

    if (0 == intEnd) {
        strTemp = "";
    }
    else {
        strTemp = strSource.substr(intStart, intEnd - intStart);
    }

    return (strTemp);
}

function trimNum(strValue) {
    var i, iLen;
    var strTemp;
    var blnFlag;

    if ((null == strValue) || ("" == strValue)) {
        return (0);
    }

    blnFlag = true;
    iLen = strValue.length;
    for (i = iLen; i > 0; i--) {
        strTemp = strValue.substr(i - 1, 1);
        if ("." == strTemp) {
            blnFlag = false;
            break;
        }
    }

    if (blnFlag == true) {
        return (strValue);
    }

    if (i == iLen) {
        return (strValue);
    }

    iLen = i;
    for (i = strValue.length; i >= iLen; i--) {
        strTemp = strValue.substr(i - 1, 1);
        if (0 != strTemp) {
            if ("." == strTemp)
                strTemp = strValue.substr(0, i - 1);
            else
                strTemp = strValue.substr(0, i);
            break;
        }

    }

    return (strTemp);
}

function formatNum(strValue, intCount) {

    if (0 == intCount) {
        return (strValue);
    }

    var i;
    var strTemp;
    var j = 0;
    strTemp = "1";
    for (i = 1; i <= intCount; i++) {
        strTemp = strTemp + "0";
    }
    if (strValue == "" || null == strValue) {
        strValue = "0";
    }
    strValue = Math.round(strValue * strTemp);
    strValue = strValue / strTemp;
    strTemp = new String(strValue);
    for (i = 0; i < strTemp.length; i++) {
        if (strTemp.substr(i, 1) == ".")
        { j = i; }
    }
    i = i - j;
    if (i == strTemp.length) {
        strTemp = strTemp + ".";
        for (j = 0; j < intCount; j++) {
            strTemp = strTemp + "0";
        }
    }
    else {
        if (intCount - i < intCount) {
            for (j = 0; j < intCount - i + 1; j++) {
                strTemp = strTemp + "0";
            }
        }
    }
    return (strTemp);
}

function validDate(strValue) {
    if ((null == strValue) || ("" == strValue)) {
        return (true);
    }

    if ((parseInt(strValue.substring(0, 4)) < 1900) || (parseInt(strValue.substring(0, 4)) > 2100)) {
        return (false);
    }

    var intLen, i, strTemp;
    intLen = strValue.length;
    strTemp = strValue.substring(5, intLen) + "-" + strValue.substring(0, 4);
    var objDate = new Date(strTemp);
    for (i = 5; i < intLen; i++) {
        if (strValue.substr(i, 1) == "-")
            break;
    }

    if ((i - 5 > 2) || (intLen - i > 3)) {
        return (false);
    }

    if (parseInt(strValue.substring(5, i), 10) != objDate.getMonth() + 1) {
        return (false);
    }

    return (true);

}


function GetLastWeek() {

    var str_time;

    var time_now;

    var date_now = new Date();

    time_now = date_now.getTime();

    var week_now;

    week_now = date_now.getDay();

    var last_week_end;
    var last_week_start;
    last_week_end = week_now;
    last_week_start = last_week_end + 6;
    var last_time_start;
    var last_time_end;

    last_time_start = time_now - 1000 * 60 * 60 * 24 * last_week_start;
    last_time_end = time_now - 1000 * 60 * 60 * 24 * last_week_end;

    da_start = new Date(last_time_start);
    da_end = new Date(last_time_end);

    var start = "";
    var end = "";

    var d = da_start.getDate();
    var m = da_start.getMonth() + 1;
    var d1 = da_end.getDate();
    var m1 = da_end.getMonth() + 1;
    if (String(d).length == 1) d = "0" + d;
    if (String(d1).length == 1) d1 = "0" + d1;
    if (String(m).length == 1) m = "0" + m;
    if (String(m1).length == 1) m1 = "0" + m1;

    start = da_start.getYear() + "-" + m + "-" + d;
    end = da_end.getYear() + "-" + m1 + "-" + d1;
    str_time = start + "$" + end + "$";

    return (str_time);
}

function GetLastMonth() {

    var str_time;
    var date_now = new Date();
    var time_now = date_now.getTime();
    var today = date_now.getDate();
    var year = date_now.getYear();
    var month = date_now.getMonth() + 1;

    var start;
    var end;
    var last_time_end;
    var d1;
    var m;
    var m1;
    if (month != 1) {
        last_time_end = time_now - 1000 * 60 * 60 * 24 * (today);
        var da_start = new Date(last_time_end);
        m = da_start.getMonth() + 1;
        m1 = da_start.getMonth() + 1;
        d1 = da_start.getDate();
        if (String(m).length == 1) m = "0" + m;
        if (String(m1).length == 1) m1 = "0" + m1;
        if (String(d1).length == 1) d1 = "0" + d1;
        start = da_start.getYear() + "-" + m + "-01";
        end = da_start.getYear() + "-" + m1 + "-" + d1;
        str_time = start + "$" + end + "$";

        return (str_time);
    }
    else {
        start = (year - 1) + "-12-1";
        end = (year - 1) + "-12-31";
        str_time = start + "$" + end + "$";

        return (str_time);

    }
}

function GetThisWeek() {

    var str_time;

    var time_now;
    var date_now = new Date();
    var day = date_now.getDate();
    var month = date_now.getMonth() + 1;
    time_now = date_now.getTime();
    var today = date_now.getDay();

    var d;
    var d1;
    var m;
    var m1;
    var start;
    var end;
    var da_end = new Date(time_now + 1000 * 24 * 3600 * (7 - today));
    var da_start = new Date(time_now - 1000 * 24 * 60 * 60 * (today - 1));

    if ((month == 1) && (today > day)) {

        d = 32 - today + day;
        if (String(d).length == 1) d = "0" + d;
        start = (da_end.getYear() - 1) + "-12-" + d;

        m1 = da_end.getMonth() + 1;
        d1 = da_end.getDate();
        if (String(m1).length == 1) m1 = "0" + m1;
        if (String(d1).length == 1) d1 = "0" + d1;
        end = da_end.getYear() + "-" + m1 + "-" + d1;
        str_time = start + "$" + end + "$";

        return (str_time);
    }
    else {
        m = da_start.getMonth() + 1;
        d = da_start.getDate();
        if (String(d).length == 1) d = "0" + d;
        if (String(m).length == 1) m = "0" + m;
        m1 = da_end.getMonth() + 1;
        d1 = da_end.getDate();
        if (String(m1).length == 1) m1 = "0" + m1;
        if (String(d1).length == 1) d1 = "0" + d1;
        start = da_start.getYear() + "-" + m + "-" + d;
        end = da_end.getYear() + "-" + m1 + "-" + d1;
        str_time = start + "$" + end + "$";

        return (str_time);
    }
}

function GetThisMonth() {

    var str_time;

    var time_now;
    var date_now = new Date();
    var day = date_now.getDate();
    var month = date_now.getMonth() + 1;
    time_now = date_now.getTime();
    var year = date_now.getYear();
    var start;
    var end;
    time_now = time_now - 1000 * 24 * 3600 * (day - 32);
    var da_temp = new Date(time_now);
    time_now = time_now - 1000 * 24 * 3600 * da_temp.getDate();
    var da_temp1 = new Date(time_now);
    var d = da_temp1.getDate();

    if (String(month).length == 1)
        month = "0" + month;
    if (String(d).length == 1)
        d = "0" + d;

    var end = year + "-" + month + "-" + d;
    var start = year + "-" + month + "-01";

    str_time = start + "$" + end + "$";
    return (str_time);
}

function getCurrentDate() {
    var today = new Date();
    var y, m, d;
    y = today.getYear();
    m = today.getMonth() + 1;
    if (String(m).length == 1)
        m = "0" + m;
    d = today.getDate();
    if (String(d).length == 1)
        d = "0" + d;
    var strDate;
    strDate = y + "-" + m + "-" + d;
    return (strDate);
}

//求某天是星期几
function GetDateWeek(sDate) {
    var sTmp = "";
    var presentday = 0;

    if (sDate == null) {
        sDate = "";
    }
    if (sDate.length != 10) {
        return null;      //日期非法
    }

    var presentyear = parseInt(sDate.substring(0, 4));
    var presentmonth = parseInt(sDate.substring(5, 7));
    var presentdate = parseInt(sDate.substring(8, 10));


    present = new Date(presentyear, presentmonth, presentdate);
    presentday = present.getDay();

    return (presentday);

}

//格式华日期
function fn_FormatDate(sValue) {
    var sYear = "";
    var sMonth = "";
    var sDay = "";
    var iTmp = 0;
    var sTmp = "";
    var iCol = 0;

    for (iTmp = 0; iTmp < sValue.length; iTmp++) {
        if (sValue.substring(iTmp, iTmp + 1) == '-') break;
        sTmp = sTmp + sValue.substring(iTmp, iTmp + 1);
    }
    sYear = sTmp; iCol = iTmp + 1; sTmp = "";

    for (iTmp = iCol; iTmp < sValue.length; iTmp++) {
        if (sValue.substring(iTmp, iTmp + 1) == '-') break;
        sTmp = sTmp + sValue.substring(iTmp, iTmp + 1);
    }
    sMonth = sTmp; iCol = iTmp + 1; sTmp = "";

    for (iTmp = iCol; iTmp < sValue.length; iTmp++) {
        if (sValue.substring(iTmp, iTmp + 1) == '-') break;
        sTmp = sTmp + sValue.substring(iTmp, iTmp + 1);
    }
    sDay = sTmp; iCol = iTmp; sTmp = "";

    sYear = fn_FormatString(sYear, '0000');
    sMonth = fn_FormatString(sMonth, '00');
    sDay = fn_FormatString(sDay, '00');
    return sYear + '-' + sMonth + '-' + sDay;


}
//格式化字符串
function fn_FormatString(sValue, sFormatString) {
    var iTmp = 0;
    var sTmp = "";

    if (sValue.length >= sFormatString.length) return sValue;

    sTmp = sFormatString.substring(0, sFormatString.length - sValue.length);

    return sTmp + sValue;

}

//替换字符
function fn_ReplaceString(sSource, sFrom, sTo) {
    var iTmp = 0;
    var sLeft = "";
    var sRight = "";


    while (true) {
        iTmp = sSource.indexOf(sFrom, iTmp);
        if (iTmp < 0) break;
        if (sFrom == "\n")
            sLeft = sSource.substring(0, iTmp - 1);
        else
            sLeft = sSource.substring(0, iTmp);
        sRight = sSource.substring(iTmp + sFrom.length, sSource.length);
        if (sRight == null) sRight = "";
        sSource = sLeft + sTo + sRight;
    }
    return sSource;
}



//提取文件名
function fn_sLoadFileName(sFileName) {

    var iTmp = 0;

    if (sFileName == null) {
        return null;
    }
    if (sFileName.length == 0) {
        return sFileName;
    }
    for (iTmp = sFileName.length - 1; iTmp >= 0; iTmp--) {
        if (sFileName.substring(iTmp, iTmp + 1) == "\\")
            break;
    }

    return sFileName.substring(iTmp + 1, sFileName.length);
}

//提取文件名
function fn_sLoadURLPath(sFileName) {

    var iTmp = 0;

    if (sFileName == null) {
        return null;
    }
    if (sFileName.length == 0) {
        return sFileName;
    }
    for (iTmp = sFileName.length - 1; iTmp >= 0; iTmp--) {
        if (sFileName.substring(iTmp, iTmp + 1) == "/")
            break;
    }

    return sFileName.substring(0, iTmp + 1);
}

//提取文件名
function fn_sLoadLeftURLPath(sFileName) {


    var iTmp = 0;

    if (sFileName == null) {
        return null;
    }
    if (sFileName.length == 0) {
        return sFileName;
    }
    var iRow = 0;
    for (iTmp = 0; iTmp < sFileName.length; iTmp++) {
        if (sFileName.substring(iTmp, iTmp + 1) == "/") iRow++;

        if (iRow == 3) break;
    }

    return sFileName.substring(0, iTmp + 1);
}

//去处两边的空格
function trim(sString) {
    var iLeft = 0;
    var iRight = 0;
    var sTmp = "";

    if (sString == null) {
        return sString;
    }

    for (iLeft = 0; iLeft < sString.length - 1; iLeft++) {
        if (sString.substring(iLeft, iLeft + 1) != " ") {
            break;
        } 
    }

    for (iRight = sString.length; iRight > 0; iRight--) {
        if (sString.substring(iRight - 1, iRight) != " ") {
            break;
        } 
    }

    if (iLeft > iRight)
        sTmp = "";
    else
        sTmp = sString.substring(iLeft, iRight);

    return sTmp;
}

//去处两边的逗号
function trimstr(sString) {
    var iLeft = 0;
    var iRight = 0;
    var sTmp = "";

    if (sString == null) {
        return sString;
    }

    for (iLeft = 0; iLeft < sString.length - 1; iLeft++) {
        if (sString.substring(iLeft, iLeft + 1) != ",") {
            break;
        }
    }

    for (iRight = sString.length; iRight > 0; iRight--) {
        if (sString.substring(iRight - 1, iRight) != ",") {
            break;
        }
    }

    if (iLeft > iRight)
        sTmp = "";
    else
        sTmp = sString.substring(iLeft, iRight);

    return sTmp;
}
function fn_FormatDate(sCurDate) {
    var sOnYear = "";
    var sOnMonth = "";
    var sOnDay = "";


    if (sCurDate != "" && sCurDate != " ") {
        var timestr = sCurDate.split("-")
        sOnYear = timestr[0]
        sOnMonth = timestr[1]
        sOnDay = timestr[2]
        if ((parseInt(sOnMonth) < 10) && sOnMonth.length == 1) sOnMonth = "0" + sOnMonth;
        if ((parseInt(sOnDay) < 10) && sOnDay.length == 1) sOnDay = "0" + sOnDay;
    }
    else
        return sCurDate;

    return sOnYear + "-" + sOnMonth + "-" + sOnDay;
}
//分割DBGRID的数据	,通常传入的数据格式"22;33;$aa;353a;$" ,";"代表行分割符，"$"
//代表列分割符，该函数就是将一行字符串分解到一个数组中，供外部代码访问。
function fn_PartitionData(sGridData, sRowSign, sColSign) {
    var iCol = 0;
    var iRow = 0;
    var iTmp;
    var iGridMaxCol = 0;
    var iGridMaxRow = 0;

    var sLine = "";
    var sTmp = "";
    sPartitionData = new Array();

    if (sGridData == "") return sPartitionData;

    iRow = 0;
    iCol = 0;
    iTmp = 0;
    for (; ; )    //求出行数
    {
        iTmp = sGridData.indexOf(sRowSign, iTmp + 1);
        if (iTmp < 0) break;
        iRow++;
    }

    sTmp = strunit_J(sGridData, 1, sRowSign);
    iTmp = 0;
    for (; ; )    //求出列数
    {
        iTmp = sTmp.indexOf(sColSign, iTmp + 1);
        if (iTmp < 0) break;
        iCol++;
    }


    iGridMaxCol = iCol;
    iGridMaxRow = iRow;
    if ((iCol < 1) || (iRow < 1)) return null;   //没有一行或一列


    for (iRow = 0; iRow < iGridMaxRow; iRow++) {
        sPartitionData[iRow] = new Array();
        sLine = strunit_J(sGridData, iRow + 1, sRowSign);
        for (iCol = 0; iCol < iGridMaxCol; iCol++) {
            sTmp = strunit_J(sLine, iCol + 1, sColSign);      //将分解的数据放入对应的项                                 
            sPartitionData[iRow][iCol] = sTmp;
        }
    }

    return sPartitionData;
}

function lxh_mydelete() {
    if (confirm('是否要删除？')) {
        document.forms[0].isbc_flag.value = "del";
        document.forms[0].submit();
    }
    else {
        return;
    }
}

function open_code(str_name, str_userid, objclass, count) {
    //var url="../modules/select_more_window.aspx?name=xf."+str_name+".value&user_id=xf."+str_userid+".value&objclass="+objclass+"&count="+count; 
    //		      var url=" ../Modules/IFrameBridge.aspx?Title=关联文件查看&Url=..%2Fmodules%2Fselect_more_window.aspx%3Fname%3D"+str_name+"%26user_id%3D"+str_userid+"%26objclass%3D"+objclass+"%26count%3D"+count;
    var url = "../SelWindow/SelWin.aspx?name=" + str_name + "&user_id=" + str_userid + "&objclass=" + objclass + "&count=" + count + "&Title=关联文件查看&Parms=" + objclass + ",1,1,1";
    //		      window.showModalDialog(url,window,'dialogTop:0px;dialogLeft:0px;dialogWidth:520px;dialogHeight:400px;scroll:1;status:0;help:0');
    window.open(url, 'win', 'width=535,height=400,resizable=no,scrollbars=no,status=yes,toolbar=no,menubar=no,location=no');
    //window.open(url,'win3','top=0,left=0,height=600,width=700,resizable=1,scrollbars=1')
    //showModalDialog
}

function close_code(str_name, str_value, str_id, str_id_value) {
    var array;
    if (str_value.indexOf("!") != -1) {
        array = str_value.split("!");
        str_value = "";
        for (i = 0; i < array.length; i++) {
            str_value = str_value + array[i] + ",";
        }
        str_value = str_value.substring(0, str_value.length - 1);
    }
    else {
        array = str_value;
    }
    if (str_value.indexOf("!") != -1) {
        array = str_id_value.split("!");
        str_value = "";
        for (i = 0; i < array.length; i++) {
            str_id_value = str_id_value + array[i] + ",";
        }
        str_id_value = str_id_value.substring(0, str_id_value.length - 1);
    }
    else {
        array = str_value;
    }
    try {
        var str = "document." + str_name + "='" + str_value + "'";
        eval(str);
        str = "document." + str_id + "='" + str_id_value + "'";
        eval(str);
    }
    catch (e) {

    }
}

//ResultFlag =0;不返回任何信息
//ResultFlag =1;返回选中的信息。
function open_MeetingPlace(MeetingPlaceName, Info_ID) {
    var url = escape("../Meeting/MeetingPlaceSelect.aspx?MeetingPlaceName=" + MeetingPlaceName + "&info_id=" + Info_ID);
    window.showModalDialog("../Modules/IFrameBridge.aspx?Title=会场选择&url=" + url, window, "dialogHeight:" + parseInt(screen.availHeight * 0.95, 10) + "px;dialogWidth:" + screen.availWidth + "px; dialogTop: 20px; dialogLeft: 20px; edge: raised; center: Yes; help: No; resizable: No; status: No; unadorned:Yes;");
}

function close_MeetingPlace(MeetingPlaceName, MeetingPlaceNameValue) {
    var str = MeetingPlaceName + "='" + MeetingPlaceNameValue + "'";
    eval(str);
}
function getRootPath() {
    var curWwwPath = window.document.location.href;
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);    //获取主机地址，如： http://localhost:8083 
    var localhostPaht = curWwwPath.substring(0, pos);    //获取带"/"的项目名，如：/uimcardprj   
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return (localhostPaht + projectName);
}
function ajaxHandler(className, functionName, data, successFunc, errorFunc) {
    var path = getRootPath();
    var Para = "?className=" + className + "&functionName=" + functionName + "&ran=" + new Date().getUTCMilliseconds();
    $.ajax({
        type: "GET",
        url: path + "/Handler/HandlerAll.ashx" + Para,
        data: data,
        success: function (datd) {
            successFunc(datd);
        },
        error: function () {
            if (arguments.length == 5) {
                errorFunc();
            }
        }
    });
}
function ajaxPostHandler(className, functionName, data, successFunc, errorFunc) {
    var path = getRootPath();
    var Para = "?className=" + className + "&functionName=" + functionName + "&ran=" + new Date().getUTCMilliseconds();
    $.ajax({
        type: "POST",
        url: path + "/Handler/HandlerAll.ashx" + Para,
        data: data,
        success: function (datd) {
            successFunc(datd);
        },
        error: function () {
            if (arguments.length == 5) {
                errorFunc();
            }
        }
    });
}
function ajaxPostHandlersync(className, functionName, data, successFunc, errorFunc) {
    var path = getRootPath();
    var Para = "?className=" + className + "&functionName=" + functionName + "&ran=" + new Date().getUTCMilliseconds();
    $.ajax({
        type: "POST",
        async: false,
        url: path + "/Handler/HandlerAll.ashx" + Para,
        data: data,
        success: function (datd) {
            successFunc(datd);
        },
        error: function () {
            if (arguments.length == 5) {
                errorFunc();
            }
        }
    });
}
function ajaxHandlerasync(className, functionName, data, successFunc, errorFunc) {
    var path = getRootPath();
    var Para = "?className=" + className + "&functionName=" + functionName + "&ran=" + new Date().getUTCMilliseconds();
    $.ajax({
        type: "GET",
        async: false,
        url: path + "/Handler/HandlerAll.ashx" + Para,
        data: data,
        success: function (datd) {
            successFunc(datd);
        },
        error: function () {
            if (arguments.length == 5) {
                errorFunc();
            }
        }
    });
}
//MD5加密
/* MD5 Message-Digest Algorithm - JavaScript
' MODIFICATION HISTORY:
' 1.0 16-Feb-2001 - Phil Fresle (sales@frez.co.uk) - Initial Version (VB/ASP code)
' 1.0 21-Feb-2001 - Enrico Mosanghini (erik504@yahoo.com) - JavaScript porting
*/
function MD5(sMessage) {
    function RotateLeft(lValue, iShiftBits) { return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits)); }

    function AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);

        if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        if (lX4 | lY4) {
            if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
        } else return (lResult ^ lX8 ^ lY8);
    }

    function F(x, y, z) { return (x & y) | ((~x) & z); }

    function G(x, y, z) { return (x & z) | (y & (~z)); }

    function H(x, y, z) { return (x ^ y ^ z); }

    function I(x, y, z) { return (y ^ (x | (~z))); }

    function FF(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));

        return AddUnsigned(RotateLeft(a, s), b);
    }

    function GG(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));

        return AddUnsigned(RotateLeft(a, s), b);
    }

    function HH(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));

        return AddUnsigned(RotateLeft(a, s), b);
    }

    function II(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));

        return AddUnsigned(RotateLeft(a, s), b);
    }

    function ConvertToWordArray(sMessage) {
        var lWordCount;
        var lMessageLength = sMessage.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;

        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (sMessage.charCodeAt(lByteCount) << lBytePosition));

            lByteCount++;
        }

        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    }

    function WordToHex(lValue) {
        var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;

        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }

        return WordToHexValue;
    }

    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d
    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;

    // Steps 1 and 2. Append padding bits and length and convert to words
    x = ConvertToWordArray(sMessage);

    // Step 3. Initialise
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

    // Step 4. Process the message in 16-word blocks
    for (k = 0; k < x.length; k += 16) {
        AA = a; BB = b; CC = c; DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = AddUnsigned(a, AA); b = AddUnsigned(b, BB); c = AddUnsigned(c, CC); d = AddUnsigned(d, DD);
    }

    // Step 5. Output the 128 bit digest
    var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
    return temp.toLowerCase();
}



/* 
* base64编码 
*/
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}
function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        /* c1 */
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c1 == -1);
        if (c1 == -1)
            break;
        /* c2 */
        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c2 == -1);
        if (c2 == -1)
            break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
        /* c3 */
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)
                return out;
            c3 = base64DecodeChars[c3];
        } while (i < len && c3 == -1);
        if (c3 == -1)
            break;
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
        /* c4 */
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61)
                return out;
            c4 = base64DecodeChars[c4];
        } while (i < len && c4 == -1);
        if (c4 == -1)
            break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}
function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}
function utf8to16(str) {
    var out, i, len, c;
    var char2, char3;
    out = "";
    len = str.length;
    i = 0;
    while (i < len) {
        c = str.charCodeAt(i++);
        switch (c >> 4) {
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                // 0xxxxxxx 
                out += str.charAt(i - 1);
                break;
            case 12: case 13:
                // 110x xxxx　 10xx xxxx 
                char2 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                // 1110 xxxx　10xx xxxx　10xx xxxx 
                char2 = str.charCodeAt(i++);
                char3 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
                break;
        }
    }
    return out;
}
/* 
* base64编码 End 
*/


function ConvertTime(second) {
    var times = "";
    var hh = 0;
    var mm = 0;
    var ss = 0;
    if (second <= 0)
        return "00:00:00";
    var seconds = parseInt(second);
    if (seconds <= 0) {
        return "00:00";
    }
    hh = seconds / 3600 | 0;
    seconds = seconds - hh * 3600;
    if (hh < 10) {
        times = "0" + hh;
    }
    else {
        times = hh;
    }
    mm = seconds / 60 | 0;
    ss = seconds - mm * 60;
    if (mm < 10) {
        times += ":0" + mm;
    }
    else {
        times += ":" + mm;
    }
    if (ss < 10) {
        times += ":0" + ss;
    }
    else {
        times += ":" + ss;
    }
    return times;
}

//写cookies函数 
function setCookie(name, value)//两个参数，一个是cookie的名子，一个是值
{
    var Days = 6000; //此 cookie 将被保存 6000 天
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

//读取cookies函数
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]); return null;

}
//读取浏览器版本
function appInfo() {
    var browser = {
        msie: false, firefox: false, opera: false, safari: false,
        chrome: false, netscape: false, appname: 'unknown', version: 0
    },
                 userAgent = window.navigator.userAgent.toLowerCase();
    if (/(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test(userAgent)) {
        browser[RegExp.$1] = true;
        browser.appname = RegExp.$1;
        browser.version = RegExp.$2;
    }
    else if (/version\D+(\d[\d.]*).*chrome/.test(userAgent)) { // safari
        browser.chrome = true;
        browser.appname = 'CHROME';
        browser.version = RegExp.$2;
    }
    else if (/version\D+(\d[\d.]*).*safari/.test(userAgent)) { // safari
        browser.safari = true;
        browser.appname = 'SAFARI';
        browser.version = RegExp.$2;
    }
    //alert(userAgent)
    if (browser.appname == "msie")
        browser.appname = "IE";

    var device = "PC";
    if (userAgent.indexOf("ipad") != -1)
        device = "IPAD";
    else if (userAgent.indexOf("iphone") != -1)
        device = "IPHONE";
    else if (userAgent.indexOf("android") != -1)
        device = "ANDROID";
    $("#browser").val(browser.appname.toUpperCase() + "_" + browser.version + "_" + device);
    //alert($("#browser").val());

    return browser;
}

//人民币金额转大写程序 JavaScript版   
 function toChianes(num) {   
 var strOutput = "";   
 var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';   
 num += "00";   
  var intPos = num.indexOf('.');   
  if (intPos >= 0)   
    num = num.substring(0, intPos) + num.substr(intPos + 1, 2);   
  strUnit = strUnit.substr(strUnit.length - num.length);   
  for (var i=0; i < num.length; i++)   
    strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i,1),1) + strUnit.substr(i,1);   
    return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元");   
};  
/*将计算的值四舍五入*/
function changeTwoDecimal_f(x) {
    var f_x = parseFloat(x);
    if (isNaN(f_x)) {
        return 0.0;
    }
    var f_x = Math.round(x * 100) / 100;
    var s_x = f_x.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
    }
    return parseFloat(s_x);
}
/********************GUID*************************/
function Guid(g) {
    var arr = new Array(); //存放32位数值的数组

    if (typeof (g) == "string") { //如果构造函数的参数为字符串
        InitByString(arr, g);
    }
    else {
        InitByOther(arr);
    }
    //返回一个值，该值指示 Guid 的两个实例是否表示同一个值。
    this.Equals = function (o) {
        if (o && o.IsGuid) {
            return this.ToString() == o.ToString();
        }
        else {
            return false;
        }
    }
    //Guid对象的标记
    this.IsGuid = function () { }
    //返回 Guid 类的此实例值的 String 表示形式。
    this.ToString = function (format) {
        if (typeof (format) == "string") {
            if (format == "N" || format == "D" || format == "B" || format == "P") {
                return ToStringWithFormat(arr, format);
            }
            else {
                return ToStringWithFormat(arr, "D");
            }
        }
        else {
            return ToStringWithFormat(arr, "D");
        }
    }
    //由字符串加载
    function InitByString(arr, g) {
        g = g.replace(/\{|\(|\)|\}|-/g, "");
        g = g.toLowerCase();
        if (g.length != 32 || g.search(/[^0-9,a-f]/i) != -1) {
            InitByOther(arr);
        }
        else {
            for (var i = 0; i < g.length; i++) {
                arr.push(g[i]);
            }
        }
    }
    //由其他类型加载
    function InitByOther(arr) {
        var i = 32;
        while (i--) {
            arr.push("0");
        }
    }
    /*
    根据所提供的格式说明符，返回此 Guid 实例值的 String 表示形式。
    N  32 位： xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    D  由连字符分隔的 32 位数字 xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx 
    B  括在大括号中、由连字符分隔的 32 位数字：{xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx} 
    P  括在圆括号中、由连字符分隔的 32 位数字：(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx) 
    */
    function ToStringWithFormat(arr, format) {
        switch (format) {
            case "N":
                return arr.toString().replace(/,/g, "");
            case "D":
                var str = arr.slice(0, 8) + "-" + arr.slice(8, 12) + "-" + arr.slice(12, 16) + "-" + arr.slice(16, 20) + "-" + arr.slice(20, 32);
                str = str.replace(/,/g, "");
                return str;
            case "B":
                var str = ToStringWithFormat(arr, "D");
                str = "{" + str + "}";
                return str;
            case "P":
                var str = ToStringWithFormat(arr, "D");
                str = "(" + str + ")";
                return str;
            default:
                return new Guid();
        }
    }
}
//Guid 类的默认实例，其值保证均为零。
Guid.Empty = new Guid();
//初始化 Guid 类的一个新实例。
Guid.NewGuid = function () {
    var g = "";
    var i = 32;
    while (i--) {
        g += Math.floor(Math.random() * 16.0).toString(16);
    }
    return new Guid(g);
}
/*********************GUID结束****************************/