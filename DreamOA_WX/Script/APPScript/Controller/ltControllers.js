APPController.controller("myController", function ($scope) {

})
  // 走进中浦院 
.controller("zjzpController", function ($scope, Restangular, $state, $rootScope, $ionicSlideBoxDelegate, getDataSource, $timeout, $ionicScrollDelegate, goDetail) {
    getDataSource.getDataSource("doLogServer", { content: "新闻" }, function () { });
    $scope.loadImg = function () {
        getDataSource.getDataSource("getNewList", { category: "中浦要闻", pagecount: 1, rowcount: "4" }, function (data) {
            var dataImag = "";
            for (var i = 0; i < data.length; i++) {
                dataImag = data[i].title_pic;
                if (dataImag && dataImag !== null && dataImag !== "") {
                    var index = dataImag.lastIndexOf(".");
                    data[i].title_pic = dataImag.substr(0, index) + "_mid" + dataImag.substr(index, dataImag.length);
                }
            }
            $scope.dataImageSource = data;

            $ionicSlideBoxDelegate.update();

        });
    }

    // 页面加载数据
    $scope.loadmeDatas = function (categoryVal) {
        if (categoryVal) {
            $scope.queryType = categoryVal;

            getDataSource.getDataSource("getNewList", { category: categoryVal, pagecount: $scope.index, rowcount: "8" }, function (data) {
                var dataImag = "";
                if (data.length == 0) {
                    $scope.moreDataCanBeLoaded = false;
                } else { $scope.moreDataCanBeLoaded = true; }
                for (var i = 0; i < data.length; i++) {
                    dataImag = data[i].title_pic;
                    if (dataImag && dataImag !== null && dataImag !== "") {
                        var index = dataImag.lastIndexOf(".");
                        data[i].title_pic = dataImag.substr(0, index) + "_small" + dataImag.substr(index, dataImag.length);
                    }
                    $scope.dataZpywSource.push(data[i]);
                }
            });
        }
    };

    var isIOS = ionic.Platform.isIOS();
    var isAndroid = ionic.Platform.isAndroid();
    $scope.marTop = "margin-top:110px";
    if (isAndroid) {
        $scope.marTop = "margin-top:110px";
    }
    if (isIOS) {
        $scope.marTop = "margin-top:90px";
    }
    if ($rootScope.formweixin) {
        $scope.marTop = "margin-top:110px";
    }

    $scope.index = 0;
    $scope.dataZpywSource = [];
    //$scope.loadmeDatas("中浦要闻");
    $scope.queryType = "中浦要闻";
    $scope.moreDataCanBeLoaded = true;
    $scope.loadImg();
    $scope.showData = true;

    $scope.changeIndex = function (index, categoryVal) {
        for (var i = 1; i <= 3; i++) {
            $("#" + i).attr("style", "font-family:微软雅黑;font-size:20px;font-style:normal;text-decoration:none;");
        }
        $rootScope.SelectIndex = index;
        $("#" + index).attr("style", "font-family:微软雅黑;font-size:20px;font-style:normal;text-decoration:none;color:#e60000;");

        $scope.index = 1;
        $scope.dataZpywSource = [];
        $scope.queryType = categoryVal;

        $scope.loadmeDatas($scope.queryType);
        //$ionicScrollDelegate.scrollTop(true);
        $ionicScrollDelegate.scrollTo(0, 0, false);

    }

    //$scope.changeIndex($rootScope.SelectIndex);

    $scope.loadMore = function () {
        $scope.index = $scope.index + 1;
        $scope.loadmeDatas($scope.queryType);
        $scope.$broadcast("scroll.infiniteScrollComplete");
    }
    $scope.doRefresh = function () {
        $scope.moreDataCanBeLoaded = true;
        $scope.dataZpywSource = [];
        $scope.index = 1;
        $scope.loadmeDatas($scope.queryType);
        $scope.$broadcast("scroll.refreshComplete");
    };
    $scope.goNewsDetail = function (item) {
        goDetail.goNewsDetail(item);
    }
})
    // 新闻列表页面 
.controller("zpNewsListController", function ($scope, Restangular, $state, $rootScope, getDataSource, $stateParams, goDetail) {
    // 页面加载数据
    $scope.loadmeDatas = function () {
        //var zpyw = Restangular.one("../TestJSON/zpyw.json");
        //zpyw.get().then(function (Data) {
        //    $scope.dataZpywSource = Data;
        //});
        getDataSource.getDataSource("getNewList", { category: $stateParams.type, pagecount: $scope.index, rowcount: "8" }, function (data) {

            var dataImag = "";
            if (data.length == 0) {
                $scope.moreDataCanBeLoaded = false;
            }
            for (var i = 0; i < data.length; i++) {
                dataImag = data[i].title_pic;
                if (dataImag && dataImag !== null && dataImag !== "") {
                    var index = dataImag.lastIndexOf(".");
                    data[i].title_pic = dataImag.substr(0, index) + "_small" + dataImag.substr(index, dataImag.length);
                }
                $scope.dataZpywSource.push(data[i]);
            }
        });
    };
    $scope.index = 0;
    $scope.isShow = false;
    //$scope.loadmeDatas();
    $scope.dataZpywSource = [];
    $scope.moreDataCanBeLoaded = true;

    $scope.loadTitle = $stateParams.type;

    $scope.doRefresh = function () {
        $scope.moreDataCanBeLoaded = true;
        $scope.index = 1;
        $scope.dataZpywSource = [];
        $scope.loadmeDatas();
        $scope.$broadcast("scroll.refreshComplete");
    };

    $scope.loadMore = function () {
        $scope.index = $scope.index + 1;
        $scope.loadmeDatas();
        $scope.$broadcast("scroll.infiniteScrollComplete");
    }

    $scope.goNewsDetail = function (item) {
        goDetail.goNewsDetail(item);
        //if (item.category == 1) {
        //    console.log("http://10.100.2.35/video/" + item.videopath);
        //    xsf.playVideo($rootScope.AppConfig.videoPlayPath + item.videopath);
        //}
        //else if (item.category == 2) {
        //    $state.go("ydjxDetail", { id: item.info_id });
        //}
        //else if (item.category == 0) {
        //    $state.go("zpNewsDetail", { id: item.info_id });
        //}
        //else if (item.category == 3) {
        //    xsfWindow.open1(item.webpath);
        //}
    }
})
// 新闻列表详情页面 
.controller("zpNewsDetailController", function ($scope, $stateParams, Restangular, $state, $rootScope, getDataSource, $dateService, $sce, $timeout) {
    $scope.fontSize = "1.5em";
    // 日期转换
    $scope.parseDate = function (dataString) {
        if (dataString) {
            return $dateService.parse(dataString);
        }
        else {
            return "";
        }
    }
    // 页面加载数据
    $scope.loadmeDatas = function () {
        //alert($stateParams.id);
        //var zpyw = Restangular.one("../TestJSON/ydjxDetail.json");
        //zpyw.get().then(function (Data) {
        //    $scope.dataSource = Data;
        //    $("#wishContent").html(Data.content);
        //});
        if ($stateParams.id !== "123") {
            getDataSource.getDataSource("getNewDetail", { id: $stateParams.id }, function (data) {
                $scope.dataSource = data[0];
                $scope.dataSource.content = $sce.trustAsHtml(data[0].content);
                getDataSource.getDataSource("doLogAny", { content: "访问新闻:" + $scope.dataSource.title }, function () { });
            });
        }
        else {
            getDataSource.getDataSource("getNewxyDetail", { category: "学院介绍" }, function (data) {
                $scope.dataSource = data[0];
                $scope.dataSource.ftitle = "学院介绍";
                $("#wishContent").html(data[0].content);
            });
        }
        $timeout(function () {
            $("#wishContent p").attr("style", "line-height:28px;");
            $("#wishContent img").attr("style", "width:100%;");
        }, 400);
    };
    $scope.loadmeDatas();
    var tgs = new Array('div', 'td', 'tr');
    var szs = new Array('medium', 'large', 'x-large');
    var startSz = 0;
    $scope.fontSizeFun = function () {
        if ($scope.fontSize == "1.9em") {
            $scope.fontSize = "1.5em";
            $("#wishContent p").attr("style", "line-height:22px;");
        }
        else if ($scope.fontSize == "1.5em") {
            $scope.fontSize = "1.7em";
            $("#wishContent p").attr("style", "line-height:28px;");
        }
        else {
            $scope.fontSize = "1.9em";
            $("#wishContent p").attr("style", "line-height:35px;");
        }
    };
})
    // 移动教学页面 
