import { defineStore } from "pinia";
import { getCurrentUser } from "@/api/user.js";

/**
 * 使用pinia来管理具体对象，以便编辑、新增和详细信息的实现。
 * 主要优点：降低组件的耦合性、优化代码结构
 */
export const useAccountStore = defineStore("account", () => {
  const title = ref("新增");

  const account = ref({
    id: "",
    userName: "",
    nickName: "",
    password: "",
    status: "",
    email: "",
    phonenumber: "",
    sex: "",
    avatar: "",
    userType: "",
    delFlag: "",
  });

  function setAccount(newTitle, newAccount) {
    title.value = newTitle;
    account.value = newAccount;
    account.value.password = null; //密码已经加密，查看无意义，直接设置为空即可。
  }
  function clearAccount() {
    title.value = "新增";
    account.value = {};
  }
  return { title, account, setAccount, clearAccount }; // 暴露出去方便调用
});
