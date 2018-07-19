/*
*
*   关于Button组件
*
*
*   type: 正常按钮 底部fix按钮 border按钮
*   disable: false true 显示按钮是否可用
*   size: small large 小按钮是指inline的小按钮 large是指正常的width100% 按钮
*   shape: normal circular 显示正常或者是半圆角按钮
*
* */

const TYPE_NORAML = 'normal',
    TYPE_FIXED = 'fixed',
    TYPE_BORDER = 'border',
    SIZE_SMALL = 'small',
    SIZE_LARGE = 'large',
    SHAPE_NORAML = 'noraml',
    SHAPE_CIRCULAR = 'circular';








import './style/Button.less';


class Button extends React.Component {

    render() {
        const { type } = this.props;
        return <div className="button">
            { type }
        </div>
    }
}



Button.defaultProps = {
    type: TYPE_NORAML,
    disable: false,
    size: SIZE_LARGE,
    shape: SHAPE_NORAML
};

export default Button

