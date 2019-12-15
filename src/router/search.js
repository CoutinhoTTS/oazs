import Vue from 'vue'
import Router from 'vue-router'
/**
// import Searchusercertlist from '@/components/search/Searchusercertlist'
// import Searchusercertdetails from '@/components/search/Searchusercertdetails'
// import Searchcompanylist from '@/components/search/Searchcompanylist'
// import Searchcompanydetails from '@/components/search/Searchcompanydetails'
// import Searchqualitylist from '@/components/search/Searchqualitylist'
// import Searchprosenior from '@/components/search/Searchprosenior'
// import Searchmultiple from '@/components/search/Searchmultiple'
// import Searchprosimple from '@/components/search/Searchprosimple'
**/

const Searchusercertlist = r => require.ensure([], () => r(require('../components/search/Searchusercertlist')), 'Searchusercertlist')
const Searchusercertdetails = r => require.ensure([], () => r(require('../components/search/Searchusercertdetails')), 'Searchusercertdetails')
const Searchcompanylist = r => require.ensure([], () => r(require('../components/search/Searchcompanylist')), 'Searchcompanylist')
const Searchcompanydetails = r => require.ensure([], () => r(require('../components/search/Searchcompanydetails')), 'Searchcompanydetails')
const Searchqualitylist = r => require.ensure([], () => r(require('../components/search/Searchqualitylist')), 'Searchqualitylist')
const Searchprosenior = r => require.ensure([], () => r(require('../components/search/Searchprosenior')), 'Searchprosenior')
const Searchmultiple = r => require.ensure([], () => r(require('../components/search/Searchmultiple')), 'Searchmultiple')
const Searchprosimple = r => require.ensure([], () => r(require('../components/search/Searchprosimple')), 'Searchprosimple')

Vue.use(Router)
export default [
  // 查人员
  {
    path: '/searchusercertlist',
    name: 'Searchusercertlist',
    component: Searchusercertlist,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  {
    path: '/searchusercertdetails',
    name: 'Searchusercertdetails',
    component: Searchusercertdetails
  },
  // 查企业
  {
    path: '/searchcompanylist',
    name: 'Searchcompanylist',
    component: Searchcompanylist,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  {
    path: '/searchcompanydetails',
    name: 'Searchcompanydetails',
    component: Searchcompanydetails
  },
  // 查资质
  {
    path: '/searchqualitylist',
    name: 'Searchqualitylist',
    component: Searchqualitylist,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 高级查
  {
    path: '/searchprosenior',
    name: 'Searchprosenior',
    component: Searchprosenior,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 综合查
  {
    path: '/searchmultiple',
    name: 'Searchmultiple',
    component: Searchmultiple,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 简单查
  {
    path: '/searchprosimple',
    name: 'Searchprosimple',
    component: Searchprosimple,
    meta: {
      keepAlive: true,
      isBack: false
    }
  }
]
