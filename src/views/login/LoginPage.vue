<script setup>
import { getCaptcha, userLogin } from "@/api/user.js";
import { useRoute, useRouter } from "vue-router";
import { useLoginUserStore } from "@/stores/useLoginUserStore.js";
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/el-message.css";
const route = useRoute();
const router = useRouter();
const loginLoading = ref(false);
const captchaImage = ref();
const captchaId = ref();
const loginUserStore = useLoginUserStore();
const accountFormRef = ref(null);
const accountForm = reactive({
  account: "",
  password: "",
  captchaCode: "",
  autoLogin: true,
});

const fetchCaptcha = async () => {
  getCaptcha().then((res) => {
    console.log("captcha res:", res);
    captchaId.value = res.result.captchaId;
    captchaImage.value = `data:image/png;base64,${res.result.captchaImage}`;
  });
};
onMounted(() => {
  fetchCaptcha();
});
const rules = reactive({
  userName: [{ required: true, message: "请输入账户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  captchaCode: [{ required: true, message: "请输入验证码", trigger: "blur" }],
});

const handleAccountLogin = () => {
  loginLoading.value = true;
  userLogin({
    // 测试数据，projectId=1
    userName: accountForm.userName,
    password: accountForm.password,
    captchaId: captchaId.value,
    captchaCode: accountForm.captchaCode,
  })
    .then(async (res) => {
      console.log("login res:", res);
      if (res.code === 200) {
        localStorage.setItem("token", res.result.token);
        // 登陆成功在ls中保存token
        await loginUserStore.fetchLoginUser();
        ElMessage({
          message: "登陆成功",
          type: "success",
        });
        //登陆成功
        router.push({
          path: "/manage/home",
        });
      } else {
        ElMessage({
          message: res.message,
          type: "error",
        });
        if (res.message === "验证码错误或已过期") {
          fetchCaptcha();
        }
      }
    })
    .catch((err) => {
      ElMessage({
        message: "用户名或密码错误",
        type: "error",
      });
    })
    .finally(() => {
      loginLoading.value = false;
    });
};
</script>

<template>
  <div class="login">
    <el-row class="title">502实验室管理平台</el-row>

    <el-row class="main">
      <el-card class="login-card">
        <el-tabs class="login-tabs" style="width: max-content">
          <!-- 登录表单 -->
          <el-form
            ref="accountFormRef"
            style="max-width: 600px"
            :model="accountForm"
            status-icon
            size="large"
            :rules="rules"
            label-position="left"
            label-width="auto"
          >
            <el-form-item label="账户" prop="userName">
              <el-input v-model="accountForm.userName" style="width: 240px" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="accountForm.password"
                type="password"
                autocomplete="off"
                style="width: 240px"
                show-password
              />
            </el-form-item>
            <el-form-item label="验证码" prop="captchaCode">
              <el-input
                v-model="accountForm.captchaCode"
                style="width: 120px"
              ></el-input>
              <el-image
                :src="captchaImage"
                @click="fetchCaptcha"
                alt="Captcha Image"
                style="
                  width: 110px;
                  height: 40px;
                  margin-left: 10px;
                  cursor: pointer;
                "
              />
            </el-form-item>
            <!--          <el-form-item label="自动登录" prop="autoLogin">-->
            <!--            <el-checkbox v-model="accountForm.autoLogin" ></el-checkbox>-->
            <!--          </el-form-item>-->
          </el-form>
          <el-button
            type="primary"
            size="large"
            style="width: 100%"
            @click="handleAccountLogin"
            :loading="loginLoading"
            >确定</el-button
          >
        </el-tabs>
      </el-card>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.login {
  display: flex;
  justify-content: center;
  //   align-items: center;
  height: 100vh;
  width: 100vw;
  background: url("@/assets/img/login-background.svg") no-repeat center center;
  background-size: cover;
}
.login-card {
  width: 400px;
  display: flex;
  flex-direction: column; /* 确保内部元素可以垂直布局 */
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
  height: 100%; /* 填充父元素 */
}

.login-tabs {
  margin: auto; /* 自动居中 */
}
.title {
  font-size: 28px;
  font-weight: 600;
  position: absolute;
  top: 120px;
}
.main {
  position: absolute;
  top: 200px;
}
</style>
