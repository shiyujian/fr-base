
/*fetchGet，fetchPost只包装了最基础的请求，特殊需求，直接使用fetch来编码
* 参考：https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
* */
const ERROR_MSG = '请求失败';
export const fetchGet = (requestApi, fetchPrm, successFun, errorFun) => {

    let thisUrl = `${requestApi}?`;
    for (let item in fetchPrm) {
        thisUrl = thisUrl + `${item}=${encodeURIComponent(fetchPrm[item])}&`;
    }

    if( thisUrl.length <= requestApi.length + 1) {
        thisUrl = requestApi;
    }

    fetch(thisUrl, {credentials: 'include', mode: 'no-cors'})
        .then((response) => {
            const { status } = response;
            if (status >= 200 && status < 300 || status === 304 || status === 302) {
                response.json().then((val) => {
                    successFun(val, thisUrl);
                });
            } else {

                errorFun && errorFun(`${ERROR_MSG}:${status}，GET:${requestApi}`, thisUrl, status + '');
            }
        }).catch((err) => {

        errorFun && errorFun(`${ERROR_MSG}:${err.message}，GET:${requestApi}`, thisUrl, err.message);
    });
};

export const fetchPost = (requestApi, fetchPrm, successFun, errorFun) => {
    let prmdata = '';
    for (let item in fetchPrm) {
        prmdata = prmdata + `${item}=${encodeURIComponent(fetchPrm[item])}&`;
    }
    const url = requestApi + '**' + prmdata;
    fetch(requestApi, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: prmdata
    }).then((response) => {
        const { status } = response;
        if (status >= 200 && status < 300 || status === 304) {
            response.json().then((val) => {
                successFun(val, url);
            });
        } else {
            errorFun && errorFun(`${ERROR_MSG}:${status}，POST:${requestApi},BODY:${prmdata}`, url, status);
        }
    }).catch((err) => {
        errorFun && errorFun(`${ERROR_MSG}:${err.message},POST:${requestApi},BODY:${prmdata}`, url, err.message);
    })
};

/*
const fetchGet = function(jrApi, fetchPrm) {
    return new Promise(function(resolve, reject){

        var thisUrl = jrApi;
        if(fetchPrm) { thisUrl = thisUrl + '?'}
        for (var item in fetchPrm) {
            thisUrl = thisUrl + item + '=' +  encodeURIComponent(fetchPrm[item]) + '&'
        }
        fetch(thisUrl, {credentials: 'include'})
            .then(function(response){
                response.json().then(function(val){
                    resolve(val);
                });
            }).catch(function(err){
            reject(err)
        });
    })
}*/
