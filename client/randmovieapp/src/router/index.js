import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/home',
    name: 'home',
    component: Index,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
