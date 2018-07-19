/**
 * 实例:
 * FrAlertSwitchBtn('title','msg',fun,true/false)
 *
 * */

import './style/FrAlertSwitchBtn.less';
import SwitchButton from 'fr-base/react/SwitchButton';
class FrAlertSwitchBtn extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: true
        }
    }


    closeFrAlert() {
        //document.getElementById('fr-alert').innerText = '';
        const { fun } = this.props;
        /*这里执行点击确定后的回调*/
        fun && fun();
        setTimeout(()=>{
            document.getElementById('fr-base-others').innerText = '';
        },200);

    }

    render() {
        return <div id="fr-alert">
                <div className="fr-alert">
                    <div className="alert-modal-container animated-fade-in">
                        <div className="alert-modal">
                            <div className="alert-title">{this.props.title}</div>
                            <div className="main-container">
                                <div>{ this.props.title }</div>
                                <SwitchButton
                                    onClick={this.closeFrAlert.bind(this)}
                                    status={this.props.status}
                                />
                            </div>
                            <div className="main-container-text">
                                { this.props.msg }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
    }
}

const openFrAlert = function (title, msg, fun, status) {
    ReactDOM.render(<FrAlertSwitchBtn title={title} msg={msg} fun={fun} status={status}/>, document.getElementById('fr-base-others'));
};
export default openFrAlert
