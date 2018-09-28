/* eslint  "no-nested-ternary":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import queryString from 'query-string';
import './list.css';
import history from '../../history';
import Link from '../../../components/link/link';
import Filter from '../component/filter/filter';
import Teams from '../../../components/platfroms/index';
import { isWindowReachBottom } from '../../../utils/funcs';
import { getAreaCity } from '../../home/home.store';

import {
  requestTeamList,
} from './list.store';

class TeamListPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
    };
  }

  componentWillMount() {
    this.requestList(false);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps(nextProps) {
    const { list: Llist } = this.props;
    const { list: Nlist } = nextProps;
    if (Llist.fetching && !Llist.failed && !Nlist.fetching && !Nlist.failed) {
      this.requestList(false);
    }
  }


  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (isWindowReachBottom(30)) {
      this.requestList(true);
    }
  }

  requestList(more) {
    const { list: { data: listData, fetching } } = this.props;

    if (fetching ||
      (more && (!listData || listData.page.current_page >= listData.page.total_page))) {
      return;
    }

    this.props.requestTeamList({
      current_page: more ? listData.page.current_page + 1 : 1,
      more,
    });
  }

  render() {
    const { list: { data: listData } } = this.props;
    const showLoadingMore = listData &&
      listData.page && (listData.page.current_page < listData.page.total_page);
    return (
      <div className="page-team-list">
        <div className="header">
          <div className="search-bar-container">
            <Link className="component-search-bar" to="/platfrom/search">
              <input className="input" placeholder="请输入机构名称" disabled="disabled" />
            </Link>
          </div>
        </div>

        <div className="body">

          <div className="team-list">
            <Teams teams={listData ? listData.list : null} />
          </div>
          {
            showLoadingMore
              ?
              <div className="component-loading-more">
                <img src="/images/icon_loading.png" alt="loading" />
                正在加载
            </div>
              : null
          }
        </div>



      </div>
    );
  }
}

TeamListPage.propTypes = {
  requestTeamList: PropTypes.func,
  list: PropTypes.shape({
    data: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.shape({})),
      page: PropTypes.shape({
        current_page: PropTypes.number,
        total_page: PropTypes.number,
      }),
    }),
  }),
  route: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      type: PropTypes.string,
      category: PropTypes.string,
      target: PropTypes.string,
    }),
  }),
};

TeamListPage.title = '志愿团队';

export default connect(
  state => ({
    list: state.platfrom.list,
    user: state.user,
    getAreaCity: PropTypes.func,
    area: state.home.getAreaCity,
  }),
  dispatch => bindActionCreators({
    requestTeamList, getAreaCity,
  }, dispatch),
)(TeamListPage);
