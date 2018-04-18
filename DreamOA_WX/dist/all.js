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

/**
* UTF16和UTF8转换对照表
* U+00000000 – U+0000007F   0xxxxxxx
* U+00000080 – U+000007FF   110xxxxx 10xxxxxx
* U+00000800 – U+0000FFFF   1110xxxx 10xxxxxx 10xxxxxx
* U+00010000 – U+001FFFFF   11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
* U+00200000 – U+03FFFFFF   111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
* U+04000000 – U+7FFFFFFF   1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
*/
var Base64 = {
    // 转码表
    table : [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
            'I', 'J', 'K', 'L', 'M', 'N', 'O' ,'P',
            'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
            'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
            'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
            'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
            'w', 'x', 'y', 'z', '0', '1', '2', '3',
            '4', '5', '6', '7', '8', '9', '+', '/'
    ],
    UTF16ToUTF8 : function(str) {
        var res = [], len = str.length;
        for (var i = 0; i < len; i++) {
            var code = str.charCodeAt(i);
            if (code > 0x0000 && code <= 0x007F) {
                // 单字节，这里并不考虑0x0000，因为它是空字节
                // U+00000000 – U+0000007F  0xxxxxxx
                res.push(str.charAt(i));
            } else if (code >= 0x0080 && code <= 0x07FF) {
                // 双字节
                // U+00000080 – U+000007FF  110xxxxx 10xxxxxx
                // 110xxxxx
                var byte1 = 0xC0 | ((code >> 6) & 0x1F);
                // 10xxxxxx
                var byte2 = 0x80 | (code & 0x3F);
                res.push(
                    String.fromCharCode(byte1), 
                    String.fromCharCode(byte2)
                );
            } else if (code >= 0x0800 && code <= 0xFFFF) {
                // 三字节
                // U+00000800 – U+0000FFFF  1110xxxx 10xxxxxx 10xxxxxx
                // 1110xxxx
                var byte1 = 0xE0 | ((code >> 12) & 0x0F);
                // 10xxxxxx
                var byte2 = 0x80 | ((code >> 6) & 0x3F);
                // 10xxxxxx
                var byte3 = 0x80 | (code & 0x3F);
                res.push(
                    String.fromCharCode(byte1), 
                    String.fromCharCode(byte2), 
                    String.fromCharCode(byte3)
                );
            } else if (code >= 0x00010000 && code <= 0x001FFFFF) {
                // 四字节
                // U+00010000 – U+001FFFFF  11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
            } else if (code >= 0x00200000 && code <= 0x03FFFFFF) {
                // 五字节
                // U+00200000 – U+03FFFFFF  111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            } else /** if (code >= 0x04000000 && code <= 0x7FFFFFFF)*/ {
                // 六字节
                // U+04000000 – U+7FFFFFFF  1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            }
        }
 
        return res.join('');
    },
    UTF8ToUTF16 : function(str) {
        var res = [], len = str.length;
        var i = 0;
        for (var i = 0; i < len; i++) {
            var code = str.charCodeAt(i);
            // 对第一个字节进行判断
            if (((code >> 7) & 0xFF) == 0x0) {
                // 单字节
                // 0xxxxxxx
                res.push(str.charAt(i));
            } else if (((code >> 5) & 0xFF) == 0x6) {
                // 双字节
                // 110xxxxx 10xxxxxx
                var code2 = str.charCodeAt(++i);
                var byte1 = (code & 0x1F) << 6;
                var byte2 = code2 & 0x3F;
                var utf16 = byte1 | byte2;
                res.push(Sting.fromCharCode(utf16));
            } else if (((code >> 4) & 0xFF) == 0xE) {
                // 三字节
                // 1110xxxx 10xxxxxx 10xxxxxx
                var code2 = str.charCodeAt(++i);
                var code3 = str.charCodeAt(++i);
                var byte1 = (code << 4) | ((code2 >> 2) & 0x0F);
                var byte2 = ((code2 & 0x03) << 6) | (code3 & 0x3F);
                utf16 = ((byte1 & 0x00FF) << 8) | byte2
                res.push(String.fromCharCode(utf16));
            } else if (((code >> 3) & 0xFF) == 0x1E) {
                // 四字节
                // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
            } else if (((code >> 2) & 0xFF) == 0x3E) {
                // 五字节
                // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            } else /** if (((code >> 1) & 0xFF) == 0x7E)*/ {
                // 六字节
                // 1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            }
        }
 
        return res.join('');
    },
    encode : function(str) {
        if (!str) {
            return '';
        }
        var utf8    = this.UTF16ToUTF8(str); // 转成UTF8
        var i = 0; // 遍历索引
        var len = utf8.length;
        var res = [];
        while (i < len) {
            var c1 = utf8.charCodeAt(i++) & 0xFF;
            res.push(this.table[c1 >> 2]);
            // 需要补2个=
            if (i == len) {
                res.push(this.table[(c1 & 0x3) << 4]);
                res.push('==');
                break;
            }
            var c2 = utf8.charCodeAt(i++);
            // 需要补1个=
            if (i == len) {
                res.push(this.table[((c1 & 0x3) << 4) | ((c2 >> 4) & 0x0F)]);
                res.push(this.table[(c2 & 0x0F) << 2]);
                res.push('=');
                break;
            }
            var c3 = utf8.charCodeAt(i++);
            res.push(this.table[((c1 & 0x3) << 4) | ((c2 >> 4) & 0x0F)]);
            res.push(this.table[((c2 & 0x0F) << 2) | ((c3 & 0xC0) >> 6)]);
            res.push(this.table[c3 & 0x3F]);
        }
 
        return res.join('');
    },
    decode : function(str) {
        if (!str) {
            return '';
        }
 
        var len = str.length;
        var i   = 0;
        var res = [];
 
        while (i < len) {
            code1 = this.table.indexOf(str.charAt(i++));
            code2 = this.table.indexOf(str.charAt(i++));
            code3 = this.table.indexOf(str.charAt(i++));
            code4 = this.table.indexOf(str.charAt(i++));
 
            c1 = (code1 << 2) | (code2 >> 4);
            c2 = ((code2 & 0xF) << 4) | (code3 >> 2);
            c3 = ((code3 & 0x3) << 6) | code4;
 
            res.push(String.fromCharCode(c1));
 
            if (code3 != 64) {
                res.push(String.fromCharCode(c2));
            }
            if (code4 != 64) {
                res.push(String.fromCharCode(c3));
            }
 
        }
 
        return this.UTF8ToUTF16(res.join(''));
    }
};

/*(typeof Crypto=="undefined"||!Crypto.util)&&function(){var e=self.Crypto={},g=e.util={rotl:function(a,b){return a<<b|a>>>32-b},rotr:function(a,b){return a<<32-b|a>>>b},endian:function(a){if(a.constructor==Number)return g.rotl(a,8)&16711935|g.rotl(a,24)&4278255360;for(var b=0;b<a.length;b++)a[b]=g.endian(a[b]);return a},randomBytes:function(a){for(var b=[];a>0;a--)b.push(Math.floor(Math.random()*256));return b},bytesToWords:function(a){for(var b=[],c=0,d=0;c<a.length;c++,d+=8)b[d>>>5]|=a[c]<<24-d%
32;return b},wordsToBytes:function(a){for(var b=[],c=0;c<a.length*32;c+=8)b.push(a[c>>>5]>>>24-c%32&255);return b},bytesToHex:function(a){for(var b=[],c=0;c<a.length;c++)b.push((a[c]>>>4).toString(16)),b.push((a[c]&15).toString(16));return b.join("")},hexToBytes:function(a){for(var b=[],c=0;c<a.length;c+=2)b.push(parseInt(a.substr(c,2),16));return b},bytesToBase64:function(a){if(typeof btoa=="function")return btoa(f.bytesToString(a));for(var b=[],c=0;c<a.length;c+=3)for(var d=a[c]<<16|a[c+1]<<8|a[c+
2],e=0;e<4;e++)c*8+e*6<=a.length*8?b.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d>>>6*(3-e)&63)):b.push("=");return b.join("")},base64ToBytes:function(a){if(typeof atob=="function")return f.stringToBytes(atob(a));for(var a=a.replace(/[^A-Z0-9+\/]/ig,""),b=[],c=0,d=0;c<a.length;d=++c%4)d!=0&&b.push(("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a.charAt(c-1))&Math.pow(2,-2*d+8)-1)<<d*2|"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(a.charAt(c))>>>
6-d*2);return b}},e=e.charenc={};e.UTF8={stringToBytes:function(a){return f.stringToBytes(unescape(encodeURIComponent(a)))},bytesToString:function(a){return decodeURIComponent(escape(f.bytesToString(a)))}};var f=e.Binary={stringToBytes:function(a){for(var b=[],c=0;c<a.length;c++)b.push(a.charCodeAt(c)&255);return b},bytesToString:function(a){for(var b=[],c=0;c<a.length;c++)b.push(String.fromCharCode(a[c]));return b.join("")}}}();
function sha1(m,hash){var w=[];var H0=hash[0],H1=hash[1],H2=hash[2],H3=hash[3],H4=hash[4];for(var i=0;i<m.length;i+=16){var a=H0,b=H1,c=H2,d=H3,e=H4;for(var j=0;j<80;j++){if(j<16)w[j]=m[i+j]|0;else{var n=w[j-3]^w[j-8]^w[j-14]^w[j-16];w[j]=n<<1|n>>>31}var t=(H0<<5|H0>>>27)+H4+(w[j]>>>0)+(j<20?(H1&H2|~H1&H3)+1518500249:j<40?(H1^H2^H3)+1859775393:j<60?(H1&H2|H1&H3|H2&H3)-1894007588:(H1^H2^H3)-899497514);H4=H3;H3=H2;H2=H1<<30|H1>>>2;H1=H0;H0=t}H0=H0+a|0;H1=H1+b|0;H2=H2+c|0;H3=H3+d|0;H4=H4+e|0}return[H0,
H1,H2,H3,H4]}self.hash=[1732584193,-271733879,-1732584194,271733878,-1009589776];
self.addEventListener("message",function(event){var uint8_array,message,block,nBitsTotal,output,nBitsLeft,nBitsTotalH,nBitsTotalL;uint8_array=new Uint8Array(event.data.message);message=Crypto.util.bytesToWords(uint8_array);block=event.data.block;event=null;uint8_array=null;output={"block":block};if(block.end===block.file_size){nBitsTotal=block.file_size*8;nBitsLeft=(block.end-block.start)*8;nBitsTotalH=Math.floor(nBitsTotal/4294967296);nBitsTotalL=nBitsTotal&4294967295;message[nBitsLeft>>>5]|=128<<
24-nBitsLeft%32;message[(nBitsLeft+64>>>9<<4)+14]=nBitsTotalH;message[(nBitsLeft+64>>>9<<4)+15]=nBitsTotalL;self.hash=sha1(message,self.hash);output.result=Crypto.util.bytesToHex(Crypto.util.wordsToBytes(self.hash))}else self.hash=sha1(message,self.hash);message=null;self.postMessage(output)},false);
*/
/*  |xGv00|1b17f0a97e2e81eb89bfcb35d52e4a0e */
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
/*
Date.prototype.isLeapYear 判断闰年
Date.prototype.Format 日期格式化
Date.prototype.DateAdd 日期计算
Date.prototype.DateDiff 比较日期差
Date.prototype.toString 日期转字符串
Date.prototype.toArray 日期分割为数组
Date.prototype.DatePart 取日期的部分信息
Date.prototype.MaxDayOfDate 取日期所在月的最大天数
Date.prototype.WeekNumOfYear 判断日期所在年的第几周
StringToDate 字符串转日期型
IsValidDate 验证日期有效性
CheckDateTime 完整日期时间检查
daysBetween 日期天数差
*/

//---------------------------------------------------  
// 判断闰年  
//---------------------------------------------------  
Date.prototype.isLeapYear = function()   
{   
    return (0==this.getYear()%4&&((this.getYear()%100!=0)||(this.getYear()%400==0)));   
}   
  
//---------------------------------------------------  
// 日期格式化  
// 格式 YYYY/yyyy/YY/yy 表示年份  
// MM/M 月份  
// W/w 星期  
// dd/DD/d/D 日期  
// hh/HH/h/H 时间  
// mm/m 分钟  
// ss/SS/s/S 秒  
//---------------------------------------------------  
Date.prototype.Format = function(formatStr)   
{   
    var str = formatStr;   
    var Week = ['日','一','二','三','四','五','六'];  
  
    str=str.replace(/yyyy|YYYY/,this.getFullYear());   
    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));   
  
    str=str.replace(/MM/,this.getMonth()>9?this.getMonth().toString():'0' + this.getMonth());   
    str=str.replace(/M/g,this.getMonth());   
  
    str=str.replace(/w|W/g,Week[this.getDay()]);   
  
    str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());   
    str=str.replace(/d|D/g,this.getDate());   
  
    str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());   
    str=str.replace(/h|H/g,this.getHours());   
    str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());   
    str=str.replace(/m/g,this.getMinutes());   
  
    str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());   
    str=str.replace(/s|S/g,this.getSeconds());   
  
    return str;   
}   
  
