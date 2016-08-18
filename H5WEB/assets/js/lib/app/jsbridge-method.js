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
