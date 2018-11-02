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
              <select type="text" v-model="productManufacturer._id" v-validate="'required'" name="productManufacturer"
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
              <label>Image {{ item.imageName }} </label>
              <button class="uploadButton">Upload a file</button>
              <input type="file" name="productImageFile" @change="onFileChanged" />
            </div>
          </div>
          <div class="input-group">
            <label>Description</label>
            <textarea type="text" placeholder="Description" rows="5" v-model="item.description" v-validate="'required'" name="description"
              :class="{'form-control': true, 'error': errors.has('description') }"></textarea>
            <label class="small text-danger" v-show="errors.has('description')">Description is required</label>
          </div>
          <div class="input-group new-button">
            <button v-if="isEditing" class="button" @click.prevent="addUpdateThisProduct()">Update Product </button>
            <button v-else class="button" @click.prevent="addUpdateThisProduct()">Add Product </button>
            <button class="button" @click.prevent="close()">Close</button>
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
import { mapState, mapActions } from 'vuex';
import ModalMessage from '../../components/ModalMessage';

export default {
  name: 'ProductForm',
  components: {
    ModalMessage,
  },
  data: () => ({
    item: {},
    productId: '',
    isEditing: false,
    productManufacturer: {},
    sendFile: false,
    productModal: {
      showModal: false,
      title: 'Product created',
      description: '',
      closeLabel: 'OK',
    },
    productImageFile: {},
    closeModal: false,
  }),
  computed: {
    ...mapState({
      product: state => state.productsState.product,
      manufacturers: state => state.manufacturersState.manufacturers,
    }),
  },
  methods: {
    ...mapActions('productsState', [
      'addProduct', 'updateProduct', 'getProductById',
    ]),
    ...mapActions('manufacturersState', [
      'getAllManufacturers',
    ]),
    addUpdateThisProduct () {
      this.$validator.validateAll()
        .then(result => {
          if (!result) {
            const description = `Please ensure the form is valid: ${result}`;
            this.displayModal(true, 'Validation Error', description, false);
          } else {
            let description = '';
            let title = '';
            let method = '';
            if (this.isEditing) {
              method = 'productsState/updateProduct';
              description = `The product  ${this.item.name} has been succesfully updated. `;
              title = 'Update Product';
            } else {
              method = 'productsState/addProduct';
              description = `The product  ${this.item.name} has been succesfully created. `;
              title = 'Create Product';
            }
            this.$store.dispatch(method, this.buildProduct(), { headers: { 'Content-Type': 'multipart/form-data' } })
              .then(() => {
                this.displayModal(true, title, description, true);
              })
              .catch(error => {
                const description = `Please ensure the form is valid: ${error}`;
                this.displayModal(true, 'Validation Error', description, false);
              });
          }
        })
        .catch(error => {
          const description = `Please ensure the form is valid: ${error}`;
          this.displayModal(true, 'Validation Error', description, false);
        });
    },
    onFileChanged (event) {
      this.productImageFile = {
        data: event.target.files[0],
        contentType: event.target.files[0].type,
        name: event.target.files[0].name,
      };
      if (event.target.files[0].name !== this.product.imageName) {
        this.sendFile = true;
      }
    },
    confirmClick () {
      if (this.closeModal) this.$router.push({ name: 'admin-products' });
      else this.productModal.showModal = false;
    },
    displayModal (showModal, title, description, closeModal) {
      this.productModal.showModal = showModal;
      this.productModal.title = title;
      this.productModal.description = description;
      this.closeModal = closeModal;
    },
    buildProduct () {
      const formData = new FormData();
      if (this.sendFile) {
        formData.append('file', this.productImageFile.data);
        formData.append('fileType', this.productImageFile.contentType);
        formData.append('fileName', this.productImageFile.name);
        formData.append('fileChanged', this.sendFile);
      }
      if (this.isEditing) {
        formData.append('id', this.productId);
      } else {
        formData.append('id', '');
      }
      formData.append('name', this.item.name);
      formData.append('name', this.item.name);
      formData.append('price', this.item.price);
      formData.append('description', this.item.description);
      formData.append('manufacturer', this.productManufacturer._id);
      return formData;
    },
    close () {
      this.$router.push({ name: 'admin-products' });
    },

  },
  created () {
    // general parameters
    this.productId = this.$route.params.id;
    this.isEditing = (!isEmpty(this.productId));
    // manufacturers
    this.getAllManufacturers()
      .catch(error => {
        const description = `ERROR getting the manufacturers: ${error}`;
        this.displayModal(true, 'ERROR', description, false);
      });
    // product information
    if (this.isEditing) {
      this.getProductById(this.productId)
        .then(() => {
          this.item = Object.assign({}, this.product);
          this.productManufacturer = {
            _id: this.item.manufacturer._id,
            name: this.item.manufacturer.name,
          };
        })
        .catch(error => {
          const description = `ERROR getting the product: ${error}`;
          this.displayModal(true, 'ERROR', description, false);
        });
    }
  },
};
</script>
