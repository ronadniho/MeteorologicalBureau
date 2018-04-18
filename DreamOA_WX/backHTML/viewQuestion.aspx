<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="viewQuestion.aspx.cs" Inherits="CollegeAPP.backHTML.QuestionManage" %>

<!DOCTYPE html>

<html>
<head runat="server">
   <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>新闻信息维护</title>
    <link href="../bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../Script/angular-ui/bootstrap.min.css" rel="stylesheet" />
    <script src="../bower_components/jquery/dist/jquery.min.js"></script>
    <script src="../bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="../bower_components/angular/angular.min.js"></script>
    <script src="uedit/ueditor.config.js"></script>
    <script src="uedit/ueditor.all.js"></script>
    <script src="css/ng-file-upload.min.js"></script>
    <script src="../Script/APPScript/services.js"></script>
    <script src="../Script/angular-ui/ui-bootstrap.min.js"></script>
    <script src="../Script/angular-ui/ui-bootstrap-tpls.min.js"></script>
    <script src="../Script/i18n/angular-locale_zh-cn.js"></script>
    <script src="../bower_components/angular-sanitize/angular-sanitize.min.js"></script>
    <script src="../bower_components/videogular/videogular.js"></script>
    <script src="../bower_components/videogular-controls/vg-controls.js"></script>
    <script src="../bower_components/videogular-overlay-play/vg-overlay-play.js"></script>
    <script src="../bower_components/videogular-poster/vg-poster.js"></script>
    <script src="../bower_components/videogular-buffering/vg-buffering.js"></script>
    <script src="../bower_components/angular-ueditor/dist/angular-ueditor.min.js"></script>
    <script src="../bower_components/lodash/lodash.min.js"></script>
    <script type="text/javascript">
        var app = angular.module("app", ["app.Controller", "ngFileUpload", "app.commonServices", "ui.bootstrap", "ngSanitize",
			"com.2fdevs.videogular",
			"com.2fdevs.videogular.plugins.controls",
			"com.2fdevs.videogular.plugins.overlayplay",
			"com.2fdevs.videogular.plugins.poster",
            "ng.ueditor", "app.filters"
        ]);

        var controller = angular.module("app.Controller", []);
        angular.module("app.filters", [])
        .filter("myfilter", function () {
            return function (input) {
                switch (input) {
                    case 0: return "未发布"; break;
                    case 1: return "已发布"; break;
                    case -1: return "已删除"; break;
                }
            }
        })

        controller.controller("myDataController", function ($scope, $http, getDataSource, Upload, $sce, $location, $rootScope) {
            var token = "";
            $scope.loadData = function () {
                $(document).ready(function () {
                    $.ajax({
                        type: 'get',
                        data: { name: 'admin', psd: '96e79218965eb72c92a549dd5a330112' },//name:登录名，psd:加密过后的密码
                        url: "http://10.100.2.32:9901/DSFA/survey/api",
                        dataType: 'JSON',
                        async: false,
                        success: function (data) {
                            token = data.token;
                            window.location.href = "http://10.100.2.32:9901/DSFA/admin_client/questionnaire/analyze/views/index.html?id=" + $location.search().id + "&token=" + token;
                        }
                    })
                })
            };

            $scope.loadData();
        });
    </script>
</head>
<body ng-app="app">
    <form id="form1" runat="server" ng-controller="myDataController">
    </form>
</body>
</html>
