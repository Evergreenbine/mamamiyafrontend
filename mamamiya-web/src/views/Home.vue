<template>
  <div id="home d-flex al-start">
   <Header2/>
   <Common/>
   <knowledge/>
   <Community/>
   <Shop/>
   <router-view/>
  </div>
</template>

<script>
import Header2 from '../components/home/header'
import knowledge from '../components/home/knowledge'
import Shop from '../components/home/shop'
import Community from '../components/home/community'
import Knowledge from '../components/home/knowledge'
import Common from '../components/home/common'

export default {
  name: 'Home',
  components: {
    Header2,
    Shop,
    knowledge,
    Community,
    Common
  }
}
</script>
<style>

</style>
