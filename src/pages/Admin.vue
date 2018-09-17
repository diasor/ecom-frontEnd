<template>
  <div class="inner-form">
    <div class="title">
      <h1>{{ msg }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'admin',
  data: () => ({
    msg: 'Welcome to the Admin page',
  }),
};
</script>
