<template>
  <div class="createshop">
    <div class="bnav d-flex">
      <p class="navitem"  @click="()=>{pageid = 1,this.brand = this.brand2}"  :class="{navitemac:pageid == 1}">{{ pageid == 3 ?"编辑":"新建"}}品牌</p>
      <p class="navitem"  @click="getbrandlist(1)" :class="{navitemac:pageid == 2}">{{pageid == 4?"品牌商品":"品牌列表"}}</p>
      <p class="navitem"  @click="countall" :class="{navitemac:pageid == 5}">品牌数据统计</p>
    </div>
    <!-- 第一页 -->
    <div class="bigbox" v-show="pageid == 1">
       <div class="item d-flex">
        <p class="tagname">品牌图片</p> 
        <el-upload 
          class="avatar-uploader inoimga"
          action="http://localhost:8003/api/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          >
          <img v-if="brand.img" :src="brand.img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div> 
      <div class="item d-flex">
        <p class="tagname">品牌分类</p>  
        <el-select v-model="brand.gcid" placeholder="请选择">
            <el-option
              v-for="item in this.brandcata"
              :key="item.gcid"
              :label="item.gname"
              :value="item.gcid">
            </el-option>
         </el-select>
      </div> 
      <div class="item d-flex">
        
        <p class="tagname">品牌名</p>
        <el-input v-model="brand.bname"></el-input>
      </div>  
      <div class="item d-flex">
         <el-button type="success" @click="savegood">保存</el-button>
      </div>  
    </div>
    <!-- 第二页 -->
    <div class="bigbox" v-show="pageid == 2">
      <div v-for="(item,index) in brandlist" :key="index" >
        <div class="itembox"  >
          <img :src="item.img" alt="" @click="checkgoodbid(item.bid)">
            <p class="rrrrr">品牌名：{{item.bname}}</p>
            <p class="rrrrrr">品牌分类：{{gcid[item.gcid -1]}}</p>
            
            <p class="btnbe" @click="editebrand(item)">编辑</p>
            <p class="btnbd" @click="deleteitem(item)">删除</p>
        </div>
      </div>
      <el-pagination
       @current-change="handleCurrentChange"
        background
        page-size=5
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <!-- 第三页 -->
    <div class="bigbox" v-show="pageid == 3">
       <div class="item d-flex">
        <p class="tagname">品牌图片</p> 
        <el-upload 
          class="avatar-uploader inoimga"
          action="http://localhost:8003/api/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          >
          <img v-if="brand.img" :src="brand.img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div> 
     
      <div class="item d-flex">
        
        <p class="tagname">品牌名</p>
        <el-input v-model="brand.bname"></el-input>
      </div>  
      <div class="item d-flex">
         <el-button type="success" @click="savegood">更新</el-button>
      </div>  
    </div>
    <!-- 第4页 -->
      <div class="bigbox" v-show="pageid == 4">
       <div v-for="(item,index) in goodarr" :key="index" >
        <div class="itembox"  >
          <img :src="item.img" alt="">
            <p class="rrrrr">商品名：{{item.gname}}</p>
            <p class="rrrrrr">商品推荐语：{{item.gname}}</p>
            <p class="rrrrrrr">商品价格：{{item.price}}</p>
            <p class="rrrrrra">商品库存：{{item.store}}</p>
            <p class="rrrrrrb">商品创建时间：{{item.createtime}}</p>
            <p class="rrrrrrc">商品编号：{{item.gid}}</p>
        </div>
      </div>
    </div>
    <!-- 第5页品牌数据统计 -->
    <div class="bigbox" v-show="pageid == 5">
      <div class="Echarts">
        <div id="myChart" ></div>
      </div>

      <div class="Echarts">
        <div id="myChartt" ></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 页面变量
      pageid:1,
      // 品牌变量
      goodarr:'',
      // 分页变量
      total:0,
       brand:{
         bname:'',
         img:'',
         gcid:'',
         tag:null
       },
      //  保存空白的brand 的
        brand2:{
         bname:'',
         img:'',
         gcid:'',
         tag:null
       },
       gcid:['奶粉','纸尿布','辅食','哺食工具'],
       brandcata:[],
       brandlist:[],
      //  统计每个品牌的商品数量
      bgbrand:[],
      bgnums:[],
      // 热销商品
      gname:[],
      gnums:[]
    };
  },
  mounted(){
     this.drawLine()
  },
  methods: {
    // 数据统计
    async countall(){
      this.pageid = 5
       const axios = this.$config.getAxiosInstance("shop");
      //  每个品牌的商品数量
        let res = await axios({url:'/api/numsofgood',method:'get'})
        this.bgbrand = res.data.brand
        this.bgnums = res.data.nums
        // 热销商品
         let resp = await axios({url:'/api/sellgoodgood',method:'get'})
         this.gname = resp.data.good
         this.gnums = resp.data.gnums

        console.log(resp.data);
   
         this.drawLine()
    },
     drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
     
        // 绘制图表
        myChart.setOption({
            title: { text: '每个品牌的商品数量' },
            tooltip: {},
            xAxis: {
                data:this.bgbrand
            },
            yAxis: {
              
            },
            series: [{
                name: '销量',
                type: 'bar',
                data: this.bgnums
            }]
        });
    },
    // 根据bid查询商品
    async checkgoodbid(bid){
      this.pageid = 4
        const axios = this.$config.getAxiosInstance("shop");
        let res = await axios({url:'/api/milk',method:'get',params:{bid:bid}})
        this.goodarr = res.data.result
    },
    async deleteitem(item){
        const axios = this.$config.getAxiosInstance("shop");
        let res = await axios.get(`/api/brands/${bid}`)
    },
    async editebrand(item){
      this.pageid = 3
      let bid = item.bid
      const axios = this.$config.getAxiosInstance("shop");
      let res = await axios.get(`/api/brands/${bid}`)
      this.brand = res.data
      console.log(this.brand);
      
    },
    handleCurrentChange(nums){
      this.getbrandlist(nums)
    },
     handleAvatarSuccess(res, file) {
        this.brand.img = res.url
        // this.saveinfo()
    },
    async savegood(){
        const axios = this.$config.getAxiosInstance("admin");
        let res = await axios.post('/api/savebrand',this.brand)
        if(res.data == 1){
          alert("创建品牌成功")
        }
    },
    async getbrandlist(nums){
      this.pageid = 2
       const axios = this.$config.getAxiosInstance("admin");
       let res = await axios({
         url:'/api/adminbrands',
         method:'get',
         params:{
           curpage:nums
         }
       })
       this.brandlist = res.data.data
       this.total = res.data.total

    }
  },
  async created() {
        const axios = this.$config.getAxiosInstance("admin");
        let res = await axios.get('/api/brandcata')
        this.brandcata = res.data.result
  }
};
</script>
<style lang="scss" scoped>
#myChart{
  width: 1500px;
  height: 500px;
}

