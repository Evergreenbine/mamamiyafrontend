<template>
  <div id="HeaderBar" class="d-flex fd-row jc-center ">
    <div class="maxbar  margin-auto max-width position-re">
      <div class="logo postion-ab" @click="toto"><p>Mamamiya</p></div>
      <div class="loginbox position-ab">
        <router-link to='/new/login' class="lobtn" v-show="showtag">登录</router-link>
        <router-link to='/new/register' class="lobtn" v-show="showtag">注册</router-link>
        <router-link to='/user' class="lobtn uu " v-show="!showtag">你好呀,{{username}}
        <div class="userinformation">
          <!-- <img class="avat" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"/> -->
        </div>
        </router-link>   
      </div>
      <!-- <div class="userinfo position-ab">
          hello
      </div> -->
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
  name:"HeaderBar",
  data(){
    return {
      username:"",
      showtag:true,
    }
  },
  methods:{
    toto(){
      this.$router.push('/')
    }
  },
  created(){
    this.username = localStorage.getItem("username");
    if(this.username != null && this.username !=""){
      this.showtag=false;
    }
  }

}
</script>

<style scoped>
.maxbar{
  height: 200px;
  /* border: 1px solid orange; */
}
.logo{
  color: pink;
  font-size: 65px;
  width: 300px;
  }
.logo p{
 cursor: pointer;
}

.loginbox{
  top: 25px;
  right: -70px;
  width: 300px;
  /* border: 1px solid black; */
}
/* .userinfo{
  right: -70px;
  width: 300px;
  top: 70px;
  border: 1px solid black;
  border-top: none;
  height: 80px;
  z-index: 1;
} */

.lobtn{
  right: 0;
  margin-left: 20px;
  text-decoration: none;
}
.loginbox{
  cursor: pointer;
  height: 85px;
  /* border: 1px solid black; */
}
/* .userinformation{
  position: relative;
  width: 300px;
  height: 60px;
  border-top: 1px solid gray;
} */

/* .avat{
  position:absolute;
  left: 0px;
  width: 60px;
  height: 60px;
} */
.user{
  flex-grow: 6;
  border: 1px solid blue;
}
.search{
  width: 1000px;
  left: 50px ;
}
</style>

