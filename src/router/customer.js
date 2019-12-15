import Vue from 'vue'
import Router from 'vue-router'
/**
// import Cshome from '@/components/customer/cshome/Cshome'
// import Cspublic from '@/components/customer/cspublic/Cspublic'
// import Cspublicdetails from '@/components/customer/cspublic/Cspublicdetails'
// import Csmy from '@/components/customer/customers/Csmy'
// import Csmydetails from '@/components/customer/customers/Csmydetails'
// import Csshatemy from '@/components/customer/customers/Csshatemy'
// import Csbranch from '@/components/customer/customers/Csbranch'
// import Csallot from '@/components/customer/customers/Csallot'
// import Csmycustract from '@/components/customer/contract/Csmycustract'
// import Csmycustractdetails from '@/components/customer/contract/Csmycustractdetails'
// import Csbranchcustract from '@/components/customer/contract/Csbranchcustract'
// import Csbranchcustractdetails from '@/components/customer/contract/Csbranchcustractdetails'
// import Csmyreceiv from '@/components/customer/csmyreceiv/Csmyreceiv'
// import Csmyreceivdetails from '@/components/customer/csmyreceiv/Csmyreceivdetails'
// import Csbranchreceiv from '@/components/customer/csmyreceiv/Csbranchreceiv'
// import Csmypay from '@/components/customer/csmyreceiv/Csmypay'
// import Csbranchpay from '@/components/customer/csmyreceiv/Csbranchpay'
**/
const Cshome = r => require.ensure([], () => r(require('../components/customer/cshome/Cshome')), 'Cshome')
const Cspublic = r => require.ensure([], () => r(require('../components/customer/cspublic/Cspublic')), 'Cspublic')
const Cspublicdetails = r => require.ensure([], () => r(require('../components/customer/cspublic/Cspublicdetails')), 'Cspublicdetails')
const Csmy = r => require.ensure([], () => r(require('../components/customer/customers/Csmy')), 'Csmy')
const Csmydetails = r => require.ensure([], () => r(require('../components/customer/customers/Csmydetails')), 'Csmydetails')
const Csshatemy = r => require.ensure([], () => r(require('../components/customer/customers/Csshatemy')), 'Csshatemy')
const Csbranch = r => require.ensure([], () => r(require('../components/customer/customers/Csbranch')), 'Csbranch')
const Csallot = r => require.ensure([], () => r(require('../components/customer/customers/Csallot')), 'Csallot')
const Csmycustract = r => require.ensure([], () => r(require('../components/customer/contract/Csmycustract')), 'Csmycustract')
const Csmycustractdetails = r => require.ensure([], () => r(require('../components/customer/contract/Csmycustractdetails')), 'Csmycustractdetails')
const Csbranchcustract = r => require.ensure([], () => r(require('../components/customer/contract/Csbranchcustract')), 'Csbranchcustract')
const Csbranchcustractdetails = r => require.ensure([], () => r(require('../components/customer/contract/Csbranchcustractdetails')), 'Csbranchcustractdetails')
const Csmyreceiv = r => require.ensure([], () => r(require('../components/customer/csmyreceiv/Csmyreceiv')), 'Csmyreceiv')
const Csmyreceivdetails = r => require.ensure([], () => r(require('../components/customer/csmyreceiv/Csmyreceivdetails')), 'Csmyreceivdetails')
const Csbranchreceiv = r => require.ensure([], () => r(require('../components/customer/csmyreceiv/Csbranchreceiv')), 'Csbranchreceiv')
const Csmypay = r => require.ensure([], () => r(require('../components/customer/csmyreceiv/Csmypay')), 'Csmypay')
const Csbranchpay = r => require.ensure([], () => r(require('../components/customer/csmyreceiv/Csbranchpay')), 'Csbranchpay')

Vue.use(Router)
export default [
  {
    path: '/cshome',
    name: 'Cshome',
    component: Cshome
  },
  // 客户公海
  {
    path: '/cspublic',
    name: 'Cspublic',
    component: Cspublic,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 客户公海
  {
    path: '/cspublicdetails',
    name: 'Cspublicdetails',
    component: Cspublicdetails
  },
  // 我的客户
  {
    path: '/csmy',
    name: 'Csmy',
    component: Csmy,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 我的客户详情
  {
    path: '/csmydetails',
    name: 'Csmydetails',
    component: Csmydetails
  },
  // 共享给我的
  {
    path: '/csshatemy',
    name: 'Csshatemy',
    component: Csshatemy,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 我下属的客户
  {
    path: '/csbranch',
    name: 'Csbranch',
    component: Csbranch,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 客户分配
  {
    path: '/csallot',
    name: 'Csallot',
    component: Csallot,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 我的合同
  {
    path: '/csmycustract',
    name: 'Csmycustract',
    component: Csmycustract,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 我的合同详情
  {
    path: '/csmycustractdetails',
    name: 'Csmycustractdetails',
    component: Csmycustractdetails
  },
  // 我下属的合同
  {
    path: '/csbranchcustract',
    name: 'Csbranchcustract',
    component: Csbranchcustract,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 我下属的合同详情
  {
    path: '/csbranchcustractdetails',
    name: 'Csbranchcustractdetails',
    component: Csbranchcustractdetails
  },
  // 我的合同详情
  {
    path: '/csmycustractdetails',
    name: 'Csmycustractdetails',
    component: Csmycustractdetails
  },
  // 收款单
  {
    path: '/csmyreceiv',
    name: 'Csmyreceiv',
    component: Csmyreceiv,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 收款单详情
  {
    path: '/csmyreceivdetails',
    name: 'Csmyreceivdetails',
    component: Csmyreceivdetails
  },
  // 下属收款单
  {
    path: '/csbranchreceiv',
    name: 'Csbranchreceiv',
    component: Csbranchreceiv,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 我的付款单
  {
    path: '/csmypay',
    name: 'Csmypay',
    component: Csmypay,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 我下属的付款单
  {
    path: '/csbranchpay',
    name: 'Csbranchpay',
    component: Csbranchpay,
    meta: {
      keepAlive: true,
      isBack: false
    }
  }
]
