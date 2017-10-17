/**
 * @file 志愿项目
 */

/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';

import '../projects.css';

class TabItem extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }
  handleClick() {
    this.props.handleClick(this.props.index);
  }

  render() {
    return (
      <li
        className={this.props.currentClass(this.props.index)}
        onClick={this.handleClick}
      ><div>{this.props.val}</div></li>
    );
  }
}


TabItem.title = '志愿项目';

TabItem.propTypes = {
  index: PropTypes.number,
  handleClick: PropTypes.func,
  currentClass: PropTypes.func,
  val: PropTypes.string,
};

export default TabItem;
