<template>
  <div id="morebrand" class="max-width margin-auto" >
     <div id="pagenav" class="max-width margin-auto postion-re">
         <p  class="all position-ab">所有品牌 <i>(共{{this.total}}品牌 )</i></p>
         <!-- 分页导航-->
         <div class="brandnav position-ab margin-auto">
             <a class="brandnavitem" :href="'#'+item" v-for="(item,index) in tag" :key="index">{{item}}</a>
            
         </div>
        <!-- 品牌项目-->
         <div class="brand-items position-ab margin-auto max-width">
             <!-- 第一个 -->
             <div :id="item" v-for="(item,indexone) in tag" :key="indexone" class="brand-item max-width d-flex" >
                <div class="brand-item-logo position-re">
                    <h2>{{item}}</h2>
                </div>
                <!-- 品牌名 -->
                <div v-for="(item,index) in all[indexone]" :key="index" class="brandbrand" @click="tosearch(item.bid)">
                        {{item.bname}}
                </div>
                 <div class="bitem " style="border:none"></div>
             </div>
             
         </div>
          
     </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            total:'',
            tag:[
                'A','B','C','D','E','F','G','H','I','J','K','L','M','N',
                'O','P','Q','R','S','T','U','V','W','X','Y','Z'
            ],
            all:[]
        }
    },
    methods:{
        tosearch(bid){
            // alert(bid)
        this.$router.push({path:'/shop/search',query:{
        bid:bid
      }})}
    },
   async  created(){
       const axios = this.$config. getAxiosInstance('shop')
       let res = await axios.get('/api/brand/all');
       console.log(res);
       this.all = res.data.result
       this.total = res.data.total
    //    console.log(this.total);
    //    console.log(this.all[0]);
    //    console.log(res.data.result[0][1]);
    //    this.brandarr = res.data.result
    }
}
</script>

<style scoped>
#morebrand{
    /* height: 500px; */
    border: 1px solid pink;
}
#pagenav{
     position:relative;
}
/* logo*/
#pagenav p{
    display: inline-block;
    position:absolute;
    top: -30px;
    left: 10px;
    font-size: 30px;
    color: pink;
    background-color: #fff;
    margin-left: 10px;
    width: 240px;
}
#pagenav i{
    font-size: 15px;
}
/* 分页导航栏*/
.brandnav{
    top:15px;
    width: 910px;
    left: 100px;
}
.brandnavitem{
    display: inline-block;
    width: 35px;
    height: 35px;
    /* border: 1px solid pink; */
    line-height: 35px;
    text-decoration: none;
}
/* 实际的品牌列表*/
.brand-items{
    top: 100px;
    /* height: 100px; */
    /* border: 1px solid blue; */
}
.brand-item{
    height: 300px;
    /* border-top: 1px solid gray; */
    /* border: 1px solid blue; */
    margin-bottom: 20px;
}
.brand-item-logo{
    width: 100px;
    /* border: 1px solid #007bff; */
}
.brand-item-logo h2 {
    position: absolute;
    color: #007bff;
    top: -18px;
    left: 20px;

}
.bitem{
    border-top: 1.5px solid pink;
    width: 999px;
    height: 300px;
    /* border: 1px solid blue; */
    margin-bottom: 20px;
}
.brandbrand{
    width: 150px;
    height: 25px;
    color: #007bff;
    border-right: 1px solid gainsboro;
    cursor: pointer;
}
</style>