.controller("ydjxController", function ($scope, Restangular, $state, $rootScope, getDataSource, goDetail) {
    // 页面加载数据
    $scope.loadmeDatas = function () {
        getDataSource.getDataSource("getNewList", { category: "公开课" }, function (data) {
            $scope.dataZpywSource = data;
        });

        getDataSource.getDataSource("getNewList", { category: "网络学院" }, function (data) {
            $scope.dataWlxySource = data;
        });
    };
    //$scope.loadmeDatas();
    $scope.goDetail = function (item) {
        goDetail.goNewsDetail(item);
        //if (item.category == 1) {
        //    console.log("http://10.100.2.35/video/" + item.videopath);
        //    xsf.playVideo($rootScope.AppConfig.videoPlayPath + item.videopath);
        //}
        //else if (item.category == 2) {
        //    $state.go("ydjxDetail", { id: item.info_id });
        //}
        //else if (item.category == 0) {
        //    $state.go("zpNewsDetail", { id: item.info_id });
        //}
        //else if (item.category == 3) {
        //    xsfWindow.open1(item.webpath);
        //}
    }
    //点赞
    $scope.addGood = function (item) {
        getDataSource.getDataSource("queryComment", { userid: user.info_id, finfoId: item.info_id }, function (data) {
            // 判断是否有点过赞
            if (data.length > 0) {
                //showAlert.showToast("已点赞");
            }
            else {
                var formData = { userid: user.info_id, username: user.username, finfo_id: item.info_id, isgood: 1, replaydate: new Date(), ncontent: "", replayid: "" };
                getDataSource.getDataSource("Insert_GoodComment", formData, function (data) {
                    //showAlert.showToast("点赞成功");
                    $scope.loadmeDatas();
                });
            }
        });
    };
    // 相关材料
    $scope.goDocuments = function (item) {
        $state.go("clxz", { fid: item.info_id });
    }
    $scope.gokbcxList = function () {
        $state.go("app.kbcx");
    }
    $scope.HrefTo = function (kc) {
        $state.go("KCDetail", { info_id: kc.info_id });
    };
    $scope.goydjxList = function (VideoType) {
        $state.go("ydjxList", { type: VideoType });
    }
    $scope.goYDList = function (VideoType) {
        $state.go("zpNewsList", { type: VideoType });
    }
    $scope.goNewsDetail = function (item) {
        goDetail.goNewsDetail(item);
        //if (item.category == 1) {
        //    console.log("http://10.100.2.35/video/" + item.videopath);
        //    xsf.playVideo($rootScope.AppConfig.videoPlayPath + item.videopath);
        //}
        //else if (item.category == 2) {
        //    $state.go("ydjxDetail", { id: item.info_id });
        //}
        //else if (item.category == 0) {
        //    $state.go("zpNewsDetail", { id: item.info_id });
        //}
        //else if (item.category == 3) {
        //    xsfWindow.open1(item.webpath);
        //}
    };
})
    // 移动教学列表页面 
.controller("ydjxListController", function ($scope, Restangular, $state, $rootScope, getDataSource, $stateParams, $sce, $timeout, showAlert, goDetail) {
    // 加载用户数据
    var user = $rootScope.user;
    // 页面加载数据
    $scope.loadmeDatas = function () {
        getDataSource.getDataSource("getNewList", { category: $stateParams.type, pagecount: $scope.index, rowcount: "8" }, function (data) {
            var dataImag = "";
            if (data.length == 0) {
                $scope.moreDataCanBeLoaded = false;
            }
            for (var i = 0; i < data.length; i++) {
                dataImag = data[i].title_pic;
                if (dataImag && dataImag !== null && dataImag !== "") {
                    var index = dataImag.lastIndexOf(".");
                    data[i].title_pic = dataImag.substr(0, index) + "_small" + dataImag.substr(index, dataImag.length);
                }
                $scope.dataZpywSource.push(data[i]);
            }
            $scope.loadVideo();

        });
    };

    $scope.loadTitle = $stateParams.type;
    $scope.isShow = false;
    $scope.index = 0;
    if ($scope.loadTitle == "直播课堂") {
        $scope.isShow = true;
    }
    //$scope.loadmeDatas();
    $scope.dataZpywSource = [];
    $scope.moreDataCanBeLoaded = true;

    $scope.doRefresh = function () {
        $scope.moreDataCanBeLoaded = true;
        $scope.index = 1;
        $scope.dataZpywSource = [];
        $scope.loadmeDatas();
        $scope.$broadcast("scroll.refreshComplete");
    };

    $scope.loadMore = function () {
        $scope.index = $scope.index + 1;
        $scope.loadmeDatas();
        $scope.$broadcast("scroll.infiniteScrollComplete");
    }

    //点赞
    $scope.addGood = function (item) {
        getDataSource.getDataSource("queryComment", { userid: user.info_id, finfoId: item.info_id }, function (data) {
            // 判断是否有点过赞
            if (data.length > 0) {
                //showAlert.showToast("已点赞");
            }
            else {
                var formData = { userid: user.info_id, username: user.username, finfo_id: item.info_id, isgood: 1, replaydate: new Date(), ncontent: "", replayid: "" };
                getDataSource.getDataSource("Insert_GoodComment", formData, function (data) {
                    //showAlert.showToast("点赞成功");
                    //$scope.loadmeDatas();
                    item.goodcount = item.goodcount + 1;
                });
            }
        });
    };

    $scope.showMin = function (minutes) {
        if (minutes == "") {
            return true;
        }
        else { return false; }
    }
    // 相关材料
    $scope.goDocuments = function (item) {
        $state.go("clxz", { fid: item.info_id });
    }

    $scope.onPlayerReady = function (API) {
        $scope.API = API;
    }
    $scope.loadVideo = function () {
        $scope.controller = {};
        $scope.controller.API = null;
        $scope.sources = new Array();
        angular.forEach($scope.dataZpywSource, function (item) {
            var newarr = new Array();
            newarr.push({ src: $sce.trustAsResourceUrl($rootScope.AppConfig.videoPlayPath + item.videopath), type: "video/mp4" });
            $scope.sources.push(newarr);
        });

        $scope.controller.config = {
            sources: [],
            tracks: [
                {
                    src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
                    kind: "subtitles",
                    srclang: "en",
                    label: "English",
                    default: ""
                }
            ],
            theme: "../bower_components/videogular-themes-default/videogular.css",
            plugins: {
                analytics: {
                    category: "Videogular",
                    label: "Main",
                    events: {
                        ready: true,
                        play: true,
                        pause: true,
                        stop: true,
                        complete: true,
                        progress: 10
                    }
                }
            }
        };
    }
    $scope.goDetail = function (index, item) {
        goDetail.goNewsDetail(item);
        //if (item.category == 1) {
        //    //console.log("http://10.100.2.35/video/" + item.videopath);
        //    //xsf.playVideo($rootScope.AppConfig.videoPlayPath + item.videopath);
        //    $state.go("videoPlay", { id: item.info_id });
        //}
        //else if (item.category == 2) {
        //    $state.go("ydjxDetail", { id: item.info_id });
        //}
        //else if (item.category == 0) {
        //    $state.go("zpNewsDetail", { id: item.info_id });
        //}
        //else if (item.category == 3) {
        //    xsfWindow.open1(item.webpath);
        //}
    }
})
    // 材料下载页面 
