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
          <div class="pageitem" :class="{pageitemac : pageid == 2}" @click="pageid = 2">我的回复</div>
          <div class="pageitem" :class="{pageitemac : pageid == 3}" @click="pageid = 3">我的贴子</div>
          <div class="pageitem" :class="{pageitemac : pageid == 4}" @click="pageid = 4">回复我的</div>
          <div class="pageitem" :class="{pageitemac : pageid == 5}" @click="pageid = 5">我关注的圈子</div> 
          <div class="pageitem" :class="{pageitemac : pageid == 6}" @click="querymything">我购买的</div> 
      </div>
      <!-- 5:第一页 -->
      <div class="otherbox" v-show="pageid == 1" >
        余额:<el-input v-model="user.monney" placeholder="请输入标题" style="margin-right:10px"></el-input> 
      </div>
      <!-- 5:第二页 -->
      <div class="otherbox" v-show="pageid == 6" >
        <div class="overflow-auto poposi">
          <div v-for="(item,index) in myshop" :key="index">
            {{item.gname}}
          </div>
         <el-pagination
  background
  layout="prev, pager, next"
  :total="1000">
</el-pagination>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import FullTextEditor from '../FullTextEditor'

export default {
    name:"user",
    data() {
      return { 
        labelPosition:'left',
        // 控制变量
        pid:5,
        // 问题
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

        // 用户
        user:{
          username:'',
          useraccount:'',
          password:'',
          address:'',
          avator: '',
          monney:''
        },
        // 贴子
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
        // 购买记录
        myshop:[],
        // 总页数
        totalpage:0
  
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
        const bbsaxios = this.$config.getAxiosInstance('shop')
      },
      // 分页栏方法
       async linkGen(pageNum) {
         console.log(pageNum);
          const axios = this.$config.getAxiosInstance('shop')
          let resp = await axios({
            url:'/api/myshop',
            method:'get',
            params:{
              useraccount: this.user.useraccount,
              curpage:pageNum+1
            }
          })
         this.myshop = resp.data.resp
         this.totalpage = resp.data.totalpage
        return pageNum === 1 ? '?' : `?page=${pageNum}`
      }
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
  .otherbox{
    position: relative;
     width: 960px;
    margin-top: 30px;
    margin-left: 15px;
    border: 1px solid blue;
    height: 420px;
    .poposi{
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
  .selectbox{
    width: 800px;
    height: 30px;
    margin-top: 20px;
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
</style>

