import Loading from "../react/Loading.jsx";
let realContext;
class Container extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: false,
        }
    }

    componentWillMount() {
        realContext = this;
    }

    static getSetLoadiingFunc(loadingState) {
        if (realContext && realContext.state.loading !== loadingState) {
            realContext.setState({
                loading: loadingState
            })
        }
    }

    render() {
       return <div className="container" style={{height:'100%'}}>
           { this.props.children }
           { this.state.loading ? <Loading/> : []}
         {/*  <Loading/>*/}
       </div>
    }
}
export default Container

