import {isAndroid} from './others'
const iosPost =  (msg) => {
    try {
        window.webkit.messageHandlers.NativeMethod.postMessage(msg);
    }catch (e) {
        console.log(e)
    }
};

export const toLogin = () => {
    iosPost('jump_login');
    try  {
        window.onCallByH5.startActivity('LoginActivity');
    }catch (e) {
        console.log(e)
    }

};

export const toHelp = () => {
    /*咨询客服*/
    iosPost('jump_server');
    try {
        window.onCallByH5.customeSerive();
    }catch (e) {
        console.log(e)
    }
};

export const toMain = () => {
    /*去申请页面*/
    iosPost('jump_jianrong');
    try {
        window.onCallByH5.startMainActivity();
    }catch (e) {
        console.log(e)
    }
};


export const closeWebview = () => {
    /*关闭webview*/
    iosPost('close');
    try {
        window.onCallByH5.close();
    }catch (e) {
        console.log(e)
    }
};


export const initBridgeReady = () => {

    /*场景：一开始进来就请求*/

    const callback = function (bridge) {
        bridge.init(function (message, responseCallback) {
            responseCallback({});
        });
    };


    return new Promise(function (resolve, reject) {
        if(window.frGlobalBridgeInited) {
            resolve();
        }
        if (window.WebViewJavascriptBridge) {
            window.frGlobalBridgeInited = true;
            callback(WebViewJavascriptBridge);
            resolve();
        } else {
            if(!isAndroid()) {
                window.frGlobalBridgeInited = true;
                resolve();
            }
            document.addEventListener(
                'WebViewJavascriptBridgeReady'
                , function () {
                    window.frGlobalBridgeInited = true;
                    try{
                        callback(WebViewJavascriptBridge);
                    }catch (e) {

                    }
                    resolve();
                },
                false
            );
        }
    });

};

export const initBridge = () => {
    let connectWebViewJavascriptBridge = function(callback) {
        if (window.WebViewJavascriptBridge) {
            window.frGlobalBridgeInited = true;
            callback(WebViewJavascriptBridge)
        } else {

            if(!isAndroid()) {
                window.frGlobalBridgeInited = true;
            }

            document.addEventListener(
                'WebViewJavascriptBridgeReady'
                , function () {
                    window.frGlobalBridgeInited = true;
                    callback(WebViewJavascriptBridge)
                },
                false
            );
        }
    };

    /*
     * native://login
     native://myQuota
     native://confirmIdentity
     native://verifyCreditCard
     native://verifyProvidentFund
     native://productDetails
     native://myMessage*/
    //注册回调函数，第一次连接时调用 初始化函数
    connectWebViewJavascriptBridge(function (bridge) {
        //初始化
        bridge.init(function (message, responseCallback) {
            var data = {
                'Javascript Responds': 'Wee!'
            };
            responseCallback(data);
        });
    });

};



const setupWebViewJavascriptBridge = function (callback) {
    if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function () {
        document.documentElement.removeChild(WVJBIframe)
    }, 0)
};


export const frBridge = function (api, parameter, callback) {


    /*
     *  api: 接口名称
     *  parameter: 参数
     *  callBack: 回调函数
     * */

    setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler(api, parameter, callback)
    });
};
export const frBridgePromise = function (api, parameter, callback) {

    return new Promise(function (resolve, reject) {
        frBridge(api, parameter, function (ret) {
            resolve(JSON.parse(ret))
        })
    })

};


