<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="addQuestion.aspx.cs" Inherits="CollegeAPP.backHTML.addQuestion" %>

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
            $scope.form = { title_pic: "", baifenbi: 0, status: 0,name:"",type:1 };
            $scope.ischangevideo = false;
            $scope.hasids = "";
            $scope.showdisabled = false;
            $scope.checkclass = "";
            //$scope.form.ispublic = 1;
            if ($location.search().info_id) {
                //alert($location.search().info_id);
                getDataSource.getDataSource("getQuestion", { id: $location.search().info_id }, function (data) {
                    $scope.form = data[0];
                    if ($scope.form.status == 2)
                    {
                        $scope.form.upsuccess = true;
                    }
                });
                $scope.showdisabled = true;
                getDataSource.getDataSource("getClassInfo", { qid: $location.search().info_id }, function (data) {
                    $scope.classInfo = data;
                    $scope.queryData = data;
                    _.forEach($scope.classInfo, function (n, key) {
                        if (n.ischecked == "true") {
                            n.ischecked = true;
                            $scope.hasids += n.info_id + ",";
                            $scope.checkclass += n.bt + "&nbsp;,&nbsp;&nbsp;";
                        }
                    });
                    $("#checkName").html($scope.checkclass);
                });
            }
            else {
                $scope.form.ispublic = 1;
                getDataSource.getDataSource("getClassInfo", { qid: "" }, function (data) {
                    $scope.classInfo = data;
                    $scope.queryData = data;
                });
            }
            
            $scope.goQuery = function ()
            {
                $scope.queryData = [];
                _.forEach($scope.classInfo, function (n, key) {
                    if (n.bt.indexOf($scope.keyword) > -1) {
                        $scope.queryData.push(n);
                    }
                });
            }

            if ($location.search().menuid) {
                $scope.form.menuid = $location.search().menuid;
            }
            $scope.save = function () {
                $scope.form.dataflag = new Date().getTime();                
                var postType = "addQuestion";
                var guid = getDataSource.getGUID();
                if ($location.search().info_id) {
                    guid = $location.search().info_id;
                    postType = "updateQuestion";
                }
                
                var checkedId = "";
                //alert($scope.classInfo[1].ischecked);
                _.forEach($scope.classInfo, function (n, key) {
                    if (n.ischecked==true&&n.ischecked!="false")
                    {
                        checkedId+=n.info_id+",";
                    }
                    //alert(n.ischecked);
                });
                var mess = "";
                if ($scope.form.name == "" || $scope.form.name== undefined)
                { mess += "请输入标题\r\n";}
                if ($scope.form.type == "")
                { mess += "请选择类型\r\n"; }
                if (checkedId == "")
                { //mess += "请选择班级\r\n";
                    //$scope.form.ispublic = 1;
                }

                if (mess != "") {
                    alert(mess);
                }
                else {
                    $scope.form.id = guid;
                    getDataSource.getDataSource(postType, $scope.form, function (data) {
                        //console.log(data);
                        //$scope.form.upsuccess = true;
                    }, function (error) {
                    });

                    $http.get("../config/AppConfig.json").then(function (data) {
                        $scope.AppConfig = data.data;
                        $.ajax({
                            type: "post",
                            url: "backHtmlHelp.ashx",
                            data: { func: "addQuestionClass", ids: checkedId, qid: $scope.form.id, nguid: guid },
                            success: function (data) {
                                $scope.form.upsuccess = true;
                                //window.open($scope.AppConfig.openDcwj + "DSFA/admin_client/questionnaire/design/views/nlayout.htm?id=" + guid);
                                window.location.href = $scope.AppConfig.openDcwj + "DSFA/admin_client/questionnaire/design/views/nlayout.htm?id=" + guid;
                            }
                        });
                    });
                }
            }
            //var checkText = $scope.checkclass;
            $scope.checkClass = function ()
            {
                var checkText = "";
                _.forEach($scope.classInfo, function (n, key) {
                    if (n.ischecked == true && n.ischecked != "false") {
                        checkText += n.bt + "&nbsp;,&nbsp;&nbsp;";
                    }
                });
                $("#checkName").html(checkText);
            }
            $scope.loadVideo = function () {
                $scope.ischangevideo = false;
                $scope.config = {
                    sources: [

                        { src: $sce.trustAsResourceUrl($scope.AppConfig.videoPlayPath + $scope.form.videopath), type: "video/mp4" },

                    ],
                    tracks: [
                        {
                            src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
                            kind: "subtitles",
                            srclang: "en",
                            label: "English",
                            default: ""
                        }
                    ],
                    theme: "../bower_components/videogular-themes-default/videogular.css"
                };
            }
            $scope.openDataPicker = function (ev) {
                $scope.dataPickerOpen = true;
            }
            $scope.openDataPicker1 = function (ev) {
                $scope.dataPickerOpen1 = true;
            }
            $scope.changeIndex = function ()
            {
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
                <h2>新增调查问卷</h2>
            </div>
            <div class="row">
                <div class="col-md-3 text-right">
                    <span class="h3">标题</span>
                </div>
                <div class="col-md-9 text-left">
                    <input type="text" width="200" ng-model="form.name" />
                </div>
            </div>
            <div class="row">
                <div class="col-md-3 text-right">
                    <span class="h3">分类</span>
                </div>
                <div class="col-md-9">
                    <label data-ng-repeat="radio in radios" ng-show="!showdisabled" style="padding-right: 5px">
                        <input type="radio" name="response2" data-ng-model="form.type" value="{{radio.value}}" />
                        {{radio.text}}
                    </label>
                    <span ng-show="showdisabled">{{radios[form.type-1].text}}</span>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3 text-right">
                    <span class="h3">是否公开</span>
                </div>
                <div class="col-md-9">
                    <label data-ng-repeat="pp in publishData" style="padding-right: 5px">
                        <input type="radio" name="response3" data-ng-model="form.ispublic" value="{{pp.value}}" ng-click="changeIndex()" />
                        {{pp.text}}
                    </label>
                </div>
            </div>
            <div class="row" ng-show="form.ispublic!=1">
                <div class="col-md-3 text-right">
                    <span class="h3">选择班级</span>
                </div>
                <div class="col-md-9">
                    <div class="card" id="checkName">
                    </div>
                    <div class="item item-input-inset  has-tabs-top">
                    <label class="item-input-wrapper">
                        <i class="icon ion-search placeholder-icon"></i>
                        <input type="text" placeholder="查询" ng-model="keyword" maxlength="10" ng-change="goQuery()" >
                    </label>
                </div>
                    <div class="card" style="height:400px; overflow-y:auto;">
                        <label data-ng-repeat="classData in queryData" style="padding-right: 5px;width:100%;">
                            <input type="checkbox" name="response2" ng-checked="{{classData.ischecked}}" ng-model="classData.ischecked" ng-click="checkClass()" />
                            {{classData.bt}}【{{classData.pxsj|date:'yyyy-MM-dd'}} ~ {{classData.pxsj_js|date:'yyyy-MM-dd'}}】
                        </label>
                    </div>
                    <div ng-show="classInfo.length==0" style="font-size: 30px; color: #ccc; text-align: center; padding: 50px 0px 0px;">
                        <i class="ion-clipboard" style="font-size: 80px"></i>
                        <br />
                        <br />
                        暂无课程
                    </div>
                </div>
            </div>
            <div class="text-center">
                <alert type="success" dismiss-on-timeout="2000" close ng-show="form.upsuccess">保存成功</alert>
                <input type="button" class="btn btn-lg btn-primary" ng-show="!form.upsuccess" ng-click="save()" value="保存" />
            </div>

        </div>
    </form>
</body>
</html>
