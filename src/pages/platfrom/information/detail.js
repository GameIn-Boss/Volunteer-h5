import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './detail.css';

import history from '../../history';

import {
  requestSearch,
} from './index.store';
class TeamSearchPage extends React.Component {

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

  componentWillUnmount() {
  }

 
  render() {

    return (
      <div className="page-platfrom-information-detail">
            111
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
