/**
 * @file 首页 TABS 页面统一入口，负责 URL 到 TAB  以及页面的映射
 */

import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import Link from '../../components/link/link';
import './launch.css';
import HomePage from '../home/home';
import ProjectPage from '../project/project';
import TeamPage from '../team/team';
import NewsPage from '../news/news';
import PatternPage from '../pattern/pattern';
import ProjectDetailPage from '../project/detail';
import TeamDetailPage from '../team/detail';
import NewsDetailPage from '../news/detail';

class LaunchPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      path: '/',
      page: this.getTabName(this.props),
    };
  }

  TAB_URL_MAPS = {
    '/': <HomePage route={this.props.route} />,
    '/home': <HomePage route={this.props.route} />,
    '/project': <ProjectPage route={this.props.route} />,
    '/team': <TeamPage route={this.props.route} />,
    '/news': <NewsPage route={this.props.route} />,
    '/pattern': <PatternPage route={this.props.route} />,
    '/project/:id': <ProjectDetailPage route={this.props.route} />,
    '/team/:id': <TeamDetailPage route={this.props.route} />,
    '/news/:id': <NewsDetailPage route={this.props.route} />,
  };

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      path: nextProps.route.path,
      page: this.getTabName(nextProps),
    });
  }

  componentWillUnmount() {

  }

  getTabName(props) {
    return this.TAB_URL_MAPS[(props || this.props).route.path];
  }

  onTabChange(e, path) {
    e.preventDefault();
    const pathname = window.location.pathname;
    if (pathname === path) return;
    this.setState({
      ...this.state,
      path,
      page: this.TAB_URL_MAPS[path],
    }, () => {
      let hash = window.location.hash || '#0';
      hash = Number(hash.split('#')[1]);
      hash += 1;
      history.pushState('', '', `${path}#${hash}`);
    });
  }

  render() {
    const { page } = this.state;
    const { path } = this.props.route;
    console.log(this.props);
    return (
      <div className="page-launch">
        <header className="page-launch-header layer">
          <div className="page-launch-header-icon">
            <img src="/images/zdx.png" alt="" />
            志多星志愿管理服务平台
          </div>
          <ul className="page-launch-header-tabs">
            {/* <li */}
            {/* className={classnames({ */}
            {/* active: path === '/' || path === '/home', */}
            {/* })} */}
            {/* > */}
            {/* <span onClick={(e) => { this.onTabChange(e, '/home'); }}>首页</span> */}
            {/* </li> */}
            {/* <li */}
            {/* className={classnames({ */}
            {/* active: path === '/project' || path === '/project/:id', */}
            {/* })} */}
            {/* > */}
            {/* <span onClick={(e) => { this.onTabChange(e, '/project'); }}>志愿项目</span> */}
            {/* </li> */}
            {/* <li */}
            {/* className={classnames({ */}
            {/* active: path === '/team' || path === '/team/:id', */}
            {/* })} */}
            {/* > */}
            {/* <Link to="/team"> */}
            {/* <span>志愿团队</span> */}
            {/* </Link> */}
            {/* </li> */}
            {/* <li */}
            {/* className={classnames({ */}
            {/* active: path === '/news' || path === '/news/:id', */}
            {/* })} */}
            {/* > */}
            {/* <Link to="/news"> */}
            {/* <span>新闻资讯</span> */}
            {/* </Link> */}
            {/* </li> */}
            {/* <li */}
            {/* className={classnames({ */}
            {/* active: path === '/pattern', */}
            {/* })} */}
            {/* > */}
            {/* <Link to="/pattern"> */}
            {/* <span>星级榜样</span> */}
            {/* </Link> */}
            {/* </li> */}
            {/* <li> */}
            {/* <Link to="/"> */}
            {/* <div */}
            {/* className={classnames({ */}
            {/* 'tab-icon': true, */}
            {/* 'tab-icon-home': true, */}
            {/* active: path === '/' || path === '/home', */}
            {/* })} */}
            {/* /> */}
            {/* <span>关于我们</span> */}
            {/* </Link> */}
            {/* </li> */}


            <li
              className={classnames({
                active: path === '/' || path === '/home',
              })}
            >
              <Link to="/">
                <span>首页</span>
              </Link>
            </li>
            <li
              className={classnames({
                active: path === '/project' || path === '/project/:id',
              })}
            >
              <Link to="/project">
                <span>志愿项目</span>
              </Link>
            </li>
            <li
              className={classnames({
                active: path === '/team' || path === '/team/:id',
              })}
            >
              <Link to="/team">
                <span>志愿团队</span>
              </Link>
            </li>
            <li
              className={classnames({
                active: path === '/news' || path === '/news/:id',
              })}
            >
              <Link to="/news">
                <span>新闻资讯</span>
              </Link>
            </li>
            <li
              className={classnames({
                active: path === '/pattern',
              })}
            >
              <Link to="/pattern">
                <span>星级榜样</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <div
                  className={classnames({
                    'tab-icon': true,
                    'tab-icon-home': true,
                    active: path === '/' || path === '/home',
                  })}
                />
                <span>关于我们</span>
              </Link>
            </li>
          </ul>
        </header>
        <div className="content">
          {page}
        </div>
        <footer className="layer footer">
          <div className="footer-left">
            <img src="/images/icon.png" alt="" />
          </div>
          <div className="footer-right">
            <p>Copyright © 2012 - 2018 cdvolunteer.com . All Rights Reserved. 蜀ICP备12017097号-1</p>
            <p>成都市精神文明建设办公室 版权所有</p>
            <p>运营单位：成都晚报社 技术支持：四川升途信息科技有限公司</p>
          </div>
        </footer>
      </div>
    );
  }
}

LaunchPage.propTypes = {
  route: PropTypes.shape({
    path: PropTypes.string,
  }),
};

export default connect(
  state => ({}),
  dispatch => bindActionCreators({}, dispatch),
)(LaunchPage);
