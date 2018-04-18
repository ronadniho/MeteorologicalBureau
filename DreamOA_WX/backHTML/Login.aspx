<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="CollegeAPP.backHTML.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <script src="../Script/ztree/js/jquery-1.4.4.min.js"></script>
    <style type="text/css">
        #login {
            position: absolute;
            z-index: 999;
            width: 330px;
            height: 150px;
            overflow: hidden;
            top: 345px;
            /*left: 720px;*/
        }
    </style>
    <script type="text/javascript">

        $(document).ready(function () {
            //$("#btnLogin").attr("style", "background:url(../img/login.png)");
            var iWidth = document.body.clientWidth;
            var left = iWidth / 2;
            $("#login").attr("style", "margin-left:" + left+"px");
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div style="background: url(../img/loginbg.png) no-repeat center; width: 100%; height: 680px; margin: 30px auto;">
            <div id="login">
                <table style="width: 100%; height: 100%;">
                    <tr>
                        <td style="text-align: right; font-size: 20px; font-family: Arial">用户名:</td>
                        <td>
                            <asp:TextBox ID="txtName" MaxLength="20" Style="height: 23px;" runat="server"></asp:TextBox></td>
                    </tr>
                    <tr>
                        <td style="text-align: right; font-size: 20px; font-family: Arial">密码:</td>
                        <td>
                            <input id="txtPsd" type="password" style="height: 23px;" maxlength="20" runat="server" />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" style="text-align: center;">
                            <asp:Button ID="btnLogin" runat="server" Text="" OnClick="btnLogin_Click" Style="background: url('../img/login.png')" Width="190" Height="31" /></td>
                    </tr>
                </table>
            </div>
        </div>
    </form>
</body>
</html>
