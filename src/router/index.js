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

Vue.use(Router);

export default new Router({
  routes: [
    { name: 'home', path: '/', component: Home },
    { name: 'admin', path: '/admin', component: Admin },
    { name: 'admin-products', path: '/admin-products', component: AdminProductList },
    { name: 'admin-create-product', path: '/admin-create-product', component: ProductForm },
    { name: 'admin-edit-product', path: '/admin-edit-product/:id', component: ProductForm },
    { name: 'admin-manufacturers', path: '/admin-manufacturers', component: AdminManufacturersList },
    { name: 'admin-create-manufacturer', path: '/admin-create-manufacturer/', component: ManufacturerForm },
    { name: 'admin-edit-manufacturer', path: '/admin-edit-manufacturer/:id', component: ManufacturerForm },
    { name: 'cart', path: '/cart', component: Cart },
    { name: 'details', path: '/details/:id', component: Details },
  ],
});
