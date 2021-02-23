<template>
  <div id="milkSelect" class="max-width margin-auto">
    <div id="tagnav">
    <div class="tag d-flex ">
      <p class="tagname "  @click="cid = ''">用品分类</p>
      <p class="tag-item" v-for="(item,index) in cataarr" :key="index" :class="{con : index === cid}" 
      @click="cid = index" >{{item}}</p>
      
    </div> 

    <div class="tag d-flex">
      <p class="tagname" @click="sid = ''">适用人群</p>
      <p class="tag-item" v-for="(item,index) in stage" :key="index" :class="{con : index === sid}" 
      @click="sid = index">{{item}}</p>
    </div> 
    <div class="tag d-flex flex-wrap">
      <p class="tagname" @click="bid = -1">品牌</p>
      <div class="brandbox d-flex flex-wrap">
        <!-- 这里注意下,到时需要绑定的是index坐标对应的bid -->
      <p class="tag-item bitem" v-for="(item,index) in brand" :key="index" :class="{con : index === bid}"  @click="bid = index"
      >{{item.bname}}</p>
      <p class="more" @click="showmorebrand"> {{ moreb == 0 ?"更多 >>":"收起<<"}}</p>
      </div>
      
    </div> 

    <div class="tag d-flex">
      <p class="tagname" @click="aid = ''">适用年龄</p>
      <p class="tag-item" v-for="(item,index) in age" :key="index" @click="aid = index" :class="{con : index === aid}" >{{item}}</p>
    </div> 

   

    <!-- <div class="tag max-width"><p class="tagname">阶段</p></div>
    <div class="tag max-width"><p class="tagname">品牌</p></div>
    <div class="tag max-width"><p class="tagname">年龄</p></div>
    <div class="tag max-width"><p class="tagname">价格</p></div> -->
  </div>

  <div id="listmilk" class="max-width margin-auto d-flex flex-wrap">
    <div v-for="(item,index) in itemsarr" :key="index">
    <div class="cardbox position-re">
      <img :src="item.img" class="cardimg"/>
      <p class="price">
       ¥ {{item.price}}
      </p>
      <p class="title">{{item.recommend}}</p>
      <p class="cardbrand">{{item.bname}}</p>
      <div class="button" @click="toShopCar(item)">加入购物车</div>
      <el-rate
  v-model="item.rate"
  disabled
  show-score
  text-color="#ff9900"
  score-template="{value}" class="elrate">
</el-rate>
    </div>

  </div>

  </div>
  </div>
</template>

<script>

