<script setup>
import { useLoginUserStore } from "@/stores/useLoginUserStore.js";

const userLoginStroe = useLoginUserStore();
console.log("账号管理中查看userStore：", userLoginStroe.loginUser);
</script>

<template>
  <div>账号管理</div>
</template>

<style scoped></style>
