import Vue from 'vue'
import Router from 'vue-router'
import Edit from '@/components/edit'
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
    component: Edit
  }
]

export default new Router({
  routes: routeSet
})
