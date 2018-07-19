


import { getCookie, setCookie } from '../script/frCookie.js';



const fixCookieForIos = function () {
    if(!getCookie('u')) {
        setCookie('u', window.localStorage.getItem('token'))
    }
    return false
};