//+---------------------------------------------------  
//| 求两个时间的天数差 日期格式为 YYYY-MM-dd   
//+---------------------------------------------------  
function daysBetween(DateOne,DateTwo)  
{   
    var OneMonth = DateOne.substring(5,DateOne.lastIndexOf ('-'));  
    var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ('-')+1);  
    var OneYear = DateOne.substring(0,DateOne.indexOf ('-'));  
  
    var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ('-'));  
    var TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ('-')+1);  
    var TwoYear = DateTwo.substring(0,DateTwo.indexOf ('-'));  
  
    var cha=((Date.parse(OneMonth+'/'+OneDay+'/'+OneYear)- Date.parse(TwoMonth+'/'+TwoDay+'/'+TwoYear))/86400000);   
    return Math.abs(cha);  
}  
  
  
//+---------------------------------------------------  
//| 日期计算  
//+---------------------------------------------------  
Date.prototype.DateAdd = function(strInterval, Number) {   
    var dtTmp = this;  
    switch (strInterval) {   
        case 's' :return new Date(Date.parse(dtTmp) + (1000 * Number));  
        case 'n' :return new Date(Date.parse(dtTmp) + (60000 * Number));  
        case 'h' :return new Date(Date.parse(dtTmp) + (3600000 * Number));  
        case 'd' :return new Date(Date.parse(dtTmp) + (86400000 * Number));  
        case 'w' :return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));  
        case 'q' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number*3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
        case 'm' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
        case 'y' :return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
    }  
}  
  
//+---------------------------------------------------  
//| 比较日期差 dtEnd 格式为日期型或者 有效日期格式字符串  
//+---------------------------------------------------  
Date.prototype.DateDiff = function(strInterval, dtEnd) {   
    var dtStart = this;  
    if (typeof dtEnd == 'string' )//如果是字符串转换为日期型  
    {   
        dtEnd = StringToDate(dtEnd);  
    }  
    switch (strInterval) {   
        case 's' :return parseInt((dtEnd - dtStart) / 1000);  
        case 'n' :return parseInt((dtEnd - dtStart) / 60000);  
        case 'h' :return parseInt((dtEnd - dtStart) / 3600000);  
        case 'd' :return parseInt((dtEnd - dtStart) / 86400000);  
        case 'w' :return parseInt((dtEnd - dtStart) / (86400000 * 7));  
        case 'm' :return (dtEnd.getMonth()+1)+((dtEnd.getFullYear()-dtStart.getFullYear())*12) - (dtStart.getMonth()+1);  
        case 'y' :return dtEnd.getFullYear() - dtStart.getFullYear();  
    }  
}  

//+---------------------------------------------------  
//| 字符串转成日期类型   
//| 格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd  
//+---------------------------------------------------  
function StringToDate(DateStr)  
{   
  
    var converted = Date.parse(DateStr);  
    var myDate = new Date(converted);  
    if (isNaN(myDate))  
    {   
        //var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';  
        var arys= DateStr.split('-');  
        myDate = new Date(arys[0],--arys[1],arys[2]);  
    }  
    return myDate;  
}  

function DateAdd(date,strInterval, Number) {   
    var dtTmp = date;  
    switch (strInterval) {   
        case 's' :return new Date(Date.parse(dtTmp) + (1000 * Number));  
        case 'n' :return new Date(Date.parse(dtTmp) + (60000 * Number));  
        case 'h' :return new Date(Date.parse(dtTmp) + (3600000 * Number));  
        case 'd' :return new Date(Date.parse(dtTmp) + (86400000 * Number));  
        case 'w' :return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));  
        case 'q' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number*3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
        case 'm' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
        case 'y' :return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
    }  
} 

//+---------------------------------------------------  
//| 比较日期差 dtEnd 格式为日期型或者 有效日期格式字符串  
//+---------------------------------------------------  
function DateDiff(strInterval,dtStart, dtEnd) {   
    if (typeof dtEnd == 'string' )//如果是字符串转换为日期型  
    {   
        dtEnd = StringToDate(dtEnd);  
    }  
    switch (strInterval) {   
        case 's' :return parseInt((dtEnd - dtStart) / 1000);  
        case 'n' :return parseInt((dtEnd - dtStart) / 60000);  
        case 'h' :return parseInt((dtEnd - dtStart) / 3600000);  
        case 'd' :return parseInt((dtEnd - dtStart) / 86400000);  
        case 'w' :return parseInt((dtEnd - dtStart) / (86400000 * 7));  
        case 'm' :return (dtEnd.getMonth()+1)+((dtEnd.getFullYear()-dtStart.getFullYear())*12) - (dtStart.getMonth()+1);  
        case 'y' :return dtEnd.getFullYear() - dtStart.getFullYear();  
    }  
}  
  
//+---------------------------------------------------  
//| 日期输出字符串，重载了系统的toString方法  
//+---------------------------------------------------  
//Date.prototype.toString = function(showWeek)  
//{   
//    var myDate= this;  
//    var str = myDate.toLocaleDateString();  
//    if (showWeek)  
//    {   
//        var Week = ['日','一','二','三','四','五','六'];  
//        str += ' 星期' + Week[myDate.getDay()];  
//    }  
//    return str;  
//}  
  
//+---------------------------------------------------  
//| 日期合法性验证  
//| 格式为：YYYY-MM-DD或YYYY/MM/DD  
//+---------------------------------------------------  
function IsValidDate(DateStr)   
{   
    var sDate=DateStr.replace(/(^\s+|\s+$)/g,''); //去两边空格;   
    if(sDate=='') return true;   
    //如果格式满足YYYY-(/)MM-(/)DD或YYYY-(/)M-(/)DD或YYYY-(/)M-(/)D或YYYY-(/)MM-(/)D就替换为''   
    //数据库中，合法日期可以是:YYYY-MM/DD(2003-3/21),数据库会自动转换为YYYY-MM-DD格式   
    var s = sDate.replace(/[\d]{ 4,4 }[\-/]{ 1 }[\d]{ 1,2 }[\-/]{ 1 }[\d]{ 1,2 }/g,'');   
    if (s=='') //说明格式满足YYYY-MM-DD或YYYY-M-DD或YYYY-M-D或YYYY-MM-D   
    {   
        var t=new Date(sDate.replace(/\-/g,'/'));   
        var ar = sDate.split(/[-/:]/);   
        if(ar[0] != t.getYear() || ar[1] != t.getMonth()+1 || ar[2] != t.getDate())   
        {   
            //alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');   
            return false;   
        }   
    }   
    else   
    {   
        //alert('错误的日期格式！格式为：YYYY-MM-DD或YYYY/MM/DD。注意闰年。');   
        return false;   
    }   
    return true;   
}   
  
//+---------------------------------------------------  
//| 日期时间检查  
//| 格式为：YYYY-MM-DD HH:MM:SS  
//+---------------------------------------------------  
function CheckDateTime(str)  
{   
    var reg = /^(\d+)-(\d{ 1,2 })-(\d{ 1,2 }) (\d{ 1,2 }):(\d{ 1,2 }):(\d{ 1,2 })$/;   
    var r = str.match(reg);   
    if(r==null)return false;   
    r[2]=r[2]-1;   
    var d= new Date(r[1],r[2],r[3],r[4],r[5],r[6]);   
    if(d.getFullYear()!=r[1])return false;   
    if(d.getMonth()!=r[2])return false;   
    if(d.getDate()!=r[3])return false;   
    if(d.getHours()!=r[4])return false;   
    if(d.getMinutes()!=r[5])return false;   
    if(d.getSeconds()!=r[6])return false;   
    return true;   
}   
  
//+---------------------------------------------------  
//| 把日期分割成数组  
//+---------------------------------------------------  
Date.prototype.toArray = function()  
{   
    var myDate = this;  
    var myArray = Array();  
    myArray[0] = myDate.getFullYear();  
    myArray[1] = myDate.getMonth();  
    myArray[2] = myDate.getDate();  
    myArray[3] = myDate.getHours();  
    myArray[4] = myDate.getMinutes();  
    myArray[5] = myDate.getSeconds();  
    return myArray;  
}  
  
//+---------------------------------------------------  
//| 取得日期数据信息  
//| 参数 interval 表示数据类型  
//| y 年 m月 d日 w星期 ww周 h时 n分 s秒  
//+---------------------------------------------------  
Date.prototype.DatePart = function(interval)  
{   
    var myDate = this;  
    var partStr='';  
    var Week = ['日','一','二','三','四','五','六'];  
    switch (interval)  
    {   
        case 'y' :partStr = myDate.getFullYear();break;  
        case 'm' :partStr = myDate.getMonth()+1;break;  
        case 'd' :partStr = myDate.getDate();break;  
        case 'w' :partStr = Week[myDate.getDay()];break;  
        case 'ww' :partStr = myDate.WeekNumOfYear();break;  
        case 'h' :partStr = myDate.getHours();break;  
        case 'n' :partStr = myDate.getMinutes();break;  
        case 's' :partStr = myDate.getSeconds();break;  
    }  
    return partStr;  
}  
  
//+---------------------------------------------------  
//| 取得当前日期所在月的最大天数  
//+---------------------------------------------------  
Date.prototype.MaxDayOfDate = function()  
{   
    var myDate = this;  
    var ary = myDate.toArray();  
    var date1 = (new Date(ary[0],ary[1]+1,1));  
    var date2 = date1.dateAdd(1,'m',1);  
    var result = dateDiff(date1.Format('yyyy-MM-dd'),date2.Format('yyyy-MM-dd'));  
    return result;  
}  
  
//+---------------------------------------------------  
//| 取得当前日期所在周是一年中的第几周  
//+---------------------------------------------------  
Date.prototype.WeekNumOfYear = function()  
{   
    var myDate = this;  
    var ary = myDate.toArray();  
    var year = ary[0];  
    var month = ary[1]+1;  
    var day = ary[2];  

    return result;  
}  
  
//+---------------------------------------------------  
//| 字符串转成日期类型   
//| 格式 MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd  
//+---------------------------------------------------  
function StringToDate(DateStr)  
{   
  
    var converted = Date.parse(DateStr);  
    var myDate = new Date(converted);  
    if (isNaN(myDate))  
    {   
        //var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';  
        var arys= DateStr.split('-');  
        myDate = new Date(arys[0],--arys[1],arys[2]);  
    }  
    return myDate;  
}  

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

