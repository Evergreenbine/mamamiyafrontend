<template>
  <div id="HeaderBar" class="d-flex fd-row jc-center ">
    <div class="maxbar  margin-auto max-width position-re">
      <div class="logo postion-ab"><p>Mamamiya</p></div>
      <div class="loginbox position-ab">
        <router-link to='/new/login' class="lobtn">登录</router-link>
        <router-link to='/new/login' class="lobtn">注册</router-link>
      </div>
      <!-- <div class="user position-re">user <b-button variant="outline-primary">Button</b-button></div> -->
      <div class="search max-width position-ab">
        <div>
          <b-input-group>
        
          <b-form-input type="search" ></b-form-input>

          <b-input-group-append>
            <b-button variant="outline-secondary">搜索</b-button>
          </b-input-group-append>
         </b-input-group>
      </div>
      
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.maxbar{
  height: 200px;
}
.logo{
  color: pink;
  font-size: 65px;
  width: 300px;
  }
.loginbox{
  top: 45px;
  right: -70px;
  width: 300px;
  
} 
.lobtn{
  right: 0;
  margin-left: 20px;
}
.user{
  flex-grow: 6;
  border: 1px solid blue;
}
.search{
  width: 1000px;
  left: 50px ;
}
</style>

