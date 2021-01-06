<template>
   <div id="loginpanel" class="jc-center" >
    <h1>登录mamamiya</h1>
    <div>
        <input　class="inputpanel" placeholder="用户名/手机号" v-model="user.username">
        <p>{{infoname}}</p>
    </div>
    <div>
        <input　class="inputpanel" placeholder="密码" v-model="user.password">
        <p>{{infopass}}</p>
    </div>
    <div class="loginbtn" @click="login" >登录</div>
    <p style="margin-top:30px">还没有账号? 
        <router-link to="/new/register">立即注册</router-link></p>
    </div>
</template>

<script>
export default {
 data(){
        return{
            user:{
                username:"",
                password:""
            },
            infoname:"",
            infopass:""
        }
    },
    methods:{
        async login(){
            let user = this.user;
            let res = null;
            if(user.username != null&&user.username !="" && user.password!=null&&user.password!=""){            
                 res = await this.$http.post("/login",user);
                   if(res.status == 200){
                         this.$store.commit('login',user);
                         alert("登录成功")
                         this.$router.replace("/")
                    }
            }else{
                if(user.username == null||user.username==""){
                    this.infoname = "用户名为空";
                }
                if(user.password == null||user.password==""){
                    this.infopass = "密码为空";
                }
                console.log("infoname的信息是："+this.password);
            }
        }
    }
}
</script>

<style>
#loginpanel{
    position: relative;
    width: 1000px;
    height: 500px;
    border: 1px solid gainsboro;
    top: 100px;
}
.inputpanel{
    margin-top: 50px;
    width: 600px;
    height: 50px;
    text-decoration: none;
}
.loginbtn{
    margin: 0 auto;
    width: 604px;
    height: 54px;
    background-color: rgb(255, 144, 166);
    cursor: pointer;
    line-height: 50px;
    font-size: 30px;
    color: aliceblue;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    margin-top: 50px;
}
</style>