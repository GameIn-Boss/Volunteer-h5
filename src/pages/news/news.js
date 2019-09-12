import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import News from '../../components/news/news';
import { requestNewsList } from './news.store';
import './news.css';

class NewsPage extends React.Component {
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
    this.props.requestNewsList({
      current_page: 1,
    });
  }
  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    const { newsList: { filed: nFiled, fetching: nFetching, data } } = nextProps;
    const { newsList: { filed: tFiled, fetching: tFetching } } = this.props;
    if (tFetching && !tFiled && !nFiled && !nFetching) {
      const state = {
        initLoading: false,
        loading: false,
        page: data.page,
        data: this.state.data.concat(data.list),
      };
      const { page } = data;
      if (page.current_page >= page.total_page) {
        this.setState({
          is_over: true,
        });
      }
      this.setState({
        ...state,
      });
    }
  }

  componentWillUnmount() {}

  onLoadMore() {
    const { page } = this.state;
    this.setState({
      loading: true,
    });
    this.props.requestNewsList({ current_page: page.current_page + 1 });
  }

  render() {
    const { data } = this.state;
    const { initLoading, loading, is_over } = this.state;
    return (<div>
      <div className="news-detail-title">
        <div className="layer">
          <div style={{ marginLeft: '87px' }}>新闻资讯</div>
        </div>
      </div>
      <div className="layer">
        <div className="news-detail-content">
          <News
            news={data || []}
            initLoading={initLoading}
            onLoadMore={this.onLoadMore}
            loading={loading}
            is_over={is_over}
            showMore
          />
        </div>
      </div>
    </div>);
  }
}

NewsPage.propTypes = {
  requestNewsList: PropTypes.func,
  newsList: PropTypes.shape({
    filed: PropTypes.bool,
    fetching: PropTypes.bool,
    data: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.shape({})),
      page: PropTypes.shape({
        count: PropTypes.num,
        current_page: PropTypes.num,
        page_size: PropTypes.num,
        total_page: PropTypes.num,
      }),
    }),
  }),
};

export default connect(
  state => ({
    newsList: state.news.newsList,
  }), dispatch => bindActionCreators({ requestNewsList }, dispatch),
)(NewsPage);
