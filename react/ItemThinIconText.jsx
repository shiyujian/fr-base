import './style/ItemThinIconText.less';


class ItemThinIconText extends React.Component {



    render() {
        const { iconLeft, text, iconRight  } = this.props;
        return <div className="item-thin-icon-text" style={{backgroundImage:`url(${iconLeft})`}}>
            { text }
            <img src={iconRight}/>
        </div>
    }
}
export default ItemThinIconText

