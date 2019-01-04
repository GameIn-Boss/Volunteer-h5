import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import Slick from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Alert from 'react-s-alert';
import './home.css';
import Link from '../../components/link/link';
import Image from '../../components/image/image';
import Avatar from '../../components/avatar/avatar';
import Projects from '../../components/projects/projects';
import Menus from '../../components/menus/menus';
import Announcement from '../../components/announcement/announcement';
import { getCity } from '../../utils/funcs';
import { requestHomeData, saveCity, getAreaCity } from './home.store';
import { announceAction } from '../announce/announce.store';
class HomePage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
    this.play = this.play.bind(this);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.slickSettings = {
      dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 6000,
    };
  }

  componentWillMount() {
    this.props.requestHomeData();
    if (localStorage.getItem('provinceAndCityName') != null) {
      this.props.requestHomeData();
      this.props.saveCity(JSON.parse(localStorage.getItem('provinceAndCityName')).city.replace('市', ''));
    
    } else {

      getCity((city) => {
        this.setState({
          ...this.state,
          city,
        });
        this.props.requestHomeData();
        this.props.saveCity(city);
        this.props.getAreaCity(city);
      }, () => {
        Alert.error('定位失败，请确认同意定位授权');
        alert('定位失败，请确认同意定位授权')
        this.props.requestHomeData();
      });
    }
  
  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() { }
  componentDidMount() {
  }
  renderHeaderBar() {
    return (<div className="header-bar">
      <Link className="component-search-bar" to="/homesearch">
        <input className="input" placeholder="搜索项目/机构" disabled="disabled" />
      </Link>
    </div>);
  }
  play() {
    this.slider.slickPlay();
  }

  next() {
    this.slider.slickNext();
  }

  previous() {
    this.slider.slickPrev();
  }
  renderAnnounceComponent() {
    const { home, user } = this.props;
    if (!home.data || home.data.news.length ==0) {
      return null
    }
    console.log(home)
    return (
        <div className="notice">
            <Announcement data={home.data.news} entry="/announce" /> 
        </div>
    )
  }
  renderSlick() {
    const { home } = this.props;
    const orgCode = window.platformCode;
    if (!home.data || !home.data.banner) {
      return <div className="slick-container slick-container-empty" />;
    }
    return (<div className="slick-container">
      {home.data.banner && home.data.banner.length ?
        <Slick {...this.slickSettings}>
          {home.data.banner
            .map((item) => {
              let url = '';
              const mode = item.jump_mode;

              if (mode === 1) {
                // if (!user.isLogin) {
                //   url = '/my/entry';
                // }else{
                // 第三方
                url = item.href;


              }
              //  else if (mode === 2) {
              //   // 项目
              //   url = `/project/detail/${item.jump_id}`;
              // } else if (mode === 3) {
              //   // 团队
              //   url = `/team/detail/${item.jump_id}`;
              // }

              return (<Link key={item.id} to={url}>
                <Image src={item.photo} className="image" resize={{ width: 1500 }} />
              </Link>);
            })}
        </Slick> : null
      }
    </div>);
  }


  render() {
    const { home } = this.props;
    if (!home.data) {
      return null;
    }
    return (
      <div className="page-home">
        <div className="page-home-header">
          {this.renderHeaderBar()}
          {this.renderSlick()}
          {this.renderAnnounceComponent()}
        </div>
        <div className="page-home-body">
          {window.platformInfo ? <Menus menus={window.platformInfo.module_settings} /> : null}
          <div className="project-list">
            <div className="list-header">
              <div className="main-label">
                <div className="label-line" />
                <span>{home.data && home.data.sanlitun ? '联盟活动' : '精品活动'}</span>
                <div className="label-line" />
              </div>
              <div className="sub-label">Awesome Activity</div>
            </div>
            <div className="line1px" />
            <Projects projects={(home.data && home.data.project) || []} />
          </div>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  requestHomeData: PropTypes.func,
  saveCity: PropTypes.func,
  home: PropTypes.shape({
    data: PropTypes.shape({
      banner: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        photo: PropTypes.string,
        jump_mode: PropTypes.number,
        jump_id: PropTypes.number,
      })),
      project: PropTypes.arrayOf(PropTypes.shape({})),
      sanlitun: PropTypes.number,
    }), 
    city: PropTypes.string,
    announceAction: PropTypes.func,
  }),
};

export default connect(
  state => ({
    //store根节点
    home: state.home.home,
    area: state.home.getAreaCity,
  }),
  //
  dispatch => bindActionCreators({ requestHomeData, saveCity, getAreaCity,announceAction }, dispatch),
)(HomePage);
