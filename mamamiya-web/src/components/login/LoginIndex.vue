<template>
<div id="LoginIndex"  >
  
  <b-navbar toggleable="lg" type="light" variant="light" >
    <b-navbar-brand href="/">Mamamiya</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="d-flex jc-center">
        <b-nav-item href="#">知识</b-nav-item>
        <b-nav-item href="#" >论坛</b-nav-item>
        <b-nav-item href="#" >资讯</b-nav-item>
        <b-nav-item href="#" >商城</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
       
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

  <div class="container box" >
    <router-view/>  
  </div>
</div>
</template>

<script>
export default {
    name:"LoginIndex",
    data(){
      return{
      }
    }
}
</script>

<style scoped>
.box{
  margin-top: 100px;
  width: 1000px;
  height: 500px;
}
</style>