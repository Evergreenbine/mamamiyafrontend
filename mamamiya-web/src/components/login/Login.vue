<template>
  <div id="Login">
     <div>
        <b-card title="登录mamamiya" sub-title="" class="bcard">
          
             <!-- 用户名-->
              <b-form-group id="input-group-1" label="用户名" label-for="input-1" class="inputbox" >
                  <b-form-input
                   id="input-1"
                    v-model="user.username"
                   placeholder="请输入用户名"
                    required
                   ></b-form-input>     
              </b-form-group>
              <!-- 密码-->
              <b-form-group id="input-group-2" label="密码" label-for="input-2" class="inputbox">
                  <b-form-input
                   id="input-2"
                    v-model="user.password"
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
        user:{
          username:"",
          password:"",
          token:""
        },
        show:true
      }
   },
   methods:{
     async login(){
       let data = {
         params:{
           "useraccount":this.user.username,
           "password":this.user.password
         },
         token:this.$store.state.token
       }
       let res = await this.$http.post("/login",data)
      //  console.log(res);
       if(res.data.httpStatus=="OK"){
         this.user.token = res.data.result;
         this.$store.commit('login',this.user)
         this.$router.replace('/')
       }else{
         alert("登录失败,请重新登录")
       }
     },
     onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.user.username = ''
        this.user.password = ''
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