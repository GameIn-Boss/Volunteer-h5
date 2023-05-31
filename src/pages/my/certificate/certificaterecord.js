/**
 * @file 我的证书
 */

/* global wx:false */
/* eslint  "class-methods-use-this":"off",
 */
import React, { PropTypes } from "react";
import autoBind from "react-autobind";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Link from "../../../components/link/link";
import Avatar from "../../../components/avatar/avatar";
import Star from "../../../components/star/star";
import { dateTextToDateText } from "../../../utils/funcs";
import { certificateInfo } from "../../../stores/common";
import "./certificaterecord.css";
import { Dialog } from "react-weui";
import "weui/dist/style/weui.css";
import "react-weui/build/packages/react-weui.css";

import history from "../../history";
import html2canvas from "html2canvas";
import { ImageToBase64 } from "../../../utils/funcs";
import { translate } from 'react-i18next';
import i18next from 'i18next';
import queryString from 'query-string';

class Certificate extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
   
        this.BussinessInfo = window.orgInfo.name || "和众泽益志愿服务中心";
        this.certTitle = window.orgInfo.cert_title || "和众泽益";
        this.certOrg = window.orgInfo.cert_org || "和众泽益";
        this.certCachet = window.orgInfo.cert_cachet || "/images/my/zdx.png";
        this.certAuthOrg = window.orgInfo.cert_auth_org || "和众泽益志愿服务中心";
        const { user: listData } = props;
        this.dialog = {
            title:'驳回原因',
            buttons: [
                {
                    type: "default",
                    label: '我知道了',
                    onClick: () => this.setState({ ...this.state, showDialog: false })
                }
            ]
        };
        const params = queryString.parse(location.search);
        this.CertificateId = params.id;
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
            now,     
            visible: false,
            actionSheet: false,
            actions: [
                {
                    label: '我知道了',
                    onClick: this.hide
                }
            ],
            dialogType: true,
            showDialog: true
        };
    }
    hide() {
        this.setState({ actionSheet: false });
    }
    componentWillMount() {
        const params = queryString.parse(location.search);
        this.CertificateId = params.id;
        console.log(this.CertificateId)
        this.props.certificateInfo(this.CertificateId);
    }

    componentDidMount() { }

    componentWillReceiveProps(nextProps) {
        const { user: listData } = this.props;
        const { user: NlistData } = nextProps;

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
            this.createBase64BgImage(() => {
                ImageToBase64(
                    [this.certCachet, nextProps.user.avatars],
                    ["/images/my/zdx.png", "/images/my/touxiangBMW.png"],
                    base64Array => {
                        console.info(base64Array);
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
                );
            })

        }
    }

    createBase64BgImage = (callback) => {
        var that = this;
        var shareContent = this.refs["bgImage"];
        var width = shareContent.offsetWidth;
        var height = shareContent.offsetHeight;
        var canvas = document.createElement("canvas");
        var scale = 4;
        canvas.width = width * scale;
        canvas.height = height * scale;
        canvas.getContext("2d").scale(scale, scale);
        var opts = {
            scale: scale,
            dpi: 300,
            canvas: canvas,
            width: width,
            height: height,
            useCORS: true
        };
        html2canvas(shareContent, opts).then(function (canvas) {
            var dataUrl = canvas.toDataURL("image/jpeg", 4);
            console.info(dataUrl);
            that.setState({ bgImage: dataUrl });
            callback && callback()
        });
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
            dpi: 300,
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
    //  authadd(){
    //     console.log(1)
    //     this.props.authaddAction();

        
    //   }
    renderCertificate() {
        const { user: listData } = this.props;
        if (!listData) {
            return null;
        }

        const starWidth = this.props.user.stars
            ? Number(this.props.user.stars) * Number(20) - Number(5) + "px"
            : null;
        return (
            <div className="page-certificate-bg">
                <div className="page-certificate-container-border" ref="LaunchContent">
                    <img src={this.state.bgImage || '/images/my/certificationauth.png'} className='page-certificate-bg-img' ref="bgImage"></img>
                    {/* <div className="page-certificate-container-content-certnumber">
            编号：<span>{this.props.user.identifier}</span>
          </div> */}
                    {/* <div className="page-certificate-container-content-title">
            证书
          </div> */}
                    <div className="page-certificate-container-content-avatar">
                        <img
                            src={
                                this.state.base64Array && this.state.base64Array[1] // src={this.state.people}
                            }
                            id="avatars"
                            style={{
                                display: "block",
                                width: "70px",
                                height: "70px",
                                // borderRadius: "50%",
                                objectFit: "cover"
                            }}
                        />
                              <div className="page-certificate-container-content-username">
                             <span>{this.props.user.real_name}</span>
                            </div>
                             <div className="page-certificate-container-content-idnumber">
                             <span>{this.props.user.id_number}</span>
                            </div>
                            <div className="page-certificate-container-content-numtype">
                            <span>
                            {this.props.user.num_type == 0 ? '身份证' : ''}
                            {this.props.user.num_type == 1 ? '身份证' : ''}
                            {this.props.user.num_type == 2 ? '香港' : ''}
                            {this.props.user.num_type == 3 ? '澳门' : ''}
                            {this.props.user.num_type == 4 ? '台湾' : ''}
                            {this.props.user.num_type == 5 ? '护照' : ''}
                            </span>
                            </div>
                            {this.props.user.verify_status == 1 ? 
                            <img
                            src='/images/my/zdx.png'
                            style={{
                                marginTop:"150px",
                                marginLeft:"50px",
                                width: "120px",
                                height: "120px",
                            }}                        />
                            : ''}
                                <div className="page-certificate-container-content-identifier">
                             <span>{this.props.user.identifier}</span>
                            </div>
                            {/* <div className="page-certificate-container-content-idnumber">
                             <span>{this.props.user.id_number}</span>
                            </div> */}
                    </div>
                   
                    {this.props.user.stars ? (
                        <div
                            className="page-certificate-container-star"
                            style={{ width: `${starWidth}` }}
                        >
                            <Star
                                size={{ width: 15, height: 14, score: this.props.user.stars }}
                            />
                        </div>
                    ) : null}
                    <div className="page-certificate-container-content-register">
                        {this.state.identifier}
                    </div>
                    <div className="page-certificate-container-projects">
                        {this.props.user.project_count}
                    </div>
                    <div className="page-certificate-container-hours">
                        {`${this.props.user.reward_time}`.length > 5 ? `${this.props.user.reward_time}`.split('.')[0] : `${this.props.user.reward_time}`}
                    </div>

                    <div className="page-certificate-container-year">
                    {this.props.user.year}
                    </div>
                    <div className="page-certificate-container-month">
                    {this.props.user.mouth}
                    </div>
                    <div className="page-certificate-container-day">
                    {this.props.user.day}
                    </div>
                </div>
                {this.props.user.verify_status == 2 ? 
                <Dialog
                        type="ios"
                        title='驳回原因'
                        buttons={this.dialog.buttons}
                        show= {this.state.showDialog}
                        >
                    {this.props.user.verify_msg}

                </Dialog>
            : null}
            </div>
            
        );
  
    }



    render() {
        const { user: listData, i18n } = this.props;
        const { language } = i18n;
        const { dataUrl } = this.state;
        if (!listData || !listData.id) {
            return null;
        }
        console.log(listData);
        console.log( this.props.certificateInfo)

        // return <div className="page-certificate-main-container">
        //     {this.renderCertificate()}
        // </div>;
        return (
            <div>
                <div
                    style={{
                        // position: "absolute",
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
                            {this.renderCertificate()}
                        </div>
                    )}
                    {dataUrl ? null : (
                        <div className="page-certificate-main-mask">
                            <img className="loading-img" src="/images/loadingimg.png" />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

Certificate.title = i18next.t('我的证书');

Certificate.propTypes = {
    certificateInfo: PropTypes.shape({
     
        real_name: PropTypes.string,

    }),
    user: PropTypes.shape({
        token: PropTypes.string,
        id: PropTypes.number,
        join_project_count: PropTypes.number,
        username: PropTypes.string,
        phone: PropTypes.string,
        avatars: PropTypes.string,
        real_name: PropTypes.string,
        nation: PropTypes.string,
        project_count: PropTypes.number,
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
    state => ({ user: state.user }),
    dispatch => bindActionCreators({ certificateInfo }, dispatch)

)(translate('translations')(Certificate));
