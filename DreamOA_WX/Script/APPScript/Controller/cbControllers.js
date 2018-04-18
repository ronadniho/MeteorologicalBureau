APPController.controller("myControllerCb", function($scope) {

})

//通讯录
.controller("addressListNewCtrl", function($scope, $http, $stateParams, $ionicLoading, httpProxy, $timeout, Toast, $debounce, $ionicHistory,$state, ASFUtil, $ionicPopup) {
    $scope.closeWin = function() {
        $state.go("user.mainNewUser");
    };
        //新的组织机构
    var deptId = -1;
    $scope.isExistData = true;
    $scope.baseURL = baseURL;
    $scope.defaultUserIcon = CommonConstants.DEFAULT_USER_ICON;
    $scope.items = new Array();
    $scope.parents = new Array();
    $scope.users = new Array();
    $scope.chat = Feature.FEATURE_CHAT;

    function showDept(deptId, query) {
        $ionicLoading.show({
            template: '加载中...'
        });
        query = query || '';
        $scope.items = new Array();
        $scope.users = new Array();
        $scope.parents = new Array();
        var messageUrl = baseURL + "/action?userContactActionIonic=1&action=getOrgUsersNew&rootDeptId=" + deptId + "&userId=" + localStorage.userid;
        if (query == '' || typeof(query) == 'undefined') {
            messageUrl = messageUrl;
        } else {
            messageUrl = baseURL + "/action?userContactActionIonic=1&action=getSearchUsers&rootDeptId=" + deptId + "&userId=" + localStorage.userid + "&userName=" + query;
        }
        httpProxy.getJSON(messageUrl, "", function(data) {
            console.log(data);
            var datas = data.data.rows;
            var users = data.data.users;
            var parents = data.data.parents;
            var deptName = data.data.deptName;
            $scope.groupName = deptName;
            for (var i = 0; datas && i < datas.length; i++) {
                datas[i].isShow = false;
                $scope.items.push(datas[i]);
            }

            for (var i = 0; users && i < users.length; i++) {
                users[i].isShow = false;
                $scope.users.push(users[i]);
            }

            for (var i = 0; parents && i < parents.length; i++) {
                parents[i].isShow = false;
                $scope.parents.push(parents[i]);
            }

            $timeout(function() {
                $ionicLoading.hide();
            }, 150);
        }, function(data) {
            $ionicLoading.hide();
            Toast.showPop("加载出错");
        });
    }

    $scope.showUserByDept = function(deptId) {
        showDept(deptId);
    };
    //初始化
    showDept(deptId);
    $scope.finish = function(id, $event) {
        $event.stopPropagation();
    };

    $scope.phone = function(number) {
        console.log(number);
        if (number) {
            xsfMobile.telto(number);
        } else {
            Toast.showPop("号码为空");
        }
    }

    $scope.message = function(number) {
        console.log(number);
        if (number) {
            xsfMobile.smsto(number);
        } else {
            Toast.showPop("号码为空");
        }
    }

    $scope.openChat = function(user) {
        var options = {
            "chatId": user.id,
            "chatName": user.name,
            "chatType": 0
        };

        xsfChat.openChat(options,
            function(result) {},
            function(error) {
                alert(error);
            }
        );
    }

    //  确认 对话框
	$scope.showConfirm = function(number) {
        if(number.length < 11){
            ASFUtil.tel(number);
        } else {
            var confirmPopup = $ionicPopup.confirm({
                title: '拨号或发短信',
                template: '<div align="center">'+number+'</div>',
                buttons: [{ //Array[Object] (可选)。放在弹窗footer内的按钮。
                    text: '拨号',
                    type: 'button-positive',
                    onTap: function(e) {
                    // 当点击时，e.preventDefault() 会阻止弹窗关闭。
                    //e.preventDefault();
                        ASFUtil.tel(number);
                    }
                }, {
                    text: '短信',
                    type: 'button-positive',
                    onTap: function(e) {
                    // 返回的值会导致处理给定的值。
                   // return scope.data.response;
                        ASFUtil.sms(number);
                    }
                },{
                    text: '取消',
                    type: 'button-default',
                    onTap: function(e) {
                    // 返回的值会导致处理给定的值。
                   // return scope.data.response;
                    }
                }]
            });
            // confirmPopup.then(function(res) {
            //     if(res) {
            //        ASFUtil.tel(number);
            //     } else {
            //         ASFUtil.sms(number);
            //     }
            // });
        }
	};
    

    function smsOrTel(number, isTel){
        var confirmPopup = $ionicPopup.confirm({
                title: isTel ? '确认拨号' : '确认发短信' ,
                template: '<div align="center">'+number+'</div>',
                cancelText: '取消',
                okText: isTel ? '拨号' : '发短信'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    console.log('You are sure');
                    if (isTel) {
                        ASFUtil.tel(number);
                    } else {
                        ASFUtil.sms(number);
                    }
                } else {
                    console.log('You are not sure');
                }
            });
    }
    

    $scope.$watch("query", function(newValue, oldValue) {
        console.log("$scope.query" + $scope.query);
        console.log("newValue" + newValue);
        console.log("oldValue" + oldValue);
        if (newValue == oldValue) {
            return;
        }
        $debounce(showDept(-1, newValue), 500);
    }, true);
})

