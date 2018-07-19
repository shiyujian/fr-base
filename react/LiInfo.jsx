import './style/LiInfo.less';




class LiInfo extends React.Component {

    render() {
        const { title, subTitle } = this.props;
        return <div className="li-info animated-fade-in">
            <span className="li-info-title">{title}</span>
            <span className="li-info-subtitle">{subTitle}</span>
        </div>
    }
}
export default LiInfo

