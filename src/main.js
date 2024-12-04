import { createApp } from "vue";
import { createPinia } from "pinia";

import "./style.css";
import App from "./App.vue";
import index from "./router/index.js";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";

createApp(App)
  .use(createPinia()) //使用pinia来对vue的状态进行管理
  .use(index)
  .use(ElementPlus, {
    locale: zhCn,
  }) // 使用ElementPlus组件库
  .mount("#app");
