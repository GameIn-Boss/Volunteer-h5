/**
 * @file 星币
 */

/* global wx:false */
/* eslint  "class-methods-use-this":"off",
"jsx-a11y/no-static-element-interactions":"off",
"react/no-array-index-key":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './point.css';
import { scoreAction } from '../my.store';

import POINTITEM from './component/pointItem';

class PointPay extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.scoreAction(1);
  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  render() {
    const { data: listData, type } = this.props.score;
    return (

      <div className="page-point-income-pay-container">
        <div className="line1px" />
        <div className="page-point-income-pay-title">
          <span>时间</span>
          <span>星币</span>
        </div>
        <div className="line1px" />
        <div className="page-point-income-pay-main-contain">
          {listData && listData.list.length >= 1 && type === 'pay' ?
            <POINTITEM data={listData.list} isPay /> : <span className="page-point-income-pay-main-empty">暂无记录</span>}

        </div>
      </div>
    );
  }
}

PointPay.title = '我的星币明细';

PointPay.propTypes = {

};

export default connect(
  state => ({
    score: state.my.score,
  }),
  dispatch => bindActionCreators({ scoreAction }, dispatch),
)(PointPay);
