<template>
  <div id="quesindex" class="max-width margin-auto">
     <QuesHeadBar/>
     <router-view/>
  </div>
</template>

<script>
import QuesHeadBar from './QuesHeadBar'
export default {
    components:{
        QuesHeadBar
    }
}
</script>

<style lang="scss" scoped>

</style>