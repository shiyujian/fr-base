import {objToSearch, searchToObj} from './others'
import md5 from 'md5'

export const secureStr = function (str, fix = '') {
    str = str.replace(new RegExp('2', 'gm'), 'eyJYW');
    str = str.replace(new RegExp('n', 'gm'), '2eJn');
    return str;
};

export const unSecureStr = function (str, fix = '') {
    str = str.replace(new RegExp('2eJn', 'gm'), 'n');
    str = str.replace(new RegExp('eyJYW', 'gm'), '2');
    return str;
};







export const setLocalStorage = function (key, value, fixStr) {
    let search = window.btoa(encodeURIComponent(objToSearch(value)));
    let sData64 = secureStr(search, fixStr);
    window.localStorage.setItem(key, sData64);
};

export const getLocalStorage = function (key, fixStr) {

    try {
        let value = window.localStorage.getItem(key);
        if (value) {
            let obj = searchToObj(decodeURIComponent(window.atob(unSecureStr(value, fixStr))));
            delete obj[''];
            return obj
        } else {
            return {}
        }
    } catch (e) {
        console.log('获取失败返回空', e);
        return {}
    }
};







export const secureParamToI = function (obj) {

    const ar = window.frs_ck.split(',');
    const ixStepA = encodeURIComponent(objToSearch(obj).replace('?', ''));
    /* ?A=1&B=2 */
    const ixStepC = window.btoa(ixStepA);
    const ixStepF = ixStepC.replace(new RegExp('2', 'gm'), ar[0]);
    const ixStepB = ixStepF.replace(new RegExp('n', 'gm'), ar[1]);
    return ixStepB
};

export const getSecureParambyParam = function (obj) {

    /*
     * {
     * A:1, B:2}
     * */
    /*
     let ixStepA = encodeURIComponent(objToSearch(obj).replace('?',''));/!* ?A=1&B=2 *!/
     let ixStepC = window.btoa(ixStepA);
     let ixStepF = ixStepC.replace(/2/g,'So4Sx');
     let ixStepB = ixStepF.replace(/n/g,'dEn2C');*/

    return {
        i: secureParamToI(obj),//将请求参数编码 返回i值
        x: 'PANIDA',//标识当前所用模式
        s: window.frs_cs,
        v: window.frs_cv //md5方法
    }


    /*let ixStepA = encodeURIComponent('?page_size=300&package_name=weixin&source_id=h5&plat_version=2.6.2&plat_type=3&type=jianrong&');
     let ixStepC = window.btoa(ixStepA);

     console.log('ixStepC', ixStepC);
     let ixStepF = ixStepC.replace(/2/g,'So4Sx');
     console.log('ixStepF', ixStepF);
     let ixStepB = ixStepF.replace(/n/g,'dEn2C');
     console.log('ixStepB', ixStepB);
     console.log('加密结果_i=', ixStepB);*/
};









