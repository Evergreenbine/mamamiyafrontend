<template>
  <div id="shopindex" >
       <HeaderBar/>
       <!-- <Brand/> -->
       <router-view/>  
  </div>
</template>

<script>
import HeaderBar from '../home/HeaderBar'

export default {
  name:'shopindex',
  components:{
    HeaderBar
  }
}
</script>

<style>

</style>