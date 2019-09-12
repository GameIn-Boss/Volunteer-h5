import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { List, Avatar, Button, Skeleton } from 'antd';
import 'antd/lib/list/style/css';
import 'antd/lib/avatar/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/skeleton/style/css';

import './news.css';
import Link from '../link/link';
// import Avatar from '../avatar/avatar';
import Image from '../image/image';

class News extends React.Component {

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

  renderHeader() {
    return <div className="page-home-news-title">新闻资讯 <span>Recent News</span></div>;
  }

  renderContent(item, index) {
    const { news } = this.props;
    return (<div className="page-home-news-content-line" key={index}>
      <Link to={`/news/${item.id}`}>
        <Image src={item.photo} resize={{ width: 87, height: 58 }} />
      </Link>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex' }}>
          <div className="page-home-news-content-line-text">
            <div>和众泽益为了推动中国志愿服务发展，一次性投入了1500万</div>
            <div className="page-home-news-content-line-text-color">纵观公益行业，互联网技术已被较为广泛的应用，但在志愿服务领域，需求虽然显而易见，但“互联网+”的概</div>
          </div>
          <div className="page-home-news-content-line-time">{item.publish_time}</div>
        </div>
        {
          index < news.length - 1 ? <div className="line1px" /> : null
        }
      </div>
    </div>);
  }

  renderFooter() {
    return (<Link to="/news">
      <div className="page-home-news-footer">
        查看全部 <img src="/images/arraw.png" alt="" />
      </div>
    </Link>);
  }

  render() {
    const {
      news,
      showFooter,
      title,
      initLoading,
      onLoadMore,
      loading,
      is_over: isOver,
      showMore } = this.props;
    const loadMore = !isOver ?
      (<div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore} loading={initLoading || loading}>加载更多</Button>
      </div>)
      : null;
    return (
      <div>
        {
          title ? this.renderHeader() : null
        }
        <div className="page-home-news-content">
          <List
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={showMore ? loadMore : null}
            dataSource={news || []}
            renderItem={item => (
              <List.Item
                actions={[<span>{item.publish_time}</span>]}
              >
                <Skeleton avatar title={false} loading={false} active>
                  <List.Item.Meta
                    avatar={
                      <Avatar size="small" shape="square" style={{ width: '72px', height: '58px', marginRight: '20px' }} src={item.photo} />
                    }
                    title={<a href={`/news/${item.id}`}>{item.title}</a>}
                  />
                </Skeleton>
              </List.Item>
            )}
          />
        </div>
        {
          showFooter ? this.renderFooter() : null
        }
      </div>
    );
  }
}

News.propTypes = {
  news: PropTypes.arrayOf(
    PropTypes.shape({

    }),
  ),
  title: PropTypes.bool,
  showFooter: PropTypes.bool,
  initLoading: PropTypes.bool,
  loading: PropTypes.bool,
  is_over: PropTypes.bool,
  showMore: PropTypes.bool,
  onLoadMore: PropTypes.func,
};

export default News;
