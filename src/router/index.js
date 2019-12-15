import Vue from 'vue'
import Router from 'vue-router'
import bid from './bid'
import search from './search'
import object from './object'
import personaloffice from './personaloffice'
import process from './process'
import task from './task'
import personnelmatters from './personnelmatters'
import administration from './administration'
import customer from './customer'
import finance from './finance'
import addobject from './addobject'
const Home = r => require.ensure([], () => r(require('../components/home/Home')), 'Home')
const Login = r => require.ensure([], () => r(require('../components/login/Login')), 'Login')
const Work = r => require.ensure([], () => r(require('../components/work/Work')), 'Work')
const Search = r => require.ensure([], () => r(require('../components/search/Search')), 'Search')
const Userinfo = r => require.ensure([], () => r(require('../components/userinfo/Userinfo')), 'Userinfo')
const ChangePassword = r => require.ensure([], () => r(require('../components/changePassword/ChangePassword')), 'ChangePassword')
const Leave = r => require.ensure([], () => r(require('../components/personalevents/leave/Leave')), 'Leave')
const Leavedetails = r => require.ensure([], () => r(require('../components/personalevents/leave/kqinfoqjdetails')), 'Leavedetails')
const Overtime = r => require.ensure([], () => r(require('../components/personalevents/overtime/Overtime')), 'Overtime')
const Overtimedetails = r => require.ensure([], () => r(require('../components/personalevents/overtime/kqinfojbdetails')), 'Overtimedetails')
const Businesstravel = r => require.ensure([], () => r(require('../components/personalevents/businesstravel/Businesstravel')), 'Businesstravel')
const Businesstraveldetails = r => require.ensure([], () => r(require('../components/personalevents/businesstravel/kqoutdetails')), 'Businesstraveldetails')
const Certall = r => require.ensure([], () => r(require('../components/cert/certificate/Certall')), 'Certall')
const Certalldatails = r => require.ensure([], () => r(require('../components/cert/certificate/Certalldatails')), 'Certalldatails')
const Certout = r => require.ensure([], () => r(require('../components/cert/certificate/Certout')), 'Certout')
const Certexpire = r => require.ensure([], () => r(require('../components/cert/certificate/Certexpire')), 'Certexpire')
const Certtomyopen = r => require.ensure([], () => r(require('../components/cert/certificate/Certtomyopen')), 'Certtomyopen')
const Certpersonall = r => require.ensure([], () => r(require('../components/cert/certpersonall/Certpersonall')), 'Certpersonall')
const Certpersonalldetails = r => require.ensure([], () => r(require('../components/cert/certpersonall/Certpersonalldetails')), 'Certpersonalldetails')
const Certpersonout = r => require.ensure([], () => r(require('../components/cert/certpersonall/Certpersonout')), 'Certpersonout')
const Certpersonoutdetails = r => require.ensure([], () => r(require('../components/cert/certpersonall/Certpersonoutdetails')), 'Certpersonoutdetails')
const Certbox = r => require.ensure([], () => r(require('../components/cert/certbox/Certbox')), 'Certbox')
const Certtrain = r => require.ensure([], () => r(require('../components/cert/certtrain/Certtrain')), 'Certtrain')
const Certtraindetails = r => require.ensure([], () => r(require('../components/cert/certtrain/Certtraindetails')), 'Certtraindetails')
const Certground = r => require.ensure([], () => r(require('../components/cert/certground/Certground')), 'Certground')
const Certgrounddetails = r => require.ensure([], () => r(require('../components/cert/certground/Certgrounddetails')), 'Certgrounddetails')
const Certborrow = r => require.ensure([], () => r(require('../components/cert/certborrow/Certborrow')), 'Certborrow')
const Certborrowdetails = r => require.ensure([], () => r(require('../components/cert/certborrow/Certborrowdetails')), 'Certborrowdetails')
const Certcontract = r => require.ensure([], () => r(require('../components/cert/certcontract/Certcontract')), 'Certcontract')
const Certcontractdetails = r => require.ensure([], () => r(require('../components/cert/certcontract/Certcontractdetails')), 'Certcontractdetails')
const Certcos = r => require.ensure([], () => r(require('../components/cert/certcos/Certcos')), 'Certcos')
const Certcosdetails = r => require.ensure([], () => r(require('../components/cert/certcos/Certcosdetails')), 'Certcosdetails')
const Certcost = r => require.ensure([], () => r(require('../components/cert/certcost/Certcost')), 'Certcost')
const Certcostdetails = r => require.ensure([], () => r(require('../components/cert/certcost/Certcostdetails')), 'Certcostdetails')
const Certusebid = r => require.ensure([], () => r(require('../components/cert/certusebid/Certusebid')), 'Certusebid')
const Certuseengin = r => require.ensure([], () => r(require('../components/cert/certuseengin/Certuseengin')), 'Certuseengin')
const Certindex = r => require.ensure([], () => r(require('../components/cert/certindex/Certindex')), 'Certindex')
const Certcostlog = r => require.ensure([], () => r(require('../components/cert/certcostlog/Certcostlog')), 'Certcostlog')
const Certcostsettle = r => require.ensure([], () => r(require('../components/cert/certcostlog/Certcostsettle')), 'Certcostsettle')
const Certcostlogdetails = r => require.ensure([], () => r(require('../components/cert/certcostlog/Certcostlogdetails')), 'Certcostlogdetails')
const Certcostsettledetails = r => require.ensure([], () => r(require('../components/cert/certcostlog/Certcostsettledetails')), 'Certcostsettledetails')
const Maillist = r => require.ensure([], () => r(require('../components/personaloffice/Maillist')), 'Maillist')
const kefu = r => require.ensure([], () => r(require('../components/userinfo/kefu')), 'kefu')
const about = r => require.ensure([], () => r(require('../components/userinfo/about')), 'about')
Vue.use(Router)
export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    // 内部通讯
    {
      path: '/maillist',
      name: 'Maillist',
      component: Maillist
    },
    // 客服
    {
      path: '/kefu',
      name: 'kefu',
      component: kefu
    },
    // 关于
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/Work',
      name: 'Work',
      component: Work,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search
    },
    {
      path: '/Userinfo',
      name: 'Userinfo',
      component: Userinfo
    },
    // 密码修改
    {
      path: '/ChangePassword',
      name: 'ChangePassword',
      component: ChangePassword
    },
    // 请假
    {
      path: '/Leave',
      name: 'Leave',
      component: Leave,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/kqinfoqjdetails',
      name: 'Leavedetails',
      component: Leavedetails
    },
    // 加班
    {
      path: '/overtime',
      name: 'Overtime',
      component: Overtime,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/kqinfojbdetails',
      name: 'Overtimedetails',
      component: Overtimedetails
    },
    // 出差
    {
      path: '/businesstravel',
      name: 'Businesstravel',
      component: Businesstravel,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/kqoutdetails',
      name: 'Businesstraveldetails',
      component: Businesstraveldetails
    },
    // 所有证书
    {
      path: '/certall',
      name: 'Certall',
      component: Certall,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    // 所有证书详情
    {
      path: '/certalldatails',
      name: 'Certalldatails',
      component: Certalldatails
    },
    {
      path: '/certout',
      name: 'Certout',
      component: Certout,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/certexpire',
      name: 'Certexpire',
      component: Certexpire,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/certtomyopen',
      name: 'Certtomyopen',
      component: Certtomyopen,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    //  证书人员
    {
      path: '/certpersonall',
      name: 'Certpersonall',
      component: Certpersonall,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/certpersonalldetails',
      name: 'Certpersonalldetails',
      component: Certpersonalldetails
    },
    //  转出人员
    {
      path: '/certpersonout',
      name: 'Certpersonout',
      component: Certpersonout,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/certpersonoutdetails',
      name: 'Certpersonoutdetails',
      component: Certpersonoutdetails
    },
    //  文件柜
    {
      path: '/certbox',
      name: 'Certbox',
      component: Certbox
    },
    //  培训管理
    {
      path: '/certtrain',
      name: 'Certtrain',
      component: Certtrain,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/certtraindetails',
      name: 'Certtraindetails',
      component: Certtraindetails
    },
    //  出场管理
    {
      path: '/certground',
      name: 'Certground',
      component: Certground,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/certgrounddetails',
      name: 'Certgrounddetails',
      component: Certgrounddetails
    },
    //  证书借还
    {
      path: '/certborrow',
      name: 'Certborrow',
      component: Certborrow,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/certborrowdetails',
      name: 'Certborrowdetails',
      component: Certborrowdetails
    },
    //  证书合同
    {
      path: '/certcontract',
      name: 'Certcontract',
      component: Certcontract,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/certcontractdetails',
      name: 'Certcontractdetails',
      component: Certcontractdetails
    },
    //  证书费用
    {
      path: '/certcos',
      name: 'Certcos',
      component: Certcos,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/certcosdetails',
      name: 'Certcosdetails',
      component: Certcosdetails
    },
    {
      path: '/certcost',
      name: 'Certcost',
      component: Certcost,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/certcostdetails',
      name: 'Certcostdetails',
      component: Certcostdetails
    },
    //  项目使用记录
    {
      path: '/certuseengin',
      name: 'Certuseengin',
      component: Certuseengin
    },
    {
      path: '/certusebid',
      name: 'Certusebid',
      component: Certusebid
    },
    // 证书首页
    {
      path: '/certindex',
      name: 'Certindex',
      component: Certindex
    },
    {
      path: '/certcostlog',
      name: 'Certcostlog',
      component: Certcostlog,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/certcostlogdetails',
      name: 'Certcostlogdetails',
      component: Certcostlogdetails
    },
    {
      path: '/certcostsettle',
      name: 'Certcostsettle',
      component: Certcostsettle,
      meta: {
        keepAlive: true,
        isBack: false
      }
    },
    {
      path: '/certcostsettledetails',
      name: 'Certcostsettledetails',
      component: Certcostsettledetails
    },
    // 投标
    ...bid,
    // 查询
    ...search,
    // 项目
    ...object,
    // 个人办公
    ...personaloffice,
    // 流程
    ...process,
    // 任务
    ...task,
    //  人员档案
    ...personnelmatters,
    //  行政
    ...administration,
    // 客户
    ...customer,
    // 财务
    ...finance,
    // 添加
    ...addobject
  ]
})
