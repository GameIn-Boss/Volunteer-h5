/**
 * @file 我的消息
 */

/* eslint  "jsx-a11y/no-static-element-interactions":"off", "react/no-array-index-key":"off" */
import React, { PropTypes, Fragment } from "react";
import FastClick from "fastclick";
import Alert from "react-s-alert";
import autoBind from "react-autobind";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import UploadAvatar from "./../../../components/uploadAvatar/uploadAvatar";
import { requestUserInfo } from "../../../stores/common";
import { checkUser, addressDataAction, userDefinedInfo } from "./profile.store";
import { loginAction } from "../login/login.store";
import { getQueryString, user_type, volunteer_company } from "../../../utils/funcs";
import "./verify.css";
import "antd-mobile/lib/date-picker/style/css";
import "antd-mobile/lib/checkbox/style/css";
import "antd-mobile/lib/Radio/style/css";
import "./verifyAntd.css";
import { Dialog, Gallery, GalleryDelete, Button, Icon } from "react-weui";
import "weui/dist/style/weui.css";
import "react-weui/build/packages/react-weui.css";
import { cardtype } from '../../../utils/config';
import { translate } from 'react-i18next';
import i18next from 'i18next';
const isAndroid = /android/i.test(navigator.userAgent);
const isExisty = value => value !== null && value !== undefined
const isNull = value => value === '';
const validationPassword = (value, len) => {
  if (!isExisty(value) || isNull(value)) {
    Alert.warning(`${i18next.t('请填写')}${i18next.t('密码')}`);
    return false;
  }
  if (value.length < len) {
    Alert.warning(`${i18next.t('密码输入不合法')}`);
    return false;
  }
  let Modes = 0;
  // 统计密码中字符类型
  for (let i = 0; i < value.length; i++) {
    Modes |= CharMode(value.charCodeAt(i));
  }
  // 判断字符类型
  function CharMode(iN) {
    if (iN >= 48 && iN <= 57) //数字
      return 1;
    if (iN >= 65 && iN <= 90) //大写字母
      return 2;
    if (iN >= 97 && iN <= 122) //小写
      return 4;
    else
      return 8; //特殊字符
  }

  // 返回密码中字符类型
  function bitTotal(num) {

    let m = 0;
    for (let i = 0; i < 4; i++) {
      if (num & 1) m++;
      num >>>= 1;
    }
    return m;
  }
  // 必须是包含数字、大写小写字母和特殊字符
  if (bitTotal(Modes) < 4) {
    Alert.warning(`${i18next.t('密码输入不合法')}`);
    return false;
  }
  return true;
};
let isEmpty = false;

function checkEmpty(value, label) {
  if (!value || !value.length) {
    Alert.warning(`${i18next.t('请填写')}${i18next.t(label)}`);
    isEmpty = true;
    return true;
  } else {
    isEmpty = false;
  }
  return false;
}
function verifyEmail(e) {
  const myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  if(!myreg.test(e))
  {
    Alert.warning(`${i18next.t('邮箱格式不正确')}`);
    return true;
  }
  return false;
}
function checkStr(str) {
  const reg = new RegExp("^([\u4E00-\uFA29]|[\uE7C7-\uE7F3])*$");
  if (!reg.test(str)) {
    Alert.warning("请输入中文姓名");
    return true;
  }
  return false;
}

//验证姓名，允许中文、大小写字母、空格、-、·、_ ,,,,,请输入中文姓名或英文姓名
function checkRealname(str) {
  const reg = new RegExp(/^[a-zA-Z\u4e00-\u9fa5_\·\ \-]+$/);
  if (!reg.test(str)) {
    Alert.warning(i18next.t('请输入中文姓名或英文姓名'));
    return true;
  }
  return false;
}
// console.log(checkRealname('家icon_i i-oo-'));

function iscard(card) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (!reg.test(card)) {
    Alert.warning(i18next.t("身份证输入不合法"));
    return true;
  }
  return false;
}
function isaomencard(card) {
  const reg = /^[1|5|7][0-9]{6}\([0-9Aa]\)/;
  if (!reg.test(card)) {
    Alert.warning(i18next.t("身份证输入不合法"));
    return true;
  }
  return false;
}
function isxiangancard(card) {
  const reg = /^((\s?[A-Za-z])|([A-Za-z]{2}))\d{6}(([0−9aA])|([0-9aA]))$/;
  if (!reg.test(card)) {
    Alert.warning(i18next.t("身份证输入不合法"));
    return true;
  }
  return false;
}
function istaiwancard(card) {
  const reg = /^[a-zA-Z][0-9]{9}$/;
  if (!reg.test(card)) {
    Alert.warning(i18next.t("身份证输入不合法"));
    return true;
  }
  return false;
}

