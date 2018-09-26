import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import cx from 'classnames';
import './index.css';
import Link from '../link/link';
import Avatar from '../avatar/avatar';
import Images from '../image/image';
import Star from '../star/star';
class Teams extends React.Component {

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
    const { teams } = this.props;
    const showLabel = this.props.showLabel;
    if (!teams) {
      return null;
    } else if (teams && !teams.length) {
      return <div className="teams-empty-tip">目前还没有机构哦</div>;
    }
    return (
      <ul className="component-teams">
        {
          teams.map(team => (<li key={team.id}>
            <Link to={`/team/detail/${team.id}`}>
              <Images src={team.logo} size={{ width: 86, radius: 4 }} className="logo"/>
              <div className="team-name-container">
                <div className="team-name">
                  <div className="team-name-content">
                    {team.name}
                  </div>

                </div>
                <div className="team-introduce">简介：中国青年志愿者协会成立于1994年12月5日，是由志愿从事社会公益事...</div>
                <div className="team-info">
                  <span>项目数量：{team.reward_time}</span>
                  <span>累计时长: {team.team_size}</span>
                </div>
              </div>
            </Link>
            <div className="line1px" />
          </li>))
        }
      </ul>
    );
  }
}

Teams.propTypes = {
  teams: PropTypes.arrayOf(
      PropTypes.shape({

      }),
  ),

  showLabel: PropTypes.bool,
};

export default Teams;
