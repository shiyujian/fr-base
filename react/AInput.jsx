import './style/Input.less';

export default class Input extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target.value.trim())
  }

  render() {
    const { value, children, type, placeholder, editable, disabled, clear, rightAlign, onChange } = this.props;
    return (
      <div className="input">
        <div className="container">
          <p className="title">
              {children}  
          </p>
          <div className="input-container">
            <input
              placeholder={placeholder}
              type={type}
              value={value}
              className={`${rightAlign ? "text-right" : ""}`}
              onChange={this.handleChange}
              readOnly={editable ? !editable : false}
              disabled={disabled || false}
            />
          </div>
        </div>
      </div>
    )
  }
}
