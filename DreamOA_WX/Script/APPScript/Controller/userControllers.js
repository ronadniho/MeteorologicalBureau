APPController.controller("welcomeuserController", function($rootScope, $scope, $state, showAlert) {
        showAlert.hideLoading();
        //xsfSplashscreen.hide();
        $scope.goMain = function() {
            //if ($rootScope.formweixin) {
            //     $state.go("app.main");
            // }else {
            $state.go("loginUserMobile");
            // }
        };
        $scope.slideHasChanged = function(index) {
            if (index == 2) {
                $scope.ishow = true;
            } else {
                $scope.ishow = false;
            }
        }
        if (!$rootScope.formweixin) {
            document.addEventListener("deviceready", function() {
                xsfSplashscreen.hide();
            }, false);
        }
})

.controller("loginUserMobileController", function($scope, $state, $sms, $rootScope, showAlert, $interval, getDataSource, userHelp) {

        $scope.doLog = function() {
            userHelp.setSession(function() {
                console.log("userSessionSuccess");
            });
            getDataSource.getDataSource("doLog", {}, function() {})
        }

        //学员是否已登陆，如果学员登陆失败则以老师身份登陆，此变量被用来监听
        $scope.hasStudentLogin = true;
        //老师是否已经登陆，如果老师登陆失败则以随班领导来登陆，此变量被用来监听
        $scope.hasTeacherLogin = true;
        $scope.registerObj = { password: "" };
        $rootScope.SMSYZM = "";
        $scope.sendSMS = function() {

            if ($scope.registerObj.logname == "") {
                showToast.show("请输入手机号码");
                return;
            }
            $scope.registerObj.hasSend = true;
            var Num = "";
            for (var i = 0; i < 6; i++) {
                Num += Math.floor(Math.random() * 10);
            }
            $rootScope.SMSYZM = Num;
            $sms.send({ phone: $scope.registerObj.logname, content: $rootScope.AppConfig.smsTemplate.replace("[yzm]", Num) }, function(data) {
                showAlert.showToast("验证码发送成功");
                $scope.registerObj.timer = 60;
                $scope.registerObj.hasSend = true;
                $interval(function() {
                    $scope.registerObj.timer--;
                    if ($scope.registerObj.timer == 0) {
                        $scope.registerObj.timer = "发送验证码";
                        $scope.registerObj.hasSend = false;
                    }
                }, 1000, 60);
            });
        };
        $scope.teacherLogin = function() {
            //测试阶段验证码功能先关闭
            if ($rootScope.AppConfig.needSendSMS == "true") {

                if ($scope.registerObj.password == "") {
                    showAlert.showToast("请输入验证码");
                    return;
                }
                if ($scope.registerObj.password == "" || $rootScope.SMSYZM == "" || $scope.registerObj.password != $rootScope.SMSYZM) {
                    showAlert.showToast("验证码输入有误，请重新获取");
                    return;
                }
            }
            getDataSource.getDataSource("hasTeacher", { phone: $scope.registerObj.logname }, function(data) {
                if (data[0].hasusers == 0) {
                    showAlert.showToast("不存在该用户");
                    return;
                } else {
                    getDataSource.getDataSource("userInfoLogin", { phone: $scope.registerObj.logname }, function(data) {
                        $rootScope.user = data[0];
                        getDataSource.getDataSource("getTeacherClass", { userid: $rootScope.user.info_id }, function(classdata) {
                            if (classdata.length == 0) {
                                $scope.hasTeacherLogin = false;
                            } else {
                                $rootScope.user.classid = classdata[0].classid;
                                $rootScope.user.classname = classdata[0].bt;
                                $rootScope.user.isFirstLogin = false;
                                $rootScope.user.kssj = classdata[0].kssj;
                                $rootScope.user.jssj = classdata[0].jssj;
                                $rootScope.user.questionnum = classdata[0].questionnum;
                                $rootScope.user.answernum = classdata[0].answernum;
                                $rootScope.user.samequestionnum = classdata[0].samequestionnum;
                                $rootScope.user.bcpsd = classdata[0].bcpsd; // 新增班级信息密码 add by litong 
                                localStorage.user = JSON.stringify($rootScope.user);
                            }
                        })
                        $rootScope.user.classid = "";
                        $rootScope.user.classname = "";
                        $rootScope.user.isFirstLogin = false;
                        $rootScope.user.kssj = "";
                        $rootScope.user.jssj = "";
                        $rootScope.user.questionnum = "";
                        $rootScope.user.answernum = "";
                        $rootScope.user.samequestionnum = "";
                        $rootScope.user.bcpsd = ""; // 新增班级信息密码 add by litong 
                        $rootScope.user.formJS = true; // 判断入口 add by litong 
                        localStorage.user = JSON.stringify($rootScope.user);

                        $rootScope.user.type = "teacher";
                        $scope.doLog();
                        $state.go("user.mainNewUser");
                    })
                }
            })
        }
})

.controller("mainuserController", function($http, $scope, $interval, $ionicPopup, $timeout, $state, Restangular,
        getDataSource, $ionicSideMenuDelegate, $ionicSlideBoxDelegate, $rootScope, $ionicModal, userHelp,
        calcStar, $filter, showAlert, goDetail, DataSource,Toast, openFormFile) {
        	
        //$scope.title = "";
        //=========================================待办=================================================
        $scope.todo = {};
        $scope.todo.flag = 0;//0：加载中；1：加载完成，有内容；-1：加载完成，无内容
        var actionToDo = "getInbox=1";
        $scope.topToDoList = [];
        $scope.userId = localStorage.userid;

        $scope.gotoToDo = function() {
            $state.go("todolist");
        }

        $scope.getToDo = function() {
            var paramObj = {
                start: 0,
                limit: 3,
                userId: localStorage.userid
            };
            var promise = DataSource.getData(actionToDo, paramObj);
            promise.then(function(data) {
                $scope.topToDoList = data.rows;
                if ($scope.topToDoList.length<=0) {
                    $scope.todo.flag = -1;
                } else {
                    $scope.todo.flag = 1;
                }
                console.log("[$scope.topToDoList] ");
                console.log($scope.topToDoList);

                //$scope.$broadcast('scroll.refreshComplete');
                //$ionicLoading.hide();
            }, function(data) {
                $scope.todo.flag = -1;
                console.log("加载数据出现异常 [" + data.status + "]");
                //$scope.$broadcast('scroll.refreshComplete');
                //$ionicLoading.hide();
                //showAlert.showToast("加载数据出现异常 [" + data.status + "]");
            });
        }

        $scope.gotoToDoItem = function(item) {
            if (dotNet) {
                $state.go("xformTabComment", {
                    formId: item.formId,
                    info_id: item.info_id,
                    moduleId: item.moduleId,
                    wfId: item.wfId,
                    pid: item.pid,
                    pnid: item.pnid,
                    showComment: 1,
                    title: item.itemsContent,
                    v: "0",
                    type: "g_inbox",
                    gInboxId: item.id,
                    operationType: "ToDo",
                    isAttention: item.isattention,
                    backReason: "",
                    actName: item.actName,
                    historyUrl : 'user.mainNewUser'
                });
            } else {
                openFormFile.openFile(item.formId,
                    item.info_id,
                    item.moduleId,
                    item.wfId,
                    item.pid,
                    item.pnid,
                    item.itemsContent,
                    1,//showComment
                    '0',//v
                    "g_inbox",
                    item.id,
                    "ToDo",
                    item.isattention,
                    '' , 
                    null ,//callback 
                    item.actName,
                    'user.mainNewUser');
            }
                
        }
        //=========================================公告=================================================
        var actionNotice = "getNotice=1";
        $scope.topNoticeList = [];
        $scope.topNoticeListOriginal = [];

        $scope.gotoNotice = function() {
            $state.go("noticeNew");
        }

        $scope.getNotice = function() {
            var paramObj = {
                start: 0,
                limit: 5,
                userId: localStorage.userid
            };
            var promise = DataSource.getData(actionNotice, paramObj);
            promise.then(function(data) {
                $scope.topNoticeList = data.rows;
                console.log("[$scope.topNoticeList] ");
                console.log($scope.topNoticeList);

                $ionicSlideBoxDelegate.$getByHandle("notice-handle").loop(true); //循环播放
                $ionicSlideBoxDelegate.update();
                //$scope.$broadcast('scroll.refreshComplete');
                //$ionicLoading.hide();
            }, function(data) {
                $ionicSlideBoxDelegate.update();
                console.log("加载数据出现异常 [" + data.status + "]");
                //$scope.$broadcast('scroll.refreshComplete');
                //$ionicLoading.hide();
                //showAlert.showToast("加载数据出现异常 [" + data.status + "]");
            });
        }

        $scope.gotoNoticeItem = function(item) {
                $state.go("xformTabComment", {
                    formId: item.formId,
                    info_id: item.info_id,
                    moduleId: item.moduleId,
                    wfId: item.wfId,
                    pid: item.pid,
                    pnid: item.pnid,
                    showComment: 1,
                    title: item.itemsContent,
                    v: "1",
                    type: "",
                    gInboxId: item.id,
                    operationType: "Notice",
                    isAttention: item.isattention,
                    backReason: "",
                    actName: item.actName
                });
            }
        //========================================= =================================================
        //处理起泡数据
        $scope.updateIconArray = function (keyname, value) {
            var obj = _.find($rootScope.iconvalArray, function (d) {
                return d.key == keyname;
            });
            if (obj != null && obj != undefined) {
                obj.val = value;
            } else {
                $rootScope.iconvalArray.push({ key: keyname, val: value });
            }
        }

        var actionMessage = "getMessage=1";
        $scope.getMessage = function(){
            var paramObj = {
                userId : localStorage.userid
            }
            var promise = DataSource.getData(actionMessage, paramObj);
            promise.then(function(data) {
                var data = data.rows;
                console.log("[getMessage]:");
                console.log(data);

/*                var todoObj = _.find(data, function(d) {
                    return d.type == "com.ue.oa.oa.activity.FileActivity";
                });*/

                for(var i = 0 ; data && i < data.length; i++){
                    var item = data[i];
                    var new_msg_count = item.new_msg_count || 0;
                    if(item.type){
                        $scope.updateIconArray(item.type, new_msg_count);
                    }
                }
            }, function(data) {
                $ionicSlideBoxDelegate.update();
                console.log("加载数据出现异常 [" + data.status + "]");
            });
        }
        //========================================= =================================================
        $scope.doRefresh = function() {
            //$scope.getNotice();
            $scope.getToDo();
            $scope.getMessage();
            $scope.$broadcast("scroll.refreshComplete");
        };
        $scope.doRefresh();
        $rootScope.refreshMainPage = $scope.doRefresh;
        //========================================= =================================================


        //getDataSource.getDataSource("doLogServer", { content: "首页" }, function () { });
        $scope.KCList = new Array();
        var nowDate = new Date();
        var nowYear = nowDate.getFullYear();
        var nowMonth = nowDate.getUTCMonth() + 1;
        if (nowMonth <= 9) {
            nowMonth = "0" + nowMonth;
        }
        var logTable = "app_log_" + nowYear + "_" + nowMonth;


        var user = $rootScope.user;
        $scope.topggxx = [];
        $scope.content = [{ outid: "", opdt: "", oddfare: "0", opfare: "", dscrp: "" }]
        $scope.loadData = function() {
            //var loginData = Restangular.one('Onecard/action/custom/' + user.workno);
            //loginData.get().then(function (data) {
            //    $scope.content = eval("(" + data + ")");
            //});

            getDataSource.getDataSource("getNewList", { category: "中浦要闻", pagecount: 1, rowcount: "4" }, function(data) {
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

            getDataSource.getDataSource(["getTopGGxx", "getTodoCount"], { info_id: user.info_id, }, function(data) {
                $scope.topggxx = _.find(data, function(d) {
                    return d.name == "getTopGGxx";
                }).data;
                //$scope.TeacherPaiming = _.find(data, function (d) {
                //    return d.name == "getTeacherPaiming";
                //}).data;
                //$scope.hydlist = _.find($scope.TeacherPaiming, function (paiming) {
                //    return paiming.id == $rootScope.user.info_id;
                //});
                //if (!$scope.hydlist) {
                //    $scope.hydlist = { id: '', uname: '', hyd: 0, rnum: $scope.TeacherPaiming.length + 1 };
                //}

                //待办文件
                $scope.dbCount = _.find(data, function(d) {
                    return d.name == "getTodoCount";
                }).data[0].num;
                $scope.updateIconArray("dbCount", $scope.dbCount);

                //setTimeout(function () {
                //    var opts = {
                //        lines: 12, // The number of lines to draw
                //        angle: 0.35, // The length of each line
                //        lineWidth: 0.1, // The line thickness
                //        pointer: {
                //            length: 0.7, // The radius of the inner circle
                //            strokeWidth: 0.06, // The rotation offset
                //            color: '#000000' // Fill color
                //        },
                //        limitMax: 'false',   // If true, the pointer will not go past the end of the gauge

                //        colorStart: '#6F6EA0',   // Colors
                //        colorStop: '#02B1EF',    // just experiment with them
                //        strokeColor: '#EEEEEE',   // to see which ones work best for you
                //        generateGradient: true
                //    };
                //    var target = document.getElementById('foo'); // your canvas element
                //    var gauge = new Donut(target).setOptions(opts); // create sexy gauge!
                //    gauge.maxValue = $scope.TeacherPaiming[0].hyd; // set max gauge value
                //    gauge.animationSpeed = 5; // set animation speed (32 is default value)
                //    gauge.set($scope.hydlist.hyd); // set actual value
                //    document.getElementById('preview-textfield').innerHTML = "活跃度<br/>" + $scope.hydlist.rnum + "";
                //}, 100)
                if (!$rootScope.formweixin) {
                    document.addEventListener("deviceready", function() {
                        xsfSplashscreen.hide();
                    }, false);
                }
                showAlert.hideLoading();
            });
            $ionicSlideBoxDelegate.update();
        }

        $scope.goNewsDetail = function(item) {
            goDetail.goNewsDetail(item);
        }


        // 查看一卡通积点明细
        $scope.gotoOneCard = function(userid) {
            if (userid != null) {
                getDataSource.getDataSource("doLogServer", { content: "一卡通积点明细" }, function() {});
                $state.go("comsumList", { carno: user.workno });
            } else {
                //alert("您当前暂无积点明细");
                showAlert.showToast("您当前暂无积点明细");
                //$state.go("comsumList", { carno: user.workno });
            }
        }
        $scope.gotoOneCardList = function(userid) {
            if (userid != null) {
                getDataSource.getDataSource("doLogServer", { content: "一卡通余额明细" }, function() {});
                $state.go("oneCard", { carno: user.workno });
            } else {
                //alert("您当前暂无余额明细");
                showAlert.showToast("您当前暂无余额明细");
                //$state.go("oneCard", { carno: user.workno });
            }
        }

        $scope.gotoJSGG = function() {
            getDataSource.getDataSource("doLogServer", { content: "通知公告" }, function() {});
            $state.go("noticeByJs");
        }

        $scope.gosub = function(e) {
            getDataSource.getDataSource("doLogServer", { content: e.title }, function() {});
            if (e.withpara == true) {
                //移动教学跳转
                $state.go(e.url, { type: e.title });
            } else if (e.url == "nbyx") {
                var loginEmail = Restangular.one('Email/action/getSid/' + $rootScope.user.logname);
                loginEmail.get().then(function(data) {
                    if (data) {
                        //"http://222.204.170.159/coremail/xphone/main.jsp?sid=BAinVhmmAXFnNsQyZBmmMYNTLDkyDEvk"
                        var emailUrl = $rootScope.AppConfig.nbxyPath + data;
                        var ref = xsfWindow.open(emailUrl, '', true);
                        //$state.go("yj", { url: encodeURI(emailUrl), title: "内部邮件" });
                    } else {
                        showAlert.showToast("您的内部邮箱暂时无法登录");
                    }
                });

            } else if (e.url == "wbyx") {
                var loginOutEmail = Restangular.one('Email/action/getAct/' + $rootScope.user.info_id);
                loginOutEmail.get().then(function(data) {
                    if (data) {
                        var emailUrl = $rootScope.AppConfig.wbxyPath + data; //"http://218.1.73.36/emailfrom/SingleLogin.aspx?act=C2147249B1AFDBADA59BA4E72282B6DDB0CB1E499093A95C"
                        var ref = xsfWindow.open(emailUrl, '', true);
                        //$state.go("yj", { url: encodeURI(emailUrl), title: "外部邮件" });
                    } else {
                        showAlert.showToast("您的外部邮箱暂时无法登录");
                    }
                });

            } else if (e.url == "app.main") {
                // 判断教职工是否有带班信息
                if (user.classid) {
                    if (e.type != "" && e.type != null && e.type != undefined) {
                        $state.go(e.url, { type: e.type });
                    } else {
                        $state.go(e.url);
                    }
                } else {
                    showAlert.showToast("您暂无带班信息");
                }
            } else {
                if (e.type != "" && e.type != null && e.type != undefined) {
                    $state.go(e.url, { type: e.type });
                } else {
                    $state.go(e.url);
                }
            }
        }

        $scope.checked = function(item) {
            $rootScope.user.classname = item.bt;
            $rootScope.user.classid = item.classid;
            localStorage.user = JSON.stringify($rootScope.user);
            $scope.modal.hide();
            $state.reload();
        }

        //加载首页轮播图标开始
/*        $scope.datameSource = [];
        $http.get("../config/mainusermenus.json").then(function(data) {
            var mainpages = _.filter(data.data, function(d) {
                return d.icontype == "all";
            });

            var pages = (mainpages.length % 6) > 0 ? parseInt(mainpages.length / 6) + 1 : parseInt(mainpages.length / 6); //一页可以放16个，计算总共有几页

            for (var i = 0; i < pages; i++) {
                //初始化datapage数据格式
                var dataPage = {
                    "index": i,
                    "data": [{
                        "data": []
                    }, {
                        "data": []
                    }, {
                        "data": []
                    }, {
                        "data": []
                    }]
                };
                $scope.datameSource.push(dataPage);
            }
            var pageIndex = 0;
            var rowIndex = 0;
            var dataRowIndex = 0;
            _.forEach(mainpages, function(m, key) {
                if (pageIndex != parseInt(key / 6)) {
                    pageIndex = parseInt(key / 6);
                    rowIndex = 0;
                    dataRowIndex = 0;
                }
                if (rowIndex > 2) {
                    rowIndex = 0;
                }

                if (dataRowIndex > 2) {
                    dataRowIndex = 0;
                    rowIndex++;
                }
                $scope.datameSource[pageIndex].data[rowIndex].data[dataRowIndex] = m;
                dataRowIndex++;
            });

            $ionicSlideBoxDelegate.update();
        });*/

            $scope.datameSource = [
                {
                    "index": 0,
                    "data": [
                        {
                            "data": [
                                {
                                    "image": "../staticresource/tzgg.png",
                                    "title": "通知公告",
                                    "url": "noticeNew",
                                    "showicon": true,
                                    "keyname": "com.ue.oa.oa.activity.NoticeActivity",
                                    "icontype": "all"
                                },
                                {
                                    "image": "../staticresource/dbwj.png",
                                    "title": "一般阅件",
                                    "url": "toRead",
                                    "showicon": true,
                                    "keyname": "com.ue.oa.oa.activity.ReviewActivity",
                                    "icontype": "all"
                                },
                                {
                                    "image": "../staticresource/ybwj.png",
                                    "title": "已办文件",
                                    "url": "hasdolist",
                                    "showicon": false,
                                    "keyname": "",
                                    "icontype": "all"
                                }
                            ]
                        },
                        {
                            "data": [
                                {
                                    "image": "../staticresource/bq.png",
                                    "title": "便笺",
                                    "url": "noteTab",
                                    "showicon": true,
                                    "keyname": "com.ue.oa.oa.activity.NoteActivity",
                                    "icontype": "all"
                                },
                                {
                                    "image": "../staticresource/nbgh.png",
                                    "title": "内部公函",
                                    "url": "internalLetters",
                                    "showicon": false,
                                    "keyname": "",
                                    "icontype": "all"
                                },
                                {
                                    "image": "../staticresource/qjsq.png",
                                    "title": "请假申请",
                                    "url": "leaveList",
                                    "showicon": true,
                                    "keyname": "",
                                    "icontype": "all"
                                }
                            ]
                        }
                    ]
                }
            ];

			$timeout(function () {
				//console.log("$scope.datameSource" , JSON.stringify($scope.datameSource));
				//var delegate = $ionicSlideBoxDelegate.$getByHandle('main-page-handle');
				//delegate.update();
				$ionicSlideBoxDelegate.update(); 
				console.log("timeout delegate update2 ...");
			} , 600);

        var isIOS = ionic.Platform.isIOS();
        var isAndroid = ionic.Platform.isAndroid();
        $scope.myStyle = { margin: '80px 0px 0px 0px' };
        if (isAndroid) {
            $scope.myStyle = { margin: '80px 0px 0px 0px' };
        }
        if (isIOS) {
            $scope.myStyle = { margin: '100px 0px 0px 0px' };
        }
})

.controller("mainBzrController", function($http, $scope, $ionicPopup, $timeout, $state, $ionicHistory, getDataSource, 
                    $ionicSideMenuDelegate, $ionicSlideBoxDelegate, $rootScope, $ionicModal, userHelp, calcStar, $filter, showAlert) {
        //getDataSource.getDataSource("doLogServer", { content: "首页" }, function () { });
        $scope.KCList = new Array();
        $scope.ggList = new Array();
        //获取所有需要数字的图标,$scope.iconArray数组中的所有key必须跟上面需要显示数字的keyname值一一对应，
        //并且跟获取数据库的sql的key也相同
        //var iconvalArray = [];

        //处理起泡数据
        $scope.updateIconArray = function(keyname, value) {
                var obj = _.find($rootScope.iconvalArray, function(d) {
                    return d.key == keyname;
                });
                if (obj != null && obj != undefined) {
                    obj.val = value;
                } else {
                    $rootScope.iconvalArray.push({ key: keyname, val: value });
                }
            }
            //$scope.iconvalArray = $rootScope.iconvalArray;
            //$scope.$watch("iconvalArray", function (value) {
            //    console.log(value.length);
            //})
        $scope.classShow = false;
        var user = $rootScope.user;
        $scope.classNmae = user.classname;
        $scope.loadData = function() {
                getDataSource.getDataSource(["Get_XYXXByInfoId", "Get_KCListInfoByDateNew", "getMainGG", "getMainReader", "getTeacherClass", "get_main_xxkCount", "Get_NewCountByNewTime", "GetXYKCPJCode", "getQuestionCount", "getBjxxByid", "getKqNum"], {
                    todaydate: new Date(),
                    info_id: user.info_id,
                    bcid: user.classid,
                    xyid: user.info_id,
                    userid: user.info_id,
                    classid: user.classid,
                    userid_q: user.info_id.toString(),
                    //classid_q: user.classid.toString(),
                    type: 1
                }, function(data) {
                    if (user.type == "student") {
                        $rootScope.userInfo = _.find(data, function(d) {
                            return d.name == "Get_XYXXByInfoId";
                        }).data[0];
                        $rootScope.userInfo.starArr = [];
                        calcStar.getStar($rootScope.userInfo);
                        //班级通讯录密码
                        $scope.bjxx = _.find(data, function(d) {
                            return d.name == "getBjxxByid";
                        }).data;
                        if ($scope.bjxx.length > 0) {
                            if ($scope.bjxx[0].bjxxpsd == "") {
                                $rootScope.user.bjxxpsd = null;
                            }
                        } else {
                            $rootScope.user.bjxxpsd = null;
                        }
                    }
                    //课程列表
                    $scope.KCList = _.find(data, function(d) {
                        return d.name == "Get_KCListInfoByDateNew";
                    }).data;
                    //公告列表
                    $scope.ggList = _.find(data, function(d) {
                        return d.name == "getMainGG";
                    }).data;
                    //未读公告条数
                    $scope.numUnReader = _.find(data, function(d) {
                        return d.name == "getMainReader";
                    }).data.length;
                    $scope.updateIconArray("numUnReader", $scope.numUnReader);
                    //$rootScope.iconvalArray.push({ key: "numUnReader", val: $scope.numUnReader });
                    //签到
                    $scope.kqnum = _.find(data, function(d) {
                        return d.name == "getKqNum";
                    }).data;
                    $scope.updateIconArray("kqNum", $scope.kqnum[0].topnum);
                    //班部老师
                    $scope.bclist = _.find(data, function(d) {
                        return d.name == "getTeacherClass";
                    }).data;

                    //未选选修课数量
                    $scope.xxkNumber = _.find(data, function(d) {
                        return d.name == "get_main_xxkCount";
                    }).data[0].xxk;
                    $scope.updateIconArray("xxkNumber", $scope.xxkNumber);
                    //$rootScope.iconvalArray.push({ key: "xxkNumber", val: $scope.xxkNumber });

                    //问题数量
                    $scope.myQuestionCount = _.find(data, function(d) {
                        return d.name == "Get_NewCountByNewTime";
                    }).data[0].newcount;
                    $scope.updateIconArray("myQuestionCount", $scope.myQuestionCount);
                    //$rootScope.iconvalArray.push({ key: "myQuestionCount", val: 5 });

                    //评价版本
                    $scope.pjcode = _.find(data, function(d) {
                        return d.name == "GetXYKCPJCode";
                    }).data[0].pjcode;

                    //获取未评价课程数量
                    getDataSource.getDataSource(["GetXYPJKCList", "GetOtherPJ"], { bcid: user.classid, xyinfoid: user.info_id, pjcode: $scope.pjcode }, function(data) {
                        //课程评价未评
                        $scope.PJKCList = _.filter(_.find(data, { name: "GetXYPJKCList" }).data, { yp: 0 });
                        //课程评价已评
                        $scope.OtherWPPJList = _.filter(_.find(data, { name: "GetOtherPJ" }).data, { yp: 0 });
                        $scope.wpnum = $scope.PJKCList.length + $scope.OtherWPPJList.length;
                        $scope.updateIconArray("wpnum", $scope.wpnum);
                        //$rootScope.iconvalArray.push({ key: "wpnum", val: $scope.wpnum });
                        showAlert.hideLoading();
                        if ($rootScope.formweixin) {
                            showAlert.hideLoading();
                        } else {
                            xsfSplashscreen.hide();
                        }

                        //userHelp.getChatNumber();
                    });
                });

                getDataSource.getDataSource("getAllClass", { userid: $rootScope.user.info_id, bcid: $rootScope.user.classid }, function(classdata) {
                    $scope.bclist = classdata;
                    if (classdata.length > 1) {
                        $scope.ShowSelectBtn = true;
                    }
                });
            }
            //$scope.loadData();
        $scope.dropDown = function() {
            $scope.classShow = !$scope.classShow;
        }
        $scope.checked = function(item) {
            $rootScope.user.classname = item.bt;
            $rootScope.user.classid = item.classid;
            $rootScope.user.kssj = item.kssj;
            $rootScope.user.jssj = item.jssj;
            $rootScope.user.type = item.usertype;
            $scope.classNmae = item.bt;

            $scope.classShow = !$scope.classShow;
            $scope.loadData();
            localStorage.user = JSON.stringify($rootScope.user);
            $ionicHistory.clearHistory();
        }

        $scope.doRefresh = function() {
            //userHelp.getChatNumber();
            $scope.loadData();
            $scope.$broadcast("scroll.refreshComplete");
        };

        $scope.godj = function() {
            $state.go("dcwjStudent", { type: 1 });
        }
        $scope.gokb = function() {
            getDataSource.getDataSource("doLogServer", { content: "课程表" }, function() {});
            $state.go("app.kbcx");
        }
        $scope.gopj = function() {
            if ($rootScope.user.type == "student") {
                $state.go("stuappraise");
            } else {
                $state.go("teachappraise");
            }
        }
        $scope.OpenKCDetail = function(kcobj) {
            $state.go("KCDetail", { info_id: kcobj.info_id });
        }
        $scope.goGGList = function() {
            getDataSource.getDataSource("doLogServer", { content: "通知公告" }, function() {});
            $state.go("notice");
        }
        $scope.gogg = function(item) {
            item.hasreader = 1;
            $state.go("noticedetail", { ggid: item.id })
        }
        $scope.changePsd = function(role) {
                var funName = "";
                $scope.data = {}
                    // 第一次设置密码，不出现原密码
                if ($rootScope.user.bjxxpsd == null) {
                    $scope.changeTemplate = '请输入密码<input type="password" ng-model="data.wifi"><br/>请再次输入密码<input type="password" ng-model="data.wifiAgain">';
                } else {
                    $scope.changeTemplate = '请输入原密码<input type="password" ng-model="data.oldpsd"><br/>请输入新密码<input type="password" ng-model="data.wifi"><br/>请再次输入密码<input type="password" ng-model="data.wifiAgain">';
                }

                // 一个精心制作的自定义弹窗
                var teacherPopup = $ionicPopup.show({
                    template: $scope.changeTemplate,
                    title: '更改班级密码',
                    subTitle: '由四位数字组成',
                    scope: $scope,
                    buttons: [
                        { text: '取消' }, {
                            text: '<b>确定</b>',
                            type: 'button-positive',
                            onTap: function(e) {
                                if ($rootScope.user.bjxxpsd != $scope.data.oldpsd) {
                                    alert("您输入的原密码不正确，请重新输入");
                                    e.preventDefault();
                                } else if ($scope.data.wifi != $scope.data.wifiAgain) {
                                    alert("您再次输入的密码不匹配，请重新输入");
                                    //不允许用户关闭，除非他键入wifi密码
                                    e.preventDefault();
                                } else {
                                    if (role == 1) { funName = "updateTeachinfo"; } else { funName = "updateXYinfo"; }
                                    // 更新数据库的班级信息密码
                                    getDataSource.getDataSource(funName, { info_id: $rootScope.user.info_id, bcpsd: $scope.data.wifi }, function(data) {
                                        $rootScope.user.bjxxpsd = $scope.data.wifi;
                                        return $scope.data.wifi;
                                    });
                                }
                            }
                        },
                    ]
                });
                teacherPopup.then(function(res) {
                    console.log('Tapped!', res);
                });
            }
            // 触发一个按钮点击，或一些其他目标
        $scope.showPopup = function(userRole) {
            $scope.data = {}

            if ($rootScope.user.bjxxpsd == null) {
                //$scope.loadTemplate = '<input type="password" ng-model="data.wifi"><br/><a style="text-decoration:underline;" ng-click="changePsd(2);">设置密码</a>';
                $scope.loadTemplate = '请输入密码<input type="password" ng-model="data.wifi"><br/>请再次输入密码<input type="password" ng-model="data.wifiAgain">';
                $scope.showTipTitle = '为保证班级信息安全，请设置密码';
            } else {
                $scope.loadTemplate = '<input type="password" ng-model="data.wifi">';
                $scope.showTipTitle = '为保证班级信息安全，请输入密码';
            }
            //$scope.loadTemplate = '<input type="password" ng-model="data.wifi"><br/><a ng-click="changePsd();">重置密码</a>';

            // 一个精心制作的自定义弹窗
            var myPopup = $ionicPopup.show({
                template: $scope.loadTemplate,
                title: $scope.showTipTitle,
                subTitle: '由四位数字组成',
                scope: $scope,
                buttons: [
                    { text: '取消' }, {
                        text: '<b>确定</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if ($rootScope.user.bjxxpsd == null) {
                                if (isNaN($scope.data.wifi) || isNaN($scope.data.wifiAgain)) {
                                    showAlert.showToast("班级密码由四位数字组成，请重新输入");
                                    //e.preventDefault();
                                } else if ($scope.data.wifi.length != 4 || $scope.data.wifiAgain.length != 4) {
                                    showAlert.showToast("班级密码由四位数字组成，请重新输入");
                                    //e.preventDefault();
                                } else if ($scope.data.wifi != $scope.data.wifiAgain) {
                                    showAlert.showToast("您再次输入的密码不匹配，请重新输入");
                                    //不允许用户关闭，除非他键入wifi密码
                                    //e.preventDefault();
                                } else {
                                    if ($rootScope.user.type == "student") { funName = "updateXYinfo"; } else { funName = "updateTeachinfo"; }
                                    // 更新数据库的班级信息密码
                                    getDataSource.getDataSource(funName, { info_id: $rootScope.user.info_id, bcpsd: $scope.data.wifi }, function(data) {
                                        $rootScope.user.bjxxpsd = $scope.data.wifi;
                                        localStorage.user = JSON.stringify($rootScope.user);
                                        $state.go("studentgroup");
                                    })
                                }
                            } else if ($scope.data.wifi != $rootScope.user.bjxxpsd) {
                                showAlert.showToast("您输入的密码不正确，请重新输入");
                                //不允许用户关闭，除非他键入wifi密码
                                //e.preventDefault();
                            } else {
                                //return $scope.data.wifi;
                                $state.go("studentgroup");
                            }
                        }
                    },
                ]
            }).then(function(res) {
                console.log('Tapped!', res);
            });
            //$timeout(function () {
            //    myPopup.close(); //由于某种原因3秒后关闭弹出
            //}, 3000);
        };
        $scope.gosub = function(e) {
            getDataSource.getDataSource("doLogServer", { content: e.title }, function() {});
            if (e.withpara == true) {
                //移动教学跳转
                $state.go(e.url, { type: e.title });
            } else if (e.url == "group") {
                userHelp.openChatList(0, '班级交流')

            } else if (e.url == "dcwjStudent") {
                //userHelp.myNeeds();
                $state.go(e.url, { type: 1 });
            } else if (e.url == "dcwjTeacher") {
                //userHelp.openChatList(1, '班级需求')
                $state.go(e.url, { type: 1 });
            } else if (e.url == "studentgroup") {
                $scope.showPopup(e.icontype);
            } else if (e.url == "ydjxzjlist") {
                $state.go("ydjxzjlist", { menuid: e.menuid });
            } else {
                if (e.type != "" && e.type != null && e.type != undefined) {
                    $state.go(e.url, { type: e.type });
                } else {
                    $state.go(e.url);
                }
            }
        }


        //加载首页轮播图标开始
        $scope.datameSource = [];
        $http.get("../config/mainmenus.json").then(function(data) {
            var mainpages = _.filter(data.data, function(d) {
                return d.icontype == $rootScope.user.type || d.icontype == "all";
            });
            // 添加教工版返回按钮
            var jspage = _.filter(data.data, function(d) {
                return d.icontype == "lt";
            });
            if ($rootScope.user.formJS && jspage.length > 0) {
                mainpages.push(jspage[0]);
            }

            var pages = (mainpages.length % 16) > 0 ? parseInt(mainpages.length / 16) + 1 : parseInt(mainpages.length / 16); //一页可以放9个，计算总共有几页

            for (var i = 0; i < pages; i++) {
                //初始化datapage数据格式
                var dataPage = {
                    "index": i,
                    "data": [{
                        "data": []
                    }, {
                        "data": []
                    }, {
                        "data": []
                    }, {
                        "data": []
                    }]
                };
                $scope.datameSource.push(dataPage);
            }
            var pageIndex = 0;
            var rowIndex = 0;
            var dataRowIndex = 0;
            _.forEach(mainpages, function(m, key) {
                if (pageIndex != parseInt(key / 16)) {
                    pageIndex = parseInt(key / 16);
                    rowIndex = 0;
                    dataRowIndex = 0;
                }
                if (rowIndex > 3) {
                    rowIndex = 0;
                }

                if (dataRowIndex > 3) {
                    dataRowIndex = 0;
                    rowIndex++;
                }
                $scope.datameSource[pageIndex].data[rowIndex].data[dataRowIndex] = m;
                dataRowIndex++;
            });

            $ionicSlideBoxDelegate.update();
        });

        var isIOS = ionic.Platform.isIOS();
        var isAndroid = ionic.Platform.isAndroid();
        $scope.myStyle = { margin: '80px 0px 0px 0px' };
        if (isAndroid) {
            $scope.myStyle = { margin: '80px 0px 0px 0px' };
        }
        if (isIOS) {
            $scope.myStyle = { margin: '100px 0px 0px 0px' };
        }
})

