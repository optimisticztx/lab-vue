<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const List = reactive({ data: [] })
List.data = computed(() => route.matched.slice(1))

console.log("matched", route.matched)
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
<!--    <el-breadcrumb-item :to="item.path" v-for="(item) in List.data" :key="item.path">-->
    <el-breadcrumb-item v-for="(item) in List.data" :key="item.path">
      {{ item.name }}
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
</style>
