import autoBind from "react-autobind";
import React, { PropTypes } from "react";
import classnames from "classnames";
import Link from "../link/link";
import "./style.css";
import {
  parseDistance,
} from "../../utils/funcs";
import { translate } from 'react-i18next';

class Off extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }
  renderEmpty() {
    const { t } = this.props;
    return (
      <div className="no-record">
        <div>
        {orgCode == 'yMYer06bOB' ?  
            <img src="/images/off.jpg" alt="" />

            :
            <img src="/images/off.jpg" alt="" />
            }
        </div>
        <div className="jsz">
          <p>{t('正在建设中')}</p>
        </div>
        <div className="sign-btn-container">
        {orgCode === 'yMYer06bOB' ?  <Link to="/" className="sign-btn-qlzy">
            {t('返回首页')}
          </Link>:     <Link to="/" className="sign-btn">
            {t('返回首页')}
          </Link>}
         
        </div>
      </div>
    );
  }
    render() {
    return (
      <div className="page-sign">
        <div className="component-sign">{this.renderEmpty()}</div>
      </div>
    );
  }
}

export default translate('translations')(Off);
