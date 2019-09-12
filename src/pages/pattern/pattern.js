import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Modal } from 'antd';
import 'antd/lib/input/style/css';
import 'antd/lib/modal/style/css';
import { requestPatternList } from './pattern.store';
import { getQuery } from './../../utils/funcs';
import Avatar from './../../components/avatar/avatar';
import './pattern.css';

const { Search } = Input;

class NewsPage extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      modalData: {},
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
    this.props.requestPatternList({
      ...data,
    });
  }

  componentWillReceiveProps() {}

  componentWillUnmount() {}

  onSearch(name) {
    window.location.href = `/pattern?name=${encodeURIComponent(name)}`;
  }

  renderHeader() {
    return (<div className="page-pattern-projects-title">
      <div className="layer">
        <div className="page-pattern-projects-title-box">
          <div>星级榜样</div>
        </div>
      </div>
    </div>);
  }
  onMouseEnter(id) {
    this[`ref${id}`].style.opacity = 0.9;
  }
  onMouseOut(id) {
    this[`ref${id}`].style.opacity = 0;
  }
  onCancel() {
    this.setState({
      visible: false,
    });
  }
  onOpenModal(data) {
    this.setState({
      visible: true,
      modalData: data,
    });
  }
  renderContent(data) {
    return (<div className="page-pattern-content-line" key={data.id} onMouseEnter={() => { this.onMouseEnter(data.id); }} onMouseOut={() => { this.onMouseOut(data.id); }}>
      {/* <div className="page-pattern-content-line-avatar" /> */}
      <Avatar src={data.avatars} defaultSrc="/images/default_avatar.png" size={{ width: 76, height: 76 }} style={{ width: '76px', height: '76px' }} />
      <div className="page-pattern-content-line-detail">
        <p className="page-pattern-content-line-detail-title">{data.name}</p>
        <p className="page-pattern-content-line-detail-default">政治面貌：{data.political_affiliation}</p>
        <p className="page-pattern-content-line-detail-default" style={{ marginBottom: '20px' }}>单位名称：{data.workplace}</p>
        {/* <div dangerouslySetInnerHTML={{ __html: data.description }} /> */}
      </div>
      <div className="mode" ref={(tag) => { this[`ref${data.id}`] = tag; }} onMouseOver={() => { this.onMouseEnter(data.id); }}>
        <div className="mode-btn" onClick={() => { this.onOpenModal(data); }} >了解更多</div>
      </div>
    </div>);
  }

  render() {
    const { patternList: { data } } = this.props;
    const { visible, modalData } = this.state;
    return (<div className="page-pattern">
      {this.renderHeader()}
      <div className="page-pattern-box">
        <div className="layer">
          <div className="page-pattern-content">
            {
              data && data.list && data.list.map((item, index) => (this.renderContent(item, index)))
            }
          </div>
        </div>
      </div>
      <Modal
        centered
        closeIcon={<i className="modal-close-icon" />}
        destroyOnClose
        footer={null}
        visible={visible}
        onCancel={this.onCancel}
      >
        <div className="page-pattern-content-modal">
          <Avatar src={modalData.avatars} defaultSrc="/images/default_avatar.png" size={{ width: 76, height: 76 }} style={{ width: '76px', height: '76px' }} />
          <div className="page-pattern-content-line-detail">
            <p className="page-pattern-content-line-detail-title">{modalData.name}</p>
            <p className="page-pattern-content-line-detail-default">政治面貌：{modalData.political_affiliation}</p>
            <p className="page-pattern-content-line-detail-default" style={{ marginBottom: '20px' }}>单位名称：{modalData.workplace}</p>
          </div>
          <div className="line1px" />
          {/* <div dangerouslySetInnerHTML={{ __html: data.description }} /> */}
        </div>
      </Modal>
    </div>);
  }
}

NewsPage.propTypes = {
  requestPatternList: PropTypes.func,
  patternList: PropTypes.shape({}),
};

export default connect(
  state => ({
    patternList: state.pattern.patternList,
  }), dispatch => bindActionCreators({ requestPatternList }, dispatch),
)(NewsPage);
