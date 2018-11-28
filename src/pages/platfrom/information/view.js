import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';

import './view.css';
import history from '../../history';




class TeamSearchPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {
    let dataUrlObj =JSON.parse(`${localStorage.getItem('dataUrlObj')}`);
    this.setState({
      dataUrlObj,
    })
  }

  componentDidMount() {
  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {
  }
  
  back=()=>{

    window.history.go(-1);
  }
  render() {
   
    return (
      <div className="page-platfrom-view-container">
        <div className="page-platfrom-view-top-container">
            <img style={{width:'70%',margin:'0 auto',display:"block"}} src={`${this.state.dataUrlObj.dataUrl}`} />
        </div>
        <div className='page-platfrom-view-bottom-container'>
            <div className="page-platfrom-view-bottom-container-item" onClick={this.back}>返回</div>
            <div className="page-platfrom-view-bottom-container-item" >长按保存<img src={this.state.dataUrlObj.dataUrl} />
            </div>
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

TeamSearchPage.title = '预览图片';

export default TeamSearchPage;
