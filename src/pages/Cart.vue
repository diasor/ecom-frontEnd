<template>
  <div class="inner-form">
    <div class="products">
      <div v-if="cart.length > 0" class="title">
        <h1>Your Cart</h1>
        <template v-for="product in cart">
          <product-details :product="product" :key="product.id" ></product-details>
        </template>
      </div>
      <div v-else class="title">
        <h1>Your Cart is Empty</h1>
        <img class="shopping-cart" src='../assets/ShoppingCart.png'/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductDetails from '../components/products/ProductDetails';

export default {
  components: {
    productDetails: ProductDetails,
  },
  computed: {
    ...mapState({
      cart: state => state.cartState.cart,
    }),
  },
};
</script>
