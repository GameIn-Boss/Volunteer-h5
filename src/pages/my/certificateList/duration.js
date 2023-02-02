/**
 * @file 服务时长
 */

/* global wx:false */

/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './duration.css';
import DutationProjects from '../../../components/duration/projects';
import { rewardTimeAction } from '../my.store';
import { translate } from 'react-i18next';
import i18next from 'i18next';
import Link from "../../../components/link/link";

class Duration extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.rewardTimeAction();
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() { }

  render() {
    const { reward: { data: listData }, t } = this.props;
    return (
      <div className="page-duration">

        <div className="page-duration-top-area-view">
          <div className="page-duration-top-area-view-duration-box-img">
            <img src="https://api.volzdx.cn/image/uploads/2022-11/logotk.png"/>
          </div>
          {/* <div className="page-duration-top-area-view-line" /> */}
          <div className="page-duration-top-area-view-duration-box">
            <div style={{ fontSize: 18 }}>{t('溢彩志愿者')}</div>
            <div>
              <Link to="/my/certificateSanyi" className="page-duration-top-area-view-line-button" >
                证书详情
              </Link>
            </div>
          </div>

        </div>

        <div className="line1px" />

        <div className="page-duration-main-box">
          <DutationProjects durationProject={this.props.reward.data ? listData.project : null} user={this.props.user} isEntry />
          {
            this.props.reward.data && this.props.reward.data.jinyun_timeSum ? <div style={{
              textAlign: 'center',

            }}>
              津云平台项目总时长 {((this.props.reward.data && this.props.reward.data.jinyun_timeSum || 0) / 3600).toFixed(2)} 小时
            </div> : null
          }
        </div>


      </div>
    );
  }
}


Duration.title = i18next.t('我的证书');

Duration.propTypes = {
  rewardTimeAction: PropTypes.func,
  reward: PropTypes.shape({
    data: PropTypes.shape({
      join_project_count: PropTypes.number,
      reward_time: PropTypes.number,
      project: PropTypes.arrayOf(PropTypes.shape({

      })),


    }),
  }),
};

export default connect(
  state => ({
    reward: state.my.reward,
    user: state.user,
  }),
  dispatch => bindActionCreators({ rewardTimeAction }, dispatch),
)(translate('translations')(Duration));
