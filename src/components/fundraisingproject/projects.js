/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import classnames from 'classnames';
import './projects.css';
import Link from '../link/link';
import Image from '../image/image';
import Avatar from '../avatar/avatar';
import { parseTimeStringToDateString, parseDistance, isVolunteerInsure } from '../../utils/funcs';
import { translate } from 'react-i18next';
import i18next from 'i18next';

class Projects extends React.Component {

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

  statusClassnamesFromProject(project) {
    // if (project.join_status == 5) {
    //   return ""
    // }
  }

  render() {
    const { projects, t } = this.props;
    const showLabel = this.props.showLabel;
    if (!projects) {
      return null;
    } else if (projects && !projects.length) {
      return <div className="projects-empty-tip">{t('目前还没有活动哦')}</div>;
    }

    return (
      <ul className="component-projects">
        {
          projects.map((project) => {
            // const { team } = prosject;
            // const volunteer = isVolunteerInsure(project.volunteer_security);
            let name = "";
         
            return <li key={project.id}>
                <div>
                <Link to={project.jump_mode == 0 ? `/fundraisingproject/detail/${project.id}` :project.herf }  className="project-main">

                  {/* <Link to={`/fundraisingproject/detail/${project.id}`} className="project-main"> */}
                    <Image className="image" src={(project.photo && project.photo.length && Array.isArray(project.photo) && project.photo[0]) || project.list_photo} defaultSrc="/images/default_banner.png" alt="项目图片" />
                    <div className="project-name">
                      {project.name}

                  
                    </div>
                    <div className="project-date">
                        {project.desc}
                      </div>
                   
                  </Link>

                
                </div>
              </li>;
          })
        }
      </ul>
    );
  }
}

Projects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({

  })),
  showLabel: PropTypes.bool,
};

export default translate('translations')(Projects);

