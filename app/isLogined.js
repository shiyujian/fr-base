
import startBridge from 'fr-base/script/bridge';
import {getLocalStorage} from 'fr-base/script/secure'





export const isLoginedPromiseApp = function () {
    return new Promise(function (resolve, reject) {
        startBridge('getData', {
            type:'userInfo'
        }).then((ret) => {
            if(ret.data.user_id){
                console.log('原生登录-已登录');
                resolve(ret.data);
            }else {
                console.log('原生登录-未登录');
                reject(false);
            }
        });
    })
};

export const isLoginedPromiseLocalStorage = function () {


    return new Promise(function (resolve, reject) {
        const userInfoByLogin = getLocalStorage('loginInfo');
        if(userInfoByLogin.user_id) {
            console.log('localStorage登录判定-已登录');
            resolve(userInfoByLogin)
        } else {
            console.log('localStorage登录判定-未登录');
            reject(false)
        }
    })
};
