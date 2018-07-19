import './style/FrAlert.less';

class FrSecondAlert extends React.Component {

    constructor() {
        super();
        this.state = {
            showModal: true,
        }
    }


    closeFrAlert() {
        //document.getElementById('fr-alert').innerText = '';
        const { fun } = this.props;
        /*这里执行点击确定后的回调*/
        fun && fun();

        document.getElementById('fr-base-others').innerText = '';
    }

    render() {
        return <div id="fr-alert">
            <div className="fr-alert">
                <div className="alert-modal-container animated-fade-in">
                    <div className="alert-modal">
                        <div className="main-container">
                            { this.props.msg }
                        </div>
                        <div onClick={this.closeFrAlert.bind(this)} className="alert-btn">
                            <div className="top-line">

                            </div>
                            确定
                        </div>
                    </div>

                </div>
            </div>
        </div>
    }
}

const openFrAlert = function (msg, fun) {
    ReactDOM.render(<FrSecondAlert msg={msg} fun={fun}/>, document.getElementById('fr-base-others'));
};
export default openFrAlert
