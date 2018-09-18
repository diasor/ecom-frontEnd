<template>
  <div class="inner-form">
    <div class="title">Manufacturers List </div>
    <div class="col l9 md9 sm12 xs12">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="manufacturer in manufacturers" :key="manufacturer._id">
            <td>{{manufacturer._id}}</td>
            <td>{{manufacturer.name}}</td>
            <td> Active </td>
            <td>
              <router-link :to="'/admin-edit-manufacturer/' + manufacturer._id">
                <img src="../../assets/edit.png" class="admin-icons">
              </router-link>
            </td>
            <td>
              <a @click="removeManufacturer(manufacturer._id)">
                <img src="../../assets/delete.png" class="admin-icons">
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="input-group new-button">
        <button class="button" @click.prevent="addManufacturer()">Add a Manufacturer </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AdminManufacturersList',
  computed: {
    ...mapState({
      manufacturers: state => state.manufacturersState.manufacturers,
    }),
  },
  methods: {
    ...mapActions('manufacturersState', [
      'getAllManufacturers', 'removeManufacturer',
    ]),
    deleteManufacturer (id) {
      this.removeManufacturer(id);
    },
    addManufacturer () {
      this.$router.push({ name: 'admin-create-manufacturer' });
    },
  },
  created () {
    // manufacturers
    this.getAllManufacturers()
      .catch(err => console.log('ERROR ', err));
  },
};
</script>
