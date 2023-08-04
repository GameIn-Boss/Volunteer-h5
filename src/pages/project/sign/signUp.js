/* global wx:false */
/* eslint  "jsx-a11y/no-static-element-interactions":"off", "react/no-array-index-key":"off" */

import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import Alert from 'react-s-alert';
import { connect } from 'react-redux';
import classnames from 'classnames';
import uploadToWX from '../../../utils/wxupload';
import UploadPhoto from '../../../components/uploadPhoto/uploadPhoto';
import { bindActionCreators } from 'redux';
import uploadImage from "../../../utils/uploadImage";
import CheckboxStepper from '../../../components/checkboxStepper/index'
import { List, Checkbox, DatePicker, Radio } from 'antd-mobile';
import history from '../../history';
import Avatar from '../../../components/avatar/avatar';
import 'antd-mobile/lib/date-picker/style/css';
import 'antd-mobile/lib/checkbox/style/css';
import 'antd-mobile/lib/Stepper/style/css';
import 'antd-mobile/lib/Radio/style/css';
import '../../my/profile/verifyAntd.css';
import './signUp.css';
import { translate } from 'react-i18next';
import i18next from 'i18next';
import locale_ZN from 'antd-mobile/es/date-picker/locale/zh_CN';
import locale_US from 'antd-mobile/es/date-picker/locale/en_US';
import {
    requestProjectDetail,
} from '../detail/detail.store';
import {
    joinPayProject,
    joinProjectAction
} from '../sign/sign.store';
import {
    getData,
    getAllTags,
    getTag,
    compress,
    rotateImage,
    base64ToBlob
  } from "../../../utils/exif";


import { Dialog, Gallery, GalleryDelete, Button, Icon } from "react-weui";
import "weui/dist/style/weui.css";
import "react-weui/build/packages/react-weui.css";
function formatDate(x, y) {
    /* eslint no-confusing-arrow: 0 */
    const pad = n => n < 10 ? `0${n}` : n;
    const date = new Date(x);
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    if (y) {
        return `${timeStr}`;
    } else {
        return `${dateStr}`;
    }
}

