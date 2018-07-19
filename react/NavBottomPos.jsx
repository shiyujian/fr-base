/**
 * 实例:
 *
 * <NavButtom iconList={IconList} select={HOME_PAGE}/>
 * */



import './style/NavBottomPos.less'

class NavBottomPos extends React.Component{
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
                location.href = "/m-card-index-publish";
                break;
            case 1 :
                location.href = "/m-card-mine";
                break;
        }
    }

    render(){
        const { iconList, select } = this.props;
        return <div className="nav-bottom-pos">
            {
                iconList.map((item,index)=>{
                    return <div style={select=== index?{color:"#555"}:{color:"#bfbfbf"}} onClick={this.changePage.bind(this,index)}>
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


export default NavBottomPos;