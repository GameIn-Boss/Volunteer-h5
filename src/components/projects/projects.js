/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import 'antd/lib/input/style/css';
import moment from 'moment';
import { Input } from 'antd';
import './projects.css';
import Link from '../link/link';
import Image from '../image/image';

const { Search } = Input;
class Projects extends React.Component {

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

  onSearch(name) {
    window.location.href = `/project?name=${name}`;
  }

  renderTitle() {
    return (
      <div className="page-home-projects-title">
        <div>志愿项目 <span>Recent News</span></div>
        <Search
          placeholder="搜索志愿项目"
          onSearch={(value) => { this.onSearch(value); }}
          style={{ width: 200 }}
        />
      </div>
    );
  }

  renderItem(item, index) {
    let name = '';
    if (!item.county_name.length) {
      if (!item.city_name) {
        name = item.province_name;
      } else if (item.city_name === '全省') {
        name = item.province_name;
      } else {
        name = item.city_name;
      }
    } else if (item.county_name === '全市') {
      if (!item.city_name) {
        name = item.province_name;
      } else if (item.city_name === '全省') {
        name = item.province_name;
      } else {
        name = item.city_name;
      }
    } else {
      name = item.county_name;
    }
    return (
      <Link to={`/project/${item.id}`} className="page-home-projects-content-line" key={index}>
        <div className="page-home-projects-content-box">
          <Image style={{ width: '100%', height: '180px' }} src={item.list_photo} defaultSrc="/images/default_banner.png" alt="项目图片" />
          <div className="page-home-projects-content-line-pd">
            <div className="page-home-projects-content-line-title">{item.name}</div>
            <div className="page-home-projects-content-line-addr">
              <i className="page-home-projects-content-line-addr-icon" />
              {name.length ? name : '全国'}
            </div>
            <div className="page-home-projects-content-line-time bc">
              { moment(new Date(item.begin)).format('YYYY-MM-DD') }~{ moment(new Date(item.end)).format('YYYY-MM-DD') }
              <i className="page-home-projects-content-line-time-icon" />
            </div>
            <div className="page-home-projects-content-line-num">
              <div className="bc page-home-projects-content-line-num-left">{item.reward_time}小时 <i className="page-home-projects-content-line-num-hour" /></div>
              <div className="bc page-home-projects-content-line-num-right">{item.join_people_count}人 <i className="page-home-projects-content-line-num-people" /></div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  render() {
    const { projects, showTitle } = this.props;
    return (
      <div>
        {
          showTitle ? this.renderTitle() : null
        }
        <div className="page-home-projects-content">
          {
          projects && projects.length ? projects.map((item, index) => this.renderItem(item, index)) : null
        }
        </div>
      </div>
    );
  }
}

Projects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({

  })),
  showTitle: PropTypes.bool,
};

export default Projects;
