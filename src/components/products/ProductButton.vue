<template>
  <div>
    <button v-if="isAdding" class="product-add" @click="addProductToCart()"> Add to Cart </button>
    <button v-else class="button product-remove" @click="removeProductFromCart(product.product_id)"> Remove from Cart </button>
  </div>
</template>

<script>
import { isEmpty, each } from 'lodash';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'productButton',
  props: ['product'],
  computed: {
    ...mapState({
      cart: state => state.cartState.cart,
    }),
    isAdding () {
      return ((isEmpty(this.product)) || (isEmpty(this.cart)) || (!this.productInCart(this.product)));
    },
  },
  methods: {
    ...mapActions('cartState', [
      'addItemToCart', 'removeItemFromCart',
    ]),
    addProductToCart () {
      this.addItemToCart({
        cartId: this.cart._id,
        productId: this.product.product_id,
        amount: 1,
      });
    },
    removeProductFromCart (id) {
      this.removeItemFromCart({
        cartId: this.cart._id,
        productId: id,
        getFullCart: this.cart.full,
      });
    },
    productInCart (thisProduct) {
      let inCart = false;
      each(this.cart.items, (iter) => {
        if (iter.product_id === thisProduct.product_id) {
          inCart = true;
        }
      });
      return inCart;
    },
  },
};
</script>
