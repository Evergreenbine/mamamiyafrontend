<template>
  <div id="HeaderBar" class="d-flex fd-row jc-center ">
    <div class="maxbar  margin-auto max-width position-re">
      <div class="logo postion-ab" @click="toto"><p>Mamamiya</p></div>
      <div class="loginbox position-ab">
        <router-link to='/new/login' class="lobtn" v-show="showtag">登录</router-link>
        <router-link to='/new/register' class="lobtn" v-show="showtag">注册</router-link>
        <div class="lobtn uu " v-show="!showtag" @mouseover="uishow = true" @mouseleave="uishow = false" :class="{bggray : uishow == true}">你好呀,{{username}} </div>   
         
         <div class="userinformation"  :class="{disnone : uishow == false }"  @mouseover="uishow = true" @mouseleave="uishow = false">
          <img class="avat" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"/>
          <div class="userplane">
            <a href="javascript::#" class="us-pl-item" @click="toUser">个人中心</a>
            <a href="javascript::#" class="us-pl-item" @click="toShopCar">我的购物车</a>
            <a href="javascript::#"  class="us-pl-item" @click="logout">退出</a>
          </div>
        </div>

      </div>
      <!-- <div class="userinfo position-ab">
          hello
      </div> -->
      <!-- <div class="user position-re">user <b-button variant="outline-primary">Button</b-button></div> -->
      <!-- <div class="search max-width position-ab">
        <div>
          <b-input-group>
          <b-form-input type="search" ></b-form-input>
          <b-input-group-append>
            <b-button variant="outline-secondary" style="z-index:0">搜索</b-button>
          </b-input-group-append>
          </b-input-group>
        </div> 
      </div> -->
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
      uishow:false,
      tag:"user"
    }
  },
  methods:{
    toto(){
      this.$router.push('/')
    },
    logout(){
      console.log("哈哈");
      localStorage.setItem('username','')
      localStorage.setItem('password','')
      localStorage.setItem('tokemn','')

      this.$store.state.user = {
            username: "",
            password: "",
            token: ''
      }
      window.location.reload();
       
    },
    toUser(){
      this.$router.push('/user')
    },
    toShopCar(){
      this.$router.replace('/shop/shopcar')
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
  right: 0px;
  width: 250px;
  /* border: 1px solid black; */
  z-index: 1;

}
.uu{
  font-size: 15px;
  float: right;
  color:#007bff ;
  /* background-color: rgba(176, 226, 255, 0.397); */
}
.disnone{
  display: none;
}

.bggray{
    background-color: rgb(233, 229, 229);
}
.userinformation{
  float: right;
  height: 96px;
  width: inherit;
  /* background-color: rgb(199, 241, 45); */
  background-color: rgb(233, 229, 229);
  position: relative;
  
}
.avat{
  width: 86px;
  height: 86px;
  position: absolute;
  left: 5px;
  top: 5px;  
  z-index: 1;
}
.userplane{
  width: 150px;
  height: 96px;
  /* background-color:gainsboro; */
  position: absolute;
  right: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
 
}
.us-pl-item{
  width: 200px;
  display: block;
  margin-top: 6px;
  text-decoration: none;
  cursor: pointer;

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
  height: 120px;
  /* border: 1px solid greenyellow; */
}


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