.controller("usertabsController", function($rootScope, $scope, $ionicSideMenuDelegate, $state, $ionicActionSheet, userHelp, showAlert, DataSource) {
        $scope.goMain = function() {
            $ionicSideMenuDelegate.toggleLeft();
        }
        $scope.goSetting = function() {
            $scope.showUserAction();
        }
        $scope.exitApp = function() {
            ionic.Platform.exitApp();
        }
        $scope.safeExitApp = function() {
            localStorage.user = null;
            $scope.exitApp();
        }
        $scope.showUserAction = function() {
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: '个人信息' },
                    { text: 'WiFi账户' },
                    { text: '安全退出' },
                ],

                cancelText: '取消',
                cancel: function() {
                    // add cancel code..
                },
                buttonClicked: function(index) {
                    switch (index) {
                        case 0:
                            $state.go("userinfo");
                            break;
                        case 1:
                            break;
                        case 2:
                            userHelp.safeLogout();
                            $state.go("loginMobile");
                            break;
                        case 3:
                            $state.go("loginMobile");
                            break;
                    }
                    return true;
                }
            });
        }

        //-------------获取日程红点-----------
        var actionMessage = "getMessage=1";
        $scope.unreaderNum = 0;
        $scope.getMessage = function(){
            var paramObj = {
                userId : localStorage.userid
            }
            var promise = DataSource.getData(actionMessage, paramObj);
            promise.then(function(data) {
                var data = data.rows;
                console.log("[getMessage]:");
                console.log(data);

                for(var i = 0 ; data && i < data.length; i++){
                    var item = data[i];
                    var new_msg_count = item.new_msg_count || 0;
                    if(item.type && 'com.ue.oa.oa.activity.CalendarActivity' == item.type){
                        $scope.unreaderNum = new_msg_count > 99  ? 99 : new_msg_count;
                    }
                }
            }, function(data) {
                $ionicSlideBoxDelegate.update();
                console.log("加载数据出现异常 [" + data.status + "]");
            });
        }
        $scope.getMessage();

})

.controller("comsumListController", function($scope, $stateParams, getDataSource, Restangular, $rootScope, $ionicPopover, $http, cordovaService, $ionicPlatform, $ionicHistory, showAlert, $ionicPopup) {

        $scope.index = 0;
        $scope.comsumData = [];
        $scope.SDATE = undefined;
        $scope.EDATE = undefined;

        $('.form_datetime').datetimepicker({
            //language:  'fr',
            weekStart: 1,
            todayBtn: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            forceParse: 0,
            showMeridian: 1
        });
        $('.form_date').datetimepicker({
            language: 'fr',
            weekStart: 1,
            todayBtn: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            minView: 2,
            forceParse: 0
        });
        $('.form_time').datetimepicker({
            language: 'fr',
            weekStart: 1,
            todayBtn: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 1,
            minView: 0,
            maxView: 1,
            forceParse: 0
        });

        $scope.loadmeDatas = function() {
            getDataSource.getDataSource("GetcardComsumList", { cardno: $rootScope.user.workno, sdate: $scope.SDATE, edate: $scope.EDATE, pagecount: $scope.index, rowcount: "8" }, function(comsum) {

                for (var i = 0; i < comsum.length; i++) {
                    $scope.comsumData.push(comsum[i]);
                }
                if (comsum.length == 0) {
                    $scope.moreDataCanBeLoaded = false;
                }
            })
        }

        $scope.moreDataCanBeLoaded = true;
        $scope.doRefresh = function() {
            $scope.moreDataCanBeLoaded = true;
            $scope.index = 1;
            $scope.comsumData = [];
            $scope.loadmeDatas();
            $scope.$broadcast("scroll.refreshComplete");
        };

        $scope.loadMore = function() {
            $scope.index = $scope.index + 1;
            $scope.loadmeDatas();
            $scope.$broadcast("scroll.infiniteScrollComplete");
        }

        $scope.search = function() {
            var strmess = "";
            if ($("#dtp_input1").val() == "") {
                strmess += "请选择开始时间\r\n";
            } else {
                $scope.SDATE = $("#dtp_input1").val();
            }
            if ($("#dtp_input2").val() != "") {
                $scope.EDATE = $("#dtp_input2").val();
            } else {
                strmess += "请选择结束时间\r\n";
            }
            if (strmess != "") {
                alert(strmess);
            } else {
                $scope.index = 1;
                $scope.loadmeDatas();
            }
        }
})

.controller("oneCardController", function($scope, $stateParams, getDataSource, Restangular, $rootScope, $ionicPopover, $http, cordovaService, $ionicPlatform, $ionicHistory, showAlert, $ionicPopup) {

        $scope.index = 0;
        $scope.comsumData = [];
        $scope.SDATE = "0";
        $scope.EDATE = "0";

        $('.form_datetime').datetimepicker({
            //language:  'fr',
            weekStart: 1,
            todayBtn: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            forceParse: 0,
            showMeridian: 1
        });
        $('.form_date').datetimepicker({
            language: 'fr',
            weekStart: 1,
            todayBtn: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            minView: 2,
            forceParse: 0
        });
        $('.form_time').datetimepicker({
            language: 'fr',
            weekStart: 1,
            todayBtn: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 1,
            minView: 0,
            maxView: 1,
            forceParse: 0
        });

        $scope.loadmeDatas = function() {
            //getDataSource.getDataSource("GetcardComsumList", { cardno: "2005096", sdate: $scope.SDATE, edate: $scope.EDATE, pagecount: $scope.index, rowcount: "8" }, function (comsum) {

            //    for (var i = 0; i < comsum.length; i++) {
            //        $scope.comsumData.push(comsum[i]);
            //    }
            //    if (comsum.length == 0) {
            //        $scope.moreDataCanBeLoaded = false;
            //    }
            //})
            var comsumList = [];
            var loginData = Restangular.one('Onecard/action/customList/' + $rootScope.user.workno + '/' + $scope.index + '/' + $scope.SDATE + '/' + $scope.EDATE);
            loginData.get().then(function(data) {
                comsumList = eval("(" + data + ")");
                for (var i = 0; i < comsumList.length; i++) {
                    $scope.comsumData.push(comsumList[i]);
                }
                if (comsumList.length == 0) {
                    $scope.moreDataCanBeLoaded = false;
                }
            });
        }


        $scope.moreDataCanBeLoaded = true;
        $scope.doRefresh = function() {
            $scope.moreDataCanBeLoaded = true;
            $scope.index = 1;
            $scope.comsumData = [];
            $scope.loadmeDatas();
            $scope.$broadcast("scroll.refreshComplete");
        };

        $scope.loadMore = function() {
            $scope.index = $scope.index + 1;
            $scope.loadmeDatas();
            $scope.$broadcast("scroll.infiniteScrollComplete");
        }

        $scope.search = function() {
            var strmess = "";
            if ($("#dtp_input1").val() == "") {
                strmess += "请选择开始时间\r\n";
            } else {
                $scope.SDATE = $("#dtp_input1").val();
            }
            if ($("#dtp_input2").val() != "") {
                $scope.EDATE = $("#dtp_input2").val();
            } else {
                strmess += "请选择结束时间\r\n";
            }
            if (strmess != "") {
                alert(strmess);
            } else {
                $scope.comsumData = [];
                $scope.index = 1;
                $scope.loadmeDatas();
            }
        }
})

.controller("noticeByJsController", function($scope, $state, $rootScope, $ionicHistory, $ionicModal, $ionicPopup, getDataSource) {
        $scope.goback = function() {
            $ionicHistory.goBack();
        }
        $scope.undisplay = false;
        $scope.index = 0;
        $scope.dataSource = [];
        //{ noticeid: "1", noticetitle: "我校哲学", releasetime: "2015-9-9 08:30", isread: "5" }, { noticeid: "2", noticetitle: "我校哲学111", releasetime: "2015-9-19 08:30", isread: null }, { noticeid: "3", noticetitle: "我校哲学2222", releasetime: "2015-9-29 08:30", isread: null }, { noticeid: "1", noticetitle: "我校哲学", releasetime: "2015-9-9 08:30", isread: "5" }, { noticeid: "2", noticetitle: "我校哲学111", releasetime: "2015-9-19 08:30", isread: null }, { noticeid: "3", noticetitle: "我校哲学2222", releasetime: "2015-9-29 08:30", isread: null }, { noticeid: "1", noticetitle: "我校哲学", releasetime: "2015-9-9 08:30", isread: "5" }, { noticeid: "2", noticetitle: "我校哲学111", releasetime: "2015-9-19 08:30", isread: null }, { noticeid: "3", noticetitle: "我校哲学2222", releasetime: "2015-9-29 08:30", isread: null }
        $scope.load = function() {
            getDataSource.getDataSource("GetJsGG", { pagecount: $scope.index, rowcount: "8" }, function(data) {
                for (var i = 0; i < data.length; i++) {
                    $scope.dataSource.push(data[i]);
                }
                if (data.length == 0) {
                    $scope.moreDataCanBeLoaded = false;
                }
                if ($scope.dataSource.length == 0) {
                    $scope.undisplay = true;
                }
            });
        }
        $scope.moreDataCanBeLoaded = true;
        $ionicModal.fromTemplateUrl('addnotice', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.loadMore = function() {
            $scope.index = $scope.index + 1;
            $scope.load();
            $scope.$broadcast("scroll.infiniteScrollComplete");
        }

        $scope.openModal = function() {
            $scope.addnotice = { content: "", title: "", userid: $rootScope.user.info_id, ggid: "", bcid: $rootScope.user.classid };

            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });

        $scope.godetail = function(e) {
            $state.go("noticeJsDetial", { ggid: e.id });
        }

        $scope.addNewNotice = function() {
            getDataSource.getDataSource("getNoticeNum", {}, function(data) {
                $scope.addnotice.ggid = data[0].nextval;
                getDataSource.getDataSource("addNoticeByJS", $scope.addnotice, function(data) {
                    $scope.closeModal();
                    $scope.load();
                });
            });
        }

        $scope.deletenotice = function(e) {
            // 确认弹出框
            $ionicPopup.confirm({
                okType: "button-assertive",
                okText: "确定",
                cancelText: "取消",
                title: "提示",
                template: "<div style='text-align:center;'>确定要删除吗?</b>"
            }).then(function(res) {
                if (res) {
                    getDataSource.getDataSource("delNotice", { ggid: e.noticeid }, function(data) {
                        _.remove($scope.dataSource, function(n) {
                            return n.noticeid == e.noticeid;
                        });
                    });
                } else {
                    //取消不做任何操作
                }
            });
        }

})

.controller("noticeJsDetialController", function($scope, $state, $rootScope, $ionicHistory, $stateParams, getDataSource) {
        $scope.dataSource = {};
        $scope.load = function() {
            getDataSource.getDataSource(["GetJsGGDetial", "getJSNoticeRead"], { ggid: $stateParams.ggid, jsid: $rootScope.user.info_id }, function(data) {
                //console.log(data);
                var getNotice = _.find(data, function(d) {
                    return d.name == "GetJsGGDetial";
                }).data;
                var getNoticeRead = _.find(data, function(d) {
                    return d.name == "getJSNoticeRead";
                }).data;
                $scope.dataSource = getNotice[0];
                if (getNoticeRead[0].total == 0) {
                    getDataSource.getDataSource("addJSNoticeRead", { ggid: $stateParams.ggid, jsid: $rootScope.user.info_id }, function(data) {
                        _.find($rootScope.iconvalArray, function(d) {
                            return d.key == "numUnReader";
                        }).val--;
                    });
                }
            });
        }();

})

.controller("userlistController", function($scope, $stateParams, getDataSource, $state, $ionicModal, $rootScope) {
    //教职工
    $scope.dataUser = [];
    //教职工
    $scope.dataUserAll = [];
    //部门
    $scope.dataDEPT = [];

    $scope.keyword = "";

    getDataSource.getDataSource("getUserlist", {}, function(data) {
        _.find(data, function(d) {
            if (d.deptname != "中国浦东干部学院") {
                $scope.dataUser.push(d);
                $scope.dataUserAll.push(d);
            } else {
                $scope.dataDEPT.push(d);
            }
        });
    });

    $scope.showgroup = function(rowData, keyword) {
        if (keyword == "") {
            return true;
        } else {
            var stugroup = _.filter($scope.dataUser, function(d) {
                return rowData.bt == d.deptname;
            });
            if (stugroup != null && stugroup.length > 0) {
                var stus = _.filter(stugroup, function(d) {
                    return d.bt.indexOf(keyword) > -1;
                });
                if (stus != null && stus.length > 0) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }

    $scope.openDept = function(id) {
        if ($("#item" + id).attr("style") == "display:none;") {
            $("#item" + id).attr("style", "display:online;");
        } else {
            $("#item" + id).attr("style", "display:none;");
        }
        if ($("#i" + id).attr("class") == "ion-arrow-up-b") {
            $("#i" + id).attr("class", "ion-arrow-down-b");
        } else {
            $("#i" + id).attr("class", "ion-arrow-up-b");
        }
    }

    //下载oa用户管理里面的人员照片
    $scope.downLoadUrl = "../backHTML/userphoto.aspx?userid=";

    $ionicModal.fromTemplateUrl("../templates/addresslistInfo.html", {
        scope: $scope,
        animation: "slide-in-up"
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function(e) {
        // console.log(e.info_id + "====" + e.classid);
        //用户默认图片
        $scope.userdefault = "../staticresource/userphoto/userdefault.svg";
        if (e.id != $rootScope.user.info_id) {
            getDataSource.getDataSource("getAddressUserInfo", { userid: e.id }, function(data) {
                //console.log(data);
                // console.log(data[0].uname);

                if (data[0].utype == "1") {
                    if (data[0].userphoto != null) {
                        $scope.userdefault = "../staticresource/userphoto/" + data[0].userphoto;
                    } else if (data[0].zppath != null) {
                        $scope.userdefault = $scope.downLoadUrl + e.id;
                    }
                } else if (data[0].userphoto != null) {
                    $scope.userdefault = "../staticresource/userphoto/" + data[0].userphoto;
                }
                $scope.addressUser = data[0];
            })
            $scope.modal.show();
        }
    };
    $scope.goHref = function(index) {
        switch (index) {
            case 0:
                location.href = "tel:" + $scope.addressUser.phone;
                break;
            case 1:
                location.href = "tel:0212828" + $scope.addressUser.fj;
                break;
            case 2:
                location.href = "tel:0212828" + $scope.addressUser.fjdh;
                break;
            case 3:
                location.href = "sms:" + $scope.addressUser.phone;
                break;
            case 4:
                userHelp.sigalChat($scope.addressUser.id, $scope.addressUser.uname);
                break;
        }
    }
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
})

.controller("usersInfoController", function($scope, $state, $rootScope, $stateParams, $filter, $timeout, calcStar, getDataSource, userHelp, $ionicPopup, $ionicHistory, $ionicModal, $ionicScrollDelegate, $ionicSideMenuDelegate, showAlert) {
        var user = JSON.parse(localStorage.user);
        var usertype = calcStar.getUserType(user);
        $scope.deptname = localStorage.deptname || "";
        $scope.userName = localStorage.username || "";
        $scope.ShowSelectBtn = false;
        $scope.hasZJlist = $rootScope.AppConfig.hasZJlist;
        $scope.keyval = "";
        $scope.myImg = "";
        $scope.ischecked = { checked: false }
        if (user.ishandpsd == "1") {
            $scope.ischecked.checked = true;
        } else {
            $scope.ischecked.checked = false;
        }
        if (user.userphoto == null || user.userphoto == "") {
            $scope.myImg = "../staticresource/userphoto/userdefaultpng.png";
        } else {
            $scope.myImg = "../staticresource/userphoto/" + user.userphoto;
        }
        $scope.isIOS = false;
        var isIOS = ionic.Platform.isIOS();
        if (isIOS) {
            $scope.isIOS = true;
        }

        if (isWeiXin() && Feature.FEATURE_WECHAT_LOGIN) {
            $scope.showLogout = false;
        } else {
            $scope.showLogout = true;
        }

        $scope.LoadTeachListData = function() {
            usertype = calcStar.getUserType(user);
            // getDataSource.getDataSource("getMyMarkCount", { userid: user.info_id }, function (data) {
            //     $scope.userInfo = data[0];
            // });
        };

        $scope.Logout = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: '提示',
                template: '确定要退出系统?',
                okText: "确定",
                cancelText: "取消",
                okType: "button-positive"
            });

            confirmPopup.then(function(res) {
                if (res) {
                    $ionicHistory.clearCache();
                    $ionicHistory.clearHistory();
                    userHelp.safeLogout();
                    $state.go("loginMobile");
                }
            });
        }

        $scope.goUser = function() {
            $state.go("userinfo");
        }

        $scope.HrefTo = function(urlTag) {
            $state.go(urlTag, { xyinfoid: user.info_id });
        }
        $scope.gotoOneCard = function(userid) {
            if (userid != null) {
                $state.go("comsumList", { carno: user.workno });
            } else {
                //alert("您当前暂无积点明细");
                showAlert.showToast("您当前暂无积点明细");
                //$state.go("comsumList", { carno: user.workno });
            }
        }
        $scope.gotoOneCardList = function(userid) {
                if (userid != null) {
                    $state.go("oneCard", { carno: user.workno });
                } else {
                    //alert("您当前暂无余额明细");
                    showAlert.showToast("您当前暂无余额明细");
                    //$state.go("oneCard", { carno: user.workno });
                }
            }
            // 设置手势密码
        $scope.gotohandLogin = function() {
            setTimeout(function() {
                if ($scope.ischecked.checked) {
                    $rootScope.user.ishandpsd = 1;
                    $scope.ischecked.checked = true;
                } else {
                    $rootScope.user.ishandpsd = 0;
                    $scope.ischecked.checked = false;
                }
                $state.go("handLogin");
            }, 100);
        }

        $scope.LoadTeachListData();
})

.controller("wifiInfoController", function($scope, $state, $ionicHistory, $rootScope) {
        $scope.goBack = function() {
                $ionicHistory.goBack();
            }
            //TODO 使用
        $scope.loaddata = function() {
            $scope.wifiAccount = {
                logname: $rootScope.user.logname,
                password: $rootScope.user.wifipassword
            }
        }();

        $scope.networkHelpInfoState = false;
        $scope.toggleNetworkHelpInfo = function() {
            $scope.networkHelpInfoState = !$scope.networkHelpInfoState;
        }
})

.controller("zpykbcxController", function($scope, Restangular, $state, $ionicModal, $ionicHistory, $dateService, $rootScope, $ionicSlideBoxDelegate, $ionicScrollDelegate, getDataSource) {
        // 课表查询
        $scope.gorcdetail = function(e) {
            $state.go("KCDetail", { info_id: e.lessonid });
        }

        $scope.goback = function() {
                $ionicHistory.goBack();
            }
            //当前模式，默认周
        $scope.weekpage = true;
        //页面切换事件
        $scope.changePageView = function() {
            $scope.weekpage = !$scope.weekpage;
            $scope.styleString = $scope.weekpage ? parseInt($scope.styleString) + 81 : parseInt($scope.styleString) - 81;
            $(".week-timetable-content .scroll").removeAttr("style");
        };
        if ($rootScope.user == null) {
            $state.go("loginMobile");
            return;
        } else {
            $scope.userInfo = $rootScope.user;
            $scope.Checkclassid = undefined;
        }
        var isIOS = ionic.Platform.isIOS();
        var isAndroid = ionic.Platform.isAndroid();
        $scope.styleString = "145";
        $scope.styleTopString = "74";
        if (isAndroid) {
            $scope.styleString = "145";
            $scope.styleTopString = "74";
        }
        if (isIOS) {
            //$scope.styleString = "95";
            $scope.styleTopString = "94";
        }

        $scope.isshowloading = true;
        // 日期转换
        $scope.parseDate = function(dataString) {
            if (dataString) {
                return $dateService.parse(dataString);
            } else {
                return "";
            }
        }
        $scope.titleYearMonth = $dateService.format(new Date(), "yyyy-mm");
        $scope.loadDatas = function() {
            //取出所有数据，包括服务器时间，开班开始时间和开班结束时间，所有课程
            getDataSource.getDataSource(["getzpyKbNew", "getkbuser"], {
                USERID: $scope.userInfo.info_id,
                CLASSID: $scope.userInfo.classid,
                chkclassid: $scope.Checkclassid,
                ONECARD: "2015090100313001"
            }, function(data) {
                if (data !== null) {
                    $scope.pj = _.find(data, function(d) {
                        return d.name == "getkbuser";
                    }).data;
                    $scope.kclist = _.find(data, function(d) {
                        return d.name == "getzpyKbNew";
                    }).data;
                    if ($scope.pj) {
                        $scope.pjData = $scope.pj[0];
                        if ($scope.pjData) {
                            $scope.SYSDATE = $scope.pjData.sys_date;
                            $scope.sysdate = new Date($scope.pjData.systime); //系统时间
                            $scope.today = $scope.pjData.systime; //今日
                            $scope.activeDate = $scope.today; //当前选中日期
                            $scope.titleYearMonth = $dateService.format($scope.sysdate, "yyyy-mm"); //选中日期的月份
                            $scope.old_startdate = new Date($scope.pjData.classbegin);
                            $scope.old_enddate = new Date($scope.pjData.classend);
                            //根据开班开始时间的周几通过开班开始时间减去开始时间的周几索引（0-6）为新的开班开始时间
                            $scope.startdate = new Date($scope.old_startdate.getTime() - ($scope.old_startdate.getDay() * 24 * 60 * 60 * 1000));
                            //根据开班结束时间的周几通过开班结束时间加上结束时间的周几索引（6减去0-6）为新的开班结束时间
                            $scope.enddate = new Date($scope.old_enddate.getTime() + ((6 - $scope.old_enddate.getDay()) * 24 * 60 * 60 * 1000));
                            //
                            $scope.slideNum = (($scope.enddate.getTime() - $scope.startdate.getTime()) / 1000 / 60 / 60 / 24 + 1) / 7;
                        } else {
                            $scope.SYSDATE = $dateService.format(new Date(), "yyyy-mm-dd hh:mm:ss");
                            $scope.sysdate = new Date(); //系统时间
                            $scope.today = $dateService.format(new Date(), "yyyy-mm-dd"); //今日
                            $scope.activeDate = $scope.today; //当前选中日期
                            $scope.titleYearMonth = $dateService.format($scope.sysdate, "yyyy-mm"); //选中日期的月份
                            $scope.old_startdate = new Date($dateService.format($scope.sysdate, "yyyy-mm") + "-01");
                            $scope.old_enddate = new Date($scope.old_startdate.getTime() + (60 * 24 * 60 * 60 * 1000));
                            //根据开班开始时间的周几通过开班开始时间减去开始时间的周几索引（0-6）为新的开班开始时间
                            $scope.startdate = new Date($scope.old_startdate.getTime() - ($scope.old_startdate.getDay() * 24 * 60 * 60 * 1000));
                            //根据开班结束时间的周几通过开班结束时间加上结束时间的周几索引（6减去0-6）为新的开班结束时间
                            $scope.enddate = new Date($scope.old_enddate.getTime() + ((6 - $scope.old_enddate.getDay()) * 24 * 60 * 60 * 1000));
                            //
                            $scope.slideNum = (($scope.enddate.getTime() - $scope.startdate.getTime()) / 1000 / 60 / 60 / 24 + 1) / 7;
                        }
                    }
                    //重新组织JSON格式：

                    //周日历
                    var eachList = [{
                        ym1: '2014-12',
                        ym2: '2015-01', //跨月只能一个月
                        index: 0,
                        solarData: [{
                                date: '2014-12-31',
                                day: 31,
                                ym: '2014-12'
                            }, {
                                date: '2015-01-01',
                                day: 1
                            }, {
                                date: '2015-01-02',
                                day: 2
                            }, {
                                date: '2015-01-03',
                                day: 3
                            }, {
                                date: '2015-01-04',
                                day: 4
                            }, {
                                date: '2015-01-05',
                                day: 5
                            },
                            { date: '2015-01-06', day: 6 }
                        ],
                        lunarData: [{
                                date: '2014-12-31',
                                day: "三十",
                                data: [{ title: "" }, { title: "" }],
                                ym: '2014-12'
                            }, {
                                date: '2015-01-01',
                                day: "初一",
                                data: []
                            }, {
                                date: '2015-01-02',
                                day: "初二",
                                data: []
                            }, {
                                date: '2015-01-03',
                                day: "初三",
                                data: []
                            }, {
                                date: '2015-01-04',
                                day: "初四",
                                data: []
                            }, {
                                date: '2015-01-05',
                                day: "初五",
                                data: [{ title: "" }, { title: "" }]
                            },
                            { date: '2015-01-06', day: "初六", data: [{ title: "" }, { title: "" }] }
                        ]
                    }];
                    var calendarList = [],
                        lsarry = new Array();
                    $scope.monthlist = [];
                    //通过新的开班开始时间-结束时间的天数除以七（得出结果一定是整数）来循环输出每周的日期，即有多少个tab页
                    for (var i = 0; i < $scope.slideNum; i++) {
                        var slideArry = {},
                            lsdate, lstimetable, lssarry = new Array();
                        slideArry.index = i;
                        slideArry.solarData = [];
                        slideArry.lunarData = [];
                        for (var wk = 0; wk < 7; wk++) {
                            lsdate = new Date($scope.startdate.getTime() + (((i * 7) + wk) * 24 * 60 * 60 * 1000));
                            var ftdate = $dateService.format(lsdate, "yyyy-mm-dd"),
                                ym = $dateService.format(lsdate, "yyyy-mm");
                            slideArry.solarData.push({
                                date: ftdate,
                                day: parseInt($dateService.format(lsdate, "dd")),
                                ym: ym
                            });
                            //找出当前日期的所有课程数据
                            lstimetable = [];
                            if ($scope.kclist) {
                                _.forEach($scope.kclist, function(m, key) {
                                    if (m.lessonbegin1 == ftdate || m.lessonend1 == ftdate) {
                                        lstimetable.push(m);
                                    }
                                });
                            }
                            if ($scope.activeDate == ftdate) {
                                $scope.timetable = lstimetable;
                                $scope.pageIndex = i;
                            }
                            var lspdata = {
                                date: ftdate,
                                day: GetLunarDay($dateService.format(lsdate, "yyyy"), $dateService.format(lsdate, "mm"), $dateService.format(lsdate, "dd")).day,
                                data: lstimetable,
                                ym: ym
                            };
                            slideArry.lunarData.push(lspdata);

                            //全局
                            if (lsarry.indexOf(ym) == -1) {
                                lsarry.push(ym);
                                $scope.monthlist.push({
                                    date: ym,
                                    month: $dateService.format(lsdate, "mm")
                                });
                            }
                            //周
                            if (lssarry.indexOf(ym) == -1) {
                                lssarry.push(ym);
                                if (slideArry.ym1) {
                                    slideArry.ym2 = ym;
                                } else {
                                    slideArry.ym1 = ym;
                                }
                            }
                        }
                        calendarList.push(slideArry);
                    }
                    $scope.calendarList = calendarList;
                    $ionicSlideBoxDelegate.update();
                    if ($scope.pageIndex) {
                        setTimeout(function() {
                            $ionicSlideBoxDelegate.slide($scope.pageIndex, 1);
                            $scope.isshowloading = false;
                        }, 10)
                    } else {
                        $scope.isshowloading = false;
                    }
                } else {
                    //showToast.show($rootScope.appcontent.noData);
                }
            });
        };
        setTimeout(function() {
            $scope.loadDatas();
            $scope.getBCData();
        }, 500);
        $scope.slideHasChanged = function($index) {
            //获取当前选中的日期，算出星期几
            var weekIndex = new Date($scope.activeDate).getDay();
            try {
                $scope.activeDate = $scope.calendarList[$index].lunarData[weekIndex].date;
                $scope.timetable = $scope.calendarList[$index].lunarData[weekIndex].data;
            } catch (e) {

            }
            $scope.titleYearMonth = $dateService.format(new Date($scope.activeDate), "yyyy-mm");

            $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
        }
        $scope.changeTimeTableView = function(objdata, sobjdata, changePageView) {
            $scope.activeDate = sobjdata.date;
            $scope.titleYearMonth = $dateService.format(new Date($scope.activeDate), "yyyy-mm");
            if (!changePageView) {
                $scope.changePageView();
                $ionicSlideBoxDelegate.slide(objdata.index, 300);
            }
            for (var i in objdata.lunarData) {
                if (objdata.lunarData[i].date == $scope.activeDate) {
                    $scope.timetable = objdata.lunarData[i].data;
                }
            }

            $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
        }
        $scope.changeTodayView = function() {
            $scope.activeDate = $scope.today;
            $scope.titleYearMonth = $dateService.format(new Date($scope.activeDate), "yyyy-mm");
            var weekIndex = new Date($scope.activeDate).getDay();
            try {
                $scope.timetable = $scope.calendarList[$scope.pageIndex].lunarData[weekIndex].data;
            } catch (e) {

            }
            if ($scope.pageIndex != null && $scope.pageIndex != undefined) {
                $ionicSlideBoxDelegate.slide($scope.pageIndex, 300);
            }

            $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
        }
        $scope.goTotechEvaluation = function(obj) {
            if (!$scope.isDisable(obj.lessonid, obj.ispost)) {
                $state.go("app.techEvaluation", {
                    id: obj.lessonid,
                    type: obj.evaluatetype,
                    lessontype: obj.lessontype,
                    isback: 1
                });
            }
            //$state.go("app.notices");
        }

        //是否已过期样式
        $scope.isDisable = function(etime, ispost) {
                //注意：5是配置,代表时限推后5天
                if ($scope.calculationObsolete(etime) && ispost != "1") {
                    return "i_disable";
                }
            }
            //计算是否过期
        $scope.calculationObsolete = function($edate) {
                var $delay = $rootScope.AppConfig.evaluateouttime;
                //获取系统时间
                var sysDate = new Date($scope.SYSDATE.replace(/-/g, "/")),
                    newDate = new Date($edate.replace(/-/g, "/"));
                newDate = new Date(newDate.setDate(newDate.getDate() + parseInt($delay)));
                var minuteNum = (newDate.getTime() - sysDate.getTime()) / 60 / 1000; //分钟
                if (parseInt(minuteNum) <= 0) {
                    return true;
                } else {
                    return false;
                }
            }
            //提交数据库更新
        $scope.updatememo = function() {
                getDataSource.getDataSource("updatebz", {
                    kcid: $scope.updateclass.lessonid,
                    content: $scope.newlessonmemo.lessonmemo
                }, function(data) {
                    $scope.updateclass.lessonmemo = $scope.newlessonmemo.lessonmemo;
                    $scope.newlessonmemo.lessonmemo = "";
                    $scope.closeModal();
                });
            }
            //打开对话框修改
        $ionicModal.fromTemplateUrl('memo', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.updateclass = {};
        $scope.newlessonmemo = {};
        $scope.openModal = function(e) {
            if ($rootScope.user.type == "teacher") {
                $scope.updateclass = e;
                if (e.lessonmemo != "" && e.lessonmemo != null) {
                    $scope.newlessonmemo.lessonmemo = e.lessonmemo;
                }
                $scope.modal.show();
            }
        };
        $scope.closeModal = function() {
            $scope.newlessonmemo.lessonmemo = "";
            $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });

        $scope.getBCData = function() {
            $scope.bclist = [];
            getDataSource.getDataSource("getAllbc", {}, function(classdata) {
                var allClass = { classid: "", bt: "全部班次", bt2: "全部班次", kssj: "", jssj: "" };
                $scope.bclist.push(allClass);
                for (var i = 0; i < classdata.length; i++) {
                    $scope.bclist.push(classdata[i]);
                }
                if (classdata.length > 1) {
                    $scope.ShowSelectBtn = true;
                    $scope.userInfo.classname = $scope.bclist[0].bt;
                }
            });
        }

        $scope.selectbc = function() {
            if ($rootScope.user.type == "student") {
                return;
            }
            $ionicModal.fromTemplateUrl('../templatesUser/selectAllbc.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal = modal;
                $scope.modal.show();
            });

            $scope.displayProp = function() {
                $state.reload();
                $scope.modal.hide();
            };
        }

        $scope.checked = function(item) {
            $scope.userInfo.classname = item.bt;
            $scope.userInfo.classid = item.classid;
            if (item.classid != "") {
                $scope.Checkclassid = item.classid;
            } else {
                $scope.Checkclassid = undefined
            }
            $scope.userInfo.kssj = item.kssj;
            $scope.userInfo.jssj = item.jssj;
            $scope.userInfo.type = item.usertype;

            $scope.loadDatas();
            //localStorage.user = JSON.stringify($rootScope.user);
            $scope.modal.hide();
        }
})

