import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestNews, requestNewsList } from './news.store';
import Image from './../../components/image/image';
import './detail.css';

class NewsDetailPage extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
    };
  }

  componentWillMount() {
    const { route: { params: { id } } } = this.props;
    this.props.requestNews(id);
    this.props.requestNewsList({ page_size: 4 });
  }
  componentDidMount() {}

  componentWillReceiveProps() {}

  componentWillUnmount() {}

  renderRightContent(item) {
    return (<div key={item.id} className="page-news-detail-content-box-news-item">
      <p style={{marginBottom: '7px'}}>{item.title}</p>
      <Image src={item.photo} defaultSrc="/images/default_avatar.png" resize={{ width: 201, height: 135 }} style={{ width: '201px', height: '135px' }} />
    </div>);
  }

  renderHeader() {
    const { newsData: { data } } = this.props;
    return (<div className="page-news-detail-header">
      <div className="layer">
        <div className="page-news-detail-header-box">
          {data && data.title}
          <p className="page-news-detail-header-box-time">发布时间：{data && data.publish_time}</p>
        </div>
      </div>
    </div>);
  }

  renderContent() {
    const { newsData: { data }, newsList } = this.props;
    return (<div className="page-news-detail-box">
      <div className="layer">
        <div className="page-news-detail-content-box">
          <div dangerouslySetInnerHTML={{ __html: data && data.content }} />
          <div>
            <p className="page-news-detail-content-box-news-title">相关文章</p>
            {newsList && newsList.data && newsList.data.list.map(item => (this.renderRightContent(item)))}
          </div>
        </div>
      </div>
    </div>);
  }

  render() {
    return (<div className="page-team-detail">
      {this.renderHeader()}
      {this.renderContent()}
    </div>);
  }
}

NewsDetailPage.propTypes = {
  requestNews: PropTypes.func,
  requestNewsList: PropTypes.func,
  route: PropTypes.shape({}),
  newsData: PropTypes.shape({}),
  newsList: PropTypes.shape({}),
};

export default connect(
  state => ({
    newsData: state.news.news,
    newsList: state.news.newsList,
  }), dispatch => bindActionCreators({ requestNews, requestNewsList }, dispatch),
)(NewsDetailPage);
