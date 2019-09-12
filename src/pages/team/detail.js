import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { Modal } from 'antd';
import 'antd/lib/modal/style/css';
import Projects from '../../components/projects/projects';
import { requestTeamDetail } from './team.store';
import { requestProjectList } from './../project/project.store';
import Image from './../../components/image/image';
import './detail.css';

const QRCode = require('qrcode.react');

class TeamDetailPage extends React.Component {
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
    this.props.requestTeamDetail(id);
    this.props.requestProjectList({ page_size: 3 });
  }

  componentWillReceiveProps() {}

  componentWillUnmount() {}

  renderHeader() {
    return (<div className="page-team-detail-header">
      <div className="layer">
        <div style={{ marginLeft: '87px' }}>志愿团队/团队详情</div>
      </div>
    </div>);
  }

  join(data) {
    // const origin = location.origin;
    const origin = 'http://wx8b7f9e8dc8e839cb.wechat.alpha.flashdiet.cn';
    console.log(`${origin}/team/detail/${data.id}`);
    this.setState({
      url: `${origin}/team/detail/${data.id}`,
      modalVisible: true,
    });
  }

  handleModalVisible() {
    this.setState({
      modalVisible: false,
    });
  }

  renderContent() {
    const { teamData: { data }, projectList } = this.props;
    console.log(projectList);
    if (!data) return null;
    return (<div className="page-team-detail-box">
      <div className="page-team-detail-box-top">
        <img src="/images/es.png" alt="" />
        <Image src={data.logo} resize={{ width: 375, height: 220 }} defaultSrc="/images/default_banner.png" />
        <div className="page-team-detail-box-top-right">
          <p>{data.name}</p>
          <p className="page-team-detail-box-top-right-data">
            <p>
              <p>
                {data.team_size >= 10000
                  ? (data.team_size / 10000).toFixed(2)
                  : data.team_size}
                {data.team_size >= 10000 ? '万' : ''}
              </p>
              <p>团队成员(人)</p>
            </p>
            <p>
              <p>
                {data.reward_sum >= 10000
                  ? (data.reward_sum / 10000).toFixed(2)
                  : data.reward_sum}
                {data.reward_sum >= 10000 ? '万' : ''}
              </p>
              <p>团队总时长(小时)</p>
            </p>
          </p>
          <p className="page-team-detail-box-top-right-btn" onClick={() => { this.join(data); }} >立即加入</p>
        </div>
      </div>
      <ul className="page-team-detail-all">
        <li className="page-team-detail-all-both">
          <div className="page-team-detail-all-both-box">
            <div className="page-team-detail-all-both-label">团队管理</div>
            <div>{data.contact_name}</div>
          </div>
          <div className="page-team-detail-all-both-box">
            <div className="page-team-detail-all-both-label">团队类型</div>
            <div>{data.type}</div>
          </div>
        </li>
        <li className="page-team-detail-all-both">
          <div className="page-team-detail-all-both-box">
            <div className="page-team-detail-all-both-label">联系电话</div>
            <div>{data.contact_phone}</div>
          </div>
          <div className="page-team-detail-all-both-box">
            <div className="page-team-detail-all-both-label">注册日期</div>
            <div>{moment(new Date(data.created_at)).format('YYYY年MM月DD日')}</div>
          </div>
        </li>
        <li className="page-team-detail-all-both">
          <div className="page-team-detail-all-both-box">
            <div className="page-team-detail-all-both-label">团队地址</div>
            <div>{`${data.province_name}${data.city_name}${
              data.county_name
              }${data.addr}`}</div>
          </div>
          <div className="page-team-detail-all-both-box">
            <div className="page-team-detail-all-both-label">团队口号</div>
            <div>{data.slogan}</div>
          </div>
        </li>
      </ul>
      <div className="page-team-detail-intro">
        <p>团队简介</p>
        <p>{data.abstract}</p>
      </div>
      <div className="page-team-detail-projects">
        <p>团队项目</p>
        <Projects projects={projectList && projectList.data && projectList.data.list} />
      </div>
    </div>);
  }

  render() {
    return (<div className="page-team-detail">
      {this.renderHeader()}
      <div className="layer">
        {this.renderContent()}
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

TeamDetailPage.propTypes = {
  requestTeamDetail: PropTypes.func,
  requestProjectList: PropTypes.func,
  route: PropTypes.shape({}),
  teamData: PropTypes.shape({}),
  projectList: PropTypes.shape({}),
};

export default connect(
  state => ({
    teamData: state.team.teamData,
    projectList: state.project.projectList,
  }), dispatch => bindActionCreators({ requestTeamDetail, requestProjectList }, dispatch),
)(TeamDetailPage);
