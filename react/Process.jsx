/*
 *
 * 流程组件 接收一个数组
 *
 * */


import './style/Process.less';


class Process extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            textArr: [
                {name: '待审核', icon: <i className="icon-base">&#xe619;</i>},
                {name: '审核中', icon: <i className="icon-base">&#xe619;</i>},
                {name: '待签约', icon: <i className="icon-base">&#xe619;</i>},
                {name: '待放款', icon: <i className="icon-base">&#xe619;</i>},
                {name: '已放款', icon: <i className="icon-base">&#xe619;</i>},
            ],
            activeNum: 4
        }
    }


    getWidth() {
        const {textArr, activeNum} = this.props;
        const elementNum = 2 * (textArr.length - 1);

        /*色值active的宽带*/

        return (1 + 2 * activeNum)/elementNum * 100


    }


    render() {
        const { textArr, activeNum } = this.props;

        return <div className="fr-base-process">

            <div className="text-box">

                { textArr.map((item, index) => {

                    return <div className={index > activeNum ? 'text-box-item' : 'text-box-item text-box-item-active'}>
                        <p className="item-icon">{item.icon}</p>
                        <p className="item-name">{item.name}</p>
                    </div>;

                })}
            </div>



            <div className="process-line">
                <div style={{width: `${this.getWidth()}%`}}></div>
            </div>

        </div>
    }
}
export default Process

