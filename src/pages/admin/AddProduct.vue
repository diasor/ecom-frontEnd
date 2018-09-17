<template>
  <div class="form-logo">
    <product-form
      :item="item"
      :isEditing="false"
      :manufacturers="manufacturers"></product-form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductForm from '@/components/products/ProductForm';

export default {
  name: 'AddProduct',
  data: () => ({
    item: {},
  }),
  components: {
    productForm: ProductForm,
  },
  computed: {
    ...mapState({
      manufacturers: state => state.manufacturersState.manufacturers,
    }),
  },
};
</script>
