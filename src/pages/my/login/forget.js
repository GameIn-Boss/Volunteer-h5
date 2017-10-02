/**
 * @file 忘记
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../../../components/link/link';
import history from '../../history';
import './forget.css';
import { forgetAction, againVerifyCode } from './login.store';

class Forget extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      buttonString: '获取验证码',
      timer: null,
      countDownTrigger: true,
    };
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    const { code: cCode } = this.props;
    const { code: nCode } = nextProps;
    const countDownTrigger = this.state.countDownTrigger;

    if (cCode.fetching && !nCode.fetching && !nCode.failed) {
      this.setState({
        countDownTrigger: false,
      });
      this.onStartCountDown();
    }
  }

  componentWillUnmount() {
    const timer = this.state.timer;
    clearInterval(timer);
    this.setState({
      buttonString: '获取验证码',
      timer: null,
    });
  }
  onStartCountDown() {
    const buttonString = this.state.buttonString;
    const countDownTrigger = this.state.countDownTrigger;
    let timer = this.state.timer;
    let num = 60;
    const that = this;
    this.setState({
      ...this.state,
      buttonString: num,
      countDownTrigger: false,
    });
    timer = setInterval(() => {
      num--;
      that.setState({
        buttonString: num,
        timer,
      });
      if (num === 0) {
        clearInterval(timer);
        that.setState({
          ...this.state,
          buttonString: '发送',
          timer: null,
          countDownTrigger: true,
        });
      }
    }, 1000);
  }
  onTextChanged=() => {
    const phone = this.phone.value;
    const verifyCode = this.verifyCode.value;
    const pwd = this.pwd.value;
    this.setState({
      ...this.state,
      phone,
      verifyCode,
      pwd,
    });
  }
  onSend=() => {
    const phone = this.state.phone;
    const countDownTrigger = this.state.countDownTrigger;

    if (phone && !/^\d{11}$/.test(phone)) {
      Alert.warning('请输入合法的手机号');
      return;
    } else if (!phone) {
      Alert.warning('请输入手机号');
      return;
    }

    if (countDownTrigger) {
      this.props.againVerifyCode(phone);
    }
  }
  onSubmit=() => {
    const phone = this.state.phone;
    const verifyCode = this.state.verifyCode;
    const pwd = this.state.pwd;
  }
  render() {
    return (
      <div className="page-forget">
        <div className="page-forget-top">修改密码</div>
        <div className="page-forget-item">
          <span className="page-forget-fonts">手机号</span>
          <input className="page-forget-input" type="number" maxLength="11" ref={(c) => { this.phone = c; }} onChange={this.onTextChanged} />
        </div>
        <div className="page-forget-item">
          <span className="page-forget-fonts">验证码</span>
          <input className="page-forget-input" type="number" ref={(c) => { this.verifyCode = c; }} onChange={this.onTextChanged} />
          <div className="page-forget-code" onClick={this.onSend}>获取验证码</div>
        </div>
        <div className="page-forget-item">
          <span className="page-forget-fonts">新密码</span>
          <input className="page-forget-input" type="password" ref={(c) => { this.pwd = c; }} onChange={this.onTextChanged} />
        </div>

        <div className="page-forget-submmit" onClick={this.onSubmit}>确认修改</div>
      </div>
    );
  }
}

Forget.title = '忘记密码';

Forget.propTypes = {
  againVerifyCode: PropTypes.func,
  forgetAction: PropTypes.func,
  code: PropTypes.shape({
    fetching: PropTypes.bool,
    failed: PropTypes.bool,
    data: PropTypes.shape({
      // TODO:

    }),
  }),
  forget: PropTypes.shape({
    fetching: PropTypes.bool,
    failed: PropTypes.bool,
    data: PropTypes.shape({
      // TODO:

    }),
  }),
};

export default connect(
  state => ({
    code: state.againReduxcer,
    forget: state.forgetReducer,
  }),
  dispatch => bindActionCreators({ againVerifyCode, forgetAction }, dispatch),
)(Forget);
