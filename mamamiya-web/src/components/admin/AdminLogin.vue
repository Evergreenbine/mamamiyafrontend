<template>
  <div id="Login">
     <div>
        <b-card title="登录管理后台" sub-title="" class="bcard">
            
             <el-select v-model="admin.role" placeholder="登录身份选择">
                <el-option
                  v-for="item in role"
                  :key="item.role"
                  :label="item.rolename"
                  :value="item.role">
                </el-option>
              </el-select>
             <!-- 用户名-->
              <b-form-group id="input-group-1" label="用户名" label-for="input-1" class="inputbox" >
                  <b-form-input
                   id="input-1"
                    v-model="admin.adminname"
                   placeholder="请输入用户名"
                    required
                   ></b-form-input>     
              </b-form-group>
              <!-- 密码-->
              <b-form-group id="input-group-2" label="密码" label-for="input-2" class="inputbox">
                  <b-form-input
                   id="input-2"
                    v-model="admin.password"
                    type="password"
                   placeholder="请输入密码"
                    required
                   ></b-form-input>     
              </b-form-group>
              <b-button type="submit" variant="primary" class="subtn" @click="login" >登录</b-button>
              <b-button type="reset" variant="danger" @click="onReset">重置</b-button>
           
          <div class="linktoregister">
            还没有账号?<b-link to="/new/register" href="#">注册账号</b-link>
          </div>
        </b-card>
      </div>
  </div>
</template>

<script>
export default {
  name:"Login",
   data(){
      return{
        admin:{
          adminname:"",
          password:"",
          role:'' 
        },
        role:[{role:1,rolename:"主管理员"},{role:2,rolename:"商城运营"}],
        show:true
      }
   },
   methods:{
     async login(){
        const axios = this.$config.getAxiosInstance("admin");
        let res = await axios.post('/api/admin/login',this.admin)
        let url = res.data.url
        console.log(res.data);
        if(res.data.role != 0){
          alert("登录成功") 
          localStorage.setItem("admin",JSON.stringify(this.admin))
          // 这里不明白为啥通过模板字符串拼接成的字符串和要跳转的一样，结果条到时空白
          if(url == '/shop'){
            this.$router.push({path:'/admin/shop/user'})
          }else{
             this.$router.push({path:'/admin/main'})
          }
           
        }else{
          alert("登录失败")
        }
      
     },
     onReset(event) {
        event.preventDefault()
        // Reset our form values
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
   
}
</script>

<style scoped>
.bcard{
  width: 1000px;
  height: 500px;
}
.linktoregister{
  margin-top: 20px;
}
.inputbox{
  margin-top: 30px;
}
.subtn{
margin-right: 10px;
}
</style>