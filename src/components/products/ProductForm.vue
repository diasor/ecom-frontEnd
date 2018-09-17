<template>
  <form>
    <div class="inner-form">
      <div class="row">
        <div class="title">
          <label v-if="isEditing" class="title">Update a Product </label>
          <label v-else class="title">Create a new Product </label>
        </div>
        <div class="col l5 m5 s12 xs12">
          <div class="input-group">
            <label> Name </label>
            <input type="text" placeholder="Product Name" v-model="item.name" v-validate="'required'" name="name"
              :class="{'form-control': true, 'error': errors.has('name') }">
            <label class="text-danger" v-show="errors.has('name')">Name is required</label>
          </div>
          <div class="input-group">
            <label> Price </label>
            <input type="text" placeholder="Price" v-model="item.price" v-validate="'required'" name="price"
              :class="{'form-control': true, 'error': errors.has('price') }">
            <label class="small text-danger" v-show="errors.has('price')">Price is required</label>
          </div>
          <div class="input-group">
            <label>Manufacturer</label>
              <select type="text" v-model="item.manufacturer" v-validate="'required'" name="productManufacturer"
                :class="{'form-control': true, 'error': errors.has('productManufacturer') }">
                <template v-for="manufacturer in manufacturers">
                  <option
                    :value="manufacturer._id"
                    :key="manufacturer._id">{{manufacturer.name}}</option>
                </template>
              </select>
              <label class="small text-danger" v-show="errors.has('productManufacturer')">Manufacturer is required</label>
          </div>
        </div>
        <div class="col l4 m4 s12 xs12">
          <div class="input-group">
            <div class="upload-btn-wrapper">
              <label>Image</label>
              <button class="uploadButton">Upload a file</button>
              <input type="file" name="productImageFile" @change="onFileChanged" />
              <!-- <input type="file" @change="onFileChanged" placeholder="Product Image" name="image" class="form-control inputfile"> -->
            </div>

          </div>
          <div class="input-group">
            <label>Description</label>
            <textarea type="text" placeholder="Description" rows="5" v-model="item.description" v-validate="'required'" name="description"
              :class="{'form-control': true, 'error': errors.has('description') }"></textarea>
            <label class="small text-danger" v-show="errors.has('description')">Description is required</label>
          </div>
          <div class="input-group new-button">
            <button v-if="isEditing" class="button" @click.prevent="updateThisProduct()">Update Product </button>
            <button v-else class="button" @click.prevent="addNewProduct()">Add Product </button>
          </div>
        </div>
        <modal-message
          :showModal = "productModal.showModal"
          :title = "productModal.title"
          :description = "productModal.description"
          :confirmBtnLabel = "productModal.closeLabel"
          @confirmClick = "confirmClick()"
          @cancelClick = "confirmClick()"
        ></modal-message>
      </div>
    </div>
  </form>
</template>

<script>
import { isEmpty } from 'lodash';
import { mapActions } from 'vuex';
import ModalMessage from '../ModalMessage';

export default {
  name: 'ProductForm',
  props: ['item', 'isEditing', 'manufacturers'],
  components: {
    ModalMessage,
  },
  data: () => ({
    // productManufacturer: {},
    productModal: {
      showModal: false,
      title: 'Product created',
      description: '',
      closeLabel: 'OK',
    },
    productImageFile: {},
    closeModal: false,
  }),
  methods: {
    ...mapActions('productsState', [
      'addProduct', 'updateProduct', 'uploadImage',
    ]),
    ...mapActions('manufacturersState', [
      'getAllManufacturers',
    ]),
    addNewProduct () {
      console.log('addNewProduct');
      this.$validator.validateAll()
        .then(result => {
          if (!result) {
            this.productModal.showModal = true;
            this.productModal.title = 'Validation Error';
            this.productModal.description = `Please ensure the form is valid: ${result}`;
            this.close = false;
          } else {
            const formData = new FormData();
            formData.append('file', this.productImageFile.data);
            formData.append('fileType', this.productImageFile.contentType);
            formData.append('fileName', this.productImageFile.name);

            formData.append('name', this.item.name);
            formData.append('price', this.item.price);
            formData.append('description', this.item.description);
            formData.append('manufacturer', this.item.manufacturer._id);
            this.addProduct(formData, { headers: { 'Content-Type': 'multipart/form-data' } })
              .then(() => {
                this.productModal.showModal = true;
                this.productModal.description = `The product  ${this.item.name} has been succesfully created. `;
                this.closeModal = true;
              })
              .catch(error => {
                // if it fails, send error from the server
                console.log('ERROR ', error);
              });
          }
        }).catch((err) => {
          this.productModal.showModal = true;
          this.productModal.title = 'Validation Error';
          this.productModal.description = `Please ensure the form is valid: ${err}`;
          this.close = false;
        });
    },
    updateThisProduct () {
      console.log('ProductForm updateProduct');
      this.updateProduct(this.item)
        .then(() => {
          this.productModal.showModal = true;
          this.productModal.description = `The product  ${this.item.name} has been succesfully updated. `;
          console.log('SAVED');
        })
        .catch(error => {
          // if it fails, send error from the server
          console.log('ERROR ', error);
        });
    },
    onFileChanged (event) {
      this.productImageFile = {
        data: event.target.files[0],
        contentType: event.target.files[0].type,
        name: event.target.files[0].name,
      };
    },
    confirmClick () {
      if (this.closeModal) this.$router.push({ name: 'home' });
      else this.productModal.showModal = false;
    },
  },
  created () {
    if ((isEmpty(this.manufacturers)) || (this.manufacturers.length === 0)) {
      this.getAllManufacturers()
        .catch(err => console.log('ERROR ', err));
    }
    //  :selected="manufacturer._id == selectedManufacturer"
    // this.productManufacturer = this.selectedManufacturer;
  },
  mounted () {
    
  }
};
</script>
