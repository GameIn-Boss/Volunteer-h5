/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from "react";
import autoBind from "react-autobind";
import classnames from "classnames";
// import "./ModalSy.css";
import QRCode from "qrcode";
import html2canvas from "html2canvas";
import { ImageToBase64 } from "../../utils/funcs";
import  fetch from "../../utils/fetch";
import { translate } from 'react-i18next';
class ModalSy extends React.Component {
  static propTypes = {
    

    visible: PropTypes.bool,
    maskCloseable: PropTypes.func,
    postData:PropTypes.shape({
      postImage: PropTypes.string,
      avatars: PropTypes.string,
      username: PropTypes.string,
      contentText: PropTypes.string,
      url: PropTypes.string,
      type:PropTypes.string
    }),
    
  };
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      qrcode: null,
    };
  }

  componentWillMount() {
    const that = this;
    this.createQrcode();
    if (this.props.postData.postImage && this.props.postData.avatars && this.props.postData.username && this.props.postData.contentText && this.props.postData.url) {
      ImageToBase64([`${this.props.postData.postImage}`, `${this.props.postData.avatars}`], ["/images/default_banner.png", "/images/my/register.png"], base64Array => {
          console.log('base64Array:::',base64Array.slice(0))
          that.setState(
            {
              contentText: this.props.postData.contentText,
              username: this.props.postData.username,
              base64Array: base64Array.slice(0)
            },
            () => {
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
    if (nextProps.postData.postImage && nextProps.postData.avatars && nextProps.postData.username && nextProps.postData.contentText && nextProps.postData.url) {
      ImageToBase64([`${nextProps.postData.postImage}`, `${nextProps.postData.avatars}`], ["/images/default_banner.png", "/images/my/register.png"], base64Array => {
          that.setState(
            {
              contentText: nextProps.postData.contentText,
              username: nextProps.postData.username,
              base64Array: base64Array.slice(0)
            },
            () => {
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
  var scale = 4;
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
  html2canvas(shareContent, opts).then(function (canvas) {
    var dataUrl = canvas.toDataURL("image/jpeg", 4);
    that.setState({ dataUrl });
  });
};


  componentWillUnmount() {}

  _closeModal() {
    this.props.maskCloseable();
    this.setState({
      dataUrl: null,
      qrcode: null,
    })
  }
  _clearEvent(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  createQrcode=(callback)=>{
    const that = this;
    let canvas = document.createElement("canvas");

    QRCode.toCanvas(
      canvas,
      `${this.props.postData.url}`,
      function(err) {
        if (!err) {
          // 证明生成了二维码（canvas） 然后把二维码转为图片
          let qrcodeURL = canvas.toDataURL("image/png");
          that.setState({ qrcodeURL });
          console.log('qrend')
          callback && callback(qrcodeURL);
        }
      }
    );
  }
 
  render() {
  const { t } = this.props;
    return <div className={classnames({
          visible: this.props.visible,
          hidden: !this.props.visible,
          "poster-modal-new": true
        })}>
        <div className="poster-modal-new-mask" />
        <div className="poster-modal-new-wrap" onClick={this._closeModal}>
            <div className="poster-modal-new-close-btn" onClick={()=>{this._closeModal()}}></div>
          <div className="poster-modal-new-wrap-container" onClick={this._clearEvent}>
            {this.state.dataUrl ? <div><img src={this.state.dataUrl}
             className="poster-modal-new-wrap-container-padding-image-sy" />
             <div style={{color:'#fff',textAlign:'center',fontSize:'12px',marginTop:'12px',fontWeight:'200'}}>
                {t('长按保存图片到手机')}</div> </div>: <div className="poster-modal-new-wrap-container-padding-sy" ref="LaunchContent">
                <div>
                  <div className="content">
                    <img className="project-img" src={this.state.base64Array && this.state.base64Array[0]} />
                    <div style={{ display: "flex", padding: "0 15px", height: "83px" }}>
                      <img className="user-avatars" src={this.state.base64Array && this.state.base64Array[1]} />
                      <div style={{ width: "100%" }}>
                        <div className="user-name">{this.state.username}</div>
                        <div className="poster-main">
                          <div className="poster-fonts">
                          {this.state.contentText}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ width: "288px", display: "flex" }}>
                    <img style={{ width: "48px", height: "48px" }} src={this.state.qrcodeURL} />
                    <div style={{ fontSize: "12px", transform: "scale(0.83)", paddingTop: "17px", color: "#fff",paddingLeft:"5px", textAlign: 'left' }}>
                      {/*{t('长按识别二维码 一起来做志愿者')}*/}
                      <div>{t('长按识别活动二维码')}</div>
                      <div>{t('成为三一公益同行者')}</div>
                    </div>
                  </div>
                </div>
              </div>}
              {this.state.dataUrl ? null : <div className="page-certificate-main-mask">
                 <img className="loading-img" src="/images/loadingimg.png" />
              </div>}
          </div>
        </div>
      </div>;
  }
}

export default translate('translations')(ModalSy);