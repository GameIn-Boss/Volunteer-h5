import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Carousel, Input, Modal } from 'antd';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'antd/lib/carousel/style/css';
import 'antd/lib/card/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/modal/style/css';
import { requestHomeData, requestWebIndex } from './home.store';
import { requestTeamList } from './../team/team.store';
import News from '../../components/news/news';
import Projects from '../../components/projects/projects';
import Teams from '../../components/teams/teams';
import Image from './../../components/image/image';
import Link from './../../components/link/link';

import './home.css';

const QRCode = require('qrcode.react');

const { Search } = Input;
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      qrData: {
        title: '',
        url: '',
      }
    };
  }

  componentWillMount() {
    this.props.requestHomeData();
    this.props.requestWebIndex();
    this.props.requestTeamList({ page_size: 10 });
  }

  componentDidMount() {}

  componentWillReceiveProps() {}

  componentWillUnmount() {}

  onTeamSearch(name) {
    window.location.href = `/team?name=${encodeURIComponent(name)}`;
  }

  onQRCode(data) {
    this.setState({
      showModal: true,
      qrData: data,
    });
  }

  handleModalVisible() {
    this.setState({
      showModal: false,
    });
  }

  renderWebIndex() {
    const { webIndex: { data } } = this.props;
    console.log(data);
    // console.log(project_count, team_count, volunteer_count)
    return (<div className="page-home-web-index">
      <div className="page-home-web-index-login">
        <div
          onClick={() => {
            this.onQRCode({
              title: '手机扫一扫登录',
              url: 'http://wx8b7f9e8dc8e839cb.wechat.alpha.flashdiet.cn/my/login',
            });
          }}
        >团队登陆</div>
        <div
          onClick={() => {
            this.onQRCode({
              title: '手机扫一扫登录',
              url: 'http://wx8b7f9e8dc8e839cb.wechat.alpha.flashdiet.cn/my/login',
            });
          }}
        >志愿者登陆</div>
        <div
          onClick={() => {
            this.onQRCode({
              title: '手机扫一扫注册',
              url: 'http://wx8b7f9e8dc8e839cb.wechat.alpha.flashdiet.cn/my/login',
            });
          }}
        >注册</div>
      </div>
      <div className="page-home-web-index-number">
        <div className="page-home-web-index-number-item">
          <p className="page-home-web-index-number-item-top">
            <i className="icon-person-small" />
            <span className="page-home-web-index-number-num">{(data && data.volunteer_count) || 0}</span>
            <span className="page-home-web-index-number-ge">个</span>
          </p>
          <p className="page-home-web-index-title">志愿者总数</p>
          <p className="page-home-web-index-item-bot"><p className="page-home-web-index-item-bot-inner" style={{ width: '75%', background: '#F60E64' }} /></p>
        </div>
        <div className="page-home-web-index-number-item">
          <p className="page-home-web-index-number-item-top">
            <i className="icon-person-small" />
            <span className="page-home-web-index-number-num">{(data && data.team_count) || 0}</span>
            <span className="page-home-web-index-number-ge">个</span>
          </p>
          <p className="page-home-web-index-title">志愿队伍总数</p>
          <p className="page-home-web-index-item-bot"><p className="page-home-web-index-item-bot-inner" style={{ width: '60%', background: '#0EC7F6' }} /></p>
        </div>
        <div className="page-home-web-index-number-item">
          <p className="page-home-web-index-number-item-top">
            <i className="icon-person-small" />
            <span className="page-home-web-index-number-num">{(data && data.project_count) || 0}</span>
            <span className="page-home-web-index-number-ge">个</span>
          </p>
          <p className="page-home-web-index-title">志愿活动总数</p>
          <p className="page-home-web-index-item-bot"><p className="page-home-web-index-item-bot-inner" style={{ width: '90%', background: '#1AE9A3' }} /></p>
        </div>
      </div>
    </div>);
  }

  renderCheckMore(path) {
    return (<Link to={path}>
      <div className="page-home-check-more">
        查看全部 <img src="/images/arraw.png" alt="" />
      </div>
    </Link>);
  }

  renderTeams() {
    const settings = {
      dots: false,
      speed: 500,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      variableWidth: true,
      centerPadding: '14px',
    };
    const { teamList } = this.props;
    return (<div className="page-home-teams">
      <div className="layer">
        <div className="page-home-teams-title-default">
          <div>志愿团队 <span>Recent News</span></div>
          <Search
            placeholder="搜索志愿团队"
            onSearch={value => this.onTeamSearch(value)}
            style={{ width: 200 }}
          />
        </div>
        <Carousel {...settings} className="page-home-teams-carousel">
          {teamList && teamList.list && teamList.list.map(item => (<Teams team={item} key={item.id} />))}
        </Carousel>
        {this.renderCheckMore('/team')}
      </div>
    </div>);
  }

  render() {
    const { home } = this.props;
    if (!home.data) {
      return null;
    }
    const { data: { banner: banners, news, project } } = home;
    return (<div className="page-home">
      <div className="page-home-top">
        <div className="layer page-home-top-box">
          <div className="page-home-top-left">
            <Carousel autoplay>
              {
                banners.map((item) => {
                  let url = '';
                  const mode = item.jump_mode;

                  if (mode === 1) {
                    url = '/my/entry';

                    // 第三方
                  } else if (mode === 2) {
                    // 项目
                    url = `/project/detail/${item.jump_id}`;
                  } else if (mode === 3) {
                    // 团队
                    url = `/team/detail/${item.jump_id}`;
                  }
                  return (<div key={item.id}>
                    <Link to={url}>
                      <Image src={item.photo} className="image" resize={{ width: 1500 }} />
                    </Link>
                  </div>);
                })
              }
            </Carousel>
          </div>
          <div className="page-home-top-right">
            {this.renderWebIndex()}
          </div>
        </div>
      </div>
      <div className="page-home-news">
        <div className="layer page-home-news-box">
          <News news={news} showFooter title />
        </div>
      </div>
      <div className="page-home-projects">
        <div className="layer page-home-news-box">
          <Projects projects={project || []} showTitle />
          {this.renderCheckMore('/project')}
        </div>
      </div>
      {this.renderTeams()}
      <Modal
        title={this.state.qrData.title}
        visible={this.state.showModal}
        onCancel={this.handleModalVisible}
        footer={null}
        bodyStyle={{ marginLeft: 25 }}
        width={300}
      >
        <QRCode value={this.state.qrData.url} size={200} />
      </Modal>
    </div>);
  }
}

HomePage.propTypes = {
  requestHomeData: PropTypes.func,
  requestTeamList: PropTypes.func,
  requestWebIndex: PropTypes.func,
  home: PropTypes.shape({
    data: PropTypes.shape({
      banner: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          title: PropTypes.string,
          photo: PropTypes.string,
          jump_mode: PropTypes.number,
          jump_id: PropTypes.number,
        }),
      ),
      project: PropTypes.arrayOf(PropTypes.shape({})),
      sanlitun: PropTypes.number,
    }),
    city: PropTypes.string,
  }),
  teamList: PropTypes.shape({}),
  webIndex: PropTypes.shape({}),
};

export default connect(
  state => ({
    home: state.home.home,
    teamList: state.team.teamList.data,
    webIndex: state.home.webIndex,
  }), dispatch => bindActionCreators({ requestHomeData, requestTeamList, requestWebIndex }, dispatch),
)(HomePage);

