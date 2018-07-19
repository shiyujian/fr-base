import './style/Loading.less';



class Loading extends React.Component {

    render() {
        return <div className="fr-loading">
            <svg className="loading-content" version="1.1" id="L4" x="0px" y="0px"
                 viewBox="0 0 100 100" enable-background="new 0 0 0 0" >
                <circle fill="#555555" stroke="none" cx="26" cy="50" r="6">
                    <animate
                        attributeName="opacity"
                        dur="1s"
                        values="0;1;0"
                        repeatCount="indefinite"
                        begin="0.1"/>
                </circle>
                <circle fill="#555555" stroke="none" cx="46" cy="50" r="6">
                    <animate
                        attributeName="opacity"
                        dur="1s"
                        values="0;1;0"
                        repeatCount="indefinite"
                        begin="0.2"/>
                </circle>
                <circle fill="#555555" stroke="none" cx="66" cy="50" r="6">
                    <animate
                        attributeName="opacity"
                        dur="1s"
                        values="0;1;0"
                        repeatCount="indefinite"
                        begin="0.3"/>
                </circle>
            </svg>
        </div>
    }
}

export default Loading;