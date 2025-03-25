/**
 * @file 我的消息
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import './rank.css';
import Link from '../../../components/link/link';
import Avatar from "../../../components/avatar/avatar";
import Images from '../../../components/image/image';
import i18next from 'i18next';

Date.prototype.Format = function (fmt) { // author: meizz
  const o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (`${this.getFullYear()}`).substr(4 - RegExp.$1.length));
  for (const k in o) { if (new RegExp(`(${k})`).test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length))); }
  return fmt;
};
class Rank extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  render() {
    const { data } = this.props;
    if (!data) {
      return null;
    } else if (data && !data.length) {
      return <div className="page-announceitem-empty-tip">目前还没有时长</div>;
    }

    return (

<div className="volunteer-rank-bot">
{
        data.map((item,index) => (<Link to={`/volunteer_rank/${item.user.id}`} key={index} className="volunteer-rank-bot-box">
                       <div className="volunteer-rank-bot-box-detail">

            <div className="volunteer-rank-bot-box-sort">{index +1}</div>
            {/* <Avatar size={{ width: 50, height: 50 }} src={item.user && item.user.avatars} /> */}
              <div className="volunteer-rank-bot-box-detail-name">{item.volunteer.real_name && item.volunteer.real_name.length ? item.volunteer.real_name : (item.user ? item.user.username : '')}</div>
              <div className="volunteer-rank-bot-box-detail-time">{Number(item.reward_time).toFixed(2)}时</div>
            </div>
          </Link>))
        }
      </div>

      
    );
  }
}


Rank.title = '站内邮箱';

Rank.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.number,
    content: PropTypes.string,
    publish_time: PropTypes.string,
    from_user: PropTypes.shape({
      token: PropTypes.string,
      id: PropTypes.number,
      username: PropTypes.string,
      phone: PropTypes.string,
      avatars: PropTypes.string,
      real_name: PropTypes.string,
      nation: PropTypes.string,
      sex: PropTypes.number,
      birthday: PropTypes.number,
      identifier: PropTypes.string,
      slogan: PropTypes.string,
      reward_time: PropTypes.number,
      id_number: PropTypes.number,
      province_id: PropTypes.number,
      province_name: PropTypes.string,
      city_id: PropTypes.number,
      city_name: PropTypes.string,
      county_id: PropTypes.number,
      county_name: PropTypes.string,
      addr: PropTypes.string,
      family_id: PropTypes.number,
      join_family_time: PropTypes.string,
      good_at: PropTypes.arrayOf(PropTypes.shape({

      })),
    }),
  }),
};

export default Rank;
