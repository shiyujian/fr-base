


import './style/InputStock.less';


class InputStock extends React.Component {




    constructor() {
        super();
        this.state = {
            containerClass: 'input-stock-content'
        };

       this.getValue = function () {
           return this['refs']['target-input']['value']
       }


    }




    render() {
        const { containerClass } = this.state;

        const { hasDelete, onChange, placeholder, id, style, type } = this.props;

        return <div style={style} className="input-stock">
            <div className={ containerClass }>
                <input ref="target-input"
                       type={type ? type : '' }
                       onBlur={() => this.setState({containerClass: 'input-stock-content'})}
                       onChange={onChange}
                       id={id}
                       onFocus={() => this.setState({containerClass: 'input-stock-content input-stock-focus'}) }
                       placeholder={placeholder}/>


                {
                    hasDelete ? <p onClick={ () => {
                        this.refs['target-input'].value = '';
                        onChange && onChange();
                    } } className="del-icon">
                        <i className="icon-base">&#xe63f;</i>
                    </p> : ''
                }


                { this.props.children }

            </div>
        </div>
    }



}


export default InputStock
