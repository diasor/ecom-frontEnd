import Vue from 'vue';
import Vuex from 'vuex';
import productsState from './modules/productsState';
import cartState from './modules/cartState';
import manufacturersState from './modules/manufacturersState';

Vue.use(Vuex);
export default new Vuex.Store({
  strict: true,
  modules: {
    productsState,
    cartState,
    manufacturersState,
  },
});
