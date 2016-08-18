/**
 * 下载状态值
 */
var DownloadState = {
	EXIST : -3, // 已存在，显示“打开”
	UPDATE : -2, // 需要更新，显示“更新”
	NOT_DOWN : -1, // 未下载，显示“下载”
	LOADDING : 0, // 下载中，显示“暂停”
	PAUSE : 1, // 暂停，显示“继续”
	FINISH : 2, // 下载完成，显示“安装”
	FAILURE : 3, // 下载失败，显示“重试”
	WAITTING : 4, // 等待中，显示“等待”
	REQ : 5 // 请求中，显示“等待”
};

var browser = {
	versions : function() {
		var u = navigator.userAgent;// , app = navigator.appVersion;
		return {// 移动终端浏览器版本信息
			trident : u.indexOf('Trident') > -1, // IE内核
			presto : u.indexOf('Presto') > -1, // opera内核
			webKit : u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
			gecko : u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
			mobile : !!u.match(/AppleWebKit.*Mobile.*/)
					|| !!u.match(/AppleWebKit/), // 是否为移动终端
			ios : !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
			android : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
			iPhone : u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, // 是否为iPhone或者QQHD浏览器
			iPad : u.indexOf('iPad') > -1, // 是否iPad
			webApp : u.indexOf('Safari') == -1
		// 是否web应该程序，没有头部与底部
		};
	}(),
	language : (navigator.browserLanguage || navigator.language).toLowerCase()
};

/**
 * 判断是否在随手玩APP中
 * @returns {Boolean}
 */
function isInApp() {
	var ua = navigator.userAgent.toLowerCase();
	return ua.indexOf("xhmarket") >= 0;
}
/**
 * 获取平台名
 * @returns {String}
 */
function getPlatform() {
	if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
		return "ios";
	} else if (browser.versions.android) {
		return "android";
	} else {
		return "other";
	}
}

/**
 * 是否是安卓平台
 * @returns {Boolean}
 */
function isAndroid() {
	var ua = navigator.userAgent.toLowerCase();
	var isA = ua.indexOf("android") > -1;
	if (isA) {
		return true;
	}
	return false;
}

/**
 * 是否是iphone
 * @returns {Boolean}
 */
function isIphone() {
	var ua = navigator.userAgent.toLowerCase();
	var isIph = ua.indexOf("iphone") > -1;
	if (isIph) {
		return true;
	}
	return false;
}

/**
 * 判断是否在微信中
 * 
 * @returns {Boolean}
 */
function is_weixn() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	} else {
		return false;
	}
}

/**
 * 判断是否在手机QQ中
 * 
 * @returns {Boolean}
 */
function is_mobileQQ() {
	var ua = navigator.userAgent.toLowerCase();
	// && /iphone/i.test(ua) == false
	if (ua.match(/\sQQ/i) == " qq") {// " qq" 这里空格不能去掉
		return true;
	} else {
		return false;
	}
}

/**
 * 是否是空字符串
 * 
 * @param obj
 * @returns {Boolean}
 */
function isEmpty(obj) {
	if (obj == undefined || obj == null || obj == "") {
		return true;
	} else {
		return false;
	}
}

function isNotEmpty(obj) {
	return !isEmpty(obj);
}

/**
 * 是否是空字符串
 * 
 * @param obj
 * @returns {Boolean}
 */
function isNull(obj) {
	if (obj == undefined || obj == null) {
		return true;
	} else {
		return false;
	}
}

function isNotNull(obj) {
	return !isNull(obj);
}
	//======================================================================
//========================以下是H5页面调用APP方法========================
//======================================================================
/**
 * 关闭当前webview页面
 */
function finishActivity() {
	window.WebViewJavascriptBridge.callHandler('finishActivity', {}, null);
}

/**
 * 得到版本值
 * 
 * @param callback(versionCode)
 */
function getVersionCode(callback) {
	window.WebViewJavascriptBridge.callHandler('getVersionCode', {}, 
		function(versionCode) {
			if (isNotEmpty(callback)) {
				callback(parseInt(versionCode));
			}
		}
	);
}

/**
 * 得到版本名
 * 
 * @param callback(versionName)
 */
function getVersionName(callback) {
	window.WebViewJavascriptBridge.callHandler('getVersionName', {}, 
		function(versionName) {
			if (isNotEmpty(callback)) {
				callback(versionName);
			}
		}
	);
}

