const state = {
  user: {},
};

// User's mutations types
const mutationTypes = {
  LOGIN_USER: 'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT_USER',
};

// User's mutations
const mutations = {
  [mutationTypes.LOGIN_USER] (state, payload) {
    state.user = {
      nickname: payload.nickname,
      name: payload.name,
    };
  },
  [mutationTypes.LOGOUT_USER] (state) {
    state.user = {};
  },
};

// User's getters
const getters = {
  user: state => state.user,
};

export default {
  namespaced: true,
  state,
  mutationTypes,
  mutations,
  getters,
};
