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
  [mutationTypes.ADD_TO_CART] (state, product) {
    return state.cart.push(product);
  },
  [mutationTypes.REMOVE_FROM_CART] (state, product) {
    const index = state.cart.findIndex(p => p._id === product);
    state.cart.splice(index, 1);
    console.log(state.cart, state.cart.length, index);
  },
};


export default {
  namespaced: true,
  state,
  mutationTypes,
  mutations,
};
