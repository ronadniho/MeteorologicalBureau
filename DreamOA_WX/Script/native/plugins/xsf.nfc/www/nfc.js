cordova.define("xsf.nfc", function(require, exports, module) {
	function onSucceed(args){
		//alert("succeed:" + args);
	}
	function onError(err){
		//alert("error:" + err);
	}
	function call(callee,args,succeedCallback,errorCallback){
		onSucceed = succeedCallback || onSucceed;
        onError = errorCallback || onError;
		exec(onSucceed,onError, "NFCPlugin", callee,args);
	}
	var exec = require('cordova/exec');
	module.exports = {
		start : function(onSucceed,onError){
			call('start',[],onSucceed,onError);
        },close : function(onSucceed,onError){
            call('close',[],onSucceed,onError);
        }
	};

});
