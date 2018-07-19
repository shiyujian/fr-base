









import './style/FrToastComponent.less';

class FrToastComponent extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }



    render() {
        return <div className="fr-toast-component">
            <p className="toast-text">{ this.props.text }</p>
        </div>
    }
}







const FrToast = function (text, time = 1000) {

    ReactDOM.render(<FrToastComponent time={time} text={text} />, document.getElementById('fr-base-others'));

};

export default  FrToast