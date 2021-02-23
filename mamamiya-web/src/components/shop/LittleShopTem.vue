<template>
  <div id="littleShopTem">
       <!-- <LunBotu/> -->
       <Milk/>
       <Diapers/>
        <Food/>
       <Feeding/>
  </div>
</template>

<script>
import LunBotu from '../shop/lunbotu'
import Milk from '../shop/catagory/Milk'
import Diapers from '../shop/catagory/Diapers'
import Food from '../shop/catagory/Food'
import Feeding from '../shop/catagory/Feeding'
export default {
components:{
        LunBotu,Milk,Diapers,Food,Feeding
    }
}
</script>

<style scoped>

</style>