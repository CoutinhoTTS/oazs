import Vue from 'vue'
import Router from 'vue-router'
import Workmy from '@/components/task/workmy/Workmy'
import Workmydetails from '@/components/task/workmy/Workmydetails'
import Workfail from '@/components/task/workmy/Workfail'
import Workbranch from '@/components/task/workmy/Workbranch'
import Workcreate from '@/components/task/workmy/Workcreate'
import Workdudao from '@/components/task/workmy/Workdudao'
import Workall from '@/components/task/workmy/Workall'
import Projectimp from '@/components/task/projectadministration/Projectimp'
import Projectfail from '@/components/task/projectadministration/Projectfail'
import Projectfuze from '@/components/task/projectadministration/Projectfuze'
import Projectcreate from '@/components/task/projectadministration/Projectcreate'
import Projectall from '@/components/task/projectadministration/Projectall'
import Projectadministrationdetails from '@/components/task/projectadministration/Projectadministrationdetails'
Vue.use(Router)
export default [
  // 我的任务
  {
    path: '/workmy',
    name: 'Workmy',
    component: Workmy,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 我的任务详情
  {
    path: '/workmydetails',
    name: 'Workmydetails',
    component: Workmydetails
  },
  // 我未完成的任务
  {
    path: '/workfail',
    name: 'Workfail',
    component: Workfail,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 我下属的任务
  {
    path: '/workbranch',
    name: 'Workbranch',
    component: Workbranch,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 我创建的任务
  {
    path: '/workcreate',
    name: 'Workcreate',
    component: Workcreate,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 任务督导
  {
    path: '/workdudao',
    name: 'Workdudao',
    component: Workdudao,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 所有任务
  {
    path: '/workall',
    name: 'Workall',
    component: Workall,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 我执行的项目
  {
    path: '/projectimp',
    name: 'Projectimp',
    component: Projectimp,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 我未完成的项目
  {
    path: '/projectfail',
    name: 'Projectfail',
    component: Projectfail,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 我负责的项目
  {
    path: '/projectfuze',
    name: 'Projectfuze',
    component: Projectfuze,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 我创建的任务
  {
    path: '/projectcreate',
    name: 'Projectcreate',
    component: Projectcreate,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 所有任务
  {
    path: '/projectall',
    name: 'Projectall',
    component: Projectall,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 详情
  {
    path: '/projectadministrationdetails',
    name: 'Projectadministrationdetails',
    component: Projectadministrationdetails
  }
]
