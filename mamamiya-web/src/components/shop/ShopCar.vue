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
                    <!-- wantitem是选中的数组 -->
                    <input type="checkbox" class="iswant" :value="item" v-model="wantitem" >
                    <img :src="item.img" alt="纳尼？我的图片去哪了？" class="itemimg">
                    <p class="iteminfo">{{item.rec}}</p>
                    <div class="selectinfo"></div>
                    <!-- <el-input-number v-model="item.count" @change="handleChange(item.count)" :min="1"  label="描述文字" class="countnums"></el-input-number> -->
                    <div class="countnums">
                        <div class="numsde" @click="numsde(index)" >-</div>
                        <div ><input class="numsinput" @change="numsinput(index)" type="number" :placeholder="item.count" v-model="item.count"  ></div>
                        <div class="numsplus" @click="numsplus(index)">+</div>
                    </div>
                    <p class="needprice">¥{{item.price*item.count}}</p>
                    <div class="buttons">
                     <el-button type="danger" @click="delitem(index)" >删除</el-button>
                     </div>
                </div>
          </div> 
        
          <!-- 紧张库存 -->
          <div id="queshaoitem">
         </div>    
   
    

      </div>
      <div id="dealplane" class="dealplane max-width margin-auto">   
          <input type="checkbox" class="allcheck"/>
          <div @change="iwantall"><p>全选</p></div>
          <div><p>删除</p></div>
          <!-- <div><p>清除失效宝贝</p></div> -->
          <!-- <div><p>移入收藏夹</p></div> -->
          <div class="toright">
          <div><p class="items">已选{{wantitem.length}}件宝贝</p></div>
          <div><p class="acount">合计(不含运费)：<span>{{this.summoney}}</span>元</p></div>
           <b-button variant="danger" style="margin-top:20px;width=100px" @click="purchase">结算</b-button>
           
          </div>
      </div>
  </div>
</template>

