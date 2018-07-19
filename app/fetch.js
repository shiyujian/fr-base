/*请求*/

import {createJrFetch} from 'fr-base/app/BaseFetch.js';
import {toLogin} from 'fr-base/script/frBridge.js'


export const STATUS_AJAX_SUCCESS = 1;
export const CODE_AJAX_SUCCESS = 0;

export const parsePrm = function (prm) {

};
const settings = {
    method: 'get',
    resloveFun: (ret) => {
        return ret.status === STATUS_AJAX_SUCCESS || ret.code === CODE_AJAX_SUCCESS
    },
    parsePrmFun: parsePrm,
    snowmanOpen: true,
    alertOpen: true,
    loadingOpen: true
};
const settingsPost = {
    method: 'post',
    resloveFun: (ret) => {
        return ret.status === STATUS_AJAX_SUCCESS || ret.code === CODE_AJAX_SUCCESS
    },
    parsePrmFun: parsePrm,
    snowmanOpen: true,
    alertOpen: true,
    loadingOpen: true
};
export const jrFetchGet = createJrFetch(settings);
export const jrFetchPost = createJrFetch(settingsPost);
export const jrFetchGetBase = createJrFetch({
    method: 'get',
    resloveFun: (ret) => {
        return true
    },
    parsePrmFun: parsePrm,
    snowmanOpen: true,
    alertOpen: false,
    loadingOpen: false
});