//已发便笺
.controller("noteFromListCtrl", function($scope, $http, $state, $ionicLoading, $location, $debounce, Recycling, showAttachFilePop, openFormFile, httpProxy, $ionicHistory) {
    $scope.isBianJian = true;
    $scope.nowpageIndex = 0;
    $scope.pageSize = pageSize;
    $scope.isExistData = true;
    var userId = localStorage.userid;
    $scope.items = [];
    $scope.moreDataCanBeLoaded = true;
    $scope.defaultUserIcon = CommonConstants.DEFAULT_USER_ICON;
    $scope.model = {};
    $scope.model.query = "";
    $scope.loadMore = function() {
        var start = $scope.nowpageIndex * $scope.pageSize;
        var limit = $scope.pageSize;
        var undoUrl = baseURL + "/action?getNote=1&action=toBoxListView&start=" + start + "&limit=" + limit + "&userId=" + userId;
        if ($scope.model.query) {
            undoUrl += "&key=" + $scope.model.query;
        }
        httpProxy.getJSON(undoUrl, "", function(data) {
            var datas = data.data.rows;
            if (datas && datas.length < $scope.pageSize) {
                $scope.moreDataCanBeLoaded = false;
            }
            for (var i = 0; datas && i < datas.length; i++) {
                if (datas[i].userIcon && datas[i].userIcon.indexOf("/") != 0) {
                    datas[i].userIcon = datas[i].userIcon + "/";
                }
                datas[i].userIcon = baseURL + datas[i].userIcon;
                $scope.items.push(datas[i]);
            }
            if (datas && datas.length > 0) {
                $scope.isExistData = true;
            } else {
                $scope.isExistData = false;
            }
            console.log($scope.items);
            $scope.nowpageIndex++;
            $scope.$broadcast('scroll.infiniteScrollComplete');
        })

    };
    $scope.openNoteDetail = function(item) {
        $state.go("noteDetail", { noteId: item.id, edit: false });
    }

    $scope.doRefresh = function() {
        $ionicLoading.show({
            template: '加载中...',
            duration: 1000
        });
        $scope.nowpageIndex = 0;
        $scope.items = new Array();
        var start = $scope.nowpageIndex * $scope.pageSize;
        var limit = $scope.pageSize;

        var undoUrl = baseURL + "/action?getNote=1&action=toBoxListView&start=" + start + "&limit=" + limit + "&userId=" + userId;
        if ($scope.model.query) {
            undoUrl += "&key=" + $scope.model.query;
        }
        httpProxy.getJSON(undoUrl, "", function(data) {
            var datas = data.data.rows;
            if (datas.length < $scope.pageSize) {
                $scope.moreDataCanBeLoaded = false;
            }
            for (var i = 0; i < datas.length; i++) {
                if (datas[i].userIcon && datas[i].userIcon.indexOf("/") != 0) {
                    datas[i].userIcon = datas[i].userIcon + "/";
                }
                datas[i].userIcon = baseURL + datas[i].userIcon;
                $scope.items.push(datas[i]);
            }
            if (datas.length > 0) {
                $scope.isExistData = true;
            } else {
                $scope.isExistData = false;
            }
            $scope.nowpageIndex++;
            $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');
        });

    };
    $scope.noteDraft = function() {
        $state.go("createNote");
    }
    $scope.colseWin = function() {
        $state.go("user.mainNewUser");
    };
    
    $scope.$watch("model.query", function(newValue, oldValue) {
        console.log("$scope.query=" + $scope.model.query + ",newValue=" + newValue + ",oldValue=" + oldValue);
        if (newValue == oldValue) {
            return;
        }
        $debounce($scope.doRefresh, 500);
    }, true);

})