.controller("clxzController", function ($scope, Restangular, $state, $rootScope, getDataSource, $stateParams, downService, $http, showAlert) {
    var tempDir = "";
    xsf.getDeviceInfo(function (info) {
        //alert("info:" + info)
        //alert(info.WORK_DIR)
        tempDir = info.TEMP_DIR;
    });
    // 页面加载数据
    $scope.loadmeDatas = function () {

        //var zpyw = Restangular.one("../TestJSON/zpyw.json");
        //zpyw.get().then(function (Data) {
        //    $scope.dataZpywSource = Data;
        //});

        getDataSource.getDataSource("queryClxzSql", {
            fid: $stateParams.fid
        }, function (data) {
            $scope.dataZpywSource = data;
            $scope.isShow = false;
            if ($scope.dataZpywSource.length == 0)
            { $scope.isShow = true; }
        });
    };
    $scope.loadmeDatas();

    $scope.loadData = function (item) {
        //xsf.open($rootScope.AppConfig.clxzPath + item.filename); //"中央党校测试报告0828.docx"
        //downService.cordovaDown($rootScope.AppConfig.clxzPath + item.filename, item.filename);
        //alert(downService.getRootPath() + item.filename);
        //downService.cordovaDown(downService.getRootPath() + "/api/getAttach/action/getAttach/" + item.filename, item.filename);
        //xsfWindow.open($rootScope.AppConfig.rootPath + "/api/getAttach/action/getAttach/" + item.filename, "", true);
        //$http.get("../api/getAttach/action/getAttach/" + window.localStorage.userid).then(function (data) {
        //    var noticeData = data.data;
        //});
        //xsfRecord.start("http://218.80.199.107:9901/CollegeAPP/staticresource/attach/" + item.filename);
        //window.location.href = "";
        //$http.post("../api/getFile/"+ item.id).then(function (data) {
        //    alert("下载成功");
        //});
        showAlert.showLoading(50000, "下载中...");
        var url = $rootScope.AppConfig.clxzPath + item.filename;
        var filePath = tempDir + item.filename;
        var downlaoder = xsfHttp.download(url, filePath,
                       function (result) {
                           showAlert.hideLoading();
                           xsf.open("file://" + tempDir + item.filename);
                       },
                       function (error) {
                           showAlert.hideLoading();
                           showAlert.showToast("文件无法下载");
                       }
                       );
        downlaoder.onprogress = function (progressEvent) {
            if (progressEvent.lengthComputable) {
                //alert("" + progressEvent.total + "/" + progressEvent.loaded);
            }

        }
    }

    $scope.loadDataType = function (fileName) {
        var fileType = (fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length)).toLowerCase();

        if (fileType == "xlsx" || fileType == "xls") {
            return "../img/Excel.png";
        }
        else if (fileType == "docx" || fileType == "doc") {
            return "../img/Word.png";
        } else if (fileType == "mp3") {
            return "../img/muisc.png";
        } else if (fileType == "mp4") {
            return "../img/iph.png";
        } else if (fileType == "ppt") {
            return "../img/PowerPoint.png";
        }
        else {
            return "../img/txt.png";
        }
    }

    $scope.doRefresh = function () {
        $scope.moreDataCanBeLoaded = true;
        $scope.index = 1;
        $scope.dataZpywSource = [];
        $scope.loadmeDatas();
        $scope.$broadcast("scroll.refreshComplete");
    };
})

     // 教学资料页面 
