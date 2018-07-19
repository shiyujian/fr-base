
import {jrFetchGet, jrFetchGetBase} from './fetch.js'


import { initBridgeReady, frBridge, frBridgePromise, toLogin } from 'fr-base/script/frBridge';
import {getLocalStorage} from 'fr-base/script/secure'
import {isAndroid, checkTel} from 'fr-base/script/others';

/*在app里面获取当前信息*/



const createGetEnvByApp = function () {
  let hasInit = false, info = {};
  return function () {
      if(hasInit) {
          return new Promise(function (resolve) {
              resolve(info);
          })
      }
      return new Promise(function (resolve, reject) {
          /*device*/
          initBridgeReady().then(() => {
              frBridge('getData', {
                  type:'device'
              }, function (res) {
                  const device = JSON.parse(res);
                  const { package_name, source_id, channel_id} = device.data;
                  frBridge('getData', {
                      type:'userInfo'
                  }, function (ret) {
                      const userInfo = JSON.parse(ret);

                      if(userInfo.data && userInfo.data.user_id) {
                            /*已经登录的状态,  获取这个用户的channel_id*/
                          jrFetchGetBase('/ng-qianba/user/getChannelData', {
                              user_id: userInfo.data.user_id,
                              package_name: package_name,
                              source_id: source_id
                          }).then((retu) => {
                              hasInit = true;
                              info = {
                                  appDevice: device.data,
                                  system: isAndroid() ? 'Android' : 'iOS',
                                  channel_id: retu.data.channel_id || '',
                                  source_id: source_id,
                                  package_name: package_name,
                                  type: window.FR_GLOBAL_TYPE,
                                  user_id: userInfo.data.user_id,
                              };
                              resolve(info);
                          });
                      } else {
                          /*未登录 不请求接口, hasInit 还是false*/
                          resolve({
                              appDevice: device.data,
                              system: isAndroid() ? 'Android' : 'iOS',
                              channel_id: '',
                              source_id: source_id,
                              package_name: package_name,
                              type: window.FR_GLOBAL_TYPE,
                              user_id: '',
                          });
                      }
                  })
              })
          })
      })
  }
};


export const getEnvByApp = createGetEnvByApp();




/*从localStorage里面获取当前信息*/


const createGetEnvByLocalStorage = function () {
    let hasInit = false, info = {};



    return function () {

        if(hasInit) {
            return new Promise(function (resolve) {
                resolve(info);
            })
        }

        return new Promise(function (resolve, reject) {
            const userInfoByLogin = getLocalStorage('loginInfo');
            const { package_name, source_id, plat_version, app_name, channel_id, user_id, token } = userInfoByLogin;
            if(user_id) {
                hasInit = true;
            }

            info = {
                appDevice: {},
                system: isAndroid() ? 'Android' : 'iOS',
                channel_id: channel_id || '',
                source_id: source_id || '',
                package_name: package_name || '',
                plat_version: plat_version || '',
                app_name: app_name || '',
                type: window.FR_GLOBAL_TYPE,
                user_id: user_id || ''
            };
            resolve(info)
        })
    }
};

export const getEnvByLocalStorage = createGetEnvByLocalStorage();