angular.module('app.factory', [])
    .factory('myfactory', function($state, $ionicSideMenuDelegate) {
        return {
            goMain: function(text) {
                alert(window.localStorage.AppConfig.hasMain);
                if (window.localStorage.AppConfig.hasMain) {
                    $state.go("app.index");
                } else {
                    $ionicSideMenuDelegate.toggleLeft();
                }
            }
        }
    })
    .factory("downService", function($rootScope, $state, $http, Restangular, $ionicPopup, $ionicPlatform) {
        return {
            //Cordova下载:
            cordovaDown: function localFile(fileUrl, fileName) {
                function downloadFile(sourceUrl, targetUrl, fileName) {
                    $rootScope.baifenbi = 0;
                    var myPopup = $ionicPopup.show({
                        template: '<div class="progress"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="{{baifenbi}}" aria-valuemin="0" aria-valuemax="100" style="width:{{baifenbi}}%"><span class="sr-only">{{baifenbi}}%</span></div></div>',
                        title: '下载文件',
                        subTitle: '',
                        scope: $rootScope,
                        buttons: [

                        ]
                    });
                    var fileTransfer = new FileTransfer();
                    var uri = encodeURI(sourceUrl);
                    fileTransfer.onprogress = function(progressEvent) {
                        if (progressEvent.lengthComputable) {
                            //loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
                            $rootScope.baifenbi = (progressEvent.loaded / progressEvent.total) * 100;
                            //alert(progressEvent.loaded / progressEvent.total);
                        } else {

                            //loadingStatus.increment();
                        }
                    };
                    if (fileName) {
                        targetUrl = targetUrl.substr(0, targetUrl.lastIndexOf("/") + 1) + fileName;
                    }

                    fileTransfer.download(
                        uri, targetUrl,
                        function(entry) {
                            $rootScope.baifenbi = 100;
                            myPopup.close();
                            cordova.plugins.bridge.open(targetUrl, function() {}, function() {
                                if (code === 1) {
                                    alert('没有找到文件');
                                } else {
                                    alert('Undefined error');
                                }
                            });
                        },
                        function(error) {
                            myPopup.close();
                            alert("下载文件出错");
                        });
                }
                if (ionic.Platform.isIOS()) {
                    var subFile = fileUrl.substr(fileUrl.lastIndexOf("/") + 1);
                    //subFile = "/Attach" + Base64.decode(subFile);
                    //window.open("../api/getAttach/action/getAttach/" + subFile, "_blank");
                    //alert(subFile);
                    //xsfHttp.download("http://122.224.203.150:81/CollegeAPPIOS/api/getAttach/action/getAttach/" + subFile, function (data) {
                    //        alert(data)
                    //}, function (data) {
                    //    alert(data)
                    //});
                    //alert($rootScope.AppConfig.rootPath + "/api/getAttach/action/getAttach/" + subFile);
                    xsfWindow.open($rootScope.AppConfig.rootPath + "/api/getAttach/action/getAttach/" + subFile, "", true);
                } else {
                    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
                            var _directory = "scdxdownload";
                            //var _url = "https://61.139.79.231/collegeapp/APK/test.docx";
                            var _url = fileUrl;
                            var _localFile = _url.substr(_url.lastIndexOf("/") + 1);
                            var newfile = fileSystem.root.getDirectory(_directory, { create: true },
                                function(newfile) {
                                    newfile.getFile(_localFile, { create: true }, function(fileEntry) {
                                        var targetURL = fileEntry.toURL();
                                        downloadFile(_url, targetURL, fileName);
                                    }, function() {
                                        alert("创建文件失败");
                                    });
                                },
                                function() { alert("创建目录出错"); }
                            );
                        },
                        function(evt) {
                            alert("文件系统出错");
                        }
                    );
                }
            },
            getRootPath: function() {
                var pathName = window.location.pathname.substring(1);
                var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));
                //return window.location.protocol + '//' + window.location.host + '/'+ webName + '/';
                return window.location.protocol + '//' + window.location.host + '/' + webName;
            }
        }

    })
    .factory("cordovaService", function($rootScope, $state, $http, Restangular, $ionicPopup, downService) {
        return {
            //退出系统
            exitApp: function() {
                navigator.notification.confirm(
                    '确定要注销账号吗?', // message
                    function(button) {
                        if (button === 1) {
                            //cordova.plugins.backgroundMode.enable();
                            localStorage.clear();
                            //window.location.href = "http://192.168.1.72/collegeApp/html/index.html";
                            $state.go("login");
                            //navigator.app.exitApp();
                            //ionic.Platform.exitApp();
                        }
                    }, // callback function
                    '注销系统', // title
                    '确定,取消' // confirm 选项，用逗号隔开
                );
            },
            //播放原生视频
            playVideo: function(url) {
                window.plugins.streamingMedia.playVideo(url);
            },
            //原生消息，停留2秒
            toast: function(message) {
                window.plugins.toast.show(message, 'short', 'center');
            },
            //判断APP是否安装
            checkAppInstall: function() {
                appAvailability.check(
                    'com.superlib', // URI Scheme
                    function() { // Success callback
                        //window.plugins.launcher.launch({ packageName: 'com.superlib' }, function () { }, function () { });
                        var onecard = sessionStorage.onecard;
                        var loginData = Restangular.one('Gusers/action/getSuperPSD/' + onecard);
                        loginData.get().then(function(data) {
                            if (data != "") {
                                window.plugins.launcher.launch({ uri: "mobilelib://mobilelib/login?unitid=1595&username=" + onecard + "&password=" + data }, function() {}, function() {});
                            }
                        })
                    },
                    function() { // Error callback
                        navigator.notification.confirm(
                            '您没有安装超星数字图书馆是否立即下载?', // message
                            function(button) {
                                if (button === 1) {
                                    $http.get("../config/AppConfig.json").then(function(data) {
                                        var nowdata = data.data;
                                        var chaoxing = nowdata.chaoxingHref;
                                        downService.cordovaDown(chaoxing);
                                    });

                                }
                            }, // callback function
                            '安装超星', // title
                            '是,否' // confirm 选项，用逗号隔开
                        );
                    }
                );
            },
            //主屏推送
            notification: {
                add: function(userid) {
                    if (ionic.Platform.isIOS()) {
                        return;
                    }
                    var j = 1;

                    var myService = cordova.plugins.myService;
                    myService.getStatus(function(r) { startService(r) }, function(e) { handleError(e) });

                    function startService(data) {
                        if (data.ServiceRunning) {
                            enableTimer(data);
                        } else {
                            myService.startService(function(r) { enableTimer(r) }, function(e) { handleError(e) });
                        }
                    }

                    function enableTimer(data) {
                        if (data.TimerEnabled) {
                            myService.enableTimer(30000, function(r) { registerForBootStart();
                                registerForUpdates(); }, function(e) { handleError(e) });
                        } else {
                            myService.enableTimer(30000, function(r) { registerForBootStart();
                                registerForUpdates(); }, function(e) { handleError(e) });
                        }
                    }

                    function registerForUpdates() {
                        myService.registerForUpdates(function(r) { getNotice() },
                            function(e) { handleError(e) });
                    }

                    function getNotice() {
                        if (!window.localStorage.userid) {
                            return; }
                        $http.get("../api/getNotice/" + window.localStorage.userid).then(function(data) {
                            var noticeData = data.data;
                            for (var i = 0; i < noticeData.length; i++) {
                                if (noticeData[i].id != "0") {
                                    window.plugin.notification.local.add({
                                        id: noticeData[i].id,
                                        sound: "",
                                        message: noticeData[i].message,
                                        title: noticeData[i].title,
                                        json: noticeData[i].parameters,
                                        autoCancel: true,
                                        ongoing: true
                                    });
                                }
                            }
                        });


                        window.plugin.notification.local.onclick = function(id, state, json) {
                            $http.post("../api/updateNotice/" + window.localStorage.userid + "/" + json);
                        };
                    }

                    function handleError(data) {
                        alert("Error: " + data.ErrorMessage);
                    }

                    function registerForBootStart() {
                        myService.registerForBootStart(function(r) {},
                            function(e) { handleError(e) });
                    }

                    function allDone() {
                        getNotice();
                    }

                }
            },
            //跟新系统
            checkVersion: function() {
                $http.get("../config/AppConfig.json").then(function(data) {
                    data = data.data;
                    var lastVersion = parseFloat(data.lastVersion);
                    cordova.getAppVersion().then(function(version) {
                        if (parseFloat(version) < lastVersion) {
                            if (window.confirm("检测到新版本APP，是否立即更新？")) {
                                //window.cordova.plugins.FileOpener.openFile(data.lastAPKHref, function (success) {
                                //}, function (error) {
                                //    alert("下载出现错误");
                                //});
                                downService.cordovaDown(data.lastAPKHref);
                                //$("#myframe").attr("src", "http://192.168.1.72/collegeApp/APK/hello-debug-unaligned.apk");
                                //window.location.href = "http://192.168.1.72/collegeApp/APK/hello-debug-unaligned.apk";
                            }
                        }
                    });
                });

            },
            //扫描二维码
            barCodeScan: function() {
                cordova.plugins.barcodeScanner.scan(
                    function(result) {
                        //alert("We got a barcode\n" +
                        //      "Result: " + result.text + "\n" +
                        //      "Format: " + result.format + "\n" +
                        //      "Cancelled: " + result.cancelled);
                        return result;
                    },
                    function(error) {
                        alert("扫描失败: " + error);
                    }
                );
            },
            //下载文件
            downFile: function(url) {
                window.cordova.plugins.FileOpener.openFile(url, function(success) {}, function(error) {
                    alert("下载出现错误");
                });
            },
            cordovaDown: function(url, name) {
                downService.cordovaDown(url, name);
            }

        }
    })

.factory('$dateService', function() {
        function UTCDate() {
            return new Date(Date.UTC.apply(Date, arguments));
        }
        var formatType = 'standard';
        var dates = {
            "zh-CN": {
                days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
                daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
                daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
                months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                today: "今日",
                format: "yyyy年mm月dd日",
                weekStart: 1,
                meridiem: []
            }

        }
        var DPGlobal = {
            modes: [{
                clsName: 'days',
                navFnc: 'Month',
                navStep: 1
            }, {
                clsName: 'months',
                navFnc: 'FullYear',
                navStep: 1
            }, {
                clsName: 'years',
                navFnc: 'FullYear',
                navStep: 10
            }],
            isLeapYear: function(year) {
                return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
            },
            parseFormat: function(format, type) {
                type = type || formatType;
                var separators = format.replace(this.validParts(type), '\0').split('\0'),
                    parts = format.match(this.validParts(type));
                if (!separators || !separators.length || !parts || parts.length == 0) {
                    throw new Error("Invalid date format.");
                }
                return { separators: separators, parts: parts };
            },
            validParts: function(type) {
                if (type == "standard") {
                    return /hh?|HH?|p|P|ii?|ss?|dd?|DD?|mm?|MM?|yy(?:yy)?/g;
                } else if (type == "php") {
                    return /[dDjlNwzFmMnStyYaABgGhHis]/g;
                } else {
                    throw new Error("Invalid format type.");
                }
            },
            nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
        }
        return {
            //格式化日期
            format: function(date, format, language, type) {
                type = type || formatType;
                language = language || "zh-CN";
                if (date == null) {
                    return '';
                }
                format = DPGlobal.parseFormat(format, type);
                var val;
                if (type == 'standard') {
                    val = {
                        // year
                        yy: date.getFullYear().toString().substring(2),
                        yyyy: date.getFullYear(),
                        // month
                        m: date.getMonth() + 1,
                        M: dates[language].monthsShort[date.getMonth()],
                        MM: dates[language].months[date.getMonth()],
                        // day
                        d: date.getDate(),
                        D: dates[language].daysShort[date.getDay()],
                        DD: dates[language].days[date.getDay()],
                        p: (dates[language].meridiem.length == 2 ? dates[language].meridiem[date.getHours() < 12 ? 0 : 1] : ''),
                        // hour
                        h: date.getHours(),
                        // minute
                        i: date.getMinutes(),
                        // second
                        s: date.getSeconds()
                    };
                    val.H = (val.h % 12 == 0 ? 12 : val.h % 12);
                    val.HH = (val.H < 10 ? '0' : '') + val.H;
                    val.P = val.p.toUpperCase();
                    val.hh = (val.h < 10 ? '0' : '') + val.h;
                    val.ii = (val.i < 10 ? '0' : '') + val.i;
                    val.ss = (val.s < 10 ? '0' : '') + val.s;
                    val.dd = (val.d < 10 ? '0' : '') + val.d;
                    val.mm = (val.m < 10 ? '0' : '') + val.m;
                } else {
                    throw new Error("Invalid format type.");
                }
                var date = [],
                    seps = $.extend([], format.separators);
                for (var i = 0, cnt = format.parts.length; i < cnt; i++) {
                    if (seps.length)
                        date.push(seps.shift())
                    date.push(val[format.parts[i]]);
                }
                return date.join('');
            },
            //日期字符转日期对象
            parse: function(date, format, language, type) {
                type = type || formatType;
                language = language || "zh-CN";
                if (date instanceof Date) {
                    var dateUTC = new Date(date.valueOf() - date.getTimezoneOffset() * 60000);
                    dateUTC.setMilliseconds(0);
                    return dateUTC;
                }
                if (/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(date)) {
                    format = DPGlobal.parseFormat('yyyy-mm-dd', type);
                }
                if (/^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}$/.test(date)) {
                    format = DPGlobal.parseFormat('yyyy-mm-dd hh:ii', type);
                }
                if (/^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}:\d{1,2}(\.\d{1,3})?$/.test(date)) {
                    format = DPGlobal.parseFormat('yyyy-mm-dd hh:ii:ss', type);
                }
                if (/^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}\:\d{1,2}[Z]{0,1}$/.test(date)) {
                    format = DPGlobal.parseFormat('yyyy-mm-dd hh:ii:ss', type);
                }
                var parts = date && date.match(DPGlobal.nonpunctuation) || [],
                    date = new Date(0, 0, 0, 0, 0, 0, 0),
                    parsed = {},
                    setters_order = ['hh', 'h', 'ii', 'i', 'ss', 's', 'yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'D', 'DD', 'd', 'dd', 'H', 'HH', 'p', 'P'],
                    setters_map = {
                        hh: function(d, v) {
                            return d.setHours(v); },
                        h: function(d, v) {
                            return d.setHours(v); },
                        HH: function(d, v) {
                            return d.setHours(v == 12 ? 0 : v); },
                        H: function(d, v) {
                            return d.setHours(v == 12 ? 0 : v); },
                        ii: function(d, v) {
                            return d.setMinutes(v); },
                        i: function(d, v) {
                            return d.setMinutes(v); },
                        ss: function(d, v) {
                            return d.setSeconds(v); },
                        s: function(d, v) {
                            return d.setSeconds(v); },
                        yyyy: function(d, v) {
                            return d.setFullYear(v); },
                        yy: function(d, v) {
                            return d.setFullYear(2000 + v); },
                        m: function(d, v) {
                            v -= 1;
                            while (v < 0) v += 12;
                            v %= 12;
                            d.setUTCMonth(v);
                            while (d.getMonth() != v)
                                d.setDate(d.getDate() - 1);
                            return d;
                        },
                        d: function(d, v) {
                            return d.setDate(v); },
                        p: function(d, v) {
                            return d.setHours(v == 1 ? d.getHours() + 12 : d.getHours()); }
                    },
                    val, filtered, part;
                setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
                setters_map['dd'] = setters_map['d'];
                setters_map['P'] = setters_map['p'];
                for (var i = 0, cnt = format.parts.length; i < cnt; i++) {
                    val = parseInt(parts[i], 10);
                    part = format.parts[i];
                    if (isNaN(val)) {
                        switch (part) {
                            case 'MM':
                                filtered = $(dates[language].months).filter(function() {
                                    var m = this.slice(0, parts[i].length),
                                        p = parts[i].slice(0, m.length);
                                    return m == p;
                                });
                                val = $.inArray(filtered[0], dates[language].months) + 1;
                                break;
                            case 'M':
                                filtered = $(dates[language].monthsShort).filter(function() {
                                    var m = this.slice(0, parts[i].length),
                                        p = parts[i].slice(0, m.length);
                                    return m == p;
                                });
                                val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
                                break;
                            case 'p':
                            case 'P':
                                val = $.inArray(parts[i].toLowerCase(), dates[language].meridiem);
                                break;
                        }
                    }
                    parsed[part] = val;
                }
                for (var i = 0, s; i < setters_order.length; i++) {
                    s = setters_order[i];
                    if (s in parsed && !isNaN(parsed[s]))
                        setters_map[s](date, parsed[s])
                }
                return date;
            }
        }

    })
    .factory('$debounce', ['$rootScope', '$browser', '$q', '$exceptionHandler',
        function($rootScope, $browser, $q, $exceptionHandler) {
            var deferreds = {},
                methods = {},
                uuid = 0;

            function debounce(fn, delay, invokeApply) {
                var deferred = $q.defer(),
                    promise = deferred.promise,
                    skipApply = (angular.isDefined(invokeApply) && !invokeApply),
                    timeoutId, cleanup,
                    methodId, bouncing = false;

                // check we dont have this method already registered
                angular.forEach(methods, function(value, key) {
                    if (angular.equals(methods[key].fn, fn)) {
                        bouncing = true;
                        methodId = key;
                    }
                });

                // not bouncing, then register new instance
                if (!bouncing) {
                    methodId = uuid++;
                    methods[methodId] = { fn: fn };
                } else {
                    // clear the old timeout
                    deferreds[methods[methodId].timeoutId].reject('bounced');
                    $browser.defer.cancel(methods[methodId].timeoutId);
                }

                var debounced = function() {
                    // actually executing? clean method bank
                    delete methods[methodId];

                    try {
                        deferred.resolve(fn());
                    } catch (e) {
                        deferred.reject(e);
                        $exceptionHandler(e);
                    }

                    if (!skipApply) $rootScope.$apply();
                };

                timeoutId = $browser.defer(debounced, delay);

                // track id with method
                methods[methodId].timeoutId = timeoutId;

                cleanup = function(reason) {
                    delete deferreds[promise.$$timeoutId];
                };

                promise.$$timeoutId = timeoutId;
                deferreds[timeoutId] = deferred;
                promise.then(cleanup, cleanup);

                return promise;
            }


            // similar to angular's $timeout cancel
            debounce.cancel = function(promise) {
                if (promise && promise.$$timeoutId in deferreds) {
                    deferreds[promise.$$timeoutId].reject('canceled');
                    return $browser.defer.cancel(promise.$$timeoutId);
                }
                return false;
            };

            return debounce;
        }
    ])
    .factory("$jsonToFormData",function() {
        function transformRequest( data, getHeaders ) {
            var headers = getHeaders();
            headers["Content-Type"] = "application/x-www-form-urlencoded; charset=utf-8";
            return $.param(data);
        }
        return( transformRequest );
    })
    
    ;
