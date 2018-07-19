


const createLazyCenter = function () {
    let dataCenter = {};
    
    return {
        _setLd: function (stateObj, callback) {

           for(let item in stateObj) {
               dataCenter[item] = {
                   shouldUpdate: false,
                   value: stateObj[item]
               }
           }
           this.setState(stateObj, callback);
        },
        
        
        _getLd: function (key, def) {
            /* def 默认值 */
            if(dataCenter[key]) {
                return dataCenter[key]['value']
            } else {
                dataCenter[key] = {
                    value: def,
                    shouldUpdate: true
                };

                return def
            }
        },

        _getLdShouldUpdate: function (key) {
            return dataCenter[key] ? dataCenter[key]['shouldUpdate'] : true
        },

        _setLdUpdateState: function (key, shouldUpdate) {
            if(!dataCenter[key]) {
                throw new Error('先设置数据');
            }
            dataCenter[key]['shouldUpdate'] = shouldUpdate;
        }
    }
};


const { _setLd, _getLd, _setLdUpdateState, _getLdShouldUpdate } = createLazyCenter();


export const setLd = _setLd;
export const getLd = _getLd;

export const setLdUpdateState = _setLdUpdateState;
export const getLdShouldUpdate = _getLdShouldUpdate;