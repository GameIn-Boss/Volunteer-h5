import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Button, Empty } from 'antd';
import 'antd/lib/button/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/empty/style/css';
import Projects from '../../components/projects/projects';
import { requestProjectList } from './project.store';
import { getQuery } from './../../utils/funcs';
import './project.css';

const { Search } = Input;
class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      initLoading: true,
      loading: false,
      data: [],
      is_over: false,   // 加载是否完成
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
    this.props.requestProjectList({
      ...data,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { projectList: { filed: nFiled, fetching: nFetching, data } } = nextProps;
    const { projectList: { filed: tFiled, fetching: tFetching } } = this.props;
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

  componentWillUnmount() {
  }

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
    this.props.requestProjectList({
      ...data,
    });
  }

  onSearch(name) {
    window.location.href = `/project?name=${encodeURIComponent(name)}`;
  }

  renderHeader() {
    return (<div className="page-projects-title">
      <div className="layer page-projects-title-box">
        <div>志愿项目</div>
        <Search
          placeholder="搜索志愿项目"
          onSearch={(value) => { this.onSearch(value); }}
          style={{ width: 200 }}
        />
      </div>
    </div>);
  }

  render() {
    const {
      initLoading,
      loading,
      data,
      is_over: isOver,
      is_null: isNull } = this.state;
    return (<div className="page-projects">
      {this.renderHeader()}
      <div className="layer">
        <Projects projects={data && data} />
        {
          !isNull ?
          (!isOver ?
                <div style={{ width: '100%', textAlign: 'center' }}>
                  <Button loading={initLoading || loading} onClick={this.onLoadMore}>加载更多</Button>
                </div>
             : null) : <Empty description="暂无项目信息" />
        }
      </div>
    </div>);
  }
}

ProjectPage.propTypes = {
  requestProjectList: PropTypes.func,
  projectList: PropTypes.shape({
    data: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }),
};

export default connect(
  state => ({
    projectList: state.project.projectList,
  }), dispatch => bindActionCreators({ requestProjectList }, dispatch),
)(ProjectPage);
