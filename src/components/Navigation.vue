<template>
    <div id="menu-top">
      <div class="navigation-row">
        <div class="col">
          <label class="navigation-title">e-Commerce</label>
        </div>
        <div class="col-right">
            <img class="navigation-logo" src='../assets/OnlineShoppingLogo.png'/>
        </div>
      </div>
      <ul id="menu">
        <!-- Display regular links -->
        <li><router-link active-class="active" :to='"/"'>Home</router-link></li>
        <!-- Admin's drop down menu -->
        <li>
          <a>Admin <i class="material-icons">arrow_drop_down</i></a>
          <ul>
            <li><router-link active-class="active" :to='"/admin-create"'>New</router-link></li>
            <li><router-link active-class="active" :to='"/admin-products"'>Product List</router-link></li>
          </ul>
        </li>
        <li><router-link active-class="active" :to='"/cart"'>Cart</router-link></li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'navigation',
};
</script>
