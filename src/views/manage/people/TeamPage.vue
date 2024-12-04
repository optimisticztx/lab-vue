<script setup>
import { useLoginUserStore } from "@/stores/useLoginUserStore.js";

const userLoginStroe = useLoginUserStore();
console.log("团队管理中查看userStore：", userLoginStroe.loginUser);
</script>

<template>
  <div>团队管理</div>
</template>
<style></style>
