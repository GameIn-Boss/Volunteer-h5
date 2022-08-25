/* global wx:false */

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
import SignPage from '../sign/sign';
import SignClassPage from "../sign/signclass";
import WXShare from '../../components/share';
import MyPage from '../my/my';
import { requestUserInfo } from '../../stores/common';
import { translate, Trans } from 'react-i18next';


class LaunchPage extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      page: this.getTabName(this.props)
    };
  }
  TAB_URL_MAPS = {
    "/": <HomePage route={this.props.route} />,
    "/sign/signclass/:Id": <SignClassPage route={this.props.route} />,
    "/home": <HomePage route={this.props.route} />,
    "/sign": <SignPage route={this.props.route} />,
    "/my": <MyPage route={this.props.route} />
  };
  componentWillMount() {
    if (!this.props.user.id) {
      this.props.requestUserInfo(true);
    }
  }

  componentDidMount() {
    if (window.userAgent) {
      wx.ready(() => {
        WXShare();
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      page: this.getTabName(nextProps)
    });
  }

  componentWillUnmount() {}

  getTabName(props) {
    return this.TAB_URL_MAPS[(props || this.props).route.path];
  }

  render() {
    const { page } = this.state;
    const { route: {path}, t } = this.props;

    let daduhui = false;
    let zhongjin = false;
    let vitasoy = false;
    // VWPe9xdLyw 星巴克
    // mxkazpYdJ0 大都会
    // EKQe1wRbJY 维他奶
    if (window.orgCode === "mxkazpYdJ0") {
      daduhui = true;
    }

    if (window.orgCode === 'kQBeXDWeyK') {
      zhongjin = true;
    }

    if (window.orgCode === 'EKQe1wRbJY') {
      vitasoy = true;
    }

    return (
      <div className="page-launch">
        <div className="content">{page}</div>
        <ul className="tabs">
          <li>
            <Link to="/">
              <div
                className={classnames({
                  'tab-icon': true,
                  'tab-icon-home': true,
                  active: path === '/' || path === "/home",
                  daduhui : daduhui,
                  zhongjin: zhongjin,
                  vitasoy: vitasoy,
                })}
              />
              <span>{t('首页')}</span>
            </Link>
          </li>
          <li>
            <Link to="/sign">
              <div
                className={classnames({
                  'tab-icon': true,
                  'tab-icon-signin': true,
                  active: path === '/signin' || path === '/sign',
                  "daduhui" : daduhui,
                  zhongjin: zhongjin,
                  vitasoy: vitasoy,
                })}
              />
              <span>{t('签到打卡')}</span>
            </Link>
          </li>
          <li>
            <Link to="/my">
              <div
                className={classnames({
                  'tab-icon': true,
                  'tab-icon-me': true,
                  active: path === '/my',
                  "daduhui" : daduhui,
                  zhongjin: zhongjin,
                  vitasoy,
                })}
              />
              <span>{t('个人中心')}</span>
            </Link>
          </li>
        </ul>
        <div
          className="line1px"
          style={{
            width: "100%",
            position: "absolute",
            bottom: "49px",
            left: "0"
          }}
        />
      </div>
    );
  }
}

LaunchPage.propTypes = {
  requestUserInfo: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.number,
  }),
  route: PropTypes.shape({
    path: PropTypes.string,
  }),
};

export default connect(
  state => ({ user: state.user }),
  dispatch => bindActionCreators({ requestUserInfo }, dispatch),
)(translate('translations')(LaunchPage));
