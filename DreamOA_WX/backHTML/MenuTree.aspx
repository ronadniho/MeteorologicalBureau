﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MenuTree.aspx.cs" Inherits="CollegeAPP.backHTML.MenuTree" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <script src="../Script/ztree/js/jquery-1.4.4.min.js"></script>
    <link href="../Script/ztree/css/zTreeStyle/zTreeStyle.css" rel="stylesheet" type="text/css" />
    <link href="../Script/ztree/css/demo.css" rel="stylesheet" type="text/css" />
    <script src="../Script/ztree/js/jquery.ztree.core-3.5.js" type="text/javascript"></script>
    <script src="../Script/ztree/js/jquery.ztree.excheck-3.5.js" type="text/javascript"></script>

    <script type="text/javascript">
        $(document).ready(function () {
            var setting = {

                data: {
                    simpleData: {
                        enable: true,
                        idKey: "id",
                        pIdKey: "pId",
                        rootPId: 0
                    }
                },
                view: {
                    showLine: true
                },               //是否显示节点间的连线  
                callback: {
                    onClick: onClick
                }
            };
            var zTree;
            var treeNodes;
            $("#id").val("");
            $("#fid").val("0");
            var treeNodes = eval("[" + $("#treeAllJson").val() + "]");
            zTree = $.fn.zTree.init($("#TreeDemo"), setting, treeNodes);
            //新增
            $("#CreatNew").click(function () {
                if ($("#id").val()!="") {
                    $("#title").val("");
                    $("#url").val("");
                    $("#order").val(""); $("#txtContent").val("");
                    $("#isNew").val("1");
                    $("#type option[value='0']").attr("selected", true);

                }
            });
            //删除
            $("#DelNode").click(function () {
                if ($("#id").val() != "") {
                    var id = $("#id").val();
                    $.ajax({
                        type: "post",
                        url: "backHtmlHelp.ashx",
                        data: { id: id, func: "delNode" },
                        success: function (data) {
                            if (data ==1) {
                                var treeObj = $.fn.zTree.getZTreeObj("TreeDemo");
                                var nodes = treeObj.getSelectedNodes();
                                for (var i = 0, l = nodes.length; i < l; i++) {
                                    treeObj.removeNode(nodes[i]);
                                }
                                alert("删除成功");
                            }
                        }
                    });
                }
            });
            //更新
            $("#update").click(function () {
                var id = $("#id").val();
                var _title = $("#title").val();
                var _url = $("#url").val();
                var _order = $("#order").val();
                var _content = $("#txtContent").val();
                var _type = $("#type ").val();
                if ($("#id").val() != "" && $("#isNew").val() != "1") {
                    $.ajax({
                        type: "post",
                        url: "backHtmlHelp.ashx",
                        data: { id: id, func: "update", title: _title, order: _order, type: _type, url: escape(_url),content:_content },
                        success: function (data) {
                            if (data == 1) {
                                var treeObj = $.fn.zTree.getZTreeObj("TreeDemo");
                                var nodes = treeObj.getSelectedNodes();
                                if (nodes.length > 0) {
                                    nodes[0].name = _title;
                                    treeObj.updateNode(nodes[0]);
                                }
                                alert("更新成功");
                            }
                        }
                    });
                }
                else {
                    var fid = $("#id").val();
                    if (fid == null || fid == "") fid = "0";
                    var treeObj = $.fn.zTree.getZTreeObj("TreeDemo");
                    var nodes = treeObj.getSelectedNodes();
                    var name = "根目录";
                    if (nodes.length > 0) {
                        name = nodes[0].name;
                    }
                    if (confirm("是否在"+name+"节点下新增？")) {
                        $.ajax({
                            type: "post",
                            url: "backHtmlHelp.ashx",
                            data: { fid: fid, func: "saveNew", title: _title, order: _order, type: _type, url: escape(_url), content: _content },
                            success: function (data) {
                                if (data =="1") {
                                    alert("保存成功");
                                    window.location.href = window.location.href;
                                }
                            }
                        });
                    }
                }
            });
            $("#gotoContent").click(function () {
                window.location.href = "MenuTreeUpdate.aspx";
            });
            var keypoint = $("#keyPoint").val();
            if (keypoint != "" || keypoint != null) {
                //$("#configframe").attr("src", "Config_Content.aspx?key=" + keypoint);
            };

            $("#searchBtn").click(function () {
                var keyword = $("#treeSearch").val();
                var treeObj = $.fn.zTree.getZTreeObj("TreeDemo");
                treeObj.expandAll(false);
                if (keyword != "") {
                    var nodes = treeObj.getNodesByParamFuzzy("checkname", keyword.toUpperCase(), null);
                    highlightAndExpand_ztree("TreeDemo", nodes, "")
                }
                else {
                    setLightCss("TreeDemo", "", false);
                }
            });
        });
        function highlightAndExpand_ztree(treeId, highlightNodes, flag) {
            var treeObj = $.fn.zTree.getZTreeObj(treeId);
            //<1>. 先把全部节点更新为普通样式
            var treeNodes = treeObj.transformToArray(treeObj.getNodes());
            for (var i = 0; i < treeNodes.length; i++) {
                treeNodes[i].highlight = false;
                treeObj.updateNode(treeNodes[i]);
            }
            setLightCss(treeId, "", false)
            setLightCss(treeId, highlightNodes, true)
            //            //<2>.收起树, 只展开根节点下的一级节点
            //            close_ztree(treeId);
            //<3>.把指定节点的样式更新为高亮显示，并展开
            if (highlightNodes != null) {
                for (var i = 0; i < highlightNodes.length; i++) {
                    if (flag != null && flag != "") {
                        if (highlightNodes[i].flag == flag) {
                            //高亮显示节点，并展开
                            highlightNodes[i].highlight = true;
                            treeObj.updateNode(highlightNodes[i]);
                            //高亮显示节点的父节点的父节点....直到根节点，并展示
                            var parentNode = highlightNodes[i].getParentNode();
                            treeObj.expandNode(parentNode, true, false, true);

                        }
                    } else {
                        //高亮显示节点，并展开
                        highlightNodes[i].highlight = true;
                        treeObj.updateNode(highlightNodes[i]);
                        //高亮显示节点的父节点的父节点....直到根节点，并展示
                        var parentNode = highlightNodes[i].getParentNode();
                        treeObj.expandNode(parentNode, true, false, true);
                    }
                }
            }
        }

        function setLightCss(treeId, treeNode, flag) {
            if (flag == true) {
                for (var i = 0; i < treeNode.length; i++) {
                    var name = treeId + "_" + treeNode[i].id + "_span"
                    $("#" + name).css("color", "red");
                }
            } else {
                var treeObj = $.fn.zTree.getZTreeObj(treeId);
                var nodes = treeObj.transformToArray(treeObj.getNodes());
                for (var i = 0; i < nodes.length; i++) {
                    $("#" + treeId + "_" + nodes[i].id + "_span").css("color", "");
                }
            }
        }

        function onClick(event, treeId, treeNode, clickFlag) {
            var treeObj = $.fn.zTree.getZTreeObj(treeId);
            var nodes = treeObj.getSelectedNodes();
            var id = nodes[0].id;
            $("#id").val(id);
            $("#isNew").val("0");
            var key = nodes[0].name;
            var pId = nodes[0].pId;
            $("#fid").val(pId);
                $.ajax({
                    type: "post",
                    url: "backHtmlHelp.ashx",
                    data: { id: id, func: "getNodeInfo" },
                    success: function (data) {
                        if (data != ""&&data!=null)
                        {
                            var content = eval("(" + data + ")");
                            $("#title").val(content.title);
                            $("#url").val(content.url);
                            $("#order").val(content.order);
                            $("#txtContent").val(content.jianjie);
                            $("#type option[value='"+content.type+"']").attr("selected",true);
                        }
                    }
                });
            }
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <input type="hidden" id="treeAllJson" runat="server" value="" />
    <input type="hidden" id="keyPoint" runat="server" value="" />
    <input type="hidden" id="id"  value="" />
    <input type="hidden" id="fid"  value="0" />
    <input type="hidden" id="isNew" value="0" />
    <div class="content_wrap" style="width:900px;float:left;margin:0px 0 0 10px;">
    <div style="padding:5px 0px 0px 10px;display:none;">
        <input type="text" id="treeSearch" value="" style="height:20px; width:130px;" />
     <%--   <input type="button" id="searchBtn" value="查找" style="width:60px;height:26px; margin-top:5px;" />--%>
    </div>
    <div class="zTreeDemoBackground left" style="" >

        <ul id="TreeDemo" class="ztree" style="height:580px;width:230px;border:0px;overflow-y:auto;font-size:14px;"></ul>

    </div>
    
    <div style="float:left;width:550px;padding:3px;margin-top:8px;margin-right:auto;"><input type="button" value = "新建" id="CreatNew" style="width:60px;height:26px;margin-right:12px; " /><input type="button" value = "删除" id="DelNode" style="width:60px;height:26px;margin-right:12px; " /><input type="button" value = "保存" id="update" style="width:60px;height:26px; margin-right:12px;" /></div>
    <table>
        <tr>
            <td>标题：</td>
            <td><input  id="title"style="width:300px;" /></td>
        </tr>
        <tr style="display:none">
            <td>类型:</td>
            <td>
                <select id="type">
                    <option selected="selected" value="0">新闻</option>
                    <option value="1">视频</option>
                </select>
            </td>
        </tr>
        <tr style="display:none">
            <td>URL</td>
            <td><input  id="url" style="width:400px;"/></td>
        </tr>
        <tr style="display:none">
            <td>上传图片:</td>
            <td><asp:FileUpload ID="FileUpload1" runat="server" /></td>
            
        </tr>
        <tr>
            <td>排序:</td>
            <td><input  id="order" style="width:40px;" /></td>
        </tr>
        <tr>
            <td style="vertical-align:middle">简介:</td>
            <td><textarea  id="txtContent" style="width:300px;height:120px;"></textarea></td>
        </tr>
    </table>
        </div>
    </form>
</body>
</html>
