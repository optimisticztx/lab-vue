<script setup>
import { useRouter } from "vue-router";
import { getAction, postAction } from "@/utils/http.js";

const router = useRouter();
function handleClick(to) {
  if (to == undefined) {
    return;
  }
  if (to == "exit") {
    //TODO: 退出操作
    return;
  }
  router.push({
    path: to,
  });
}

onMounted(() => {
  // your code
});

const nickname = ref("test");

const handleLogoutClick = () => {
  localStorage.removeItem("aToken");
  localStorage.removeItem("stationId");
  localStorage.removeItem("nickname");
  localStorage.removeItem("s-stationId");
  localStorage.removeItem("s-lotId");
  localStorage.removeItem("s-projectId");
  localStorage.removeItem("type");
  router.push({
    path: "/login",
  });
};
</script>

<template>
  <div class="header">
    <!-- Logo 图标 -->
    <img
        style="width: 50px"
        src="@/assets/logo/school-logo.png"
    />

    <span>502实验室管理平台</span>
    <div class="function">
      <el-button size="large" class="el-btn" color="#1890ff" @click="handleClick('/screen')">
        Web大屏
        <template v-slot:icon>
          <el-icon>
            <i-ep-monitor></i-ep-monitor>
          </el-icon>
        </template>
      </el-button>

      <el-button size="large" class="el-btn" color="#1890ff" @click="handleClick()">
        欢迎您，{{ nickname }}
        <template v-slot:icon>
          <el-icon>
            <i-ep-user></i-ep-user>
          </el-icon>
        </template>
      </el-button>

      <el-button size="large" class="el-btn" color="#1890ff" @click="handleLogoutClick()">
        退出登陆
        <template v-slot:icon>
          <el-icon>
            <i-ep-switch-button></i-ep-switch-button>
          </el-icon>
        </template>
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.header {
  position: relative;
  display: flex;
  height: 59px;
  width: 100%;
  align-items: center;
  background-color: #1890ff; /* 背景色设置为蓝色 */
}


span {
  color: rgb(255, 255, 255);
  font-size: 20px;
  font-weight: 600;
  margin-left: 10px;
}

.function {
  padding-right: 10px;
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
}

.el-button {
  font-size: 16px;
  font-weight: 400;
}
</style>
