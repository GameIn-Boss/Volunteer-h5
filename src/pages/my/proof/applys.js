/**
 * @file 服务时长
 */

/* global wx:false */
import React, { PropTypes } from "react";
import autoBind from "react-autobind";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Link from "../../../components/link/link";
// import ApplyItem from '../../../components/duration_apply/applysItem';
import { authAction } from "../my.store";
import "./applys.css";
import moment from "moment";
import { translate } from 'react-i18next';
import i18next from 'i18next';
import classnames from 'classnames';

let verify_status = {
  '-1': i18next.t('未提审'),
  '0': i18next.t('审核中'),
  '1': i18next.t('通过'),
  '2': i18next.t('驳回')
};
class ApplyItem extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillReceiveProps() { }

  componentWillUnmount() { }

  render() {

    if (!this.props.data) return null;
    const { t } = this.props;
    return (
      <div className="page-apply-components">
        {this.props.data.map((item, index) => {
          return (
            <Link to={`/my/certificaterecord/${item.id}?id=${item.id}`}>
            <div className="page-apply-components-content">
              {item.verify_status == 2 ? <div className="page-apply-components-content-status-2"/> :null}
              {item.verify_status == 1 ? <div className="page-apply-components-content-status-1"/> :null}
              {item.verify_status == 0 ? <div className="page-apply-components-content-status-0"/> :null}
              <div className="page-apply-components-content-top">
                <div>
                  我的志愿证明
                </div>
              </div>
              <div className="line1px" />
              <div className="page-apply-components-content-bottom">
              <div>申请时间：{moment(item.created_at).format('YYYY-MM-DD')}    </div>
              </div>
            </div>
            </Link>

          );
        })
    
        }
      </div>
    );
    
  }
}
class Apply extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    this.props.authAction().then(() => { this.forceUpdate(); });
  }

  componentDidMount() { }

  componentWillReceiveProps() { }

  componentWillUnmount() { }

  render() {
    const { data: listData } = this.props.apply;
    const { t } = this.props;
    // console.log(this.props.apply.data.status)
    // if (this.props.apply.data.status == 0) {
    //   return (
    //     <div className="page-apply">
    //       <div>
    //         <div className="page-apply-take-up" />
    //         <img
    //           style={{
    //                             width: "200px",
    //                             display: "block",
    //                             position: "relative",
    //                             top: '120px',
    //                             bottom: 0,
    //                             left: 0,
    //                             right: 0,
    //                             margin: "auto"
    //                         }}
    //                         src='/images/acquiescence_sign.png'
    //                     />        
                        
    //                       </div>
    //                       <p className="page-apply-text" >暂无申请</p>

    //       <Link to="/my/certificateauth" className="page-apply-bottom-btn">
    //         <div className="page-apply-main">申请证1书</div>
    //       </Link>
    //     </div>
    //   ); 
    //  } else {
      return (
        <div className="page-apply">
          <div>
            <ApplyItem t={t} data={listData ? listData.list : null} />
            <div className="page-apply-take-up" />
          </div>
          <Link to="/my/certificateauth" className="page-apply-bottom-btn">
            <div className="page-apply-main">{t('申请证书')}</div>
          </Link>
        </div>
      );
    }

  // }
}

Apply.title = i18next.t('申请证书');

Apply.propTypes = {
  authAction: PropTypes.func,
  apply: PropTypes.shape({
    data: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.shape({})),
      status:  PropTypes.string,
    })
  })
};

export default connect(
  state => ({
    apply: state.my.apply
  }),
  dispatch => bindActionCreators({ authAction }, dispatch)
)(translate('translations')(Apply));
