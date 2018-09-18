<template>
    <div class="inner-form">
      <div class="row">
        <div class="title">
          <label v-if="isEditing" class="title">Update a Manufacturer</label>
          <label v-else class="title">Create a new Manufacturer</label>
        </div>
        <div class="col l5 m5 s12 xs12">
          <div v-if="isEditing" class="input-group">
            <label> Id </label>
            <input type="text" v-model="item._id" name="id" class="form-control">
          </div>
          <div class="input-group">
            <label> Name </label>
            <input type="text" placeholder="Manufacturer's Name" v-model="item.name" v-validate="'required'" name="name"
              :class="{'form-control': true, 'error': errors.has('name') }">
            <label class="text-danger" v-show="errors.has('name')">Name is required</label>
          </div>
          <div class="input-group new-button">
            <button v-if="isEditing" class="button" @click.prevent="addUpdateThisManufacturer()">Update Manufacturer</button>
            <button v-else class="button" @click.prevent="addUpdateThisManufacturer()">Add Manufacturer</button>
            <button class="button" @click.prevent="close()">Close</button>
          </div>
        </div>
        <modal-message
          :showModal = "manufacturerModal.showModal"
          :title = "manufacturerModal.title"
          :description = "manufacturerModal.description"
          :confirmBtnLabel = "manufacturerModal.closeLabel"
          @confirmClick = "confirmClick()"
          @cancelClick = "confirmClick()"
        ></modal-message>
      </div>
    </div>
</template>

<script>
import { isEmpty } from 'lodash';
import { mapState, mapActions } from 'vuex';
import ModalMessage from '../../components/ModalMessage';

export default {
  name: 'ManufacturerForm',
  components: {
    ModalMessage,
  },
  data: () => ({
    item: {},
    isEditing: false,
    manufacturerModal: {
      showModal: false,
      title: 'Manufacturer created',
      description: '',
      closeLabel: 'OK',
    },
    closeModal: false,
  }),
  computed: {
    ...mapState({
      manufacturers: state => state.manufacturersState.manufacturers,
      manufacturer: state => state.manufacturersState.manufacturer,
    }),
  },
  methods: {
    ...mapActions('manufacturersState', [
      'getManufacturerById', 'getAllManufacturers', 'addManufacturer', 'updateManufacturer',
    ]),
    addUpdateThisManufacturer () {
      this.$validator.validateAll()
        .then(result => {
          if (!result) {
            const description = `Please ensure the form is valid: ${result}`;
            this.displayModal(true, 'Validation Error', description, false);
          } else {
            let description = '';
            let method = '';
            if (this.isEditing) {
              method = 'manufacturersState/updateManufacturer';
              description = `The manufacturer  ${this.item.name} has been succesfully updated. `;
            } else {
              method = 'manufacturersState/addManufacturer';
              description = `The manufacturer  ${this.item.name} has been succesfully created. `;
            }
            this.$store.dispatch(method, this.item)
              .then(() => {
                this.displayModal(true, 'Create Manufacturer', description, true);
              })
              .catch(error => console.log('ERROR ', error));
          }
        })
        .catch(error => {
          const description = `Please ensure the form is valid: ${error}`;
          this.displayModal(true, 'Validation Error', description, false);
        });
    },
    confirmClick () {
      if (this.closeModal) {
        this.$router.push({ name: 'admin-manufacturers' });
      } else this.manufacturerModal.showModal = false;
    },
    close () {
      this.$router.push({ name: 'admin-manufacturers' });
    },
    displayModal (showModal, title, description, closeModal) {
      this.manufacturerModal.showModal = showModal;
      this.manufacturerModal.title = title;
      this.manufacturerModal.description = description;
      this.closeModal = closeModal;
    },
  },
  created () {
    this.isEditing = (!isEmpty(this.$route.params.id));

    // manufacturer's information
    if (this.isEditing) {
      this.getManufacturerById(this.$route.params.id)
        .then(() => {
          this.item = Object.assign({}, this.manufacturer);
        })
        .catch(err => {
          const description = `The manufacturer  ${this.item.id} could not be retrieved. Error: ${err} `;
          this.displayModal(true, 'Validation Error', description, true);
        });
    }
  },
};
</script>