.controller("jxzlController", function ($scope, Restangular, $state, $rootScope, getDataSource,$ionicHistory, $http, $stateParams, showAlert) {
    showAlert.hideLoading();
    var tempDir = "";
    var user = JSON.parse(localStorage.user);
    if (!user.formweixin) {
        xsf.getDeviceInfo(function (info) {
            //alert("info:" + info)
            //alert(info.WORK_DIR)
            tempDir = info.TEMP_DIR;
        });
    }
    $scope.goMain = function () {
        if (!user.formweixin) {
            $ionicHistory.goBack();
        }
        else {
            $state.go("app.main");
    }
    }
                // 页面加载数据
    $scope.loadmeDatas = function () {

        var queryKcId = $stateParams.kcid;

        if (!$stateParams.kcid) {            
            queryKcId =  user.classid;
            }

        getDataSource.getDataSource("queryJxzlSql", {
            bcid: queryKcId
            }, function (data) {
                $scope.dataZpywSource = data;
        });
        };
    $scope.loadmeDatas();

    $scope.loadData = function (item) {
        //xsf.open($rootScope.AppConfig.jxzlPath + filename);
        if (!$rootScope.formweixin) {
            showAlert.showLoading(50000, "下载中...");
        }
        var filetype = item.nrtype;
        var filename = "";
        var url = "";
        var filePath = tempDir;
        if (filetype == "0") {
            var index = item.nrbt.lastIndexOf(".");
            filename = item.info_id +item.nrbt.substr(index, item.nrbt.length);
            //xsf.open($rootScope.AppConfig.jxzlPath + filename); //"123.doc"
            // window.location.href = "../api/getAttach/action/getAttach/" + Base64.encode(filename) + "/" + item.nrtype;
            url = $rootScope.AppConfig.getFilepath +Base64.encode(filename) + "/" +item.nrtype;
            filePath += filename;
        }
        else {
            //xsf.open($rootScope.AppConfig.kcjxzlPath + filename); //"123.doc"
            //window.location.href = "../api/getAttach/action/getAttach/" + Base64.encode(item.filepath) + "/" + item.nrtype;
            var index = item.filepath.lastIndexOf("\\");
            filename = item.filepath.substr(index, item.filepath.length);
            url = $rootScope.AppConfig.getFilepath +Base64.encode(item.filepath) + "/" +item.nrtype;
        }
        if ($rootScope.formweixin) {
            //$state.go("other", { url: encodeURI(url) });
            //window.location.href = url;
            window.open(url);
        }
        else {
            var downlaoder = xsfHttp.download(url, filePath,
                                       function (result) {
                                           showAlert.hideLoading();
                                           xsf.open("file://" +tempDir +filename);
        },
                                       function (error) {
                                           showAlert.hideLoading();
                                           showAlert.showToast("文件无法下载");
        }
                                       );
            downlaoder.onprogress = function (progressEvent) {
                if (progressEvent.lengthComputable) {
                //alert("" + progressEvent.total + "/" + progressEvent.loaded);
        }
    }
    }

    }

$scope.loadDataType = function (fileName) {
    var fileType = (fileName.substring(fileName.lastIndexOf(".") +1, fileName.length)).toLowerCase();

    if (fileType == "xlsx" || fileType == "xls") {
        return "../img/Excel.png";
        }
        else if (fileType == "docx" || fileType == "doc") {
            return "../img/Word.png";
            } else if (fileType == "mp3") {
                return "../img/muisc.png";
                } else if (fileType == "mp4") {
                    return "../img/iph.png";
                    } else if (fileType == "ppt") {
                        return "../img/PowerPoint.png";
                    } else {
                        return "../img/txt.png";
        }
        }

    $scope.doRefresh = function () {
        $scope.moreDataCanBeLoaded = true;
        $scope.index = 1;
        $scope.dataZpywSource =[];
        $scope.loadmeDatas();
        $scope.$broadcast("scroll.refreshComplete");
    };
})
 // 调查问卷学生页面 
.controller("dcwjStudentController", function ($scope, Restangular, $state, $rootScope, getDataSource,$ionicHistory, $stateParams, $filter, showAlert) {
    var token = "";
    showAlert.hideLoading();
    $rootScope.user = JSON.parse(localStorage.user);
    // 页面加载数据
    $scope.loadmeDatas = function () {
        var user = $rootScope.user;
        var kssj = $filter('date')(user.kssj, 'yyyy-MM-dd');
        var jssj = $filter('date')(user.jssj, 'yyyy-MM-dd');
        getDataSource.getDataSource(["queryNoQuestionList", "queryHasQuestionList"], { classid_z: $rootScope.user.classid.toString(), uid_z: $rootScope.user.info_id.toString(), type: $stateParams.type }, function (data) {
            //$scope.dataDcwjSource = data[0].data;
            $scope.dataHasDcwjSource = data[1].data;
            $scope.dataDcwjSource = [];
            var date = $filter('date')(new Date(), 'yyyy-MM-dd');

            _.forEach(data[0].data, function (m, key) {
                if (m.type == 1 && m.ispublic == 0) {
                    $scope.dataDcwjSource.push(m);
                }
                else if (date < kssj) {
                    if (m.type == 2) {
                        $scope.dataDcwjSource.push(m);
                    }
                }
                else if (date >= kssj && date <= jssj) {
                    if (m.type == 3 || m.type == 2) {
                        $scope.dataDcwjSource.push(m);
                    }
                } else if (date > jssj) {
                    $scope.dataDcwjSource.push(m);
                }
            });
            $scope.wpnum = $scope.dataDcwjSource.length;
            $scope.ypnum = $scope.dataHasDcwjSource.length;
            _.find($rootScope.iconvalArray, function (d) {
                return d.key == "studentcount";
            }).val = $scope.dataDcwjSource.length;
            console.log($rootScope.iconvalArray);
        });

        $(document).ready(function () {
            $.ajax({
                type: 'get',
                data: { name: 'admin', psd: '96e79218965eb72c92a549dd5a330112' },//name:登录名，psd:加密过后的密码
                url: $rootScope.AppConfig.openDcwj + "/DSFA/survey/api",
                dataType: 'JSON',
                async: false,
                success: function (data) {
                    token = data.token;
                }
            })

        })
    };
    $scope.loadmeDatas();

    $scope.doRefresh = function () {
        $scope.loadmeDatas();
        $scope.$broadcast("scroll.refreshComplete");
    };

    $scope.goBack = function ()
    {
        $ionicHistory.goBack();
    }

    $scope.goMain = function () {
        if (!$rootScope.user.formweixin) {
            $ionicHistory.goBack();
        }
        else {
            $state.go("app.main");
        }
    }

    $scope.gotoDetail = function (item) {
        //var ret=xsfWindow.open1($rootScope.AppConfig.openDcwj + "/DSFA/admin_client/questionnaire/moblie/views/questionnaire.html?q=" + item.dataflag + "&uid=" + $rootScope.user.info_id + "&cid=" + $rootScope.user.classid + "&token=" + token, "");
        if ($rootScope.user.formweixin) {
            var wjUrl = $rootScope.AppConfig.openDcwj + "/DSFB/admin_client/questionnaire/moblie/wenjuan/views/index.html?uid=" +$rootScope.user.info_id + "&cid=" +$rootScope.user.classid + "&token=" + token + '#/goWj/' +item.dataflag + '//';
            //$state.go("other", { url: encodeURI(wjUrl) });
            window.open(wjUrl);
        }
        else {
            var ref = xsfWindow.open($rootScope.AppConfig.openDcwj + "/DSFA/admin_client/questionnaire/moblie/wenjuan/views/index.html?uid=" +$rootScope.user.info_id + "&cid=" +$rootScope.user.classid + "&token=" + token + '#/goWj/' +item.dataflag + '//', '', true);
            ref.addEventListener('exit', function (event) {
                $scope.loadmeDatas();
        });
    }
    }
})
     // 调查问卷老师页面 
