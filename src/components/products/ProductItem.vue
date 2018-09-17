<template>
  <div class="row">
    <div class="col l3 m4 s6 xs12">
      <div class="product">
        <router-link :to="'/details/' + product._id" class="product-link"> <!-- rever outerlink -->
          <div class="product-image">
            <img class="img-responsive" :src="imagePath" @error="imageNotFound()" alt="">
          </div>
          <div class="product-description">
            <label>{{productName}}</label>
            <div class="product-info"> {{product.manufacturer.name}} </div>
            <div class="product-price-cart"> ${{product.price}} </div>
          </div>
        </router-link>
        <div class="product-action">
          <product-button :product="product" ></product-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isEmpty } from 'lodash';
import ProductButton from './ProductButton';

export default {
  name: 'productItem',
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
    if (isEmpty(this.product.image)) {
      this.imageNotFound();
    } else {
      this.imagePath = `data:image/jpeg;base64,${this.product.image}`;
    }
    if (this.product.name.length > 19) {
      const shortName = this.product.name.substr(0, 18);
      this.productName = `${shortName}...`;
    } else this.productName = this.product.name;
  },
};
</script>
