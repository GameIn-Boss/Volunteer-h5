/**
 * @file 我的消息
 */

/* eslint  "jsx-a11y/no-static-element-interactions":"off", "react/no-array-index-key":"off" */
import React, { PropTypes } from "react";
import FastClick from "fastclick";
import Alert from "react-s-alert";
import autoBind from "react-autobind";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { requestUserInfo } from "../../../stores/common";
import { addressDataAction } from "./profile.store";
import { checkEdit } from "./../my.store";
import { user_type, volunteer_company } from "../../../utils/funcs";
import "./verify.css";
import { List, Checkbox, DatePicker, Radio, InputItem } from "antd-mobile";
import "antd-mobile/lib/date-picker/style/css";
import "antd-mobile/lib/checkbox/style/css";
import "antd-mobile/lib/Radio/style/css";
import "./verifyAntd.css";
import { Dialog, Gallery, GalleryDelete, Button, Icon } from "react-weui";
import "weui/dist/style/weui.css";
import "react-weui/build/packages/react-weui.css";
import "./bindProfile.css";
import { cardtype, people } from '../../../utils/config';
const isAndroid = /android/i.test(navigator.userAgent);
import monemt from "moment";
import { translate } from 'react-i18next';
import i18next from 'i18next';
import locale_ZN from 'antd-mobile/es/date-picker/locale/zh_CN';
import locale_US from 'antd-mobile/es/date-picker/locale/en_US';
let isEmpty = false;