const isAndroid = /android/i.test(navigator.userAgent);
const CheckboxItem = Checkbox.CheckboxItem;
const RadioItem = Radio.RadioItem;
function getnum(num) {
    return Math.round(num * 100) / 100
}



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
        if (Number(arr[i].is_required) && Number(arr[i].is_required) === 1) {

            const keys = Object.keys(stateData);
            if (keys.length != 0) {
                let isInArr = false;    //记录自定义信息的对象中必填的key是否在存在
                for (let j in stateData) {
                    if (arr[i].key == j && stateData.hasOwnProperty(j)) {
                        isInArr = false;

                        break;
                    } else {
                        isInArr = true
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

class SignUpPage extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
        this.projectId = props.route.params.projectId;

        this.state = {
            checkeAll: false,
            extendsArray: {},
            showMultiple: false,
            stationArray: {},
            dateArray: {},
            previewData: []
        };
        this.CustomChildren = ({ extra, onClick }) => (

            <div
                onClick={onClick}
                style={{ height: '40px', lineHeight: '40px', color: '#565656' }}
            >
                <span
                    className="page-project-signUp-verify-text page-project-signUp-verify-text-lineheight"
                >
                    {extra}
                    <img src="/images/my/more.png" /></span>

            </div>
        );
    }

    componentWillMount() {
        this.props.requestProjectDetail(this.projectId)

    }
    componentWillReceiveProps(nextProps) {
        const { detail: Ldetail, joinPay: Lpay, join: Ljoin } = this.props;
        const { detail: Ndetail, joinPay: Npay, join: Njoin } = nextProps;
        if (Ldetail.fetching && !Ldetail.failed && !Ndetail.fetching && !Ndetail.failed && Ndetail.data && Ndetail.data.station_config) {
            this.initialPic(Ndetail.data.station_config);
            this.stationConfig = Ndetail.data.station_config;
        }
        if (Ldetail.fetching && !Ldetail.failed && !Ndetail.fetching && !Ndetail.failed && Ndetail.data && Ndetail.data.custom_config) {
            this.initialPic(Ndetail.data.custom_config);
            this.customConfig = Ndetail.data.custom_config;
        }
        if (Ldetail.fetching && !Ldetail.failed && !Ndetail.fetching && !Ndetail.failed && Ndetail.data && Ndetail.data.project_join_date) {
            this.initialPic(Ndetail.data.project_join_date);
            this.dateConfig = Ndetail.data.project_join_date;
        }


        if (Ldetail.fetching && !Ldetail.failed && !Ndetail.fetching && !Ndetail.failed && Ndetail.data && Ndetail.data.custom_payment_config) {
            let data = [];
            let total = null;
            Ndetail.data.custom_payment_config.map((item, index) => {
                let obj = {};
                obj.amount = item.amount;
                obj.label = item.label;
                obj.is_required = item.is_required;
                obj.key = item.key;
                if (Number(item.is_required) == 1) {
                    obj.num = 1;
                    obj.switch = true;
                    total = obj.num * getnum(obj.amount);
                } else {
                    obj.num = 0;
                    obj.switch = false;
                }
                data.push(obj);
            });
            this.setState({
                ...this.state,
                data,
                total,

            })
        }
        if (Ljoin.fetching && !Ljoin.failed && !Njoin.fetching && !Njoin.failed) {
            window.location.replace(`/project/success/${this.projectId}`)
        }
        if (!Lpay.fetching && Lpay.failed && Npay.fetching && !Npay.failed) {
            // history.replace(`/project/success/${this.projectId}`)
            window.location.replace(`/project/success/${this.projectId}`)
        }
    }
    componentWillDidmount() {
        // Android 下 fastclick 影响 select 点击
        if (window.fastclick && isAndroid) {
            window.fastclick.destroy();
            window.fastclick = null;
        }

    }
    componentWillUnmount() {
        if (!window.fastclick && isAndroid) {
            window.fastclick = FastClick.attach(document.body);
        }
    }


    // 选择时间
    renderTime(item) {
        const data = item;
        const key = data.key;
      const { i18n } = this.props;
      const { language } = i18n;
        return (
            <div>
                <div className="page-project-signUp-verify-header-box">
                    {
                        Number(item.is_required) === 1 ?
                            <span className="page-project-signUp-verify-header-start">*</span>
                            :
                            null
                    }
                    <div className="page-project-signUp-verify-fonts">{item.label}</div>

                    <DatePicker
                        mode="time"
                        value={this.state[key]}
                        extra={`  `}
                        locale={language === 'zh-CN' ? locale_ZN : locale_US}
                        onOk={v => (
                            this.pushExtendsArray(key, formatDate(v)),
                            this.setState({
                                ...this.state,
                                [key]: v
                            }))}
                    >
                        <this.CustomChildren />

                    </DatePicker>

                </div>
                <div className="line1px" />
            </div>
        )
    }

    //单选控件
    renderOtherInfoSelect(item) {
        const data = item;
        const key = data.key;
        const options = data.options.split(",");
        return (
            <div>
                <div className="page-signUp-danxuan">
                    {
                        Number(item.is_required) == 1 ?
                            <span className="page-project-signUp-verify-header-start page-project-signUp-verify-header-other-start">*</span>
                            :
                            null
                    }

                    <List renderHeader={() => data.label}>
                        {options.map((item, index) => (
                            <RadioItem checked={this.state[key] === item} key={index} onChange={() => this.onChange(item, key)} onClick={() => this.onClick(item, key)}>
                                {item}
                            </RadioItem>
                        ))}
                        {/* {station_num.map((item, index) => (
                            <RadioItem checked={this.state[key] === item} key={index} onChange={() => this.onChange(item, key)} onClick={() => this.onClick(item, key)}>
                                {item}
                            </RadioItem>
                        ))} */}
                    </List>
                </div>
                <div className="line1px" />
            </div>
        )
    }
    renderOtherInfoSelectstation(item) {
        const data = item;
        const key = data.key;
        const options = data.options;
        return (
            <div>
                <div className="page-signUp-danxuan">
                    {
                        Number(item.is_required) == 1 ?
                            <span className="page-project-signUp-verify-header-start page-project-signUp-verify-header-other-start">*</span>
                            :
                            null
                    }
                    <List renderHeader={() => data.label}>
                        {options.map((item, index) => ( 
                            <RadioItem checked={this.state[key] === item.name}  disabled={item.join_num == item.people_count} key={index} onChange={() => this.onChange(item.name, key)} onClick={() => this.onClick(item.name, key)}>
                                {item.name} <div className="page-signUp-danxuanstation">招募人数：{item.count}</div>
                            </RadioItem>                   
                            ))}                     

                    </List>
                </div>
                <div className="line1px" />
            </div>
        )
    }
    renderOtherInfoSelectdate(item) {
        const data = item;
        const key = data.key;
        const options = data.options;
        return (
            <div>
                <div className="page-signUp-danxuan">
                    {
                        Number(item.is_required) == 1 ?
                            <span className="page-project-signUp-verify-header-start page-project-signUp-verify-header-other-start">*</span>
                            :
                            null
                    }
                    <List renderHeader={() => data.label}>
                        {options.map((item, index) => ( 
                            <RadioItem checked={this.state[key] === item.name} key={index} onChange={() => this.onChange(item.name, key)} onClick={() => this.onClick(item.name, key)}>
                                {item.name} <div className="page-signUp-danxuanstation">报名日期：{item.count}</div>
                            </RadioItem>                   
                            ))}                     

                    </List>
                </div>
                <div className="line1px" />
            </div>
        )
    }
    onClick = (value, key) => {
        const sceondValue = this.state[key];
        if (value == sceondValue) {
            this.pushExtendsArray(key, null);
            this.setState({
                [key]: null,
            });
        }

    };
    onChange = (value, key) => {
        this.pushExtendsArray(key, value);
        this.setState({
            [key]: value,
        });

    };
    handleOtherInfoSelectClick(e) {
        const key = e.target.id;
        const value = e.target.value;
        this.pushExtendsArray(key, value);
        // this.pushStationArray(key, value);

    }

    //多选控件
    handleOtherInfoMoreClick = (key, val) => {
        this.pushExtendsArray(key, val, true)
    };
    handleOtherInfoMoreClickdate = (key, val) => {
        this.pushDateArray(key, val, true)
    };

    renderOtherInfoCheckbox(item1) {
        const CheckboxItem = Checkbox.CheckboxItem;
        let labels = item1.options.split(',');
        let data = [];
        labels.map((item, index) => {
            let obj = {};
            obj.value = index;
            obj.label = item;
            data.push(obj);
        });
        return (
            <div className="page-project-signUp-other-title">
                {
                    Number(item1.is_required) === 1 ?
                        <span className="page-project-signUp-verify-header-start page-project-signUp-verify-header-other-start">*</span>
                        :
                        null
                }
                <List renderHeader={() => item1.label}>
                    {data.map(i => (
                        <CheckboxItem key={`${item1.key}${i.value}`} onChange={() => this.handleOtherInfoMoreClick(item1.key, i.label)}>
                            {i.label}
                        </CheckboxItem>
                    ))}
                </List>
            </div>
        )
    }
    renderOtherInfoCheckboxdate(item1) {
        const CheckboxItem = Checkbox.CheckboxItem;
        let labels = item1.options.split(',');
        let data = [];
        labels.map((item, index) => {
            let obj = {};
            obj.value = index;
            obj.label = item;
            data.push(obj);
        });
        return (
            <div className="page-project-signUp-other-title">
                {
                    Number(item1.is_required) === 1 ?
                        <span className="page-project-signUp-verify-header-start page-project-signUp-verify-header-other-start">*</span>
                        :
                        null
                }
                <List renderHeader={() => item1.label}>
                    {data.map(i => (
                        <CheckboxItem key={`${item1.key}${i.value}`} onChange={() => this.handleOtherInfoMoreClickdate(item1.key, i.label)}>
                            {i.label}
                        </CheckboxItem>
                    ))}
                </List>
            </div>
        )
    }
    //单行
    renderOtherInfoInput(item) {
        const data = item;
        const key = data.key;
        return (
            <div>
                <div>
                    <div className="page-project-signUp-verify-header-box">
                        {
                            Number(item.is_required) === 1 ?
                                <span className="page-project-signUp-verify-header-start">*</span>
                                :
                                null
                        }
                        {data.label}
                    </div>
                    <input id={`${key}`} className="page-my-profile-signUp-verify-double-text"
                        onChange={this.handleOtherInfoInputClick} />

                    <div className="line1px" />
                </div>
            </div>
        )
    }

    handleOtherInfoInputClick(e) {

        const key = e.target.id;
        const value = e.target.value;
        this.pushExtendsArray(key, value);
    }

    // 多行
    renderOtherInfoManyInput(item) {
        const data = item;
        const key = data.key;
        return <div>
            <div className="page-project-signUp-verify-header-box">
              {Number(item.is_required) === 1 ? <span className="page-project-signUp-verify-header-start">
                  *
                </span> : null}
              {data.label}
            </div>

            <textarea // placeholder={`请输入${data.label}`}
              id={`${key}`} className="page-project-signUp-edit-text" maxLength="200" onBlur={this.handleOtherInfoManyInputClick} />

            <div className="line1px" />
          </div>;
    }

    handleOtherInfoManyInputClick(e) {
        const key = e.target.id;
        const value = e.target.value;
        this.pushExtendsArray(key, value);
    }

    // 选择时间
    renderOtherInfoDate(item) {
        const data = item;
        const key = data.key;
        return (
            <div>
                <div className="page-project-signUp-verify-header-box">
                    {
                        Number(item.is_required) === 1 ?
                            <span className="page-project-signUp-verify-header-start">*</span>
                            :
                            null
                    }
                    <div className="page-project-signUp-verify-fonts">{data.label}</div>

                    <DatePicker
                        mode="date"
                        format="YYYY-MM-DD"
                        value={this.state[key]}
                        extra={` `}
                        onOk={v => (this.pushExtendsArray(key, formatDate(v)), this.setState({
                            ...this.state,
                            [key]: v
                        }))}
                    >

                        <this.CustomChildren />

                    </DatePicker>

                </div>
                <div className="line1px" />
            </div>
        )
    }

    // 初始化上传照片
    initialPic(data) {
        data.map((item, index) => {
            if (Number(item.type) == 5) {
                this.setState({
                    ...this.state,
                    [item.key]: [],
                })
            }
        })
    }
    // 上传图片
    // 上传图片
    onPicClick(e) {
        var key = e.target.id;
        const attachment = this.state[key];
        console.log(11)
        uploadToWX({

            success: (urls) => {
                if (urls.length == 1) {
                    attachment.push(urls[0]);

                } else if (urls.length > 1) {
                    for (var i = 0; i < urls.length; i++) {
                        attachment.push(urls[i]);
                    }
                }
                this.setState({ ...this.state, [key]: attachment });
                this.pushExtendsArray(key, attachment)
            },
        });
    }

    onPicDel(e) {

        const num = e.target.id;
        var key = e.target.getAttribute("data-key");
        const attachment = this.state[key];
        attachment.splice(num, 1);
        this.setState({ ...this.state, [key]: attachment }),
            this.pushExtendsArray(key, attachment)
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
    onPhotoChange(e) {
        console.log(e.target.id);
        let key = e.target.id;

        var file = e.target.files[0];
    var that = this;
    console.info(file);
    getData(file, function() {
      getAllTags(this);
      console.log(this);

      var Orientation = getTag(this, "Orientation");
      console.info(Orientation);
      // 确认选择的文件是图片
      if (file.type.indexOf("image") == 0) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) {
          var result = this.result;
          var img = new Image();
          img.src = result;
          console.info(img, Orientation);
          var data = result;
          img.onload = function() {
            data = rotateImage(img, Orientation);

            var img2 = new Image();
            img2.src = data;
            console.info(img2);
            var data2;
            img2.onload = function() {
              data2 = compress(img2, Orientation);

              let conversions = base64ToBlob(data2, "image/png");
              uploadImage(`/api/imgupload`, { method: 'POST', data: { file: { file: conversions } } }).then((json) => {
                if (json.error_code === 0) {
                    const attachment = that.state[key];
                    attachment.push(json.data.url);
                    that.setState({
                        ...that.state, [key]: attachment
                    });
                    that.pushExtendsArray(key, attachment);
                }
            });
              //这里是最后的Image的生成 data2 为最终目标文件
            };
          };
        };
      }
    });

        
    }
    renderOtherPic(item) {
        const data = item;
        const key = data.key;
        return (
            <div className="page-project-signUp-other-title">
                {
                    Number(item.is_required) === 1 ?
                        <span
                            className="page-project-signUp-verify-header-start page-project-signUp-verify-header-other-pic-start">*</span>
                        :
                        null
                }
                <div className="page-project-signUp-verify-header-box-pic-fonts">{data.label}</div>
                <div className="page-project-signUp-photo-container">
                    {
                        this.state[key].map((item, keys) => (
                            <div className="page-project-signUp-item-render-container">
                                <div className="page-project-signUp-item-view">
                                    <Avatar src={item} size={{ width: 100, radius: 1 }} onClick={this.onPreview} id={keys}
                                        data-key={`${key}`} />
                                </div>
                                <div className="page-project-signUp-item-render-del" onClick={this.onPicDel} id={keys}
                                    data-key={`${key}`}
                                />
                            </div>
                        ))
                    }

                    {
                        this.state[key].length === 1 ?
                            <div /> :
                            <div className="page-project-signUp-item-upload-container">
                            
                                <input id={key} onChange={this.onPhotoChange} accept="image/png, image/jpeg, image/jpg"
                                    ref={c => {
                                        this.uploadImages = c
                                    }} className="page-profile-header-uploade-box-ipt" type="file" />
                            </div>
                    }
                </div>
                <div className="line1px" />
            </div>
        )
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
            })
        });
        return softArr;
    }

    // push 数组
    /*
    * key 键
    * value 值
    * isMany 是否多选 true是 false否
    * */
    pushStationArray(key, value, isMany) {
        const stationArray = this.state.stationArray;
        if (!isMany) {
            if (value == '-1') {
                if (key in stationArray) {
                    delete stationArray[key];
                } else {
                    return;
                }
            } else {
                stationArray[key] = value;
            }
        }

        this.setState({
            ...this.state,
            stationArray
        })
        // this.extendsArray = extendsArray;

    }
    
    pushDateArray(key, value, isMany) {
        const dateArray = this.state.dateArray;
        if (!isMany) {
            if (value == '-1') {
                if (key in dateArray) {
                    delete dateArray[key];
                } else {
                    return;
                }
            } else {
                dateArray[key] = value;
            }
        }else {

            if (key in dateArray) {

                //判断多选选项是否已被选，有的话去掉
                if (dateArray[key].indexOf(value) !== -1) {
                    //已存在,需要排序
                    let dateArrays = dateArray[key].split(',');
                    let itemIndex = dateArrays.indexOf(value);
                    dateArrays.splice(itemIndex, 1);
                    if (dateArrays.length <= 0) {
                        delete dateArray[key];
                    } else {
                        dateArray[key] = dateArrays.join(',');
                    }
                } else {
                    //没有被选择,需要排序.
                    dateArray[key] = String(dateArray[key]) + ',' + value;
                }
                if (key in dateArray && dateArray[key].split(',').length > 1) {
                    //长度大于1时进行排序
                    windowOrgConfig.map(i => {
                        if (i.key === key) {
                            dateArray[key] = this.softArr(i.options.split(','), dateArray[key].split(',')).join(',');
                            return;
                        }
                    })
                }
            } else {
                //不在多extendsArray里，直接添加。
                dateArray[key] = value;
            }
    }

        this.setState({
            ...this.state,
            dateArray
        })
        // this.extendsArray = extendsArray;

    }
    

    pushExtendsArray(key, value, isMany) {
        const extendsArray = this.state.extendsArray;
        const windowOrgConfig = this.customConfig;
        const stationArray = this.state.stationArray;
        const dateArray = this.state.dateArray;
        if (!isMany) {
            if (value == '-1') {
                if (key in stationArray) {
                    delete stationArray[key];
                } else {
                    return;
                }
            } else {
                stationArray[key] = value;
            }
        }
        if (!isMany) {
            if (value == '-1') {
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
                    let extendsArrays = extendsArray[key].split(',');
                    let itemIndex = extendsArrays.indexOf(value);
                    extendsArrays.splice(itemIndex, 1);
                    if (extendsArrays.length <= 0) {
                        delete extendsArray[key];
                    } else {
                        extendsArray[key] = extendsArrays.join(',');
                    }
                } else {
                    //没有被选择,需要排序.
                    extendsArray[key] = String(extendsArray[key]) + ',' + value;
                }
                if (key in extendsArray && extendsArray[key].split(',').length > 1) {
                    //长度大于1时进行排序
                    windowOrgConfig.map(i => {
                        if (i.key === key) {
                            extendsArray[key] = this.softArr(i.options.split(','), extendsArray[key].split(',')).join(',');
                            return;
                        }
                    })
                }
            } else {
                //不在多extendsArray里，直接添加。
                extendsArray[key] = value;
            }
        }
        this.setState({
            ...this.state,
            extendsArray,
        })
        // this.extendsArray = extendsArray;

    }
    renderStationInfo() {

        if (this.props.detail.data === null || this.props.detail.data.station_config === null) {
            return null
        }
        return (
            <div>
                {
                    this.props.detail.data.station_config && this.props.detail.data.station_config.length ?
                        this.props.detail.data.station_config.map((item, index) => {
                            switch (Number(item.type)) {//单项选择
                                case 1:
                                    return (
                                        <div key={index}>
                                            {this.renderOtherInfoSelectstation(item)}
                                        </div>
                                    );
                                    break;
                                default:
                                    return
                            }

                        })
                        :
                        null
                }
            </div>
        )
    }
    renderDateInfo() {
       
        if (this.props.detail.data === null || this.props.detail.data.project_join_date === null) {
            return null
        }
        return (
            <div>
                {
                    this.props.detail.data.project_join_date && this.props.detail.data.project_join_date.length ?
                        this.props.detail.data.project_join_date.map((item, index) => {
                            switch (Number(item.type)) {
                                case 2:
                                    return (
                                        <div key={index}>
                                            {this.renderOtherInfoCheckboxdate(item)}
                                        </div>
                                    );
                                    break;
                                default:
                                    return
                            }

                        })
                        :
                        null
                }
            </div>
        )
    }

    renderOtherInfo() {

        if (this.props.detail.data === null || this.props.detail.data.custom_config === null) {
            return null
        }
        return (
            <div>
                {
                    this.props.detail.data.custom_config && this.props.detail.data.custom_config.length ?
                        this.props.detail.data.custom_config.map((item, index) => {
                            switch (Number(item.type)) {//单项选择
                                case 1:
                                    return (
                                        <div key={index}>
                                            {this.renderOtherInfoSelect(item)}
                                        </div>
                                    );
                                    break;
                                //多项选择
                                case 2:
                                    return (
                                        <div key={index}>
                                            {this.renderOtherInfoCheckbox(item)}
                                        </div>
                                    );
                                    break;
                                //单行输入
                                case 3:
                                    return (
                                        <div key={index}>
                                            {this.renderOtherInfoInput(item)}
                                        </div>
                                    );
                                    break;
                                //多行输
                                case 4:
                                    return (
                                        <div key={index}>
                                            {this.renderOtherInfoManyInput(item)}
                                        </div>
                                    );
                                    break;

                                //上传图片
                                case 5:
                                    return (
                                        <div key={index}>
                                            {this.renderOtherPic(item)}
                                        </div>
                                    );
                                    break;
                                //日期空间
                                case 6:
                                    return (
                                        <div key={index}>
                                            {this.renderOtherInfoDate(item)}
                                        </div>
                                    );
                                    break;
                                //日期时间空间
                                case 7:
                                    return (
                                        <div key={index}>
                                            {this.renderTime(item)}
                                        </div>
                                    );
                                    break;
                               
                                default:
                                    return
                            }

                        })
                        :
                        null
                }
            </div>
        )
    }
    onGetData(data) {
        let total = null;
        let Ltotal = null;
        let Ntotal = null;
        data.map((item, index) => {
            if (Number(item.is_required) == 0) {
                if (item.switch) {

                    Ltotal += item.num * getnum(item.amount);

                }
            } else if (Number(item.is_required) == 1) {
                Ntotal += item.num * getnum(item.amount);
            }

        })
        total = Ltotal + Ntotal;
        this.setState({
            ...this.state,
            data,
            total,

        })
    }
    onCheckedAll() {
        const { data } = this.state;
        let checkeAll = this.state.checkeAll;
        let total = null;
        let Ltotal = null;
        let Ntotal = null;
        checkeAll = !this.state.checkeAll;

        data.map((item, index) => {
            if (Number(item.is_required) == 0) {
                if (checkeAll) {
                    if (!item.switch) {
                        if (item.num == 0) {
                            item.num = 1;
                            item.switch = true;
                            Ltotal += item.num * getnum(item.amount);
                        }
                    } else {
                        Ltotal += item.num * getnum(item.amount);
                    }

                } else {
                    if (item.num != 0) {
                        item.num = 0;
                        item.switch = false;
                    }
                }
            } else if (Number(item.is_required) == 1) {
                Ntotal = item.num * getnum(item.amount);
            }

        })
        total = Ltotal + Ntotal;
        this.setState({
            ...this.state,
            data,
            total,
            checkeAll,
        })
    }
    // 多选购买
    renderOrder() {
        const data = this.state.data;

        return (
            <CheckboxStepper data={data || null} getData={this.onGetData} checkeAll={this.state.checkeAll} />

        )
    }
    onSubmmit() {
        const extendsArray = this.state.extendsArray;
        const stationArray = this.state.stationArray;
        const dateArray = this.state.dateArray;
        console.log(dateArray);

        let data = {};
        let pay = {};
        data.id = this.projectId;
        data.type = 1;
        if (this.customConfig && this.customConfig.length > 0) {

            if (isRequired(this.customConfig, extendsArray)) {

                isEmpty = false;
                return;
            }
            data.extends = extendsArray;
        }
        if (this.stationConfig && this.stationConfig.length > 0) {

            if (isRequired(this.stationConfig, stationArray)) {

                isEmpty = false;
                return;
            }

            data.station = stationArray;
        }
        if (this.dateConfig && this.dateConfig.length > 0) {
            console.log(dateArray)
            if (isRequired(this.dateConfig, dateArray)) {

                isEmpty = false;
                return;
            }

            data.date = dateArray;
        }
        // console.log(data.date)



        if (this.state.data && this.state.data.length > 0) {
            let payData = this.state.data;
            for (var i = 0; i < payData.length; i++) {
                if (Number(payData[i].is_required) == 1) {
                    const key = payData[i].key;
                    const num = payData[i].num;
                    pay[`${key}`] = num;
                } else if (Number(payData[i].is_required) == 0) {
                    if (payData[i].switch) {
                        const key = payData[i].key;
                        const num = payData[i].num;
                        pay[`${key}`] = num;
                    }
                }
            }
            console.log(111)
            data.payment = pay;       
            this.props.joinPayProject(data);
            return
        }
        this.props.joinProjectAction(data);


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
            <div className="page-project-signUp">
                {//岗位信息
                    this.renderStationInfo()
                }
                

                {//自定义信息
                    this.renderOtherInfo()
                }
                {//日期信息
                    this.renderDateInfo()
                }
                {this.renderOrder()}
                <div className="take-up" />

                <div className="page-project-signUp-bottom-btn">
                    <div className="line1px" />
                    <div className="page-project-signUp-bottom-btn-contain">
                        {
                            this.state.data ?
                                <div className={classnames({
                                    'alltrue': this.state.checkeAll,
                                    'all': !this.state.checkeAll,
                                })} onClick={this.onCheckedAll}>
                                    <i className="checkall" onClick={this.onCheckedAll} />
                                  {t('全选')}
                  </div>
                                : null
                        }
                        {
                            this.state.data ?
                                <div className="total">{t('合计')}：<span>¥{getnum(this.state.total || 0)}</span></div>
                                : null
                        }

                        <div className="btn" onClick={this.onSubmmit}>{t('提交')}</div>
                    </div>
                </div>

                <Gallery src={this.state.previewData} show={this.state.showMultiple} defaultIndex={this.state.defaultIndex}>
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

SignUpPage.propTypes = {
    requestProjectDetail: PropTypes.func,
    joinPayProject: PropTypes.func,
    joinProjectAction: PropTypes.func,
    detail: PropTypes.shape({
        fetchingId: PropTypes.string,
        data: PropTypes.shape({}),
        tabIndex: PropTypes.number,
    }),
    joinPay: PropTypes.shape({
    }),
    join: PropTypes.shape({
    }),
    route: PropTypes.shape({
        params: PropTypes.shape({
            projectId: PropTypes.string,
        }),
    }),
};

SignUpPage.title = i18next.t('报名信息');

export default connect(
    state => ({
        detail: state.project.detail,
        joinPay: state.project.projectSign.joinPayProject,
        join: state.project.projectSign.joinProject,
    }),
    dispatch => bindActionCreators({
        requestProjectDetail,
        joinPayProject,
        joinProjectAction
    }, dispatch),
)(translate('translations')(SignUpPage));