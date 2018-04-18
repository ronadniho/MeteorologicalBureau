angular.module('app.directive', ['ionic'])
    .directive('goMainPage', function ($state) {
        return {
            restrict: "E",
            priority: 20000,
            template: "<ion-nav-buttons side='left'>\
                <button class='button button-icon icon ion-ios-arrow-back' style='font-size:12px' ng-click='goBack()'>返回</button>\
        </ion-nav-buttons>",
            replace: true,
            controller: function ($rootScope, $scope, $state, $ionicSideMenuDelegate, $ionicHistory) {
                $scope.goMain = function () {
                    if ($rootScope.AppConfig.hasMain == true) {
                        $state.go("app.index");
                    }
                    else {
                        $ionicSideMenuDelegate.toggleLeft();
                    }
                };
                $scope.goBack = function () {
                    $ionicHistory.goBack();
                }
            }
        }
    })
     .directive('goMainPage', function ($state) {
         return {
             restrict: "E",
             priority: 20000,
             template: "<ion-nav-buttons side='left'>\
                <button class='button button-icon icon ion-ios-arrow-back' style='font-size:12px' ng-click='goBack()'>返回</button>\
        </ion-nav-buttons>",
             replace: true,
             controller: function ($rootScope, $scope, $state, $ionicSideMenuDelegate, $ionicHistory) {
                 $scope.goMain = function () {
                     if ($rootScope.AppConfig.hasMain == true) {
                         $state.go("app.index");
                     }
                     else {
                         $ionicSideMenuDelegate.toggleLeft();
                     }
                 };
                 $scope.goBack = function () {
                     $ionicHistory.goBack();
                 }
             }
         }
     })
    .directive('goBack', function ($state) {
        return {
            restrict: "E",
            priority: 20000,
            scope: {
                title: '@myTitle',
            },
            transclude: true,
            template: "<ion-header-bar align-title='center' class='bar-assertive'>\
                      <div class='buttons'>\
                           <button class='button button-icon icon ion-ios-arrow-back' style='font-size:12px' ng-click='goback()'></button>\
                            \
                      </div>\
                    <h3 class='title'>{{title}}</h3>\
                    <div class='buttons' ng-transclude>\
                    </div>\
                    </ion-header-bar>",
            replace: true,
            controller: function ($rootScope, $scope, $state, $ionicSideMenuDelegate, $ionicHistory) {
                $scope.goback = function () {
                    $ionicHistory.goBack();
                }
            }
        }
    })
       .directive('mainHeaderBar', function ($state) {
           return {
               restrict: "E",

               scope: {
                   title: '@myTitle',
               },
               transclude: true,
               template: "    <ion-header-bar style='background:rgba(0,0,0,0);border:none;' >\
                                        <button class='button button-icon icon ion-navicon' ng-click='toogle()'></button>\
                                        <h1 class='title' style='color:#fff;text-align:center;'>{{title}}</h1>\
                                        <button class='button button-icon icon ion-person' ng-click='goMy()'></button>\
                                    </ion-header-bar>",
               replace: true,
               controller: function ($rootScope, $scope, $state, $ionicSideMenuDelegate, $ionicHistory, $ionicActionSheet, userHelp) {
                   $scope.goback = function () {
                       $ionicHistory.goBack();
                   }
                   $scope.goMy = function () {

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
                                   case 1: $state.go("guidelineNetwork"); break;
                                   case 2: userHelp.safeLogout(); $state.go("loginMobile"); break;
                                   case 3: $state.go("loginMobile"); break;
                               }
                               return true;
                           }
                       });
                   }
                   $scope.toogle = function () {
                       $ionicSideMenuDelegate.toggleLeft();
                   }
               }
           }
       })
       .directive('mainNewHeaderBar', function ($state) {
           return {
               restrict: "E",

               scope: {
                   title: '@myTitle',
               },
               transclude: true,
               template: "    <ion-header-bar style='background:rgba(0,0,0,0);border:none;' >\
                                        <h1 class='title' style='color:#fff;text-align:center;'>{{title}}</h1>\
                                    </ion-header-bar>",
               replace: true,
               controller: function ($rootScope, $scope, $state, $ionicSideMenuDelegate, $ionicHistory, $ionicActionSheet, userHelp) {
                
               }
           }
       })
       .directive('mainHeader', function ($state) {
           return {
               restrict: "E",

               scope: {
                   title: '@myTitle',
               },
               transclude: true,
               template: "    <ion-header-bar align-title='center' class='bar-assertive' >\
                                        <button class='button button-icon icon ion-navicon' ng-click='toogle()'></button>\
                                        <h1 class='title' style='color:#fff;text-align:center;font-size:18px;'>{{title}}</h1>\
                                        <button class='button button-icon icon ion-person' ng-click='goMy()'></button>\
                                    </ion-header-bar>",
               replace: true,
               controller: function ($rootScope, $scope, $state, $ionicSideMenuDelegate, $ionicHistory, $ionicActionSheet, userHelp) {
                   $scope.goback = function () {
                       $ionicHistory.goBack();
                   }
                   $scope.goMy = function () {

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
                                   case 1: $state.go("guidelineNetwork"); break;
                                   case 2: userHelp.safeLogout(); $state.go("loginMobile"); break;
                                   case 3: $state.go("loginMobile"); break;
                               }
                               return true;
                           }
                       });
                   }
                   $scope.toogle = function () {
                       $ionicSideMenuDelegate.toggleLeft();
                   }
               }
           }
       })
    .directive('mytest', function ($state) {
        return {
            restrict: "E",
            template: "<div>ddddd</div>",
            replace: true,
            controller: function ($rootScope, $scope, $state, $ionicSideMenuDelegate) {
                $scope.goMain = function () {
                    if ($rootScope.AppConfig.hasMain == true) {
                        $state.go("app.index");
                    }
                    else {
                        $ionicSideMenuDelegate.toggleLeft();
                    }
                }
            }
        }
    })
      .directive('limitTextArea', function ($state) {
          return {
              restrict: "EA",
              //template: "<div><textarea></textarea></div>",
              templateUrl: getTemplatePath("limitTextArea.html"),
              scope: {
                  textValue: "=textValue",
                  maxLength: "=",
                  rows: "=",
                  size:"="
              },
              controller: function ($rootScope) {

              }
          }
      })
	.directive("sytextarea", function () {
		return {
			restrict: 'EA',
			templateUrl:getTemplatePath("sytextarea.html"),
			scope: {
				assignobj: "="
			}
		}
	})
	.directive("sycheckbox", function () {
		return {
			restrict: 'EA',
			templateUrl: getTemplatePath("sycheckbox.html"),
			scope: {
				assignobj: "="
			}
		}
	})
	.directive("syradio", function () {
		return {
			restrict: 'EA',
			templateUrl: getTemplatePath('syradio.html'),
			scope: {
				assignobj: "="
			},
			link: function ($scope, $element, $attrs) {
				//给当前的每个选项注册控件并且赋值
				$scope.optionChecked = function (elementid, text, val, tip) {
					$("#" + elementid + "").find("input[class*='hide-ngmode-val']").val(val).change();
//					console.log("aaaa:"+$("#" + elementid + "").find("input[class*='hide-ngmode-val']").val());
					$("#" + elementid + "").find("input[class*='hide-ngmode-text']").val(text).change();
					$("#" + elementid + "").find("button").removeClass("btn_active");
					$("#" + elementid + "").find("button[value='" + val + "']").addClass("btn_active");
					//showToast.show(tip);
				}
				$scope.tipshow = function (text) {
					//showToast.show(text);
				}
			}
		};
	})
