import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './detail.css';
import Avatar from '../../../components/avatar/avatar';
import history from '../../history';
import html2canvas from 'html2canvas';
import Link from '../../../components/link/link'
import {
  requestSearch,
} from './index.store';

import { Gallery, GalleryDelete, Button, Icon } from 'react-weui';
import 'weui/dist/style/weui.css';
import 'react-weui/build/packages/react-weui.css';

class TeamSearchPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.Id = props.route.params.Id;
  
    this.certCachet = window.platformInfo.cert_cachet || '/images/my/zdx.png';
    this.certAuthOrg = window.platformInfo.cert_auth_platform || '和众泽益志愿服务中心';
  }

  componentWillMount() {
    const id_number = this.Id;
    this.props.requestSearch({ id_number })
  }

  componentDidMount() {
  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {
  }
  htm2Click = () => {
    var that = this;
    var shareContent = this.refs['LaunchContent'];
    var width = shareContent.offsetWidth;
    var height = shareContent.offsetHeight;
    var canvas = document.createElement('canvas');
    var scale = 5;
    canvas.width = width * scale;
    canvas.height = height * scale;
    canvas.getContext("2d").scale(scale, scale);
    var opts = {
      scale: scale,
      canvas: canvas,
      logging: true,
      width: width,
      height: height,
      useCORS: true,
    }
    html2canvas(shareContent, opts).then(function (canvas) {
      var dataUrl = canvas.toDataURL('image/jpeg', 4);
      var dataUrlObj ={
        dataUrl,
      }
      localStorage.setItem('dataUrlObj' , JSON.stringify(dataUrlObj));
      history.push('/platfrom/view');
  
    });
  }

  render() {
    const { detail } = this.props;
    if (detail.keyword != this.Id || !detail.data) {
      return null
    }
    const { data } = detail;
    const height =document.documentElement.clientHeight;
    return (
      <div className="page-platfrom-information-detail">
        <div className="page-platfrom-information-detail-top">
          <Link to={`/my/certificate/${this.Id}`}>
            <div className="btn">生成证书</div>
          </Link>
          <div className="btn" onClick={this.htm2Click}>点击预览保存</div>
        </div>
        <div className="takeup"></div>
        <div className="content" ref="LaunchContent">
          <div className="information">
           
              <img src={this.certCachet} className="certCachet" crossOrigin = "Anonymous"/>
            
            <div className="information-top">
              <div className="information-main">
                <div className="information-main-name-container">
                  <div className="information-main-name">{data.volunteer_info.real_name}</div>
                  <img src="/images/shop/man.png" />
                </div>
                {
                  data.volunteer_info.nation ? <div className="information-main-name-container-fonts">民族：{data.volunteer_info.nation}</div> : null
                }
                {
                  data.volunteer_info.id_number ? <div className="information-main-name-container-fonts">身份证号：{data.volunteer_info.id_number}</div> : null
                }
                {
                  data.volunteer_info.phone ? <div className="information-main-name-container-fonts">绑定手机：{data.volunteer_info.phone}</div> : null
                }
              </div>
              <Avatar src={`${data.volunteer_info.avatars}`} size={{ width: 100, height: 120, radius: 4 }} />
            </div>
           
            <div className="page-platfrom-information-detail-top-item-container">
              <div className="page-platfrom-information-detail-top-item">
                <p className="page-platfrom-information-detail-top-item-top"><b className="page-platfrom-information-detail-top-item-num">{data.org_count}</b>个</p>
                <p className="page-platfrom-information-detail-top-item-bottom">注册平台</p>
              </div>
              <div className="page-platfrom-information-detail-top-item">
                <p className="page-platfrom-information-detail-top-item-top"><b className="page-platfrom-information-detail-top-item-num">{data.team_count}</b>个</p>
                <p className="page-platfrom-information-detail-top-item-bottom">参加团队</p>
              </div>
              <div className="page-platfrom-information-detail-top-item">
                <p className="page-platfrom-information-detail-top-item-top"><b className="page-platfrom-information-detail-top-item-num">{data.project_count}</b>个</p>
                <p className="page-platfrom-information-detail-top-item-bottom">参加项目</p>
              </div>
              <div className="page-platfrom-information-detail-top-item">
                <p className="page-platfrom-information-detail-top-item-top"><b className="page-platfrom-information-detail-top-item-num">{data.reward_time}</b>小时</p>
                <p className="page-platfrom-information-detail-top-item-bottom">志愿时长</p>
              </div>
            </div>
          
          </div>
       

          <div className="main">

            {
              data.project_list && data.project_list.length > 0 ?
                data.project_list.map((item) => {
                  return (
                    <div style={{ paddingTop: '20' }}>
                      <div className="main-item-fonts">注册平台：{item.org.name}</div>
                      <div className="main-item-fonts">项目名称：{item.project.name}</div>
                      <div className="main-item-fonts">发起团队：{item.project.team.name}</div>
                      <div className="main-item-fonts bottom">获得时长：{item.reward_time}小时</div>
                      <div className="line1px" />
                    </div>
                  )
                }) : null
            }
          </div>


        </div>


      </div>

    );
  }
}

TeamSearchPage.propTypes = {
  requestSearch: PropTypes.func,
  list: PropTypes.shape({
    data: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.shape({})),
      page: PropTypes.shape({
        current_page: PropTypes.number,
        total_page: PropTypes.number,
      }),
    }),
  }),
};

TeamSearchPage.title = '信息查询';

export default connect(
  state => ({
    detail: state.platfrom.information,
  }),
  dispatch => bindActionCreators({
    requestSearch,
  }, dispatch),
)(TeamSearchPage);
