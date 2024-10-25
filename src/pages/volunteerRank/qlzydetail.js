import React, { PropTypes } from 'react';
import autoBind from "react-autobind";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { volunteerInfo, volunteerAchieve } from './index.store';
import { userAchieve } from "./../my/my.store";
import Link from "../../components/link/link";
import Image from "../../components/image/image";
import Avatar from "../../components/avatar/avatar";
import moment from 'moment';
import { translate } from 'react-i18next';
import i18next from 'i18next';

import './qlzydetail.css';

class Detail extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  componentDidMount() {
    const { route: { params: { id } } } = this.props;
    this.props.volunteerInfo(id);
    this.props.volunteerAchieve(id);
    this.props.userAchieve();
  }

  componentWillUnmount() {
  }
  componentWillReceiveProps(nextProps) {
  }
  renderAchieve() {
    const { volunteerRank: { volunteerAchieve: { data } }, t } = this.props;
    if (!data) {
      return <div></div>
    }
    if (!data.length) {
      return <div></div>
    }
    return(<div className="volunteer-rank-detail-achieve">
      <div className="volunteer-rank-detail-achieve-title">
        <i className="volunteer-rank-detail-achieve-title-icon"></i>{t('Ta的成就')}
      </div>

      <div className="volunteer-rank-detail-achieve-get">
        {
          data.map((item, index)=>(<div key={index}>
            <Image src={item.icon} defaultSrc="" resize={{width: 48, height: 48}} className="volunteer-rank-detail-achieve-get-icon"/>
            <div className="volunteer-rank-detail-achieve-get-name">{item.name}</div>
          </div>))
        }
        <div style={{display: data.length % 3 === 2 ? 'block' : 'none'}}></div>
        <div style={{display: data.length % 3 === 1 ? 'block' : 'none'}}></div>
      </div>
    </div>)
  }
  renderDetail() {
    const { volunteerRank: { volunteerInfo: { data } }, t } = this.props;
    const {
      userAchieveList: { data: udata },
    } = this.props;
    if(!data) {
      return <div></div>;
    }
    if(!udata || !udata.data) {
      return <div></div>;
    }
    const { data: { growth_level } } = udata;
    let userAchieveListLocal = [];
    growth_level.forEach(item => {
      if (item.name) {
        userAchieveListLocal.push(item);
      }
    });
    let model = null;
    if(!data.growth) {
      data.growth = 0;
    }
    if(data.growth >= userAchieveListLocal[userAchieveListLocal.length-1].growth) {
      model = userAchieveListLocal[userAchieveListLocal.length-1];
    } else if(data.growth < userAchieveListLocal[0].growth) {
      model = {
        name: ''
      }
    } else {
      for(let i = 0; i < userAchieveListLocal.length;i++) {
        if(data.growth >= userAchieveListLocal[i].growth && data.growth < userAchieveListLocal[i+1].growth) {
          model = userAchieveListLocal[i];
          break;
        }
      }
    }

    return(<div className="volunteer-rank-detail-top">
      <Avatar src={data.user.avatars} size={{width: 90, height: 90}} className="volunteer-rank-detail-top-avatar"/>
      <div className="volunteer-rank-detail-top-detail">
        <div>
          <span className="volunteer-rank-detail-top-detail-name">{data && data.real_name}</span>
          {window.orgInfo.st_rank_op == 1 ? (
            <span
              className="volunteer-rank-detail-top-detail-level"
            >
              {model.name || ""}
            </span>
          ) : (
            <span />
          )}
          {/*<span className="volunteer-rank-detail-top-detail-level">用户等级： Lv.04</span>*/}
        </div>
        <div className="volunteer-rank-detail-top-detail-time">
          <div>
            <span style={{fontSize:'18px',color:'rgba(0, 0, 0, 0.95)'}}>{Number(data.reward_time_year).toFixed(1)}</span><span style={{fontSize:'12px',color:'rgba(0, 0, 0, 0.85)'}}>{t('小时')}</span>
            <p style={{fontSize:'14px',color:'rgba(0, 0, 0, 0.65)'}}>{t('年度志愿时长')}</p>
          </div>
          <div>
            <span style={{fontSize:'18px',color:'rgba(0, 0, 0, 0.95)'}}>{Number(data.reward_time).toFixed(1)}</span><span style={{fontSize:'12px',color:'rgba(0, 0, 0, 0.85)'}}>{t('小时')}</span>
            <p style={{fontSize:'14px',color:'rgba(0, 0, 0, 0.65)'}}>{t('总志愿时长')}</p>
          </div>
        </div>
      </div>
    </div>);
  }

  renderProject() {
    const { volunteerRank: { volunteerInfo: { data } }, t } = this.props;
    if(!data) {
      return <div></div>
    }
    if(!data.project || !data.project.length) {
      return <div></div>
    }
    return(<div className="volunteer-rank-detail-project">
  {/* <div className="volunteer-rank-detail-achieve-title">
        <i className="volunteer-rank-detail-project-title-icon"></i>{t('Ta的项目')} */}
         <div className="project-label-box">
        <div className="project-label"></div> <span  className="project-label-text">TA的项目</span>
      </div>
      {/* </div>  */}
     

      {
        data.project.map((item, index) => (<Link to={`/project/detail/${item.project_id}`} key={index} className="volunteer-rank-detail-project-detail">
          <Image defaultSrc={window.orgInfo.logo} src={item.project.photoitem} resize={{width: 135, height: 78}} className="volunteer-rank-detail-project-detail-img"/>
          <div className="volunteer-rank-detail-project-detail-info">
          <div className="volunteer-rank-detail-project-detail-info-title">{item.project.name}</div>
          {/* <div className="volunteer-rank-detail-project-detail-info-service_target-box"><p className="volunteer-rank-detail-project-detail-info-service_target">{item.project.province_name}</p></div> */}
          <div>{t('活动时间')}：{moment(item.project.begin).format('YYYY.MM.DD')}</div>
            <div>{t('发起方')}：{item.team_name}</div>
          </div>
        </Link>))
      }
    </div>)
  }

  renderTeam() {
    const { volunteerRank: { volunteerInfo: { data } }, t } = this.props;
    if(!data) {
      return <div></div>
    }
    if(!data.team || !data.team.length) {
      return <div></div>
    }
    return(<div className="volunteer-rank-team-project">
      <div className="project-label-box">
        <div className="project-label"></div> <span  className="project-label-text">TA的团队</span>
      </div>
      {
        data.team.map((item, index)=>(<Link to={`/team/detail/${item.team_id}`} className="volunteer-rank-detail-team-detail" key={index}>
          <Image defaultSrc={window.orgInfo.logo} src={item.team.logo} resize={{width: 60, height: 60}} className="volunteer-rank-detail-team-detail-img"/>
          <div className="volunteer-rank-detail-team-detail-info">
            <div className="volunteer-rank-detail-team-detail-info-title">{item.team.name}</div>
            <div className="volunteer-rank-detail-team-detail-info-both">
            <span>
              <i className="volunteer-rank-detail-team-detail-info-icon-time"></i>
              {t('时长')}：{Number(item.team.reward_time).toFixed(1)}{t('小时')}
            </span>
              <span>
              <i className="volunteer-rank-detail-team-detail-info-icon-people"></i>
                {t('成员')}：{item.team.team_size}{t('人')}
            </span>
            </div>
          </div>
        </Link>))
      }
    </div>)
  }

  render() {
    return(<div>
      {this.renderDetail()}
      {this.renderAchieve()}
      {this.renderProject()}
      {this.renderTeam()}
    </div>)
  }
}

Detail.propTypes = {
  userAchieve: PropTypes.func,
  volunteerInfo: PropTypes.func,
  volunteerAchieve: PropTypes.func,
};

Detail.title = i18next.t("志愿排行");

export default connect(
  state => ({
    volunteerRank: state.volunteerRank,
    userAchieveList: state.my.userAchieve,
  }),
  dispatch =>
    bindActionCreators(
      {
        volunteerInfo,
        userAchieve,
        volunteerAchieve
      },
      dispatch
    )
)(translate('translations')(Detail));

