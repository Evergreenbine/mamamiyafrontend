<template>
  <div id="bbsheader" class=" margin-auto">
        <div class="bbslogo"><p>mama论坛</p></div>
        <div class="hobby">
            <div id="bbscenter" class="max-width margin-auto">
                <div class="hobbynav max-width margin-auto d-flex  fd-row"  >
                    <div class="hobbyitem" v-for="item  in this.circle" :key="item.cid" @click="tothequan(item.cid)">{{item.cname}}</div>
                   
                    <div class=" hobbyitemmores" @mouseover="mid = true" @mouseleave="mid = false" :class="{hobbyitemmore : mid == true}">更多圈子</div>  
                </div>
                <div id="morequan"  class="morequan max-width margin-auto"  v-show="this.mid == 1" @mouseover="mid = true" @mouseleave="mid = false">
                    geng
                </div>
            </div>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            //控制更多圈子的变量
            mid:0,
            circle:[]
        }
    },
    methods:{
        showmorequan(){
           if(this.mid == 1){
               this.mid = 0
           }else{
               this.mid =1
           }
          
        },
        tothequan(val){
            this.$router.push({path:'/bbs/post',query:{
                cid:val
            }})
        }
    },
   async created(){
       const bbsaxios = this.$config.getAxiosInstance('bbs')
       let resp = await bbsaxios.get('/api/circle')
       let result = resp.data.result
       this.circle = result
    }
}
</script>

<style lang="scss" scoped>

.hobby {
    
      margin-top: 50px;
      height: 45px;
      background-color: rgb(136, 215, 252);
      .bbslogo{
          width: 200px;
      }
      .hobbyitem{
          cursor: pointer;
          color: aliceblue;
          width: 150px;
          line-height: 45px;
          font-weight: 500;
      } 
      .hobbyitem:hover{
          background-color:rgb(129, 197, 228);
      }
       .hobbyitemmores{
            cursor: pointer;
          color: aliceblue;
          width: 150px;
          line-height: 45px;
          font-weight: 500;
       }
      .hobbyitemmore{
          background-color:rgb(255, 255, 255);
          color: rgba(0, 0, 0, 0.205);
          width: 150px;
      }
      
    
    //   更多圈子展示
    .morequan{
        position: absolute;
        height: 200px;
        // border: 1px solid greenyellow;
        z-index: 1;
        background-color: #fff;
    }
}


</style>