.controller("dcwjTeacherController", function ($scope, Restangular, $state, $rootScope, getDataSource, $stateParams) {
    var token = "";
    // 页面加载数据
    $scope.loadmeDatas = function () {
        $(document).ready(function () {
            $.ajax({
                type: 'get',
                data: { name: 'admin', psd: '96e79218965eb72c92a549dd5a330112' },//name:登录名，psd:加密过后的密码
                url: $rootScope.AppConfig.openDcwj + "/DSFA/survey/api",
                dataType: 'JSON',
                async: false,
                success: function (data) {
                    token = data.token;
                }
            })

        })

        getDataSource.getDataSource("queryQuestionCountList", { classid: $rootScope.user.classid, type: $stateParams.type }, function (data) {
            $scope.dataDcwjSource = data;
        });
    };
    $scope.loadmeDatas();

    $scope.doRefresh = function () {
        $scope.loadmeDatas();
        $scope.$broadcast("scroll.refreshComplete");
    };

    $scope.gotoDetail = function (item) {
        //window.open("http://10.100.2.32:9901/DSFA/admin_client/questionnaire/analyze/views/index.html?id=" + item.id + "&token=11");
        $.ajax({
            url: $rootScope.AppConfig.openDcwj + '/DSFA/survey/api',
            data: { method: "checkToken", token: token },
            type: "post",
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.errmsg != 'ok') {
                    $scope.loadmeDatas();
                    if ($rootScope.formweixin) {
                        var wjUrl = $rootScope.AppConfig.openDcwj + "/DSFA/admin_client/questionnaire/analyze/views/index.html?id=" + item.id + "&uid=" + $rootScope.user.info_id + "&cid=" + $rootScope.user.classid + "&token=" + token;
                        $state.go("other", { url: encodeURI(wjUrl) });
                    } else {
                        var ref = xsfWindow.open($rootScope.AppConfig.openDcwj + "/DSFA/admin_client/questionnaire/analyze/views/index.html?id=" + item.id + "&uid=" + $rootScope.user.info_id + "&cid=" + $rootScope.user.classid + "&token=" + token, '', true);
                    }
                }
                else {
                    if ($rootScope.formweixin) {
                        var wjUrl = $rootScope.AppConfig.openDcwj + "/DSFA/admin_client/questionnaire/analyze/views/index.html?id=" + item.id + "&uid=" + $rootScope.user.info_id + "&cid=" + $rootScope.user.classid + "&token=" + token;
                        $state.go("other", { url: encodeURI(wjUrl) });
                    }
                    else {
                        var ref = xsfWindow.open($rootScope.AppConfig.openDcwj + "/DSFA/admin_client/questionnaire/analyze/views/index.html?id=" + item.id + "&uid=" + $rootScope.user.info_id + "&cid=" + $rootScope.user.classid + "&token=" + token, '', true);
                    }
                }
            }
        })
    }

    $scope.gotoPerson = function (item) {
        $state.go("choosestudentlist", { type: 15, id: item.id });
    }
    $scope.gotoHasPerson = function (item) {
        $state.go("choosestudentlist", { type: 16, id: item.id });
    }
})
// 调查问卷未提交学员页面 
.controller("answerQuestionController", function ($scope, Restangular, $state, $rootScope, getDataSource, $stateParams) {

    // 页面加载数据
    $scope.loadmeDatas = function () {
        getDataSource.getDataSource("getAnswerQuestion", {
            cid: $rootScope.user.classid, qid: $stateParams.qid
        }, function (data) {
            console.log(data);
            $scope.dataDcwjSource = data;
        });
    };
    $scope.loadmeDatas();
})
    // 调查问卷管理页面 
.controller("dcwjAddController", function ($scope, Restangular, $state, $rootScope, getDataSource) {
    // 页面加载数据
    $scope.loadmeDatas = function () {

        var zpyw = Restangular.one("../TestJSON/zpyw.json");
        zpyw.get().then(function (Data) {
            $scope.dataZpywSource = Data;
        });

        //getDataSource.getDataSource("queryJxzlSql", { bcid: $rootScope.user.classid }, function (data) {
        //    $scope.dataZpywSource = data;
        //});
    };
    $scope.loadmeDatas();

    //$http.post("../api/getAttach/action/getAttach/a2a2ae39-bff1-46f0-860b-71d51e72c013.mp4").then(function (data) {
    //    //$rootScope.leftmenus = data.data;
    //});


})
     // 移动教学新页面 
.controller("ydjxNewController", function ($scope, Restangular, $state, $rootScope, getDataSource) {
    //getDataSource.getDataSource("doLogServer", { content: "移动教学" }, function () { });
    // 页面加载数据
    $scope.loadmeDatas = function () {

        var zpyw = Restangular.one("../TestJSON/zpyw.json");
        zpyw.get().then(function (Data) {
            $scope.dataZpywSource = Data;
        });

    };
    $scope.loadmeDatas();

    $scope.goydjxList = function (VideoType) {
        $state.go("ydjxList", { type: VideoType });
    }
    $scope.goYDList = function (VideoType) {
        $state.go("zpNewsList", { type: VideoType });
    }
    $scope.goZJList = function (menuname, i, info_id) {
        if ($rootScope.AppConfig.hasZJlist) {
            if (menuname == 1) {
                $state.go("ydjxzj", { index: i });
            }
            else {
                $state.go("ydjxydhzj", { index: i });
            }
            $rootScope.ZJIndex = i;
        } else {
            $state.go("ydjxzjlist", { menuid: info_id });
        }
    };
    $scope.goZJNewList = function (info_id) {
        $state.go("ydjxzjlist", { menuid: info_id });
    };
})
      // 播放maka页面 
.controller("otherController", function ($timeout, $http, $scope, Restangular, $state, $rootScope, $stateParams) {
    var url = decodeURI($stateParams.url);
    $scope.url = url;
    $(function () {
        $timeout(function () {
            //alert(document.body.scrollHeight);
            var height = document.body.scrollHeight - 43;
            $("#myiframe").css("height", height);
            $("#myiframe").css("width", "100%");
            //alert(height);
            $("#myiframe").attr("src", $scope.url);
        }, 1500);

        //$http.jsonp(url)
        //.success(
        //    function (data, status, header, config) {

        //        alert(data);
        //    }
        //)
        //.error(
        //    function (data) {
        //        alert("error");
        //    }
        //);
        //$("#mypage").load(url);
        //window.location.href = url;
        //window.open(url);
    })
})
    // 我的订阅页面 
.controller("mymarkController", function ($scope, Restangular, $state, $rootScope, $stateParams, goDetail, getDataSource) {
    getDataSource.getDataSource("doLogServer", { content: "我的订阅" }, function () { });
    // 加载用户数据
    var user = $rootScope.user;
    // 页面加载数据
    $scope.loadmeDatas = function () {
        getDataSource.getDataSource("getMyMark", { userid: user.info_id }, function (data) {

            var dataImag = "";
            for (var i = 0; i < data.length; i++) {
                dataImag = data[i].title_pic;
                if (dataImag && dataImag !== null && dataImag !== "") {
                    var index = dataImag.lastIndexOf(".");
                    data[i].title_pic = dataImag.substr(0, index) + "_small" + dataImag.substr(index, dataImag.length);
                }
                $scope.dataZpywSource.push(data[i]);
            }
        });
    };
    $scope.dataZpywSource = [];
    $scope.loadmeDatas();

    $scope.goZJList = function (info_id) {
        $state.go("ydjxzjlist", { menuid: info_id });
    };
    $scope.dingYue = function (item) {
        var formData = { userid: user.info_id, username: user.username, finfo_id: item.info_id, ismark: 1, isgood: 0, islike: 0, comtype: 1 };
        getDataSource.getDataSource("cancelDingyue", formData, function (data) {
            item.ismark = 0;
        });
        $scope.dataZpywSource = [];
        $scope.loadmeDatas();
    };
    $scope.doRefresh = function () {
        $scope.dataZpywSource = [];
        $scope.loadmeDatas();
        $scope.$broadcast("scroll.refreshComplete");
    };
})
       // 我的收藏 
