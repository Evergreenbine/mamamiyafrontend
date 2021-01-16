<template>
  <div id="shopindex" >
       <HeaderBar/>
       <Brand/>
       <router-view/>  
  </div>
</template>

<script>
import HeaderBar from '../home/HeaderBar'
import Brand from '../shop/Brand'
export default {
  name:'shopindex',
  components:{
    HeaderBar,
    Brand
  }
}
</script>

<style>

</style>