/*js cookie操作*/

export const setCookie  = function(c_name, value, expiredays) {
    /*设置cookie 名称 值 过期时间*/
    let exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + (!(expiredays) ? "" : ";expires=" + exdate.toGMTString())
};
export const getCookie = function(c_name) {
    /*读cookie 名称*/
    if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(c_name + "=");
        if (c_start!== -1) {
            c_start = c_start + c_name.length + 1;
            let c_end=document.cookie.indexOf(";", c_start);
            if (c_end === -1) c_end=document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
    return ""
};

export const clearAllCookie = function () {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if(keys) {
        for(var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
}