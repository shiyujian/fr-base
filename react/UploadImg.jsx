import { compress } from "fr-base/script/others"



/**
 *  tag 上传图片的唯一标记
 *  inputStyle 输入框样式
 *  containerStyle 父级样式
 * 
 *  使用格式： <UploadImg tag="headimg" onChange={(v) => {console.log(v)}} style={{ position: "absolute" }} />
 * 
 *  onChange方法中可以得到图片base64格式、压缩过的base64、图片文件后缀
 */
class UploadImg extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleUpload = this.handleUpload.bind(this);
        this.state = {

        }
    }

    compressImg(thisImg) {
        let newImg = compress(thisImg, 50);
        let resultbk = newImg.newImageData.replace('data:image/png;base64,', '');
        resultbk = resultbk.replace('data:image/jpeg;base64,', '');
        resultbk = resultbk.replace('data:image/jpg;base64,', '');
        resultbk = resultbk.replace('data:image/png;base64,', '');
        return resultbk
    }

    handleUpload(e) {
        const { tag, onChange } = this.props;
        let file = e.target["files"][0];
        let _this = this;
        let reader = new FileReader();
        let index = file.type.indexOf("/");
        let suffix = file.type.substring(index+1);
        reader.readAsDataURL(file);
        reader.onload = function(e) {
            const img_base64 = this.result;
            _this.setState({
                [tag+"_url"]: img_base64
            }, () => {
                const imgDom = document.getElementById(tag);
                imgDom.onload = () => {
                    const img_comp_base64 = _this.compressImg(document.getElementById(tag));
                    let info = {
                        img_base64: img_base64,
                        img_comp_base64: img_comp_base64,
                        suffix: suffix,
                    }
                    onChange(info);
                }
            })
        }
    }

    render() {
        const { tag, onFocus, inputStyle, containerStyle } = this.props;
        return (
            <div style={containerStyle ? containerStyle : {}}>
                <img style={{ display: "none" }} src={this.state[tag+"_url"]} id={tag} />
                <input onChange={this.handleUpload} onFocus={() => { onFocus ? onFocus : "" }} type="file" style={inputStyle ? inputStyle : {}} />
            </div>
        )
    }
}

export default UploadImg;