angular.module('app.filters', [])
.filter("columnDisplayFilter", function ($filter) {
    return function (input) {
        if (input.filter != "") {
            if (input.filter == "date") {
                return inputdate = $filter("date")(input.value, input.format);
            }
            else {
                return input.value;
            }
        }
        else {
            return input.value;
        }
    }
})
.filter("queryItem", function () {
    return function (list, query) {
        if (query) {
            var returnVal = new Array();
            for (var j = 0; j < list.length; j++) {
                item = list[j];
                for (var i = 0; i < item.rowListColumnData.length; i++) {
                    if (item.rowListColumnData[i].istitle == true) {
                        if (item.rowListColumnData[i].value.indexOf(query) > -1) {
                            returnVal.push(item);
                        }
                    }
                }
            }
            return returnVal;
        }
        else {
            return list;
        }
    }
})
.filter("queryStuList", function () {
    return function (list, query) {
        if (query) {
            var returnVal = new Array();
            for (var j = 0; j < list.length; j++) {
                var item = list[j];
                if (item.bt.indexOf(query) > -1 || (item.bt2!=undefined&& item.bt2.indexOf(query) > -1)) {
                    returnVal.push(item);
                }
            }
            return returnVal;
        }
        else {
            return list;
        }
    }
})
    .filter("queryOaList", function () {
        return function (list, query) {
            if (query) {
                console.log("[queryOaList] " + query);
                var returnVal = new Array();
                for (var j = 0; list && j < list.length; j++) {
                    var item = list[j];
                    if (item.modulename.indexOf(query) > -1 || item.itemscontent.indexOf(query) > -1 || item.name.indexOf(query) > -1) {
                        returnVal.push(item);
                    }
                }
                return returnVal;
            }
            else {
                return list;
            }
        }
    })
.filter("SPZTFilter", function ($filter) {
    return function (input) {
        var returnVal = "";
        switch (input) {
            case "0": returnVal = "未审核"; break;
            case "1": returnVal = "同意"; break;
            case "-1": returnVal = "不同意"; break;
        }
        return returnVal;
    }
})
.filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);

/*
 * lunarCalendar plug-in
 * author: gsz
 * create time: 2015/6/4
 * use: 获取当天农历：GetLunarDay.today()，获取指定日期农历：GetLunarDay(yyyy,mm,dd)。
*/
; (function () {
    var CalendarData = new Array(100);
    var madd = new Array(12);
    var tgString = "甲乙丙丁戊己庚辛壬癸";
    var dzString = "子丑寅卯辰巳午未申酉戌亥";
    var numString = "一二三四五六七八九十";
    var monString = "正二三四五六七八九十冬腊";
    var weekString = "日一二三四五六";
    var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
    var cYear, cMonth, cDay, TheDate;
    CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
    madd[0] = 0;
    madd[1] = 31;
    madd[2] = 59;
    madd[3] = 90;
    madd[4] = 120;
    madd[5] = 151;
    madd[6] = 181;
    madd[7] = 212;
    madd[8] = 243;
    madd[9] = 273;
    madd[10] = 304;
    madd[11] = 334;

    function GetBit(m, n) {
        return (m >> n) & 1;
    }
    function e2c() {
        TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
        var total, m, n, k;
        var isEnd = false;
        var tmp = TheDate.getYear();
        if (tmp < 1900) {
            tmp += 1900;
        }
        total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;

        if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
            total++;
        }
        for (m = 0; ; m++) {
            k = (CalendarData[m] < 0xfff) ? 11 : 12;
            for (n = k; n >= 0; n--) {
                if (total <= 29 + GetBit(CalendarData[m], n)) {
                    isEnd = true; break;
                }
                total = total - 29 - GetBit(CalendarData[m], n);
            }
            if (isEnd) break;
        }
        cYear = 1921 + m;
        cMonth = k - n + 1;
        cDay = total;
        if (k == 12) {
            if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
                cMonth = 1 - cMonth;
            }
            if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
                cMonth--;
            }
        }
    }

    function GetcDateString() {
        var rtnJson = {};
        var tmp = "";
        tmp += tgString.charAt((cYear - 4) % 10);
        tmp += dzString.charAt((cYear - 4) % 12);
        tmp += "(";
        tmp += sx.charAt((cYear - 4) % 12);
        tmp += ")年";
        rtnJson.zodiac = tmp;
        tmp = "";
        if (cMonth < 1) {
            tmp += "(闰)";
            tmp += monString.charAt(-cMonth - 1);
        } else {
            tmp += monString.charAt(cMonth - 1);
        }
        tmp += "月";
        rtnJson.month = tmp;
        tmp = "";
        tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
        if (cDay % 10 != 0 || cDay == 10) {
            tmp += numString.charAt((cDay - 1) % 10);
        }
        rtnJson.day = tmp;
        return rtnJson;
    }

    

    var D = new Date();
    var yy = D.getFullYear();
    var mm = D.getMonth() + 1;
    var dd = D.getDate();
    var ww = D.getDay();
    var ss = parseInt(D.getTime() / 1000);
    if (yy < 100) yy = "19" + yy;
    var GetCNDate = function GetCNDate() {
        return GetLunarDay(yy, mm, dd);
    }
    var GetLunarDay = function (solarYear, solarMonth, solarDay) {
        //solarYear = solarYear<1900?(1900+solarYear):solarYear;
        if (solarYear < 1921 || solarYear > 2020) {
            return "";
        } else {
            solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
            e2c(solarYear, solarMonth, solarDay);
            return GetcDateString();
        }
    }
    GetLunarDay.today = GetCNDate;
    window["GetLunarDay"] = GetLunarDay;
})();
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

    if(localStorage.logname&&localStorage.password){
        $('#myCheck').prop('checked',true);
        $scope.loginData.logname = localStorage.logname;
        $scope.loginData.password = localStorage.password;
    }

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

                if($('#myCheck').prop("checked")){
                    localStorage.logname = $scope.loginData.logname;
                    localStorage.password = $scope.loginData.password;
                }else{
                    localStorage.removeItem('logname');
                    localStorage.removeItem('password');
                }

                localStorage.deptId = data.data.deptId;

                localStorage.version = appVersion; 

                var resultUser = {};
                resultUser.info_id = data.data.user_id;
                $rootScope.user = resultUser;
                $rootScope.user.type = "student";
                $rootScope.user.isFirstLogin = false;
                localStorage.user = JSON.stringify($rootScope.user);

                console.log($scope.loginData)
                
                

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
APPController.controller("myController", function ($scope) {

})
  // 走进中浦院 
