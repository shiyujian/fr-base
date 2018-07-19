/*这个方法用来初始化一个默认的子项目，包括
 *
 * 1.rem初始化设定   rem true false
 * 2.安全加密初始化  secure: true false
 * 3.token from search 从url设置cookie  uFromSearch: true false
 * 4.默认全局变量设定 global: true false
 * 5.gsr灰度设定 grayScaleRelease: true false
 * 6.
 *
 *
 * */

import {remInit, remSet, innitSecureKey, initGrayRelease, noBfcache} from '../script/others'
import setCookieUByLocation from './setCookieUByLocation.js'

const initSettings = {
    rem: {
        init: () => {
            if (module.hot && module.hot.active) {
                remSet();
                console.log('rem..')
            } else {
                remInit();
                console.log('rem...')
            }
        }
    },

    secure: {
        init: innitSecureKey
    },


    global: {
        init: () => {

        }
    },
    uFromSearch: {
        init: setCookieUByLocation
    },

    noBfcache: {
        init : noBfcache
    },

    grayScaleRelease: {
        init: initGrayRelease
    }
};


export default function createInit(settings) {


    const arg = arguments;
/*
    [rem, secure, uFromSearch, global, grayScaleRelease]
*/
    return function () {

        Array.prototype.forEach.call(arg, (item) => {
            initSettings[item]['init']()
        });

    }

}