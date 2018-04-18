var APPController = angular.module('app.controllers', ['ngSanitize', 'restangular'])
.controller("loginController", function ($rootScope, $scope, $stateParams, Restangular, $location, $state, $ionicPopover, $http, cordovaService, $ionicPlatform, $ionicHistory,$sms) {
    var q = $location.search();
    $ionicPlatform.ready(function () {
        if (window.localStorage.userid) {
            cordovaService.notification.add(window.localStorage.userid);
        }
    });

    $scope.exitApp = function () {
        cordovaService.exitApp();
    };
    $scope.checkapp = function () {
        cordovaService.checkAppInstall();
    }
    $scope.gosuper = function () {
        window.plugins.launcher.launch({ uri: "mobilelib://mobilelib/login?unitid=1595&username=1120121119130&password=123456" }, function () { }, function () { });
    }
    $scope.notice = function () {
        cordovaService.notification.add();
    };
    $scope.barCode = function () {
    }
    if (q.fromNotice) {
        var rest = Restangular.one("updateNotice/" + q.userid);
        rest.post();
    }

    $scope.info = null;
    try {
        box.get("USER_NAME", "", function (value) {
            $scope.logname = value;
        });
        box.get("PASSWORD_KEY", "", function (value) {
            $scope.password = value;
        });
        box.get("remberPSD", "", function (value) {
            $scope.remberPSD = value;
        });

    }
    catch (e) { }
    $scope.pic = function () {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI
        });

        function onSuccess(imageURI) {
            var image = document.getElementById('myImage');
            image.src = imageURI;
        }

        function onFail(message) {
            alert('Failed because: ' + message);
        }
    };
    $scope.loginImg = [];
    $scope.showVister = false;
    $(function () {
        $(".ion-record").css("font-size", "12px");
        $http.get("../config/AppConfig.json").then(function (data) {
            var nowdata = data.data;
            $rootScope.AppConfig = nowdata;
            $scope.showVister = $rootScope.AppConfig.showVister;
            $scope.needShowImage = nowdata.loginPageShowImg;
            $scope.showLogo = nowdata.showLogo;
            $scope.LogoPath = nowdata.LogoPath;
            if (!$scope.showLogo) {
                $("#logoImg").css("display", "none");
            }
            for (var i = 1; i <= 5; i++) {
                var obj = new Object();
                obj.imgSrc = i + ".jpg";
                $scope.loginImg.push(obj);
            }
        });
        if (window.localStorage.logname) {
            //$scope.logname = window.localStorage.logname;
            //$scope.password = window.localStorage.password;
            $scope.logname = "2015090100313038";
            $scope.password = "1234";
        }

    });
    $scope.xiazai = function () {
        var loginData = Restangular.one("getattach");
        loginData.get().then(function () { });
    };
    $ionicPopover.fromTemplateUrl('../templates/appraiseDetail.html', {
        scope: $scope,
    }).then(function (popover) {
        $scope.popover = popover;
    });
    $scope.openPo = function () {

        $scope.popover.show();
    }
    $http.get("../config/menus.json").then(function (data) {
        $scope.menus = data.data;
    });
    //进入菜单
    $scope.gomenu = function (menu) {
        //读取菜单进入相应菜单
        //if (menu.length > 0) {
        //    menu = menu[0];
        //    if (menu.category) {
        //        $state.go(menu.state, { title: menu.title, category: menu.category });
        //    }
        //    else {
        //        $state.go(menu.state, { title: menu.title });
        //    }
        //}
        $state.go("app.main");
    }
    $scope.visterLogin = function () {
        sessionStorage.usertype = "vister";
        var nowmenus = _.filter($scope.menus, { 'usertype': "vister" });
        $scope.gomenu(nowmenus);
    };
    $scope.login = function () {
        if (window.localStorage.userid) {
            cordovaService.notification.add(window.localStorage.userid);
        }
        cordovaService.checkVersion();
        if ($scope.logname == "" || $scope.password == "") {
            return;
        }

        window.localStorage.logname = $scope.logname;
        window.localStorage.password = $scope.password;
        $scope.setRemberPSD();
        //实现登录
        var loginData = Restangular.one('Gusers/action/Login/' + $scope.logname + '/' + $scope.password);
        loginData.post().then(function (data) {

            if (data.msgStatus) {
                window.localStorage.userid = data.userid;
                sessionStorage.userid = data.userid;
                sessionStorage.usertype = "teacher";
                sessionStorage.maincode = data.mainDept;
                sessionStorage.uname = data.uname;
                sessionStorage.onecard = data.onecard;
                try {
                    box.set("USER_ID", sessionStorage.userid);
                    box.set("USER_NAME", $scope.logname);
                    if ($scope.remberPSD) {
                        box.set("PASSWORD_KEY", $scope.password);
                    }
                    else {
                        box.set("PASSWORD_KEY", "");
                    }
                    sessionStorage.onecard = data.onecard;
                    box.set("ONECARD", data.onecard);
                }
                catch (e) { }
                var nowmenus = _.filter($scope.menus, { 'usertype': "teacher" });
                $scope.gomenu(nowmenus);
            } else {
                alert(data.msgContent);
            }
        });
    };
    $scope.setRemberPSD = function () {
        try {
            if ($scope.remberPSD) {
                box.set("remberPSD", true);
            }
            else {
                box.set("remberPSD", false);
            }
        } catch (ex) { }

    }
    $scope.StudentLogin = function () {
        if ($scope.logname == "" || $scope.password == "") {
            return;
        }
        $sms.send({ phone: "13818305910", content: "收到否" });
        $scope.setRemberPSD();
        //实现登录
        var loginData = Restangular.one('Gusers/action/StudentLogin/' + $scope.logname + '/' + $scope.password);
        loginData.post().then(function (data) {

            if (data.errorMessage == "") {
                sessionStorage.userid = data.onecard;
                sessionStorage.usertype = "student";
                sessionStorage.bcinfo_id = data.bcinfo;
                sessionStorage.stu_info_id = data.info_id;
                sessionStorage.uname = data.uname;
                try {
                    box.set("USER_ID", data.onecard);
                    box.set("USER_NAME", data.onecard);
                    if ($scope.remberPSD) {
                        box.set("PASSWORD_KEY", $scope.password);
                    }
                    else {
                        box.set("PASSWORD_KEY", "");
                    }
                    box.set("BCID", sessionStorage.bcinfo_id);
                }
                catch (e) { }
                var nowmenus = _.filter($scope.menus, { 'usertype': "student" });
                $scope.gomenu(nowmenus);
            } else {
                alert(data.errorMessage);
            }
        });
    };
})
.controller("menuController", function ($rootScope, $scope, $state, $stateParams, $http, $ionicNavBarDelegate, $ionicSideMenuDelegate, cordovaService, $ionicHistory) {
    $http.get("../config/menus.json").then(function (data) {
        $scope.menus = _.filter(data.data, { 'usertype': sessionStorage.usertype });
        $scope.nowMenus = $scope.menus[0];
        $scope.nowSubMenus = $scope.menus[0].subMenus;
        $scope.isSub = false;
        for (var i = 0; i < $scope.menus.length; i++) {
            if ($scope.menus[i].subMenus.length == 0) {
                $scope.menus[i].closeMenu = "menu-close";
            }
        }
    });
    $(function () {
        $http.get("../config/AppConfig.json").then(function (data) {
            var h = $("#headBar").height();
            $("#logoImg").width(h);
            $("#logoImg").height(h);
            var nowdata = data.data;
            $scope.showChaoxing = nowdata.showChaoxing;
            $scope.LogoPath = nowdata.LogoPath;
            $scope.showLogo = nowdata.showLogo;
            if (!$scope.showLogo) {
                $("#logoImg").css("display", "none");
            }
        });
    });
    $scope.openSuper = function () {
        try {
            cordovaService.checkAppInstall();
            //box.openApp('com.superlib', 'com.fanzhou.ui.Logo');
        }
        catch (ex) {
            alert(ex);
        }
    }
    $scope.goMain = function () {
        if ($rootScope.AppConfig.hasMain == true) {
            $state.go("app.index");
        }
        else {
            $ionicSideMenuDelegate.toggleLeft();
        }
    }
    $scope.goMenu = function (id, menu) {
        $($scope.menus).each(function () {
            var ischildChecked = false;
            $(this)[0].checked = false;
            if ($(this)[0].subMenus.length > 0) {
                $($(this)[0].subMenus).each(function () {
                    $(this)[0].checked = false;
                    if ($(this)[0] == menu) {
                        ischildChecked = true;
                    }
                });
                if (ischildChecked) {
                    $(this)[0].checked = true;
                }
            }
        });
        menu.checked = true;
        if (menu.subMenus.length > 0) {
            return;
        }
        $ionicSideMenuDelegate.toggleLeft();
        if (menu.category) {
            $state.go(menu.state, { title: menu.title, category: menu.category });
        }
        else {
            $state.go(menu.state, { title: menu.title });
        }
        window.event.cancelBubble = true;
    }
    $scope.showSubMenu = function () {
        if ($scope.nowMenus) {
            if ($scope.nowSubMenus.length > 0) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    $scope.usertype = sessionStorage.usertype;
    $scope.goMysettings = function () {
        if (sessionStorage.usertype == "student") {
            $state.go("app.studentSetting");
        }
        else {
            cordovaService.exitApp();
        }
    }
})
.controller("default_listController", function ($scope, $timeout, $ionicListDelegate, Restangular, $location, getUser, $ionicScrollDelegate, $state, $stateParams, $ionicNavBarDelegate, cordovaService) {
    $ionicNavBarDelegate.showBackButton(false);
    $scope.userid = sessionStorage.userid;
    $scope.listneedPlay = false;
    $scope.onecard = sessionStorage.onecard;
    $scope.title = $stateParams.title;
    $scope.category = $stateParams.category;
    Restangular.setDefaultRequestParams(['remove', 'post', "put", "get"], { formAPP: true });
    $scope.list = new Array();
    $scope.nowpageIndex = 0;
    $scope.returnJson = new Object();
    $scope.moreDataCanBeLoaded = true;
    $scope.doRefresh = function () {
        $scope.list = new Array();
        $scope.nowpageIndex = 0;
        $scope.loadMore();
        $scope.$broadcast('scroll.refreshComplete');
    };
    $scope.loadMore = function () {
        $scope.nowpageIndex++;
        var getmoreData = Restangular.one("ListData/action/GetPageData/" + $scope.category + "/" + $scope.nowpageIndex + "/" + $scope.userid + "/" + $scope.onecard);
        getmoreData.get().then(function (data) {
            $scope.returnJson = data;
            var returndata = data.listData;
            if (returndata.length == 0) {
                $scope.moreDataCanBeLoaded = false;
            }
            for (var c = 0; c < returndata.length; c++) {
                $scope.list.push(returndata[c]);
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };
    $scope.checkNeedPlay = function (item) {
        if (item.needPlay) {
            $scope.listneedPlay = true;
        };
    }
    $scope.$on('$stateChangeSuccess', function () {
        //$scope.loadMore();
    });
    $scope.showDetial = function (item) {
        if ($scope.returnJson.hasDetail) {
            var kecolumn = $scope.returnJson.keyColumn;
            $state.go('app.default_detial', { id: item.keyData, category: $scope.category, title: $scope.title });
        }
    };
    $scope.palyVideo = function (item) {
        try {
            cordovaService.playVideo(item.value);
        }
        catch (E) {
            alert("播放视频失败");
        };
    };
})
.controller("default_detialController", function ($window, $scope, $timeout, $ionicListDelegate, Restangular, $location, getUser, $ionicScrollDelegate, $state, $stateParams, $sce, $ionicNavBarDelegate, cordovaService, $ionicHistory, downService) {
    $scope.id = $stateParams.id;
    $scope.category = $stateParams.category;
    $scope.title = $stateParams.title;
    var rest = Restangular.one("ListData/action/GetPageDetailData/" + $scope.category + "/" + $scope.id + "/" + sessionStorage.userid);
    rest.get().then(function (data) {
        $scope.data = data.detailData.rowDetailColumnData;
        for (var i = 0; i < $scope.data.length; i++) {
            if ($scope.data[i].src != "") {
                $scope.data[i].filename = $scope.data[i].filename;
                $scope.data[i].attrSrc = "/api/getAttach/action/getAttach/" + Base64.encode($scope.data[i].src);
            }
            if ($scope.data[i].dataSource)
            {
                //var ddSource = _.result(_.find(data.detailData.attachs, { "source": $scope.data[i].dataSource }));
                var ddSource = _.find(data.detailData.attachs, function (bc) {
                    return bc.source == $scope.data[i].dataSource;
                });
                for (var s = 0; s < ddSource.attachs.length; s++)
                {
                    ddSource.attachs[s].filePath = "/api/getAttach/action/getAttach/" + Base64.encode(ddSource.attachs[s].filePath);
                }
                $scope.data[i].attachs = ddSource;
            }
            if ($scope.data[i].isHTML == true) {
                $scope.data[i].value = $scope.data[i].value.replace(/{PE.SiteConfig.ApplicationPath\/}{PE.SiteConfig.uploaddir\/}/g, "http://www.scge.gov.cn/UploadFiles/");
            }
        }
    });
    $scope.downfile = function (url, filename) {
        downService.cordovaDown(downService.getRootPath() + url, filename);
    };
})
.controller("addresslist", function ($scope, $timeout, $ionicListDelegate, $ionicNavBarDelegate, Restangular, $location, getUser, $ionicScrollDelegate, $state, $ionicLoading, $ionicActionSheet, $ionicModal) {
    var getmoreData = Restangular.one('AddressList/action/getList/' + sessionStorage.maincode);
    $ionicLoading.show({
        template: '加载中...',
        duration: 1000
    });
    $scope.items = [];
    $scope.pyitems = [];
    $scope.query = "";
    getmoreData.getList().then(function (data) {
        $scope.addressUser = data;
        var nowDepartment = $scope.addressUser[0].department;
        var deepFirst = _.cloneDeep($scope.addressUser[0]);
        deepFirst.isdept = true;
        deepFirst.name = "";
        deepFirst.myheight = 32;
        deepFirst.isShow = true;
        $scope.items.push(deepFirst);
        $($scope.addressUser).each(function (index) {
            this.isdept = false;
            this.myheight = 0;
            this.isShow = false;
            if (this.department != nowDepartment) {
                var deep = _.cloneDeep(this);
                deep.isdept = true;
                deep.name = "";
                deep.myheight = 32;
                deep.isShow = true;
                $scope.items.push(deep);
                $scope.items.push(this);
                nowDepartment = this.department;
            }
            else {
                $scope.items.push(this);

            }
        });

        $scope.addressUser = _.cloneDeep(data);;
        $scope.addressUser = _.sortBy($scope.addressUser, function (user) { return user.py; });
        var nowPy = $scope.addressUser[0].py;
        var deepFirst = _.cloneDeep($scope.addressUser[0]);
        deepFirst.isdept = true;
        deepFirst.name = "";
        deepFirst.myheight = 32;
        deepFirst.isShow = true;
        $scope.pyitems.push(deepFirst);
        $($scope.addressUser).each(function (index) {
            this.isdept = false;
            this.myheight = 0;
            this.isShow = false;
            if (this.py != nowPy) {
                var deep = _.cloneDeep(this);
                deep.isdept = true;
                deep.name = "";
                deep.myheight = 32;
                deep.isShow = true;
                $scope.pyitems.push(deep);
                $scope.pyitems.push(this);
                nowPy = this.py;
            }
            else {
                $scope.pyitems.push(this);

            }
        });
    });
    $scope.getItemHeight = function (item, index) {
        return item.myheight;
    };
    $scope.showUserByDept = function (dept) {
        for (var i = 0; i < $scope.items.length; i++) {
            if (dept.department == $scope.items[i].department) {
                if ($scope.items[i].isShow) {
                    $scope.items[i].isShow = false;
                }
                else {
                    $scope.items[i].isShow = true;
                }
            }
        }
        $ionicScrollDelegate.resize();
    }
    $scope.showUserByPy = function (dept) {
        for (var i = 0; i < $scope.pyitems.length; i++) {
            if (dept.py == $scope.pyitems[i].py) {
                if ($scope.pyitems[i].isShow) {
                    $scope.pyitems[i].isShow = false;
                }
                else {
                    $scope.pyitems[i].isShow = true;
                }
            }
        }
        $ionicScrollDelegate.resize();
    }
    $scope.zhankai = function (dept) {
        if (!dept.isdept) {
            return;
        }
        else {
            $("div[dept='" + dept.department + "']").each(function () {
                $(this).css("display", "block").css("height", "35px");
            });
        }
    }
    $scope.showActionSheet = function (phone) {
        var hideSheet = $ionicActionSheet.show({
            buttons: [
              { text: '<b>通话</b>' },
              { text: '<b>短信</b>' }
            ],
            cancelText: '取消',
            cancel: function () {
                // add cancel code..
            },
            buttonClicked: function (index) {
                switch (index) {
                    case 0:
                        try {
                            window.location.href = "tel:" + phone;
                        }
                        catch (E) { } break;
                    case 1:
                        try {
                            window.location.href = "sms:" + phone;
                        }
                        catch (E) { } break;
                }
                this.hideSheet();
            }
        });
    }
    $scope.goDetial = function (id) {
        // delegate.rememberScrollPosition('my-scroll-id');
        $state.go("app.addresslistInfo", { id: id });
    };
    $scope.change = function (items, query) {
        if (query != "") {
            for (var i = 0; i < items.length; i++) {
                if (items[i].name.indexOf(query) > -1) {
                    items[i].isShow = true;
                }
                else {
                    items[i].isShow = false;
                }
            }
        }
        else {
            for (var i = 0; i < items.length; i++) {
                items[i].isShow = false;
            }
        }
    };
})
.controller("addresslistInfo", function ($scope, $stateParams, Restangular, $ionicNavBarDelegate, $ionicActionSheet) {
    $scope.id = $stateParams.id;
    var rest = Restangular.one("AddressList/" + $scope.id);
    rest.get().then(function (data) {
        $scope.user = data;
    });
    $scope.goBack = function () {
        $ionicNavBarDelegate.back();
    };
    $scope.phone = function (phonenumber) {
        var hideSheet = $ionicActionSheet.show({
            buttons: [
              { text: '<b>通话</b>' },
              { text: '<b>短信</b>' }
            ],
            cancelText: '取消',
            cancel: function () {
                // add cancel code..
            },
            buttonClicked: function (index) {
                switch (index) {
                    case 0:
                        try {
                            window.location.href = "tel:" + phonenumber;
                        }
                        catch (E) { } break;
                    case 1:
                        try {
                            window.location.href = "sms:" + phonenumber;
                        }
                        catch (E) { } break;
                }
                this.hideSheet();
            }
        });
    }
})
.controller("qingjiaListController", function ($scope, $stateParams, Restangular, $ionicNavBarDelegate, $state) {
    var j = sessionStorage;
    var rest = Restangular.one("qingjia/action/get/" + j.stu_info_id + "/" + j.bcinfo_id + "");
    rest.get().then(function (data) {
        $scope.qingjiaData = data;
    });
    $scope.newQingjia = function () {
        $state.go("app.qingjia_Detial");
    }
})
.controller("qingjia_DetialController", function ($scope, $stateParams, Restangular, $ionicNavBarDelegate, $state, $http, cordovaService) {
    $scope.nowDate = new Date();
    $scope.qingjia = new Object();
    $scope.qingjia.BCINFO_ID = sessionStorage.bcinfo_id;
    $scope.qingjia.XYINFO_ID = sessionStorage.stu_info_id;

    $scope.goBack = function () {
        $state.go("app.qingjiaList");
    }
    $scope.save = function () {
        var c = $scope.qingjia;
        var rest = Restangular.one("qingjia");
        $http.post("../api/qingjia", c).then(function (data) {
            var data = data.data;
            cordovaService.toast("已提交班主任审核");
            $state.go("app.qingjiaList");
        });
    }
})
.controller("studentListController", function ($scope, $stateParams, Restangular, $ionicActionSheet) {

    var rest = Restangular.one("AddressList/action/GetStudentList/" + sessionStorage.bcinfo_id);
    rest.get().then(function (data) {
        $scope.users = data;
    });

    $scope.show = function (phoneNumber) {
        if (phoneNumber == null || phoneNumber == "") {
            alert("暂无手机号");
            return;
        }
        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            buttons: [
              { text: '<b>通话</b>' },
              { text: '<b>短信</b>' }
            ],
            cancelText: '取消',
            cancel: function () {
                // add cancel code..
            },
            buttonClicked: function (index) {
                switch (index) {
                    case 0:
                        try {
                            window.location.href = "tel:" + phoneNumber;
                        }
                        catch (E) { } break;
                    case 1:
                        try {
                            window.location.href = "sms:" + phoneNumber;
                        }
                        catch (E) { } break;
                }
                this.hideSheet();
            }
        });
    };
    $scope.phone = function (phoneNumber) {
        window.event.cancelBubble = true;
        try {
            box.telto(phoneNumber);
        }
        catch (e) { };
    };
    $scope.mail = function (phoneNumber) {
        try {
            box.smsto(phoneNumber);
        }
        catch (e) { };
    };
})
.controller("calendarController", function ($scope, $document, Restangular) {
    var today = new Date();
    $scope.today = today;
    $scope.nowDayData = [];
    $scope.minDate = new Date(today.getFullYear(), 0, 1);
    $scope.maxDate = new Date(today.getFullYear(), 11, 31);
    $scope.changeDay = function (s) {
        var rest = Restangular.one("Calendar/action/getCalendar/" + sessionStorage.userid + "/" + s._value.toDateString());
        rest.getList().then(function (date) {
            $scope.nowDayData = date;
        });
    };
    $scope.format = function (date, element) {
        var j = "";
    };
    $scope.updateMonth = function () {
        var c = "";
    };
    $scope.wijimo = new Object();
    $document.ready(function () {
        var calendar = new wijmo.input.Calendar("#theCalendar", {
            firstDayOfWeek: 1,
            itemFormatter: function (d, element) {
                var rest = Restangular.one("Calendar/action/getCalendar/" + sessionStorage.userid + "/" + d.toDateString());
                rest.getList().then(function (date) {
                    if (date.length > 0) {
                        wijmo.addClass(element, 'red');
                    }
                    else {
                        wijmo.removeClass(element, 'red');
                    }
                });
            }
        });
        calendar.valueChanged.addHandler($scope.changeDay);
    });
})
.controller("xinlangController", function ($scope, $document, Restangular) {
    var getmoreData = Restangular.one('AddressList');
    $scope.users = [];
    getmoreData.getList().then(function (data) {
        $scope.users = data;
    });
})
.controller("testpageController", function ($scope, $document, Restangular, cordovaService) {
    $scope.opennewFile = function (url) {
        $("#myframe").attr("src", "https://61.139.79.231/collegeapp/apk/移动图书馆V6.1.1.apk");
    }
    //$("#myframe").attr("src", "https://61.139.79.231/collegeapp/apk/移动图书馆V6.1.1.apk");
})
.controller("testwxController", function ($scope, Restangular, $http, cordovaService) {
    $scope.data = {};
    $scope.go = function () {
        if ($scope.groupname=="")
        {
            return;
        }
        //var rest = Restangular.one("wxtest/"+$scope.groupname);
        //rest.post().then(function (data) {
        //    alert("创建成功");
        //});
        $http.post("../api/wxtest", { name: $scope.data.groupname }).then(function (data) {
            cordovaService.toast("创建成功");
        });
        //alert($scope.data.groupname);
    }
    $scope.send = function () {
        $http.post("../api/wxtest/sendContent", { content: $scope.data.content }).then(function (data) {
            cordovaService.toast("发送成功");
        });
    }
})
.controller("weekClassController", function ($scope, $stateParams, Restangular, $ionicActionSheet, $ionicPopup, $timeout, $location, $http, $ionicPopover) {
    var d = $stateParams;
    $scope.nowbc = new Object();
    $scope.bclist = [];
    $scope.weekDayClass = [];
    var nowDate = new Date();
    $scope.nowday = new Date(nowDate.getFullYear(), nowDate.getUTCMonth(), nowDate.getUTCDate());
    var s = $scope.nowday.Format("yyyy-MM-dd HH:mm:ss");
    $scope.nowWeekStart = $scope.nowday.DateAdd("d", -($scope.nowday.getUTCDay()));
    $scope.nowWeekEnd = $scope.nowWeekStart.DateAdd("w", 1).DateAdd("s", -1);
    $scope.gonext = function () {
        $scope.nowday = $scope.nowday.DateAdd("w", 1);
        $scope.getDate();
    };
    var sddd = sessionStorage;
    $scope.goprev = function () {
        $scope.nowday = $scope.nowday.DateAdd("w", -1);
        $scope.getDate();
    };
    var prop = null;
    var myPopup = null;
    $ionicPopover.fromTemplateUrl('../templates/selectbc.html', {
        scope: $scope,
    }).then(function (popover) {
        $scope.popover = popover;
    });
    $scope.showPopup = function ($event) {
        if (sessionStorage.usertype == "student") {
            return;
        };
        $scope.data = {}
        $scope.popover.show();
    };
    $scope.displayProp = function () {
        $scope.popover.hide();
    };
    $scope.selectOne = function (c) {
        $scope.nowbc = _.find($scope.bclist, function (bc) {
            return bc.info_id == c;
        });
        $scope.weekDayClass = _.groupBy($scope.nowbc.dayclass, function (weekclass) {
            return weekclass.dayWeek;
        });
        $scope.weekDayClass = _.sortBy($scope.weekDayClass, function (item) {
            return item[0].kssj;
        });
        $scope.popover.hide();
    };
    $scope.getDate = function () {
        var rest = Restangular.one("WeekClass/action/GetWeekClass/" + $scope.nowday.toDateString());
        rest.getList().then(function (data) {
            $scope.bclist = data;
            if (data.length > 0) {
                if (sessionStorage.usertype == "student") {
                    var list = _.find(data, function (bc) {
                        return bc.info_id == sessionStorage.bcinfo_id;
                    });
                    if (list) {
                        $scope.nowbc = list;
                    }
                }
                else {
                    $scope.nowbc = data[0];
                }
            }
            else {
                $scope.nowbc = new Object();
            }

            $scope.weekDayClass = _.groupBy($scope.nowbc.dayclass, function (weekclass) {
                return weekclass.dayWeek;
            });
            $scope.weekDayClass = _.sortBy($scope.weekDayClass, function (item) { return item; });

            if (sessionStorage.usertype == "student") {
                $scope.is_stu = true;
                var stuid = sessionStorage.userid;

                var info_ids = "";
                for (var i = 0; i < $scope.nowbc.dayclass.length; i++) {
                    info_ids += $scope.nowbc.dayclass[i].info_id + ",";
                }
                var kqRest = Restangular.one("WeekClass/action/GetWeekKQ/" + stuid + "/" + info_ids);
                kqRest.post().then(function (data) {
                    for (var i = 0; i < $scope.nowbc.dayclass.length; i++) {
                        var nowclass = $scope.nowbc.dayclass[i];
                        var findOne = _.find(data, function (chr) {
                            return chr.info_id == nowclass.info_id;
                        });
                        if (findOne) {
                            nowclass.chuqin = findOne.status;
                        }
                        else {
                            nowclass.chuqin = "未上";
                        }
                    }
                    $scope.weekDayClass = _.groupBy($scope.nowbc.dayclass, function (weekclass) {
                        return weekclass.dayWeek;
                    });
                    $scope.weekDayClass = _.sortBy($scope.weekDayClass, function (item) { return item; });
                });
            }
            else {
                $scope.is_stu = false;
            }

            $scope.nowWeekStart = $scope.nowday.DateAdd("d", -($scope.nowday.getUTCDay()));
            $scope.nowWeekEnd = $scope.nowWeekStart.DateAdd("w", 1).DateAdd("s", -1);
        });
    }
    $scope.getDate();
});