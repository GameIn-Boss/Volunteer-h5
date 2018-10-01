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


import Avatar from '../../../components/avatar/avatar';
import Star from '../../../components/star/star';
import { dateTextToDateText } from '../../../utils/funcs';
import {
  requestSearch,
} from '../../platfrom/information/index.store';
import './certificate.css';

class Certificate extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.Id = props.route.params.Id;
    this.BussinessInfo = window.platformInfo.name || '和众泽益志愿服务中心';
    this.certTitle = window.platformInfo.cert_title || '和众泽益';
    this.certOrg = window.platformInfo.cert_org || '和众泽益';
    this.certCachet = window.platformInfo.cert_cachet || '/images/my/zdx.png';
    this.certAuthOrg = window.platformInfo.cert_auth_org || '和众泽益志愿服务中心';
    this.state = {
      register:'',
      now:'',
    };
  }


  componentWillMount() {
    const id_number = this.Id;
    this.props.requestSearch({ id_number })
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    // volunteer_info
    if(this.props.user.fetching && !this.props.user.failed && !nextProps.user.fetching && !nextProps.user.failed){

      if (nextProps.user && nextProps.user.data && nextProps.user.data.volunteer_info && nextProps.user.data.volunteer_info.id_number) {
        console.log(nextProps.user.data.volunteer_info)
        const data =nextProps.user.data.volunteer_info;
        const register = data.regitser_time ? dateTextToDateText(data.regitser_time ? data.regitser_time.split(' ')[0] : 0) : '';
  
        const now = data.server_time ? dateTextToDateText(data.server_time ? data.server_time.split(' ')[0] : 0) : '';
        this.setState({
          ...this.state,
          register,
          now,
        });
      }
    }
  }

  componentWillUnmount() { }

  renderCertificate() {
    const { user: {data:{volunteer_info:listData}} } = this.props;
    if (!listData) {
      return null;
    }
    const starWidth =  listData.stars ?Number(listData.stars) * Number(20) - Number(5) + 'px':null;
    return (
      <div className="page-certificate-bg">
        <div className="page-certificate-container-border">
          <h5 className="page-certificate-container-title">{this.certTitle}志愿服务证书</h5>
          <Avatar src={listData.avatars} size={{ width: 80 }} defaultSrc="/images/my/register.png" />
          <div className="page-certificate-container-certificate" />
          <div className="page-certificate-container-name">{listData.real_name}</div>
          {
            listData.stars ?
              <div className="page-certificate-container-star" style={{ width: `${starWidth}` }}>
                <Star size={{ width: 15, height: 14, score: listData.stars }} />
              </div>
              : null
          }

           <div className="page-certificate-container-content">证书编号：{listData.identifier}</div>
          <div className="page-certificate-container-content">{this.state.register}注册成为{this.certOrg}志愿者</div>
          <div className="page-certificate-container-content">{this.state.now}截止</div>
          <div className="page-certificate-container-hours-box">
            <div className="page-certificate-container-hours">
              <div className="page-certificate-container-hours-item"><span>{listData.join_project_count}</span>个</div>
              <div className="page-certificate-container-hours-item">志愿服务项目</div>
            </div>
            <div className="page-certificate-container-hours">
              <div className="page-certificate-container-hours-item"><span>{listData.reward_time}</span>小时</div>
              <div className="page-certificate-container-hours-item">志愿服务时长</div>
            </div>
          </div>
          <div className="page-certificate-container-bottom-infobox">
            <div className="page-certificate-container-bussiness">认证机构：{this.certAuthOrg}</div>
            <div className="page-certificate-container-teachsupport">技术支持：志多星</div>
            {this.certCachet ? <img src={this.certCachet} alt="" className="first" /> : <div />}
          </div>
        </div> 
      </div>
    );
  }


  render() {
    const { user: {data:listData}   } = this.props;
    if (!listData) {
      return null;
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
  state => ({ user: state.platfrom.information }),
  dispatch => bindActionCreators({ requestSearch }, dispatch),
)(Certificate);
