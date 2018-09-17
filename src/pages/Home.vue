<template>
  <div class="inner-form">
    <div class="title">
      <h1>Products In stock </h1>
      <product-list></product-list>
    </div>
  </div>
</template>

<script>
import ProductList from '@/components/products/ProductList';

export default {
  name: 'home',
  components: {
    productList: ProductList,
  },
};
</script>