function checkEmpty(value, label) {
  if (!value || !value.length) {
    Alert.warning(`${i18next.t('请填写')}${label}`);
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
class BindInfo extends React.Component {
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
    if (this.props.user && this.props.user.province_id) {
      this.props.addressDataAction(this.props.user.province_id);
    }
    if (this.props.user && this.props.user.city_id) {
      this.props.addressDataAction(this.props.user.city_id);
    }
  }

  componentDidMount() {
    // Android 下 fastclick 影响 select 点击
    if (window.fastclick && isAndroid) {
      window.fastclick.destroy();
      window.fastclick = null;
    }
    const { user } = this.props;
    if (user) {
      this.setState({
        province: user.province_id,
        city: user.city_id,
        county: user.county_id,
        birthday: user.birthday,
        volunteer_company_affiliation: user.volunteer_company_affiliation,
        volunteer_dealer_name: user.volunteer_dealer_name,
        volunteer_email: user.volunteer_email,
        volunteer_employee_id: user.volunteer_employee_id,
        volunteer_user_type: user.volunteer_user_type,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { failed: tFailed, fetching: tFetching } = this.props.checkEditData;
    const { failed: nFailed, fetching: nFetching } = nextProps.checkEditData;
    if (!tFailed && tFetching && !nFailed && !nFetching) {
      location.replace("/my");
    }
  }

  componentWillUnmount() {
    if (!window.fastclick && isAndroid) {
      window.fastclick = FastClick.attach(document.body);
    }
  }

  onSubmit() {
    const {
      winOrgInfo: stateOrgData,
      people,
      province,
      city,
      county,
      birthday,

      volunteer_user_type,
      volunteer_company_affiliation,
      volunteer_employee_id,
      volunteer_dealer_name,
      volunteer_email,
    } = this.state;
    const { user, t } = this.props;
    if (
      (stateOrgData.open_addr && checkEmpty(`${province}`, t('省份'))) ||
      (stateOrgData.open_addr && checkEmpty(`${city}`, t('城市'))) ||
      (stateOrgData.open_addr && checkEmpty(`${county}`, t('区县'))) ||
      checkEmpty(volunteer_user_type, t('身份类型'))
    ) {
      return;
    }
    if (volunteer_user_type === undefined || volunteer_user_type === -1) {
      Alert.warning(`${i18next.t('请填写')}${i18next.t('身份类型')}`);
      return;
    }
    let data = {};
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
      data.volunteer_company_affiliation = volunteer_company_affiliation;
      data.volunteer_employee_id = volunteer_employee_id;
      data.volunteer_email = volunteer_email;
    } else if(volunteer_user_type === '经销商员工') {
      if (
        checkEmpty(volunteer_dealer_name, t('经销商简称')) ||
        checkEmpty(volunteer_email, t('邮箱')) ||
        verifyEmail(volunteer_email)
      ) {
        return;
      }
      data.volunteer_email = volunteer_email;
      data.volunteer_dealer_name = volunteer_dealer_name;
    }

    //出生日期、性别   需要判断身份证位数   18位的不可修改
    if (user.num_type && user.num_type != 1) {
      data.birthday = monemt(birthday).format("YYYY-MM-DD");
    }
    //下面是统一的信息
    if (province && province != -1) {
      data.province_id = province;
    }
    if (city && city != -1) {
      data.city_id = city;
    }
    if (county && county != -1) {
      data.county_id = county;
    }
    data.volunteer_user_type = volunteer_user_type;

    this.props.checkEdit(data);
  }


  handleProvinceClick() {
    this.setState({
      ...this.state,
      province: this.province.value,
      city: -1,
      county: -1
    });
    this.props.addressDataAction(this.province.value);
  }

  handleCityClick() {
    this.setState({
      ...this.state,
      city: this.city.value,
      county: -1
    });
    this.props.addressDataAction(this.city.value);
  }

  handleCountyClick() {
    this.setState({
      ...this.state,
      county: this.county.value
    });
  }

  renderName() {
    const { user, t } = this.props;
    return (
      <div>
        <div className="page-my-profile-verify-header-box">
          <div className="page-my-profile-verify-fonts">{t('姓名')}</div>
          <div className="padding-left-15">{user.real_name || user.username}</div>
        </div>
        <div className="line1px" />
      </div>
    );
  }

  renderIdCard() {
    const { user, t } = this.props;
    const num_typeArr = cardtype.filter(v => Number(v.id) === Number(user.num_type));
    return (
      <div>
        <div className="page-my-profile-verify-header-box">
          <div className="page-my-profile-verify-fonts">{t('证件类型')}</div>
          <div className="padding-left-15">{num_typeArr[0].name}</div>
        </div>
        <div className="line1px" />
        <div className="page-my-profile-verify-header-box">
          <div className="page-my-profile-verify-fonts">{t('证件号码')}</div>
          <div className="padding-left-15">{user.id_number}</div>
        </div>
        <div className="line1px" />
      </div>
    );
  }
  //出生日期  需判断用户的证件类型，18位的不可修改
  renderBirthday() {
    const { user, t, i18n } = this.props;
    const { language } = i18n;
    if (user.num_type && user.num_type == 1) {
      return (
        <div>
          <div className="page-my-profile-verify-header-box">
            <div className="page-my-profile-verify-fonts">{t('出生日期')}</div>
            <div className="padding-left-15">{user.birthday}</div>
          </div>
          <div className="line1px" />
        </div>
      )
    } else {
      return (
        <div>
          <div className="page-my-profile-verify-header-box default-picker">
            <DatePicker
              mode="date"
              title={t('请选择出生日期')}
              minDate={new Date('1870-01-01')}
              maxDate={new Date()}
              value={new Date(this.state.birthday || user.birthday)}
              extra={t('请选择出生日期')}
              locale={language === 'zh-CN' ? locale_ZN : locale_US}
              onChange={date => this.setState({ birthday: date })}
            >
              <List.Item arrow="horizontal">{t('出生日期')}</List.Item>
            </DatePicker>
          </div>
          <div className="line1px" />
        </div>
      );
    }
  }

  renderAddr() {
    const { user, t, i18n } = this.props;
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
                value={this.state.province || user.province_id || ''}
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
                value={this.state.city || user.city_id || ''}
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
                value={this.state.county || user.county_id || ''}
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

  onPreview(e) {
    const num = e.target.id;
    var key = e.target.getAttribute("data-key");
    const imagesArr = this.state[key];
    this.setState({
      previewData: imagesArr,
      showMultiple: true,
      defaultIndex: 0
    });
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
            value={this.state.volunteer_user_type}
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
                    value={this.state.volunteer_company_affiliation}
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
                    value={this.state.volunteer_employee_id}
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
                  value={this.state.volunteer_dealer_name}
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
              value={this.state.volunteer_email}
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
    if (!this.props.user) {
      return null;
    }
    const { t } = this.props;
    return (
      <div className="page-my-profile-verify-container">
        {this.state.winOrgInfo === null ? null : (
          <div style={{ width: "100%", height: "100%" }}>
            <div className="page-my-profile-verify-main">
              {//名字
                this.renderName()}

              {//身份证
                this.renderIdCard()}
              {//出生日期
                this.renderBirthday()
              }
              {//地址
                this.renderAddr()}
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


BindInfo.title = i18next.t('个人信息绑定');
BindInfo.propTypes = {
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
    checkEditData: state.my.checkEdit
  }),
  dispatch =>
    bindActionCreators(
      {
        requestUserInfo,
        addressDataAction,
        checkEdit
      },
      dispatch
    )
)(translate('translations')(BindInfo));
