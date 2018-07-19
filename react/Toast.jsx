
import './style/Toast.less';
class ToastComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.close = this.close.bind(this);
        this.state = {
            fadeIn: true
        }
    }

    componentDidMount() {
        const { duration } = this.props;
        setTimeout(() => {
            this.setState({
                fadeIn: false
            }, () => {
                setTimeout(() => {
                    this.close();
                }, 300)
            })
        }, duration || 3000);
    }

    close() {
        const { callback } = this.props;
        /*这里执行点击确定后的回调*/
        callback && callback();
        ReactDOM.unmountComponentAtNode(document.getElementById('fr-base-others'))
    }

    render() {
        const { fadeIn } = this.state;
        const { text } = this.props;
        return (
            <div className={fadeIn ? "toast fade-in" : "toast fade-out"}>
            {/* <div className={"toast fade-out"}> */}
            
                <div className="container">
                    <p className="text">{text}</p>
                </div>
            </div>
        )
    }
}

const Toast = function(text, duration, callback) {
ReactDOM.render(<ToastComponent text={text} duration={duration} callback={callback} />, document.getElementById('fr-base-others'));
    
}

export default Toast
