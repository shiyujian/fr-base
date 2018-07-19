

let s = function() {

    let inner = function a() {
        try {

            let innerB = function b(i) {
                if (('' + (i / i)).length !== 1 || i % 20 === 0) {
                    (function() {}).constructor('debugger')();
                } else {
                    debugger ;
                }
                innerB(++i);
            };

            innerB(0);

        } catch (e) {
            setTimeout(a, 5000);
        }
    };


    inner();
};
s();