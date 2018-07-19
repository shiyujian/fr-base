/*
 调用方式
 import startBridge  from 'fr-base/script/bridge.js';
 startBridge('getData', {
 type: 'userInfo'
 }).then((ret) => {

 });
 */

/*ios&安卓*/


{/*<button onClick={() => {
    startBridge('getData', {
        type: 'userInfo'
    }).then((ret) => {
        alert(JSON.stringify(ret))
    })
}}>测试getData userInfo</button>
<br/>
<button onClick={() => {
    startBridge('getData', {
        type: 'device'
    }).then((ret) => {
        alert(JSON.stringify(ret))
    })
}}>测试getData device</button>
<br/>
<button onClick={() => {
    startBridge('getData', {
        type: 'version'
    }).then((ret) => {
        alert(JSON.stringify(ret))
    })
}}>测试getData version</button>
<br/>
<button onClick={() => {
    startBridge('goNative', {
        pageName: 'native://login'
    }).then((ret) => {
        alert(JSON.stringify(ret))
    })
}}>goNative native://login</button>*/}

import { isAndroid } from './others.js';

/*https://github.com/lzyzsd/JsBridge
* https://github.com/marcuswestin/WebViewJavascriptBridge
* */

let startBridge, frBridge, initBridgeReady;

if(isAndroid()) {
    /*安卓bridge方案*/
    let WebViewJavascriptBridgeNotInited = true;
    frBridge = function (api, parameter, callback) {
        try {
            /*这里有可能和其他bridge方式混用，其他地方执行window.WebViewJavascriptBridge.init()，页面就会抛错*/
            if(WebViewJavascriptBridgeNotInited) {
                window.WebViewJavascriptBridge.init();
                WebViewJavascriptBridgeNotInited = false;
            }
        }catch (e) {

        }

        window.WebViewJavascriptBridge.callHandler(api, parameter, callback);
    };
    initBridgeReady = function () {
        return new Promise(function (resolve, reject) {
            if (window.WebViewJavascriptBridge) {
                resolve();
            } else {
                document.addEventListener(
                    'WebViewJavascriptBridgeReady'
                    , function () {
                        resolve(WebViewJavascriptBridge);
                    },
                    false
                );
            }
        })
    };
   startBridge = function (api, param) {
        return new Promise(function (resolve, reject) {
            initBridgeReady().then(() => {
                frBridge(api, param, function (ret) {
                    resolve(JSON.parse(ret))
                });
            });
        })
    };
} else {
    /*ios bridge方案*/
    const setupWebViewJavascriptBridge =  (callback) => {
        if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        let WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'https://__bridge_loaded__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
    };
    frBridge = function (api, param, callBack) {
        setupWebViewJavascriptBridge(function(bridge) {
            bridge.callHandler(api, param, callBack)
        })
    };
    startBridge = function (api, param) {
        return new Promise(function (resolve, reject) {
            frBridge(api, param, function (ret) {
                resolve(JSON.parse(ret))
            });
        })
    };
}

export default startBridge





