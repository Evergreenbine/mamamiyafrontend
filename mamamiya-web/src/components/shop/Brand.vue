<template>
   <div id="brand" class="max-width margin-auto mb">
       <div id="section-logo"><p class="position-ab">热门品牌 </p></div>
       <div id="brandnav" class="max-width">
           <p class="bitem" v-for="(item,index) in brandarr" :key="index" @click="tosearch(item.bid)">
               {{item.bname}}
           </p>
        
           <p class="morebrand" @click="morebrand"> {{tag}} </p>
       </div>
   </div>
</template>

<script>
export default {
    name:'Brand',
    data(){
        return {
            brandarr:'',
            tag:"更多品牌"
        }
    },
    methods:{
        
        morebrand(){
            console.log(this.$route);
            if(this.$route.fullPath == "/shop/morebrand"){
                this.$router.push('/shop')
                this.tag="更多品牌 >>>"
            }else{
                this.$router.push('/shop/morebrand')
                this.tag = "收起品牌 <<<"
            }
          
        },
        tosearch(bid){
            // alert(bid)
        this.$router.push({path:'/shop/search',query:{bid:bid}})}
    },
    async mounted() {
       const axios = this.$config. getAxiosInstance('shop')
      
       let res = await axios.get('/api/sellgoodbrandindex')
       this.brandarr = res.data
    
    },
    created(){
     
    //    console.log(res.data.result[0][1]);
    //    this.brandarr = res.data.result
       if(this.$route.fullPath == "/shop/morebrand"){
                this.tag="收起品牌 <<<"
       }else{
                this.tag = "更多品牌 >>>"
        }
    }
}
</script>

<style scoped>
#brand{
    height: 85px;
    border: 1px solid pink;
}
#section-logo{
    position: relative;
}
#section-logo p{
    top: -30px;
    left: 10px;
    font-size: 30px;
    color: pink;
    background-color: #fff;
    margin-left: 10px;
    width: 150px;
}
#brandnav{
    margin-top: 15px;
    height: 30px;
    /* border: 1px solid orange; */
}
.bitem{
    display: inline-block;
    float: left;
    color: rgb(104, 104, 104);
    margin-left: 10px;
    cursor: pointer;
    border-right: 1px solid gainsboro;
    width: 100px;
    height: 20px;
    font-size: 13px;
    }
.bitem:hover{
    color: red;
}
 .bonone{
     border: none;
 } 
 .morebrand{
    display: inline-block;
    float: left;
    color: rgba(236, 13, 13, 0.61);
    margin-left: 10px;
    cursor: pointer;
    width: 100px;
    height: 24px;
    font-size: 15px;
 }  
</style>