export default {
  name:"milkSelect",
  data() {
    return {
       // 分类条件样式条件变量
      cid :'',
      // 阶段条件变量
       sid:'',
       // 品牌的条件变量
       bid:'',
       // 年龄段的id
       aid:'',
       // 价格的id
       pid:'',
      //  参数构造对象，因为watch监听不到对象内属性值的变化，故上面的变量是用于监听变化的，变化了就赋值给params对象
      // 我们传给后端传的是一整个params条件对象,即保持一个一个选中状态的中间参数对象
      params:{
         cata :'',
      // 阶段条件变量
         stage:'',
       // 品牌的条件变量
       bid:'',
       // 年龄段的id
       age:'',
       // 价格的id
       pid:-1,
       gcid:3
      },

      // 展示更多条件变量
      more:0,
      // 展示更多品牌的样式变量
      moreb:0,
      // 价格输入样式条件变量
      imactive:false,
      inputhidden:false,
      count:0,
      // 条件数字 条件以这里为准
      cataarr:['口水巾/三角巾/毛巾','叉/勺/筷','碗/碟/盘','奶嘴咬咬乐','耳勺','婴儿衣服','婴童毛巾'],
      stage:['新生儿','幼儿','通用'],
      age:[
          "0 - 6 个月",  
          "7 - 12 个月",
          "1 - 3 岁",
          "3 - 6 岁"
      ] ,
       brand:[],
      price:['0 - 100 元','100 - 200 元','200 -300 元','300 - 400 元'],
      // 默认列表数组
      itemsarr:[],
      priceval:[],
      // 购物车
      shopcar:''
     
    }
  },
  watch:{
    // 尿布分类
     cid:async function(val,oldVal){
       this.params.cata =val
       const axios = this.$config. getAxiosInstance('shop');
       let res = await axios({
         url:'/api/milk',
         methods:'get',
           params:{
           cata:this.params.cata,
           stage:this.params.stage,
           age:this.params.age,
           bid:this.params.bid,
           gcid:3
          
        }
       })
       this.itemsarr = res.data.result
       console.log(res.data);
     },
    //  阶段
     sid:async function(val,oldVal){
       this.params.stage =val
       const axios = this.$config. getAxiosInstance('shop');
       let res = await axios({
         url:'/api/milk',
         methods:'get',
          params:{
           cata:this.params.cata,
           stage:this.params.stage,
            age:this.params.age,
            bid:this.params.bid,
            gcid:3
        }
       })
       this.itemsarr = res.data.result
       console.log(res.data);
     },
    //  年龄段
     aid:async function(val,oldVal){
       this.params.age= val
        const axios = this.$config. getAxiosInstance('shop');
       let res = await axios({
         url:'/api/milk',
         methods:'get',
          params:{
           cata:this.params.cata,
           stage:this.params.stage,
            age:this.params.age,
            bid:this.params.bid,
            gcid:3
          
        }
       })
       this.itemsarr = res.data.result
       console.log(res.data);
     },
     bid:async function (val,oldVal){
       console.log(val);
       if(val == -1){
         this.params.bid = ''
       }else{
        this.params.bid = this.brand[val].bid
       }
      // alert(this.brand[val].bname + this.brand[val].bid );
      //  console.log(this.params.bid);
  
      const axios = this.$config. getAxiosInstance('shop');
       let res = await axios({
         url:'/api/milk',
         methods:'get',
         params:{
            cata:this.params.cata,
            stage:this.params.stage,
            age:this.params.age,
            bid:this.params.bid,
            gcid:3
        }
       })
       this.itemsarr = res.data.result
       console.log(res.data);
     }

  },
  methods: {
    // input 显示控制方法
    input(){
      if( this.count % 10 == 0){
        this.count = 1;
        this.imactive = true;
        this.inputhidden = true;
        
      }else{
        this.count = 0;
        this.imactive = false;
        this.inputhidden = false;
      } 
    },
    // 更多品牌显示控制方法
    async showmorebrand(){
      if(this.moreb == 0){
      const axios = this.$config. getAxiosInstance('shop');
      let res = await axios({
         url:'/api/brand',
         method:'get',
         params:{
           gcid:3,
           limit:0
         }
         });
      this.brand=  res.data.resp
        this.moreb=5
      }else{
         const axios = this.$config. getAxiosInstance('shop');
      let res = await axios({
         url:'/api/brand',
         method:'get',
         params:{
           gcid:3,
           limit:5
         }
         });
      this.brand=  res.data.resp
      this.moreb = 0
      }
    },
    
    selectsta(index){
      this.sid = index;
    },
    // 购物车
    toShopCar(item){
      
      // 拼接购物车item
      var goods = {
        gid:item.gid,
        price:item.price,
        count:item.count,
        img:item.img,
        rec:item.recommend,
        store:item.store
      }
  
      // 丢到vuex
      this.$store.commit('increase',goods)

      // console.log(goods);
      // // this.$store.commit('increase',item)
      // console.log(this.shopcar);

    }
  },
 
  async created(){
    // 购物车逻辑
      //  this.shopcar = localStorage.getItem("shopset")
      //  console.log(this.shopcar);
       const axios = this.$config. getAxiosInstance('shop')
      //  查出所有商品
       let res = await axios({url:'/api/milk',params:{gcid:3}});
       this.itemsarr = res.data.result
      //  初始化每件商品的购物车数量
       for(let item of this.itemsarr){
        //  console.log("分界线");
        //  console.log(item);
         item.count = 0;
       }
       let resbrand = await axios({
         url:'/api/brand',
         method:'get',
         params:{
           gcid:3,
           limit:5
         }
         });
       this.brand = resbrand.data.resp
      
      //  console.log(this.items);
  }

}
</script>

