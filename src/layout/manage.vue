<script setup>
import ManageHeader from './../components/ManageHeader.vue'
import ManageAsideNav from './../components/ManageAsideNav.vue'
import ManageBreadcrumb from '../components/ManageBreadCrumb.vue'

</script>

<template>
  <transition name="el-fade-in">
    <main>
      <div>
        <el-container>
          <el-header height="59px" class="header_layout">
            <ManageHeader></ManageHeader>
          </el-header>
          <el-container>
            <el-aside width="240px">
              <ManageAsideNav></ManageAsideNav>
            </el-aside>
            <el-main class="main">
              <ManageBreadcrumb class="breadcrumb"></ManageBreadcrumb>
              <div class="router-padding">
                <div class="router-view">
                  <router-view></router-view>
                </div>
              </div>
            </el-main>
          </el-container>
        </el-container>
      </div>
    </main>
  </transition>
</template>

<style scoped>
@import url("@/assets/style/layout.scss");
</style>
