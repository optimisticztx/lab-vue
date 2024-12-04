import { defineStore } from "pinia";
import { getCurrentUser } from "@/api/user.js";

export const useLoginUserStore = defineStore("loginUser", () => {
  const loginUser = ref({
    username: "未登录",
  });
  async function fetchLoginUser() {
    const res = await getCurrentUser();
    if (res.code === 200 && res.result) {
      loginUser.value = res.result.user;
    }
  }
  function setLoginUser(newLoginUser) {
    loginUser.value = newLoginUser;
  }
  return { loginUser, fetchLoginUser, setLoginUser };
});