.controller("zjzpController", function ($scope, Restangular, $state, $rootScope, $ionicSlideBoxDelegate, getDataSource, $timeout, $ionicScrollDelegate, goDetail) {
    getDataSource.getDataSource("doLogServer", { content: "新闻" }, function () { });
    $scope.loadImg = function () {
        getDataSource.getDataSource("getNewList", { category: "中浦要闻", pagecount: 1, rowcount: "4" }, function (data) {
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
    }

    // 页面加载数据
    $scope.loadmeDatas = function (categoryVal) {
        if (categoryVal) {
            $scope.queryType = categoryVal;

            getDataSource.getDataSource("getNewList", { category: categoryVal, pagecount: $scope.index, rowcount: "8" }, function (data) {
                var dataImag = "";
                if (data.length == 0) {
                    $scope.moreDataCanBeLoaded = false;
                } else { $scope.moreDataCanBeLoaded = true; }
                for (var i = 0; i < data.length; i++) {
                    dataImag = data[i].title_pic;
                    if (dataImag && dataImag !== null && dataImag !== "") {
                        var index = dataImag.lastIndexOf(".");
                        data[i].title_pic = dataImag.substr(0, index) + "_small" + dataImag.substr(index, dataImag.length);
                    }
                    $scope.dataZpywSource.push(data[i]);
                }
            });
        }
    };

    var isIOS = ionic.Platform.isIOS();
    var isAndroid = ionic.Platform.isAndroid();
    $scope.marTop = "margin-top:110px";
    if (isAndroid) {
        $scope.marTop = "margin-top:110px";
    }
    if (isIOS) {
        $scope.marTop = "margin-top:90px";
    }
    if ($rootScope.formweixin) {
        $scope.marTop = "margin-top:110px";
    }

    $scope.index = 0;
    $scope.dataZpywSource = [];
    //$scope.loadmeDatas("中浦要闻");
    $scope.queryType = "中浦要闻";
    $scope.moreDataCanBeLoaded = true;
    $scope.loadImg();
    $scope.showData = true;

    $scope.changeIndex = function (index, categoryVal) {
        for (var i = 1; i <= 3; i++) {
            $("#" + i).attr("style", "font-family:微软雅黑;font-size:20px;font-style:normal;text-decoration:none;");
        }
        $rootScope.SelectIndex = index;
        $("#" + index).attr("style", "font-family:微软雅黑;font-size:20px;font-style:normal;text-decoration:none;color:#e60000;");

        $scope.index = 1;
        $scope.dataZpywSource = [];
        $scope.queryType = categoryVal;

        $scope.loadmeDatas($scope.queryType);
        //$ionicScrollDelegate.scrollTop(true);
        $ionicScrollDelegate.scrollTo(0, 0, false);

    }

    //$scope.changeIndex($rootScope.SelectIndex);

    $scope.loadMore = function () {
        $scope.index = $scope.index + 1;
        $scope.loadmeDatas($scope.queryType);
        $scope.$broadcast("scroll.infiniteScrollComplete");
    }
    $scope.doRefresh = function () {
        $scope.moreDataCanBeLoaded = true;
        $scope.dataZpywSource = [];
        $scope.index = 1;
        $scope.loadmeDatas($scope.queryType);
        $scope.$broadcast("scroll.refreshComplete");
    };
    $scope.goNewsDetail = function (item) {
        goDetail.goNewsDetail(item);
    }
})
    // 新闻列表页面 
.controller("zpNewsListController", function ($scope, Restangular, $state, $rootScope, getDataSource, $stateParams, goDetail) {
    // 页面加载数据
    $scope.loadmeDatas = function () {
        //var zpyw = Restangular.one("../TestJSON/zpyw.json");
        //zpyw.get().then(function (Data) {
        //    $scope.dataZpywSource = Data;
        //});
        getDataSource.getDataSource("getNewList", { category: $stateParams.type, pagecount: $scope.index, rowcount: "8" }, function (data) {

            var dataImag = "";
            if (data.length == 0) {
                $scope.moreDataCanBeLoaded = false;
            }
            for (var i = 0; i < data.length; i++) {
                dataImag = data[i].title_pic;
                if (dataImag && dataImag !== null && dataImag !== "") {
                    var index = dataImag.lastIndexOf(".");
                    data[i].title_pic = dataImag.substr(0, index) + "_small" + dataImag.substr(index, dataImag.length);
                }
                $scope.dataZpywSource.push(data[i]);
            }
        });
    };
    $scope.index = 0;
    $scope.isShow = false;
    //$scope.loadmeDatas();
    $scope.dataZpywSource = [];
    $scope.moreDataCanBeLoaded = true;

    $scope.loadTitle = $stateParams.type;

    $scope.doRefresh = function () {
        $scope.moreDataCanBeLoaded = true;
        $scope.index = 1;
        $scope.dataZpywSource = [];
        $scope.loadmeDatas();
        $scope.$broadcast("scroll.refreshComplete");
    };

    $scope.loadMore = function () {
        $scope.index = $scope.index + 1;
        $scope.loadmeDatas();
        $scope.$broadcast("scroll.infiniteScrollComplete");
    }

    $scope.goNewsDetail = function (item) {
        goDetail.goNewsDetail(item);
        //if (item.category == 1) {
        //    console.log("http://10.100.2.35/video/" + item.videopath);
        //    xsf.playVideo($rootScope.AppConfig.videoPlayPath + item.videopath);
        //}
        //else if (item.category == 2) {
        //    $state.go("ydjxDetail", { id: item.info_id });
        //}
        //else if (item.category == 0) {
        //    $state.go("zpNewsDetail", { id: item.info_id });
        //}
        //else if (item.category == 3) {
        //    xsfWindow.open1(item.webpath);
        //}
    }
})
// 新闻列表详情页面 
.controller("zpNewsDetailController", function ($scope, $stateParams, Restangular, $state, $rootScope, getDataSource, $dateService, $sce, $timeout) {
    $scope.fontSize = "1.5em";
    // 日期转换
    $scope.parseDate = function (dataString) {
        if (dataString) {
            return $dateService.parse(dataString);
        }
        else {
            return "";
        }
    }
    // 页面加载数据
    $scope.loadmeDatas = function () {
        //alert($stateParams.id);
        //var zpyw = Restangular.one("../TestJSON/ydjxDetail.json");
        //zpyw.get().then(function (Data) {
        //    $scope.dataSource = Data;
        //    $("#wishContent").html(Data.content);
        //});
        if ($stateParams.id !== "123") {
            getDataSource.getDataSource("getNewDetail", { id: $stateParams.id }, function (data) {
                $scope.dataSource = data[0];
                $scope.dataSource.content = $sce.trustAsHtml(data[0].content);
                getDataSource.getDataSource("doLogAny", { content: "访问新闻:" + $scope.dataSource.title }, function () { });
            });
        }
        else {
            getDataSource.getDataSource("getNewxyDetail", { category: "学院介绍" }, function (data) {
                $scope.dataSource = data[0];
                $scope.dataSource.ftitle = "学院介绍";
                $("#wishContent").html(data[0].content);
            });
        }
        $timeout(function () {
            $("#wishContent p").attr("style", "line-height:28px;");
            $("#wishContent img").attr("style", "width:100%;");
        }, 400);
    };
    $scope.loadmeDatas();
    var tgs = new Array('div', 'td', 'tr');
    var szs = new Array('medium', 'large', 'x-large');
    var startSz = 0;
    $scope.fontSizeFun = function () {
        if ($scope.fontSize == "1.9em") {
            $scope.fontSize = "1.5em";
            $("#wishContent p").attr("style", "line-height:22px;");
        }
        else if ($scope.fontSize == "1.5em") {
            $scope.fontSize = "1.7em";
            $("#wishContent p").attr("style", "line-height:28px;");
        }
        else {
            $scope.fontSize = "1.9em";
            $("#wishContent p").attr("style", "line-height:35px;");
        }
    };
})
    // 移动教学页面 
.controller("ydjxController", function ($scope, Restangular, $state, $rootScope, getDataSource, goDetail) {
    // 页面加载数据
    $scope.loadmeDatas = function () {
        getDataSource.getDataSource("getNewList", { category: "公开课" }, function (data) {
            $scope.dataZpywSource = data;
        });

        getDataSource.getDataSource("getNewList", { category: "网络学院" }, function (data) {
            $scope.dataWlxySource = data;
        });
    };
    //$scope.loadmeDatas();
    $scope.goDetail = function (item) {
        goDetail.goNewsDetail(item);
        //if (item.category == 1) {
        //    console.log("http://10.100.2.35/video/" + item.videopath);
        //    xsf.playVideo($rootScope.AppConfig.videoPlayPath + item.videopath);
        //}
        //else if (item.category == 2) {
        //    $state.go("ydjxDetail", { id: item.info_id });
        //}
        //else if (item.category == 0) {
        //    $state.go("zpNewsDetail", { id: item.info_id });
        //}
        //else if (item.category == 3) {
        //    xsfWindow.open1(item.webpath);
        //}
    }
    //点赞
    $scope.addGood = function (item) {
        getDataSource.getDataSource("queryComment", { userid: user.info_id, finfoId: item.info_id }, function (data) {
            // 判断是否有点过赞
            if (data.length > 0) {
                //showAlert.showToast("已点赞");
            }
            else {
                var formData = { userid: user.info_id, username: user.username, finfo_id: item.info_id, isgood: 1, replaydate: new Date(), ncontent: "", replayid: "" };
                getDataSource.getDataSource("Insert_GoodComment", formData, function (data) {
                    //showAlert.showToast("点赞成功");
                    $scope.loadmeDatas();
                });
            }
        });
    };
    // 相关材料
    $scope.goDocuments = function (item) {
        $state.go("clxz", { fid: item.info_id });
    }
    $scope.gokbcxList = function () {
        $state.go("app.kbcx");
    }
    $scope.HrefTo = function (kc) {
        $state.go("KCDetail", { info_id: kc.info_id });
    };
    $scope.goydjxList = function (VideoType) {
        $state.go("ydjxList", { type: VideoType });
    }
    $scope.goYDList = function (VideoType) {
        $state.go("zpNewsList", { type: VideoType });
    }
    $scope.goNewsDetail = function (item) {
        goDetail.goNewsDetail(item);
        //if (item.category == 1) {
        //    console.log("http://10.100.2.35/video/" + item.videopath);
        //    xsf.playVideo($rootScope.AppConfig.videoPlayPath + item.videopath);
        //}
        //else if (item.category == 2) {
        //    $state.go("ydjxDetail", { id: item.info_id });
        //}
        //else if (item.category == 0) {
        //    $state.go("zpNewsDetail", { id: item.info_id });
        //}
        //else if (item.category == 3) {
        //    xsfWindow.open1(item.webpath);
        //}
    };
})
    // 移动教学列表页面 
.controller("ydjxListController", function ($scope, Restangular, $state, $rootScope, getDataSource, $stateParams, $sce, $timeout, showAlert, goDetail) {
    // 加载用户数据
    var user = $rootScope.user;
    // 页面加载数据
    $scope.loadmeDatas = function () {
        getDataSource.getDataSource("getNewList", { category: $stateParams.type, pagecount: $scope.index, rowcount: "8" }, function (data) {
            var dataImag = "";
            if (data.length == 0) {
                $scope.moreDataCanBeLoaded = false;
            }
            for (var i = 0; i < data.length; i++) {
                dataImag = data[i].title_pic;
                if (dataImag && dataImag !== null && dataImag !== "") {
                    var index = dataImag.lastIndexOf(".");
                    data[i].title_pic = dataImag.substr(0, index) + "_small" + dataImag.substr(index, dataImag.length);
                }
                $scope.dataZpywSource.push(data[i]);
            }
            $scope.loadVideo();

        });
    };

    $scope.loadTitle = $stateParams.type;
    $scope.isShow = false;
    $scope.index = 0;
    if ($scope.loadTitle == "直播课堂") {
        $scope.isShow = true;
    }
    //$scope.loadmeDatas();
    $scope.dataZpywSource = [];
    $scope.moreDataCanBeLoaded = true;

    $scope.doRefresh = function () {
        $scope.moreDataCanBeLoaded = true;
        $scope.index = 1;
        $scope.dataZpywSource = [];
        $scope.loadmeDatas();
        $scope.$broadcast("scroll.refreshComplete");
    };

    $scope.loadMore = function () {
        $scope.index = $scope.index + 1;
        $scope.loadmeDatas();
        $scope.$broadcast("scroll.infiniteScrollComplete");
    }

    //点赞
    $scope.addGood = function (item) {
        getDataSource.getDataSource("queryComment", { userid: user.info_id, finfoId: item.info_id }, function (data) {
            // 判断是否有点过赞
            if (data.length > 0) {
                //showAlert.showToast("已点赞");
            }
            else {
                var formData = { userid: user.info_id, username: user.username, finfo_id: item.info_id, isgood: 1, replaydate: new Date(), ncontent: "", replayid: "" };
                getDataSource.getDataSource("Insert_GoodComment", formData, function (data) {
                    //showAlert.showToast("点赞成功");
                    //$scope.loadmeDatas();
                    item.goodcount = item.goodcount + 1;
                });
            }
        });
    };

    $scope.showMin = function (minutes) {
        if (minutes == "") {
            return true;
        }
        else { return false; }
    }
    // 相关材料
    $scope.goDocuments = function (item) {
        $state.go("clxz", { fid: item.info_id });
    }

    $scope.onPlayerReady = function (API) {
        $scope.API = API;
    }
    $scope.loadVideo = function () {
        $scope.controller = {};
        $scope.controller.API = null;
        $scope.sources = new Array();
        angular.forEach($scope.dataZpywSource, function (item) {
            var newarr = new Array();
            newarr.push({ src: $sce.trustAsResourceUrl($rootScope.AppConfig.videoPlayPath + item.videopath), type: "video/mp4" });
            $scope.sources.push(newarr);
        });

        $scope.controller.config = {
            sources: [],
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
            }
        };
    }
    $scope.goDetail = function (index, item) {
        goDetail.goNewsDetail(item);
        //if (item.category == 1) {
        //    //console.log("http://10.100.2.35/video/" + item.videopath);
        //    //xsf.playVideo($rootScope.AppConfig.videoPlayPath + item.videopath);
        //    $state.go("videoPlay", { id: item.info_id });
        //}
        //else if (item.category == 2) {
        //    $state.go("ydjxDetail", { id: item.info_id });
        //}
        //else if (item.category == 0) {
        //    $state.go("zpNewsDetail", { id: item.info_id });
        //}
        //else if (item.category == 3) {
        //    xsfWindow.open1(item.webpath);
        //}
    }
})
    // 材料下载页面 
.controller("clxzController", function ($scope, Restangular, $state, $rootScope, getDataSource, $stateParams, downService, $http, showAlert) {
    var tempDir = "";
    xsf.getDeviceInfo(function (info) {
        //alert("info:" + info)
        //alert(info.WORK_DIR)
        tempDir = info.TEMP_DIR;
    });
    // 页面加载数据
    $scope.loadmeDatas = function () {

        //var zpyw = Restangular.one("../TestJSON/zpyw.json");
        //zpyw.get().then(function (Data) {
        //    $scope.dataZpywSource = Data;
        //});

        getDataSource.getDataSource("queryClxzSql", {
            fid: $stateParams.fid
        }, function (data) {
            $scope.dataZpywSource = data;
            $scope.isShow = false;
            if ($scope.dataZpywSource.length == 0)
            { $scope.isShow = true; }
        });
    };
    $scope.loadmeDatas();

    $scope.loadData = function (item) {
        //xsf.open($rootScope.AppConfig.clxzPath + item.filename); //"中央党校测试报告0828.docx"
        //downService.cordovaDown($rootScope.AppConfig.clxzPath + item.filename, item.filename);
        //alert(downService.getRootPath() + item.filename);
        //downService.cordovaDown(downService.getRootPath() + "/api/getAttach/action/getAttach/" + item.filename, item.filename);
        //xsfWindow.open($rootScope.AppConfig.rootPath + "/api/getAttach/action/getAttach/" + item.filename, "", true);
        //$http.get("../api/getAttach/action/getAttach/" + window.localStorage.userid).then(function (data) {
        //    var noticeData = data.data;
        //});
        //xsfRecord.start("http://218.80.199.107:9901/CollegeAPP/staticresource/attach/" + item.filename);
        //window.location.href = "";
        //$http.post("../api/getFile/"+ item.id).then(function (data) {
        //    alert("下载成功");
        //});
        showAlert.showLoading(50000, "下载中...");
        var url = $rootScope.AppConfig.clxzPath + item.filename;
        var filePath = tempDir + item.filename;
        var downlaoder = xsfHttp.download(url, filePath,
                       function (result) {
                           showAlert.hideLoading();
                           xsf.open("file://" + tempDir + item.filename);
                       },
                       function (error) {
                           showAlert.hideLoading();
                           showAlert.showToast("文件无法下载");
                       }
                       );
        downlaoder.onprogress = function (progressEvent) {
            if (progressEvent.lengthComputable) {
                //alert("" + progressEvent.total + "/" + progressEvent.loaded);
            }

        }
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

    $scope.doRefresh = function () {
        $scope.moreDataCanBeLoaded = true;
        $scope.index = 1;
        $scope.dataZpywSource = [];
        $scope.loadmeDatas();
        $scope.$broadcast("scroll.refreshComplete");
    };
})

     // 教学资料页面 
.controller("jxzlController", function ($scope, Restangular, $state, $rootScope, getDataSource,$ionicHistory, $http, $stateParams, showAlert) {
    showAlert.hideLoading();
    var tempDir = "";
    var user = JSON.parse(localStorage.user);
    if (!user.formweixin) {
        xsf.getDeviceInfo(function (info) {
            //alert("info:" + info)
            //alert(info.WORK_DIR)
            tempDir = info.TEMP_DIR;
        });
    }
    $scope.goMain = function () {
        if (!user.formweixin) {
            $ionicHistory.goBack();
        }
        else {
            $state.go("app.main");
    }
    }
                // 页面加载数据
    $scope.loadmeDatas = function () {

        var queryKcId = $stateParams.kcid;

        if (!$stateParams.kcid) {            
            queryKcId =  user.classid;
            }

        getDataSource.getDataSource("queryJxzlSql", {
            bcid: queryKcId
            }, function (data) {
                $scope.dataZpywSource = data;
        });
        };
    $scope.loadmeDatas();

    $scope.loadData = function (item) {
        //xsf.open($rootScope.AppConfig.jxzlPath + filename);
        if (!$rootScope.formweixin) {
            showAlert.showLoading(50000, "下载中...");
        }
        var filetype = item.nrtype;
        var filename = "";
        var url = "";
        var filePath = tempDir;
        if (filetype == "0") {
            var index = item.nrbt.lastIndexOf(".");
            filename = item.info_id +item.nrbt.substr(index, item.nrbt.length);
            //xsf.open($rootScope.AppConfig.jxzlPath + filename); //"123.doc"
            // window.location.href = "../api/getAttach/action/getAttach/" + Base64.encode(filename) + "/" + item.nrtype;
            url = $rootScope.AppConfig.getFilepath +Base64.encode(filename) + "/" +item.nrtype;
            filePath += filename;
        }
        else {
            //xsf.open($rootScope.AppConfig.kcjxzlPath + filename); //"123.doc"
            //window.location.href = "../api/getAttach/action/getAttach/" + Base64.encode(item.filepath) + "/" + item.nrtype;
            var index = item.filepath.lastIndexOf("\\");
            filename = item.filepath.substr(index, item.filepath.length);
            url = $rootScope.AppConfig.getFilepath +Base64.encode(item.filepath) + "/" +item.nrtype;
        }
        if ($rootScope.formweixin) {
            //$state.go("other", { url: encodeURI(url) });
            //window.location.href = url;
            window.open(url);
        }
        else {
            var downlaoder = xsfHttp.download(url, filePath,
                                       function (result) {
                                           showAlert.hideLoading();
                                           xsf.open("file://" +tempDir +filename);
        },
                                       function (error) {
                                           showAlert.hideLoading();
                                           showAlert.showToast("文件无法下载");
        }
                                       );
            downlaoder.onprogress = function (progressEvent) {
                if (progressEvent.lengthComputable) {
                //alert("" + progressEvent.total + "/" + progressEvent.loaded);
        }
    }
    }

    }

$scope.loadDataType = function (fileName) {
    var fileType = (fileName.substring(fileName.lastIndexOf(".") +1, fileName.length)).toLowerCase();

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
                    } else {
                        return "../img/txt.png";
        }
        }

    $scope.doRefresh = function () {
        $scope.moreDataCanBeLoaded = true;
        $scope.index = 1;
        $scope.dataZpywSource =[];
        $scope.loadmeDatas();
        $scope.$broadcast("scroll.refreshComplete");
    };
})
 // 调查问卷学生页面 
.controller("dcwjStudentController", function ($scope, Restangular, $state, $rootScope, getDataSource,$ionicHistory, $stateParams, $filter, showAlert) {
    var token = "";
    showAlert.hideLoading();
    $rootScope.user = JSON.parse(localStorage.user);
    // 页面加载数据
    $scope.loadmeDatas = function () {
        var user = $rootScope.user;
        var kssj = $filter('date')(user.kssj, 'yyyy-MM-dd');
        var jssj = $filter('date')(user.jssj, 'yyyy-MM-dd');
        getDataSource.getDataSource(["queryNoQuestionList", "queryHasQuestionList"], { classid_z: $rootScope.user.classid.toString(), uid_z: $rootScope.user.info_id.toString(), type: $stateParams.type }, function (data) {
            //$scope.dataDcwjSource = data[0].data;
            $scope.dataHasDcwjSource = data[1].data;
            $scope.dataDcwjSource = [];
            var date = $filter('date')(new Date(), 'yyyy-MM-dd');

            _.forEach(data[0].data, function (m, key) {
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
            $scope.wpnum = $scope.dataDcwjSource.length;
            $scope.ypnum = $scope.dataHasDcwjSource.length;
            _.find($rootScope.iconvalArray, function (d) {
                return d.key == "studentcount";
            }).val = $scope.dataDcwjSource.length;
            console.log($rootScope.iconvalArray);
        });

        $(document).ready(function () {
            $.ajax({
                type: 'get',
                data: { name: 'admin', psd: '96e79218965eb72c92a549dd5a330112' },//name:登录名，psd:加密过后的密码
                url: $rootScope.AppConfig.openDcwj + "/DSFA/survey/api",
                dataType: 'JSON',
                async: false,
                success: function (data) {
                    token = data.token;
                }
            })

        })
    };
    $scope.loadmeDatas();

    $scope.doRefresh = function () {
        $scope.loadmeDatas();
        $scope.$broadcast("scroll.refreshComplete");
    };

    $scope.goBack = function ()
    {
        $ionicHistory.goBack();
    }

    $scope.goMain = function () {
        if (!$rootScope.user.formweixin) {
            $ionicHistory.goBack();
        }
        else {
            $state.go("app.main");
        }
    }

    $scope.gotoDetail = function (item) {
        //var ret=xsfWindow.open1($rootScope.AppConfig.openDcwj + "/DSFA/admin_client/questionnaire/moblie/views/questionnaire.html?q=" + item.dataflag + "&uid=" + $rootScope.user.info_id + "&cid=" + $rootScope.user.classid + "&token=" + token, "");
        if ($rootScope.user.formweixin) {
            var wjUrl = $rootScope.AppConfig.openDcwj + "/DSFB/admin_client/questionnaire/moblie/wenjuan/views/index.html?uid=" +$rootScope.user.info_id + "&cid=" +$rootScope.user.classid + "&token=" + token + '#/goWj/' +item.dataflag + '//';
            //$state.go("other", { url: encodeURI(wjUrl) });
            window.open(wjUrl);
        }
        else {
            var ref = xsfWindow.open($rootScope.AppConfig.openDcwj + "/DSFA/admin_client/questionnaire/moblie/wenjuan/views/index.html?uid=" +$rootScope.user.info_id + "&cid=" +$rootScope.user.classid + "&token=" + token + '#/goWj/' +item.dataflag + '//', '', true);
            ref.addEventListener('exit', function (event) {
                $scope.loadmeDatas();
        });
    }
    }
})
     // 调查问卷老师页面 
.controller("dcwjTeacherController", function ($scope, Restangular, $state, $rootScope, getDataSource, $stateParams) {
    var token = "";
    // 页面加载数据
    $scope.loadmeDatas = function () {
        $(document).ready(function () {
            $.ajax({
                type: 'get',
                data: { name: 'admin', psd: '96e79218965eb72c92a549dd5a330112' },//name:登录名，psd:加密过后的密码
                url: $rootScope.AppConfig.openDcwj + "/DSFA/survey/api",
                dataType: 'JSON',
                async: false,
                success: function (data) {
                    token = data.token;
                }
            })

        })

        getDataSource.getDataSource("queryQuestionCountList", { classid: $rootScope.user.classid, type: $stateParams.type }, function (data) {
            $scope.dataDcwjSource = data;
        });
    };
    $scope.loadmeDatas();

    $scope.doRefresh = function () {
        $scope.loadmeDatas();
        $scope.$broadcast("scroll.refreshComplete");
    };

    $scope.gotoDetail = function (item) {
        //window.open("http://10.100.2.32:9901/DSFA/admin_client/questionnaire/analyze/views/index.html?id=" + item.id + "&token=11");
        $.ajax({
            url: $rootScope.AppConfig.openDcwj + '/DSFA/survey/api',
            data: { method: "checkToken", token: token },
            type: "post",
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.errmsg != 'ok') {
                    $scope.loadmeDatas();
                    if ($rootScope.formweixin) {
                        var wjUrl = $rootScope.AppConfig.openDcwj + "/DSFA/admin_client/questionnaire/analyze/views/index.html?id=" + item.id + "&uid=" + $rootScope.user.info_id + "&cid=" + $rootScope.user.classid + "&token=" + token;
                        $state.go("other", { url: encodeURI(wjUrl) });
                    } else {
                        var ref = xsfWindow.open($rootScope.AppConfig.openDcwj + "/DSFA/admin_client/questionnaire/analyze/views/index.html?id=" + item.id + "&uid=" + $rootScope.user.info_id + "&cid=" + $rootScope.user.classid + "&token=" + token, '', true);
                    }
                }
                else {
                    if ($rootScope.formweixin) {
                        var wjUrl = $rootScope.AppConfig.openDcwj + "/DSFA/admin_client/questionnaire/analyze/views/index.html?id=" + item.id + "&uid=" + $rootScope.user.info_id + "&cid=" + $rootScope.user.classid + "&token=" + token;
                        $state.go("other", { url: encodeURI(wjUrl) });
                    }
                    else {
                        var ref = xsfWindow.open($rootScope.AppConfig.openDcwj + "/DSFA/admin_client/questionnaire/analyze/views/index.html?id=" + item.id + "&uid=" + $rootScope.user.info_id + "&cid=" + $rootScope.user.classid + "&token=" + token, '', true);
                    }
                }
            }
        })
    }

    $scope.gotoPerson = function (item) {
        $state.go("choosestudentlist", { type: 15, id: item.id });
    }
    $scope.gotoHasPerson = function (item) {
        $state.go("choosestudentlist", { type: 16, id: item.id });
    }
})
// 调查问卷未提交学员页面 
.controller("answerQuestionController", function ($scope, Restangular, $state, $rootScope, getDataSource, $stateParams) {

    // 页面加载数据
    $scope.loadmeDatas = function () {
        getDataSource.getDataSource("getAnswerQuestion", {
            cid: $rootScope.user.classid, qid: $stateParams.qid
        }, function (data) {
            console.log(data);
            $scope.dataDcwjSource = data;
        });
    };
    $scope.loadmeDatas();
})
    // 调查问卷管理页面 
.controller("dcwjAddController", function ($scope, Restangular, $state, $rootScope, getDataSource) {
    // 页面加载数据
    $scope.loadmeDatas = function () {

        var zpyw = Restangular.one("../TestJSON/zpyw.json");
        zpyw.get().then(function (Data) {
            $scope.dataZpywSource = Data;
        });

        //getDataSource.getDataSource("queryJxzlSql", { bcid: $rootScope.user.classid }, function (data) {
        //    $scope.dataZpywSource = data;
        //});
    };
    $scope.loadmeDatas();

    //$http.post("../api/getAttach/action/getAttach/a2a2ae39-bff1-46f0-860b-71d51e72c013.mp4").then(function (data) {
    //    //$rootScope.leftmenus = data.data;
    //});


})
     // 移动教学新页面 
.controller("ydjxNewController", function ($scope, Restangular, $state, $rootScope, getDataSource) {
    //getDataSource.getDataSource("doLogServer", { content: "移动教学" }, function () { });
    // 页面加载数据
    $scope.loadmeDatas = function () {

        var zpyw = Restangular.one("../TestJSON/zpyw.json");
        zpyw.get().then(function (Data) {
            $scope.dataZpywSource = Data;
        });

    };
    $scope.loadmeDatas();

    $scope.goydjxList = function (VideoType) {
        $state.go("ydjxList", { type: VideoType });
    }
    $scope.goYDList = function (VideoType) {
        $state.go("zpNewsList", { type: VideoType });
    }
    $scope.goZJList = function (menuname, i, info_id) {
        if ($rootScope.AppConfig.hasZJlist) {
            if (menuname == 1) {
                $state.go("ydjxzj", { index: i });
            }
            else {
                $state.go("ydjxydhzj", { index: i });
            }
            $rootScope.ZJIndex = i;
        } else {
            $state.go("ydjxzjlist", { menuid: info_id });
        }
    };
    $scope.goZJNewList = function (info_id) {
        $state.go("ydjxzjlist", { menuid: info_id });
    };
})
      // 播放maka页面 
.controller("otherController", function ($timeout, $http, $scope, Restangular, $state, $rootScope, $stateParams) {
    var url = decodeURI($stateParams.url);
    $scope.url = url;
    $(function () {
        $timeout(function () {
            //alert(document.body.scrollHeight);
            var height = document.body.scrollHeight - 43;
            $("#myiframe").css("height", height);
            $("#myiframe").css("width", "100%");
            //alert(height);
            $("#myiframe").attr("src", $scope.url);
        }, 1500);

        //$http.jsonp(url)
        //.success(
        //    function (data, status, header, config) {

        //        alert(data);
        //    }
        //)
        //.error(
        //    function (data) {
        //        alert("error");
        //    }
        //);
        //$("#mypage").load(url);
        //window.location.href = url;
        //window.open(url);
    })
})
    // 我的订阅页面 
.controller("mymarkController", function ($scope, Restangular, $state, $rootScope, $stateParams, goDetail, getDataSource) {
    getDataSource.getDataSource("doLogServer", { content: "我的订阅" }, function () { });
    // 加载用户数据
    var user = $rootScope.user;
    // 页面加载数据
    $scope.loadmeDatas = function () {
        getDataSource.getDataSource("getMyMark", { userid: user.info_id }, function (data) {

            var dataImag = "";
            for (var i = 0; i < data.length; i++) {
                dataImag = data[i].title_pic;
                if (dataImag && dataImag !== null && dataImag !== "") {
                    var index = dataImag.lastIndexOf(".");
                    data[i].title_pic = dataImag.substr(0, index) + "_small" + dataImag.substr(index, dataImag.length);
                }
                $scope.dataZpywSource.push(data[i]);
            }
        });
    };
    $scope.dataZpywSource = [];
    $scope.loadmeDatas();

    $scope.goZJList = function (info_id) {
        $state.go("ydjxzjlist", { menuid: info_id });
    };
    $scope.dingYue = function (item) {
        var formData = { userid: user.info_id, username: user.username, finfo_id: item.info_id, ismark: 1, isgood: 0, islike: 0, comtype: 1 };
        getDataSource.getDataSource("cancelDingyue", formData, function (data) {
            item.ismark = 0;
        });
        $scope.dataZpywSource = [];
        $scope.loadmeDatas();
    };
    $scope.doRefresh = function () {
        $scope.dataZpywSource = [];
        $scope.loadmeDatas();
        $scope.$broadcast("scroll.refreshComplete");
    };
})
       // 我的收藏 
.controller("mylikeController", function ($scope, Restangular, $state, $rootScope, $stateParams, getDataSource, goDetail) {
    getDataSource.getDataSource("doLogServer", { content: "我的收藏 " }, function () { });

    // 加载用户数据
    var user = $rootScope.user;
    // 页面加载数据
    $scope.loadmeDatas = function () {
        getDataSource.getDataSource("getMyLikeList", { userid: user.info_id, pagecount: $scope.index, rowcount: "8" }, function (data) {

            var dataImag = "";
            if (data.length == 0) {
                $scope.moreDataCanBeLoaded = false;
            }
            for (var i = 0; i < data.length; i++) {
                dataImag = data[i].title_pic;
                if (dataImag && dataImag !== null && dataImag !== "") {
                    var index = dataImag.lastIndexOf(".");
                    data[i].title_pic = dataImag.substr(0, index) + "_small" + dataImag.substr(index, dataImag.length);
                }
                $scope.dataZpywSource.push(data[i]);
            }
        });
    };
    $scope.index = 0;
    $scope.isShow = false;
    //$scope.loadmeDatas();
    $scope.dataZpywSource = [];
    $scope.moreDataCanBeLoaded = true;

    $scope.loadTitle = $stateParams.type;

    $scope.doRefresh = function () {
        $scope.moreDataCanBeLoaded = true;
        $scope.index = 1;
        $scope.dataZpywSource = [];
        $scope.loadmeDatas();
        $scope.$broadcast("scroll.refreshComplete");
    };

    $scope.loadMore = function () {
        $scope.index = $scope.index + 1;
        $scope.loadmeDatas();
        $scope.$broadcast("scroll.infiniteScrollComplete");
    }

    $scope.Addgood = function (item) {
        var formData = { userid: user.info_id, username: user.username, finfo_id: item.info_id, ismark: 0, isgood: 1, islike: 0, comtype: 2 };
        getDataSource.getDataSource("queryMyComment", formData, function (data) {
            // 已点赞
            if (data.length == 0) {
                getDataSource.getDataSource("Insert_myComment", formData, function (data) {
                    item.isgood = 1;
                    item.goodcount = item.goodcount + 1;
                });
            }
        });
    };
    $scope.Addlike = function (item) {
        var formData = { userid: user.info_id, username: user.username, finfo_id: item.info_id, ismark: 0, isgood: 0, islike: 1, comtype: 3 };
        getDataSource.getDataSource("queryMyComment", formData, function (data) {
            // 已收藏
            if (data.length > 0) {
                getDataSource.getDataSource("cancelDingyue", formData, function (data) {
                    item.islike = 0;
                    item.docucount = item.docucount - 1;
                });
            }
            else {
                getDataSource.getDataSource("Insert_myComment", formData, function (data) {
                    item.islike = 1;
                    item.docucount = item.docucount + 1;
                });
            }
        });
    };

    $scope.goNewsDetail = function (item) {
        getDataSource.getDataSource(["updatePlayCount", "updateVideoPlayCount"], { info_id: item.info_id }, function (data) {
            item.playcount = item.playcount + 1;
        });
        goDetail.goNewsDetail(item);
    }
})
      // 微课程专辑页面 
.controller("ydjxZjController", function ($scope, Restangular, $state, $rootScope, getDataSource, showAlert, $stateParams, $ionicSlideBoxDelegate, $timeout) {
    // 加载用户数据
    var user = $rootScope.user;
    // 页面加载数据
    $scope.loadmeDatas = function (funName, titlename) { //$stateParams.type
        getDataSource.getDataSource(funName, { title: titlename, userid: user.info_id }, function (data) {
            $scope.dataZpywSource = [];
            var dataImag = "";
            if (data.length == 0) {
                $scope.moreDataCanBeLoaded = false;
            }
            for (var i = 0; i < data.length; i++) {
                dataImag = data[i].title_pic;
                if (dataImag && dataImag !== null && dataImag !== "") {
                    var index = dataImag.lastIndexOf(".");
                    data[i].title_pic = dataImag.substr(0, index) + "_small" + dataImag.substr(index, dataImag.length);
                }
                if (data[i].bcid != null) {
                    // 判断信息推送是否所属该班级 课程数-1
                    var classdata = data[i].bcid.split(',');
                    for (var j = 0; j < classdata.length; j++) {
                        if (classdata[j].lastIndexOf($rootScope.user.classid) == -1) {
                            data[i].videocount = data[i].videocount - 1;
                        }
                    }
                }
                $scope.dataZpywSource.push(data[i]);
            }
        });
    };

    $scope.changeIndex = function (index) {
        for (var i = 1; i <= 5; i++) {
            $("#tab" + i).attr("class", "button ydjx1-bar-but");
        }
        switch (index) {
            case 1:
                $scope.titleName = "微讲座";
                break;
            case 2:
                $scope.titleName = "微视频";
                break;
            case 3:
                $scope.titleName = "微案例";
                break;
            case 4:
                $scope.titleName = "微现场";
                break;
            case 5:
                $scope.titleName = "微论坛";
                break;
            default:
        }
        $rootScope.ZJIndex = index;
        $("#btn1").attr("class", "button button-c00");
        $("#btn2").attr("class", "button button-fff");
        $("#tab" + index).attr("class", "button ydjx1-bar-but ydjx1-bar-but-active");
        $scope.loadmeDatas('getZJlistByCount', $scope.titleName);
    };

    if ($stateParams.titlename != "") {
        $scope.showindex = true;
        $scope.checkIndex = $stateParams.index;
        $scope.changeIndex(parseInt($rootScope.ZJIndex));
        $scope.loadTitle = "微课程";
    }
    else {
        $scope.titleName = "微讲座";
    }
    $scope.orderbyText = "getZJlistByCount";

    $scope.changeBtnIndex = function (index) {
        if (index == 1) {
            $scope.orderbyText = "getZJlistByCount";
            $("#btn1").attr("class", "button button-c00");
            $("#btn2").attr("class", "button button-fff");
        }
        else {
            $scope.orderbyText = "getZJlistByTime";
            $("#btn1").attr("class", "button button-c00-off");
            $("#btn2").attr("class", "button button-fff-on");
        }
        $scope.loadmeDatas($scope.orderbyText, $scope.titleName);
    };

    $scope.goZJList = function (info_id) {
        $state.go("ydjxzjlist", { menuid: info_id });
    };

    $scope.loadmeDatas('getZJlistByCount', $scope.titleName);

    $scope.dingYue = function (item) {
        var formData = { userid: user.info_id, username: user.username, finfo_id: item.info_id, ismark: 1, isgood: 0, islike: 0, comtype: 1 };
        getDataSource.getDataSource("queryMyComment", formData, function (data) {
            if (data.length == 0) {
                getDataSource.getDataSource("Insert_myComment", formData, function (data) {
                    //$scope.loadmeDatas($scope.orderbyText, $scope.titleName);
                    item.ismark = 1;
                });
            }
            else {
                getDataSource.getDataSource("cancelDingyue", formData, function (data) {
                    item.ismark = 0;
                });
            }
        });
    };

    $scope.doRefresh = function () {
        $scope.loadmeDatas($scope.orderbyText, $scope.titleName);
        $scope.$broadcast("scroll.refreshComplete");
    };
})
       // 悦读会专辑页面 
.controller("ydjxYdhZjController", function ($scope, Restangular, $state, $rootScope, getDataSource, showAlert, $stateParams, $ionicSlideBoxDelegate, $ionicScrollDelegate, $timeout) {
    // 加载用户数据
    var user = $rootScope.user;
    // 页面加载数据
    $scope.loadmeDatas = function (funName, titlename) { //$stateParams.type
        getDataSource.getDataSource(funName, { title: titlename, userid: user.info_id }, function (data) {
            $scope.dataZpywSource = [];
            var dataImag = "";
            if (data.length == 0) {
                $scope.moreDataCanBeLoaded = false;
            }
            for (var i = 0; i < data.length; i++) {
                dataImag = data[i].title_pic;
                if (dataImag && dataImag !== null && dataImag !== "") {
                    var index = dataImag.lastIndexOf(".");
                    data[i].title_pic = dataImag.substr(0, index) + "_small" + dataImag.substr(index, dataImag.length);
                }

                if (data[i].bcid != null) {
                    // 判断信息推送是否所属该班级 课程数-1
                    var classdata = data[i].bcid.split(',');
                    for (var j = 0; j < classdata.length; j++) {
                        if (classdata[j].lastIndexOf($rootScope.user.classid) == -1) {
                            data[i].videocount = data[i].videocount - 1;
                        }
                    }
                }
                $scope.dataZpywSource.push(data[i]);
            }
        });
    };

    $scope.changeIndex = function (index) {
        for (var i = 1; i <= 5; i++) {
            $("#ydh" + i).attr("class", "button ydjx1-bar-but");
        }
        switch (index) {
            case 1:
                $scope.titleName = "学“习”思考";
                break;
            case 2:
                $scope.titleName = "党性教育故事";
                break;
            case 3:
                $scope.titleName = "改革开放史";
                break;
            case 4:
                $scope.titleName = "论著导读";
                break;
            case 5:
                $scope.titleName = "信息推送";
                break;
            default:
        }
        $("#btn1").attr("class", "button button-c00");
        $("#btn2").attr("class", "button button-fff");
        $("#ydh" + index).attr("class", "button ydjx1-bar-but ydjx1-bar-but-active");
        $rootScope.ZJIndex = index;
        $scope.loadmeDatas('getZJlistByCount', $scope.titleName);
    };

    if ($stateParams.titlename != "") {
        $scope.showindex = true;
        $scope.checkIndex = $stateParams.index;
        $scope.changeIndex(parseInt($rootScope.ZJIndex));

        $scope.loadTitle = "悦读会";

        // 定位到当前tab页
        $timeout(function () {
            $ionicSlideBoxDelegate.slide(parseInt($stateParams.index));
            $ionicScrollDelegate.$getByHandle('small').scrollTo(50 * (parseInt($stateParams.index) - 1), 0);
        }, 100);
    }
    else {
        $scope.titleName = "微讲座";
    }
    $scope.orderbyText = "getZJlistByCount";

    $scope.changeBtnIndex = function (index) {
        if (index == 1) {
            $scope.orderbyText = "getZJlistByCount";
            $("#btn1").attr("class", "button button-c00");
            $("#btn2").attr("class", "button button-fff");
        }
        else {
            $scope.orderbyText = "getZJlistByTime";
            $("#btn1").attr("class", "button button-c00-off");
            $("#btn2").attr("class", "button button-fff-on");
        }
        $scope.loadmeDatas($scope.orderbyText, $scope.titleName);
    };

    $scope.goZJList = function (info_id) {
        $state.go("ydjxzjlist", { menuid: info_id });
    };

    $scope.loadmeDatas('getZJlistByCount', $scope.titleName);

    $scope.dingYue = function (item) {
        var formData = { userid: user.info_id, username: user.username, finfo_id: item.info_id, ismark: 1, isgood: 0, islike: 0, comtype: 1 };
        getDataSource.getDataSource("queryMyComment", formData, function (data) {
            if (data.length == 0) {
                getDataSource.getDataSource("Insert_myComment", formData, function (data) {
                    //$scope.loadmeDatas($scope.orderbyText, $scope.titleName);
                    item.ismark = 1;
                });
            }
            else {
                getDataSource.getDataSource("cancelDingyue", formData, function (data) {
                    item.ismark = 0;
                });
            }
        });
    };

    $scope.doRefresh = function () {
        $scope.loadmeDatas($scope.orderbyText, $scope.titleName);
        $scope.$broadcast("scroll.refreshComplete");
    };
})
      // 专辑详细页面 
.controller("ydjxZjListController", function ($scope, Restangular, $state, $rootScope, getDataSource, $stateParams, goDetail, $ionicTabsDelegate, $timeout) {
    // 加载用户数据
    var user = $rootScope.user;
    // 页面加载数据
    $scope.loadmeDatas = function () {
        getDataSource.getDataSource("getZJNewList", { menuid: $stateParams.menuid, pagecount: $scope.index, rowcount: "8", userid: user.info_id }, function (data) {

            var dataImag = "";
            if (data.length == 0) {
                $scope.moreDataCanBeLoaded = false;
            }
            for (var i = 0; i < data.length; i++) {
                dataImag = data[i].title_pic;
                if (dataImag && dataImag !== null && dataImag !== "") {
                    var index = dataImag.lastIndexOf(".");
                    data[i].title_pic = dataImag.substr(0, index) + "_small" + dataImag.substr(index, dataImag.length);
                }
                // 判断信息推送是否所属该班级
                if (data[i].bcid == null) {
                    $scope.dataZpywSource.push(data[i]);
                } else if (data[i].bcid.lastIndexOf($rootScope.user.classid) > -1) {
                    $scope.dataZpywSource.push(data[i]);
                }
            }
        });
    };
    $scope.index = 0;
    $scope.isShow = false;
    $scope.dataZpywSource = [];
    $scope.titleList = "";
    $scope.authorList = "";

    var isIOS = ionic.Platform.isIOS();
    var isAndroid = ionic.Platform.isAndroid();
        $scope.marTop = "margin-top:0px";
        $scope.marLeft = "";
    if (isAndroid) {
        $scope.marTop = "margin-top:0px";
        }
    if (isIOS) {
        $scope.marTop = "margin-top:20px";
        $scope.marLeft = "margin-left:75.5%";
        }

    $scope.moreDataCanBeLoaded = true;
    // 定位到当前列表页
    $timeout(function () {
        $ionicTabsDelegate.select(1);
    }, 100);

    if ($stateParams.menuid == "28") {
        $scope.leftTitle = "直播预告";
        $scope.rightTitle = "历史直播";
        $scope.isShow = true;
    }
    else {
        $scope.leftTitle = "简介";
        $scope.rightTitle = "相关课程";
    }

    getDataSource.getDataSource(["getZJDetail", "getAuthorList"], { menuid: $stateParams.menuid }, function (data) {

        if (data[0].data[0].length != 0) {
            $scope.zjDetail = data[0].data[0];
        }
        for (var i = 0; i < data[1].data.length; i++) {
            if ($scope.titleList.lastIndexOf(data[1].data[i].keyword) == -1 && data[1].data[i].keyword != null) {
                $scope.titleList += data[1].data[i].keyword + ", ";
            }

            if ($scope.authorList.lastIndexOf(data[1].data[i].author) == -1) {
                $scope.authorList += data[1].data[i].author + ", ";
            }
        }
    });

    $scope.loadTitle = $stateParams.type;

    $scope.doRefresh = function () {
        $scope.moreDataCanBeLoaded = true;
        $scope.index = 1;
        $scope.dataZpywSource = [];
        $scope.loadmeDatas();
        $scope.$broadcast("scroll.refreshComplete");
    };

    $scope.loadMore = function () {
        $scope.index = $scope.index + 1;
        $scope.loadmeDatas();
        $scope.$broadcast("scroll.infiniteScrollComplete");
    }

    $scope.Addgood = function (item) {
        var formData = { userid: user.info_id, username: user.username, finfo_id: item.info_id, ismark: 0, isgood: 1, islike: 0, comtype: 2 };
        getDataSource.getDataSource("queryMyComment", formData, function (data) {
            // 已点赞
            if (data.length == 0) {
                getDataSource.getDataSource("Insert_myComment", formData, function (data) {
                    item.isgood = 1;
                    item.goodcount = item.goodcount + 1;
                });
            }
        });
    };
    $scope.Addlike = function (item) {
        var formData = { userid: user.info_id, username: user.username, finfo_id: item.info_id, ismark: 0, isgood: 0, islike: 1, comtype: 3 };
        getDataSource.getDataSource("queryMyComment", formData, function (data) {
            // 已收藏
            if (data.length > 0) {
                getDataSource.getDataSource("cancelDingyue", formData, function (data) {
                    item.islike = 0;
                    item.docucount = item.docucount - 1;
                });
            }
            else {
                getDataSource.getDataSource("Insert_myComment", formData, function (data) {
                    item.islike = 1;
                    item.docucount = item.docucount + 1;
                });
            }
        });
    };
    $scope.Deletelike = function (item) {
        var formData = { userid: user.info_id, finfo_id: item.info_id, comtype: 3 };
        getDataSource.getDataSource("queryMyComment", formData, function (data) {
            // 已收藏
            if (data.length > 0) {
                getDataSource.getDataSource("cancelDingyue", formData, function (data) {
                    item.islike = 0;
                    item.docucount = item.docucount - 1;
                });
            }
            else {
                getDataSource.getDataSource("Insert_myComment", formData, function (data) {
                    item.islike = 1;
                    item.docucount = item.docucount + 1;
                });
            }
        });
    };

    $scope.goNewsDetail = function (item) {
        getDataSource.getDataSource(["updatePlayCount", "updateVideoPlayCount"], { info_id: item.info_id }, function (data) {
            item.playcount = item.playcount + 1;
        });
        goDetail.goNewsDetail(item);
    }
})
    // 移动教学详情页面 
.controller("ydjxDetailController", function ($scope, Restangular, $state, $rootScope, getDataSource, $stateParams, $sce, $timeout, $dateService) {
    $scope.fontSize = "1.5em";
    // 日期转换
    $scope.parseDate = function (dataString) {
        if (dataString) {
            return $dateService.parse(dataString);
        }
        else {
            return "";
        }
    }
    // 页面加载数据
    $scope.loadmeDatas = function () {

        //var zpyw = Restangular.one("../TestJSON/ydjxDetail.json");
        //zpyw.get().then(function (Data) {
        //    $scope.dataZpywSource = Data;
        //    $("#wishContent").html(Data.content);
        //});

        getDataSource.getDataSource("getNewDetail", {
            id: $stateParams.id
        }, function (data) {
            $scope.dataZpywSource = data[0];
            $scope.dataZpywSource.content = $sce.trustAsHtml(data[0].content);
            $scope.loadVideo();

            $timeout(function () {
                $("#wishContent p").attr("style", "line-height:28px;");
                $("#wishContent img").attr("style", "width:100%;");
            }, 400);
        });
    }();

    $scope.fontSizeFun = function () {
        if ($scope.fontSize == "1.9em") {
            $scope.fontSize = "1.5em";
            $("#wishContent p").attr("style", "line-height:22px;");
        }
        else if ($scope.fontSize == "1.5em") {
            $scope.fontSize = "1.7em";
            $("#wishContent p").attr("style", "line-height:28px;");
        }
        else {
            $scope.fontSize = "1.9em";
            $("#wishContent p").attr("style", "line-height:35px;");
        }
    };
    $scope.onPlayerReady = function (API) {
        $scope.API = API;
        //$timeout(function () {
        //    API.toggleFullScreen();
        //    API.play();
        //}, 1000)

    }
    $scope.loadVideo = function () {
        $scope.controller = {
        };
        $scope.controller.API = null;

        $scope.controller.config = {
            sources: [{
                src: $sce.trustAsResourceUrl($scope.AppConfig.videoPlayPath + $scope.dataZpywSource.videopath), type: "video/mp4"
            }],
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
            }
        };
    }
    $scope.goDetail = function (index, item) {
        console.log($rootScope.AppConfig.videoPlayPath + item.videopath);
        //xsf.playVideo($rootScope.AppConfig.videoPlayPath + item.videopath);
        //$scope.controller.config.sources = $scope.sources[index];
        //$scope.controller.config.tracks = undefined;
        //$scope.controller.config.loop = false;
        //$scope.controller.config.preload = true;
        //$timeout(function () {
        //    $scope.API.toggleFullScreen();
        //    $scope.API.play();
        //}, 500);

        //$scope.loadVideo(item.videopath);
        //$scope.loadVideo(item.videopath);
    }
});
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