/**
 * @file 我的消息
 */

/* global wx:false */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import '../thx.css';
import i18next from 'i18next';
import { translate } from 'react-i18next';
import Avatar from '../../../../components/avatar/avatar';


class ThxItem extends React.Component {

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

  render() {
    const data = this.props.data;
    if (!data) {
      return <div />;
    }
    const { t } = this.props;
    const time = data.publish_time;
    const timeArr = time.split('-');
    const year = timeArr[0];
    const month = timeArr[1];
    const day = timeArr[2].split(' ')[0];
    return (
      <div className="page-thxitem">
        <div className="page-thxitem-header">
          <Avatar src={data.avatars} size={{ width: 30, height: 30, radius: 4 }} />

          <div className="page-thxitem-header-title-container">
            <div className="page-thxitem-header-title-container-bussiness">{t(data.username)}</div>
            <div className="page-thxitem-header-title-container-date">{year}.{month}.{day}</div>
          </div>
        </div>
        <div className="page-thxitem-thxtitle">{data.title}</div>
        <div className="page-thxitem-content">{data.content}</div>
        <div className="line1px" />


      </div>
    );
  }
}


export default translate('translations')(ThxItem);
