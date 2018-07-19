let u = window.navigator.userAgent;
let ua = navigator.userAgent.toLowerCase();

export const isAndroid = function () {
    return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
};

export const isWeixin = function () {
    return ua.match(/MicroMessenger/i) == "micromessenger"
};


