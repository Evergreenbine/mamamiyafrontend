<template>
<div>
  <div class="Echarts">
    <div id="myChart" :style="{width: '1000px', height: '300px'}"></div>
    <div id="myCharttt" :style="{width: '1000px', height: '300px'}"></div>
    <div id="myChartt" :style="{width: '1500px', height: '300px'}"></div>
  </div>
  <div class="lineline max-width margin-auto">数据导出</div>
  <div class="bigbigbox d-flex flex-wrap">
    <p class="bigboxbutton" ><a href="http://localhost:8003/api/export/brand">品牌表导出</a> </p>
    <p class="bigboxbutton"> <a href="http://localhost:8003/api/export/milk">商品表导出</a> </p>
    <p class="bigboxbutton">销售记录表导出</p>
  </div>
</div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      gnums:[],
      goodarr:[],
      goodnum:[],
      ratearr:[]
    }
  },
  mounted(){
    
  },
  async created(){
         const axios = this.$config.getAxiosInstance("shop");
        //  销量好的商品排行
         let resp = await axios({url:'/api/sellgoodgood',method:'get'})
         this.gnums = resp.data
         console.log(this.gnums);
        //  商品的销量
         let respp = await axios({url:'/api/goodpsnums',method:'get'})
         this.goodarr = respp.data.name
         this.goodnum = respp.data.nums
          console.log(respp.data);

          // 商品好评
           let ress = await axios({url:'/api/orderrate',method:'get'})
           this.ratearr = ress.data

         this.drawLine();
  },
  methods: {
   

    async drawLine(){
      
    
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        let myCharttt = this.$echarts.init(document.getElementById('myCharttt'))
        let myChartt = this.$echarts.init(document.getElementById('myChartt'))
        // 绘制图表
        myChart.setOption({
            title: { text: '商品销量前十占比' },
            tooltip: {},
            roseType: 'angle',
            series: [{
                name: '销量',
                type: 'pie',
                data: this.gnums
            }]
        });
        myCharttt.setOption({
            title: { text: '商品好评前六占比' },
            tooltip: {},
            roseType: 'angle',
            series: [{
                name: '好评数',
                type: 'pie',
                data: this.ratearr
            }]
        });

        myChartt.setOption({
            title: { text: "商品销售量" },
            tooltip: {},
            xAxis: {
                data: this.goodarr
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: this.goodnum
            }]
        });
    }
  }
}
</script>

<style lang="scss" scoped>
.lineline{
  width: 1000px;
  height: 100px;
  font-size: 35px;
}
.bigbigbox{
  .bigboxbutton{
    width: 150px;
    height: 35px;
    line-height: 35px;
    margin-left: 10px;
    color: white;
    background-color: rgb(127, 187, 255);
    cursor: pointer;
  }

}
</style> 

