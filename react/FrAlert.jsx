import './style/FrAlert.less';

class FrAlert extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: true,
        }
    }


    closeFrAlert() {
        const { fun } = this.props;
        /*这里执行点击确定后的回调*/
        fun && fun();

       ReactDOM.unmountComponentAtNode(document.getElementById('fr-base-others'))
    }



    render() {

        return this.state.showModal ? <div id="fr-alert">
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
            </div> : ''
    }
}

const openFrAlert = function (msg, fun) {
    ReactDOM.render(<FrAlert msg={msg} fun={fun}/>, document.getElementById('fr-base-others'));
};
export default openFrAlert
