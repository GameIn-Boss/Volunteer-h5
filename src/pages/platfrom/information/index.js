import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './index.css';
import { isWindowReachBottom } from '../../../utils/funcs';
import history from '../../history';

import {
  requestSearch,
} from './index.store';
import { Dialog } from 'react-weui';
import 'weui/dist/style/weui.css';
import 'react-weui/build/packages/react-weui.css';
class TeamSearchPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = ({
      showDialog: true,
    })
    this.keyword = '';
    this.dialog = {
      title: '查询错误',
      buttons: [
        {
          type: 'primary',
          label: '确认',
          onClick: () => {
            this.setState({ ...this.state, showDialog: false });

          },
        },
      ],
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);

    this.searchInput.focus();

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (isWindowReachBottom(50)) {
      this.search(true);
    }
  }

  search(more) {
    const { list: { data: listData, fetching } } = this.props;

    if (fetching ||
      (more && (!listData || listData.page.current_page >= listData.page.total_page))) {
      return;
    }

    this.props.requestSearch({
      name: this.keyword,
      current_page: more ? listData.page.current_page + 1 : 1,
      more,
    });
  }

  handleSearch(evt) {
    evt.preventDefault();
    const newKeyword = this.searchInput.value;

    if (!newKeyword || newKeyword === this.keyword) {
      return;
    }

    this.keyword = newKeyword;

    this.search();
  }

  /* eslint-disable */
  handleCancelSearch() {
    history.goBack();
  }
  /* eslint-enable */

  render() {
    const { list: { data: listData, keyword } } = this.props;

    return (
      <div className="page-team-search">
        <div className="header" onClick={this.handleSearch}>
          <div className="search-bar-container">
            <form onSubmit={this.handleSearch} className="component-search-bar">
              <input ref={(el) => { this.searchInput = el; }} onBlur={this.handleSearch} className="input" placeholder="请输入身份证号" />
            </form>
            <button onClick={this.handleSearch}>查询</button>
          </div>
        </div>
        <div className="line1px" />
        <div className="body">

          <Dialog type="ios" title={this.dialog.title} buttons={this.dialog.buttons} show={this.state.showDialog}>
            <div className="dialog-container">
              <img src="../images/shop/information.png" />
              <div className="dialog-container-title">没有查到相应的志愿服务信息哦～</div>
              <div className="dialog-container-container">建议：您可以联系您注册过的志愿服务机构，对账号进行实名认证后再次进行查询。</div>
            </div>
          </Dialog>
        </div>
      </div>
    );
  }
}

TeamSearchPage.propTypes = {
  requestSearch: PropTypes.func,
  list: PropTypes.shape({
    data: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.shape({})),
      page: PropTypes.shape({
        current_page: PropTypes.number,
        total_page: PropTypes.number,
      }),
    }),
  }),
};

TeamSearchPage.title = '搜索志愿项目';

export default connect(
  state => ({
    list: state.platfrom.search,
    user: state.user,
  }),
  dispatch => bindActionCreators({
    requestSearch,
  }, dispatch),
)(TeamSearchPage);
