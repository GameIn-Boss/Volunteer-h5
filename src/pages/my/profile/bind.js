/**
 * @file 手机号绑定/邮箱
 */

/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { API_HOST } from '../../../utils/config';
import { updatePhone, imporvePersonInfo } from './profile.store';
import { requestVerifyCode } from '../register/register.store';
import './bind.css';
import { translate } from 'react-i18next';
import i18next from 'i18next';
import Link from '../../../components/link/link';
import checkboxSelected from '../../../../public/images/check_box_select_login.png'
import checkboxNormal from '../../../../public/images/check_box_login.png'

function checkEmpty(value, label) {
  if (!value || !value.length) {
    Alert.warning(`${i18next.t('请填写')}${label}`);
    return true;
  }

  return false;
}
class BindInfo extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    const { t } = props;
    this.type = this.props.route.params.type;
    this.state = ({
      captchaUrl: `${API_HOST}/api/captcha`,
      buttonString: t('获取验证码'),
      timer: null,
      countDownTrigger: true,
    });
  }


  componentWillMount() {

  }
  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    const { code: cCode, phone: Lphone, person: Lperson } = this.props;
    const { code: nCode, phone: Nphone, person: Nperson } = nextProps;
    const phone = this.state.phone;
    const mail = this.state.mail;
    const verifyCode = this.state.verifyCode;


    if (this.type === 'phone') {
      if (cCode.fetching && !nCode.fetching && !nCode.failed) {
        this.setState({
          countDownTrigger: false,
        });
        this.onStartCountDown();
      }
      if (phone && verifyCode) {
        if (Lphone.fetching && !Nphone.fetching && !Nphone.failed) {
          if (window.orgCode === 'EKQe1wRbJY') {
            window.location.replace('/');
          } else {
            window.location.replace('/my/profile/detail/user');
          }
          // history.replace('/my/profile/detail/user');
        }
      }
    } else if (this.type === 'mail') {
      if (mail) {
        if (Lperson.fetching && !Nperson.fetching && !Nperson.failed) {
          window.location.replace('/my/profile/detail/user');
          // history.replace('/my/profile/detail/user');
        }
      }
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
  onTextChanged() {
    const phone = this.userphone && this.userphone.replace(/(^\s+)|(\s+$)/g, '');
    const verifyCode = this.usercode && this.usercode.replace(/(^\s+)|(\s+$)/g, '');
    const captcha = this.captcha && this.captcha.replace(/(^\s+)|(\s+$)/g, '');

    this.setState({
      ...this.state,
      captcha,
      phone,
      verifyCode,
    });
  }
  onSubmit() {
    const phone = this.state.phone;
    const { t } = this.props;
    const verifyCode = this.state.verifyCode;
    if (checkEmpty(phone, t('手机号')) || checkEmpty(verifyCode, t('手机验证码'))) {
      return; 
    }
    const data = {};
    data.phone = phone;
    data.verify_code = verifyCode;
    this.props.updatePhone(data);
  }
  onSend() {
    const { t } = this.props;
    const phone = this.state.phone;
    const captcha = this.state.captcha;
    const countDownTrigger = this.state.countDownTrigger;
    const data = {};
    if (checkEmpty(phone, t('手机号')) || checkEmpty(captcha, t('图片验证码'))) {
      return;
    }
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
      Alert.warning(t('请输入验证码'));
    }
  }
  onStartCountDown() {
    const { t } = this.props;
    let timer = this.state.timer;
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
    if (window.orgCode === 'kQBeXDWeyK' || window.orgCode === 'joQeZ6JepZ' || window.orgCode === 'EKQe1wRbJY') {
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

    return <div className="page-login-agree">
      <div
        className="page-login-checkbox"
        style={{ background: `${this.state.checked ? "url('/images/check_box_select_login.png') no-repeat" : "url('/images/check_box_login.png') no-repeat"}` }}
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
    if (window.orgCode === 'mWZdPNwaKg' || window.orgCode === 'kQBeXDWeyK' || window.orgCode === 'joQeZ6JepZ' || window.orgCode === 'EKQe1wRbJY') {
      return true;
    }
    return false;
  }
  bindPhoneview() {
    const { t } = this.props;
    return (
      <div className="page-profile-bind-info-container">
        <div className="page-profile-bind-info-container-item">
          <span className="page-profile-bind-info-container-fonts">{t('手机号')}</span>
          <input className="page-profile-bind-info-container-input" placeholder='请输入' name='userphone' type="tel" onChange={(e) => {
            this.userphone = e.target.value;
            this.onTextChanged();
          }} onKeyUp={this.onTextChanged} maxLength="11" />
        </div>
        <div className="line1px" />
        <div className="page-profile-bind-info-container-item">
          <span className="page-profile-bind-info-container-fonts">{t('图片码')}</span>
          <input className="page-profile-bind-info-container-input" placeholder='请输入' name='captcha' onChange={(e) => {
            this.captcha = e.target.value;
            this.onTextChanged();
          }} type="text" onKeyUp={this.onTextChanged} />
          <img className="page-profile-bind-info-container-code" src={this.state.captchaUrl} onClick={this.refreshCaptcha} alt="" />
        </div>
        <div className="line1px" />
        <div className="page-profile-bind-info-container-item">
          <span className="page-profile-bind-info-container-fonts">{t('验证码')}</span>
          <input className="page-profile-bind-info-container-input" placeholder='请输入' name='usercode' type="number" onChange={(e) => {
            this.usercode = e.target.value;
            this.onTextChanged();
          }}
          />
          <div className="page-profile-bind-info-container-code" onClick={this.onSend}>{this.state.buttonString}</div>
        </div>
        <div className="line1px" />
        <div className="page-profile-bind-info-container-submmit" onClick={this.onSubmit}>{t('确认提交')}</div>
        {
          this.shouldCheckboxAgree() ? this.checkboxAgreeRender() : this.nomarlAgreeRender()
        }
      </div>

    );
  }
  onTextMailChanged() {
    const mail = this.mail.replace(/(^\s+)|(\s+$)/g, '');

    this.setState({
      ...this.state,
      mail,
    });
  }
  onMailSubmit() {
    const email = this.state.mail;
    const { t } = this.props;

    if (email && !/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(email)) {
      Alert.warning(t('请输入合法的邮箱地址'));
      return;
    }
    const data = {
      email,
    };
    this.props.imporvePersonInfo(data);
  }
  bindMailview() {
    const { t } = this.props;
    return (
      <div className="page-profile-bind-info-container">
        <div className="page-profile-bind-info-container-item">
          <span className="page-profile-bind-info-container-fonts">{t('邮箱')}</span>
          <input className="page-profile-bind-info-container-input" type="email" name='mail' onChange={(e) => {
            this.mail = e.target.value;
            this.onTextChanged();
          }} 
          />
        </div>
        <div className="line1px" />
        <div className="page-profile-bind-info-container-submmit" onClick={this.onMailSubmit}>{t('确认提交')}</div>
      </div>
    );
  }

  render() {
    // const data = this.state.data;
    return (
      <div className="page-profile-bind-container">
        <form action="form">
          {this.type === 'phone' ? this.bindPhoneview() : this.bindMailview()}
        </form>
      </div>
    );
  }
}


BindInfo.title = i18next.t('个人信息绑定');
BindInfo.propTypes = {
  imporvePersonInfo: PropTypes.func,
  updatePhone: PropTypes.func,
  requestVerifyCode: PropTypes.func,
  phone: PropTypes.shape({
    fetching: PropTypes.bool,
    failed: PropTypes.bool,
    data: PropTypes.shape({
    }),
  }),
  code: PropTypes.shape({
    fetching: PropTypes.bool,
    failed: PropTypes.bool,
    data: PropTypes.shape({
    }),
  }),
  mail: PropTypes.shape({
    fetching: PropTypes.bool,
    failed: PropTypes.bool,
    data: PropTypes.shape({
    }),
  }),
};

export default connect(
  state => ({
    phone: state.info.updatePhone,
    code: state.register.code,
    person: state.info.person,
  }),
  dispatch => bindActionCreators({ updatePhone, requestVerifyCode, imporvePersonInfo }, dispatch),
)(translate('translations')(BindInfo));
