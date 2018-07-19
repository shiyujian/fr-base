




export const log =  function () {
    !window.location.host.includes('.mifengkong.cn') && console.log.apply(null, arguments);
};