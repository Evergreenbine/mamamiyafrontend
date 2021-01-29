<template>
  <div id="userinfoma" class="max-width margin-auto">
    <div class="indextag">
      <div class="tag" @click="backindex"> 首页</div>
      <div class="tag"> 个人中心</div>
      <div class="tag"> 编辑资料</div>
    </div>
    <div class="infobox position-re">
      <div class="ingoimg position-ab">
         <img class="inoimga" v-bind:src="this.url" alt="">
      </div>
      <div class="detailinfo">
        <p>昵称</p>
         <div class="accountnam margin-auto"></div>
         <p>用户账号</p>
         <div class="address margin-auto"></div>
         <p>收货地址</p>
         <div class="address margin-auto"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:"user",
    data() {
      return { 
        url: 'https://gw.alicdn.com/img/bao/uploaded/i1/3096670448/O1CN01Ax9Jfl1FBDuTsjYYe_!!3096670448.jpg_300x300.jpg'
        ,
        handler:{
         router,
         okHandle:function () {
           console.log(this.router);
           this.router.push('/user')
         },
         failHandle:function(){
          this.router.push('/')
         }
       }
      }
    },
    methods: {
      backindex(){
        this.$router.push("/")
      }
    },
     created() {
      this.handler.router = this.$routers
       console.log(this.$router);
       handler.router = this.$router
       
      console.log(this.$lointe);
      this.$lointe.isLogin(handler)
     
    }
  
}
</script>

<style lang="scss" scoped>
#userinfoma{
  // border: 1px solid gainsboro;
  height: 500px;
  margin-top: 100px;
}
.indextag{
  float: left;
  width: 85px;
  height: inherit;
  // border: solid gold 1px;
}
.infobox{
  float: left;
  width: 998px;
  height: inherit;
  border: solid gainsboro 1px;
}
.ingoimg{
  left: 50px;
  top: 50px;
  width: 178px;
  height: 178px;
  // border: 1px solid blueviolet;
}
.inoimga{
  width: 178px;
  height: 178px;
  // border: 1px salmon solid;
  box-shadow: 1px silver;
}
.detailinfo{
  top: 50px;
  right: 120px;
  position: absolute;
  width: 550px;
  height: 500px;
  
  // border: 1px solid gold; 
}
.accountnam{
  width: 450px;
  height: 55px;
  border: 1px solid green;
}
.address{
  margin-top: 20px;
   width: 450px;
  height: 55px;
  border: 1px solid green;
}
.tag{
  cursor: pointer;
  margin-top: 15px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  width: 85px;
  height: 45px;
  border: 1px solid gainsboro;
  border-right: none;
  line-height: 45px;
}
p{
  margin: 0;
  padding: 0;
  margin-top: 3px;
}
</style>

