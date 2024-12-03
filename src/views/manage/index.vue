<script setup>
import {useCounterStore} from "@/stores/counter.js";
const counter = useCounterStore()
const cnt = ref(6)
const inc = () => cnt.value++
</script>


<template>
<!--  <el-button @click="inc">-->
<!--    我是一个el-button！数字:{{cnt}}-->
<!--  </el-button>-->

<!--  <div @click="counter.inc()">我是首页。-->
<!--    点击增加计数，目前计数:{{counter.num}}！</div>-->
  <div>首页</div>

</template>
