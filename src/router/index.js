import Vue from 'vue'
import Router from 'vue-router'
import MonstersEditor from '@/components/editor'
import LoginForm from '@/components/login'
import RegistrationForm from '@/components/register'
import ConfirmRegistration from '@/components/confirm'

Vue.use(Router)

export default new Router({
  routes: [
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
      path: '/monsters',
      name: 'MonstersEditor',
      component: MonstersEditor
    }
  ]
})