.controller("allBcViewController", function($scope, $state, $ionicHistory, $rootScope, $ionicModal, getDataSource) {

        $scope.loadAllbc = [];
        $scope.loadSCWTbc = [];
        $scope.index = 0;
        $scope.index2 = 0;
        $scope.xndate = "";
        $scope.xqdate = "";
        $scope.bjxz = "";
        //加载事件
        $scope.loadData = function() {
                getDataSource.getDataSource("getZYTXbc", { sfjh: 0, xn: $("#data_select").val(), xq: $("#data_select1").val(), pagecount: 1, rowcount: "10" }, function(data) {
                    if (data.length > 0) {
                        $scope.loadAllbc = data;
                    }
                });
                getDataSource.getDataSource("getZYTXbc", { sfjh: 1, xn: $("#data_scwt").val(), xq: $("#time_scwt").val(), pagecount: 1, rowcount: "10" }, function(data) {
                    if (data.length > 0) {
                        $scope.loadSCWTbc = data;
                    }
                });
            }
            //setTimeout(function () {
            //    $scope.loadData();
            //}, 500);
        $scope.moreDataCanBeLoaded = true;
        $scope.moreDataCanBeLoaded1 = true;
        $scope.loadMore = function(type) {
            if (type == 0) {
                $scope.index = $scope.index + 1;
                $scope.searchData(type, $scope.index);
            } else {
                $scope.index2 = $scope.index2 + 1;
                $scope.searchData(type, $scope.index2);
            }

            $scope.$broadcast("scroll.infiniteScrollComplete");
        }

        $scope.search = function(type) {
            if (type == 0) {
                $scope.loadAllbc = [];
                $scope.index = 1;
                $scope.xndate = $("#data_select").val();
                $scope.xqdate = $("#data_select1").val();
                if ($("#data_type").val() == "全部") {
                    $scope.bjxz = undefined;
                } else {
                    $scope.bjxz = $("#data_type").val();
                }
                $scope.moreDataCanBeLoaded = true;
            } else {
                $scope.loadSCWTbc = [];
                $scope.index2 = 1;
                $scope.xndate = $("#data_scwt").val();
                $scope.xqdate = $("#time_scwt").val();
                if ($("#bc_type").val() == "全部") {
                    $scope.bjxz = undefined;
                } else {
                    $scope.bjxz = $("#bc_type").val();
                }
                $scope.moreDataCanBeLoaded1 = true;
            }
            $scope.searchData(type, 1);
        }

        $scope.searchData = function(type, rowindex) {
            if (!$scope.xndate) {
                $scope.xndate = $("#data_select").val();
                $scope.xqdate = $("#data_select1").val();
                $scope.bjxz = undefined;
            }
            getDataSource.getDataSource("getZYTXbc", { sfjh: type, xn: $scope.xndate, xq: $scope.xqdate, bjxz: $scope.bjxz, pagecount: rowindex, rowcount: "10" }, function(data) {
                if (data.length > 0) {
                    if (type == 0) {
                        for (var i = 0; i < data.length; i++) {
                            $scope.loadAllbc.push(data[i]);
                        }
                    } else {
                        for (var i = 0; i < data.length; i++) {
                            $scope.loadSCWTbc.push(data[i]);
                        }
                    }
                } else {
                    if (type == 0) {
                        $scope.moreDataCanBeLoaded = false;
                    } else {
                        $scope.moreDataCanBeLoaded1 = false;
                    }
                }
            });
        }

        $scope.gotoBcinfo = function(e) {
            $state.go("bcinfo", { classid: e.classid });
        }
})

.controller("myAgendaController", function($scope, Restangular, $state, $ionicModal, $ionicHistory, $dateService, $rootScope, $ionicSlideBoxDelegate, $ionicScrollDelegate, getDataSource) {
    // 课表查询
    $scope.gokcdetail = function(e, state) {
        $state.go("addAgenda", { id: e.id, sta: state });
    }

    $scope.goback = function() {
            $ionicHistory.goBack();
    }
  iframeDate=new Date();
	var format = function (date, format) { 
	var o = { 
			"M+" : date.getMonth()+1, //month 
			"d+" : date.getDate(), //day 
			"h+" : date.getHours(), //hour 
			"m+" : date.getMinutes(), //minute 
			"s+" : date.getSeconds(), //second 
			"q+" : Math.floor((date.getMonth()+3)/3), //quarter
			"S" : date.getMilliseconds() //millisecond 
			};

			if(/(y+)/.test(format)) { 
				format = format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)); 
			} 
			for(var k in o) { 
				if(new RegExp("("+ k +")").test(format)) { 
				format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
				};
			}
			return format;
	};
	
	mainFrame=document.getElementById("mainFrame").contentWindow;	
	var baseUrl = "";
	$("#userId").val(localStorage.userid);
	 $scope.createduty= function(){		
		 var title="添加日程";
		 var userId=localStorage.userid;
		 if(!userId){
			 userId="";
		 }
		 var date1Str=format(iframeDate,"yyyy-MM-dd")+" "+format(new Date(),"hh:mm");
		 var date1=new Date(date1Str.replace(/\-/g, "\/"));		 
		 startTime=format(date1,'yyyy-MM-dd hh:mm');
		 date1.setHours(date1.getHours()+1);
		 endTime=format(date1,'yyyy-MM-dd hh:mm');
		 var params={"ID":"","BEGIN_TIME":startTime,"END_TIME":endTime,"CREATEUSER":userId};
		 var url = baseUrl + "#/addAgenda/"+Base64.encode(JSON.stringify(params))+"/"+Base64.encode(title);
		 console.log(url);
         $state.go("addAgenda", { "params": Base64.encode(JSON.stringify(params)), "title": Base64.encode(title) });
	 };	 
	 items=[];
	 openDuty=function(obj){
		 		
			var title="修改日程";
			var indexStr=$(obj).find("#indexItem").val();
			var index=parseInt(indexStr);
			var params=items[index];
			var id=params["ID"];
			var params={"ID":id};			
			var url = baseUrl +  "#/addAgenda/"+Base64.encode(JSON.stringify(params))+"/"+Base64.encode(title);
			console.log(url);
			$state.go("addAgenda", { "params": Base64.encode(JSON.stringify(params)), "title": Base64.encode(title) });
	 };
})

.controller("addAgendaController", function($scope, $state, $rootScope, $ionicHistory, $stateParams, $ionicPopup, getDataSource, $dateService,Toast,httpProxy) {
    $scope.goback = function() {
            $ionicHistory.goBack();
    }
     var format = function (date, format) { 			
    	var o = { 
    			"M+" : date.getMonth()+1, //month 
    			"d+" : date.getDate(), //day 
    			"h+" : date.getHours(), //hour 
    			"m+" : date.getMinutes(), //minute 
    			"s+" : date.getSeconds(), //second 
    			"q+" : Math.floor((date.getMonth()+3)/3), //quarter 
    			"S" : date.getMilliseconds() //millisecond 
    			};

    			if(/(y+)/.test(format)) { 
    				format = format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    			} 
    			for(var k in o) { 
    				if(new RegExp("("+ k +")").test(format)) { 
    				format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
    				} 
    			}
    			return format;
    };
   
    $scope.savedata=function(){
    	var id=$scope.dutyId;   	
    	var content=$("#contentAgenda").val();    	
    	var startTime=$("#startTime").val(); 
    	var endTime=$("#endTime").val();
    	var errinfo="";
    	if(content==""){
    		errinfo="请输入日程内容";    		
    	}
    	if(endTime!=""&&startTime!=""){
    		 var date1=new Date(startTime.replace(/\-/g, "\/"));
    		 var date2=new Date(endTime.replace(/\-/g, "\/"));
    		 if(date1.getTime()>date2.getTime()){
    			 if(errinfo!=""){
    				 errinfo+="与";
    			 }else{
    				 errinfo="请输入";
    			 }
    			 errinfo+="正确的开始/结束时间";
    		 }
    	}else{
    		if(errinfo!=""){
				 errinfo+="与";
			 }else{
				 errinfo="请输入";
			 }
			 errinfo+="开始/结束时间";
    	}
    	if(errinfo!=""){    		
              Toast.showPop(errinfo);
              return;
    	}
    	if(startTime!=""){
    		startTime=startTime+":00";
    	}
    	if(endTime!=""){
    		endTime=endTime+":00";
    	} 	
     	 
    	var repeatType=$scope.repeatType;
    	var isRemind=$scope.isRemind;
    	/*if($scope.pushNotification.checked==true){
    		isRemind=1;
    	}*/
    	var userId =$scope.createUser;    
    	var priority = $scope.priority || "0";
    	var repeatTimes = $scope.repeatTimes || "0" ;
    	
    	var jsondata={"ID":id,"TITLE":content,"CONTENT":content,"BEGIN_TIME":startTime,"END_TIME":endTime,"REPEAT_TYPE":repeatType,"REPEAT_TIMES":repeatTimes,"IS_REMIND":isRemind,"JOINUSERS":$scope.joinusers,"CREATEUSER":userId,"PRIORITY":priority};
    	var url=baseURL+"/action?calendarDuty=1&type=";
    	if(id!=null&&id!=""){
    		url=url+"update";
    	}else{
    		url=url+"add";
    	}
    	
    	url=url+"&__DATA="+JSON.stringify(jsondata);
    	 httpProxy.getJSON(url,"",function(data){
    	 	data = data.data;
    	 	var info=$scope.viewTitle;
    		var result=data.result;
    		if(result){
    			info+="成功";
    		}else{
    			info+="失败";
    		}
    		Toast.showPop(info);
			if(result){
				$scope.goback();
			}
    	}); 
    	/*$http.jsonp(url).success(function(data){
    		var info=$scope.viewTitle;
    		var result=data.result;
    		if(result){
    			info+="成功";
    		}else{
    			info+="失败";
    		}
    		Toast.showPop(info);
			if(result){
				xsfWindow.close();
			}
    	});    */	
    };

     $scope.calendarDate=function(){    	 
    	 	var date1=new Date($scope.startTime.replace(/\-/g, "\/"));    	
    		var currYear = date1.getFullYear();	
    		var opt={};
    		opt.date = {preset : 'date'};
    		opt.time = {preset : 'time'};
    		
    		opt.default1 = {
    			theme: 'android-ics light', //皮肤样式
    	        display: 'modal', //显示方式 
    	        mode: 'scroller', //日期选择模式
                dateFormat: 'yy-mm-dd', // 日期格式
    			lang:'zh'
    		};
    		opt.datetime = {preset : 'datetime',showNow: true,nowText: "当前时间",startYear: currYear-1,endYear: currYear + 8,onSelect:function(valueText){
    	    	if(valueText&&valueText!=""){	    		
    	    		var d=new Date(valueText.replace(/\-/g, "\/"));  
    	    		var opt1={};
    	    		opt1.default1 = {
    	    				theme: 'android-ics light', //皮肤样式
    	    		        display: 'modal', //显示方式 
    	    		        mode: 'scroller', //日期选择模式
                            dateFormat: 'yy-mm-dd', // 日期格式
    	    				lang:'zh'     
    	    			};
    	    		 opt1.datetime = {preset : 'datetime',showNow: true,nowText: "当前时间",endYear: currYear + 8,minDate:d};
    	    		 var datetimeopt1 = $.extend(opt1['datetime'], opt1['default1']);
    	    		 $("#endTime").mobiscroll(datetimeopt1).datetime(datetimeopt1);
    	    	}
    	    }};    		
    	  	var datetimeopt = $.extend(opt['datetime'], opt['default1']);	  	
    	    $("#startTime").mobiscroll(datetimeopt).datetime(datetimeopt);    	    
    	    opt.datetime = {preset : 'datetime',showNow: true,nowText: "当前时间",endYear: currYear + 8,minDate:date1};
    	    datetimeopt = $.extend(opt['datetime'], opt['default1']);
    	    $("#endTime").mobiscroll(datetimeopt).datetime(datetimeopt);  
     };
     
    $scope.viewTitle=Base64.decode($stateParams.title);   
    var params = Base64.decode($stateParams.params); 
    
    var initData= eval('(' + params + ')');
    var dutyId=initData.ID;
    $scope.dutyId=initData.ID;
    $scope.pushNotification = { checked: false };
    
    if(dutyId==""){
    	$scope.createUser=initData.CREATEUSER;
    	$scope.content="";
    	$scope.startTime=initData.BEGIN_TIME;
     	$scope.endTime=initData.END_TIME;
     	$scope.repeatTimes="0";
     	$scope.joinusers="";
     	$scope.priority="0";
     	$scope.isRemind="0";
     	$scope.repeatType="0";
     	$scope.calendarDate();
     	
    }else{
    	 var initurl=baseURL+"/action?calendarDuty=1&type=findById&id="+$scope.dutyId;
    	 httpProxy.getJSON(initurl,"",function(data){
    	 	 var initdata=data.data.rows;    		
			 if(initdata){
				 initdata=initdata[0];
				 $scope.createUser=initdata.CREATEUSER;
				 $scope.startTime=initdata.BEGIN_TIME;
				 $scope.endTime=initdata.END_TIME;
				 $scope.content=initdata.CONTENT;
				 $scope.repeatType=initdata.REPEAT_TYPE;				 
				 $scope.repeatTimes=initdata.REPEAT_TIMES;
				 $scope.joinusers=initdata.JOINUSERS;
				 $scope.priority=initdata.PRIORITY;
				 $scope.isRemind=initdata.IS_REMIND;
				 $scope.calendarDate();
			 }
		 });
		 
		/* $http.jsonp(initurl).success(function(data){
			 var initdata=data.rows;    		
			 if(initdata){
				 initdata=initdata[0];
				 $scope.createUser=initdata.CREATEUSER;
				 $scope.startTime=initdata.BEGIN_TIME;
				 $scope.endTime=initdata.END_TIME;
				 $scope.content=initdata.CONTENT;
				 $scope.repeatType=initdata.REPEAT_TYPE;				 
				 $scope.repeatTimes=initdata.REPEAT_TIMES;
				 $scope.joinusers=initdata.JOINUSERS;
				 $scope.priority=initdata.PRIORITY;
				 $scope.isRemind=initdata.IS_REMIND;
				 $scope.calendarDate();
			 }
		 });*/
    }
})

.controller("bcinfoController", function($scope, $state, $stateParams, $rootScope, getDataSource) {

    //TODO 使用 $stateParams.classid
    setTimeout(function() {
        getDataSource.getDataSource(["getBcinfoByid", "getBZR", "getZDLS", "getSBLD"], { classid: $stateParams.classid }, function(data) {
            //console.log(data);
            $scope.dataBcinfo = _.find(data, function(d) {
                return d.name == "getBcinfoByid";
            }).data;
            $scope.dataBZR = _.find(data, function(d) {
                return d.name == "getBZR";
            }).data;
            $scope.dataZDLS = _.find(data, function(d) {
                return d.name == "getZDLS";
            }).data;
            $scope.dataSBLD = _.find(data, function(d) {
                return d.name == "getSBLD";
            }).data;
            $scope.bzr = "";
            $scope.zdls = "";
            $scope.sbld = "";
            for (var i = 0; i < $scope.dataBZR.length; i++) {
                $scope.bzr += $scope.dataBZR[i].uname + "  ";
            }
            for (var i = 0; i < $scope.dataZDLS.length; i++) {
                $scope.zdls += $scope.dataZDLS[i].uname + "  ";
            }
            for (var i = 0; i < $scope.dataSBLD.length; i++) {
                $scope.sbld += $scope.dataSBLD[i].uname + "  ";
            }
        });
    }, 500);

})

.controller("zcbdController", function($scope, $state, $ionicHistory, $rootScope, getDataSource) {

    $scope.loadAllbc = [];
    $scope.loadSCWTbc = [];
    $scope.index = 0;
    $scope.index2 = 0;
    $scope.xndate = undefined;
    $scope.xqdate = undefined;
    $scope.keyword = "";
    $scope.sfjh = "";
    //加载事件
    $scope.loadData = function() {
            getDataSource.getDataSource("getZYTXbc", { sfjh: 0, xn: $("#data_select").val(), xq: $("#data_select1").val(), pagecount: 1, rowcount: "10" }, function(data) {
                if (data.length > 0) {
                    $scope.loadAllbc = data;
                }
            });
            getDataSource.getDataSource("getZYTXbc", { sfjh: 1, xn: $("#data_scwt").val(), xq: $("#time_scwt").val(), pagecount: 1, rowcount: "10" }, function(data) {
                if (data.length > 0) {
                    $scope.loadSCWTbc = data;
                }
            });
        }
        //setTimeout(function () {
        //    $scope.loadData();
        //}, 500);
    $scope.moreDataCanBeLoaded = true;
    $scope.moreDataCanBeLoaded1 = true;
    $scope.loadMore = function() {
        $scope.index = $scope.index + 1;

        getDataSource.getDataSource("getZCLView", { pagecount: $scope.index }, function(data) {
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    $scope.loadAllbc.push(data[i]);
                }
            } else {
                $scope.moreDataCanBeLoaded = false;
            }
        });
    }

    $scope.loadMoreHistory = function() {
        $scope.index2 = $scope.index2 + 1;

        if (!$scope.xndate) {
            $scope.xndate = $("#data_scwt").val();
            $scope.xqdate = $("#time_scwt").val();
            $scope.sfjh = $("#sfjh").val();
        }

        getDataSource.getDataSource("getZCLViewWhere", { sfjh: $scope.sfjh, xn: $scope.xndate, xq: $scope.xqdate, pagecount: $scope.index2 }, function(data) {
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    $scope.loadSCWTbc.push(data[i]);
                }
            } else {
                $scope.moreDataCanBeLoaded1 = false;
            }
        });
    }

    $scope.search = function(type) {

        $scope.loadSCWTbc = [];
        $scope.index2 = 0;
        $scope.xndate = $("#data_scwt").val();
        $scope.xqdate = $("#time_scwt").val();
        $scope.sfjh = $("#sfjh").val();
        $scope.moreDataCanBeLoaded1 = true;

        $scope.$broadcast("scroll.infiniteScrollComplete");

        //$scope.searchData(type, 1);
    }

    $scope.searchData = function(type, rowindex) {
        if (!$scope.xndate) {
            $scope.xndate = $("#data_scwt").val();
            $scope.xqdate = $("#time_scwt").val();
            $scope.sfjh = $("#sfjh").val();
        }
        var sqlName = "";
        if (type == 0) {
            sqlName = "getZCLView";
        } else {
            sqlName = "getZCLViewWhere";
        }
        getDataSource.getDataSource(sqlName, { sfjh: $scope.sfjh, xn: $scope.xndate, xq: $scope.xqdate, pagecount: rowindex }, function(data) {
            if (data.length > 0) {
                if (type == 0) {
                    for (var i = 0; i < data.length; i++) {
                        $scope.loadAllbc.push(data[i]);
                    }
                } else {
                    for (var i = 0; i < data.length; i++) {
                        $scope.loadSCWTbc.push(data[i]);
                    }
                }
            } else {
                if (type == 0) {
                    $scope.moreDataCanBeLoaded = false;
                } else {
                    $scope.moreDataCanBeLoaded1 = false;
                }
            }
        });
    }

    $scope.gotoBcinfo = function(e) {
        $state.go("bcinfo", { classid: e.classid });
    }
})