.directive('inputview', function ($rootScope, $state, $ionicPopup, Toast) {
    //$rootScope.inputviewContainerState = false;

    return {
        restrict: "E",
        templateUrl: getTemplateUserPath("inputview.html"),
        replace: true,
        scope: false, // 共用 parent scope
        controller: function ($rootScope, $scope, $state, $element, Comment, Toast, $ionicSlideBoxDelegate, $timeout, $ionicLoading) {
            $scope.inputviewSend = function () {
                var paramObj = $rootScope.inputviewItem;
                var opinion = $scope.inputviewContent;
                //console.log($rootScope.inputviewItem);
                //console.log($scope.inputviewContent);
                if (!opinion) {
                    Toast.showPop("请输入内容");
                } else {
                    Comment.save(paramObj, opinion, function (datas) {
                        var resultStr = "操作失败";
                        var data = datas.data;
                        console.log(datas);
                        if (data) {
                            if (data.result) {
                                if (data.message) {
                                    resultStr = data.message;
                                } else {
                                    resultStr = "操作成功";
                                }
                                $scope.inputviewContent = "";
                                if ($rootScope.inputviewCompleteRefresh) {
                                    $rootScope.inputviewCompleteRefresh();
                                }
                                //输入意见后是否隐藏InputView
                                if (!$scope.inputviewNotHideAfterSend) {
                                    $rootScope.inputviewContainerState = false;
                                }
                            } else {
                                if (data.message) {
                                    resultStr = data.message;
                                } else {
                                    resultStr = "操作失败";
                                }
                            }
                        }
                        Toast.showPop(resultStr);
                    });
                }
            };
            //console.log($element);



            /*$scope.inputViewPageData = [
                   {
                         data: [
                             { content: "test11", id: "1" },
                             { content: "test12", id: "2" },
                             { content: "test13", id: "3" }
                         ]
                  },
                   {
                         data: [
                             { content: "test21", id: "4" },
                             { content: "test22", id: "5" },
                             { isAddButton: true , content: " " , id : "-1"}
                         ]
                  }
        ];*/
            function initOpinionTemplate(pagerIndexMode) {
                $scope.inputViewPageData = [];
                var inputviewAddObj = { isAddButton: true, context: " ", id: "-1" };

                console.log("$scope.actName:" + $scope.actName);
                //$scope.moduleId来自共用的$scope
                var promise = Comment.getComment($rootScope.user.info_id, $scope.moduleId, $scope.actName); // 同步调用，获得承诺接口  
                promise.then(function (data) {  // 调用承诺API获取数据 .resolve 
                    //data = eval("(" + data + ")");
                    if (data && data.rows && data.rows.length > 0) {
                        data.rows.push(inputviewAddObj);
                        $scope.inputViewPageData = processTemplateData(data.rows);
                    } else {
                        var orginalData = [];
                        orginalData.push(inputviewAddObj);
                        $scope.inputViewPageData = processTemplateData(orginalData);
                        console.log("意见模板为空:" + data);
                    }
                    refreshInputViewSlideBox(pagerIndexMode);
                }, function (data) {           			// 处理错误 .reject  
                    console.log("意见模板加载出错" + data);
                });
            }

            $scope.inputViewPageData = [];
            $rootScope.inputViewMoreBlockActive = false;
            $scope.inputviewContent = "";
            $scope.slideIndex = 0;
            initOpinionTemplate();

            $scope.inputviewToggleMoreBlock = function () {
                $rootScope.inputViewMoreBlockActive = !$rootScope.inputViewMoreBlockActive;
            }

            $scope.onInputViewItemClick = function (data) {
                if (data.isAddButton) {
                    openOpinionInputView();
                } else {
                    //console.log("$scope.inputviewContent=" + $scope.inputviewContent + ",content=" + data.content);
                    $scope.inputviewContent = $scope.inputviewContent + data.content;
                    //延迟移动滚动条，不然不生效
                    $timeout(function () {
                        moveToEnd();
                    }, 200);
                }
            }

            $scope.onInputViewItemHold = function (data) {
                //加号按钮无长按事件
                if (data.isAddButton) {
                    return;
                }
                var id = data.id;

                // 一个确认对话框
                var confirmPopup = $ionicPopup.confirm({
                    title: '确认',
                    template: '<div style="text-align:center;">是否删除此意见?</div>',
                    cancelText: '取消',
                    okText: '确定'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        $ionicLoading.show({
                            template: '加载中...'
                        });

                        var promise = Comment.deleteTemplate(id);
                        promise.then(function (data) {  // 调用承诺API获取数据 .resolve 
                            console.log(data);
                            if (data && data.result) {
                                var msg = data.message || "删除成功";
                                Toast.showPop(msg);
                                initOpinionTemplate();
                            } else {
                                Toast.showPop("删除失败");
                                $ionicLoading.hide();
                            }
                        }, function (data) {           			// 处理错误 .reject  
                            console.log("操作失败" + data);
                            $ionicLoading.hide();
                        });
                    } else {
                        console.log('取消删除');
                        $ionicLoading.hide();
                    }
                });
                //};
            }

            $scope.slideHasChanged = function ($index) {
                console.log("$index=" + $index);
            }

            function moveToEnd() {
                var obj = document.getElementById("inputview-textarea");
                if (obj) {
                    console.log("obj.scrollTop" + obj.scrollTop + "obj.scrollHeight=" + obj.scrollHeight);
                    obj.focus();
                    obj.scrollTop = obj.scrollHeight;
                }
            }           

            function refreshInputViewSlideBox(pagerIndexMode) {
                //延迟刷新，不然slidebox未加载完成
                $timeout(function () {
                    if (pagerIndexMode == "last") {
                        if ($scope.inputViewPageData.length <= 1) {
                            $scope.slideIndex = 0;
                        } else if ($scope.inputViewPageData.length > 1) {
                            var lastPage = $scope.inputViewPageData[$scope.inputViewPageData.length - 1];
                            //加号按钮是否是最后一页中的第一个，
                            //即添加意见后刷新，显示最后一条意见，而不是加号
                            var flag = false;
                            if (lastPage && lastPage["data"] && lastPage["data"][0]) {
                                var firstItem = lastPage["data"][0];
                                if (firstItem["isAddButton"]) {
                                    flag = true;
                                }
                            }
                            if (flag) {
                                $scope.slideIndex = $scope.inputViewPageData.length - 2;
                            } else {
                                $scope.slideIndex = $scope.inputViewPageData.length - 1;
                            }
                        }
                    } else {
                        $scope.slideIndex = 0;
                    }

                    var delegate = $ionicSlideBoxDelegate.$getByHandle('inputview-handle');
                    delegate.update();
                    $ionicSlideBoxDelegate.update();
                    delegate.slide($scope.slideIndex);
                    $ionicLoading.hide();

                    console.log("PageData length=" + $scope.inputViewPageData.length + ",slidesCount=" + delegate.slidesCount() + ",currentIndex=" + delegate.currentIndex());
                }, 600);
            }

            function processTemplateData(originalData) {
                var pagesData = [], rowData = [];
                for (var i = 0 ; originalData && i < originalData.length; i++) {
                    var d = originalData[i];
                    var item = {
                        id: d.id,
                        content: d.context,
                        type: d.type,
                        isAddButton: d.isAddButton
                    }
                    if (i % 3 == 0) {
                        rowData = [];
                        var tempData = {
                            data: rowData
                        };
                        pagesData.push(tempData);
                    }
                    rowData.push(item);
                }
                return pagesData;
            }


            //打开意见模板输入
            function openOpinionInputView() {
                var template = '<ion-list>' +
                '<div class=" item item-input">' +
                         '<input id="inputviewAddContent" style="padding-left:5px;" type="text" placeholder="请输入内容" ng-model="inputviewAddContent" ></input>' +
                         '<div class="icon placeholder-icon"  style="padding-right:15px;"><img height=20 src="../img/ic_comment.png"></div>' +
                      '</div>' +
                '<ion-list>';
                var myPopup = $ionicPopup.show({
                    title: '<h4 style="font-weight:bold;">意见输入</h4>',
                    template: template,
                    scope: $scope,
                    buttons: [{
                        text: '<b>取消</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            myPopup.close();
                            e.preventDefault();
                        }
                    },
                      {
                          text: '<b>确定</b>',
                          type: 'button-positive',
                          onTap: function (e) {
                              $ionicLoading.show({
                                  template: '加载中...'
                              });
                              var content = $("#inputviewAddContent").val();

                              if (!content) {
                                  Toast.showPop("请输入内容");
                                  return;
                              }
                              var promise = Comment.saveTemplate($rootScope.user.info_id, content, $scope.moduleId, $scope.actName);
                              promise.then(function (data) {  // 调用承诺API获取数据 .resolve 
                                  console.log(data);
                                  if (data && data.result) {
                                      var msg = data.message || "添加成功";
                                      Toast.showPop(msg);
                                      initOpinionTemplate("last");
                                  } else {
                                      Toast.showPop("添加失败");
                                      $ionicLoading.hide();
                                  }
                              }, function (data) {           			// 处理错误 .reject  
                                  console.log("意见模板加载失败" + data);
                                  $ionicLoading.hide();
                              });

                              myPopup.close();
                              e.preventDefault();
                          }
                      }
                    ]
                });
            }
        },
        link: function ($scope, $element) {
            //console.log("=============");
            //console.log($element);
            /*            	$element.on("click" , function(event){
                                toggleBlock($element , $scope);
                            });*/
        }
    };
})
;
