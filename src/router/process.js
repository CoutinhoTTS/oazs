import Vue from 'vue'
import Router from 'vue-router'
/**
// import Handle from '@/components/process/handle/Handle'
// import Handleold from '@/components/process/handleold/Handleold'
// import Mysheet from '@/components/process/mysheet/Mysheet'
// import Mysheetdraft from '@/components/process/mysheetdraft/Mysheetdraft'
// import Mysheetfail from '@/components/process/mysheetfail/Mysheetfail'
// import Branch from '@/components/process/branch/Branch'
// import applycourse from '@/components/process/applycourse/applycourse'
**/
const Handle = r => require.ensure([], () => r(require('../components/process/handle/Handle')), 'Handle')
const Handleold = r => require.ensure([], () => r(require('../components/process/handleold/Handleold')), 'Handleold')
const Mysheet = r => require.ensure([], () => r(require('../components/process/mysheet/Mysheet')), 'Mysheet')
const Mysheetdraft = r => require.ensure([], () => r(require('../components/process/mysheetdraft/Mysheetdraft')), 'Mysheetdraft')
const Mysheetfail = r => require.ensure([], () => r(require('../components/process/mysheetfail/Mysheetfail')), 'Mysheetfail')
const Branch = r => require.ensure([], () => r(require('../components/process/branch/Branch')), 'Branch')
const applycourse = r => require.ensure([], () => r(require('../components/process/applycourse/applycourse')), 'applycourse')

Vue.use(Router)
export default [
  // 处理代办
  {
    path: '/handle',
    name: 'Handle',
    component: Handle,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 经我处理
  {
    path: '/handleold',
    name: 'Handleold',
    component: Handleold,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 我的申请
  {
    path: '/mysheet',
    name: 'Mysheet',
    component: Mysheet,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 草稿待提交
  {
    path: '/mysheetdraft',
    name: 'Mysheetdraft',
    component: Mysheetdraft,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 我的申请未通过
  {
    path: '/mysheetfail',
    name: 'Mysheetfail',
    component: Mysheetfail,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 我下属的申请
  {
    path: '/branch',
    name: 'Branch',
    component: Branch,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  {
    path: '/applycourse',
    name: 'applycourse',
    component: applycourse
  }
]
