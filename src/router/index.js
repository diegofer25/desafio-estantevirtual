import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Register from '@/components/Register'
import Menu from '@/components/Menu'
import RouterError from '@/components/RouterError'
import AddressForm from '@/components/addressService/AddressForm'
import AddressManager from '@/components/addressService/AddressManager'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
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
      path: '/registeraddress',
      name: 'AddressForm',
      component: AddressForm,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/addressmanager',
      name: 'AddressManager',
      component: AddressManager,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/*',
      name: 'RouterError',
      component: RouterError
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (sessionStorage.getItem('auth')) {
      next()
    } else {
      next('/')
    }
  } else if (sessionStorage.getItem('auth')) {
    next('/menu')
  } else {
    next()
  }
})

export default router
