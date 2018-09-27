import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './detail.css';
import Avatar from '../../../components/avatar/avatar';
import history from '../../history';
import html2canvas from 'html2canvas';
import {
  requestSearch,
} from './index.store';
class TeamSearchPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = ({
      dataUrl: ''
    })
    this.certCachet = window.orgInfo.cert_cachet || '/images/my/zdx.png';
    this.certAuthOrg = window.orgInfo.cert_auth_org || '和众泽益志愿服务中心';
  }

  componentWillMount() {

  }

  componentDidMount() {
    console.log(this.props.detail)
    console.log('加载了')

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
      height: height
    }
    html2canvas(shareContent, opts).then(function (canvas) {
      var dataUrl = canvas.toDataURL('image/jpeg', 1);

      that.setState({
        dataUrl
      })
    });
  }

  render() {

    return (
      <div className="page-platfrom-information-detail">
        <div className="page-platfrom-information-detail-top">
          <div className="btn">生成证书</div>
          <div className="btn" onClick={this.htm2Click}>长按保存服务记录
          {
              this.state.dataUrl != '' ? <img src={this.state.dataUrl} className="img" /> : null
            }


          </div>
        </div>
        <div className="takeup"></div>
        <div className="content" ref="LaunchContent">
          <div className="information">
            <div className="information-top">
              <div className="information-main">
                <div className="information-main-name-container">
                  <div className="information-main-name">高晓生</div>
                  <img src="/images/shop/man.png" />
                </div>
                <div className="information-main-name-container-fonts">民族：汉族</div>
                <div className="information-main-name-container-fonts">身份证号：220521987092782</div>
                <div className="information-main-name-container-fonts">绑定手机：183123456781</div>
              </div>
              <Avatar src='/images/shop/man.png' size={{ width: 100, height: 120, radius: 4 }} />
            </div>
            <div className="page-platfrom-information-detail-top-item-container">
              <div className="page-platfrom-information-detail-top-item">
                <p className="page-platfrom-information-detail-top-item-top"><b className="page-platfrom-information-detail-top-item-num">1</b>个</p>
                <p className="page-platfrom-information-detail-top-item-bottom">我的团队</p>
              </div>
              <div className="page-platfrom-information-detail-top-item">
                <p className="page-platfrom-information-detail-top-item-top"><b className="page-platfrom-information-detail-top-item-num">2</b>个</p>
                <p className="page-platfrom-information-detail-top-item-bottom">我的项目</p>
              </div>
              <div className="page-platfrom-information-detail-top-item">
                <p className="page-platfrom-information-detail-top-item-top"><b className="page-platfrom-information-detail-top-item-num">3</b>小时</p>
                <p className="page-platfrom-information-detail-top-item-bottom">志愿时长</p>
              </div>
              <div className="page-platfrom-information-detail-top-item">
                <p className="page-platfrom-information-detail-top-item-top"><b className="page-platfrom-information-detail-top-item-num">4</b>星币</p>
                <p className="page-platfrom-information-detail-top-item-bottom">志愿星币</p>
              </div>
            </div>
          </div>
          <div className="main">
            <div>
              <div className="main-item-fonts top">注册平台：中国青年志愿者协会</div>
              <div className="main-item-fonts">项目名称：益起来！呵护200万年前的湿地精灵</div>
              <div className="main-item-fonts">发起团队：北京青年志愿者团队</div>
              <div className="main-item-fonts bottom">获得时长：234小时</div>
              <div className="line1px" />
            </div>

            <div>
              <div className="main-item-fonts">注册平台：中国青年志愿者协会</div>
              <div className="main-item-fonts">项目名称：益起来！呵护200万年前的湿地精灵</div>
              <div className="main-item-fonts">发起团队：北京青年志愿者团队</div>
              <div className="main-item-fonts bottom">获得时长：234小时</div>
              <div className="line1px" />
            </div>
            <div>
              <div className="main-item-fonts">注册平台：中国青年志愿者协会</div>
              <div className="main-item-fonts">项目名称：益起来！呵护200万年前的湿地精灵</div>
              <div className="main-item-fonts">发起团队：北京青年志愿者团队</div>
              <div className="main-item-fonts bottom">获得时长：234小时</div>
              <div className="line1px" />
            </div>
            <div>
              <div className="main-item-fonts">注册平台：中国青年志愿者协会</div>
              <div className="main-item-fonts">项目名称：益起来！呵护200万年前的湿地精灵</div>
              <div className="main-item-fonts">发起团队：北京青年志愿者团队</div>
              <div className="main-item-fonts bottom">获得时长：234小时</div>
              <div className="line1px" />
            </div>
            <div>
              <div className="main-item-fonts">注册平台：中国青年志愿者协会</div>
              <div className="main-item-fonts">项目名称：益起来！呵护200万年前的湿地精灵</div>
              <div className="main-item-fonts">发起团队：北京青年志愿者团队</div>
              <div className="main-item-fonts bottom">获得时长：234小时</div>
              <div className="line1px" />
            </div>

          </div>
          <img src={this.certCachet} className="certCachet" />
            
        
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

TeamSearchPage.title = '搜索志愿项目';

export default connect(
  state => ({
    detail: state.team.detail,
    list: state.platfrom.search,
    user: state.user,
  }),
  dispatch => bindActionCreators({
    requestSearch,
  }, dispatch),
)(TeamSearchPage);
