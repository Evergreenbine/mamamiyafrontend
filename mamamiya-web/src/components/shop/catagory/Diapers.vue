<template>
  <div id="milk">
      <div class="maxbox max-width margin-auto d-flex">
          <!-- 左边的盒子 -->
          <div class="leftbox">
              <!-- logo -->
             <div class="catatag"><p>尿布</p></div>
             <!-- 选项卡顶部的盒子 -->
             <div class="tabcard d-flex">
                 <!-- <div class="tabcard-item" style="border-left:1px solid gainsboro" >热门商品</div>
                 <div class="tabcard-item ">好评商品</div>
                 <div class="tabcard-item ">新品推荐</div> -->
                <a href="javascript:;"  
                class="tabcard-item" 
                :key="index"
                v-for="(item,index) in tabcarditem"
                :class="{active : index === curId }"
                @mouseover="tab(index)">{{item}}
                </a>
               
             </div>
             <!-- 选项卡选项 -->
             <div class="submaxbox">
                 <div class="subbox" v-show=" index==curId "  :key="index"
                v-for="(item,index) in tabcarditem">
                <!-- {{item}} -->
                 <a class="subbox-item "  :key=index v-for="(item,index) in bboxitem "  :class="{subboxactive : index === subId}"
                    @mousemove="sel(index)"
                 >{{item}}</a>
                </div>
                 <!-- <div class="submaxbox-item topp">haha</div> -->
             </div>
          </div>
          <!-- 右边的盒子 -->
          <div class="rightbox">
            hah 
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:"milk",
    data(){
        return{
            // 这是头部选项卡切换的id
            curId:0,
            //这是选项也里面激活的id
            subId:0,
            tabcarditem:[
                "热门商品",  
                "好评商品",
                "新品推荐"    
            ],
            bboxitem:[
                "你好ya",
                "你好ya",
                "你好ya",
                "你好呀",
                "你好呀",
                "你好呀",
                "你好呀",
                "你好呀"
            ]
        }
    },
    methods:{
        tab(index){
            this.curId = index;
        },
        sel(index){
            this.subId=index;
        }
    }

}
</script>

<style scoped>
/* 左边盒子*/
.maxbox{
    height: 410px;
    margin-bottom: 100px;
    /* border: 1px solid blue; */
}
.leftbox{
    width: 330px;
    height: 410px;
    /* border: 1px solid peru; */
}
.catatag{
    position: relative;
    width: 330px;
    height: 50px;
    background: pink;
    transform-style: flat;
}
.catatag p{
    position: absolute;
    font-size: 25px;
    line-height: 45px;
    color: white;
    left: 26px;
}
.tabcard-item{
    width: 110px;
    height: 30px;
    /* border: 1px solid gainsboro; */
    border-top: none;
    border-left: none;
    line-height: 30px;
    font-size: 13px;
    background-color: white;
    text-decoration: none;
}
/** 选项卡激活样式 */
.active{
    width: 110px;
    height: 30px;
    /* border-left: 1px solid gainsboro; */
    background-color: #6eaef31a;;
    border-bottom: none;
}
/** 底部选项最大的盒子 */
.submaxbox{
    position: relative;
    width: 330px;
    height: 330px;
    border: 1px solid rgba(220, 220, 220, 0.096);
    border-top: none;
}
/** 激活的对应每个盒子 */
.subbox{  
    position: absolute;
    width: 329px;
    height: 329px;
    border-top: none;
    background: #6eaef31a;
    border: 1px solid blanchedalmond;
}
.subbox-item{
    text-decoration: none;
    display: block;
    text-align: left;
    width: 330px;
    height: 33px;
    border-bottom: 1px solid gainsboro;
    /* border: 1px solid rgba(212, 132, 10, 0.877); */
    cursor: pointer;
}
/* 激活样式 */
.subboxactive{
    width: 330px;
    height: 100px;
    border-bottom: 1px solid gainsboro; 
}


/* 右边盒子*/
.rightbox{
    width: 770px;
    height: 410px;
    border-top: 2px solid pink;
}


</style>