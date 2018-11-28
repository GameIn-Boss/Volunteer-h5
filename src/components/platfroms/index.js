import React, { PropTypes } from "react";
import autoBind from "react-autobind";
import cx from "classnames";
import "./index.css";
import Link from "../link/link";
import Avatar from "../avatar/avatar";
import Images from "../image/image";
import Star from "../star/star";
class Teams extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps() {}

  componentWillUnmount() {}

  render() {
    const { teams } = this.props;
    const showLabel = this.props.showLabel;
    if (!teams) {
      return null;
    } else if (teams && !teams.length) {
      return <div className="teams-empty-tip">目前还没有机构哦</div>;
    }
    let content = null;

    return (
      <ul className="component-teams">
        {teams.map(team => {
          if (team.org_info_without_tags) {
            content = team.org_info_without_tags.replace(/&nbsp;/gi, "");
            content = content.replace(/(^\s*)|(\s*$)/g, "");
          }
          return (
            <li key={team.id}>
              <Link to={`${team.href}`}>
                <Images
                  src={team.logo}
                  size={{ width: 86, radius: 4 }}
                  className="logo"
                />
                <div className="team-name-container">
                  <div className="team-name">
                    <div className="team-name-content">{team.name}</div>
                  </div>
                  {team.org_info_without_tags ? (
                    <div className="team-introduce">简介：{content}</div>
                  ) : null}

                  <div className="team-info">
                    <span>项目数量：{team.project_count}</span>
                    <span>累计时长: {team.reward_time}</span>
                  </div>
                </div>
              </Link>
              <div className="line1px" />
            </li>
          );
        })}
      </ul>
    );
  }
}

Teams.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.shape({})),

  showLabel: PropTypes.bool
};

export default Teams;
