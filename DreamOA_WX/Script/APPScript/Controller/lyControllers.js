APPController.controller("studymanageController", function ($scope, $state, $rootScope, getDataSource) {
    getDataSource.getDataSource(["getMyQuestionCount"], { bcid: $rootScope.user.classid, info_id: $rootScope.user.info_id }, function (data) {
        if (data[0].countnum > 0) {
            $scope.dataMySource[1].showicon = true;
        }
    });
    $scope.goUser = function () {
        $state.go("userinfo");
    }
    $scope.gosub = function (e) {
        //console.log(e);
        if (e.url == "group") {
            userHelp.groupChat();
        } else {
            if (e.type != "" && e.type != null && e.type != undefined) {
                $state.go(e.url, { type: e.type });
            } else {
                $state.go(e.url);
            }
        }
    }

    $scope.datameSource = [
        {
            row: "1", data: [
                { image: "../staticresource/报道须知.png", title: "学员活跃度", url: "teachactivity" },
                { image: "../staticresource/教学评价.png", title: "评价管理", url: "teachappraise" },
                { image: "../staticresource/通知公告.png", title: "通知公告", url: "notice" }
            ]
        },
        {
            row: "2", data: [
                { image: "../staticresource/课表查询.png", title: "课表查询", url: "app.kbcx" },
            { image: "../staticresource/选修报名.png", title: "选修管理", url: "choosemanage" },
            { image: "../staticresource/教学资料.png", title: "教学资料", url: "jxzl" }
            ]
        },
        {
            row: "3", data: [
            { image: "../staticresource/班级交流.png", title: "班级交流", url: "group" },
            { image: "../staticresource/班级信息.png", title: "班部信息", url: "classteacher" },
            { image: "../staticresource/班委分组.png", title: "班委分组", url: "studentgroup" }
            ]
        }
    ];
    $scope.dataMySource = [
       { image: "ion-ios-compose-outline", title: "训前需求表", url: "dcwjTeacher", type: 2, showicon: false },
       { image: "ion-chatboxes", title: "训中提问", url: "training", showicon: false },
       { image: "ion-clipboard", title: "调查问卷", url: "dcwjTeacher", type: 1, showicon: false }
    ];

})
 .controller("mystudyController", function ($scope, $state, $rootScope, $ionicModal, getDataSource, calcStar, userHelp) {
     var user = $rootScope.user;
     getDataSource.getDataSource(["Get_XYXXByInfoId"], { bcid: user.classid, info_id: user.info_id }, function (data) {
         $scope.userInfo = data[0];
         $scope.userInfo.starArr = [];// new Array();
         calcStar.getStar($scope.userInfo);
         //, "getMyQuestionCount"
         //if (data[1].countnum > 0) {
         //    $scope.dataMySource[1].showicon = true;
         //}
     });

     $scope.goUser = function () {
         $state.go("userinfo");
     }
     $scope.gosub = function (e) {
         //console.log(e);
         if (e.url == "group") {
             userHelp.groupChat();
         } else {
             if (e.type != "" && e.type != null && e.type != undefined) {
                 $state.go(e.url, { type: e.type });
             } else {
                 $state.go(e.url);
             }
         }
     }

     $scope.datameSource = [
         {
             row: "1", data: [
                 { image: "../staticresource/报道须知.png", title: "学员须知", url: "guidelineCollege" },
                 { image: "../staticresource/教学评价.png", title: "教学评价", url: "stuappraise" },
                 { image: "../staticresource/通知公告.png", title: "通知公告", url: "notice" }
             ]
         },
         {
             row: "2", data: [
                 { image: "../staticresource/课表查询.png", title: "课表查询", url: "app.kbcx" },
             { image: "../staticresource/选修报名.png", title: "选修报名", url: "chooseclass" },//choosemanage
             { image: "../staticresource/教学资料.png", title: "教学资料", url: "jxzl" }
             ]
         },
         {
             row: "3", data: [
             { image: "../staticresource/班级交流.png", title: "班级交流", url: "group" },
             { image: "../staticresource/班级信息.png", title: "班部信息", url: "classteacher" },
             { image: "../staticresource/班委分组.png", title: "班委分组", url: "studentgroup" }
             ]
         }
     ];
     $scope.dataMySource = [
        { image: "ion-ios-compose-outline", title: "训前需求表", url: "dcwjStudent", type: 2, showicon: false },
        { image: "ion-chatboxes", title: "训中提问", url: "ntraining", showicon: false },
        { image: "ion-clipboard", title: "调查问卷", url: "dcwjStudent", type: 1, showicon: false }
     ];
 })
 .controller("studentController", function ($scope, $state, $rootScope, $ionicModal,$ionicPopup, $ionicScrollDelegate,showAlert, getDataSource, userHelp) {
     $scope.myStyle = { margin: "0px 0px 0px 0px" };
     $scope.myGroupStyle = { margin: "0px 0px 0px 0px" };
     var isIOS = ionic.Platform.isIOS();
     var isAndroid = ionic.Platform.isAndroid();
     if (isAndroid) {
         $scope.myStyle = { margin: "0px 0px 0px 0px" };
         $scope.myGroupStyle = { margin: "50px 0px 0px 0px" };
     }
     if (isIOS) {
         $scope.myStyle = { margin: "20px 0px 0px 0px" };
         $scope.myGroupStyle = { margin: "70px 0px 0px 0px" };
     }

     /**************通讯层调用Start****************/
     $scope.addressUser = {};//点击弹出联系人的信息

     $scope.showChange = false;
     if ($rootScope.user.type == "teacher") {
         $scope.showChange = true;
     }

     //下载oa用户管理里面的人员照片
     $scope.downLoadUrl = "../backHTML/userphoto.aspx?userid=";

     $ionicModal.fromTemplateUrl("../templates/addresslistInfo.html", {
         scope: $scope,
         animation: "slide-in-up"
     }).then(function (modal) {
         $scope.modal = modal;
     });

     $scope.goTop = function () {
         $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
     }

     $scope.openModal = function (e) {
         // console.log(e.info_id + "====" + e.classid);
         //用户默认图片
         $scope.userdefault = "../staticresource/userphoto/userdefault.svg";
         if (e.id != $rootScope.user.info_id) {
             getDataSource.getDataSource("getAddressUser", { classid: $rootScope.user.classid, userid: e.id }, function (data) {
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

     $scope.closeModal = function () {
         $scope.modal.hide();
     };

     //Cleanup the modal when we are done with it!
     $scope.$on("$destroy", function () {
         $scope.modal.remove();
     });
     // Execute action on hide modal
     $scope.$on("modal.hidden", function () {
         // Execute action
     });
     // Execute action on remove modal
     $scope.$on("modal.removed", function () {
         // Execute action
     });
     $scope.goHref = function (index) {
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
             case 5:
                 if ($scope.addressUser.utype == 1) {
                     getDataSource.getDataSource("updateTeachinfo", { bcpsd: "", info_id: $scope.addressUser.id }, function (data) {
                         alert("重置成功");
                     });
                 }
                 else {
                     getDataSource.getDataSource("updateXYinfo", { bcpsd: "", info_id: $scope.addressUser.id }, function (data) {
                         alert("重置成功");
                     });
                 }
                 break;
             case 6:
                 $scope.data = { phone: '' };
                 // 一个精心制作的自定义弹窗
                 var myPopup = $ionicPopup.show({
                     template: '<input type="text" ng-model="data.phone">',
                     title: '请输入学员手机号码',
                     scope: $scope,
                     buttons: [
                       { text: '取消' },
                       {
                           text: '<b>确定</b>',
                           type: 'button-positive',
                           onTap: function (e) {
                               if ($scope.data.phone=="") {
                                   showAlert.showToast("请输入学员手机号码!");
                               }
                               else {
                                   if (!(/^1[3|5|8][0-9]\d{8}$/.test($scope.data.phone))) {
                                       showAlert.showToast("手机号码填写错误!");
                                   }
                                   else {
                                       // 更新数据库的学员的手机号码
                                       getDataSource.getDataSource("updateXYxx", { info_id: $scope.addressUser.id, phone: $scope.data.phone }, function (data) {
                                           $scope.addressUser.phone = $scope.data.phone;
                                           showAlert.showToast("修改手机号码成功!");
                                       })
                                   }
                               }
                           }
                       },
                     ]
                 }).then(function (res) {
                     console.log('Tapped!', res);
                 });
                 break;
         }
     }
     /**************通讯层调用End****************/

     $scope.goUser = function () {
         $state.go("userinfo");
     }
     $scope.gosub = function (e) {
         $state.go("userinfo");
     }
     //默认小图标
     $scope.userdefaultpng = "../staticresource/userphoto/userdefaultpng.svg";

     //班内职务
     $scope.dataZW = [];
     //学员
     $scope.dataStu = [];
     //小组
     $scope.dataXZ = [];

     $scope.keyword = "";
     $scope.showgroup = function (rowData, keyword) {
         if (keyword == "") {
             return true;
         } else {
             var stugroup = _.filter($scope.dataStu, function (d) {
                 return rowData.name == d.xz;
             });
             if (stugroup != null && stugroup.length > 0) {
                 var stus = _.filter(stugroup, function (d) {
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
     $scope.shownogroup = function (keyword) {
         if (keyword == "") {
             return true;
         } else {
             var stugroup = _.filter($scope.dataStu, function (d) {
                 return d.xz == "" || d.xz == null;
             });
             if (stugroup != null && stugroup.length > 0) {
                 var stus = _.filter(stugroup, function (d) {
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

     $scope.loaddata = function () {
         getDataSource.getDataSource(["getAllStu", "getXZ", "getZW", "getBZR", "getZDLS", "getSBLD"], { classid: $rootScope.user.classid }, function (data) {
             //console.log(data);
             $scope.dataStu = _.find(data, function (d) {
                 return d.name == "getAllStu";
             }).data;
             $scope.dataXZ = _.find(data, function (d) {
                 return d.name == "getXZ";
             }).data;
             $scope.dataZW = _.find(data, function (d) {
                 return d.name == "getZW";
             }).data;
             $scope.dataBZR = _.find(data, function (d) {
                 return d.name == "getBZR";
             }).data;
             $scope.dataZDLS = _.find(data, function (d) {
                 return d.name == "getZDLS";
             }).data;
             $scope.dataSBLD = _.find(data, function (d) {
                 return d.name == "getSBLD";
             }).data;

         });
     }();

 })
 .controller("teacherController", function ($scope, $state, $rootScope, $ionicModal, $stateParams, getDataSource, userHelp) {

     /**************通讯层调用Start****************/
     $scope.addressUser = {};//点击弹出联系人的信息

     //下载oa用户管理里面的人员照片
     $scope.downLoadUrl = "../backHTML/userphoto.aspx?userid=";


     $ionicModal.fromTemplateUrl("../templates/addresslistInfo.html", {
         scope: $scope,
         animation: "slide-in-up"
     }).then(function (modal) {
         $scope.modal = modal;
     });

     $scope.openModal = function (e) {
         // console.log(e.info_id + "====" + e.classid);
         //用户默认图片
         $scope.userdefault = "../staticresource/userphoto/userdefault.svg";
         if (e.id != $rootScope.user.info_id) {
             getDataSource.getDataSource("getAddressUser", { classid: $rootScope.user.classid, userid: e.id }, function (data) {
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

     $scope.closeModal = function () {
         $scope.modal.hide();
     };

     //Cleanup the modal when we are done with it!
     $scope.$on("$destroy", function () {
         $scope.modal.remove();
     });
     // Execute action on hide modal
     $scope.$on("modal.hidden", function () {
         // Execute action
     });
     // Execute action on remove modal
     $scope.$on("modal.removed", function () {
         // Execute action
     });
     $scope.goHref = function (index) {
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

     $scope.goUser = function () {
         $state.go("userinfo");
     }
     $scope.gosub = function (e) {

         $state.go("userinfo");
     }
     //默认小图标
     $scope.userdefaultpng = "../staticresource/userphoto/userdefaultpng.svg";

     //班主任
     $scope.dataBZR = [];
     //指导老师
     $scope.dataZDLS = [];
     //随班领导
     $scope.dataSBLD = [];

     $scope.loaddata = function () {
         var postdata = ["getBZR", "getZDLS", "getSBLD"];
         getDataSource.getDataSource(postdata, { classid: $rootScope.user.classid }, function (data) {
             if ($stateParams.showteacher != null && $stateParams.showteacher != undefined) {
                 if ($stateParams.showteacher == 1) {
                     $scope.dataBZR = data[0].data;
                     $scope.dataZDLS = data[1].data;
                 } else if ($stateParams.showteacher == 2) {
                     $scope.dataSBLD = data[2].data;
                 } else {
                     $scope.dataBZR = data[0].data;
                     $scope.dataZDLS = data[1].data;
                     $scope.dataSBLD = data[2].data;
                 }
             } else {
                 $scope.dataBZR = data[0].data;
                 $scope.dataZDLS = data[1].data;
                 $scope.dataSBLD = data[2].data;
             }
         });
     }();

 })
.controller("mainController", function ($http, $scope, $ionicPopup, $timeout, $state, getDataSource, $ionicSideMenuDelegate, $ionicSlideBoxDelegate, $rootScope, $ionicModal, userHelp, calcStar, $filter, showAlert) {
    getDataSource.getDataSource("doLogServer", { content: "首页" }, function () { });
    $scope.KCList = new Array();
    $scope.ggList = new Array();
    //获取所有需要数字的图标,$scope.iconArray数组中的所有key必须跟上面需要显示数字的keyname值一一对应，
    //并且跟获取数据库的sql的key也相同
    //var iconvalArray = [];

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
    //$scope.iconvalArray = $rootScope.iconvalArray;
    //$scope.$watch("iconvalArray", function (value) {
    //    console.log(value.length);
    //})
    var user = $rootScope.user;
    $scope.loadData = function () {
        getDataSource.getDataSource(["Get_XYXXByInfoId", "Get_KCListInfoByDateNew", "getMainGG", "getMainReader", "getTeacherClass", "get_main_xxkCount", "Get_NewCountByNewTime", "GetXYKCPJCode", "getQuestionCount", "getBjxxByid", "getKqNum"],
        {
            todaydate: new Date(),
            info_id: user.info_id,
            bcid: user.classid,
            xyid: user.info_id,
            userid: user.info_id,
            classid: user.classid,
            userid_q: user.info_id.toString(),
            //classid_q: user.classid.toString(), //TODO chenb
            type: 1
        }, function (data) {
            if (user.type == "student") {
                $rootScope.userInfo = _.find(data, function (d) {
                    return d.name == "Get_XYXXByInfoId";
                }).data[0];
                $rootScope.userInfo.starArr = [];
                calcStar.getStar($rootScope.userInfo);
                //班级通讯录密码
                $scope.bjxx = _.find(data, function (d) {
                    return d.name == "getBjxxByid";
                }).data;
                if ($scope.bjxx.length > 0) {
                    if ($scope.bjxx[0].bjxxpsd == "") {
                        $rootScope.user.bjxxpsd = null;
                    }
                }
                else {
                    $rootScope.user.bjxxpsd = null;
                }
            }
            //课程列表
            $scope.KCList = _.find(data, function (d) {
                return d.name == "Get_KCListInfoByDateNew";
            }).data;
            //公告列表
            $scope.ggList = _.find(data, function (d) {
                return d.name == "getMainGG";
            }).data;
            //未读公告条数
            $scope.numUnReader = _.find(data, function (d) {
                return d.name == "getMainReader";
            }).data.length;
            $scope.updateIconArray("numUnReader", $scope.numUnReader);
            //$rootScope.iconvalArray.push({ key: "numUnReader", val: $scope.numUnReader });
            //签到
            $scope.kqnum = _.find(data, function (d) {
                return d.name == "getKqNum";
            }).data;
            $scope.updateIconArray("kqNum", $scope.kqnum[0].topnum);
            //班部老师
            $scope.bclist = _.find(data, function (d) {
                return d.name == "getTeacherClass";
            }).data;
            //已无待答卷      "getQuestionCount",
            var kssj = $filter('date')(user.kssj, 'yyyy-MM-dd');
            var jssj = $filter('date')(user.jssj, 'yyyy-MM-dd');
            $scope.ddjNumber = _.find(data, function (d) {
                return d.name == "getQuestionCount";
            }).data;
            $scope.dataDcwjSource = [];
            var date = $filter('date')(new Date(), 'yyyy-MM-dd');

            _.forEach($scope.ddjNumber, function (m, key) {
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
            $scope.updateIconArray("studentcount", $scope.dataDcwjSource.length);

            //未选选修课数量
            $scope.xxkNumber = _.find(data, function (d) {
                return d.name == "get_main_xxkCount";
            }).data[0].xxk;
            $scope.updateIconArray("xxkNumber", $scope.xxkNumber);
            //$rootScope.iconvalArray.push({ key: "xxkNumber", val: $scope.xxkNumber });

            //问题数量
            $scope.myQuestionCount = _.find(data, function (d) {
                return d.name == "Get_NewCountByNewTime";
            }).data[0].newcount;
            $scope.updateIconArray("myQuestionCount", $scope.myQuestionCount);
            //$rootScope.iconvalArray.push({ key: "myQuestionCount", val: 5 });

            //评价版本
            $scope.pjcode = _.find(data, function (d) {
                return d.name == "GetXYKCPJCode";
            }).data[0].pjcode;

            //获取未评价课程数量
            getDataSource.getDataSource(["GetXYPJKCList", "GetOtherPJ"], { bcid: user.classid, xyinfoid: user.info_id, pjcode: $scope.pjcode }, function (data) {
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
                }
                else {
                    xsfSplashscreen.hide();
                }

                //userHelp.getChatNumber();
            });
        });
    }
    $scope.loadData();

    $scope.doRefresh = function () {
        //userHelp.getChatNumber();
        $scope.loadData();
        $scope.$broadcast("scroll.refreshComplete");
    };
    //$scope.wpnum = 0;
    //$scope.LoadPJKCListData = function () {
    //    var user = $rootScope.user;
    //    getDataSource.getDataSource(["GetXYKCPJCode"], { bcid: user.classid }, function (data) {
    //        $scope.pjcode = data[0].pjcode;
    //        //评价查询
    //        getDataSource.getDataSource(["GetXYPJKCList", "GetOtherPJ"], { bcid: user.classid, xyinfoid: user.info_id, pjcode: $scope.pjcode }, function (data) {
    //            //课程评价未评
    //            $scope.PJKCList = _.filter(_.find(data, { name: "GetXYPJKCList" }).data, { yp: 0 });
    //            //课程评价已评
    //            $scope.OtherWPPJList = _.filter(_.find(data, { name: "GetOtherPJ" }).data, { yp: 0 });
    //            $scope.wpnum = $scope.PJKCList.length + $scope.OtherWPPJList.length;
    //        });
    //    });
    //}();

    $scope.checked = function (item) {
        $rootScope.user.classname = item.bt;
        $rootScope.user.classid = item.classid;
        localStorage.user = JSON.stringify($rootScope.user);
        $scope.modal.hide();
        $state.reload();
    }
    $scope.selectbc = function () {
        if ($rootScope.user.type == "student") {
            return;
        }
        $ionicModal.fromTemplateUrl('../templates/selectbc.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });

        $scope.displayProp = function () {
            $state.reload();
            $scope.modal.hide();
        };
    }
    $scope.godj = function () {
        $state.go("dcwjStudent", { type: 1 });
    }
    $scope.gokb = function () {
        getDataSource.getDataSource("doLogServer", { content: "课程表" }, function () { });
        $state.go("app.kbcx");
    }
    $scope.gopj = function () {
        if ($rootScope.user.type == "student") {
            $state.go("stuappraise");
        }
        else {
            $state.go("teachappraise");
        }
    }
    $scope.OpenKCDetail = function (kcobj) {
        $state.go("KCDetail", { info_id: kcobj.info_id });
    }
    $scope.goGGList = function () {
        getDataSource.getDataSource("doLogServer", { content: "通知公告" }, function () { });
        $state.go("notice");
    }
    $scope.gogg = function (item) {
        item.hasreader = 1;
        $state.go("noticedetail", { ggid: item.id })
    }
    $scope.changePsd = function (role) {
        var funName = "";
        $scope.data = {}
        // 第一次设置密码，不出现原密码
        if ($rootScope.user.bjxxpsd == null) {
            $scope.changeTemplate = '请输入密码<input type="password" ng-model="data.wifi"><br/>请再次输入密码<input type="password" ng-model="data.wifiAgain">';
        }
        else {
            $scope.changeTemplate = '请输入原密码<input type="password" ng-model="data.oldpsd"><br/>请输入新密码<input type="password" ng-model="data.wifi"><br/>请再次输入密码<input type="password" ng-model="data.wifiAgain">';
        }

        // 一个精心制作的自定义弹窗
        var teacherPopup = $ionicPopup.show({
            template: $scope.changeTemplate,
            title: '更改班级密码',
            subTitle: '由四位数字组成',
            scope: $scope,
            buttons: [
              { text: '取消' },
              {
                  text: '<b>确定</b>',
                  type: 'button-positive',
                  onTap: function (e) {
                      if ($rootScope.user.bjxxpsd != $scope.data.oldpsd) {
                          alert("您输入的原密码不正确，请重新输入");
                          e.preventDefault();
                      }
                      else if ($scope.data.wifi != $scope.data.wifiAgain) {
                          alert("您再次输入的密码不匹配，请重新输入");
                          //不允许用户关闭，除非他键入wifi密码
                          e.preventDefault();
                      } else {
                          if (role == 1)
                          { funName = "updateTeachinfo"; }
                          else
                          { funName = "updateXYinfo"; }
                          // 更新数据库的班级信息密码
                          getDataSource.getDataSource(funName, { info_id: $rootScope.user.info_id, bcpsd: $scope.data.wifi }, function (data) {
                              $rootScope.user.bjxxpsd = $scope.data.wifi;
                              return $scope.data.wifi;
                          });
                      }
                  }
              },
            ]
        });
        teacherPopup.then(function (res) {
            console.log('Tapped!', res);
        });
    }
    // 触发一个按钮点击，或一些其他目标
    $scope.showPopup = function (userRole) {
        $scope.data = {}

        if ($rootScope.user.bjxxpsd == null) {
            //$scope.loadTemplate = '<input type="password" ng-model="data.wifi"><br/><a style="text-decoration:underline;" ng-click="changePsd(2);">设置密码</a>';
            $scope.loadTemplate = '请输入密码<input type="password" ng-model="data.wifi"><br/>请再次输入密码<input type="password" ng-model="data.wifiAgain">';
            $scope.showTipTitle = '为保证班级信息安全，请设置密码';
        }
        else {
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
              { text: '取消' },
              {
                  text: '<b>确定</b>',
                  type: 'button-positive',
                  onTap: function (e) {
                      if ($rootScope.user.bjxxpsd == null) {
                          if (isNaN($scope.data.wifi) || isNaN($scope.data.wifiAgain)) {
                              showAlert.showToast("班级密码由四位数字组成，请重新输入");
                              //e.preventDefault();
                          }
                          else if ($scope.data.wifi.length != 4 || $scope.data.wifiAgain.length != 4) {
                              showAlert.showToast("班级密码由四位数字组成，请重新输入");
                              //e.preventDefault();
                          }
                          else if ($scope.data.wifi != $scope.data.wifiAgain) {
                              showAlert.showToast("您再次输入的密码不匹配，请重新输入");
                              //不允许用户关闭，除非他键入wifi密码
                              //e.preventDefault();
                          }
                          else {
                              if ($rootScope.user.type == "student")
                              { funName = "updateXYinfo"; }
                              else
                              { funName = "updateTeachinfo"; }
                              // 更新数据库的班级信息密码
                              getDataSource.getDataSource(funName, { info_id: $rootScope.user.info_id, bcpsd: $scope.data.wifi }, function (data) {
                                  $rootScope.user.bjxxpsd = $scope.data.wifi;
                                  localStorage.user = JSON.stringify($rootScope.user);
                                  $state.go("studentgroup");
                              })
                          }
                      }
                      else if ($scope.data.wifi != $rootScope.user.bjxxpsd) {
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
        }).then(function (res) {
            console.log('Tapped!', res);
        });
        //$timeout(function () {
        //    myPopup.close(); //由于某种原因3秒后关闭弹出
        //}, 3000);
    };
    $scope.gosub = function (e) {
        getDataSource.getDataSource("doLogServer", { content: e.title }, function () { });
        if (e.withpara == true) {
            //移动教学跳转
            $state.go(e.url, { type: e.title });
        } else if (e.url == "group") {
            userHelp.openChatList(0, '班级交流')

        }
        else if (e.url == "dcwjStudent") {
            //userHelp.myNeeds();
            $state.go(e.url, { type: 1 });
        }
        else if (e.url == "dcwjTeacher") {
            //userHelp.openChatList(1, '班级需求')
            $state.go(e.url, { type: 1 });
        }
        else if (e.url == "studentgroup") {
            $scope.showPopup(e.icontype);
        }
        else if (e.url == "ydjxzjlist") {
            $state.go("ydjxzjlist", { menuid: e.menuid });
        }
        else {
            if (e.type != "" && e.type != null && e.type != undefined) {
                $state.go(e.url, { type: e.type });
            } else {
                $state.go(e.url);
            }
        }
    }


    //加载首页轮播图标开始
    $scope.datameSource = [];
    $http.get("../config/mainmenus.json").then(function (data) {
        var mainpages = _.filter(data.data, function (d) {
            return d.icontype == $rootScope.user.type || d.icontype == "all";
        });
        // 添加教工版返回按钮
        var jspage = _.filter(data.data, function (d) {
            return d.icontype == "lt";
        });
        if ($rootScope.user.formJS && jspage.length > 0) {
            mainpages.push(jspage[0]);
        }

        var pages = (mainpages.length % 9) > 0 ? parseInt(mainpages.length / 9) + 1 : parseInt(mainpages.length / 9);//一页可以放9个，计算总共有几页

        for (var i = 0; i < pages; i++) {
            //初始化datapage数据格式
            var dataPage = {
                "index": i, "data": [
                    {
                        "data": []
                    },
                    {
                        "data": []
                    },
                    {
                        "data": []
                    }]
            };
            $scope.datameSource.push(dataPage);
        }
        var pageIndex = 0;
        var rowIndex = 0;
        var dataRowIndex = 0;
        _.forEach(mainpages, function (m, key) {
            if (pageIndex != parseInt(key / 9)) {
                pageIndex = parseInt(key / 9);
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
    });
    //加载首页轮播图标结束

    //$scope.datameSource = [
    //    {
    //        index: "1", data: [
    //                {
    //                    row: "1", data: [//第一行
    //                        { image: "../staticresource/xqxq.png", title: "我的需求", url: "dcwjStudent", showicon: true, keyname: "studentcount", activecount: 0, icontype: "student" },
    //                        { image: "../staticresource/xqxq.png", title: "班级需求", url: "dcwjTeacher", showicon: true, keyname: "teachertcount", activecount: 0, icontype: "teacher" },
    //                        { image: "../staticresource/xztw.png", title: "现场提问", url: "ntraining", showicon: true, keyname: "myQuestionCount", activecount: 0, icontype: "all" },
    //                        { image: "../staticresource/bwfz.png", title: "学员活跃度", url: "teachactivity", showicon: false, keyname: "", activecount: 0, icontype: "teacher" },
    //                        { image: "../staticresource/jxzl.png", title: "教学资料", url: "jxzl", showicon: false, keyname: "", activecount: 0, icontype: "student" }
    //                    ]
    //                },
    //                 {
    //                     row: "2", data: [
    //                         { image: "../staticresource/kbcx.png", title: "课表查询", url: "app.kbcx", showicon: false, keyname: "", activecount: 0, icontype: "all" },
    //                         { image: "../staticresource/jxpj.png", title: "教学评价", url: "stuappraise", showicon: true, keyname: "wpnum", activecount: 0, icontype: "student" },
    //                         { image: "../staticresource/jxpj.png", title: "评价管理", url: "teachappraise", showicon: false, keyname: "", activecount: 0, icontype: "teacher" },
    //                         { image: "../staticresource/xxbm.png", title: "选修管理", url: "choosemanage", showicon: false, keyname: "", activecount: 0, icontype: "teacher" },
    //                         { image: "../staticresource/xxbm.png", title: "选修报名", url: "chooseclass", showicon: true, keyname: "xxkNumber", activecount: 0, icontype: "student" }
    //                     ]
    //                 },
    //                  {
    //                      row: "3", data: [
    //                          { image: "../staticresource/bjxx.png", title: "班级信息", url: "studentgroup", showicon: false, keyname: "", activecount: 0, icontype: "all" },
    //                          { image: "../staticresource/bjjl.png", title: "班级交流", url: "group", showicon: true, keyname: "myclasscount", activecount: 0, icontype: "all" },
    //                          { image: "../staticresource/jxzl.png", title: "教学资料", url: "jxzl", showicon: false, keyname: "", activecount: 0, icontype: "teacher" },
    //                          { image: "../staticresource/bdxz.png", title: "学员须知", url: "guidelineCollege", showicon: false, keyname: "", activecount: 0, icontype: "student" }
    //                      ]
    //                  }
    //        ]
    //    },
    //    {
    //        index: "2", data: [
    //                {
    //                    row: "1", data: [//第一行
    //                        { image: "../staticresource/zpyw.png", title: "中浦要闻", url: "zpNewsList", withpara: true, showicon: false, keyname: "", activecount: 0, icontype: "all" },
    //                        { image: "../staticresource/wjz.png", title: "微讲座", url: "ydjxList", withpara: true, showicon: false, keyname: "", activecount: 0, icontype: "all" },
    //                        { image: "../staticresource/wsp.png", title: "微视频", url: "ydjxList", withpara: true, showicon: false, keyname: "", activecount: 0, icontype: "all" }
    //                    ]
    //                },
    //                 {
    //                     row: "2", data: [
    //                       { image: "../staticresource/wal.png", title: "微案例", url: "zpNewsList", withpara: true, showicon: false, keyname: "", activecount: 0, icontype: "all" },
    //                       { image: "../staticresource/wxc.png", title: "微现场", url: "zpNewsList", withpara: true, showicon: false, keyname: "", activecount: 0, icontype: "all" },
    //                       { image: "../staticresource/wlt.png", title: "微论坛", url: "zpNewsList", withpara: true, showicon: false, keyname: "", activecount: 0, icontype: "all" }
    //                     ]
    //                 },
    //                  {
    //                      row: "3", data: [
    //                          { image: "../staticresource/xxsk.png", title: "学“习”思考", url: "ydjxList", withpara: true, showicon: false, keyname: "", activecount: 0, icontype: "all" },
    //                          { image: "../staticresource/dxjygs.png", title: "党性教育故事", url: "ydjxList", withpara: true, showicon: false, keyname: "", activecount: 0, icontype: "all" },
    //                          { image: "../staticresource/kgkfs.png", title: "改革开放史", url: "zpNewsList", withpara: true, showicon: false, keyname: "", activecount: 0, icontype: "all" }
    //                      ]
    //                  }
    //        ]
    //    },
    //    {
    //        index: "3", data: [
    //                {
    //                    row: "1", data: [//第一行
    //                        { image: "../staticresource/lzdd.png", title: "论著导读", url: "zpNewsList", withpara: true, showicon: false, keyname: "", activecount: 0, icontype: "all" },
    //                        { image: "../staticresource/xxts.png", title: "信息推送", url: "zpNewsList", withpara: true, showicon: false, keyname: "", activecount: 0, icontype: "all" },
    //                        { image: "../staticresource/gkk.png", title: "公开课", url: "ydjxList", withpara: true, showicon: false, keyname: "", activecount: 0, icontype: "all" }
    //                    ]
    //                },
    //                 {
    //                     row: "2", data: [
    //                          //{ image: "../staticresource/wlxy.png", title: "网络学院", url: "ydjxList", withpara: true, showicon: false, keyname: "", activecount: 0, icontype: "all" },
    //                          { image: "../staticresource/zbjt.png", title: "直播课堂", url: "ydjxList", withpara: true, showicon: false, keyname: "", activecount: 0, icontype: "all" },
    //                            { image: "../content/hotline.png", title: "服务热线", url: "serviceHotline", showicon: false, keyname: "", activecount: 0, icontype: "all" }
    //                     ]
    //                 }
    //        ]
    //    }

    //];


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
 .controller("chooseclassController", function ($scope, $state, $rootScope, $ionicModal, $ionicPopup, $filter, $ionicScrollDelegate, getDataSource) {

     //减去首页角标的方法
     // _.find($rootScope.iconvalArray, function (d) {
     //     return d.key == "wpnum";
     //}).val--;
     $scope.undisplay = false;//控制显示有无数据的提示
     $scope.unchoosed = "(0)";
     $scope.choosed = "(0)";
     $scope.hasZJlist = $rootScope.AppConfig.hasZJlist;
     $scope.loaddata = function () {
         $scope.dataSource = [];

         //学员选修数量
         $scope.dataCount = 0;

         //console.log($rootScope.user.classid);
         getDataSource.getDataSource(["getXXKChoose", "getXXKStu"], { bcid: $rootScope.user.classid, classid: $rootScope.user.classid, xyid: $rootScope.user.info_id }, function (data) {
             //console.log(data);
             if (data != null) {
                 var getXXK = _.find(data, function (d) {
                     return d.name == "getXXKChoose";
                 }).data;
                 var getXXKStu = _.find(data, function (d) {
                     return d.name == "getXXKStu";
                 }).data;

                 _.forEach(getXXK, function (n, key) {
                     //console.log();
                     var kssj = $filter('date')(n.kssj, 'MM月dd日 HH:mm');//格式化日期
                     //父课
                     var xxkData = {
                         time: kssj, info_id: n.fkw_id, show: true, data: []
                     };
                     //子课
                     var xxk = { name: n.bt, info_id: n.info_id, fkw_id: n.fkw_id, teacher: n.zjr, checked: false, disabled: false };
                     if (n.rsxz <= n.rs) {
                         xxk.mark = "已满";
                         xxk.disabled = true;
                     }
                     //判断当前学员是否选择该课程
                     _.forEach(getXXKStu, function (m, key) {
                         if (m.fkcinfo_id == n.fkw_id) {
                             xxkData.show = false;
                             if (m.kcinfo_id == n.info_id) {
                                 $scope.dataCount++;
                                 xxk.checked = true;
                                 xxk.disabled = true;
                             }
                         }
                     });

                     var rowdate = _.find($scope.dataSource, { info_id: n.fkw_id });
                     if (rowdate != undefined && rowdate != null) {
                         rowdate.data.push(xxk);
                     } else {
                         xxkData.data.push(xxk);
                         $scope.dataSource.push(xxkData);
                     }

                 });
             }
             if ($scope.dataCount == $scope.dataSource.length) {
                 $scope.undisplay = true;
             }
             if ($scope.dataCount > 0) {
                 $scope.choosed = "(" + $scope.dataCount + ")";
             }
             if ($scope.dataCount < $scope.dataSource.length) {
                 $scope.unchoosed = "(" + ($scope.dataSource.length - $scope.dataCount) + ")";
             }

         });
     }();

     $scope.changecount = 0;//用于监听使用的变量
     $scope.$watch("changecount", function (value) {
         if (value != 0) {
             $scope.unchoosed = "(0)";
             $scope.choosed = "(0)";
             if ($scope.dataCount == $scope.dataSource.length) {
                 $scope.undisplay = true;
             }
             if ($scope.dataCount > 0) {
                 $scope.choosed = "(" + $scope.dataCount + ")";
             }
             if ($scope.dataCount < $scope.dataSource.length) {
                 $scope.unchoosed = "(" + ($scope.dataSource.length - $scope.dataCount) + ")";
             }
         }
     });

     //选择事件，因为是复选框所以做特殊处理，无法取消选中的操作
     $scope.changeCheck = function (e1, e2) {
         _.forEach(e1.data, function (n, key) {
             if (n.info_id != e2.info_id) {
                 n.checked = false;
             } else {
                 e2.checked = true;
             }
         });
     }

     //提交选学操作
     $scope.subchoose = function () {
         $scope.chooseList = [];//已选课程列表

         $scope.chooseParentList = [];//已选课程父节点列表

         _.forEach($scope.dataSource, function (n, key) {
             if (n.show) {
                 _.forEach(n.data, function (m, key) {
                     if (m.checked) {
                         $scope.chooseList.push(m);
                         $scope.chooseParentList.push(n);
                     }
                 });
             }
         });
         if ($scope.chooseList.length == 0) {
             $scope.showAlert();
         } else {
             $scope.showConfirm();
         }
     }
     // 确认弹出框
     $scope.showConfirm = function () {
         $ionicPopup.confirm({
             okType: "button-assertive",
             okText: "确定",
             cancelText: "取消",
             title: "提示",
             template: "<div style='text-align:center;'>提交不可修改，确定要提交吗？</b>"
         })
         .then(function (res) {
             if (res) {
                 //已选学课程入库操作
                 _.forEach($scope.chooseList, function (m, key) {
                     if (m.checked) {
                         $scope.dataCount++;
                         m.disabled = true;
                         getDataSource.getDataSource("insertXXK", { fkid: m.fkw_id, info_id: m.info_id, classid: $rootScope.user.classid, xyid: $rootScope.user.info_id }, function (data) {
                             _.find($rootScope.iconvalArray, function (d) {
                                 return d.key == "xxkNumber";
                             }).val--;
                         });
                     }
                 });

                 $scope.changecount++;//用于监听使用的变量++
                 $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();//滚动条自动回到顶部

                 //设置已选课程列表不可再次选择
                 _.forEach($scope.chooseParentList, function (m, key) {
                     m.show = false;
                     _.forEach(m.data, function (n, key) {
                         n.disabled = true;
                     });
                 });

             } else {
                 //取消不做任何操作
             }
         });
     };
     //警告弹出框
     $scope.showAlert = function () {
         $ionicPopup.alert({
             okType: "button-assertive",
             okText: "确定",
             title: "提示",
             template: "请选择一门选修课！"
         })
         .then(function (res) {

         });
     };


 })
 .controller("choosemanageController", function ($scope, $state, $rootScope, $ionicModal, $filter, getDataSource) {
     $scope.unshow = false;
     $scope.gokcdetail = function (kcobj) {
         $state.go("KCDetail", { info_id: kcobj.info_id });
     }

     $scope.openStu = function (type, id) {
         $state.go("choosestudentlist", { type: type, id: id });
     }
     $scope.loaddata = function () {
         $scope.dataSource = [];
         getDataSource.getDataSource(["getXXK", "getXXKStu"], { bcid: $rootScope.user.classid, classid: $rootScope.user.classid, xyid: $rootScope.user.info_id }, function (data) {
             if (data != null) {
                 var getXXK = _.find(data, function (d) {
                     return d.name == "getXXK";
                 }).data;
                 var getXXKStu = _.find(data, function (d) {
                     return d.name == "getXXKStu";
                 }).data;
                 _.forEach(getXXK, function (n, key) {
                     var kssj = $filter('date')(n.kssj, 'MM月dd日 HH:mm');//格式化日期
                     //父课
                     var xxkData = {
                         time: kssj, info_id: n.fkw_id, show: true, wx: 0, yx: 0, data: []
                     };
                     //子课
                     var xxk = { name: n.bt, info_id: n.info_id, fkw_id: n.fkw_id, teacher: n.zjr, checked: false, disabled: false };
                     if (n.rsxz <= n.rs) {
                         xxk.mark = "已满";
                         xxk.disabled = true;
                     }
                     //判断当前学员是否选择该课程
                     _.forEach(getXXKStu, function (m, key) {
                         if (m.fkcinfo_id == n.fkw_id) {
                             xxkData.show = false;
                             if (m.kcinfo_id == n.info_id) {
                                 xxk.checked = true;
                                 xxk.disabled = true;
                             }
                         }
                     });

                     var rowdate = _.find($scope.dataSource, { info_id: n.fkw_id });
                     if (rowdate != undefined && rowdate != null) {
                         rowdate.yx += n.rs;
                         rowdate.wx = n.allrs - rowdate.yx;
                         rowdate.data.push(xxk);
                     } else {
                         xxkData.yx += n.rs;
                         xxkData.wx = n.allrs - xxkData.yx;
                         xxkData.data.push(xxk);
                         $scope.dataSource.push(xxkData);
                     }

                 });
                 if ($scope.dataSource.length == 0) {
                     $scope.unshow = true;
                 }
             }

         });
     }();


 })
 .controller("choosestudentlistController", function ($scope, $state, $ionicHistory, $rootScope, $ionicModal, $stateParams, getDataSource, userHelp) {
     $scope.goBack = function () {
         $ionicHistory.goBack();
     }
     $scope.unshow = false;

     $scope.checkShow = function () {
         if ($scope.dataStu.length == 0) {
             $scope.unshow = true;
         }
     }

     /**************通讯层调用Start****************/
     $scope.addressUser = {};//点击弹出联系人的信息

     //下载oa用户管理里面的人员照片
     $scope.downLoadUrl = "../backHTML/userphoto.aspx?userid=";
     //$scope.ShowNoRecord = false;

     $ionicModal.fromTemplateUrl("../templates/addresslistInfo.html", {
         scope: $scope,
         animation: "slide-in-up"
     }).then(function (modal) {
         $scope.modal = modal;
     });

     $scope.openModal = function (e) {
         // console.log(e.info_id + "====" + e.classid);
         //用户默认图片
         $scope.userdefault = "../staticresource/userphoto/userdefault.svg";
         if (e.id != $rootScope.user.info_id) {
             getDataSource.getDataSource("getAddressUser", { classid: $rootScope.user.classid, userid: e.id }, function (data) {

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

     $scope.closeModal = function () {
         $scope.modal.hide();
     };

     //Cleanup the modal when we are done with it!
     $scope.$on("$destroy", function () {
         $scope.modal.remove();
     });
     // Execute action on hide modal
     $scope.$on("modal.hidden", function () {
         // Execute action
     });
     // Execute action on remove modal
     $scope.$on("modal.removed", function () {
         // Execute action
     });
     $scope.goHref = function (index) {
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

     $scope.goUser = function () {
         $state.go("userinfo");
     }
     $scope.gosub = function (e) {
         $state.go("userinfo");
     }
     //默认小图标
     $scope.userdefaultpng = "../staticresource/userphoto/userdefaultpng.svg";

     //学员
     $scope.dataStu = [];

     $scope.loaddata = function () {
         var type = $stateParams.type;
         if ($stateParams.type == 1) {
             $scope.typename = "已选学员名单";
             getDataSource.getDataSource("getChoose", { kcid: $stateParams.id, classid: $rootScope.user.classid }, function (data) {
                 $scope.dataStu = data;
                 $scope.checkShow();
             });
         }
         else if (type >= 9 && type <= 12) {
             //9,总体评鉴未评10 总体评价已评,11班主任评价未评，12 班主任评价已评,13 课程评价
             var user = $scope.user;
             var pjtype = "";
             if (type == 10 || type == 9) {
                 pjtype = "总体评价"
             } else if (type == 11 || type == 12) {
                 pjtype = "班主任评价"
             }
             if (type == 9 || type == 11) {
                 $scope.typename = "未评学员名单";
             } else if (type == 10 || type == 12) {
                 $scope.typename = "已评学员名单";
             }
             getDataSource.getDataSource(["GetXYKCPJCode"], { bcid: user.classid }, function (data) {
                 $scope.pjcode = data[0].pjcode;
                 var keystr = "GetWPXYRSByPJType"
                 if (type == 10 || type == 12) {
                     keystr = "GetYPXYRSByPJType";
                 }
                 getDataSource.getDataSource([keystr], { bcid: user.classid, pjtype: pjtype, pjcode: $scope.pjcode }, function (data) {
                     $scope.dataStu = data;
                     $scope.checkShow();
                 });
             });
         } else if (type == 13 || type == 14) {
             var user = $scope.user;
             var pjtype = "课程评价";
             if (type == 13) {
                 $scope.typename = "未评学员名单";
             } else if (type == 14) {
                 $scope.typename = "已评学员名单";
             }
             getDataSource.getDataSource(["GetXYKCPJCode"], { bcid: user.classid }, function (data) {
                 $scope.pjcode = data[0].pjcode;
                 var keystr = "GetYPXYRSByPJTypeAndKCID"
                 if (type == 13) {
                     keystr = "GetWPXYRSByPJTypeAndKCID"
                 }
                 getDataSource.getDataSource([keystr], { bcid: user.classid, pjtype: pjtype, pjcode: $scope.pjcode, kwid: $stateParams.id }, function (data) {
                     $scope.dataStu = data;
                     $scope.checkShow();
                 });
             });
         } else if (type == 15) {
             $scope.typename = "未提交学员名单";
             getDataSource.getDataSource("getAnswerQuestion", { cid: $rootScope.user.classid, qid: $stateParams.id }, function (data) {
                 $scope.dataStu = data;
                 $scope.checkShow();
             });
         } else if (type == 16) {
             $scope.typename = "已提交学员名单";
             getDataSource.getDataSource("getHasAnswerQuestion", { cid: $rootScope.user.classid, qid: $stateParams.id }, function (data) {
                 $scope.dataStu = data;
                 $scope.checkShow();
             });
         }
         else {
             $scope.typename = "未选学员名单";
             getDataSource.getDataSource("getNoChoose", { kcid: $stateParams.id, classid: $rootScope.user.classid }, function (data) {
                 $scope.dataStu = data;
                 $scope.checkShow();
             });
         }
     }();

 })
 .controller("noticelistController", function ($scope, $state, $rootScope, $ionicHistory, $ionicModal, $ionicPopup, getDataSource, showAlert) {
     $scope.goback = function () {
         $ionicHistory.goBack();
     }
     $scope.undisplay = false;
     $scope.dataSource = [];
     //{ noticeid: "1", noticetitle: "我校哲学", releasetime: "2015-9-9 08:30", isread: "5" }, { noticeid: "2", noticetitle: "我校哲学111", releasetime: "2015-9-19 08:30", isread: null }, { noticeid: "3", noticetitle: "我校哲学2222", releasetime: "2015-9-29 08:30", isread: null }, { noticeid: "1", noticetitle: "我校哲学", releasetime: "2015-9-9 08:30", isread: "5" }, { noticeid: "2", noticetitle: "我校哲学111", releasetime: "2015-9-19 08:30", isread: null }, { noticeid: "3", noticetitle: "我校哲学2222", releasetime: "2015-9-29 08:30", isread: null }, { noticeid: "1", noticetitle: "我校哲学", releasetime: "2015-9-9 08:30", isread: "5" }, { noticeid: "2", noticetitle: "我校哲学111", releasetime: "2015-9-19 08:30", isread: null }, { noticeid: "3", noticetitle: "我校哲学2222", releasetime: "2015-9-29 08:30", isread: null }
     $scope.load = function () {
         var datakey = "getNotice";
         if ($rootScope.user.type == "student") {
             datakey = "getNoticeStudent";
         }
         getDataSource.getDataSource(datakey, { xyid: $rootScope.user.info_id, bcid: $rootScope.user.classid }, function (data) {
             $scope.dataSource = data;
             if ($scope.dataSource.length == 0) {
                 $scope.undisplay = true;
             }
         });
     }
     $scope.load();
     $ionicModal.fromTemplateUrl('addnotice', {
         scope: $scope,
         animation: 'slide-in-up'
     }).then(function (modal) {
         $scope.modal = modal;
     });
     $scope.openModal = function () {
         $scope.addnotice = { content: "", title: "", userid: $rootScope.user.info_id, ggid: "", bcid: $rootScope.user.classid };

         $scope.modal.show();
     };
     $scope.closeModal = function () {
         $scope.modal.hide();
     };
     //Cleanup the modal when we're done with it!
     $scope.$on('$destroy', function () {
         $scope.modal.remove();
     });
     // Execute action on hide modal
     $scope.$on('modal.hidden', function () {
         // Execute action
     });
     // Execute action on remove modal
     $scope.$on('modal.removed', function () {
         // Execute action
     });

     $scope.godetail = function (e) {
         $state.go("noticedetail", { ggid: e.noticeid });
     }

     $scope.addNewNotice = function () {
         if ($scope.addnotice.content == "" || $scope.addnotice.title == "") {
             showAlert.showToast("请补充完整公告内容");
         }
         else {
             getDataSource.getDataSource("getNoticeNum", {}, function (data) {
                 $scope.addnotice.ggid = data[0].nextval;
                 getDataSource.getDataSource(["addNotice", "addNotice2"], $scope.addnotice, function (data) {
                     $scope.closeModal();
                     $scope.load();
                 });
             });
         }
     }

     $scope.deletenotice = function (e) {
         // 确认弹出框
         $ionicPopup.confirm({
             okType: "button-assertive",
             okText: "确定",
             cancelText: "取消",
             title: "提示",
             template: "<div style='text-align:center;'>确定要删除吗？</b>"
         }).then(function (res) {
             if (res) {
                 getDataSource.getDataSource("delNotice", { ggid: e.noticeid }, function (data) {
                     _.remove($scope.dataSource, function (n) {
                         return n.noticeid == e.noticeid;
                     });
                 });
             } else {
                 //取消不做任何操作
             }
         });
     }

 })
 .controller("noticedetailController", function ($scope, $state, $rootScope, $ionicHistory, $stateParams, getDataSource) {
     $scope.goback = function () {
         $ionicHistory.goBack();
     }
     $scope.dataSource = {};
     $scope.load = function () {
         getDataSource.getDataSource(["getNotice", "getNoticeRead"], { ggid: $stateParams.ggid, xyid: $rootScope.user.info_id, bcid: $rootScope.user.classid }, function (data) {
             //console.log(data);
             var getNotice = _.find(data, function (d) {
                 return d.name == "getNotice";
             }).data;
             var getNoticeRead = _.find(data, function (d) {
                 return d.name == "getNoticeRead";
             }).data;
             $scope.dataSource = getNotice[0];
             if (getNoticeRead[0].total == 0) {
                 getDataSource.getDataSource("addNoticeRead", { ggid: $stateParams.ggid, xyid: $rootScope.user.info_id, bcid: $rootScope.user.classid }, function (data) {
                     _.find($rootScope.iconvalArray, function (d) {
                         return d.key == "numUnReader";
                     }).val--;
                 });
             }
         });
     }();

 })
 .controller("kclistController", function ($scope, $state, $rootScope, $ionicModal, $filter, getDataSource) {
     $scope.goAnswer = function (data) {
         $state.go("KCDetail", { "info_id": data.info_id });
     }

     $scope.dataSource = [];

     $scope.loaddata = function () {
         getDataSource.getDataSource("Get_KCListInfoByDate", { bcid: $rootScope.user.classid }, function (data) {
             //console.log(data);
             _.forEach(data, function (n, key) {
                 var dataRow = { time: "", data: [] };
                 var rowdate = _.find($scope.dataSource, { time: $filter('date')(n.kssj, 'yyyy-MM-dd') });
                 if (rowdate != undefined && rowdate != null) {
                     rowdate.data.push(n);
                 } else {
                     dataRow.time = $filter('date')(n.kssj, 'yyyy-MM-dd');
                     dataRow.data.push(n);
                     $scope.dataSource.push(dataRow);
                 }
             });
             //console.log($scope.dataSource);
         });
     }();
 })
.controller("welcomeController", function ($rootScope, $scope, $state, showAlert) {
    showAlert.hideLoading();
    //xsfSplashscreen.hide();
    $scope.goMain = function () {
        //if ($rootScope.formweixin) {
        //    $state.go("app.main");
        //}
        //else {
            $state.go("loginMobile");
        //}
    };
    $scope.slideHasChanged = function (index) {
        if (index == 2) {
            $scope.ishow = true;
        }
        else {
            $scope.ishow = false;
        }
    }
    if ($rootScope.formweixin) {
        showAlert.hideLoading();
    }
    else {
        document.addEventListener("deviceready", function () {
            xsfSplashscreen.hide();
        }, false);
    }
})
.controller("kbcxController", function ($scope, Restangular, $state, $ionicModal, $ionicHistory, $dateService, $rootScope, $ionicSlideBoxDelegate, $ionicScrollDelegate, getDataSource) {
    // 课表查询
    $scope.gokcdetail = function (e) {
        $state.go("KCDetail", { info_id: e.lessonid });
    }

    $scope.goback = function () {
        $ionicHistory.goBack();
    }
    //当前模式，默认周
    $scope.weekpage = true;
    //页面切换事件
    $scope.changePageView = function () {
        $scope.weekpage = !$scope.weekpage;
        $scope.styleString = $scope.weekpage ? parseInt($scope.styleString) + 81 : parseInt($scope.styleString) - 81;
        $(".week-timetable-content .scroll").removeAttr("style");
    };
    if ($rootScope.user == null) {
        $state.go("loginMobile");
        return;
    }
    var isIOS = ionic.Platform.isIOS();
    var isAndroid = ionic.Platform.isAndroid();
    $scope.styleString = "111";
    $scope.styleTopString = "74";
    if (isAndroid) {
        $scope.styleString = "111";
        $scope.styleTopString = "74";
    }
    if (isIOS) {
        //$scope.styleString = "95";
        $scope.styleTopString = "94";
    }

    $scope.isshowloading = true;
    // 日期转换
    $scope.parseDate = function (dataString) {
        if (dataString) {
            return $dateService.parse(dataString);
        }
        else {
            return "";
        }
    }
    $scope.titleYearMonth = $dateService.format(new Date(), "yyyy-mm");
    $scope.loadDatas = function () {
        //取出所有数据，包括服务器时间，开班开始时间和开班结束时间，所有课程
        getDataSource.getDataSource(["getKbNew", "getkbuser"], {
            USERID: $rootScope.user.info_id, CLASSID: $rootScope.user.classid, ONECARD: "2015090100313001"
        }, function (data) {
            if (data !== null) {
                if (data[1]) {
                    $scope.pj = data[1].data;
                    $scope.pjData = $scope.pj[0];
                    $scope.SYSDATE = $scope.pjData.sys_date;
                    $scope.sysdate = new Date($scope.pjData.systime);//系统时间
                    $scope.today = $scope.pjData.systime;//今日
                    $scope.activeDate = $scope.today;//当前选中日期
                    $scope.titleYearMonth = $dateService.format($scope.sysdate, "yyyy-mm");//选中日期的月份
                    $scope.old_startdate = new Date($scope.pjData.classbegin);
                    $scope.old_enddate = new Date($scope.pjData.classend);
                    //根据开班开始时间的周几通过开班开始时间减去开始时间的周几索引（0-6）为新的开班开始时间
                    $scope.startdate = new Date($scope.old_startdate.getTime() - ($scope.old_startdate.getDay() * 24 * 60 * 60 * 1000));
                    //根据开班结束时间的周几通过开班结束时间加上结束时间的周几索引（6减去0-6）为新的开班结束时间
                    $scope.enddate = new Date($scope.old_enddate.getTime() + ((6 - $scope.old_enddate.getDay()) * 24 * 60 * 60 * 1000));
                    //
                    $scope.slideNum = (($scope.enddate.getTime() - $scope.startdate.getTime()) / 1000 / 60 / 60 / 24 + 1) / 7;
                }
                //重新组织JSON格式：

                //周日历
                var eachList = [
                    {
                        ym1: '2014-12',
                        ym2: '2015-01',//跨月只能一个月
                        index: 0,
                        solarData: [
                            {
                                date: '2014-12-31', day: 31, ym: '2014-12'
                            },
                            {
                                date: '2015-01-01', day: 1
                            },
                            {
                                date: '2015-01-02', day: 2
                            },
                            {
                                date: '2015-01-03', day: 3
                            },
                            {
                                date: '2015-01-04', day: 4
                            },
                            {
                                date: '2015-01-05', day: 5
                            },
                            { date: '2015-01-06', day: 6 }
                        ],
                        lunarData: [
                            {
                                date: '2014-12-31', day: "三十", data: [{ title: "" }, { title: "" }], ym: '2014-12'
                            },
                            {
                                date: '2015-01-01', day: "初一", data: []
                            },
                            {
                                date: '2015-01-02', day: "初二", data: []
                            },
                            {
                                date: '2015-01-03', day: "初三", data: []
                            },
                            {
                                date: '2015-01-04', day: "初四", data: []
                            },
                            {
                                date: '2015-01-05', day: "初五", data: [{ title: "" }, { title: "" }]
                            },
                            { date: '2015-01-06', day: "初六", data: [{ title: "" }, { title: "" }] }
                        ]
                    }];
                var calendarList = [], lsarry = new Array();
                $scope.monthlist = [];
                //通过新的开班开始时间-结束时间的天数除以七（得出结果一定是整数）来循环输出每周的日期，即有多少个tab页
                for (var i = 0; i < $scope.slideNum; i++) {
                    var slideArry = {}, lsdate, lstimetable, lssarry = new Array();
                    slideArry.index = i;
                    slideArry.solarData = [];
                    slideArry.lunarData = [];
                    for (var wk = 0; wk < 7; wk++) {
                        lsdate = new Date($scope.startdate.getTime() + (((i * 7) + wk) * 24 * 60 * 60 * 1000));
                        var ftdate = $dateService.format(lsdate, "yyyy-mm-dd"), ym = $dateService.format(lsdate, "yyyy-mm");
                        slideArry.solarData.push({
                            date: ftdate, day: parseInt($dateService.format(lsdate, "dd")), ym: ym
                        });
                        //找出当前日期的所有课程数据
                        lstimetable = [];
                        if (data[0].data) {
                            _.forEach(data[0].data, function (m, key) {
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
                            date: ftdate, day: GetLunarDay($dateService.format(lsdate, "yyyy"), $dateService.format(lsdate, "mm"), $dateService.format(lsdate, "dd")).day, data: lstimetable, ym: ym
                        };
                        slideArry.lunarData.push(lspdata);

                        //全局
                        if (lsarry.indexOf(ym) == -1) {
                            lsarry.push(ym);
                            $scope.monthlist.push({
                                date: ym, month: $dateService.format(lsdate, "mm")
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
                    setTimeout(function () { $ionicSlideBoxDelegate.slide($scope.pageIndex, 1); $scope.isshowloading = false; }, 10)
                } else {
                    $scope.isshowloading = false;
                }
            }
            else {
                //showToast.show($rootScope.appcontent.noData);
            }
        });


    };
    setTimeout(function () {
        $scope.loadDatas();
    }, 500);
    $scope.slideHasChanged = function ($index) {
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
    $scope.changeTimeTableView = function (objdata, sobjdata, changePageView) {
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
    $scope.changeTodayView = function () {
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
    $scope.goTotechEvaluation = function (obj) {
        if (!$scope.isDisable(obj.lessonid, obj.ispost)) {
            $state.go("app.techEvaluation", {
                id: obj.lessonid, type: obj.evaluatetype, lessontype: obj.lessontype, isback: 1
            });
        }
        //$state.go("app.notices");
    }

    //是否已过期样式
    $scope.isDisable = function (etime, ispost) {
        //注意：5是配置,代表时限推后5天
        if ($scope.calculationObsolete(etime) && ispost != "1") {
            return "i_disable";
        }
    }
    //计算是否过期
    $scope.calculationObsolete = function ($edate) {
        var $delay = $rootScope.AppConfig.evaluateouttime;
        //获取系统时间
        var sysDate = new Date($scope.SYSDATE.replace(/-/g, "/")),
            newDate = new Date($edate.replace(/-/g, "/"));
        newDate = new Date(newDate.setDate(newDate.getDate() + parseInt($delay)));
        var minuteNum = (newDate.getTime() - sysDate.getTime()) / 60 / 1000;//分钟
        if (parseInt(minuteNum) <= 0) {
            return true;
        } else {
            return false;
        }
    }
    //提交数据库更新
    $scope.updatememo = function () {
        getDataSource.getDataSource("updatebz", {
            kcid: $scope.updateclass.lessonid, content: $scope.newlessonmemo.lessonmemo
        }, function (data) {
            $scope.updateclass.lessonmemo = $scope.newlessonmemo.lessonmemo;
            $scope.newlessonmemo.lessonmemo = "";
            $scope.closeModal();
        });
    }
    //打开对话框修改
    $ionicModal.fromTemplateUrl('memo', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.updateclass = {
    };
    $scope.newlessonmemo = {
    };
    $scope.openModal = function (e) {
        if ($rootScope.user.type == "teacher") {
            $scope.updateclass = e;
            if (e.lessonmemo != "" && e.lessonmemo != null) {
                $scope.newlessonmemo.lessonmemo = e.lessonmemo;
            }
            $scope.modal.show();
        }
    };
    $scope.closeModal = function () {
        $scope.newlessonmemo.lessonmemo = "";
        $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
        // Execute action
    });
})

