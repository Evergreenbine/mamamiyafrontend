<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-menu router :default-openeds="['1']">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-message"></i>导航一
        </template>
        <el-menu-item-group>
          <template slot="title">分类</template>
          <el-menu-item index="/admin/shop/milkcreate">新建奶粉</el-menu-item>
          <el-menu-item index="/admin/shop/diaperscreate">新建纸尿布</el-menu-item>
          <el-menu-item index="/admin/shop/foodcreate">新建婴儿食品</el-menu-item>
          <el-menu-item index="/admin/shop/feedingcreate">新建母婴用品</el-menu-item>
          <el-menu-item index="/admin/shop/list">奶粉列表</el-menu-item>
          <el-menu-item index="/admin/shop/diaperslist">纸尿布列表</el-menu-item>
          <el-menu-item index="/admin/shop/foodlist">婴儿食品列表</el-menu-item>
          <el-menu-item index="/admin/shop/feedinglist">婴儿用品列表</el-menu-item>
          <el-menu-item index="/admin/shop/brand">品牌列表</el-menu-item>
          <el-menu-item index="/admin/shop/dataview">数据统计与导出</el-menu-item>
          <el-menu-item index="/admin/shop/order">订单记录</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span class="color">Shop</span>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<style>
.el-header {
  background-color: beige;
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
  }
};
</script>

