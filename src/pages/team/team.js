import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { Input, Button, Empty } from 'antd';
import 'antd/lib/button/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/empty/style/css';
import { bindActionCreators } from 'redux';
import { requestTeamList } from './team.store';
import Teams from '../../components/teams/teams';
import { getQuery } from './../../utils/funcs';
import './team.css';

const { Search } = Input;
class TeamPage extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      initLoading: true,
      loading: false,
      data: [],
      is_over: false,
    };
  }

  componentWillMount() {
  }
  componentDidMount() {
    const data = {
      page_size: 12,
      current_page: 1,
    };
    Object.assign(data, getQuery('name'));
    this.props.requestTeamList({
      ...data,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { teamList: { filed: nFiled, fetching: nFetching, data } } = nextProps;
    const { teamList: { filed: tFiled, fetching: tFetching } } = this.props;
    if (tFetching && !tFiled && !nFiled && !nFetching) {
      const state = {
        initLoading: false,
        loading: false,
        page: data.page,
        data: this.state.data.concat(data.list),
      };
      const { page } = data;
      if (page.total_page === 0) {
        Object.assign(state, { is_null: true });
      } else if (page.current_page >= page.total_page) {
        Object.assign(state, { is_over: true });
      }
      this.setState({
        ...state,
      });
    }
  }

  componentWillUnmount() {}

  onLoadMore() {
    this.setState({
      loading: true,
    });
    const { page } = this.state,
      data = {
        current_page: page.current_page + 1,
        page_size: 12,
      };
    Object.assign(data, getQuery('name'));
    this.props.requestTeamList({
      ...data,
    });
  }

  onSearch(name) {
    window.location.href = `/team?name=${encodeURIComponent(name)}`;
  }

  render() {
    const {
      initLoading,
      loading,
      data,
      is_over: isOver,
      is_null: isNull,
    } = this.state;
    const arr = Object.keys(Array(...{ length: data.length % 4 })).map(item => (item));

    return (<div className="page-team-teams">
      <div style={{ background: '#F8F8F9' }}>
        <div className="layer">
          <div className="page-team-teams-title">
            <div>志愿团队</div>
            <Search
              placeholder="搜索志愿团队"
              onSearch={value => this.onSearch(value)}
              style={{ width: 200 }}
            />
          </div>
        </div>
      </div>
      <div className="layer page-team-box">
        {
          data.map(item => <Teams team={item} key={item.id} />)
        }
        {
          arr.length > 0 ?
            arr.map(item => (<div className="team-space" key={item} />))
            : null
        }
      </div>
      {
        !isNull ?
          (!isOver ?
            <div style={{ width: '100%', textAlign: 'center' }}>
              <Button loading={initLoading || loading} onClick={this.onLoadMore}>加载更多</Button>
            </div>
            : null) : <Empty description="暂无团队信息" />
      }
    </div>);
  }
}

TeamPage.propTypes = {
  requestTeamList: PropTypes.func,
  teamList: PropTypes.shape({}),
};

export default connect(
  state => ({
    teamList: state.team.teamList,
  }), dispatch => bindActionCreators({ requestTeamList }, dispatch),
)(TeamPage);
