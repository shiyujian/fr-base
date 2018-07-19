import './style/FrModalSimple.less';

class FrModalSimple extends React.Component {
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
        const { appendContainerClass, isMiddle, child } = this.props;

        return <div  onClick={this.closeModal.bind(this)} className="fr-modal-simple">
            <div onClick={(e) => {e.stopPropagation()}} className={ isMiddle ? `modal-container animated-fade-in position-middle ${appendContainerClass}` : `modal-container animated-fade-in ${appendContainerClass}` }>
                <i onClick={this.closeModal.bind(this)} className="icon-base special-iconfont">&#xe628;</i>
                { child }
            </div>
        </div>
    }
}

const openFrModalSimple = function (child, cancleFun, isMiddle, appendContainerClass = '') {
    if(!child) {
        document.getElementById('fr-base-fr-modal-simple').innerText = '';
    }else {
        ReactDOM.render(<FrModalSimple appendContainerClass={appendContainerClass} isMiddle={isMiddle} child={child} cancleFun={cancleFun}/>, document.getElementById('fr-base-fr-modal-simple'));
    }

};
export default openFrModalSimple