.controller("studyListController", function($scope, $state, $ionicHistory, $rootScope, getDataSource, goDetail) {
    // 加载用户数据
    var user = $rootScope.user;

    $scope.dataStudySource = [];
    $scope.dataOnlineSource = [];
    $scope.index = 0;
    $scope.index2 = 0;
    $scope.menuid = 55;

    $scope.loadmeDatas = function(type, pageindex, menuid) {
        getDataSource.getDataSource("getZJNewList", { menuid: menuid, pagecount: pageindex, rowcount: "8", userid: user.info_id }, function(data) {
            var dataImag = "";
            if (data.length == 0) {
                if (type == 0) {
                    $scope.moreDataCanBeLoaded = false;
                } else {
                    $scope.moreDataCanBeLoaded1 = false;
                }
            }
            if (type == 0) {
                for (var i = 0; i < data.length; i++) {
                    dataImag = data[i].title_pic;
                    if (dataImag && dataImag !== null && dataImag !== "") {
                        var index = dataImag.lastIndexOf(".");
                        data[i].title_pic = dataImag.substr(0, index) + "_small" + dataImag.substr(index, dataImag.length);
                    }
                    $scope.dataStudySource.push(data[i]);
                }
            } else {
                for (var i = 0; i < data.length; i++) {
                    dataImag = data[i].title_pic;
                    if (dataImag && dataImag !== null && dataImag !== "") {
                        var index = dataImag.lastIndexOf(".");
                        data[i].title_pic = dataImag.substr(0, index) + "_small" + dataImag.substr(index, dataImag.length);
                    }
                    $scope.dataOnlineSource.push(data[i]);
                }
            }
        });
    };

    $scope.moreDataCanBeLoaded = true;
    $scope.moreDataCanBeLoaded1 = true;
    $scope.loadMore = function(type) {
        if (type == 0) {
            $scope.index = $scope.index + 1;
            $scope.loadmeDatas(type, $scope.index, 55);
        } else {
            $scope.index2 = $scope.index2 + 1;
            $scope.loadmeDatas(type, $scope.index2, 56);
        }

        $scope.$broadcast("scroll.infiniteScrollComplete");
    }

    //$scope.doRefresh = function () {
    //    $scope.moreDataCanBeLoaded = true;
    //    $scope.index = 1;
    //    $scope.dataZpywSource = [];
    //    $scope.loadmeDatas();
    //    $scope.$broadcast("scroll.refreshComplete");
    //};

    $scope.doRefresh = function(type) {
        if (type == 0) {
            $scope.moreDataCanBeLoaded = true;
            $scope.index = 1;
            $scope.dataStudySource = [];
            $scope.loadmeDatas(type, $scope.index, 55);
        } else {
            $scope.moreDataCanBeLoaded1 = true;
            $scope.index2 = 1;
            $scope.dataOnlineSource = [];
            $scope.loadmeDatas(type, $scope.index2, 56);
        }
        $scope.$broadcast("scroll.refreshComplete");
    };

    $scope.Addgood = function(item) {
        var formData = { userid: user.info_id, username: user.username, finfo_id: item.info_id, ismark: 0, isgood: 1, islike: 0, comtype: 2 };
        getDataSource.getDataSource("queryMyComment", formData, function(data) {
            // 已点赞
            if (data.length == 0) {
                getDataSource.getDataSource("Insert_myComment", formData, function(data) {
                    item.isgood = 1;
                    item.goodcount = item.goodcount + 1;
                });
            }
        });
    };
    $scope.Addlike = function(item) {
        var formData = { userid: user.info_id, username: user.username, finfo_id: item.info_id, ismark: 0, isgood: 0, islike: 1, comtype: 3 };
        getDataSource.getDataSource("queryMyComment", formData, function(data) {
            // 已收藏
            if (data.length > 0) {
                getDataSource.getDataSource("cancelDingyue", formData, function(data) {
                    item.islike = 0;
                    item.docucount = item.docucount - 1;
                });
            } else {
                getDataSource.getDataSource("Insert_myComment", formData, function(data) {
                    item.islike = 1;
                    item.docucount = item.docucount + 1;
                });
            }
        });
    };
    $scope.Deletelike = function(item) {
        var formData = { userid: user.info_id, finfo_id: item.info_id, comtype: 3 };
        getDataSource.getDataSource("queryMyComment", formData, function(data) {
            // 已收藏
            if (data.length > 0) {
                getDataSource.getDataSource("cancelDingyue", formData, function(data) {
                    item.islike = 0;
                    item.docucount = item.docucount - 1;
                });
            } else {
                getDataSource.getDataSource("Insert_myComment", formData, function(data) {
                    item.islike = 1;
                    item.docucount = item.docucount + 1;
                });
            }
        });
    };

    $scope.goNewsDetail = function(item) {
        getDataSource.getDataSource(["updatePlayCount", "updateVideoPlayCount"], { info_id: item.info_id }, function(data) {
            item.playcount = item.playcount + 1;
        });
        goDetail.goNewsDetail(item);
    }
})

.controller("handLoginController", function($scope, $state, $ionicHistory, $rootScope, $timeout, showAlert, getDataSource, $ionicPopup) {

    $scope.goback = function() {
        $ionicHistory.goBack();
    }
    var _MM_R = 0,
        _MM_CW = 0,
        _MM_CH = 0,
        _MM_OffsetX = 0,
        _MM_OffsetY = 80;
    $scope.setStep = "1";
    $scope.maksurePsd = "";
    $scope.firstPsd = "";
    $scope.secondPsd = "";
    $scope.buttonTitle = "下一步";
    if (!$rootScope.user.handpsd) {
        $scope.buttonSecTitle = "请设置手势密码";
        $scope.setStep = "2";
    } else {
        $scope.buttonSecTitle = "请输入原手势密码";
    }

    $scope.gotoNext = function() {
        var c = document.getElementById("myCanvas");
        var cxt = c.getContext("2d");
        if ($scope.setStep == "1") {
            if ($scope.maksurePsd == $rootScope.user.handpsd) {
                if ($rootScope.user.ishandpsd == 0) {
                    getDataSource.getDataSource("updateHandpsd", { handpsd: $scope.maksurePsd, ishandpsd: $rootScope.user.ishandpsd, id: $rootScope.user.info_id }, function() {})
                    localStorage.user = JSON.stringify($rootScope.user);
                    $ionicHistory.goBack();
                } else {
                    // 确认弹出框
                    $ionicPopup.confirm({
                        okType: "button-assertive",
                        okText: "是",
                        cancelText: "否",
                        title: "提示",
                        template: "是否重新设置密码？"
                    }).then(function(res) {
                        if (res) {
                            $scope.buttonSecTitle = "请设置手势密码";
                            $scope.setStep = "2";
                        } else {
                            getDataSource.getDataSource("updateHandpsd", { handpsd: $scope.maksurePsd, ishandpsd: $rootScope.user.ishandpsd, id: $rootScope.user.info_id }, function() {})
                            localStorage.user = JSON.stringify($rootScope.user);
                            $ionicHistory.goBack();
                        }
                    });
                }

            }
            $scope.refreshRect(cxt, _MM_CW, _MM_CH, _MM_R);
        } else if ($scope.setStep == "2") {
            if ($scope.firstPsd.length > 0 && $scope.firstPsd.length < 4) {
                showAlert.showToast("至少需要4个链接点！");
                //alert("至少需要4个链接点！");
            } else {
                $scope.buttonTitle = "完成";
                $scope.buttonSecTitle = "请确认手势密码";
                $scope.setStep = "3";
            }
            $scope.refreshRect(cxt, _MM_CW, _MM_CH, _MM_R);
        } else {
            if ($scope.firstPsd == $scope.secondPsd && $scope.secondPsd && $scope.firstPsd) {
                getDataSource.getDataSource("updateHandpsd", { handpsd: $scope.secondPsd, ishandpsd: $rootScope.user.ishandpsd, id: $rootScope.user.info_id }, function() {
                    $rootScope.user.handpsd = $scope.secondPsd;
                    localStorage.user = JSON.stringify($rootScope.user);
                    $ionicHistory.goBack();
                });
            } else {
                //alert("确认密码错误");
                showAlert.showToast("确认密码错误！");
                $scope.refreshRect(cxt, _MM_CW, _MM_CH, _MM_R);
            }
        }
    }

    var PointLocationArr = [];
    $scope.onMyLoad = function() {

        _MM_CW = document.body.clientWidth;
        //_MM_CW = window.innerWidth;
        //alert(_MM_CW + ';;'+ window.innerWidth);
        _MM_CH = document.documentElement.clientHeight - 80;
        //_MM_CH = window.innerHeight;
        /* setTimeout(function(){
             alert(window.innerHeight);
         },500);*/
        //alert(window.innerHeight);

        //_MM_OffsetY = document.getElementById("loginImg").height;
        _MM_OffsetX = _MM_CW * 1 / 10;
        _MM_CH = _MM_CH - _MM_OffsetY;

        var c = document.getElementById("myCanvas");
        c.width = _MM_CW;
        c.height = _MM_CH;

        R1 = (_MM_CH - 2 * _MM_OffsetY) / 12;
        R2 = (_MM_CW - 2 * _MM_OffsetX) / 9;

        if (R1 < R2) {
            _MM_R = R1;
        } else {
            _MM_R = R2;
        }

        document.getElementById("myCanvas").style.marginTop = -_MM_OffsetY + "px";
        //document.getElementById("myCanvas").style.marginBottom = - (_MM_OffsetY/2) + "px";

        var cxt = c.getContext("2d");
        //两个圆之间的外距离 就是说两个圆心的距离去除两个半径
        var X = (_MM_CW - 2 * _MM_OffsetX - _MM_R * 2 * 3) / 2;
        var Y = (_MM_CH - 2 * _MM_OffsetY - _MM_R * 2 * 3) / 4;

        PointLocationArr = $scope.CaculateNinePointLotion(X, Y, _MM_OffsetX, _MM_OffsetY, _MM_R);
        $scope.InitEvent(c, cxt, _MM_CW, _MM_CH, _MM_R); //InitEvent(canvasContainer, cxt, _MM_CW, _MM_CH, _MM_R)
        //_MM_CW=2*offsetX+_MM_R*2*3+2*X
        $scope.Draw(cxt, PointLocationArr, [], null, _MM_CW, _MM_CH, _MM_R);

        //document.getElementById("noButton").innerHTML = '重新绘制';
        //document.getElementById("okButton").innerHTML = '确定';
    };

    $scope.CaculateNinePointLotion = function(diffX, diffY, _MM_OffsetX, _MM_OffsetY, _MM_R) {
        var Re = [];
        for (var row = 1; row < 4; row++) {
            for (var col = 0; col < 3; col++) {
                var Point = {
                    X: (_MM_OffsetX + col * diffX + (col * 2 + 1) * _MM_R),
                    Y: (_MM_OffsetY + row * diffY + (row * 2 + 1) * _MM_R)
                };
                Re.push(Point);
            }
        }
        return Re;
    }
    $scope.Draw = function(cxt, _PointLocationArr, _LinePointArr, touchPoint, _MM_CW, _MM_CH, _MM_R) {
        if (_LinePointArr.length > 0) {
            cxt.beginPath();
            for (var i = 0; i < _LinePointArr.length; i++) {
                var pointIndex = _LinePointArr[i];
                cxt.lineTo(_PointLocationArr[pointIndex].X, _PointLocationArr[pointIndex].Y);
            }
            cxt.lineWidth = 2;
            cxt.strokeStyle = "#627eed";
            cxt.stroke();
            cxt.closePath();
            if (touchPoint != null) {
                var lastPointIndex = _LinePointArr[_LinePointArr.length - 1];
                var lastPoint = _PointLocationArr[lastPointIndex];
                cxt.beginPath();
                cxt.moveTo(lastPoint.X, lastPoint.Y);
                cxt.lineTo(touchPoint.X, touchPoint.Y);
                cxt.stroke();
                cxt.closePath();
            }
        }
        for (var i = 0; i < _PointLocationArr.length; i++) {
            var Point = _PointLocationArr[i];
            cxt.fillStyle = "#627eed";
            cxt.beginPath();
            cxt.arc(Point.X, Point.Y, _MM_R - 2, 0, Math.PI * 2, true);
            cxt.closePath();
            cxt.fill();
            cxt.fillStyle = "#ffffff";
            cxt.beginPath();
            cxt.arc(Point.X, Point.Y, _MM_R - 3, 0, Math.PI * 2, true);
            cxt.closePath();
            cxt.fill();
            if (_LinePointArr.indexOf(i) >= 0) {
                cxt.fillStyle = "#627eed";
                cxt.beginPath();
                cxt.arc(Point.X, Point.Y, _MM_R - 16, 0, Math.PI * 2, true);
                cxt.closePath();
                cxt.fill();
            }

        }
    }
    $scope.IsPointSelect = function(touches, LinePoint, _MM_R) {
        for (var i = 0; i < PointLocationArr.length; i++) {
            var currentPoint = PointLocationArr[i];
            var xdiff = Math.abs(currentPoint.X - touches.pageX);
            var ydiff = Math.abs(currentPoint.Y - touches.pageY);
            var dir = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
            if (dir < _MM_R) {
                if (LinePoint.indexOf(i) < 0) { LinePoint.push(i); }
                break;
            }
        }
    }
    $scope.InitEvent = function(canvasContainer, cxt, _MM_CW, _MM_CH, _MM_R) {
        var LinePoint = [];
        canvasContainer.addEventListener("touchstart", function(e) {
            $scope.IsPointSelect(e.touches[0], LinePoint, _MM_R);
        }, false);
        canvasContainer.addEventListener("touchmove", function(e) {
            e.preventDefault();
            var touches = e.touches[0];
            $scope.IsPointSelect(touches, LinePoint, _MM_R);
            cxt.clearRect(0, 0, _MM_CW, _MM_CH);
            $scope.Draw(cxt, PointLocationArr, LinePoint, { X: touches.pageX, Y: touches.pageY }, _MM_CW, _MM_CH, _MM_R);
        }, false);
        canvasContainer.addEventListener("touchend", function(e) {
            cxt.clearRect(0, 0, _MM_CW, _MM_CH);
            $scope.Draw(cxt, PointLocationArr, LinePoint, null, _MM_CW, _MM_CH, _MM_R);
            if (LinePoint.length > 0 && LinePoint.length < 4) {
                showAlert.showToast("至少需要4个链接点！");
                //alert("至少需要4个链接点！");
                setTimeout(function() {
                    $scope.refreshRect(cxt, _MM_CW, _MM_CH, _MM_R);
                }, 500);
            } else {
                //alert("密码结果是："+LinePoint.join("->"));  
                if ($scope.setStep == "3") {
                    $scope.secondPsd = "";
                    for (var i = 0; i < LinePoint.length; i++) {
                        $scope.secondPsd += LinePoint[i];
                    }
                }
                if ($scope.setStep == "2") {
                    $scope.firstPsd = "";
                    for (var i = 0; i < LinePoint.length; i++) {
                        $scope.firstPsd += LinePoint[i];
                    }
                }
                if ($scope.setStep == "1") {
                    $scope.maksurePsd = "";
                    for (var i = 0; i < LinePoint.length; i++) {
                        $scope.maksurePsd += LinePoint[i];
                    }
                }
            }
            LinePoint = [];
        }, false);
    }
    $scope.refreshRect = function(cxt, _MM_CW, _MM_CH, _MM_R) {
        cxt.clearRect(0, 0, _MM_CW, _MM_CH);
        $scope.Draw(cxt, PointLocationArr, [], {}, _MM_CW, _MM_CH, _MM_R);
    }
    $scope.getQueryString = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }

    $(function() {
        $scope.onMyLoad();
    })
})

.controller("openHandController", function($scope, $state, $ionicHistory, $rootScope, $timeout, showAlert, getDataSource) {

    var _MM_R = 0,
        _MM_CW = 0,
        _MM_CH = 0,
        _MM_OffsetX = 0,
        _MM_OffsetY = 80;
    $rootScope.user = JSON.parse(localStorage.user);
    showAlert.hideLoading();
    var PointLocationArr = [];
    $scope.onMyLoad = function() {

        _MM_CW = window.screen.width;
        //_MM_CW = document.body.clientWidth;
        //_MM_CW = window.innerWidth;
        //alert(_MM_CW + ';;'+ window.innerWidth);
        _MM_CH = window.screen.height - 80;
        //_MM_CH = document.documentElement.clientHeight;
        //_MM_CH = window.innerHeight;
        /* setTimeout(function(){
             alert(window.innerHeight);
         },500);*/
        //alert(window.innerHeight);

        //_MM_OffsetY = document.getElementById("loginImg").height;
        _MM_OffsetX = _MM_CW * 1 / 10;
        _MM_CH = _MM_CH - _MM_OffsetY;

        var c = document.getElementById("myCanvas");
        c.width = _MM_CW;
        c.height = _MM_CH;

        R1 = (_MM_CH - 2 * _MM_OffsetY) / 12;
        R2 = (_MM_CW - 2 * _MM_OffsetX) / 9;

        if (R1 < R2) {
            _MM_R = R1;
        } else {
            _MM_R = R2;
        }

        document.getElementById("myCanvas").style.marginTop = -_MM_OffsetY + "px";
        //document.getElementById("myCanvas").style.marginBottom = - (_MM_OffsetY/2) + "px";

        var cxt = c.getContext("2d");
        //两个圆之间的外距离 就是说两个圆心的距离去除两个半径
        var X = (_MM_CW - 2 * _MM_OffsetX - _MM_R * 2 * 3) / 2;
        var Y = (_MM_CH - 2 * _MM_OffsetY - _MM_R * 2 * 3) / 2;

        PointLocationArr = $scope.CaculateNinePointLotion(X, Y, _MM_OffsetX, _MM_OffsetY, _MM_R);
        $scope.InitEvent(c, cxt, _MM_CW, _MM_CH, _MM_R); //InitEvent(canvasContainer, cxt, _MM_CW, _MM_CH, _MM_R)
        //_MM_CW=2*offsetX+_MM_R*2*3+2*X
        $scope.Draw(cxt, PointLocationArr, [], null, _MM_CW, _MM_CH, _MM_R);

        //document.getElementById("noButton").innerHTML = '重新绘制';
        //document.getElementById("okButton").innerHTML = '确定';
        if (!$rootScope.formweixin) {
            document.addEventListener("deviceready", function() {
                xsfSplashscreen.hide();
            }, false);

        }
        showAlert.hideLoading();
    };

    $scope.CaculateNinePointLotion = function(diffX, diffY, _MM_OffsetX, _MM_OffsetY, _MM_R) {
        var Re = [];
        for (var row = 0; row < 3; row++) {
            for (var col = 0; col < 3; col++) {
                var Point = {
                    X: (_MM_OffsetX + col * diffX + (col * 2 + 1) * _MM_R),
                    Y: (_MM_OffsetY + row * diffY + (row * 2 + 1) * _MM_R)
                };
                Re.push(Point);
            }
        }
        return Re;
    }
    $scope.Draw = function(cxt, _PointLocationArr, _LinePointArr, touchPoint, _MM_CW, _MM_CH, _MM_R) {
        if (_LinePointArr.length > 0) {
            cxt.beginPath();
            for (var i = 0; i < _LinePointArr.length; i++) {
                var pointIndex = _LinePointArr[i];
                cxt.lineTo(_PointLocationArr[pointIndex].X, _PointLocationArr[pointIndex].Y);
            }
            cxt.lineWidth = 1;
            cxt.strokeStyle = "#627eed";
            cxt.stroke();
            cxt.closePath();
            if (touchPoint != null) {
                var lastPointIndex = _LinePointArr[_LinePointArr.length - 1];
                var lastPoint = _PointLocationArr[lastPointIndex];
                cxt.beginPath();
                cxt.moveTo(lastPoint.X, lastPoint.Y);
                cxt.lineTo(touchPoint.X, touchPoint.Y);
                cxt.stroke();
                cxt.closePath();
            }
        }
        for (var i = 0; i < _PointLocationArr.length; i++) {
            var Point = _PointLocationArr[i];
            cxt.fillStyle = "#627eed";
            cxt.beginPath();
            cxt.arc(Point.X, Point.Y, _MM_R - 2, 0, Math.PI * 2, true);
            cxt.closePath();
            cxt.fill();
            cxt.fillStyle = "#ffffff";
            cxt.beginPath();
            cxt.arc(Point.X, Point.Y, _MM_R - 3, 0, Math.PI * 2, true);
            cxt.closePath();
            cxt.fill();
            if (_LinePointArr.indexOf(i) >= 0) {
                cxt.fillStyle = "#627eed";
                cxt.beginPath();
                cxt.arc(Point.X, Point.Y, _MM_R - 16, 0, Math.PI * 2, true);
                cxt.closePath();
                cxt.fill();
            }

        }
    }
    $scope.IsPointSelect = function(touches, LinePoint, _MM_R) {
        for (var i = 0; i < PointLocationArr.length; i++) {
            var currentPoint = PointLocationArr[i];
            var xdiff = Math.abs(currentPoint.X - touches.pageX);
            var ydiff = Math.abs(currentPoint.Y - touches.pageY);
            var dir = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
            if (dir < _MM_R) {
                if (LinePoint.indexOf(i) < 0) { LinePoint.push(i); }
                break;
            }
        }
    }
    $scope.InitEvent = function(canvasContainer, cxt, _MM_CW, _MM_CH, _MM_R) {
        var LinePoint = [];
        canvasContainer.addEventListener("touchstart", function(e) {
            $scope.IsPointSelect(e.touches[0], LinePoint, _MM_R);
        }, false);
        canvasContainer.addEventListener("touchmove", function(e) {
            e.preventDefault();
            var touches = e.touches[0];
            $scope.IsPointSelect(touches, LinePoint, _MM_R);
            cxt.clearRect(0, 0, _MM_CW, _MM_CH);
            $scope.Draw(cxt, PointLocationArr, LinePoint, { X: touches.pageX, Y: touches.pageY }, _MM_CW, _MM_CH, _MM_R);
        }, false);
        canvasContainer.addEventListener("touchend", function(e) {
            cxt.clearRect(0, 0, _MM_CW, _MM_CH);
            $scope.Draw(cxt, PointLocationArr, LinePoint, null, _MM_CW, _MM_CH, _MM_R);

            //alert("密码结果是："+LinePoint.join("->"));  
            $scope.secondPsd = "";
            for (var i = 0; i < LinePoint.length; i++) {
                $scope.secondPsd += LinePoint[i];
            }
            if ($scope.secondPsd == $rootScope.user.handpsd) {
                $state.go("user.mainNewUser");
            } else {
                alert("密码错误！");
                setTimeout(function() {
                    $scope.refreshRect(cxt, _MM_CW, _MM_CH, _MM_R);
                }, 500);
            }
            LinePoint = [];
        }, false);
    }
    $scope.refreshRect = function(cxt, _MM_CW, _MM_CH, _MM_R) {
        cxt.clearRect(0, 0, _MM_CW, _MM_CH);
        $scope.Draw(cxt, PointLocationArr, [], {}, _MM_CW, _MM_CH, _MM_R);
    }
    $scope.getQueryString = function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }

    $(function() {
        $scope.onMyLoad();
    })
})

.controller("dywjController", function($scope, $state, $ionicHistory, $rootScope, $timeout, showAlert, getDataSource) {
        $scope.dywj = [];
        $scope.yywj = [];
        $scope.index = 0;
        $scope.index2 = 0;

        var tempDir = "";
        if ($rootScope.formweixin) {
            xsf.getDeviceInfo(function(info) {
                tempDir = info.TEMP_DIR;
            });
        }

        $scope.doRefresh = function() {
            $scope.dywj = [];
            $scope.yywj = [];
            $scope.index = 0;
            $scope.index2 = 0;
            $scope.moreDataCanBeLoaded = true;
            $scope.moreDataCanBeLoaded1 = true;
            $scope.loadMoreDywj();
            $scope.$broadcast("scroll.refreshComplete");
        };

        $scope.moreDataCanBeLoaded = true;
        $scope.moreDataCanBeLoaded1 = true;
        $scope.loadMoreDywj = function() {
            $scope.index = $scope.index + 1;

            getDataSource.getDataSource("getDywjList", { pagecount: $scope.index, READED: 0 }, function(data) {
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        $scope.dywj.push(data[i]);
                    }
                } else {
                    $scope.moreDataCanBeLoaded = false;
                }
            });
        }

        $scope.loadMoreYywj = function() {
            $scope.index2 = $scope.index2 + 1;

            getDataSource.getDataSource("getDywjList", { userid: $rootScope.user.info_id, pagecount: $scope.index2, READED: 1 }, function(data) {
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        $scope.yywj.push(data[i]);
                    }
                } else {
                    $scope.moreDataCanBeLoaded1 = false;
                }
            });
        }

        $scope.gotoLoadFile = function(e, status) {
            if (!$rootScope.formweixin) {
                showAlert.showLoading(10000, "下载中...");
            }
            if (status == 0) {
                getDataSource.getDataSource("updateReaded", { userid: $rootScope.user.info_id, ID: e.id }, function(data) {});
            }
            getDataSource.getDataSource("getFilePath", { id: e.id }, function(data) {
                if (data.length > 0) {
                    var filePath = tempDir;
                    var url = $rootScope.AppConfig.getFilepath + Base64.encode(data[0].filepath) + "/1";
                    var filename = data[0].nrbt;
                    filePath += filename;
                    if ($rootScope.formweixin) {
                        $state.go("other", { url: encodeURI(url) });
                    } else {
                        var downlaoder = xsfHttp.download(url, filePath,
                            function(result) {
                                showAlert.hideLoading();
                                xsf.open("file://" + tempDir + filename);
                            },
                            function(error) {
                                showAlert.hideLoading();
                                showAlert.showToast("文件无法下载");
                            }
                        );
                        downlaoder.onprogress = function(progressEvent) {
                            if (progressEvent.lengthComputable) {}
                        }
                    }
                } else {
                    showAlert.hideLoading();
                    showAlert.showToast("文件无法下载");
                }
            });
        }
})

.controller("gzzdController", function($scope, $state, $ionicHistory, $rootScope, $timeout, showAlert, getDataSource) {
        $scope.zcfg = [];
        $scope.bslc = [];
        $scope.ztgs = [];
        $scope.index = 0;
        $scope.index2 = 0;
        $scope.index3 = 0;
        $scope.syfw = undefined;
        $scope.doclevel = undefined;

        getDataSource.getDataSource("getSelectList", { rCodeClass: "政策法规适用范围" }, function(data) {
            $scope.zcfgList = data;
        });
        getDataSource.getDataSource("getSelectList", { rCodeClass: "政策法规级别" }, function(data) {
            $scope.zcfgjbList = data;
        });

        $scope.search = function() {
            if ($("#data_select").val() == "全部") {
                $scope.syfw = undefined;
            } else {
                $scope.syfw = $("#data_select").val();
            }
            if ($("#data_fgjb").val() == "全部") {
                $scope.doclevel = undefined;
            } else {
                $scope.doclevel = $("#data_fgjb").val();
            }
            $scope.zcfg = [];
            $scope.index = 0;
            $scope.moreDataCanBeLoaded = true;
            $scope.loadMoreZcfg();
        }

        $scope.moreDataCanBeLoaded = true;
        $scope.moreDataCanBeLoaded1 = true;
        $scope.moreDataCanBeLoaded2 = true;
        $scope.loadMoreZcfg = function() {
            $scope.index = $scope.index + 1;

            getDataSource.getDataSource("getGzzdList", { pagecount: $scope.index, fileType: "ZCFG", syfw: $scope.syfw, doclevel: $scope.doclevel }, function(data) {
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        $scope.zcfg.push(data[i]);
                    }
                } else {
                    $scope.moreDataCanBeLoaded = false;
                }
            });
        }

        $scope.loadMoreBslc = function() {
            $scope.index2 = $scope.index2 + 1;

            getDataSource.getDataSource("getGzzdList", { pagecount: $scope.index2, fileType: "BSLC", syfw: undefined, doclevel: undefined }, function(data) {
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        $scope.bslc.push(data[i]);
                    }
                } else {
                    $scope.moreDataCanBeLoaded1 = false;
                }
            });
        }

        $scope.loadMoreZtgs = function() {
            $scope.index3 = $scope.index3 + 1;

            getDataSource.getDataSource("getGzzdList", { pagecount: $scope.index3, fileType: "ZTGS", syfw: undefined, doclevel: undefined }, function(data) {
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        $scope.ztgs.push(data[i]);
                    }
                } else {
                    $scope.moreDataCanBeLoaded2 = false;
                }
            });
        }

        $scope.gotoLoadHtml = function(e) {
            $state.go("fj", { id: e.info_id });
        }
})