<style  scoped>
#milkSelect{
  /* border: 1px solid slateblue; */
}
.tag{
  border-bottom: 1px solid  rgba(93, 155, 247, 0.26);
  margin-bottom: 5px;
  /* border: 1px solid black; */
}
.tagname{
  width: 150px;
  height: 30px;
  line-height: 30px;
  background-color: rgba(93, 155, 247, 0.26);
  color: white;
  margin: 0;
  cursor: pointer;
}
.tag-item{
  width: 150px;
  height: 30px;
  line-height: 30px;
  /* background-color: rgba(93, 155, 247, 0.26); */
  margin: 0;
  color:  rgb(136, 135, 135);
  }
.priceinput{
  width: 920px;
  height: 30px;
  line-height: 30px;
  /* background-color: rgba(93, 155, 247, 0.26); */
  margin: 0;
  color:  rgb(136, 135, 135);
}
.price-item{
  float: left;
  margin-right: 10px;
  height: 25px;
  line-height: 25px;
}

.tag-item:hover{
  color: #007bff;
  cursor: pointer;
}
.bitem{
  width: 150px; 
}
/* 更多样式 */
.more{
  width: 100px;
  cursor: pointer;
  color:  rgb(247, 117, 117);
  margin: 0;
  line-height: 30px;
}
.more:hover{
  color: #007bff;
}
.inputmore{
  width: 100px;
  cursor: pointer;
  color:  rgb(247, 117, 117);
  margin: 0;
  line-height: 30px;
}
.inputmore:hover{
  color: #007bff;
}
/* 点击输入的事件*/
.inputmoreactive{
    border-top: 1px solid  rgba(93, 155, 247, 0.26);
    border-bottom: none;
}




/** --------------------------- 卡片样式 ------------------------------------- */
/** 列出下面选项卡的 */
#listmilk{
  margin-top: 30px;
  height: 1000px;
  /* border:1px solid blue; */
}
.cardbox{
  width: 240px;
  height: 476px;
  padding: 0px;
  cursor: pointer;
  margin-left: 28px;
}
.cardbox:hover{
  cursor: pointer;
 border: 1px solid rgba(180, 182, 178, 0.486);
}
/* 卡片里面的图片 */
.cardbox .cardimg{
  height: 220px;
  width: 220px;
  border: 1px solid gainsboro;
  position: absolute;
  left: 10px;
  top: 20px;
}
/* 价格 */
.cardbox .price{
  display: block;
   text-align: right;
   width: 240px;
   height: 30px;
   /* border: 1px solid slateblue; */
   top: 260px;
   position: absolute;
   color: red;
   right: 13px;
   font-size: 25px;

}
/* 标题 */
.cardbox .title{
   overflow: hidden;
   text-align: left;
   width: 240px;
   height: 30px;
   /* border: 1px solid slateblue; */
   top: 310px;
   left: 5px;
   position: absolute;
   color: rgb(136, 133, 133);
}
/* 品牌 */
.cardbox .cardbrand{
   overflow: hidden;
   text-align: left;
   width: 240px;
   height: 30px;
   /* border: 1px solid slateblue; */
  color: rgb(136, 133, 133);
   top: 360px;
   position: absolute;
   font-size: 13px;
   left: 5px;
   
}
.button{
  position: absolute;
  bottom: 20px;
  width: 120px;
  border: 1px solid gainsboro;
  height: 30px;
  right: 10px;
  color:red;
  font-size: 15px;
  line-height: 30px;
}
.button:hover{
  border: 1px solid red;
  
}
/* 评分 */
.elrate{
  position: absolute;
  top: 388px;
  left: 1px;
}
.con{
  background-color: gainsboro;
}
/* 更多品牌样式 */
.brandbox{
  width: 948px;
}
</style>>

