/*
* 实现页面滚动到底部 再向上划的时候 自动跳到下一页
*
* */


const POSITION_INIT = [];

let positionHistory = POSITION_INIT;


const NextFragmentHandle = function (action) {
    let timeoutNextPage;



    /*  setInterval(() => {
          console.log(positionHistory)
      }, 1000)
  */
    switch (action) {

        case 'onTouchStart':
            return function () {
                positionHistory = POSITION_INIT;
            };

        case 'onTouchMove':
            return function () {

                let { clientY } = event.touches[0];
                positionHistory.push(clientY)
                //console.log(positionHistory)
            };

        case 'onTouchEnd':
            return function () {
                console.log('onTouchEnd');

                const { length } = positionHistory;

                const isUp = positionHistory[0] > positionHistory[length - 1];
                const isPositionBottom = window.document.body.clientHeight === window.innerHeight + window.scrollY;

                window.clearTimeout(timeoutNextPage);
                timeoutNextPage = setTimeout(() => {
                    try {
                        isUp && isPositionBottom && window.onCallByH5.showNextFragment();
                        //isUp && isPositionBottom && console.log('翻页')
                    }catch (e) {
                        console.log(e)
                    }
                }, 300)



            }

    }


};

export default NextFragmentHandle