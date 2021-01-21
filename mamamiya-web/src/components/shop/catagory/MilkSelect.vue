<template>
  <div id="milkSelect" class="max-width margin-auto">
    <div id="tagnav">
    <div class="tag d-flex ">
      <p class="tagname ">分类</p>
      <p class="tag-item" v-for="(item,index) in cataarr" :key="index">{{item}}</p>
    </div> 

    <div class="tag d-flex">
      <p class="tagname">阶段</p>
      <p class="tag-item" v-for="(item,index) in stage" :key="index">{{item}}</p>
    </div> 
    <div class="tag d-flex flex-wrap">
      <p class="tagname">品牌</p>
      <p class="tag-item bitem" v-for="(item,index) in brand" :key="index">{{item}}</p>
      <p class="more">更多 >></p>
    </div> 

    <div class="tag d-flex">
      <p class="tagname">年龄</p>
      <p class="tag-item" v-for="(item,index) in age" :key="index">{{item}}</p>
    </div> 
    <div class="tag d-flex" :class="{inputmoreactive:imactive == true}">
      <p class="tagname" >价格</p>
      <p class="tag-item" v-for="(item,index) in price" :key="index">{{item}}</p>
      <p class="inputmore" @click="input()">输入 >></p>
      <!-- <el-input v-model="input" placeholder="请输入内容"></el-input> -->
    </div> 
   <div  v-show="inputhidden">
   <div class="tag d-flex " style="margin-top:10px" >
      <p class="tagname " style=" background-color:white"></p>
      <div class="priceinput" >
         <input class="price-item" type="text" placeholder="请输入最低价格"> <p class="price-item">-</p> <input class="price-item" type="text" placeholder="请输入最高价格"> 
         <p class="price-item">确定</p>
      </div>
    </div> 
    </div>

    <!-- <div class="tag max-width"><p class="tagname">阶段</p></div>
    <div class="tag max-width"><p class="tagname">品牌</p></div>
    <div class="tag max-width"><p class="tagname">年龄</p></div>
    <div class="tag max-width"><p class="tagname">价格</p></div> -->
  </div>

  <div id="listmilk" class="max-width margin-auto d-flex flex-wrap">
    
    <div v-for="(item,index) in 12" :key="index">
    <div class="cardbox position-re">
      <img src="https://img11.360buyimg.com/n7/jfs/t1/26610/11/9243/53159/5c7ccff8E0bf8c8fa/c3473a8ca1ae0617.jpg" class="cardimg"/>
      <p class="price">
        520
      </p>
      <p class="title">title</p>
      <p class="cardbrand">安佳</p>
      <div class="button">加入购物车</div>
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
      imactive:false,
      inputhidden:false,
      count:0,
      cataarr:['羊奶粉','早产儿奶粉','婴幼儿奶粉','防腹泻奶粉','孕产妇奶粉'],
      stage:['1段','2段','3段','4段','5段'],
      brand:['飞鹤','美赞臣','伊利','蒙牛','诺优能'],
      age:['0 - 6 个月','6 - 12个月','12 - 24个月','24 - 36 个月'] ,
      price:['0 - 100 元','100 - 200 元','200 -300 元','300 - 400 元'],
      priceval:[] 
    }
  },
  methods: {
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
       
    } 
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
}
.tagname{
  width: 150px;
  height: 30px;
  line-height: 30px;
  background-color: rgba(93, 155, 247, 0.26);
  color: white;
  margin: 0;
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
  text-align: left;
   width: 240px;
   height: 30px;
   border: 1px solid slateblue;
   top: 260px;
   position: absolute;
}
/* 标题 */
.cardbox .title{
   overflow: hidden;
   text-align: left;
   width: 240px;
   height: 30px;
   border: 1px solid slateblue;
   top: 310px;
   position: absolute;
}
/* 品牌 */
.cardbox .cardbrand{
   overflow: hidden;
   text-align: left;
   width: 240px;
   height: 30px;
   border: 1px solid slateblue;
   top: 360px;
   position: absolute;
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
</style>>

