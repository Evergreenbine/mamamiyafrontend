<template>
  <div id="shopcar" class="max-width margin-auto position-re">
      <div class="shopnav">
          <div class="shopnav-item">全部商品</div>
          <!-- <div class="shopnav-item">库存紧张</div> -->
      </div>
      <div class="line max-widht margin-auto"></div>
      <div class="shopitems max-width margin-auto">
          <!-- 全部商品 -->
          <div id="allitem">
                <div class="item" v-for="(item,index) in  shopcar2" :key="index" >
                    <input type="checkbox" class="iswant">
                    <img :src="item.img" alt="纳尼？我的图片去哪了？" class="itemimg">
                    <p class="iteminfo">{{item.rec}}</p>
                    <div class="selectinfo"></div>
                    <!-- <el-input-number v-model="item.count" @change="handleChange(item.count)" :min="1"  label="描述文字" class="countnums"></el-input-number> -->
                    <div class="countnums">
                        <div class="numsde" @click="numsde(item.count)" >-</div>
                        <div ><input class="numsinput" type="text" :placeholder="item.count" ></div>
                        <div class="numsplus" @click="numsplus(item.count)">+</div>
                    </div>
                    <p class="needprice">¥{{item.price*item.count}}</p>
                    <div class="buttons">
                     <el-button type="danger" >删除</el-button>
                     </div>
                </div>
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
           <b-button variant="danger" style="margin-top:20px;width=100px">结算</b-button>
           
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data() {
            return {
                // 购物车信息
                shopcar2:[]
            }
        },
    methods: {
        numsde(count){
            alert(count)
            count--;
        },

        handleScroll () {
            // var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop

           let scrollTop = document.documentElement.scrollTop;
           let scrollHeight = document.documentElement.scrollHeight;
           let clientHeight = document.documentElement.clientHeight;
      
           let ele = document.getElementById("dealplane");
        //    console.log(scrollHeight - scrollTop );
        //    这 "=" 超级重要,因为没有等号的话，好到到达300，样式改变，导致要滑动的距离又增长，结果出现死循环而发生卡屏
           if(scrollHeight - scrollTop <= clientHeight+500){
                ele.style.position = "static";
               
           }else {
               ele.style.position = "fixed";
            //    ele.style.margin=0;
           }

        }
     
    },
    created() {
     
    //  console.log(this.$store.state.shopcar);
    this.shopcar2 =this.$store.state.shopcar
      
  
    },
    mounted(){
      
        window.addEventListener('scroll',this.handleScroll)
        
    }
}


</script>

<style lang="scss" scoped>
// 购物车最大盒子
#shopcar{
    /* border: 1px solid gold; */
}
// 
.shopnav{
    width: inherit;
}
/* 防止margin塌陷 下面那条横线 */
.line{
    height: 2px;
    border: 2px solid rgb(226, 226, 226);
    clear: both;
    margin-bottom: 15px;
}
// 全部商品 库存紧张
.shopnav-item{
    float: left;
    width: 150px;
    height: 45px;
    color: pink;
    font-size: 25px;
    line-height: 50px;
    margin-right: 10px;
}
// 每个物品的大框
.shopitems{
    /* border: 1px solid salmon; */
    
}
// 每个物品
.item{
    border: 1px solid rgb(226, 226, 226);
    height: 150px;
    margin-top: 10px;
 
}
// 每个item栏里的样式
.iswant{
    float: left;
    margin-top:25px;
    margin-left: 35px;
}
.itemimg{
    float: left;
    width: 100px;
    height: 100px;
    margin-top: 25px;
    margin-left: 20px;
    text-decoration: none;
    
}
// 商品的推荐语
.iteminfo{
    float: left;
    margin-top: 25px;
    margin-left: 25px;
    width: 250px;
    // border: 1px solid greenyellow;
}
.selectinfo{
    float: left;
    width: 200px;
    margin-top: 25px;
    height: 100px;
    margin-left: 25px;
    // border: 1px solid goldenrod;
}
// 算商品的数量的
.countnums{
    float: left;
    margin-top: 25px;
    margin-left: 20px;
    // border: 1px solid seagreen;
    width: 200px;
    height: 45px;
}
.countnums{
    .numsde{
        float: left;
        width: 45px;
        height: 45px;
        border: 1px solid#75758B;
        font-size: 35px;
        line-height: 35px;
         color: #75758B;
         cursor: pointer;
    }
    .numsplus{
        float: left;
        width: 45px;
        height: 45px;
        border: 1px solid #75758B;
        font-size: 25px;
        line-height: 40px;
         color: #75758B;
    }
    .numsinput{
        cursor: pointer;
        display: block;
        float: left;
        width: 105px;
        height: 45px;
          border: 1px solid#75758B;
          border-left: none;
          border-right: none;
          text-align: center;
          font-size: 20px;
          color: #75758B;
          text-decoration: none;
          outline: none;
    }
   
}
.needprice{
    float: left;
    width: 50px;
    margin-top: 25px;
    margin-left: 10px;
    color:red;
    margin-left: 20px;
    font-size: 22px;
}
.buttons{
    margin: 25px;
}
// 这是下面结算栏的样式
#dealplane{
    // display: none;
    // position: fixed;
    margin-top: 80px;
    bottom: 0px;
    z-index: 1;
    height: 80px;
    border: 1px solid gainsboro;
    overflow: hidden;
    background-color: #fff;
    // margin-bottom: 100px;
}
.allcheck{
    float:left;
    width: 15px;
    height: 15px;
    margin-top: 30px;
    margin-left: 20px;
}
.dealplane{
     .toright{
         width: 450px;
         float: right;
     }
}
.dealplane{
    p{
        float: left;
        margin-top: 27px;
        margin-left: 15px;
    }
}

</style>