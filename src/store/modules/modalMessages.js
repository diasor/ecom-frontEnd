const state = {
  cart: [],
};

// mutations types
const mutationTypes = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
};

// Cart mutations
const mutations = {
  [mutationTypes.ADD_TO_CART] (state, payload) {
    return state.cart.push(payload);
  },
  [mutationTypes.REMOVE_FROM_CART] (state, payload) {
    const index = state.cart.findIndex(p => p._id === payload);
    state.cart.splice(index, 1);
    console.log(state.cart, state.cart.length, index);
  },
};

// Products' getters
const getters = {
  // cart
  cart: state => state.cart,
};

export default {
  namespaced: true,
  state,
  mutationTypes,
  getters,
  mutations,
};
