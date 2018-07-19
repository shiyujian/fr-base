
import './ModalInfo.less'
class ModalToastJsx extends React.Component {




    render() {
        const { title, child } = this.props;

        return <div  onClick={this.closeModal.bind(this)} className="fr-modal-jsx">


        </div>
    }
}

const ModalToast = function (title, child, cancleFun) {
    if(!child) {
        document.getElementById('fr-base-fr-modal-toast').innerText = '';
    }else {
        ReactDOM.render(<ModalToastJsx title={title} child={child} cancleFun={cancleFun}/>, document.getElementById('fr-base-fr-modal-simple'));
    }

};
export default ModalToast
