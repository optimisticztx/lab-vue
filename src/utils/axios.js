import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ElNotification } from "element-plus";
import "element-plus/theme-chalk/el-notification.css";
// 创建 axios 实例
const service = axios.create({
  timeout: 30000, // 请求超时时间
});
const err = (error) => {
  if (error.response) {
    let data = error.response.data;
    const token = Vue.ls.get("aToken");
    console.log("------异常响应------", token);
    console.log("------异常响应------", error.response.status);
    switch (error.response.status) {
      case 403:
        console.log("------error.response------", error.response);
        break;
      case 500:
        console.log("------error.response------", error.response);

        break;
      case 404:
        break;
      case 504:
        break;
      case 401:
        break;
      case 10001:
        break;
      default:
        break;
    }
  } else if (error.message) {
    if (error.message.includes("timeout")) {
      // Vue.prototype.$Jnotification.error({message: '系统提示', description: '网络超时'})
    } else {
      // Vue.prototype.$Jnotification.error({message: '系统提示', description: error.message})
    }
  }
  return Promise.reject(error);
};

// request interceptor
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // 如果token过期，则提醒用户重新登录，并且跳转到login界面
      const decoded = jwtDecode(token);
      // console.log(`output->decoded`,decoded.exp)
      const timestampInSeconds = Math.floor(new Date().getTime() / 1000);
      // console.log(`output->timestampInSeconds`,timestampInSeconds)
      if (timestampInSeconds > decoded.exp) {
        // aToken
        ElNotification({
          title: "登录过期",
          message: "登录状态过期，请重新登录！",
          type: "error",
        });
        localStorage.removeItem("token");
        localStorage.removeItem("nickname");
        // TODO:根据配置跳转
        location.href = "localhost:3111/login"
        // router.push({
        //   path: "/login",
        // });
        return;
      }
      config.headers["token"] = token; // 固定场站token
    }

    // 确保config.params存在
    if (!config.params) {
      config.params = {};
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use((response) => {
  return response.data;
}, err);

export { service as axios };
