<template>
  <div id="userinfoma" class="max-width margin-auto">
    <div class="indextag">
      <div class="tag" @click="backindex"> 首页</div>
      <div class="tag" @click="pid =1" :class="{tagctive:pid == 1}"> 个人中心</div>
      <div class="tag" @click="pid =2" :class="{tagctive:pid == 2}"> 编辑资料</div>
      <div class="tag" @click="pid =3" :class="{tagctive:pid == 3}"> 发布帖子</div>
      <div class="tag" @click="pid =4" :class="{tagctive:pid == 4}"> 发布提问</div>
      <div class="tag" @click="pid =5" :class="{tagctive:pid == 5}"> 查看其它</div>
    </div>
    <!-- 第一页 -->
   <div class="infobox position-re" v-show="pid == 1">
  
      <div class="ingoimg position-ab">
      
          <img class="avatar-uploader inoimga avatar" v-if="user.avator" :src="user.avator" >
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
     
      </div>
      <div class="detailinfo">
        <p>昵称</p>
        <b-form-input  readonly v-model="user.username" :placeholder="user.username == '' ? '请输入用户名':user.username" class="accountnam margin-auto"></b-form-input>
        <!-- <el-input v-model="user.username" class="accountnam margin-auto"></el-input> -->
        <p>用户账号</p>
        <b-form-input  readonly :placeholder="user.useraccount == '' ? '请输入用户账号':user.useraccount" class="address margin-auto"></b-form-input>
        <!-- 这里修改了,要把它本地缓存删了，重新登录才行，现在测试暂时不修改 -->
        <p>用户密码</p>
        <b-form-input  readonly v-model="user.password" :placeholder="user.password == '' ? '请输入密码':user.password" class="address margin-auto"></b-form-input>
        <P>收货地址</P>
        <b-form-input  readonly v-model="user.address" :placeholder="user.address == '' ? '请输入收获地址':user.address" class="address margin-auto"></b-form-input>
      
      </div>
    </div>
    <!-- 第二页 -->
    <div class="infobox position-re" v-show="pid == 2">
  
      <div class="ingoimg position-ab">
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
        <b-form-input  readonly :placeholder="user.useraccount == '' ? '请输入用户账号':user.useraccount" class="address margin-auto"></b-form-input>
        <!-- 这里修改了,要把它本地缓存删了，重新登录才行，现在测试暂时不修改 -->
        <p>用户密码</p>
        <b-form-input @blur="saveinfo" v-model="user.password" :placeholder="user.password == '' ? '请输入密码':user.password" class="address margin-auto"></b-form-input>
        <P>收货地址</P>
        <b-form-input @blur="saveinfo" v-model="user.address" :placeholder="user.address == '' ? '请输入收获地址':user.address" class="address margin-auto"></b-form-input>
     
      </div>
    </div>

    <!-- 第3页 -->
    <div class="infobox position-re" v-show="pid == 3">
      <div class="postcontent">
        <div class="titlebox d-flex" >
          <p class="titleword">标题</p>
          <el-input v-model="post.title" placeholder="请输入标题" style="margin-right:10px"></el-input>
           <!-- this.circle.canme 怎么就不行咧？el-select 估计默认会绑定个value，就会传到selectedCircle里去 -->
           <el-select v-model="circle.cname" slot="prepend" placeholder="请选择圈子" @change="selectedCircle">
             <el-option :label="item.cname" :value="item.cid" v-for="item in this.circle" :key="item.cid" >
             </el-option>
           </el-select>

        </div>
        <!-- 子向父传值 this.$emit("func",data),这个fun就基本像是自定义事件或属性，子组件绑定这个fun，即获得一个新的事件一样 父组件使用savecontent接受即可 -->
        <FullTextEditor v-on:func="savecontent"/>
         <b-button variant="outline-primary" class="publish" @click="publish">发布</b-button>
         </div>
    </div>

    <!-- 第4页 发布问题 -->
    <div class="infobox position-re" v-show="pid == 4">
      <div class="qusbox" >
       <el-form :label-position="labelPosition" label-width="80px" :model="question">
        <el-form-item label="问题标题" >
          <div class="d-flex">
          <el-input v-model="question.title"></el-input>
            <el-select v-model="question.qcid" placeholder="请选择">
              <el-option
                v-for="item in this.quescata2"
                :key="item.qcid"
                :label="item.qname"
                :value="item.qcid">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="问题内容">
          <el-input rows="10" v-model="question.content" type="textarea" maxlength="150"
          placeholder="最多输入150字哟" style="height:200px" ></el-input>
        </el-form-item>
        <el-button @click="publishques">发布提问</el-button>
       </el-form>
      </div>
    </div>

    <!-- 第5页 -->
    <div class="infobox position-re" v-show="pid == 5">

      <div class="selectbox">
          <div class="pageitem" :class="{pageitemac : pageid == 1}" @click="pageid = 1">查看金额</div>
          <div class="pageitem" :class="{pageitemac : pageid == 2}" @click="()=>{
            this.pageid = 2
            this.$router.push({path:'/user/other'})}">回复我的</div>
          <div class="pageitem" :class="{pageitemac : pageid == 3}" @click="()=>{
            this.pageid = 3
            this.$router.push({path:'/user/myreplyto'})}">我的回复</div>
          <div class="pageitem" :class="{pageitemac : pageid == 4}" @click="()=>{
            this.pageid = 4
            this.$router.push({path:'/user/myreplypost'})}">我的贴子</div>
          <div class="pageitem" :class="{pageitemac : pageid == 7}" @click="()=>{
            this.pageid = 7
            this.$router.push({path:'/user/replymepost'})
            }">回复我的贴子</div>
          <div class="pageitem" :class="{pageitemac : pageid == 8}" @click="()=>{
            this.pageid = 8
            this.$router.push({path:'/user/replymefloor'})
            }">回复层主信息</div>
          <div class="pageitem" :class="{pageitemac : pageid == 5}" @click="()=>{
            this.pageid = 5
            this.$router.push({path:'/user/myfollowcircle'})}">我关注的圈子</div> 
          <div class="pageitem" :class="{pageitemac : pageid == 6}" @click="querymything">{{ curgid == -1?"我购买的":"评价商品"}}</div> 
      </div>
      <!-- 5:第一页 -->
      <div class="otherbox" v-show="pageid == 1" >
        余额:<el-input v-model="user.monney" placeholder="请输入标题" style="margin-right:10px"></el-input> 
      </div>
      <!-- 5:查看回复我的 -->
      <div class="otherbox" v-show="pageid == 2">
         <router-view/>
      </div>
      <!-- 5:查看我回复的 -->
      <div class="otherbox" v-show="pageid == 3">
         <router-view/>
      </div>
      <!-- 5：查看我的贴子 -->
      <div class="otherbox" v-show="pageid == 4">
         <router-view/>
      </div>
      <!-- 5:回复我的贴子 -->
      <div class="otherbox" v-show="pageid == 7">
         <router-view/>
      </div>
      <!-- 5：回复我作为层主时的信息 -->
      <div class="otherbox" v-show="pageid == 8">
         <router-view/>
      </div>
      <!-- 5：查看我的圈子 -->
      <div class="otherbox" v-show="pageid == 5">
         <router-view/>
      </div>
      
      <!-- 5:我购买的 -->
    <div class="otherbox" v-show="pageid == 6 && curgid == -1" >
         <div class="recorditem position-re" v-for="(item,index) in myshop" :key="index">
           <img :src="item.img" alt="" class="iimg">
            <p class="oid">订单编号:{{item.orderid}}</p>
           <p class="goodname">商品名:{{item.gname}}</p>
           <p class="nums">数量:{{item.nums}}</p>
           <p class="comm" @click="ccgood(item)">评价</p>
          
           <!-- <p class="price">价格:{{item.price}}</p> -->
          </div>

        <!-- 分页栏 -->
         <div class="pagenav">
         <el-pagination
            @current-change="handleCurrentChange"
          :page-size="5"
          :pager-count="11"
          layout="prev, pager, next"
          :total="totalrecord">
          </el-pagination>
        </div>
      
    </div>
    <!-- 同是第五页，评价商品 -->
    <div class="otherbox" v-show="pageid == 6 && curgid != -1"  >
        <div class="ccommbox">
          <!-- 评价商品 -->
          <img class="cocoimg" :src="cocogood.img" alt="">
            <p class="cocobrand">品牌:{{cocogood.bname}}</p>
            <p class="cocogoodname">商品名:{{cocogood.gname}}</p>
             <el-rate v-model="commentgood.rate"></el-rate>
            <b-form-input class="ccinput" v-model="commentgood.content"></b-form-input>
            <div class="goback" @click="()=>{
                this.curgid = -1
                this.pageid = 6
                this.cocogood = ''
              }">返回</div>
            <div class="pingjia"
            @click="ccccgood">评价</div>
        </div>
    </div>
    
    </div>
    <!-- 和我购买的同一页，这里弄商品评价 -->
    <!-- 我购买的 -->
   

  </div>
