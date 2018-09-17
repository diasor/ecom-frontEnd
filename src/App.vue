<template>
  <div id="app" class="outer-form">
    <div class="main-form">
      <navigation></navigation>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation';

export default {
  name: 'App',
  components: {
    Navigation,
  },
};
</script>

<!--Load in global css stylesheet-->
<style lang="scss" src="./assets/css/navigation.css"></style>
<style lang="scss" src="./assets/css/forms.css"></style>
<style lang="scss" src="./assets/css/grid.css"></style>
<style lang="scss" src="./assets/css/modal.css"></style>
<style lang="scss" src="./assets/css/product.css"></style>
