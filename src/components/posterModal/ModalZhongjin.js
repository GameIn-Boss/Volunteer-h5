/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from "react";
import autoBind from "react-autobind";
import classnames from "classnames";
import "./ModalNew.css";
import html2canvas from "html2canvas";
import { ImageToBase64 } from "../../utils/funcs";
import fetch from "../../utils/fetch";
import { translate } from 'react-i18next';
import moment from "moment";
class ModalNew extends React.Component {
    static propTypes = {


        visible: PropTypes.bool,
        maskCloseable: PropTypes.func,
        postData: PropTypes.shape({
            postImage: PropTypes.string,
            avatars: PropTypes.string,
            username: PropTypes.string,
            contentText: PropTypes.string,
            url: PropTypes.string,
            type: PropTypes.string
        }),

    };
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            dataUrl: null,
        };
    }

    componentWillMount() {
        const that = this;
        if (this.props.postData.postImage && this.props.postData.avatars && this.props.postData.username) {
            ImageToBase64([`${this.props.postData.postImage}`, `${this.props.postData.avatars}`], ["/images/default_banner.png", "/images/my/register.png"], base64Array => {
                console.log('base64Array:::', base64Array.slice(0))
                console.info('走到A点')
                that.setState(
                    {
                        base64Array: base64Array.slice(0)
                    },
                    () => {
                        console.info('走到B点')
                        that.htm2Click();
                    }
                );
            }, 0);
        }
    }

    componentDidMount() {
        if (this.props.postData.type === 'Project' || this.props.postData.type === 'Team' || this.props.postData.type === 'ProjectSign') {
            fetch("/index/share", { method: "GET" });
        }
    }


    componentWillReceiveProps(nextProps) {
        const that = this;
        if (nextProps.postData.postImage && nextProps.postData.avatars && nextProps.postData.username) {
            ImageToBase64([`${nextProps.postData.postImage}`, `${nextProps.postData.avatars}`], ["/images/default_banner.png", "/images/my/register.png"], base64Array => {
                console.info('走到A点')
                that.setState(
                    {
                        base64Array: base64Array.slice(0)
                    },
                    () => {
                        console.info('走到B点')
                        that.htm2Click();
                    }
                );
            }, 0);
        }
    }

    htm2Click = () => {
        var that = this;
        var shareContent = this.refs["LaunchContent"];
        var width = shareContent.offsetWidth;
        var height = shareContent.offsetHeight;
        var canvas = document.createElement("canvas");
        var scale = 8;
        canvas.width = width * scale;
        canvas.height = height * scale;
        canvas.getContext("2d").scale(scale, scale);
        var opts = {
            scale: scale,
            canvas: canvas,
            width: width,
            height: height,
            useCORS: true
        };
        console.info('走到C点')
        html2canvas(shareContent, opts).then(function (canvas) {
            console.info('走到D点')
            var dataUrl = canvas.toDataURL("image/jpeg", 4);
            that.setState({ dataUrl });
        });
    };


    componentWillUnmount() {
        this._closeModal();
    }

    _closeModal() {
        this.props.maskCloseable();
        this.setState({
            dataUrl: null,
        })
    }

    _clearEvent(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    renderOriginHtml() {
        return <div className="poster-modal-new-wrap-container-padding-zhongjin" ref="LaunchContent">
            <img src={'/images/modalzhongjin-background.png'} className='page-certificate-bg-img' ref="bgImage"></img>
            <div className="page-certificate-container-subTitle">
                中金公益志愿者
            </div>
            <div className="page-certificate-container-title">
                {this.props.postData.username}
            </div>
            <div className="page-certificate-container-avatar">
                <img
                    src='/images/my/register.png'
                    src={
                        this.state.base64Array && this.state.base64Array[1] // src={this.state.people}
                    }
                    id="avatars"
                />
            </div>
            <div className="page-certificate-container-postImage">
                <img
                    src='http://api.volzdx.cn/images/uploads/2021-11/707471636428672.jpeg'
                    src={
                        this.state.base64Array && this.state.base64Array[0] // src={this.state.people}
                    }
                    id="postImage"
                    style={{
                        display: "block",
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                        objectFit: "cover"
                    }}
                />
            </div>

            <div className="page-certificate-container-content">
                感谢您参与<span style={{ color: '#6B0D0E' }}>“{this.props.postData.projectName}”</span>志愿活动，践行志愿者服务精神，奉献、互助、友爱、进步。特颁此证！
            </div>
            <div className="page-certificate-container-footer">
                <div>中金公益基金会</div>
                <div>{moment().format('YYYY年MM月DD日')}</div>
            </div>
        </div>
    }

    render() {
        const { t } = this.props;
        // return <div className={classnames({
        //     visible: this.props.visible,
        //     hidden: !this.props.visible,
        //     "poster-modal-new": true
        // })}>
        //     <div className="poster-modal-new-mask" />
        //     <div className="poster-modal-new-wrap" onClick={this._closeModal}>
        //         <div className="poster-modal-new-close-btn" onClick={() => { this._closeModal() }}></div>
        //         <div className="poster-modal-new-wrap-container" onClick={this._clearEvent}>
        //             {this.renderOriginHtml()}
        //         </div>
        //     </div>
        // </div>
        return <div className={classnames({
            visible: this.props.visible,
            hidden: !this.props.visible,
            "poster-modal-new": true
        })}>
            <div className="poster-modal-new-mask" />
            <div className="poster-modal-new-wrap" onClick={this._closeModal}>
                <div className="poster-modal-new-close-btn" onClick={() => { this._closeModal() }}></div>
                <div className="poster-modal-new-wrap-container" onClick={this._clearEvent}>
                    {this.state.dataUrl ?
                        <div>
                            <img src={this.state.dataUrl || undefined} className="poster-modal-new-wrap-container-padding-image-zhongjin" />
                            <div style={{ color: '#fff', textAlign: 'center', fontSize: '12px', marginTop: '12px', fontWeight: '200' }}>
                                {t('长按保存图片到手机')}
                            </div>
                        </div>
                        :
                        this.renderOriginHtml()
                    }
                    {this.state.dataUrl ?
                        null
                        :
                        <div className="page-certificate-main-mask">
                            <img className="loading-img" src="/images/loadingimg.png" />
                        </div>
                    }
                </div>
            </div>
        </div>;
    }
}

export default translate('translations')(ModalNew);
