/**
 * 实例:
 *
 * <NavButtom iconList={IconList} select={HOME_PAGE}/>
 * */



import './style/NavBottom.less'

class NavBottom extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            // isSelect: this.props.index
            // isSelect: 1,
        };
    }

    changePage(index){
        switch (index){
            case 0 :
                this.context.router.push("/m-stock-home");
                break;
            case 1 :
                this.context.router.push("/m-stock-transaction");
                break;
            case 2 :
                this.context.router.push("/m-stock-mine");
                break;
        }
    }

    render(){
        const { iconList, select } = this.props;
        return <div className="nav-bottom">
            {
                iconList.map((item,index)=>{
                    return <div style={select=== index?{color:"#FE555A"}:{}} onClick={this.changePage.bind(this,index)}>
                        {
                            select === index? item.icon_on : item.icon_off
                        }
                        <br/>
                        {item.text}
                    </div>
                })
            }
        </div>
    }
}

NavBottom.contextTypes = {
    router: window.PropTypes.object
};
export default NavBottom