.controller("fjController", function($scope, $state, $ionicHistory, $rootScope, $stateParams, $timeout, showAlert, getDataSource) {
        var tempDir = "";
        if (!$rootScope.formweixin) {
            xsf.getDeviceInfo(function(info) {
                tempDir = info.TEMP_DIR;
            });
        }

        if ($stateParams.id) {
            getDataSource.getDataSource("getFileList", { id: $stateParams.id }, function(data) {
                $scope.fileList = data;
            });
        }

        $scope.loadDataType = function(fileName) {
            var fileType = (fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length)).toLowerCase();

            if (fileType == "xlsx" || fileType == "xls") {
                return "../img/Excel.png";
            } else if (fileType == "docx" || fileType == "doc") {
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

        $scope.gotoLoadFile = function(e) {
            if (!$rootScope.formweixin) {
                showAlert.showLoading(10000, "下载中...");
            }
            var filePath = tempDir;
            var url = $rootScope.AppConfig.getFilepath + Base64.encode(e.filepath) + "/1";
            var filename = e.nrbt;
            filePath += filename;
            if ($rootScope.formweixin) {
                $state.go("other", { url: encodeURI(url) });
            } else {
                var downlaoder = xsfHttp.download(url, filePath,
                    function(result) {
                        showAlert.hideLoading();
                        xsf.open("file://" + tempDir + filename);
                    },
                    function(error) {
                        showAlert.hideLoading();
                        showAlert.showToast("文件无法下载");
                    }
                );
                downlaoder.onprogress = function(progressEvent) {
                    if (progressEvent.lengthComputable) {}
                }
            }
        }
})

.controller("yjController", function($timeout, $http, $scope, Restangular, $state, $rootScope, $stateParams) {
        var url = decodeURI($stateParams.url);
        $scope.url = url;
        $scope.topTitle = $stateParams.title;
        $(function() {
            $timeout(function() {
                //alert(document.body.scrollHeight);
                var height = document.body.scrollHeight - 43;
                $("#myiframe").css("height", height);
                $("#myiframe").css("width", "100%");
                //alert(height);
                $("#myiframe").attr("src", $scope.url);
            }, 1500);
        })
})

.controller("kqglController", function($timeout, $http, $scope, Restangular, $ionicHistory, $state, $rootScope, $stateParams, getDataSource) {

        $scope.kclist = [];
        $scope.InOutlist = [];
        $scope.qDlist = [];
        $scope.index = 0;
        $scope.index1 = 0;
        $scope.index2 = 0;
        $scope.moreDataCanBeLoaded = true;
        $scope.moreDataCanBeLoaded1 = true;
        $scope.moreDataCanBeLoaded2 = true;

        $scope.goback = function() {
            $ionicHistory.goBack();
        }

        $scope.loadMoreKcList = function() {
            $scope.index = $scope.index + 1;

            getDataSource.getDataSource("getKCListMain", { pagecount: $scope.index, classid: $rootScope.user.classid }, function(data) {
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        $scope.kclist.push(data[i]);
                    }
                } else {
                    $scope.moreDataCanBeLoaded = false;
                }
            });
        }

        $scope.loadMoreInOutList = function() {
            $scope.index1 = $scope.index1 + 1;

            getDataSource.getDataSource("getOutOrIn", { pagecount: $scope.index1, classid: $rootScope.user.classid }, function(data) {
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        $scope.InOutlist.push(data[i]);
                    }
                } else {
                    $scope.moreDataCanBeLoaded1 = false;
                }
            });
        }

        $scope.loadMoreQdList = function() {
            $scope.index2 = $scope.index2 + 1;

            getDataSource.getDataSource("getKCListById", { pagecount: $scope.index2, classid: $rootScope.user.classid }, function(data) {
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        $scope.qDlist.push(data[i]);
                    }
                } else {
                    $scope.moreDataCanBeLoaded2 = false;
                }
            });
        }

        $scope.gotoKq = function(item) {
            $state.go("kqInfo", { kcid: item.lessonid, bt: item.bt });
        }

        $scope.showAddKq = function(status) {
            if (status == 1) {
                $scope.showAdd = true;
            } else {
                $scope.showAdd = false;
            }
        }
        $scope.gotoAddKq = function() {
            $state.go("kqaddinfo");
        }
        $scope.viewList = function(e, que) {
            $state.go("kqlist", { id: e.lessonid, type: que });
        }
})

.controller("crycController", function($timeout, $http, $scope, Restangular, $ionicHistory, $state, $rootScope, $stateParams, getDataSource) {

        $(function() {
            // Mobiscroll Date & Time initialization
            $('#datetimeDate-demo').mobiscroll().date({
                theme: 'android', // Specify theme like: theme: 'ios' or omit setting to use default
                lang: 'zh', // Specify language like: lang: 'pl' or omit setting to use default
                display: 'modal', // Specify display mode like: display: 'bottom' or omit setting to use default
                mode: 'scroller', // More info about mode: http://docs.mobiscroll.com/2-17-1/datetime#!opt-mode
                dateFormat: 'yy-mm-dd'
            });
        });

        $scope.InOutlist = [];
        $scope.index1 = 0;
        $scope.moreDataCanBeLoaded1 = true;

        $scope.goback = function() {
            $ionicHistory.goBack();
        }

        $scope.loadMoreInOutList = function() {
            var time = "1";
            if ($("#datetimeDate-demo").val() != "") {
                time = $("#datetimeDate-demo").val();
            }
            var loginData = Restangular.one('Onecard/action/outInList/' + $rootScope.user.classid + '/' + time);
            loginData.get().then(function(data) {
                $scope.InOutlist = eval("(" + data + ")");
            });
        }
        $scope.loadMoreInOutList();
        $scope.gotoKq = function(item) {
            $state.go("kqInfo", { kcid: item.lessonid, bt: item.bt });
        }
})

.controller("yddmController", function($timeout, $http, $scope, Restangular, $ionicHistory, $state, $rootScope, $stateParams, getDataSource) {

        $scope.qDlist = [];
        $scope.index2 = 0;
        $scope.moreDataCanBeLoaded2 = true;

        $scope.goback = function() {
            $ionicHistory.goBack();
        }

        $scope.loadMoreQdList = function() {
            $scope.index2 = $scope.index2 + 1;

            getDataSource.getDataSource("getHistoryKQListById", { pagecount: $scope.index2, classid: $rootScope.user.classid }, function(data) {
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        $scope.qDlist.push(data[i]);
                    }
                } else {
                    $scope.moreDataCanBeLoaded2 = false;
                }
            });
        }

        $scope.viewStudent = function(item, que) {
            $state.go("kqlist", { id: item.info_id, type: que });
        }
})

.controller("yktkqController", function($timeout, $http, $scope, Restangular, $ionicHistory, $state, $rootScope, $stateParams, getDataSource) {

        $scope.kclist = [];
        $scope.index = 0;
        $scope.moreDataCanBeLoaded = true;

        $scope.goback = function() {
            $ionicHistory.goBack();
        }

        $scope.loadMoreKcList = function() {
            $scope.index = $scope.index + 1;

            getDataSource.getDataSource("getKCListMain", { pagecount: $scope.index, classid: $rootScope.user.classid }, function(data) {
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        $scope.kclist.push(data[i]);
                    }
                } else {
                    $scope.moreDataCanBeLoaded = false;
                }
            });
        }

        $scope.loadMoreInOutList = function() {
            $scope.index1 = $scope.index1 + 1;

            getDataSource.getDataSource("getOutOrIn", { pagecount: $scope.index1, classid: $rootScope.user.classid }, function(data) {
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        $scope.InOutlist.push(data[i]);
                    }
                } else {
                    $scope.moreDataCanBeLoaded1 = false;
                }
            });
        }

        $scope.loadMoreQdList = function() {
            $scope.index2 = $scope.index2 + 1;

            getDataSource.getDataSource("getKCListById", { pagecount: $scope.index2, classid: $rootScope.user.classid }, function(data) {
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        $scope.qDlist.push(data[i]);
                    }
                } else {
                    $scope.moreDataCanBeLoaded2 = false;
                }
            });
        }

        $scope.gotoKq = function(item) {
            $state.go("kqInfo", { kcid: item.lessonid, bt: item.bt });
        }
})

.controller("kqInfoController", function($timeout, $http, $scope, Restangular, $state, $rootScope, $stateParams, getDataSource) {
        var pieData = "";
        $scope.xycount = 0;
        $scope.chidao = 0;
        $scope.qingjia = 0;
        $scope.weiqian = 0;
        $scope.daoke = 0;
        $scope.wu = 10;
        $scope.kctitle = $stateParams.bt;
        $scope.loadData = function() {
            getDataSource.getDataSource("getCQInfo", { kcid: $stateParams.kcid, classid: $rootScope.user.classid }, function(data) {
                if (data.length > 0) {
                    $scope.xycount = data[0].xycount;
                    $scope.wu = 0;
                }
                for (var i = 0; i < data.length; i++) {
                    if (data[i].state == "迟到" || data[i].state == "早退") {
                        $scope.chidao = data[i].statecount;
                    }
                    if (data[i].state == "请假") {
                        $scope.qingjia = data[i].statecount;
                    }
                    if (data[i].state == "未签") {
                        $scope.weiqian = data[i].statecount;
                    }
                }
                $scope.daoke = $scope.xycount - $scope.qingjia - $scope.weiqian;
            });
            setTimeout(function() {
                pieData = [{
                        value: $scope.daoke,
                        color: "#02B1EF",
                        highlight: "#5AD3D1",
                        label: "实到"
                    },
                    //{
                    //    value: $scope.chidao,
                    //    color: "#ED7C38",
                    //    highlight: "#FFC870",
                    //    label: "迟到"
                    //},
                    //{
                    //    value: $scope.qingjia,
                    //    color: "#A5A5A5",
                    //    highlight: "#FFC870",
                    //    label: "请假"
                    //},
                    {
                        value: $scope.weiqian,
                        color: "#E9B718",
                        highlight: "#FFC870",
                        label: "未到"
                    }, {
                        value: $scope.wu,
                        color: "#98E165",
                        highlight: "#FFC870",
                        label: "无签到信息"
                    }
                ];
                window.myPie = "";
                var ctx = document.getElementById("chart-area").getContext("2d");
                window.myPie = new Chart(ctx).Pie(pieData);
            }, 500);
        }
        $scope.loadData();
        $scope.gotoView = function() {
            $state.go("qdlist", { id: $stateParams.kcid });
        }
})

.controller("kqaddinfoController", function($scope, $state, $interval, $ionicHistory, $dateService, $stateParams, $rootScope, getDataSource, showAlert, $ionicPopup) {
        $scope.showddl = true;
        $scope.showMess = true;
        $scope.showKcArea = true;
        $scope.showQdArea = true;
        $scope.formData = { dm: 'kc' };
        $scope.addfqqd = { info_id: '', classid: $rootScope.user.classid, lessonid: "", lessonname: "", signbegin: "", signend: "", iskq: 0, fqr: $rootScope.user.info_id, fqrname: $rootScope.user.username };
        getDataSource.getDataSource("getNowQd", { lessonid: $stateParams.kcid, classid: $rootScope.user.classid }, function(data) {
            if (data.length > 0) {
                $scope.showQdArea = false;
                $scope.kqdata = data;
                $scope.addfqqd.info_id = data[0].info_id;
            }
        });
        getDataSource.getDataSource("getTodayKCListById", { pagecount: undefined, classid: $rootScope.user.classid }, function(data) {
            if (data.length > 0) {
                $scope.kclist = data;
                $scope.showMess = false;
            } else {
                $scope.showddl = false;
            }
        });

        function flashText() {
            getDataSource.getDataSource("getNowQd", { lessonid: $stateParams.kcid, classid: $rootScope.user.classid }, function(data) {
                if (data.length > 0) {
                    $scope.showQdArea = false;
                    $scope.kqdata = data;
                    $scope.addfqqd.info_id = data[0].info_id;
                    if (data[0].xycount - data[0].yqcount == 0) {
                        $ionicPopup.confirm({
                            okType: "button-assertive",
                            okText: "是",
                            cancelText: "否",
                            title: "确认",
                            template: "<div style='text-align:center;'>学员已到齐，结束点名?</b>"
                        }).then(function(res) {
                            if (res) {
                                $scope.addfqqd.iskq = 1;
                                getDataSource.getDataSource("updateKqinfo", $scope.addfqqd, function(data) {
                                    $scope.showQdArea = true;
                                    //$state.go("kqlist", { id: $scope.addfqqd.lessonid });
                                });
                            }
                        });
                    }
                }
            });
        }
        // 5秒刷新数据
        $interval(flashText, 50000);

        $scope.reflashData = function() {
            flashText();
        }

        $scope.changeType = function() {
            if ($scope.formData.dm == "sj") {
                $scope.showKcArea = false;
            } else {
                $scope.showKcArea = true;
            }
        }

        $scope.AddKq = function() {
            $scope.addfqqd.iskq = 0;
            $scope.tabTxt = "";

            if ($scope.formData.dm == "sj") {
                getDataSource.getDataSource("getTodayQdCount", { classid: $rootScope.user.classid }, function(data) {
                    if (data[0].todayqd < 10) {
                        $scope.tabTxt = "临时点名 0" + (parseInt(data[0].todayqd) + 1) + '(' + $dateService.format(new Date(), "mm-dd") + ')';
                    } else {
                        $scope.tabTxt = "临时点名 " + data[0].todayqd + '(' + $dateService.format(new Date(), "mm-dd") + ')';
                    }
                    $scope.addfqqd.lessonname = $scope.tabTxt;
                    $scope.addfqqd.lessonid = "";
                    // 确认弹出框
                    $ionicPopup.confirm({
                        okType: "button-assertive",
                        okText: "是",
                        cancelText: "否",
                        title: "确认",
                        template: "<div style='text-align:center;'>" + $scope.tabTxt + "?</b>"
                    }).then(function(res) {
                        if (res) {
                            getDataSource.getDataSource("insertKqinfo", $scope.addfqqd, function(data) {
                                $scope.showQdArea = false;
                                getDataSource.getDataSource("getNowQd", { classid: $rootScope.user.classid }, function(data) {
                                    if (data.length > 0) {
                                        $scope.kqdata = data;
                                        $scope.addfqqd.info_id = data[0].info_id;
                                    }
                                });
                            });
                        }
                    });
                });
            } else {
                if ($("#data_select").val() == null) {
                    $scope.addfqqd.lessonid = $stateParams.kcid;
                } else {
                    $scope.addfqqd.lessonid = $("#data_select").val();
                }
                if ($("#data_select").find("option:selected").text() == "") {
                    showAlert.showToast("今日无课程，无法发起点名!");
                    return;
                } else {
                    $scope.tabTxt = $("#data_select").find("option:selected").text() + "<br/>";
                    $scope.addfqqd.lessonname = $scope.tabTxt;
                }
                // 确认弹出框
                $ionicPopup.confirm({
                    okType: "button-assertive",
                    okText: "是",
                    cancelText: "否",
                    title: "确认",
                    template: "<div style='text-align:center;'>" + $scope.tabTxt + "?</b>"
                }).then(function(res) {
                    if (res) {
                        getDataSource.getDataSource("insertKqinfo", $scope.addfqqd, function(data) {
                            $scope.showQdArea = false;
                            getDataSource.getDataSource("getNowQd", { classid: $rootScope.user.classid }, function(data) {
                                if (data.length > 0) {
                                    $scope.kqdata = data;
                                    $scope.addfqqd.info_id = data[0].info_id;
                                }
                            });
                        });
                    }
                });
            }
        };

        $scope.closeDm = function() {
            $scope.addfqqd.iskq = 1;
            // 确认弹出框
            $ionicPopup.confirm({
                okType: "button-assertive",
                okText: "是",
                cancelText: "否",
                title: "确认",
                template: "<div style='text-align:center;'>确认结束点名?</b>"
            }).then(function(res) {
                if (res) {
                    getDataSource.getDataSource("updateKqinfo", $scope.addfqqd, function(data) {
                        $scope.showQdArea = true;
                        //$state.go("kqlist", { id: $scope.addfqqd.lessonid });
                    });
                }
            });
        };
        $scope.viewStudent = function(que) {
            $state.go("kqlist", { id: $scope.addfqqd.info_id, type: que });
        }
        $scope.historyDm = function() {
            $state.go("yddm");
        }
})

.controller("kqStudentController", function($scope, $state, $ionicHistory, $dateService, showAlert, $rootScope, getDataSource, $ionicPopup) {

        $scope.qdlist = [];
        $scope.nowQd = [];
        $scope.index = 0;

        $scope.doRefresh = function() {
            $scope.qdlist = [];
            $scope.index = 0;
            $scope.moreDataCanBeLoaded = true;
            $scope.loadMoreQdList();
            $scope.$broadcast("scroll.refreshComplete");
        };
        $scope.loadData = function() {
            getDataSource.getDataSource("getNowQdStudent", { stuid: $rootScope.user.info_id, classid: $rootScope.user.classid }, function(data) {
                $scope.nowQd = data;
            });
        }
        $scope.loadData();
        $scope.moreDataCanBeLoaded = true;
        $scope.loadMoreQdList = function() {
            $scope.index = $scope.index + 1;

            getDataSource.getDataSource("getQdList", { pagecount: $scope.index, stuid: $rootScope.user.info_id, classid: $rootScope.user.classid }, function(data) {
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        $scope.qdlist.push(data[i]);
                    }
                } else {
                    $scope.moreDataCanBeLoaded = false;
                }
            });
            $scope.$broadcast("scroll.infiniteScrollComplete");
        }

        $scope.qiandao = function(item) {
            $ionicPopup.confirm({
                okType: "button-assertive",
                okText: "是",
                cancelText: "否",
                title: "确认",
                template: "<div style='text-align:center;'>确认签到?</b>"
            }).then(function(res) {
                if (res) {
                    getDataSource.getDataSource("insertQdData", { lessonid: item.lessonid, studentid: $rootScope.user.info_id, classid: $rootScope.user.classid, info_id: item.info_id }, function(data) {
                        showAlert.showToast("签到成功!");
                        $scope.loadData();
                        $scope.doRefresh();
                    });
                }
            });
        }
})

