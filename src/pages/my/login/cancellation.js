/* eslint  "jsx-a11y/no-static-element-interactions":"off", "react/no-array-index-key":"off" */
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from '../../../components/link/link';
import { cancellationAction } from './login.store';
import { translate } from 'react-i18next';
import i18next from 'i18next';
import './forget.css';
import { Dialog } from "react-weui";
import "weui/dist/style/weui.css";
import "react-weui/build/packages/react-weui.css";

class Cancellation extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    const { t } = props;
    this.state = {
      showDialog: false,
    };
    this.dialog = {
      title: t('注销账户'),
      buttons: [
        {
          type: 'default',
          label: t('取消'),
          onClick: () => {
            this.setState({
              showDialog: false,
            });
          },
        },
        {
          type: 'primary',
          label: t('确认'),
          onClick: () => {
            props.cancellationAction();
          },
        },
      ],
    };
  }

  onSubmit() {
    this.setState({
      showDialog: true,
    })
  }

  componentWillReceiveProps(nextProps) {
    const { cancellation: cCancellation } = this.props;
    const { cancellation: nCancellation } = nextProps;

    if (cCancellation.fetching && !cCancellation.failed && !nCancellation.fetching && !nCancellation.failed) {
      window.location.replace('/');
    }
  }

  render() {
    const { t } = this.props;
    return (
      <div className="page-forget">
        <div className="page-forget-top" style={{textAlign: 'center'}}>
          {t('注销账户')}
        </div>
        <div className="page-forget-submmit" onClick={this.onSubmit}>
          {t('注销账户')}
        </div>
        <Dialog
          type="ios"
          title={this.dialog.title}
          buttons={this.dialog.buttons}
          show={this.state.showDialog}
        >
          {t('是否确定注销账户')}
        </Dialog>
      </div>
    );
  }
}
Cancellation.title = i18next.t('注销账户');
export default connect(
  state => ({
    cancellation: state.login.cancellation,
  }),
  dispatch => bindActionCreators({ cancellationAction }, dispatch)
)(translate('translations')(Cancellation));
