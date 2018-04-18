/**重要说明:项目配置请不要修改public.js，请修改config.js**/
/*******************************************************/
/**全局变量**/
var dotNet = false; //后台是否是.NET
var rootURL = ""; //服务器根路径，结尾不带"/"
var isNative = false; //本地模式，此属性仅供测试
var appVersion = 0.3;
localStorage.domain = "";
/*******************************************************/
/**config*/
rootURL = window.location.protocol +"//" + window.location.host;
console.log("rootURL=" + rootURL);
/*******************************************************/
/**全局配置**/
var baseURL = rootURL + "/ezweb";
var FLOW_URL = rootURL + "/DsoaMobile";

var localVer = localStorage.version || 0;
if(appVersion > localVer){
    localStorage.userid = "";
}
/*******************************************************/
/**默认配置**/
/*公用配置*/
var CommonConstants = {
    /**以下为配置*/
    PROJECT: "",
    LOGO_IMG: "../images/logo_syc.png",
    DEFAULT_USER_ICON: "../images/user_default_icon.png", //"modules/mobile/resources/image/MobileOffice_Slice_r16_c1.png";
    XFORM_TIMEOUT: 15000, //表单超时时间15秒去掉loading
    NEW_FILE_SIGN: "[新]", //新代办文件标识

    /**以下为常量*/
    MODULE_PREFIX: "module:",
    MODULE_ARGUMENTS: "ARGUMENTS",
    ARGUMENTS_EXSITFILE: "ARGUMENTS_EXSITFILE",
    ARGUMENTS_TODO: "ARGUMENTS_TODO",

    ZWJST_READ_TYPE: "1", //内蒙古政务即时通  1：已阅文件
    ZWJST_UNREAD_TYPE: "0", //内蒙古政务即时通  0：待阅文件

    AUTH_TYPE_TOKEN: "TOKEN", //国泰基金:门户跳转TOKEN认证
    AUTH_TYPE_LDAP: "LDAP", //国泰基金:LDAP认证

    /**1：修改密码然后在登录*/
    ZWJST_TYPE_PWDLOGIN: "1",
    ZWJST_TYPE_PWD: "0",


    RIGHT_MENU_HISTORY: "1",
    RIGHT_MENU_FILESEARCH: "0",

    /** 关联文件需要显示的类别 ('发文','收文','内部签报')*/
    RELATION_FILE : ["691799","394356","148952"],

    /** 请假模块id */
    MODULE_ID_LEAVE: 358910
};

/*项目开关*/
var Project = {
    PROJECT_DEFAULT: "DEFAULT", //默认项目模板
    PROJECT_TEMPLATE_DOT_NET: "", //.NET项目模板
    PROJECT_TEMPLATE_JAVA: "", //JAVA项目模板
    PROJECT_DEMO: "DEMO", //演示
    PROJECT_TEST_ZHANGX: "TEST_ZHANGX", //zhangx
    PROJECT_TEST_ZHENGY: "TEST_ZHENGY", //zhengY
    PROJECT_TEST_CHENB: "TEST_CHENB", //chenb
    PROJECT_TEST: "TEST", //测试
    PROJECT_SHJ: "SHJ", //2015-08-15: 中交三航局
    PROJECT_GTJJ: "GTJJ", //2015-10-14: 国泰金基
    PROJECT_XHYY: "XHYY", //2015-11-27: 新华医院
    PROJECT_DREAMSOFT: "DREAMSOFT", //2016-01-08: dreamsoft		
    PROJECT_NMG_BGT_ZWJST: "NMG_BGT_ZWJST" //2016-02-19: 内蒙古办公厅政务即时通
};

/*功能开关*/
var Feature = {
    FEATURE_REVIEW_ISYW: false, //.NET待阅文件表单是否显示阅文单，2015-08-15，新的.NET项目应打开此开关
    FEATURE_CANCEL_OPINION: true, //去掉待办意见栏
    FEATURE_TODO_LIST_NO_OPINION: true, //功能开关:待办意见栏 (发送，关注,意见等按钮栏 )
    FEATURE_NEW_FILE: true, //新建文件(文件起草)
    FEATURE_MANUAL_REVIEWED: true, //手动阅毕
    FEATURE_ITEM_HIGHLIGHT: false, //整个item点击高亮开关
    FEATURE_NEW_FILE_SIGN: false, //新代办文件标识
    FEATURE_CHANGE_PASSWORD_FIRST: false, //功能开关:第一次登录成功，强制修改密码 : 后台需开启"LOGIN_EXTRA_USERINFO"功能
    FEATURE_FORGOT_PASSWOR: true, //功能开关:忘记密码
    FEATURE_BREAD_CRUMB_CONTACTS: false, //面包屑通讯录	
    FEATURE_BREAD_CRUMB_FLOW: false, //功能开关:流程面包屑
    FEATURE_WECHAT_LOGIN : false //微信账号绑定登录功能
};
/*******************************************************/
/**全局函数**/
/**
 * ASF - Utils
 */
