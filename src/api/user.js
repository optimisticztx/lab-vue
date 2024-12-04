import { myAxios } from "@/utils/axios.js";

export const getCaptcha = async () => {
  return await myAxios.request({
    url: "/api/user/captcha",
    method: "GET",
    headers: {
      token: "",
    },
  });
};

/**
 * 用户登录
 * @param params
 */
export const userLogin = async (params) => {
  return await myAxios.request({
    url: "/api/user/login",
    method: "POST",
    data: params,
  });
};
/**
 * 用户注销
 * @param params
 */
export const userLogout = async () => {
  return await myAxios.request({
    url: "/api/user/logout",
    method: "POST",
  });
};
/**
 * 获取当前用户信息
 * @param params
 */
export const getCurrentUser = async () => {
  return await myAxios.request({
    url: "/api/user/getCurrentLoginUser",
    method: "GET",
  });
};
