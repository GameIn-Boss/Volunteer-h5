import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Dialog } from "react-weui";
import Alert from "react-s-alert";
import "weui/dist/style/weui.css";
import "react-weui/build/packages/react-weui.css";
import { translate } from 'react-i18next';

class Index extends Component{
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      showDialog: false,
    };
    const { t } = props;
    this.dialog = {
      title: t('询问'),
      buttons: [
        {
          type: 'default',
          label: t('暂不使用'),
          onClick: () => {
            Alert.error(t('请您先同意协议'));
          },
        },
        {
          type: 'primary',
          label: t('同意'),
          onClick: () => {
            // 读取localstorage
            localStorage.setItem('readPolicy', true);
            this.setState({
              showDialog: false,
            });
          },
        },
      ],
    };
  }
  componentDidMount() {
    const isReadPolicy = localStorage.getItem('readPolicy');
    if (!!!isReadPolicy) {
      this.setState({
        showDialog: true,
      });
    }
  }
  render() {
    const { t } = this.props;

    return (
      <div style={{
        letterSpacing: '1.2px',
      }}>
        <Dialog
          type="ios"
          title={this.dialog.title}
          buttons={this.dialog.buttons}
          show={this.state.showDialog}
        >
          <div className="launch-agree-title">{t('用户协议和隐私政策')}</div>
          <div className="launch-agree-word">
            &nbsp;&nbsp;{t('agreementAndPrivacy')}
          </div>
          <div className="launch-agree-word">
            &nbsp;&nbsp;{t('你可阅读')}{t('用户协议')}{t('和')}{t('隐私政策')}{t('agreeDialog')}
          </div>
        </Dialog>
      </div>
    )
  }
}

export default translate('translations')(Index);
