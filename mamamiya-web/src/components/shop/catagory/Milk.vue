<template>
  <div id="milk">
      <div class="maxbox max-width margin-auto d-flex">
          <!-- 左边的盒子 -->
        <div class="leftbox">
              <!-- logo -->
             <div class="catatag"><p>奶粉</p></div>

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
                <!-- 第一页 -->
                <div class="subbox" v-show="this.curId == 0 ">
                <!-- {{item}} 这是商品选项内容-->
                    <a @click="goto(item)" class="subbox-item d-flex"  :key=index v-for="(item,index) in welocomegood "  :class="{subboxactive : index === subId}"
                       @mousemove="sel(index)"
                    >
                         <div class="recco" :class="{hiddenimg : index == subId}">{{item.recommend}}</div>
                         
                         <img :src="item.img"  class="hiddenimg" :class="{showimg : index == subId}" alt="图片无法加载..."/>
                         <div class="hiddenimg" :class="{showinfo : index == subId }">
                              <p class="ptag">品牌:{{item.bname}}</p>
                              <p class="ptag">商品名:{{item.gname}}</p>
                              <p class="ptag">价格:{{item.price}}</p> 
                               <el-rate
                                    v-model="item.rate"
                                    disabled
                                    show-score
                                    text-color="#ff9900"
                                    score-template="{value}" class="elrate">
                                </el-rate>
                         </div>
                        
                    </a>
                </div>

                <!-- 第二页 -->
                <div class="subbox" v-show="this.curId == 1 ">
                <!-- {{item}} 这是商品选项内容-->
                    <a @click="goto(item)" class="subbox-item d-flex"  :key=index v-for="(item,index) in lastestgood "  :class="{subboxactive : index === subId}"
                       @mousemove="sel(index)"
                    >
                         <div class="recco" :class="{hiddenimg : index == subId}">{{item.recommend}}</div>
                         
                         <img :src="item.img"  class="hiddenimg" :class="{showimg : index == subId}" alt="图片无法加载..."/>
                         <div class="hiddenimg" :class="{showinfo : index == subId }">
                              <p class="ptag">品牌:{{item.bname}}</p>
                              <p class="ptag">商品名:{{item.gname}}</p>
                              <p class="ptag">价格:{{item.price}}</p> 
                               <el-rate
                                    v-model="item.rate"
                                    disabled
                                    show-score
                                    text-color="#ff9900"
                                    score-template="{value}" class="elrate">
                                </el-rate>
                         </div>
                        
                    </a>
                </div>

                <!-- 第三页 -->
                <div class="subbox" v-show="this.curId == 2 ">
                <!-- {{item}} 这是商品选项内容-->
                    <a @click="goto(item)" class="subbox-item d-flex"  :key=index v-for="(item,index) in bboxitem "  :class="{subboxactive : index === subId}"
                       @mousemove="sel(index)"
                    >
                         <div class="recco" :class="{hiddenimg : index == subId}">{{item.recommend}}</div>
                         
                         <img :src="item.img"  class="hiddenimg" :class="{showimg : index == subId}" alt="图片无法加载..."/>
                         <div class="hiddenimg" :class="{showinfo : index == subId }">
                              <p class="ptag">品牌:{{item.bname}}</p>
                              <p class="ptag">商品名:{{item.gname}}</p>
                              <p class="ptag">价格:{{item.price}}</p> 
                               <el-rate
                                    v-model="item.rate"
                                    disabled
                                    show-score
                                    text-color="#ff9900"
                                    score-template="{value}" class="elrate">
                                </el-rate>
                         </div>
                        
                    </a>
                </div>
                 <!-- <div class="submaxbox-item topp">haha</div> -->
            </div>
                 
               
        </div>


          <!-- 右边的盒子 -->
          <div class="rightbox">
              <div id="select"  @click="moreSelect(cata[0])"><p>更多选项 >></p></div>
              <div id="subrightbox" class="position-re"> 
                  <div class="goodcomentgoods" >
                      <div class="gooditem position-re" v-for="item in lgood" :key="item">
                          <!-- 商品信息 -->
                         <div class="goodinfo">
                             <img :src="item.img" alt="">
                             <p>{{item.gname}}</p>
                         </div>
                         <!-- 评论信息 -->
                         <div class="commentbox">
                             <p class="rr">{{item.recommend}}</p>
                             <el-rate class="rra" disabled v-model="item.rate"></el-rate>
                             <p class="cc">{{item.content}}</p>
                             <p class="ii">用户:{{item.useraccount}}&nbsp&nbsp&nbsp{{item.createtime}}</p>
                             
                         </div>

                      </div>
                  </div>
                  <div id="recommendBox" class="position-ab ">
                      <p class="loooo">推荐品牌</p>
                    <div class="brandbox ">
                        <div class="braitem" v-for="(item,index) in sellgoodbrand" :key="index" @click="tosearch(item.bid)">
                            <img :src="item.img"/>
                        </div>
                    </div>
                  </div>
              </div>
             
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
            cata:['milk'],
            tabcarditem:[
                "热门商品", 
                "新品推荐", 
                "好评商品"
            ],
            // 好评商品盒
            bboxitem:[],
            // 新品
            lastestgood:[],
            // 热销商品
            welocomegood:[],
            // 最新热评论
            lgood:[],
            sellgoodbrand:[]
        }
    },
    methods:{
        tosearch(bid){
            // alert(bid)
        this.$router.push({path:'/shop/search',query:{
        bid:bid
      }})},
        tab(index){
            this.curId = index;
        },
        sel(index){
            this.subId=index;
        },
        moreSelect(cata){
            // alert(cata)
            this.$router.push('/shop/'+cata);
        },
        
        // 去到专门的商品页
        goto(item){
            this.$router.push({
                path:'/shop/milkbrand',
                query:{
                    bid:item.bid,
                    gid:item.gid
                }
            })
        }
    },
    async created(){
         const axios = this.$config.getAxiosInstance('shop')
         let res = await axios.get('/api/milks/good/1');
        //  好评商品
         this.bboxitem = res.data
         console.log(res);

        //  最新商品
        let resp = await axios.get('/api/lastestgood/1')
        this.lastestgood = resp.data

        //  热门商品
        let respo = await axios.get('/api/welcome/1')
        this.welocomegood = respo.data
        console.log("热门商品");
        console.log(respo.data);

        // 最新热评论
        let respp = await axios.get('/api/lastestrate/1')
        this.lgood = respp.data.res
        console.log("最新热评论");
        
 // 销量最好的品牌
        let nonamel = await axios.get('/api/sellgoodbrand/1')
        this.sellgoodbrand = nonamel.data.result
       
    }

}
</script>

