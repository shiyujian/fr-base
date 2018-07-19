/**
 * demo:
 * FrAlertTwoBtn( 'title', 'msg',()=>{},()=>{},'#FE555A');
 *
 * */


import './style/FrAlertTwoBtn.less';

class FrAlertTwoBtn extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: true,
        }
    }

    componentDidMount(){
        console.log(this.props)
    }

    closeFrAlert() {
        //document.getElementById('fr-alert').innerText = '';
        const { fun1 } = this.props;
        /*这里执行点击确定后的回调*/
        fun1 && fun1();

       ReactDOM.unmountComponentAtNode(document.getElementById('fr-base-others'))
    }

    handler(){
        const { fun2 } = this.props;
        /*这里执行点击确定后的回调*/
        fun2 && fun2();

       ReactDOM.unmountComponentAtNode(document.getElementById('fr-base-others'))
    }

    render() {
        const { btnText = [] } = this.props;
        return <div id="fr-alert">
                <div className="fr-alert">
                    <div className="alert-modal-container animated-fade-in">
                        <div className="alert-modal">
                            <div className="alert-title">{this.props.title}</div>
                            <div className="main-container">
                                { this.props.msg }
                            </div>
                            <div className="alert-btn">
                                <div className="top-line"></div>
                                <div className="footer" style={{color:this.props.fontColor}}>
                                    <span className="footer-mid-line"></span>
                                    <div onClick={this.closeFrAlert.bind(this)} style={{ color: "#aaa" }}>{btnText[0] ? btnText[0] : "取消"}</div>
                                    <div onClick={this.handler.bind(this)}>{btnText[1] ? btnText[1] : "确定"}</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
    }
}

const openFrAlertTwoBtn = function (title, msg, fun2, fun1, fontColor, btnText) {
    ReactDOM.render(<FrAlertTwoBtn title={title} msg={msg} fun2={fun2} fun1={fun1} fontColor={fontColor} btnText={btnText} />, document.getElementById('fr-base-others'));
};
export default openFrAlertTwoBtn