.controller("mylikeController", function ($scope, Restangular, $state, $rootScope, $stateParams, getDataSource, goDetail) {
    getDataSource.getDataSource("doLogServer", { content: "我的收藏 " }, function () { });

    // 加载用户数据
    var user = $rootScope.user;
    // 页面加载数据
    $scope.loadmeDatas = function () {
        getDataSource.getDataSource("getMyLikeList", { userid: user.info_id, pagecount: $scope.index, rowcount: "8" }, function (data) {

            var dataImag = "";
            if (data.length == 0) {
                $scope.moreDataCanBeLoaded = false;
            }
            for (var i = 0; i < data.length; i++) {
                dataImag = data[i].title_pic;
                if (dataImag && dataImag !== null && dataImag !== "") {
                    var index = dataImag.lastIndexOf(".");
                    data[i].title_pic = dataImag.substr(0, index) + "_small" + dataImag.substr(index, dataImag.length);
                }
                $scope.dataZpywSource.push(data[i]);
            }
        });
    };
    $scope.index = 0;
    $scope.isShow = false;
    //$scope.loadmeDatas();
    $scope.dataZpywSource = [];
    $scope.moreDataCanBeLoaded = true;

    $scope.loadTitle = $stateParams.type;

    $scope.doRefresh = function () {
        $scope.moreDataCanBeLoaded = true;
        $scope.index = 1;
        $scope.dataZpywSource = [];
        $scope.loadmeDatas();
        $scope.$broadcast("scroll.refreshComplete");
    };

    $scope.loadMore = function () {
        $scope.index = $scope.index + 1;
        $scope.loadmeDatas();
        $scope.$broadcast("scroll.infiniteScrollComplete");
    }

    $scope.Addgood = function (item) {
        var formData = { userid: user.info_id, username: user.username, finfo_id: item.info_id, ismark: 0, isgood: 1, islike: 0, comtype: 2 };
        getDataSource.getDataSource("queryMyComment", formData, function (data) {
            // 已点赞
            if (data.length == 0) {
                getDataSource.getDataSource("Insert_myComment", formData, function (data) {
                    item.isgood = 1;
                    item.goodcount = item.goodcount + 1;
                });
            }
        });
    };
    $scope.Addlike = function (item) {
        var formData = { userid: user.info_id, username: user.username, finfo_id: item.info_id, ismark: 0, isgood: 0, islike: 1, comtype: 3 };
        getDataSource.getDataSource("queryMyComment", formData, function (data) {
            // 已收藏
            if (data.length > 0) {
                getDataSource.getDataSource("cancelDingyue", formData, function (data) {
                    item.islike = 0;
                    item.docucount = item.docucount - 1;
                });
            }
            else {
                getDataSource.getDataSource("Insert_myComment", formData, function (data) {
                    item.islike = 1;
                    item.docucount = item.docucount + 1;
                });
            }
        });
    };

    $scope.goNewsDetail = function (item) {
        getDataSource.getDataSource(["updatePlayCount", "updateVideoPlayCount"], { info_id: item.info_id }, function (data) {
            item.playcount = item.playcount + 1;
        });
        goDetail.goNewsDetail(item);
    }
})
      // 微课程专辑页面 
.controller("ydjxZjController", function ($scope, Restangular, $state, $rootScope, getDataSource, showAlert, $stateParams, $ionicSlideBoxDelegate, $timeout) {
    // 加载用户数据
    var user = $rootScope.user;
    // 页面加载数据
    $scope.loadmeDatas = function (funName, titlename) { //$stateParams.type
        getDataSource.getDataSource(funName, { title: titlename, userid: user.info_id }, function (data) {
            $scope.dataZpywSource = [];
            var dataImag = "";
            if (data.length == 0) {
                $scope.moreDataCanBeLoaded = false;
            }
            for (var i = 0; i < data.length; i++) {
                dataImag = data[i].title_pic;
                if (dataImag && dataImag !== null && dataImag !== "") {
                    var index = dataImag.lastIndexOf(".");
                    data[i].title_pic = dataImag.substr(0, index) + "_small" + dataImag.substr(index, dataImag.length);
                }
                if (data[i].bcid != null) {
                    // 判断信息推送是否所属该班级 课程数-1
                    var classdata = data[i].bcid.split(',');
                    for (var j = 0; j < classdata.length; j++) {
                        if (classdata[j].lastIndexOf($rootScope.user.classid) == -1) {
                            data[i].videocount = data[i].videocount - 1;
                        }
                    }
                }
                $scope.dataZpywSource.push(data[i]);
            }
        });
    };

    $scope.changeIndex = function (index) {
        for (var i = 1; i <= 5; i++) {
            $("#tab" + i).attr("class", "button ydjx1-bar-but");
        }
        switch (index) {
            case 1:
                $scope.titleName = "微讲座";
                break;
            case 2:
                $scope.titleName = "微视频";
                break;
            case 3:
                $scope.titleName = "微案例";
                break;
            case 4:
                $scope.titleName = "微现场";
                break;
            case 5:
                $scope.titleName = "微论坛";
                break;
            default:
        }
        $rootScope.ZJIndex = index;
        $("#btn1").attr("class", "button button-c00");
        $("#btn2").attr("class", "button button-fff");
        $("#tab" + index).attr("class", "button ydjx1-bar-but ydjx1-bar-but-active");
        $scope.loadmeDatas('getZJlistByCount', $scope.titleName);
    };

    if ($stateParams.titlename != "") {
        $scope.showindex = true;
        $scope.checkIndex = $stateParams.index;
        $scope.changeIndex(parseInt($rootScope.ZJIndex));
        $scope.loadTitle = "微课程";
    }
    else {
        $scope.titleName = "微讲座";
    }
    $scope.orderbyText = "getZJlistByCount";

    $scope.changeBtnIndex = function (index) {
        if (index == 1) {
            $scope.orderbyText = "getZJlistByCount";
            $("#btn1").attr("class", "button button-c00");
            $("#btn2").attr("class", "button button-fff");
        }
        else {
            $scope.orderbyText = "getZJlistByTime";
            $("#btn1").attr("class", "button button-c00-off");
            $("#btn2").attr("class", "button button-fff-on");
        }
        $scope.loadmeDatas($scope.orderbyText, $scope.titleName);
    };

    $scope.goZJList = function (info_id) {
        $state.go("ydjxzjlist", { menuid: info_id });
    };

    $scope.loadmeDatas('getZJlistByCount', $scope.titleName);

    $scope.dingYue = function (item) {
        var formData = { userid: user.info_id, username: user.username, finfo_id: item.info_id, ismark: 1, isgood: 0, islike: 0, comtype: 1 };
        getDataSource.getDataSource("queryMyComment", formData, function (data) {
            if (data.length == 0) {
                getDataSource.getDataSource("Insert_myComment", formData, function (data) {
                    //$scope.loadmeDatas($scope.orderbyText, $scope.titleName);
                    item.ismark = 1;
                });
            }
            else {
                getDataSource.getDataSource("cancelDingyue", formData, function (data) {
                    item.ismark = 0;
                });
            }
        });
    };

    $scope.doRefresh = function () {
        $scope.loadmeDatas($scope.orderbyText, $scope.titleName);
        $scope.$broadcast("scroll.refreshComplete");
    };
})
       // 悦读会专辑页面 
