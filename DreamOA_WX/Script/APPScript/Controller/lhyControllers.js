APPController.controller("testDataController", function ($scope, getDataSource) {
    //$scope.textValue = "123";12222
    //$scope.myValue = "3213213211";
})
.controller("autoLoginController", function ($scope, $state, $sms, $rootScope, showAlert, $interval,Restangular, getDataSource, userHelp, $stateParams) {

})
.controller("loginMobileController", function ($scope, $state, $sms, $rootScope, showAlert, $interval, getDataSource, userHelp, User, $ionicLoading ) {

    $scope.loginData = {};
    $scope.loginData.logname = '';
    $scope.loginData.password = '';

    $scope.login = function () {
        $ionicLoading.show({
            template: '加载中...'
        });
        if ($scope.loginData.logname == "") {
            showAlert.showToast("请输入用户名");
            $ionicLoading.hide();
            return;
        }
        if ($scope.loginData.password == "") {
            showAlert.showToast("请输入密码");
            $ionicLoading.hide();
            return;
        }
        var promise = User.login($scope.loginData); // 同步调用，获得承诺接口  
        promise.then(function(data) {
            console.log(data);
            $ionicLoading.hide();
            var rcode = data.rcode;
            if(rcode == 0){//用户名或密码错误
                showAlert.showToast("登录失败 [" + (data.message || "用户名密码错误") + "]");
            }else if(rcode == 1){ //成功
                /*
                $rootScope.user = data[0];
                $rootScope.user.type = "student";
                $rootScope.user.isFirstLogin = true;
                localStorage.user = JSON.stringify($rootScope.user);
                $scope.doLog();
                */
                
                localStorage.userid = data.data.user_id;
                localStorage.username = data.data.name;
                localStorage.deptname = data.data.deptName;
                localStorage.mainUnit =  data.data.root_dept_id;
                localStorage.photo = data.data.photo;
                localStorage.logname = $scope.loginData.logname;
                localStorage.password = $scope.loginData.password;
                localStorage.deptId = data.data.deptId;

                localStorage.version = appVersion; 

                var resultUser = {};
                resultUser.info_id = data.data.user_id;
                $rootScope.user = resultUser;
                $rootScope.user.type = "student";
                $rootScope.user.isFirstLogin = false;
                localStorage.user = JSON.stringify($rootScope.user);

                $state.go("user.mainNewUser");
            }else if(rcode == -1){ //锁定
                showAlert.showToast("登录失败 [" + ("登录失败," + data.message) + "]");
            }
        }, function(data){
            $ionicLoading.hide();
            console.log(data);
        })

    }
})
.controller("selectUserController", function ($scope, $rootScope, getDataSource, $state, $ionicHistory, $stateParams) {
    $scope.type = $stateParams.type;
    $scope.selected = $stateParams.selected.split(',');
    console.log($scope.selected);
    var userarray = new Array();
    getDataSource.getDataSource("getXyList", { classid: $rootScope.user.classid, orderbyfield: "sernumber" }, function (data) {
        $scope.users = data;
        angular.forEach($scope.users, function (item) {
            item.checked = false;
            angular.forEach($scope.selected, function (selectedItem) {
                if (selectedItem == item.id) {
                    item.checked = true;
                }
            })
        });
    })
    $scope.ok = function () {
        angular.forEach($scope.users, function (item) {
            if (item.checked) {
                userarray.push(item);
            }
        });
        $rootScope.selectUser = userarray;
        $ionicHistory.goBack();
    }
    $scope.selectone = function (item) {
        if ($scope.type == "single") {
            userarray.push = item;
            $rootScope.selectUser = userarray;
            $ionicHistory.goBack();
        }
    }
})
.controller("tabsController", function ($rootScope, $scope, $ionicSideMenuDelegate, $state, $ionicActionSheet, userHelp, showAlert) {
    $scope.goMain = function () {
        $ionicSideMenuDelegate.toggleLeft();
    }
    $scope.gomenu = function (item) {
        xsfWindow.open("http://viewer.maka.im/k/C83ZUYAL?DSCKID=43968823-2a86-4115-be70-0e9e07779deb&DSTIMESTAMP=1443352715469", "1", true);
        //$state.go(item.state);
    }
    $scope.goSetting = function () {
        $scope.showUserAction();
    }
    $scope.exitApp = function () {
        ionic.Platform.exitApp();
    }
    $scope.safeExitApp = function () {
        localStorage.user = null;
        $scope.exitApp();
    }
    $scope.showUserAction = function () {
        var hideSheet = $ionicActionSheet.show({
            buttons: [
              { text: '个人信息' },
              { text: 'WiFi账户' },
                { text: '安全退出' },
            ],

            cancelText: '取消',
            cancel: function () {
                // add cancel code..
            },
            buttonClicked: function (index) {
                switch (index) {
                    case 0: $state.go("userinfo"); break;
                    case 1: break;
                    case 2: userHelp.safeLogout(); $state.go("loginMobile"); break;
                    case 3: $state.go("loginMobile"); break;
                }
                return true;
            }
        });
    }
})
.controller("microvideoController", function ($scope, $state, getDataSource, $stateParams, $sce, $ionicHistory, $timeout) {
    //$ionicConfigProvider.tabs.position("top");
    $scope.API = null;
    $scope.id = $stateParams.id;
    $scope.tabs = [{ name: "简介", active: true }, { name: "互动", active: false }, { name: "课件", active: false }];
    $scope.nowtab = '简介';
    $scope.load = function () {
        getDataSource.getDataSource("get_celap_videostudy_byinfo_id", { info_id: $scope.id }, function (data) {
            $scope.form = data[0];
            $scope.form.title_picFile = "../staticresource/" + $scope.form.title_pic;
            $scope.form.safeContent = $sce.trustAsHtml($scope.form.content);
            //$scope.form.safeContent = $scope.form.safeContent.replace("uedit/net/upload/image/", "../backHTML/uedit/net/upload/image/");
            $scope.loadVideo();
        });
    }();
    $scope.goBack = function () {
        $ionicHistory.goBack();
    }
    $scope.loadVideo = function () {
        $scope.ischangevideo = false;
        $scope.config = {
            sources: [
                {
                    src: $sce.trustAsResourceUrl($scope.AppConfig.videoPlayLocalPath + $scope.form.videopath), type: "audio/mp4"
                }
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
            },
            alert: function () {
                alert('2222');

            }
        };
        this.alert1 = function (data) {
            alert(data);
        }

        //$scope.toggleFullScreen();
    }

    $scope.onPlayerReady = function (API) {
        $scope.API = API;
        $timeout(function () {
            API.toggleFullScreen();
            API.play();
        }, 1000)

    }
    $scope.onUpdateTime = function (c, d) {
        console.log("c", c);
        console.log("d", d);

    }
    $scope.setVideo = function (index) {
        $scope.API.toggleFullScreen();
    };
    $scope.go = function (tab) {
        angular.forEach($scope.tabs, function (now) {
            now.active = false;
        });
        tab.active = true;
        $scope.nowtab = tab.name;
    }
})
.controller("userinfoController", function ($http, $scope, $ionicActionSheet, $rootScope, Upload, getDataSource, showAlert, cordovaService, userHelp , $ionicLoading , DataSource , $state , $ionicHistory) {
    $scope.user = {};
    var action = "getUserData=1";

    $scope.doRefresh = function() {
            console.log("[个人信息-doRefresh()] ");

            $ionicLoading.show({
                template: '加载中...'
            });

            var paramObj = {
                userId: localStorage.userid
            };
            var promise = DataSource.getData(action, paramObj); 
            promise.then(function(data) {
                if(data && data.rows && data.rows.length > 0){
                    $scope.user = data.rows[0];
                }
                console.log($scope.user);
                
                $ionicLoading.hide();
            }, function(data) {
                $ionicLoading.hide();
                showAlert.showToast("加载数据出现异常 [" + data.status + "]");
            });
    };

    $scope.doRefresh();

    $scope.goback = function() {
        //$state.go("user.userInfo");
        $ionicHistory.goBack();
    }
    
    //=====================================================================
    //$scope.user = $rootScope.user;
    $scope.myImg = "";
    if ($scope.user.userphoto == null || $scope.user.userphoto == "") {
        $scope.myImg = "../staticresource/userphoto/userdefaultpng.svg";
    }
    else {
        $scope.myImg = "../staticresource/userphoto/" + $scope.user.userphoto;
    }

    $("#photoImg").attr("src", $scope.myImg);
    //$scope.upload = { src: "../staticresource/userphoto/" + $scope.user.userphoto };
    $scope.haschoose = false;
    $scope.select = function () {
        xsfCamera.getPicture(
                $scope.uploadFile,
            function (message) { },
            {
                quality: 80,
                destinationType: xsfCamera.DestinationType.FILE_URI,
                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                targetWidth: 500,
                targetHeight: 500,
                allowEdit: true,
                correctOrientation: true,
                orientationCorrected: true
            }
        );
    }
    $scope.uploadFile = function (img) {
        var url = $rootScope.AppConfig.picUpload + "?info_id=" + $rootScope.user.info_id + "&userType=" + $rootScope.user.type;
        showAlert.showLoading(10000, "上传中");
        xsfHttp.upload(img, url,
                       function (data) {
                           showAlert.hideLoading();
                           var json = data;
                           var c = eval("(" + json.response + ")");
                           if (c) {
                               if (c.result) {
                                   var ram = "?date=" + Math.random();
                                   $scope.myImg = "../staticresource/userphoto/" + c.fileFullPath + ram;
                                   $("#photoImg").attr("src", $scope.myImg);
                                   $scope.user.userphoto = c.fileFullPath + ram;
                                   localStorage.user = JSON.stringify($scope.user);
                                   showAlert.showToast("上传成功");
                                   userHelp.chatInitOne();
                               } else {
                               }

                           }
                       },
                       function (error) {
                           showAlert.hideLoading();
                           showAlert.showToast("上传失败");
                       }
               );
    }
    $scope.onPhotoURISuccess = function (imageURI) {
        alert(imageURI);
    }
    $scope.selectPic = function () {
        cordovaService.selectPic(function (data) {
            $scope.haschoose = true;
            $scope.user.nowChoosePic = "data:image/jpeg;base64," + data;
            cordovaService.uploadFile($scope.user.nowChoosePic, $rootScope.AppConfig.picUpload + "?info_id=" + $scope.user.info_id, function (data) {
                $scope.user.userphoto = data;
                localStorage.user = JSON.stringify($scope.user);
                $rootScope.user.userphoto = data;
                showAlert.alert("保存成功");
            }, function (error) { alert(error) });
        });

    }
    $scope.showUserAction = function () {
        if ($rootScope.formweixin) {
            wx.chooseImage({

                sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    var firstPic = localIds[0];
                    wx.uploadImage({
                        localId: firstPic, // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 1,// 默认为1，显示进度提示
                        success: function (res) {
                            var serverId = res.serverId; // 返回图片的服务器端ID
                            //alert(serverId);
                            //alert("../Api/uploadPic/" + serverId + "/" + $rootScope.user.info_id + "/" + $rootScope.user.type);
                            $http.get("../Api/uploadPic/" + serverId + "/" + $rootScope.user.info_id + "/" + $rootScope.user.type).then(function (result) {
                                var c = result.data;
                                var ram = "?date=" + Math.random();
                                $scope.myImg = "../staticresource/userphoto/" + c.fileFullPath + ram;
                                $("#photoImg").attr("src", $scope.myImg);
                                $scope.user.userphoto = c.fileFullPath + ram;
                                localStorage.user = JSON.stringify($scope.user);
                            });
                        }
                    });
                }
            });
        }
        else {
            // 不使用原生拍照
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                  { text: '拍照' },
                  { text: '相册' },
                ],
                cancelText: '取消',
                cancel: function () {
                    // add cancel code..
                },
                buttonClicked: function (index) {
                    switch (index) {
                        case 0: $scope.camera(); break;
                        case 1: $scope.select(); break;
                    }
                    return true;
                }
            });
        }
        getDataSource.getDataSource("doLogUserInfo", { content: "上传个人头像" }, function () { });
    }
    $scope.camera = function () {
        navigator.camera.getPicture($scope.uploadFile, function () {

        }, {
            quality: 80,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            targetWidth: 500,
            targetHeight: 500,
            allowEdit: true,
            correctOrientation: true,
            orientationCorrected: true
        });
    }
    $scope.save = function () {
        var upCommand = "updateGUser";
        if ($rootScope.user.type == 'student') {
            upCommand = "updateUser";
        }
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if ($scope.user.dzyj != null && $scope.user.dzyj != "") {
            if (reg.test($scope.user.dzyj)) {
                getDataSource.getDataSource(upCommand, $scope.user, function (data) {
                    localStorage.user = JSON.stringify($scope.user);
                    showAlert.showToast("保存成功");
                })
                getDataSource.getDataSource("doLogUserInfo", { content: "更新个人信息" }, function () { });
            }
            else {
                    showAlert.showToast("邮箱格式错误!");
            }
        }
        else {
            getDataSource.getDataSource(upCommand, $scope.user, function (data) {
                localStorage.user = JSON.stringify($scope.user);
                showAlert.showToast("保存成功");
            })
            getDataSource.getDataSource("doLogUserInfo", { content: "更新个人信息" }, function () { });
        }
    }
})
.controller("myNeedsContentController", function ($scope, $rootScope, $http) {
    $http.get("../config/myNeedsContent.json").then(function (data) {
        alert(data.data);
    })
})
.controller("videoPlayController", function ($scope, $rootScope, getDataSource, $sce, $timeout, $interval, $stateParams) {
    var tempDir = "";
    var user = $rootScope.user;
    $scope.id = $stateParams.id;
    var isIOS = ionic.Platform.isIOS();
    var isAndroid = ionic.Platform.isAndroid();
    
    $scope.isvideo = true;
    $scope.API = null;
    getDataSource.getDataSource("get_celap_videostudy_byinfo_id", { info_id: $scope.id }, function (data) {
        $scope.form = data[0];
        $scope.form.safeContent = $sce.trustAsHtml($scope.form.content);
        $scope.loadPlayer();
        //getDataSource.getDataSource("doLogVideo", { content: $scope.form.title }, function () { });
    });

    $scope.marginTop = "";
    $scope.xgzlmarginTop = "";
    if ($rootScope.formweixin) {
        $scope.formweixin = true;
        if (isAndroid && $scope.isvideo) {
            $scope.xgzlmarginTop = "margin-top:0px;";
        }
        $scope.marginTop = "margin-top:50px;";
    }
    else {
        $scope.formweixin = false;
    }
    $scope.changeTop = function ()
    {
        $("#videoHead").attr("style", "margin-top:0px");
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
    getDataSource.getDataSource("queryClxzSql", {
        fid: $scope.id
    }, function (data) {
        $scope.dataZpywSource = data;
    });
    $scope.onUpdateTime = function (c, d) {
        $scope.nowtime = parseInt(c);
    }
    // 判断该视频是否已点赞
    var formDatas = { userid: user.info_id, finfo_id: $scope.id, ismark: 0, isgood: 1, islike: 0, comtype: 2 };
    getDataSource.getDataSource("queryMyComment", formDatas, function (data) {
        // 已点赞
        if (data.length == 0) {
            $scope.isgood = 0;
        }
        else {
            $scope.isgood = 1;
        }
    });
    $scope.Addgood = function () {
        var formData = { userid: user.info_id, username: user.username, finfo_id: $scope.id, ismark: 0, isgood: 1, islike: 0, comtype: 2 };
        getDataSource.getDataSource("queryMyComment", formData, function (data) {
            // 已点赞
            if (data.length == 0) {
                getDataSource.getDataSource("Insert_myComment", formData, function (data) {
                    $scope.isgood = 1;
                });
            }
        });
    };
    $scope.ishow = true;
    $scope.changeIndex = function (index)
    {
        if (index == 1) {
            $scope.ishow = true;
        }
        else {
            $scope.ishow = false;
        }
    }
    $scope.loadData = function (item) {
        var filetype = item.nrtype;
        var filename = "";
        var url = "";
        var filePath = tempDir;
            var index = item.path.lastIndexOf("\\");
            filename = item.path.substr(index, item.path.length);
            url = "../staticresource/attach/" + item.filename;
        window.location.href = url;
    }
    $scope.loadPlayer = function () {
        $scope.mediatype = "video";
        var mediaType = "video/mp4";
        if ($scope.form.videoremotepath.indexOf(".mp3") > -1) {
            $scope.isvideo = false;
            $scope.mediatype = "audio";
            mediaType = "audio/mpeg";
        }
        //alert($scope.AppConfig.videoPlayLocalPath + $scope.form.videopath);
        $scope.nowSrc = $sce.trustAsResourceUrl($scope.AppConfig.videoPlayLocalPath + $scope.form.videoremotepath);
        $scope.config = {
            sources: [
                {
                    src: $sce.trustAsResourceUrl($scope.AppConfig.videoPlayLocalPath + $scope.form.videoremotepath), type:mediaType
                }
            ],
            mediatype:$scope.mediatype,
            theme: "../bower_components/videogular-themes-default/videogular.css"
            ,plugins: {
                poster: "http://www.videogular.com/assets/images/videogular.png",
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
    $scope.onPlayerReady = function (API) {
        $scope.API = API;
        //API.seekTime(50, false);
        //API.play();
        $timeout(function () {
            //API.toggleFullScreen();
            API.play();
        }, 1000)

    }
})