import Vue from 'vue'
import Router from 'vue-router'
/**
// import Emailm from '@/components/personaloffice/email/Emailm'
// import Emailmdetails from '@/components/personaloffice/email/Emailmdetails'
// import Infor from '@/components/personaloffice/infor/Infor'
// import Infordetails from '@/components/personaloffice/infor/Infordetails'
// import Schedulepage from '@/components/personaloffice/schedulepage/Schedulepage'
// import Todolist from '@/components/personaloffice/todolist/Todolist'
// import Flowsend from '@/components/personaloffice/flowsend/Flowsend'
// import Todaymeet from '@/components/personaloffice/meet/Todaymeet'
// import Todaymeetdetails from '@/components/personaloffice/meet/Todaymeetdetails'
// import Meetview from '@/components/personaloffice/meet/Meetview'
// import Dailymy from '@/components/personaloffice/dailymy/Dailymy'
// import Dailymydetails from '@/components/personaloffice/dailymy/Dailymydetails'
// import Userinfos from '@/components/personaloffice/myself/userinfo/Userinfos'
**/

const Emailm = r => require.ensure([], () => r(require('../components/personaloffice/email/Emailm')), 'Emailm')
const Emailmdetails = r => require.ensure([], () => r(require('../components/personaloffice/email/Emailmdetails')), 'Emailmdetails')
const Infor = r => require.ensure([], () => r(require('../components/personaloffice/infor/Infor')), 'Infor')
const Infordetails = r => require.ensure([], () => r(require('../components/personaloffice/infor/Infordetails')), 'Infordetails')
const Schedulepage = r => require.ensure([], () => r(require('../components/personaloffice/schedulepage/Schedulepage')), 'Schedulepage')
const Todolist = r => require.ensure([], () => r(require('../components/personaloffice/todolist/Todolist')), 'Todolist')
const Flowsend = r => require.ensure([], () => r(require('../components/personaloffice/flowsend/Flowsend')), 'Flowsend')
const Todaymeet = r => require.ensure([], () => r(require('../components/personaloffice/meet/Todaymeet')), 'Todaymeet')
const Todaymeetdetails = r => require.ensure([], () => r(require('../components/personaloffice/meet/Todaymeetdetails')), 'Todaymeetdetails')
const Meetview = r => require.ensure([], () => r(require('../components/personaloffice/meet/Meetview')), 'Meetview')
const Dailymy = r => require.ensure([], () => r(require('../components/personaloffice/dailymy/Dailymy')), 'Dailymy')
const Dailymydetails = r => require.ensure([], () => r(require('../components/personaloffice/dailymy/Dailymydetails')), 'Dailymydetails')
const Userinfos = r => require.ensure([], () => r(require('../components/personaloffice/myself/userinfo/Userinfos')), 'Userinfos')
Vue.use(Router)
export default [
  // 邮件
  {
    path: '/emailm',
    name: 'Emailm',
    component: Emailm,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 邮件详情
  {
    path: '/emailmdetails',
    name: 'Emailmdetails',
    component: Emailmdetails
  },
  // 通知公告
  {
    path: '/infor',
    name: 'Infor',
    component: Infor,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 通知公告详情
  {
    path: '/infordetails',
    name: 'Infordetails',
    component: Infordetails
  },
  // 日程
  {
    path: '/Schedulepage',
    name: 'Schedulepage',
    component: Schedulepage,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 提醒信息
  {
    path: '/todolist',
    name: 'Todolist',
    component: Todolist,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 单据提醒
  {
    path: '/flowsend',
    name: 'Flowsend',
    component: Flowsend,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 会议
  {
    path: '/todaymeet',
    name: 'Todaymeet',
    component: Todaymeet,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 会议详情
  {
    path: '/todaymeetdetails',
    name: 'Todaymeetdetails',
    component: Todaymeetdetails
  },
  // 会议室
  {
    path: '/meetview',
    name: 'Meetview',
    component: Meetview
  },
  // 工作日报
  {
    path: '/dailymy',
    name: 'Dailymy',
    component: Dailymy,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 工作日报详情
  {
    path: '/dailymydetails',
    name: 'Dailymydetails',
    component: Dailymydetails
  },
  // 个人质料
  {
    path: '/userinfos',
    name: 'userinfos',
    component: Userinfos
  }
]
