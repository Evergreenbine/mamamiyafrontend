<template>
  <div >
   <HeaderBar/>
   <Common/>
   <router-view/>
  </div>
</template>

<script>
import HeaderBar from '../components/home/HeaderBar'
import Common from '../components/home/Common'
export default {
  name: 'Home',
  components: {
    HeaderBar,
    Common
  }
}
</script>
<style>

</style>
