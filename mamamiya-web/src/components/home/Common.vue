<template>
  <div id="Common" >
      <div class="navbar margin-auto max-width  fd-row postion-re ">
          <!-- 头部导航栏 -->
         <div id="navitem-head" class=" max-width position-ab d-flex ">
             <div class="navitem d-flex fd-row ">
                 <div class="navitem-sub">社区</div>
                 <div class="subnavitem">圈圈</div>
                 <div class="subnavitem">论坛</div>  
             </div>
             <div class="navitem d-flex fd-row">
                 <div class="navitem-sub">学问</div>
                 <div class="subnavitem">问答</div>
                 <div class="subnavitem">知识</div>  
             </div>
             <div class="navitem d-flex fd-row " style="border-right:none ">
                 <div class="navitem-sub">商城</div>
                 <div class="subnavitem">用品</div>
                 <div class="subnavitem">资讯</div>  
             </div>    
         </div>   
         <!-- 轮播图 -->
        <div id="bcr" >
            <div id="subbcr">
                <div>
                   <b-carousel
                     id="carousel-no-animation"
                     style="text-shadow: 0px 0px 2px #000"
                     no-animation
                     indicators
                     img-width="1024"
                     img-height="480"
                   >
                     <b-carousel-slide
                       caption="First slide"
                       img-src="https://picsum.photos/1024/480/?image=12"
                     ></b-carousel-slide>
                     <b-carousel-slide
                       caption="Second Slide"
                       img-src="https://picsum.photos/1024/480/?image=12"
                     ></b-carousel-slide>
                     <b-carousel-slide
                       caption="Third Slide"
                       img-src="https://picsum.photos/1024/480/?image=22"
                     ></b-carousel-slide>
                     <b-carousel-slide
                       caption="Fourth Slide"
                       img-src="https://picsum.photos/1024/480/?image=23"
                     ></b-carousel-slide>
                   </b-carousel>
                </div>
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

<style  scoped>
.navbar{
    height: 320px;
    /* border: 1px solid palegreen; */
}
#navitem-head{
    height: 50px;
    top: 0;
    left: 0; 
    background-color: rgb(247, 196, 204,0.6);
    /* border: 1px solid black; */
}
.navitem{
    color:rgb(87, 85, 85);
    width: 366px;
    height: 50px;
    border-right: 2px solid rgb(255, 252, 252);
    line-height: 50px;

}
.navitem-sub{
  font-size: 20px;
  width: 100px;
}
.subnavitem {
    width: 150px;
}
.subnavitem:hover{
    color: black;
    cursor: pointer;
}
.btlr{
     border-top-left-radius: 5px;
}
#bcr{
    position: absolute;
    top: 70px;
    left: -1px;
    width: 700px;
    height: 350px;
    background: rgba(250, 227, 232, 0.6);
}
#subbcr{
  position: absolute;
  width: 660px;
  height: 270px;
  top: 20px;
  left: 20px;  
}
</style>>

