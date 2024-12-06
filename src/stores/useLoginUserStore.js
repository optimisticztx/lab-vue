import { defineStore } from "pinia";
import { getCurrentUser } from "@/api/user.js";
/**
 * 使用pinia来管理具体对象，以便编辑、新增和详细信息的实现。
 * 主要优点：降低组件的耦合性、优化代码结构
 */
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
  return { loginUser, fetchLoginUser, setLoginUser };// 暴露出去方便调用
});
