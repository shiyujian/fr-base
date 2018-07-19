/**/

import './style/BarThreeInfo.less';


class BarThreeInfo extends React.Component {


    render() {
        const { left, leftVal, mid, midVal, right, rightVal } = this.props.data;

        return <div className="bar-three-info" onClick={this.props.onClick}>

            <div className="info-left">
                <p className="val">{leftVal}</p>
                <p className="name">{left}</p>
            </div>

            <div className="info-mid">
                <div className="container">
                    <p className="val">{midVal}</p>
                    <p className="name">{mid}</p>
                </div>
            </div>

            {
                right ? <div className="info-right">
                    <p className="val">{rightVal}</p>
                    <p className="name">{right}</p>
                </div> : <div className="info-right-only-val">
                    <p className="only-val">{rightVal}</p>
                </div>
            }




        </div>
    }
}
export default BarThreeInfo
