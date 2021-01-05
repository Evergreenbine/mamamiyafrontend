<template>
   <div id="loginpanel" class="jc-center" >
    <h1>登录</h1>
    <div><input　class="inputpanel" placeholder="用户名/手机号"></div>
    <div><input　class="inputpanel" placeholder="密码"></div>
    <div class="loginbtn" @click="login" >登录</div>
    <p style="margin-top:30px">还没有账号? 
        <router-link to="/login/register">立即注册</router-link></p>
    </div>
</template>

<script>
export default {

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