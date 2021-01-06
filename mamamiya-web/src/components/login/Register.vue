<template>
<div id="register">
    <div id="loginpanel" class="jc-center" >
        <h1>注册mamamiya</h1>
        <div><input　class="inputpanel" placeholder="用户名/邮箱" v-model="user.name"></div>
        <div><input　class="inputpanel" placeholder="密码" v-model="user.password"></div>
        <div class="loginbtn" @click="register" >注册</div>
        <p style="margin-top:30px">已有账号? 
        <router-link to="/new/login">直接登录</router-link></p>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            user:{
                name:"",
                password:""
            }
        }
    },
    methods:{
        register(){
            console.log(this.user.name);
            console.log(this.user.password);
            console.log("注册");
        }
    }

}
</script>

<style>
.registerpanel{
    position: relative;
    width: 1000px;
    height: 500px;
    border: 1px solid gainsboro;
    top: 100px;
}
</style>