/**
 * 检查更新
 */
function checkUpdate(callback) {
	window.WebViewJavascriptBridge.callHandler('checkUpdate', {}, 
		function(needUpdate) {
			if (needUpdate == "true") {
				callback(true);
			} else {
				callback(false);
			}
		}
	);
}

/**
 * 应用或集合详情页
 * 
 * 必传字段
 * 
 * @param id
 * @param typeRes
 *            0：集合，1：应用
 * @param typeInside
 */
function goResDetailActivity(resInfo) {
	window.WebViewJavascriptBridge.callHandler('goResDetailActivity', resInfo, 
		function(text) {
			if (isNotEmpty(text)) {
				alert(text);
			}
		}
	);
}

/**
 * 下载按钮相关操作
 * 
 * @param resId
 */
function onOperationBtn(resInfo) {
	window.WebViewJavascriptBridge.callHandler('onOperationBtn', resInfo, null);
}

/**
 * 检查状态
 * 
 * @param resInfo
 */
function checkAppState(resInfo, callback) {
	window.WebViewJavascriptBridge.callHandler('checkAppState', resInfo,
		function(data) {
			var appStateInfo = JSON.parse(data + "");
			if (isNotEmpty(callback)) {
				callback(appStateInfo);
			}
			onUpdateAppState(appStateInfo);
		}
	);
}
/**
 * 显示Toast
 * 
 * @param message
 */
function showToast(message) {
	window.WebViewJavascriptBridge.callHandler('showToast', message, null);
}
/**
 * 得到渠道号
 * 
 * @param callback(channelCode)
 */
function getChannelCode(callback) {
	window.WebViewJavascriptBridge.callHandler('getChannelCode', {}, callback);
}
// ======================================================================
// END=====================以上是H5页面调用APP方法========================
// ======================================================================

/**
 * 桥接成功
 * 
 * @param callback
 */
function connectWebViewJavascriptBridge(callback) {
	if (window.WebViewJavascriptBridge) {
		callback(WebViewJavascriptBridge);
	} else {
		document.addEventListener('WebViewJavascriptBridgeReady', function() {
			callback(WebViewJavascriptBridge);
		}, false);
	}
}

/**
 * 初始化方法
 */
function initBridge() {
	if (isInApp()) {
		getVersionCode(function(versionCode) {
			onBridgeReady(versionCode);
		});
	}else{
		onBridgeFailure();
	}
}
window.onload = initBridge; 

/**
 * 桥接，注册js方法共app调用
 */
connectWebViewJavascriptBridge(function(bridge) {
	bridge.init(function(message, responseCallback) {
		console.log('JS got a message', message);
		var data = {
			'Javascript Responds' : 'Wee!'
		};
		console.log('JS responding with', data);
		responseCallback(data);
	});
	
	// ======================================================================
	// =================以下是注册本地方法提供给APP调用========================
	// ======================================================================

	bridge.registerHandler("updateAppState", function(data, responseCallback) {
		var appStateInfo = JSON.parse(data + "");
		onUpdateAppState(appStateInfo);
	});
	// ======================================================================
	// END==============以上是注册本地方法提供给APP调用========================
	// ======================================================================
});
	function onBridgeFailure() {
		var error="不在APP中";
		if(isAndroid()||isIphone()){
			if (!isAndroid()) {
				error+=",不在Android手机中";
			}
			if (is_weixn()) {
				error+=",在微信中";
			} else if (is_mobileQQ()) {
				error+=",在QQ中";
			} else{
				error+=",在其他应用浏览器中";
			}
		}else{
			error+=",不在手机中";
		}
		alert(error);
	}
	
	// 需要实现
	function onBridgeReady(versionCode) {
		// 初始化状态
		checkAppState(testResInfo1);
		checkAppState(testResInfo2);
	}
	
	// 需要实现
	function onUpdateAppState(appStateInfo) {
		var btns = document.getElementsByName(appStateInfo.packageName);
		if(appStateInfo.state == DownloadState.LOADDING){
			appStateInfo.stateText = appStateInfo.percent+"%";
		}
		for (var i = 0; i < btns.length; i++) {
			btns[i].value = appStateInfo.stateText;
		}
	}