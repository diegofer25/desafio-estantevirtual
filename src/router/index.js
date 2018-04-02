import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Menu from '@/components/Menu'
import Register from '@/components/Register'
import RouterError from '@/components/RouterError'
import AddressShare from '@/components/addressService/AddressShare'
import store from '../vuex/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/menu',
      name: 'Menu',
      component: Menu,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/myaddresslist',
      name: 'AddressShare',
      component: AddressShare
    },
    {
      path: '/*',
      name: 'RouterError',
      component: RouterError
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/myaddresslist' && to.query) {
    next()
  } else if (to.path === '/myaddresslist') {
    next('/error')
  } else {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (store.state.user.auth) {
        next()
      } else {
        next('/')
      }
    } else if (store.state.user.auth) {
      next('/menu')
    } else {
      next()
    }
  }
})

export default router
