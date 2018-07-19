import './style/ItemHeader.less';








class ItemHeader extends React.Component {

    render() {
        const { title, subTitle, hideLine, style } = this.props;
        return <div style={style} className="item-header-li">

                <span></span>{ title }

                <span>{subTitle}</span>

            { hideLine ? '' : <div className="bottom-line">

            </div> }


        </div>
    }
}
export default ItemHeader

