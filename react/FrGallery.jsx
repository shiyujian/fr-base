import './FrGallery.less';
let startTouchClientX = 0, itemWidth = 0;

/*
 *  使用格式 <FrGallery playTime={1000} autoPlay={true} items={items}/>
 */

/*const items = [{
 onClick: function () {
 console.log(1)
 },
 img: 'https://mifengkongdemo.oss-cn-shenzhen.aliyuncs.com/fr_public_666610/10_c8028fef99b5da93dde1da01d3ed5f01.png',
 }, {
 onClick: function () {
 console.log(2)
 },
 img: 'http://mifengkongdemo.oss-cn-shenzhen.aliyuncs.com/fr_public_666610/10_836c65f04a701aadd935a07f6fc79df4.png',
 }];*/

let Time = '';

const SIZE_REPEAT = 8;

class FrGallery extends React.Component {

    constructor(props) {
        super(props);
        const {items} = this.props;


        const renderItems = this.repeat(items);

        this.itemLength = renderItems.length;
        this.resetIndex = SIZE_REPEAT * items.length;
        this.changeIndex = this.changeIndex.bind(this);
        this.state = {
            renderItems: renderItems,
            currentTargetIndex: this.resetIndex,
            rightTrans: 0,
            touchMoving: false,
        }
    }


    componentDidMount() {
        itemWidth = this.refs['fr-gallery']['clientWidth'];
        this.props.autoPlay && this.autoPlay();
    }


    autoPlay() {
        const {playTime} = this.props;

        Time = setInterval(() => {
            const {currentTargetIndex} = this.state;

            this.changeIndex(currentTargetIndex + 1 < this.itemLength ? currentTargetIndex + 1 : 0);

        }, playTime || 3000)
    }

    touchMove() {
        this.setState({
            rightTrans: (startTouchClientX - event.touches[0]['clientX'] ) / itemWidth
        })
    }

    touchStart() {
        //console.log(event.touches[0])
        //console.log('1')
        clearInterval(Time);
        this.setState({
            touchMoving: true
        });
        startTouchClientX = event.touches[0]['clientX'];
    }

    touchEnd() {
        this.autoPlay();
        const {rightTrans} = this.state;
        this.setState({
            rightTrans: 0,
            touchMoving: false
        });


        if (Math.abs(rightTrans) > 0.2) {
            const {currentTargetIndex} = this.state;
            let nextIndex;
            if (rightTrans > 0) {
                /*←←←←←*/
                nextIndex = currentTargetIndex + 1 < this.itemLength ? currentTargetIndex + 1 : currentTargetIndex
            } else {
                nextIndex = currentTargetIndex - 1 < 0 ? currentTargetIndex : currentTargetIndex - 1
            }
            this.changeIndex(nextIndex)
        }
    }


    changeIndex(index) {


        this.setState({
            currentTargetIndex: index
        });

        this.props.onChange && this.props.onChange(index % this.props.items.length)
    }


    repeat(arr) {
        let midArr = arr;
        for (let i = 1; i < SIZE_REPEAT; i++) {
            midArr = midArr.concat(arr);
            midArr = midArr.concat(arr);
        }
        return midArr
    }

    render() {

        const {currentTargetIndex, rightTrans, touchMoving, renderItems} = this.state;

        const {items, style} = this.props;


        const touchMovingClass = touchMoving ? '' : 'not-touch-moving';

        let styles = style || {};

        return <div style={{width: "100%"}}>

            <div ref='fr-gallery' className="fr-gallery" style={style}>

                <div className="gallery-book">
                    {
                        renderItems.map((item, index) => {

                            switch (index) {
                                case currentTargetIndex - 1:
                                    return <div
                                        className={`gallery-item left-item ${touchMovingClass}`}
                                        style={item.children ? {transform: `translateX(${-100 - rightTrans * 100}%)`} : {
                                            backgroundImage: 'url(' + item.img + ')',
                                            transform: `translateX(${-100 - rightTrans * 100}%)`
                                        }}>
                                        { item.children ? item.children : ''}
                                    </div>;


                                case currentTargetIndex:
                                    return <div
                                        onClick={ item.onClick }
                                        onTouchEnd={this.touchEnd.bind(this)}
                                        onTouchStart={this.touchStart.bind(this)}
                                        onTouchMove={this.touchMove.bind(this)}
                                        className={`gallery-item middle-item ${touchMovingClass}`}

                                        style={ item.children ? {
                                            zIndex: 1000,
                                            transform: `translateX(${-rightTrans * 100}%)`
                                        } : {
                                            zIndex: 1000,
                                            backgroundImage: 'url(' + item.img + ')',
                                            transform: `translateX(${-rightTrans * 100}%)`
                                        }}>
                                        { item.children ? item.children : ''}

                                    </div>;


                                case currentTargetIndex + 1:
                                    return <div
                                        className={`gallery-item right-item ${touchMovingClass}`}
                                        style={ item.children ? {
                                            transform: `translateX(${100 - rightTrans * 100}%)`
                                        } : {
                                            backgroundImage: 'url(' + item.img + ')',
                                            transform: `translateX(${100 - rightTrans * 100}%)`
                                        }}>
                                        { item.children ? item.children : ''}
                                    </div>;
                                default:
                                    return ''
                            }


                        })
                    }
                </div>


            </div>


        </div>
    }
}
export default FrGallery


