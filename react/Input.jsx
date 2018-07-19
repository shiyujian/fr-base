

import './style/Input.less';

class Input extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: props.value || ""
        }
    }
    handleChange() {
        const { onChange, refName } = this.props;
        if (onChange) {
            let value = this.refs[refName].value;
            this.setState({
                value
            });
            onChange(value);
        }
    }
    render() {
        const { value } = this.state;
        const { children, type, placeholder, editable, disabled, clear, rightAlign, onChange, refName, extra, onExtraClick, hideBottom } = this.props;
        return (
            <div className="input">
                <div className="container">
                    <p className="title">
                        {children}  
                    </p>
                    <div className="input-container">
                        {
                            onChange ? (
                                <input
                                    ref={refName}
                                    placeholder={placeholder}
                                    type={type}
                                    value={value}
                                    className={`${rightAlign ? "text-right" : ""}`}
                                    onChange={this.handleChange}
                                    readOnly={editable ? !editable : false}
                                    disabled={disabled || false}
                                />
                            ) : (
                                <input
                                    ref={refName}
                                    placeholder={placeholder}
                                    type={type}
                                    className={rightAlign ? "text-right" : ""}
                                    onChange={this.handleChange}
                                    readOnly={editable ? !editable : false}
                                    disabled={disabled || false}
                                />
                            )
                        }
                        {
                            extra && <div onClick={onExtraClick ? onExtraClick : ""}>{extra}</div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Input;