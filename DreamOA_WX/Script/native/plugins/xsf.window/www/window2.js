var __ret = {};
function doChildViewDidUnload(){
    if(typeof(__ret.onExit) == "function"){
        __ret.onExit();
    }
}
cordova.define("xsf.window", function(require, exports, module) {
	function onSucceed(args){
		//alert("succeed:" + args);
	}
	function onError(err){
		//alert("error:" + err);
	}
	function call(callee,args,callback){
		callback = callback || onSucceed;
		exec(callback,onError, "WindowPlugin", callee,args);
	}
	var exec = require('cordova/exec');
	module.exports = {
		open : function(url,title){
			if(url.indexOf(":")<0){
				var href = window.location.href;
				var p = href.lastIndexOf("/");
				if(p > 0){
					url = href.substring(0,p+1) + url;
				}
			}
			//alert(url);
			call('open',[url,title]);
            return __ret;
            //return window.open(url, '_blank', 'location=no,closebuttoncaption=关闭');
		},
        showTab : function(json,callback){
            showTab('showTab',[json],callback);
        },
        close : function(n,callback){
            call('close',n?[n]:[],callback);
        },
        rotation : function(n,callback){
            call('rotation',[],callback);
        },
        resetRotation : function(n,callback){
            call('resetRotation',[],callback);
        },
        zoom : function(isZoom,callback){
            call('zoom',[isZoom],callback);
        }
               
	};

});
