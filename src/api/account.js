import { myAxios } from "@/utils/axios.js";
export const getUserList = async (params) => {
    return await myAxios.request({
        url: "/api/user/list",
        method: "GET",
        params:params
    });
};

export const addUser = async (params) => {
    return await myAxios.request({
        url: "/api/user/add",
        method: "POST",
        data: params,
    });
};
export const editUser = async (params) => {
    return await myAxios.request({
        url: "/api/user/add",
        method: "POST",
        data: params,
    });
};

export const deleteUser = async (id) => {
    return await myAxios.request({
        url: "/api/user/delete/"+id,
        method: "POST",
    });
};
