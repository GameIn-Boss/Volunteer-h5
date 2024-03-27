/* eslint  "no-nested-ternary":"off" */
import React, { PropTypes } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import queryString from 'query-string';
import './list.css';
import Link from '../../../components/link/link';
import Filter from '../component/filter/filter';
import Wuqing from '../../../components/wuqing/wuqing';
import { isWindowReachBottom } from '../../../utils/funcs';
import { getAreaCity } from '../../home/home.store';
import {
  requestTeamList,
} from './list.store';
import { translate } from 'react-i18next';
import i18next from 'i18next';

class TeamListPage extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);

    this.state = {
      isFilterShow: false,
      countyNames: [],
    };

    const params = queryString.parse(location.search);

    this.selectedOption = {
      county_id: '',
      service_object: '',
      team_type: '',
    };
  }

  componentWillMount() {
    let { type, category, target } = this.props.route.params;
    type = parseInt(type, 10);
    category = parseInt(category, 10);
    target = parseInt(target, 10);

    this.selectedOption = {
      team_type: window.teamCategory[type],
      county_id: '',
      service_object: window.serviceTarget[category],
    };
    this.requestList(false);

    // getCity(
    //   (city, str) => {
        
    //     this.props.getAreaCity(city);
    //   },
    //   () => {
    //     Alert.error("定位失败，请确认同意定位授权");
    //   }
    // );
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps(nextprops) {
    const { area: Larea } = this.props;
    const { area: Narea } = nextprops;
    const countyNames = [];
    const countyId = [];
    if (Narea.data) {
      for (const i in Narea.data.list) {
        countyNames.push(Narea.data.list[i].name);
        countyId.push(Narea.data.list[i].id);
      }
      this.setState({
        countyNames,
        countyId,
      });
    }

    let { type, category, target } = this.props.route.params;
    const { type: ntype, category: ncategory, target: ntarget } = nextprops.route.params;

    if ((type === ntype) &&
        (category === ncategory) &&
        (target === ntarget)) {
      return;
    }

    type = parseInt(ntype, 10);
    category = parseInt(ncategory, 10);
    target = parseInt(ntarget, 10);
    const countyIdArr = this.state.countyId;
    this.selectedOption = {
      team_type: window.teamCategory[type],
      service_object: window.serviceTarget[category],
      county_id: countyIdArr[target],

    };
    this.requestList(false);
  }


  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  onFilterChange(selectedOption) {
    const { type, category, target } = selectedOption;
    // history.push(`/team/list/type/${type}/category/${category}/target/${target}`);
    window.location.href = `/team/list/type/${type}/category/${category}/target/${target}`;
  }

  onFilterShow() {
    this.setState({
      ...this.state,
      isFilterShow: true,
    });
  }

  onFilterHide() {
    this.setState({
      ...this.state,
      isFilterShow: false,
    });
  }
  handleScroll() {
    if (isWindowReachBottom(80)) {
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
      ...this.selectedOption,
      current_page: more ? listData.page.current_page + 1 : 1,
      more,
    });
  }

  render() {
    const { list: { data: listData }, t } = this.props;
    const { area: { data: areaData } } = this.props;

    const showLoadingMore = listData &&
        listData.page && (listData.page.current_page < listData.page.total_page);
    let { type, category, target } = this.props.route.params;


    type = parseInt(type, 10);
    category = parseInt(category, 10);
    target = parseInt(target, 10);
    return (
      <div className="page-team-list">
   
        {window.orgCode === 'yJrb2kKdWL' ?
          <div className="sybody">
          <div className="team-list">
            <Wuqing teams={listData ? listData.list : null} />
          </div>
          {
            showLoadingMore
            ?
              <div className="component-loading-more">
                <img src="/images/icon_loading.png" alt="loading" />
                {t('正在加载')}
            </div>
            : null
          }
          <div className="takeup" />
        </div>
        :
      <div className="body">
      <div className="team-list">
        <Wuqing teams={listData ? listData.list : null} />
      </div>
      {
        showLoadingMore
        ?
          <div className="component-loading-more">
            <img src="/images/icon_loading.png" alt="loading" />
            {t('正在加载')}
        </div>
        : null
      }
      <div className="takeup" />
    </div>
    }
       
        {window.orgCode === 'yJrb2kKdWL' ? 
        <div className="tabs-container">
          <div className="line1px" />
          <ul className="tabs">
            <li>
              <Link to="/">
                <div
                  className={classnames({
                    'tab-icon': true,
                    'tab-icon-home-sanyi': true,
                  })}
                />
                <span>{t('首页')}</span>
              </Link>
            </li>
            <li>
              <Link to="/sign">
                <div
                  className={classnames({
                    'tab-icon': true,
                    'tab-icon-sign-sanyi': true,
                  })}
                />
                <span>{t('活动打卡')}</span>
              </Link>
            </li>
            <li>
              <Link to="/my">
                <div
                  className={classnames({
                    'tab-icon': true,
                    'tab-icon-me-sanyi': true,
                  })}
                />
                <span>{t('个人中心')}</span>
              </Link>
            </li>
          </ul>
        </div>
        :
        <div className="tabs-container">
        <div className="line1px" />
        <ul className="tabs">
          <li>
            <Link to="/">
              <div
                className={classnames({
                  'tab-icon': true,
                  'tab-icon-home': true,
                })}
              />
              <span>{t('首页')}</span>
            </Link>
          </li>
          <li>
            <Link to="/sign">
              <div
                className={classnames({
                  'tab-icon': true,
                  'tab-icon-sign': true,
                })}
              />
              <span>{t('签到打卡')}</span>
            </Link>
          </li>
          <li>
            <Link to="/my">
              <div
                className={classnames({
                  'tab-icon': true,
                  'tab-icon-me': true,
                })}
              />
              <span>{t('个人中心')}</span>
            </Link>
          </li>
        </ul>
      </div>
                }

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

TeamListPage.title = '文明银行';

export default connect(
  state => ({
    list: state.team.list,
    user: state.user,
    getAreaCity: PropTypes.func,
    area: state.home.getAreaCity,
  }),
  dispatch => bindActionCreators({
    requestTeamList, getAreaCity,
  }, dispatch),
)(translate('translations')(TeamListPage));