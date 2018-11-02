<template>
  <div class="inner-form">
    <div class="products">
      <div v-if="!cartIsEmpty" class="title">
        <h1>Your Cart</h1>
        <template v-for="item in cartItems">
          <product-details :productId="item.product_id" :key="item.product_id"></product-details>
        </template>
        <button class="button" @click="emptyCart()">Empty Cart</button>
      </div>
      <div v-else class="title">
        <h1>Your Cart is Empty</h1>
        <img class="shopping-cart" src='../assets/ShoppingCart.png'/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ProductDetails from '../components/products/ProductDetails';

export default {
  name: 'Cart',
  components: {
    productDetails: ProductDetails,
  },
  data: () => ({
    cartIsEmpty: true,
  }),
  computed: {
    ...mapState({
      cart: state => state.cartState.cart,
      cartItems: state => state.cartState.cart.items,
    }),
  },
  methods: {
    ...mapActions('cartState', [
      'getCart',
    ]),
    ...mapActions('productsState', [
      'getProductById',
    ]),
    emptyCart () {
      console.log('empty');
    },
  },
  created () {
    this.getCart('true')
      .then(() => {
        this.cartIsEmpty = (this.cartItems.length === 0);
      })
      .catch(err => console.log('ERROR ', err));
  },
};
</script>
