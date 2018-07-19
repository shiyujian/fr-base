


export const getSingle = function (fn) {
    let hasInit = false, result;
    return function () {
        if(hasInit) {
            console.log('getSingle');
            return result
        } else {
            result = fn.apply(this, arguments);
            hasInit = true;
            return result
        }
    }
};


export const getSinglePromise = function (fn) {
    let hasInit = false, result;
    console.log(fn, 'fn');
    return function () {
        if(hasInit) {
            console.log('直接返回');
            return {
                val: result,
                then: function (callback) {
                    callback(this.val)
                }
            }
        } else {
            let thisArguments = arguments;
            return new Promise(function (resolve, reject) {
                fn.apply(this, thisArguments).then((ret) => {
                    result = ret;
                    hasInit = true;
                    console.log('第一次请求');
                    resolve(ret);
                });
            })
        }
    }
};