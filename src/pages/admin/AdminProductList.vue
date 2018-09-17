<template>
  <div class="inner-form">
    <div class="title">Product List </div>
    <div class="col l9 md9 sm12 xs12">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Manufacturer</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product._id">
            <td>{{product.name}}</td>
            <td>${{product.price}}</td>
            <td>{{product.manufacturer.name}}</td>
            <td>
              <router-link :to="'/admin-edit/' + product._id">
                <img src="../../assets/edit.png" class="admin-icons">
              </router-link>
            </td>
            <td>
              <a @click="deleteProduct(product._id)">
                <img src="../../assets/delete.png" class="admin-icons">
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AdminProductList',
  computed: {
    ...mapState({
      products: state => state.productsState.products,
    }),
  },
  methods: {
    ...mapActions('productsState', [
      'getAllProducts', 'removeProduct',
    ]),
    deleteProduct (id) {
      this.removeProduct(id);
    },
  },
  created () {
    this.getAllProducts()
      .catch(err => console.log('ERROR ', err));
  },
};
</script>
