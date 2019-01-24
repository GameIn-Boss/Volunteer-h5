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
  renderProjectList() {
    // const { data } = this.props;
    // const records = data && data.list ? data.list : [];
    // // data && data.next && data.next.project ? data.next : null;
    // const next = true;
    // data && data.list && data.list.length === 0 && !next
    // const records = data && data.list ? data.list : [];
    const records = [
      {},{},{},{},{},{}
    ]
    // already-sign
    // wait-sign
    // in -audit
    // reject
    return <div>
        {records.map(record => (
          <li key={record.clock_in_time} className="sign-record">
            <div className="sign-header">
              <div className="sign-time">
                <span>班次</span>
                <span>
                  {/* {record.clock_in_time} */}
                  2017/09/20 09:00 - 10:00
                </span>
              </div>
              <div className="already-sign">已签到</div>
            </div>
            <div className="line1px" />
            <div className="project-info">
              <div className="project-title">
                {/* {record.project && record.project.name} */}
                志多星关注程序员健康活动
              </div>
              <div className="project-duration">
                <span>获得志愿者时长</span>
                <span>
                  {/* {parseFloat(record.reward_time)}小时 */}
                  2.00小时
                </span>
              </div>
            </div>
          </li>
        ))}
      </div>;
  }
  renderNextProject() {
    const { data } = this.props;
    const records = data && data.list ? data.list : [];
    // data && data.next && data.next.project ? data.next : null;
    const next = true;
    // data && data.list && data.list.length === 0 && !next
    return <li>
        <div className="sign-header">
          <div className="sign-time">
            <span>下次签到班次</span>
            <span>
              2017.09.20 09:00 - 10:00
              {/* {new Date(Date.parse(next.begin.replace(/-/g, "/"))).Format("yyyy-MM-dd hh:mm")} - {new Date(Date.parse(next.end.replace(/-/g, "/"))).Format("hh:mm")} */}
            </span>
          </div>
        </div>
        <div className="line1px" />
        <div className="project-info">
          <div className="project-title">
            志多星关注程序员健康活动
            {/* {next.project && next.project.name} */}
          </div>
          <div className="project-duration">
            <span>预计最多可获得志愿时长</span>
            <span>
              2.00小时
              {/* {parseFloat(next.reward_time)}小时 */}
            </span>
          </div>
        </div>
      </li>;
  }
  render() {
    const { data } = this.props;
    const records = data && data.list ? data.list : [];
    // data && data.next && data.next.project ? data.next : null;
    const next = true;
    // data && data.list && data.list.length === 0 && !next
    return (
      <div className="page-sign">
        <div className="component-sign">
          {data ? this.renderEmpty() : <div className="component-sign-title">
            请选择签到项目
          </div>}
          <ul className="sign-list">
            {next ? this.renderNextProject() : null}
            {this.renderProjectList()}
          </ul>
        </div>
      </div>
    )

  }
}

export default SignItem;
