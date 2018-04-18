<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="videostudy.aspx.cs" Inherits="CollegeAPP.backHTML.videostudy" %>

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
            { text: "图文", value: 0 },
            { text: "视频", value: 1 },
            { text: "音频", value: 2 },
            { text: "外链", value: 3 }
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

        controller.controller("myController", function ($scope, $http, getDataSource, Upload, $sce, $location, $http, cordovaService, $timeout) {
            $scope.radios = [
            { text: "图文", value: 0 },
            { text: "视频", value: 1 },
            { text: "音频", value: 2 },
            { text: "外链", value: 3 }
            ];
            $scope.showVideoGroup = false;

            $scope.form = { title_pic: "", baifenbi: 0, status: 0, content: "", subtitle: "", author: "", webpath: "",source:"",category:"" };
            $scope.ischangevideo = false;
            $scope.istuiwen = false;
            $scope.isChange = false;
            $scope.isuploadfiles = false;
            $scope.isshowVideo = false;
            $scope.isshowOrder=false;
            $scope.checkIndex = function (index) {
                $scope.istuiwen = false;
                $scope.isshipin = false;
                $scope.iswailian = false;
                if (index == 0) {
                    $scope.istuiwen = true;
                    $scope.isshowVideo = false;
                    $scope.isuploadfiles = false;
                    $("#txtContent").attr("style", "display:inline");
                    if ($location.search().info_id)
                    {$scope.isChange = true;}
                }
                else if (index == 1 || index == 2) {
                    $scope.isshipin = true;
                    //$scope.isshowVideo = true;    
                    $scope.isChange = false;                
                    $("#txtContent").attr("style", "display:none");
                    if ($location.search().info_id)
                    {$scope.isuploadfiles = true;}
                }
                else {
                    $scope.iswailian = true;
                    $scope.isshowVideo = false;
                    $scope.isChange = false;
                    $scope.isuploadfiles = false;
                    $("#txtContent").attr("style", "display:none");
                }
            }
            if ($location.search().info_id) {
                $scope.isChange = true;                
                getDataSource.getDataSource(["get_celap_videostudy_byinfo_id", "get_celap_group"], { info_id: $location.search().info_id }, function (data) {

                    $scope.form = _.find(data, function (d) {
                        return d.name == "get_celap_videostudy_byinfo_id";
                    }).data[0];
                    $scope.parentVideo = _.find(data, function (d) {
                        return d.name == "get_celap_group";
                    }).data[0];
                    //$scope.form = data[0];
                    console.log("ceshi", $scope.parentVideo);
                    $scope.form.baifenbi = 0;
                    $scope.form.title_picFile = "../staticresource/" + $scope.form.title_pic;
                    $scope.loadVideo();
                    //alert($scope.form.category);
                    //checkIndex($scope.form.category);
                    if ($scope.form.status == 1) {
                        $scope.isfabu = true;
                    }
                    if ($scope.form.category == 0) {
                        $scope.istuiwen = true;
                        $("#txtContent").attr("style", "display:inline");                        
                    }
                    else if ($scope.form.category == 1 || $scope.form.category == 2) {
                        $scope.isshipin = true;
                        $("#txtContent").attr("style", "display:none"); 
                            $scope.isshowVideo = true;
                            $scope.isChange = false;
                            $scope.isuploadfiles = true;
                    }
                    else {
                        $scope.iswailian = true;         
                        $scope.isChange = false;               
                        $("#txtContent").attr("style", "display:none");
                    }
                });
                getDataSource.getDataSource("get_video_attachs", { info_id: $location.search().info_id }, function (data) {
                    console.log(data);
                    $scope.upfiles = data;
if($scope.upfiles.length>0)
{$scope.isshowOrder=true;}
                });
            }
            if ($location.search().menuid) {
                $scope.form.menuid = $location.search().menuid;
            }
            $scope.save = function () {
                $scope.form.createtime = new Date();
                var postType = "insert_celap_videostudy";
                var guid = getDataSource.getGUID();
                if ($location.search().info_id) {
                    guid = $location.search().info_id;
                    postType = "update_celap_videostudy";
                }
                $scope.form.info_id = guid;

                var mess = "";
                if ($scope.form.category.toString() == "") {
                    mess = "请选择分类\r\n";
                }
                if ($scope.form.title == "" || !$scope.form.title) {
                    mess += "请输入标题\r\n";
                }
                if ($scope.form.releasetime == "" || !$scope.form.releasetime) {
                    mess += "请输入发布时间\r\n";
                }
                if ($scope.form.webpath == "" && $scope.iswailian) {
                    mess += "请输入外部链接地址\r\n";
                }
                if ($scope.form.minutes == null && $scope.isshipin) {
                    mess += "请输入时长";
                }
                if (mess != "") {
                    alert(mess);
                } else {
                    getDataSource.getDataSource(postType, $scope.form, function (data) {
                        console.log(data);
                        if (data[0].crow == 1) {
                            $location.search('info_id=' + $scope.form.info_id);
                            $scope.upload();
                            alert("数据保存成功");                            
                            if ($scope.form.videofile != null){
                                $scope.isshowVideo = true;
                                 }
                             if ($scope.form.category == 1 || $scope.form.category == 2) 
                            {$scope.isuploadfiles = true;}
                        }
                    }, function (error) {
                    });
                }
            }

            $scope.loadVideo = function () {
                $scope.ischangevideo = false;
            $http.get("../config/AppConfig.json").then(function (data) {
                $scope.AppConfig = data.data;
                $scope.config = {
                    sources: [

                        { src: $sce.trustAsResourceUrl($scope.AppConfig.videoPlayLocalPath + $scope.form.videopath), type: "video/mp4" },

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
            });
                
            }
            $scope.openDataPicker = function (ev) {
                $scope.dataPickerOpen = true;
            }
            $scope.openDataPicker1 = function (ev) {
                $scope.dataPickerOpen1 = true;
            }
            $scope.upload = function () {
                $scope.form.baifenbi = 0;
                if ($scope.form.title_picFile != null) {
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
                }

                if ($scope.form.videofile != null) {
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
                }

                if ($scope.form.files != null) {
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
                        //$scope.loadVideo();
                    }).error(function (data, status, headers, config) {
                        //console.log('error status: ' + status);
                    });
                }
            };
            $scope.change = function ($files, $file, ev) {
                if ($file) {
                    $scope.ischangevideo = true;
                    $scope.form.localvideoname = $file.name;
                }
            }
            $scope.changeFiles = function ($files, $file, ev) {
                //alert($files.length);
                if ($scope.form.files != null&&$scope.form.files.length>0) {
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
                        //$scope.loadVideo();
                        window.location.reload();
                    }).error(function (data, status, headers, config) {
                        //console.log('error status: ' + status);
                    });
                                        
                }
            }
            $scope.close = function () {

            }
            $scope.fb = function (status) {
                getDataSource.getDataSource("update_video_status", { info_id: $scope.form.info_id, status: status }, function () {
                    if (status == 0) {
                        alert("撤销发布成功");
                        window.location.reload();
                    }
                    else {
                        getDataSource.getDataSource("updateLastTime", { info_id: $scope.form.info_id }, function () {
                        });
                    }
                });                
            }
            $scope.$watch("form.category", function (item) {
                if (item == 1 || item == 2) {
                    $scope.showVideoGroup = true;
                }
                else {
                    $scope.showVideoGroup = false;
                }
            });
            $scope.selectVideoGroup = function () {
                window.open("Reportlist.aspx?category=selectVideo&info_id=" + $scope.form.info_id + "&menuid=" + $scope.form.menuid);
            }
            $scope.delete = function (item) {
                getDataSource.getDataSource("delete_video_attach", { id: item.id }, function (data) {
                    _.remove($scope.upfiles, function (n) {
                        return n.id = item.id;
                    });
                    window.location.reload();
                })                
            }
            $scope.changeOrder = function () {
if($scope.upfiles != null&&$scope.upfiles.length>0){
for(var i=0;i<$scope.upfiles.length;i++)     
                getDataSource.getDataSource("change_video_attach", { id: $scope.upfiles[i].id,ordernum:$scope.upfiles[i].orderindex }, function (data) {
                    window.location.reload();
                })     
}           
            }
            $scope.review = function () {
                //alert("123");
                window.open('/CollegeAPP/Html/index_ios.html#/zpNewsDetail/' + $scope.form.info_id, 'newwindow', 'height=600,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no')
            }
            $scope.replaceHtml = function ()
            {
                $http.post("../api/replaceHtml/"+$scope.form.info_id).then(function (data) {
                    alert("转码成功！");
                    window.location.reload();
                });
            }
        });
        function getGroup(fid) {
            $("#btn_save").click();
            window.location.href = window.location.href;
        }
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
                <h2>内容维护</h2>
            </div>
            <div class="row">
                <div class="col-md-3 text-right" style="width: 15%; float: left;">
                    <span class="h3">分类:</span>
                </div>
                <div class="col-md-9" style="width: 35%; float: left;">
                    <label data-ng-repeat="radio in radios" style="padding-right: 5px">
                        <input type="radio" name="response2" data-ng-model="form.category" value="{{radio.value}}" ng-click="checkIndex(radio.value)" />
                        {{radio.text}}
                    </label>
                    <span class="h3" style="color: red;">*</span>
                    <input type="button" ng-show="false" ng-click="selectVideoGroup()" value="选择" class="btn btn-primary" />
                </div>
                <div class="col-md-3 text-right" style="width: 15%; float: left;">
                    <span class="h3">发布状态:</span>
                </div>
                <div class="col-md-9 text-left" style="width: 35%; float: left;">
                    <span class="h3">{{form.status|myfilter:from.status}}</span>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3 text-right" style="width: 15%; float: left;">
                    <span class="h3">标题:</span>
                </div>
                <div class="col-md-9 text-left" style="width: 85%; float: left;">
                    <input type="text" style="width: 600px;" ng-model="form.title" /><span class="h3" style="color: red;">*</span>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3 text-right" style="width: 15%; float: left;">
                    <span class="h3">副标题:</span>
                </div>
                <div class="col-md-9 text-left" style="width: 85%; float: left;">
                    <input type="text" style="width: 600px;" ng-model="form.subtitle" />
                </div>
            </div>
            <div class="row" ng-show="iswailian">
                <div class="col-md-3 text-right" style="width: 15%; float: left;">
                    <span class="h3">外部链接:</span>
                </div>
                <div class="col-md-9 text-left" style="width: 85%; float: left;">
                    <input type="text" style="width: 600px;" ng-model="form.webpath" /><span class="h3" style="color: red;">*</span>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3 text-right" style="width: 15%; float: left;">
                    <span class="h3">标题图片:</span>
                </div>
                <div class="col-md-9" style="width: 35%; float: left;">
                    <span style="color: red">点击就可上传图片，尽量选择16：9的宽照片</span>
                    <img ngf-src="form.title_picFile" style="width: 180px; height: 150px; cursor: pointer" accept="image/*" ngf-select ngf-multiple="false" ng-model="form.title_picFile" />
                </div>
                <div class="col-md-3 text-right" style="width: 15%; float: left;">
                    <span class="h3">发布时间:</span>
                </div>
                <div class="col-md-9" style="width: 35%; float: left;">
                    <input type="text" ng-model="form.releasetime" close-text="确定" current-text="今天" clear-text="清除" datepicker-options="datepickerPopupConfig" datepicker-popup="yyyy-MM-dd HH:mm:ss" ng-click="openDataPicker1($event)" is-open="dataPickerOpen1" /><span class="h3" style="color: red;">*</span>
                </div>
                <div ng-show="isshipin" class="col-md-3 text-right" style="width: 15%; float: left; margin-top: 30px;">
                    <span class="h3">视频时长:</span>
                </div>
                <div ng-show="isshipin" class="col-md-9" style="width: 35%; float: left; margin-top: 30px;">
                    <input type="text" ng-init="form.minutes=0" ng-model="form.minutes" />(分钟)<span class="h3" style="color: red;">*</span>
                </div>
                <div class="col-md-3 text-right" style="width: 15%; float: left; margin-top: 30px;">
                    <span class="h3">作者:</span>
                </div>
                <div class="col-md-9" style="width: 35%; float: left; margin-top: 30px;">
                    <input type="text" ng-model="form.author" />
                </div>
            </div>
            <div class="row">
                <div class="col-md-3 text-right" style="width: 15%; float: left;">
                    <span class="h3">创建时间:</span>
                </div>
                <div class="col-md-9" style="width: 35%; float: left;">
                    <input type="text" ng-model="form.createtime" readonly="readonly" datepicker-popup="yyyy-MM-dd" />
                </div>
                <div class="col-md-3 text-right" style="width: 15%; float: left;">
                    <span class="h3">来源:</span>
                </div>
                <div class="col-md-9" style="width: 35%; float: left;">
                    <input type="text" ng-model="form.source" />
                </div>
            </div>
            <div class="row text-center">

                <span class="h3">正文内容</span>

            </div>
            <div ng-show="istuiwen" class="row text-center">
                <span style="color: red">需要手工排版，内容中千万不要上传大图（尽量选择16：9的宽照片，宽度控制在400px像素之内</span>
            </div>
            <div id="txtContent" class="row">
                <div style="padding: 0px 0px 0px 0px">

                    <div style="margin-bottom: 1.25rem" class="ueditor" ng-model="form.content"></div>
                </div>
            </div>

            <div ng-show="isshipin" class="row">
                <div class="col-md-3 text-right">
                    <span class="h3">上传音视频</span>
                </div>
                <div class="col-md-9">
                    <button class="btn" ngf-change="change($files, $file, $event)" accept="*/*" ngf-src="form.videofile" ngf-select ngf-multiple="false" ng-model="form.videofile">上传</button>
                    <h3>{{form.localvideoname}}</h3>
                </div>
            </div>
            <div class="row" ng-show="isshipin">
                <progressbar class="progress-striped " ng-class="{true: '', false: 'active'}[form.upsuccess]" value="form.baifenbi" type="info">{{form.baifenbi}}% <i ng-show="form.upsuccess">上传成功</i></progressbar>
            </div>
            <div class="row" ng-show="isshowVideo">
                <div class="videogular-container">
                    <videogular vg-theme="config.theme">
                <vg-media vg-src="config.sources"
                          vg-tracks="config.tracks">
                </vg-media>

                <vg-controls>
                    <vg-play-pause-button></vg-play-pause-button>
                    <vg-time-display>{{ currentTime | date:'mm:ss' }}</vg-time-display>
                    <vg-scrub-bar>
                        <vg-scrub-bar-current-time></vg-scrub-bar-current-time>
                    </vg-scrub-bar>
                    <vg-time-display>{{ timeLeft | date:'mm:ss' }}</vg-time-display>
                    <vg-volume>
                        <vg-mute-button></vg-mute-button>
                        <vg-volume-bar></vg-volume-bar>
                    </vg-volume>
                    <vg-fullscreen-button></vg-fullscreen-button>
                </vg-controls>

                <vg-overlay-play></vg-overlay-play>
                <vg-poster vg-url='controller.config.plugins.poster'></vg-poster>
            </videogular>
                </div>
            </div>
            <div style="height: 10px;"></div>
            <div ng-show="isuploadfiles" class="text-center">
                <input type="button" class="btn btn-default" ngf-change="changeFiles($files, $file, $event)" accept="*/*" ngf-select ngf-multiple="true" ng-model="form.files" ng-click="upFile();upload();" value="上传附件" />
                <input type="button" ng-show="isshowOrder" class="btn btn-sm btn-warning" ng-click="changeOrder()" value="保存排序">
            </div>
            <div class="row" ng-repeat="item in form.files">
                <div class="col-md-3">
                    文件名
                </div>
                <div class="col-md-9">
                    {{item.name}}
                </div>
            </div>
            <div ng-show="isshipin">
                <div class="row" ng-repeat="item in upfiles">
                    <div class="col-md-3">
                        文件名
                    </div>
                    <div class="col-md-4">
                        {{item.orginname}}&nbsp;&nbsp;
                        <input type="button" class="btn btn-sm btn-warning" ng-click="delete(item)" value="删除">
                    </div>
                    <div class="col-md-5">
                        排序&nbsp;<input type="text" ng-model="item.orderindex" />
                    </div>
                </div>
            </div>
            <div ng-show="false">
                <div class="row" ng-show="isuploadfiles">
                    <div class="col-md-2">
                        所属音视频
                    </div>
                    <div class="col-md-8">
                        {{parentVideo.title}}
                    </div>
                    <div class="col-md-2">
                        <input type="button" class="btn btn-sm btn-primary" value="删除关联" />
                    </div>
                </div>
            </div>
            <div style="height: 20px;"></div>
            <div class="text-center">
                <alert type="success" dismiss-on-timeout="2000" close ng-show="false">保存成功</alert>
                <input type="button" class="btn btn-lg btn-primary" ng-show="istuiwen" ng-click="review()" value="预览" />
                <input type="button" class="btn btn-lg btn-primary" ng-show="isChange" ng-click="replaceHtml()" value="转码" />
                <input type="button" class="btn btn-lg btn-primary" id="btn_save" ng-click="save()" value="保存" />
                <input type="button" class="btn btn-lg btn-primary" ng-click="save();fb(1)" value="保存并发布" />
                <input type="button" class="btn btn-lg btn-primary" ng-show="isfabu" ng-click="fb(0)" value="撤销发布" />
            </div>
            <div style="height: 80px;"></div>
        </div>
    </form>
</body>
</html>
