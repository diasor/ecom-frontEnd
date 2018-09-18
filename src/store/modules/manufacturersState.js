import manufacturersStateApi from '../api/manufacturersStateApi';

// Manufacturers' state
const state = {
  showLoader: false,
  manufacturers: [],
  manufacturer: {},
};

// Manufacturers' mutations types
const mutationTypes = {
  ALL_MANUFACTURERS: 'ALL_MANUFACTURERS',
  ALL_MANUFACTURERS_SUCCESS: 'ALL_MANUFACTURERS_SUCCESS',
  MANUFACTURER_BY_ID: 'MANUFACTURER_BY_ID',
  MANUFACTURER_BY_ID_SUCCESS: 'MANUFACTURER_BY_ID_SUCCESS',
  ADD_MANUFACTURER: 'ADD_MANUFACTURER',
  ADD_MANUFACTURER_SUCCESS: 'ADD_MANUFACTURER_SUCCESS',
  UPDATE_MANUFACTURER: 'UPDATE_MANUFACTURER',
  UPDATE_MANUFACTURER_SUCCESS: 'UPDATE_MANUFACTURER_SUCCESS',
  REMOVE_MANUFACTURER: 'REMOVE_MANUFACTURER',
  REMOVE_MANUFACTURER_SUCCESS: 'REMOVE_MANUFACTURER_SUCCESS',
};

// Manufacturer's actions
const actions = {
  // All manufacturers
  getAllManufacturers ({ commit }) {
    commit(mutationTypes.ALL_MANUFACTURERS);
    return manufacturersStateApi.getAllManufacturers()
      .then(response => {
        commit(mutationTypes.ALL_MANUFACTURERS_SUCCESS, response.data);
      });
  },
  // Get Manufacturer by Id
  getManufacturerById ({ commit }, id) {
    commit(mutationTypes.MANUFACTURER_BY_ID);
    return manufacturersStateApi.getManufacturerById(id)
      .then(response => {
        commit(mutationTypes.MANUFACTURER_BY_ID_SUCCESS, response.data);
      });
  },
  addManufacturer ({ commit }, manufacturer) {
    commit(mutationTypes.ADD_MANUFACTURER);
    return manufacturersStateApi.addManufacturer(manufacturer)
      .then(response => {
        commit(mutationTypes.ADD_MANUFACTURER_SUCCESS, response.data);
      })
      .catch(err => console.log('ERROR adding a manufacturer: ', err));
  },
  updateManufacturer ({ commit }, manufacturer) {
    console.log('updateManufacturer from manufacturersState.js');
    commit(mutationTypes.UPDATE_MANUFACTURER);
    return manufacturersStateApi.updateManufacturer(manufacturer)
      .then(response => {
        console.log('then in manufacturersState');
        commit(mutationTypes.UPDATE_MANUFACTURER_SUCCESS, response.data);
      });
  },
  removeManufacturer ({ commit }, id) {
    commit(mutationTypes.REMOVE_MANUFACTURER);
    return manufacturersStateApi.removeManufacturer(id)
      .then(response => {
        commit(mutationTypes.REMOVE_MANUFACTURER_SUCCESS, response.data);
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
  [mutationTypes.MANUFACTURER_BY_ID] () {
    // Called when fetching manufacturer by ID
    state.showLoader = true;
  },
  [mutationTypes.MANUFACTURER_BY_ID_SUCCESS] (state, manufacturer) {
    // Called when manufacturer is fetched
    state.showLoader = false;
    state.manufacturer = manufacturer;
  },
  [mutationTypes.ADD_MANUFACTURER] () {
    state.showLoader = true;
  },
  [mutationTypes.ADD_MANUFACTURER_SUCCESS] (state, manufacturer) {
    state.showLoader = false;
    state.manufacturers.push(manufacturer);
  },
  [mutationTypes.UPDATE_MANUFACTURER] () {
    state.showLoader = true;
  },
  [mutationTypes.UPDATE_MANUFACTURER_SUCCESS] (state, manufacturer) {
    state.showLoader = false;
    return manufacturer;
  },
  [mutationTypes.REMOVE_MANUFACTURER] () {
    state.showLoader = true;
  },
  [mutationTypes.REMOVE_MANUFACTURER_SUCCESS] (payload) {
    state.showLoader = false;
    const index = state.manufacturers.findIndex(p => p._id === payload);
    state.manufacturers.splice(index, 1);
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
