<template>
  <div id="morebrand" class="max-width margin-auto" >
     <div id="pagenav" class="max-width margin-auto postion-re">
         <p  class="all position-ab">所有品牌 <i>(共100品牌 )</i></p>
         <div class="brandnav position-ab margin-auto">
             <a class="brandnavitem" href="#">A</a>
             <a class="brandnavitem" href="#">B</a>
             <a class="brandnavitem" href="#">C</a>
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
         
     </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
#morebrand{
    height: 500px;
    border: 1px solid pink;
}
#pagenav{
     position:relative;
}
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
</style>

