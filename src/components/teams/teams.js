import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import cx from 'classnames';
import './teams.css';
import Link from '../link/link';
import Avatar from '../avatar/avatar';
import Star from '../star/star';
import { translate } from 'react-i18next';
import { Accordion, List } from 'antd-mobile';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  requestTeamList,
} from './team.store';
class Teams extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      listdata: [],
    };
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() { }
 

  handleBelow(id) {
    const { listbelow: { data: listData, fetching } } = this.props;
    this.props.requestTeamList({
      id: id,
    });
  }
  render() {
   console.log(this.props)
    const { teams, t } = this.props;
    const showLabel = this.props.showLabel;
  
    if (!teams) {
      return null;
    } else if (teams && !teams.length) {
      return <div className="teams-empty-tip">{showLabel ? t('目前还没有您已加入的团队哦') : t('目前还没有团队哦')}</div>;
    }
    return (
      <ul className="component-teams">      
        {
          teams.map(team => (<li key={team.id}>
            <Link to={`/team/detail/${team.id}`}>
              <Avatar src={team.logo} size={{ width: 60, radius: 4 }} />
              <div className="team-name-container" >
                <div className="team-name">
                  <div className="team-name-content">
                    {team.name}
                    <div className="team-name-star">
                      {/* <Star  size={{width:15,height:14,score:4}} isBlockEmptyStar/> */}
                      {team.stars ? <Star size={{ width: 15, height: 14, score: team.stars }} isBlockEmptyStar /> : null}
                    </div>
                  </div>

                  {
                    showLabel ?
                      <div
                        className={cx({
                          'team-main-top-state': true,
                          'team-main-top-state-visiblehidden': team.join_status === 1,
                        })}
                      >{t('审核中')}</div> : null
                  }
                </div>

                <div className="team-info">
                  <span>{!!team.jinyun_state ? (team.jinyun_timeSum / 3600).toFixed(2) : team.reward_sum} {t('小时')}</span>
                  <span>{team.team_size} {t('人')}</span>
                </div>
              </div>
            </Link>
            <Accordion accordion openAnimation={{}} className="my-accordion" onChange={()=>this.handleBelow(team.id)}>
          <Accordion.Panel header="查看下级团队"  >
            <List className="my-list">
            {
          teams.map(team => (<li key={team.id}>
            <Link to={`/team/detail/${team.id}`}>
              <Avatar src={team.logo} size={{ width: 60, radius: 4 }} />
              <div className="team-name-container">
                <div className="team-name">
                  <div className="team-name-content">
                    {team.name}
                    <div className="team-name-star">
                      {/* <Star  size={{width:15,height:14,score:4}} isBlockEmptyStar/> */}
                      {team.stars ? <Star size={{ width: 15, height: 14, score: team.stars }} isBlockEmptyStar /> : null}
                    </div>
                  </div>

                  {
                    showLabel ?
                      <div
                        className={cx({
                          'team-main-top-state': true,
                          'team-main-top-state-visiblehidden': team.join_status === 1,
                        })}
                      >{t('审核中')}</div> : null
                  }
                </div>

                <div className="team-info">
                  <span>{!!team.jinyun_state ? (team.jinyun_timeSum / 3600).toFixed(2) : team.reward_sum} {t('小时')}</span>
                  <span>{team.team_size} {t('人')}</span>
                </div>
              </div>
            </Link>
            <Accordion accordion openAnimation={{}} className="my-accordion">
          <Accordion.Panel header="查看下级团队" onClick={()=>this.handleBelow(team.id)}>
            <List className="my-list">
              <List.Item>content 1</List.Item>
              <List.Item>content 2</List.Item>
              <List.Item>content 3</List.Item>
            </List>
          </Accordion.Panel>
          </Accordion>
            <div className="line1px" />
          </li>))
        }
            </List>
          </Accordion.Panel>
          </Accordion>
            <div className="line1px" />
          </li>))
        }
      </ul>
    );
  }
  
}

Teams.propTypes = {
  requestTeamList: PropTypes.func,
  teams: PropTypes.arrayOf(
    PropTypes.shape({

    }),
  ),
  showLabel: PropTypes.bool,
};

export default connect(
  state => ({
    listbelow: state,
    user: state.user,
  }),
  dispatch => bindActionCreators({
    requestTeamList,
  }, dispatch),
)(translate('translations')(Teams));

// export default translate('translations')(Teams);
