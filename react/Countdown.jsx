

/*例子见LoginExample*/

/*countdownAgain, countdownPromiseRunning, countdownRunning, countdown, beginCountdownAfterPromise*/
/* 是否是重新倒计时  倒计时在是否等待异步完成    倒计时正在进行       倒计时数字   开始倒计时的方法(第一个参数是个promise)*/
const createCountdown = function (ChildConstructor, config) {

    /*
    *
    * countdownMax: 计时秒数
    *
    * */

    const contdownMax = config && config.countdownMax || 60;

    class Countdown extends React.Component {

        constructor(props, context) {
            super(props, context);
            this.state = {
                countdown: contdownMax,
                countdownAgain: false,
                countdownRunning: false,
                countdownPromiseRunning: false
            };
            this.beginCountdownAfterPromise = this.beginCountdownAfterPromise.bind(this)
        }

        beginCountdownAfterPromise(targetPromise) {
            this.setState({
                countdownAgain: false,
                countdownPromiseRunning: true
            });
            targetPromise.then((ret) => {
                /*经过一系列逻辑后 进行倒计时*/
                /*countdown*/
                this.setState({
                    countdownPromiseRunning: false,
                    countdownRunning: true
                });

                let countdownInterval;
                window.clearInterval(countdownInterval);
                countdownInterval = window.setInterval(() => {
                    if(this.state.countdown > 0) {
                        this.setState({
                            countdown: this.state.countdown - 1
                        })
                    } else {
                        window.clearInterval(countdownInterval);
                        this.setState({
                            countdownAgain: true,
                            countdownRunning: false,
                            countdown: contdownMax
                        })
                    }
                }, 1000);
            }).catch((ret) => {
                this.setState({
                    countdownAgain: true,
                    countdownPromiseRunning: false
                });

                //console.log('发送错误');
            })
        }

        render() {
            const { countdown, countdownAgain, countdownPromiseRunning, countdownRunning } = this.state;
            return (

                    <ChildConstructor
                        {...this.props}
                        countdownAgain={countdownAgain}
                                      countdownRunning={countdownRunning}
                                      countdownPromiseRunning={countdownPromiseRunning}
                                      beginCountdownAfterPromise={this.beginCountdownAfterPromise} countdown={countdown} />
            );
        }
    }

    return Countdown
};

export default createCountdown
