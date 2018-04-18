APPController.controller("guidelineCollegeController", function ($rootScope,$scope, $state, $ionicHistory, showAlert, getDataSource, $timeout) {
    var map;
    var pointPeoplesSquare = new BMap.Point(121.479394, 31.238743);//People's Square of Shanghai
    var labelCELAP = "中国浦东干部学院";
    var pointCELAP = new BMap.Point(121.548888, 31.200245); //new BMap.Point(121.549004, 31.201835);//CELAP
    var pointCurrent = null;
    var pointDest = pointCELAP;
    var currentRouteType = 'transit';
    var loadFlag = false;

    $scope.tabs = [{ name: "学员须知", active: true }, { name: "地图导航", active: false }];
    $scope.nowtab = '学员须知';
    $scope.goBack = function () {
        $ionicHistory.goBack();
    }
    $scope.go = function (tab) {
        angular.forEach($scope.tabs, function (now) {
            now.active = false;
        });
        tab.active = true;
        $scope.nowtab = tab.name;

        if (map && $scope.nowtab == "地图导航") {
            loadFlag = true;
            if (pointCurrent) {
                $scope.switchMapType();
            } else {
                if (pointDest) {
                    locateToDest();
                }
            }
        }
    }

    console.log("guidelineCollegeController");

    $scope.load = function () {
        console.log("load");
        map = new BMap.Map("l-map");
        initNavigate();
    };

    function locateToDest(isDelay) {
        var timeout = 0;
        if (isDelay) {
            timeout = 1500;
        }
        setTimeout(function () {
            var marker = new BMap.Marker(pointDest);
            var label = new BMap.Label(labelCELAP, { offset: new BMap.Size(20, -10) });
            marker.setLabel(label);
            map.addOverlay(marker);
            map.centerAndZoom(pointDest, 12);
        }, timeout);
    }

    function initNavigate() {
        locateToDest();
        console.log("initNavigate");
        getPosition();
    }

    function getPosition() {
        if (!$rootScope.formweixin) {//使用壳的定位
            xsfGeolocation.getCurrentPosition(function (position) {
                var status;
                var lat, lng;
                if (position && position.coords) {
                    lat = position.coords.latitude;
                    lng = position.coords.longitude;
                    status = BMAP_STATUS_SUCCESS;
                } else {
                    status = -100;
                }
                var point = new BMap.Point(lng, lat);

                var pointType;
                var isIOS = ionic.Platform.isIOS();
                if (isIOS) {
                    pointType = 1; //GPS原始坐标转成百度坐标  
                } else {
                    pointType = 3; //GCJ-02坐标转成百度坐标  
                }
                //坐标转换完之后的回调函数
                var translateCallback = function (data) {
                    if (data.status === 0 && data && data.points && data.points[0]) {
                        console.log("translateCallback" + data.points[0].lng + "," + data.points[0].lat);
                        onPositionSuccess(data.points[0], status);
                    } else {
                        showAlert.alert("定位失败:坐标转换失败");
                        locateToDest(true);
                    }
                }

                setTimeout(function () {
                    var convertor = new BMap.Convertor();
                    var pointArr = [];
                    pointArr.push(point);
                    convertor.translate(pointArr, pointType, 5, translateCallback);
                }, 500);
            },
    			function (data) {
    			    showAlert.alert("定位失败:错误代码(-100)");
    			    locateToDest(true);
    			}
    		);
        } else {//浏览器自带定位
            var geo = new BMap.Geolocation();
            geo.getCurrentPosition(function (r) {
                var status = this.getStatus();
                onPositionSuccess(r, status);
            }, { enableHighAccuracy: true });
        }
        //关于状态码
        //BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
        //BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
        //BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
        //BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
        //BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
        //BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
        //BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
        //BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
        //BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)
    }

    function onPositionSuccess(point, status) {
        if (status == BMAP_STATUS_SUCCESS) {
            //showAlert.alert("定位成功");
            if (point) {
                console.log("定位成功:" + point.lng + "," + point.lat);
            }
            var mk = new BMap.Marker(point);
            map.panTo(point);
            pointCurrent = point;

            searchRoute();

            //$scope.switchMapType(currentRouteType);
        } else {
            pointCurrent = null;
            showAlert.alert("定位失败，错误代码(" + status + ")");
            locateToDest(true);
        }
    }

    function searchRoute() {
        var cacheLoadFlag = loadFlag;
        if (pointCurrent) {
            map.clearOverlays();
            var route;
            var options = {
                renderOptions: { map: map, panel: "r-result", autoViewport: true },
                onSearchComplete: function (results) {
                    if (route.getStatus() == BMAP_STATUS_SUCCESS) {
                        $timeout(
                        function () {
                            $("a").each(function (index) {
                                if ($(this).html() == "到百度地图查看»")
                                {
                                    $(this).css("display", "none");
                                }
                            });
                        }, 200);

                        //showAlert.alert("");
                    } else {
                        if (cacheLoadFlag) {
                            showAlert.showToast("没有合适线路");//
                        }
                        locateToDest(true);
                    }
                }
            };
            if (currentRouteType == "driving") {//驾车
                route = new BMap.DrivingRoute(map, options);
            } else if (currentRouteType == "walking") {//步行
                route = new BMap.WalkingRoute(map, options);
            } else {//公交
                route = new BMap.TransitRoute(map, options);
            }
            route.search(pointCurrent, pointDest);
        } else {
            showAlert.alert("当前位置获取失败");
        }
    }

    $scope.switchMapType = function (type) {
        if (type) {
            currentRouteType = type;
        }
        console.log(currentRouteType);
        if (pointCurrent) {
            console.log("pointCurrent:" + pointCurrent.lng + "," + pointCurrent.lat);
        } else {
            console.log("pointCurrent:" + "null" + "," + "null");
        }
        if (pointDest) {
            console.log("pointDest:" + pointDest.lng + "," + pointDest.lat);
        } else {
            console.log("pointDest:" + "null" + "," + "null");
        }
        getPosition();
    }



    $scope.dataGuidelineCollegeSource = [
          //{"id" : "1" , "title" : "中央组织部《关于在干部教育培训中进一步加强学员管理的规定》（摘录）"} , 
          //{"id" : "2" , "title" : "中国浦东干部学院学员管理工作条例（办法）"}
    ];

    $scope.dataLoad = function () {
        getDataSource.getDataSource("getNewList", { category: "学员须知" }, function (data) {
            $scope.dataGuidelineCollegeSource = data;
        });
    }();

    $scope.onGuidelineClick = function (item) {
        //console.log(item);
        $state.go("guidelineCollegeDetail", { id: item.info_id });
    };
}).controller("guidelineNetworkController", function ($scope, $state, $ionicHistory, $rootScope) {
    $scope.goBack = function () {
        $ionicHistory.goBack();
    }
    //TODO 使用
    $scope.loaddata = function () {
        $scope.wifiAccount = {
            logname: $rootScope.user.onecard,
            password: $rootScope.user.xywifipwd
        }
    }();

    $scope.networkHelpInfoState = false;
    $scope.toggleNetworkHelpInfo = function () {
        $scope.networkHelpInfoState = !$scope.networkHelpInfoState;
    }
}).controller("serviceHotlineController", function ($scope, $state, $ionicHistory, getDataSource, $sce) {
    $scope.goBack = function () {
        $ionicHistory.goBack();
    }
    //$scope.dataFAQSource = [
    //      { "id": "1", "title": "一卡通密码咨询" },
    //      { "id": "2", "title": "登录问题咨询" }
    //];

    getDataSource.getDataSource("getFwrxList", { category: "服务热线" }, function (data) {
        for (var i = 0; i < data.length; i++) {
            data[i].content = $sce.trustAsHtml(data[i].content);
        }
        $scope.dataFAQSource = data;
    });
    $scope.changeDisplay = function (id) {
        if ($("#" + id).attr("style") == "display:none;") {
            $("#" + id).attr("style", "display:online;");
        }
        else {
            $("#" + id).attr("style", "display:none;");
        }
        if ($("#i" + id).attr("class") == "ion-arrow-up-b") {
            $("#i" + id).attr("class", "ion-arrow-down-b");
        }
        else {
            $("#i" + id).attr("class", "ion-arrow-up-b");
        }
    }

    $scope.onFAQClick = function (item) {
        //console.log(item);
        $state.go("serviceHotlineDetail", { id: item.info_id });
    }
}).controller("serviceHotlineDetailController", function ($scope, $state, $ionicHistory, $stateParams, $sce, getDataSource) {
    $scope.goBack = function () {
        $ionicHistory.goBack();
    }
    //var testTitle = "一卡通密码咨询";
    //var testContent = "<p>\
    //	1）计划外学员会常遇到卡号获取“麻烦“的感觉，班级编号一般印在学员手册的封面，而三位学员在学员手册内的小组分类里面查看，所以会带给大龄学员会有一卡通号获取复杂的体验。\
    //	</p>\
    //	<p>\
    //	2）密码咨询：一种常见的是初始密码/密码重置咨询；另一类是：登录系统后平台默认页面为“新密码/旧密码修改“，对于大龄学员就会很纠结的是：不知是否需要修改，另新密码和新密码确认也会纠结是否为同一个，再就是误用了他人的学号进入误打误撞首次看见就修改了密码而后发现不是自己的名字再退出重新进入自己账户但前学员就会遇到登录时提示密码错误的问题了。\
    //	</p>";

    $scope.detail = {};
    //$scope.detail.id = $stateParams.id;
    getDataSource.getDataSource("getNewDetail", { id: $stateParams.id }, function (data) {
        $scope.detail = data[0];
        $scope.detail.content = $sce.trustAsHtml(data[0].content);
    });
    //$scope.detail.title = testTitle;
    //$scope.detail.content = $sce.trustAsHtml(testContent);
}).controller("guidelineCollegeDetailController", function ($scope, $state, $ionicHistory, $stateParams, $sce, getDataSource) {
    $scope.goBack = function () {
        $ionicHistory.goBack();
    }

    $scope.detail = {};
    $scope.detail.id = $stateParams.id;
    $scope.detail.title = "";
    $scope.detail.content = "";

    $scope.mainTitle = "学员须知";

    $scope.dataLoad = function () {
        getDataSource.getDataSource("getNewDetail", { id: $stateParams.id }, function (data) {
            console.log(data[0].content);
            $scope.detail.title = $sce.trustAsHtml(data[0].title);
            $scope.detail.content = $sce.trustAsHtml(data[0].content);
        });
    }();
}).controller("wechatLoginCtrl", function ($scope, $state, $stateParams , $timeout , $ionicLoading , Toast , WeChat , $rootScope) {
   $scope.viewTitle = "首页";
   $scope.isShowDeny = false;
   $scope.isShowWait = true;
   
   $ionicLoading.show({
       template: '加载中...'
   });

    if(isWeiXin()){
        if (localStorage.userid) {
            doWechatConfig();
        } else {
            doWechatOAuth();
        }
    }

    function doWechatConfig(){
        var signatureAction = baseURL + "/action?wechatSignature=1";
        var url = location.href.split('#')[0];

        var promise = WeChat.init(signatureAction , url);
        promise.then(function(data){
            WeChat.config(data, function(){
                WeChat.hideOptionMenu();
                go();
            } , function(res){
                doFail();
                $ionicLoading.hide();
                Toast.showPop("微信接口出错:" + res.errMsg);
            });
        } , function(data){
            doFail();
            $ionicLoading.hide();
            Toast.showPop("微信签名数据获取失败:" + data); 
        });
    }
   
   function doWechatOAuth(){
        var signatureAction = baseURL + "/action?wechatSignature=1";
        var url = location.href.split('#')[0];

        var code = getQueryString("code") || "";
        var oauthAction = baseURL + '/action?wechatUserData=oauth&code=' + code ;

		var promise = WeChat.init(signatureAction , url);
        promise.then(function(data){
            WeChat.config(data, function(){
                WeChat.hideOptionMenu();

                var oauthPromise = WeChat.oauth(oauthAction);
                oauthPromise.then(function(data) {
                    console.log(data);
                    var msg = "";
                    var success = false;
                    if(data && data.result){
                        var dt = data.data;
                        doSuccess(dt);
                        success = true;
                    }else if(data && data.message){
                        msg = data.message || "认证失败";
                    }else{
                        msg = "认证失败";
                    }
                    if(msg){
                        Toast.showPop(msg);
                    }
                    
                    if(success){
                        go();
                    }else{
                        doFail();
                    }
                    $ionicLoading.hide();
                }, function(data) { 
                    doFail();
                    $ionicLoading.hide();
                    console.log("操作出错" + data);
                    Toast.showPop("认证出错");
                });  
            } , function(res){
                doFail();
                $ionicLoading.hide();
                Toast.showPop("微信接口出错:" + res.errMsg);
            });
        } , function(data){
            doFail();
            $ionicLoading.hide();
            Toast.showPop("微信签名数据获取失败:" + data); 
        });
   }
   
   function go(){
       $ionicLoading.hide();
	    if(localStorage.userid){
	    	$state.go("user.mainNewUser");
		}else{
			doFail();
		}	  
   }
   
   function doSuccess(data){
		localStorage.logname = data.logname || "";
		localStorage.username = data.name || "";
		localStorage.userid = data.userId;
        localStorage.password = data.password || "";
        localStorage.deptname = data.deptname || "";
        localStorage.version = appVersion; 

        var resultUser = {};
        resultUser.info_id = data.userId;
        $rootScope.user = resultUser;
        $rootScope.user.type = "student";
        $rootScope.user.isFirstLogin = false;
        localStorage.user = JSON.stringify($rootScope.user);
   }
   
   function doFail(){
		localStorage.logname = "";
		localStorage.userName = "";
		localStorage.userid = "";
		
		$scope.isShowWait = false;
		$scope.isShowDeny = true;
   }
   
/*   $timeout(function(){
	   doOAuth();
   } , 200);*/
   console.log("wechatLoginCtrl"); 
});