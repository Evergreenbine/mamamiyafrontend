<template>
   <div id="mainbox" class="margin-auto max-width">
          <div class="block">
          <el-carousel height="350px">
            <el-carousel-item v-for="item in 5" :key="item">
              <!-- <h1 class="small">{{ item }}</h1> -->
              <img src="http://img13.360buyimg.com/cms/jfs/t1/154509/7/14132/493023/5ffd7f04E7a6ddb19/875395cbbf02844d.jpg">
            </el-carousel-item>
          </el-carousel>
          </div>
      </div>
</template>

<script>
export default {

}
</script>

<style scoped>
#mainbox{
    height: 350px;
    margin-bottom: 30px;
}
 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }

</style>