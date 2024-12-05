import { defineStore } from "pinia";
import { getCurrentUser } from "@/api/user.js";

export const useAccountStore = defineStore("account", () => {
    const title = ref("新增")

    const account = ref({
        id:"",
        userName: "",
        nickName: "",
        password: "",
        status: "",
        email: "",
        phonenumber: "",
        sex: "",
        avatar: "",
        userType: "",
        delFlag: ""
    });

    function setAccount(newAccount) {
        account.value = newAccount;
    }
    function  clearAccount(){
        title.value = "编辑";
        account.value = {};
    }
    return { title, account, setAccount };
});
