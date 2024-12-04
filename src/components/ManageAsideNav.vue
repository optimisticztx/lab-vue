<script setup>
import memberImgUrl from "@/assets/img/u12.svg";
import deviceImgUrl from "@/assets/img/u8.svg";
import gridImgUrl from "@/assets/img/u20.svg";
import riskImgUrl from "@/assets/img/u16.svg";

import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

function doMenuClick(index) {
  router.push({ path: index });
}
const activeMenu = ref(route.fullPath);
router.afterEach((to, from, failure) => {
  activeMenu.value = to.fullPath;
});

const stationId = ref(0);

onMounted(() => {});
</script>

<template>
  <el-menu class="menu" :default-active="activeMenu" @select="doMenuClick">
    <el-menu-item index="/manage/home">
      <el-icon :size="20">
        <i-ep-house></i-ep-house>
      </el-icon>
      <span class="first_menu">首页</span>
    </el-menu-item>
    <el-sub-menu index="/manage/people">
      <template #title>
        <el-icon :size="20">
          <i-ep-data-analysis></i-ep-data-analysis>
        </el-icon>
        <span class="first_menu">人员管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item class="menu-item" index="/manage/people/student"
          >学生管理</el-menu-item
        >
        <el-menu-item class="menu-item" index="/manage/people/team"
          >团队管理</el-menu-item
        >
      </el-menu-item-group>
    </el-sub-menu>

    <el-menu-item index="/manage/device">
      <el-icon :size="20">
        <i-ep-house></i-ep-house>
      </el-icon>
      <span class="first_menu">设备管理</span>
    </el-menu-item>
    <el-menu-item index="/manage/account">
      <el-icon :size="20">
        <i-ep-house></i-ep-house>
      </el-icon>
      <span class="first_menu">账号管理</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
.menu {
  margin-top: 10px;
  height: calc(100vh - 123px);
  /* .el-sub-menu{
    background-color: rgba(104, 151, 167, 0.359);
  } */
}
.first_menu {
  font-size: 18px;
  font-weight: 500;
  margin-left: 15px;
}

.menu-item {
  display: flex;
  align-items: center;
  height: 60px;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  text-indent: 30px;
}
</style>
