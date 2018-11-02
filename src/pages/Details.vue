<template>
  <div class="product-detail-container">
    <product-details :productId="productId" :isAdding="true"></product-details>
  </div>
</template>

<script>
import ProductDetails from '../components/products/ProductDetails';

export default {
  name: 'Details',
  components: {
    'product-details': ProductDetails,
  },
  data: () => ({
    productId: '',
  }),
  created () {
    this.productId = this.$route.params.id;
  },
};
</script>
