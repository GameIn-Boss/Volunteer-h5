/**
 * @file 手机号绑定/邮箱
 */

/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from "react";
import FastClick from "fastclick";
import Alert from "react-s-alert";
import autoBind from "react-autobind";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import uploadToWX from "../../../utils/wxupload";
import UploadAvatar from "./../../../components/uploadAvatar/uploadAvatar";
import { requestUserInfo } from "../../../stores/common";
import Avatar from "../../../components/avatar/avatar";
import { addressDataAction } from "./profile.store";
import { checkEdit } from "./../my.store";

import { getQueryString } from "../../../utils/funcs";
import uploadImage from "../../../utils/uploadImage";
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
const RadioItem = Radio.RadioItem;
const isAndroid = /android/i.test(navigator.userAgent);
import monemt from "moment";
const people = [
    { id: "01", name: "汉族" },
    { id: "02", name: "蒙古族" },
    { id: "03", name: "回族" },
    { id: "04", name: "藏族" },
    { id: "05", name: "维吾尔族" },
    { id: "06", name: "苗族" },
    { id: "07", name: "彝族" },
    { id: "08", name: "壮族" },
    { id: "09", name: "布依族" },
    { id: "10", name: "朝鲜族" },
    { id: "11", name: "满族" },
    { id: "12", name: "侗族" },
    { id: "13", name: "瑶族" },
    { id: "14", name: "白族" },
    { id: "15", name: "土家族" },
    { id: "16", name: "哈尼族" },
    { id: "17", name: "哈萨克族" },
    { id: "18", name: "傣族" },
    { id: "19", name: "黎族" },
    { id: "20", name: "傈僳族" },
    { id: "21", name: "佤族" },
    { id: "22", name: "畲族" },
    { id: "23", name: "高山族" },
    { id: "24", name: "拉祜族" },
    { id: "25", name: "水族" },
    { id: "26", name: "东乡族" },
    { id: "27", name: "纳西族" },
    { id: "28", name: "景颇族" },
    { id: "29", name: "柯尔克孜族" },
    { id: "30", name: "土族" },
    { id: "31", name: "达斡尔族" },
    { id: "32", name: "仫佬族" },
    { id: "33", name: "羌族" },
    { id: "34", name: "布朗族" },
    { id: "35", name: "撒拉族" },
    { id: "36", name: "毛难族" },
    { id: "37", name: "仡佬族" },
    { id: "38", name: "锡伯族" },
    { id: "39", name: "阿昌族" },
    { id: "40", name: "普米族" },
    { id: "41", name: "塔吉克族" },
    { id: "42", name: "怒族" },
    { id: "43", name: "乌孜别克族" },
    { id: "44", name: "俄罗斯族" },
    { id: "45", name: "鄂温克族" },
    { id: "46", name: "崩龙族" },
    { id: "47", name: "保安族" },
    { id: "48", name: "裕固族" },
    { id: "49", name: "京族" },
    { id: "50", name: "塔塔尔族" },
    { id: "51", name: "独龙族" },
    { id: "52", name: "鄂伦春族" },
    { id: "53", name: "赫哲族" },
    { id: "54", name: "门巴族" },
    { id: "55", name: "珞巴族" },
    { id: "56", name: "基诺族" }
];

const cardtype = [
    { id: "1", name: "内地居民身份证" },
    { id: "2", name: "香港居民身份证" },
    { id: "3", name: "澳门居民身份证" },
    { id: "4", name: "台湾居民身份证" },
    { id: "5", name: "护照" }
];
let isEmpty = false;

function checkEmpty(value, label) {
    if (!value || !value.length) {
        Alert.warning(`请填写${label}`);
        isEmpty = true;
        return true;
    } else {
        isEmpty = false;
    }
    return false;
}