.controller("kqlistController", function($scope, $state, $ionicHistory, $stateParams, $ionicModal, $dateService, $rootScope, getDataSource, $ionicPopup) {
        $scope.goBack = function() {
            $ionicHistory.goBack();
        }
        var queryList = "getweiQiandaoList";
        $scope.showTitle = "未到";
        $scope.showW = true;
        $scope.loadData = function() {
            if ($stateParams.type == 1) {
                queryList = "getweiQiandaoList";
            } else {
                queryList = "getQiandaoList";
                $scope.showW = false;
                $scope.showTitle = "已到";
            }
            getDataSource.getDataSource(queryList, { id: $stateParams.id, bcid: $rootScope.user.classid }, function(data) {
                $scope.dataStu = data;
            });
        }

        $scope.cellPhone = function(item, index) {
            item.phonestatus = 1;

            switch (index) {
                case 0:
                    location.href = "tel:" + item.sjhm;
                    break;
                case 1:
                    location.href = "sms:" + item.sjhm;
                    break;
            }
        }

        $scope.loadData();

        /**************通讯层调用Start****************/
        $scope.addressUser = {}; //点击弹出联系人的信息

        //下载oa用户管理里面的人员照片
        $scope.downLoadUrl = "../backHTML/userphoto.aspx?userid=";
        //$scope.ShowNoRecord = false;

        $ionicModal.fromTemplateUrl("../templates/addresslistInfo.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function(e) {
            // console.log(e.info_id + "====" + e.classid);
            //用户默认图片
            $scope.userdefault = "../staticresource/userphoto/userdefault.svg";
            if (e.id != $rootScope.user.info_id) {
                getDataSource.getDataSource("getAddressUser", { classid: $rootScope.user.classid, userid: e.id }, function(data) {

                    if (data[0].utype == "1") {
                        if (data[0].userphoto != null) {
                            $scope.userdefault = "../staticresource/userphoto/" + data[0].userphoto;
                        } else if (data[0].zppath != null) {
                            $scope.userdefault = $scope.downLoadUrl + e.id;
                        }
                    } else if (data[0].userphoto != null) {
                        $scope.userdefault = "../staticresource/userphoto/" + data[0].userphoto;
                    }
                    $scope.addressUser = data[0];
                })
                $scope.modal.show();
            }
        };

        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        //Cleanup the modal when we are done with it!
        $scope.$on("$destroy", function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on("modal.hidden", function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on("modal.removed", function() {
            // Execute action
        });
        $scope.goHref = function(index) {
                switch (index) {
                    case 0:
                        location.href = "tel:" + $scope.addressUser.phone;
                        break;
                    case 1:
                        location.href = "tel:0212828" + $scope.addressUser.fj;
                        break;
                    case 2:
                        location.href = "tel:0212828" + $scope.addressUser.fjdh;
                        break;
                    case 3:
                        location.href = "sms:" + $scope.addressUser.phone;
                        break;
                    case 4:
                        userHelp.sigalChat($scope.addressUser.id, $scope.addressUser.uname);
                        break;
                }
            }
            /**************通讯层调用End****************/
})

.controller("qdlistController", function($scope, $state, $ionicHistory, $stateParams, $ionicModal, $dateService, $rootScope, getDataSource, $ionicPopup) {
        $scope.goBack = function() {
            $ionicHistory.goBack();
        }
        $scope.loadData = function() {
            getDataSource.getDataSource("getQdInfo", { kcid: $stateParams.id, classid: $rootScope.user.classid }, function(data) {
                $scope.dataStu = data;
            });
            getDataSource.getDataSource("getWQdInfo", { kcid: $stateParams.id, classid: $rootScope.user.classid }, function(data) {
                $scope.dataWStu = data;
            });
        }

        $scope.loadData();

        /**************通讯层调用Start****************/
        $scope.addressUser = {}; //点击弹出联系人的信息

        //下载oa用户管理里面的人员照片
        $scope.downLoadUrl = "../backHTML/userphoto.aspx?userid=";
        //$scope.ShowNoRecord = false;

        $ionicModal.fromTemplateUrl("../templates/addresslistInfo.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.openModal = function(e) {
            // console.log(e.info_id + "====" + e.classid);
            //用户默认图片
            $scope.userdefault = "../staticresource/userphoto/userdefault.svg";
            if (e.info_id != $rootScope.user.info_id) {
                getDataSource.getDataSource("getAddressUser", { classid: $rootScope.user.classid, userid: e.info_id }, function(data) {

                    if (data[0].utype == "1") {
                        if (data[0].userphoto != null) {
                            $scope.userdefault = "../staticresource/userphoto/" + data[0].userphoto;
                        } else if (data[0].zppath != null) {
                            $scope.userdefault = $scope.downLoadUrl + e.info_id;
                        }
                    } else if (data[0].userphoto != null) {
                        $scope.userdefault = "../staticresource/userphoto/" + data[0].userphoto;
                    }
                    $scope.addressUser = data[0];
                })
                $scope.modal.show();
            }
        };

        $scope.closeModal = function() {
            $scope.modal.hide();
        };

        //Cleanup the modal when we are done with it!
        $scope.$on("$destroy", function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on("modal.hidden", function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on("modal.removed", function() {
            // Execute action
        });
        $scope.goHref = function(index) {
                switch (index) {
                    case 0:
                        location.href = "tel:" + $scope.addressUser.phone;
                        break;
                    case 1:
                        location.href = "tel:0212828" + $scope.addressUser.fj;
                        break;
                    case 2:
                        location.href = "tel:0212828" + $scope.addressUser.fjdh;
                        break;
                    case 3:
                        location.href = "sms:" + $scope.addressUser.phone;
                        break;
                    case 4:
                        userHelp.sigalChat($scope.addressUser.id, $scope.addressUser.uname);
                        break;
                }
            }
            /**************通讯层调用End****************/
})

.controller("oaAutoLoginController", function($scope, $state, $sms, $rootScope, $stateParams, showAlert, $interval, getDataSource, userHelp) {

        $scope.doLog = function() {
            userHelp.setSession(function() {
                console.log("userSessionSuccess");
            });
            getDataSource.getDataSource("doLog", {}, function() {})
        }

        //学员是否已登陆，如果学员登陆失败则以老师身份登陆，此变量被用来监听
        $scope.hasStudentLogin = true;
        //老师是否已经登陆，如果老师登陆失败则以随班领导来登陆，此变量被用来监听
        $scope.hasTeacherLogin = true;
        $scope.teacherLogin = function() {
            getDataSource.getDataSource("hasTeacher", { phone: $stateParams.phone }, function(data) {
                if (data[0].hasusers == 0) {
                    showAlert.showToast("不存在该用户");
                    return;
                } else {
                    getDataSource.getDataSource("userInfoLogin", { phone: $stateParams.phone }, function(data) {
                        $rootScope.user = data[0];
                        getDataSource.getDataSource("getTeacherClass", { userid: $rootScope.user.info_id }, function(classdata) {
                            if (classdata.length == 0) {
                                $scope.hasTeacherLogin = false;
                            } else {
                                $rootScope.user.classid = classdata[0].classid;
                                $rootScope.user.classname = classdata[0].bt;
                                $rootScope.user.isFirstLogin = false;
                                $rootScope.user.kssj = classdata[0].kssj;
                                $rootScope.user.jssj = classdata[0].jssj;
                                $rootScope.user.questionnum = classdata[0].questionnum;
                                $rootScope.user.answernum = classdata[0].answernum;
                                $rootScope.user.samequestionnum = classdata[0].samequestionnum;
                                $rootScope.user.bcpsd = classdata[0].bcpsd; // 新增班级信息密码 add by litong 
                                localStorage.user = JSON.stringify($rootScope.user);
                            }
                        })
                        $rootScope.user.classid = "";
                        $rootScope.user.classname = "";
                        $rootScope.user.isFirstLogin = false;
                        $rootScope.user.kssj = "";
                        $rootScope.user.jssj = "";
                        $rootScope.user.questionnum = "";
                        $rootScope.user.answernum = "";
                        $rootScope.user.samequestionnum = "";
                        $rootScope.user.bcpsd = ""; // 新增班级信息密码 add by litong 
                        $rootScope.user.formJS = true; // 判断入口 add by litong 
                        localStorage.user = JSON.stringify($rootScope.user);

                        $rootScope.user.type = "teacher";
                        $scope.doLog();
                        $state.go("user.mainuser");
                    })
                }
            })
        }
        $scope.teacherLogin();
})

.controller("todolistController", function($scope, $state, $sms, $rootScope, $stateParams, $ionicSlideBoxDelegate, showAlert, $interval, getDataSource, userHelp, $ionicLoading, DataSource, $debounce,openFormFile) {
        //待办
        var start = 0; //列表数据开始位置
        var limit = pageSize; //列表数据偏移位
        var userId = localStorage.userid; 
        var action = "getInbox=1";
        $scope.userId = userId;

        $scope.moreDataCanBeLoaded = true;
        $scope.items = [];
        $scope.model = {};
        $scope.model.query = "";

        $scope.doRefresh = function() {
            console.log("[待办-doRefresh()] ");

            start = 0;
            $ionicLoading.show({
                template: '加载中...'
            });

            var paramObj = {
                start: start,
                limit: limit,
                userId: userId,
                key: $scope.model.query
            };
            var promise = DataSource.getData(action, paramObj); // 同步调用，获得承诺接口  
            promise.then(function(data) {
                // 调用承诺API获取数据 .resolve  
                $scope.items = data.rows;
                console.log($scope.items);
                if ($scope.items.length < pageSize) {
                    $scope.moreDataCanBeLoaded = false;
                }

                $ionicSlideBoxDelegate.update();
                $scope.$broadcast('scroll.refreshComplete');
                $ionicLoading.hide();
            }, function(data) { //处理错误 .reject  
                $scope.$broadcast('scroll.refreshComplete');
                $ionicLoading.hide();
                showAlert.showToast("加载数据出现异常 [" + data.status + "]");
            });
        };

        $scope.loadMoreItems = function() {
            console.log("[待办-loadMoreItems()] ");
            $ionicLoading.show({
                template: '加载中...'
            });
            var paramObj = {
                start: start,
                limit: limit,
                userId: userId,
                key: $scope.query
            };
            var promise = DataSource.getData(action, paramObj); // 同步调用，获得承诺接口  
            promise.then(function(data) {
                console.log(data);
                if (data && data.rows && data.rows.length > 0) {
                    if (data.rows.length < pageSize) {
                        $scope.moreDataCanBeLoaded = false;
                    }
                    for (var i = 0; i < data.rows.length; i++) {
                        $scope.items.push(data.rows[i]);
                    }
                    start = start + limit;
                } else {
                    $scope.moreDataCanBeLoaded = false;
                }

                $ionicSlideBoxDelegate.update();
                $scope.$broadcast('scroll.infiniteScrollComplete');
                $ionicLoading.hide();
            }, function(data) { //处理错误 .reject  
                $scope.$broadcast('scroll.refreshComplete');
                $ionicLoading.hide();
                showAlert.showToast("加载数据出现异常 [" + data.status + "]");
            });
        };


        $scope.godetail = function(item) {
            if (dotNet) {
                $state.go("xformTabComment", {
                    formId: item.formId,
                    info_id: item.info_id,
                    moduleId: item.moduleId,
                    wfId: item.wfId,
                    pid: item.pid,
                    pnid: item.pnid,
                    showComment: 1,
                    title: item.title,
                    v: "0",
                    type: "g_inbox",
                    gInboxId: item.id,
                    operationType: "ToDo",
                    isAttention: item.isattention,
                    backReason: "",
                    actName: item.actName,
                    historyUrl : 'todolist'
                });
            } else {
                openFormFile.openFile(item.formId,
                    item.info_id,
                    item.moduleId,
                    item.wfId,
                    item.pid,
                    item.pnid,
                    item.itemsContent,
                    1,//showComment
                    '0',//v
                    "g_inbox",
                    item.id,
                    "ToDo",
                    item.isattention,
                    '' , 
                    null ,//callback 
                    item.actName,
                    'todolist');
            }
        }
        $scope.goback = function() {
            $state.go("user.mainNewUser");
        }

        $scope.$watch("model.query", function(newValue, oldValue) {
            console.log("$scope.query=" + $scope.model.query + ",newValue=" + newValue + ",oldValue=" + oldValue);
            if (newValue == oldValue) {
                return;
            }
            $debounce($scope.doRefresh, 500);
        }, true);
})

.controller("hasdolistController", function($scope, $state, $sms, $rootScope, $stateParams, $ionicSlideBoxDelegate, showAlert, $interval, getDataSource, userHelp, $ionicLoading,  DataSource, $debounce) {
        //已办列表
        var start = 0; //列表数据开始位置
        var limit = pageSize; //列表数据偏移位
        var userId = localStorage.userid;
        var action = "processedFileNSAAction=1";

        $scope.moreDataCanBeLoaded = true;
        $scope.items = [];
        $scope.model = {};
        $scope.model.query = "";

        $scope.doRefresh = function() {
            console.log("[已办-doRefresh()] ");

            start = 0;
            $ionicLoading.show({
                template: '加载中...'
            });

            var paramObj = {
                start: start,
                limit: limit,
                userId: userId,
                key: $scope.model.query
            };
            var promise = DataSource.getData(action, paramObj); // 同步调用，获得承诺接口  
            promise.then(function(data) {
                // 调用承诺API获取数据 .resolve  
                $scope.items = data.rows;
                console.log($scope.items);
                if ($scope.items.length < pageSize) {
                    $scope.moreDataCanBeLoaded = false;
                }

                $ionicSlideBoxDelegate.update();
                $scope.$broadcast('scroll.refreshComplete');
                $ionicLoading.hide();
            }, function(data) { //处理错误 .reject  
                $scope.$broadcast('scroll.refreshComplete');
                $ionicLoading.hide();
                showAlert.showToast("加载数据出现异常 [" + data.status + "]");
            });
        };

        $scope.loadMoreItems = function() {
            console.log("[已办-loadMoreItems()] ");
            $ionicLoading.show({
                template: '加载中...'
            });
            var paramObj = {
                start: start,
                limit: limit,
                userId: userId,
                key: $scope.query
            };
            var promise = DataSource.getData(action, paramObj); // 同步调用，获得承诺接口  
            promise.then(function(data) {
                console.log(data);
                if (data && data.rows && data.rows.length > 0) {
                    if (data.rows.length < pageSize) {
                        $scope.moreDataCanBeLoaded = false;
                    }
                    for (var i = 0; i < data.rows.length; i++) {
                        $scope.items.push(data.rows[i]);
                    }
                    start = start + limit;
                } else {
                    $scope.moreDataCanBeLoaded = false;
                }

                $ionicSlideBoxDelegate.update();
                $scope.$broadcast('scroll.infiniteScrollComplete');
                $ionicLoading.hide();
            }, function(data) { //处理错误 .reject  
                $scope.$broadcast('scroll.refreshComplete');
                $ionicLoading.hide();
                showAlert.showToast("加载数据出现异常 [" + data.status + "]");
            });
        };
        
        $scope.godetail = function(item) {
            $state.go("xformTabComment", {
                formId: item.formId,
                info_id: item.info_id,
                moduleId: item.moduleId,
                wfId: item.wfId,
                pid: item.pid,
                pnid: item.pnid,
                showComment: 1,
                title: item.title,
                v: "1",
                type: "g_inbox",
                gInboxId: item.id,
                operationType: "ToDo",
                isAttention: item.isattention,
                backReason: "",
                actName: item.actName,
                historyUrl : 'hasdolist'
            });
        }
        $scope.goback = function() {
            $state.go("user.mainNewUser");
        }

        $scope.$watch("model.query", function(newValue, oldValue) {
            console.log("$scope.query=" + $scope.model.query + ",newValue=" + newValue + ",oldValue=" + oldValue);
            if (newValue == oldValue) {
                return;
            }
            $debounce($scope.doRefresh, 500);
        }, true);
})

.controller("xformTabCtrl", function($rootScope, $state, showAlert, $scope, $http, $stateParams, $ionicHistory, $ionicSlideBoxDelegate, $ionicLoading, Toast, $location, $ionicActionSheet, $ionicPopup, httpProxy, userOrgSelect, $timeout, codeSelect) {
     
        //先清除message事件然后在绑定
        window.removeEventListener('message', window.formSaveBack, false);
        var historyUrl = $stateParams.historyUrl;
        $scope.goback = function() {
            if (historyUrl) {
                $state.go(historyUrl);
            } else {
                $ionicHistory.goBack();
            }
/*            } else {
                if ($scope.v == 1) {
                    $state.go("hasdolist");
                } else {
                    $state.go("todolist");
                }
            }*/
        }
        var itemHighlight = true;
        var formSaveFinished = false; //表单保存操作是否完成（包含成功、失败）
        var formIsSave = false; //表单是否保存
        var formId = $stateParams.formId;
        var info_id = $stateParams.info_id;
        var moduleId = $stateParams.moduleId;
        var wfId = $stateParams.wfId;
        var pid = $stateParams.pid;
        var pnid = $stateParams.pnid;
        var showComment = $stateParams.showComment;
        var title = $stateParams.title;
        var gInboxId = $stateParams.gInboxId;
        var v = $stateParams.v;
        var type = $stateParams.type;
        var isAttention = $stateParams.isAttention;
        var userId = localStorage.userid;
        var backReason = Base64.decode($stateParams.backReason); //退回原因
        var reltag = "";
        // 存储参数
        $scope.formId = $stateParams.formId;
        $scope.info_id = $stateParams.info_id;
        $scope.moduleId = $stateParams.moduleId;
        $scope.wfId = $stateParams.wfId;
        $scope.pid = $stateParams.pid;
        $scope.pnid = $stateParams.pnid;
        $scope.v = $stateParams.v;
        $scope.type = $stateParams.type;
        $scope.selectUserArr = new Array();

        $scope.moduleId = moduleId;
        $scope.operationType = $stateParams.operationType; //表单类型
        $scope.isAttentionPng = "../img/texticon_guanzhu.png";
        $scope.issue = false;
        $scope.reviewdState = false;
        $scope.attentionState = false;
        $scope.showBackFolwState = false;
        $scope.isShowAttach = true;
        $scope.isShowRelationFile = false;

        console.log("xformTabCtrl: operationType=" + $scope.operationType);

        // 请假申请没有附件
        if( ($stateParams.historyUrl && ('leaveList' == $stateParams.historyUrl )) 
                || CommonConstants.MODULE_ID_LEAVE == moduleId) {
            $scope.isShowAttach = false;
        }
        if (CommonConstants.RELATION_FILE.indexOf(moduleId) > -1) {
            $scope.isShowRelationFile = true;
        }
        if ($scope.operationType != undefined) {
            if ($scope.operationType == "ToDo") {
                $scope.attentionState = true;
                if (isAttention == 'true') {
                    $scope.isAttentionPng = "../img/texticon_yiguanzhu.png";
                } else {
                    $scope.isAttentionPng = "../img/texticon_guanzhu.png";
                }
                if (backReason) {
                    $scope.showBackFolwState = true;
                }
            }
        }
        if ($scope.operationType == "Favorite" && itemHighlight) {
            $scope.attentionState = true;
            if (isAttention == 'true') {
                $scope.isAttentionPng = "../images/texticon_yiguanzhu.png";
            } else {
                $scope.isAttentionPng = "../images/texticon_guanzhu.png";
            }
        }
        
        
        $scope.isSendFlow = false;
        $scope.formSaveBack = function(data) {
            data = data.data;
            console.log("[receive window message data] [controller.js] " + JSON.stringify(data));
            if (data) {
                //type未定义的消息或type为saveForm是保存
                if (data.type && data.type == "openCodeSelect"){
                    var controlData = {
                        controlId : data.controlId,
                        codeId : data.codeId
                    }
                    codeSelect.showPop($scope.selectUserArr, false, $scope,function(){console.log("【callback】");}, controlData);//打开代码选择
                    return;
                }else if (data.type && data.type != "saveForm") {
                    console.log("received message is no saveForm,type is:" + jsonData.type);
                    return;
                }
            }
            var msg = data.resultMsg || "保存出错";
            showAlert.showToast(msg);
            formSaveFinished = true;
            if (data.result) {
                //formIsSave = true;
                //var xformFrame = document.getElementById("xformFrame");
                //var xformContentWindow = xformFrame.contentWindow;
                //var infoIdDom = xformContentWindow.document.getElementById("TxtInfoId");
                //var wfidDom = xformContentWindow.document.getElementById("TxtWfID");
                //wfId = wfidDom.value;
                //var param = new Object();
                //for (var i = 0; i < data.attributes.length; i++) {
                //    var ob = data.attributes[i];
                //    console.log(ob);
                //    for (var pa in ob) {
                //        if (pa == "info_id") {
                //            info_id = ob[pa];
                //        }
                //        if (pa == "pid") {
                //            pid = ob[pa];
                //        }
                //        if (pa == "pnid") {
                //            pnid = ob[pa];
                //        }
                //    }
                //}

                //if (dotNet && $scope.operationType == "FileDraft") {
                //    $rootScope.dratfileInfoId = info_id;
                //    $rootScope.dratfilePid = pid;
                //    $rootScope.dratfilePnid = pnid;
                //}

                ///*表单保存之后的刷新表单*/
                //var ifm = document.getElementById("xformFrame");
                //var subWeb = document.frames ? document.frames["xformFrame"].document : ifm.contentDocument;
                //var domain = localStorage.domain;
                //if (ifm != null && subWeb != null) {
                //    if (dotNet) {
                //        url = $location.absUrl().split("#")[0] + "/action?commonFormProxyAction=getFormDetail&";
                //        url += "user_id=" + localStorage.userid + "&domain=" + domain + "&" + "type=FILEQUERY.ASPX&";
                //    } else {
                //        url = $location.absUrl().split("#")[0] + "/action?xformAction=query&";

                //        if (infoIdDom && infoIdDom.value) {
                //            info_id = infoIdDom.value;
                //        }
                //    }
                //    url += "formNo=" + formId + "&info_id=" + info_id + "&pid=" + pid + "&pnid=" + pnid + "&WF_ID=" + wfId + "&moduleId=" + moduleId + "&formId=" + formId + "&hash=&queryType=html";
                //    if (v == 1) {
                //        if (dotNet) {
                //            url += "&IsView=1&hd=0";
                //        } else {
                //            url += "&v=1";
                //        }
                //    }

                //    if (dotNet) {
                //        if (true) {
                //            if ($scope.operationType == "ToRead") {
                //                url += "&isyw=1";
                //            }
                //        }
                //    }

                //    console.log(url);
                //    if (dotNet) {
                //        $('#xformFrame').attr('src', url);
                //    }
                //}

                //是否点击的是发送
                if ($scope.isSendFlow) {
                    info_id = info_id == '0' ? $rootScope.syncedInfoId : info_id;
                    var param = "<Root><Flow><Type>0</Type><Key>" + info_id + "</Key>" + "<Objclass>" + moduleId + "</Objclass>" + "<UserID>" + $rootScope.user.info_id + "</UserID>" + "<Pid>" + pid + "</Pid>" + "<Pnid>" + pnid + "</Pnid>" + "<WfID>" + wfId + "</WfID>" + "</Flow></Root>";

                    // var url = 'app/selectnode/' + Base64.encode(JSON.stringify(item));

                    var url = baseURL + "#/appClose/selectnode/" + info_id + "/" + Base64.encode(param) + "/1";
                    var title = "节点选择";

                    console.log(url);
                    //$state.go("appClose.selectnode", { infoId: info_id, flowParams: Base64.encode(param), formInbox: 1 });
                    $state.go("selectnode", { flowParams: Base64.encode(param), historyUrl: historyUrl });
                    //$state.go("user.mainuser");
                    //if (localStorage.testMode) {
                    //    //window.open(url);
                    //    $state.go("appClose.selectnode", {infoId:info_id,flowParams:Base64.encode(param),formInbox:1});
                    //} else {
                    //    var ref = xsfWindow.open(url, title);
                    //    ref.onExit = function () {
                    //        if (localStorage.isRefresh == "true") {
                    //            localStorage.isRefresh = false;
                    //            if (localStorage.testMode) {
                    //                window.close();
                    //            } else {
                    //                //延迟关闭（刷新待办）
                    //                $timeout(function () {
                    //                    xsfWindow.close();
                    //                }, 800);
                    //            }
                    //        }
                    //    }
                    //}
                }
            }
            //$ionicLoading.hide();
        }

        window.formSaveBack = $scope.formSaveBack;
        window.addEventListener('message', window.formSaveBack, false);

        title = decodeURIComponent(title);
        $scope.title = title;
        $scope.isShowComment = false;
        if (showComment == 1) {
            $scope.isShowComment = true;
        }
        $scope.saveForm = function() {
            $ionicLoading.show({
                template: '加载中...'
            });
            formSaveFinished = false;
            //保存表单设置是否发送为false
            $scope.isSendFlow = false;
            var domain = localStorage.domain;
            /*     	if(localStorage.testMode){
                        domain = "省局";
                    }*/
            var paramString = "{ \"logname\" : \"" + localStorage.logname + "\", " + "\"password\":\"" + localStorage.password + "\" , " + "\"domain\":\"" + domain + "\"}";

            var data = {
                action: "saveForm",
                isAutoSave: false,
                paramString: paramString
            };
            var dataString = JSON.stringify(data);
            var origin = "*";
            var xformFrame = document.getElementById("xformFrame");

            if (xformFrame) {
                var xformContentWindow = xformFrame.contentWindow;
                try {
                    //跨域调用
                    xformContentWindow.postMessage(dataString, origin);
                    //showAlert.showToast("保存成功!");
                    //Toast.showPop("保存成功!");
                } catch (e) {
                    Toast.showPop("网络异常 !保存出错!");
                    console.log("[$scope.saveForm()] " + e);
                }
            } else {
                var param = "<Root><Flow><Type>0</Type><Key>" + info_id + "</Key>" + "<Objclass>" + moduleId + "</Objclass>" + "<UserID>" + localStorage.userid + "</UserID>" + "<Pid>" + pid + "</Pid>" + "<Pnid>" + pnid + "</Pnid>" + "<WfID>" + wfId + "</WfID>" + "</Flow></Root>";

                // var url = 'app/selectnode/' + Base64.encode(JSON.stringify(item));

                var baseUrl = $location.absUrl().split("#")[0];
                var url = baseUrl + "#/appClose/selectnode/" + info_id + "/" + Base64.encode(param) + "/1";
                var title = "节点选择";
                console.log(url);

                localStorage.isRefresh = false;
                if (true) {
                    window.open(url);
                } else {
                    var ref = xsfWindow.open(url, title);
                    ref.onExit = function() {
                        if (localStorage.isRefresh == "true") {
                            localStorage.isRefresh = false;
                            if (localStorage.testMode) {
                                window.close();
                            } else {
                                //延迟关闭（刷新待办）
                                $timeout(function() {
                                    xsfWindow.close();
                                }, 800);
                            }
                        }
                    }
                }
            }

            //保存超时后，移除Loading
            $timeout(function() {
                $ionicLoading.hide();
            });
        };

        /**
         * 发送流程
         * @param info_id 文件id
         * @param moduleId 模块id
         * @param wfId 流程id
         * @param pId  流程实例id
         * @param pNid 流程节点id
         */
        $scope.send = function() {
            //先保存然后设置是否是发送流程
            $scope.saveForm();
            $scope.isSendFlow = true;
        };
        //退回原因
        $scope.flowBack = function() {
            //isth=1&info_id=2014346061128371&pid=199597086&pnid=5&userid=461602&fpnid=0&returnType=1&isall=0
            var template = '<ion-list>' +
                '<div class=" item item-input">' +
                '<input id="TxtReason" style="padding-left:5px;" type="text" placeholder="请填写退回原因" ng-model="TxtReason" ></input>' +
                '<div class="icon placeholder-icon"  style="padding-right:15px;"><img height=20 src="../img/inputview/ic_comment.png"></div>' +
                '</div>' +
                '<ion-list>';
            var myPopup = $ionicPopup.show({
                title: '<h4 style="font-weight:bold;">流程退回</h4>',
                template: template,
                scope: $scope,
                buttons: [{
                    text: '<b>取消</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        myPopup.close();
                        e.preventDefault();
                    }
                }, {
                    text: '<b>确定</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        var TxtReason = $("#TxtReason").val();
                        if (!TxtReason) {
                            Toast.showPop("请先填写退回意见！");
                            return;
                        }
                        myPopup.close();
                        var url = baseURL + '/action?flowBack=1';
                        var params = new Object();
                        params.__DATA = '{"pnid":"' + pnid + '","infoId":"' + info_id + '","userId":"' + localStorage.userid + '","pid":"' + pid + '","TxtReason":"' + TxtReason + '"}';
                        console.log(params);
                        httpProxy.postJSON(url, params, function(data) {
                            Toast.showPop(data.message);
                            setTimeout(function() {
                                if (data.result) {
                                    $scope.colseWin();
                                }
                            }, 500);
                        });
                        e.preventDefault();
                    }
                }]
            });

        }
        $scope.showBackReason = function() {
            var alertPopup = $ionicPopup.alert({
                title: '<h3 style=" font-weight: bold;">退回原因</h3>',
                template: "退回原因： " + backReason,
                buttons: [{ text: '确认', type: 'button-positive' }]
            });
        }

        if ($scope.operationType == "ToDo" || $scope.operationType == "FileDraft" || 
                'noticeNew' == $scope.operationType || 'Letters' == $scope.operationType || 
                'Leave' == $scope.operationType) {
            $scope.sendFolwState = true;
            $scope.xformButtonSate = true;
            if (pid != 0 && pnid != 0) {
                formIsSave = false;
            }

            $scope.backFolwState = false;
            console.log(info_id);
            console.log(pid);
            console.log(pnid);
            if (info_id != 0 && pid != 0 && pnid != 0 && pnid != 1) {
                $scope.backFolwState = true;
            }
            //阅毕
            if ($scope.operationType != "FileDraft") {
                $scope.reviewdState = true;
                $scope.reviewdAction = "fileReadToast()";
            }
        } else if ($scope.operationType == "DataList") {
            function processArguments() {
                var arguments = localStorage.getItem(CommonConstants.MODULE_ARGUMENTS);
                var args = null;
                try {
                    args = JSON.parse(arguments);
                } catch (e) {}
                if (args) {
                    //$scope.types = args.type;
                    $scope.action = args.action;
                    $scope.filterable = args.filterable == "true" ? true : false;
                    $scope.searchable = args.searchable == "true" ? true : false;
                    $scope.readonly = args.readonly == "true" ? true : false;
                }
            }
            processArguments();
            $scope.xformButtonSate = !$scope.readonly;
        } else if ($scope.operationType == "ToRead") {
            $scope.issue = true;
            $scope.reviewdState = true;
            $scope.reviewdAction = "readItem()";
        } else if ($scope.operationType == "ExsitFile") {
            function processArguments() {
                var arguments = localStorage.getItem(CommonConstants.ARGUMENTS_EXSITFILE);
                var args = null;
                try {
                    args = JSON.parse(arguments);
                } catch (e) {}
                if (args) {
                    $scope.sendFolwState = args.send == "true" ? true : false;
                    $scope.xformButtonSate = args.save == "true" ? true : false;
                }
            }
            processArguments();
        } else if ($scope.operationType == "draftFile") {
            $scope.sendFolwState = true;
            $scope.xformButtonSate = true;
        } else if ($scope.operationType == "ScrapFile") {
            $scope.xformButtonSate = false;
            $scope.isShowComment = true;
        } else if ('Notice' == $scope.operationType) {
            $scope.isShowComment = false;
            $scope.xformButtonSate = false;
        } else {
            $scope.xformButtonSate = false;
        }
        /**
         * 显示/隐藏表单菜单
         */
        $scope.toggleXFormMenu = function() {
            var buttons;
            var buttonClicked;
            if ($scope.operationType == "ToRead") {
                /* buttons = [{text:'分阅'},{text:'阅毕'}];
                 buttonClicked = function(index) {
                          switch(index){
                              case 0:
                                     $scope.diviedReview(info_id);
                                  break;
                              case 1:
                                     $scope.readItem(info_id);
                                  break;
                              default:
                                  console.log("[toggleXFormMenu] undefined action");
                          }
                        return true;
                  }*/
            } else {
                buttons = [{ text: '保存' }];
                buttonClicked = function(index) {
                    switch (index) {
                        case 0:
                            $scope.saveForm();
                            break;
                        default:
                            console.log("[toggleXFormMenu] undefined action");
                    }
                    return true;
                }
            }
            var hideSheet = $ionicActionSheet.show({
                buttons: buttons,
                titleText: '<b>菜单</b>',
                cancelText: '取消',
                cancel: function() {},
                buttonClicked: buttonClicked
            });
        };

        if ($scope.operationType == "ToDo") {
            //是否显示分阅 ,因为有两个按钮，所以隐藏两个
            $("#xformFenY1").hide();
            $("#xformFenY2").hide();
        }
        var baseUrl = $location.absUrl().split("#")[0];
        $scope.diviedTodoReview = function() {
            if (info_id && info_id != 0) {
                userOrgSelect.showPop($scope.selectData, false, $scope, function(selectData) {
                    $scope.selectData = selectData;
                    var userIds = "";
                    for (var i = 0; i < $scope.selectData.length; i++) {
                        if (i == $scope.selectData.length - 1) {
                            userIds += $scope.selectData[i].userid
                        } else {
                            userIds += $scope.selectData[i].userid + ",";
                        }
                    }

                    var userId = localStorage.userid;
                    var url = baseURL + '/action?dividedReview=1';
                    var params = new Object();
                    params.__DATA = '{"userIds":"' + userIds + '","infoId":"' + info_id + '","userId":"' + userId + '"}';
                    httpProxy.postJSON(url, params, function(data) {
                        var result = data.result;
                        if (!result) {
                            Toast.showPop("分阅失败，请重新操作！");
                        } else {
                            Toast.showPop("分阅成功");
                        }
                    });
                });
            } else {
                Toast.showPop("请先保存表单！");
            }
        }
        $scope.diviedReview = function() {
            //TODO 分阅
            var rootDept = localStorage.deptId;
            userOrgSelect.showPop($scope.selectData, false, $scope, function(selectData) {
                $scope.selectData = selectData;
                var userIds = "";
                for (var i = 0; i < $scope.selectData.length; i++) {
                    if (i == $scope.selectData.length - 1) {
                        userIds += $scope.selectData[i].userid
                    } else {
                        userIds += $scope.selectData[i].userid + ",";
                    }
                }
                var url = baseURL + '/action?dividedReview=1';
                var userId = localStorage.userid;
                var params = new Object();
                params.__DATA = '{"userIds":"' + userIds + '","infoId":"' + info_id + '"}';
                httpProxy.postJSON(url, params, function(data) {
                    var result = data.result;
                    if (!result) {
                        Toast.showPop("分阅失败，请重新操作！");
                    } else {
                        Toast.showPop("分阅成功");
                    }
                });
            }, rootDept);
        }

        $scope.readFile = function() {
            var url = baseURL + '/action?setReviewedNew=1';
            var userId = localStorage.userid;
            var params = '__DATA={"userId":"' + userId + '","infoId":"' + info_id + '"}';
            url = url + "&" + params;
            httpProxy.getJSON(url, "", function(data) {
                var result = data.data.result;
                if (!result) {
                    Toast.showPop("操作失败，请重新操作！");
                } else {
                    Toast.showPop("操作成功");
                    setTimeout(function() {
                        $scope.colseWin();
                    }, 500);
                }
            });
        }

        $scope.setFileRead = function() {
                var url = baseURL + '/action?setFileRead=1&id=' + gInboxId;
                var userId = localStorage.userid;
                httpProxy.getJSON(url, "", function(data) {
                    var result = data.data.result;
                    if (!result) {
                        Toast.showPop("操作失败，请重新操作！");
                    } else {
                        Toast.showPop("操作成功");
                        setTimeout(function() {
                            $scope.colseWin();
                        }, 500);
                    }
                });
            }
            //政务即时通阅毕
        $scope.fileReadToast = function() {
            var readPopup = $ionicPopup.show({
                title: '<p style="font-weight:bold;">提示</p>',
                template: "是否阅毕？",
                scope: $scope,
                buttons: [{
                    text: '<b>关闭</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        readPopup.close();
                        e.preventDefault();
                    }
                }, {
                    text: '<b>确定</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        $scope.setFileRead();
                        readPopup.close();
                        e.preventDefault();
                    }
                }]
            });
        }
        $scope.readItem = function(item) {
            readPopup = $ionicPopup.show({
                title: '<p style="font-weight:bold;">提示</p>',
                template: "是否阅毕？",
                scope: $scope,
                buttons: [{
                    text: '<b>关闭</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        readPopup.close();
                        e.preventDefault();
                    }
                }, {
                    text: '<b>确定</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        $scope.readFile();
                        readPopup.close();
                        e.preventDefault();
                    }
                }]
            });
        }

        /**
         * 缓办
         */
        $scope.delay = function() {
            var url = baseURL + '/action?transferDelayFile=1';
            var params = '__DATA={"id": "' + gInboxId + '"}';
            url = url + "&" + params;
            httpProxy.getJSON(url, "", function(data) {
                data = data.data;
                var result = data.result;
                if (!result) {
                    Toast.showPop("缓办失败");
                } else {
                    Toast.showPop("缓办成功");
                    xsfWindow.close();
                }
            }).error(function(data, status) {
                Toast.showPop("操作失败，请重新操作！");
            });

            /*$http.jsonp(url).success(function(data, status) {
			var result = data.result;
			if (!result) {
				Toast.showPop("缓办失败");
			} else {
				Toast.showPop("缓办成功");
				xsfWindow.close();
			}
			//$scope.doRefresh();
		}).error(function(data, status) {
			Toast.showPop("操作失败，请重新操作！");
		});*/
        };
        var tempXFormButtonSate = $scope.xformButtonSate;
        var tempSendFolwState = $scope.sendFolwState;

        function hideSave(data, type) {
            if (tempXFormButtonSate) {
                $scope.xformButtonSate = data;
            }
            if (type == 1) {
                $rootScope.inputviewContainerState = true;
            } else {
                $rootScope.inputviewContainerState = false;
            }
            if ($scope.v == 1) {
                $scope.xformButtonSate = false;
                $scope.sendFolwState = false;
                $scope.backFolwState = false;
                $rootScope.inputviewContainerState = false;
            }
        }

        $scope.hideSave = hideSave;
        $scope.colseWin = function() {
            //if (localStorage.testMode) {
            //    window.close();
            //} else {
            //    xsfWindow.close();
            //}
            $ionicHistory.goBack();
        };

        $rootScope.inputviewItem = {
            userId: $rootScope.user.info_id,
            username: $rootScope.user.username,
            info_id: info_id,
            pid: pid,
            pnid: pnid,
            moduleId: moduleId
        };

        //关注或取消关注
        $scope.clkAttention = function() {
            var item = {
                "isAttention": isAttention
            };

            var url = baseURL + '/action?setFocus=1';

            //	    var isAttention = item.isAttention;
            //	    console.log(item);
            if (isAttention == 'false') {
                isAttention = 'true';
            } else {
                isAttention = 'false';
            }

            var params = '__DATA={"userId":"' + userId + '","info_id":"' + info_id + '","isAttention":"' + isAttention + '","id":"' + gInboxId + '","type":"' + type + '"}';

            url = url + "&" + params;
            httpProxy.getJSON(url, "", function(data) {
                var result = data.data.result;
                if (!result) {
                    Toast.showPop("操作失败，请重新操作！");
                } else {
                    item.isAttention = isAttention;
                    if (item.isAttention == "true") {
                        $scope.isAttentionPng = "../images/texticon_yiguanzhu.png";
                        Toast.showPop("设置关注成功");
                    } else {
                        $scope.isAttentionPng = "../images/texticon_guanzhu.png";
                        Toast.showPop("取消关注成功");
                    }
                }
            });
            //取数据
            /* $http.jsonp(url).success(function(data, status){
               var result = data.result;
               if(!result){
                 Toast.showPop("操作失败，请重新操作！");
               }else{
                 item.isAttention = isAttention;
                 if(item.isAttention=="true"){
                     Toast.showPop("设置关注成功");
                 }else{
                     Toast.showPop("取消关注成功");
                 }
               }
             }).error(function(data, status){
                 Toast.showPop("操作失败，请重新操作！");
            });*/

        };

        //TODO 保存历史, 更新未读状态
        var url = baseURL + '/action?openSaveGufiles=1';
        var data = {
            userId: userId,
            infoId: info_id,
            type: type,
            pid: pid,
            pnid: pnid,
            reltag: reltag
        }

        var params = "__DATA=" + JSON.stringify(data);
        url = url + "&" + params;
        httpProxy.getJSON(url, "", function (data) {
           var result = data.data.result;
           if (result) {
               console.log("保存历史, 更新未读状态成功");
           } else {
               console.log("保存历史, 更新未读状态失败");
           }
        });

        //=========================================表单=================================================

        var formId = $stateParams.formId;
        var info_id = $stateParams.info_id;
        var moduleId = $stateParams.moduleId;
        var wfId = $stateParams.wfId;
        var pid = $stateParams.pid;
        var pnid = $stateParams.pnid;
        var v = $stateParams.v;
        var isFrist = true;
        $scope.operationType = $stateParams.operationType; //表单类型
        $scope.infoId = info_id;

        //防止除表单页面外点保存xformFrame对象已被清除时出错
        //if ($rootScope.hideSave) {
        //    $rootScope.hideSave(true);
        //}
        
        if (dotNet) {
            if ($scope.operationType == "FileDraft") {
                var dratfileInfoId = $rootScope.dratfileInfoId;
                var dratfilePid = $rootScope.dratfilePid;
                var dratfilePnid = $rootScope.dratfilePnid;
                if (dratfileInfoId && dratfilePid && dratfilePnid) {
                    info_id = dratfileInfoId;
                    pid = dratfilePid;
                    pnid = dratfilePnid;
                }
                $scope.infoId = info_id;
            }
        } else {
            if (!$scope.infoId && $rootScope.syncedInfoId) {
                $scope.infoId = $rootScope.syncedInfoId;
            }
        }

        window.onFormLoad = function(data) {
            var jsonData = null;
            try {
                jsonData = JSON.parse(data);
            } catch (e) {
                console.log(e);
            }
            if (jsonData && jsonData.INFO_ID) {
                $scope.$apply(function() {
                    $rootScope.syncedInfoId = jsonData.INFO_ID;
                    console.log("onFormLoad:" + localStorage.infoId);
                });
            }
        }
        $ionicLoading.show({
            template: '加载中...'
        });
        var url = "";

        var domain = localStorage.domain;
        if (dotNet) {
            url = baseURL + "/action?commonFormProxyAction=getFormDetail&";
            url += "user_id=" + localStorage.userid + "&domain=" + domain + "&" + "type=FILEQUERY.ASPX&";
        } else {
            url = baseURL + "/action?xformAction=query&";
        }
        url += "type=" + type + "&formNo=" + formId + "&info_id=" + $scope.infoId + "&pid=" + pid + "&pnid=" + pnid + "&WF_ID=" + wfId + "&moduleId=" + moduleId + "&formId=" + formId + "&hash=&queryType=html";
        if (v == 1) {
            if (dotNet) {
                url += "&IsView=1&hd=0";
            } else {
                url += "&v=1";
            }
            //隐藏意见输入
            $rootScope.inputviewContainerState = false;
        } else {
            if (pid != 0 && pnid != 0) {
                //显示意见输入
                $rootScope.inputviewContainerState = true;
            } else {
                $rootScope.inputviewContainerState = false;
            }
        }

        if (dotNet) {
            if (true) {
                if ($scope.operationType == "ToRead") {
                    url += "&isyw=1";
                }
            }
        }
        url += '&runtime=wechat'
        //$("#xformFrame").attr("src", "");
        //}
        $scope.xformURL = url;
        //console.log("$rootScope.inputviewContainerState" + $rootScope.inputviewContainerState);
        //console.log("[xformURL]:" + $scope.xformURL);
        $(function() {
            $("#xformFrame").on("load", function() {
                //TODO CHENB
            });
            $ionicLoading.hide();
        });
        $timeout(function() {
            console.log("[xformURL]" + $scope.xformURL);
            $("#xformFrame").attr("src", $scope.xformURL);
            $ionicSlideBoxDelegate.update();
        }, 200);

        var url = baseURL + "/action?getXFormAttachment=1&moduleId=" + moduleId + "&pid=" + pid + "&pnid=" + pnid + "&info_id=" + info_id + "&formId=" + formId + "&type=" + type;

        $scope.files = [];

        //==================================表单附件=============================================

        //防止除表单页面外点保存xformFrame对象已被清除时出错
        //if ($rootScope.hideSave) {
        //    $rootScope.hideSave(false);
        //}
        httpProxy.getJSON(url, "", function(data) {
            //var attach = eval("(" + data.data + ")");
            var datas = data.data.rows;
            console.log(datas);
            for (var i = 0; i < datas.length; i++) {
                var data = new Object();
                if (datas[i].document && datas[i].document.length > 0) {
                    data['hasFile'] = true;
                    data['name'] = datas[i]['name'];
                    data['canShow'] = datas[i]['canShow'];
                    if (data['canShow'] == 1) {
                        $scope.files.push(data);
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
                            $scope.files.push(file);
                        }
                    }
                }
            }
            if ($scope.files.length <= 0) {
                $scope.isExistAttachments = false;
            } else {
                $scope.isExistAttachments = true;
            }
            console.log($scope.files);
        });
        var tempDir = "";
        if (!$rootScope.formweixin) {
            xsf.getDeviceInfo(function(info) {
                //alert("info:" + info)
                //alert(info.WORK_DIR)
                tempDir = info.TEMP_DIR;
            });
        }

        $scope.openfile = function(item) {
        	
            //xsf.open($rootScope.AppConfig.jxzlPath + filename);
            if (!$rootScope.formweixin) {
                showAlert.showLoading(50000, "下载中...");
            }
            var filetype = item.type;
            var filename = "";
            var filePath = tempDir;
            var url = baseURL + "/action?downloadFile=1&app=ios&app=ios&fileId=" + item.id;
            //url ="http://xzxy.dream-it.cn:7080/ezweb/action?downloadFile=1&app=ios&app=ios&fileId=813449945930658";
            var type = item['name'].split(".")[item['name'].split(".").length - 1].toUpperCase();
            if ($rootScope.formweixin) {
                //$state.go("other", { url: encodeURI(url) });
                window.location.href = url;   
                //window.open(url);  
            } else {
                var downlaoder = xsfHttp.download(url, filePath,
                    function(result) {
                        showAlert.hideLoading();
                        xsf.open("file://" + tempDir + filename);
                    },
                    function(error) {
                        showAlert.hideLoading();
                        showAlert.showToast("文件无法下载");
                    }
                );
                downlaoder.onprogress = function(progressEvent) {
                    if (progressEvent.lengthComputable) {
                        //alert("" + progressEvent.total + "/" + progressEvent.loaded);
                    }
                }
            }
        };
        //==================================审批意见=============================================

        var operationType = $stateParams.operationType; //表单类型
        $scope.defaultUserIcon = CommonConstants.DEFAULT_USER_ICON;
        /*var url = "";
	if(type=="inbox"){
		url = baseURL+"/action?getInboxComment=1&pid="+pid+"&info_id="+info_id+"&userId="+userId;
	}else if(type=="favorite"){
		url = baseURL+"/action?getFocusComment=1&infoId="+info_id;
	}*/
        // 屏蔽意见输入框
        if (pid != 0 && pnid != 0 && type == 'g_inbox' && operationType != "dividedReview" && operationType != "ToDoRead") {
            //显示意见输入
            $rootScope.inputviewContainerState = false;
        } else {
            $rootScope.inputviewContainerState = false;
        }
        $scope.inputviewNotHideAfterSend = true;

        //防止除表单页面外点保存xformFrame对象已被清除时出错
        //if ($rootScope.hideSave) {
        //    $rootScope.hideSave(false);
        //}

        $scope.doRefresh = function() {
            var url = baseURL + "/action?getXFormComments=1&pid=" + pid + "&infoId=" + info_id + "&type=" + type;
            $scope.comments = [];
            httpProxy.getJSON(url, "", function(data) {
                //var conment = eval("(" + data.data + ")");
                var datas = data.data.rows;
                console.log(datas);
                for (var i = 0; i < datas.length; i++) {
                    if (datas[i].documents.length > 0) {
                        datas[i]['hasFile'] = true;
                    } else {
                        datas[i]['hasFile'] = false;
                    }
                    $scope.comments.push(datas[i]);
                }
                if ($scope.comments.length <= 0) {
                    $scope.isExistComments = false;
                } else {
                    $scope.isExistComments = true;
                }
            });
            console.log($rootScope.inputviewContainerState);
        }

        $rootScope.inputviewCompleteRefresh = $scope.doRefresh;
        /*$http.get(url).then(function (data) {
		console.log(data.data.rows);
		 var datas =  data.data.rows;
		 for(var i=0;i<datas.length;i++){
		 	if(datas[i].documents.length>0){
		 		datas[i]['hasFile'] = true;
		 	}else{
		 		datas[i]['hasFile'] = false;
		 	}
		 	$scope.comments.push(datas[i]);
		 }
	});*/
        $scope.doRefresh();

        $scope.openAttachmentsList = function(item) {
        	
            showAttachFilePop.showCommentFileByData(item, $scope);
        };

        if ($scope.v == 1) {
            $scope.xformButtonSate = false;
            $scope.sendFolwState = false;
            $scope.backFolwState = false;
            $rootScope.inputviewContainerState = false;
        }
    //==================================流程列表=============================================    
     
     $scope.$last=true;
     $scope.btn=function(comment){
      	if(!comment.className){
      		comment.hide=false;
      		comment.show=false;
      		comment.className = true ;
      		comment.classTip=true;
      		
      	}else{      		
      		comment.hide=true;
      		comment.show=true;
      		comment.className = false ;
      		comment.classTip=false;
      		
      	}
      }
      
      $scope.doRefreshFlow = function() {
            var url = baseURL + "/action?getFlow=1&infoId=" + info_id;
            $scope.flows = [];
            console.log("[doRefreshFlow] = " + url);
            httpProxy.getJSON(url, "", function(data) {
                var datas = data.data.rows; 
                console.log(datas.actName);  
                for (var i = 0; i < datas.length; i++) {
                    if (datas[i].length > 0) {
                        datas[i]['hasFile'] = true;
                    } else {
                        datas[i]['hasFile'] = false;
                    }
                    $scope.flows.push(datas[i]);
                }
                if ($scope.flows.length <= 0) {
                    $scope.isExistComments = false;
                } else {
                    $scope.isExistComments = true;
                }
                if ($scope.flows.length <= 0) {
                    $scope.isExistComments = false;
                } else {
                    $scope.isExistComments = true;
                }
            });
            console.log($rootScope.inputviewContainerState);            
        }
      $scope.doRefreshFlow();
      
      
    //==================================关联文件=============================================
    $scope.relationFileRefresh = function(){
        var relationFileUrl = baseURL + "/action?getRelationFile=1&pid=" + pid + "&infoId=" + info_id + "&type=" + type;
            $scope.relationFiles = [];
            console.log("[relationFileUrl]" + relationFileUrl);
            httpProxy.getJSON(relationFileUrl, "", function(data) {
                var datas = data.data.rows;
                console.log(datas);
                $scope.relationFiles = datas;
                if ($scope.relationFiles.length <= 0) {
                    $scope.isShowRelationFile = false;
                } else {
                    $scope.isShowRelationFile = true;
                }
            });
            console.log($rootScope.inputviewContainerState);
    }
    if($scope.isShowRelationFile){
        $scope.relationFileRefresh();
    }

    $scope.openRelationFile = function(item){
        $state.go("xformTabComment", {
            formId: item.formId,
            info_id: item.info_id,
            moduleId: item.moduleId,
            wfId: item.wfId,
            pid: item.pid,
            pnid: item.pnid,
            showComment: 1,
            title: item.itemsContent,
            v: 1,
            type: "g_inbox",
            gInboxId: item.id,
            operationType: "ToDo",
            isAttention: item.isattention,
            backReason: "",
            actName: item.actName,
            historyUrl : 'user.mainNewUser'
        });
    }
})

