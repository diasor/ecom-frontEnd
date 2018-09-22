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
import ProductButton from './ProductButton';

export default {
  name: 'ProductDetails',
  props: ['product'],
  components: {
    productButton: ProductButton,
  },
  data: () => ({
    imagePath: '',
    productName: '',
  }),
  methods: {
    imageNotFound () {
      this.imagePath = '/static/productImages/NotAvailable.jpeg';
    },
  },
  created () {
    this.imagePath = `data:image/jpeg;base64,${this.product.image}`;
    if (this.product.name.length > 19) {
      const shortName = this.product.name.substr(0, 18);
      this.productName = `${shortName}...`;
    } else this.productName = this.product.name;
  },
};
</script>
