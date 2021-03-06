/* eslint  "react/prefer-stateless-function":"off",
"jsx-a11y/no-static-element-interactions":"off" */

import React from 'react';
import './sharetip.css';

class ShareTip extends React.Component {

  static propTypes = {
    onClick: React.PropTypes.func.isRequired,
  }

  render() {
    return (<div className="component-share-tip" onClick={this.props.onClick}>
      <img src="/images/share_arrow.png" alt="" />
      <img src="/images/share_bg.png" alt="" />
    </div>);
  }

}

export default ShareTip;
