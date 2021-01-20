<template>
  <div id="morebrand" class="max-width margin-auto" >
     <div id="pagenav" class="max-width margin-auto postion-re">
         <p  class="all position-ab">所有品牌 <i>(共100品牌 )</i></p>
         <!-- 分页导航-->
         <div class="brandnav position-ab margin-auto">
             <a class="brandnavitem" href="#A">A</a>
             <a class="brandnavitem" href="#B">B</a>
             <a class="brandnavitem" href="#C">C</a>
             <a class="brandnavitem" href="#">D</a>
             <a class="brandnavitem" href="#">E</a>
             <a class="brandnavitem" href="#">F</a>
             <a class="brandnavitem" href="#">G</a>
             <a class="brandnavitem" href="#">H</a>
             <a class="brandnavitem" href="#">I</a>
             <a class="brandnavitem" href="#">J</a>
             <a class="brandnavitem" href="#">K</a>
             <a class="brandnavitem" href="#">L</a>
             <a class="brandnavitem" href="#">M</a>
             <a class="brandnavitem" href="#">N</a>
             <a class="brandnavitem" href="#">O</a>
             <a class="brandnavitem" href="#">P</a>
             <a class="brandnavitem" href="#">Q</a>
             <a class="brandnavitem" href="#">R</a>
             <a class="brandnavitem" href="#">S</a>
             <a class="brandnavitem" href="#">T</a>
             <a class="brandnavitem" href="#">U</a>
             <a class="brandnavitem" href="#">V</a>
             <a class="brandnavitem" href="#">W</a>
             <a class="brandnavitem" href="#">X</a>
             <a class="brandnavitem" href="#">Y</a>
             <a class="brandnavitem" href="#">Z</a>
         </div>
        <!-- 品牌项目-->
         <div class="brand-items position-ab margin-auto max-width">
             <!-- 第一个 -->
             <div id="A" class="brand-item max-width d-flex">
                <div class="brand-item-logo position-re">
                    <h2>A</h2>
                </div>
                 <div class="bitem " style="border:none"></div>
             </div>
             <!-- 第二个 -->
            <div id="B" class="brand-item max-width d-flex">
                <div class="brand-item-logo position-re">
                    <h2>B</h2>
                </div>
                 <div class="bitem " ></div>
             </div>
            <!-- 第三个 -->
             <div id="C" class="brand-item max-width d-flex">
                <div class="brand-item-logo position-re">
                    <h2>C</h2>
                </div>
                 <div class="bitem " ></div>
             </div>
             
         </div>
          
     </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
#morebrand{
    /* height: 500px; */
    border: 1px solid pink;
}
#pagenav{
     position:relative;
}
/* logo*/
#pagenav p{
    display: inline-block;
    position:absolute;
    top: -30px;
    left: 10px;
    font-size: 30px;
    color: pink;
    background-color: #fff;
    margin-left: 10px;
    width: 240px;
}
#pagenav i{
    font-size: 15px;
}
/* 分页导航栏*/
.brandnav{
    top:15px;
    width: 910px;
    left: 100px;
}
.brandnavitem{
    display: inline-block;
    width: 35px;
    height: 35px;
    /* border: 1px solid pink; */
    line-height: 35px;
    text-decoration: none;
}
/* 实际的品牌列表*/
.brand-items{
    top: 100px;
    /* height: 100px; */
    /* border: 1px solid blue; */
}
.brand-item{
    height: 300px;
    /* border-top: 1px solid gray; */
    /* border: 1px solid blue; */
    margin-bottom: 20px;
}
.brand-item-logo{
    width: 100px;
}
.brand-item-logo h2 {
    position: absolute;
    color: #007bff;
    top: -18px;
    left: 20px;

}
.bitem{
    border-top: 1.5px solid pink;
    width: 999px;
    height: 300px;
    /* border: 1px solid blue; */
    margin-bottom: 20px;
}
</style>

