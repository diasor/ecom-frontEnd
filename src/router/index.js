import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import Admin from '@/pages/Admin';
import Cart from '@/pages/Cart';
import Details from '@/pages/Details';
import EditProduct from '@/pages/admin/EditProduct';
import AddProduct from '@/pages/admin/AddProduct';
import AdminProductList from '@/pages/admin/AdminProductList';

Vue.use(Router);

export default new Router({
  routes: [
    { name: 'home', path: '/', component: Home },
    { name: 'admine', path: '/admin', component: Admin },
    { name: 'admin-create', path: '/admin-create', component: AddProduct },
    { name: 'admin-products', path: '/admin-products', component: AdminProductList },
    { name: 'admin-edit', path: '/admin-edit/:id', component: EditProduct },
    { name: 'cart', path: '/cart', component: Cart },
    { name: 'Details', path: '/details/:id', component: Details },
  ],
});
