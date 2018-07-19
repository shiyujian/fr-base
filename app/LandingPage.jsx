import createCountdown from '../react/Countdown.jsx';
import { searchToObj, checkTel } from '../script/others.js';
import openFrAlert from '../react/FrAlert.jsx';
import { setLocalStorage } from '../script/secure.js'
import md5 from 'md5';
import { paseTel, jrFetchGet, CAPID, initDun } from './landing-page/common.js';
import './LandingPage.less';
const landingPage = function(ChildConstructor, config) {
    class Landing extends React.Component {
        constructor(props, context) {
            super(props, context);
            this.handlePhone = this.handlePhone.bind(this);
            this.handleCode = this.handleCode.bind(this);
            this.handleSendMsg = this.handleSendMsg.bind(this);
            this.toSendMsg = this.toSendMsg.bind(this);
            this.handleLogin = this.handleLogin.bind(this);
            this.state = {
                activeDun: false,
                openDun: false,
                configData: {}
            };
        }
        componentDidMount() {
            const { k } = searchToObj(this.props.location.search) || {};
            jrFetchGet('/ng-qianba/channel/getOptions', {
                k: config.k || ""
            }).then((ret) => {
                this.setState({
                    configData: ret.data,
                });
                document.title = ret.data.title;
            });

            // jrFetchGet('/Config/getVerificationCodeConfigH5', {

            // }).then((ret) => {
            //     if (ret.data) {
            //         this.setState({
            //             activeDun: true
            //         })
            //     }
            // })
        }
        handlePhone(e) {
            if (e.target.value.length > 11) {
                this.setState({
                    phone: e.target.value.slice(0, 11)
                })
            } else {
                this.setState({
                    phone: e.target.value
                })
            }
            
        }
        handleCode(e) {
            this.setState({
                code: e.target.value
            })
        }
        handleSendMsg() {
            const { phone, configData, activeDun, openDun } = this.state;
            paseTel(phone).then(() => {
                if (activeDun) {
                    this.setState({
                        openDun: true
                    });
                    initDun(phone, (err, data) => {
                        if (data) {
                            this.setState({
                                openDun: false
                            });
                            this.toSendMsg(phone, data.validate);
                        }
                    });
                } else {
                    this.toSendMsg(phone, '');
                }
            })
        }
        toSendMsg(phone, validate) {
            const { beginCountdownAfterPromise, countdownPromiseRunning, countdownRunning } = this.props;
            const { configData } = this.state || {};
            beginCountdownAfterPromise(
                new Promise(function (resolve, reject) {

                    // fetch('/User/getPhoneCodeH5').then((response)=> {
                    //     response.json().then((val) => {
                    //         console.log(val);
                    //     })
                    // })
                   

                    


                    jrFetchGet("/ng-qianba/user/getUserAppLoginCheckCode", {
                        package_name: configData.package_name || "",
                        phone,
                        dev_num: 1,
                        sign: md5(phone + 'frapkkxookfjisksiakd26ooFroMAPP'),
                        captchaId: CAPID,
                        validate: validate || '',
                        app_union_name: configData.app_union_name || ""
                    }).then((ret) => {
                        resolve(ret);
                    }).catch(()=> {
                        reject();
                    })
                })
            );
        }
        handleLogin(callback) {
            const { phone, code, configData = {} } = this.state;
            switch (true) {
                case !checkTel(phone):
                openFrAlert('请输入正确的手机号');
                return false;
                case code.length < 3:
                openFrAlert('请输入正确的验证码');
                return false
            }
            const { android_url, land_type, ios_url, h5_url, plat_type, app_name, channel_id, invitation_code, device_id, plat_version, package_name, source_id } = configData;
            
            const prm = {
                phone,
                code,
                plat_type: plat_type || '',
                app_name: app_name || '',
                channel_id: channel_id || '',
                invitation_code: invitation_code || '',
                device_id: device_id || '',
                package_name: package_name || '',
                plat_version: plat_version || '',
                source_id: source_id,
            };
            let params = Object.assign({}, prm, config.param);
            
            let loginApi = land_type === 0 ? '/ng-qianba/user/channelLogin' : '/ng-qianba/user/dologin';


            const localData = {
                app_name: app_name || '',
                package_name: package_name || '',
                source_id: source_id || '',
                plat_version: plat_version || '',
                channel_id: channel_id || '',
            };

            if (config.privateRequest) {

                config.privateRequest(params, callback, localData);
            } else {
                jrFetchGet(loginApi, params).then((ret) => {
                    const callbackData =  Object.assign({}, localData, {
                        user_id: ret.data ? ret.data.user_info ? ret.data.user_info.id : '' : '',
                        token: ret.data ? ret.data.token ? ret.data.token : '' : '',
                    });

                    setLocalStorage('loginInfo', callbackData);
                    callback && (typeof callback === 'function') && callback();
                    config.callback && config.callback.call(this, callbackData);
                }).catch((ret) => {
                    console.log(ret)
                })
            }
        }
        render() {
            const { phone, code, configData, openDun } = this.state;
            const { countdownAgain, countdownPromiseRunning, countdownRunning, countdown } = this.props;
            return (
                <div>
                    <ChildConstructor
                        {...this.props}
                        phone={phone}
                        handlePhone={this.handlePhone}
                        handleCode={this.handleCode}
                        handleSendMsg={this.handleSendMsg}
                        handleLogin={this.handleLogin}
                        configData={configData}
                        countdownAgain={countdownAgain}
                        countdownPromiseRunning={countdownPromiseRunning}
                        countdownRunning={countdownRunning}
                        countdown={countdown}
                    />
                    {
                        openDun && (
                            <div className="captcha-box" style={{}}>
                                <div id="captcha"></div>
                            </div>
                        )
                    }
                </div>
            );
        }
    }
    const Landingcountdown = createCountdown(Landing, {
        countdownMax: config.countdownMax
    });
    return Landingcountdown;
}

export default landingPage;

