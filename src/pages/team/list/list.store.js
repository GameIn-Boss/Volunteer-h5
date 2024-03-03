import fetch from '../../../utils/fetch';

export const requestTeamList = data => ({
  type: 'TEAM_LIST',
  meta: {
    more: data.more,
  },
  payload: fetch('/team', { method: 'GET', data, loading: !data.more }),
});

export const requestSubTeamList = data => ({
  type: 'SUB_TEAM_LIST',
  meta: {
    ...data,
  },
  payload: fetch('/team/below', { method: 'GET', data, loading: !data.more }),
});


export default (state = {
  fetching: false,
  failed: false,
  data: null,
}, action) => {
  let data;
  const { more } = action.meta || {};
  const { data: payloadData } = action.payload || {};

  switch (action.type) {
    //todo:  SUB_TEAM_LIST_PENDING   SUB_TEAM_LIST_FULFILLED  SUB_TEAM_LIST__REJECTED' 找到fech 的 teamid, 补全 subTeams
    case 'SUB_TEAM_LIST_PENDING': {
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    }
    case 'SUB_TEAM_LIST_FULFILLED': {
      console.info(state, action, payloadData);
      console.info(state.data.list, action.meta.id, payloadData.list);

      function processTeam(team, id, list) {
        console.info(`判断了id = ${id}, 当前team 的 id 为 ${team.id}`, team)
        if (id === team.id) {
          console.info(`id是 ${id} ，已经更新了subTeams`)
          return {
            ...team,
            subTeams: list
          };
        }

        if (team.subteams) {
          return {
            ...team,
            subteams: team.subteams.map(subteam => processTeam(subteam, id, list))
          };
        }

        return team;
      }

      const updatedList = state.data.list.map(subteam => processTeam(subteam, action.meta.id, payloadData.list));

      console.info(updatedList);
      return {
        ...state,
        data: {
          ...state.data,
          list: updatedList,
        },
        fetching: false,
        failed: false,
      };
    }
    case 'SUB_TEAM_LIST__REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    case 'TEAM_LIST_PENDING':
      return {
        ...state,
        fetching: true,
        failed: false,
      };
    case 'TEAM_LIST_FULFILLED':
      if (!more || !state.data) {
        data = payloadData;
      } else {
        data = {
          list: state.data.list.concat(payloadData.list),
          page: payloadData.page,
        };
      }

      return {
        ...state,
        fetching: false,
        failed: false,
        data,
      };
    case 'TEAM_LIST_REJECTED':
      return {
        ...state,
        failed: true,
        fetching: false,
      };
    default:
      return state;
  }
};

