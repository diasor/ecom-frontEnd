import Vue from 'vue';
import Vuex from 'vuex';
import productsState from './modules/productsState';
import manufacturersState from './modules/manufacturersState';
import cartState from './modules/cartState';

Vue.use(Vuex);
export default new Vuex.Store({
  strict: true,
  modules: {
    productsState,
    manufacturersState,
    cartState,
  },
});
