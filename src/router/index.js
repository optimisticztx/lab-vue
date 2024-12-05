import { createRouter, createWebHistory } from "vue-router";
import { useLoginUserStore } from "@/stores/useLoginUserStore.js";
import { userLogout } from "@/api/user.js";
import { ElMessage } from "element-plus";
const index = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "初始页",
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "登录界面",
      component: () => import("@/views/login/LoginPage.vue"),
    },
    {
      name: "管理系统",
      path: "/manage",
      component: () => import("@/layout/ManageLayout.vue"),
      redirect: "/manage/home",
      children: [
        {
          path: "home",
          name: "首页",
          component: () => import("@/views/manage/HomePage.vue"),
        },
        {
          path: "people",
          name: "人员管理",
          children: [
            {
              path: "student",
              name: "学生管理",
              component: () => import("@/views/manage/people/StudentPage.vue"),
            },
            {
              path: "team",
              name: "团队管理",
              component: () => import("@/views/manage/people/TeamPage.vue"),
            },
          ],
        },
        {
          path: "device",
          name: "设备管理",
          component: () => import("@/views/manage/device/DevicePage.vue"),
        },
        {
          path: "account",
          name: "账号管理",
          component: () => import("@/views/manage/account/AccountPage.vue"),
        },
      ],
      meta: { requiresAuth: true }, //暂时不需要认证
    },
    {
      name: "大屏",
      path: "/screen",
      component: () => import("@/views/screen/index.vue"),
      // redirect:'/screen',
      meta: { requiresAuth: true }, //暂时不需要认证
    },
  ],
});
/**
 * 路由守卫
 */
index.beforeEach(async (e) => {
  // console.log("路由守卫：", e);
  if (e.path.startsWith("/login") && localStorage.getItem("token")) {
    await userLogout().then((res) => {
      console.log("强制进入login页面logout res：", res);
      ElMessage({
        message: res.message,
        type: "success",
      });
    });
    localStorage.removeItem("token");
  }
});
// index.beforeEach((to,from,next)=>{
//   const isAuthenticated = !!localStorage.getItem('token'); // 检查是否存在token
//
//   // 匹配的路由中任意一个存在需要授权的情况都需要验证权限情况
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!isAuthenticated) {
//       next({
//         path: '/login',
//         // query: { redirect: to.fullPath } // 保存目标路由以便登录后重定向
//       });
//     } else {
//       next(); // 已登录，允许访问
//     }
//   } else {
//     next(); // 不需要身份验证，允许访问
//   }
// })
export default index;