<style lang="scss" scoped>
/* 左边盒子*/
.maxbox{
    height: 480px;
    margin-bottom: 30px;
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
    width: 330px;
    height: 330px;
    border-top: none;
    background: #6eaef31a;
    /* border: 1px solid blanchedalmond; */
}
/* 这是 你好呀 这一个个选项 */
.subbox-item{
    text-decoration: none;
    display: block;
    text-align: left;
    width: 330px;
    height: 33px;
    /* border-bottom: 1px solid gainsboro; */
    /* border: 1px solid rgba(212, 132, 10, 0.877); */
    cursor: pointer;
}
/* 激活样式 */
.subboxactive{
    /**方便 子元素布局 */
    position: relative;
    width: 330px;
    height: 100px;
    border-bottom: 1px solid gainsboro; 
}
.hiddenimg{
    display: none;
}
.showimg{
    display: block;
    width: 72px;
    height: 72px;
    /* border: 1px solid blueviolet ; */
    margin-left: 20px;
    /* margin-top: 16px;  */
}
.showinfo{
     display: block;
     width: 220px;
     height: 100px;
     /* border:solid 1px gold; */
     position: absolute;
     right: 0;     
}
.ptag{
    margin: 0;
}
/* 激活后图片样式*/
.subboxactive img{
  position: absolute;
  top: 14px;
    
}

/* ---------- 右边盒子-----------*/
.rightbox{
    width: 770px;
    height: 410px;
    border-top: 2px solid pink;
    /* border: 1px solid blue; */
}
#subrightbox{
     width: 770px;
    height: 380px;
    //  border: 1px solid rgb(255, 241, 47);
     .goodcomentgoods{
         width: 470px;
         height:380px ;
         float: left;
        //  border:#007bff 1px solid;
         .gooditem{
             cursor: pointer;
             width: inherit;
             height: 123px;
            //  border-bottom: 1px solid pink;
             margin-bottom: 3px;
            //  商品信息盒子
             .goodinfo{
                 width: 123px;
                 height: 123px;
                //  border: 1px solid greenyellow;
                 float: left;
                 img{
                     width: 98px;
                     height: 98px;
                     border: gainsboro 1px solid;
                     margin: 0 auto;
                     margin-top: 5px;
                     
                 }
                 p{
                     font-size: 10px;
                     color:rgb(155, 155, 155);
                 }
                 

             }
            //  评论盒子
             .commentbox{
                 float: left;
                 width: 343px;
                 height: 123px;
                //  border: 1px orange solid;
                 .rr{
                    //    border: 1px solid gainsboro;
                       margin: 0;
                        color:rgb(155, 155, 155);
                 }
                 .rra{
                    //  border: 1px solid gainsboro;
                 }
                 .cc{
                    //    border: 1px solid gainsboro;
                       text-align: left;
                         color:rgb(155, 155, 155);
                         width: inherit;
                         height: 50px;
                         font-size: 13px;
                         overflow: hidden;
                         margin: 0;
                 }
                 .ii{
                     line-height: inherit;
                     font-size: 10px;
                     text-align: left;
                     color:rgb(155, 155, 155);
                 }
             }
         }
     }
}
#recommendBox{
    right: 0;
    width: 300px;
    height: 380px;
    // border: 1px solid greenyellow;
    .loooo{
        margin: 0;
        color: #007bff;
    }
    .brandbox{
        width: inherit;
        height: 356px;
        // border: 1px solid gainsboro;
       
        .braitem{
            float: left;
            margin-left:2px;
            width: 147px;
            height: 80px;
            // border: 1px solid orange;
            margin-top: 8px;
            img{
                 width: 145px;
                height: 78px;
                cursor: pointer;
            }
        }
    }
}

#select{
    /* float: right; */
    height: 30px;
    /* border: 1px solid salmon; */

}

#select p{
    color:#007bff ;
    float: right;
    margin-right: 20px;
    line-height: 30px;
    cursor: pointer;
}
.recco{
    text-align:  center;
}

</style>