import autoBind from "react-autobind";
import React, { PropTypes } from "react";
import classnames from "classnames";
import Link from "../link/link";
import "./style.css";
Date.prototype.Format = function(fmt) {
  // author: meizz
  const o = {
    "M+": this.getMonth() + 1, // 月份
    "d+": this.getDate(), // 日
    "h+": this.getHours(), // 小时
    "m+": this.getMinutes(), // 分
    "s+": this.getSeconds(), // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      `${this.getFullYear()}`.substr(4 - RegExp.$1.length)
    );
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      );
  }
  return fmt;
};

class SignItem extends React.Component {
  static propTypes = {
    data: PropTypes.shape({})
  };
  constructor(props) {
    super(props);
    autoBind(this);
  }
  renderEmpty() {
    return (
      <div className="no-record">
        <div>
          <img src="/images/sign.png" alt="" />
        </div>
        <span>
          <p>还没有项目可以签到</p>
          <p>快去加入项目吧</p>
        </span>
        <div className="sign-btn-container">
          <Link to="/project/list" className="sign-btn">
            浏览项目
          </Link>
        </div>
      </div>
    );
  }
  renderProjectList(data) {
    // const { data } = this.props;
    // const records = data && data.list ? data.list : [];
    // // data && data.next && data.next.project ? data.next : null;
    // const next = true;
    // data && data.list && data.list.length === 0 && !next
    // const records = data && data.list ? data.list : [];
    const records = [{}, {}, {}];
    return <div>
        {records.map(record => (
          <li key={record.clock_in_time} className="sign-record">
            <Link to={`/sign/signclass/${1}`}>
            <div
              className={classnames({
                "sign-record-status-shape": true,
                "sign-record-status-shape-ing": true,
                "sign-record-status-shape-recru": false,
                "sign-record-status-shape-end": false
              })}
            />
            <div className="sign-header">
              <div className="project-title">志多星关注程序员健康活动</div>
              <div style={{ color: "#686868", fontSize: "13px" }}>
                活动日期：2017.10.12-2017.10.14
              </div>
            </div>
            <div className="line1px" />
            <div className="project-info">
              <div className="project-info-addr">朝阳区 0.6km</div>
              <div className="project-info-date">
                <span style={{ color: "#F6AB00" }}>50</span>/300
              </div>
              </div>
            </Link>
          </li>
        ))}
      </div>;
  }

  render() {
    const { data } = this.props;
    const records = data && data.list ? data.list : [];
    // data && data.next && data.next.project ? data.next : null;
    const next = true;
    // data && data.list && data.list.length === 0 && !next
    // if (!data) {
    //   return (
    //     <div className="page-sign">
    //       <div className="component-sign">{this.renderEmpty()}</div>
    //     </div>
    //   );
    // }
    return <div className="page-sign">
        <div className="component-sign">
          {data ? null : <div className="component-sign-title">
              近3天待打卡项目
            </div>}
          <ul className="sign-list">
            {next ? this.renderProjectList() : null}
            {data ? null : <div className="component-sign-title">
                所有项目
              </div>}
            {this.renderProjectList()}
          </ul>
        </div>
      </div>;
  }
}

export default SignItem;
