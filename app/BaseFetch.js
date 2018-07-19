import Container from './Container.jsx';
import {addErrorLog} from '../script/frLog';
import {fetchGet, fetchPost} from '../script/frFetch';
import { objToSearch } from '../script/others';
import { getCookie } from '../script/frCookie.js';
import openFrAlert from '../react/FrAlert.jsx'
import { getSecureParambyParam } from '../script/secure.js'
let stateAllfetchArr = [];

export const changeGlobalFetchState = () => {
    if (stateAllfetchArr.length > 0) {
        Container.getSetLoadiingFunc(true);
    } else {
        Container.getSetLoadiingFunc(false);
    }
};

const updateFetchState = (state) => {
    state ? stateAllfetchArr.push(1) : stateAllfetchArr.pop();
    changeGlobalFetchState();
};





export const createJrFetch = function (settings) {
    const { method, resloveFun, parsePrmFun, snowmanOpen, alertOpen, loadingOpen, secureOpen, snowmanPrmString } = settings;


    /*
    *
    * method get/post, resloveFun 根据传入的ret给出何时进行reslove, parsePrmFun参数过滤或者加一些参数 不需要return,
     *
     * snowmanOpen开启监控, alertOpen开启错误弹窗提示, loadingOpen执行请求时页面显示loading动画
    * */

    return function (jrApi, fetchPrm) {
        return new Promise(function (resolve, reject) {
            loadingOpen && updateFetchState(true);
            const fetchMethod = method === 'post' ? fetchPost : fetchGet;
            parsePrmFun && parsePrmFun(fetchPrm);


            if(secureOpen && fetchPrm && objToSearch(fetchPrm).length < 200) {
                fetchPrm = getSecureParambyParam(fetchPrm)
            }


            let timeTag = new Date();

            fetchMethod(jrApi, fetchPrm, function (ret, url) {
                loadingOpen && updateFetchState(false);
                if(resloveFun(ret)) {
                    resolve(ret);
                } else {
                    const retMessage = ret ? ret.message : '未知错误';
                    alertOpen && openFrAlert(retMessage);
                    const { pathname, search, hash } = window.location;
                    snowmanOpen ? addErrorLog('h5_snowman', {
                        error_type: 'error-fetch',
                        error_name: retMessage,
                        http_delay: (Date.now() - timeTag),
                        url_location: pathname + search + hash + (snowmanPrmString || ''),
                        project_name: '-',
                        url_fetch: url
                    }) : '';
                    reject();
                }
            }, function (res, url, error_name) {

                loadingOpen && updateFetchState(false);
                if(navigator.onLine || (navigator.onLine === undefined)) {
                    const { pathname, search, hash } = window.location;
                    snowmanOpen && addErrorLog('h5_snowman', {
                        error_type: 'error-http',
                        error_name: error_name,
                        http_delay: (Date.now() - timeTag),
                        url_location: pathname + search + hash + (snowmanPrmString || ''),
                        project_name: '-',
                        url_fetch: url
                    });
                    alertOpen && openFrAlert(res.slice(0, 30));
                } else {
                    alertOpen && openFrAlert('断网了,请检查网络连接');
                }
                reject();
            })

        })
    }
};












