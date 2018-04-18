angular.module('app.commonServices', []).
    service("getDataSource", function ($http) {
        return {
            getDataSource: function (type, data, success, error) {
                var array = [];
                if (typeof (type) == "string") {
                    array.push(type);
                } else {
                    array = type;
                }
                var pData = { key: array, postData: data };

                $http.post("../api/CommonSQL", JSON.stringify(pData))
                    .success(function (data) {
                        if (data.error) {
                            error(data.error);
                        } else {
                            success(data);
                        }
                    })
                    .error(function (data) {
                        error && error(data);
                    });
            },
            getGUID: function () {
                var s = [];
                var hexDigits = "0123456789abcdef";
                for (var i = 0; i < 36; i++) {
                    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
                }
                s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
                s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
                s[8] = s[13] = s[18] = s[23] = "-";

                var uuid = s.join("");
                return uuid;
            }
        }
    })
    .service("uploadService", function ($http) {
        return {
            upload: function () {

            }
        }
    })
    .service("userHelp", function ($http, $rootScope, $state, $timeout, showAlert) {
        var returnVal = new Object();
        //安全等处
        returnVal.safeLogout = function () {
            console.log("start", new Date());
            localStorage.clear();
            $rootScope.user = null;
            console.log("end", new Date());
            //ionic.Platform.exitApp();
            //showAlert.showLoading(10000, "正在关闭");
            //$timeout(function() {
            //    xsf.kill();
            //}, 3000);
            //$state.go("loginMobile");
        }
        //IOS安全退出
        returnVal.iosLogout = function () {
            console.log("start", new Date());
            localStorage.clear();
            $rootScope.user = null;
            console.log("end", new Date());

            $state.go("loginMobile");
        }
        returnVal.setSession = function (success, error) {
            if ($rootScope.user == null) {
                return;
            }
            $http.post("../api/SetSession", $rootScope.user)
                .success(function () {
                    success();
                })
                .error(function () {
                    error();
                });
        }
        //获取选择的人员列表
        returnVal.getSelectUsers = function () {
            var deep = _.cloneDeep($rootScope.selectUser);
            $rootScope.selectUser = null;
            return deep;
        }
        //聊天初始化
        returnVal.initUserChat = function (success) {
            try {
                var options = {
                    "userId": $rootScope.user.info_id,
                    "userName": $rootScope.user.username
                }
                xsfChat.initChat(options, success, function (data) { console.log(data) });
            } catch (e) {
                console.log(e);
            }
        }
        //单聊
        returnVal.sigalChat = function (userid, username) {
            options = {
                "chatId": userid,
                "chatName": username,
                "chatType": 0
            }
            try {
                xsfChat.openChat(options, function () { }, function () {

                });
            } catch (e) { }
        }
        //班级群聊
        returnVal.groupChat = function () {
            options = {
                "chatId": $rootScope.user.classid,
                "chatName": $rootScope.user.classname,
                "chatType": 1
            }
            try {
                xsfChat.openChat(options, function () {
                    console.log("群聊");
                }, function () {

                });
            } catch (e) { }
        }
        //跟新首页几个聊天块的显示数字
        returnVal.changeHTML = function (controllerID, val) {
            if (parseInt(val) == 0) {
                $("#" + controllerID).css("display", "none");
            } else {
                $("#" + controllerID).css("display", "inline");
                $("#" + controllerID).html(val);
            }
        }
        //获取聊天数量
        returnVal.getChatNumber = function () {
            //我的需求数量
            if (localStorage.user && localStorage.user !== "undefined") {
                //班级交流
                xsfChat.getNewMessageCount({ type: 0 }, function (number) {
                    _.find($rootScope.iconvalArray, function (d) {
                        return d.key == "myclasscount";
                    }).val = number.message;
                    returnVal.changeHTML("myclasscount", number.message);
                })
                xsfChat.getNewMessageCount({ type: 1 }, function (number) {
                    //_.find($rootScope.iconvalArray, function (d) {
                    //    return d.key == "studentcount";
                    //}).val = number.message;
                    //returnVal.changeHTML("studentcount", number.message);

                    _.find($rootScope.iconvalArray, function (d) {
                        return d.key == "teachercount";
                    }).val = number.message;
                    returnVal.changeHTML("teachercount", number.message);
                })
            }
        }
        //我的需求
        returnVal.gomyNeeds = function () {
            if ($rootScope.isFirstLogin) {
                $state.go("myNeedsContent");
                $rootScope.isFirstLogin = false;
            }
        }
        returnVal.myNeeds = function () {
            options = {
                "chatId": $rootScope.user.classid + "_" + $rootScope.user.info_id,
                "chatName": $rootScope.user.username + "的需求",
                "chatType": 1
            }
            try {
                xsfChat.openChat(options, function () {
                    console.log("群聊");
                }, function () {

                });
            } catch (e) { }
        }
        //获取未读数量，1为我的需求，0为普通会话
        returnVal.getNewMessageCount = function (type) {
            var returnval = 0;
            try {
                returnval = xsfChat.getNewMessageCount({ type: type }, function () {

                }, function () { });
            } catch (e) { }
            return returnval;
        }

        //打开会话列表0普通会话，1代表我的需求
        returnVal.openChatList = function (type, title) {
            try {
                xsfChat.openChatList({ type: type, title: title }, function () {
                    console.log("打开会话列表");
                }, function () { });
            } catch (e) {

            }
        }

        returnVal.syncChat = function (success) {
            try {
                var url = $rootScope.AppConfig.syncChat + $rootScope.user.classid + "/" + $rootScope.user.type + "/" + $rootScope.user.info_id + "/" + $rootScope.user.username + "/" + $rootScope.user.isFirstLogin;
                var options = {
                    url: url,
                    "userId": $rootScope.user.info_id,
                    "userName": $rootScope.user.username
                }
                xsfChat.syncChat(options, success, function () { });
            } catch (e) {
                console.log(e);
            }
        }
        returnVal.chatInitOne = function () {
            var options = {
                "url": $rootScope.AppConfig.syncChatSingle + $rootScope.user.classid + "/" + $rootScope.user.type + "/" + $rootScope.user.info_id + "/" + $rootScope.user.username
            }
            xsfChat.syncSingleChat(options, function () { }, function () { })
        }
        returnVal.chatAllinit = function () {
            returnVal.syncChat(function () {
                console.log("数据同步成功");
                returnVal.initUserChat(function () {
                    console.log("聊天初始化成功");
                }, function () {
                    console.log("初始化失败");
                });
            }, function () {
                console.log("同步失败");
            });
            console.log("chatAllinit");
            //returnVal.initUserChat(function () {
            //    alert("123");
            //});
        }
        //打开选人界面
        //type:single代表单选，multiple 代表多选
        //selected请传入数组，已选择的人员info_Id列表
        returnVal.openSelectUsers = function (type, selected) {
            $state.go("selectUser", { type: type, selected: selected });
        }
        return returnVal;
    })
    .service("showAlert", function ($ionicPopup, $ionicLoading, $rootScope) {
        return {
            alert: function (content) {
                $ionicPopup.alert({
                    title: '', // String. The title of the popup.
                    cssClass: '', // String, The custom CSS class name
                    subTitle: '', // String (optional). The sub-title of the popup.
                    template: content, // String (optional). The html template to place in the popup body.
                    templateUrl: '', // String (optional). The URL of an html template to place in the popup   body.
                    okText: '确定', // String (default: 'OK'). The text of the OK button.
                    okType: 'button-assertive', // String (default: 'button-positive'). The type of the OK button.
                });
            },
            //原生小提示，停留3秒,传入提示文字
            showToast: function (content) {
                //if ($rootScope.formweixin) {
                $ionicLoading.show({
                    template: content,
                    noBackdrop: true,
                    duration: 2000
                });
                //}
                //else {
                //window.plugins.toast.show(content, 'short', 'center');
                //}
            },
            //显示Loading页
            //因为避免超时等特殊情况默认值为10秒，10秒后不管有没有调用HideLoading都将关闭
            showLoading: function (duration, showTtile) {
                var nowduration = 10000;
                var title = "";
                if (duration) {
                    nowduration = duration;
                }
                if (showTtile) {
                    title = showTtile;
                }
                $ionicLoading.show({
                    template: '<ion-spinner class="spinner-energized"></ion-spinner><br/><span>' + title + '</span>',
                    duration: nowduration
                });
            },
            //关闭Loading
            hideLoading: function () {
                $ionicLoading.hide();
            }
        }
    })
    .service("goDetail", function ($state, $rootScope) {
        return {
            goNewsDetail: function (item) {
                if (item) {
                    if (item.category == 1 || item.category == 2) {
                        //xsf.playVideo($rootScope.AppConfig.videoPlayPath + item.videopath);
                        $state.go("videoPlay", { id: item.info_id });
                    }
                    //else if (item.category == 2) {
                    //    $state.go("ydjxDetail", { id: item.info_id });
                    //}
                    else if (item.category == 0) {
                        $state.go("zpNewsDetail", { id: item.info_id });
                    } else if (item.category == 3) {
                        //xsfWindow.open1(item.webpath);
                        $state.go("other", { url: encodeURI(item.webpath) });
                        //window.open(item.webpath);
                    }
                } else {
                    $state.go("zpNewsDetail", { id: "123" });
                }
            }
        }
    })
    .factory("$sms", function ($rootScope, $http) {
        return {
            "isSimulation": false,
            "send": function (args, successCallback, errorCallback) {
                var phone = args.phone;
                var msg = args.msg;
                $http.post("../api/SMS", args)
                    .success(function () {
                        successCallback();
                    })
                    .error(function () { });
            }
        }
    })
    .service("cordovaService", function ($rootScope) {
        var cordovaService = {};
        cordovaService.selectPic = function (getFile) {
            xsfCamera.getPicture(
                function (img) {
                    getFile(img);
                },
                function (message) { alert('get picture failed'); }, {
                    quality: 50,
                    destinationType: xsfCamera.DestinationType.FILE_URI,
                    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                }
            );

        }
        cordovaService.uploadFile = function (imageURI, backFile, success, error) {
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            options.mimeType = "image/jpeg";
            var params = {};
            params.value1 = "test";
            params.value2 = "param";

            options.params = params;
            var ft = new xsf.FileTransfer();
            alert(ft);
            ft.upload(imageURI, encodeURI(backFile), success, error, options);
        }
        return cordovaService;
    })
    .service("calcStar", function () {
        var returnVal = new Object();
        returnVal.getStar = function (userInfo) {
            if (userInfo.score >= 480) {
                for (var i = 0; i < 5; i++) {
                    userInfo.starArr.push({ starClass: "ion-android-star golden" });
                }
            } else if (userInfo.score >= 360) {
                for (var i = 0; i < 4; i++) {
                    userInfo.starArr.push({ starClass: "ion-android-star golden" });
                }
                userInfo.starArr.push({ starClass: "ion-android-star-half golden" });
            } else if (userInfo.score >= 240) {
                for (var i = 0; i < 4; i++) {
                    userInfo.starArr.push({ starClass: "ion-android-star golden" });
                }
            } else if (userInfo.score >= 180) {
                for (var i = 0; i < 3; i++) {
                    userInfo.starArr.push({ starClass: "ion-android-star golden" });
                }
                userInfo.starArr.push({ starClass: "ion-android-star-half golden" });
            } else if (userInfo.score >= 120) {
                for (var i = 0; i < 3; i++) {
                    userInfo.starArr.push({ starClass: "ion-android-star golden" });
                }
            } else if (userInfo.score >= 90) {
                for (var i = 0; i < 2; i++) {
                    userInfo.starArr.push({ starClass: "ion-android-star golden" });
                }
                userInfo.starArr.push({ starClass: "ion-android-star-half golden" });
            } else if (userInfo.score >= 60) {
                for (var i = 0; i < 2; i++) {
                    userInfo.starArr.push({ starClass: "ion-android-star golden" });
                }
            } else if (userInfo.score >= 30) {
                for (var i = 0; i < 1; i++) {
                    userInfo.starArr.push({ starClass: "ion-android-star golden" });
                }
                userInfo.starArr.push({ starClass: "ion-android-star-half golden" });
            } else if (userInfo.score >= 10) {
                for (var i = 0; i < 1; i++) {
                    userInfo.starArr.push({ starClass: "ion-android-star golden" });
                }
            } else if (userInfo.score >= 5) {
                userInfo.starArr.push({ starClass: "ion-android-star-half golden" });
            } else if (userInfo.score > 0) {
                userInfo.starArr.push({ starClass: "ion-android-star-outline" });
            }
        }
        returnVal.getUserType = function (user) {
            //usertype=0 学员，1 班主任指导老师，2 访问者
            var usertype = -1;
            if (user.type == "student") {
                usertype = 0;
            } else if (user.type == "teacher") {
                usertype = 1;
            } else if (user.type == "visitor") {
                usertype = 2;
            }
            return usertype;
        }
        return returnVal;
    })
    .service("calcDate", function ($filter) {
        return {
            getDateStr: function (dobj, isUTC) {
                //获取系统时间
                var dateTemp = new Date(dobj.createdate);
                var realDate = dateTemp;
                if (isUTC) {
                    realDate = new Date(dateTemp.getUTCFullYear(), dateTemp.getUTCMonth(), dateTemp.getUTCDate(), dateTemp.getUTCHours(), dateTemp.getUTCMinutes(), dateTemp.getUTCSeconds());
                }
                var edate = $filter('date')(realDate, 'yyyy-MM-dd HH:mm:ss');
                var sysDate = new Date(),
                    newDate = new Date(edate);
                catime = 0;
                var minuteNum = (sysDate.getTime() - newDate.getTime()) / 60 / 1000; //分钟
                //算出天时分,分钟大于60则使用小时，小时大于24则使用天，如果小于0则显示已过评价期限
                var rtnStr = "";
                var daymins = 1140;
                var monthMins = daymins * 30;
                var yearMins = monthMins * 12;
                if (parseInt(minuteNum) <= 0) {
                    rtnStr = "1分钟前";
                } else if (parseInt(minuteNum) <= 60) {
                    rtnStr = parseInt(minuteNum) + "分钟前";
                } else if (parseInt(minuteNum) < daymins) {
                    catime = ((parseInt(minuteNum) % 60) / 60).toFixed(0) * 10;
                    rtnStr = ((parseInt(parseInt(minuteNum) / 60) * 10 + catime) / 10) + "小时前"; //算出不足1小时分钟数量转化为小于1小时的小时格式
                } else if (parseInt(minuteNum) < monthMins) {
                    catime = ((parseInt(minuteNum) % daymins) / daymins).toFixed(0) * 10;
                    rtnStr = ((parseInt(parseInt(minuteNum) / daymins) * 10 + catime) / 10) + "天前"; //算出不足1天的分钟数量转化为小于1天的天数格式
                } else if (parseInt(minuteNum) < yearMins) {
                    catime = ((parseInt(minuteNum) % monthMins) / monthMins).toFixed(0) * 10;
                    rtnStr = ((parseInt(parseInt(minuteNum) / monthMins) * 10 + catime) / 10) + "月前";
                } else { }
                return rtnStr;
            }
        }
    })
    .factory('showAttachFilePop', function ($ionicPopover, $http, $ionicPopup, $location, httpProxy) {
        return {
            show: function (param, scope) {

                function openFile(file) {
                    var domain = "";
                    var url = baseURL + "/action?downloadFile=1&app=ios&app&fileId=" + file.id;
                    var type = file['name'].split(".")[file['name'].split(".").length - 1].toUpperCase();
                    /*if(type=='DOC'||type=='DOCX'||type=='XLS'||type=='XLSX'||type=='PPT'||type=='PPTX'||type=='TXT'||type=='TEXT'||type=='PDF'){
                        xsfWPS.open(url,file.name, file.id,true,false ,
                                   function (result) {
                                   },
                                   function (error) {
                                   }
                        );
                    }else{
                        url = Base64.encode(url);
                        var baseUrl = $location.absUrl().split("#")[0];
                        var ionicUrl = baseUrl + "#/attachFileShow/"+type+"/"+file.id; 
                        var ref = xsfWindow.open(ionicUrl, file['name']);
                    }*/
                    var fileName = file['name'];
                    var fileCase = file['name'].split(".")[file['name'].split(".").length - 1].toLowerCase();
                    //TIF文件已在后台转为PDF，所以此处将TIF后缀改成PDF，以便WPS识别
                    if (fileCase == 'tif' || fileCase == 'tiff') {
                        fileName = fileName.substring(0, fileName.length - fileCase.length) + "pdf";
                    }
                    var url = url + "&/" + fileName.toLowerCase();
                    console.log(url);
                    if (localStorage.testMode) {
                        window.open(url);
                    } else {
                        xsf.open(url);
                    }

                    /*
                    xsfWPS.open(url,file.name, file.id,true,false ,
                               function (result) {
                               },
                               function (error) {
                               }
                    );
                    */


                }

                scope.delAttachmentFile = function (id) {
                    var domain = localStorage.domain;
                    var url = baseURL + "/action?deleteUploadFile=1&domain=" + domain;
                    httpProxy.getJSON(url, "", function (data) {
                        var datas = data.data;
                        if (data.result) {
                            scope.reloadAttachmentFile();
                        } else {
                            alert(data.message);
                        }
                    });
                    /*$http.get(url).then(function (data) {
                         var datas =  data.data;
                         if(data.result){
                            scope.reloadAttachmentFile();
                         }else{
                            alert(data.message);
                         }
                    });*/
                };

                scope.reloadAttachmentFile = function () {
                    var domain = localStorage.domain;
                    scope.attachmentFileItem = new Array();
                    $http.get(url).then(function (data) {
                        var datas = data.data.rows;
                        console.log(datas);
                        for (var i = 0; i < datas.length; i++) {
                            scope.attachmentFileItem.push(datas[i]);
                        }
                    });
                };
                scope.attachmentFileItem = new Array();
                var moduleId = param['moduleId'];
                var pid = param['pid'];
                var pnid = param['pnid'];
                var info_id = param['info_id'];
                var formId = param['formId'];
                var url = baseURL + "/action?getXFormAttachment=1&domain=" + domain + "&moduleId=" + moduleId + "&pid=" + pid + "&pnid=" + pnid + "&info_id=" + info_id + "&formId=" + formId;
                httpProxy.getJSON(url, "", function (data) {
                    var datas = data.data.rows;
                    console.log(datas);
                    for (var i = 0; i < datas.length; i++) {
                        scope.attachmentFileItem.push(datas[i]);
                    }
                })
                /*$http.get(url).then(function (data) {
                     var datas =  data.data.rows;
                     console.log(datas);
                     for(var i=0;i<datas.length;i++){
                        scope.attachmentFileItem.push(datas[i]);
                     }
                });*/
                var template = '<ion-popover-view><ion-content>	<ion-list><div ng-repeat="file in attachmentFileItem">' +
                    '<div class="item item-icon-left" ng-if="!file.hasFile" ng-click="openfile(file)">' +
                    '<h3 style="font-weight:bold;margin-left:10px;" >{{file.name}}</h3>' +
                    '<i class="icon icon-left">' +
                    '<img src="{{file.img}}" class="app_icon"/>' +
                    '</i>' +
                    '</div></ion-list>' +
                    '</ion-content></ion-popover-view>';
                var myPopup = $ionicPopup.show({
                    title: '附件列表',
                    template: template,
                    scope: scope
                });
            },
            hide: function () {

            },
            showCommentFileByData: function (datas, scope, title) {
                scope.commentFileItem = new Array();
                for (var i = 0; i < datas.length; i++) {
                    var file = new Object();
                    file['id'] = datas[i]['id'];
                    file['name'] = datas[i]['title'];
                    file['canDelete'] = datas[i]['canDelete'];
                    file['canEdit'] = datas[i]['canEdit'];
                    file['type'] = datas[i]['type'];
                    file['url'] = datas[i]['url'];
                    if (file['name'].split(".")[file['name'].split(".").length - 1].toUpperCase() == 'DOC' || file['name'].split(".")[file['name'].split(".").length - 1].toUpperCase() == 'DOCX') {
                        file['img'] = "../img/drawable-hdpi/email_word.png";
                    } else if (file['name'].split(".")[file['name'].split(".").length - 1].toUpperCase() == 'XLS' || file['name'].split(".")[file['name'].split(".").length - 1].toUpperCase() == 'XLSX') {
                        file['img'] = "../img/drawable-hdpi/email_excel.png";
                    } else if (file['name'].split(".")[file['name'].split(".").length - 1].toUpperCase() == 'TXT' || file['name'].split(".")[file['name'].split(".").length - 1].toUpperCase() == 'TEXT') {
                        file['img'] = "../img/drawable-hdpi/email_text.png";
                    } else if (file['name'].split(".")[file['name'].split(".").length - 1].toUpperCase() == 'PDF') {
                        file['img'] = "../img/drawable-hdpi/email_pdf.png";
                    } else if (file['name'].split(".")[file['name'].split(".").length - 1].toUpperCase() == 'PPT' || file['name'].split(".")[file['name'].split(".").length - 1].toUpperCase() == 'PPTX') {
                        file['img'] = "../img/drawable-hdpi/email_ppt.png";
                    } else {
                        file['img'] = "../img/drawable-hdpi/email_img.png";
                    }
                    scope.commentFileItem.push(file);
                }
                var template = '<ion-list><div ng-repeat="file in commentFileItem">' +
                    '<div class="item item-icon-left" ng-click="openfile(file)">' +
                    '<h3 style="font-weight:bold;margin-left:10px;" >{{file.name}}</h3>' +
                    '<i class="icon icon-left">' +
                    '<img src="{{file.img}}" style="height:3.5rem;width: 3.3rem;margin-top:5px;margin-bottom:5px;"/>' +
                    '</i>' +
                    '</div>' +
                    '</ion-list>';
                scope.openfile = function (file) {

                    var domain = localStorage.domain;
                    var url = "";
                    console.log(file);
                    console.log("-----------");
                    console.log(title);
                    if (title == '便笺附件') {
                        url = baseURL + "/action?downloadFile=1&app=ios&type=oa_note&domain=" + domain + "&fileId=" + file.id;
                    } else {
                        url = baseURL + "/action?downloadFile=1&app=ios&domain=" + domain + "&fileId=" + file.id;
                    }
                    console.log(url);
                    var type = file['name'].split(".")[file['name'].split(".").length - 1].toUpperCase();
                    /*if(type=='DOC'||type=='DOCX'||type=='XLS'||type=='XLSX'||type=='PPT'||type=='PPTX'||type=='TXT'||type=='TEXT'||type=='PDF'){
                        xsfWPS.open(url,file.name, file.id,true,false ,
                                   function (result) {
                                   },
                                   function (error) {
                                   }
                        );
                    }else{
                        url = Base64.encode(url);
                        var baseUrl = $location.absUrl().split("#")[0];
                        var ionicUrl = baseUrl + "#/attachFileShow/"+type+"/"+file.id; 
                        var ref = xsfWindow.open(ionicUrl, file['name']);
                    }*/
                    var fileName = file['name'];
                    var fileCase = file['name'].split(".")[file['name'].split(".").length - 1].toLowerCase();
                    //TIF文件已在后台转为PDF，所以此处将TIF后缀改成PDF，以便WPS识别
                    if (fileCase == 'tif' || fileCase == 'tiff') {
                        fileName = fileName.substring(0, fileName.length - fileCase.length) + "pdf";
                    }
                    var url = url + "&/" + fileName.toLowerCase();
                    console.log(url);
                    window.open(url);
                    //xsf.open(url+"&/"+file['name'].toLowerCase());
                };
                title = title || '意见附件';
                var titleContent = '<p style="font-weight:bold;">' + title + '</p>';
                var myPopup = $ionicPopup.show({
                    title: titleContent,
                    template: template,
                    scope: scope,
                    buttons: [{
                        text: '<b>关闭</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            myPopup.close();
                            e.preventDefault();
                        }
                    }]
                });
            },
            showFileByData: function (datas, scope) {
                scope.attachmentFileItem = new Array();
                for (var i = 0; i < datas.length; i++) {
                    var data = new Object();
                    if (datas[i].document && datas[i].document.length > 0) {
                        data['hasFile'] = true;
                        data['name'] = datas[i]['name'];
                        data['canShow'] = datas[i]['canShow'];
                        if (data['canShow'] == 1) {
                            scope.attachmentFileItem.push(data);
                            for (var j = 0; j < datas[i].document.length; j++) {
                                var file = new Object();
                                file['id'] = datas[i].document[j]['id'];
                                file['hasFile'] = false;
                                file['name'] = datas[i].document[j]['title'];
                                file['canDelete'] = datas[i].document[j]['canDelete'];
                                file['canEdit'] = datas[i].document[j]['canEdit'];
                                file['type'] = datas[i].document[j]['type'];
                                file['url'] = datas[i].document[j]['url'];
                                if (file['name'].split(".")[file['name'].split(".").length - 1].toUpperCase() == 'DOC' || file['name'].split(".")[file['name'].split(".").length - 1].toUpperCase() == 'DOCX') {
                                    file['img'] = "../images/drawable-hdpi/email_word.png";
                                } else if (file['name'].split(".")[file['name'].split(".").length - 1] == 'XLS' || file['name'].split(".")[file['name'].split(".").length - 1].toUpperCase() == 'XLSX') {
                                    file['img'] = "../images/drawable-hdpi/email_excel.png";
                                } else if (file['name'].split(".")[file['name'].split(".").length - 1] == 'TXT' || file['name'].split(".")[file['name'].split(".").length - 1] == 'TEXT') {
                                    file['img'] = "../images/drawable-hdpi/email_text.png";
                                } else if (file['name'].split(".")[file['name'].split(".").length - 1] == 'PDF') {
                                    file['img'] = "../images/drawable-hdpi/email_pdf.png";
                                } else if (file['name'].split(".")[file['name'].split(".").length - 1] == 'PPT' || file['name'].split(".")[file['name'].split(".").length - 1] == 'PPTX') {
                                    file['img'] = "../images/drawable-hdpi/email_ppt.png";
                                } else {
                                    file['img'] = "../images/drawable-hdpi/email_img.png";
                                }
                                scope.attachmentFileItem.push(file);
                            }
                        }
                    }
                }
                var template = '<ion-list><div ng-repeat="file in attachmentFileItem">' +
                    ' <div class="item item-divider" ng-if="file.hasFile"> {{file.name}}</div>' +
                    '<div class="item item-icon-left" ng-if="!file.hasFile" ng-click="openfile(file)">' +
                    '<h3 style="font-weight:bold;margin-left:10px;" >{{file.name}}</h3>' +
                    '<i class="icon icon-left">' +
                    '<img src="{{file.img}}" style="height:3.5rem;width: 3.3rem;margin-top:5px;margin-bottom:5px;"/>' +
                    '</i>' +
                    '</div>' +
                    '</ion-list>';
                scope.openfile = function (file) {
                    var domain = localStorage.domain;
                    var url = baseURL + "/action?downloadFile=1&app=ios&domain=" + domain + "&fileId=" + file.id;
                    var type = file['name'].split(".")[file['name'].split(".").length - 1].toUpperCase();
                    /*if(type=='DOC'||type=='DOCX'||type=='XLS'||type=='XLSX'||type=='PPT'||type=='PPTX'||type=='TXT'||type=='TEXT'||type=='PDF'){
                        xsfWPS.open(url,file.name, file.id,true,false ,
                                   function (result) {
                                   },
                                   function (error) {
                                   }
                        );
                    }else{
                        url = Base64.encode(url);
                        var baseUrl = $location.absUrl().split("#")[0];
                        var ionicUrl = baseUrl + "#/attachFileShow/"+type+"/"+file.id; 
                        var ref = xsfWindow.open(ionicUrl, file['name']);
                    }*/
                    var fileName = file['name'];
                    var fileCase = file['name'].split(".")[file['name'].split(".").length - 1].toLowerCase();
                    //TIF文件已在后台转为PDF，所以此处将TIF后缀改成PDF，以便WPS识别
                    if (fileCase == 'tif' || fileCase == 'tiff') {
                        fileName = fileName.substring(0, fileName.length - fileCase.length) + "pdf";
                    }
                    var url = url + "&/" + fileName.toLowerCase();
                    console.log(url);
                    if (localStorage.testMode) {
                        window.open(url);
                    } else {
                        xsf.open(url);
                    }
                };
                var myPopup = $ionicPopup.show({
                    title: '<p style="font-weight:bold;">附件列表</p>',
                    template: template,
                    scope: scope,
                    buttons: [{
                        text: '<b>关闭</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            myPopup.close();
                            e.preventDefault();
                        }
                    }]
                });
            }
        };
    })
    .service('Toast', function ($http, $timeout, $ionicActionSheet, $ionicLoading) {
        return {
            showPop: function (message) {
                console.log(message);
                $ionicLoading.show({
                    template: message,
                    noBackdrop: true,
                    duration: 2000
                });
                //var toast = document.createElement('div');
                //toast.classList.add('mui-toast-container');
                //toast.innerHTML = '<div class="' + 'mui-toast-message' + '">' + message + '</div>';
                //document.body.appendChild(toast);
                //setTimeout(function () {
                //    document.body.removeChild(toast);
                //}, 2000);
            }
        }
    })
    .service('httpProxy', function ($http, $timeout, $ionicActionSheet, Toast, $jsonToFormData) {
        var isNative = false;
        return {
            get: function (url, data, callBack, errorCallback) {
                var url = url + "&domain=" + localStorage.domain;
                if (isNative) {
                    xsfHttp.get(url, data,
                        function (data) {
                            var result = new Object();
                            result.data = data;
                            callBack(result);
                        },
                        function (error) {
                            Toast.showPop("open failed: " + error);
                        }
                    );
                } else {
                    $http.get(url).then(function (data) {
                        var result = new Object();
                        result.data = data;
                        callBack(result);
                    })["catch"](function (data, status) {
                        errorCallback && errorCallback(data);
                    });
                }
            },
            getJSON: function (url, data, callBack, errorCallback) {
                console.log(url);
                $http.get(url, { headers: { 'Authorization': 'DreamOA-H5' } }).then(function (data) {
                    callBack(data);
                })["catch"](function (data, status) {
                    errorCallback && errorCallback(data);
                });
            },
            post: function (url, data, callBack) {
                var url = url + "&domain=" + localStorage.domain;
                if (isNative) {
                    xsfHttp.post(url, data,
                        function (data) {
                            callBack(result);
                        },
                        function (error) {
                            Toast.showPop("open failed: " + error);
                        }
                    );
                } else {
                    $.post(url, data, function (data) {
                        data = $.parseJSON(data);
                        callBack(data);
                    })
                }
            },
            postJSON: function (url, data, callBack) {
                $.ajax({
                    //请求类型，这里为POST
                    type: 'POST',
                    //你要请求的api的URL
                    url: url,
                    //是否使用缓存
                    cache: false,
                    //数据类型，这里我用的是json
                    dataType: "json",
                    //必要的时候需要用JSON.stringify() 将JSON对象转换成字符串
                    data: data, //data: {key:value}, 
                    //添加额外的请求头
                    headers : {'Authorization': 'DreamOA-H5'},
                    //请求成功的回调函数
                    success: function (data) {
                         //data = $.parseJSON(data);
                         callBack(data);
                        //函数参数 "data" 为请求成功服务端返回的数据
                    },
                });
                // $.post(url, data, function(data) {
                //     data = $.parseJSON(data);
                //     callBack(data);
                // })
            },
            upload: function (url, filePath) {
                xsfHttp.upload(filePath, url,
                    function (result) {
                        alert(result);
                    },
                    function (error) {
                        alert("open failed: " + error);
                    });
            },
            doPost: function (url, data, callBack, errorCallback) {
                console.log("[doPost] url=" + url + ", data=", data);
                //$http.post(url , data , {transformRequest:$jsonToFormData})
                $http({
                    method: 'POST',
                    url: url,
                    data: $.param(data), //序列化参数
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                        'Authorization': 'DreamOA-H5'
                    }
                })
                    .success(function (data) {
                        console.log(data);
                        callBack && callBack(data);
                    }).error(function (data) {
                        console.log(data);
                        errorCallback && errorCallback(data);
                    });
            }
        }
    })
    .service('userSelect', function ($http, $ionicPopup) {
        return {
            showPop: function (datas, isSingle, nodeId, checkUsers, scope, callBack) {
                var template = '<div id="selectUsersDom" class="list" style="width:100%;height:80%;">' +
                    '<div ng-repeat="item in userItems" >' +
                    '<div class="item item-divider" ng-click="showUserByDept(item.orgid)" ng-if="item.orgusers">' +
                    '      <span><i class="icon ion-arrow-right-b padding-right"></i>{{item.orgname}}</span>' +
                    '</div>' +
                    ' <div class="item item-checkbox item-icon-right item-icon-left" ng-show="item.orgusers&&item.isShow" ng-repeat="user in item.orgusers" style="padding:10px;">' +
                    '  <div>' +
                    '<label class="checkbox checkbox-stable" style="width:48px;">' +
                    ' <input ng-if="!user.checked" orgid="{{item.orgid}}" userid="{{user.userid}}" orgname="{{item.orgname}}" username="{{user.username}}" type="checkbox" ion-stop-event ng-click="finish(item.orgid, user.userid,$event);">' +
                    ' <input checked="{{user.checked}}"  ng-if="user.checked" orgid="{{item.orgid}}" userid="{{user.userid}}" orgname="{{item.orgname}}" username="{{user.username}}" style="left:25px;top:5px;" type="checkbox" ion-stop-event ng-click="finish(item.orgid, user.userid,$event);">' +
                    '  </label>' +
                    ' </div>' +
                    '<div style="margin-left:35px;">' +
                    //				      '  <image src="{{baseURL+\'/\'+user.photo}}" class="icon-left icon-photo" style="float:left;left:50px;"> </image>' +
                    '<i class="ion-android-person"></i>' +
                    '  <span style="margin-left:15px;line-height:21px;">{{user.username}}</span>' +
                    '</div>' +
                    ' </div>' +
                    '</div>' +
                    '</div>';
                scope.userItems = [];
                console.log(datas.length == 1);
                if (datas && datas[0] && datas[0].orgusers) {
                    console.log(datas[0].orgusers.length);
                } else {
                    if (console.error) {
                        console.error("orgusers is empty");
                    }
                }
                console.log("isSingle" + isSingle);
                scope.finish = function (orgid, userid, $event) {
                    console.log("isSingle" + isSingle);
                    if (isSingle) {
                        console.log("isSingle");
                        $("#selectUsersDom").find("input:checked").each(function (i) {
                            if ($(this).attr('userid') != userid) {
                                $(this).attr("checked", false);
                            }
                        });
                    }
                    //$event.stopPropagation();
                };

                var isShow = true;
                if (CommonConstants.PROJECT == Project.PROJECT_GTJJ) {
                    isShow = false;
                }
                if (datas.length == 1 && datas[0].orgusers.length == 1) {
                    datas[0].orgusers[0]['checked'] = true;
                    datas[0]['isShow'] = isShow;
                    scope.userItems.push(datas[0]);
                } else {
                    for (var j = 0; j < datas.length; j++) {
                        if (j == 0) {
                            datas[j]['isShow'] = isShow;
                        }
                        for (var i = 0; i < datas[j].orgusers.length; i++) {
                            if (containId(datas[j].orgusers[i].userid, checkUsers)) {
                                datas[j].orgusers[i]['checked'] = true;
                            } else {
                                datas[j].orgusers[i]['checked'] = false;
                            }
                        }
                        scope.userItems.push(datas[j]);
                    }
                }

                scope.showUserByDept = function (deptId) {
                    for (var i = 0; i < scope.userItems.length; i++) {
                        if (deptId == scope.userItems[i].orgid) {
                            if (scope.userItems[i].isShow) {
                                scope.userItems[i].isShow = false;
                            } else {
                                scope.userItems[i].isShow = true;
                            }
                        }
                    }
                };

                function containId(id, array) {
                    for (var j = 0; j < array.length; j++) {
                        if (array[j].userid == id && nodeId == array[j].nodeid) {
                            return true;
                        }
                    }
                    return false;
                }
                scope.saveForm = function () {
                    var array = new Array();
                    for (var k = 0; k < checkUsers.length; k++) {
                        if (checkUsers[k].nodeid != nodeId) {
                            array.push(checkUsers[k]);
                        }
                    }
                    console.log("array");
                    console.log(array);
                    checkUsers.splice(0, checkUsers.length);

                    for (var l = 0; l < array.length; l++) {
                        checkUsers.push(array[l]);
                    }
                    console.log(checkUsers);
                    $("#selectUsersDom").find("input:checked").each(function (i) {
                        var object = new Object();
                        object.orgid = $(this).attr("orgid");
                        object.userid = $(this).attr("userid");
                        object.orgname = $(this).attr("orgname");
                        object.username = $(this).attr("username");
                        object.nodeid = nodeId;
                        console.log(object.userid);
                        if (!containId(object.userid, checkUsers)) {
                            checkUsers.push(object);
                        }
                    });
                    console.log("checkUsers");
                    console.log(checkUsers);
                    callBack();
                };
                myPopup = $ionicPopup.show({
                    title: '<p style="font-weight:bold;">人员选择</p>',
                    template: template,
                    scope: scope,
                    buttons: [{
                        text: '<b>关闭</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            scope.cancelSelect();
                            myPopup.close();
                            e.preventDefault();
                        }
                    }, {
                        text: '<b>确定</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            scope.saveForm();
                            myPopup.close();
                            e.preventDefault();
                        }
                    }]
                });
            }
        };

    })
    .service('userOrgSelect', function ($http, $ionicPopup, $ionicLoading, httpProxy) {
        return {
            showPop: function (selectData, isSingle, scope, callBack, rootDept) {
                var template = ' <div class="list" id="selectUsersDom" style="width:100%;height:80%;">' +
                    ' <div ng-repeat="item in orgitems">' +
                    '  <div class="item item-divider" id= "{{item.id}}"  ng-if="item.users">' +
                    '<div ng-click="showUserByDept(item.id)" style="float:left;text-overflow:ellipsis;width:70%;overflow:hidden;"><i class="icon ion-arrow-right-b padding-right"></i>{{item.name}}' +
                    '</div>' +
                    '       <div style="float:right;"><label class="checkbox checkbox-stable" style="width:48px;margin-top:0px;padding:0;"><input type="checkbox" style="margin-top:0px;padding:0px;top:0px;" ion-stop-event="" ng-click="checkAll(item.id,$event);" ><span style="margin-left:10px;top:0px;">全选</span></label></div>' +
                    ' </div>' +
                    '<div class="item item-checkbox item-icon-right item-icon-left" ng-show="item.users&&item.isShow" ng-repeat="user in item.users" >' +
                    '  <div>' +
                    ' <label class="checkbox checkbox-stable" style="width:48px;">' +
                    ' <input  ng-if="!user.checked" orgid="{{item.id}}" orgname="{{item.name}}" userid="{{user.id}}" username="{{user.name}}" style="left:25px;top:5px;" type="checkbox" ion-stop-event ng-click="finish(item.orgid,user.id,$event);" >' +
                    ' <input checked="{{user.checked}}" ng-if="user.checked" orgid="{{item.id}}" orgname="{{item.name}}" userid="{{user.id}}" username="{{user.name}}" style="left:25px;top:5px;" type="checkbox" ion-stop-event ng-click="finish(item.orgid,user.id,$event);" ></label>' +
                    '</div>' +
                    //						       ' <div style="margin-left:30px;"><image src="{{baseURL+\'/\'+user.photo}}" class="icon-left icon-photo"> </image>{{user.name}} <span class="badge">{{user.mobile}}</span></div>'+
                    ' <div style="margin-left:30px;"><image src="../img/user_default_icon.png" class="icon-left icon-photo"> </image>{{user.name}} <span class="badge">{{user.mobile}}</span></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                var userId = localStorage.userid;
                var rootDept = rootDept || localStorage.mainUnit;
                scope.baseURL = baseURL;
                scope.nowpageIndex = 0;
                scope.pageSize = pageSize;

                function containId(id, array) {
                    for (var j = 0; j < array.length; j++) {
                        console.log(array[j].userid);
                        if (array[j].userid = id) {
                            return true;
                        }
                    }
                    return false;
                }
                if (!scope.orgitems) {
                    scope.orgitems = [];
                    $ionicLoading.show({
                        template: '加载中...'
                    });
                    var messageUrl = baseURL + "/action?userContactActionAngular=1&action=getOrgUsersJs&rootDeptId=" + rootDept + "&userId=" + localStorage.userid;
                    console.log(messageUrl);
                    console.log(selectData);
                    httpProxy.getJSON(messageUrl, "", function (data) {
                        var datas = data.data.rows;
                        for (var j = 0; j < datas.length; j++) {
                            if (j == 0) {
                                datas[j].isShow = true;
                            } else {
                                datas[j].isShow = false;
                            }
                            for (var i = 0; i < datas[j].users.length; i++) {
                                if (datas[j].users[i].id == selectData) {
                                    datas[j].users[i]['checked'] = true;
                                } else {
                                    datas[j].users[i]['checked'] = false;
                                }
                            }
                            scope.orgitems.push(datas[j]);
                        }
                        console.log(scope.orgitems);
                        $ionicLoading.hide();
                    }, function () {

                    })
                } else {
                    for (var j = 0; j < scope.orgitems.length; j++) {
                        if (j == 0) {
                            scope.orgitems[j].isShow = true;
                        } else {
                            scope.orgitems[j].isShow = false;
                        }

                        for (var i = 0; i < scope.orgitems[j].users.length; i++) {
                            if (scope.orgitems[j].users[i].id == selectData) {
                                scope.orgitems[j].users[i]['checked'] = true;
                            } else {
                                scope.orgitems[j].users[i]['checked'] = false;
                            }
                        }
                    }
                }
                scope.getCheckUsers = function () {
                    var selectArray = new Array();
                    $("#selectUsersDom").find("input:checked").each(function (i) {
                        var object = new Object();
                        object.userid = $(this).attr("userid");
                        object.username = $(this).attr("username");
                        object.orgid = $(this).attr("orgid");
                        object.orgname = $(this).attr("orgname");
                        if (object.userid && object.username) {
                            selectArray.push(object);
                        }
                    });
                    callBack(selectArray);
                };

                scope.checkAll = function (deptId, $event) {
                    var checked = $event.target.checked;
                    for (var j = 0; j < scope.orgitems.length; j++) {
                        if (deptId == scope.orgitems[j].id) {
                            for (var i = 0; i < scope.orgitems[j].users.length; i++) {
                                scope.orgitems[j].users[i]['checked'] = checked;
                            }
                        }
                    }

                    $("#" + deptId).find("input:checked").each(function (i) {
                        $(this).attr("checked", checked);
                    });
                    console.log(scope.orgitems);
                }

                scope.showUserByDept = function (deptId) {
                    for (var i = 0; i < scope.orgitems.length; i++) {
                        if (deptId == scope.orgitems[i].id) {
                            if (scope.orgitems[i].isShow) {
                                scope.orgitems[i].isShow = false;
                            } else {
                                scope.orgitems[i].isShow = true;
                            }
                        }
                    }
                };
                scope.finish = function (orgid, userid, $event) {
                    if (isSingle) {
                        $("#selectUsersDom").find("input:checked").each(function (i) {
                            console.log(userid);
                            if ($(this).attr('userid') != userid) {
                                $(this).attr("checked", false);
                            }
                        });
                    }
                    $event.stopPropagation();
                };
                myPopup = $ionicPopup.show({
                    title: '<p style="font-weight:bold;">人员选择</p>',
                    template: template,
                    scope: scope,
                    buttons: [{
                        text: '<b>关闭</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            myPopup.close();
                            e.preventDefault();
                        }
                    }, {
                        text: '<b>确定</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            scope.getCheckUsers();
                            myPopup.close();
                            e.preventDefault();
                        }
                    }]
                });
            }
        }
    })
    .factory('openFormFile', function ($ionicPopover, $http, $location, $state, User, Toast, $ionicLoading) {
        return {
            openFile: function (formId, info_id, moduleId, wfId, pid, pnid, title, showComment, v, type, gInboxId, operationType, isAttention, backReason, callBack, actName, historyUrl) {
                if (dotNet) {
                    goXformTab();
                } else {
                    var loginData = {};
                    loginData.logname = localStorage.logname;
                    loginData.password = localStorage.password;

                    $ionicLoading.show({
                        template: '加载中...'
                    });
                    var promise = User.login(loginData); // 同步调用，获得承诺接口  
                    promise.then(function (data) {
                        var rcode = data.rcode;
                        if (rcode == 0) {//用户名或密码错误
                            console.log(data);
                            Toast.showPop("用户名或密码错误");
                        } else if (rcode == 1) { //成功
                            goXformTab();
                        } else if (rcode == -1) { //锁定
                            console.log(data);
                            Toast.showPop("用户已锁定");
                        }
                        $ionicLoading.hide();
                    }, function (data) {
                        console.log(data);
                        $ionicLoading.hide();
                    })
                }


                function goXformTab() {
                    gInboxId = gInboxId || "";
                    actName = actName || "";
                    if (!Feature.FEATURE_MANUAL_REVIEWED && type == "g_issue") {
                        var url = baseURL + '/action?setReviewedNew=1';
                        var userId = localStorage.userid;
                        var params = '__DATA={"userId":"' + userId + '","infoId":"' + info_id + '"}';
                        url = url + "&" + params;
                        httpProxy.getJSON(url, "", function (data) {
                            var result = data.data.result;
                            if (!result) {
                                Toast.showPop("操作失败，请重新操作！");
                            } else {
                                $scope.doRefresh();
                                Toast.showPop("操作成功");
                            }
                        });
                    }
                    var baseUrl = $location.absUrl().split("#")[0];
                    //当title 有特殊字符是访问表单保存，title无用处暂时不传
                    title = '';
                    url = baseUrl + "#/xformTab/" + formId + "/" + info_id + "/" + moduleId + "/" + wfId + "/" + pid + "/" + pnid + "/" + showComment + "/" + title + "/" + v + "/" + type + "/" + gInboxId + "/" + operationType + "/" + isAttention + "/" + Base64.encode(backReason) + "/" + Base64.encode(actName);

                    console.log(url);
                    $state.go('xformTab', {
                        formId: formId, info_id: info_id, moduleId: moduleId, wfId: wfId, pid: pid,
                        pnid: pnid, showComment: showComment, title: title, v: v, type: type, gInboxId: gInboxId,
                        operationType: operationType, isAttention: isAttention, backReason: Base64.encode(backReason), actName: actName, historyUrl: historyUrl
                    });
                }

                // if (localStorage.testMode) {
                //     window.open(url);
                // } else {
                //     var ref = xsfWindow.open(url, title);
                //     ref.onExit = function() {
                //         if (callBack) {
                //             callBack();
                //         }
                //     }
                // }
            },
            openFileNew: function (formId, info_id, moduleId, wfId, pid, pnid, title, showComment, v, type, gInboxId, callBack) {
                gInboxId = gInboxId || "";
                var baseUrl = $location.absUrl().split("#")[0];
                if (!Feature.FEATURE_MANUAL_REVIEWED && type == "g_issue") {
                    var url = baseURL + '/action?setReviewedNew=1';
                    var userId = localStorage.userid;
                    var params = '__DATA={"userId":"' + userId + '","infoId":"' + info_id + '"}';
                    url = url + "&" + params;
                    httpProxy.getJSON(url, "", function (data) {
                        var result = data.data.result;
                        if (!result) {
                            Toast.showPop("操作失败，请重新操作！");
                        } else {
                            $scope.doRefresh();
                            Toast.showPop("操作成功");
                        }
                    });
                }
                var obj = new Object();
                title = decodeURIComponent(title);
                obj.title = title || "表单";
                obj.align = "bottom";
                obj.tabItems = new Array();

                //表单
                var xform = new Object();
                xform.type = "webview";
                //          xform.url=baseUrl+"#/xform/"+formId+"/"+info_id+"/"+moduleId+"/"+wfId+"/"+pid+"/"+pnid+"/"+v;
                xform.url = "http://10.40.32.120:8080/mobileOA/html/xform.html";
                xform.title = "表单";
                obj.tabItems.push(xform);

                //表单附件
                var attachmentFiles = new Object();
                attachmentFiles.type = "webview";
                attachmentFiles.url = baseUrl + "#/attachmentFiles/" + moduleId + "/" + pid + "/" + pnid + "/" + info_id + "/" + formId + "/" + type;
                attachmentFiles.title = "表单附件";
                obj.tabItems.push(attachmentFiles);

                if (showComment) {
                    var comments = new Object();
                    comments.type = "webview";
                    comments.url = baseUrl + "#/comments/" + pid + "/" + info_id + "/" + type;
                    comments.title = "表单意见";
                    obj.tabItems.push(comments);
                }

                obj.actions = new Array();
                if (v != 1) {
                    var sendButton = new Object();
                    sendButton.id = "3330";
                    sendButton.title = "发送";
                    sendButton.icon = "xform_send.png";
                    sendButton.action = "javascript:sendFlow()";
                    obj.actions.push(sendButton);
                    var saveButton = new Object();
                    saveButton.id = "3331";
                    saveButton.title = "保存";
                    saveButton.icon = "menu_vertical.png";
                    saveButton.action = "javascript:savexForm()";
                    obj.actions.push(saveButton);
                }

                if (type == "g_issue") {
                    if (Feature.FEATURE_MANUAL_REVIEWED) {
                        var reviewedButton = new Object();
                        reviewedButton.id = "3332";
                        reviewedButton.icon = "menu_vertical.png";
                        reviewedButton.title = "阅毕";
                        reviewedButton.action = "javascript:readItem()";
                        obj.actions.push(reviewedButton);
                    }
                }
                var xfromTabInfo = JSON.stringify(obj);
                console.log(xfromTabInfo);
                //          xsfWindow.showTab('{"title": "title","align": "bottom","tabItems": [{"type": "webview","url": "http://www.baidu.com","title": "biaodan"},{"type": "webview","url": "http://www.baidu.com","title": "biaodanfujian"}],"actions": [{"id": "3331","title": "bancun","icon": "xform_send.png","action": "javascript:alert(1)"},{"id": "3330","title": "huanban","icon": "menu_vertical.png","action": "javascript:alert(2)"}]}',
                xsfWindow.showTab(xfromTabInfo,
                    function (result) {

                    },
                    function (error) {

                    }
                );
            },
            openFileTest: function (formId, info_id, moduleId, wfId, pid, pnid, title, showComment, v, type, gInboxId, callBack) {
                var obj = new Object();
                obj.title = "title";
                obj.align = "bottom";
                obj.tabItems = new Array();
                var tab1 = new Object();
                tab1.type = "webview";
                tab1.url = "http://www.baidu.com";
                tab1.title = "biaodan";
                obj.tabItems.push(tab1);
                var tab2 = new Object();
                tab2.type = "webview";
                tab2.url = "http://www.baidu.com";
                tab2.title = "biaodanfujian";
                obj.tabItems.push(tab2);
                obj.actions = new Array();

                var act1 = new Object();
                tab1.id = "3331";
                tab1.icon = "xform_send.png";
                tab1.title = "bancun";
                tab1.action = "javascript:alert(2)";
                obj.actions.push(tab1);
                var act2 = new Object();
                tab2.id = "3331";
                tab2.title = "保存";
                tab1.icon = "menu_vertical.png";
                tab2.action = "javascript:alert(2)";
                obj.actions.push(tab2);
                var xfromTabInfo = JSON.stringify(obj);
                //            xsfWindow.showTab('{"title": "title","align": "bottom","tabItems": [{"type": "webview","url": "http://www.baidu.com","title": "biaodan"},{"type": "webview","url": "http://www.baidu.com","title": "biaodanfujian"}],"actions": [{"id": "3331","title": "bancun","icon": "xform_send.png","action": "javascript:alert(1)"},{"id": "3330","title": "huanban","icon": "menu_vertical.png","action": "javascript:alert(2)"}]}',
                xsfWindow.showTab(xfromTabInfo,
                    function (result) {

                    },
                    function (error) {

                    }
                );
            }
        };

    })
    .service('Comment', function ($rootScope, $http, $q, httpProxy, Toast) {
        return {
            queryMore: function (item) {
                var url = baseURL + '/action?getInboxComment=1&userId=' + item.userId + '&info_id=' + item.info_id + '&pid=' + item.pid;
                var deferred = $q.defer();
                httpProxy.getJSON(url, "", function (data) {
                    deferred.resolve(data.data);
                });
                /*$http.jsonp(url).success(function(data, status, headers, config){
		        deferred.resolve(data); 
		    }).error(function(data, status, headers, config){
		    	deferred.reject('{"message":"发生异常","status":status}'); 
		    });*/
                return deferred.promise;
            },
            /*保存意见*/
            save: function (paramObj, opinion, callback) {
                var json = {
                    userId: paramObj["userId"],
                    username: paramObj["username"],
                    info_id: paramObj["info_id"],
                    pid: paramObj["pid"],
                    pnid: paramObj["pnid"],
                    opinion: opinion
                };
                var params = encodeURIComponent(JSON.stringify(json));
                var url = baseURL + "/action?saveOpinion=1&__DATA=" + params;
                console.log(url);
                httpProxy.getJSON(url, "", callback);
            },
            getComment: function (userId, moduleId, actName) {
                moduleId = moduleId || "";
                actName = actName || "";
                var url = baseURL + "/action?getUsedOpinion=1&userId=" + userId + "&moduleId=" + moduleId + "&actName=" + actName;
                var deferred = $q.defer();
                console.log(url);
                httpProxy.getJSON(url, "", function (data) {
                    deferred.resolve(data.data);
                });
                return deferred.promise;
            },
            saveTemplate: function (userId, opinion, moduleId, actName) {
                var json = {
                    userId: userId,
                    opinion: opinion,
                    moduleId: (moduleId || ""),
                    actName: (actName || "")
                };
                var params = encodeURIComponent(JSON.stringify(json));

                var url = baseURL + "/action?saveUsedOpinion=1&__DATA=" + params;
                var deferred = $q.defer();
                console.log(url);
                httpProxy.getJSON(url, "", function (data) {
                    deferred.resolve(data.data);
                });
                return deferred.promise;
            },
            deleteTemplate: function (id) {
                var url = baseURL + "/action?deleteUsedOpinion=1&id=" + id;
                var deferred = $q.defer();
                console.log(url);
                httpProxy.getJSON(url, "", function (data) {
                    deferred.resolve(data.data);
                });
                return deferred.promise;
            }
        };

    })

    .service('appEvent', function ($http, $state, httpProxy, Toast) {
        return {
            bind: function (scope) {
                scope.openModule = function (type) {
                    var url = "";
                    if (type == "FileActivity") {
                        //待办
                        url = "app.todolist";
                    } else if (type == "ReviewActivity") {
                        //待阅
                        url = "app.reviewlist";
                    } else if (type == "CalendarActivity") {
                        //日程
                        url = "app.calendar";
                    } else if (type == "MeetingNoticeActivity") {
                        //会议通知
                        url = "app.meetingnotice";

                    } else if (type == "NoteActivity") {
                        //便笺
                        url = "app.notes";

                    } else if (type == "NoticeActivity") {
                        //通知公告
                        url = "app.notices";
                    } else if (type == "NewsActivity") {
                        url = "app.news";
                    } else if (type == "ExsitFile") {
                        //流程监控
                        url = "app.exsitFile";
                    } else if (type == "MyFavorite") {
                        url = "app.myFavorite";
                    } else if (type == "History") {
                        //综合查询
                        url = "app.history";
                    } else if (type == "FileDraft") {
                        //综合查询
                        url = "app.fileDraft";
                    }
                    $state.go(url);
                }

                window.openModule = scope.openModule;

                scope.goBack = function () {
                    xsfWindow.close(1, function () { });
                }

                scope.openForm = function (formId, info_id, moduleId, wfId, pid, pnid, title, showComment, v, type, gInboxId) {
                    var formId = formId || '';
                    var info_id = info_id || '';
                    var moduleId = moduleId || '';
                    var wfId = wfId || '';
                    var pid = pid || '';
                    var pnid = pnid || '';
                    var gInboxId = gInboxId || '';
                    var title = title || ''
                    var showComment = showComment || '';
                    if (type == "g_inbox") {
                        showComment = 1;
                    }
                    var type = type || '';
                    var v = v || '';
                    $state.go('xformTab', { formId: formId, info_id: info_id, moduleId: moduleId, wfId: wfId, pid: pid, pnid: pnid, showComment: showComment, title: title, v: v, type: type, gInboxId: gInboxId });
                }
                window.openModule = scope.openModule;

                scope.openForm = function (formId, info_id, moduleId, wfId, pid, pnid, title, showComment, v, type, gInboxId) {
                    var formId = formId || '';
                    var info_id = info_id || '';
                    var moduleId = moduleId || '';
                    var wfId = wfId || '';
                    var pid = pid || '';
                    var pnid = pnid || '';
                    var gInboxId = gInboxId || '';
                    var title = title || ''
                    var showComment = showComment || '';
                    var type = type || '';
                    var v = v || '';
                    //是代办类型
                    if (type == "g_inbox") {
                        showComment = 1;
                    }
                    //是待阅类型
                    if (type == "g_issue") {
                        var url = baseURL + '/action?setReviewedNew=1';
                        var params = '__DATA={"userId":"' + userId + '","infoId":"' + info_id + '"}';
                        url = url + "&" + params;
                        httpProxy.getJSON(url, "", function (data) {
                            var result = data.data.result;
                            if (!result) {
                                Toast.showPop("操作失败，请重新操作！");
                            } else {
                                Toast.showPop("操作成功");
                            }
                        });
                    }
                    $state.go('xformTab', { formId: formId, info_id: info_id, moduleId: moduleId, wfId: wfId, pid: pid, pnid: pnid, showComment: showComment, title: title, v: v, type: type, gInboxId: gInboxId });
                }

                window.openForm = scope.openForm;

                scope.openNote = function (noteId) {
                    $state.go('noteDetail', { noteId: noteId, edit: true });
                }

                window.openNote = scope.openNote;
            }
        }
    })

    .service('flowSelect', function ($http, $ionicPopup) {
        return {
            showPop: function (datas, isSingle, nodeId, checkUsers, scope, callBack, index) {
                var template = '<div class="list" id="selectUsersDom" style="width:100%;height:80%;min-height:300px; ">' +
                    '<ol class="breadcrumb" >' +
                    '<li class="breadcrumb-head-item" ng-click="showUserByDept(parent,{{$index}},true)" ng-repeat="parent in parents" >{{parent.name}}</li>' +
                    '</ol>' +
                    '<ion-list>' +
                    '<ion-item ng-if="flowUsers && flowUsers.length > 0"  ng-repeat="user in flowUsers" class="item item-checkbox item-icon-right item-icon-left">' +
                    '<div>' +
                    '<label class="checkbox checkbox-stable" style="width:48px;">' +
                    '<input  ng-if="!user.checked" orgid="{{item.ORGANIZE_ID}}" orgname="{{item.ORGANIZE_NAME}}" userid="{{user.id}}" username="{{user.name}}" ' +
                    'style="left:25px;top:5px;" type="checkbox" ion-stop-event ng-click="finish(user.orgId,user.orgName,user.id,user.name,user.nodeid,$event);" >' +
                    '<input checked="{{user.checked}}" ng-if="user.checked" orgid="{{item.ORGANIZE_ID}}" orgname="{{item.ORGANIZE_NAME}}" userid="{{user.id}}" username="{{user.name}}" ' +
                    'style="left:25px;top:5px;" type="checkbox" ion-stop-event ng-click="finish(user.orgId,user.orgName,user.id,user.name,user.nodeid,$event);" >' +
                    '</label>' +
                    '</div>' +
                    '<div style="margin-left:30px;">' +
                    '<i class="ion-android-person"></i><span style="margin-left:15px;line-height:21px;">{{user.name}} </span><span class="badge">{{user.mobile}}</span>' +
                    '</div>' +
                    '</ion-item>' +
                    '<div ng-if="flowDepts && flowDepts.length > 0"  ng-repeat="item in flowDepts">' +
                    '<div class="item item-divider" ng-click="showUserByDept(item,{{$index}},false)">' +
                    '<span><i class="icon ion-arrow-right-b padding-right"></i>{{item.name}}</span>' +
                    '<span class="user_count" ng-if="item.user_count != undefined" style="color: #369;float: right;margin-right: 10px;">{{item.user_selecteds}}/{{item.user_count}}</span>' +
                    '</div>' +
                    '</div>' +
                    '</ion-list>' +
                    '</div>';
                //TODO
                scope.parents = new Array();
                scope.selectUserArr = new Array();

                function initData() {
                    var data = datas.rows;
                    var data1 = data[index].depts;
                    //虚拟一个根节点
                    var root = new Object();
                    root.id = -1;
                    root.pid = "-100";
                    root.name = "组织机构";
                    root.users = data[index].users;
                    if (root.depts == undefined) {
                        root.depts = new Array();
                    }
                    if (root.users == undefined) {
                        root.users = new Array();
                    }
                    root.depts = data1;

                    data1 = root;

                    //单个部门节点直接作为根节点
                    if (data1.users.length == 0 && data1.depts.length == 1) {
                        data1 = data1.depts[0];
                    }
                    scope.parents.push(data1);
                    initDepts(data1);
                    //当只有一个人发送只，直接默认勾选人
                    var listU = data1.users;
                    if (listU != undefined && listU.length == 1) {
                        var user = listU[0];
                        user.checked = true;
                        var obj = new Object();
                        obj.orgid = user.orgId;
                        obj.orgname = user.orgName;
                        obj.userid = user.id;
                        obj.username = user.name;
                        obj.nodeid = user.nodeid;
                        scope.selectUserArr.push(obj);
                    }
                }
                initData();

                scope.showUserByDept = function (item, index, isTable) {
                    if (item) {
                        initDepts(item);
                        if (isTable) {
                            scope.parents.splice(index + 1, scope.parents.length - 1);
                        } else {
                            scope.parents.push(item);
                        }
                    }
                }

                function initDepts(data) {
                    scope.flowDepts = new Array();
                    scope.flowUsers = new Array();
                    var depts = data.depts;
                    var users = data.users;
                    for (var i = 0; depts && i < depts.length; i++) {
                        depts[i].isShow = false;
                        depts[i].user_selecteds = 0;
                        var tempUser = depts[i].users;
                        for (var j = 0; j < scope.selectUserArr.length; j++) {
                            for (var k = 0; tempUser && k < tempUser.length; k++) {
                                if (tempUser[k].id == scope.selectUserArr[j].userid) {
                                    depts[i].user_selecteds++;
                                }
                            }
                        }
                        scope.flowDepts.push(depts[i]);
                    }

                    for (var i = 0; users && i < users.length; i++) {
                        users[i].isShow = false;
                        users[i].checked = false;
                        for (var k = 0; k < scope.selectUserArr.length; k++) {
                            if (users[i].id == scope.selectUserArr[k].userid) {
                                users[i].checked = true;
                            }
                        }
                        scope.flowUsers.push(users[i]);
                    }
                }
                scope.finish = function (orgid, orgname, userid, username, mobile, $event) {
                    setSelectUsers(orgid, orgname, userid, username, mobile);
                    if (isSingle) {
                        $("#selectUsersDom").find("input:checked").each(function (i) {
                            //console.log(userid);
                            if ($(this).attr('userid') != userid) {
                                $(this).attr("checked", false);
                            }
                        });
                    }
                    $event.stopPropagation();
                };

                function setSelectUsers(orgid, orgname, userid, username, nodeid) {
                    var state = 0;
                    var obj = new Object();
                    obj.orgid = orgid;
                    obj.orgname = orgname;
                    obj.userid = userid;
                    obj.username = username;
                    obj.nodeid = nodeid;
                    if (isSingle) {
                        scope.selectUserArr = new Array();
                    }
                    if (scope.selectUserArr.length == 0) {
                        scope.selectUserArr.push(obj);
                    } else {
                        for (var i = 0; i < scope.selectUserArr.length; i++) {
                            if (scope.selectUserArr[i].userid == userid) {
                                scope.selectUserArr.splice(i, 1);
                                state = 0;
                                break;
                            }
                            state = 1;
                        }
                        if (state) {
                            scope.selectUserArr.push(obj);
                        }
                    }
                }

                function containId(id, array) {
                    for (var j = 0; j < array.length; j++) {
                        if (array[j].userid == id && nodeId == array[j].nodeid) {
                            return true;
                        }
                    }
                    return false;
                }

                scope.saveForm = function () {
                    if (scope.nodeUser == undefined || scope.nodeUser.length == 0) {
                        scope.nodeUser = scope.selectUserArr;
                    } else {
                        for (var l = 0; l < scope.selectUserArr.length; l++) {
                            scope.nodeUser.push(scope.selectUserArr[l]);
                        }
                    }
                    console.log(checkUsers);
                    callBack();
                };
                myPopup = $ionicPopup.show({
                    title: '<p style="font-weight:bold;">人员选择</p>',
                    template: template,
                    scope: scope,
                    buttons: [{
                        text: '<b>关闭</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            myPopup.close();
                            e.preventDefault();
                        }
                    }, {
                        text: '<b>确定</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            scope.saveForm();
                            myPopup.close();
                            e.preventDefault();
                        }
                    }]
                });
            }
        };
    })

    .service('User', function ($http, $q, httpProxy) {
        return {
            login: function (user) {
                var loginData = {};
                loginData.logname = user.logname || "";
                loginData.password = user.password || "";
                loginData.device_id = "-1";
                loginData.auth_type = user.auth_type || "";
                loginData.token = user.token || "";
                loginData.encryption = true;

                if (loginData.encryption) {
                    loginData.logname = Base64.encode(loginData.logname);
                    loginData.password = Base64.encode(loginData.password);
                }

                var url = baseURL + '/action?userLogin=1' + '&__DATA=' + JSON.stringify(loginData);

                var deferred = $q.defer();
                httpProxy.getJSON(url, "", function (data) {
                    deferred.resolve(data.data);
                }, function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            }, //end login

            logout: function (userId) {
                var url = baseURL + '/action?userLogout=1&__DATA={"userId":"' + userId + '"}';
                var deferred = $q.defer();
                httpProxy.getJSON(url, "", function (data) {
                    deferred.resolve(data.data);
                });
                return deferred.promise;
            } //end logout
        };

    })

    .service('breadcrumbUserSelect', function ($http, $ionicPopup, $ionicLoading, httpProxy) {
        return {
            showPop: function ($timeout, Toast, selectData, isSingle, scope, callBack, rootDept) {
                var template = ' <div class="list" id="selectUsersDom" style="width:100%;height:80%;">' +
                    '<ol class="breadcrumb"  style="height:100%">' +
                    '<li class="breadcrumb-head-item" ng-click="showUserByDept(parent.id)" ng-repeat="parent in parents" >{{parent.name}}</li>' +
                    '</ol>' +

                    '<ion-list >' +
                    '<ion-item ng-if="users && users.length > 0"  ng-repeat="user in users" class="item item-checkbox item-icon-right item-icon-left">' +
                    '<div>' +
                    '<label class="checkbox checkbox-stable" style="width:48px;">' +
                    '<input  ng-if="!user.checked" orgid="{{item.ORGANIZE_ID}}" orgname="{{item.ORGANIZE_NAME}}" userid="{{user.id}}" username="{{user.name}}" style="left:25px;top:5px;" type="checkbox" ion-stop-event ng-click="finish(user.orgStep,parent.name,user.id,user.name,user.mobile,$event);" >' +
                    '<input checked="{{user.checked}}" ng-if="user.checked" orgid="{{item.ORGANIZE_ID}}" orgname="{{item.ORGANIZE_NAME}}" userid="{{user.id}}" username="{{user.name}}" style="left:25px;top:5px;" type="checkbox" ion-stop-event ng-click="finish(user.orgStep,parent.name,user.id,user.name,user.mobile,$event);" ></label>' +
                    '</div>' +
                    '<div style="margin-left:30px;"><image src="../images/user_default_icon.png" class="icon-left icon-photo"> </image>{{user.name}} <span class="badge">{{user.mobile}}</span></div>' +
                    '</ion-item>' +
                    '<div ng-if="items && items.length > 0"  ng-repeat="item in items">' +
                    '<div class="item item-divider" ng-click="showUserByDept(item.id)">' +
                    '<span><i class="icon ion-arrow-right-b padding-right"></i>{{item.name}}</span><span class="user_count" ng-if="item.user_count != undefined" style="color: #369;float: right;margin-right: 10px;">{{item.user_selecteds}}/{{item.user_count}}</span>' +
                    '</div>' +
                    '</div>' +
                    '</ion-list>' +

                    '</div>';

                var userId = localStorage.userid;
                var rootDept = rootDept || localStorage.mainUnit;
                var deptId = 1000;
                scope.baseURL = baseURL;
                scope.nowpageIndex = 0;
                scope.pageSize = pageSize;
                scope.tabType = 1;
                scope.isExistData = true;
                //scope.defaultUserIcon = CommonConstants.DEFAULT_USER_ICON;
                scope.items = new Array();
                scope.parents = new Array();
                scope.users = new Array();
                //TODO
                var tempSelectedArr = [];
                for (var i = 0; i < scope.selectUserArr.length; i++) {
                    tempSelectedArr.push(scope.selectUserArr[i]);
                }

                function containId(id, array) {
                    for (var j = 0; j < array.length; j++) {
                        console.log(array[j].userid);
                        if (array[j].userid = id) {
                            return true;
                        }
                    }
                    return false;
                }

                function showDept(deptId) {
                    $ionicLoading.show({
                        template: '加载中...'
                    });
                    scope.items = new Array();
                    scope.users = new Array();
                    scope.parents = new Array();
                    var messageUrl = baseURL + "/action?userContactActionIonic=1&action=getOrgUsersNew&rootDeptId=" + deptId + "&userId=" + localStorage.userid;
                    httpProxy.getJSON(messageUrl, "", function (data) {
                        var datas = data.data.rows;
                        var users = data.data.users;
                        var parents = data.data.parents;
                        var deptName = data.data.deptName;
                        scope.groupName = deptName;
                        for (var i = 0; datas && i < datas.length; i++) {
                            datas[i].isShow = false;
                            datas[i].user_selecteds = 0;
                            for (var j = 0; j < scope.selectUserArr.length; j++) {
                                if ((scope.selectUserArr[j].orgid + "").startsWith(datas[i].step + "")) {
                                    datas[i].user_selecteds++;
                                }
                            }
                            scope.items.push(datas[i]);
                        }

                        for (var i = 0; users && i < users.length; i++) {
                            users[i].isShow = false;
                            for (var k = 0; k < scope.selectUserArr.length; k++) {
                                if (users[i].id == scope.selectUserArr[k].userid) {
                                    users[i].checked = true;
                                }
                            }
                            scope.users.push(users[i]);
                        }

                        for (var i = 0; parents && i < parents.length; i++) {
                            parents[i].isShow = true;
                            scope.parents.push(parents[i]);
                        }

                        $timeout(function () {
                            $ionicLoading.hide();
                        }, 150);
                    }, function (data) {
                        $ionicLoading.hide();
                        Toast.showPop("加载出错");
                    });
                }
                scope.showUserByDept = function (deptId) {
                    showDept(deptId);
                };
                scope.finish = function (id, $event) {
                    $event.stopPropagation();
                };

                scope.getCheckUsers = function () {
                    callBack(scope.selectUserArr);
                };

                scope.checkAll = function (deptId, $event) {
                    var checked = $event.target.checked;
                    for (var j = 0; j < scope.orgitems.length; j++) {
                        if (deptId == scope.orgitems[j].id) {
                            for (var i = 0; i < scope.orgitems[j].users.length; i++) {
                                scope.orgitems[j].users[i]['checked'] = checked;
                            }
                        }
                    }

                    $("#" + deptId).find("input:checked").each(function (i) {
                        $(this).attr("checked", checked);
                    });
                    console.log(scope.orgitems);
                }

                scope.finish = function (orgid, orgname, userid, username, mobile, $event) {
                    setSelectUsers(orgid, orgname, userid, username, mobile);
                    if (isSingle) {
                        $("#selectUsersDom").find("input:checked").each(function (i) {
                            //console.log(userid);
                            if ($(this).attr('userid') != userid) {
                                $(this).attr("checked", false);
                            }
                        });
                    }
                    $event.stopPropagation();
                };

                function setSelectUsers(orgid, orgname, userid, username, mobile) {
                    var state = 0;
                    var obj = new Object();
                    obj.orgid = orgid;
                    obj.orgname = orgname;
                    obj.userid = userid;
                    obj.username = username;
                    obj.mobile = mobile;
                    if (scope.selectUserArr.length == 0) {
                        scope.selectUserArr.push(obj);
                    } else {
                        for (var i = 0; i < scope.selectUserArr.length; i++) {
                            if (scope.selectUserArr[i].userid == userid) {
                                scope.selectUserArr.splice(i, 1);
                                state = 0;
                                break;
                            }
                            state = 1;
                        }
                        if (state) {
                            scope.selectUserArr.push(obj);
                        }
                    }
                }

                function initPopupData() {
                    showDept(1000);
                }

                initPopupData();

                myPopup = $ionicPopup.show({
                    title: '<p style="font-weight:bold;">人员选择</p>',
                    template: template,
                    scope: scope,
                    buttons: [{
                        text: '<b>关闭</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            scope.selectUserArr = new Array();
                            for (var i = 0; i < tempSelectedArr.length; i++) {
                                scope.selectUserArr.push(tempSelectedArr[i]);
                            }
                            myPopup.close();
                            e.preventDefault();
                        }
                    }, {
                        text: '<b>确定</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            scope.getCheckUsers();
                            myPopup.close();
                            e.preventDefault();
                        }
                    }]
                });
            }
        }
    })

    .service('DataSource', function ($http, $q, httpProxy) {
        return {
            getData: function (action, paramObj) {
                var urlParam = "";
                if (paramObj) {
                    urlParam = "&" + $.param(paramObj);
                }

                var url = baseURL + '/action?' + action + urlParam;
                var deferred = $q.defer();
                httpProxy.getJSON(url, "", function (data) {
                    deferred.resolve(data.data);
                }, function (data) {
                    deferred.reject(data);
                });

                return deferred.promise;
            }
        };
    })

    .service('Recycling', function ($http, $q, httpProxy) {
        return {
            queryList: function (userId, start, limit) {
                var url = baseURL + '/action?getFileRecycle=1&userId=' + userId + "&start=" + start + "&limit=" + limit + '&key=';

                var deferred = $q.defer();
                httpProxy.getJSON(url, "", function (data) {
                    deferred.resolve(data.data);
                })
                /*$http.jsonp(url).success(function(data, status, headers, config){
            deferred.resolve(data); 
        }).error(function(data, status, headers, config){
            deferred.reject('{"message":"发生异常","status":status}'); 
        });*/
                return deferred.promise;
            }
        };

    })

    .service('usedAndOrgSelect', function ($http, $ionicPopup, $ionicLoading, httpProxy) {
        return {
            showPop: function ($timeout, Toast, selectData, isSingle, scope, callBack, rootDept) {
                var template = '<div class="tabs-striped tabs-top tabs-background-positive tabs-color-light">' +
                    '<div class="tabs">' +
                    '<a class="tab-item" ng-click="changeTab(1)" id="commonTab"> 常用 </a>' +
                    '<a class="tab-item active" ng-click="changeTab(2)" id="orgTab"> 机构通讯录 </a>' +
                    '</div></div>' +

                    '<div class="list" id="selectUsersDom" style="width:100%;height:80%;top:39px;min-height:300px; ">' +

                    //*********************面包屑 机构通讯录***************start
                    '<ol class="breadcrumb" ng-if="tabType">' +
                    '<li class="breadcrumb-head-item" ng-click="showUserByDept(parent.id)" ng-repeat="parent in parents" >{{parent.name}}</li>' +
                    '</ol>' +
                    '<ion-list ng-if="tabType">' +
                    //-------------人员------
                    '<div ng-if="users && users.length > 0"  ng-repeat="user in users" class="item item-checkbox item-icon-right item-icon-left" style="padding:10px;">' +
                    '<label class="checkbox checkbox-stable" style="width:48px;">' + // 复选框
                    '<input  ng-if="!user.checked" orgid="{{item.ORGANIZE_ID}}" orgname="{{item.ORGANIZE_NAME}}" userid="{{user.id}}" username="{{user.name}}" ' +
                    'type="checkbox" ion-stop-event ng-click="finish(user.orgStep,parent.name,user.id,user.name,user.mobile,$event);" >' +
                    '<input checked="{{user.checked}}" ng-if="user.checked" orgid="{{item.ORGANIZE_ID}}" orgname="{{item.ORGANIZE_NAME}}" userid="{{user.id}}" username="{{user.name}}" ' +
                    'type="checkbox" ion-stop-event ng-click="finish(user.orgStep,parent.name,user.id,user.name,user.mobile,$event);" >' +
                    '</label>' +
                    '<div style="margin-left:30px;">' +
                    '<i class="ion-android-person"></i>' +//头像
                    '<span style="margin-left:15px;line-height:21px;">{{user.name}} </span>' +//名字
                    '<span class="badge">{{user.mobile}}</span>' +//电话
                    '</div>' +
                    '</div>' +
                    //--------------部门------
                    '<div ng-if="items && items.length > 0"  ng-repeat="item in items">' +
                    '<div class="item item-divider" ng-click="showUserByDept(item.id)">' +
                    '<span><i class="icon ion-arrow-right-b padding-right"></i>{{item.name}}</span>' +//部门名字
                    '<span class="user_count" ng-if="item.user_count != undefined" style="color: #369;float: right;margin-right: 10px;">' +
                    '{{item.user_selecteds}}/{{item.user_count}}' +// 已选人数/总数
                    '</span>' +
                    '</div>' +
                    '</div>' +
                    '</ion-list>' +
                    //---------空白页--------
                    '<div ng-if="tabType" ng-show="items.length == 0 && users.length == 0" style="font-size:30px;color:#ccc;text-align:center;padding:50px 0px 0px;">' +
                    '<i class="ion-clipboard" style="font-size:90px"></i><br /><br /> 暂无联系人' +
                    '</div>' +
                    //*********************面包屑 机构通讯录***************end 

                    //******************常用********************start
                    '<div ng-repeat="item in commonitems" id="commonList" class="item item-checkbox item-icon-right item-icon-left" ng-if="!tabType" style="padding:10px;">' +
                    '<label class="checkbox checkbox-stable" style="width:48px;">' +//复选框
                    '<input  ng-if="!item.checked" orgid="{{item.ORGANIZE_ID}}" orgname="{{item.ORGANIZE_NAME}}" userid="{{item.USER_ID}}" username="{{item.USER_NAME}}" ' +
                    'type="checkbox" ion-stop-event ng-click="finish(item.ORGANIZE_ID,item.ORGANIZE_NAME,item.USER_ID,item.USER_NAME,item.MOBILE,$event);" >' +
                    '<input checked="{{item.checked}}" ng-if="item.checked" orgid="{{item.ORGANIZE_ID}}" orgname="{{item.ORGANIZE_NAME}}" userid="{{item.USER_ID}}" username="{{item.USER_NAME}}" ' +
                    'type="checkbox" ion-stop-event ng-click="finish(item.ORGANIZE_ID,item.ORGANIZE_NAME,item.USER_ID,item.USER_NAME,item.MOBILE,$event);" >' +
                    '</label>' +
                    '<div style="margin-left:30px;">' +
                    '<i class="ion-android-person"></i>' +//头像
                    '<span style="margin-left:15px;line-height:21px;">{{item.USER_NAME}} </span>' +//名字
                    '<span class="badge">{{item.MOBILE}}</span>' +//电话
                    '</div>' +
                    '</div>' +
                    //---------空白页--------
                    '<div ng-if="!tabType" ng-show="commonitems.length==0" style="font-size:30px;color:#ccc;text-align:center;padding:50px 0px 0px;">' +
                    '<i class="ion-clipboard" style="font-size:90px"></i><br /><br /> 暂无联系人' +
                    '</div>' +
                    //******************常用********************end

                    '</div>';
                var userId = localStorage.userid;
                var rootDept = rootDept || localStorage.mainUnit;
                var deptId = -1;
                scope.baseURL = baseURL;
                scope.nowpageIndex = 0;
                scope.pageSize = pageSize;
                scope.tabType = 1;
                scope.isExistData = true;
                scope.defaultUserIcon = CommonConstants.DEFAULT_USER_ICON;
                scope.items = new Array();
                scope.parents = new Array();
                scope.users = new Array();

                var tempSelectedArr = [];
                for (var i = 0; i < scope.selectUserArr.length; i++) {
                    tempSelectedArr.push(scope.selectUserArr[i]);
                }

                scope.changeTab = function (type) {
                    if (type == 1) {
                        $("#commonTab").addClass("active");
                        $("#orgTab").removeClass("active");
                        getUsedUser();
                        scope.tabType = 0;
                    } else {
                        $("#commonTab").removeClass("active");
                        $("#orgTab").addClass("active");
                        showDept(-1);
                        scope.tabType = 1;
                    }
                }

                function batchRawQuery(selectArray) {
                    db.transaction(function (tx) {
                        //不管是否存在，先更新+1
                        for (var i = 0; i < selectArray.length; i++) {
                            tx.executeSql("UPDATE U_USER_USED SET USED_COUNT = USED_COUNT+1,LATEST_USED_TIME = ? WHERE USER_ID = ? ", [new Date().Format("yyyy-MM-dd HH:mm:ss"), selectArray[i].userid],
                                function (tx, result) {
                                    console.log(result.rowsAffected ? "update 3983 :success" : "update 3983 :IGNORE");
                                },
                                function (tx, err) {
                                    console.log("update err: " + err.message);
                                });
                        }

                        //不管是否存在，直接插入数据，存在则插入失败。
                        for (var i = 0; i < selectArray.length; i++) {
                            var mobile = selectArray[i].mobile || ""
                            tx.executeSql("INSERT OR IGNORE INTO U_USER_USED (USER_ID, USER_NAME, ORGANIZE_ID, ORGANIZE_NAME, USED_COUNT, CREATE_TIME, LATEST_USED_TIME, MOBILE) VALUES (?,?,?,?,1,?,?,?)", [selectArray[i].userid, selectArray[i].username, selectArray[i].orgid, selectArray[i].orgname, new Date().Format("yyyy-MM-dd HH:mm:ss"), new Date().Format("yyyy-MM-dd HH:mm:ss"), mobile],
                                function (tx, result) {
                                    console.log(result.rowsAffected ? "insertId: " + result.insertId + "///rowsAffected: SUCCESS" : "insertId: " + result.insertId + "///rowsAffected: IGNORE");
                                },
                                function (tx, err) {
                                    console.log(err.message);
                                });
                        }
                    }, function (e) {
                        console.log(e.message);
                    });
                }

                function getUsedUser() {
                    db.transaction(function (tx) {
                        tx.executeSql("SELECT * FROM U_USER_USED ORDER BY USED_COUNT DESC", [],
                            function (tx, result) {
                                scope.commonitems = new Array();
                                for (var j = 0; j < result.rows.length; j++) {
                                    var obj = new Object();
                                    obj.CREATE_TIME = result.rows.item(j).CREATE_TIME;
                                    obj.ORGANIZE_ID = result.rows.item(j).ORGANIZE_ID;
                                    obj.ORGANIZE_NAME = result.rows.item(j).ORGANIZE_NAME;
                                    obj.USED_COUNT = result.rows.item(j).USED_COUNT;
                                    obj.USER_ID = result.rows.item(j).USER_ID;
                                    obj.USER_NAME = result.rows.item(j).USER_NAME;
                                    obj.MOBILE = result.rows.item(j).MOBILE || "";
                                    for (var k = 0; k < scope.selectUserArr.length; k++) {
                                        if (obj.USER_ID == scope.selectUserArr[k].userid) {
                                            obj.checked = true;
                                            break;
                                        }
                                    }
                                    scope.commonitems.push(obj);
                                    scope.$apply(function () {
                                        scope.commonitems = scope.commonitems;
                                    });
                                }
                            },
                            function (tx, err) {
                                console.log(err.message);
                            }
                        );
                    }, function (e) {
                        console.log("Database Error : " + error.message);
                    });
                }

                function containId(id, array) {
                    for (var j = 0; j < array.length; j++) {
                        console.log(array[j].userid);
                        if (array[j].userid = id) {
                            return true;
                        }
                    }
                    return false;
                }

                function showDept(deptId) {
                    $ionicLoading.show({
                        template: '加载中...'
                    });
                    scope.items = new Array();
                    scope.users = new Array();
                    scope.parents = new Array();
                    var messageUrl = baseURL + "/action?userContactActionIonic=1&action=getOrgUsersNew&rootDeptId=" + deptId + "&userId=" + localStorage.userid;
                    httpProxy.getJSON(messageUrl, "", function (data) {
                        var datas = data.data.rows;
                        var users = data.data.users;
                        var parents = data.data.parents;
                        var deptName = data.data.deptName;
                        scope.groupName = deptName;
                        for (var i = 0; datas && i < datas.length; i++) {
                            datas[i].isShow = false;
                            datas[i].user_selecteds = 0;
                            for (var j = 0; j < scope.selectUserArr.length; j++) {
                                if ((scope.selectUserArr[j].orgid + "").startsWith(datas[i].step + "")) {
                                    datas[i].user_selecteds++;
                                }
                            }
                            scope.items.push(datas[i]);
                        }

                        for (var i = 0; users && i < users.length; i++) {
                            users[i].isShow = false;
                            for (var k = 0; k < scope.selectUserArr.length; k++) {
                                if (users[i].id == scope.selectUserArr[k].userid) {
                                    users[i].checked = true;
                                }
                            }
                            scope.users.push(users[i]);
                        }

                        for (var i = 0; parents && i < parents.length; i++) {
                            parents[i].isShow = false;
                            scope.parents.push(parents[i]);
                        }

                        $timeout(function () {
                            $ionicLoading.hide();
                        }, 150);
                    }, function (data) {
                        $ionicLoading.hide();
                        Toast.showPop("加载出错");
                    });
                }
                scope.showUserByDept = function (deptId) {
                    showDept(deptId);
                };
                scope.finish = function (id, $event) {
                    $event.stopPropagation();
                };

                scope.getCheckUsers = function () {
                    batchRawQuery(scope.selectUserArr); //保存本地数据库
                    callBack(scope.selectUserArr);
                };

                scope.checkAll = function (deptId, $event) {
                    var checked = $event.target.checked;
                    for (var j = 0; j < scope.orgitems.length; j++) {
                        if (deptId == scope.orgitems[j].id) {
                            for (var i = 0; i < scope.orgitems[j].users.length; i++) {
                                scope.orgitems[j].users[i]['checked'] = checked;
                            }
                        }
                    }

                    $("#" + deptId).find("input:checked").each(function (i) {
                        $(this).attr("checked", checked);
                    });
                    console.log(scope.orgitems);
                }

                scope.finish = function (orgid, orgname, userid, username, mobile, $event) {
                    setSelectUsers(orgid, orgname, userid, username, mobile);
                    if (isSingle) {
                        $("#selectUsersDom").find("input:checked").each(function (i) {
                            //console.log(userid);
                            if ($(this).attr('userid') != userid) {
                                $(this).attr("checked", false);
                            }
                        });
                    }
                    $event.stopPropagation();
                };

                function setSelectUsers(orgid, orgname, userid, username, mobile) {
                    var state = 0;
                    var obj = new Object();
                    obj.orgid = orgid;
                    obj.orgname = orgname;
                    obj.userid = userid;
                    obj.username = username;
                    obj.mobile = mobile;
                    if (scope.selectUserArr.length == 0) {
                        scope.selectUserArr.push(obj);
                    } else {
                        for (var i = 0; i < scope.selectUserArr.length; i++) {
                            if (scope.selectUserArr[i].userid == userid) {
                                scope.selectUserArr.splice(i, 1);
                                state = 0;
                                break;
                            }
                            state = 1;
                        }
                        if (state) {
                            scope.selectUserArr.push(obj);
                        }
                    }
                }

                function initPopupData() {
                    showDept(-1);
                    getUsedUser();
                }

                initPopupData();

                myPopup = $ionicPopup.show({
                    title: '<p style="font-weight:bold;">人员选择</p>',
                    template: template,
                    scope: scope,
                    buttons: [{
                        text: '<b>关闭</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            scope.selectUserArr = new Array();
                            for (var i = 0; i < tempSelectedArr.length; i++) {
                                scope.selectUserArr.push(tempSelectedArr[i]);
                            }
                            myPopup.close();
                            e.preventDefault();
                        }
                    }, {
                        text: '<b>确定</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            scope.getCheckUsers();
                            myPopup.close();
                            e.preventDefault();
                        }
                    }]
                });
            }
        }
    })
    .service('ASFUtil', function (Toast) {
        return {
            /** 拨打电话 */
            tel: function (number) {
                console.log("tel=" + number);
                if (number) {
                    window.location.href = "tel:" + number;
                } else {
                    Toast.showPop("号码为空，不能拨打电话");
                }
            },
            /** 发送短信 */
            sms: function (number) {
                console.log("sms=" + number);
                if (number) {
                    window.location.href = "sms:" + number;
                } else {
                    Toast.showPop("号码为空，不能发送短信");
                }
            }
        };
    })
    .service('WeChat', function ($http, $q, Toast, $ionicLoading, $timeout, httpProxy) {
        function uploadVoice(localId, param) {
            $ionicLoading.show({
                template: '正在上传...'
            });

            wx.uploadVoice({
                localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
                isShowProgressTips: 0,// 默认为1，显示进度提示
                success: function (res) {
                    var serverId = res.serverId; // 返回音频的服务器端ID

                    param.mediaId = serverId;
                    var promise = MyFileUpload.uploadMedia(param);
                    promise.then(function (data) {  // 调用承诺API获取数据 .resolve 
                        var msg = "";
                        if (data && data.result) {
                            msg = data.message || "操作成功";
                        } else if (data) {
                            msg = data.message || "操作失败";
                        } else {
                            msg = "操作失败";
                        }
                        Toast.showPop(msg);
                        $ionicLoading.hide();
                    }, function (data) {           			// 处理错误 .reject  
                        console.log("操作出错" + data);
                        Toast.showPop("操作出错" + JSON.stringify(data));
                        $ionicLoading.hide();
                    });
                },
                fail: function (res) {
                    Toast.showPop("操作出错:" + JSON.stringify(res));
                    $ionicLoading.hide();
                }
            });
        }

        //微信
        return {
            /***
             * 传入参数
             * {
             *    lat : "",
             *    lng : "",
             *    name : "",
             *    address : ""
             * }
             */
            openLocation: function (param) {
                //默认type不传，即为GPS坐标，需要转换
                if (!param.type) {
                    wx.openLocation({
                        latitude: param.lat, // 纬度，浮点数，范围为90 ~ -90
                        longitude: param.lng, // 经度，浮点数，范围为180 ~ -180。
                        name: param.name || "", // 位置名
                        address: param.address || "", // 地址详情说明
                        scale: 18, // 地图缩放级别,整形值,范围从1~28。默认为最大
                        infoUrl: "" // 在查看位置界面底部显示的超链接,可点击跳转
                    });
                }
            },
            getLocation: function (onSuccess, onError) {
                wx.getLocation({
                    success: function (res) {
                        onSuccess(res);
                    },
                    cancel: function (res) {
                        res.type = "wechat";
                        onError && onError(res);
                    }
                });
            }, uploadImage: function (param, onSuccess, onError) {
                var localIds = [];
                var i = 0;

                function doUploadImage() {
                    if (localIds.length <= 0) {
                        var res = {
                            type: "custom",
                            errmsg: '选中内容为空'
                        };
                        onError && onError(res);
                        return;
                    }

                    wx.uploadImage({//上传到微信服务器上
                        localId: localIds[i],
                        isShowProgressTips: 0,
                        success: function (res) {
                            var serverId = res.serverId;
                            //保存微信资源ID

                            if (localStorage.testMode) {
                                //alert("serverId" + serverId);
                            }

                            param.mediaId = serverId;

                            var promise = MyFileUpload.uploadMedia(param);
                            promise.then(function (data) {  // 调用承诺API获取数据 .resolve 
                                if (data && data.result) {
                                    i++;
                                    var msg = data.message || "操作成功";
                                    Toast.showPop(msg);
                                } else if (data) {
                                    var msg = data.message || "操作失败";
                                    Toast.showPop(msg);
                                    $ionicLoading.hide();
                                    return; //上传失败，停止上传
                                } else {
                                    var msg = "操作失败";
                                    Toast.showPop(msg);
                                    $ionicLoading.hide();
                                }

                                if (i < localIds.length) {
                                    doUploadImage();
                                } else {
                                    $ionicLoading.hide();
                                    Toast.showPop("上传完成");
                                }
                            }, function (data) {           			// 处理错误 .reject  
                                console.log("操作出错" + data);
                                Toast.showPop("操作出错" + JSON.stringify(data));
                                $ionicLoading.hide();
                            });
                        },
                        fail: function (res) {
                            Toast.showPop("fail:" + JSON.stringify(res));
                            $ionicLoading.hide();
                        }
                    });
                }

                wx.chooseImage({
                    //count: 9, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        //alert("localIds:" + JSON.stringify(localIds));
                        $ionicLoading.show({
                            template: '加载中...'
                        });

                        $timeout(function () {
                            doUploadImage();
                        }, 100);
                    }
                });
            }, previewImage: function (param, onSuccess, onError) {
                var paramObj = {
                    current: param.current,
                    urls: param.urls
                };
                console.log(paramObj);
                wx.previewImage(paramObj);
            }, startRecord: function () {
                wx.startRecord();
            }, stopRecord: function (param) {
                wx.stopRecord({
                    success: function (res) {
                        var localId = res.localId;
                        uploadVoice(localId, param);
                    }
                });
            }, onVoiceEnd: function (param, complete) {
                wx.onVoiceRecordEnd({
                    // 录音时间超过一分钟没有停止的时候会执行 complete 回调
                    complete: function (res) {
                        Toast.showPop("录音时间超过一分钟，录音结束");
                        complete && complete(res);
                        var localId = res.localId;
                        uploadVoice(localId, param);
                    }
                });
            },
            /**
             * 参数
             * {
             * 		"sender" : "",
             * 		"content" : ""
             * }
             */
            sendToAdmin: function (param) {
                param = param || {};
                var url = baseURL + "/action?wechatChat=sendToAdmin";
                console.log(url);
                console.log(param);

                var deferred = $q.defer();
                httpProxy.doPost(url, param, function (data) {
                    deferred.resolve(data);
                }, function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            createChat: function (planId, userId, logname) {
                var url = baseURL + "/action?wechatChat=createChat"
                    + "&planId=" + planId
                    + "&logname=" + logname
                    + "&userId=" + userId;

                console.log(url);

                var deferred = $q.defer();
                httpProxy.getJSON(url, "", function (data) {
                    deferred.resolve(data.data);
                }, function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            deleteChat: function (planId, logname) {
                var url = baseURL + "/action?wechatChat=deleteChat"
                    + "&planId=" + planId
                    + "&logname=" + logname;

                console.log(url);

                var deferred = $q.defer();
                httpProxy.getJSON(url, "", function (data) {
                    deferred.resolve(data.data);
                }, function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            /**关闭微信窗口*/
            closeWindow: function () {
                console.log("[WeChat] closeWindow");
                wx.closeWindow();
            },
            /**隐藏右上角菜单接口 */
            hideOptionMenu: function () {
                console.log("[WeChat] hideOptionMenu");
                wx.hideOptionMenu();
            },
            /**显示右上角菜单接口 */
            showOptionMenu: function () {
                console.log("[WeChat] showOptionMenu");
                wx.showOptionMenu();
            },
            /**
             * 打开企业会话窗口
             * @param logname 对方的登录名(需与微信企业号通讯录中一致)
             * @param name 对方的姓名
             */
            openEnterpriseChat: function (logname, name) {
                if (!logname) {
                    Toast.showPop("对方登录名为空，打开聊天失败");
                    return;
                }
                $ionicLoading.show({
                    template: '加载中...'
                });
                wx.openEnterpriseChat({
                    userIds: logname,
                    groupName: name || "未命名",
                    success: function (res) {
                        // 回调
                        if (Feature.DEBUG) {
                            alert("打开成功:" + JSON.stringify(res));
                        }
                        $ionicLoading.hide();
                    },
                    fail: function (res) {
                        if (res && res.errMsg.indexOf('function not exist') > 0) {
                            Toast.showPop('微信版本过低，请升级');
                        }

                        if (Feature.DEBUG) {
                            Toast.showPop("打开失败:" + JSON.stringify(res));
                        }
                        $ionicLoading.hide();
                    }
                });

                $timeout(function () {
                    $ionicLoading.hide();
                }, 5000);
            },
            config: function (signatureData, callback, errorCallback) {
                var jsApiList = [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo',
                    'onMenuShareQZone',
                    'hideMenuItems',
                    'showMenuItems',
                    'hideAllNonBaseMenuItem',
                    'showAllNonBaseMenuItem',
                    'translateVoice',
                    'startRecord',
                    'stopRecord',
                    'onVoiceRecordEnd',
                    'playVoice',
                    'onVoicePlayEnd',
                    'pauseVoice',
                    'stopVoice',
                    'uploadVoice',
                    'downloadVoice',
                    'chooseImage',
                    'previewImage',
                    'uploadImage',
                    'downloadImage',
                    'getNetworkType',
                    'openLocation',
                    'getLocation',
                    'hideOptionMenu',
                    'showOptionMenu',
                    'closeWindow',
                    'scanQRCode',
                    'chooseWXPay',
                    'openProductSpecificView',
                    'addCard',
                    'chooseCard',
                    'openCard',
                    'openEnterpriseChat'
                ];

                wx.config({
                    debug: false,
                    appId: signatureData.appId,
                    timestamp: signatureData.timestamp,
                    nonceStr: signatureData.nonce,
                    signature: signatureData.signature,
                    jsApiList: jsApiList
                });
                wx.ready(function () {
                    console.log("wechat ready");
                    callback && callback();
                });

                wx.error(function (res) {
                    errorCallback && errorCallback(res);
                    //Toast.showPop("微信接口出错:" + res.errMsg);
                });
            },
            oauth: function (url) {
                var deferred = $q.defer();
                httpProxy.getJSON(url, "", function (data) {
                    deferred.resolve(data.data);
                }, function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            init: function (signatureAction, url) {
                var param = {
                    url: url
                };
                var deferred = $q.defer();
                httpProxy.doPost(signatureAction, param, function (data) {
                    deferred.resolve(data);
                }, function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            }
        };
    })
    //代码选择控件
    .service('codeSelect', function ($timeout, Toast, $http, $ionicPopup, $ionicLoading, httpProxy) {
        return {
            showPop: function (selectData, isSingle, scope, callBack, controlData, rootDept) {
                var template = '<div class="list" id="selectUsersDom" style="width:100%;height:80%;min-height:300px; ">' +
                    '<ol class="breadcrumb" >' +
                    '<li class="breadcrumb-head-item" ng-click="showUserByDept(parent)" ng-repeat="parent in parents" >{{parent.name}}</li>' +
                    '</ol>' +
                    '<ion-list>' +
                    '<ion-item ng-if="users && users.length > 0"  ng-repeat="user in users" class="item item-checkbox item-icon-right item-icon-left">' +
                    '<div>' +
                    '<label class="checkbox checkbox-stable" style="width:48px;">' +
                    '<input  ng-if="!user.checked" orgid="{{item.ORGANIZE_ID}}" orgname="{{item.ORGANIZE_NAME}}" userid="{{user.id}}" username="{{user.name}}" ' +
                    'style="left:25px;top:5px;" type="checkbox" ion-stop-event ng-click="finish(user.orgId,user.orgName,user.id,user.name,user.nodeid,$event);" >' +
                    '<input checked="{{user.checked}}" ng-if="user.checked" orgid="{{item.ORGANIZE_ID}}" orgname="{{item.ORGANIZE_NAME}}" userid="{{user.id}}" username="{{user.name}}" ' +
                    'style="left:25px;top:5px;" type="checkbox" ion-stop-event ng-click="finish(user.orgId,user.orgName,user.id,user.name,user.nodeid,$event);" >' +
                    '</label>' +
                    '</div>' +
                    '<div style="margin-left:30px;">' +
                    '<i class="ion-android-person"></i><span style="margin-left:15px;line-height:21px;">{{user.name}} </span><span class="badge">{{user.mobile}}</span>' +
                    '</div>' +
                    '</ion-item>' +
                    '<div ng-if="depts && depts.length > 0"  ng-repeat="item in depts">' +
                    '<div class="item item-divider" ng-click="showUserByDept(item)">' +
                    '<span><i class="icon ion-arrow-right-b padding-right"></i>{{item.name}}</span>' +
                    '<span class="user_count" ng-if="item.user_count != undefined" style="color: #369;float: right;margin-right: 10px;"><!-- {{item.user_selecteds}}/ -->{{item.user_count}}</span>' +
                    '</div>' +
                    '</div>' +
                    '</ion-list>' +
                    '</div>';
                var userId = localStorage.userid;
                var rootDept = rootDept || localStorage.mainUnit;
                var deptId = -1;

                function initData(deptId) {
                    $ionicLoading.show({
                        template: '加载中...'
                    });
                    scope.depts = new Array();
                    scope.users = new Array();
                    scope.parents = new Array();
                    var messageUrl = baseURL + "/action?getCodeSelect=1&resultDataType=breadcrumb&codeId=" + controlData.codeId + "&userId=" + localStorage.userid;
                    httpProxy.getJSON(messageUrl, "", function (data) {
                        var datas = data.data.rows;
                        var users = data.data.users;
                        var parents = data.data.parents;
                        var deptName = data.data.deptName;
                        scope.groupName = deptName;
                        for (var i = 0; datas && i < datas.length; i++) {
                            datas[i].isShow = false;
                            datas[i].user_selecteds = 0;
                            for (var j = 0; j < scope.selectUserArr.length; j++) {
                                if ((scope.selectUserArr[j].orgid + "").startsWith(datas[i].step + "")) {
                                    datas[i].user_selecteds++;
                                }
                            }
                            scope.depts.push(datas[i]);
                        }

                        for (var i = 0; users && i < users.length; i++) {
                            users[i].isShow = false;
                            for (var k = 0; k < scope.selectUserArr.length; k++) {
                                if (users[i].id == scope.selectUserArr[k].userId) {
                                    users[i].checked = true;
                                }
                            }
                            scope.users.push(users[i]);
                        }

                        for (var i = 0; parents && i < parents.length; i++) {
                            parents[i].isShow = false;
                            scope.parents.push(parents[i]);
                        }

                        $timeout(function () {
                            $ionicLoading.hide();
                        }, 150);
                    }, function (data) {
                        $ionicLoading.hide();
                        Toast.showPop("加载出错");
                    });
                }
                initData(deptId);

                scope.showUserByDept = function (item) {
                    if (item) {
                        initData(item.id);
                    }
                }

                scope.finish = function (orgid, orgname, userid, username, mobile, $event) {
                    setSelectUsers(orgid, orgname, userid, username, mobile);
                    if (isSingle) {
                        $("#selectUsersDom").find("input:checked").each(function (i) {
                            //console.log(userid);
                            if ($(this).attr('userid') != userid) {
                                $(this).attr("checked", false);
                            }
                        });
                    }
                    $event.stopPropagation();
                };

                function setSelectUsers(orgid, orgname, userid, username, nodeid) {
                    var state = 0;
                    var obj = new Object();
                    obj.orgid = orgid;
                    obj.orgname = orgname;
                    obj.userId = userid;
                    obj.name = username;
                    obj.nodeid = nodeid;
                    if (isSingle) {
                        scope.selectUserArr = new Array();
                    }
                    if (scope.selectUserArr.length == 0) {
                        scope.selectUserArr.push(obj);
                    } else {
                        for (var i = 0; i < scope.selectUserArr.length; i++) {
                            if (scope.selectUserArr[i].userId == userid) {
                                scope.selectUserArr.splice(i, 1);
                                state = 0;
                                break;
                            }
                            state = 1;
                        }
                        if (state) {
                            scope.selectUserArr.push(obj);
                        }
                    }
                }

                function containId(id, array) {
                    for (var j = 0; j < array.length; j++) {
                        if (array[j].userid == id && nodeId == array[j].nodeid) {
                            return true;
                        }
                    }
                    return false;
                }

                scope.writeUser = function () {
                    var data = {
                        action: "afterUserSelect",
                        isAutoSave: false,
                        paramString: "paramString",
                        controlId: controlData.controlId,
                        resultJson: JSON.stringify(scope.selectUserArr)
                    };
                    var xformFrame = document.getElementById("xformFrame");

                    if (xformFrame) {
                        var xformContentWindow = xformFrame.contentWindow;
                        try {
                            //跨域调用
                            xformContentWindow.postMessage(data, "*");
                        } catch (e) {
                            console.log("[$scope.saveForm()] " + e);
                        }
                    }
                    callBack();
                };

                myPopup = $ionicPopup.show({
                    title: '<p style="font-weight:bold;">代码选择</p>',
                    template: template,
                    scope: scope,
                    buttons: [{
                        text: '<b>关闭</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            myPopup.close();
                            e.preventDefault();
                        }
                    }, {
                        text: '<b>确定</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            scope.writeUser();
                            myPopup.close();
                            e.preventDefault();
                        }
                    }]
                });
            }
        };
    })
    ;