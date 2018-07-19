

import './style/InputAutoComplete.less'
/*
const getData = new Promise(function (resolve, reject) {

    setTimeout(() => {
        resolve(autoArr1)
    }, 200)

});

class StrategyBuild extends React.Component {

    constructor() {
        super();
        this.state = {
            autoArr: []
        }
    }


    changeInput(val) {
        console.log(val);
        getData.then((res) => {
            this.setState({
                autoArr: res
            })
        });


    }


    render() {

        const {autoArr} = this.state;

        return <div>
            自动填充
            <InputAutoComplete
                onChange={this.changeInput.bind(this)}
                onClickItem={(item) => console.log(item)}
                onClear={() => {this.setState({autoArr:[]})}}
                autoArr={autoArr}
                settings={{
                    changeTimeDelay: 0,
                    hasDelete: true
                }}

                id="abc"

            />
        </div>
    }
}

export default StrategyBuild
*/


let timeout;
class InputAutoComplete extends React.Component {

    /*
     *
     * onClickItem: 点击某个条目的回调 入参为条目数组index
     * onChange: 输入框变化的回调
     * autoArr: 自动填充的数组
     * settings: 其它设置
     *
     * */


    render() {

        const {autoArr, onChange, onClickItem, settings, onClear, childDom} = this.props;

        const {changeTimeDelay, hasDelete} = settings || {};

        return <div className="input-auto-complete">

            <div className="input-container">
                <input {...this.props} ref="thisInput" onChange={(e) => {
                    const val = e.target.value;
                    if (changeTimeDelay && changeTimeDelay > 0) {
                        window.clearTimeout(timeout);
                        timeout = setTimeout(() => {
                            onChange && onChange(val);
                        }, changeTimeDelay)
                    } else {
                        onChange && onChange(val);
                    }

                } }/>

                {
                    hasDelete ? <p className="icon" onClick={() => { this.refs['thisInput'].value = '';  onChange && onChange(); onClear && onClear() }}>
                        <i className="icon-base">&#xe63f;</i>
                    </p> : ''
                }

                { childDom }

            </div>


            {
                autoArr.map((item, index) => {
                    return <p className="item" onClick={() => {
                        onClickItem && onClickItem(index);
                        this.refs['thisInput'].value = item
                    }}>{item}</p>
                })
            }
        </div>
    }
}

InputAutoComplete.propTypes = {
    onChange: window.PropTypes.func.isRequired,
    onClickItem: window.PropTypes.func.isRequired,
    onClear: window.PropTypes.func.isRequired,
    settings: window.PropTypes.object.isRequired,
    autoArr: window.PropTypes.array.isRequired,

};

export default InputAutoComplete