<script>
export default {
    data() {
            return {
                // 购物车信息
                shopcar2:[],
                // 选中的购物车
                wantitem:[],
                // 选中物品的总金额
                summoney:0,
                // 是否全选
                chekall:false
            }
        },
    watch:{
         numsinput(index){
           if(this.shopcar2[index].count<1){
               alert("商品数必须大于1")
               return;
           }else if(this.shopcar2[index].count > this.shopcar2[index].store){

           }
        },
        wantitem:function(val,oldVal){
        //    console.log(val);
        // ? 为啥要清零？因为我this.summoney 一直等于的是选中的数组的和
        // 如果不清零，它就会把变化前还存的数值加回去
         this.summoney = 0;
         var sum = 0
           for(var i=0;i<val.length;i++){
               
                sum += val[i].price*val[i].count
           }
           this.summoney = sum
        }
    },
    methods: {
        async purchase(){
            const axios = this.$config. getAxiosInstance('shop')
          

            // 第一步，未登录无法进入
            let useraccount = localStorage.getItem("username");

         
            // 第二步，生成订单，并进入支付页面
            let res = await axios({
                url:"/api/createorder",
                method:'post',
                data:this.wantitem,
                params:{
                    useraccount:useraccount,
                    needmoney:this.summoney
            }})
            // console.log(res.data);
            // 返回订单信息
            // console.log(res.data);
            let orderinfo = res.data.orderinfo
            // console.log(res.data);
        if(orderinfo.state == 2){
            // 支付成功
            alert("支付成功")
            this.shopcar2 = this.shopcar2.filter((x) => !this.wantitem.some((item) => x.gid === item.gid));
            localStorage.setItem('shopcar',JSON.stringify(this.shopcar2))
           
        }else if( orderinfo.state == 1){
            alert("支付失败")
        }

        this.$router.push({path:"/shop/orderdetail",query:{
            orderid:orderinfo.orderid
        }});


            // let res = await axios({
            //     url:'/api/milks/purchase',
            //     method:'post',
            //     data:this.wantitem,
            //     params:{
            //         useraccount:JSON.parse(localStorage.getItem('username')),
            //         needmoney:this.summoney
            //     }
            // })
            // if(res.data == 1){
            //     alert("支付成功")
            //     
            //     // this.$router.go(0)
            // }else{
            //     alert("支付失败")
            // }
        },
        // 需要添加bug
        // 传入index,再从购物车里面找到对应的item,然后--
        numsde(index){
            // 要处理下选中的物品的车车
             
            // alert(count)
            if(--this.shopcar2[index].count < 1 ){
               
                alert("商品被删除")
                  // 要处理下选中的物品的车车
                 for (var j = 0;j< this.wantitem.length;j++) {
                 console.log(this.wantitem[j].id);
                 if(this.shopcar2[index].gid == this.wantitem[j].gid){
                     this.wantitem.splice(j,1)
                     console.log(this.wantitem);
                 }
                 }
         
                // 后续再处理
                this.shopcar2.splice(index,1)
            }
            // 不同于上面的那个选定个的数组，这个checkbox双向绑定的是item,所以选定数组里的count也会改变，这也说明,watch它只会监听到数组的变化
            // 不会监听到数组里的元素的变化,所以我们再对选定的车进行求和就好
            // for (var j = 0;j< this.wantitem.length;j++) {
            //     //  console.log(this.wantitem[j].id);
            //      if(this.shopcar2[index].id == this.wantitem[j].id){
            //          alert(this.shopcar2[index].count)
            //          alert(this.wantitem[j].count)
                    
            //         //  this.wantitem[j].count = this.shopcar2[index].count
            //         //  this.wantitem.splice(j,1)
            //         //  console.log(this.wantitem);
            //      }
            // }
            // 因为选中的车也是双向绑定一个item,所以如果你改变购物车里的item，如果选中的车里面有这个物品，它也同时会被改变，所以就不用再判断选中的车里、
            // 是否有这个item，直接求和就行
           var sum = 0
           for(var i=0;i<this.wantitem.length;i++){
                sum += this.wantitem[i].price*this.wantitem[i].count
           }
        //    alert(sum)
           this.summoney = sum
           
            // 将新的购物车存到本地
            localStorage.setItem('shopcar',JSON.stringify(this.shopcar2))
            // console.log(this.shopcar2);
            // localStorage.setItem('')
        },
        numsplus(index){
            // alert(this.wantitem)
            if(++this.shopcar2[index].count > this.shopcar2[index].store){
                this.shopcar2[index].count--
                alert("超出库存")
            }
            var sum = 0
            for(var i=0;i<this.wantitem.length;i++){
                sum += this.wantitem[i].price*this.wantitem[i].count
            }
        //    alert(sum)
           this.summoney = sum
            localStorage.setItem('shopcar',JSON.stringify(this.shopcar2))
        },
        // 还有bug的地方
        // numsinput(index){
        //    if(this.shopcar2[index].count<1){

        //        alert("商品数必须大于1")
        //        return;
        //    }else if(this.shopcar2[index].count > this.shopcar2[index].store){

        //    }
        // },
        // 删除商品
        delitem(index){
            // console.log(this.wantitem[0].id);
            //   选中的车子里删除物品
            //  先要把选中的车子的物品找一下,看下有没有,我们再删除它
             for (var j = 0;j< this.wantitem.length;j++) {
                //  alert(this.wantitem[j])
                //  console.log(this.wantitem[j].id);
                 if(this.shopcar2[index].id == this.wantitem[j].id){
                     this.wantitem.splice(j,1)
                     console.log(this.wantitem);
                 }
             }
             
            // 购物车中删除商品
             this.shopcar2.splice(index,1)
             localStorage.setItem('shopcar',JSON.stringify(this.shopcar2))
            
           
        },
        iwantall(){
            let arr = document.getElementsByClassName("iswant")
            for(var i = 0;i<arr.length;i++){
                console.log(arr[i]);
            }
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

        },
    },
    
    created() {
        // 未登录无法进入组件
        let useraccount = JSON.parse(localStorage.getItem("username"))
        

    //  console.log(this.$store.state.shopcar);
        this.shopcar2 =this.$store.state.shopcar

        // 进入这个页面前，还要查询一下购物车中的商品是否失效了，比如说后端把这个商品删了，或者库存没了
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
         cursor: pointer;
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
    .acount{
        span{
            color: red;
            font-size: 20px;
            line-height: 20px;
        }
    }
}

</style>