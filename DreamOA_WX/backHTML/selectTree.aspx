<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="selectTree.aspx.cs" Inherits="CollegeAPP.backHTML.selectTree" %>

<!DOCTYPE html>

<html >
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title> 
    <script src="../Script/ztree/js/jquery-1.4.4.min.js"></script>
    <link href="../Script/ztree/css/zTreeStyle/zTreeStyle.css" rel="stylesheet" type="text/css" />
    <link href="../Script/ztree/css/demo.css" rel="stylesheet" type="text/css" />
    <script src="../Script/ztree/js/jquery.ztree.core-3.5.js" type="text/javascript"></script>
    <script src="../Script/ztree/js/jquery.ztree.excheck-3.5.js" type="text/javascript"></script>
    <link href="../bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" />
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
                },
                //是否显示节点间的连线  
                callback: {
                    onClick: onClick
                }
            };
            var zTree;
            var treeNodes;
            var treeNodes = eval("[" + $("#treeAllJson").val() + "]");
            zTree = $.fn.zTree.init($("#TreeDemo"), setting, treeNodes);
            
        });

        function onClick(event, treeId, treeNode, clickFlag)
        {
            var treeObj = $.fn.zTree.getZTreeObj(treeId);
            var nodes = treeObj.getSelectedNodes();
            var id = nodes[0].id;            
            if(confirm("是否将所选信息调整到'"+nodes[0].name+"'类别下？"))
            {
                $.ajax({
                    type: "post",
                    url: "backHtmlHelp.ashx",
                    data: { id: $("#passinfo").val(), menuid: id, func: "changeIndex" },
                    success: function (data) {
                        if (data == 1) {
                            alert("调整成功");
                            window.close();
                        }
                    }
                });
            }
        }
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <input type="hidden" id="treeAllJson" runat="server" value="" />
        <input type="hidden" id="passinfo" runat="server" value="" />
    <div class="row">
            <div class="col-lg-10">
                <div style="">
                    <ul id="TreeDemo" class="ztree" style="height: 580px; width: 100%; border: 0px; overflow-y: auto; font-size: 14px;"></ul>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