.controller("xformCtrl", function( $scope, $http, $timeout, showAlert, $stateParams, $ionicLoading, $rootScope, openFormFile, httpProxy, $location, $ionicSlideBoxDelegate) {
        var formId = $stateParams.formId;
        var info_id = $stateParams.info_id;
        var moduleId = $stateParams.moduleId;
        var wfId = $stateParams.wfId;
        var pid = $stateParams.pid;
        var pnid = $stateParams.pnid;
        var v = $stateParams.v;
        var isFrist = true;
        $scope.operationType = $stateParams.operationType; //表单类型
        //var baseURL = $location.absUrl().split("#")[0];
        $scope.infoId = info_id;

        //防止除表单页面外点保存xformFrame对象已被清除时出错
        if ($rootScope.hideSave) {
            $rootScope.hideSave(true);
        }
        if (dotNet) {
            if ($scope.operationType == "FileDraft") {
                var dratfileInfoId = $rootScope.dratfileInfoId;
                var dratfilePid = $rootScope.dratfilePid;
                var dratfilePnid = $rootScope.dratfilePnid;
                if (dratfileInfoId && dratfilePid && dratfilePnid) {
                    info_id = dratfileInfoId;
                    pid = dratfilePid;
                    pnid = dratfilePnid;
                }
                $scope.infoId = info_id;
            }
        } else {
            if (!$scope.infoId && $rootScope.syncedInfoId) {
                $scope.infoId = $rootScope.syncedInfoId;
            }
        }

        window.onFormLoad = function(data) {
            var jsonData = null;
            try {
                jsonData = JSON.parse(data);
            } catch (e) {
                console.log(e);
            }
            if (jsonData && jsonData.INFO_ID) {
                $scope.$apply(function() {
                    $rootScope.syncedInfoId = jsonData.INFO_ID;
                    console.log("onFormLoad:" + localStorage.infoId);
                });
            }
        }
        //===============================
        $ionicLoading.show({
            template: '加载中...'
        });
        var url = "";

        var domain = localStorage.domain;
        if (dotNet) {
            url = baseURL + "/action?commonFormProxyAction=getFormDetail&";
            url += "user_id=" + localStorage.userid + "&domain=" + domain + "&" + "type=FILEQUERY.ASPX&";
        } else {
            url = baseURL + "/action?xformAction=query&";
        }
        url += "formNo=" + formId + "&info_id=" + $scope.infoId + "&pid=" + pid + "&pnid=" + pnid + "&WF_ID=" + wfId + "&moduleId=" + moduleId + "&formId=" + formId + "&hash=&queryType=html";
        if (v == 1) {
            if (dotNet) {
                url += "&IsView=1&hd=0";
            } else {
                url += "&v=1";
            }
            //隐藏意见输入
            $rootScope.inputviewContainerState = false;
        } else {
            if (pid != 0 && pnid != 0) {
                //显示意见输入
                $rootScope.inputviewContainerState = true;
            } else {
                $rootScope.inputviewContainerState = false;
            }
        }

        if (dotNet) {
            if (true) {
                if ($scope.operationType == "ToRead") {
                    url += "&isyw=1";
                }
            }
        }
        $("#xformFrame").attr("src", "");
        //}
        $scope.xformURL = url;
        //console.log("$rootScope.inputviewContainerState" + $rootScope.inputviewContainerState);
        //console.log("[xformURL]:" + $scope.xformURL);
        $(function() {
            $("#xformFrame").on("load", function() {

            });
            $ionicLoading.hide();
        });
        $timeout(function() {
            $("#xformFrame").attr("src", $scope.xformURL);
            $ionicSlideBoxDelegate.update();
        }, 200);

})

.controller("attachmentCtrl", function($scope, $http, $stateParams, $location, Toast, showAlert, httpProxy, $rootScope) {
        $scope.isExistAttachments = true;
        var moduleId = $stateParams['moduleId'];
        var pid = $stateParams['pid'];
        var pnid = $stateParams['pnid'];
        var info_id = $stateParams['info_id'];
        var formId = $stateParams['formId'];
        var type = $stateParams['type'];
        var url = baseURL + "/action?getXFormAttachment=1&moduleId=" + moduleId + "&pid=" + pid + "&pnid=" + pnid + "&info_id=" + info_id + "&formId=" + formId + "&type=" + type;

        $scope.files = [];

        //防止除表单页面外点保存xformFrame对象已被清除时出错
        if ($rootScope.hideSave) {
            $rootScope.hideSave(false);
        }
        httpProxy.getJSON(url, "", function(data) {
            //var attach = eval("(" + data.data + ")");
            var datas = data.data.rows;
            console.log(datas);
            for (var i = 0; i < datas.length; i++) {
                var data = new Object();
                if (datas[i].document && datas[i].document.length > 0) {
                    data['hasFile'] = true;
                    data['name'] = datas[i]['name'];
                    data['canShow'] = datas[i]['canShow'];
                    if (data['canShow'] == 1) {
                        $scope.files.push(data);
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
                            $scope.files.push(file);
                        }
                    }
                }
            }
            if ($scope.files.length <= 0) {
                $scope.isExistAttachments = false;
            } else {
                $scope.isExistAttachments = true;
            }
            console.log($scope.files);
        });
        $scope.openfile = function(file) {
            var domain = localStorage.domain;
            var url = baseURL + "/action?downloadFile=1&app=ios&app=ios&fileId=" + file.id;
            var type = file['name'].split(".")[file['name'].split(".").length - 1].toUpperCase();
            /*if(type=='DOC'||type=='DOCX'||type=='XLS'||type=='XLSX'||type=='PPT'||type=='PPTX'||type=='TXT'||type=='TEXT'||type=='PDF'){
                xsfWPS.open(url,file.name, file.id,true,false ,
                           function (result) {
                           },
                           function (error) {
                           }
                );
            }else{
                var baseUrl = $location.absUrl().split("#")[0];
                var ionicUrl = baseUrl + "#/attachFileShow/"+type+"/"+file.id; 
                console.log(ionicUrl);
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

})

.controller("commentCtrl", function($scope, $http, $stateParams, $rootScope, showAlert, showAttachFilePop, httpProxy) { //谢启勇
        $scope.isExistComments = true;
        var pid = $stateParams['pid'];
        var info_id = $stateParams['info_id'];
        var type = $stateParams['type'];
        var pnid = $stateParams['pnid'];
        var pnid = $stateParams['pnid'];
        var operationType = $stateParams.operationType; //表单类型
        $scope.moduleId = $stateParams['moduleId'];
        $scope.actName = Base64.decode($stateParams['actName']) || '';

        $scope.defaultUserIcon = CommonConstants.DEFAULT_USER_ICON;
        /*var url = "";
	if(type=="inbox"){
		url = baseURL+"/action?getInboxComment=1&pid="+pid+"&info_id="+info_id+"&userId="+userId;
	}else if(type=="favorite"){
		url = baseURL+"/action?getFocusComment=1&infoId="+info_id;
	}*/
        if (pid != 0 && pnid != 0 && type == 'g_inbox' && operationType != "dividedReview" && operationType != "ToDoRead") {
            //显示意见输入
            $rootScope.inputviewContainerState = true;
        } else {
            $rootScope.inputviewContainerState = false;
        }
        $scope.inputviewNotHideAfterSend = true;

        //防止除表单页面外点保存xformFrame对象已被清除时出错
        if ($rootScope.hideSave) {
            $rootScope.hideSave(false);
        }

        $scope.doRefresh = function() {
            var url = baseURL + "/action?getXFormComments=1&pid=" + pid + "&infoId=" + info_id + "&type=" + type;
            $scope.comments = [];
            httpProxy.getJSON(url, "", function(data) {
                //var conment = eval("(" + data.data + ")");
                var datas = data.data.rows;
                console.log(datas);
                for (var i = 0; i < datas.length; i++) {
                    if (datas[i].documents.length > 0) {
                        datas[i]['hasFile'] = true;
                    } else {
                        datas[i]['hasFile'] = false;
                    }
                    $scope.comments.push(datas[i]);
                }
                if ($scope.comments.length <= 0) {
                    $scope.isExistComments = false;
                } else {
                    $scope.isExistComments = true;
                }
            });
            console.log($rootScope.inputviewContainerState);
        }

        $rootScope.inputviewCompleteRefresh = $scope.doRefresh;
        /*$http.get(url).then(function (data) {
		console.log(data.data.rows);
		 var datas =  data.data.rows;
		 for(var i=0;i<datas.length;i++){
		 	if(datas[i].documents.length>0){
		 		datas[i]['hasFile'] = true;
		 	}else{
		 		datas[i]['hasFile'] = false;
		 	}
		 	$scope.comments.push(datas[i]);
		 }
	});*/
        $scope.doRefresh();

        $scope.openAttachmentsList = function(item) {
            showAttachFilePop.showCommentFileByData(item, $scope);
        };
})

.controller("selectnodeController", function($scope, $http, $timeout, showAlert, $stateParams, getDataSource, $ionicHistory, $state, $ionicPopup, $location, $ionicLoading, userSelect, Toast, httpProxy, flowSelect, $rootScope) {
        var historyUrl = $stateParams.historyUrl;
        $scope.goback = function() {
            if (historyUrl) {
                $state.go(historyUrl);
            } else {
                $ionicHistory.goBack();
            }
        }
        $scope.baseURL = "";
        $scope.items = [];
        var flowParams = Base64.decode($stateParams.flowParams);
        var infoId = $stateParams.infoId;
        $scope.flowParams = Base64.decode($stateParams.flowParams);
        $scope.isflowPcHandle = false;
        $scope.curNodeId = "";
        $scope.istz = false;
        //是否是从代办列表进入
        var formInbox = $stateParams.formInbox;
        /*httpProxy.getJSON(baseURL+"/action?getFlowNodes=1&flowParams="+flowParams,"",function(data){
		data = data.data;
		console.log(data);
		if(data.result){
			if(data!=undefined && data.nodes.length > 0){
		    	 $scope.items=data.nodes;
		    	 console.log($scope.items);
		    }
		    console.log(data.nodes);
		}else{
			$scope.isflowPcHandle = true;
			$scope.message = data.message;
			Toast.showPop(data.message);
		}
	 });
	*/
        $scope.nodeUser = new Array();

        $scope.cancelSelect = function() {
            var users = $scope.nodeUser;
            if (users.length == 0) {
                for (var i = 0; i < $scope.items.length; i++) {
                    $("#cbnode_" + i).attr("checked", false);
                }
            }
        }

        $scope.reViewSelectUser = function() {
            var users = $scope.nodeUser;
            console.log(users);
            var strHtml = "";
            $("#node_" + $scope.curNodeId).html("");
            for (var i = 0; i < $scope.items.length; i++) {
                $("#node_" + $scope.items[i].nodeid).attr("class", "");
            }
            if (users.length == 0) {
                for (var i = 0; i < $scope.items.length; i++) {
                    $("#cbnode_" + i).attr("checked", false);
                }
            }
            for (var i = 0; i < users.length; i++) {
                if ($scope.curNodeId == users[i].nodeid) {
                    if (i == (users.length - 1)) {
                        var textContent = strHtml + users[i].username;
                        $("#node_" + users[i].nodeid).html(textContent);
                        $("#node_" + users[i].nodeid).attr("class", "selectedStudent");
                    } else {
                        strHtml += users[i].username + ","
                    }
                }
            }
        };
        //是否跳轉節點
        $scope.showNode = function() {
            $ionicLoading.show({
                template: '加载中...'
            });
            var url = baseURL + "/action?getFlowNodes=1&istz=" + $scope.istz + "&flowParams=" + flowParams;
            console.log(url);
            httpProxy.getJSON(url, "", function(data) {
                $ionicLoading.hide();
                data = data.data;
                console.log(data);
                if (data.result) {
                    $scope.items = new Array();
                    if (data != undefined && data.nodes.length > 0) {
                        $scope.items = data.nodes;
                        console.log($scope.items);
                        if (data != undefined && data.nodes.length == 1) {
                            if (data.nodes[0].senduser != undefined && data.nodes[0].senduser.length == 1 && data.nodes[0].senduser[0].orgusers != undefined && data.nodes[0].senduser[0].orgusers.length == 1) {
                                $scope.nodeUser = data.nodes[0].senduser[0].orgusers;
                                $scope.curNodeId = data.nodes[0].nodeid;
                                $scope.items[0].isChecked = true;

                                $scope.send();
                            }
                        }
                    }
                    console.log(data.nodes);
                } else {
                    if (data != undefined) {
                        $scope.isflowPcHandle = true;
                        $scope.message = data.message;
                        Toast.showPop(data.message);
                    } else {
                        Toast.showPop("服务器异常");
                    }
                }
                //单个节点，单个人直接选中
                //			if(data.result){
                //				if(data!=undefined && data.nodes.length== 1){
                //		    		 if(data.nodes[0].senduser != undefined 
                //		    				 && data.nodes[0].senduser.length ==1
                //		    				 && data.nodes[0].senduser[0]){
                //		    			 $scope.nodeUser= data.nodes[0].senduser[0].orgusers;
                //		    			 $scope.curNodeId = data.nodes[0].nodeid;
                //		    		 }
                //			    }
                //			}
            });
        }
        $scope.istzBack = function() {
                $scope.istz = false;
                $scope.showNode();
            }
            //初始化选择节点
        $scope.showNode();
        $scope.chickuser = function(index, $event) {
            //如果是跳轉節點，則重新加載節點數據 NODETYPE=6為跳轉節點
            var nodetype = $scope.items[index].nodetype;
            if (6 == nodetype) {
                var baseUrl = $location.absUrl().split("#")[0];
                console.log($scope.flowParams);
                /*	var url = baseUrl+"#/app/selectnode/"+Base64.encode($scope.flowParams)+"/"+$scope.formInbox+"/true";
                    var title = "同意节点选择";
                    var ref =xsfWindow.open(url, title);*/
                //節點類型遠接口已經包含，下面是跳轉接口調用
                var flowParams = Base64.decode($stateParams.flowParams);
                $scope.istz = true;
                $scope.showNode();
            } else {
                $scope.items[index].isChecked = $event.target.checked;
                //判断是否单选节点,如果是单选节点则其他已选节点的数据被清空
                if ("true" == $scope.items[index].singselectnode) {
                    if ($event.target.checked) {
                        $scope.nodeUser = new Array();
                        for (var i = 0; i < $scope.items.length; i++) {
                            if (i != index) {
                                $scope.items[i].isChecked = false;
                                $("#cbnode_" + i).attr("checked", false);
                                $("#cbnode_" + i).attr("disabled", "disabled");
                                $("#node_" + $scope.items[i].nodeid).html("");
                                $("#node_" + $scope.items[i].nodeid).attr("class", "");
                            }
                        }
                        console.log($scope.nodeUser);
                    } else {
                        $("#node_" + $scope.items[index].nodeid).html("");
                        $("#node_" + $scope.items[index].nodeid).attr("class", "");
                    }
                }


                var isSingle = $scope.items[index].singselectuser == "true" ? true : false;
                /*if(!$event.target.checked){
				$scope.items[index].isChecked=false;
				$("#cbnode_"+index).attr("checked",false);
				$("#node_"+$scope.items[index].nodeid).html("");
			}*/
                if ($event.target.checked && $scope.items[index].nodetype != 0) {

                    var item = $scope.items[index];

                    var paramObj = new Object();
                    var nodeID = item.nodeid;
                    $scope.curNodeId = nodeID;
                    var flowParams = item.flowParams;
                    var type = "2";
                    if (Feature.FEATURE_BREAD_CRUMB_FLOW) {
                        type = "3"
                    }
                    var url = baseURL + "/action?getFlowNodes=" + type;
                    //選人節點也要傳跳轉節點的參數
                    var param = "{'flowParams':'" + flowParams + "','nodeID':'" + nodeID + "','istz':'" + $scope.istz + "'}";
                    //	param='[{"flowParams":"'+flowParams+'","sendParams":[{"nodeid":"'+selectNodeID+'","users":[{"userid":"1530","username":"徐春","deptid":"1755","deptname":"审计处"}]}]}]';
                    paramObj.__DATA = param;
                    $ionicLoading.show({
                        template: '加载中...'
                    });
                    httpProxy.postJSON(url, paramObj, function(datas) {
                        $ionicLoading.hide();
                        console.log(datas);
                        for (var i = 0; i < $scope.items.length; i++) {
                            $("#cbnode_" + i).removeAttr("disabled");
                        }
                        if (Feature.FEATURE_BREAD_CRUMB_FLOW) {
                            flowSelect.showPop(datas, isSingle, nodeID, $scope.nodeUser, $scope, $scope.reViewSelectUser, index);
                        } else {
                            userSelect.showPop(datas, isSingle, nodeID, $scope.nodeUser, $scope, $scope.reViewSelectUser);
                        }
                    });
                } else {
                    for (var i = 0; i < $scope.items.length; i++) {
                        $("#cbnode_" + i).removeAttr("disabled");
                    }
                }
            }
        };

        //判断发送人是否设置了秘书，设置了秘书则把该文件分阅给该秘书
        $scope.sendSecretary = function(userids) {
            /*AJAX请求地址*/
            var url = "";
            /*AJAX请求参数*/
            var param = null;

            var ids = userids.join(",");

            param = '{"infoId":"' + infoId + '","userIds":"' + ids + '"}';
            param = {
                __DATA: param
            };
            url = baseURL + "/action?dividedReview=addDivided";
            httpProxy.post(url, param, function(datas) {
                $ionicLoading.hide();
            });

            $.ajax({
                type: "post",
                url: "../backHTML/OaHandle.ashx",
                data: { postUrl: url, postData: encodeURIComponent(param), func: "HttpPost" },
                success: function(data) {
                    $ionicLoading.hide();
                }
            });
        }

        /*发送方法*/
        $scope.send = function() {
            $("#sendFlow").attr('disabled', "true");
            for (var i = 0; i < $scope.items.length; i++) {
                if ($scope.items[i].isChecked && $scope.items[i].nodetype == 0) {
                    var item = $scope.items[i];
                    console.log("-------------------------");
                    console.log(item);
                    console.log("-------------------------");
                    var paramObj = new Object();
                    var nodeID = item.nodeid;
                    var flowParams = item.flowParams;
                    var url = baseURL + "/action?sendFlow=2&flowParams=" + flowParams;
                    $ionicLoading.show({
                        template: '加载中...'
                    });
                    httpProxy.postJSON(url, paramObj, function(datas) {
                        $ionicLoading.hide();
                        showAlert.showToast(datas.message);
                        setTimeout(function() {
                            if (datas.result) {
                                // $ionicHistory.goBack();
                                if (historyUrl) {
                                    $state.go(historyUrl);    
                                } else {
                                    $state.go("todolist");
                                }
                                // $state.go("user.mainNewUser");
                            }
                        }, 500);
                        if (!datas.result) {
                            $("#sendFlow").removeAttr("disabled");
                        }
                    });
                    //httpProxy.postJSON(url, paramObj, function(datas) {
                    //	$ionicLoading.hide();
                    //	console.log(datas);
                    //	Toast.showPop(datas.message);
                    //	setTimeout(function(){
                    //		if(datas.result){
                    //			//表示从表单进入到发送流程
                    //			if(formInbox==1){
                    //				//TODO
                    //				localStorage.isRefresh = true;
                    //				xsfWindow.close(1,function(){

                    //			 	});
                    //			}else{
                    //				xsfWindow.close(1,function(){

                    //			 	});
                    //			}
                    //		}
                    //	},500);

                    //});
                    return;
                }
            }
            var selectUsers = $scope.nodeUser;
            if (selectUsers.length < 1) {
                Toast.showPop("请选择要发送的人员.");
                return false;
            }
            console.log(selectUsers);
            var sendParams = new Array();
            for (i = 0; i < selectUsers.length; i++) {
                if (sendParams.length > 0) {
                    for (var j = 0; j < sendParams.length; j++) {
                        if (sendParams[j].nodeid == selectUsers[i].nodeid) {
                            var user = new Object();
                            user.userid = selectUsers[i].userid;
                            user.username = selectUsers[i].username;
                            user.deptname = selectUsers[i].orgname;
                            user.deptid = selectUsers[i].orgid;
                            sendParams[j].users.push(user);
                        } else {
                            var obj = new Object();
                            obj.nodeid = selectUsers[i].nodeid;
                            obj.users = new Array();
                            var user = new Object();
                            user.userid = selectUsers[i].userid;
                            user.username = selectUsers[i].username;
                            user.deptname = selectUsers[i].orgname;
                            user.deptid = selectUsers[i].orgid;
                            obj.users.push(user);
                            sendParams.push(obj);
                        }
                    }
                } else {
                    var obj = new Object();
                    obj.nodeid = selectUsers[i].nodeid;
                    obj.users = new Array();
                    var user = new Object();
                    user.userid = selectUsers[i].userid;
                    user.username = selectUsers[i].username;
                    user.deptname = selectUsers[i].orgname;
                    user.deptid = selectUsers[i].orgid;
                    obj.users.push(user);
                    sendParams.push(obj);
                }
            }
            var userids = new Array();
            for (i = 0; i < selectUsers.length; i++) {
                userids.push(selectUsers[i].userid);
            }
            var sendParams = JSON.stringify(sendParams);
            /*AJAX请求地址*/
            var url = "";
            /*AJAX请求参数*/
            var param = null;
            //發送時也要加入跳轉節點的參數
            param = '[{"flowParams":"' + $scope.flowParams + '","sendParams":' + sendParams + ',"istz":' + $scope.istz + '}]';
            param = {
                __DATA: param
            };
            url = baseURL + "/action?sendFlow=1&domain=";
            $ionicLoading.show({
                template: '加载中...'
            });
            httpProxy.post(url, param, function(datas) {
                $ionicLoading.hide();
                showAlert.showToast(datas.message);
                //判断发送人是否设置了秘书，设置了秘书则把该文件分阅给该秘书
                /*if (datas.result && Project.PROJECT_NMG_BGT_ZWJST) {
                    $scope.sendSecretary(userids)
                }    */
                setTimeout(function() {
                    if (datas.result) {
                        // $state.go("user.mainNewUser");
                        // $ionicHistory.goBack();
                        // $state.go("todolist");
                        if (historyUrl) {
                            $state.go(historyUrl);    
                        } else {
                            $state.go("todolist");
                        }
                    }
                }, 500);
                if (!datas.result) {
                    $("#sendFlow").removeAttr("disabled");
                }
            }, function() {
                $ionicLoading.hide();
                showAlert.showToast("发送失败");
            });
            //httpProxy.post(url, param, function(datas) {
            //	$ionicLoading.hide();
            //	Toast.showPop(datas.message);
            //	//判断发送人是否设置了秘书，设置了秘书则把该文件分阅给该秘书
            //	if (datas.result && Project.PROJECT_NMG_BGT_ZWJST) {
            //		$scope.sendSecretary(userids)
            //	}
            //	setTimeout(function(){
            //			if(datas.result){
            //				if(formInbox==1){
            //					//TODO
            //					localStorage.isRefresh = true;
            //					xsfWindow.close(1,function(){

            //				 	});
            //				}else{
            //					xsfWindow.close(1,function(){

            //				 	});
            //				}
            //			}
            //	},500);
            //	if(!datas.result){
            //		$("#sendFlow").removeAttr("disabled");
            //	}
            //});
        };

})