(function(window) {
    "use strict";

    var Utils = {};
    /**
     * 解析JSON。
     * 在JSON.parse()基础上加上try catch。
     */
    Utils.parseJSON = function(jsonString) {
        var resultObj = null;
        try {
            resultObj = JSON.parse(jsonString);
        } catch (e) {
            //alert(jsonString);
            console.error("Error parsing JSON:" + e);
        }
        return resultObj;
    };

    /**
     * 将查询字符串转换为Object
     * @param queryString "a1=v1&a2=&a3=a3";// test only
     */
    Utils.getQueryString = function(queryString) {
        var result = {};
        if (queryString) {
            var pairs = queryString.split("&");
            for (var i = 0; pairs && i < pairs.length; i++) {
                var pair = pairs[i];
                var pos = pair.indexOf('=');
                if (pos == -1) continue;
                var key = pair.substring(0, pos);
                var value = pair.substring(pos + 1);
                value = decodeURIComponent(value); // 若需要，则解码
                result[key] = value;
            }
        }
        return result;
    };

    // exports:
    window.ASF = window.ASF || {};
    window.ASF.Utils = window.ASF.Utils || Utils;
    //alias
    window.$a = window.ASF;
})(window);

var pageSize = 20;
//$.ajax = xsfHttp.ajax;//调用壳的保存
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}

function replaceTextarea(str) {
    var reg = new RegExp("\n", "g");
    var reg1 = new RegExp(" ", "g");

    str = str.replace(reg, "<br/>");
    str = str.replace(reg1, "<p>");

    return str;
}

String.prototype.startsWith = function(str) {
    var reg = new RegExp("^" + str);
    return reg.test(this);
}

String.prototype.endsWith = function(str) {
        var reg = new RegExp(str + "$");
        return reg.test(this);
    }
    /*******************************************************/
    /**测试模式**/
function setTestMode(state, disableMessage) {
    var tempState = false;
    var msg = "";
    if (state) {
        localStorage.testMode = true;
        msg = "已开启测试模式";
    } else {
        localStorage.removeItem("testMode");
        msg = "已关闭测试模式";
    }

    if (!disableMessage) {
        alert(msg);
    }
}

function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}
/*******************************************************/

/**右侧菜单配置**/
var MENU_ARRAY = ["myFavorite", "history", "entrustedit", "fileTraces", "fileRecycle", "fileDelay", "exsitFile", "pwdedit", "fileSearch", "fileDraft"];
var MENU_ALLARRAY = [{
    name: "我的关注",
    action: "myFavorite",
    icon: "user_file_focus.png"
}, {
    name: "历史记录",
    action: "history",
    icon: "user_file_history.png"
}, {
    name: "委托代办",
    action: "entrustedit",
    icon: "user_file_delegate.png"
}, {
    name: "代办跟踪",
    action: "fileTraces",
    icon: "user_file_trace.png"
}, {
    name: "文件回收",
    action: "fileRecycle",
    icon: "user_file_recycle.png"
}, {
    name: "缓办事项",
    action: "fileDelay",
    icon: "user_file_delay.png"
}, {
    name: "流程监控",
    action: "exsitFile",
    icon: "user_file_created.png"
}, {
    name: "修改密码",
    action: "pwdedit",
    icon: "user_file_created.png"
}, {
    name: "文件检索",
    action: "fileSearch",
    icon: "user_file_history.png"
}, {
    name: "文件起草",
    action: "fileDraft",
    icon: "user_file_created.png"
}, {
    name: "退出账户",
    action: "doLogout",
    icon: "user_file_delay.png"
}, {
    name: "帮助文档",
    action: "documentList",
    icon: "user_file_trace.png"
}, {
    name: "拟稿列表",
    action: "draftFileList",
    icon: "user_file_history.png"
}];

/*******************************************************/
/**项目功能配置:config*/
Feature.FEATURE_BREAD_CRUMB_FLOW = true;
Feature.FEATURE_WECHAT_LOGIN = true;

/*******************************************************/