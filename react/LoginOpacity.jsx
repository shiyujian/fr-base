
/**
 * 使用方法： loginOpacity(() => {
 * 
 * })
 */
import { appLogin, getAppUserInfo } from "fr-base/script/frNative";

class LoginOpacityComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showMask: false
        }
    }

    componentDidMount() {
        const { fun } = this.props;
        getAppUserInfo().then((res) => {
            fun && fun();
        }).catch((err) => {
            this.setState({
                showMask: true
            })
        })
    }

    render() {
        const { showMask } = this.state;
        return (
            <div style={{ width: "100%", height: "100%", position: "fixed", top: 0, left: 0, display: showMask ? "block" : "none", zIndex: 999 }} onClick={() => { appLogin(); }}/>
        );
    }
}

const loginOpacity = function (fun) {
    ReactDOM.render(<LoginOpacityComponent fun={fun}/>, document.getElementById('fr-base-others'));
};
export default loginOpacity