.bnav{
  .navitem{
    width: 110px;
    height: 30px;
    cursor: pointer;
  }
  .navitemac{
    border-bottom: #409EFF 2px solid ;
  }
  
}

.itembox{
    width: 1000px;
    height: 80px;
    border: 1px solid gainsboro;
    margin-bottom: 5px;
    position: relative;
    cursor: pointer;
    img{
      position: absolute;
      width: 130px;
      height: 70px;
      left: 0px;
      top: 5px;
      left: 5px;
    }
    .rrrrr{
      position: absolute;
      margin-top: 5px;
      left: 180px;
      color: #8c939d;
    }
    .rrrrrr{
      position: absolute;
      top: 30px;
      left: 180px;
      color: #8c939d;
    }
    .rrrrrrr{
      position: absolute;
      top: 50px;
      left: 180px;
      color: #8c939d;
    }
    .rrrrrra{
      position: absolute;
      top: 5px;
      left: 400px;
      color: #8c939d;
    }
    .rrrrrrb{
      position: absolute;
      top: 30px;
      left: 400px;
      color: #8c939d;
    }
    .rrrrrrc{
      position: absolute;
      top: 50px;
      left: 400px;
      color: #8c939d;
    }
    .btnbd{
      width: 80px;
      height: 36px;
      position: absolute;
      right: 10px;
      top:22px;
      border: 1px solid gainsboro;
      line-height: 36px;
      cursor: pointer;
    }
    .btnbd:hover{
      border: red 1px solid;
      background-color:red ;
      color: white;
    }
    .btnbe{
      width: 80px;
      height: 36px;
      position: absolute;
      right: 100px;
      top:22px;
      border: 1px solid gainsboro;
      line-height: 36px;
      cursor: pointer;
    }
     .btnbe:hover{
      border: #409EFF 1px solid;
      background-color:#409EFF;
      color: white;
    }
}




.createshop{

}
.tagname{
    width: 200px;
    line-height: 40px;
}
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 220px;
    height: 220px;
    display: block;
  }
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }
</style>