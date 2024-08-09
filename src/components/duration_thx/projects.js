/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from "react";
import autoBind from "react-autobind";
import "./projects.css";
import Link from "../link/link";
import Avatar from "../avatar/avatar";
import { translate } from 'react-i18next';
import ModalNew from "../posterModal/ModalNew";
import { PostDataModel_ProjectSign, PostDataModel_ProjectSign_Zhongjin } from "../posterModal/PostDataModel";
import {decode as base64_decode, encode as base64_encode} from 'base-64';

import { parseTimeStringToDateString, parseDistance } from "../../utils/funcs";
import ModalZhongjin from "../posterModal/ModalZhongjin";

class DurationProjects extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      visible: false,
      detailData: null,
    };

  }


  componentWillMount() {

  }

  componentDidMount() {}

  componentWillReceiveProps() {}

  componentWillUnmount() {}

  onClick(e) {
    const info = JSON.parse(e.currentTarget.getAttribute("data-data"));

    const data = {
      ...info
    };
    this.props.HandleClick(data);
  }
  poster=(data)=>{
    this.setState({
      ...this.state,
      visible: true,
      detailData: data,
    });
  }
  closeModal=()=>{
    this.setState({
      ...this.state,
      visible: false,
      detailData:null,
    })
  }

  renderModal(data) {
    // const { visible ,detailData } = this.state;
    // if (!visible || !detailData) return null;
    const { user } = this.props;

    // if (window.orgCode === 'kQBeXDWeyK') {
      const postData = PostDataModel_ProjectSign_Zhongjin(data, user);
      return <ModalZhongjin postData={postData} visible={true} maskCloseable={this.closeModal} />;
    // }
    // const postData = PostDataModel_ProjectSign(detailData, user);
    // return <ModalNew postData={postData} visible={true} maskCloseable={this.closeModal} />;
  }
  
  
  render() {
    const { durationProject, t } = this.props;
    console.log(durationProject);
    // this.poster(durationProject)
    if (!durationProject) {
      return null;
    } else if (durationProject && !durationProject.length) {
      return (
        <div className="duration-projects-empty-tip">{t('目前还没有志愿活动证书哦')}</div>
      );
    }
 
    return <div>
        <div style={{ height: "800px", overflowY: "auto" }}>
       {/* {this.poster()}  */}
             
        </div>

        {
          this.renderModal(durationProject[0])
        }
      </div>;
  }
}

DurationProjects.propTypes = {
  durationProject: PropTypes.arrayOf(PropTypes.shape({})),
  isEntry: PropTypes.bool,
  HandleClick: PropTypes.func,
  user: PropTypes.arrayOf(PropTypes.shape({})),
};

export default translate('translations')(DurationProjects);
