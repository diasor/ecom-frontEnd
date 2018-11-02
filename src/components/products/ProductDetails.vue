<template>
  <div class="product-detail-row">
    <div class="l4 m4 s6 s12 col-left">
      <img class="product-details-image" :src="imagePath" @error="imageNotFound()" alt="">
    </div>
    <div class="l8 m8 s6 s12 col">
      <label class="product-details-title">{{product.name}}</label>
      <h3>{{product.manufacturer && product.manufacturer.name}}</h3>
      <p class="product-details-description"> {{product.description}} </p>
      <div class="product-detail-row">
        <div class="col-left"><label class="product-details-price">${{product.price}}</label></div>
        <product-button :product="product"></product-button>
      </div>
    </div>
    <div class="divider"></div>
  </div>

</template>

<script>
import { isEmpty } from 'lodash';
import { mapState, mapGetters, mapActions } from 'vuex';
import ProductButton from './ProductButton';

export default {
  name: 'ProductDetails',
  components: {
    productButton: ProductButton,
  },
  props: ['productId'],
  data: () => ({
    product: {},
    imagePath: '',
    productName: '',
  }),
  computed: {
    ...mapState({
      stateProduct: state => state.productsState.product,
    }),
    ...mapGetters('productsState', [
      'productById',
    ]),
  },
  methods: {
    ...mapActions('productsState', [
      'getProductById',
    ]),
    imageNotFound () {
      this.imagePath = '/static/productImages/NotAvailable.jpeg';
    },
    fetchProduct (callback) {
      // first search the product in the store
      this.product = this.productById(this.productId);
      if ((isEmpty(this.product)) || (isEmpty(this.product.name))) {
        // if the product is not found in the store, then get it from the API
        this.getProductById(this.productId)
          .then(() => {
            this.product = Object.assign({}, this.stateProduct);
            callback(undefined, this.product);
          })
          .catch(error => {
            console.log(`ERROR getting the product: ${error}`);
            callback(error);
            // this.displayModal(true, 'ERROR', description, false);
          });
      } else callback(undefined, this.product);
    },
  },
  created () {
    this.fetchProduct((error) => {
      if (error) console.log(`ERROR getting the product: ${error}`);
      else if (!isEmpty(this.product)) {
        this.imagePath = `data:image/jpeg;base64,${this.product.image}`;
        if ((!isEmpty(this.product.name)) && (this.product.name.length > 19)) {
          const shortName = this.product.name.substr(0, 18);
          this.productName = `${shortName}...`;
        } else this.productName = this.product.name;
      }
    });
  },
};
</script>
