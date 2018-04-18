APPController.controller("myController", function ($scope) {

})
.controller("wpxylistController", function ($scope, $http, $state, $rootScope, $stateParams,showAlert, getDataSource, $ionicModal, $ionicScrollDelegate, $ionicSideMenuDelegate) {
	var pjtype=$stateParams.pjtype;
	var pjcode = $stateParams.pjcode;
	//默认小图标
	$scope.userdefaultpng = "../staticresource/userphoto/userdefaultpng.png";

	$scope.OtherWPXYList = new Array();
	$scope.ReFleshTab = function (pjtype) {
		//评价查询
		getDataSource.getDataSource(["GetWPXYRSByPJType"], { bcid: user.classid, pjtype: pjtype, pjcode: $scope.pjcode }, function (data) {
			//showAlert.showLoading();
			$scope.OtherWPXYList = data;
			//showAlert.hideLoading();
		});
	}
	
})
.controller("stuappraiseController", function ($scope, $http, $state, $rootScope, $stateParams, getDataSource, showAlert, $ionicModal, $ionicPopup, $ionicScrollDelegate, $ionicSideMenuDelegate) {
	var user = $rootScope.user;
	$scope.PJKCList = new Array();
	$scope.YPKCList = new Array();
	$scope.OtherWPPJList = new Array();
	$scope.OtherYPPJList = new Array();
	$scope.kcwhInfo = new Object();
	$scope.PJItemList = new Array();
	//$scope.PJCurrentItemList = new Array();
	$scope.PJLevelData = new Array();
	$scope.PJGroupList = new Array();
	$scope.pjcode = "";
	$scope.wpnum = 0; 
	$scope.ypnum = 0;
	$scope.disabledSubmit = false;
	$scope.showSubmit = false;
	$scope.showNoRecord = false;
	$scope.myStyle = { margin: "0px 0px 0px 0px" };
	$rootScope.backButtonNoAction = false;//禁止返回按钮

	$scope.formType = new Object();
	var isIOS = ionic.Platform.isIOS();
	var isAndroid = ionic.Platform.isAndroid();
	if (isAndroid) {
	    $scope.myStyle = { margin: "0px 0px 0px 0px" };
	}
	if (isIOS) {
	    $scope.myStyle = { margin: "20px 0px 0px 0px" };
	}
	$scope.LoadPageData = function () {
		showAlert.showLoading();
		$scope.LoadPJKCListData();
		showAlert.hideLoading();
		$scope.$broadcast('scroll.refreshComplete');
	};
	$scope.LoadPJKCListData = function () {
		getDataSource.getDataSource(["GetXYKCPJCode"], { bcid: user.classid }, function (data) {
			$scope.pjcode = data[0].pjcode;
			//评价查询
			getDataSource.getDataSource(["GetXYPJKCList", "GetOtherPJ"], { bcid: user.classid.toString(), xyinfoid: user.info_id, pjcode: $scope.pjcode }, function (data) {
				//课程评价未评
				$scope.PJKCList = _.filter(_.find(data, { name: "GetXYPJKCList" }).data, { yp: 0 });
				//课程评价已评
				$scope.YPKCList = _.filter(_.find(data, { name: "GetXYPJKCList" }).data, { yp: 1 });
				$scope.OtherWPPJList = _.filter(_.find(data, { name: "GetOtherPJ" }).data, { yp: 0 });
				$scope.OtherYPPJList = _.filter(_.find(data, { name: "GetOtherPJ" }).data, { yp: 1 });
				$scope.wpnum = $scope.PJKCList.length + $scope.OtherWPPJList.length;
				$scope.ypnum = $scope.YPKCList.length + $scope.OtherYPPJList.length;

				if (($scope.PJKCList.length + $scope.OtherWPPJList.length) <= 0) {
					$scope.showNoRecord = true;
				}
			});
		});
	};
	$scope.LoadPageData();

	$ionicModal.fromTemplateUrl('../templates/PJDetail.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function (modal) {
		$scope.modal = modal;
	});

	$scope.GetKCWHInfo = function (kc) {
		$scope.disabledSubmit = false;
		getDataSource.getDataSource(["Get_KCWHInfoByInfoId"], { bcid: user.classid, info_id: kc.info_id, kwid: kc.info_id }, function (data) {
			$scope.kcwhInfo = data[0];
			$scope.PJGroupList = [{ groupname: "课程评价" }];//,{ groupname:  '总体评价'}, { groupname: '班主任评价'}
			getDataSource.getDataSource(["GetKCPJItemList", "GetPJLevelData"], { xyinfoid: user.info_id, pjtype: $scope.PJGroupList[0].groupname, bcid: user.classid, kwid: kc.info_id, pjcode: $scope.pjcode, jxxs: kc.jxxs }, function (data) {
				//所有评价项
				$scope.PJItemList = _.find(data, { name: "GetKCPJItemList" }).data;
				//按kc对象过滤评价项
				$scope.PJLevelData = _.find(data, { name: "GetPJLevelData" }).data;//单选选项

				var length = $scope.PJGroupList.length;
				var yp = false;
				//console.log(length);
				for (var i = 0; i < length; i++) {
					$scope.PJGroupList[i].PJCurrentItemList = _.filter($scope.PJItemList, { jxxs: kc.jxxs, pjtype: $scope.PJGroupList[i].groupname });

					var itemlength = $scope.PJGroupList[i].PJCurrentItemList.length;
					for (var j = 0; j < itemlength; j++) {
						$scope.PJGroupList[i].PJCurrentItemList[j].PJLevelList = _.filter($scope.PJLevelData, { type: "NUMBER" });
						//是否已评
						var defaultvalue = $scope.PJGroupList[i].PJCurrentItemList[j].defaultvalue;
						//$scope.PJGroupList[i].PJCurrentItemList[j].yp = (defaultvalue != "" && defaultvalue != null);
						if ((defaultvalue != "" && defaultvalue != null)) {
							yp = true;
						}
						$scope.PJGroupList[i].PJCurrentItemList[j].yp = yp;
						//设置默认值
						$scope.PJGroupList[i].PJCurrentItemList[j].xyinfoid =user.info_id;
						$scope.PJGroupList[i].PJCurrentItemList[j].bcid = user.classid;
						$scope.PJGroupList[i].PJCurrentItemList[j].kwid = kc.info_id;
						$scope.PJGroupList[i].PJCurrentItemList[j].elementid = "element" + getDataSource.getGUID();
					}
				}
				$scope.showSubmit = !yp;
			});
			$ionicScrollDelegate.scrollTop();
		});
		
	};

	$scope.GetOtherInfo = function (type) {
		$scope.formType = type;
		$scope.disabledSubmit = false;
		$scope.PJGroupList = new Array();

		$scope.PJGroupList.push({ groupname: type.pjtype });
		//$scope.PJGroupList = [{ groupname: "课程评价" }];//,{ groupname:  '总体评价'}, { groupname: '班主任评价'}
		getDataSource.getDataSource(["GetOtherPJItemList", "GetPJLevelData"], {
			xyinfoid: user.info_id, pjtype: type.pjtype, bcid: user.classid, pjcode: $scope.pjcode
		}, function (data) {
			//所有评价项
			$scope.PJItemList = _.find(data, { name: "GetOtherPJItemList" }).data;
			$scope.PJLevelData = _.find(data, { name: "GetPJLevelData" }).data;//单选选项
			//console.log($scope.PJItemList);
			var length = $scope.PJGroupList.length;
			var yp=false;
			for (var i = 0; i < length; i++) {
				$scope.PJGroupList[i].PJCurrentItemList = _.filter($scope.PJItemList, { pjtype: type.pjtype });
				var itemlength = $scope.PJGroupList[i].PJCurrentItemList.length;
				for (var j = 0; j < itemlength; j++) {
					$scope.PJGroupList[i].PJCurrentItemList[j].PJLevelList = _.filter($scope.PJLevelData, { type: "NUMBER" });
					//是否已评
					var defaultvalue = $scope.PJGroupList[i].PJCurrentItemList[j].defaultvalue;
					var defaulttext = $scope.PJGroupList[i].PJCurrentItemList[j].defaulttext;
					$scope.PJGroupList[i].PJCurrentItemList[j].checkedbox = false;
					if((defaultvalue != "" && defaultvalue != null) || (defaulttext != "" && defaulttext != null)){
						yp = true;
						$scope.PJGroupList[i].PJCurrentItemList[j].checkedbox = true;
					}
					$scope.PJGroupList[i].PJCurrentItemList[j].yp = yp; 
					//设置默认值
					$scope.PJGroupList[i].PJCurrentItemList[j].xyinfoid = user.info_id;
					$scope.PJGroupList[i].PJCurrentItemList[j].bcid = user.classid;
					$scope.PJGroupList[i].PJCurrentItemList[j].kwid ="";
					$scope.PJGroupList[i].PJCurrentItemList[j].elementid = "element" + getDataSource.getGUID();
				}
			}
			$scope.showSubmit = !yp;
			$ionicScrollDelegate.scrollTop()//加载完把滚动条设置到顶部
		});
	}

	

	// A confirm dialog
	$scope.showConfirm = function (kc) {
		var confirmPopup = $ionicPopup.confirm({
			title: '提示',
			template: '评价一旦提交就无法修改，确定要提交该评价吗?',
			okText: "确定",
			cancelText: "取消",
			okType: "button-assertive"
		});
		confirmPopup.then(function (res) {
			if (res) {
				$scope.SavePjData(kc);
			}
		});
	};

	$scope.CheckSubmit = function (kc) {
		var length = $scope.PJGroupList[0].PJCurrentItemList.length;
		var elementid = "";
		var chkbox = 0;
		var haschkbox =false;
		for (var i = 0; i < length; i++) {
			var type = $scope.PJGroupList[0].PJCurrentItemList[i].type;
			var checkedbox = $scope.PJGroupList[0].PJCurrentItemList[i].checkedbox;
			elementid = $scope.PJGroupList[0].PJCurrentItemList[i].elementid;
			var itemname = $scope.PJGroupList[0].PJCurrentItemList[i].name;
			var val = $("#" + elementid + "").find("input[class*='hide-ngmode-val']").val();
			if (type == "DJ") {
				if (val == "") {
					showAlert.alert("还有未完成的选项。");
					return;
				}
			} else if (type == "YJ2") {
				haschkbox =true;
				if (checkedbox) {
					chkbox++;
				}
			}
		}
		if (haschkbox&&(chkbox < 2 || chkbox > 4)) {
			showAlert.alert("多选限选2-4项。");
			return;
		}
		$scope.showConfirm(kc);
	}

	$scope.SavePjData = function (kc) {
		//赋值
		//$scope.disabledSubmit = true;
		var length = $scope.PJGroupList[0].PJCurrentItemList.length;
		var elementid = "";
		var removearry = new Array();
		for (var i = 0; i < length; i++) {
			elementid = $scope.PJGroupList[0].PJCurrentItemList[i].elementid;
			if ($scope.PJGroupList[0].PJCurrentItemList[i].type == "DJ") {
				$scope.PJGroupList[0].PJCurrentItemList[i].defaultvalue = $("#" + elementid + "").find("input[class*='hide-ngmode-val']").val();
			}
			else if ($scope.PJGroupList[0].PJCurrentItemList[i].type == "YJ2") {
				if ($scope.PJGroupList[0].PJCurrentItemList[i].checkedbox) {
					$scope.PJGroupList[0].PJCurrentItemList[i].defaultvalue = $scope.PJGroupList[0].PJCurrentItemList[i].id;
				} else {
					removearry.push($scope.PJGroupList[0].PJCurrentItemList[i].id);
				}
			}
			else {
				$scope.PJGroupList[0].PJCurrentItemList[i].defaultvalue = $("#" + elementid + "").find("input[class*='hide-ngmode-text']").text();
			}
		}

		var arrlen = removearry.length;
		for (var i = 0; i < arrlen; i++) {
			_.remove($scope.PJGroupList[0].PJCurrentItemList, { id: removearry[i] });
		}
		var formname='';
		if ($scope.formType.pjtype == "总体评价") {
			formname = '评价:班次的教学总体评价';
		}else if($scope.formType.pjtype == "班主任评价"){
			formname = '评价:班主任工作评价';
		}else {
			formname = '评价:' + $scope.kcwhInfo.kcname + '课程';
		}
		var pData = { postData: $scope.PJGroupList[0].PJCurrentItemList, formname: formname }
		$http.post("../api/PJOperation", JSON.stringify(pData))
		.success(function (data) {
			if (data.error) {
				//error(data.error);
			}
			else {
				//success(data);
				//保存成功找到刚保存的课程，移到已评数组里去了。
				if ($scope.formType.pjtype == "总体评价" || $scope.formType.pjtype == "班主任评价") {
					var obj = _.find($scope.OtherWPPJList, { pjtype: $scope.formType.pjtype });
					obj.yp = 1;
					$scope.OtherYPPJList.push(obj);
					_.remove($scope.OtherWPPJList, { pjtype: $scope.formType.pjtype });
				} else {
					var obj = _.find($scope.PJKCList, { info_id: kc.info_id });
					obj.yp = 1;
					$scope.YPKCList.push(obj);
					_.remove($scope.PJKCList, { info_id: kc.info_id });
				}
				$scope.wpnum = $scope.wpnum - 1;//未评总数
				$scope.ypnum = $scope.ypnum + 1;//已评总数

				//console.log($rootScope.iconvalArray);
				//同步评价的数字
				_.find($rootScope.iconvalArray, function (d) {
					return d.key == "wpnum";
				}).val--;

				$scope.closeOtherModal();
			}
			//console.log(1);
		})
		.error(function (data) {
			//error(data);
		});
	};

	$scope.openOtherModal = function (type) {
		$scope.GetOtherInfo(type);
		$scope.modal.show();
	}
	$scope.closeOtherModal = function () {
		$scope.modal.hide();
	}

	$scope.openModal = function (kc) {
		$scope.GetKCWHInfo(kc);
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
})
.controller("PJDetail", function ($scope, $http, $state, $rootScope, $stateParams, getDataSource, showAlert, $ionicModal, $ionicPopup, $ionicScrollDelegate, $ionicSideMenuDelegate) {

})
.controller("teachappraiseController", function ($scope, $state, $rootScope, $stateParams, getDataSource, $ionicModal,$ionicTabsDelegate, $ionicScrollDelegate, $ionicSideMenuDelegate) {
	var user = $rootScope.user;
	$scope.pjcode = 0;
	$scope.PJXYList = new Array();
	$scope.YPXYList = new Array();
	$scope.PJKCList = new Array();
	$scope.OtherWPXYList = new Array();
	$scope.OtherYPXYList = new Array();
	$scope.OtherPJAvg = 0;

	var isIOS = ionic.Platform.isIOS();
	$scope.marTop = "";
	if (isIOS) {
	    $scope.marTop = "margin-top:20px";
	}
	
	//
	//默认小图标
	$scope.userdefaultpng = "../staticresource/userphoto/userdefaultpng.svg";

	$scope.ReFleshTab = function (pjtype,idx) {
		$rootScope.user.selectTabIndex = idx;
		$rootScope.user.selectTabTitle = pjtype;
		$ionicTabsDelegate.$getByHandle('myhandle').select(idx);
		//评价查询
		getDataSource.getDataSource(["GetWPXYRSByPJType", "GetYPXYRSByPJType", "GetOtherPJAvg"], { bcid: user.classid, pjtype: pjtype, pjcode: $scope.pjcode }, function (data) {
			$scope.OtherWPXYList = _.find(data, { name: "GetWPXYRSByPJType" }).data;
			$scope.OtherYPXYList = _.find(data, { name: "GetYPXYRSByPJType" }).data;
			$scope.OtherPJAvg = _.find(data, { name: "GetOtherPJAvg" }).data[0].avgpj;
		});
	}

	$scope.ReKCFleshTab = function (idx) {
		$rootScope.user.selectTabIndex = idx;
		$ionicTabsDelegate.$getByHandle('myhandle').select(idx);
		var tabTitle = "课程评价";
		//评价查询
		getDataSource.getDataSource(["GetBCPJKCList"], { bcid: user.classid, pjtype: tabTitle, pjcode: $scope.pjcode }, function (data) {
			$scope.PJKCList = data;
		});
	}

	$scope.LoadPageData = function () {
		getDataSource.getDataSource(["GetXYKCPJCode"], { bcid: user.classid }, function (data) {
			$scope.pjcode = data[0].pjcode;
			if ($rootScope.user.selectTabIndex == undefined) {
				$rootScope.user.selectTabIndex = 0;
				$rootScope.user.selectTabTitle = "课程评价";
			}
			if ($rootScope.user.selectTabIndex == 0) {
				$scope.ReKCFleshTab($rootScope.user.selectTabIndex);
			} else {
				$scope.ReFleshTab($rootScope.user.selectTabTitle, $rootScope.user.selectTabIndex);
			}
		});
	}

	$scope.HrefTo = function (pjtype, kcid) {
		$state.go("choosestudentlist", { type: pjtype, id: kcid });
	}

	$scope.LoadPageData();
})
.controller("samequestionController", function ($scope, $state, $rootScope, $stateParams,showAlert,calcDate, getDataSource, $ionicScrollDelegate, $ionicSideMenuDelegate) {
	var userid = $stateParams.xyinfoid;
	var user = $rootScope.user;
	$scope.QuestionList = new Array();
	$scope.ShowNoRecord = false;

	$scope.LoadPageData = function () {
		var fieldval = "q.createdate desc";
		showAlert.showLoading();
		$scope.LoadQuestionListData(fieldval);
		showAlert.hideLoading();
	};
	$scope.LoadQuestionListData = function (fieldval) {
		getDataSource.getDataSource(["Get_QuestionByCommentXYInfoIdContainDeleted"], { orderbyfield: fieldval, bcid: user.classid, myuserid: userid, userid: userid }, function (data) {
			$scope.QuestionList = data;
			var length = $scope.QuestionList.length;
			for (var i = 0; i < length; i++) {
				$scope.QuestionList[i].createdatestr = calcDate.getDateStr($scope.QuestionList[i],false);
			}
			if ($scope.QuestionList.length <= 0) {
				$scope.ShowNoRecord = true;
			}
		});
	};
	$scope.HrefTo = function (urltag, kwid) {
		$state.go(urltag, { info_id: kwid });
	};
	$scope.LoadPageData();
})
.controller("answerqstController", function ($scope, $state, $rootScope, $stateParams, showAlert,getDataSource, calcDate, $ionicScrollDelegate, $ionicSideMenuDelegate) {
    getDataSource.getDataSource("doLogServer", { content: "我的观点" }, function () { });
    var userid = $stateParams.xyinfoid;
	var user = $rootScope.user;
	$scope.QuestionList = new Array();

	$scope.LoadPageData = function () {
		var fieldval = "q.createdate desc";
		showAlert.showLoading();
		$scope.LoadQuestionListData(fieldval);
		showAlert.hideLoading();
	};
	$scope.LoadQuestionListData = function (fieldval) {
		var AnswerList = new Array();
		getDataSource.getDataSource(["Get_QuestionByAnswerXYInfoIdContainDeleted", "Get_AnswerByXYInfoIdContainDeleted"]
			, { orderbyfield: fieldval, bcid: user.classid, userid: userid }, function (data) {
				$scope.QuestionList = _.find(data, { name: "Get_QuestionByAnswerXYInfoIdContainDeleted" }).data;
				AnswerList = _.find(data, { name: "Get_AnswerByXYInfoIdContainDeleted" }).data;
				var length = $scope.QuestionList.length;
				var answerLength = AnswerList.length;
				for (var i = 0; i < length; i++) {
					$scope.QuestionList[i].createdatestr = calcDate.getDateStr($scope.QuestionList[i],false);
					$scope.QuestionList[i].questionAnswer = new Array();
					for (var k = 0; k < answerLength; k++) {
						if (AnswerList[k].finfo_id == $scope.QuestionList[i].info_id) {
							$scope.QuestionList[i].questionAnswer.push(AnswerList[k]);
						}
					}
				}
				if (length <= 0) {
					$scope.ShowNoRecord = true;
				}
		});
	};
	$scope.HrefTo = function (urltag, kwid) {
		$state.go(urltag, { info_id: kwid });
	};
	$scope.LoadPageData();
})
.controller("myquestionController", function ($scope, $state, $rootScope, $stateParams,showAlert, getDataSource,calcDate, $ionicScrollDelegate, $ionicSideMenuDelegate) {
    getDataSource.getDataSource("doLogServer", { content: "我的提问" }, function () { });
    var userid = $stateParams.xyinfoid;
	var user = $rootScope.user;
	$scope.QuestionList = new Array();
	$scope.ShowNoRecord = false;

	$scope.LoadPageData = function () {
		var fieldval = "q.createdate desc";
		showAlert.showLoading();
		$scope.LoadQuestionListData(fieldval);
		showAlert.hideLoading();
	};
	$scope.LoadQuestionListData = function (fieldval) {
		getDataSource.getDataSource(["Get_QuestionByXYInfoIdContainDeleted"], { orderbyfield: fieldval, bcid: user.classid, myuserid: userid, userid: userid }, function (data) {
			$scope.QuestionList = data;
			var length = $scope.QuestionList.length;
			for (var i = 0; i < length; i++) {
				$scope.QuestionList[i].createdatestr = calcDate.getDateStr($scope.QuestionList[i],false);
			}
			if ($scope.QuestionList.length<=0) {
				$scope.ShowNoRecord = true;
			}
		});
	};
	$scope.HrefTo = function (urltag,kwid) {
		$state.go(urltag, { info_id: kwid });
	};
	$scope.LoadPageData();
})
.controller("teachactivityController", function ($scope, $state, $rootScope, $stateParams, showAlert,getDataSource, calcStar, $ionicScrollDelegate, $ionicSideMenuDelegate) {
	var user = $rootScope.user;
	var usertype = calcStar.getUserType(user);
	//控制培训按钮各种需求
	$scope.sortDesc = false;//时间默认降序
	$scope.sortHotDesc = true;//热度默认降序
	$scope.showHotArrow = true;
	$scope.showArrow = false;
	$scope.sortClass = "icon ion-arrow-down-c";//降序图标
	$scope.sortHotClass = "icon ion-arrow-down-c";
	//$scope.sortCheckedStyle = "";
	$scope.sortHotCheckedStyle = "color:red";
	$scope.ShowNoRecord = false;
	///////////////////////////////////////////////////////////////

	//默认小图标
	$scope.userdefaultpng = "../staticresource/userphoto/userdefaultpng.png";
	$scope.XYList = new Array();
	$scope.LoadPageData = function () {
		var fieldval = "s.hot desc";
		if ($scope.showHotArrow) {
			$scope.sortHotCheckedStyle = "color:red";
			$scope.sortCheckedStyle = "";
			if ($scope.sortHotDesc) {
			    fieldval = " score desc";
			} else {
			    fieldval = " score asc";
			}
		} 
		showAlert.showLoading();
		$scope.LoadXYListData(fieldval);
		showAlert.hideLoading();
		$scope.$broadcast('scroll.refreshComplete');
	};
	$scope.LoadXYListData = function (fieldval) {
		getDataSource.getDataSource(["getXyActivityList"], { classid: user.classid, orderbyfield: fieldval,usertype:usertype }, function (data) {
			$scope.XYList = data;
			var length = $scope.XYList.length;
			for (var i = 0; i < length; i++) {
				$scope.XYList[i].starArr = new Array();
				calcStar.getStar($scope.XYList[i]);
			}
			if (length <= 0) {
				$scope.ShowNoRecord = true;
			}
		});
	};
	$scope.LoadPageData();
	$scope.SortQuestion = function (btn, desc) {
		$scope.sortDesc = !desc;
		$scope.sortHotDesc = !desc;
		var fieldval = "";
		if (btn == 1) {
			$scope.sortHotCheckedStyle = "color:red";
			$scope.sortCheckedStyle = "";
			if ($scope.sortHotDesc) {
				fieldval = "s.hot desc";
				$scope.sortHotClass = "icon ion-arrow-down-c";
			} else {
				fieldval = "s.hot asc";
				$scope.sortHotClass = "icon ion-arrow-up-c";
			}
		}
		$scope.LoadXYListData(fieldval);
	};
	$scope.HrefTo = function (urltag,info_id) {
		$state.go(urltag, {xyinfoid: info_id });
	};
})
.controller("trainingController", function ($scope, $state, $rootScope, $stateParams, calcDate, showAlert,getDataSource, $ionicModal, $ionicPopup, $ionicScrollDelegate, $ionicSideMenuDelegate) {
	
	var kwid = $stateParams.info_id;
	var user = $rootScope.user;
	$scope.QuestionList = new Array();
	$scope.question = { questionText: "" };
	$scope.answer = { answerText: "" };
	$scope.isFilter = { linkMe: false };//是否与我相关；
	$scope.WenTiNum = 0;

	$scope.sortDesc = true;//时间默认降序
	$scope.sortHotDesc = false;//热度默认降序
	$scope.showHotArrow = false;
	$scope.showArrow = true;
	$scope.sortClass = "icon ion-arrow-down-c";//降序图标
	$scope.sortHotClass = "icon ion-arrow-down-c";
	$scope.sortCheckedStyle = "color:red";
	$scope.sortHotCheckedStyle = "";
	$scope.ShowNoRecord = false;

	$scope.watchLoad = false;

	$scope.GetKCWHInfo = function () {
		var myuserid = "";
		if ($scope.isFilter.linkMe) {
			myuserid = user.info_id;
		}
		//解决拖动刷新保留当前排序
		var fieldval = "";
		if ($scope.showHotArrow) {
			$scope.sortHotCheckedStyle = "color:red";
			$scope.sortCheckedStyle = "";
			if ($scope.sortHotDesc) {
			    fieldval = " score desc";
			} else {
			    fieldval = " score asc";
			}
		} else {
			$scope.sortCheckedStyle = "color:red";
			$scope.sortHotCheckedStyle = "";
			if ($scope.sortDesc) {
				fieldval = " s.createdate desc";
			} else {
				fieldval = " s.createdate asc";
			}
		}

		getDataSource.getDataSource(["Get_NewCountByNewTime", "Get_QuestionByNewTime", "Get_CommentByNewTime", "Get_AnswerByNewTime"]
			, { bcid: user.classid, userid: user.info_id, orderbyfield: fieldval },
			function (data) {
				var dataObj = _.find(data, { name: "Get_NewCountByNewTime" });
				//$scope.qstinfo.qstnum = dataObj.data[0].questionsum;
				$scope.LoadQuestionInfo(data);
				$scope.watchLoad = true;
			});
	};
	$scope.LoadQuestionInfo = function (data) {
		$scope.QuestionList = _.find(data, { name: "Get_QuestionByNewTime" }).data;
		//课程的所有赞
		var CommentList = _.find(data, { name: "Get_CommentByNewTime" }).data;
		var commentLength = CommentList.length;
		//课程的所有答案
		var AnswerList = _.find(data, { name: "Get_AnswerByNewTime" }).data;
		var answerLength = AnswerList.length;

		var length = $scope.QuestionList.length;
		if (length <= 0) {
			$scope.ShowNoRecord = true;
		}
		for (var i = 0; i < length; i++) {
			$scope.QuestionList[i].createdatestr = calcDate.getDateStr($scope.QuestionList[i]);
			$scope.QuestionList[i].showCommentInfo = false;
			$scope.QuestionList[i].showComment = false;

			//我问的（红），我答的（灰），我同问的（灰色空心）。优先级：我问>我答>我同问 icomment
			if ($scope.QuestionList[i].icomment == 1) {
				$scope.QuestionList[i].iconColor = "#d5d5d5";
				$scope.QuestionList[i].iconClass = "icon ion-ios-circle-outline";
			}
			if ($scope.QuestionList[i].ianswer == 1) {
				$scope.QuestionList[i].iconColor = "#d5d5d5";
				$scope.QuestionList[i].iconClass = "icon ion-record";
			}
			if ($scope.QuestionList[i].iask == 1) {
				$scope.QuestionList[i].iconColor = "red";
				$scope.QuestionList[i].iconClass = "icon ion-record";
				//我问的可以自己删除
				$scope.QuestionList[i].delAnswer = true;
			}
			$scope.QuestionList[i].showCommentIcon = "icon ion-arrow-down-b";
			//标题的颜色 红色字体代表现场问题（根据提问时段）
			//if ($scope.kcwh.kssj <= $scope.QuestionList[i].createdate && $scope.QuestionList[i].createdate <= $scope.kcwh.jssj) {
			//	$scope.QuestionList[i].titleColor = "red";
			//}

			//问题的赞
			$scope.QuestionList[i].questionComment = new Array();
			//问题的答案
			$scope.QuestionList[i].questionAnswer = new Array();
			for (var j = 0; j < commentLength; j++) {
				if (CommentList[j].finfo_id == $scope.QuestionList[i].info_id) {
					$scope.QuestionList[i].questionComment.push(CommentList[j]);
				}
			}

			for (var k = 0; k < answerLength; k++) {
				if (AnswerList[k].finfo_id == $scope.QuestionList[i].info_id) {
					$scope.QuestionList[i].questionAnswer.push(AnswerList[k]);
				}
			}
		}
	};

	$scope.LoadPageData = function () {
		showAlert.showLoading();
		$scope.GetKCWHInfo();
		showAlert.hideLoading();
		$scope.$broadcast('scroll.refreshComplete');
		$scope.$watch("watchLoad", function () {
			//清除动态数字
			if ($scope.watchLoad) {
				getDataSource.getDataSource(["ClearNewsTime"], { bcid: user.classid, userid: user.info_id }, function (data) {
					_.find($rootScope.iconvalArray, function (d) {
						return d.key == "myQuestionCount";
					}).val = 0;
				});
			}
		});
	};

	$scope.LoadPageData();
	
	$scope.ShowCommentInfo = function (q) {
		q.showCommentInfo = !q.showCommentInfo;
		if (q.showCommentInfo) {
			q.showCommentIcon = "icon ion-arrow-up-b";
			$ionicScrollDelegate.scrollBy(0, 100, true);
		} else {
			q.showCommentIcon = "icon ion-arrow-down-b";
			$ionicScrollDelegate.scrollBy(0, -100, true);
		}

	};
    //发表问题
    /*
	$scope.Publish = function () {

		if ($scope.question.questionText == "") {
			return;
		}
		//保存数据
		var guid = getDataSource.getGUID();
		var formData = {
			guid: guid, bcid: user.classid, bcid: user.classid, title: $scope.question.questionText
			, kwid: kwid, userid: user.info_id, username: user.username
			, questionnum: 1, questiorealnnum:1,answernum: 0,answerrealnum:0,samequestionnum:0,samequestionrealnum:0,usertype:0
		};
		//学员登录提问的处理
		if (user.type == "student") {
			getDataSource.getDataSource(["Insert_Questions", "Update_XYXX_questionNumAdd", "Update_JWKCWH_questionNumAdd"], formData, function (data) {
				//发表成功关闭输入框
				$scope.closeModal();
				showAlert.showToast("发布成功");

				//新元素客户新增。
				$scope.QuestionList.splice(0, 0, {
					info_id: guid, hot: 0, enedit: 0, iask: 1, ianswer: 0
					, hasanswer: 0, title: $scope.question.questionText, kwid: kwid, createdate: new Date()
					, userid: user.info_id, username: user.username, samequestionnum: 0, answernum: 0
					, answerrealnum: 0, showCommentInfo: false, showComment: false, delAnswer: true, questionComment: [], questionAnswer: []
				});
			});
		} else if (user.type == "teacher" || user.type == "visitor") {
			getDataSource.getDataSource(["Insert_Questions", "Update_JWBBXX_questionNumAdd", "Update_JWKCWH_questionNumAdd"], formData, function (data) {
				//发表成功关闭输入框
				$scope.closeModal();
				showAlert.showToast("发布成功");

				//新元素客户端新增。
				$scope.QuestionList.splice(0, 0, {
					info_id: guid, hot: 0, enedit: 0, iask: 1, ianswer: 0
					, hasanswer: 0, title: $scope.question.questionText, kwid: kwid, createdate: new Date()
					, userid: user.info_id, username: user.username, samequestionnum: 0, answernum: 0
					, answerrealnum: 0, showCommentInfo: false, showComment: false, delAnswer: true, questionComment: [], questionAnswer: []
				});
			});
		}
	};
	//发布答案
	$scope.PublishAnswer = function (question) {
		if ($scope.answer.answerText == "") {
			return;
		}
		var guid = getDataSource.getGUID();
		var formData = { guid:guid,bcid: user.classid, answer: $scope.answer.answerText, finfo_id: question.info_id, userid: user.info_id, username: user.username, deleted: 0 };
		getDataSource.getDataSource(["Insert_Answer", "Update_XYXX_AnswerNum", "Update_Questions_AnswerNum"], formData, function (data) {
			//发表成功关闭输入框
			$scope.closeAnswerModal();
			showAlert.showToast("发表成功");
			question.answernum = question.answernum + 1;
			//答案新元素客户端新增。
			question.questionAnswer.splice(0, 0, {
				info_id: guid, userid: user.info_id, username: user.username
				, finfo_id: question.info_id, createdate: new Date(), answer: $scope.answer.answerText, ianswer: 1, deleted: 0
			});
			question.showCommentInfo = false;
			question.hasanswer = 1;
		});
	};*/

	$scope.FilterQuestion = function () {
		var formData = new Object();
		if ($scope.isFilter.linkMe) {
			formData = { bcid: user.classid, userid: user.info_id, info_id: kwid, myuserid: user.info_id, orderbyfield: "s.createdate" };
		} else {
			formData = { bcid: user.classid, userid: user.info_id, info_id: kwid, orderbyfield: "s.createdate desc" };
		}
		getDataSource.getDataSource(["Get_QuestionByBCID", "Get_CommentByBCID", "Get_AnswerByBCID"], formData, function (data) {
			$scope.LoadQuestionInfo(data);
		});
	};
	//按时间排序
	$scope.SortQuestion = function (btn, desc) {
		var formData = new Object();
		$scope.sortDesc = !desc;
		$scope.sortHotDesc = !desc;
		var fieldval = "";

		if (btn == 1) {
			$scope.sortHotCheckedStyle = "color:red";
			$scope.sortCheckedStyle = "";
			$scope.showHotArrow = true;
			$scope.showArrow = false;
			if ($scope.sortHotDesc) {
				fieldval = "s.hot desc";
				$scope.sortHotClass = "icon ion-arrow-down-c";
			} else {
				fieldval = "s.hot asc";
				$scope.sortHotClass = "icon ion-arrow-up-c";
			}
		} else {
			$scope.sortCheckedStyle = "color:red";
			$scope.showHotArrow = false;
			$scope.showArrow = true;
			$scope.sortHotCheckedStyle = "";
			if ($scope.sortDesc) {
				fieldval = "s.createdate desc";
				$scope.sortClass = "icon ion-arrow-down-c";
			} else {
				fieldval = "s.createdate asc";
				$scope.sortClass = "icon ion-arrow-up-c";
			}
		}
		formData = {bcid:user.classid, userid: user.info_id, info_id: kwid, orderbyfield: fieldval };
		getDataSource.getDataSource(["Get_QuestionByBCID", "Get_CommentByBCID", "Get_AnswerByBCID"], formData, function (data) {
			$scope.LoadQuestionInfo(data);
		});
	};
	//保存同问
	$scope.SaveSameQuesttion = function (q) {
		var formData = { bcid: user.classid, userid: user.info_id, username: user.username, finfo_id: q.info_id, isgood: 1, replaydate: new Date(), ncontent: "", replayid: "" };
		getDataSource.getDataSource(["Insert_Comment", "Update_Question_SameQuestionNum", "Update_XYXX_SameQuestionNum"], formData, function (data) {
			q.samequestionnum = q.samequestionnum + 1;
			//设置为disabled
			q.icomment = 0;
			//重新加载数据
			$scope.LoadPageData();
		});
	};

	$scope.ShowCommentBtn = function (q) {
		q.showComment = !q.showComment;
	};
	$ionicModal.fromTemplateUrl('../templates/PublishAnswer.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function (modal) {
		$scope.AnswerModal = modal;
	});

	$scope.openAnswerModal = function (q) {
		$scope.question = q;
		$scope.answer.answerText = "";
		$scope.AnswerModal.show();
	};
	$scope.closeAnswerModal = function () {
		$scope.AnswerModal.hide();
	};
	//Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function () {
		$scope.AnswerModal.remove();
	});


	$ionicModal.fromTemplateUrl('../templates/PublishQuestion.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function (modal) {
		$scope.modal = modal;
	});

	$scope.HrefTo = function (urltag) {
		$state.go(urltag);
	};

	$scope.openModal = function (url) {
		$scope.question.questionText = "";
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

	// A confirm dialog
	$scope.showConfirm = function (question) {
		var confirmPopup = $ionicPopup.confirm({
			title: '提示',
			template: '确定要删除该问题吗?',
			okText: "确定",
			cancelText: "取消",
			okType: "button-assertive"
		});
		confirmPopup.then(function (res) {
			if (res) {
				//执行删除的方法体
				getDataSource.getDataSource(["Delete_Questions", "Update_JWKCWH_questionNumReduce"], { bcid: user.classid, qstinfo_id: question.info_id, kwid: question.kwid }, function (data) {
					//$scope.showAlert("删除成功");
					_.remove($scope.QuestionList, function (obj) {
						return obj.info_id == question.info_id;
					});
					$scope.kcwh.questionnum = $scope.kcwh.questionnum - 1
				});
			} else {
				//$scope.showAlert("删除失败" + res)
			}
		});
	};

	$scope.showAnswerConfirm = function (question, questionAnswer, answer) {
		var confirmPopup = $ionicPopup.confirm({
			title: '提示',
			template: '确定要删除该观点吗?',
			okText: "确定",
			cancelText: "取消",
			okType: "button-assertive"
		});
		confirmPopup.then(function (res) {
			if (res) {
				//执行删除的方法体
				getDataSource.getDataSource(["Delete_Questions_Answer", "Update_Question_AnswerNumReduce"], { bcid: user.classid, ansinfo_id: answer.info_id, qstinfo_id: question.info_id }, function (data) {
					_.remove(questionAnswer, function (obj) {
						return obj.info_id == answer.info_id;
					});
					question.answernum = question.answernum - 1;
				});
			} else {
				//$scope.showAlert("删除失败" + res)
			}
		});
	};

	// An alert dialog
	$scope.showAlert = function (message) {
		var alertPopup = $ionicPopup.alert({
			title: '提示',
			template: message
		});
		alertPopup.then(function (res) {
			//console.log('Thank you for not eating my delicious ice cream cone');
		});
	};
})
.controller("ntrainingController", function ($scope, $state, $rootScope, $stateParams, showAlert,getDataSource, $ionicModal, $ionicPopup, $ionicScrollDelegate, $ionicSideMenuDelegate) {
	var user = $rootScope.user;
	$scope.sortDesc = false;//时间默认升序
	$scope.sortHotDesc = false;//热度默认降序
	$scope.showHotArrow = false;
	$scope.showArrow = true;
	$scope.sortClass = "icon ion-arrow-up-c";//降序图标
	$scope.sortHotClass = "icon ion-arrow-down-c";
	$scope.sortCheckedStyle = "color:red";
	$scope.sortHotCheckedStyle = "";

	$scope.newCount = 0;
	$scope.ShowNews = false;
	$scope.moreDataCanBeLoaded = true;
	$scope.pageindex = 0;

	$scope.TrainingKCList = new Array();
	$scope.LoadPageData = function () {
		//解决拖动刷新保留当前排序
		var fieldval = "";
		if ($scope.showHotArrow) {
			$scope.sortHotCheckedStyle = "color:red";
			$scope.sortCheckedStyle = "";
			if ($scope.sortHotDesc) {
				fieldval = " s.hot desc";
			} else {
				fieldval = " s.hot asc";
			}
		} else {
			$scope.sortCheckedStyle = "color:red";
			$scope.sortHotCheckedStyle = "";
			if ($scope.sortDesc) {
				fieldval = " s.kwsdate desc";
			} else {
				fieldval = " s.kwsdate asc";
			}
		}
		$scope.pageindex = 1;
		$scope.moreDataCanBeLoaded = true;
		$scope.TrainingKCList = new Array();

		showAlert.showLoading();
		$scope.LoadPJKCListData(fieldval);
		showAlert.hideLoading();
		$scope.$broadcast('scroll.refreshComplete');
	};

	

	$scope.loadMore = function () {
		$scope.pageindex++;
		var fieldval = "";
		if ($scope.showHotArrow) {
			$scope.sortHotCheckedStyle = "color:red";
			$scope.sortCheckedStyle = "";
			if ($scope.sortHotDesc) {
				fieldval = " s.hot desc";
			} else {
				fieldval = " s.hot asc";
			}
		} else {
			$scope.sortCheckedStyle = "color:red";
			$scope.sortHotCheckedStyle = "";
			if ($scope.sortDesc) {
				fieldval = " s.kwsdate desc";
			} else {
				fieldval = " s.kwsdate asc";
			}
		}
		$scope.LoadPJKCListData(fieldval);
	}

	$scope.LoadPJKCListData = function (fieldval) {
		if (user.type == "student") {
			//"Get_NewCountByNewTime",
			getDataSource.getDataSource(["Get_NewCountByNewTime", "GetXYTrainingKCList"], {
				bcid: user.classid, userid: user.info_id, xyinfoid: user.info_id, orderbyfield: fieldval, pageindex: $scope.pageindex
			}, function (data) {
				var dataArray = _.find(data, { name: "GetXYTrainingKCList" }).data;
				if (dataArray.length == 0) {
					$scope.moreDataCanBeLoaded = false;
				}
				for (var i = 0; i < dataArray.length; i++) {
					$scope.TrainingKCList.push(dataArray[i]);
				}

				//$scope.TrainingKCList = _.find(data, { name: "GetXYTrainingKCList" }).data;
				$scope.newCount = _.find(data, { name: "Get_NewCountByNewTime" }).data[0].newcount;
				if ($scope.newCount > 0) {
					$scope.ShowNews = true;
				} else {
					$scope.ShowNews = false;
				}
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
			
		} else if (user.type == "teacher" || user.type == "visitor") {
			getDataSource.getDataSource(["Get_NewCountByNewTime", "GetTeachTrainingKCList"], {
				bcid: user.classid, userid: user.info_id, xyinfoid: user.info_id, orderbyfield: fieldval
			}, function (data) {
				$scope.TrainingKCList = _.find(data, { name: "GetTeachTrainingKCList" }).data;
				$scope.newCount = _.find(data, { name: "Get_NewCountByNewTime" }).data[0].newcount;
				if ($scope.newCount > 0) {
					$scope.ShowNews = true;
				} else {
					$scope.ShowNews = false;
				}
			});
		}
	}
	//$scope.LoadPageData();
	$scope.SortQuestion = function (btn,desc) {
		$scope.sortDesc = !desc;
		$scope.sortHotDesc = !desc;

		$scope.pageindex = 1;
		var fieldval = " s.kwsdate desc";
		if (btn == 1) {
			$scope.sortHotCheckedStyle = "color:red";
			$scope.sortCheckedStyle = "";
			$scope.showHotArrow = true;
			$scope.showArrow = false;

			if ($scope.sortHotDesc) {
				fieldval = "s.score desc";
				$scope.sortHotClass = "icon ion-arrow-down-c";
			} else {
				fieldval = "s.score asc";
				$scope.sortHotClass = "icon ion-arrow-up-c";
			}
		} else {
			$scope.sortCheckedStyle = "color:red";
			$scope.sortHotCheckedStyle = "";
			$scope.showHotArrow = false;
			$scope.showArrow = true;
			if ($scope.sortDesc) {
				fieldval = "s.kwsdate desc";
				$scope.sortClass = "icon ion-arrow-down-c";
			} else {
				fieldval = "s.kwsdate asc";
				$scope.sortClass = "icon ion-arrow-up-c";
			}
		}
		$scope.pageindex = 1;
		$scope.moreDataCanBeLoaded = true;
		$scope.TrainingKCList = new Array();
		$scope.LoadPJKCListData(fieldval);
	};
	$scope.HrefTo = function (kc) {
		$state.go("KCDetail", {info_id:kc.info_id});
	};
	$scope.LookNews = function () {
		$scope.ShowNews = false;
		$state.go("training");
	}
})
.controller("KCDetailController", function ($scope, $state, $rootScope, $stateParams,showAlert, calcDate,calcStar, getDataSource, showAlert,
	$ionicModal, $ionicPopup, $ionicScrollDelegate, $ionicSideMenuDelegate) {
	var kwid = $stateParams.info_id;
	var user = $rootScope.user;
	$scope.QuestionList = new Array();
	$scope.question = { questionText: "" };
	$scope.answer = { answerText: "" };
	$scope.isFilter = { linkMe: false };//是否与我相关；

	$scope.sortDesc = true;//时间默认降序
	$scope.sortHotDesc = false;//热度默认降序
	$scope.showHotArrow = false;
	$scope.showArrow = true;
	$scope.sortClass = "icon ion-arrow-down-c";//降序图标
	$scope.sortHotClass = "icon ion-arrow-down-c";
	$scope.sortCheckedStyle = "color:red";
	$scope.sortHotCheckedStyle = "";
	$scope.ShowNoRecord = false;
	$scope.watchLoad = false;//监听是否加载完成

	$scope.NewsCount = 0;

	$scope.$watch("answer.answerText", function (val) {
		//console.log(val);
		if (val!="") {
			$rootScope.backButtonNoAction = true;
		} else {
			$rootScope.backButtonNoAction = false;
		}
	});

	$scope.$watch("question.questionText", function (val) {
		if (val != "") {
			$rootScope.backButtonNoAction = true;
		} else {
			$rootScope.backButtonNoAction = false;
		}
	});

	$scope.WenTiNum = 0;
	//$scope.kcwh = { questionnum: 0 };
	//$scope.PublishBtn = {disable:true};
	//$scope.pageindex = 1;
	//select * from ( select rownum rn,p.* from ([原SQL]) p where rownum<[pageindex]*10 ) c where c.rn>([pageindex]-1)*10

	$scope.GetKCWHInfo = function () {
		var myuserid = "";
		if ($scope.isFilter.linkMe) {
			myuserid = user.info_id;
		}
		//解决拖动刷新保留当前排序
		var fieldval = "";
		if ($scope.showHotArrow) {
			$scope.sortHotCheckedStyle = "color:red";
			$scope.sortCheckedStyle = "";
			if ($scope.sortHotDesc) {
				fieldval = " s.hot desc";
			} else {
				fieldval = " s.hot asc";
			}
		} else {
			$scope.sortCheckedStyle = "color:red";
			$scope.sortHotCheckedStyle = "";
			if ($scope.sortDesc) {
				fieldval = " s.createdate desc";
			} else {
				fieldval = " s.createdate asc";
			}
		}

		getDataSource.getDataSource(["Get_KCWHInfoByInfoId", "Get_QuestionByKWID", "Get_CommentByFinfoId", "Get_AnswerByFinfoId", "Get_NewCountByNewTimeKWID"]
			, { bcid: user.classid, userid: user.info_id, info_id: kwid, orderbyfield: fieldval }, function (data) {
				//, pageindex: $scope.pageindex 
			var dataObj = _.find(data, { name: "Get_KCWHInfoByInfoId" });
			$scope.kcwh = dataObj.data[0];
			
			$scope.WenTiNum = $scope.kcwh.questionnum;
			$scope.LoadQuestionInfo(data);
			$scope.watchLoad = true;
			$scope.NewsCount = _.find(data, { name: "Get_KCWHInfoByInfoId" }).data[0].newcount;
		});
	};

	$scope.LoadQuestionInfo = function (data) {
		$scope.QuestionList = _.find(data, { name: "Get_QuestionByKWID" }).data;
		//课程的所有赞
		var CommentList = _.find(data, { name: "Get_CommentByFinfoId" }).data;
		var commentLength = CommentList.length;
		//课程的所有答案
		var AnswerList = _.find(data, { name: "Get_AnswerByFinfoId" }).data;
		var answerLength = AnswerList.length;

		var length = $scope.QuestionList.length;
		if (length <= 0) {
			$scope.ShowNoRecord = true;
		}
		for (var i = 0; i < length; i++) {
			//var date = toUTCDate(new Date($scope.QuestionList[i].createdate));
			$scope.QuestionList[i].createdatestr = calcDate.getDateStr($scope.QuestionList[i],false);
			//默认是否显示评论
			$scope.QuestionList[i].showCommentInfo = false;
			$scope.QuestionList[i].showComment = false;
			//我问的（红），我答的（灰），我同问的（灰色空心）。优先级：我问>我答>我同问 icomment
			if ($scope.QuestionList[i].icomment == 1) {
				$scope.QuestionList[i].iconColor = "#d5d5d5";
				$scope.QuestionList[i].iconClass = "icon ion-ios-circle-outline";
			}
			if ($scope.QuestionList[i].ianswer == 1) {
				$scope.QuestionList[i].iconColor = "#d5d5d5";
				$scope.QuestionList[i].iconClass = "icon ion-record";
			} 
			if ($scope.QuestionList[i].iask == 1) {
				$scope.QuestionList[i].iconColor = "red";
				$scope.QuestionList[i].iconClass = "icon ion-record";
				//我问的可以自己删除
				$scope.QuestionList[i].delAnswer = true;
			}
			$scope.QuestionList[i].showCommentIcon = "icon ion-arrow-down-b";
			//标题的颜色 红色字体代表现场问题（根据提问时段）
			if ($scope.kcwh.kssj <= $scope.QuestionList[i].createdate && $scope.QuestionList[i].createdate<=$scope.kcwh.jssj) {
				$scope.QuestionList[i].titleColor = "red";
			}

			//问题的赞
			$scope.QuestionList[i].questionComment = new Array();
			//问题的答案
			$scope.QuestionList[i].questionAnswer = new Array();
			for (var j = 0; j < commentLength; j++) {
				if (CommentList[j].finfo_id == $scope.QuestionList[i].info_id) {
					$scope.QuestionList[i].questionComment.push(CommentList[j]);
				}
			}
			for (var k = 0; k < answerLength; k++) {
				if (AnswerList[k].finfo_id == $scope.QuestionList[i].info_id) {
					$scope.QuestionList[i].questionAnswer.push(AnswerList[k]);
				}
			}
		}
	};

	$scope.LoadPageData = function () {
		$scope.pageindex = 1;
		showAlert.showLoading();
		$scope.GetKCWHInfo();
		showAlert.hideLoading();
		$scope.$broadcast('scroll.refreshComplete');
		$scope.$watch("watchLoad", function () {
			//清除动态数字
			if ($scope.watchLoad) {
				getDataSource.getDataSource(["ClearNewsTimeByKWID"], { bcid: user.classid, userid: user.info_id, kwid: kwid }, function (data) {
					var tempcount = _.find($rootScope.iconvalArray, function (d) {
						return d.key == "myQuestionCount";
					}).val;
					tempcount = tempcount - $scope.NewsCount;
					_.find($rootScope.iconvalArray, function (d) {
						return d.key == "myQuestionCount";
					}).val = tempcount;
				});
			}
		});
	};

	//$scope.LoadMoreData = function () {
	//	$scope.pageindex++;
	//	$scope.GetKCWHInfo();
	//	$scope.$broadcast('scroll.infiniteScrollComplete');
	//	//$scope.moreDataCanBeLoaded = false;
	//}

	$scope.LoadPageData();
	
	//
	$scope.ShowCommentInfo = function (q) {
		q.showCommentInfo = !q.showCommentInfo;
		if (q.showCommentInfo) {
			q.showCommentIcon = "icon ion-arrow-up-b";
			$ionicScrollDelegate.scrollBy(0, 100, true);
		} else {
			q.showCommentIcon = "icon ion-arrow-down-b";
			$ionicScrollDelegate.scrollBy(0, -100, true);
		}
		
	};
	//发表问题
	$scope.Publish = function () {
		$rootScope.backButtonNoAction = false;
		var usertype=-1;
		if ($scope.question.questionText == "") {
			return;
		}
		//学员登录提问的处理,记录该课程的最新访问时间
		usertype = calcStar.getUserType(user);
		//保存数据
		var guid=getDataSource.getGUID();
		var formData = {
			guid: guid, classid: user.classid, bcid: user.classid, title: $scope.question.questionText, qstinfo_id: guid
			, kwid: kwid, userid: user.info_id, username: user.username
			, questionnum: 1, questiorealnnum: 1, answernum: 0, answerrealnum: 0, samequestionnum: 0, samequestionrealnum: 0, usertype: usertype
		};

		getDataSource.getDataSource(["Select_CacheQANumber"], formData, function (data) {

			//处理用户缓存数据
			//var QACacheList = _.find(data, { name: "Select_CacheQANumber" }).data;
			var QACacheList = data;
			var keyArray = new Array();
			keyArray.push("Insert_Questions");
			keyArray.push("Update_JWKCWH_questionNumAdd");
			keyArray.push("DeleteAppQuestionVister");
			keyArray.push("InsertAppQuestionVister");
			if (QACacheList.length <= 0) {
				keyArray.push("Insert_CacheQANumber");
			} else {
				keyArray.push("Update_CacheQANumber");
			}
			getDataSource.getDataSource(keyArray, formData, function (data) {
				//发表成功关闭输入框
				$scope.closeModal();
				showAlert.showToast("发布成功");
				//新元素客户端新增。
				$scope.QuestionList.splice(0, 0, {
					info_id: guid, hot: 0, enedit: 0, iask: 1, ianswer: 0
					, hasanswer: 0, title: $scope.question.questionText, kwid: kwid, createdate: new Date()
					, userid: user.info_id, username: user.username, samequestionnum: 0, answernum: 0
					, answerrealnum: 0, showCommentInfo: false, showComment: false, delAnswer: true, questionComment: [], questionAnswer: []
				});
				$scope.WenTiNum = $scope.WenTiNum + 1;
				$scope.ShowNoRecord = false;
			});
		});
	};

	//发布答案
	$scope.PublishAnswer = function (question) {
		$rootScope.backButtonNoAction = false;
		var usertype = -1;
		if ($scope.answer.answerText == "") {
			return;
		}
		usertype = calcStar.getUserType(user);
		var guid = getDataSource.getGUID();
		var formData = {
			guid: guid, bcid: user.classid, answer: $scope.answer.answerText, finfo_id: question.info_id, qstinfo_id: question.info_id
			, userid: user.info_id, username: user.username, deleted: 0, kwid: question.kwid
			, questionnum: 0, questiorealnnum: 0, answernum: 1, answerrealnum: 1, samequestionnum: 0, samequestionrealnum: 0, usertype: usertype
		};

		getDataSource.getDataSource(["Select_CacheQANumber"], formData, function (data) {
			//处理用户缓存数据
			//var QACacheList = _.find(data, { name: "Select_CacheQANumber" }).data;
			var QACacheList = data;
			var keyArray = new Array();
			keyArray.push("Insert_Answer");
			keyArray.push("Update_Questions_AnswerNum");
			if (QACacheList.length <= 0) {
				keyArray.push("Insert_CacheQANumber");
			} else {
				keyArray.push("Update_CacheQANumber");
			}
			keyArray.push("DeleteAppQuestionVister");
			keyArray.push("InsertAppQuestionVister");
			getDataSource.getDataSource(keyArray, formData, function (data) {
				//发表成功关闭输入框
				$scope.closeAnswerModal();
				showAlert.showToast("发布成功");
				question.answernum = question.answernum + 1;
				//新元素客户端新增。
				question.questionAnswer.splice(0, 0, {
					info_id: guid, userid: user.info_id, username: user.username
					, finfo_id: question.info_id, createdate: new Date(), answer: $scope.answer.answerText, ianswer: 1, deleted: 0
				});

				question.showCommentInfo = false;
				question.hasanswer = 1;
				$scope.ShowCommentInfo(question);
			});
		});
	}

	$scope.FilterQuestion = function () {
		var formData = new Object();
		if ($scope.isFilter.linkMe) {
			formData = { bcid: user.classid, userid: user.info_id, info_id: kwid, myuserid: user.info_id, orderbyfield: "s.createdate desc" };
		} else {
			formData = { bcid: user.classid, userid: user.info_id, info_id: kwid, orderbyfield: "s.createdate desc" };
		}
		getDataSource.getDataSource(["Get_QuestionByKWID", "Get_CommentByFinfoId", "Get_AnswerByFinfoId"], formData, function (data) {
			$scope.LoadQuestionInfo(data);
		});
	};
	//按时间排序
	$scope.SortQuestion = function (btn,desc) {
		var formData = new Object();
		$scope.sortDesc = !desc;
		$scope.sortHotDesc = !desc;
		var fieldval = "";

		if (btn == 1) {
			$scope.sortHotCheckedStyle = "color:red";
			$scope.sortCheckedStyle = "";
			$scope.showHotArrow = true;
			$scope.showArrow = false;
			if ($scope.sortHotDesc) {
				fieldval = "s.hot desc";
				$scope.sortHotClass = "icon ion-arrow-down-c";
			} else {
				fieldval = "s.hot asc";
				$scope.sortHotClass = "icon ion-arrow-up-c";
			}
		} else {
			$scope.sortCheckedStyle = "color:red";
			$scope.showHotArrow = false;
			$scope.showArrow = true;
			$scope.sortHotCheckedStyle = "";
			if ($scope.sortDesc) {
				fieldval = "s.createdate desc";
				$scope.sortClass = "icon ion-arrow-down-c";
			} else {
				fieldval = "s.createdate asc";
				$scope.sortClass = "icon ion-arrow-up-c";
			}
		}
		formData = {bcid:user.classid, userid: user.info_id, info_id: kwid, orderbyfield: fieldval };
		getDataSource.getDataSource(["Get_QuestionByKWID", "Get_CommentByFinfoId", "Get_AnswerByFinfoId"], formData, function (data) {
			$scope.LoadQuestionInfo(data);
		});
	};
	//按时间排序
	//$scope.SortByHot = function () {
	//	var formData = new Object();
	//	formData = { userid: user.info_id, info_id: kwid, orderbyfield: "s.hot" };
	//	getDataSource.getDataSource(["Get_QuestionByKWID", "Get_CommentByFinfoId", "Get_AnswerByFinfoId"], formData, function (data) {
	//		$scope.LoadQuestionInfo(data);
	//	});
	//};

	// A confirm dialog
	$scope.showSaveSameQuestionConfirm = function (question) {
		var confirmPopup = $ionicPopup.confirm({
			title: '提示',
			template: "<div style='text-align:center;'>确定问同样的问题吗？</b>",
			okText: "确定",
			cancelText: "取消",
			okType: "button-assertive"
		});
		confirmPopup.then(function (res) {
			if (res) {
				$scope.SaveSameQuesttion(question);
			} else {
				//$scope.showAlert("删除失败" + res)
			}
		});
	};

	//保存同问
	$scope.SaveSameQuesttion = function (q) {
		var usertype = -1;
		usertype = calcStar.getUserType(user);

		q.showComment = true;
		var formData = {
			bcid: user.classid, userid: user.info_id, username: user.username, finfo_id: q.info_id, isgood: 1
			, replaydate: new Date(), ncontent: "", replayid: "", qstinfo_id: q.info_id, kwid: q.kwid
			, questionnum: 0, questiorealnnum: 0, answernum: 0, answerrealnum: 0, samequestionnum: 1, samequestionrealnum: 1, usertype: usertype
		};

		getDataSource.getDataSource(["Select_CacheQANumber"], formData, function (data) {
			//处理用户缓存数据
			//var QACacheList = _.find(data, { name: "Select_CacheQANumber" }).data;
			var QACacheList = data;
			var keyArray = new Array();
			var keyArray = new Array();
			keyArray.push("Insert_Comment");
			keyArray.push("Update_Question_SameQuestionNum");
			if (QACacheList.length <= 0) {
				keyArray.push("Insert_CacheQANumber");
			} else {
				keyArray.push("Update_CacheQANumber");
			}
			keyArray.push("DeleteAppQuestionVister");
			keyArray.push("InsertAppQuestionVister");

			getDataSource.getDataSource(keyArray, formData, function (data) {
				q.samequestionnum = q.samequestionnum + 1;
				//设置为disabled
				q.icomment = 0;
				q.enedit = 0;
				q.questionComment.splice(0, 0, { userid: user.info_id, username: user.username, finfo_id: q.info_id, isgood: 1, deleted: 0 });
			});
		});
	};

	$scope.HrefTo = function (urltag) {
		$state.go(urltag);
	};

	$ionicModal.fromTemplateUrl('../templates/PublishAnswer.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function (modal) {
		$scope.AnswerModal = modal;
	});

	$scope.openAnswerModal = function (q) {
		$scope.question = q;
		$scope.answer.answerText = "";
		$scope.AnswerModal.show();
	};
	$scope.closeAnswerModal = function () {
		$rootScope.backButtonNoAction = false;
		$scope.AnswerModal.hide();
	};
	//Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function () {
		$scope.AnswerModal.remove();
	});


	$ionicModal.fromTemplateUrl('../templates/PublishQuestion.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function (modal) {
		$scope.modal = modal;
	});
	
	$scope.openModal = function (url) {
		$scope.question.questionText = "";
		$scope.modal.show();
	};
	$scope.closeModal = function () {
		$rootScope.backButtonNoAction = false;
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

	// A confirm dialog
	$scope.showConfirm = function (question) {
		var confirmPopup = $ionicPopup.confirm({
			title: '提示',
			template: '确定要删除该问题吗?',
			okText:"确定",
			cancelText: "取消",
			okType: "button-assertive"
		});
		confirmPopup.then(function (res) {
			if (res) {
				var usertype = -1;
				usertype = calcStar.getUserType(user);

				var keyArray = new Array();
				keyArray.push("Delete_Questions");
				keyArray.push("Update_JWKCWH_questionNumReduce");
				keyArray.push("Update_CacheQANumber");

				//执行删除的方法体
				getDataSource.getDataSource(keyArray, {
					bcid: user.classid, qstinfo_id: question.info_id, kwid: kwid,userid:user.info_id
					, questionnum: -1, questiorealnnum: 0, answernum: 0, answerrealnum: 0, samequestionnum: 0, samequestionrealnum: 0, usertype: usertype
				}, function (data) {
					//$scope.showAlert("删除成功");
					_.remove($scope.QuestionList, function (obj) {
						return obj.info_id == question.info_id;
					});
					$scope.WenTiNum = $scope.WenTiNum - 1;
				});
			} else {
				//$scope.showAlert("删除失败" + res)
			}
		});
	};

	$scope.showAnswerConfirm = function (question,questionAnswer, answer) {
		var confirmPopup = $ionicPopup.confirm({
			title: '提示',
			template: '确定要删除该观点吗?',
			okText: "确定",
			cancelText: "取消",
			okType: "button-assertive"
		});
		confirmPopup.then(function (res) {
			if (res) {
				//执行删除的方法体
				getDataSource.getDataSource(["Delete_Questions_Answer", "Update_Question_AnswerNumReduce"], { bcid: user.classid, ansinfo_id: answer.info_id, qstinfo_id: question.info_id }, function (data) {
					_.remove(questionAnswer, function (obj) {
						return obj.info_id == answer.info_id;
					});
					$scope.WenTiNum = $scope.WenTiNum - 1;
				});
			} else {
				//$scope.showAlert("删除失败" + res)
			}
		});
	};

	// An alert dialog
	$scope.showAlert = function (message) {
		var alertPopup = $ionicPopup.alert({
			title: '提示',
			template: message
		});
		alertPopup.then(function (res) {
			//console.log('Thank you for not eating my delicious ice cream cone');
		});
	};
})
.controller("myinfoController", function ($scope, $state, $rootScope, $stateParams,showAlert, getDataSource,Restangular, userHelp, calcStar, $filter,$ionicModal, $ionicHistory, $ionicScrollDelegate, $ionicPopup, $ionicSideMenuDelegate) {
	var user = $rootScope.user;
	var usertype = calcStar.getUserType(user);
	$scope.classname = user.classname;
	$scope.ShowSelectBtn = false;
	$scope.hasZJlist = $rootScope.AppConfig.hasZJlist;
	$scope.isIOS = false;
	var isIOS = ionic.Platform.isIOS();
	if (isIOS) {
	    $scope.isIOS = true;
	}
	var kssj = $filter('date')(user.kssj, 'yyyy年MM月dd日');
	var jssj = $filter('date')(user.jssj, 'yyyy年MM月dd日');
	$scope.datestr = kssj + "～" + jssj;

	$scope.myImg = "";
	if ($scope.user.userphoto == null || $scope.user.userphoto == "") {
		$scope.myImg = "../staticresource/userphoto/userdefaultpng.png";
	}
	else {
		$scope.myImg = "../staticresource/userphoto/" + $scope.user.userphoto;
	}
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
	$scope.getBCData = function () {
	    getDataSource.getDataSource("userLogin", { phone: $rootScope.user.sjhm}, function (classdata) {
	        $scope.bclist = classdata;
	        if (classdata.length > 1) {
	            $scope.ShowSelectBtn = true;
	        }
	    });
	}
	$scope.selectbc = function () {
	    $ionicModal.fromTemplateUrl('../templates/xyselectbc.html', {
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
	$scope.loadMainData = function () {
	    user = $rootScope.user;
	    getDataSource.getDataSource(["Get_XYXXByInfoId", "Get_KCListInfoByDateNew", "getMainGG", "getMainReader", "getTeacherClass", "get_main_xxkCount", "Get_NewCountByNewTime", "GetXYKCPJCode", "getQuestionCount", "getBjxxByid", "getKqNum"],
        {
            todaydate: new Date(),
            info_id: user.info_id,
            bcid: user.classid,
            xyid: user.info_id,
            userid: user.info_id,
            classid: user.classid,
            userid_q: user.info_id.toString(),
            classid_q: user.classid.toString(),
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
	$scope.checked = function (item) {
	    $scope.modal.hide();
	    $ionicHistory.clearHistory();
	    getDataSource.getDataSource("userLogin", { phone: $rootScope.user.sjhm, classid: item.classid }, function (data) {
	        $rootScope.user = data[0];
	        $rootScope.user.type = "student";
	        $rootScope.user.isFirstLogin = true;
	        $rootScope.user.formweixin = $rootScope.formweixin;
	        localStorage.user = JSON.stringify($rootScope.user);
	        $scope.loadMainData();// 重新加载首页提醒数字
	        if ($rootScope.user.formweixin) {
	            var loginWeixin = Restangular.one('chart/action/addStudentToChat/' + $rootScope.user.classid + '/' + $rootScope.user.info_id);
	            loginWeixin.get().then(function (data) {
	            });
	        }
	        $state.go("app.main");
	    });
	}
	$scope.userInfo = new Object();
	$scope.HrefTo = function (urlTag) {
		$state.go(urlTag, {xyinfoid:user.info_id});
	}
	$scope.Logout = function () {
		var confirmPopup = $ionicPopup.confirm({
			title: '提示',
			template: "<div style='text-align:center;'>确定要退出系统?</b>",
			okText: "确定",
			cancelText: "取消",
			okType: "button-assertive"
		});
		confirmPopup.then(function (res) {
			if (res) {
			    if (ionic.Platform.isAndroid()) {
			        userHelp.safeLogout();
			    }
			    if (ionic.Platform.isIOS())
			    { userHelp.iosLogout(); }
				//$state.go("loginMobile");
			}
		});
	}
	$scope.LoadXYListData = function () {
		getDataSource.getDataSource(["getSingleXyActivityList"], { classid: user.classid, xyinfo_id: user.info_id, usertype: usertype }, function (data) {
			$scope.XYList = data;
			$scope.userInfo = data[0];
			$scope.userInfo.starArr = new Array();
			$rootScope.user.score = $scope.userInfo.score;
			calcStar.getStar($scope.userInfo);
		});
	};
	$scope.goUser = function () {
		$state.go("userinfo");
	}
	$scope.getBCData();
	$scope.LoadXYListData();
})
.controller("teacherinfoController", function ($scope, $state, $rootScope, $stateParams, $filter, calcStar, getDataSource, userHelp, $ionicPopup,$ionicHistory, $ionicModal,$ionicScrollDelegate, $ionicSideMenuDelegate) {
	var user = $rootScope.user;
	var usertype = calcStar.getUserType(user);
	$scope.classname = user.classname;
	$scope.ShowSelectBtn = false;
	$scope.hasZJlist = $rootScope.AppConfig.hasZJlist;
	$scope.keyval = "";
	$scope.myImg = "";
	if ($rootScope.user.userphoto == null || $rootScope.user.userphoto == "") {
		$scope.myImg = "../staticresource/userphoto/userdefaultpng.png";
	}
	else {
		$scope.myImg = "../staticresource/userphoto/" + $rootScope.user.userphoto;
	}
	$scope.isIOS = false;
	var isIOS = ionic.Platform.isIOS();
	if (isIOS) {
	    $scope.isIOS = true;
	}
	$scope.LoadPageData = function () {
		var kssj = $filter('date')(user.kssj, 'yyyy年MM月dd日');
		var jssj = $filter('date')(user.jssj, 'yyyy年MM月dd日');
		$scope.datestr = kssj + "～" + jssj;
		$scope.getBCData();
		$scope.LoadTeachListData();
	}

	$scope.getBCData = function () {
		var keyname = "getAllClass";
	    //if (user.type == "visitor") {
	    //    keyname = "getTeacherClassByLeader";
	    //}
	    getDataSource.getDataSource(keyname, { userid: $rootScope.user.info_id, bcid: $rootScope.user.classid }, function (classdata) {
			$scope.bclist = classdata;
			if (classdata.length >1) {
				$scope.ShowSelectBtn = true;
			}
		});
	}

	$scope.checked = function (item) {
		$rootScope.user.classname = item.bt;
		$rootScope.user.classid = item.classid;
		$rootScope.user.kssj = item.kssj;
		$rootScope.user.jssj = item.jssj;
		$rootScope.user.type = item.usertype;
		$rootScope.user.formweixin = $rootScope.formweixin;

		$scope.LoadTeachListData();
		localStorage.user = JSON.stringify($rootScope.user);
		$scope.modal.hide();
		//userHelp.initUserChat();
		userHelp.chatAllinit();
	    //$state.reload();
		$ionicHistory.clearHistory();
		$ionicHistory.clearCache().then(function () {
		    $state.go("app.main");
		});
		//alert("2");
		//window.location.href = "index.html#/app/main/"+Math.random();
	}

	$scope.LoadTeachListData = function () {
		var keyname = "";
		if (user.type == "teacher") {
			keyname = "getSingleTeachActivity";
		} else if (user.type == "visitor") {
			keyname = "getSingleVisitorActivity";
		}
		usertype = calcStar.getUserType(user);
		getDataSource.getDataSource([keyname], { classid: $rootScope.user.classid, techinfo_id: $rootScope.user.info_id, usertype: usertype }, function (data) {
			$scope.XYList = data;
			$scope.userInfo = data[0];
		});
	};

	$scope.Logout = function () {
		var confirmPopup = $ionicPopup.confirm({
			title: '提示',
			template: "<div style='text-align:center;'>确定要退出系统?</b>",
			okText: "确定",
			cancelText: "取消",
			okType: "button-assertive"
		});

		confirmPopup.then(function (res) {
		    if (res) {
		        if (ionic.Platform.isAndroid()) {
		            userHelp.safeLogout();
		        }
		        if (ionic.Platform.isIOS())
		        { userHelp.iosLogout();}
				//$state.go("loginMobile");
			}
		});
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

	$scope.goUser = function () {
		$state.go("userinfo");
	}

	$scope.HrefTo = function (urlTag) {
		$state.go(urlTag, { xyinfoid: user.info_id });
	}

	$scope.LoadPageData();
})
.controller("chartsController", function ($scope, $stateParams, getDataSource) {
	var category = $stateParams.category;
	$scope.GetTotalData = function (category,charttype) {
		//获取数据源;
		if (charttype == "column") {
			//datatemp.push({ "name": "人次", "data": [1, 1, 2, 3, 2] });
			if (category == "fw") {
				getDataSource.getDataSource(["GetFWChartData"], { sdate: "", edate: "" }, function (data) {
					var datatemp = new Array();
					var itemdata = new Object();
					itemdata.name = "访问统计";
					var categories = new Array();
					for (var i = 0; i < data.length; i++) {
						categories.push(data[i].itemname);
						datatemp.push(data[i].totaldata);
					}
					itemdata.data = datatemp;
					$scope.chartConfig.xAxis.categories = categories;
					$scope.chartConfig.series.push(itemdata);
				});
			} else if (category == "lm") {
				getDataSource.getDataSource(["GetLMChartData"], { sdate: "", edate: "" }, function (data) {
					var datatemp = new Array();
					var itemdata = new Object();
					itemdata.name = "栏目统计";
					var categories = new Array();
					for (var i = 0; i < data.length; i++) {
						categories.push(data[i].itemname);
						datatemp.push(data[i].totaldata);
					}
					itemdata.data = datatemp;
					$scope.chartConfig.xAxis.categories = categories;
					$scope.chartConfig.series.push(itemdata);
				});
			}
		} else if (charttype == "pie") {
			if (category == "pj") {
				getDataSource.getDataSource(["GetPJChartData"], { sdate: "", edate: "" }, function (data) {
					var datatemp = [];
					var itemdata = new Object();
					itemdata.name = "人次";
					for (var i = 0; i < data.length; i++) {
						var selected = false;
						if (i == 0) { selected = true; }
						datatemp.push({
							name: data[i].itemname,
							y: data[i].totaldata,
							sliced: selected,
							selected: selected
						});
					}
					itemdata.data = datatemp;
					$scope.chartConfig.series.push(itemdata);
				});
			} else {
				getDataSource.getDataSource(["GetXXKChartData"], { sdate: "", edate: "" }, function (data) {
					var datatemp = [];
					var itemdata = new Object();
					itemdata.name = "人次";
					for (var i = 0; i < data.length; i++) {
						var selected = false;
						if (i == 0) { selected = true; }
						datatemp.push({
							name: data[i].itemname,
							y: data[i].totaldata,
							sliced: selected,
							selected: selected
						});
					}
					itemdata.data = datatemp;
					$scope.chartConfig.series.push(itemdata);
				});
			}
		}
	}
	$scope.addSeries = function (category,charttype) {
		$scope.GetTotalData(category,charttype);
	}
	$scope.removeSeries = function (id) {
		var seriesArray = $scope.chartConfig.series;
		seriesArray.splice(id, 1)
	}
	var chart_title = "";
	var charttype = "";
	var categories = [];
	var xAxisTitle = "";
	var yAxisTitle = "";
	if (category == "pj" || category == "xxk") {
		charttype = "pie";
		if (category == "pj") {
			chart_title = "评价统计";
		} else if (category == "xxk") {
			chart_title = "选修课统计";
		}
	} else if (category == "fw" || category == "lm") {
		charttype = "column";
		if (category == "fw") {
			chart_title = "访问统计（人次）";
			xAxisTitle = "";
			yAxisTitle = "";
			categories = [];
		} else if (category == "lm") {
			chart_title = "栏目统计";
			xAxisTitle = "";
			yAxisTitle = "点击数";
			categories = [];
		}
	}

	if (charttype == "column") {
		$scope.chartConfig = {
			options: {
				chart: {
					type: charttype
				},
				plotOptions: {
					series: {
						borderWidth: 0,
						dataLabels: {
							enabled: true,
							format: '{point.y:.0f}'
						}
					}
				},
			},
			xAxis: {
				title: {
					text: xAxisTitle
				},
				categories: categories
			},
			yAxis: {
				title: {
					text:yAxisTitle 
				}
			},
			legend: {
				enabled: true
			},
			series: [],
			title: {
				text: chart_title
			},
			credits: {
				enabled: true
			},
			loading: false,
			size: {}
		}
	} else if (charttype == "pie") {
		$scope.chartConfig = {
			options: {
				chart: {
					type: charttype
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer'
					},
					series: {
						borderWidth: 0,
						dataLabels: {
							enabled: true,
							format: '<b>{point.name}</b>: {point.percentage:.1f} %'
						}
					}
				}
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			series: [],
			title: {
				text: chart_title
			},
			credits: {
				enabled: true
			},
			loading: false,
			size: {}
		}
	}
	$scope.addSeries(category, charttype);
})