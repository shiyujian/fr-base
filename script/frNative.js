import { isAndroid } from './others';
import { initBridgeReady, frBridge, frBridgePromise } from './frBridge'

/*判断是否登录(使用getAppUserInfo判断)*/


/*去登录*/
export const appLogin = function () {

    initBridgeReady().then(()=>{
        frBridge('goNative', {
            pageName: isAndroid() ? 'native://LoginActivity' : 'native://login',
        }, function (ret) {})

    })

}

/*跳转到客服页*/
export const appKefu = function () {

    initBridgeReady().then(()=>{
        frBridge('goNative', {
            pageName: 'native://kefuChat',
        }, function (ret) {})
    })

}


/*跳转指定页面*/
export const goNative = function (pageNameAndroid, pageNameIos) {
    /*pageNameAndroid安卓页面地址, pageNameIos IOS页面地址*/
    initBridgeReady().then(() => {
        frBridge('goNative', {
            pageName: isAndroid() ? pageNameAndroid : pageNameIos,
        }, function (ret) {

        })
    });
};
/*关闭webview*/
export const closeAppWebView = function () {
    frBridge('closeWebView', {}, function (ret) {});
}


/*获取版本*/
export const getAppVersion = function () {
    return new Promise(function (resolve, reject) {
        initBridgeReady().then(() => {
            frBridge('getData', {
                type:'version'
            }, function (ret) {
                resolve(JSON.parse(ret))
            })
        })
    })

}

/*获取用户信息*/
export const getAppUserInfo = function () {
    return new Promise(function (resolve, reject) {
        initBridgeReady().then(() => {
            frBridge('getData', {
                type:'userInfo'
            }, function (ret) {
                if(JSON.parse(ret).data.user_id){
                    resolve(JSON.parse(ret))
                }else {
                    reject(JSON.parse(ret));
                }
            })

        })
    })
}

/*获取设备信息*/
export const getDeviceInfo = function () {
    return new Promise(function (resolve,reject) {
        initBridgeReady().then(()=>{
            frBridge('getData',{
                type: 'device'
            }, function (ret) {
                resolve(JSON.parse(ret))
            })
        })
    })
}

/*分享*/
export const shareWeb = function (title, url, desc, urlPic ) {
    /*title标题, url链接, desc描述文字, urlPic图片（图标）链接*/
    if(isAndroid()) {
        window.onCallByH5.shareView(title, desc, url, urlPic);
    } else {
        window.webkit.messageHandlers.NativeMethod.postMessage({
            nativeKey: 'shard',
            shardPicture: urlPic,
            shardTitle: title,
            shardDescribe: desc,
            shardURL: url
        });
    }
};

export const copyText = function(text) {
    if (isAndroid()) {
        window.onCallByH5.copyText(text);
    } else {
        frBridge('copyToClipboard', {
            clipboard: text
        }, function (ret) {
            
        })
    }
};

export const openWechat = function() {
    if (isAndroid()) {
        window.onCallByH5.openWeixin();
    } else {
        frBridge('openWechat', {

        }, function (ret) {
            
        })
    }
};

export const creditApply = function(code) {
    frBridge('getCreditApplyJS',{
        type: code
    }, function (ret) {

    })
}