

import './style/FilterHeader.less'



//xxx
const multiSelect = false;


class  FilterHeader extends  React.Component {

    constructor(props) {
        super(props);

        const { defaultActiveArr } = this.props;

        this.state = {
            filterOpen: false,
            activeArr: defaultActiveArr.map((item) => item),
        }
    }



    activeIt(itemIndex, index) {
        /*单选 多选*/
        let { activeArr } = this.state;
        activeArr[itemIndex] = index;
        this.setState({
            activeArr: activeArr
        })
    }

    closeOrOpen() {
        const { filterOpen, activeArr } = this.state;
        this.setState({
            filterOpen: !filterOpen
        }, () => {
            filterOpen && this.props.onUpdate(activeArr);
        })
    }


    render() {

        const { filterOpen, activeArr } = this.state;

        return <div onClick={this.closeOrOpen.bind(this)} className={filterOpen ? 'filter-header filter-open' : 'filter-header'}>

            <div className="main-content">

                <p className="filter-title" onClick={this.closeOrOpen.bind(this)}>
                    <span style={{float:'left', marginRight:"0.4rem"}}>
                    筛选
                </span>
                    <span className={filterOpen ? 'down-up-icon close-filter' : 'down-up-icon'}>▾</span>{
                    filterOpen ? <span onClick={(event) => {
                        this.setState({
                            activeArr: this.props.defaultActiveArr.map(item => item)
                        });
                        event.stopPropagation()
                    }} className="set">重置</span> : <span className="set">
                        { activeArr.map((num, index) => {
                            return this.props.selectSetting[index].selectArr[num]
                        }).toString() }
                    </span>
                }</p>

                {
                    filterOpen ? <div onClick={(event) => { event.stopPropagation()}} className="filter-items">
                            {
                                this.props.selectSetting.map((item, itemIndex) => {
                                    return <div className="animated-fade-in">
                                        <p className="select-item-title">{item.title}</p>
                                        <div className="select-item-box">
                                            { item.selectArr.map((child, index) => {

                                                const activeClass = activeArr[itemIndex] === index ? 'select-active' : '';

                                                const commonClass = (index+1)%3 === 0 ? 'select-item' : 'select-item has-margin';

                                                return <p onClick={this.activeIt.bind(this, itemIndex, index)} className={`${activeClass} ${commonClass}`}>{child}</p>

                                            })}
                                        </div>
                                    </div>
                                })
                            }
                    </div> : ''
                }
            </div>


        </div>
    }
}
export default FilterHeader
