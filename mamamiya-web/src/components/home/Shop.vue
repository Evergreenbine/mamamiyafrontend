<template>
  <div id="shop" class="max-width margin-auto">
      <div class="left">
          <p>热门品牌</p>
          <div class="brandbigbox">
               <div class="brandbox" v-for="item in brandarr" :key="item">
                   <img :src="item.img" alt="">
               </div>
          </div>
         
      </div>
      <div></div>
  </div>
</template>

<script>

export default {
    name:'shop',
    data() {
        return {
            brandarr:[]
        }
    },
    async created() {
       const axios = this.$config.getAxiosInstance('shop')
       let res = await axios.get('/api/sellgoodbrandindex')
       this.brandarr = res.data
    },
   
}
</script>

<style lang="scss" scoped>

#shop{
    margin-top: 20px;
    height: 300px;
    // border: 1px solid blue;
  
    .left{
       
        width: 400px;
        height: inherit;
        border: 1px solid rgba(0, 162, 255, 0.247);
        p{  
            margin: 0;
            padding: 0;
            margin-top: 5px;
            color: pink;
            font-size: 25px;

        }
        .brandbigbox{
             display: flex;
             flex-wrap: wrap;
            .brandbox{
                width: 120px;
                height: 52px;
                // border: 1px solid gainsboro;
                margin-top: 9px;
                margin-left: 9px;
                cursor: pointer;
                img{
                    width: 118px;
                    height: 50px;
                }
            }
        }
      
    }
}
</style>