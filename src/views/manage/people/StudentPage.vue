<script setup>
import { useLoginUserStore } from "@/stores/useLoginUserStore.js";

const userLoginStroe = useLoginUserStore();
console.log("学生管理中查看userStore：", userLoginStroe.loginUser);
</script>

<template>
  <div>学生管理</div>
</template>
