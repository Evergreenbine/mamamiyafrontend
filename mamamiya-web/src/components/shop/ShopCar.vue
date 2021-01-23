<template>
  <div id="shopcar" class="max-width margin-auto position-re">
      <div class="shopnav">
          <div class="shopnav-item">全部商品</div>
          <div class="shopnav-item">库存紧张</div>
      </div>
      <div class="line max-widht margin-auto"></div>
      <div class="shopitems max-width margin-auto">
          <!-- 全部商品 -->
          <div id="allitem">
                <div class="item" v-for="(item,index) in 10" :key="index"></div>
          </div> 
          <!-- 紧张库存 -->
          <div id="queshaoitem">
         </div>    
   
    

      </div>
      <div id="dealplane" class="dealplane max-width margin-auto">   
          <input type="checkbox" class="allcheck"/>
          <div><p>全选</p></div>
          <div><p>删除</p></div>
          <div><p>清除失效宝贝</p></div>
          <div><p>移入收藏夹</p></div>
          <div class="toright">
          <div><p class="items">已选3件宝贝</p></div>
          <div><p class="acount">合计(不含运费)：100元</p></div>
          <div><p class="okok">结算</p></div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    methods: {
 
        // handleScroll () {
        //     var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        //     // var  offsetTop = document.getElementById("dealplane").offsetTop;
        //     let oo = document.getElementById("dealplane"); 
        //     // console.log(offsetTop);
            
        //     if(scrollTop > 0){
        //         oo.style.position = fixed;
        //     }
        // }
     
    },
    created() {
       
    }
    // mounted(){
    //     window.addEventListener('scroll',this.handleScroll)
    // }
}


</script>

<style lang="scss" scoped>
#shopcar{
    /* border: 1px solid gold; */
}
.shopnav{
    width: inherit;
}
/* 防止margin塌陷 */
.line{
    height: 2px;
    border: 2px solid rgb(226, 226, 226);
    clear: both;
    margin-bottom: 15px;
}
.shopnav-item{
    float: left;
    width: 150px;
    height: 45px;
    color: pink;
    font-size: 25px;
    line-height: 50px;
    margin-right: 10px;
}
.shopitems{
    /* border: 1px solid salmon; */
    
}
.item{
    border: 1px solid rgb(226, 226, 226);
    height: 150px;
    margin-top: 10px;
 
}
.dealplane{
    position: fixed;
    bottom: 0px;
    z-index: 1;
    height: 80px;
    border: 1px solid gainsboro;
    overflow: hidden;
    background-color: #fff;
}
.allcheck{
    float:left;
    width: 15px;
    height: 15px;
    margin-top: 30px;
    margin-left: 20px;
}
.dealplane{
    p{
        float: left;
        margin-top: 27px;
        margin-left: 15px;
    }
}


</style>