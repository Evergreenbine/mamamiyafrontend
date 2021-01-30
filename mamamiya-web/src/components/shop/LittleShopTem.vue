<template>
  <div id="littleShopTem">
       <!-- <LunBotu/> -->
       <Milk/>
       <Diapers/>
  </div>
</template>

<script>
import LunBotu from '../shop/lunbotu'
import Milk from '../shop/catagory/Milk'
import Diapers from '../shop/catagory/Diapers'
export default {
components:{
        LunBotu,Milk,Diapers
    }
}
</script>

<style scoped>

</style>