</template>

<script>
import FullTextEditor from '../FullTextEditor'

export default {
    name:"user",
    data() {
      return { 

        // 回复我的
        replymetotal:0,
        replyme:[],
        
        // 评价商品
        commentgood:{
          gid:'',
          content:'',
          useraccount:'',
          rate:0
        },

        labelPosition:'left',
        // 控制左侧栏变量
        pid:5,
        // 问题模型
        question:{
          title:'',
          useraccount:'',
          content:'',
          qcid:''
        },
        // 这是其他页面的页面控制变量
        pageid:6,
        // 这个是问题分类变量
        quescata2:'',

        // 用户模型
        user:{
          username:'',
          useraccount:'',
          password:'',
          address:'',
          avator: '',
          monney:''
        },
        // 贴子模型
        post:{
          title:'',
          content:'',//这里不定义是单独传到后端，避免被Requestbody转码
          // author:this.user.username 因为user是created执行后才有值，而post，user都是在这之前赋值，所以这样赋值会出现undefined
          author:'',
          time:'',
          useraccount:'',
          cid:''
        },
        // 单独接收子组件传来的内容
        content:'',
        // 圈子分类
        circle:[],
        // 购买记录数组
        myshop:[],
        // 总页数
        totalrecord:'',
        // 记录当前需要评价的商品gid
        curgid:-1,
        // 记录下当前需要评价的商品，好做显示
        cocogood:''
  
      }
    },
    components:{
      FullTextEditor
    },
    methods: {
      async saveinfo(){
        // alert("hah")
       const axios = this.$config.getAxiosInstance('user')
       let resp = await axios.post('/api/user',this.user)
       
      },
      backindex(){
        this.$router.push("/")
      },
      // 上传头像
       handleAvatarSuccess(res, file) {
        this.user.avator = res.url
        this.saveinfo()
      },
      // 接受从子组件富文本编辑器传来的内容
      savecontent(content){
        this.post.content = content
        // console.log("父组件中的debug info"+content);
        console.log("查看保存后的内容(this.post.content)                 "+this.post.content);
      },
      // 这是获取下拉框中选中的圈子
      selectedCircle(cid){
        // console.log("你他吗选中的是"+index);
        this.post.cid = cid
        console.log(this.post.cid);
      },
      // 第二页上传头像的方法
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      // 发布帖子的方法
      async publish(){
        // alert(this.user.username)
        // alert(this.post.author)
        this.post.author = this.user.username
        this.post.useraccount = this.user.useraccount
         const bbsaxios = this.$config.getAxiosInstance('bbs')
         let res = await bbsaxios({
           url:'/api/post',
           method:'post',
           data:this.post,
           params:{
            //  postcircle:this.content
           }
         })
         if(res.data == 1){
           alert("发布帖子成功")
         }
        
      },
      // 发布问题的方法
      async publishques(){
        // alert(this.question.content)
        const bbsaxios = this.$config.getAxiosInstance('bbs')
        this.question.useraccount =  this.user.useraccount
        let res = await bbsaxios.post("/api/ques",this.question)
        if(res.data == 1){
          alert("发布问题成功")
          this.pid =1
        }
      },
      //查询我的购买记录
      querymything(){
        this.pageid = 6
        // 点击查看购买记录时，要去1
         this.handleCurrentChange(1)
      },
       // 查询回复我的
      async checkmyreply(){
        this.pageid = 2
      },
      // 分页栏方法
       async handleCurrentChange(pageNum) {
          const axios = this.$config.getAxiosInstance('shop')
          let resp = await axios({
            url:'/api/myshop',
            method:'get',
            params:{
              useraccount: JSON.parse(localStorage.getItem("username")),
              curpage:pageNum
            }
          })
         this.myshop = resp.data.resp
         this.totalrecord = resp.data.total

        //  alert(resp.data.totalpage)
        return pageNum === 1 ? '?' : `?page=${pageNum}`
      },
        
     
      //评价商品的方法,跳转到页面的方法
      ccgood(item){
        // 将当前要评论的商品gid记录一下
        this.curgid = item.gid
        this.cocogood = item
      },
      // 评价商品的方法，传数据到后端的方法
      async ccccgood(){
        const bbsaxios = this.$config.getAxiosInstance('shop')
        this.commentgood.gid = this.cocogood.gid
        this.commentgood.useraccount = JSON.parse(localStorage.getItem('username'))
        let res = await bbsaxios.post('/api/commentgood',this.commentgood)
        if(res.data == 1){
          alert("评价成功")
        }
      },
     

    },
    async created() {
      //  后端分了模块 user模块
       const axios = this.$config.getAxiosInstance('user')
       let useraccount = JSON.parse(localStorage.getItem('username'))
       let resp = await axios.get(`/api/user/${useraccount}`)
       let result =resp.data.result;
       this.user.username = result.username
       this.user.password = result.password
       this.user.useraccount = result.useraccount
       this.user.avator = result.avator
       this.user.address = result.address
       this.user.monney = result.monney
       console.log(result);
      //  论坛模块
       const bbsaxios = this.$config.getAxiosInstance('bbs')
       let resp2 = await bbsaxios.get('/api/circle')
       let result2 = resp2.data.result
       this.circle = result2
       console.log(result2);

      //  查询问题分类
      let quescata = await bbsaxios.get("/api/ques/all")
      this.quescata2 = quescata.data
      // 查询购买记录
     
    }
  
}
</script>

