// 其他的脚本
import md5 from 'md5'
import { resolve } from 'path';

const getZoomRatio = () => {
    let doc = document, user_webset_font = 16;

    try {
        if(doc.documentElement.currentStyle) {
            user_webset_font = doc.documentElement.currentStyle['fontSize'];
        } else {
            user_webset_font = getComputedStyle(doc.documentElement,false)['fontSize'];
        }
    }catch (e) {
        console.log(e)
    }

    return 16/parseFloat(user_webset_font)
    //return 1

};


export const remSet = () => {
    let docEl = document.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    const zoomRatio = getZoomRatio();

    let recalc = () => {
        let clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = zoomRatio * 20 * (clientWidth / 375) + 'px';  /*计算出来的结果表示 1rem等于20px*/
    };
    if (!document.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    document.addEventListener('DOMContentLoaded', recalc, false);
};

export const remInit = () => {
    /*根据高清方案设置的rem*/
    console.log('redd');
    const zoomRatio = getZoomRatio();
    let dpr, rem, scale;
    const docEl = document.documentElement;
    const fontEl = document.createElement('style');
    const metaEl = document.querySelector('meta[name="viewport"]');
    const clWidth = docEl.clientWidth || document.body.clientWidth;

    dpr = window.devicePixelRatio || 1;

    /* docEl.style.fontSize = 20 * (clientWidth / 375) + 'px'*/

    rem = zoomRatio * clWidth * dpr * 20 / 375;

    scale = 1 / dpr;


// 设置viewport，进行缩放，达到高清效果
    metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');

// 设置data-dpr属性，留作的css hack之用
    docEl.setAttribute('data-dpr', dpr);

// 动态写入样式
    docEl.firstElementChild.appendChild(fontEl);
    fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';
};




export const searchToObj = (url) => {
    /*这个方法将"?letter=2&opp=23"这种string转换为JS对象形式，方便获取URL的参数*/
    let theRequest = {};
    if (url.indexOf("?") !== -1) {
        let str = url.substr(1);
        let strs = str.split("&");
        for(let i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]= decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest;
};

export const objToSearch = function (obj) {
    // 将对象 {a:1,b:2} 转为查询字符串
    let newSearch = '?';

    for (let item in obj) {
        newSearch = `${newSearch}${item}=${obj[item]}&`
    }
    return newSearch
};

export const checkTel = (tel) => {
    //以13等开头9位，  以0554-4418039
    let mobile = /^1[3|5|4|6|8|7|9|]\d{9}$/ , phone = /^0\d{2,3}-?\d{7,8}$/;
    return mobile.test(tel) || phone.test(tel);
};


export let isAndroid = () => {


    //判断终端类型
    let u = navigator.userAgent;
    let val =  u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    isAndroid = function () {
        return val
    };

    return val; //android终端




};
export const isIphoneX = () => {
    return /iphone/gi.test(navigator.userAgent) && (window.screen.height === 812 && window.screen.width === 375)
};

export const isApp = function () {
    //判断是否在App中打开
    let str = window.navigator.userAgent;
    return str.indexOf('fengrong') > -1;
}

export const parseUndefined = (obj) => {
    for (let item in obj) {
        obj[item] = obj[item] === undefined ? '' : obj[item]
    }

};

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



export const compress = (source_img_obj, quality, output_format) => {
    let mime_type = "image/jpeg";

    if (output_format != undefined && output_format == "png") {
        mime_type = "image/png";
    }

    let cvs = document.createElement('canvas');

    console.log('图片');
    console.log(source_img_obj.width);
    console.log(source_img_obj.height);

    cvs.width = source_img_obj.width;
    cvs.height = source_img_obj.height;

    let calQuality = 300 / cvs.width;

    let ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0);

    /*这里用的calQuality*/

    let newImageData = cvs.toDataURL(mime_type, calQuality);

    let result_image_obj = new Image();
    result_image_obj.src = newImageData;
    console.log('压缩成功');

    return {
        result_image_obj: result_image_obj,
        newImageData: newImageData
    };
};



export const insertScript = function (scriptSrc) {
    let docHeader = document.getElementsByTagName('head')[0],
        logScript = document.createElement('script');
    logScript.src = scriptSrc;
    docHeader && docHeader.insertBefore(logScript, docHeader.firstChild)
};


export const innitSecureKey = function () {
    let sar = ['f','r','s','_','c','k'];
    let sr = sar.toString().replace(/,/g,'');
    window[sr] = 'So4Sx,dEn2C';
    const secureParamToI = function (obj) {
        const ar = ['So4Sx', 'dEn2C'];
        const ixStepA = encodeURIComponent(objToSearch(obj).replace('?', ''));
        const ixStepC = window.btoa(ixStepA);
        const ixStepF = ixStepC.replace(new RegExp('2', 'gm'), ar[0]);
        return ixStepF.replace(new RegExp('n', 'gm'), ar[1]);
    };
    const updateVals = () => {
        let vs = ['f','r','s','_','c','s'];
        let vv = ['f','r','s','_','c','v'];
        let srandom = Math.random();
        window[vs.toString().replace(/,/g,'')] = secureParamToI({ vcode: srandom });
        window[vv.toString().replace(/,/g,'')] = md5(`vcode=${srandom}&s2cIo`)
    };

    const timeUpdate = function () {
        updateVals();
        setTimeout(() => {
            timeUpdate();
        }, parseInt(Math.random()*1000))
    };

    timeUpdate();


};

//滚动条在Y轴上的滚动距离
function getScrollTop(){
    let scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
　　if(document.body){
　　　　bodyScrollTop = document.body.scrollTop;
　　}
　　if(document.documentElement){
　　　　documentScrollTop = document.documentElement.scrollTop;
　　}
　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
　　return scrollTop;
}
 
//文档的总高度
 
function getScrollHeight(){
    let scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
　　if(document.body){
　　　　bodyScrollHeight = document.body.scrollHeight;
　　}
　　if(document.documentElement){
　　　　documentScrollHeight = document.documentElement.scrollHeight;
　　}
　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
　　return scrollHeight;
}

//浏览器视口的高度
function getWindowHeight(){
　　var windowHeight = 0;
　　if(document.compatMode == "CSS1Compat"){
　　　　windowHeight = document.documentElement.clientHeight;
　　}else{
　　　　windowHeight = document.body.clientHeight;
　　}
　　return windowHeight;
}


// 判断页面是否到底部
export function isPageBottom(accuracy = 10) {
    if (getScrollTop() + getWindowHeight() - getScrollHeight() > -accuracy) {
        return true
    }
    return false
}


export function throttle(func, delay = 500) {
    let timer = null

    return function() {
        const args = Array.from(arguments)
        if (!timer) {
            timer = setTimeout(() => {
                clearTimeout(timer)
                timer = null
                func.call(null, ...args)
            }, delay)
        }
    }
}


export const initGrayRelease = () => {
    if(!getCookie('gsr')) {
        setCookie('gsr', parseInt(Math.random()*10), 365)
    }
};


export const noBfcache = function () {

    window.addEventListener('pageshow', function( e ){
        if (e && e.persisted) {
            window.location.reload()
        }
    });
};

export const pullScroll = function() {
    let startX, startY;
    let endX, endY;
    return new Promise((resolve, reject) => {
        document.addEventListener("touchstart", function(e) {
            startX = e.touches[0].pageX;
            startY = e.touches[0].pageY;
        }, false);
        document.addEventListener("touchend", function(e) {
            endX = e.changedTouches[0].pageX;
            endY = e.changedTouches[0].pageY;
            let dx = endX - startX;
            let dy = endY - startY;
            if (dy > 0) {
                resolve("up");
            } else if (dy < 0) {
                resolve("down");
            } else {
                resolve("none");
            }
        }, false);
    })
}

export const compose = function() {
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    canvas.width = images[0].width;
    canvas.height = images[0].height;
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle='#fff';
    context.fill();
    function drawing(n){
        if(n < images.length){
            var img = new Image();
            img.src = images[n].url;
            img.onload=function(){
                context.drawImage(img, images[n].left, images[n].top, images[n].width,images[n].height);
                drawing(n+1);//递归
            }
        }else{
            base64.push(canvas.toDataURL("image/png", 0.6));
            for (let i = 0; i < base64.length; i++) {
                // jrFetchPost('/ng-marketing/index/User/upload', {
                //     // token: "797a90e6a671ec52922001170c3ddca7",
                //     image: base64[i],
                //     filename: "marketing",
                //     suffix: ".png"
                // })
                // .then((ret) => {
                //     this.compose_images.push(ret.data.full_image_url);
                // });
            }
            // document.getElementById('imgBox').innerHTML='<p style="padding:10px 0">合成图片成功！可以鼠标另存图片查看我是否是一张图片~~！</p><img src="'+base64[0]+'">';
        }
    }
    drawing(0);
}