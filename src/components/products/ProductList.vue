<template>
  <div class="products">
    <div class="product-container">
      <div v-for="productItem in products" :key="productItem._id">
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
    }),
  },
  methods: {
    ...mapActions('productsState', [
      'getAllProducts',
    ]),
    ...mapActions('manufacturersState', [
      'getAllManufacturers',
    ]),
  },
  created () {
    if ((isEmpty(this.manufacturers)) || (this.manufacturers.length === 0)) {
      this.getAllManufacturers()
        .catch(err => console.log('ERROR ', err));
    }
    this.getAllProducts()
      .catch(err => console.log('ERROR ', err));
  },
};
</script>
