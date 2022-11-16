import autoBind from "react-autobind";
import React, { PropTypes } from "react";
import Link from "../link/link";
import "./style.css";
import moment from "moment";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { translate } from 'react-i18next';

class SignItem extends React.Component {
  static propTypes = {
    data: PropTypes.shape({}),
      proid: PropTypes.string
  };
  constructor(props) {
    super(props);
    autoBind(this);
  }
  renderEmpty() {
    const { t } = this.props;
    return (
      <div className="no-record">
        <div>{t('目前还没有班次')}</div>
      </div>
    );
  }
  renderProjectList(data) {
      const { proid, t } = this.props;
    return (
      <div>
        {data.map((record, index) => {
          let actionClassName = "";
          let actionLabel = "";
          let timeDom = null;
          if (record.status == 0 || record.status == 1) {
            actionClassName = "project-info-time-wait";
            actionLabel = t('待打卡');
          } else if (record.status == 6) {
            actionClassName = "project-info-time-pass";
            actionLabel = t('已通过');
          } else if (record.status == 5) {
            actionClassName = "project-info-time-audit";
            actionLabel = t('审核中');
          } else if (record.status == 7) {
            actionClassName = "project-info-time-reject";
            actionLabel = t('被驳回');
          } else if (record.status == 4) {
            actionClassName = "project-info-time-done";
            actionLabel = t('已签到');
          } else if (record.status == 3 || record.status == 2) {
            actionClassName = "project-info-time-card";
            actionLabel = t('待补卡');
          }

          if (record.status == 6 || record.status == 4) {
            timeDom = (
                  <div className="project-info-time">
                    {t('获得服务时长')}&nbsp;&nbsp;
                    <span style={{ color: "#F6AB00" }}>
                      {record.user_reward_time}{t('小时')}
                    </span>
                  </div>
            );
          } else if (record.status == 5){
            timeDom = (
              <div className="project-info-time">
                {t('预计可获得服务时长')}&nbsp;&nbsp;
                <span style={{ color: "#F6AB00" }}>
                  {record.user_reward_time}{t('小时')}
                </span>
              </div>
            );
          } else {
            timeDom = (
              <div className="project-info-time">
                {t('预计最多可获得服务时长')}&nbsp;&nbsp;
                    <span style={{ color: "#F6AB00" }}>
                      {record.reward_time}{t('小时')}
                    </span>
               </div>
            );
          }
          

          return (
            <li key={index} className="sign-record">
              <Link to={`/sign/signdetail/detail/${proid}/${record.id}`}>
                <div className="sign-header">
                  <div style={{ color: "#4A4A4A", fontSize: "16px" }}>
                    {moment(record.begin).format("YYYY/MM/DD HH:mm")} -{" "}
                    {moment(record.end).format("YYYY/MM/DD HH:mm")}
                  </div>
                </div>
                <div className="line1px" />
                <div className="project-info">
                  {timeDom}
                  <div className={`project-info-time-shape ${actionClassName}`}>
                    {actionLabel}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </div>
    );
  }

  render() {
    const { data, t } = this.props;
    if (!data) {
      return null;
    } else if (data && !data.three_day_clock.length && !data.clock.length) {
      return <div className="page-sign-class-empty-tip">{t('目前还没有班次哟~')}</div>;
    }
    return (
      <div className="page-sign-class">
        <div className="component-sign-class">
          {data.three_day_project && data.three_day_project.length > 0 ? (
            <div className="component-sign-class-title">{t('近3天待打卡班次')}</div>
          ) : null}

          <ul className="sign-list">
            {data.three_day_project && data.three_day_project.length > 0 ? (
              <div>{this.renderProjectList(data.three_day_project)}</div>
            ) : null}
            {data.clock && data.clock.length > 0 ? (
              <div className="component-sign-class-title">{t('所有活动')}</div>
            ) : null}
            {data.clock && data.clock.length > 0 ? (
              <div>{this.renderProjectList(data.clock)}</div>
            ) : null}
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(
    state => ({

    }),
    dispatch => bindActionCreators({  }, dispatch)
)(translate('translations')(SignItem));