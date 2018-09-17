<template>
  <div class="form-logo">
    <product-form
      :item="selectedProduct"
      :isEditing="true"
      :manufacturers="manufacturers"></product-form>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex';
import ProductForm from '@/components/products/ProductForm';

export default {
  name: 'editProduct',
  components: {
    productForm: ProductForm,
  },
  data: () => ({
    selectedProduct: {},
  }),
  computed: {
    ...mapState({
      product: state => state.productsState.product,
      manufacturers: state => state.manufacturersState.manufacturers,
    }),
    // selectedProduct () {
    //   return Object.assign({}, this.product);
    // },
  },
  methods: {
    ...mapActions('productsState', [
      'getProductById',
    ]),
  },
  created () {
    this.getProductById(this.$route.params.id)
      .then(() => {
        this.selectedProduct = Object.assign({}, this.product);
      });
  },
};
</script>