class Verify extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      password: null,
      province: 0,
      city: 0,
      county: 0,
      winOrgInfo: window.orgInfo.custom_config,
      showMultiple: false,
      previewData: [],
      cardtype: 1
    };
  }

  componentWillMount() {
    this.props.addressDataAction(0);
  }

  componentDidMount() {
    // Android 下 fastclick 影响 select 点击
    if (window.fastclick && isAndroid) {
      window.fastclick.destroy();
      window.fastclick = null;
    }
  }

  componentWillReceiveProps(nextProps) {
    const { check: Ccheck } = this.props;
    const { check: Ncheck } = nextProps;
    const { login: cLogin } = this.props;
    const { login: nLogin } = nextProps;

    let target = getQueryString("target") ? getQueryString("target") : "/my";

    const { from } = nLogin;

    if (
      Ccheck.fetching &&
      !Ccheck.failed &&
      !Ncheck.fetching &&
      !Ncheck.failed
    ) {
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

  componentWillUnmount() {
    if (!window.fastclick && isAndroid) {
      window.fastclick = FastClick.attach(document.body);
    }
  }

  onTextChanged() {
    //姓名允许空格
    // const realname = this.realname.value.replace(/(^\s+)|(\s+$)/g, "");
    const realname = this.realname.value;
    const idcard = this.idcard.value.replace(/(^\s+)|(\s+$)/g, "");
    const password = this.password
      ? this.password.value.replace(/(^\s+)|(\s+$)/g, "")
      : null;
    this.setState({
      realname,
      idcard,
      password,
    });
  }

  // 上传头像
  onAvatarChange(avatar) {
    this.setState({
      photo: avatar
    });
    this.photo = avatar;
  }

  onSubmit() {
    const {
      winOrgInfo: stateOrgData,
      realname,
      idcard,
      photo,
      cardtype,
      province,
      city,
      county,
      password,

      volunteer_user_type,
      volunteer_company_affiliation,
      volunteer_employee_id,
      volunteer_dealer_name,
      volunteer_email,
    } = this.state;
    const { user, t } = this.props;

    let data = {};

    if (
      (stateOrgData.open_avatars && checkEmpty(photo, t('头像'))) ||
      (stateOrgData.open_real_name && checkEmpty(realname, t('姓名'))) ||
      (stateOrgData.open_id_number && checkEmpty(idcard, t('证件号码'))) ||
      (stateOrgData.open_addr && checkEmpty(province, t('省份'))) ||
      (stateOrgData.open_addr && checkEmpty(city, t('城市'))) ||
      (stateOrgData.open_addr && checkEmpty(county, t('区县'))) ||
      (stateOrgData.open_real_name && checkRealname(realname)) ||
      (user.have_pwd === 0 && !validationPassword(password, 8) ||
        checkEmpty(volunteer_user_type, t('身份类型'))
      )
    ) {
      return;
    }
    if (volunteer_user_type === undefined || volunteer_user_type === -1) {
      Alert.warning(`${i18next.t('请填写')}${i18next.t('身份类型')}`);
      return;
    }

    if (stateOrgData.open_id_number) {
      if (cardtype == 1 && iscard(idcard)) {
        return;
      } else if (cardtype == 2 && isxiangancard(idcard)) {
        return;
      } else if (cardtype == 3 && isaomencard(idcard)) {
        return;
      } else if (cardtype == 4 && istaiwancard(idcard)) {
        return;
      }
    }

    if (volunteer_user_type === '宝马员工') {
      if (
        checkEmpty(volunteer_company_affiliation, t('所属公司')) ||
          checkEmpty(volunteer_employee_id, t('员工号')) ||
          checkEmpty(volunteer_email, t('邮箱')) ||
        verifyEmail(volunteer_email)
      ) {
        return;
      }
      if (volunteer_company_affiliation === undefined || volunteer_company_affiliation === -1) {
        Alert.warning(`${i18next.t('请填写')}${i18next.t('所属公司')}`);
        return;
      }
      if (volunteer_employee_id && !( /^[a-zA-Z]\w{5,6}$/.test(volunteer_employee_id))) {
        Alert.warning(t('员工号有误，请检查'));
        return;
      }
    } else if(volunteer_user_type === '经销商员工') {
      if (
        checkEmpty(volunteer_dealer_name, t('经销商简称')) ||
        checkEmpty(volunteer_email, t('邮箱')) ||
        verifyEmail(volunteer_email)
      ) {
        return;
      }
    }

    if (realname) {
      data.real_name = realname;
    }
    if (idcard) {
      data.id_number = idcard;
    }
    if (province) {
      data.province_id = province;
    }
    if (city) {
      data.city_id = city;
    }
    if (county) {
      data.county_id = county;
    }

    if (photo != undefined && photo != "") {
      data.avatars = photo;
    }
    if (password) {
      data.pwd = password;
    }
    data.num_type = cardtype;
    data.volunteer_user_type = volunteer_user_type;
    if (volunteer_company_affiliation) {
      data.volunteer_company_affiliation = volunteer_company_affiliation;
    }
    if (volunteer_employee_id) {
      data.volunteer_employee_id = volunteer_employee_id;
    }
    if (volunteer_dealer_name) {
      data.volunteer_dealer_name = volunteer_dealer_name;
    }
    if (volunteer_email) {
      data.volunteer_email = volunteer_email;
    }

    this.props.checkUser(data);
  }
  handleCardClick() {
    this.setState({ ...this.state, cardtype: this.cardtype.value });
  }

  handleProvinceClick() {
    this.setState({
      ...this.state,
      province: this.province.value
    });
    this.props.addressDataAction(this.province.value);
  }

  handleCityClick() {
    this.setState({
      ...this.state,
      city: this.city.value
    });
    this.props.addressDataAction(this.city.value);
  }

  handleCountyClick() {
    this.setState({
      ...this.state,
      county: this.county.value
    });
  }

  renderAvatars() {
    const { t } = this.props;
    return (
      <div>
        <div className="page-my-profile-verify-header-box page-my-profile-verify-photo-box">
          {this.state.winOrgInfo.open_avatars === 1 ? (
            <span className="page-my-profile-verify-header-start">*</span>
          ) : null}

          <div className="page-my-profile-verify-fonts">{t('头像')}</div>
          <UploadAvatar onChange={this.onAvatarChange} />
        </div>
        <div className="line1px" />
      </div>
    );
  }

  renderName() {
    const { t } = this.props;
    return (
      <div>
        <div className="page-my-profile-verify-header-box">
          {this.state.winOrgInfo.open_real_name === 1 ? (
            <span className="page-my-profile-verify-header-start">*</span>
          ) : null}
          <div className="page-my-profile-verify-fonts">{t('姓名')}</div>
          <input
            type="text"
            ref={c => {
              this.realname = c;
            }}
            className="page-my-profile-verify-text"
            onChange={this.onTextChanged}
          />
        </div>
        <div className="line1px" />
      </div>
    );
  }

  renderIdCard() {
    const { t, i18n } = this.props;
    const { language } = i18n;
    return (
      <div>
        <div className="page-my-profile-verify-header-box">
          {this.state.winOrgInfo.open_id_number === 1 ? (
            <span className="page-my-profile-verify-header-start">*</span>
          ) : null}
          <div className="page-my-profile-verify-fonts">{t('证件类型')}</div>
          <label htmlFor="cardtype">
            <select

              id="cardtype"
              onChange={this.handleCardClick}
              ref={c => {
                this.cardtype = c;
              }}
            >

              {cardtype &&
              cardtype.map((item, keys) => (
                <option value={item.id} key={keys}>
                  {language === 'zh-CN' ? item.name : item.en_US}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="line1px" />
        <div className="page-my-profile-verify-header-box">
          {this.state.winOrgInfo.open_id_number === 1 ? (
            <span className="page-my-profile-verify-header-start">*</span>
          ) : null}
          <div className="page-my-profile-verify-fonts">{t('证件号码')}</div>
          <input
            type="text"
            maxLength="18"
            ref={c => {
              this.idcard = c;
            }}
            className="page-my-profile-verify-text"
            onChange={this.onTextChanged}
          />
        </div>
        <div className="line1px" />
      </div>
    );
  }

  renderAddr() {
    const { t, i18n } = this.props;
    const { language } = i18n;
    const province = this.props.address.data.province;
    const city = this.props.address.data.city;
    const county = this.props.address.data.county;
    return (
      <div>
        <div>
          <div className="page-my-profile-verify-header-box">
            {this.state.winOrgInfo.open_addr === 1 ? (
              <span className="page-my-profile-verify-header-start">*</span>
            ) : null}

            <div className="page-my-profile-verify-fonts">{t('省份')}</div>
            <label htmlFor="province">
              <select
                id="province"
                onChange={this.handleProvinceClick}
                ref={c => {
                  this.province = c;
                }}
              >
                <option value="-1" />
                {province &&
                province.map((item, keys) => (
                  <option value={item.id} key={keys}>
                    {language === 'zh-CN' ? item.name : item.pinyin}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="line1px" />
          <div className="page-my-profile-verify-header-box">
            {this.state.winOrgInfo.open_addr === 1 ? (
              <span className="page-my-profile-verify-header-start">*</span>
            ) : null}
            <div className="page-my-profile-verify-fonts">{t('城市')}</div>
            <label htmlFor="city">
              <select
                id="city"
                onChange={this.handleCityClick}
                ref={c => {
                  this.city = c;
                }}
              >
                <option value="-1" />
                {city &&
                city.map((item, keys) => (
                  <option value={item.id} key={keys}>
                    {language === 'zh-CN' ? item.name : item.pinyin}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="line1px" />
          <div className="page-my-profile-verify-header-box">
            {this.state.winOrgInfo.open_addr === 1 ? (
              <span className="page-my-profile-verify-header-start">*</span>
            ) : null}
            <div className="page-my-profile-verify-fonts">{t('区县')}</div>
            <label htmlFor="county">
              <select
                id="county"
                onChange={this.handleCountyClick}
                ref={c => {
                  this.county = c;
                }}
              >
                <option value="-1" />
                {county &&
                county.map((item, keys) => (
                  <option value={item.id} key={keys}>
                    {language === 'zh-CN' ? item.name : item.pinyin}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="line1px" />
        </div>
      </div>
    );
  }
  renderPassword() {
    const { user, t } = this.props;
    return (
      <div>
        {user.have_pwd == 0 ? (
          <div>
            <div className="page-my-profile-verify-header-box">
              <span className="page-my-profile-verify-header-start">*</span>
              <div className="page-my-profile-verify-fonts">{t('设置密码')}</div>
              <input
                type="text"
                ref={c => {
                  this.password = c;
                }}
                className="page-my-profile-verify-text"
                onChange={this.onTextChanged}
              />
            </div>
            <div className="page-my-profile-verify-header-box" style={{color: '#666', fontSize: 13}}>{i18next.t('密码至少8位，且必须包含数字、大写小写字母和特殊字符')}</div>
            <div className="line1px" />
          </div>
        ) : null}
      </div>
    );
  }

  renderUserType() {
    const { t } = this.props;
    return (
      <div>
        <div className="page-my-profile-verify-header-box">
          {this.state.winOrgInfo.open_id_number === 1 ? (
            <span className="page-my-profile-verify-header-start">*</span>
          ) : null}
          <div className="page-my-profile-verify-fonts">{t('身份类型')}</div>
          <select
            id="volunteer_user_type"
            onChange={() => {
              this.setState({
                ...this.state,
                volunteer_user_type: this.volunteer_user_type.value
              });
            }}
            ref={c => {
              this.volunteer_user_type = c;
            }}
          >
            <option value="-1" />
            {user_type.map((item, keys) => (
              <option value={item} key={keys}>
                {t(item)}
              </option>
            ))}
          </select>
        </div>
        <div className="line1px" />
      </div>
    )
  }

  renderOtherModule() {
    if (this.volunteer_user_type) {
      const { t } = this.props;
      const { value } = this.volunteer_user_type;
      if (value !== '宝马员工' && value !== '经销商员工') {
        return null;
      }
      return <div>
        {
          value === '宝马员工' ? (
            <div>
              <div>
                <div className="page-my-profile-verify-header-box">
                  {this.state.winOrgInfo.open_id_number === 1 ? (
                    <span className="page-my-profile-verify-header-start">*</span>
                  ) : null}
                  <div className="page-my-profile-verify-fonts">{t('所属公司')}</div>
                  <select
                    id="volunteer_company_affiliation"
                    onChange={() => {
                      this.setState({
                        ...this.state,
                        volunteer_company_affiliation: this.volunteer_company_affiliation.value
                      });
                    }}
                    ref={c => {
                      this.volunteer_company_affiliation = c;
                    }}
                  >
                    <option value="-1" />
                    {volunteer_company.map((item, keys) => (
                      <option value={item} key={keys}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="line1px" />
              </div>
              <div>
                <div className="page-my-profile-verify-header-box">
                  <span className="page-my-profile-verify-header-start">*</span>
                  <div className="page-my-profile-verify-fonts">{t('员工号')}</div>
                  <input
                    type="text"
                    onChange={() => {
                      this.setState({
                        volunteer_employee_id: this.volunteer_employee_id.value,
                      })
                    }}
                    ref={c => {
                      this.volunteer_employee_id = c;
                    }}
                    className="page-my-profile-verify-text"
                  />
                </div>
                <div className="line1px" />
              </div>
            </div>
          ) : null
        }
        {
          value === '经销商员工' ? (
            <div>
              <div className="page-my-profile-verify-header-box">
                <span className="page-my-profile-verify-header-start">*</span>
                <div className="page-my-profile-verify-fonts">{t('经销商简称')}</div>
                <input
                  type="text"
                  ref={c => {
                    this.volunteer_dealer_name = c;
                  }}
                  className="page-my-profile-verify-text"
                  onChange={() => {
                    this.setState({
                      volunteer_dealer_name: this.volunteer_dealer_name.value,
                    })
                  }}
                />
              </div>
              <div className="line1px" />
            </div>
          ) : null
        }
        <div>
          <div className="page-my-profile-verify-header-box">
            <span className="page-my-profile-verify-header-start">*</span>
            <div className="page-my-profile-verify-fonts">{t('邮箱')}</div>
            <input
              type="text"
              ref={c => {
                this.volunteer_email = c;
              }}
              className="page-my-profile-verify-text"
              onChange={() => {
                this.setState({
                  volunteer_email: this.volunteer_email.value,
                })
              }}
            />
          </div>
          <div className="line1px" />
        </div>
      </div>;
    }
    return null;
  }

  render() {
    const BackButtonStyle = {
      display: "block",
      width: "100%",
      color: "white",
      border: "none",
      position: "absolute",
      top: "-55px",
      left: "0"
    };
    const { t } = this.props;
    return (
      <div className="page-my-profile-verify-container">
        {this.state.winOrgInfo === null ? null : (
          <div style={{ width: "100%", height: "100%" }}>
            <div className="page-my-profile-verify-main">
              {//头像
                this.renderAvatars()}
              {//名字
                this.renderName()}

              {//身份证
                this.renderIdCard()}

              {//地址
                this.renderAddr()
              }
              {//密码
                this.renderPassword()}
              {// 用户类型
                this.renderUserType()
              }
              {// 其他依据身份类型的
                this.renderOtherModule()
              }
            </div>
            <div className="page-my-profile-verify-btn" onClick={this.onSubmit}>
              {t('提交')}
            </div>
          </div>
        )}
        <Gallery
          src={this.state.previewData}
          show={this.state.showMultiple}
          defaultIndex={this.state.defaultIndex}
        >
          <Button
            style={BackButtonStyle}
            onClick={e => this.setState({ showMultiple: false })}
            plain
          >
            Back
          </Button>
        </Gallery>
      </div>
    );
  }
}

Verify.title = i18next.t("完善个人资料");
Verify.propTypes = {
  checkUser: PropTypes.func,
  requestUserInfo: PropTypes.func,
  addressDataAction: PropTypes.func,
  address: PropTypes.shape({
    data: PropTypes.shape({
      province: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          lat: PropTypes.string,
          level: PropTypes.number,
          lon: PropTypes.string,
          name: PropTypes.string,
          parent_id: PropTypes.number,
          short_name: PropTypes.string,
          sort: PropTypes.number,
          stt: PropTypes.number
        })
      ),
      city: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          lat: PropTypes.string,
          level: PropTypes.number,
          lon: PropTypes.string,
          name: PropTypes.string,
          parent_id: PropTypes.number,
          short_name: PropTypes.string,
          sort: PropTypes.number,
          stt: PropTypes.number
        })
      ),
      county: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          lat: PropTypes.string,
          level: PropTypes.number,
          lon: PropTypes.string,
          name: PropTypes.string,
          parent_id: PropTypes.number,
          short_name: PropTypes.string,
          sort: PropTypes.number,
          stt: PropTypes.number
        })
      )
    })
  }),
  check: PropTypes.shape({
    fetching: PropTypes.bool,
    failed: PropTypes.bool
  }),
  route: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string
    })
  })
};

export default connect(
  state => ({
    user: state.user,
    address: state.info.address,
    check: state.info.checkUser,
    login: state.login.login
  }),
  dispatch =>
    bindActionCreators(
      {
        requestUserInfo,
        checkUser,
        addressDataAction,
        userDefinedInfo,
        loginAction
      },
      dispatch
    )
)(translate('translations')(Verify));
