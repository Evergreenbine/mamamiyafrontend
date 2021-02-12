<template>
<div id="LoginIndex"  >

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
      
      // let username = localStorage.getItem('username');
      // // console.log(this.strutil.isBlank(username));
      // // 全局工具类
      // if(this.$strutil.isBlank(username) == false){
      //   this.$router.replace('/')
      // }
      
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