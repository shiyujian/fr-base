import './style/FrModal.less';

class FrModal extends React.Component {
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

        const { title, content, btnText } = this.props;
        return <div id="fr-alert">
            <div className="fr-alert">
                <div className="alert-modal-container animated-fade-in">
                    <div className="alert-modal">
                        <div className="main-container">

                            <p className="title">{ title }</p>

                            <div className="container">
                                { content }
                            </div>
                        </div>

                        <div onClick={this.closeFrAlert.bind(this)} className="alert-btn">
                            { btnText }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    }
}

const createFrModal = function (title, content, btnText, fun) {
    ReactDOM.render(<FrModal title={title} content={content} btnText={btnText} fun={fun}/>, document.getElementById('fr-base-others'));
};
export default createFrModal
