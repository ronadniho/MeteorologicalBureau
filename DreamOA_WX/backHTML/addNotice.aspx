<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="addNotice.aspx.cs" Inherits="CollegeAPP.backHTML.addNotice" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
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
    <style>
        .videogular-container {
            width: 100%;
            height: 440px;
            margin: auto;
            overflow: hidden;
            vertical-align: top;
        }
    </style>
    <script>
        var app = angular.module("app", ["app.Controller", "ngFileUpload", "app.commonServices", "ui.bootstrap", "ngSanitize",
			"com.2fdevs.videogular",
			"com.2fdevs.videogular.plugins.controls",
			"com.2fdevs.videogular.plugins.overlayplay",
			"com.2fdevs.videogular.plugins.poster",
            "ng.ueditor", "app.filters"
        ]);

        var controller = angular.module("app.Controller", []);
        var radios = [
            { text: "调查问卷", value: 1 },
            { text: "训前需求", value: 2 },
            { text: "训中需求", value: 3 },
            { text: "训后需求", value: 4 }
        ];
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

        controller.controller("myController", function ($scope, $http, getDataSource, Upload, $sce, $location) {
            $scope.radios = [
            { text: "调查问卷", value: 1 },
            { text: "训前需求", value: 2 },
            { text: "训中需求", value: 3 },
            { text: "训后需求", value: 4 }
            ];
            $scope.publishData = [
            { text: "是", value: 1 },
            { text: "否", value: 0 }
            ];
            $http.get("../config/AppConfig.json").then(function (data) {
                $scope.AppConfig = data.data;
            });
            $scope.form = { ggbt: "", ggnr: "", createuser: "", id: "", ggsj: "" };
            $scope.ischangevideo = false;
            $scope.hasids = "";
            $scope.showdisabled = false;
            if ($location.search().id) {
                getDataSource.getDataSource("getNoticeByid", { id: $location.search().id }, function (data) {
                    $scope.form = data[0];
                });
                $scope.showdisabled = true;
            }
            else {
                getDataSource.getDataSource("getNoticeNum", {}, function (data) {
                    $scope.form.id = data[0].nextval;
                });
            }
            $scope.save = function () {
                var postType = "addNoticeByAdmin";
                var guid = getDataSource.getGUID();
                if ($location.search().id) {
                    $scope.form.id = $location.search().id;
                    postType = "updateNoticeByAdmin";
                }
                $scope.form.createuser = $("#hidUid").val();
                var mess = "";
                if ($scope.form.ggbt == "" || $scope.form.ggbt == undefined)
                { mess += "请输入标题\r\n"; }
                if ($scope.form.ggnr == "")
                { mess += "请输入内容\r\n"; }

                if (mess != "") {
                    alert(mess);
                }
                else {
                    getDataSource.getDataSource(postType, $scope.form, function (data) {
                        //console.log(data);
                        $scope.form.upsuccess = true;
                    }, function (error) {
                    });
                }
            }
            $scope.openDataPicker = function (ev) {
                $scope.dataPickerOpen = true;
            }
            $scope.openDataPicker1 = function (ev) {
                $scope.dataPickerOpen1 = true;
            }
            $scope.changeIndex = function () {
                if ($scope.form.ispublic != 0) {
                    _.forEach($scope.classInfo, function (n, key) {
                        if (n.ischecked == true && n.ischecked != "false") {
                            n.ischecked = false;
                        }
                    });
                    $("#checkName").html('');
                }
            }
            $scope.upload = function () {
                if ($scope.form.title_picFile.length == 0) {
                    return;
                }
                $scope.form.baifenbi = 0;
                Upload.upload({
                    url: 'upFile.ashx',
                    file: $scope.form.title_picFile,
                    fields: { 'info_id': $scope.form.info_id, category: "titlepic" },
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    if (progressPercentage == 100) {
                        $scope.form.upsuccess = true;
                    }
                    //console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    //console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                }).error(function (data, status, headers, config) {
                    //console.log('error status: ' + status);
                });

                Upload.upload({
                    url: 'upFile.ashx',
                    file: $scope.form.videofile,
                    fields: { 'info_id': $scope.form.info_id, category: "video" },
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.form.baifenbi = progressPercentage;
                    //$scope.$apply();
                }).success(function (data, status, headers, config) {
                    $location.search('info_id=' + $scope.form.info_id);
                    $scope.form.videopath = data.videopath;
                    $scope.loadVideo();
                }).error(function (data, status, headers, config) {
                    //console.log('error status: ' + status);
                });

                Upload.upload({
                    url: 'upAttach.ashx',
                    file: $scope.form.files,
                    fields: { 'info_id': $scope.form.info_id },
                }).progress(function (evt) {
                    // var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    // $scope.form.baifenbi = progressPercentage;
                    //$scope.$apply();
                }).success(function (data, status, headers, config) {
                    $location.search('info_id=' + $scope.form.info_id);
                    $scope.form.videopath = data.videopath;
                    $scope.loadVideo();
                }).error(function (data, status, headers, config) {
                    //console.log('error status: ' + status);
                });

            };
            $scope.change = function ($files, $file, ev) {
                if ($file) {
                    $scope.ischangevideo = true;
                    $scope.form.localvideoname = $file.name;
                }
            }
            $scope.changeFiles = function ($files, $file, ev) {
                //alert($files.length);
            }
            $scope.close = function () {

            }
            $scope.fb = function (status) {
                getDataSource.getDataSource("update_video_status", { info_id: $scope.form.info_id, status: status }, function () {
                });
            }
            $scope.delete = function (item) {
                getDataSource.getDataSource("delete_video_attach", { id: item.id }, function (data) {
                    _.remove($scope.upfiles, function (n) {
                        return n.id = item.id;
                    });
                })
            }
        });
    </script>
    <style>
        .row {
            padding: 6px 5px 6px 5px;
        }
    </style>
</head>
<body ng-app="app">
    <form id="form1" runat="server" ng-controller="myController">
        <div class="container">
            <div class="row text-center">
                <h2>新增通知公告</h2>
            </div>
            <div class="row">
                <div class="col-md-3 text-right">
                    <span class="h3">标题</span>
                </div>
                <div class="col-md-9 text-left">
                    <input type="text" width="200" ng-model="form.ggbt" />
                </div>
            </div>
            <div class="row">
                <div class="col-md-3 text-right">
                    <span class="h3">内容</span>
                </div>
                <div class="col-md-9">
                    <div id="txtContent" class="row">
                        <div style="padding: 0px 0px 0px 0px">

                            <div style="margin-bottom: 1.25rem" class="ueditor" ng-model="form.ggnr"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center">
                <input runat="server" style="display:none;" id="hidUid" />
                <alert type="success" dismiss-on-timeout="2000" close ng-show="form.upsuccess">保存成功</alert>
                <input type="button" class="btn btn-lg btn-primary" ng-show="!form.upsuccess" ng-click="save()" value="保存" />
            </div>

        </div>
    </form>
</body>
</html>
