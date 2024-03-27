/* global wx:false */
import React, { PropTypes } from "react";
import autoBind from "react-autobind";
import Alert from "react-s-alert";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { connect } from "react-redux";
import classnames from "classnames";
import { bindActionCreators } from "redux";
import WXShare from "../../../components/share";
import "./detail.css";

import Link from "../../../components/link/link";
import Tab from "../../../components/tab/tab";
import Projects from "../../../components/projects/projects";
import Image from "../../../components/image/image";
import Avatar from "../../../components/avatar/avatar";
import Star from "../../../components/star/star";
import ShareTip from "../../../components/sharetip/sharetip";
import CommunityItem from "../../../components/community_item/index";
import { dateTextToDateText } from "../../../utils/funcs";
import { storeLoginSource } from "../../my/login/login.store";
import ModalNew from "../../../components/posterModal/ModalNew";
import { PostDataModel_Team } from "../../../components/posterModal/PostDataModel";
import history from "../../history";
import DemandItem from "../../../components/demand_item/index";
import ShopItem from "../../../components/shopItme/index";

import { Dialog, ActionSheet } from "react-weui";
import "weui/dist/style/weui.css";
import "react-weui/build/packages/react-weui.css";
import { translate } from 'react-i18next';
import i18next from 'i18next';

import {
  requestTeamDetail,
  requestTeamProjectList,
  requestTeamDemandList,
  requestGoodsList,
  collectTeam,
  unCollectTeam,
  joinTeam,
  quitTeam,
  saveTeamTabIndex
} from "./detail.store";
import { requestUserInfo } from "../../../stores/common";
import {
  feelingAction,
  observeAction,
  unObserveAction,
  deleteFeelingAction
} from "../../my/circle/circle.store";
import { userCenterAction } from "../../my/my.store";

