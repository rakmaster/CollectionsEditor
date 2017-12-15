import Vue from 'vue'
import Router from 'vue-router'
import Editor from '@/components/editor'
import LoginForm from '@/components/login'
import RegistrationForm from '@/components/register'
import ConfirmRegistration from '@/components/confirm'
import ResetPassword from '@/components/reset'

Vue.use(Router)

let routeSet = [
  {
    path: '/',
    name: 'LoginForm',
    component: LoginForm
  },
  {
    path: '/register',
    name: 'RegisterForm',
    component: RegistrationForm
  },
  {
    path: '/confirm',
    name: 'ConfirmRegistration',
    component: ConfirmRegistration
  },
  {
    path: '/reset',
    name: 'ResetPassword',
    component: ResetPassword
  },
  {
    path: '/admin/:collection',
    name: 'Admin',
    component: Editor
  }
]

export default new Router({
  routes: routeSet
})
