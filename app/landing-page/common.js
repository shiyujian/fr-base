import { checkTel } from '../../script/others';
import { createJrFetch } from '../../app/BaseFetch.js';
import openFrAlert from '../../react/FrAlert.jsx';

export const STATUS_AJAX_SUCCESS = 1;
export const CODE_AJAX_SUCCESS = 0;
export const CAPID = '593010cf1ff5453888c0cb72050cbfac';

const settings = {
    method: 'get',
    resloveFun: (ret) => {
        return ret.status === STATUS_AJAX_SUCCESS || ret.code === CODE_AJAX_SUCCESS
    },
    parsePrmFun: (prm) => {
    },
    snowmanOpen: true,
    alertOpen: true,
    secureOpen: !FR_GLOBAL_IS_DEV,
    loadingOpen: true
};

const settingsPost = {
    method: 'post',
    resloveFun: (ret) => {
        return ret.status === STATUS_AJAX_SUCCESS || ret.code === CODE_AJAX_SUCCESS
    },
    parsePrmFun: (prm) => {
    },
    snowmanOpen: true,
    alertOpen: true,
    loadingOpen: true
};

export const jrFetchGet = createJrFetch(settings);
export const jrFetchPost = createJrFetch(settingsPost);


export const paseTel = (val) => {
    return new Promise(function (resolve, reject) {
        if (checkTel(val)) {
            resolve();
        } else {
            openFrAlert('请输入正确的手机号');
        }
    })
};

export const initDun = (phone, onVerify) => {
    let that = this;
    initNECaptcha({
        captchaId: CAPID,
        element: '#captcha',
        mode: 'embed',
        width: '270px',
        onVerify: onVerify
    })
};