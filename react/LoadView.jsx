
import './style/LoadView.less'
class LoadView extends React.Component{




    render() {

        const { msg } = this.props;

        return <div className="loading-view">
            <div className="img">
                <div className="loader">
                    <div className="loader-inner line-scale-pulse-out-rapid">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>

                    { msg && msg.length > 0 ? <p className="msg" >

                    </p> : []}

                </div>
            </div>
        </div>
    }
}

export default LoadView;