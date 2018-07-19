import { isAndroid } from './others';
import { initBridgeReady, frBridge } from './frBridge';

export const BridgeLogin = function () {

    initBridgeReady().then(()=>{
        if(isAndroid()){
            frBridge('goNative', {
                pageName: 'native://LoginActivity',
            }, function (ret) {

            })
        }else{
            frBridge('goNative', {
                pageName: 'native://login',
            }, function (ret) {

            })
        }
    })

}