.controller("applicationCtrl", function($scope, $state, $http, $timeout, $stateParams, $location, httpProxy, appEvent) {
        $scope.menus = [];
        $scope.appId = "";
        $scope.isExistData = true;
        var userId = localStorage.userid;
        var url = baseURL + "/action?getAppAndModule=1&userId=" + userId;
        //	var url = baseURL+"/action?getAppAndModule=1";
        console.log("applicationCtrl:" + url);
        httpProxy.getJSON(url, "", function(data) {
            var datas = data.data.rows;
            for (var i = 0; datas && i < datas.length; i++) {
                if (datas[i].modules && datas[i].modules.length > 0) {
                    for (var j = 0; j < datas[i].modules.length; j++) {
                        if (datas[i].modules[j].name == "分管机构") {
                            datas[i].modules.splice(j, 1);
                            break;
                        }
                    }
                }
            }
            for (var i = 0; datas && i < datas.length; i++) {
                if (datas[i].modules && datas[i].modules.length > 0) {
                    for (var j = 0; j < datas[i].modules.length; j++) {
                        var clazz = datas[i].modules[j].clazz;

                        if (clazz == "com.ue.oa.oa.fragment.MessageFragment") {
                            datas[i].modules[j].goUrl = "#/app/modules/1";
                        } else if (clazz == "com.ue.oa.user.fragment.ContactsOrganizationFragment") {
                            if (Feature.FEATURE_BREAD_CRUMB_CONTACTS) {
                                datas[i].modules[j].goUrl = "#/app/addressListNew/-1";
                            } else {
                                datas[i].modules[j].goUrl = "#/app/addressList/" + localStorage.mainUnit;
                            }
                        } else if (clazz == "") {
                            datas[i].modules[j].goUrl = "#/app/addressList/" + localStorage.mainUnit;
                        } else if (clazz == "com.ue.oa.calendar.fragment.CalendarFragment") {
                            datas[i].modules[j].goUrl = "#/app/leftCalendar";
                        } else if (clazz == "com.ue.oa.user.fragment.ContactsFragment") {
                            datas[i].modules[j].goUrl = "#/app/addressListPy/" + localStorage.mainUnit;
                        } else if (clazz == "com.ue.oa.news.fragment.TempNewsFragment") {
                            datas[i].modules[j].goUrl = "#/app/leftNews";
                        } else if (clazz == "com.ue.oa.user.breadcrumb.BreadCrumbFGContactsFragment") {
                            if (Feature.FEATURE_BREAD_CRUMB_CONTACTS) {
                                datas[i].modules[j].goUrl = "#/app/addressListNew/-1";
                            } else {
                                datas[i].modules[j].goUrl = "#/app/addressList/" + localStorage.mainUnit;
                            }
                        } else {
                            datas[i].modules[j].goUrl = clazz;
                        }

                    }
                }
                $scope.menus.push(datas[i]);
            }

            if (datas && datas.length > 0) {
                $scope.isExistData = true;
            } else {
                $scope.isExistData = false;
            }
        })

        $scope.goBack = function() {
            xsfWindow.close(1, function() {});
        }

        window.orgitems = new Array();
        var rootDept = localStorage.mainUnit;
        var messageUrl = baseURL + "/action?userContactActionAngular=1&action=getOrgUsersJs&rootDeptId=" + rootDept + "&userId=" + userId;
        httpProxy.getJSON(messageUrl, "", function(data) {
            console.log(data);
            var datas = data.data.rows;
            for (var j = 0; datas && j < datas.length; j++) {
                datas[j].isShow = false;
                window.orgitems.push(datas[j]);
            }
        });

        $scope.openModule = function(type) {
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
                url = "app.notes.noteToList";

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

        window.openModule = $scope.openModule;

        $scope.goBack = function() {
            xsfWindow.close(1, function() {});
        }
        $scope.openMenu = function(item) {
            var url = item.goUrl.toLowerCase();
            if (url.indexOf("http://") > -1 || url.indexOf("https://") > -1 || url.indexOf("file://") > -1) {
                if (localStorage.testMode) {
                    window.open(url);
                } else {
                    var ref = xsfWindow.open(url, "国家行政学院移动办公系统");
                    ref.onExit = function() {
                        if (callBack) {
                            callBack();
                        }
                    }
                }
            }
        }
        $scope.openForm = function(formId, info_id, moduleId, wfId, pid, pnid, title, showComment, v, type, gInboxId) {
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
        window.openModule = $scope.openModule;

        $scope.openForm = function(formId, info_id, moduleId, wfId, pid, pnid, title, showComment, v, type, gInboxId) {
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
            if (type == "g_inbox" || type == "g_issue") {
                showComment = 1;
            }
            //是待阅类型
            if (!Feature.FEATURE_MANUAL_REVIEWED && type == "g_issue") {
                var url = baseURL + '/action?setReviewedNew=1';
                var params = '__DATA={"userId":"' + userId + '","infoId":"' + info_id + '"}';
                url = url + "&" + params;
                httpProxy.getJSON(url, "", function(data) {
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

        window.openForm = $scope.openForm;

        $scope.openNote = function(noteId) {
            $state.go('noteDetail', { noteId: noteId, edit: true });
        }

        window.openNote = $scope.openNote;

})

.controller("weekMeetController", function($scope, Restangular, $state, $ionicModal, $ionicHistory, $dateService, $rootScope, $ionicSlideBoxDelegate, $ionicScrollDelegate, getDataSource) {

        $scope.goback = function() {
                $ionicHistory.goBack();
            }
            //当前模式，默认周
        $scope.weekpage = true;
        //页面切换事件
        $scope.changePageView = function() {
            $scope.weekpage = !$scope.weekpage;
            $scope.styleString = $scope.weekpage ? parseInt($scope.styleString) + 81 : parseInt($scope.styleString) - 81;
            $(".week-timetable-content .scroll").removeAttr("style");
        };
        if ($rootScope.user == null) {
            $state.go("loginUserMobile");
            return;
        }
        var isIOS = ionic.Platform.isIOS();
        var isAndroid = ionic.Platform.isAndroid();
        $scope.styleString = "110";
        $scope.styleTopString = "74";
        if (isAndroid) {
            $scope.styleString = "110";
            $scope.styleTopString = "74";
        }
        if (isIOS) {
            //$scope.styleString = "95";
            $scope.styleTopString = "94";
        }

        $scope.isshowloading = true;
        // 日期转换
        $scope.parseDate = function(dataString) {
            if (dataString) {
                return $dateService.parse(dataString);
            } else {
                return "";
            }
        }
        $scope.titleYearMonth = $dateService.format(new Date(), "yyyy-mm");
        $scope.loadDatas = function() {
            //取出所有数据，包括服务器时间，开班开始时间和开班结束时间，所有课程
            getDataSource.getDataSource("getXyhy", {}, function(data) {
                if (data !== null) {
                    $scope.kclist = data;

                    $scope.SYSDATE = $dateService.format(new Date(), "yyyy-mm-dd hh:mm:ss");
                    $scope.sysdate = new Date(); //系统时间
                    $scope.today = $dateService.format(new Date(), "yyyy-mm-dd"); //今日
                    $scope.activeDate = $scope.today; //当前选中日期
                    $scope.titleYearMonth = $dateService.format($scope.sysdate, "yyyy-mm"); //选中日期的月份

                    var now = new Date;
                    var day = now.getDay();
                    var week = "7123456";
                    var first = 0 - week.indexOf(day);
                    var f = new Date;
                    f.setDate(f.getDate() + first);
                    var last = 6 - week.indexOf(day);
                    var l = new Date;
                    l.setDate(l.getDate() + last);

                    $scope.old_startdate = new Date(f);
                    $scope.old_enddate = new Date(l);
                    //根据开班开始时间的周几通过开班开始时间减去开始时间的周几索引（0-6）为新的开班开始时间
                    $scope.startdate = new Date($scope.old_startdate.getTime() - ((7 + $scope.old_startdate.getDay()) * 24 * 60 * 60 * 1000));
                    //根据开班结束时间的周几通过开班结束时间加上结束时间的周几索引（6减去0-6）为新的开班结束时间
                    $scope.enddate = new Date($scope.old_enddate.getTime() + ((7 - $scope.old_enddate.getDay()) * 24 * 60 * 60 * 1000));
                    //
                    $scope.slideNum = (($scope.enddate.getTime() - $scope.startdate.getTime()) / 1000 / 60 / 60 / 24 + 1) / 7;
                    //重新组织JSON格式：                

                    //周日历
                    var eachList = [{
                        ym1: '2014-12',
                        ym2: '2015-01', //跨月只能一个月
                        index: 0,
                        solarData: [{
                                date: '2014-12-31',
                                day: 31,
                                ym: '2014-12'
                            }, {
                                date: '2015-01-01',
                                day: 1
                            }, {
                                date: '2015-01-02',
                                day: 2
                            }, {
                                date: '2015-01-03',
                                day: 3
                            }, {
                                date: '2015-01-04',
                                day: 4
                            }, {
                                date: '2015-01-05',
                                day: 5
                            },
                            { date: '2015-01-06', day: 6 }
                        ],
                        lunarData: [{
                                date: '2014-12-31',
                                day: "三十",
                                data: [{ title: "" }, { title: "" }],
                                ym: '2014-12'
                            }, {
                                date: '2015-01-01',
                                day: "初一",
                                data: []
                            }, {
                                date: '2015-01-02',
                                day: "初二",
                                data: []
                            }, {
                                date: '2015-01-03',
                                day: "初三",
                                data: []
                            }, {
                                date: '2015-01-04',
                                day: "初四",
                                data: []
                            }, {
                                date: '2015-01-05',
                                day: "初五",
                                data: [{ title: "" }, { title: "" }]
                            },
                            { date: '2015-01-06', day: "初六", data: [{ title: "" }, { title: "" }] }
                        ]
                    }];
                    var calendarList = [],
                        lsarry = new Array();
                    $scope.monthlist = [];
                    //通过新的开班开始时间-结束时间的天数除以七（得出结果一定是整数）来循环输出每周的日期，即有多少个tab页
                    for (var i = 0; i < $scope.slideNum; i++) {
                        var slideArry = {},
                            lsdate, lstimetable, lssarry = new Array();
                        slideArry.index = i;
                        slideArry.solarData = [];
                        slideArry.lunarData = [];
                        for (var wk = 0; wk < 7; wk++) {
                            lsdate = new Date($scope.startdate.getTime() + (((i * 7) + wk) * 24 * 60 * 60 * 1000));
                            var ftdate = $dateService.format(lsdate, "yyyy-mm-dd"),
                                ym = $dateService.format(lsdate, "yyyy-mm");
                            slideArry.solarData.push({
                                date: ftdate,
                                day: parseInt($dateService.format(lsdate, "dd")),
                                ym: ym
                            });
                            //找出当前日期的所有课程数据
                            lstimetable = [];
                            if ($scope.kclist) {
                                _.forEach($scope.kclist, function(m, key) {
                                    if (m.stime == ftdate) {
                                        lstimetable.push(m);
                                    }
                                });
                            }
                            if ($scope.activeDate == ftdate) {
                                $scope.timetable = lstimetable;
                                $scope.pageIndex = i;
                            }
                            var lspdata = {
                                date: ftdate,
                                day: GetLunarDay($dateService.format(lsdate, "yyyy"), $dateService.format(lsdate, "mm"), $dateService.format(lsdate, "dd")).day,
                                data: lstimetable,
                                ym: ym
                            };
                            slideArry.lunarData.push(lspdata);

                            //全局
                            if (lsarry.indexOf(ym) == -1) {
                                lsarry.push(ym);
                                $scope.monthlist.push({
                                    date: ym,
                                    month: $dateService.format(lsdate, "mm")
                                });
                            }
                            //周
                            if (lssarry.indexOf(ym) == -1) {
                                lssarry.push(ym);
                                if (slideArry.ym1) {
                                    slideArry.ym2 = ym;
                                } else {
                                    slideArry.ym1 = ym;
                                }
                            }
                        }
                        calendarList.push(slideArry);
                    }
                    $scope.calendarList = calendarList;
                    $ionicSlideBoxDelegate.update();
                    if ($scope.pageIndex) {
                        setTimeout(function() {
                            $ionicSlideBoxDelegate.slide($scope.pageIndex, 1);
                            $scope.isshowloading = false;
                        }, 10)
                    } else {
                        $scope.isshowloading = false;
                    }
                } else {
                    //showToast.show($rootScope.appcontent.noData);
                }
            });
        };
        setTimeout(function() {
            $scope.loadDatas();
        }, 500);
        $scope.slideHasChanged = function($index) {
            //获取当前选中的日期，算出星期几
            var weekIndex = new Date($scope.activeDate).getDay();
            try {
                $scope.activeDate = $scope.calendarList[$index].lunarData[weekIndex].date;
                $scope.timetable = $scope.calendarList[$index].lunarData[weekIndex].data;
            } catch (e) {

            }
            $scope.titleYearMonth = $dateService.format(new Date($scope.activeDate), "yyyy-mm");

            $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
        }
        $scope.changeTimeTableView = function(objdata, sobjdata, changePageView) {
            $scope.activeDate = sobjdata.date;
            $scope.titleYearMonth = $dateService.format(new Date($scope.activeDate), "yyyy-mm");
            if (!changePageView) {
                $scope.changePageView();
                $ionicSlideBoxDelegate.slide(objdata.index, 300);
            }
            for (var i in objdata.lunarData) {
                if (objdata.lunarData[i].date == $scope.activeDate) {
                    $scope.timetable = objdata.lunarData[i].data;
                }
            }

            $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
        }
        $scope.changeTodayView = function() {
            $scope.activeDate = $scope.today;
            $scope.titleYearMonth = $dateService.format(new Date($scope.activeDate), "yyyy-mm");
            var weekIndex = new Date($scope.activeDate).getDay();
            try {
                $scope.timetable = $scope.calendarList[$scope.pageIndex].lunarData[weekIndex].data;
            } catch (e) {

            }
            if ($scope.pageIndex != null && $scope.pageIndex != undefined) {
                $ionicSlideBoxDelegate.slide($scope.pageIndex, 300);
            }

            $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
        }
        $scope.goTotechEvaluation = function(obj) {
            if (!$scope.isDisable(obj.lessonid, obj.ispost)) {
                $state.go("app.techEvaluation", {
                    id: obj.lessonid,
                    type: obj.evaluatetype,
                    lessontype: obj.lessontype,
                    isback: 1
                });
            }
            //$state.go("app.notices");
        }

        //是否已过期样式
        $scope.isDisable = function(etime, ispost) {
                //注意：5是配置,代表时限推后5天
                if ($scope.calculationObsolete(etime) && ispost != "1") {
                    return "i_disable";
                }
            }
            //计算是否过期
        $scope.calculationObsolete = function($edate) {
            var $delay = $rootScope.AppConfig.evaluateouttime;
            //获取系统时间
            var sysDate = new Date($scope.SYSDATE.replace(/-/g, "/")),
                newDate = new Date($edate.replace(/-/g, "/"));
            newDate = new Date(newDate.setDate(newDate.getDate() + parseInt($delay)));
            var minuteNum = (newDate.getTime() - sysDate.getTime()) / 60 / 1000; //分钟
            if (parseInt(minuteNum) <= 0) {
                return true;
            } else {
                return false;
            }
        }
})

.controller("ldrcController", function($scope, Restangular, $state, $ionicModal, $ionicHistory, $dateService, $rootScope, $ionicSlideBoxDelegate, $ionicScrollDelegate, getDataSource) {

        $scope.goback = function() {
                $ionicHistory.goBack();
            }
            //当前模式，默认周
        $scope.weekpage = true;
        //页面切换事件
        $scope.changePageView = function() {
            $scope.weekpage = !$scope.weekpage;
            $scope.styleString = $scope.weekpage ? parseInt($scope.styleString) + 81 : parseInt($scope.styleString) - 81;
            $(".week-timetable-content .scroll").removeAttr("style");
        };
        if ($rootScope.user == null) {
            $state.go("loginUserMobile");
            return;
        }
        var isIOS = ionic.Platform.isIOS();
        var isAndroid = ionic.Platform.isAndroid();
        $scope.styleString = "110";
        $scope.styleTopString = "74";
        if (isAndroid) {
            $scope.styleString = "110";
            $scope.styleTopString = "74";
        }
        if (isIOS) {
            //$scope.styleString = "95";
            $scope.styleTopString = "94";
        }

        $scope.isshowloading = true;
        // 日期转换
        $scope.parseDate = function(dataString) {
            if (dataString) {
                return $dateService.parse(dataString);
            } else {
                return "";
            }
        }
        $scope.titleYearMonth = $dateService.format(new Date(), "yyyy-mm");
        $scope.loadDatas = function() {
            //取出所有数据，包括服务器时间，开班开始时间和开班结束时间，所有课程
            getDataSource.getDataSource("getLdrc", {}, function(data) {
                if (data !== null) {
                    $scope.kclist = data;

                    $scope.SYSDATE = $dateService.format(new Date(), "yyyy-mm-dd hh:mm:ss");
                    $scope.sysdate = new Date(); //系统时间
                    $scope.today = $dateService.format(new Date(), "yyyy-mm-dd"); //今日
                    $scope.activeDate = $scope.today; //当前选中日期
                    $scope.titleYearMonth = $dateService.format($scope.sysdate, "yyyy-mm"); //选中日期的月份

                    var now = new Date;
                    var day = now.getDay();
                    var week = "7123456";
                    var first = 0 - week.indexOf(day);
                    var f = new Date;
                    f.setDate(f.getDate() + first);
                    var last = 6 - week.indexOf(day);
                    var l = new Date;
                    l.setDate(l.getDate() + last);

                    $scope.old_startdate = new Date(f);
                    $scope.old_enddate = new Date(l);
                    //根据开班开始时间的周几通过开班开始时间减去开始时间的周几索引（0-6）为新的开班开始时间
                    $scope.startdate = new Date($scope.old_startdate.getTime() - ((7 + $scope.old_startdate.getDay()) * 24 * 60 * 60 * 1000));
                    //根据开班结束时间的周几通过开班结束时间加上结束时间的周几索引（6减去0-6）为新的开班结束时间
                    $scope.enddate = new Date($scope.old_enddate.getTime() + ((7 - $scope.old_enddate.getDay()) * 24 * 60 * 60 * 1000));
                    //
                    $scope.slideNum = (($scope.enddate.getTime() - $scope.startdate.getTime()) / 1000 / 60 / 60 / 24 + 1) / 7;
                    //重新组织JSON格式：                

                    //周日历
                    var eachList = [{
                        ym1: '2014-12',
                        ym2: '2015-01', //跨月只能一个月
                        index: 0,
                        solarData: [{
                                date: '2014-12-31',
                                day: 31,
                                ym: '2014-12'
                            }, {
                                date: '2015-01-01',
                                day: 1
                            }, {
                                date: '2015-01-02',
                                day: 2
                            }, {
                                date: '2015-01-03',
                                day: 3
                            }, {
                                date: '2015-01-04',
                                day: 4
                            }, {
                                date: '2015-01-05',
                                day: 5
                            },
                            { date: '2015-01-06', day: 6 }
                        ],
                        lunarData: [{
                                date: '2014-12-31',
                                day: "三十",
                                data: [{ title: "" }, { title: "" }],
                                ym: '2014-12'
                            }, {
                                date: '2015-01-01',
                                day: "初一",
                                data: []
                            }, {
                                date: '2015-01-02',
                                day: "初二",
                                data: []
                            }, {
                                date: '2015-01-03',
                                day: "初三",
                                data: []
                            }, {
                                date: '2015-01-04',
                                day: "初四",
                                data: []
                            }, {
                                date: '2015-01-05',
                                day: "初五",
                                data: [{ title: "" }, { title: "" }]
                            },
                            { date: '2015-01-06', day: "初六", data: [{ title: "" }, { title: "" }] }
                        ]
                    }];
                    var calendarList = [],
                        lsarry = new Array();
                    $scope.monthlist = [];
                    //通过新的开班开始时间-结束时间的天数除以七（得出结果一定是整数）来循环输出每周的日期，即有多少个tab页
                    for (var i = 0; i < $scope.slideNum; i++) {
                        var slideArry = {},
                            lsdate, lstimetable, lssarry = new Array();
                        slideArry.index = i;
                        slideArry.solarData = [];
                        slideArry.lunarData = [];
                        for (var wk = 0; wk < 7; wk++) {
                            lsdate = new Date($scope.startdate.getTime() + (((i * 7) + wk) * 24 * 60 * 60 * 1000));
                            var ftdate = $dateService.format(lsdate, "yyyy-mm-dd"),
                                ym = $dateService.format(lsdate, "yyyy-mm");
                            slideArry.solarData.push({
                                date: ftdate,
                                day: parseInt($dateService.format(lsdate, "dd")),
                                ym: ym
                            });
                            //找出当前日期的所有课程数据
                            lstimetable = [];
                            if ($scope.kclist) {
                                _.forEach($scope.kclist, function(m, key) {
                                    if (m.stime == ftdate) {
                                        lstimetable.push(m);
                                    }
                                });
                            }
                            if ($scope.activeDate == ftdate) {
                                $scope.timetable = lstimetable;
                                $scope.pageIndex = i;
                            }
                            var lspdata = {
                                date: ftdate,
                                day: GetLunarDay($dateService.format(lsdate, "yyyy"), $dateService.format(lsdate, "mm"), $dateService.format(lsdate, "dd")).day,
                                data: lstimetable,
                                ym: ym
                            };
                            slideArry.lunarData.push(lspdata);

                            //全局
                            if (lsarry.indexOf(ym) == -1) {
                                lsarry.push(ym);
                                $scope.monthlist.push({
                                    date: ym,
                                    month: $dateService.format(lsdate, "mm")
                                });
                            }
                            //周
                            if (lssarry.indexOf(ym) == -1) {
                                lssarry.push(ym);
                                if (slideArry.ym1) {
                                    slideArry.ym2 = ym;
                                } else {
                                    slideArry.ym1 = ym;
                                }
                            }
                        }
                        calendarList.push(slideArry);
                    }
                    $scope.calendarList = calendarList;
                    $ionicSlideBoxDelegate.update();
                    if ($scope.pageIndex) {
                        setTimeout(function() {
                            $ionicSlideBoxDelegate.slide($scope.pageIndex, 1);
                            $scope.isshowloading = false;
                        }, 10)
                    } else {
                        $scope.isshowloading = false;
                    }
                } else {
                    //showToast.show($rootScope.appcontent.noData);
                }
            });
        };
        setTimeout(function() {
            $scope.loadDatas();
        }, 500);
        $scope.slideHasChanged = function($index) {
            //获取当前选中的日期，算出星期几
            var weekIndex = new Date($scope.activeDate).getDay();
            try {
                $scope.activeDate = $scope.calendarList[$index].lunarData[weekIndex].date;
                $scope.timetable = $scope.calendarList[$index].lunarData[weekIndex].data;
            } catch (e) {

            }
            $scope.titleYearMonth = $dateService.format(new Date($scope.activeDate), "yyyy-mm");

            $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
        }
        $scope.changeTimeTableView = function(objdata, sobjdata, changePageView) {
            $scope.activeDate = sobjdata.date;
            $scope.titleYearMonth = $dateService.format(new Date($scope.activeDate), "yyyy-mm");
            if (!changePageView) {
                $scope.changePageView();
                $ionicSlideBoxDelegate.slide(objdata.index, 300);
            }
            for (var i in objdata.lunarData) {
                if (objdata.lunarData[i].date == $scope.activeDate) {
                    $scope.timetable = objdata.lunarData[i].data;
                }
            }

            $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
        }
        $scope.changeTodayView = function() {
            $scope.activeDate = $scope.today;
            $scope.titleYearMonth = $dateService.format(new Date($scope.activeDate), "yyyy-mm");
            var weekIndex = new Date($scope.activeDate).getDay();
            try {
                $scope.timetable = $scope.calendarList[$scope.pageIndex].lunarData[weekIndex].data;
            } catch (e) {

            }
            if ($scope.pageIndex != null && $scope.pageIndex != undefined) {
                $ionicSlideBoxDelegate.slide($scope.pageIndex, 300);
            }

            $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
        }
        $scope.goTotechEvaluation = function(obj) {
            if (!$scope.isDisable(obj.lessonid, obj.ispost)) {
                $state.go("app.techEvaluation", {
                    id: obj.lessonid,
                    type: obj.evaluatetype,
                    lessontype: obj.lessontype,
                    isback: 1
                });
            }
            //$state.go("app.notices");
        }

        //是否已过期样式
        $scope.isDisable = function(etime, ispost) {
                //注意：5是配置,代表时限推后5天
                if ($scope.calculationObsolete(etime) && ispost != "1") {
                    return "i_disable";
                }
            }
            //计算是否过期
        $scope.calculationObsolete = function($edate) {
            var $delay = $rootScope.AppConfig.evaluateouttime;
            //获取系统时间
            var sysDate = new Date($scope.SYSDATE.replace(/-/g, "/")),
                newDate = new Date($edate.replace(/-/g, "/"));
            newDate = new Date(newDate.setDate(newDate.getDate() + parseInt($delay)));
            var minuteNum = (newDate.getTime() - sysDate.getTime()) / 60 / 1000; //分钟
            if (parseInt(minuteNum) <= 0) {
                return true;
            } else {
                return false;
            }
        }
})

.controller("xiaoLiController", function($scope, $state, $ionicHistory, $stateParams, $sce, getDataSource) {

        getDataSource.getDataSource("getXiaoli", {}, function(data) {
            $scope.xiaoli = data;
        });
})