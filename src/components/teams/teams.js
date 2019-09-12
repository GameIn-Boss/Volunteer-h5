import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import cx from 'classnames';
import './teams.css';
import Link from '../link/link';
import Avatar from '../avatar/avatar';
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
    const { team } = this.props;
    return (<Link className="page-team-detail" to={`/team/${team.id}`} key={team.id}>
      <div className="page-home-teams-carousel-line">
        <div className="page-home-teams-carousel-line-avatars">
          <Avatar src={team.logo} defaultSrc="/images/default_avatar.png" size={{ width: 85, height: 85 }} />
        </div>
        <div className="page-home-teams-carousel-line-text">{team.name}</div>
        <div className="page-home-teams-carousel-line-star">
          {team.stars ?
            <Star size={{ width: 15, height: 14, score: team.stars }} />
            : null}
        </div>
        {/*<div>申请加入</div>*/}
      </div>
    </Link>);
  }
}

Teams.propTypes = {
  team: PropTypes.shape({}),
};

export default Teams;
