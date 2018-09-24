import auth from '@/auth';
import Vue from 'vue';
import 'semantic-ui-css/semantic.css';
import VeeValidate from 'vee-validate';
import App from './App';
import router from './router';
import store from './store';

Vue.use(VeeValidate);
Vue.use(auth);
Vue.config.productionTip = false;

new Vue({ // eslint-disable-line no-new
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
});
