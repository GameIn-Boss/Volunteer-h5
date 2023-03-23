/**
 * @file 我的证书
 */

/* global wx:false */
/* eslint  "class-methods-use-this":"off",
 */
import React, {PropTypes} from "react";
import autoBind from "react-autobind";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Star from "../../../components/star/star";
import {dateTextToDateText} from "../../../utils/funcs";
import {requestUserInfo} from "../../../stores/common";
import "./certificate.css";
import html2canvas from "html2canvas";
import {ImageToBase64} from "../../../utils/funcs";

class Certificate extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.BussinessInfo = window.orgInfo.name || "和众泽益志愿服务中心";
    this.certTitle = window.orgInfo.cert_title || "和众泽益";
    this.certOrg = window.orgInfo.cert_org || "和众泽益";
    this.certCachet = window.orgInfo.cert_cachet || "/images/my/zdx.png";
    this.certAuthOrg = window.orgInfo.cert_auth_org || "和众泽益志愿服务中心";
    const {user: listData} = props;
    const register = listData.regitser_time
      ? dateTextToDateText(
        listData.regitser_time ? listData.regitser_time.split(" ")[0] : 0
      )
      : null;

    const now = listData.server_time
      ? dateTextToDateText(
        listData.server_time ? listData.server_time.split(" ")[0] : 0
      )
      : null;

    this.state = {
      certCachet: this.certAuthOrg,
      dataUrl: null,
      register,
      now
    };
  }

  componentWillMount() {
    this.props.requestUserInfo();
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    const {user: listData} = this.props;
    const {user: NlistData} = nextProps;

    if (nextProps.user.id) {
      const register = NlistData.regitser_time
        ? dateTextToDateText(
          NlistData.regitser_time ? NlistData.regitser_time.split(" ")[0] : 0
        )
        : null;
      const now = NlistData.server_time
        ? dateTextToDateText(
          NlistData.server_time ? NlistData.server_time.split(" ")[0] : 0
        )
        : null;
      const that = this;
      ImageToBase64(
        [this.certCachet, nextProps.user.avatars],
        ["/images/my/zdx.png", "/images/my/register.png"],
        base64Array => {
          that.setState(
            {
              base64Array: base64Array.slice(0),
              register,
              now
            },
            () => {
              that.htm2Click();
            }
          );
        },
        0
      );
    }
  }

  componentWillUnmount() {
  }

  htm2Click = () => {
    var that = this;
    var shareContent = this.refs["LaunchContent"];
    var width = shareContent ? shareContent.offsetWidth : 0;
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
      that.setState({dataUrl});
    });
  };

  renderCertificate() {
    const {user: listData} = this.props;
    if (!listData) {
      return null;
    }
    const reward_time = (Number(listData.reward_time) + Number(listData.jinyun_timeSum || 0)/3600).toFixed(2);

    const starWidth = this.props.user.stars
      ? Number(this.props.user.stars) * Number(20) - Number(5) + "px"
      : null;
    return (
      <div className="page-certificate-bg">
        <div className="page-certificate-container-border" ref="LaunchContent">
          <h5 className="page-certificate-container-title">
            {this.certTitle}志愿服务证书
          </h5>
          <div>
            <img
              src={
                this.state.base64Array && this.state.base64Array[1] // src={this.state.people}
              }
              id="avatars"
              style={{
                display: "block",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                objectFit: "cover"
              }}
            />
          </div>

          <div className="page-certificate-container-certificate"/>
          <div className="page-certificate-container-name">
            {this.props.user.real_name}
          </div>

          {this.props.user.stars ? (
            <div
              className="page-certificate-container-star"
              style={{width: `${starWidth}`}}
            >
              <Star
                size={{width: 15, height: 14, score: this.props.user.stars}}
              />
            </div>
          ) : null}

            {
              window.orgCode !==  'QJ0dNk6eLO'? (
                <div className="page-certificate-container-content">
                证书编号：{this.props.user.identifier}
              </div>
              ) : 
              <div className="page-certificate-container-content">
              {/* 证书编号：{this.props.user.identifier} */}
            </div>
            }
        
      
          {
              window.orgCode !==  'QJ0dNk6eLO'? (
                <div className="page-certificate-container-content">
                {this.state.register}注册成为{this.certOrg}志愿者
              </div>
              ) : 
              <div className="page-certificate-container-content">
              {/* 注册成为{this.certOrg}志愿者 */}
            </div>
            }
        

          <div className="page-certificate-container-hours-box">
            <div className="page-certificate-container-hours">
              <div className="page-certificate-container-hours-item">
                <span>{this.props.user.join_project_count}</span>个
              </div>
              <div className="page-certificate-container-hours-item">
                志愿服务项目
              </div>
            </div>
            <div className="page-certificate-container-hours">
              <div className="page-certificate-container-hours-item">
                <span>{reward_time}</span>小时
              </div>
              <div className="page-certificate-container-hours-item">
                志愿服务时长
              </div>
            </div>
          </div>
          <div className="page-certificate-container-bottom-infobox">
            <div className="page-certificate-container-bussiness">
              认证机构：{this.certAuthOrg}
            </div>
            {
              window.orgCode !== 'LYqaQWldnj' && window.orgCode !==  'QJ0dNk6eLO'? (
                <div className="page-certificate-container-teachsupport">
                  技术支持：志多星
                </div>
              ) : null
            }
            <div
              className="page-certificate-container-content"
              style={{paddingLeft: 0, paddingRight: 0, textAlign: "right"}}
            >
              {this.state.now}
            </div>
            {/* {this.state.certCachet ? (
              <img
                src={this.state.base64Array && this.state.base64Array[0]}
                alt=""
                className="first"
              />
            ) : (
              <div/>
            )} */}
            {window.orgCode == "qM7e5Ba2vp" ? (
              <img src="/images/my/zdx.png" className="second"/>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {user: listData} = this.props;
    const {dataUrl} = this.state;
    if (!listData || !listData.id) {
      return null;
    }
    return (
      <div
        style={{
          position: "absolute",
          left: "0",
          top: "0",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {dataUrl ? (
          <img
            style={{
              width: "357px",
              display: "block",
              position: "relative",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              margin: "auto"
            }}
            src={`${this.state.dataUrl}`}
          />
        ) : (
          <div className="page-certificate-main-container">
            {/** TODO: */}
            {this.renderCertificate()}
          </div>
        )}
        {dataUrl ? null : (
          <div className="page-certificate-main-mask">
            <img className="loading-img" src="/images/loadingimg.png"/>
          </div>
        )}
      </div>
    );
  }
}

Certificate.title = `我的证书`;

Certificate.propTypes = {
  requestUserInfo: PropTypes.func,
  user: PropTypes.shape({
    token: PropTypes.string,
    id: PropTypes.number,
    join_project_count: PropTypes.number,
    username: PropTypes.string,
    phone: PropTypes.string,
    avatars: PropTypes.string,
    real_name: PropTypes.string,
    nation: PropTypes.string,
    sex: PropTypes.number,
    isLogin: PropTypes.bool,
    birthday: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    identifier: PropTypes.string,
    slogan: PropTypes.string,
    reward_time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    id_number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    province_id: PropTypes.number,
    province_name: PropTypes.string,
    city_id: PropTypes.number,
    city_name: PropTypes.string,
    county_id: PropTypes.number,
    county_name: PropTypes.string,
    addr: PropTypes.string,
    family_id: PropTypes.number,
    join_family_time: PropTypes.string,
    good_at: PropTypes.arrayOf(PropTypes.shape({}))
  })
};

export default connect(
  state => ({user: state.user}),
  dispatch => bindActionCreators({requestUserInfo}, dispatch)
)(Certificate);
