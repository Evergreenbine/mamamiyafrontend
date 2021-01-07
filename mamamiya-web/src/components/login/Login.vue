<template>
  <div id="Login">
     <div>
        <b-card title="登录mamamiya" sub-title="" class="bcard">
           <b-form @submit="onSubmit" @reset="onReset" v-if="show">
              <b-form-group id="input-group-1" label="用户名" label-for="input-1" class="inputbox">
                  <b-form-input
                   id="input-1"
                    v-model="user.username"
                   placeholder="请输入用户名"
                    required
                   ></b-form-input>     
              </b-form-group>
              <b-form-group id="input-group-2" label="密码" label-for="input-2" class="inputbox">
                  <b-form-input
                   id="input-2"
                    v-model="user.password"
                   placeholder="请输入密码"
                    required
                   ></b-form-input>     
              </b-form-group>
              <b-button type="submit" variant="primary" class="subtn">Submit</b-button>
              <b-button type="reset" variant="danger">Reset</b-button>
           </b-form>
          <div class="linktoregister">
            还没有账号?<b-link href="/new/register">注册账号</b-link>
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
          password:""
        },
        show:true
      }
   },
   methods:{
     async onSubmit(){

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