//已收便笺
.controller("noteToAllListCtrl", function($scope, $http, $ionicLoading, $state, $location, $debounce, Recycling, showAttachFilePop, openFormFile, httpProxy, $ionicHistory) {
    $scope.isBianJian = true;
    $scope.isExistData = true;
    $scope.nowpageIndex = 0;
    $scope.pageSize = pageSize;
    $scope.viewTitle = "便笺收件箱";
    var userId = localStorage.userid;
    $scope.items = [];
    $scope.moreDataCanBeLoaded = true;
    $scope.baseURL = baseURL;
    $scope.defaultUserIcon = CommonConstants.DEFAULT_USER_ICON;
    $scope.model = {};
    $scope.model.query = "";

    $scope.loadMore = function() {
        var start = $scope.nowpageIndex * $scope.pageSize;
        var limit = $scope.pageSize;
        var undoUrl = baseURL + "/action?getNote=1&action=recevieListView&start=" + start + "&limit=" + limit + "&userId=" + userId;
        if ($scope.model.query) {
            undoUrl += "&key=" + $scope.model.query;
        }
        httpProxy.getJSON(undoUrl, "", function(data) {
            console.log(data);
            var datas = data.data.rows;
            if (datas && datas.length < $scope.pageSize) {
                $scope.moreDataCanBeLoaded = false;
            }
            for (var i = 0; datas && i < datas.length; i++) {
                if (datas[i].userIcon && datas[i].userIcon.indexOf("/") != 0) {
                    datas[i].userIcon = datas[i].userIcon + "/";
                }
                datas[i].userIcon = baseURL + datas[i].userIcon;
                $scope.items.push(datas[i]);
            }
            if (datas && datas.length > 0) {
                $scope.isExistData = true;
            } else {
                $scope.isExistData = false;
            }
            console.log($scope.items);
            $scope.nowpageIndex++;
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    $scope.noteDraft = function() {
        $state.go("createNote");
    }

    $scope.openNoteDetail = function(item) {
        // if (item.statusValue != 3) {
        //     $state.go("noteDetail", { noteId: item.id, edit: true });
        // } else {
            $state.go("noteDetail", { noteId: item.id, edit: item.statusValue < 3 });
        // }
    }

    $scope.doRefresh = function() {
        $ionicLoading.show({
            template: '加载中...',
            duration: 1000
        });
        $scope.nowpageIndex = 0;
        $scope.items = new Array();
        var start = $scope.nowpageIndex * $scope.pageSize;
        var limit = $scope.pageSize;
        var undoUrl = baseURL + "/action?getNote=1&action=recevieListView&start=" + start + "&limit=" + limit + "&userId=" + userId;
        if ($scope.model.query) {
            undoUrl += "&key=" + $scope.model.query;
        }
        httpProxy.getJSON(undoUrl, "", function(data) {
            var datas = data.data.rows;
            if (datas.length < $scope.pageSize) {
                $scope.moreDataCanBeLoaded = false;
            }
            for (var i = 0; i < datas.length; i++) {
                if (datas[i].userIcon && datas[i].userIcon.indexOf("/") != 0) {
                    datas[i].userIcon = datas[i].userIcon + "/";
                }
                datas[i].userIcon = baseURL + datas[i].userIcon;
                $scope.items.push(datas[i]);
            }
            if (datas.length > 0) {
                $scope.isExistData = true;
            } else {
                $scope.isExistData = false;
            }
            $scope.nowpageIndex++;
            $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');
        });

    };

    $scope.$watch("model.query", function(newValue, oldValue) {
        console.log("$scope.query=" + $scope.model.query + ",newValue=" + newValue + ",oldValue=" + oldValue);
        if (newValue == oldValue) {
            return;
        }
        $debounce($scope.doRefresh, 500);
    }, true);
})

//待办便笺
.controller("noteToListCtrl", function($scope, $http, $ionicLoading, $state, $location, $debounce, Recycling, showAttachFilePop, openFormFile, httpProxy, $ionicHistory) {
    $scope.isBianJian = true;
    $scope.isExistData = true;
    $scope.nowpageIndex = 0;
    $scope.pageSize = pageSize;
    $scope.viewTitle = "便笺待办箱";
    var userId = localStorage.userid;
    $scope.items = [];
    $scope.moreDataCanBeLoaded = true;
    $scope.baseURL = baseURL;
    $scope.defaultUserIcon = CommonConstants.DEFAULT_USER_ICON;
    $scope.model = {};
    $scope.model.query = "";

    $scope.loadMore = function() {
        var start = $scope.nowpageIndex * $scope.pageSize;
        var limit = $scope.pageSize;
        var undoUrl = baseURL + "/action?getNote=1&start=" + start + "&limit=" + limit + "&userId=" + userId;
        if ($scope.model.query) {
            undoUrl += "&key=" + $scope.model.query;
        }
        httpProxy.getJSON(undoUrl, "", function(data) {
            console.log(data);
            var datas = data.data.rows;
            if (datas && datas.length < $scope.pageSize) {
                $scope.moreDataCanBeLoaded = false;
            }
            for (var i = 0; datas && i < datas.length; i++) {
                if (datas[i].userIcon && datas[i].userIcon.indexOf("/") != 0) {
                    datas[i].userIcon = datas[i].userIcon + "/";
                }
                datas[i].userIcon = baseURL + datas[i].userIcon;
                $scope.items.push(datas[i]);
            }
            if (datas && datas.length > 0) {
                $scope.isExistData = true;
            } else {
                $scope.isExistData = false;
            }
            console.log($scope.items);
            $scope.nowpageIndex++;
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    $scope.noteDraft = function() {
        $state.go("createNote");
    }

    $scope.openNoteDetail = function(item) {
        $state.go("noteDetail", { noteId: item.id, edit: true });
    }

    $scope.doRefresh = function() {
        $ionicLoading.show({
            template: '加载中...',
            duration: 1000
        });
        $scope.nowpageIndex = 0;
        $scope.items = new Array();
        var start = $scope.nowpageIndex * $scope.pageSize;
        var limit = $scope.pageSize;
        var undoUrl = baseURL + "/action?getNote=1&start=" + start + "&limit=" + limit + "&userId=" + userId;
        if ($scope.model.query) {
            undoUrl += "&key=" + $scope.model.query;
        }
        httpProxy.getJSON(undoUrl, "", function(data) {
            var datas = data.data.rows;
            if (datas.length < $scope.pageSize) {
                $scope.moreDataCanBeLoaded = false;
            }
            for (var i = 0; i < datas.length; i++) {
                if (datas[i].userIcon && datas[i].userIcon.indexOf("/") != 0) {
                    datas[i].userIcon = datas[i].userIcon + "/";
                }
                datas[i].userIcon = baseURL + datas[i].userIcon;
                $scope.items.push(datas[i]);
            }
            if (datas.length > 0) {
                $scope.isExistData = true;
            } else {
                $scope.isExistData = false;
            }
            $scope.nowpageIndex++;
            $ionicLoading.hide();
            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.$watch("model.query", function(newValue, oldValue) {
        console.log("$scope.query=" + $scope.model.query + ",newValue=" + newValue + ",oldValue=" + oldValue);
        if (newValue == oldValue) {
            return;
        }
        $debounce($scope.doRefresh, 500);
    }, true);

})

//便笺tab
.controller("noteTabController", function($rootScope, $scope, $http, $stateParams, $state, $ionicHistory, $ionicTabsDelegate) {
    $scope.viewTitle = "便签";

    $scope.closeWin = function() {
        $state.go("user.mainNewUser");
    };
})

//新建便笺
.controller("createNoteCtrl", function($scope, $http, $ionicLoading, $state, $stateParams, Toast, usedAndOrgSelect, httpProxy, $timeout, $ionicHistory) {
    var messageUrl = baseURL + "/action?getNote=1&action=getNewId";
    var rootDept = localStorage.mainUnit;
    $scope.noteId = "";
    $scope.reply = $scope;
    $scope.viewTitle = "便笺回复";
    $scope.userId = localStorage.userid;
    $scope.userName = localStorage.username;
    httpProxy.getJSON(messageUrl, "", function(data) {
        console.log(data.data.rows[0].newId);
        $scope.noteId = data.data.rows[0].newId;
    });
    $scope.rangeName = "";
    $scope.range = "";
    $scope.tabType = 1; // 1 机构通讯录    ---0 常用联系人
    $scope.selectUserArr = new Array();
    $scope.sendNote = function() {
        var content = $scope.content;
        var jsondata = new Object();
        jsondata.id = $scope.noteId;
        jsondata.state = 1;
        jsondata.content = $scope.content;
        jsondata.range = $scope.range;
        jsondata.rangeName = $scope.rangeName;
        jsondata.userName = $scope.userName;
        jsondata.userId = $scope.userId;
        console.log(jsondata);
        var url = baseURL + "/action?getNote=1&action=noteSave&__DATA=" + JSON.stringify(jsondata);
        httpProxy.getJSON(url, "", function(data) {
            data = data.data;
            console.log(data);
            if (data.result) {
                Toast.showPop("发送成功");
                $ionicHistory.goBack();
            } else {
                Toast.showPop(data.message || "发送内容为空");
            }
        });
    }

    //获取组织机构树数据
    if (window.orgitems) {
        $scope.orgitems = window.orgitems;
    }
    if (!$scope.orgitems) {
        var messageUrl = baseURL + "/action?userContactActionAngular=1&action=getOrgUsersJs&rootDeptId=" + rootDept + "&userId=" + localStorage.userid;
        httpProxy.getJSON(messageUrl, "", function(data) {
            $scope.orgitems = new Array();
            var datas = data.data.rows;
            for (var j = 0; datas && j < datas.length; j++) {
                datas[j].isShow = false;
                $scope.orgitems.push(datas[j]);
            }
        })
    }

    $scope.openSelcetUser = function() {
        usedAndOrgSelect.showPop($timeout, Toast, 0, false, $scope, function(selectArray) {
            $scope.rangeName = "";
            $scope.range = "";
            for (var i = 0; i < selectArray.length; i++) {
                if (i == (selectArray.length - 1)) {
                    $scope.rangeName += selectArray[i].username;
                    $scope.range += selectArray[i].userid;
                } else {
                    $scope.rangeName += selectArray[i].username + ","
                    $scope.range += selectArray[i].userid + ","
                }
            }
        })
    }

    $scope.closeWin = function() {
        $state.go("noteTab");
    };
})

//便笺回复
.controller("noteReplyCtrl", function($scope, $http, $ionicLoading, $state, $stateParams, Toast, httpProxy, $ionicHistory) {
    $scope.reply = $scope;
    $scope.query = "";
    var noteId = $stateParams.noteId;
    var rid = $stateParams.rid;
    $scope.viewTitle = "便笺回复";
    var userId = localStorage.userid;
    $scope.item = new Object();
    $scope.init = function() {
        var url = baseURL + "/action?getNote=1&action=getNoteInfoById&noteId=" + noteId + "&userId=" + userId;
        httpProxy.getJSON(url, "", function(data) {
            var datas = data.data.rows;
            $scope.item = datas[0];
            console.log(datas);
        });
    }
    $scope.replyNote = function() {
        var content = $scope.content;
        var jsondata = new Object();
        jsondata.noteId = noteId;
        jsondata.userId = userId;
        jsondata.rid = rid;
        jsondata.content = content;
        console.log(jsondata);
        var url = baseURL + "/action?getNote=encoded&action=replyNote&__DATA=" + JSON.stringify(jsondata);
        httpProxy.getJSON(url, "", function(data) {
            console.log(data);
            data = data.data;
            Toast.showPop(data.message);
            if (data.result) {
                $state.go("noteTab.noteToAllList", {});
            }
        });
    }
    $scope.init();
    $scope.closeWin = function() {
        $ionicHistory.goBack();
    }
})

//便笺详情
.controller("noteDetailCtrl", function($scope, $http, $location, $ionicScrollDelegate, $state, $ionicLoading, $stateParams, showAttachFilePop, httpProxy, $ionicHistory, $ionicPopup, Toast) {
    var noteId = $stateParams.noteId;
    var userId = localStorage.userid;
    $scope.bar = {};
    $scope.bar.edit = $stateParams.edit == "false" ? false : true;
    $scope.baseURL = baseURL;
    $scope.item = new Object();
    $scope.load = function() {
        var url = baseURL + "/action?getNote=1&action=getNoteInfoById&noteId=" + noteId + "&userId=" + userId;
        console.log("[便笺详情]:"+url);
        httpProxy.getJSON(url, "", function(data) {
            var datas = data.data.rows;
            $scope.item = datas[0];
            var setReadUrl = baseURL+"/action?getNote=1&action=noteSetRead&replyId="+$scope.item.rid + "&noteId=" + noteId;
            console.log('[setReadUrl]' + setReadUrl);
            //标记已读
            httpProxy.getJSON( setReadUrl, "", function(data) {
                console.log(data);
            });
            console.log($scope.item);
        });
    }

    $scope.closeWin = function() {
        $state.go("noteTab");
        // $ionicHistory.goBack();
    };

    $scope.noteReply = function(item) {
        var url = "noteReply";
        $state.go(url, { noteId: item.id, rid: item.rid });
    }
    $scope.load();

    $scope.openDocList = function(files) {
        showAttachFilePop.showCommentFileByData(files, $scope, "便笺附件");
    }

    $scope.clkComment = function() {
        var item = $scope.item;

        if (item.openMoreComments == true) {
            $scope.item.comments = {};
            $scope.item.openMoreComments = false;
            return;
        }

        var url = baseURL + "/action?getNote=1&action=getNoteReplyInfoById&noteId=" + noteId;
        httpProxy.getJSON(url, "", function(data) {
            data = data.data;
            if (data.rows.length > 0) {
                $scope.item.openMoreComments = true;
                $scope.item.comments = data.rows;
            } else {

                Toast.showPop("没有回复");
            }
        });
    };

    $scope.noteForward = function(item){
        var url = "forwardNote";
        $state.go(url, { noteId: item.id });
    }

    $scope.noteFinish = function(item){
		var template = '<ion-list>'+
   		'<div class=" item item-input">'+
				     '<input id="TxtReason" style="padding-left:5px;" type="text" placeholder="请填写办结意见" ng-model="TxtReason" ></input>'+
				  	 '<div class="icon placeholder-icon"  style="padding-right:15px;"><img height=20 src="../img/ic_comment.png"></div>'+
				  '</div>'+
  		'<ion-list>';
		var myPopup = $ionicPopup.show({
	        title : '<h4 style="font-weight:bold;">便笺办结</h4>',
	        template: template,
	        scope: $scope,
	        buttons: [{
		        text: '<b>取消</b>',
		        type: 'button-positive',
		        onTap: function(e) {
		        	myPopup.close();
		            e.preventDefault();
		        }
		      },
		      {
		        text: '<b>办结</b>',
		        type: 'button-positive',
		        onTap: function(e) {
		        	var TxtReason = $("#TxtReason").val();
		        	if(!TxtReason){
		        		Toast.showPop("请先填写办结意见！");
		        		return;
		        	}
		        	myPopup.close();
		        	var url = baseURL + '/action?getNote=1&action=nodeEnd&content='+TxtReason+"&noteId="+noteId+"&replyId="+item.rid + "&userId" + userId;
			    	var params = new Object();
				    console.log(url);
				    httpProxy.postJSON(url,params,function(data){
			        	Toast.showPop(data.message);
			        	setTimeout(function(){
							if(data.result){
                                $state.go("noteTab");
							}
						},500);
				    });
		            e.preventDefault();
		        }
		      }
		    ]
       });
	}

})

//便笺转发
.controller("forwardNoteCtrl", function($scope, $http, $ionicLoading, $state, $stateParams, Toast, usedAndOrgSelect, httpProxy, $timeout, $ionicHistory,showAttachFilePop, $ionicPopup) {
    // ------------------获取原始便笺信息
    var noteId = $stateParams.noteId;
    var userId = localStorage.userid;
    $scope.item = new Object();
    $scope.load = function() {
        var url = baseURL + "/action?getNote=1&action=getNoteInfoById&noteId=" + noteId + "&userId=" + userId;
        console.log("[便笺详情]:"+url);
        httpProxy.getJSON(url, "", function(data) {
            var datas = data.data.rows;
            $scope.item = datas[0];
            $scope.item.content = "转发(" + $scope.item.createUserName +")\n---------------------------------------------\n" + 
                                                $scope.item.createUserName + ":" + $scope.item.content + "\n" + $scope.item.sendTime;
            console.log($scope.item);
        });
    }

    $scope.openDocList = function(files) {
        showAttachFilePop.showCommentFileByData(files, $scope, "便笺附件");
    }

    $scope.load();
    var messageUrl = baseURL + "/action?getNote=1&action=getNewId";
    var rootDept = localStorage.mainUnit;
    $scope.noteId = "";
    $scope.reply = $scope;
    $scope.viewTitle = "便笺回复";
    $scope.userId = localStorage.userid;
    $scope.userName = localStorage.username;
    httpProxy.getJSON(messageUrl, "", function(data) {
        console.log(data.data.rows[0].newId);
        $scope.noteId = data.data.rows[0].newId;
    });
    $scope.rangeName = "";
    $scope.range = "";
    $scope.tabType = 1; // 1 机构通讯录    ---0 常用联系人
    $scope.selectUserArr = new Array();
    $scope.sendNote = function() {
        var content = $scope.content;
        var jsondata = new Object();
        jsondata.id = $scope.noteId;
        jsondata.state = 1;
        jsondata.content = $scope.item.content;
        jsondata.range = $scope.range;
        jsondata.rangeName = $scope.rangeName;
        jsondata.userName = $scope.userName;
        jsondata.userId = $scope.userId;
        console.log(jsondata);
        var url = baseURL + "/action?getNote=1&action=noteSave&__DATA=" + JSON.stringify(jsondata);
        httpProxy.getJSON(url, "", function(data) {
            data = data.data;
            console.log(data);
            if (data.result) {
                Toast.showPop("发送成功");
                $state.go("noteTab");
            } else {
                Toast.showPop(data.message || "发送内容为空");
            }
        });
    }

    //获取组织机构树数据
    if (window.orgitems) {
        $scope.orgitems = window.orgitems;
    }
    if (!$scope.orgitems) {
        var messageUrl = baseURL + "/action?userContactActionAngular=1&action=getOrgUsersJs&rootDeptId=" + rootDept + "&userId=" + localStorage.userid;
        httpProxy.getJSON(messageUrl, "", function(data) {
            $scope.orgitems = new Array();
            var datas = data.data.rows;
            for (var j = 0; datas && j < datas.length; j++) {
                datas[j].isShow = false;
                $scope.orgitems.push(datas[j]);
            }
        })
    }

    $scope.openSelcetUser = function() {
        usedAndOrgSelect.showPop($timeout, Toast, 0, false, $scope, function(selectArray) {
            $scope.rangeName = "";
            $scope.range = "";
            for (var i = 0; i < selectArray.length; i++) {
                if (i == (selectArray.length - 1)) {
                    $scope.rangeName += selectArray[i].username;
                    $scope.range += selectArray[i].userid;
                } else {
                    $scope.rangeName += selectArray[i].username + ","
                    $scope.range += selectArray[i].userid + ","
                }
            }
        })
    }

    $scope.closeWin = function() {
        var confirmPopup = $ionicPopup.confirm({
                title: '舍弃草稿' ,
                template: '<div align="center">舍弃草稿并退出</div>',
                cancelText: '取消',
                okText: '确定'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    $ionicHistory.goBack();
                    // $state.go("noteTab");//TODO 
                } else {
                    console.log('You are not sure');
                }
            });
    };
})


//请假申请
.controller("leaveListController", function($scope, $state, $sms, $rootScope, $stateParams, $ionicSlideBoxDelegate, showAlert, $interval, getDataSource, userHelp, $ionicLoading, DataSource, $debounce, openFormFile) {
    var start = 0; //列表数据开始位置
    var limit = pageSize; //列表数据偏移位
    var userId = localStorage.userid;
    var action = "getLeave=1";

    $scope.moreDataCanBeLoaded = true;
    $scope.items = [];
    $scope.model = {};
    $scope.model.query = "";

    $scope.doRefresh = function() {
        console.log("[请假-doRefresh()] ");

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
        console.log("[请假-loadMoreItems()] ");
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
            v: item.status > 0 ? 1 : 0,
            type: "g_inbox",
            gInboxId: item.id,
            operationType: "Leave",
            isAttention: item.isattention,
            backReason: "",
            actName: item.actName,
            historyUrl : 'leaveList'
        });
    }
    
    $scope.goback = function() {
        $state.go("user.mainNewUser");
    }

    $scope.createNew = function(){
    	var formId = 687389000140259;
    	var moduleId = 358910;
    	var info_id = 0;
    	if(dotNet){
    		info_id = 0;
    	}
    	var pid=0;
    	var pnid=0;
    	var wfId = 881863;
    	var title = ""||"表单";
    	title = encodeURIComponent(title);
    	var showComment = false;
    	var v = "0";
    	var type = "g_inbox";
    	var gInboxId="";
    	var operationType = "FileDraft";	//表单类型
    	var isAttention = false;
    	var backReason = '';
    	var callback = function(){ console.log("empty callback"); };
    	var actName = '';
        var historyUrl = 'leaveList';
    	openFormFile.openFile(formId,info_id,moduleId,wfId,pid,pnid,title,showComment,v,type,gInboxId,operationType , isAttention , backReason , callback , actName, historyUrl);
    };

    $scope.$watch("model.query", function(newValue, oldValue) {
        console.log("$scope.query=" + $scope.model.query + ",newValue=" + newValue + ",oldValue=" + oldValue);
        if (newValue == oldValue) {
            return;
        }
        $debounce($scope.doRefresh, 500);
    }, true);
})

//内部公函
.controller("internalLettersCtrl", function($scope, $state, $sms, $rootScope, $stateParams, $ionicSlideBoxDelegate, showAlert, $interval, getDataSource, userHelp, $ionicLoading, DataSource, $debounce, openFormFile) {
    var start = 0; //列表数据开始位置
    var limit = pageSize; //列表数据偏移位
    var userId = localStorage.userid;
    var action = "getInternalLetters=1";

    $scope.moreDataCanBeLoaded = true;
    $scope.items = [];
    $scope.model = {};
    $scope.model.query = "";

    $scope.doRefresh = function() {
        console.log("[内部公函-doRefresh()] ");

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
        console.log("[内部公函-loadMoreItems()] ");
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
            v: item.status > 0 ? 1 : 0,
            type: "g_inbox",
            gInboxId: item.id,
            operationType: "Letters",
            isAttention: item.isattention,
            backReason: "",
            actName: item.actName,
            historyUrl : 'internalLetters'
        });
    }

    $scope.goback = function() {
        $state.go("user.mainNewUser");
    }

    $scope.createNew = function(){
        var formId = 446194064456;
    	var moduleId = 451543;
    	var info_id = 0;
    	if(dotNet){
    		info_id = 0;
    	}
    	var pid=0;
    	var pnid=0;
    	var wfId = 881860;
    	var title = ""||"表单";
    	title = encodeURIComponent(title);
    	var showComment = false;
    	var v = "0";
    	var type = "g_inbox";
    	var gInboxId="";
    	var operationType = "FileDraft";	//表单类型
    	var isAttention = false;
    	var backReason = '';
    	var callback = function(){ console.log("empty callback"); };
    	var actName = '';
        var historyUrl = 'internalLetters';
    	openFormFile.openFile(formId,info_id,moduleId,wfId,pid,pnid,title,showComment,v,type,gInboxId,operationType , isAttention , backReason , callback , actName, historyUrl);
    }

    $scope.$watch("model.query", function(newValue, oldValue) {
        console.log("$scope.query=" + $scope.model.query + ",newValue=" + newValue + ",oldValue=" + oldValue);
        if (newValue == oldValue) {
            return;
        }
        $debounce($scope.doRefresh, 500);
    }, true);
})

//通知公告
.controller("noticeNewCtrl", function($scope, $state, $sms, $rootScope, $stateParams, $ionicSlideBoxDelegate, showAlert, $interval, getDataSource, userHelp, $ionicLoading, DataSource, $debounce) {
    var start = 0; //列表数据开始位置
    var limit = pageSize; //列表数据偏移位
    var userId = localStorage.userid;
    var action = "getNotice=1";

    $scope.moreDataCanBeLoaded = true;
    $scope.items = [];
    $scope.model = {};
    $scope.model.query = "";

    $scope.doRefresh = function() {
        console.log("[通知公告-doRefresh()] ");

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
        console.log("[通知公告-loadMoreItems()] ");
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
            type: "oa_notice",
            gInboxId: item.id,
            operationType: "Notice",
            isAttention: item.isattention,
            backReason: "",
            actName: item.actName
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

//一般阅件
.controller("toReadController", function($scope, $state, $sms, $rootScope, $stateParams, $ionicSlideBoxDelegate, showAlert, $interval, getDataSource, userHelp, $ionicLoading, DataSource, $debounce) {
    var start = 0; //列表数据开始位置
    var limit = pageSize; //列表数据偏移位
    var userId = localStorage.userid; 
    var action = "getReview=1";
    $scope.userId = userId;

    $scope.moreDataCanBeLoaded = true;
    $scope.items = [];
    $scope.model = {};
    $scope.model.query = "";

    $scope.doRefresh = function() {
        console.log("[待阅-doRefresh()] ");

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
        console.log("[待阅-loadMoreItems()] ");
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
            v: 1,
            type: "g_inbox",
            gInboxId: item.id,
            operationType: "ToRead",
            isAttention: item.isattention,
            backReason: "",
            actName: item.actName,
            historyUrl : 'toRead'
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

//我的关注
.controller("myFocusController", function($scope, $state, $sms, $rootScope, $stateParams, $ionicSlideBoxDelegate, showAlert, $interval, getDataSource, userHelp, $ionicLoading, DataSource, $debounce) {
    var start = 0; //列表数据开始位置
    var limit = pageSize; //列表数据偏移位
    var userId = localStorage.userid; 
    var action = "getFocus=1";
    $scope.userId = userId;

    $scope.moreDataCanBeLoaded = true;
    $scope.items = [];
    $scope.model = {};
    $scope.model.query = "";

    $scope.doRefresh = function() {
        console.log("[收藏-doRefresh()] ");

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
        console.log("[收藏-loadMoreItems()] ");
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
            v: 1,
            type: "g_inbox",
            gInboxId: item.id,
            operationType: "ToDo",
            isAttention: item.isattention,
            backReason: "",
            actName: item.actName,
            historyUrl : 'myFocus'
        });
    }
    $scope.goback = function() {
        $state.go("user.userInfo");
    }

    $scope.$watch("model.query", function(newValue, oldValue) {
        console.log("$scope.query=" + $scope.model.query + ",newValue=" + newValue + ",oldValue=" + oldValue);
        if (newValue == oldValue) {
            return;
        }
        $debounce($scope.doRefresh, 500);
    }, true);
})

;