<template>
  <div id="header2" class="d-flex fd-row" >
      <div class="logo">Mamamiya</div>
      <div id="serchAndLogin">
        <div id="userinfo" v-show="headertag" class="d-flex fd-rowr">
          <p>你好呀,{{userinfo}}</p>
        </div>
        <div v-show="!headertag" class="login d-flex fd-rowr">
          <p class="word" @click="register">注册</p>
          <p class="word"  @click="login">登录</p>
        </div>
        <div class="serch">
          <input type="text" class="ser" v-model="content"/>
          <div class="btn">搜索</div>
        </div>
    </div>    
  </div>
</template>

<script>
export default {
    name:'header2',
    data(){
      return {
        content:"hah",
        userinfo:"",
        headertag:true
      }
    },
    methods: {
      login(){
        this.$router.replace({
          path:'/new/login',query:{}
        })
      },
      register(){
        this.$router.replace({
          path:'/new/register',query:{}
        })
      }
    },
    created(){
      this.userinfo = localStorage.getItem("username");
      if(this.userinfo){
        this.headertag = true
      }else{
        this.headertag = false
      }
    }
}
</script>

<style>
  #header2{
    margin:0px auto;
    margin-top: 20px;
    width: 1100px;
    height: 80px;
    background: rgba(245, 245, 239, 0);
    position: relative;
    margin-bottom: 20px;
  }
  .logo{
    position: absolute;;
    width: 200px;
    height: 100px;
    color: rgb(245, 151, 198);
    font-size: 100px;
    left: -50px; 
    top:-35px 
  }
  #userinfo{
    position: absolute;
    width: 500px;
    height: 30px;
    right: 0px; 
    color: rgb(183, 184, 185);
    margin-right: 10px;
  }
  .login{
    position: absolute;
    width: 500px;
    height: 30px;
    right: 0px;  
  }
  .word{
    display: block;
    margin-right: 10px;
    cursor: pointer;
    color: rgb(183, 184, 185);
  }
  .serch{
    position: absolute;
    width: 600px;
    height: 40px;
    border: 2px solid rgb(240, 241, 241);
    right: 0px;
    bottom: 0px;
  }
  .ser{
    position: absolute;
    width: 530px;
    height: 40px;
    left: 0px;
    bottom: 0px;
    border: none;
    font-size: 20px;
    color:rgb(149, 151, 153) ;
  }
  .btn{
    position: absolute;
    width: 68px;
    height: 40px;
    right: -2px;
    border-left: 2px solid rgb(240, 241, 241);
    cursor: pointer;
    bottom: 0px;
    text-align: center;
    color:rgb(240, 241, 241);
    line-height: 40px;
  }

</style>