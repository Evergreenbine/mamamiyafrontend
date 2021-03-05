<template>
  <div class="createshop">
     <div class="bnav" :style="{'width':'700px','margin-bottom':'30px'}">
        <el-input placeholder="请输入资讯标题" v-model="title" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="goto"></el-button>
        </el-input>
    </div>
    <div class="bnav d-flex">
      <p class="navitem"  @click="()=>{pageid = 1,this.konwpost = this.konwpostt}"  :class="{navitemac:pageid == 1}">{{ pageid == 3 ?"编辑":"新建"}}资讯</p>
      <p class="navitem"  @click="getbrandlist(1)" :class="{navitemac:pageid == 2}">{{pageid == 4?"品牌商品":"资讯列表"}}</p>
      <!-- <p class="navitem"  @click="countall" :class="{navitemac:pageid == 5}">知识数据统计</p> -->
 
    </div>
    <!-- 第一页 -->
    <div class="bigbox" v-show="pageid == 1">
      
      <div class="item d-flex">
       <p :style="{width:'120px'}">资讯标题</p>
        <el-input  v-model="konwpost.title"></el-input>
      </div>
    
     
      <div v-show="isfreeshow == true">
      <div class="item d-flex" >
       <p :style="{width:'120px'}">价格</p>
        <el-input type="number"  v-model="konwpost.price"></el-input>
      </div>
      </div>
 
        <div class="item d-flex">
          <p :style="{width:'120px'}">资讯分类</p>
          <el-select v-model="konwpost.cata" slot="prepend" placeholder="请选择分类" >
             <el-option :label="item.kname" :value="item.kcid" v-for="item in konwcata " :key="item.cid" >
             </el-option>
           </el-select>
        </div>
        <div class="item d-flex">
          <p :style="{width:'120px'}">资讯内容</p>
          <FullTextEditor v-on:func="savecontent"/>
         </div> 
          
         <div class="item d-flex">   
           <el-button type="success" @click="savegood">发布资讯</el-button>
        </div>  
  
    </div>
    <!-- 第二页 -->
    <div class="bigbox" v-show="pageid == 2">
      <div v-for="(item,index) in konwlist" :key="index" >
        <div class="itembox"  >
          <img :src="item.img" alt="" >
            <p class="rrrrr">资讯标题：{{item.title}}</p>

            <p class="rrrrrrb">资讯创建时间：{{item.createtime}}</p>
         
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
       <p :style="{width:'120px'}">资讯标题</p>
        <el-input  v-model="konwpost.title"></el-input>
      </div>
    
     
      <div v-show="isfreeshow == true">
      <div class="item d-flex" >
       <p :style="{width:'120px'}">价格</p>
        <el-input type="number"  v-model="konwpost.price"></el-input>
      </div>
      </div>
 
        <div class="item d-flex">
          <p :style="{width:'120px'}">资讯分类</p>
          <el-select v-model="konwpost.cata" slot="prepend" placeholder="请选择分类" >
             <el-option :label="item.kname" :value="item.kcid" v-for="item in konwcata " :key="item.cid" >
             </el-option>
           </el-select>
        </div>
        <div class="item d-flex">
          <p :style="{width:'120px'}">资讯内容</p>
          <FullTextEditor v-on:func="savecontent"/>
         </div>     
         <div class="item d-flex">   
           <el-button type="success" @click="upkonw">更新</el-button>
        </div>  
    </div>
   
    <!-- 第5页知识数据统计 -->
    <div class="bigbox" v-show="pageid == 5">
      <div class="item d-flex">
        
        <input class="timepiker" type="date" v-model="stime" placeholder="请输入开始日期">
        <input class="timepiker" type="date" v-model="etime" placeholder="请输入结束日期">
        <div class="timebutton" @click="querycountall">查询</div>
      </div>
      <div class="Echarts">
        
        <div id="myChart" :style="{width: '1000px', height: '300px'}"></div>
        <div id="myChartt" :style="{width: '1000px', height: '300px'}"></div>
        <div id="myCharttt" :style="{width: '1000px', height: '300px'}"></div>
        <div id="myChartfour" :style="{width: '1000px', height: '300px'}"></div>
      </div>
    </div>
  

  
    
  </div>
</template>
<script>
import FullTextEditor from '../../FullTextEditor'
import UFullTextEditor from '../../UpdateFullTextEditor'

