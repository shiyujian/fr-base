import createCountdown from '../react/Countdown.jsx';

import {setLocalStorage, getLocalStorage} from '../script/secure.js'
import openFrAlert from '../react/FrAlert.jsx';
import md5 from 'md5'
import {paseTel, jrFetchGet, CAPID, initDun} from './landing-page/common.js';
export const LAND_TYPE_ALL_STEP = 1;
export const LAND_TYPE_DOWNLOAD = 0;


const loginPage = function (ChildConstructor, config) {


    class Landing extends React.Component {
        constructor(props, context) {
            super(props, context);
            this.sendPhoneCode = this.sendPhoneCode.bind(this);
            this.getOptionsByKey = this.getOptionsByKey.bind(this);
            this.getDefaultOptionParams = this.getDefaultOptionParams.bind(this);
            this.getDefaultLoginApi = this.getDefaultLoginApi.bind(this);
            this.toSendMsg = this.toSendMsg.bind(this);
            this.setDefaultLoginInfoToLocalStorage = this.setDefaultLoginInfoToLocalStorage.bind(this);
            this.state = {
                options: {}
            }
        }
        componentDidMount() {
            // jrFetchGet('/ng-qianba/Config/getVerificationCodeConfig').then((ret) => {
            //     if (ret.data) {
            //         this.activeDun = true;
            //     }
            // })
        }

        getOptionsByKey(key) {
            !key && alert('key值不能为空');
            return new Promise((resolve, reject) => {
                jrFetchGet('/ng-qianba/channel/getOptions', {
                    k: key
                }).then((ret) => {
                    !ret.data && alert('key值无效');
                    this.setState({
                        options: ret.data
                    });
                    resolve(ret.data);
                });
            })
        };

        getDefaultOptionParams() {
            const {plat_type, app_name, channel_id, invitation_code, device_id, plat_version, package_name, source_id} = this.state.options;

            return {
                plat_type: plat_type || '',
                app_name: app_name || '',
                channel_id: channel_id || '',
                invitation_code: invitation_code || '',
                device_id: device_id || '',
                package_name: package_name || '',
                plat_version: plat_version || '',
                source_id: source_id,
            }
        };

        getDefaultLoginApi() {
            return this.state.options.land_type === LAND_TYPE_DOWNLOAD ? '/ng-qianba/user/channelLogin' : '/ng-qianba/user/dologin';
        };

        setDefaultLoginInfoToLocalStorage(user_id, token) {
            const {package_name, source_id, plat_version, channel_id, app_name} = this.state.options;
            setLocalStorage('loginInfo', Object.assign({}, {
                package_name,
                source_id,
                plat_version,
                channel_id,
                app_name,
            }), {
                user_id: user_id,
                token: token || ''
            });
            if (!getLocalStorage('loginInfo')['user_id']) {
                openFrAlert('登录失败,请换个关闭无痕模式,或者更换浏览器')
            }
        };


        sendPhoneCode(phone) {
            /*调用这个方法发送短信验证码*/
            paseTel(phone).then(() => {
                if (this.activeDun) {
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
            const {beginCountdownAfterPromise} = this.props;
            const { options } = this.state;
            // 发送验证码成功后开始倒计时
            const param = {
                package_name: options.package_name || "",
                phone,
                dev_num: 1,
                sign: md5(phone + 'frapkkxookfjisksiakd26ooFroMAPP'),
                captchaId: CAPID,
                validate: validate || '',
                app_union_name: options.app_union_name || ""
            };
            beginCountdownAfterPromise(
                new Promise((resolve, reject) => {
                    jrFetchGet("/ng-qianba/user/getUserAppLoginCheckCode", param).then((ret) => {
                        resolve(ret);
                    }).catch(() => {
                        console.log('error');
                        reject();
                    })
                })
            );
        }

        render() {
            const {openDun, options} = this.state;
            return (
                <div>
                    <ChildConstructor
                        getOptionsByKey={ this.getOptionsByKey } /*获取渠道的一些配置信息，这些信息埋点需要，登录注册接口一般也需要*/
                        getDefaultOptionParams={ this.getDefaultOptionParams }/*获取一般登录所需部分的options参数*/
                        getDefaultLoginApi={ this.getDefaultLoginApi }/*根据Key获取的options的类型获取接口地址*/
                        setDefaultLoginInfoToLocalStorage={ this.setDefaultLoginInfoToLocalStorage }/*设置当前的登录状态
                         需要user_id和token(非必须)
                         获取信息参考getEnv.js里面的代码
                        */
                        sendPhoneCode={ this.sendPhoneCode } /* 发送验证码的接口，当然你也可以使用其他方法发送 关于倒计时 详见createCountdown*/
                        options={ options }/*通过key获取到的options*/
                        {...this.props} />
                    {
                        openDun && (/*这里是网易云盾*/
                            <div className="captcha-box" style={{}}>
                                <div id="captcha"></div>
                            </div>
                        )
                    }
                </div>
            );
        }
    }
    return createCountdown(Landing, {
        countdownMax: 40
    });
};

export default loginPage;

