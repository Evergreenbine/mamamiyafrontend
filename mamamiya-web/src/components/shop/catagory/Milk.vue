<template>
  <div id="milk">
      <div class="maxbox max-width margin-auto d-flex">
          <div class="leftbox">
             <div class="catatag"><p>奶粉</p></div>
             <div class="tabcard d-flex">
                 <div class="tabcard-item" style="border-left:1px solid gainsboro" >热门商品</div>
                 <div class="tabcard-item ">好评商品</div>
                 <div class="tabcard-item ">新品推荐</div>
             </div>
             <div class="submaxbox">
                 <div class="submaxbox-item topp">haha</div>
                 <div class="submaxbox-item">haha</div>
                 <div class="submaxbox-item">haha</div>
                 <div class="submaxbox-item">haha</div>
                 <div class="submaxbox-item">haha</div>
                 <div class="submaxbox-item">haha</div>
                 <div class="submaxbox-item">haha</div>
                 <div class="submaxbox-item">haha</div>   
             </div>
          </div>
          <div class="rightbox">
            
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:"milk",
    data(){
        return{

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
    border: 1px solid gainsboro;
    border-top: none;
    border-left: none;
    line-height: 30px;
    font-size: 13px;
}

.submaxbox{
    width: 330px;
    height: 330px;
    border: 1px solid gainsboro;
    border-top: none;
}
/* 右边盒子*/
.rightbox{
    width: 770px;
    height: 410px;
    border-top: 2px solid pink;
}
.submaxbox-item{
    width: 330px;
    height: 33px;
    border-bottom: 1px solid gainsboro;
}


.submaxbox-item:hover{
    width: 330px;
    height: 100px;
    border-bottom: 1px solid gainsboro;
}

</style>