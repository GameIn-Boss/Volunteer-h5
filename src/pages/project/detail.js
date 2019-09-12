import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Modal } from 'antd';
import 'antd/lib/input/style/css';
import 'antd/lib/modal/style/css';
import { requestProjectDetail } from './project.store';
import { requestTeamList } from './../team/team.store';
import Teams from '../../components/teams/teams';

import './detail.css';

const QRCode = require('qrcode.react');

const { Search } = Input;
class ProjectDetailPage extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
    };
  }

  componentWillMount() {
  }
  componentDidMount() {
    const { route: { params: { id } } } = this.props;
    this.props.requestProjectDetail(id);
    this.props.requestTeamList({
      page_size: 1,
    });
  }

  componentWillReceiveProps() {}

  componentWillUnmount() {}

  onSearch(name) {
    window.location.href = `/project?name=${encodeURIComponent(name)}`;
  }

  renderHeader() {
    return (<div className="page-projects-title">
      <div className="layer page-projects-title-box">
        <div>志愿项目</div>
        <Search
          placeholder="搜索志愿项目"
          onSearch={(value) => { this.onSearch(value); }}
          style={{ width: 200 }}
        />
      </div>
    </div>);
  }

  join(data) {
    // const origin = location.origin;
    const origin = 'http://wx8b7f9e8dc8e839cb.wechat.alpha.flashdiet.cn';
    console.log(`${origin}/project/detail/${data.id}`);
    this.setState({
      url: `${origin}/project/detail/${data.id}`,
      modalVisible: true,
    });
  }

  handleModalVisible() {
    this.setState({
      modalVisible: false,
    });
  }

  renderContent(data) {
    const { teamList } = this.props;
    if (!data) return null;
    return (<div className="page-project-detail-box">
      <div className="page-project-detail-top">
        <img src="/images/es.png" alt="" />
        <ul className="page-project-detail-top-title">
          <li>{data.name}</li>
          <li className="page-project-detail-top-title-default">#{data.category.length && data.category.map((item, index) => {
            if (index < data.category.length) {
              return <span key={item.service_category_name}>{item.service_category_name}、</span>;
            }
            return <span key={item.service_category_name}>{item.service_category_name}</span>;
          })}</li>
          <li className="page-project-detail-top-title-default">报名截止：{moment(new Date(data.end)).format('YYYY-MM-DD HH:mm')}</li>
          <li className="page-project-detail-top-title-default">报名人数：{data.join_people_count}/{data.people_count}</li>
          <li className="page-project-detail-top-title-btn" onClick={() => { this.join(data); }}><div>立即加入</div></li>
        </ul>
      </div>
      <ul className="page-project-detail-all">
        <li className="page-project-detail-all-both">
          <div className="page-project-detail-all-both-box">
            <div className="page-project-detail-all-both-label">服务对象</div>
            <div>{data.service_object.length && data.service_object.map((item, index) => {
              if (index < data.service_object.length) {
                return <span key={item.service_object_name}>{item.service_object_name}、</span>;
              }
              return <span key={item.service_object_name}>{item.service_object_name}</span>;
            })}</div>
          </div>
          <div className="page-project-detail-all-both-box">
            <div className="page-project-detail-all-both-label">项目日期</div>
            <div>{moment(new Date(data.begin)).format('YYYY.MM.DD')} - {moment(new Date(data.end)).format('YYYY.MM.DD')}</div>
          </div>
        </li>
        <li className="page-project-detail-all-both">
          <div className="page-project-detail-all-both-box">
            <div className="page-project-detail-all-both-label">联系人</div>
            <div>{data.contact_name}</div>
          </div>
          <div className="page-project-detail-all-both-box">
            <div className="page-project-detail-all-both-label">联系电话</div>
            <div>{data.contact_phone}</div>
          </div>
        </li>
        <li className="page-project-detail-all-both">
          <div className="page-project-detail-all-both-box">
            <div className="page-project-detail-all-both-label">志愿时长</div>
            <div>{data.reward_time}小时</div>
          </div>
          <div className="page-project-detail-all-both-box">
            <div className="page-project-detail-all-both-label">志愿保障</div>
            <div>{data.volunteer_security
              ? data.volunteer_security
              : '无'}</div>
          </div>
        </li>
        <li className="page-project-detail-all-both">
          <div className="page-project-detail-all-both-box">
            <div className="page-project-detail-all-both-label">发布时间</div>
            <div>{moment(new Date(data.created_at)).format('YYYY-MM-DD HH:mm')}</div>
          </div>
        </li>
      </ul>
      <div className="page-project-detail-intro">
        <div className="page-project-detail-intro-left">
          <p className="page-project-detail-title">项目简介</p>
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </div>
        <div className="page-project-detail-intro-right">
          <p className="page-project-detail-title">发起团队</p>
          {
            teamList && teamList.list && teamList.list.length >= 1 ?
              <Teams team={teamList.list[0]} />
              : null
          }

        </div>
      </div>
    </div>);
  }

  render() {
    const { projectData } = this.props;
    return (<div className="page-project-detail">
      {this.renderHeader()}
      <div className="layer">
        {this.renderContent(projectData && projectData.data)}
      </div>
      <Modal
        title="手机扫一扫加入项目"
        visible={this.state.modalVisible}
        onCancel={this.handleModalVisible}
        footer={null}
        bodyStyle={{ marginLeft: 25 }}
        width={300}
      >
        <QRCode value={this.state.url} size={200} />
      </Modal>
    </div>);
  }
}

ProjectDetailPage.propTypes = {
  requestProjectDetail: PropTypes.func,
  requestTeamList: PropTypes.func,
  route: PropTypes.shape({}),
  projectData: PropTypes.shape({}),
  teamList: PropTypes.shape({}),
};

export default connect(
  state => ({
    projectData: state.project.projectData,
    teamList: state.team.teamList.data,
  }), dispatch => bindActionCreators({ requestProjectDetail, requestTeamList }, dispatch),
)(ProjectDetailPage);