.controller("ydjxYdhZjController", function ($scope, Restangular, $state, $rootScope, getDataSource, showAlert, $stateParams, $ionicSlideBoxDelegate, $ionicScrollDelegate, $timeout) {
    // 加载用户数据
    var user = $rootScope.user;
    // 页面加载数据
    $scope.loadmeDatas = function (funName, titlename) { //$stateParams.type
        getDataSource.getDataSource(funName, { title: titlename, userid: user.info_id }, function (data) {
            $scope.dataZpywSource = [];
            var dataImag = "";
            if (data.length == 0) {
                $scope.moreDataCanBeLoaded = false;
            }
            for (var i = 0; i < data.length; i++) {
                dataImag = data[i].title_pic;
                if (dataImag && dataImag !== null && dataImag !== "") {
                    var index = dataImag.lastIndexOf(".");
                    data[i].title_pic = dataImag.substr(0, index) + "_small" + dataImag.substr(index, dataImag.length);
                }

                if (data[i].bcid != null) {
                    // 判断信息推送是否所属该班级 课程数-1
                    var classdata = data[i].bcid.split(',');
                    for (var j = 0; j < classdata.length; j++) {
                        if (classdata[j].lastIndexOf($rootScope.user.classid) == -1) {
                            data[i].videocount = data[i].videocount - 1;
                        }
                    }
                }
                $scope.dataZpywSource.push(data[i]);
            }
        });
    };

    $scope.changeIndex = function (index) {
        for (var i = 1; i <= 5; i++) {
            $("#ydh" + i).attr("class", "button ydjx1-bar-but");
        }
        switch (index) {
            case 1:
                $scope.titleName = "学“习”思考";
                break;
            case 2:
                $scope.titleName = "党性教育故事";
                break;
            case 3:
                $scope.titleName = "改革开放史";
                break;
            case 4:
                $scope.titleName = "论著导读";
                break;
            case 5:
                $scope.titleName = "信息推送";
                break;
            default:
        }
        $("#btn1").attr("class", "button button-c00");
        $("#btn2").attr("class", "button button-fff");
        $("#ydh" + index).attr("class", "button ydjx1-bar-but ydjx1-bar-but-active");
        $rootScope.ZJIndex = index;
        $scope.loadmeDatas('getZJlistByCount', $scope.titleName);
    };

    if ($stateParams.titlename != "") {
        $scope.showindex = true;
        $scope.checkIndex = $stateParams.index;
        $scope.changeIndex(parseInt($rootScope.ZJIndex));

        $scope.loadTitle = "悦读会";

        // 定位到当前tab页
        $timeout(function () {
            $ionicSlideBoxDelegate.slide(parseInt($stateParams.index));
            $ionicScrollDelegate.$getByHandle('small').scrollTo(50 * (parseInt($stateParams.index) - 1), 0);
        }, 100);
    }
    else {
        $scope.titleName = "微讲座";
    }
    $scope.orderbyText = "getZJlistByCount";

    $scope.changeBtnIndex = function (index) {
        if (index == 1) {
            $scope.orderbyText = "getZJlistByCount";
            $("#btn1").attr("class", "button button-c00");
            $("#btn2").attr("class", "button button-fff");
        }
        else {
            $scope.orderbyText = "getZJlistByTime";
            $("#btn1").attr("class", "button button-c00-off");
            $("#btn2").attr("class", "button button-fff-on");
        }
        $scope.loadmeDatas($scope.orderbyText, $scope.titleName);
    };

    $scope.goZJList = function (info_id) {
        $state.go("ydjxzjlist", { menuid: info_id });
    };

    $scope.loadmeDatas('getZJlistByCount', $scope.titleName);

    $scope.dingYue = function (item) {
        var formData = { userid: user.info_id, username: user.username, finfo_id: item.info_id, ismark: 1, isgood: 0, islike: 0, comtype: 1 };
        getDataSource.getDataSource("queryMyComment", formData, function (data) {
            if (data.length == 0) {
                getDataSource.getDataSource("Insert_myComment", formData, function (data) {
                    //$scope.loadmeDatas($scope.orderbyText, $scope.titleName);
                    item.ismark = 1;
                });
            }
            else {
                getDataSource.getDataSource("cancelDingyue", formData, function (data) {
                    item.ismark = 0;
                });
            }
        });
    };

    $scope.doRefresh = function () {
        $scope.loadmeDatas($scope.orderbyText, $scope.titleName);
        $scope.$broadcast("scroll.refreshComplete");
    };
})
      // 专辑详细页面 
