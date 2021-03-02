<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-menu router :default-openeds="['1']">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-message"></i>导航一
        </template>
        <el-menu-item-group>
          <template slot="title">分类</template>
           <el-menu-item index="/admin/main/user">用户管理</el-menu-item>
           <el-menu-item index="/admin/shop">商城管理</el-menu-item>
          <el-menu-item index="/admin/main/konw">知识管理</el-menu-item>     
          <el-menu-item index="/admin/main/circle">论坛管理</el-menu-item>
      
        </el-menu-item-group>
      </el-submenu>
    </el-menu>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span class="color">Main</span>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<style>
.el-header {
  background-color: rgba(157, 157, 240, 0.411);
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.color {
  font-size: 110px;
  color: white;
}
</style>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item)
    };
  },
  created(){
    let a =JSON.parse(localStorage.getItem("admin"))
    if(a == null || a == ''){
      this.$router.replace({path:'/admin/login'})
    }
  }
};
</script>