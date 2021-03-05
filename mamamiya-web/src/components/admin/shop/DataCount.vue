<template>
<div>
  <div class="Echarts">
    <div class="item d-flex">
        开始日期:<input class="timepiker" type="date" v-model="stime" placeholder="请输入开始日期">
        结束日期:<input class="timepiker" type="date" v-model="etime" placeholder="请输入结束日期">
        <div class="timebutton" @click="querycountall">查询</div>
    </div>
    <div id="myChart" :style="{width: '1000px', height: '300px'}"></div>
    <div id="myCharttt" :style="{width: '1000px', height: '300px'}"></div>
    <div id="myChartt" :style="{width: '1500px', height: '300px'}"></div>
  </div>
  <div class="lineline max-width margin-auto">数据导出</div>
  <div class="bigbigbox d-flex flex-wrap">
    <p class="bigboxbutton" ><a :href="`http://localhost:8003/api/export/brand?stime=${stime}&etime=${etime}`">销量表导出</a> </p>
  </div>
</div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      // 查询某个商品的销量
      queryvalue:'',
      msg: 'Welcome to Your Vue.js App',
      gnums:[],
      goodarr:[],
      goodnum:[],
      ratearr:[],
      stime:'',
      etime:''
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

    download(){

    },
    querynums(){
      
      for(var i = 0; i<this.goodarr.length;i++){
         if(this.goodarr[i].se){
           alert(i)
         }
      }
    },
     async querycountall(){
       
       const axios = this.$config.getAxiosInstance("shop");
     //  销量好的商品排行
         let resp = await axios({
           url:'/api/sellgoodgood',
           method:'get',
           params:{
             stime:this.stime,
             etime:this.etime
           }
         
         })
         this.gnums = resp.data
          //  商品的销量
         let respp = await axios({
           url:'/api/goodpsnums',
           method:'get',
            params:{
             stime:this.stime,
             etime:this.etime
           }
         })
         this.goodarr = respp.data.name
         this.goodnum = respp.data.nums
          console.log(respp.data);

         this.drawLine()
         console.log(this.gnums);
   },
   

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
.timebutton{
    width: 100px;
    height: 30px;
    border: 1px solid gainsboro;
    margin-left: 20px;
    line-height: 30px;
    cursor: pointer;
  }
  .timebutton:hover{
    background-color:#409EFF;
    color: white;
    border: #409EFF 1px solid;
  }
</style> 

