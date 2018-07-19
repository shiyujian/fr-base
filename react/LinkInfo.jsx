import './style/LinkInfo.less';


class LinkInfo extends React.Component {
    goNext() {
        window.location.href = this.props.href;
    }


    render() {
        const { title, subTitle, info, href } = this.props;
        return <div className="link-info">

                <div onClick={this.goNext.bind(this)} className="info-content">
                    <p>{title}</p>
                    <p>{subTitle}</p>
                    <p>{info}&nbsp;<i className="icon-base">&#xe60e;</i></p>
                </div>

        </div>
    }
}
export default LinkInfo

