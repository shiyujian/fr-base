/**/

import './style/BarHeader.less';







class BarHeader extends React.Component {




    render() {
        const { title, desc, logo, rightShow } = this.props;
        return <div className="bar-header" style={{backgroundImage:`url(${logo})`}}>
            <div className="text-container">
                <p className="title">{title}</p>
                <p className="sub-title">{desc}</p>
                { rightShow ? <div className="right-show">
                    { rightShow }
                </div> : []}
            </div>

        </div>
    }
}
export default BarHeader
