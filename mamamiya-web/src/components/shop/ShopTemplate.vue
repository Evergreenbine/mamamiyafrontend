<template>
  <div id="shopindex" class="max-width margin-auto">
       <LunBotu/>
       <Milk/>
  </div>
</template>

<script>
import LunBotu from '../shop/lunbotu'
import Milk from '../shop/catagory/Milk'
export default {
    name:"commodity",
    components:{
        LunBotu,Milk
    }
}
</script>

<style>

</style>