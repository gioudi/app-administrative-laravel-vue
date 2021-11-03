import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
///*  */import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
/*   {
    path: '/',
    name: 'Home',
    component: Home
  }, */
  {
    path: '/login',
    name: 'SingUp',
    component: () => import('../views/SingUp.vue'),
  },
  //Dashboard
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth:true}
  },
  {
    path: '/tags',
    name: 'Tags',
    component: () => import('../views/Tags.vue'),
    meta: { requiresAuth:true}
  },
  {
    path: '/categories',
    name: 'Category',
    component: () => import('../views/Category.vue'),
    meta: { requiresAuth:true}
  },
  {
    path: '/posts',
    name: 'Posts',
    component: () => import('../views/Posts.vue'),
    meta: { requiresAuth:true}
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/AdminUsers.vue'),
    meta: { requiresAuth:true}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

 router.beforeEach((to,from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(store.getters.isAuthenticated){
      next();
      return;
    }
    next('/')
  }else {
    next()
  }
});


router.beforeEach((to, from , next) => {
  if(to.matched.some((record)=>record.meta.guest)){
    if(store.getters.isAuthenticated){
      next("/dashboard");
      return;
    }
    next();
  }else {
    next();
  }
})

export default router
