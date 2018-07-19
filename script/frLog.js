import {objToSearch} from './others.js'

export const addFrLog = (event_key, prm) => {
    let logGif = document.createElement('img');
    let gifUrl = `//frio.mifengkong.cn/1.gif?event_key=${event_key}`;
    for (let item in prm) {
        gifUrl = gifUrl + `&${item}=${encodeURIComponent(prm[item])}`
    }
    logGif.src = gifUrl;
    logGif.style.display = 'none';
    document.getElementById('root').appendChild(logGif);
};

export const addErrorLog = (key, prm) => {

    prm.error_name = prm.error_name.slice(0, 100);
    prm.url_location = prm.url_location.slice(0, 200);
    prm.url_fetch = prm.url_fetch.slice(0, 200);

    prm.random = Math.random();
    // addFrLog(key, prm).then(()=>{});
    addFetchLog(key, prm).then(() => {
    });
};



const createAddLog = function () {
    let lastSearch = '', lastTime = Date.now();
    return function (event_key, param, callback) {
        /*这是一个同步的埋点的方法，直接调用即可， 格式：*/
        /*frLog('abc', {
            hello: 123
         });
         */
        const search = objToSearch(Object.assign({}, {
            event_key: event_key
        }, param));

        if(search === lastSearch && (Date.now() - lastTime) < 1000) {
            /* 发起埋点的url相同，且时隔不到一秒， 那么判定为误触的请求*/
            console.log('误触');
            return false
        } else {
            let logGif = document.createElement('img');
            logGif.src = `//frio.mifengkong.cn/1.gif${search}r_hash=${Math.random()}`;
            logGif.style.display = 'none';
            document.getElementById('root').appendChild(logGif);
            lastSearch = search;
            lastTime = Date.now();
            logGif.onload = () => {
                callback && callback();
            }
        }
    }
};

export const frLog = createAddLog();



export const frLogPromise = function (event_key, prm) {
  return new Promise(function (resolve, reject) {
      frLog(event_key, prm, () => {
          resolve()
      })
  })
};



let fetchUrlLast = '', timeTag = 100;

export const addFetchLog = (event_key, prm) => {

    return new Promise((resolve, reject) => {

        let urlLast = JSON.stringify(prm);
        let newTimeTag = Date.parse(new Date());
        if ((fetchUrlLast === urlLast) && ((newTimeTag - timeTag) < 1000)) {
            console.log('01304');
        } else {
            timeTag = newTimeTag;
            console.log('01200');
            fetchUrlLast = urlLast;
            let logGif = document.createElement('img');
            let gifUrl = `//frio.mifengkong.cn/1.gif?event_key=${event_key}`;
            prm.random = Math.random();
            for (let item in prm) {
                gifUrl = gifUrl + `&${item}=${encodeURIComponent(prm[item])}`
            }
            logGif.src = gifUrl;
            logGif.style.display = 'none';
            document.getElementById('root').appendChild(logGif);
            logGif.onload = () => {
                resolve();
            }

        }


    })
};
