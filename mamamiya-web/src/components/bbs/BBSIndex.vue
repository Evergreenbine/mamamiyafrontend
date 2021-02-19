<template>
  <div id="bbs">
      <ToBar/>
       <h2 class="logo"> mamamiya资源区</h2>
       <div class="search"></div>
      <div class="newsbox max-width margin-auto">
        
          <div class="newsboxleft">
                <div class="box" v-for="item in res" :key="item.icid">
                    <!-- 报告解读里面的盒子 -->
                    <div class="tagbox">
                        <p class="tagname">{{item[0].tagname}}</p>
                    </div>
                   
                    <!-- 它下面的盒子 -->
                    <div class="bottombox">
                        <p class="ttt" v-for="(item2,index) in item.slice(0,5)"  :key="index">
                            <router-link :to="'/'"> {{item2.title}}</router-link>
                            </p>
                    </div>
                </div>   
          </div>
          <div class="newboxright">

          </div>
      </div>
      <div class="resource max-width margin-auto"></div>
  </div>
</template>

<script>
import ToBar from '../TopBar'
export default {
    data() {
        return {
            res:[]
        }
    },
    components:{
      ToBar
    },
    async created(){
        const bbsaxios = this.$config.getAxiosInstance('bbs')
        let res = await bbsaxios.get("/api/getAllNews")
        this.res = res.data
    }
}
</script>

<style lang="scss" scoped>
.logo{
   text-align: left;
   margin-left: 100px;
   margin-top: 20px;
   color: #FF7484;
}
.search{
    margin-top: 30px;
    width: inherit;
    height: 50px;
    background-color: #FF7484;
}
// 资讯盒子
.newsbox{
    margin-top: 30px;
    height: auto;
    // border: 1px solid gainsboro;
    display: flex;
    .newsboxleft{
        width: 800px;
        height: auto;
        border: 1px solid gainsboro;
        display: flex;
        flex-wrap: wrap;
        
        .box{
            width: 320px;
            height: 300px;
            border: 1px solid gainsboro;
            margin: 35px;
            position: relative;
            .tagbox{
                width: 317px;
                height: 40px;
                line-height: 40px;
                font-size: 20px;
                color:#FF7484;
                // background-color:gainsboro;
            
               
            }
           
            .bottombox{
                width: inherit;
                height: 260px;
                // border: 1px solid greenyellow;
               .ttt{
                   width: 315px;
                   color: rgb(112, 110, 110);
                   overflow: hidden;
                   margin-top: 0px;
               }
               
            }
        }
       
    }
    .newboxright{
        width: 297px;
        height: 500px;
        border: 1px solid gold;
    }
}
// 资源盒子
.resource{
    margin-top: 80px;
    height: 500px;
    border: 1px solid gold;
    margin-bottom: 100px;
}
</style>