//判断自定义信息必填的是否为空
function isRequired(arr, stateData) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].is_required && arr[i].is_required === 1) {
            const keys = Object.keys(stateData);
            if (keys.length != 0) {
                let isInArr = false; //记录自定义信息的对象中必填的key是否在存在
                for (let j in stateData) {
                    if (arr[i].key === j && stateData.hasOwnProperty(j)) {
                        isInArr = false;
                        break;
                    } else {
                        isInArr = true;
                    }
                }
                if (isInArr) {
                    checkEmpty(null, arr[i].label);
                    return true;
                }
            } else {
                Alert.warning(`请填写${arr[i].label}`);
                isEmpty = true;
                break;
            }
        }
    }
    if (isEmpty) {
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
        Alert.warning("请输入中文姓名或英文姓名");
        return true;
    }
    return false;
}
// console.log(checkRealname('家icon_i i-oo-'));

function iscard(card) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!reg.test(card)) {
        Alert.warning("身份证输入不合法");
        return true;
    }
    return false;
}
function isaomencard(card) {
    const reg = /^[1|5|7][0-9]{6}\([0-9Aa]\)/;
    if (!reg.test(card)) {
        Alert.warning("身份证输入不合法");
        return true;
    }
    return false;
}
function isxiangancard(card) {
    const reg = /^((\s?[A-Za-z])|([A-Za-z]{2}))\d{6}(([0−9aA])|([0-9aA]))$/;
    if (!reg.test(card)) {
        Alert.warning("身份证输入不合法");
        return true;
    }
    return false;
}
function istaiwancard(card) {
    const reg = /^[a-zA-Z][0-9]{9}$/;
    if (!reg.test(card)) {
        Alert.warning("身份证输入不合法");
        return true;
    }
    return false;
}
function formatDate(x, y) {
    /* eslint no-confusing-arrow: 0 */
    const pad = n => (n < 10 ? `0${n}` : n);
    const date = new Date(x);
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate()
    )}`;
    const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    if (y) {
        return `${dateStr} ${timeStr}`;
    } else {
        return `${dateStr}`;
    }
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
            extendsArray: {},
            winOrgInfo: window.orgInfo.custom_config,
            showMultiple: false,
            previewData: [],
            cardtype: 1
        };
        this.CustomChildren = ({ extra, onClick }) => (
            <div
                onClick={onClick}
                style={{ height: "40px", lineHeight: "40px", color: "#565656" }}
            >
        <span className="page-my-profile-verify-text page-my-profile-verify-text-lineheight">
          {extra}
            <img src="/images/my/more.png" />
        </span>
            </div>
        );
    }

    componentWillMount() {
        this.props.addressDataAction(0);
        if(this.props.user&&this.props.user.province_id) {
            this.props.addressDataAction(this.props.user.province_id);
        }
        if(this.props.user&&this.props.user.city_id) {
            this.props.addressDataAction(this.props.user.city_id);
        }
        const params = this.props.route.params;

        if (this.state.winOrgInfo !== null && this.state.winOrgInfo.extends) {
            this.initialPic(this.state.winOrgInfo.extends);
        }
    }

    componentDidMount() {
        // Android 下 fastclick 影响 select 点击
        if (window.fastclick && isAndroid) {
            window.fastclick.destroy();
            window.fastclick = null;
        }
        if(this.props.user) {
            this.setState({
                people: this.props.user.nation,
                address: this.props.user.addr,
                province: this.props.user.province_id,
                city: this.props.user.city_id,
                county: this.props.user.county_id,
                birthday: this.props.user.birthday,
                extendsArray: this.props.user.extends
            });
            //展开extends里的字段
            if(this.props.user.extends) {
                const keys = Object.keys(this.props.user.extends);
                keys.length&&keys.map(item=>{
                    this[item]=this.props.user.extends[item]
                });
                this.setState({
                    ...this.props.user.extends
                })
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(this.props,nextProps)
        const { failed: tFailed, fetching: tFetching} = this.props.checkEditData;
        const { failed: nFailed, fetching: nFetching} = nextProps.checkEditData;
        if(!tFailed&&tFetching&&!nFailed&&!nFetching) {
            location.replace("/my");
        }
    }

    componentWillUnmount() {
        if (!window.fastclick && isAndroid) {
            window.fastclick = FastClick.attach(document.body);
        }
    }

    // 初始化上传照片
    initialPic(data) {
        data.map((item, index) => {
            if (item.type == 5) {
                this.setState({
                    [item.key]: [],
                    ...this.state
                });
            }
        });
    }

    onTextChanged() {
        const address = this.address.value.replace(/(^\s+)|(\s+$)/g, "");
        this.setState({
            address,
        });
    }

    onSubmit() {
        const {
            winOrgInfo: stateOrgData,
            people,
            address,
            province,
            city,
            county,
            birthday,
        } = this.state;
        const { user } = this.props;
        if (
            (stateOrgData.open_nation && checkEmpty(people, "民族")) ||
            (stateOrgData.open_addr && checkEmpty(province, "省份")) ||
            (stateOrgData.open_addr && checkEmpty(city, "城市")) ||
            (stateOrgData.open_addr && checkEmpty(county, "区县")) ||
            (stateOrgData.open_addr && checkEmpty(address, "详细地址"))
        ) {
        }
        let data = {};
        //出生日期、性别   需要判断身份证位数   18位的不可修改
        if(user.num_type&&user.num_type!=1) {
            data.birthday=monemt(birthday).format("YYYY-MM-DD");
        }
        //下面是统一的信息
        if (people) {
            data.nation = people;
        }
        if (province&&province!=-1) {
            data.province_id = province;
        }
        if (city&&city!=-1) {
            data.city_id = city;
        }
        if (county&&county!=-1) {
            data.county_id = county;
        }
        if (address) {
            data.addr = address;
        }

        data.extends = this.state.extendsArray;
        this.props.checkEdit(data);
    }
    handleCardClick() {
        this.setState({ ...this.state, cardtype: this.cardtype.value });
    }
    handlePeopleClick() {
        this.setState({
            ...this.state,
            people: this.people.value
        });
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

    handleCountryClick() {
        this.setState({
            ...this.state,
            county: this.county.value
        });
    }

    renderName() {
        const { user } = this.props;
        return (
            <div>
                <div className="page-my-profile-verify-header-box">
                    <div className="page-my-profile-verify-fonts">姓名</div>
                    <div className="padding-left-15">{user.real_name || user.username}</div>
                </div>
                <div className="line1px" />
            </div>
        );
    }

    renderIdCard() {
        const { user } = this.props;
        let num_type = '';
        if(user.num_type) {
            switch(user.num_type) {
                case 1:
                    num_type='内地身份证';
                    break;
                case 2:
                    num_type='香港';
                    break;
                case 3:
                    num_type='澳门';
                    break;
                case 4:
                    num_type='台湾';
                    break;
                case 5:
                    num_type='护照';
                    break;
                default:
                    num_type='内地身份证';
                    break;
            }
        };
        return (
            <div>
                <div className="page-my-profile-verify-header-box">
                    <div className="page-my-profile-verify-fonts">证件类型</div>
                    <div className="padding-left-15">{num_type}</div>
                </div>
                <div className="line1px" />
                <div className="page-my-profile-verify-header-box">
                    <div className="page-my-profile-verify-fonts">证件号码</div>
                    <div className="padding-left-15">{user.id_number}</div>
                </div>
                <div className="line1px" />
            </div>
        );
    }
    //出生日期  需判断用户的证件类型，18位的不可修改
    renderBirthday() {
        const { user } = this.props;
        if(user.num_type&&user.num_type==1) {
            return(
                <div>
                    <div className="page-my-profile-verify-header-box">
                        <div className="page-my-profile-verify-fonts">出生日期</div>
                        <div className="padding-left-15">{user.birthday}</div>
                    </div>
                    <div className="line1px" />
                </div>
            )
        }else {
            return (
                <div>
                    <div className="page-my-profile-verify-header-box default-picker">
                        <DatePicker
                            mode="date"
                            title="选择出生日期"
                            minDate={new Date('1870-01-01')}
                            maxDate={new Date()}
                            value={new Date(this.state.birthday || user.birthday)}
                            extra="请选择出生日期"
                            onChange={date => this.setState({ birthday: date })}
                        >
                            <List.Item arrow="horizontal">出生日期</List.Item>
                        </DatePicker>
                    </div>
                    <div className="line1px"/>
                </div>
            );
        }
    }
    renderNation() {
        const { user } = this.props;
        return (
            <div>
                <div className="page-my-profile-verify-header-box">
                    {this.state.winOrgInfo.open_nation === 1 ? (
                        <span className="page-my-profile-verify-header-start">*</span>
                    ) : null}

                    <div className="page-my-profile-verify-fonts">民族</div>
                    <label htmlFor="people">
                        <select
                            id="people"
                            defaultValue={user.nation || null}
                            onChange={this.handlePeopleClick}
                            ref={c => {
                                this.people = c;
                            }}
                        >
                            <option value="-1" />
                            {people &&
                            people.map((item, keys) => (
                                <option value={item.name} key={keys}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className="line1px" />
            </div>
        );
    }

    renderAddr() {
        const { user } = this.props;
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
                        <div className="page-my-profile-verify-fonts">省份</div>
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
                                        {item.name}
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
                        <div className="page-my-profile-verify-fonts">城市</div>
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
                                        {item.name}
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
                        <div className="page-my-profile-verify-fonts">区县</div>
                        <label htmlFor="county">
                            <select
                                id="county"
                                value={this.state.county || user.county_id || ''}
                                onChange={this.handleCountryClick}
                                ref={c => {
                                    this.county = c;
                                }}
                            >
                                <option value="-1" />
                                {county &&
                                county.map((item, keys) => (
                                    <option value={item.id} key={keys}>
                                        {item.name}
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
                        <div className="page-my-profile-verify-fonts">详细地址</div>
                        <input
                            type="text"
                            ref={c => {
                                this.address = c;
                            }}
                            defaultValue={user.addr}
                            className="page-my-profile-verify-text"
                            onChange={this.onTextChanged}
                        />
                    </div>
                    <div className="line1px" />
                </div>
            </div>
        );
    }

    handleOtherInfoSelectClick(e) {
        const key = e.target.id;
        const value = e.target.value;
        this[key]=value;
        this.pushExtendsArray(key, value);
    }

    //单选控件
    renderOtherInfoSelect(item) {
        const data = item;
        const key = data.key;
        const options = data.options.split(",");
        return (
            <div>
                <div className="page-my-profile-verify-header-box">
                    {item.is_required === 1 ? (
                        <span className="page-my-profile-verify-header-start">*</span>
                    ) : null}
                    <div className="page-my-profile-verify-fonts">{data.label}</div>
                    <label htmlFor={`${key}`}>
                        <select id={`${key}`} value={this[key] || this.state[key]} onChange={this.handleOtherInfoSelectClick}>
                            <option value="-1" />
                            {options.map((item1, keys) => (
                                <option value={item1} key={keys}>
                                    {item1}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="line1px" />
            </div>
        );
    }

    //多选控件
    onChange = (key, val) => {
        this.pushExtendsArray(key, val, true);
    };

    renderOtherInfoCheckbox(item1) {
        const CheckboxItem = Checkbox.CheckboxItem;
        let labels = item1.options.split(",");
        let data = [];
        let userExtends;
        if(this.props.user) {
            userExtends = this.props.user.extends&&this.props.user.extends[item1.key]&&this.props.user.extends[item1.key].split(',');
        }
        labels.map((item, index) => {
            let obj = {};
            obj.value = index;
            obj.label = item;
            obj.checked = false;
            if(userExtends&&userExtends.length) {
                userExtends.map(i=>{
                    if(i === item) {
                        obj.checked=true;
                    }
                });
            }
            data.push(obj);
        });

        return (
            <div className="page-my-profile-other-title">
                {item1.is_required === 1 ? (
                    <span className="page-my-profile-verify-header-start page-my-profile-verify-header-other-start">
            *
          </span>
                ) : null}
                <List renderHeader={() => item1.label}>
                    {data.map(i => (
                        <CheckboxItem
                            key={`${item1.key}${i.value}`}
                            checked={i.checked}
                            onChange={() => this.onChange(item1.key, i.label)}
                        >
                            {i.label}
                        </CheckboxItem>
                    ))}
                </List>
            </div>
        );
    }

    //单行
    renderOtherInfoInput(item) {
        const data = item;
        const key = data.key;
        return (
            <div>
                <div>
                    <div className="page-my-profile-verify-header-box">
                        {item.is_required === 1 ? (
                            <span className="page-my-profile-verify-header-start">*</span>
                        ) : null}
                        {data.label}
                    </div>
                    <input
                        id={`${key}`}
                        value={this[key] || ''}
                        className="page-my-profile-verify-double-text"
                        onChange={this.handleOtherInfoInputClick}
                    />

                    <div className="line1px" />
                </div>
            </div>
        );
    }

    handleOtherInfoInputClick(e) {
        const key = e.target.id;
        const value = e.target.value;
        this[key] = value;
        this.pushExtendsArray(key, value);
    }

    // 多行
    renderOtherInfoManyInput(item) {
        const data = item;
        const key = data.key;
        return (
            <div>
                <div className="page-my-profile-verify-header-box">
                    {item.is_required === 1 ? (
                        <span className="page-my-profile-verify-header-start">*</span>
                    ) : null}
                    {data.label}
                </div>

                <textarea
                    // placeholder={`请输入${data.label}`}
                    id={`${key}`}
                    className="page-my-profile-edit-text"
                    maxLength="200"
                    value={this[key] || ''}
                    onChange={this.handleOtherInfoManyInputClick}
                />

                <div className="line1px" />
            </div>
        );
    }

    handleOtherInfoManyInputClick(e) {
        const key = e.target.id;
        const value = e.target.value;
        console.log(value)
        this[key]=value;
        this.pushExtendsArray(key, value);
    }

    // 选择时间
    renderOtherInfoDate(item) {
        const data = item;
        const key = data.key;
        return (
            <div>
                <div className="page-my-profile-verify-header-box">
                    {item.is_required === 1 ? (
                        <span className="page-my-profile-verify-header-start">*</span>
                    ) : null}
                    <div className="page-my-profile-verify-fonts">{data.label}</div>

                    <DatePicker
                        mode="date"
                        format="YYYY-MM-DD"
                        value={this[key]&&new Date(this[key]) || new Date()}
                        extra={` `}
                        onOk={v => (
                            this.pushExtendsArray(key, formatDate(v)),
                                this[key]=v,
                                this.setState({
                                    ...this.state,
                                    [key]: v
                                })
                        )}
                    >
                        <this.CustomChildren />
                    </DatePicker>
                </div>
                <div className="line1px" />
            </div>
        );
    }

    renderOtherInfoDateTime(item) {
        const data = item;
        const key = data.key;
        return (
            <div>
                <div className="page-my-profile-verify-header-box">
                    {item.is_required === 1 ? (
                        <span className="page-my-profile-verify-header-start">*</span>
                    ) : null}
                    <div className="page-my-profile-verify-fonts">{data.label}</div>
                    <DatePicker
                        mode="datetime"
                        format="YYYY-MM-DD HH:mm"
                        value={this[key]&&new Date(this[key]) || new Date()}
                        extra={`  `}
                        onOk={v => (
                            this.pushExtendsArray(key, formatDate(v, true)),
                                this[key]=v,
                                this.setState({
                                    ...this.state,
                                    [key]: v
                                })
                        )}
                    >
                        <this.CustomChildren />
                    </DatePicker>
                </div>
                <div className="line1px" />
            </div>
        );
    }

    // 上传图片
    onPicClick(e) {
        var key = e.target.id;
        const attachment = this.state[key];
        uploadToWX({
            success: urls => {
                if (urls.length == 1) {
                    attachment.push(urls[0]);
                } else if (urls.length > 1) {
                    for (var i = 0; i < urls.length; i++) {
                        attachment.push(urls[i]);
                    }
                }
                this.setState({ ...this.state, [key]: attachment });
                this.pushExtendsArray(key, attachment);
            }
        });
    }
    uploadPhotoClick(e) {
        console.log(e);
    }
    onPhotoChange(e) {
        let key = e.target.id;
        uploadImage(`/api/imgupload`, {
            method: "POST",
            data: { file: { file: e.target.files[0] } }
        }).then(json => {
            if (json.error_code === 0) {
                // const attachment = this.state[key];
                // attachment.push(json.data.url);
                // this.setState({
                //     ...this.state,
                //     [key]: attachment
                // });
                // this.pushExtendsArray(key, attachment);
                //修改   只上传一张图片
                this.setState({
                    ...this.state,
                    [key]: json.data.url
                });
                this.pushExtendsArray(key, json.data.url);
            }
        });
    }

    onPicDel(e) {
        // const num = e.target.id;
        // var key = e.target.getAttribute("data-key");
        // const attachment = this.state[key];
        // attachment.splice(num, 1);
        // this.setState({ ...this.state, [key]: attachment }),
        //     this.pushExtendsArray(key, attachment);
        var key = e.target.getAttribute("data-key");
        delete this.state[key];
        this.setState({ ...this.state});
        delete this.state.extendsArray[key];
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

    renderOtherPic(item) {
        const data = item;
        const key = data.key;
        return (
            <div className="page-my-profile-other-title">
                {item.is_required === 1 ? (
                    <span className="page-my-profile-verify-header-start page-my-profile-verify-header-other-pic-start">
            *
          </span>
                ) : null}
                <div className="page-my-profile-verify-header-box-pic-fonts">
                    {data.label}
                </div>
                <div className="page-post-container-photo-container">
                    {/*{this.state[key].map((item, keys) => (*/}
                        {/*<div className="page-applys-item-render-container" key={keys}>*/}
                            {/*<div className="page-applys-item-view">*/}
                                {/*<Avatar*/}
                                    {/*src={item}*/}
                                    {/*size={{ width: 80, radius: 1 }}*/}
                                    {/*id={keys}*/}
                                    {/*key={item}*/}
                                    {/*data-key={`${key}`}*/}
                                    {/*onClick={this.onPreview}*/}
                                {/*/>*/}
                            {/*</div>*/}
                            {/*<div*/}
                                {/*className="page-applys-item-render-del"*/}
                                {/*onClick={this.onPicDel}*/}
                                {/*id={keys}*/}
                                {/*key={item}*/}
                                {/*data-key={`${key}`}*/}
                            {/*/>*/}
                        {/*</div>*/}
                    {/*))}*/}
                    {
                        this.state[key]&&this.state[key].length ?
                            <div className="page-applys-item-render-container">
                                <div className="page-applys-item-view">
                                    <Avatar
                                        src={this.state[key]}
                                        size={{ width: 80, radius: 1 }}
                                        id={key}
                                        data-key={`${key}`}
                                        onClick={this.onPreview}
                                    />
                                </div>
                                <div
                                    className="page-applys-item-render-del"
                                    onClick={this.onPicDel}
                                    id={key}
                                    data-key={`${key}`}
                                />
                            </div>
                            :
                            null
                    }
                    {this.state[key]&&this.state[key].length ? (
                        <div />
                    ) : (
                        <div className="page-profile-header-uploade-box-div">
                            <div className="page-profile-header-uploade-box-iptbox">
                                <input
                                    id={key}
                                    onChange={this.onPhotoChange}
                                    accept="image/png, image/jpeg, image/jpg"
                                    ref={c => {
                                        this.uploadImages = c;
                                    }}
                                    className="page-profile-header-uploade-box-ipt"
                                    type="file"
                                />
                            </div>
                            {/*<div className="page-profile-header-uploade-box-img"*/}
                            {/*style={{backgroundImage: `url(${this.state.avatar ? this.state.avatar : '/images/my/register.png'})`}}></div>*/}
                        </div>
                    )}
                </div>
                <div className="line1px" />
            </div>
        );
    }

    /*
     * 数组排序
     * oldArr   标准的数组
     * newArr   要排序的数组
     * */
    softArr(oldArr, newArr) {
        let softArr = [];
        oldArr.map(i => {
            newArr.map(k => {
                if (i === k) {
                    softArr.push(k);
                }
            });
        });
        return softArr;
    }

    // push 数组
    /*
     * key 键
     * value 值
     * isMany 是否多选 true是 false否
     * */
    pushExtendsArray(key, value, isMany) {
        const extendsArray = this.state.extendsArray;
        const windowOrgConfig = this.state.winOrgInfo;
        if (!isMany) {
            if (value == "-1") {
                if (key in extendsArray) {
                    delete extendsArray[key];
                } else {
                    return;
                }
            } else {
                extendsArray[key] = value;
            }
        } else {
            //多选
            if (key in extendsArray) {
                //判断多选选项是否已被选，有的话去掉
                if (extendsArray[key].indexOf(value) !== -1) {
                    //已存在,需要排序
                    let extendsArrays = extendsArray[key].split(",");
                    let itemIndex = extendsArrays.indexOf(value);
                    extendsArrays.splice(itemIndex, 1);
                    if (extendsArrays.length <= 0) {
                        delete extendsArray[key];
                    } else {
                        extendsArray[key] = extendsArrays.join(",");
                    }
                } else {
                    //没有被选择,需要排序.
                    extendsArray[key] = String(extendsArray[key]) + "," + value;
                }
                if (key in extendsArray && extendsArray[key].split(",").length > 1) {
                    //长度大于1时进行排序
                    windowOrgConfig.extends.map(i => {
                        if (i.key === key) {
                            extendsArray[key] = this.softArr(
                                i.options.split(","),
                                extendsArray[key].split(",")
                            ).join(",");
                            return;
                        }
                    });
                }
            } else {
                //不在多extendsArray里，直接添加。
                extendsArray[key] = value;
            }
        }
        this.setState({
            ...this.state,
            extendsArray
        });
    }
    renderOtherInfo() {
        const winOrgStateInfo = this.state.winOrgInfo;
        return (
            <div>
                {winOrgStateInfo.extends && winOrgStateInfo.extends.length
                    ? this.state.winOrgInfo.extends.map((item, index) => {
                        switch (
                            Number(item.type) //单项选择
                            ) {
                            case 1:
                                return (
                                    <div key={index}>{this.renderOtherInfoSelect(item)}</div>
                                );
                                break;
                            //多项选择
                            case 2:
                                return (
                                    <div key={index}>{this.renderOtherInfoCheckbox(item)}</div>
                                );
                                break;
                            //单行输入
                            case 3:
                                return (
                                    <div key={index}>{this.renderOtherInfoInput(item)}</div>
                                );
                                break;
                            //多行输
                            case 4:
                                return (
                                    <div key={index}>{this.renderOtherInfoManyInput(item)}</div>
                                );
                                break;

                            //上传图片
                            case 5:
                                return <div key={index}>{this.renderOtherPic(item)}</div>;
                                break;
                            //日期空间
                            case 6:
                                return (
                                    <div key={index}>{this.renderOtherInfoDate(item)}</div>
                                );
                                break;
                            //日期时间空间
                            case 7:
                                return (
                                    <div key={index}>{this.renderOtherInfoDateTime(item)}</div>
                                );
                                break;
                            default:
                                return;
                        }
                    })
                    : null}
            </div>
        );
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
        if(!this.props.user) {
            return null;
        }
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
                            {//民族
                                this.renderNation()}
                            {//地址
                                this.renderAddr()}
                            {//自定义信息
                                this.renderOtherInfo()}
                        </div>
                        <div className="page-my-profile-verify-btn" onClick={this.onSubmit}>
                            提交
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


BindInfo.title = '个人信息绑定';
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
)(BindInfo);
