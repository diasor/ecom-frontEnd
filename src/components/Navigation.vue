<template>
    <div class="menu-top">
      <div class="navigation-row"><label class="navigation-title">e-Commerce</label></div>
      <div class="menu-row">
        <ul class="menu">
          <div class="col-left">
            <li><router-link active-class="active" :to='"/"'>Home</router-link></li>
            <!-- Admin's drop down menu -->
            <li>
              <a>Admin <i class="material-icons">arrow_drop_down</i></a>
              <ul>
                <li><router-link active-class="active" :to='"/admin-create-product"'>New</router-link></li>
                <li><router-link active-class="active" :to='"/admin-products"'>Products List</router-link></li>
                <li><router-link active-class="active" :to='"/admin-manufacturers"'>Manufacturers List</router-link></li>
              </ul>
            </li>
            <li><router-link active-class="active" :to='"/cart"'>Cart</router-link></li>
          </div>
          <div class="col-right">
            <!-- User's drop down menu -->
            <li v-if="isUserLogged">
              <a>{{ userName }} <i class="material-icons">arrow_drop_down</i></a>
              <ul>
                <li><a active-class="active" @click="logout()">LogOut</a></li>
              </ul>
            </li>
          </div>
        </ul>
      </div>
    </div>
</template>

<script>
import { isEmpty } from 'lodash';
import { mapState } from 'vuex';

export default {
  name: 'navigation',
  data: () => ({
    isUserLogged: false,
    userName: '',
  }),
  computed: {
    ...mapState({
      user: state => state.userState.user,
    }),
  },
  methods: {
    setUserName () {
      if ((!isEmpty(this.$auth.user)) && (!isEmpty(this.$auth.user.nickname))) {
        return this.$auth.user.nickname;
      }
      return '';
    },
    userLogged () {
      return ((!isEmpty(this.$auth.user)) && (!isEmpty(this.$auth.user.nickname)));
    },
    logout () {
      this.$auth.logout();
    },
  },
  created () {
    this.isUserLogged = this.userLogged();
    this.userName = this.setUserName();
  },
  watch: {
    user () {
      this.isUserLogged = ((!isEmpty(this.user)) && (!isEmpty(this.user.nickname)));
      this.userName = this.user.nickname;
    },
  },
};
</script>
