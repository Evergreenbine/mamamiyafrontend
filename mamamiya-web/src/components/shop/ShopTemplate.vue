<template>
  <div id="shopindex" class="max-width margin-auto">
       <Brand/>
       <router-view/>
      
  </div>
</template>

<script>

import Brand from '../shop/Brand'
export default {
    name:"commodity",
    components:{
        Brand
    }
}
</script>

<style>

</style>