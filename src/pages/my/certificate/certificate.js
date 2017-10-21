/**
 * @file 我的证书
 */

/* global wx:false */
/* eslint  "class-methods-use-this":"off",
 */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Dialog } from 'react-weui';
import 'weui/dist/style/weui.css';
import 'react-weui/build/packages/react-weui.css';

import history from '../../history';
import Avatar from '../../../components/avatar/avatar';
import { requestUserInfo } from '../../../stores/common';
import './certificate.css';


function year(data) {
  return data.split('-');
}
class Certificate extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.BussinessInfo = window.orgInfo.title || '和众泽益志愿者服务中心';
    const { user: listData } = this.props;
    const registerTime = listData.regitser_time;
    const nowTime = listData.server_time;
    const registerArr = year(registerTime);
    const nowArr = year(nowTime);
    const registerDay = registerArr[2].split(' ');
    const nowDay = nowArr[2].split(' ');

    this.state = {
      registerArr,
      nowArr,
      registerDay,
      nowDay,
    };
  }


  componentWillMount() {
    this.props.requestUserInfo();
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {

  }

  componentWillUnmount() {}
  // popToast() {
  //   this.setState({ ...this.state, showDialog: true });
  // }
  initialization() {
    return () => {
      const { user: { isLogin, id_number: idNumber } } = this.props;


      if (isLogin && !idNumber) {
        this.setState({ ...this.state, showDialog: true });
      } else {
        this.renderCertificate();
      }
    };
  }
  renderCertificate() {
    const { user: listData } = this.props;
    if (listData == null) {
      return <div>加载中</div>;
    }


    return (
      <div className="page-certificate-bg">
        <div className="page-certificate-container-border">
          <h5 className="page-certificate-container-title">志多星注册志愿服务证书</h5>
          <Avatar src={this.props.user.avatars} size={{ width: 80 }} defaultSrc="/images/my/register.png" />
          <div className="page-certificate-container-certificate" />
          <div className="page-certificate-container-name">{this.props.user.real_name}</div>
          <div className="page-certificate-container-content">证书编号：{this.props.user.identifier}</div>
          <div className="page-certificate-container-content">{this.state.registerArr[0]}年{this.state.registerArr[1]}月{this.state.registerDay[0]}日注册成为志多星志愿者</div>
          <div className="page-certificate-container-content">
            {this.state.nowArr[0]}年{this.state.nowArr[1]}月{this.state.nowDay[0]}日
          截止</div>
          <div className="page-certificate-container-hours-box">
            <div className="page-certificate-container-hours">
              <div className="page-certificate-container-hours-item"><span>{this.props.user.join_project_count}</span>次</div>
              <div className="page-certificate-container-hours-item">累计服务次数</div>
            </div>
            <div className="page-certificate-container-hours">
              <div className="page-certificate-container-hours-item"><span>{this.props.user.reward_time}</span>小时</div>
              <div className="page-certificate-container-hours-item">累计服务时长</div>
            </div>
          </div>
          <div className="page-certificate-container-bussiness">  认证机构：{this.BussinessInfo}</div>
        </div>
      </div>
    );
  }

  // { !this.props.user.id_number ? this.renderCertificate() : this.popToast()}
  // {this.popToast()}
  //
    // this.setState({ ...this.state, showDialog: true });
  render() {
    const { user: listData } = this.props;
    if (listData == null) {
      return <div>加载中</div>;
    }
    return (
      <div className="page-certificate-main-container">
        {/** TODO: */}
        {this.renderCertificate()}
      </div>
    );
  }
}


Certificate.title = '我的证书';

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
    birthday: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    identifier: PropTypes.string,
    slogan: PropTypes.string,
    reward_time: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    id_number: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    province_id: PropTypes.number,
    province_name: PropTypes.string,
    city_id: PropTypes.number,
    city_name: PropTypes.string,
    county_id: PropTypes.number,
    county_name: PropTypes.string,
    addr: PropTypes.string,
    family_id: PropTypes.number,
    join_family_time: PropTypes.string,
    good_at: PropTypes.arrayOf(PropTypes.shape({

    })),
  }),
};

export default connect(
  state => ({ user: state.user }),
  dispatch => bindActionCreators({ requestUserInfo }, dispatch),
)(Certificate);