export default {
  
  data() {
    return {
        //  ---------------- 知识 ---------------------
        
        // 新建知识模型
        konwpost:{
          kid:'',
          title:'',
          content:'',
          createtime:'',
          price:'',
          isfree:'',
          cata:'',
          useraccount:'',
          img:''
        },
        // 保存编辑的对象
        konwpostt:{
          kid:'',
          title:'',
          content:'',
          createtime:'',
          price:'',
          isfree:'',
          cata:'',
          useraccount:'',
          img:''
        },
        // 知识分类
        konwcata:[],
        // 知识列表
        konwlist:[],
        // 分页变量
        total:0,


      // 页面变量
      pageid:1,
      // 品牌变量
      goodarr:'',
      
      // 价格是否显示变量
      isfreeshow:false,
       brand:{
         bname:'',
         img:'',
         gcid:'',
         tag:null
       },
      
     
     
      //  统计每个品牌的商品数量
      // 统计知识时间选择
      stime:'',
      etime:'',
      bgbrand:[],
      bgnums:[],
      // 热销商品
      gname:[],
      gnums:[],
      // 每个

      kidarr:[],
      nums:[],
      mostuse:[]
    };
  },
  watch:{
    isfreeshow:function(val,oldval){
      // 控制是否收费
      this.konwpost.isfree = val == true?0:1
      
    }
    
  },
  components:{
    FullTextEditor,
    UFullTextEditor
  },
  mounted(){
     this.drawLine()
  },
  methods: {
       async drawLine(){
          let myChart = this.$echarts.init(document.getElementById('myChart'))
          let myChartt = this.$echarts.init(document.getElementById('myChartt'))
          let myCharttt = this.$echarts.init(document.getElementById('myCharttt'))
          let myChartfour = this.$echarts.init(document.getElementById('myChartfour'))
           
           myChart.setOption({
            title: { text: '知识购买量前十' },
            tooltip: {},
            roseType: 'angle',
            series: [{
                name: '销量',
                type: 'pie',
                data: this.gnums
            }]
            });
            
           myChartt.setOption({
            title: { text: '知识浏览量前十' },
            tooltip: {},
            roseType: 'angle',
            series: [{
                name: '浏览',
                type: 'pie',
                data: this.gname
            }]
            });
           myCharttt.setOption({
            title: { text: '知识有用前十' },
            tooltip: {},
            roseType: 'angle',
            series: [{
                name: '有用',
                type: 'pie',
                data: this.mostuse
            }]
            });
           myChartfour.setOption({
            title: { text: "知识阅读量" },
            tooltip: {},
            xAxis: {
                name:"知识id",
                data: this.kidarr
            },
            yAxis: {
                name:"浏览量",   
            },
            yAxis: {},
            series: [{
                name: '浏览量',
                type: 'bar',
                data: this.nums
            }]
        });
            
            
            
            },



    // 保存知识内容
    savecontent(content){
      this.konwpost.content = content
      console.log("知识内容是:"+this.konwpost.content);
    },
    
    // 按日期查询数据统计
    async querycountall(){
    // ---------------------------------最多购买
     const axios = this.$config.getAxiosInstance("bbs");
      let resp = await axios({
        url:'/api/mostbuy',
        method:'get',
        params:{
          stime:this.stime,
          etime:this.etime
        }
        })
       this.gnums = resp.data
      //  ------------------------------最多浏览
      let respp = await axios({
        url:'/api/mostlook',
        method:'get',
        params:{
           stime:this.stime,
          etime:this.etime
        }
        })
      this.gname = respp.data
      // ------------------------------------
       let resppp = await axios({
         url:'/api/mostuse',
         method:'get',
         params:{
           stime:this.stime,
           etime:this.etime
         }})
      this.mostuse = resppp.data



       this.drawLine()
    },
    // 数据统计
    async countall(){
      this.pageid = 5
      const axios = this.$config.getAxiosInstance("bbs");

      let resp = await axios({
        url:'/api/mostbuy',
        method:'get'
        })
      this.gnums = resp.data

      let respp = await axios.get('/api/mostlook')
      this.gname = respp.data

      let resppp = await axios.get('/api/mostuse')
      this.mostuse = resppp.data

      let aa = await axios.get('/api/everylook')
      // console.log(aa.data);
      this.kidarr = aa.data.kid
      this.nums = aa.data.nums

      console.log(this.kidarr);

      this.drawLine()
    },
     
    // 根据cata查询知识
    async checkgoodbid(cata){
      this.pageid = 4
        const axios = this.$config.getAxiosInstance("bbs");
        let res = await axios.get(`/api/konws/${cata}`)
        this.goodarr = res.data
    },
    async deleteitem(item){
        const axios = this.$config.getAxiosInstance("shop");
        let res = await axios.get(`/api/brands/${bid}`)
    },
    async editebrand(item){
      this.pageid = 3
      this.konwpost = item
      this.isfreeshow = item.isfree == 1 ? 0: 1
      
    },
    handleCurrentChange(nums){
      this.getbrandlist(nums)
    },
     handleAvatarSuccess(res, file) {
        this.konwpost.img = res.url
        // this.saveinfo()
    },
    handleVideoSuccess(res,file,filelist){
    console.log(res.url);

    },
    // 创建知识
    async savegood(){
        const axios = this.$config.getAxiosInstance("bbs");
        let res = await axios.post('/api/konwcreate',this.konwpost)
        if(res.data == 1){
          alert("创建知识成功")
        }
    },
    async getbrandlist(nums){
      this.pageid = 2
       const axios = this.$config.getAxiosInstance("bbs");
       let res = await axios({
         url:'/api/newall',
         method:'get',
         params:{
           curpage:nums
         }
       })

       this.konwlist = res.data.data
       this.total = res.data.total

       console.log(this.konwlist);

    }
  },
  async created() {
        const axios = this.$config.getAxiosInstance("bbs");
        let res = await axios.get('/api/konwcata')
        this.konwcata = res.data

        
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
  .timepiker{
    margin-left: 50px;
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