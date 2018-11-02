import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import Admin from '@/pages/Admin';
import Cart from '@/pages/Cart';
import Details from '@/pages/Details';
import ProductForm from '@/pages/admin//ProductForm';
import ManufacturerForm from '@/pages/admin//ManufacturerForm';
import AdminProductList from '@/pages/admin/AdminProductList';
import AdminManufacturersList from '@/pages/admin/AdminManufacturersList';
import Callback from '@/pages/Callback';

Vue.use(Router);

// export default new Router({
const router = new Router({
  mode: 'history',
  routes: [
    { name: 'home', path: '/', component: Home },
    { name: 'callback', path: '/callback', component: Callback },
    { name: 'admin', path: '/admin', component: Admin },
    { name: 'admin-products', path: '/admin-products', component: AdminProductList },
    { name: 'admin-create-product', path: '/admin-create-product', component: ProductForm },
    { name: 'admin-edit-product', path: '/admin-edit-product/:id', component: ProductForm },
    { name: 'admin-manufacturers', path: '/admin-manufacturers', component: AdminManufacturersList },
    { name: 'admin-create-manufacturer', path: '/admin-create-manufacturer/', component: ManufacturerForm },
    { name: 'admin-edit-manufacturer', path: '/admin-edit-manufacturer/:id', component: ManufacturerForm },
    { name: 'cart', path: '/cart', component: Cart },
    { name: 'details', path: '/details/:id', props: true, component: Details },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.name === 'callback') { // check if "to"-route is "callback" and allow access
    next();
  } else if (router.app.$auth.isAuthenticated()) { // if authenticated allow access
    next();
  } else { // trigger auth0 login
    router.app.$auth.login();
  }
});

export default router;
