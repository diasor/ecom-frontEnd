<template>
  <div class="callback">Callback</div>
</template>

<script>
import { isEmpty } from 'lodash';
import { mapMutations } from 'vuex';
import userState from '@/store/modules/userState';

export default {
  name: 'callback',
  methods: {
    ...mapMutations('userState', {
      loginUser: userState.mutationTypes.LOGIN_USER,
    }),
  },
  mounted () {
    this.$auth.handleAuthentication()
      .then((data) => {
        if (!isEmpty(data)) {
          this.loginUser(data.idTokenPayload);
          this.$router.push({ name: 'home' });
        } else this.$auth.login();
      })
      .catch(error => {
        console.log('error ', error);
      });
  },
};
</script>
