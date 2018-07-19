/*
* 实例
*
* <Nav
     title={['aaa','bbb','ccc']}
     funs={[fun1,fun2,fun3]}
  />
*
* */



import './style/Nav.less';

class Nav extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isSelectId: 0
        };
    }

    select(id){
        this.setState({
            isSelectId: id
        });

    }


    render(){
        //title = [];  nav标题
        //funs = [];  回调数组
        let { title, funs} = this.props;
        const { isSelectId } = this.state;

        return <div className={"fr-base-nav"}>
            <div className={"fr-base-nav-titles"}>
                {
                    title.map( (item,index) =>{
                        return <div
                            className={ isSelectId === index? "fr-base-nav-titles-item-select" : "fr-base-nav-titles-item" }
                            onClick={this.select.bind(this,index)}
                        >
                            {item}
                        </div>
                    })
                }
            </div>
            <div className={"fr-base-nav-content"}>
                {
                    funs.length != 0? funs[isSelectId]() : ''
                }
            </div>
        </div>
    }
}


export default Nav