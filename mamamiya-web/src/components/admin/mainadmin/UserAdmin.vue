<template>
  <div class="createshop">
    <div class="bnav d-flex">
      <p class="navitem"  @click="getbrandlist(1)" :class="{navitemac:pageid == 2}">{{pageid == 4?"品牌商品":"用户列表"}}</p>
    </div>
    
    <!-- 第二页 -->
    <div class="bigbox" v-show="pageid == 2">
      <div v-for="(item,index) in userres" :key="index" >
        <div class="itembox"  >
          <img :src="item.avator" alt="" >
            <p class="rrrrr">用户名：{{item.username}}</p>
             <p class="rrrrrrr">用户余额:{{item.monney}}</p>
            <!-- <p class="rrrrrrb">用户账号：{{item.useraccount}}</p> -->
            <p class="rrrrrr">用户账号：{{item.useraccount}}</p>
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
        <el-upload 
          class="avatar-uploader inoimga"
          action="http://localhost:8003/api/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="user.avator" :src="user.avator" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
       </div>  
     
     
      <div class="detailinfo">
         
        <p>昵称</p>
        <b-form-input @blur="saveinfo" v-model="user.username" :placeholder="user.username == '' ? '请输入用户名':user.username" class="accountnam margin-auto"></b-form-input>
 
        <!-- <el-input v-model="user.username" class="accountnam margin-auto"></el-input> -->
        <p>用户账号</p>
        <b-form-input  :placeholder="user.useraccount == '' ? '请输入用户账号':user.useraccount" class="address margin-auto"></b-form-input>
        <!-- 这里修改了,要把它本地缓存删了，重新登录才行，现在测试暂时不修改 -->
        <p>用户密码</p>
        <b-form-input @blur="saveinfo" v-model="user.password" :placeholder="user.password == '' ? '请输入密码':user.password" class="address margin-auto"></b-form-input>
        <P>收货地址</P>
        <b-form-input @blur="saveinfo" v-model="user.address" :placeholder="user.address == '' ? '请输入收获地址':user.address" class="address margin-auto"></b-form-input>
     
      </div>
         <div class="item d-flex">   
           <el-button type="success" @click="upkonw">更新</el-button>
           <el-button type="success" @click="pageid = 2">返回</el-button>
        </div>  
        
    </div>
   
 
  </div>
</template>
<script>


export default {
  
  data() {
    return {
        //  ---------------- 用户 ----------------
        // 用户模型
       userres:[],
       user:'',

        //  ---------------- 知识 ---------------------
       
      // 分页变量
      total:0,


      // 页面变量
      pageid:2,
     
  
   
    };
  },
  watch:{
    
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
    

    // 数据统计
    async countall(){
      this.pageid = 5
      const axios = this.$config.getAxiosInstance("bbs");

      let resp = await axios.get('/api/mostbuy')
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
    // 编辑用户
    async editebrand(item){
      this.pageid = 3
      this.user = item
      
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
          url:"/api/listuser",
          method:'get',
          params:{
            curpage:1
          }
        })

       this.userres = res.data.data
       this.total = res.data.total

      //  console.log(this.konwlist);

    }
  },
  async created() {
        const axios = this.$config.getAxiosInstance("bbs");
        let res = await axios.get('/api/konwcata')
        this.konwcata = res.data

        let userres = await axios({
          url:"/api/listuser",
          method:'get',
          params:{
            curpage:1
          }
        })

        this.userres = userres.data.data
       

        
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



    // 用户
    .infobox{
  position: absolute;
  width: 1015px;
  height: inherit;
  border: solid gainsboro 1px;
  right: 0px;
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