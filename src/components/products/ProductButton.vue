<template>
  <div>
    <button v-if="isAdding" class="product-add" @click="addProductToCart()"> Add to Cart </button>
    <button v-else class="button product-remove" @click="removeProductFromCart(product._id)"> Remove from Cart </button>
  </div>
</template>

<script>
import { isEmpty } from 'lodash';
import { mapState, mapMutations } from 'vuex';
import cartState from '@/store/modules/cartState';

export default {
  name: 'productButton',
  props: ['product'],
  computed: {
    ...mapState({
      cart: state => state.cartState.cart,
    }),
    isAdding () {
      return ((isEmpty(this.product)) || (isEmpty(this.cart)) || (this.cart.indexOf(this.product) < 0));
    },
  },
  methods: {
    ...mapMutations('cartState', {
      addToCart: cartState.mutationTypes.ADD_TO_CART,
      removeFromCart: cartState.mutationTypes.REMOVE_FROM_CART,
    }),
    addProductToCart () {
      this.addToCart(this.product);
    },
    removeProductFromCart (id) {
      this.removeFromCart(id);
    },
  },
};
</script>
