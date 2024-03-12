/**
 * @file 登录
 */

/* global wx:false */
/* eslint  "class-methods-use-this":"off",
 "jsx-a11y/no-static-element-interactions":"off",
 "react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import history from '../../history';
import Link from '../../../components/link/link';
import Tab from '../../../components/tab/tab';

import './login.css';
import { loginAction, changeIndex, storeLoginSource } from './login.store';
import { requestVerifyCode, register } from '../register/register.store';
import Avatar from '../../../components/avatar/avatar';
import { API_HOST } from '../../../utils/config';
import { format } from 'url';
import { setToken } from '../../../utils/funcs';
import { translate, Trans } from 'react-i18next';
import i18next from 'i18next';
import checkboxSelected from '../../../../public/images/check_box_select_login.png'
import checkboxNormal from '../../../../public/images/check_box_login.png'

class Login extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      captchaUrl: `${API_HOST}/api/captcha?t=${Date.now()}`,
      buttonString: props.t && props.t('获取验证码'),
      timer: null,
      countDownTrigger: true,
      checked: false,
    };
  }

  componentWillMount() {
    this.props.changeIndex(0);


  }

  componentDidMount() {
    const tabIndex = this.props.login.idx;
    this.props.changeIndex(tabIndex);
  }

  componentWillReceiveProps(nextProps) {
    const { login: cLogin } = this.props;
    const { login: nLogin } = nextProps;
    const realRegister = window.orgInfo.real_name_register;


    if (cLogin.fetching && !cLogin.failed && !nLogin.fetching && !nLogin.failed) {

      let target = '/my';
      const { from } = nLogin;
      if (realRegister && !nLogin.data) {
        if (from) {
          target = from;
        }

        this.props.storeLoginSource(target);

        if (window.orgCode === 'oBDbDkxal2') {
          window.location.replace(`/my/profile/verifyStarbucks?target=${target}`);
          return;
        }

        if (window.orgCode === 'mWZdPNwaKg') {
          window.location.replace(`/my/profile/verifyBMW?target=${target}`);
          return;
        }


        window.location.replace(`/my/profile/verify?target=${target}`);


        // history.replace('/my/profile/verify');
      } else if (realRegister && nLogin.data) {
        // 验证自定义信息必填
        const custom_config = window.orgInfo.custom_config;
        let isVerify = false;
        if (custom_config.open_id_number && !nLogin.data.id_number.length) {
          isVerify = true;
        }
        if (custom_config.open_real_name && !nLogin.data.real_name.length) {
          isVerify = true;
        }
        if (custom_config.open_nation && !nLogin.data.nation.length) {
          isVerify = true;
        }
        if (custom_config.open_avatars && !nLogin.data.avatars.length) {
          isVerify = true;
        }
        if (custom_config.open_addr && !nLogin.data.province_name.length) {
          isVerify = true;
        }
        let is_has_required = false;
        custom_config.extends && custom_config.extends.length && custom_config.extends.forEach(item => {
          if (item.is_required) {
            is_has_required = true;
          }
        })
        if (is_has_required && !nLogin.data.extends) {
          isVerify = true;
        }
        if (nLogin.data.extends && is_has_required) {
          custom_config.extends.forEach(item => {
            if (item.is_required && (!nLogin.data.extends[item.key] || (nLogin.data.extends[item.key] && !nLogin.data.extends[item.key].length))) {
              isVerify = true;
            }
          })
        }
          
        if (isVerify && nLogin.data.have_pwd == 1) {
          let bindlink = '/my/profile/verify?target=/my';
          if (window.orgCode === 'oBDbDkxal2') {
            bindlink = '/my/profile/bind_profile_starbucks/alert';
          }
          if (window.orgCode === 'mWZdPNwaKg') {
            bindlink = '/my/profile/bind_profile_BMW/alert';
          }
          window.location.replace(bindlink);
          return;
        } else if (isVerify) {
          let bindlink = `/my/profile/verify?target=${target}`;
          if (window.orgCode === 'oBDbDkxal2') {
            bindlink = `/my/profile/verifyStarbucks?target=${target}`;
          }
          if (window.orgCode === 'mWZdPNwaKg') {
            bindlink = `/my/profile/verifyBMW?target=${target}`;
          }
          window.location.replace(bindlink);
        } else {
          if (from) {
            target = from;
          }
          if (from === '/my/login') {
            target = '/my';
          }
          window.location.replace(target);
        }
      } else {

        // 如果登录状态设置了来源（例如从签到页跳转而来）则登录成功后需要跳转回去

        if (from) {
          target = from;
        }
        if (from === '/my/login') {
          target = '/my';
        }
        window.location.replace(target);
        // history.replace(target);
      }
    }
    const { code: cCode, forget: cForget } = this.props;
    const { code: nCode, forget: nForget } = nextProps;

    if (cCode.fetching && !cCode.failed && !nCode.fetching && !nCode.failed) {
      this.onStartCountDown();
      this.setState({
        countDownTrigger: false,
      });
    }//请求成功
    if (cCode.fetching && !cCode.failed && !nCode.fetching && nCode.failed) {
      this.refreshCaptcha();
    }//请求失败
  }

  componentWillUnmount() {
  }

  onTextChanged() {
    const tabIndex = this.props.login.idx;
    let username, pwd = null;
    if (tabIndex == 0) {
      username = this.quickUsername.value.replace(/(^\s+)|(\s+$)/g, '');
      pwd = this.usercode.value.replace(/(^\s+)|(\s+$)/g, '');
      const captcha = this.captcha.value.replace(/(^\s+)|(\s+$)/g, '');

      this.setState({
        ...this.state,
        username,
        pwd,
        captcha,
      });

    } else if (tabIndex == 1) {
      username = this.loginUsername.value.replace(/(^\s+)|(\s+$)/g, '');
      pwd = this.pwd.value.replace(/(^\s+)|(\s+$)/g, '');
      this.setState({
        ...this.state,
        username,
        pwd,
      });
    }
  }


  componentWillUnmount() {
    const timer = this.state.timer;
    const { t } = this.props;
    clearInterval(timer);
    this.setState({

      buttonString: t('获取验证码'),
      timer: null,
    });
  }
  onStartCountDown() {
    let timer = this.state.timer;
    const { t } = this.props;
    let num = 60;
    const that = this;
    this.setState({
      ...this.state,
      buttonString: num,
      countDownTrigger: false,
    });
    timer = setInterval(() => {
      num -= 1;
      that.setState({
        ...this.state,
        buttonString: num,
        timer,
      });
      if (num === 0) {
        clearInterval(timer);
        that.setState({
          ...this.state,
          buttonString: t('获取验证码'),
          timer: null,
          countDownTrigger: true,
        });
      }
    }, 1000);
  }
  refreshCaptcha() {
    this.setState({
      ...this.state,
      captchaUrl: `${API_HOST}/api/captcha?t=${Date.now()}`,
    });
  }
  onSend() {
    const { t } = this.props;
    const phone = this.state.username;
    const captcha = this.state.captcha;
    const countDownTrigger = this.state.countDownTrigger;
    const data = {};
    if (phone && captcha) {
      if (countDownTrigger === true) {
        data.phone = phone;
        data.captcha_code = captcha;
        this.props.requestVerifyCode(data);
      } else {
        Alert.warning(t('同一时间内不能多次点击'));
      }
    } else if (!phone) {
      Alert.warning(t('请输入手机号'));
    } else {
      Alert.warning(t('请输入手机号'));
    }
  }
  submit() {
    const { t } = this.props;
    const tabIndex = this.props.login.idx;
    const data = {};
    if (tabIndex == 0) {
      const username = this.state.username;
      const pwd = this.state.pwd;
      data.phone = username;

      data.verify_code = pwd;
      data.type = tabIndex;


    } else if (tabIndex == 1) {
      const username = this.state.username;
      const pwd = this.state.pwd;
      // if (pwd.length <= 5 || pwd.length >= 20) {
      //     Alert.warning('密码范围6-20位数字字母组成');
      //     return;
      // }
      data.username = username;
      data.pwd = pwd;
      data.type = tabIndex;
    }
    if (this.shouldCheckboxAgree() && !this.state.checked && this.props.login.idx === 0) {
      Alert.warning(t('请先阅读协议'));
      return;
    }
    this.props.loginAction(data);
  }
  renderLogin() {
    const { t } = this.props;
    return (
      <div className="page-login-box">
        <div className="page-login">
          <div className="page-login-item">
            <input type="text" ref={(c) => { this.loginUsername = c; }} onChange={this.onTextChanged}
              placeholder={t('手机号或证件号码')} className="page-login-item-input" />
          </div>
          <div className="page-login-item">
            <input type="password" ref={(c) => { this.pwd = c; }} onChange={this.onTextChanged}
              placeholder={t('输入密码')} className="page-login-item-input" />
          </div>
          <div className="page-login-forget">
            <Link to="/my/forget">
              <span className="page-login-forget-item">{t('忘记密码')}</span>
            </Link>
          </div>
          <div className="page-login-entry " onClick={this.submit}>{t('登录')}</div>
        </div>
      </div>
    );
  }

  nomarlAgreeRender() {
    const { t } = this.props;

    let userAgreeText = t('用户协议');
    if (window.orgCode == 'joQeZJepZV') {
      userAgreeText = '长春志愿者用户协议';
    }
    return <div className="page-login-agree">
      {
        t('提交代表已阅读')
      }
      <span className="page-login-agreement">《{userAgreeText}》</span>

    </div>
  }

  checkboxAgreeRender() {
    const { t } = this.props;

    let userAgreeText = t('用户协议');
    if (window.orgCode === 'joQeZJepZV') {
      userAgreeText = '长春志愿者用户协议';
    }

    let shoudShowPrivacyPolicy = false;
    if (window.orgCode === 'kQBeXDWeyK' || window.orgCode === 'joQeZ6JepZ' || window.orgCode === 'EKQe1wRbJY' || window.orgCode === 'KGRb4x1bBL' ||  window.orgCode === 'Wpmbk5XezJ'||  window.orgCode === '4openZle7A' ) {
      shoudShowPrivacyPolicy = true;
    }

    let userAgreePath = '/my/agree';
    let privacyPolicyPath = '/my/agree';

    if (window.orgCode === 'kQBeXDWeyK') {
      userAgreePath = '/html/userAgreeZhongjin.html';
    }

    if (window.orgCode === 'kQBeXDWeyK') {
      privacyPolicyPath = '/html/privacyPolicyZhongjin.html';
    }
    if (window.orgCode === 'KGRb4x1bBL') {
      userAgreePath = '/html/userAgreeQizhixiaolu.html';
    }

    if (window.orgCode === 'KGRb4x1bBL') {
      privacyPolicyPath = '/html/privacyPolicyQizhixiaolu.html';
    }

    if (window.orgCode === 'EKQe1wRbJY') {
      userAgreePath = '/html/userAgreeVitasoy.html';
    }

    if (window.orgCode === 'EKQe1wRbJY') {
      privacyPolicyPath = '/html/privacyPolicyVitasoy.html';
    }

    if (window.orgCode === 'joQeZ6JepZ') {
      userAgreePath = '/html/userAgreeJinYing.html';
    }

    if (window.orgCode === 'joQeZ6JepZ') {
      privacyPolicyPath = '/html/privacyPolicyJinYing.html';
    }
    if (window.orgCode === 'Wpmbk5XezJ') {
      userAgreePath = '/html/userAgreegonghuis.html';
    }
    if (window.orgCode === 'Wpmbk5XezJ') {
      privacyPolicyPath = '/html/privacyPolicygonghui.html';
    }
        if (window.orgCode === '4openZle7A') {
      userAgreePath = '/html/yangguanguseragree.html';
    }
    if (window.orgCode === '4openZle7A') {
      privacyPolicyPath = 'https://carliferesourses.sinosig.com/CarlifePro/carlifStatic/login/html/gwindex.html?agreeCode=PTB05&from_wecom=1';
    }

    return <div className="page-login-agree">
      <div
        className="page-login-checkbox"
        style={{ background: `${this.state.checked ? "url('../images/check_box_select_login.png') no-repeat" : "url('../images/check_box_login.png') no-repeat"}` }}
        onClick={() => { this.setState({ checked: !this.state.checked }) }} />
      <div>
        {t('已阅读')}
      </div>
      <Link to={userAgreePath}>
        <span className="page-login-agreement">《{userAgreeText}》</span>
      </Link>
      {
        shoudShowPrivacyPolicy ? <Link to={privacyPolicyPath}>
          <span className="page-login-agreement">《{t('隐私政策')}》</span>
        </Link> : null
      }
    </div>
  }

  shouldCheckboxAgree() {
    if (window.orgCode === 'mWZdPNwaKg' || window.orgCode === 'kQBeXDWeyK' || window.orgCode === 'joQeZ6JepZ' ||  window.orgCode === 'EKQe1wRbJY' ||  window.orgCode === 'KGRb4x1bBL' ||  window.orgCode === 'Wpmbk5XezJ'||  window.orgCode === '4openZle7A') {
      return true;
    }
    return false;

  }


  renderQuickLogin() {
    const { t } = this.props;

    return (
      <div className="page-login-box">
        <div className="page-login">
          <div className="page-login-item">
            <input type="number" ref={(c) => { this.quickUsername = c; }} onChange={this.onTextChanged}
              placeholder={t('请输入手机号')} className="page-login-item-input" />
          </div>
          <div className="page-login-item">
            <input type="text" ref={(c) => { this.captcha = c; }} onChange={this.onTextChanged}
              placeholder={t('图形验证码')} className="page-login-item-input" />
            <img className="page-login-item-code" src={this.state.captchaUrl}
              alt="" onClick={this.refreshCaptcha} />
          </div>
          <div className="page-login-item">
            <input type="number" ref={(c) => { this.usercode = c; }} onChange={this.onTextChanged}
              placeholder={t('手机验证码')} className="page-login-item-input" />
            <div className="page-login-item-code" onClick={this.onSend}>{this.state.buttonString}</div>
          </div>
          <div className="page-login-entry page-login-quick-login" onClick={this.submit}>{t('登录/注册')}</div>
        </div>
        {
          this.shouldCheckboxAgree() ? this.checkboxAgreeRender() : this.nomarlAgreeRender()
        }
      </div>

    )
  }

  onTabChange(idx) {
    this.props.changeIndex(idx);
  }
  render() {
    const tabIndex = this.props.login.idx;
    const { t, i18n } = this.props;
    const { language } = i18n;
    return (
      <div>
        <Tab
          tabs={[
            {
              label: t('快速登录'),
              component: this.renderQuickLogin(),
            },
            {
              label: t('账号登录'),
              component: this.renderLogin(),
            },
          ]}
          onChange={this.onTabChange}
          selectedIndex={tabIndex}
        />
      </div>
    )
  }
}

Login.title = i18next.t('登录');

Login.propTypes = {
  loginAction: PropTypes.func,
  login: PropTypes.shape({
    fetching: PropTypes.bool,
    failed: PropTypes.bool,
    from: PropTypes.string,
    idx: PropTypes.number,
    data: PropTypes.shape({
      // TODO:接收回来
      token: PropTypes.string,
      id: PropTypes.number,
      username: PropTypes.string,
      phone: PropTypes.string,
      avatars: PropTypes.string,
      real_name: PropTypes.string,
      nation: PropTypes.string,
      sex: PropTypes.number,
      birthday: PropTypes.string,
      identifier: PropTypes.string,
      slogan: PropTypes.string,
      reward_time: PropTypes.string,
      id_number: PropTypes.string,
      province_id: PropTypes.number,
      province_name: PropTypes.string,
      city_id: PropTypes.number,
      city_name: PropTypes.string,
      county_id: PropTypes.number,
      county_name: PropTypes.string,
      addr: PropTypes.string,
      family_id: PropTypes.number,
      join_family_time: PropTypes.string,
      good_at: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }),
  requestVerifyCode: PropTypes.func,
  register: PropTypes.func,
  code: PropTypes.shape({
    fetching: PropTypes.bool,
    failed: PropTypes.bool,
    data: PropTypes.shape({
    }),
  }),
  regis: PropTypes.shape({
    fetching: PropTypes.bool,
    failed: PropTypes.bool,
    data: PropTypes.shape({
      id: PropTypes.number,
      token: PropTypes.string,
    }),
  }),


};

export default connect(
  state => ({
    login: state.login.login,
    code: state.register.code,
    regis: state.register.register,
  }),
  dispatch => bindActionCreators({ loginAction, storeLoginSource, changeIndex, requestVerifyCode, register }, dispatch),
)(translate('translations')(Login));
