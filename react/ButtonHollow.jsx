

/*
 *
 * ButtonHollow 组件，支持disable属性，默认没有定位，支持style，className等固有属性。
 *
 * */


import './style/ButtonHollow.less';




class ButtonHollow extends React.Component {

    render() {

        let { disable, children, onClick, style, className } = this.props;

        className = className || '';
        style = style || {};

        return <div style={style} onClick={ disable ? '' : onClick } className={ disable ? `fr-base-button-hollow fr-base-button-disable ${className}` : `fr-base-button-hollow ${className}`}>
            { children }
        </div>
    }
}
export default ButtonHollow