class TeamDetailPage extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    const { t } = props;
    this.state = {
      showShareTip: false,
      dialogType: true,
      showDialog: false,
      actionSheet: false,
      menus: [],
      actions: [
        {
          label: t('取消'),
          onClick: this.hide
        }
      ]
    };
    this.slickSettings = {
      dots: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 6000
    };

    this.teamId = props.route.params.teamId;

    this.dialog = {
      title: `${this.state.dialogType ? t('提示') : t('登录提示')}`,
      buttons: [
        {
          type: "default",
          label: t('取消'),
          onClick: () => this.setState({ ...this.state, showDialog: false })
        },
        {
          type: "primary",
          label: t('确认'),
          onClick: () => {
            if (this.state.dialogType) {
              this.setState({ ...this.state, showDialog: false });
              this.props.quitTeam(this.teamId);
            } else {
              this.setState({ ...this.state, showDialog: false });
              this.props.storeLoginSource(`/project/detail/${this.projectId}`);
              this.props.userCenterAction();
            }
          }
        }
      ]
    };
  }

  componentWillMount() {
    const { t } = this.props;
    if (window.userAgent) {
      this.setState({
        ...this.state,
        menus: [
          {
            label: t('转发给好友'),
            onClick: () => {
              this.setState(
                {
                  actionSheet: false
                },
                () => {
                  this.handleShareClick();
                }
              );
            }
          },
          {
            label: t('分享到朋友圈'),
            onClick: () => {
              this.setState(
                {
                  actionSheet: false
                },
                () => {
                  this.handleShareClick();
                }
              );
            }
          },
          {
            label: t('保存海报'),
            onClick: () => {
              this.setState(
                {
                  actionSheet: false,
                  visible: true
                },
                () => {
                  // this.showModal();
                }
              );
            }
          }
        ]
      });
    } else {
      this.setState({
        ...this.state,
        menus: [
          {
            label: t('保存海报'),
            onClick: () => {
              console.log(1222);
              this.setState(
                {
                  actionSheet: false,
                  visible: true
                },
                () => {
                  console.log(this.state.visible);
                  // this.showModal();
                }
              );
            }
          }
        ]
      });
    }

    const {
      detail: { team: detailData, tabTeamIndex, lastTeamId },
      user
    } = this.props;
    // if (user.isLogin) {
    //   this.props.requestUserInfo();
    // }

    this.props.requestTeamDetail(this.teamId);
    this.props.requestTeamProjectList(this.teamId);
    this.props.requestTeamDemandList(this.teamId);
    this.props.requestGoodsList(this.teamId);
    
    if (lastTeamId === 0) {
      this.props.saveTeamTabIndex(0, this.teamId);
    } else if (lastTeamId !== this.teamId) {
      this.props.saveTeamTabIndex(0, this.teamId);
    } else if (lastTeamId === this.teamId) {
      this.props.saveTeamTabIndex(tabTeamIndex, this.teamId);
    }

    this.props.feelingAction({
      type: 3,
      relation_id: this.teamId,
      page_size: 1000
    });
  }

  componentDidMount() { }

  componentWillReceiveProps(nextProps) {
    const newTeamId = nextProps.route.params.teamId;

    if (newTeamId !== this.teamId) {
      this.teamId = newTeamId;
      this.props.requestTeamDetail(this.teamId);
      this.props.requestTeamProjectList(this.teamId);
      this.props.requestTeamDemandList(this.teamId);
      this.props.requestGoodsList(this.teamId);
    }

    const detailData = nextProps.detail.team;

    if (
      detailData &&
      detailData.id === parseInt(this.teamId, 10) &&
      !this.wxRegistered
    ) {
      document.title = detailData.name;
      if (window.userAgent) {
        wx.ready(() => {
          WXShare({
            title: detailData.name,
            desc: detailData.abstract,
            image: detailData.logo,
            success: () => this.hideShareTip()
          });
        });
      }
      this.wxRegistered = true;
    }
    const { deleteFeeling: LdeleteFeeling } = this.props;
    const { deleteFeeling: NdeleteFeeling } = nextProps;
    if (
      LdeleteFeeling.fetching &&
      !NdeleteFeeling.fetching &&
      !NdeleteFeeling.failed
    ) {
      window.location.replace(`/team/detail/${this.teamId}`);
      // history.replace(`/team/detail/${this.teamId}`);
    }

    const { observe: Lobserve, unObserve: LunObserve } = this.props;
    const { observe: Nobserve, unObserve: NunObserve } = nextProps;
    if (Lobserve.fetching && !Nobserve.fetching && !Nobserve.failed) {
      this.props.feelingAction({
        type: 3,
        relation_id: this.teamId,
        page_size: 1000
      });
    }
    if (LunObserve.fetching && !NunObserve.fetching && !NunObserve.failed) {
      this.props.feelingAction({
        type: 3,
        relation_id: this.teamId,
        page_size: 1000
      });
    }
  }

  componentWillUnmount() { }

  onTabChange(idx) {
    this.props.saveTeamTabIndex(idx);
  }
  handleActionClick(action) {
    const { teamId } = this;
    const { detail: { team: detailData }, user, t } = this.props;
    const realRegister = window.orgInfo.real_name_register;
    // in_blacklist 黑名单 0不在，1在
    // realRegister 机构实名 1 要求  0 否
    return () => {
      if (!user.isLogin) {
        if (action === 'join') {
          this.props.joinTeam(teamId, detailData);
        } else if (action === 'quit') {
          this.setState({ ...this.state, showDialog: true });
        }
      } else if (user.isLogin && !user.in_blacklist) {
        // 不要求实名
        if (realRegister == 0) {
          if (action === 'join') {
            this.props.joinTeam(teamId, detailData);
          } else if (action === 'quit') {
            this.setState({ ...this.state, showDialog: true });
          }
          // 要求实名切用户未实名过，通过ID判断
        } else if (realRegister == 1 && user.isLogin) {
          // 验证自定义信息必填
          const custom_config = window.orgInfo.custom_config;
          let isVerify = false;
          if (custom_config.open_id_number && !user.id_number.length) {
            isVerify = true;
          }
          if (custom_config.open_real_name && !user.real_name.length) {
            isVerify = true;
          }
          if (custom_config.open_nation && !user.nation.length) {
            isVerify = true;
          }
          if (custom_config.open_avatars && !user.avatars.length) {
            isVerify = true;
          }
          let is_has_required = false;
          custom_config.extends && custom_config.extends.length && custom_config.extends.forEach(item => {
            if (item.is_required) {
              is_has_required = true;
            }
          })
          if (is_has_required && !user.extends) {
            isVerify = true;
          }
          if (user.extends && is_has_required) {
            custom_config.extends.forEach(item => {
              if (item.is_required && (!user.extends[item.key] || (user.extends[item.key] && !user.extends[item.key].length))) {
                isVerify = true;
              }
            })
          }
          this.props.storeLoginSource(`/project/detail/${this.teamId}`)
          if (isVerify && user.have_pwd == 1) {
            let bindlink = '/my/profile/bind_profile/alert';
            if (window.orgCode === 'oBDbDkxal2') {
              bindlink = '/my/profile/bind_profile_starbucks/alert';
            }
            if (window.orgCode === 'mWZdPNwaKg') {
              bindlink = '/my/profile/bind_profile_BMW/alert';
            }
            window.location.replace(bindlink);
          } else if (isVerify) {
            let bindlink = `/my/profile/verify?target=${target}`;
            if (window.orgCode === 'oBDbDkxal2') {
              bindlink = `/my/profile/verifyStarbucks?target=${target}`;
            }
            if (window.orgCode === 'mWZdPNwaKg') {
              bindlink = `/my/profile/verifyBMW?target=${target}`;
            }
            window.location.replace(bindlink);
          } else {
            if (action === 'join') {
              this.props.joinTeam(teamId, detailData);
            } else if (action === 'quit') {
              this.setState({ ...this.state, showDialog: true });
            }
          }
        }
      } else if (user.isLogin && user.in_blacklist) {
        Alert.warning(t('您已被添加到黑名单，请联系客服'));
      }
    };
  }

  handleFavoriteClick() {
    const {
      detail: { team: detailData }
    } = this.props;

    if (detailData.collection_status) {
      this.props.unCollectTeam(detailData.id);
    } else {
      this.props.collectTeam(detailData.id);
    }
  }

  hideShareTip() {
    this.setState({
      ...this.state,
      showShareTip: false
    });
  }

  handleShareClick() {
    // eslint-disable-line
    this.setState({
      ...this.state,
      showShareTip: true
    });
  }

  renderSlick() {
    const {
      detail: { team: detailData }
    } = this.props;
    if (!detailData || !detailData.team_photo) {
      return (
        <Image
          className="team-photo"
          src={detailData.logo}
          alt="团队图片"
          defaultSrc={detailData.team_photo}
        />
      );
    }

    return (
      <div className="slick-container">
        {detailData.team_photo && detailData.team_photo.length ? (
          <Slick {...this.slickSettings}>
            {detailData.team_photo.map(item => (
              <Image
                src={item}
                className="team-photo"
                resize={{ width: 1500 }}
              />
            ))}
          </Slick>
        ) : null}
      </div>
    );
  }
  hide() {
    this.setState({ actionSheet: false });
  }
  renderBasic() {
    const {
      detail: { team: detailData },
      user: { isLogin },
      t,
    } = this.props;
    // join_status: [integer] -1未提交 0审核中 1通过 2驳回, 详情页下发，登陆后如加入团队才有此字段
    const joined = isLogin && detailData.join_status === 1;
    const auditing = isLogin && detailData.join_status === 0;
    let actionLabel = "";
    let actionClassName = "";
    let action = "";

    if (!joined && !auditing) {
      actionLabel = t('我要加入');
      actionClassName = "team-action-available";
      action = "join";
    } else if (joined) {
      actionLabel = t('我要退出');
      actionClassName = "team-action-quit";
      action = "quit";
    } else if (auditing) {
      actionLabel = t('等待审核');
      actionClassName = "team-action-auditing";
      action = "";
    }

    let reward_sum = detailData.reward_sum;
    if (detailData.jinyun_state) {
      reward_sum = detailData.jinyun_timeSum / 3600.0;
    }

    let team_size = detailData.team_size;
    if (detailData.jinyun_state) {
      team_size = detailData.jinyun_userSum || 0;
    }

    return (
      <div>
      
        <div className="header">
          {this.renderSlick()}
          {!detailData.stars ? (
            <div className="header-addition">
              <div className="team-info">
                <Avatar src={detailData.logo} size={{ width: 30, radius: 4 }} />
                <span>{detailData.name}</span>
              </div>
            </div>         

          ) : (
              <div className="header-addition-new">
                <div className="team-info">
                  <Avatar src={detailData.logo} size={{ width: 30, radius: 4 }} />
                  <div className="header-addition-new-container">
                    <div className="header-addition-new-container-title">
                      <span>{detailData.name}</span>
                    </div>
                    <div className="header-addition-new-container-star">
                      <Star
                        size={{ width: 15, height: 14, score: detailData.stars }}
                        isBlockEmptyStar
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    );
  }
  publicDemand(data) {
    if(!data || !data.data || !data.data.list || !data.data.list.length) {
      return(<div className="demand-list-all-none">
        暂无信息
      </div>)
    }
    const publicDemand = data.data.list;
    return(<div>
      {
        
        publicDemand.length && publicDemand.map((item, index)=>(<DemandItem data={item} key={index} />))
      }
    </div>)
  }
  renderItem() {
    const { goods: { data: listData } } = this.props;
    console.log(listData)
    return (
      <ShopItem data={listData && listData.list || null} />
    )
  }
  renderDemand(teamname) {
    const { demand: {  allDemandList} } = this.props;

    const showLoadingMore = allDemandList.data && (allDemandList.data.current_page < allDemandList.data.last_page)
    const windowHeight = document.documentElement.clientHeight;
    return(
    <div className="demand" style={{minHeight: `${windowHeight}px`}}>
         <Link to={`/demand/sponsor/${teamname}`} className="demand-sponsor">
        <Image src="/images/demand/set_up.png" resize={{width: 98, height: 98}} style={{width: '98px', height: '98px'}}/>
      </Link>
  {this.publicDemand(allDemandList) }
      {
        showLoadingMore
          ?
          <div className="component-loading-more">
            <img src="/images/icon_loading.png" alt="loading" />
            正在加载
          </div>
          : null
      }
    </div>)
  }
  renderProjects() {
    const {
      detail: { projects },
      t,
    } = this.props;

    return (
      <div className="page-team-detail-render-project-container">
        <div className="page-team-detail-render-project-container-main">
          <Projects projects={projects ? projects.list : null} />
          <div className="takeup" />
        </div>

      </div>
    );
  }

  onPublish() {
    const {
      user: { isLogin }
    } = this.props;
    if (isLogin) {
      window.location.replace(`/my/circlepublish/3/${this.teamId}`);
    } else {
      this.setState({ ...this.state, dialogType: false, showDialog: true });
    }
  }

  delete(id) {
    this.props.deleteFeelingAction(id);
  }

  onParse(id) {
    this.props.observeAction(id);
  }

  unOnParse(id) {
    this.props.unObserveAction(id);
  }

  renderCommunity() {
    const { t } = this.props;
    return (
      <div>
        {this.props.feeling.data &&
          this.props.feeling.data.list &&
          this.props.feeling.data.list.length > 0 &&
          this.props.feeling.type == "team" ? (
            this.props.feeling.data.list.map(listData => (
              <CommunityItem
                data={listData}
                isDetailEntry={false}
                key={listData.id}
                routeData={this.props.route}
                isDescTrigger={false}
                onDeleteClick={this.delete}
                onParseClick={this.onParse}
                onUnParseClick={this.unOnParse}
              />
            ))
          ) : (
            <div className="page-circle-rendercommunity-no-info-container">
              <img
                src="/images/my/information.png"
                className="page-circle-rendercommunity-img"
              />
              <div className="page-circle-rendercommunity-info">
                {t('还没有动态信息')}
              </div>
            </div>
          )}

        <div
          className="page-team-detail-community-link"
          onClick={this.onPublish}
        />
      </div>
    );
  }
  showModal() {
    this.setState({
      ...this.state,
      visible: true
    });
  }
  closeModal() {
    this.setState({
      ...this.state,
      visible: false
    });
  }
  renderModal() {
    const {
      detail: { team: detailData },
      user
    } = this.props;

    const postData = PostDataModel_Team(detailData, user);
    return (
      <ModalNew
        postData={postData}
        visible={this.state.visible}
        maskCloseable={this.closeModal}
      />
    );
  }
  render() {
    const {
      detail: { team: detailData, tabTeamIndex },
      t,
    } = this.props;
    const currentTeamId = parseInt(this.teamId, 10);
    const dataTeamId = detailData ? detailData.id : "";

    if (currentTeamId !== dataTeamId) {
      return null;
    }

    return (
      <div className="page-team-detail">
                      {this.renderBasic()}
                      <div className="line1px" />
                     
                     { this.teamId == 11975 ?
        <Tab
          tabs={[
            {
              label: t("志愿活动"),
              component: this.renderProjects()
            },
            {
              label: t("积分商城"),
              component: this.renderItem()
            },
            {
              
              label: t("电力服务"),
              component: this.renderDemand(detailData.id)
            }
          ]}
          onChange={this.onTabChange}
          selectedIndex={tabTeamIndex}
        /> 
        :
        <Tab
        tabs={[
          {
            label: t("志愿活动"),
            component: this.renderProjects()
          },
          {
            label: t("积分商城"),
            component: this.renderItem()
          },
          {
            
            label: t("微心愿"),
            component: this.renderDemand(detailData.id)
          }
        ]}
        onChange={this.onTabChange}
        selectedIndex={tabTeamIndex}
      /> 
      }
        <ActionSheet
          menus={this.state.menus}
          actions={this.state.actions}
          show={this.state.actionSheet}
          type="ios"
          onRequestClose={e => this.setState({ actionSheet: false })}
        />
   
        {this.state.showShareTip ? (
          <ShareTip onClick={this.hideShareTip} />
        ) : null}
        {this.renderModal()}
      </div>
    );
  }
}

TeamDetailPage.propTypes = {
  requestTeamDetail: PropTypes.func,
  requestTeamProjectList: PropTypes.func,
  requestTeamDemandList: PropTypes.func,
  requestUserInfo: PropTypes.func,
  collectTeam: PropTypes.func,
  unCollectTeam: PropTypes.func,
  joinTeam: PropTypes.func,
  quitTeam: PropTypes.func,
  requestGoodsList: PropTypes.func,
  saveTeamTabIndex: PropTypes.func,
  detail: PropTypes.shape({
    fetchingId: PropTypes.string,
    tabTeamIndex: PropTypes.number,
    team: PropTypes.shape({}),
    projects: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.shape({})),
      page: PropTypes.shape({
        current_page: PropTypes.number,
        total_page: PropTypes.number
      })
    }),
    demand: PropTypes.shape({
      list: PropTypes.arrayOf(PropTypes.shape({})),
      page: PropTypes.shape({
        current_page: PropTypes.number,
        total_page: PropTypes.number
      })
    })
  }),
  user: PropTypes.shape({
    isLogin: PropTypes.bool
  }),
  route: PropTypes.shape({
    params: PropTypes.shape({
      teamId: PropTypes.string
    })
  })
};

TeamDetailPage.title = i18next.t("文明银行");

export default connect(
  state => ({
    detail: state.team.detail,
    user: state.user,
    feeling: state.circle.feeling,
    observe: state.circle.observe,
    unObserve: state.circle.unObserve,
    deleteFeeling: state.circle.deleteFeeling,
    demand: state.demand,   
    goods: state.shop.goodsList,


  }),
  dispatch =>
    bindActionCreators(
      {
        requestUserInfo,
        requestTeamDetail,
        requestTeamProjectList,
        requestTeamDemandList,
        collectTeam,
        unCollectTeam,
        joinTeam,
        quitTeam,
        saveTeamTabIndex,
        feelingAction,
        observeAction,
        unObserveAction,
        userCenterAction,
        deleteFeelingAction,
        storeLoginSource,
        requestGoodsList,

      },
      dispatch
    )
)(translate('translations')(TeamDetailPage));