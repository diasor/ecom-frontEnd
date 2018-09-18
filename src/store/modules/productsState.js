import productsStateApi from '../api/productsStateApi';

// Products' state
const state = {
  showLoader: false,
  product: {},
  products: [],
};

// Products' mutations types
const mutationTypes = {
  ALL_PRODUCTS: 'ALL_PRODUCTS',
  ALL_PRODUCTS_SUCCESS: 'ALL_PRODUCTS_SUCCESS',
  PRODUCT_BY_ID: 'PRODUCT_BY_ID',
  PRODUCT_BY_ID_SUCCESS: 'PRODUCT_BY_ID_SUCCESS',
  ADD_PRODUCT: 'ADD_PRODUCT',
  ADD_PRODUCT_SUCCESS: 'ADD_PRODUCT_SUCCESS',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  UPDATE_PRODUCT_SUCCESS: 'UPDATE_PRODUCT_SUCCESS',
  REMOVE_PRODUCT: 'REMOVE_PRODUCT',
  REMOVE_PRODUCT_SUCCESS: 'REMOVE_PRODUCT_SUCCESS',
  UPLOAD_IMAGE_SUCCESS: 'UPLOAD_IMAGE_SUCCESS',
};

// Products' actions
const actions = {
  // All products
  getAllProducts ({ commit }) {
    commit(mutationTypes.ALL_PRODUCTS);
    // Fetch actual products from the API
    return productsStateApi.getAllProducts()
      .then(response => {
        commit(mutationTypes.ALL_PRODUCTS_SUCCESS, response.data);
      })
      .catch(err => console.log('ERR at getAllProducts ', err));
  },
  // Get Product by ID
  getProductById ({ commit }, id) {
    commit(mutationTypes.PRODUCT_BY_ID);
    return productsStateApi.getProductById(id)
      .then(response => {
        commit(mutationTypes.PRODUCT_BY_ID_SUCCESS, response.data);
      });
  },
  // add a product
  addProduct ({ commit }, formData, headers) {
    commit(mutationTypes.ADD_PRODUCT);
    return productsStateApi.addUpdateProduct(formData, headers)
      .then(response => {
        commit(mutationTypes.ADD_PRODUCT_SUCCESS, response.data);
      })
      .catch(err => console.log('ERR at addProduct ', err));
  },
  // update product iformation
  updateProduct ({ commit }, product) {
    commit(mutationTypes.UPDATE_PRODUCT);
    return productsStateApi.addUpdateProduct(product)
      .then(response => {
        commit(mutationTypes.UPDATE_PRODUCT_SUCCESS, response.data);
      });
  },
  removeProduct ({ commit }, id) {
    commit(mutationTypes.REMOVE_PRODUCT);
    return productsStateApi.removeProduct(id)
      .then(response => {
        commit(mutationTypes.REMOVE_PRODUCT_SUCCESS, response.data);
      });
  },
  uploadImage ({ commit }, formData, headers) {
    return productsStateApi.uploadImage(formData, headers)
      .then(response => {
        commit(mutationTypes.UPLOAD_IMAGE_SUCCESS, response);
      });
  },
};

// Product mutations
const mutations = {
  [mutationTypes.ALL_PRODUCTS] (state) {
    // Called when fetching products
    state.showLoader = true;
  },
  [mutationTypes.ALL_PRODUCTS_SUCCESS] (state, products) {
    // Called when products have been fetched
    state.showLoader = false;
    // Updates state products
    state.products = products;
  },
  [mutationTypes.PRODUCT_BY_ID] () {
    // Called when fetching products by ID
    state.showLoader = true;
  },
  [mutationTypes.PRODUCT_BY_ID_SUCCESS] (state, product) {
    // Called when product is fetched
    state.showLoader = false;
    // Updates state product
    state.product = product;
  },
  [mutationTypes.ADD_PRODUCT] () {
    state.showLoader = true;
  },
  [mutationTypes.ADD_PRODUCT_SUCCESS] (state, product) {
    state.showLoader = false;
    state.products.push(product);
  },
  [mutationTypes.UPDATE_PRODUCT] () {
    state.showLoader = true;
  },
  [mutationTypes.UPDATE_PRODUCT_SUCCESS] (state, product) {
    state.showLoader = false;
    return product;
  },
  [mutationTypes.REMOVE_PRODUCT] () {
    state.showLoader = true;
  },
  [mutationTypes.REMOVE_PRODUCT_SUCCESS] (payload) {
    state.showLoader = false;
    const index = state.products.findIndex(p => p._id === payload);
    state.products.splice(index, 1);
  },
  [mutationTypes.UPLOAD_IMAGE_SUCCESS] () {
    state.showLoader = false;
  },
};

// Products' getters
const getters = {
  // All products
  allProducts: state => state.products,

  // Get Product by ID
  productById: (state, getters) => id => {
    if (getters.allProducts.length > 0) {
      return getters.allProducts.filter(p => p._id === id)[0];
    }
    return state.productDashboard.product;
  },
};

export default {
  namespaced: true,
  state,
  mutationTypes,
  getters,
  actions,
  mutations,
};
