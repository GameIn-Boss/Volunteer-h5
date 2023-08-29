/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import './wuqing.css';
import Link from '../link/link';
import Image from '../image/image';
import Avatar from '../avatar/avatar';
import { parseTimeStringToDateString, parseDistance, isVolunteerInsure } from '../../utils/funcs';
import { translate } from 'react-i18next';
import i18next from 'i18next';

class Wuqing extends React.Component {

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

  componentWillUnmount() { }

  render() {
    const { teams, t } = this.props;
    const showLabel = this.props.showLabel;
    if (!teams) {
      return null;
    } else if (teams && !teams.length) {
      return <div className="teams-empty-tip">{showLabel ? t('目前还没有您已加入的团队哦') : t('目前还没有团队哦')}</div>;
    }
    return (
      <ul className="component-projects">
        {
          
          teams.map((project) => {
            let name = "";
            // let statusClassnames =
            return <li key={project.id}>
                <div>
                 
                  <Link to={`/wuqing/detail/${project.id}`} className="project-main">
                    <Image className="image" src={`${project.team_photo}`}  alt="项目图片" />
                    <div className="project-name">
                      {project.name}

                   
                    </div>
                 
                  
                  </Link>
                  <div className="project-footer">
                  
                
                  </div>
                </div>
              </li>;
          })
        }
      </ul>
    );
  }
}

Wuqing.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({

  })),
  showLabel: PropTypes.bool,
};

export default translate('translations')(Wuqing);

