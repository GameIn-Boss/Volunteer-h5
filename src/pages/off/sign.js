/* global wx:false */
/* eslint  "jsx-a11y/no-static-element-interactions":"off", "class-methods-use-this":"off" */

import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import WXShare from '../../components/share';
import { requestCheckinList, checkin, requestClockList } from '../sign/sign.store';

import { isWeChatMiniApp } from '../../utils/funcs';
import { requestHomeData, saveCity, getAreaCity } from '../home/home.store';

import Off from '../../components/off/index.js'
import { translate } from 'react-i18next';
import i18next from 'i18next';

class SignPage extends React.Component {


    // this.props.requestCheckinList();

    // let geolocation = new qq.maps.Geolocation(
    //     "GT7BZ-UXACR-R2JWZ-WYSXR-DHWJV-VEFAI",
    //     "myapp"
    // );
    // let options = { timeout: 8000 };
    // geolocation.getLocation(function (position) {
    //     const lat = position.lat; // 纬度，浮点数，范围为90 ~ -90
    //     const lng = position.lng; // 经度，浮点数，范围为180 ~ -180
    //     const expires = Date.now() + 5 * 60 * 1000; // 5分钟过期
    //     console.log("获取新位置成功", position);
    //     setCookie("location", JSON.stringify({ lat, lng }), 1);
    // }, options);

  componentDidMount() {
    if (window.userAgent) {
      wx.ready(() => {
        WXShare();
      });
    }
  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillUnmount() { }


  render() {
    const { data } = this.props.clocklist;

    return <div>
      {/* <div>经度:{this.state.longitude}维度:{this.state.latitude},是否在小程序中18:48版本？{this.state.isWeChatMiniApp}</div> */}
      <Off data={data} />
    </div>;
  }
}

SignPage.title = i18next.t('建设中');

SignPage.propTypes = {
  data: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.shape({})),
    next: PropTypes.shape({}),
  }),
  checkin: PropTypes.func,
  requestCheckinList: PropTypes.func,
};
export default connect(
  state => ({
    clocklist: state.sign.clocklist,
  }),
  dispatch => bindActionCreators({ requestCheckinList, checkin, requestHomeData, saveCity, getAreaCity, requestClockList }, dispatch),
)(translate('translations')(SignPage));