<style lang="scss" scoped>
// 第一第二页
#userinfoma{
  // border: 1px solid gainsboro;
  height: 500px;
  margin-top: 100px;
  position: relative;
}
.indextag{
  float: left;;
  width: 83px;
  height: inherit;
  // border: solid gold 1px;
}
.infobox{
  position: absolute;
  width: 1015px;
  height: inherit;
  border: solid gainsboro 1px;
  right: 0px;
}
.ingoimg{
  left: 50px;
  top: 50px;
  width: 178px;
  height: 178px;
  // border: 1px solid blueviolet;
}
.inoimga{
  width: 178px;
  height: 178px;
  // border: 1px salmon solid;
  box-shadow: 1px silver;
}
.detailinfo{
  top: 50px;
  right: 120px;
  position: absolute;
  width: 550px;
  height: 500px;
  
  // border: 1px solid gold; 
}
.accountnam{
  margin-top: 10px;
  width: 500px;
  height: 45px;
  // border: 1px solid green;
  margin-bottom: 10px;
}
.address{
  margin-top: 10px;
  width: 500px;
  height: 45px;
   margin-bottom: 10px;
  // border: 1px solid green;
}
.tag{
  cursor: pointer;
  margin-top: 15px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  width: 85px;
  height: 45px;
  border: 1px solid gainsboro;
  border-right: none;
  line-height: 45px;
  

}
.tagctive{
 background-color: rgb(218, 216, 216);
}
p{
  margin: 0;
  padding: 0;
  margin-top: 3px;
}
// 编辑头像
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
    width: 178px;
    height: 178px;
    display: block;
  }
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }
// 第三页
  .bbcard{
    width: 500px;
  }
  .postcontent{
    position: absolute;
    // border: 1px solid gold;
    left: 157.5px;
    height: 500px;
  }
  .titleword{
    width: 80px;
    line-height: 40px;
  }
  .titlebox{
    margin-top: 10px;
  }
  .publish{
    position: absolute;
    bottom: 8px;
    right: 0px;
    width: 200px;
  }

  // 发布问题盒子
  .qusbox{
    width: 960px;
    margin-top: 30px;
    margin-left: 15px;
    // border: 1px solid blue;
    height: 420px;
  }
  // 查看其它
  .otherbox{
    // border: #409EFF 1px solid;
    position: relative;
     width: 960px;
    margin-top: 30px;
    margin-left: 30px;
    // border: 1px solid blue;
    height: 420px;
    // 
    .pagenav{
      position: absolute;
      bottom: 0;
      left: 50px;
      // border:#409EFF solid 1px;
    }
  }
  // 购买记录盒子
  .recorditem{
    cursor: pointer;
    // position: absolute;
    width: 960px;
    height: 71px;
    border: 1px solid gainsboro;
    margin-bottom: 2px;
    .iimg{
      position: absolute;
      width: 55px;
      height: 55px;
      left: 20px;
      border: gainsboro 1px solid;
      margin-top: 8px;
    }
    .oid{
      position: absolute;
      top: 5px;
      left: 120px;
      color: #807e7e;
    }
    .goodname{
      margin-top: 5px;
       color: #807e7e;
    }
    .nums{
        color: #807e7e;
    }
    .comm{
      position: absolute;
      width: 100px;
      height: 30px;
      border: 1px solid gainsboro;
      top: 17px;
      right: 10px;
      line-height: 30px;
    }
    .comm:hover{
      border: #409EFF 1px solid;
      background: #409EFF;
      color: white;
    }
  }
  // 我购买的 那个导航栏
  .selectbox{
    width: 1000px;
    height: 30px;
    margin-top: 20px;
    // border: 1px solid gray;
    .pageitem{
      float: left;
      margin-left: 20px;
      font-size: 13px;
      width: 90px;
      cursor: pointer;
    }
    .pageitemac{
      border-bottom: 1px solid gainsboro;
    }
  }
  // 评价商品的盒子
  .ccommbox{
    // position: relative;
    .cocoimg{
      width: 120px;
      height: 120px;
    }
    .cocobrand{}
    .cocogoodname{}
           
    .ccinput{
      position: absolute;
      top: 200px;
      width: 900px;
      margin: 0 auto;
      left: 36px;
    }
    .goback{
      cursor: pointer;
      position: absolute;
      top: 250px;
      left: 330px;
      border: 1px solid gainsboro;
      width: 120px;
      height: 35px;
      line-height: 35px;
    }
    .goback:hover{
      border: red 1px solid;
      background-color: red;
      color: white;
    }
    .pingjia{
      cursor: pointer;
     position: absolute;
      top: 250px;
      left: 480px;
      border: 1px solid gainsboro;
      width: 120px;
      height: 35px;
      line-height: 35px;
    }
    .pingjia:hover{
      border: #409EFF  1px solid;
      background-color: #409EFF;
      color: white;
    }
   
  }
</style>

