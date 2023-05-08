/**
 * @file 我的消息
 */

/* eslint  "jsx-a11y/no-static-element-interactions":"off", "react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './thx.css';
import ThxItem from './component/thxItem';
import { messagesAction } from '../my.store';
import { translate } from 'react-i18next';
import i18next from 'i18next';

class Thx extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.messagesAction();
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  render() {
    const { t } = this.props;
    return (
      <div className="page-thx">
        <img className="image-yicaishop" src="/images/yicaishop.jpg" />
        <div className="page-box">
        <p className="page-box-text">我要捐赠</p>
        <p style={{marginTop:'-10px'}} className="page-box-content">溢彩公益产品起市可实现一键直捐，让捐赠更简单 <br /> <br />
        泰康溢彩公益基金会由泰康保险集团于2018年11月发起 <br />设立，足5A级
社会组织。
        </p>
      </div>
      <img className="image-yicai" src="/images/yicai.png" />
      <div  style={{marginTop:'30px'}} className="page-box">
      <p className="page-box-yicai-title">我要参与志愿服务</p>
        <p className="page-box-yicai-content">溢彩星是泰康保险集团支持开发建设的志愿者平台，为泰<br />康溢彩志愿者捉供志愿服务管理的在线化、智能化、便捷<br />化服务社会组织。
        </p>
      </div>  
      
      </div>
    );
  }
}

if(window.ISALES){
  window.ISALES.callApp('getAppInfo',{
      callback:function(res){ // res:object
          if(res.code === '0'){
              console.log(res.msg.appVersion)
          }else{
              console.log('获取泰行销版本信息失败')
          }
      }
  })
}
// 'callback'为回调函数，不能为空，须传递一个 function
ISALES.callApp('userInfo', { //泰行销版本要求(ios 3.3.1+, 安卓 2.5.0+)
  'callback': function (info) {
     console.log(info)
    // {
    //   'code': '0',  // 0：成功，-100：调用失败
    //   'msg': data // type object
    //   'desc': ''
    // }
 }
})
Thx.title = i18next.t('溢彩公益');


export default connect(
  state => ({
    messages: state.my.messages,
  }),
  dispatch => bindActionCreators({ messagesAction }, dispatch),
)(translate('translations')(Thx));
