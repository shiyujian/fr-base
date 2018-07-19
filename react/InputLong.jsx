
import './style/InputLong.less';


class  InputLong extends  React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    render() {


        const { placeholder, domIcon, id, onChange, value } = this.props;

        return <div className="input-long">
            <input {...this.props}/>

            { domIcon }

            <div className="bottom-line">

            </div>
        </div>
    }
}
export default InputLong
