
import './ModalInfo.less'
class ModalInfoJsx extends React.Component {

    constructor() {
        super();
        this.state = {
            showModal: true,
        }
    }

    closeModal() {
        //document.getElementById('fr-alert').innerText = '';
        const { cancleFun } = this.props;
        /*这里执行点击确定后的回调*/
        cancleFun && cancleFun();
        document.getElementById('fr-base-fr-modal-simple').innerText = '';

    }

    render() {
        const { title, child } = this.props;

        return <div  onClick={this.closeModal.bind(this)} className="fr-modal-jsx">

            <div onClick={(e) => {e.stopPropagation()}} className='modal-container animated-fade-in position-middle'>
                <i onClick={this.closeModal.bind(this)} className="icon-base special-iconfont">&#xe628;</i>
                <p className="fr-modal-jsx-title">{title}</p>
                <div className="fr-modal-child">
                    { child }
                </div>
            </div>



        </div>
    }
}

const ModalInfo = function (title, child, cancleFun) {
    if(!child) {
        document.getElementById('fr-base-fr-modal-simple').innerText = '';
    }else {
        ReactDOM.render(<ModalInfoJsx title={title} child={child} cancleFun={cancleFun}/>, document.getElementById('fr-base-fr-modal-simple'));
    }

};
export default ModalInfo
