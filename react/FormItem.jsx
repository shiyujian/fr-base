
import './style/FormItem.less';

class  FormItem extends  React.Component {

    render() {

        const { title, children, noBorder } = this.props;

        return <div className="form-item">
            <div className={noBorder ? 'form-item-content animated-fade-in': 'form-item-content border-bottom animated-fade-in'}>

                <p className="form-title">{title}</p>

                <p className="form-content">{children}</p>
            </div>
        </div>
    }
}


export default FormItem