<template>
  <div >
   <HeaderBar/>
   <Common/>
   <Shop/>
   
   
   <router-view/>
  </div>
</template>

<script>
import HeaderBar from '../components/home/HeaderBar'
import Common from '../components/home/Common'
import Community from '../components/home/Community'
import Shop from '../components/home/Shop'
import Konwleage from '../components/home/Konwleage'
import Footter from '../components/home/Footter'
export default {
  name: 'Home',
  components: {
    HeaderBar,
    Common,
    Community,
    Shop,
    Footter

  }
}
</script>
<style>

</style>
