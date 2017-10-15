/**
 * @file 家庭成员组件
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import './familyItem.css';
import Image from '../../../../components/image/image';

class FamilyItem extends React.Component {

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
    const item = this.props.data;
    return (
      <div className="page-family-item-container">
        <div className="page-family-item-main">
          <div className="page-family-item-main-photo-bg">
            <Image src={item.avatars} className="page-family-item-main-photo" />
          </div>
          <div className="page-family-item-name-container">
            <div className="page-family-item-name">{item.username}</div>
            <div className="page-family-item-account">账号：暂无字段</div>
          </div>
          <div className="page-family-item-time-container">
            <p>志愿时长：<span>{item.reward_time}小时</span></p>
          </div>
        </div>
        <div className="line1px" />
      </div>
    );
  }

}


FamilyItem.title = 'item-list';

FamilyItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    slogan: PropTypes.string,
    logo: PropTypes.string,
    type: PropTypes.string,
    team_size: PropTypes.number,
    identifier: PropTypes.string,
    contact_name: PropTypes.string,
    contact_phone: PropTypes.string,
    contact_addr: PropTypes.string,
    parent_id: PropTypes.number,
    province_id: PropTypes.number,
    province_name: PropTypes.string,
    city_id: PropTypes.number,
    city_name: PropTypes.string,
    county_id: PropTypes.number,
    county_name: PropTypes.string,
    time_long: PropTypes.number,
    abstract: PropTypes.string,
    created_at: PropTypes.string,
    category: PropTypes.shape({}),
    join_status: PropTypes.number,
  }),
};


export default FamilyItem;
