<template>
  <div id="Common" >
      <div class="navbar margin-auto max-width  fd-row postion-re ">
          <!-- 头部导航栏 -->
         <div id="navitem-head" class=" max-width position-ab d-flex ">
             <div class="navitem d-flex fd-row ">
                 <div class="navitem-sub">社区</div>
                 <div class="subnavitem">圈圈</div>
                 <div class="subnavitem"><router-link to="/bbsindex">论坛</router-link></div>  
             </div>
             <div class="navitem d-flex fd-row">
                 <div class="navitem-sub">学问</div>
                 <div class="subnavitem"><router-link :to="{path:'/ques/konw/index'}">问答</router-link></div>
                 <div class="subnavitem"><router-link to="/ques">知识</router-link></div>  
             </div>
             <div class="navitem d-flex fd-row " style="border-right:none ">
                 <div class="navitem-sub">商城</div>
                 <div class="subnavitem"><router-link to="/shop">用品</router-link></div>
                 <div class="subnavitem">资讯</div>  
             </div>    
         </div>   
         <!-- 轮播图 -->
         <div id="bcr" >
            <div id="subbcr">
                <div>
                 <el-carousel :interval="5000" arrow="always">
                  <el-carousel-item v-for="item in 4" :key="item">
                  <img src="http://www.ci123.com/firstpage_flash/days/pic4829_1610503770.png"/>
                  </el-carousel-item>
                    </el-carousel>
                </div>
         </div>
       
     
     
      </div> 
      <!-- 活动图 -->
      <div id="activity">
          <div class="achead">
            <p class="title">今日导读</p>
            <div class="pline"></div>
          </div>
          <div class="acticle d-flex flex-wrap">
             <div class="acticleitem">生娃后身体迎来的变化</div>
             <div class="acticleitem">生娃后身体迎来的变化</div>
             <div class="acticleitem">生娃后身体迎来的变化</div>
             <div class="acticleitem">生娃后身体迎来的变化</div>
             <div class="acticleitem">生娃后身体迎来的变化</div>
             <div class="acticleitem">生娃后身体迎来的变化</div>
             <div class="acticleitem">生娃后身体迎来的变化</div>
             <div class="acticleitem">生娃后身体迎来的变化</div>
          </div>
      </div>
  </div>
  </div>
</template>

<script>
export default {
    name:"Common",
    data() {
        return {
            to:""
        }
    },
}
</script>

<style scoped>
/** 大框框 */
.navbar{
    height: 420px;
    /* border: 1px solid palegreen; */
}
/** 导航栏 */
#navitem-head{
    height: 50px;
    top: 0;
    left: 0; 
    background-color: rgb(247, 196, 204,0.8);
    /* border: 1px solid black; */
}
/* 标志：社区 学问*/
.navitem{
    color:rgb(87, 85, 85);
    width: 366px;
    height: 50px;
    border-right: 2px solid rgb(255, 252, 252);
    line-height: 50px;

}
.navitem-sub{
  color: rgb(238, 128, 88);
  font-size: 20px;
  font-weight: 500;
  width: 100px;
}
/* 额外小修改*/
.subnavitem {
    text-decoration: none;
    width: 150px;
}
.subnavitem:hover{
    color: black;
    cursor: pointer;
    background-color: rgb(230, 178, 178);
}
.btlr{
     border-top-left-radius: 5px;
}
/** 轮播图 */
#bcr{
    position: absolute;
    top: 70px;
    left: -1px;
    width: 700px;
    height: 340px;
    background: rgba(227, 235, 250, 0.8);
}
#subbcr{
  position: absolute;
  width: 660px;
  height: 270px;
  top: 20px;
  left: 20px;  
}
/* 活动图*/
#activity{
  position:absolute;
  height: 350px;
  width: 380px;
  /* border: 1px solid orange; */
  right: 0;
  top: 70px;
}
.achead p{
 margin:3px;
 padding: 0;
 color:rgb(87, 85, 85,0.5);

}
.pline{
  margin: 0 auto;
  width: 330px;
  border-bottom: 1px solid rgb(87, 85, 85,0.3) ;
}
.acticle{
  
  height: 310px;
  margin: 0 auto;
  margin-top: 6px;
  /* border: 1px solid rgb(220, 245, 240); */
}
.title{
  
}
.acticleitem{
  width: 160px;
  height: 20px;
  margin-top:10px;
  margin-left: 20px;
}
 .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>>

