<template>
  <div class="products">
    <div class="product-container">
      <div v-for="productItem in products" :key="productItem.product_id">
        <product-item :product="productItem"></product-item>
      </div>
    </div>
  </div>
</template>

<script>
import { isEmpty } from 'lodash';
import { mapState, mapActions } from 'vuex';
import ProductItem from './ProductItem';

export default {
  name: 'productList',
  components: {
    productItem: ProductItem,
  },
  computed: {
    ...mapState({
      products: state => state.productsState.products,
      manufacturers: state => state.manufacturersState.manufacturers,
      cart: state => state.cartState.cart,
    }),
  },
  methods: {
    ...mapActions('productsState', [
      'getAllProducts',
    ]),
    ...mapActions('manufacturersState', [
      'getAllManufacturers',
    ]),
    ...mapActions('cartState', [
      'getCart',
    ]),
  },
  created () {
    if ((isEmpty(this.manufacturers)) || (this.manufacturers.length === 0)) {
      this.getAllManufacturers()
        .catch(error => console.log('ERROR loading the Manufacturers', error));
    }
    this.getAllProducts()
      .catch(error => console.log('ERROR loading the Products', error));

    this.getCart('false')
      .catch(error => console.log('ERROR loading the Cart ', error));
  },
};
</script>
