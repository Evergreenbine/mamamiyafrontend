<template>
  <div id="shopindex" class="max-width margin-auto">
       <LunBotu/>
       <Milk/>
       <Diapers/>
  </div>
</template>

<script>
import LunBotu from '../shop/lunbotu'
import Milk from '../shop/catagory/Milk'
import Diapers from '../shop/catagory/Diapers'
export default {
    name:"commodity",
    components:{
        LunBotu,Milk,Diapers
    }
}
</script>

<style>

</style>