
class ToastComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            fadeIn: true
        }
    }

    componentDidMount() {
        if (this.props.duration > 0) {
            this.closeTimer = setTimeout(() => {
                this.close();
            }, this.props.duration - 300);
        }
    }
    
    componentWillUnmount() {
        this.clearCloseTimer();
    }
    
    clearCloseTimer() {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
        }
    }
    
    close() {
        // 关闭的时候，应该先清掉倒数定时器
        // 然后开启过场动画
        // 等待动画结束，执行回调
        this.clearCloseTimer();
        const _this = this;
        _this.setState({
            fadeIn: false,
        });
        this.timer = setTimeout(() => {
            if (this.props.onClose) {
                this.props.onClose();
            }
            clearTimeout(_this.timer);
        }, 300)
    }

    render() {
        const { content, iconType } = this.props;
        return (
            <div className="toast">
                <div className="container">
                    {
                        iconType && iconType
                    }
                    <p className="content">{content}</p>
                </div>
            </div>
        )
    }
}

function Toast(content, duration, callback) {
    <ToastComponent content={content} duration={duration} iconType={<i className="icon iconfont">&#xe67d;</i>} callback={callback} />, document.getElementById('fr-base-others')
    // this.success = ReactDOM.render(
    //     <ToastComponent content={content} duration={duration} iconType={<i className="icon iconfont">&#xe67d;</i>} callback={callback} />, document.getElementById('fr-base-others')
    // );
    // this.fail = ReactDOM.render(
    //     <ToastComponent content={content} duration={duration} iconType={<i className="icon iconfont">&#xe63a;</i>} callback={callback} />, document.getElementById('fr-base-others')
    // );
    // this.info = ReactDOM.render(
    //     <ToastComponent content={content} duration={duration} iconType={undefined} callback={callback} />, document.getElementById('fr-base-others')
    // );
}

export default Toast;