.controller("ydjxZjListController", function ($scope, Restangular, $state, $rootScope, getDataSource, $stateParams, goDetail, $ionicTabsDelegate, $timeout) {
    // 加载用户数据
    var user = $rootScope.user;
    // 页面加载数据
    $scope.loadmeDatas = function () {
        getDataSource.getDataSource("getZJNewList", { menuid: $stateParams.menuid, pagecount: $scope.index, rowcount: "8", userid: user.info_id }, function (data) {

            var dataImag = "";
            if (data.length == 0) {
                $scope.moreDataCanBeLoaded = false;
            }
            for (var i = 0; i < data.length; i++) {
                dataImag = data[i].title_pic;
                if (dataImag && dataImag !== null && dataImag !== "") {
                    var index = dataImag.lastIndexOf(".");
                    data[i].title_pic = dataImag.substr(0, index) + "_small" + dataImag.substr(index, dataImag.length);
                }
                // 判断信息推送是否所属该班级
                if (data[i].bcid == null) {
                    $scope.dataZpywSource.push(data[i]);
                } else if (data[i].bcid.lastIndexOf($rootScope.user.classid) > -1) {
                    $scope.dataZpywSource.push(data[i]);
                }
            }
        });
    };
    $scope.index = 0;
    $scope.isShow = false;
    $scope.dataZpywSource = [];
    $scope.titleList = "";
    $scope.authorList = "";

    var isIOS = ionic.Platform.isIOS();
    var isAndroid = ionic.Platform.isAndroid();
        $scope.marTop = "margin-top:0px";
        $scope.marLeft = "";
    if (isAndroid) {
        $scope.marTop = "margin-top:0px";
        }
    if (isIOS) {
        $scope.marTop = "margin-top:20px";
        $scope.marLeft = "margin-left:75.5%";
        }

    $scope.moreDataCanBeLoaded = true;
    // 定位到当前列表页
    $timeout(function () {
        $ionicTabsDelegate.select(1);
    }, 100);

    if ($stateParams.menuid == "28") {
        $scope.leftTitle = "直播预告";
        $scope.rightTitle = "历史直播";
        $scope.isShow = true;
    }
    else {
        $scope.leftTitle = "简介";
        $scope.rightTitle = "相关课程";
    }

    getDataSource.getDataSource(["getZJDetail", "getAuthorList"], { menuid: $stateParams.menuid }, function (data) {

        if (data[0].data[0].length != 0) {
            $scope.zjDetail = data[0].data[0];
        }
        for (var i = 0; i < data[1].data.length; i++) {
            if ($scope.titleList.lastIndexOf(data[1].data[i].keyword) == -1 && data[1].data[i].keyword != null) {
                $scope.titleList += data[1].data[i].keyword + ", ";
            }

            if ($scope.authorList.lastIndexOf(data[1].data[i].author) == -1) {
                $scope.authorList += data[1].data[i].author + ", ";
            }
        }
    });

    $scope.loadTitle = $stateParams.type;

    $scope.doRefresh = function () {
        $scope.moreDataCanBeLoaded = true;
        $scope.index = 1;
        $scope.dataZpywSource = [];
        $scope.loadmeDatas();
        $scope.$broadcast("scroll.refreshComplete");
    };

    $scope.loadMore = function () {
        $scope.index = $scope.index + 1;
        $scope.loadmeDatas();
        $scope.$broadcast("scroll.infiniteScrollComplete");
    }

    $scope.Addgood = function (item) {
        var formData = { userid: user.info_id, username: user.username, finfo_id: item.info_id, ismark: 0, isgood: 1, islike: 0, comtype: 2 };
        getDataSource.getDataSource("queryMyComment", formData, function (data) {
            // 已点赞
            if (data.length == 0) {
                getDataSource.getDataSource("Insert_myComment", formData, function (data) {
                    item.isgood = 1;
                    item.goodcount = item.goodcount + 1;
                });
            }
        });
    };
    $scope.Addlike = function (item) {
        var formData = { userid: user.info_id, username: user.username, finfo_id: item.info_id, ismark: 0, isgood: 0, islike: 1, comtype: 3 };
        getDataSource.getDataSource("queryMyComment", formData, function (data) {
            // 已收藏
            if (data.length > 0) {
                getDataSource.getDataSource("cancelDingyue", formData, function (data) {
                    item.islike = 0;
                    item.docucount = item.docucount - 1;
                });
            }
            else {
                getDataSource.getDataSource("Insert_myComment", formData, function (data) {
                    item.islike = 1;
                    item.docucount = item.docucount + 1;
                });
            }
        });
    };
    $scope.Deletelike = function (item) {
        var formData = { userid: user.info_id, finfo_id: item.info_id, comtype: 3 };
        getDataSource.getDataSource("queryMyComment", formData, function (data) {
            // 已收藏
            if (data.length > 0) {
                getDataSource.getDataSource("cancelDingyue", formData, function (data) {
                    item.islike = 0;
                    item.docucount = item.docucount - 1;
                });
            }
            else {
                getDataSource.getDataSource("Insert_myComment", formData, function (data) {
                    item.islike = 1;
                    item.docucount = item.docucount + 1;
                });
            }
        });
    };

    $scope.goNewsDetail = function (item) {
        getDataSource.getDataSource(["updatePlayCount", "updateVideoPlayCount"], { info_id: item.info_id }, function (data) {
            item.playcount = item.playcount + 1;
        });
        goDetail.goNewsDetail(item);
    }
})
    // 移动教学详情页面 
.controller("ydjxDetailController", function ($scope, Restangular, $state, $rootScope, getDataSource, $stateParams, $sce, $timeout, $dateService) {
    $scope.fontSize = "1.5em";
    // 日期转换
    $scope.parseDate = function (dataString) {
        if (dataString) {
            return $dateService.parse(dataString);
        }
        else {
            return "";
        }
    }
    // 页面加载数据
    $scope.loadmeDatas = function () {

        //var zpyw = Restangular.one("../TestJSON/ydjxDetail.json");
        //zpyw.get().then(function (Data) {
        //    $scope.dataZpywSource = Data;
        //    $("#wishContent").html(Data.content);
        //});

        getDataSource.getDataSource("getNewDetail", {
            id: $stateParams.id
        }, function (data) {
            $scope.dataZpywSource = data[0];
            $scope.dataZpywSource.content = $sce.trustAsHtml(data[0].content);
            $scope.loadVideo();

            $timeout(function () {
                $("#wishContent p").attr("style", "line-height:28px;");
                $("#wishContent img").attr("style", "width:100%;");
            }, 400);
        });
    }();

    $scope.fontSizeFun = function () {
        if ($scope.fontSize == "1.9em") {
            $scope.fontSize = "1.5em";
            $("#wishContent p").attr("style", "line-height:22px;");
        }
        else if ($scope.fontSize == "1.5em") {
            $scope.fontSize = "1.7em";
            $("#wishContent p").attr("style", "line-height:28px;");
        }
        else {
            $scope.fontSize = "1.9em";
            $("#wishContent p").attr("style", "line-height:35px;");
        }
    };
    $scope.onPlayerReady = function (API) {
        $scope.API = API;
        //$timeout(function () {
        //    API.toggleFullScreen();
        //    API.play();
        //}, 1000)

    }
    $scope.loadVideo = function () {
        $scope.controller = {
        };
        $scope.controller.API = null;

        $scope.controller.config = {
            sources: [{
                src: $sce.trustAsResourceUrl($scope.AppConfig.videoPlayPath + $scope.dataZpywSource.videopath), type: "video/mp4"
            }],
            theme: "../bower_components/videogular-themes-default/videogular.css",
            plugins: {
                analytics: {
                    category: "Videogular",
                    label: "Main",
                    events: {
                        ready: true,
                        play: true,
                        pause: true,
                        stop: true,
                        complete: true,
                        progress: 10
                    }
                }
            }
        };
    }
    $scope.goDetail = function (index, item) {
        console.log($rootScope.AppConfig.videoPlayPath + item.videopath);
        //xsf.playVideo($rootScope.AppConfig.videoPlayPath + item.videopath);
        //$scope.controller.config.sources = $scope.sources[index];
        //$scope.controller.config.tracks = undefined;
        //$scope.controller.config.loop = false;
        //$scope.controller.config.preload = true;
        //$timeout(function () {
        //    $scope.API.toggleFullScreen();
        //    $scope.API.play();
        //}, 500);

        //$scope.loadVideo(item.videopath);
        //$scope.loadVideo(item.videopath);
    }
});