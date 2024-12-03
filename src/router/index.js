import {createRouter, createWebHistory} from "vue-router";

const index = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name:'初始页',
            path:'/',
            redirect: '/manage/home',
        },
        {
            name:'管理系统',
            path:'/manage',
            component:()=>import("@/layout/manage.vue"),
            redirect:'/manage/home',
            children:[
                {
                    path:'home',
                    name:'首页',
                    component:()=>import("@/views/manage/index.vue")
                },
                {
                    path:'people',
                    name:'人员管理',
                    children:[
                        {
                            path:'student',
                            name:'学生管理',
                            component:()=>import("@/views/manage/people/student/index.vue")
                        },
                        {
                            path:'team',
                            name:'团队管理',
                            component:()=>import("@/views/manage/people/team/index.vue")
                        }
                    ]
                }
            ],
            meta: { requiresAuth: false } //暂时不需要认证
        },
        {
            name:'大屏',
            path:'/screen',
            component:()=>import("@/views/screen/index.vue"),
            // redirect:'/screen',
            meta: { requiresAuth: false } //暂时不需要认证
        }
    ],
})
index.beforeEach(v=>{
    console.log("路由守卫",v)
})
export default index
