<template>
<div id="LoginIndex"  >
  
  <b-navbar toggleable="lg" type="light" variant="light" >
    <b-navbar-brand href="#" to="/">Mamamiya</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      
      <b-navbar-nav class="d-flex jc-center container">
        <b-nav-item href="#" class="bnavbox">知识</b-nav-item>
        <b-nav-item href="#" class="bnavbox">论坛</b-nav-item>
        <b-nav-item href="#" class="bnavbox">资讯</b-nav-item>
        <b-nav-item href="#" to="/shop" class="bnavbox">商城</b-nav-item>
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
    },
    methods:{
      
    },
    created(){
      
      let username = localStorage.getItem('username');
      // console.log(this.strutil.isBlank(username));
      // 全局工具类
      if(this.$strutil.isBlank(username) == false){
        this.$router.replace('/')
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
.bnavbox{
    width: 250px;
}
</style>