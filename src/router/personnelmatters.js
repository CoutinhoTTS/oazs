import Vue from 'vue'
import Router from 'vue-router'
/**
// import Archive from '@/components/personnelmatters/archive/Archive'
// import Archivedetails from '@/components/personnelmatters/archive/Archivedetails'
// import Userract from '@/components/personnelmatters/archive/Userract'
// import Userractdetails from '@/components/personnelmatters/archive/Userractdetails'
// import Hrdemint from '@/components/personnelmatters/hrdem/Hrdemint'
// import Hrdemintdetails from '@/components/personnelmatters/hrdem/Hrdemintdetails'
// import Hrdemintview from '@/components/personnelmatters/hrdem/Hrdemintview'
// import Hrdemintviewdetails from '@/components/personnelmatters/hrdem/Hrdemintviewdetails'
// import Hrpositive from '@/components/personnelmatters/hrdem/Hrpositive'
// import Hrpositivedetails from '@/components/personnelmatters/hrdem/Hrpositivedetails'
// import Hrredund from '@/components/personnelmatters/hrdem/Hrredund'
// import Hrredunddetails from '@/components/personnelmatters/hrdem/Hrredunddetails'
// import Hrtransfer from '@/components/personnelmatters/hrdem/Hrtransfer'
// import Hrtransferdetails from '@/components/personnelmatters/hrdem/Hrtransferdetails'
// import Hrtrsalary from '@/components/personnelmatters/hrdem/Hrtrsalary'
// import Hrtrsalarydetails from '@/components/personnelmatters/hrdem/Hrtrsalarydetails'
// import Daily from '@/components/personnelmatters/daily/Daily'
// import Dailydetails from '@/components/personnelmatters/daily/Dailydetails'
// import Wages from '@/components/personnelmatters/wages/Wages'
// import Wagesdetails from '@/components/personnelmatters/wages/Wagesdetails'
**/
const Archive = r => require.ensure([], () => r(require('../components/personnelmatters/archive/Archive')), 'Archive')
const Archivedetails = r => require.ensure([], () => r(require('../components/personnelmatters/archive/Archivedetails')), 'Archivedetails')
const Userract = r => require.ensure([], () => r(require('../components/personnelmatters/archive/Userract')), 'Userract')
const Userractdetails = r => require.ensure([], () => r(require('../components/personnelmatters/archive/Userractdetails')), 'Userractdetails')
const Hrdemint = r => require.ensure([], () => r(require('../components/personnelmatters/hrdem/Hrdemint')), 'Hrdemint')
const Hrdemintdetails = r => require.ensure([], () => r(require('../components/personnelmatters/hrdem/Hrdemintdetails')), 'Hrdemintdetails')
const Hrdemintview = r => require.ensure([], () => r(require('../components/personnelmatters/hrdem/Hrdemintview')), 'Hrdemintview')
const Hrdemintviewdetails = r => require.ensure([], () => r(require('../components/personnelmatters/hrdem/Hrdemintviewdetails')), 'Hrdemintviewdetails')
const Hrpositive = r => require.ensure([], () => r(require('../components/personnelmatters/hrdem/Hrpositive')), 'Hrpositive')
const Hrpositivedetails = r => require.ensure([], () => r(require('../components/personnelmatters/hrdem/Hrpositivedetails')), 'Hrpositivedetails')
const Hrredund = r => require.ensure([], () => r(require('../components/personnelmatters/hrdem/Hrredund')), 'Hrredund')
const Hrredunddetails = r => require.ensure([], () => r(require('../components/personnelmatters/hrdem/Hrredunddetails')), 'Hrredunddetails')
const Hrtransfer = r => require.ensure([], () => r(require('../components/personnelmatters/hrdem/Hrtransfer')), 'Hrtransfer')
const Hrtransferdetails = r => require.ensure([], () => r(require('../components/personnelmatters/hrdem/Hrtransferdetails')), 'Hrtransferdetails')
const Hrtrsalary = r => require.ensure([], () => r(require('../components/personnelmatters/hrdem/Hrtrsalary')), 'Hrtrsalary')
const Hrtrsalarydetails = r => require.ensure([], () => r(require('../components/personnelmatters/hrdem/Hrtrsalarydetails')), 'Hrtrsalarydetails')
const Daily = r => require.ensure([], () => r(require('../components/personnelmatters/daily/Daily')), 'Daily')
const Dailydetails = r => require.ensure([], () => r(require('../components/personnelmatters/daily/Dailydetails')), 'Dailydetails')
const Wages = r => require.ensure([], () => r(require('../components/personnelmatters/wages/Wages')), 'Wages')
const Wagesdetails = r => require.ensure([], () => r(require('../components/personnelmatters/wages/Wagesdetails')), 'Wagesdetails')

Vue.use(Router)
export default [
  // 人员档案
  {
    path: '/archive',
    name: 'Archive',
    component: Archive,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 人员档案详情
  {
    path: '/archivedetails',
    name: 'Archivedetails',
    component: Archivedetails
  },
  // 人员档案
  {
    path: '/userract',
    name: 'Userract',
    component: Userract,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 人员档案详情
  {
    path: '/userractdetails',
    name: 'Userractdetails',
    component: Userractdetails
  },
  // 人员需求
  {
    path: '/hrdemint',
    name: 'Hrdemint',
    component: Hrdemint,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 人员需求详情
  {
    path: '/hrdemintdetails',
    name: 'Hrdemintdetails',
    component: Hrdemintdetails
  },
  // 面试安排
  {
    path: '/hrdemintview',
    name: 'Hrdemintview',
    component: Hrdemintview,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 面试安排详情
  {
    path: '/hrdemintviewdetails',
    name: 'Hrdemintviewdetails',
    component: Hrdemintviewdetails
  },
  // 转正申请
  {
    path: '/hrpositive',
    name: 'Hrpositive',
    component: Hrpositive,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 转正申请详情
  {
    path: '/hrpositivedetails',
    name: 'Hrpositivedetails',
    component: Hrpositivedetails
  },
  // 转正申请
  {
    path: '/hrredund',
    name: 'Hrredund',
    component: Hrredund,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 转正申请详情
  {
    path: '/hrredunddetails',
    name: 'Hrredunddetails',
    component: Hrredunddetails
  },
  // 人事调动
  {
    path: '/hrtransfer',
    name: 'Hrtransfer',
    component: Hrtransfer,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 人事调动详情
  {
    path: '/hrtransferdetails',
    name: 'Hrtransferdetails',
    component: Hrtransferdetails
  },
  // 人事调动
  {
    path: '/hrtrsalary',
    name: 'Hrtrsalary',
    component: Hrtrsalary,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 人事调动详情
  {
    path: '/hrtrsalarydetails',
    name: 'Hrtrsalarydetails',
    component: Hrtrsalarydetails
  },
  // 日报
  {
    path: '/daily',
    name: 'Daily',
    component: Daily,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 日报详情
  {
    path: '/dailydetails',
    name: 'Dailydetails',
    component: Dailydetails
  },
  // 工资管理
  {
    path: '/wages',
    name: 'Wages',
    component: Wages,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 工资管理详情
  {
    path: '/wagesdetails',
    name: 'Wagesdetails',
    component: Wagesdetails
  }
]
