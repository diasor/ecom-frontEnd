import { isEmpty } from 'lodash';
import cartStateApi from '../api/cartStateApi';

const state = {
  showLoader: false,
  cart: [],
};

// mutations types
const mutationTypes = {
  GET_CART: 'GET_CART',
  GET_CART_SUCCESS: 'GET_CART_SUCCESS',
  ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
  ADD_ITEM_TO_CART_SUCCESS: 'ADD_ITEM_TO_CART_SUCCESS',
  REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART',
  REMOVE_ITEM_FROM_CART_SUCCESS: 'REMOVE_ITEM_FROM_CART_SUCCESS',
};

// Cart's actions
const actions = {
  // get all products from the shopping cart
  getCart ({ commit }, getFullCart) {
    commit(mutationTypes.GET_CART);
    // fecth actual cart from the API
    return cartStateApi.getCart(getFullCart)
      .then(response => {
        commit(mutationTypes.GET_CART_SUCCESS, response.data);
      })
      .catch(error => console.log('ERROR getting the cart ', error));
  },
  // add a product to the shopping cart
  addItemToCart ({ commit }, item) {
    commit(mutationTypes.ADD_ITEM_TO_CART);
    return cartStateApi.addItemToCart(item.cartId, item)
      .then(response => {
        commit(mutationTypes.ADD_ITEM_TO_CART_SUCCESS, response.data);
      })
      .catch(error => console.log('ERROR adding an item to the cart ', error));
  },
  removeItemFromCart ({ commit }, item) {
    commit(mutationTypes.REMOVE_ITEM_FROM_CART);
    return cartStateApi.removeItemFromCart(item)
      .then(response => {
        commit(mutationTypes.REMOVE_ITEM_FROM_CART_SUCCESS, response.data);
      });
  },
};

// Cart mutations
const mutations = {
  [mutationTypes.GET_CART] (state) {
    // Called when fetching products
    state.showLoader = true;
  },
  [mutationTypes.GET_CART_SUCCESS] (state, newCart) {
    state.showLoader = false;
    state.cart = newCart;
    if (isEmpty(newCart.full)) {
      state.cart.full = 'false';
    } else state.cart.full = 'true';
  },
  [mutationTypes.ADD_ITEM_TO_CART] (state) {
    state.showLoader = true;
  },
  [mutationTypes.ADD_ITEM_TO_CART_SUCCESS] (state, newCart) {
    state.showLoader = false;
    state.cart = newCart;
  },
  [mutationTypes.REMOVE_ITEM_FROM_CART] (state) {
    state.showLoader = true;
  },
  [mutationTypes.REMOVE_ITEM_FROM_CART_SUCCESS] (state, newCart) {
    state.showLoader = false;
    state.cart = newCart;
    if (isEmpty(newCart.full)) {
      state.cart.full = 'false';
    } else state.cart.full = 'true';
  },
};


export default {
  namespaced: true,
  state,
  actions,
  mutationTypes,
  mutations,
};
