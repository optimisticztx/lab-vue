<script setup>
import { useLoginUserStore } from "@/stores/useLoginUserStore.js";

const userLoginStroe = useLoginUserStore();
console.log("设备管理中查看userStore：", userLoginStroe.loginUser);
</script>

<template>
  <div>设备管理</div>
</template>

<style scoped></style>
