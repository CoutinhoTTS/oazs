import Vue from 'vue'
import Router from 'vue-router'
/**
// import Addconstruction from '@/components/addobject/Addconstruction'
// import Addprogress from '@/components/addobject/Addprogress'
// import Addsecurity from '@/components/addobject/Addsecurity'
**/
const Addconstruction = r => require.ensure([], () => r(require('../components/addobject/Addconstruction')), 'Addconstruction')
const Addprogress = r => require.ensure([], () => r(require('../components/addobject/Addprogress')), 'Addprogress')
const Addsecurity = r => require.ensure([], () => r(require('../components/addobject/Addsecurity')), 'Addsecurity')

Vue.use(Router)
export default [
  // 施工日志
  {
    path: '/addconstruction',
    name: 'Addconstruction',
    component: Addconstruction
  },
  // 进度填报
  {
    path: '/addprogress',
    name: 'Addprogress',
    component: Addprogress
  },
  // 安全日志
  {
    path: '/addsecurity',
    name: 'Addsecurity',
    component: Addsecurity
  }
]
