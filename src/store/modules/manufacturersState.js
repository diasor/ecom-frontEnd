import productsStateApi from '../api/productsStateApi';

// Manufacturers' state
const state = {
  manufacturers: [],
};

// Manufacturers' mutations types
const mutationTypes = {
  ALL_MANUFACTURERS: 'ALL_MANUFACTURERS',
  ALL_MANUFACTURERS_SUCCESS: 'ALL_MANUFACTURERS_SUCCESS',
};

// Product actions
const actions = {
  // All manufacturers
  getAllManufacturers ({ commit }) {
    commit(mutationTypes.ALL_MANUFACTURERS);
    return productsStateApi.getAllManufacturers()
      .then(response => {
        commit(mutationTypes.ALL_MANUFACTURERS_SUCCESS, response.data);
      });
  },
};

// Manufacturers' mutations
const mutations = {
  [mutationTypes.ALL_MANUFACTURERS] (state) {
    state.showLoader = true;
  },
  [mutationTypes.ALL_MANUFACTURERS_SUCCESS] (state, manufacturers) {
    state.showLoader = false;
    state.manufacturers = manufacturers;
  },
};

// Manufacturers' getters
const getters = {
  // All manufacturers
  allManufacturers: state => state.manufacturers,
};

export default {
  namespaced: true,
  state,
  mutationTypes,
  getters,
  actions,
  mutations,
};
