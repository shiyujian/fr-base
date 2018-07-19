/**
 * 实例:
 * <SwitchButton onClick={fun} status={true/false}/>
 *
 * */


import './style/SwitchButton.less';

class SwitchButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            status: this.props.status
        };
    }

    handler() {
        this.setState({
            status: !this.state.status
        });
        this.props.onClick();
    }


    render(){
        const { status } = this.state;
        return <div className={ status? "switch-button switch-button-on" : "switch-button" }>
            <div
                className={ status? "switch-button-innner switch-button-innner-on" : "switch-button-innner switch-button-innner-off" }
                onClick={this.handler.bind(this)}
            ></div>
        </div>
    }
}

export default SwitchButton