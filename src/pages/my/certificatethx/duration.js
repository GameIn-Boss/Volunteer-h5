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
import DutationProjects from '../../../components/duration_thx/projects';
import { thxCertificate } from '../my.store';
import { translate } from 'react-i18next';
import i18next from 'i18next';
import Link from "../../../components/link/link";
import queryString from 'query-string';

class Duration extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
 
  }

  componentWillMount() {
    const params = queryString.parse(location.search);
    params.project_id
    this.props.thxCertificate(params.project_id);
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

       
      

        <div className="page-duration-main-box">
          <DutationProjects durationProject={this.props.reward.data ? listData.project : null} user={this.props.user} isEntry />
         
        </div>


      </div>
    );
  }
}


Duration.title = i18next.t('我的证书');

Duration.propTypes = {
  thxCertificate: PropTypes.func,
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
  dispatch => bindActionCreators({ thxCertificate }, dispatch),
)(translate('translations')(Duration));
