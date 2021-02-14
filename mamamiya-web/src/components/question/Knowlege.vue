<template>
  <div>
      <h1 class="tttile">{{konwpost.title}}</h1>
      <div v-html="konwpost.content">{{konwpost.content}}</div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            konwpost:{

            }
        }
    },
    async created(){
        let kid = this.$route.query.kid
         const bbsaxios = this.$config.getAxiosInstance('bbs')
         let res = await bbsaxios.get(`/api/konw/${kid}`)
         this.konwpost= res.data
         console.log(res);
    }
}
</script>

<style lang="scss" scoped>
.tttile{
    margin-top: 20px;
    border-bottom: 1px solid gainsboro;
    padding-bottom: 20px;
    margin-bottom: 20px;
}
</style>