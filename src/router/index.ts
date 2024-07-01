import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routers: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/login/index.vue')
  },
  {
    redirect: '/workbench',
    path: '/admin',
    name: 'Admin',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/workbench',
        name: 'Workbench',
        component: () => import('@/views/workbench/index.vue')
      },
      {
        path: '/park',
        name: 'Park',
        redirect: '/park/building',
        children: [
          {
            path: 'building',
            name: 'Building',
            component: () => import('@/views/park/building/building.vue')
          },
          {
            path: 'enterprise',
            name: 'Enterprise',
            component: () => import('@/views/park/enterprise/enterprise.vue')
          }
        ]
      },
      {
        path: '/car',
        name: 'Car',
        redirect:'/car/area',
        children:[
          {
            path: 'area',
            name: 'Area',
            component: () => import('@/views/car/area/index.vue')
          },
          {
            path: 'monthCard',
            name: 'MonthCard',
            component: () => import('@/views/car/monthCard/index.vue')
          }
        ]
      }
    ]
  },



  {
    path:'/bigscreen',
    name:'Bigscreen',
    redirect:'/bigscreen/home',
    component:() => import('@/views/Bigscreen/home.vue'),
    children:[
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Bigscreen/home.vue')
      }
    ]
  },
  {
    path: '/add',
    name: 'Add',
    component: () => import('@/views/park/enterprise/enterpriseAdd.vue')
  },
  {
    path: '/check',
    name: 'Check',
    component: () => import('@/views/park/enterprise/enterpriseCheck.vue')
  },{
    path:'/monthCardCom/:type/:title/:query?',
    name:'MonthCardCom',
    component:() => import('@/views/car/monthCard/components/popUP.vue')
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routers
})

export default router
