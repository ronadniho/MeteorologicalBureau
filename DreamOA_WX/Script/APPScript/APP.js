function getTemplatePath(tempPathRoot) {
    return "../templates/" + tempPathRoot;
}

function getTemplateUserPath(tempPathRoot) {
    return "../templatesUser/" + tempPathRoot;
}

function getTemplateNotePath(tempPathRoot) {
    return "../templatesNote/" + tempPathRoot;
}
var app = angular.module('app', ['ionic', 'ngSanitize', 'restangular', 'ngFileUpload', 'app.controllers', 'app.filters', 'app.factory', 'app.directive', 'app.commonServices',
    "com.2fdevs.videogular",
    "com.2fdevs.videogular.plugins.controls",
    "com.2fdevs.videogular.plugins.overlayplay",
    "com.2fdevs.videogular.plugins.poster",
    "ionicLazyLoad"
]);
app.config(function(RestangularProvider, $locationProvider, $stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    //$ionicConfigProvider.views.maxCache(100);
    $locationProvider.html5mode = true;
    RestangularProvider.setBaseUrl('../api/');
    $stateProvider
    //.state('login', {
    //    url: '/',
    //    cache: false,
    //    templateUrl: getTemplatePath("login.html"),
    //    controller: 'loginController',
    //    onEnter: function () {
    //    }
    //})
        .state('loginMobile', {
            url: '/loginMobile',
            cache: false,
            templateUrl: getTemplatePath("loginByMobile.html"),
            controller: 'loginMobileController',
        })
        .state("autoLogin", {
            url: '/autoLogin/:phone/:random',
            cache: false,
            templateUrl: getTemplatePath("autoLogin.html"),
            controller: 'autoLoginController',
        })
        .state('app', {
            url: '/app',
            cache: true,
            abstract: true,
            templateUrl: getTemplatePath("tabs.html"),
            controller: 'tabsController',
        })
        .state('app.main', {
            url: "/main",
            cache: true,
            views: {
                'tab-content': {
                    templateUrl: getTemplatePath("main.html"),
                    controller: 'mainController'
                }
            }
        })
        .state('welcome', {
            url: "/welcome",
            cache: false,
            templateUrl: getTemplatePath("welcome.html"),
            controller: 'welcomeController'
        })
        .state('microvideo', {
            url: "/microvideo/:id",
            cache: false,
            templateUrl: getTemplatePath("microvideo.html"),
            controller: 'microvideoController'
        })
        .state('userinfo', {
            url: "/userinfo",
            cache: false,
            templateUrl: getTemplatePath("userinfo.html"),
            controller: 'userinfoController'
        })
        .state('KCDetail', {
            url: "/KCDetail/:info_id",
            cache: false,
            templateUrl: getTemplatePath("KCDetail.html"),
            controller: 'KCDetailController'
        })
        .state('app.myinfo', {
            url: "/myinfo",
            cache: false,
            views: {
                'tab-content': {
                    templateUrl: getTemplatePath("myinfo.html"),
                    controller: 'myinfoController'
                }
            }
        })
        .state('app.teacherinfo', {
            url: "/teacherinfo",
            cache: false,
            views: {
                'tab-content': {
                    templateUrl: getTemplatePath("teacherinfo.html"),
                    controller: 'teacherinfoController'
                }
            }
        })
        .state('training', {
            url: "/training",
            cache: false,
            templateUrl: getTemplatePath("training.html"),
            controller: 'trainingController'
        })
        .state('ntraining', {
            url: "/ntraining",
            cache: false,
            templateUrl: getTemplatePath("ntraining.html"),
            controller: 'ntrainingController'
        })
        .state('charts', {
            url: '/charts/:category',
            cache: false,
            templateUrl: getTemplatePath("charts.html"),
            controller: 'chartsController'
        })
        .state('app.zjzp', {
            url: '/zjzp',
            cache: true,
            views: {
                'tab-content': {
                    templateUrl: getTemplatePath("zjzp.html"),
                    controller: 'zjzpController'
                }
            }
        })
        .state('zpNewsList', {
            url: '/zpNewsList/:type',
            cache: true,
            templateUrl: getTemplatePath("zpNewsList.html"),
            controller: 'zpNewsListController'
        })
        .state('zpNewsDetail', {
            url: "/zpNewsDetail/:id",
            cache: false,
            templateUrl: getTemplatePath("zpNewsDetail.html"),
            controller: 'zpNewsDetailController'
        })
        .state('selectUser', {
            url: "/selectUser/:type/:selected",
            cache: false,
            templateUrl: getTemplatePath("selectUser.html"),
            controller: 'selectUserController'
        })
        .state('testData', {
            url: '/testData',
            cache: false,
            templateUrl: getTemplatePath("testData.html"),
            controller: 'testDataController'
        })
        .state('app.ydjx', {
            url: '/ydjx',
            cache: false,
            views: {
                'tab-content': {
                    templateUrl: getTemplatePath("ydjx.html"),
                    controller: 'ydjxController'
                }
            }
        })
        .state('app.ydjxnew', {
            url: '/ydjxnew',
            cache: true,
            views: {
                'tab-content': {
                    templateUrl: getTemplatePath("ydjxNew.html"),
                    controller: 'ydjxNewController'
                }
            }
        })
        .state('ydjxzj', {
            url: '/ydjxzj/:index',
            cache: false,
            templateUrl: getTemplatePath("ydjxZJ.html"),
            controller: 'ydjxZjController'
        })
        .state('ydjxydhzj', {
            url: '/ydjxydhzj/:index',
            cache: false,
            templateUrl: getTemplatePath("ydjxYdhZJ.html"),
            controller: 'ydjxYdhZjController'
        })
        .state('ydjxzjlist', {
            url: '/ydjxzjlist/:menuid',
            cache: false,
            templateUrl: getTemplatePath("ydjxZjList.html"),
            controller: 'ydjxZjListController'
        })
        .state('testChat', {
            url: '/testChat',
            cache: false,
            templateUrl: getTemplatePath("testChat.html"),
            controller: 'testChatController'
        })
        .state('app.mystudy', {
            url: '/mystudy',
            cache: false,
            views: {
                'tab-content': {
                    templateUrl: getTemplatePath("mystudy.html"),
                    controller: 'mystudyController'
                }
            }
        })
        .state('app.studymanage', {
            url: '/studymanage',
            cache: false,
            views: {
                'tab-content': {
                    templateUrl: getTemplatePath("studymanage.html"),
                    controller: 'studymanageController'
                }
            }
        })
        .state('studentgroup', {
            url: "/studentgroup",
            cache: false,
            templateUrl: getTemplatePath("studentgroup.html"),
            controller: 'studentController'
        })
        .state('classteacher', {
            url: "/classteacher/:showteacher",
            cache: false,
            templateUrl: getTemplatePath("classteacher.html"),
            controller: 'teacherController'
        })
        .state('chooseclass', {
            url: "/chooseclass",
            cache: false,
            templateUrl: getTemplatePath("chooseclass.html"),
            controller: 'chooseclassController'
        })
        .state('choosestudentlist', {
            url: "/choosestudentlist/:type/:id",
            cache: false,
            templateUrl: getTemplatePath("choosestudentlist.html"),
            controller: 'choosestudentlistController'
        })
        .state('choosemanage', {
            url: "/choosemanage",
            cache: false,
            templateUrl: getTemplatePath("choosemanage.html"),
            controller: 'choosemanageController'
        })
        .state('ydjxList', {
            url: '/ydjxList/:type',
            cache: true,
            templateUrl: getTemplatePath("ydjxList.html"),
            controller: 'ydjxListController'
        })
        .state('ydjxDetail', {
            url: "/ydjxDetail/:id",
            cache: false,
            templateUrl: getTemplatePath("ydjxDetail.html"),
            controller: 'ydjxDetailController'
        })
        .state('clxz', {
            url: "/clxz/:fid",
            cache: false,
            templateUrl: getTemplatePath("clxz.html"),
            controller: 'clxzController'
        })
        .state('jxzl', {
            url: "/jxzl/:kcid",
            cache: false,
            templateUrl: getTemplatePath("jxzl.html"),
            controller: 'jxzlController'
        })
        .state('notice', {
            url: "/notice",
            cache: false,
            templateUrl: getTemplatePath("noticelist.html"),
            controller: 'noticelistController'
        })
        .state('dcwjStudent', {
            url: "/dcwjStudent/:type",
            cache: false,
            templateUrl: getTemplatePath("dcwjStudent.html"),
            controller: 'dcwjStudentController'
        })
        .state('dcwjTeacher', {
            url: "/dcwjTeacher/:type",
            cache: false,
            templateUrl: getTemplatePath("dcwjTeacher.html"),
            controller: 'dcwjTeacherController'
        })
        .state('answerQuestion', {
            url: "/answerQuestion/:qid",
            cache: false,
            templateUrl: getTemplatePath("answerQuestion.html"),
            controller: 'answerQuestionController'
        })
        .state('dcwjAdd', {
            url: "/dcwjAdd",
            cache: false,
            templateUrl: getTemplatePath("dcwjAdd.html"),
            controller: 'dcwjAddController'
        })
        .state('noticedetail', {
            url: "/noticedetail/:ggid",
            cache: false,
            templateUrl: getTemplatePath("noticedetail.html"),
            controller: 'noticedetailController'
        })
        .state('kclist', {
            url: "/kclist",
            cache: false,
            templateUrl: getTemplatePath("kclist.html"),
            controller: 'kclistController'
        })
        .state('app.kbcx', {
            url: "/kbcx",
            cache: true,
            views: {
                'tab-content': {
                    templateUrl: getTemplatePath("kbcx.html"),
                    controller: 'kbcxController'
                }
            }
        }).state('guidelineCollege', {
            url: '/guidelineCollege',
            cache: true,
            templateUrl: getTemplatePath("guidelineCollege.html"),
            controller: 'guidelineCollegeController'
        })
        .state('guidelineNetwork', {
            url: '/guidelineNetwork',
            cache: false,
            templateUrl: getTemplatePath("guidelineNetwork.html"),
            controller: 'guidelineNetworkController'
        })
        .state('serviceHotline', {
            url: '/serviceHotline',
            cache: false,
            templateUrl: getTemplatePath("serviceHotline.html"),
            controller: 'serviceHotlineController'
        })
        .state('serviceHotlineDetail', {
            url: '/serviceHotlineDetail/:id',
            cache: false,
            templateUrl: getTemplatePath("serviceHotlineDetail.html"),
            controller: 'serviceHotlineDetailController'
        })
        .state('guidelineCollegeDetail', {
            url: '/guidelineCollegeDetail/:id',
            cache: false,
            templateUrl: getTemplatePath("guidelineCollegeDetail.html"),
            controller: 'guidelineCollegeDetailController'
        })
        .state('myNeedsContent', {
            url: '/myNeedsContent',
            cache: false,
            templateUrl: getTemplatePath("myNeedsContent.html"),
            controller: 'myNeedsContentController'
        })
        .state('other', {
            url: '/other/:url',
            cache: false,
            templateUrl: getTemplatePath("other.html"),
            controller: 'otherController'
        })
        .state('mymark', {
            url: '/mymark',
            cache: false,
            templateUrl: getTemplatePath("myMark.html"),
            controller: 'mymarkController'
        })
        .state('mylike', {
            url: '/mylike',
            cache: false,
            templateUrl: getTemplatePath("myLike.html"),
            controller: 'mylikeController'
        })
        .state('videoPlay', {
            url: '/videoPlay/:id',
            cache: false,
            templateUrl: getTemplatePath("videoPlay.html"),
            controller: 'videoPlayController'
        })
        .state('welcomeuser', {
            url: "/welcomeuser",
            cache: false,
            templateUrl: getTemplateUserPath("welcome.html"),
            controller: 'welcomeuserController'
        })
        .state('loginUserMobile', {
            url: '/loginUserMobile',
            cache: false,
            templateUrl: getTemplateUserPath("loginByMobile.html"),
            controller: 'loginUserMobileController',
        })
        .state('user', {
            url: '/user',
            cache: false,
            abstract: true,
            templateUrl: getTemplateUserPath("usertabs.html"),
            controller: 'usertabsController',
        })
        .state('user.mainuser', {
            url: "/mainuser",
            cache: false,
            templateUrl: getTemplateUserPath("mainuser.html"),
            controller: 'mainuserController'
        })
        .state('user.mainBzr', {
            url: "/mainBzr",
            cache: true,
            templateUrl: getTemplateUserPath("mainBzr.html"),
            controller: 'mainBzrController'
        })
        .state('user.mainNewUser', {
            url: "/mainNewUser",
            cache: true,
            templateUrl: getTemplateUserPath("mainNewUser.html"),
            controller: 'mainuserController'
        })
        .state('comsumList', {
            url: "/comsumList/:carno",
            cache: false,
            templateUrl: getTemplateUserPath("comsumList.html"),
            controller: 'comsumListController'
        })
        .state('oneCard', {
            url: "/oneCard/:carno",
            cache: false,
            templateUrl: getTemplateUserPath("oneCard.html"),
            controller: 'oneCardController'
        })
        .state('user.ydjxnew', {
            url: '/ydjxnew',
            cache: true,
            templateUrl: getTemplatePath("ydjxNew.html"),
            controller: 'ydjxNewController'

        })
        .state('user.zjzp', {
            url: '/zjzp',
            cache: true,
            templateUrl: getTemplatePath("zjzp.html"),
            controller: 'zjzpController'
        })
        .state('user.teacherinfo', {
            url: "/teacherinfo",
            cache: false,
            templateUrl: getTemplatePath("teacherinfo.html"),
            controller: 'teacherinfoController'
        })
        .state('noticeByJs', {
            url: "/noticeByJs",
            cache: false,
            templateUrl: getTemplateUserPath("noticeByJs.html"),
            controller: 'noticeByJsController'
        })
        .state('noticeJsDetial', {
            url: "/noticeJsDetial/:ggid",
            cache: false,
            templateUrl: getTemplateUserPath("noticeJsDetial.html"),
            controller: 'noticeJsDetialController'
        })
        .state('userlist', {
            url: "/userlist",
            cache: true,
            templateUrl: getTemplateUserPath("userlist.html"),
            controller: 'userlistController'
        })
        .state('user.addresslistNew', {
            url: "/addresslistNew",
            cache: true,
            templateUrl: getTemplateUserPath("addresslistNew.html"),
            controller: 'addressListNewCtrl'
        })
        .state('user.userInfo', {
            url: "/userInfo",
            cache: false,
            templateUrl: getTemplateUserPath("userNewInfo.html"),
            controller: 'usersInfoController'
        })
        .state('wifiInfo', {
            url: "/wifiInfo",
            cache: false,
            templateUrl: getTemplateUserPath("wifiInfo.html"),
            controller: 'wifiInfoController'
        })
        .state('user.zpykbcx', {
            url: "/zpykbcx",
            cache: true,
            templateUrl: getTemplateUserPath("zpykbcx.html"),
            controller: 'zpykbcxController',
            onEnter: function() {}
        })
        .state('allBcView', {
            url: "/allBcView",
            cache: true,
            templateUrl: getTemplateUserPath("allBcView.html"),
            controller: 'allBcViewController',
            onEnter: function() {}
        })
        .state('bcinfo', {
            url: "/bcinfo/:classid",
            cache: true,
            templateUrl: getTemplateUserPath("bcinfo.html"),
            controller: 'bcinfoController',
            onEnter: function() {}
        })
        .state('user.myAgenda', {
            url: "/myAgenda",
            cache: false,
            templateUrl: getTemplateUserPath("myAgenda.html"),
            controller: 'myAgendaController',
            onEnter: function() {}
        }).state('addAgenda', {
            url: "/addAgenda/:params/:title",
            cache: false,
            templateUrl: getTemplateUserPath("addAgenda.html"),
            controller: 'addAgendaController',
            onEnter: function() {}
        })
        .state('zcbd', {
            url: "/zcbd",
            cache: false,
            templateUrl: getTemplateUserPath("zcbd.html"),
            controller: 'zcbdController',
            onEnter: function() {}
        })
        .state('StudyList', {
            url: "/StudyList",
            cache: false,
            templateUrl: getTemplateUserPath("StudyList.html"),
            controller: 'studyListController',
            onEnter: function() {}
        })
        .state('handLogin', {
            url: "/handLogin",
            cache: false,
            templateUrl: getTemplateUserPath("handLogin.html"),
            controller: 'handLoginController'
        })
        .state('openHand', {
            url: "/openHand",
            cache: false,
            templateUrl: getTemplateUserPath("openHand.html"),
            controller: 'openHandController'
        })
        .state('dywj', {
            url: "/dywj",
            cache: false,
            templateUrl: getTemplateUserPath("dywj.html"),
            controller: 'dywjController'
        }).state('gzzd', {
            url: "/gzzd",
            cache: false,
            templateUrl: getTemplateUserPath("gzzd.html"),
            controller: 'gzzdController'
        })
        .state('fj', {
            url: "/fj/:id",
            cache: false,
            templateUrl: getTemplateUserPath("fj.html"),
            controller: 'fjController'
        }).state('yj', {
            url: "/yj/:url/:title",
            cache: false,
            templateUrl: getTemplateUserPath("yj.html"),
            controller: 'yjController'
        })
        .state('kqgl', {
            url: "/kqgl",
            cache: true,
            templateUrl: getTemplatePath("kqgl.html"),
            controller: 'kqglController'
        })
        .state('yktkq', {
            url: "/yktkq",
            cache: false,
            templateUrl: getTemplatePath("yktkq.html"),
            controller: 'yktkqController'
        }).state('cryc', {
            url: "/cryc",
            cache: false,
            templateUrl: getTemplatePath("cryc.html"),
            controller: 'crycController'
        }).state('yddm', {
            url: "/yddm",
            cache: false,
            templateUrl: getTemplatePath("yddm.html"),
            controller: 'yddmController'
        })
        .state('kqInfo', {
            url: "/kqInfo/:kcid/:bt",
            cache: false,
            templateUrl: getTemplatePath("kqInfo.html"),
            controller: 'kqInfoController'
        }).state('kqaddinfo', {
            url: "/kqaddinfo",
            cache: false,
            templateUrl: getTemplatePath("kqaddinfo.html"),
            controller: 'kqaddinfoController'
        }).state('kqStudent', {
            url: "/kqStudent",
            cache: false,
            templateUrl: getTemplatePath("kqStudent.html"),
            controller: 'kqStudentController'
        }).state('kqlist', {
            url: "/kqlist/:id/:type",
            cache: false,
            templateUrl: getTemplatePath("kqlist.html"),
            controller: 'kqlistController'
        }).state('qdlist', {
            url: "/qdlist/:id",
            cache: false,
            templateUrl: getTemplatePath("qdlist.html"),
            controller: 'qdlistController'
        })
        .state("oaautoLogin", {
            url: '/oaautoLogin/:phone',
            cache: false,
            templateUrl: getTemplatePath("autoLogin.html"),
            controller: 'oaAutoLoginController',
        })
        .state('todolist', {
            url: "/todolist",
            cache: false,
            templateUrl: getTemplateUserPath("todolist.html"),
            controller: 'todolistController',
            onEnter: function() {}
        }).state('hasdolist', {
            url: "/hasdolist",
            cache: false,
            templateUrl: getTemplateUserPath("hasdolist.html"),
            controller: 'hasdolistController',
            onEnter: function() {}
        })
        .state('appClose', {
            url: "/appClose",
            views: {
                '': {
                    abstract: false,
                    templateUrl: getTemplateUserPath("appClose.html"),
                    controller: 'applicationCtrl'
                }
            }
        })
        .state('appClose.selectnode', {
            url: "/selectnode/:infoId/:flowParams/:formInbox",
            cache: false,
            templateUrl: getTemplateUserPath("selectnode.html"),
            controller: 'selectnodeController'
        })
        .state('selectnode', {
            url: "/selectnode/:flowParams/:historyUrl",
            cache: false,
            templateUrl: getTemplateUserPath("selectnode.html"),
            controller: 'selectnodeController'
        })
        .state('xformTabComment', {
            url: "/xformTabComment/:formId/:info_id/:moduleId/:wfId/:pid/:pnid/:showComment/:title/:v/:type/:gInboxId/:operationType/:isAttention/:backReason/:actName/:historyUrl",
            cache: false,
            templateUrl: getTemplateUserPath("xformTab.html"),
            controller: 'xformTabCtrl',
            resolve: {
                formId: ['$stateParams', function($stateParams) {
                    return $stateParams.formId;
                }],
                info_id: ['$stateParams', function($stateParams) {
                    return $stateParams.info_id;
                }],
                moduleId: ['$stateParams', function($stateParams) {
                    return $stateParams.moduleId;
                }],
                wfId: ['$stateParams', function($stateParams) {
                    return $stateParams.wfId;
                }],
                pid: ['$stateParams', function($stateParams) {
                    return $stateParams.pid;
                }],
                pnid: ['$stateParams', function($stateParams) {
                    return $stateParams.pnid;
                }],
                v: ['$stateParams', function($stateParams) {
                    return $stateParams.v;
                }],
                type: ['$stateParams', function($stateParams) {
                    return $stateParams.type;
                }],
                gInboxId: ['$stateParams', function($stateParams) {
                    return $stateParams.gInboxId;
                }],
                actName: ['$stateParams', function($stateParams) {
                    return $stateParams.actName;
                }],
                doRefreshTodo: ['$rootScope', function($rootScope) {
                    return $rootScope.todoFileRefresh;
                }],
                historyUrl: ['$stateParams', function($stateParams) {
                    return $stateParams.historyUrl;
                }]
            }
        })
        .state('xformTab', {
            url: '/xformTab/:formId/:info_id/:moduleId/:wfId/:pid/:pnid/:showComment/:title/:v/:type/:gInboxId/:operationType/:isAttention/:backReason/:actName/:historyUrl',
            cache: false,
            views: {
                '': {
                    templateUrl: getTemplateUserPath("xformTab.html"),
                    controller: 'xformTabCtrl',
                    resolve: {
                        formId: ['$stateParams', function($stateParams) {
                            return $stateParams.formId;
                        }],
                        info_id: ['$stateParams', function($stateParams) {
                            return $stateParams.info_id;
                        }],
                        moduleId: ['$stateParams', function($stateParams) {
                            return $stateParams.moduleId;
                        }],
                        wfId: ['$stateParams', function($stateParams) {
                            return $stateParams.wfId;
                        }],
                        pid: ['$stateParams', function($stateParams) {
                            return $stateParams.pid;
                        }],
                        pnid: ['$stateParams', function($stateParams) {
                            return $stateParams.pnid;
                        }],
                        v: ['$stateParams', function($stateParams) {
                            return $stateParams.v;
                        }],
                        type: ['$stateParams', function($stateParams) {
                            return $stateParams.type;
                        }],
                        gInboxId: ['$stateParams', function($stateParams) {
                            return $stateParams.gInboxId;
                        }],
                        actName: ['$stateParams', function($stateParams) {
                            return $stateParams.actName;
                        }],
                        doRefreshTodo: ['$rootScope', function($rootScope) {
                            return $rootScope.todoFileRefresh;
                        }],
                        historyUrl: ['$stateParams', function($stateParams) {
                            return $stateParams.historyUrl;
                        }]
                    }
                },
                'xform@xformTab': {
                    templateUrl: getTemplateUserPath("xform.html"),
                    controller: 'xformCtrl'
                },
                'attachmentFiles@xformTab': {
                    templateUrl: getTemplateUserPath("attachmentFiles.html"),
                    controller: 'attachmentCtrl'
                }
            }
        })
        // ****************************Note start 便笺
        .state('noteTab', {
            url: '/noteTab',
            cache: false,
            templateUrl: getTemplateNotePath("noteTab.html"),
            controller: 'noteTabController'
            // views: {
            //     '': {
            //         templateUrl: getTemplateNotePath("noteTab.html"),
            //         controller: 'noteTabController'
            //     },
            //     'noteToList@noteTab': {
            //         templateUrl: getTemplateNotePath("noteToList.html"),
            //         controller: 'noteToListCtrl'
            //     },
            //     'noteToAllList@noteTab': {
            //         templateUrl: getTemplateNotePath("noteToAllList.html"),
            //         controller: 'noteToAllListCtrl'
            //     },
            //     'noteFromList@noteTab': {
            //         templateUrl: getTemplateNotePath("noteFromList.html"),
            //         controller: 'noteFromListCtrl'
            //     }
            // }
        })
        .state('noteTab.noteToList', {
            url: '/noteToList',
            cache: false,
            views: {
                'noteToList': {
                    templateUrl: getTemplateNotePath("noteToList.html"),
                    controller: 'noteToListCtrl'
                }
            }           
        })
        .state('noteTab.noteToAllList', {
            url: '/noteToAllList',
            cache: false,
            views: {
                'noteToAllList': {
                    templateUrl: getTemplateNotePath("noteToAllList.html"),
                    controller: 'noteToAllListCtrl'
                }
            }
        })
        .state('noteTab.noteFromList', {
            url: '/noteFromList',
            cache: false,
            views: {
                'noteFromList': {
                    templateUrl: getTemplateNotePath("noteFromList.html"),
                    controller: 'noteFromListCtrl'
                }
            }            
        })
        .state('noteDetail', {
            url: '/noteDetail/:noteId/:edit',
            cache: false,
            templateUrl: getTemplateNotePath("noteDetail.html"),
            controller: 'noteDetailCtrl'
        })
        .state('createNote', {
            url: '/createNote',
            cache: false,
            templateUrl: getTemplateNotePath("createNote.html"),
            controller: 'createNoteCtrl'
        })
        .state('forwardNote', {
            url: '/forwardNote/:noteId',
            cache: false,
            templateUrl: getTemplateNotePath("forwardNote.html"),
            controller: 'forwardNoteCtrl'
        })
        .state('noteReply', {
            url: '/noteReply/:noteId/:rid',
            cache: false,
            templateUrl: getTemplateNotePath("noteReply.html"),
            controller: 'noteReplyCtrl'
        })
        // ****************************Note end 便笺
        .state('leaveList', {
            url: "/leaveList",
            cache: false,
            templateUrl: getTemplateUserPath("leaveList.html"),
            controller: 'leaveListController',
            onEnter: function() {}
        })
        .state('internalLetters', {
            url: "/internalLetters",
            cache: false,
            templateUrl: getTemplateUserPath("internalLetters.html"),
            controller: 'internalLettersCtrl',
            onEnter: function() {}
        })
        .state('noticeNew', {
            url: "/noticeNew",
            cache: false,
            templateUrl: getTemplateUserPath("noticeNewList.html"),
            controller: 'noticeNewCtrl'
        })
        .state('weekMeet', {
            url: "/weekMeet",
            cache: false,
            templateUrl: getTemplateUserPath("weekMeet.html"),
            controller: 'weekMeetController',
            onEnter: function() {}
        })
        .state('ldrc', {
            url: "/ldrc",
            cache: false,
            templateUrl: getTemplateUserPath("ldrc.html"),
            controller: 'ldrcController',
            onEnter: function() {}
        }).state('xiaoLi', {
            url: "/xiaoLi",
            cache: false,
            templateUrl: getTemplateUserPath("xiaoLi.html"),
            controller: 'xiaoLiController',
            onEnter: function() {}
        }).state('wechatLogin', {
            url: "/wechatLogin",
            templateUrl: getTemplatePath("wechatLogin.html"),
            controller: 'wechatLoginCtrl'
        }).state('toRead', {
            url: "/toRead",
            cache: false,
            templateUrl: getTemplateUserPath("toReadList.html"),
            controller: 'toReadController',
            onEnter: function() {}
        }).state('myFocus', {
            url: "/myFocus",
            cache: false,
            templateUrl: getTemplateUserPath("myFocusList.html"),
            controller: 'myFocusController',
            onEnter: function() {}
        });

    if(isWeiXin() && Feature.FEATURE_WECHAT_LOGIN){
        $urlRouterProvider.otherwise('/wechatLogin');
    }else{
        if (localStorage.userid) {
            $urlRouterProvider.otherwise('/user/mainNewUser');
        } else {
            $urlRouterProvider.otherwise('/loginMobile');
        }
    }
    
    $ionicConfigProvider.tabs.position("bottom");
    $ionicConfigProvider.views.transition("android");
    $ionicConfigProvider.templates.maxPrefetch(4);
});
app.run(function($state, $rootScope, $templateCache, $cacheFactory, showAlert, $ionicHistory, $ionicPlatform, $ionicPopup, $location, $http, getDataSource, userHelp, $stateParams , WeChat , Toast , $ionicLoading) {
    //showAlert.showLoading(20000, "加载中...");
    $rootScope.formweixin = true;

    $rootScope.SelectIndex = 1;
    $rootScope.ZJIndex = 1;
    if (localStorage.user && localStorage.user !== "undefined") {
        $rootScope.user = JSON.parse(localStorage.user);
        //userHelp.setSession(function() { //TODO chenb
        //console.log("userSessionSuccess");
        //})

    }
    $http.get("../config/AppConfig.json").then(function(data) {
        var nowdata = data.data;
        $rootScope.AppConfig = nowdata;
    });
    $http.get("../config/appContent.json").then(function(data) {
        $rootScope.AppContent = data.data;
    });
    $http.get("../config/leftmenu.json").then(function(data) {
        $rootScope.leftmenus = data.data;
    });

    document.addEventListener("deviceready", function() {
        //为了防止用户填写很多文本框内容按返回直接白打，设置了此值。
        document.addEventListener("backbutton", function() {
            //alert($rootScope.backButtonNoAction);
            if ($rootScope.backButtonNoAction == true) {

            }
        }, false);

    }, false);

    //双击退出
    $ionicPlatform.registerBackButtonAction(function(e) {
        //判断处于哪个页面时双击退出

        //e.preventDefault();
        //return false;
    }, 101);
    $ionicPlatform.registerBackButtonAction(function(e) {
        return false; // 安卓全面禁止返回操作
        //如果是一下页面，禁用返回
        switch ($state.$current.name) {
            case "loginMobile":
                return false;
                break;
            case "stuappraise":
                return false;
                break;
            case "userinfo":
                return false;
                break;
            case "KCDetail":
                return false;
                break;
            case "studentgroup":
                return false;
                break;
        }
        if ($rootScope.backButtonNoAction == true) {
            return false;
        } else {
            if ($location.path().indexOf("/app/") > -1) {
                if ($rootScope.backButtonPressedOnceToExit) {
                    ionic.Platform.exitApp();
                } else {
                    $rootScope.backButtonPressedOnceToExit = true;
                    window.plugins.toast.show("再按一次退出系统", 'short', 'center');
                    setTimeout(function() {
                        $rootScope.backButtonPressedOnceToExit = false;
                    }, 2000);
                }
            } else if ($ionicHistory.backView() && $state.$current.name != "app.main") {
                $ionicHistory.goBack();
            } else {
                $rootScope.backButtonPressedOnceToExit = true;
                window.plugins.toast.show("再按一次退出系统", 'short', 'center');
                setTimeout(function() {
                    $rootScope.backButtonPressedOnceToExit = false;
                }, 2000);
            }
        }
        e.preventDefault();
        return false;
    }, 201);

    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();

    var w;
    if (typeof(Worker) !== "undefined") {
        if (typeof(w) == "undefined") {
            w = new Worker("../Script/APPScript/backWorker.js");
        }

        w.onmessage = function(event) {
            var e = event.data;
        };
    } else {
        // alert("Sorry, your browser does not support Web Workers...");
    }

    $rootScope.iconvalArray = new Array();

    $rootScope.chat = {};

    function hideOptionMenu(){
        try {
            WeChat.hideOptionMenu();
        } catch (error) {
            console.log(error);
        }
    }

    $rootScope.$on('$stateChangeStart',
	    function(event, toState, toParams, fromState, fromParams){
			console.log("fromState name :" + fromState.name );
			console.log("toState name :" + toState.name );

            var loginState = "";
            if(isWeiXin() && Feature.FEATURE_WECHAT_LOGIN){
                loginState = "wechatLogin";
            }else{
                loginState = "loginMobile";
            }

            if(toState.name != loginState){
                if(!localStorage.userid){
                    $state.go(loginState);
                    event.preventDefault();
                }
            }

            if(isWeiXin()){
                hideOptionMenu();
            }

            //$("title").html("");

			//从其他页面返回到登录页时，如果已登录，直接关闭微信页面
			if(fromState.name && toState.name == "wechatLogin" && localStorage.userid){
				  console.log(fromParams);
				  event.preventDefault();
				   try{
					   WeChat.closeWindow();
				   }catch(e){
					   console.log(e);
				   }
			}
	});

    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams) {
            //设置全局允许返回键
            $rootScope.backButtonNoAction = false;

            //console.log("toState:" + toState.name);
            //首页切换不刷新
            if(fromState.name != "user.userInfo" && toState.name == "user.mainNewUser"){
                console.log("execute $rootScope.refreshMainPage");
                $rootScope.refreshMainPage && $rootScope.refreshMainPage();
            }
    });



    ionic.Platform.ready(function() {
        $("#myloading").parent().css("display", "none");
        if ($rootScope.user != undefined && $rootScope.user != "undefined" && $rootScope.user != "null") {
            $rootScope.user.isFirstLogin = false;
        } else {

        }
    });

});
var APPController = angular.module('app.controllers', ['ngSanitize', 'restangular', 'ui.bootstrap']);