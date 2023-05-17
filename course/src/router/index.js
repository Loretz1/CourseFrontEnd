import {createRouter, createWebHashHistory} from 'vue-router';

// 路由列表
const routes = [
    {
        path: "/",
        redirect: "/login"
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/managerpage',
        name: 'managerpage',
        component: () => import('../views/ManagerPage.vue')
    },
    {
        path: '/studentpage',
        name: 'studentpage',
        redirect: "/studentpage/selection",
        component: () => import('../views/StudentPage.vue'),
        children: [{
            path: 'selected',
            name:'stu_selected',
            components:{
                student_view:() => import('../components/stu_selected.vue')
            }
          },{
            path: 'selection',
            name:'stu_selection',
            components:{
                student_view:() => import('../components/stu_selction.vue')
            }
          },{
            path: 'print',
            name:'stu_print',
            components:{
                student_view:() => import('../components/stu_print.vue')
            }
          },{
            path: 'search',
            name:'stu_search',
            components:{
                student_view:() => import('../components/search.vue')
            }
          }
        ]
    },
    {
        path: '/teacherpage',
        name: 'teacherpage',
        component: () => import('../views/TeacherPage.vue')
    }
]


const router=createRouter({
    history: createWebHashHistory(),
    routes
})

export default router




