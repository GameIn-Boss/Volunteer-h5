/**
 * @file {scoreName || '星币'}
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
import { translate } from 'react-i18next';
import POINTITEM from './component/pointItem';
const scoreName =window.orgInfo.st_point_uint&&window.orgInfo.st_point_uint[1];
class PointPay extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.scoreAction(1);
  }

  componentDidMount() {
    const { t } = this.props;
    document.title = `${t('我的')}${scoreName || t('星币')}${t('明细')}`;
  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  render() {
    const { t } = this.props;
    const { data: listData, type } = this.props.score;
    return (

      <div className="page-point-income-pay-container">
        <div className="line1px" />
        <div className="page-point-income-pay-title">
          <span>{t('时间')}</span>
          <span>{scoreName || t('星币')}</span>
        </div>
        <div className="line1px" />
        <div className="page-point-income-pay-main-contain">
          {listData && listData.list.length >= 1 && type === 'pay' ?
            <POINTITEM data={listData.list} isPay /> : <span className="page-point-income-pay-main-empty">{t('暂无记录')}</span>}

        </div>
      </div>
    );
  }
}


PointPay.propTypes = {

};

export default connect(
  state => ({
    score: state.my.score,
  }),
  dispatch => bindActionCreators({ scoreAction }, dispatch),
)(translate('translations')(PointPay));
