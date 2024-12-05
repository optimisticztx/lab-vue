<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const List = reactive({ data: [] })
List.data = computed(() => route.matched.slice(1))

// console.log("matched", route.matched)
</script>

<template>
  <el-breadcrumb class="el-breadcrumb" :separator-icon="ArrowRight">
<!--    <el-breadcrumb-item :to="item.path" v-for="(item) in List.data" :key="item.path">-->
    <el-breadcrumb-item v-for="(item) in List.data.slice(0, -1)" :key="item.path">
      {{ item.name }}
    </el-breadcrumb-item>
    <el-breadcrumb-item class="bread-bold" v-for="(item) in List.data.slice(-1)" :key="item.path">
      <b>{{ item.name }}</b>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped>
.el-breadcrumb {
  display: flex;
  align-items: center;
  margin-left: 16px;
  font-size: 16px;
}
.bread-bold{
  font-size: 18px;
  color: #000000;
}
</style>
