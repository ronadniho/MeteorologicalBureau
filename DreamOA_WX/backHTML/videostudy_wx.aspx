<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="videostudy_wx.aspx.cs" Inherits="CollegeAPP.backHTML.videostudy_wx" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>新闻信息维护</title>
    <link href="../bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../Script/angular-ui/bootstrap.min.css" rel="stylesheet" />
    <link href="../bower_components/video.js/dist/video-js.css" rel="stylesheet" />
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
    <!--七牛上传视频所需JS-->
    <script src="../Script/qiniu/qiniu.js"></script>
    <script src="../Script/qiniu/plupload/plupload.full.min.js"></script>
    <script src="../Script/qiniu/plupload/i18n/zh_CN.js"></script>
    <!--七牛-->
    <!--videojs-->
    <script src="../bower_components/video.js/dist/ie8/videojs-ie8.js"></script>
    <script src="../bower_components/video.js/dist/video.min.js"></script>

    <!---->
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
        videojs.options.flash.swf = "../bower_components/video.js/video-js.swf";
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
        .filter("videostatus", function () {
            return function (input) {
                switch (input) {
                    case 0: return "未上传"; break;
                    case 1: return "转码中"; break;
                    case 2: return "转码完成"; break;
                }
            }
        })

        controller.controller("myController", function ($scope, $http, getDataSource, Upload, $sce, $location, $http, cordovaService, $timeout, $filter) {
            var uploader = null;
            $scope.radios = [
            { text: "图文", value: 0 },
            { text: "视频", value: 1 },
            { text: "音频", value: 2 },
            { text: "外链", value: 3 }
            ];
            $scope.showVideoGroup = false;

            $scope.form = { title_pic: "", baifenbi: 0, status: 0, content: "", subtitle: "", author: "", webpath: "", source: "", category: "", videolocalStatus: "", localvideoname: "", persistentId: "",keyword:"" };
            $scope.ischangevideo = false;
            $scope.istuiwen = false;
            $scope.isChange = false;
            $scope.isuploadfiles = false;
            $scope.isshowVideo = false;
            $scope.isshowOrder = false;
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
                    { $scope.isChange = true; }
                }
                else if (index == 1 || index == 2) {
                    $scope.isshipin = true;
                    //$scope.isshowVideo = true;    
                    $scope.isChange = false;
                    $("#txtContent").attr("style", "display:inline");
                    if ($location.search().info_id)
                    { $scope.isuploadfiles = true; }
                    $scope.initQINIU();
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
                    $scope.initQINIU();
                    if ($scope.form.videoStatus == 1) {
                        $scope.form.videoStatus = "转码中";
                    }
                    else if ($scope.form.videoStatus == 2) {
                        $scope.form.videoStatus = "转码成功";
                    }
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
                        $("#txtContent").attr("style", "display:inline");
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
                    if ($scope.upfiles.length > 0)
                    { $scope.isshowOrder = true; }
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
                            getDataSource.getDataSource("doLogVideoInfo", { content: "保存内容," + $scope.form.title }, function () { });
                            if ($scope.form.videofile != null) {
                                $scope.isshowVideo = true;
                            }
                            if ($scope.form.category == 1 || $scope.form.category == 2)
                            { $scope.isuploadfiles = true; }
                        }
                    }, function (error) {
                    });
                }
            }

            $scope.loadVideo = function () {
                $scope.ischangevideo = false;
                $http.get("../config/AppConfig.json").then(function (data) {
                    $scope.AppConfig = data.data;
                    //var myPlayer = videojs('example_video_1');
                    //videojs("example_video_1").ready(function () {
                    //    var myPlayer = this;
                    //    myPlayer.src({ type: "video/mp4", src: $sce.trustAsResourceUrl($scope.AppConfig.videoPlayLocalPath + $scope.form.videopath) });
                    //    //myPlayer.play();
                    //});
                    //alert($sce.trustAsResourceUrl($scope.AppConfig.videoPlayLocalPath + $scope.form.videoremotepath));
                    SewisePlayer.setup({
                        server: "vod",
                        type: "mp4",
                        videourl: $scope.AppConfig.videoPlayLocalPath + $scope.form.videopath,
                        skin: "vodFlowPlayer",
                        lang: 'zh_CN',
                        autostart: 'false',
                        claritybutton: 'disable'
                    });
                    SewisePlayer.onPlayTime(function (time, id) {
                        console.log("onPlayTime: " + time);
                    });
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
                if ($scope.form.files != null && $scope.form.files.length > 0) {
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
                        getDataSource.getDataSource("doLogVideoInfo", { content: "撤销发布内容," + $scope.form.title }, function () { });
                        window.location.reload();
                    } else {
                        getDataSource.getDataSource("doLogVideoInfo", { content: "发布内容," + $scope.form.title }, function () { });
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
                if ($scope.upfiles != null && $scope.upfiles.length > 0) {
                    for (var i = 0; i < $scope.upfiles.length; i++)
                        getDataSource.getDataSource("change_video_attach", { id: $scope.upfiles[i].id, ordernum: $scope.upfiles[i].orderindex }, function (data) {
                            window.location.reload();
                        })
                }
            }
            $scope.review = function () {
                //alert("123");
                window.open('/CollegeAPP/Html/index_ios.html#/zpNewsDetail/' + $scope.form.info_id, 'newwindow', 'height=600,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no')
            }
            $scope.replaceHtml = function () {
                $http.post("../api/replaceHtml/" + $scope.form.info_id).then(function (data) {
                    alert("转码成功！");
                    getDataSource.getDataSource("doLogVideoInfo", { content: "转码新闻" }, function () { });
                    window.location.reload();
                });
            }
            $scope.wxupload = function () {
                if (!$location.search().info_id) {
                    alert("上传视频前请先保存表单");
                    return;
                }
                $scope.uploader.start();
                $("#btn_save").attr("disabled", "disabled");
            }
            //七牛
            $scope.initQINIU = function () {
                if ($scope.uploader) {
                    $scope.uploader.destroy();
                }
                var token = $("#hid_qiniu_key").val();
                if ($scope.form.category == 1) {

                }
                else if ($scope.form.category == 2) {
                    token = $("#hid_qiniu_key_mp3").val();
                }
                $scope.uploader = Qiniu.uploader({
                    runtimes: 'html5,flash,html4',    //上传模式,依次退化
                    browse_button: 'btn_videoUpload',       //上传选择的点选按钮，**必需**
                    //uptoken_url: '/token',            //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
                    uptoken: token, //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
                    // unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
                    // save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
                    domain: '7xokg7.com2.z0.glb.qiniucdn.com',   //bucket 域名，下载资源时用到，**必需**
                    //container: 'container',           //上传区域DOM ID，默认是browser_button的父元素，
                    max_file_size: '1000mb',           //最大文件体积限制
                    flash_swf_url: '../Script/qiniu/plupload/Moxie.swf',  //引入flash,相对路径
                    max_retries: 3,                   //上传失败最大重试次数
                    dragdrop: false,                   //开启可拖曳上传
                    //drop_element: 'container',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                    //chunk_size: '4mb',                //分块上传时，每片的体积
                    auto_start: false,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
                    init: {
                        'FilesAdded': function (up, files) {

                            plupload.each(files, function (file) {
                                $scope.form.localvideoname = file.name;
                                $scope.form.videolocalStatus = "待上传";
                                $("#btn_canupload").removeAttr("disabled");
                                $scope.$apply();
                                // 文件添加进队列后,处理相关的事情
                            });
                        },
                        'BeforeUpload': function (up, file) {
                            // 每个文件上传前,处理相关的事情
                        },
                        'UploadProgress': function (up, file) {
                            $scope.form.baifenbi = file.percent;
                            $scope.form.videolocalStatus = "上传中";
                            $scope.$apply();
                            // 每个文件上传时,处理相关的事情
                        },
                        'FileUploaded': function (up, file, info) {
                            // 每个文件上传成功后,处理相关的事情
                            // 其中 info 是文件上传成功后，服务端返回的json，形式如
                            // {
                            //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                            //    "key": "gogopher.jpg"
                            //  }
                            // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html

                            // var domain = up.getOption('domain');
                            // var res = parseJSON(info);
                            // var sourceLink = domain + res.key; 获取上传成功后的文件的Url
                            var res = JSON.parse(info);
                            $scope.form.persistentId = res.persistentId;
                            $scope.form.videolocalStatus = "上传完成";
                            getDataSource.getDataSource("update_remote_video", { info_id: $scope.form.info_id, videoid: res.persistentId }, function () {
                                $scope.form.videostatus = 1;
                            })
                            $("#btn_save").removeAttr("disabled");
                            $scope.$apply();
                        },
                        'Key': function (up, file) {
                            var key = "";
                            if (file.name.indexOf(".mp4") > -1) {
                                key = $filter("date")(new Date(), 'yyyy_MM_dd_HH_mm_ss') + ".mp4";
                            }
                            else {
                                key = $filter("date")(new Date(), 'yyyy_MM_dd_HH_mm_ss') + ".mp3";
                            }
                            // do something with key
                            return key
                        },
                        'Error': function (up, err, errTip) {
                            console.log(err);
                            var err1 = err;
                            //上传出错时,处理相关的事情
                        },
                        'UploadComplete': function () {
                            //队列文件处理完毕后,处理相关的事情
                        }
                    }
                });
            };

            $scope.setupload = function () {
                $scope.form.baifenbi = 0;
                $("#btn_canupload").attr("disabled", "disabled");
                angular.forEach($scope.uploader.files, function (file) {
                    $scope.uploader.removeFile(file.id);
                });
                $scope.form.localvideoname = "文件读取中...";
                $scope.form.videolocalStatus = "未上传";
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
    <input type="hidden" runat="server" id="hid_transcodeNotifyUrl" />
    <input type="hidden" runat="server" id="qCloudSecret_id" />
    <input type="hidden" runat="server" id="qCloudSecret_key" />
    <input type="hidden" runat="server" id="hid_qiniu_key" />
    <input type="hidden" runat="server" id="hid_qiniu_key_mp3" />
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
            <div class="row">
                <div class="col-md-3 text-right" style="width: 15%; float: left;">
                    <span class="h3">关键字:</span>
                </div>
                <div class="col-md-9 text-left" style="width: 85%; float: left;">
                    <input type="text" style="width: 600px;" ng-model="form.keyword" />
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
                    <button class="btn btn-sm btn-primary" id="btn_videoUpload" ng-click="setupload()">选择媒体文件</button>
                    <input type="button" id="btn_canupload" disabled class="btn btn-sm btn-primary" ng-click="wxupload()" value="开始上传" />
                    <h3>{{form.localvideoname}}</h3>
                </div>
            </div>
            <div class="row" ng-show="isshipin">
                <progressbar class="progress-striped " ng-class="{true: '', false: 'active'}[form.upsuccess]" value="form.baifenbi" type="info">{{form.baifenbi}}% <i ng-show="form.upsuccess">上传成功</i></progressbar>
            </div>
            <div class="row" ng-show="isshipin">
                <div class="col-md-6">
                    <div>当前视频状态：<span style="color: red">{{form.videolocalStatus}}</span></div>
                </div>
                <div class="col-md-6">
                    <div>远程视频状态：<span style="color: red">{{form.videostatus|videostatus}}</span></div>
                </div>
            </div>
            <div class="row" ng-show="isshowVideo">
                <div class="videogular-container">
                    <script src="../Script/sewise-player-master/player/sewise.player.min.js"></script>
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
