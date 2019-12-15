import Vue from 'vue'
import Router from 'vue-router'
/**
// import Godepot from '@/components/administration/goods/Godepot'
// import Godepotdetails from '@/components/administration/goods/Godepotdetails'
// import Customer from '@/components/administration/goods/Customer'
// import Customerdetails from '@/components/administration/goods/Customerdetails'
// import Goods from '@/components/administration/goods/Goods'
// import Goodsdetails from '@/components/administration/goods/Goodsdetails'
// import Billlist from '@/components/administration/goodsmanagement/Bill_list'
// import Goodsslist from '@/components/administration/goodsmanagement/Goodsslist'
// import Goodm from '@/components/administration/goodsmanagement/Goodm'
// import Goodmdetails from '@/components/administration/goodsmanagement/Goodmdetails'
// import Goodmuse from '@/components/administration/goodsmanagement/Goodmuse'
// import Goodmusedetails from '@/components/administration/goodsmanagement/Goodmusedetails'
// import Goodmcall from '@/components/administration/goodsmanagement/Goodmcall'
// import Goodmcalldetails from '@/components/administration/goodsmanagement/Goodmcalldetails'
// import Goodmsearch from '@/components/administration/goodsmanagement/Goodmsearch'
// import Assetm from '@/components/administration/assetm/Assetm'
// import Assetmdetails from '@/components/administration/assetm/Assetmdetails'
// import Fininfom from '@/components/administration/fininfom/Fininfom'
// import Fininfomdetails from '@/components/administration/fininfom/Fininfomdetails'
// import Payment from '@/components/administration/payment/Payment'
// import Paymentdetails from '@/components/administration/payment/Paymentdetails'
// import Seal from '@/components/administration/seal/Seal'
// import Sealdetails from '@/components/administration/seal/Sealdetails'
// import Sealapl from '@/components/administration/sealapl/Sealapl'
// import Sealapldetails from '@/components/administration/sealapl/Sealapldetails'
// import Managecontract from '@/components/administration/managecontract/Managecontract'
// import Managecontractdetails from '@/components/administration/managecontract/Managecontractdetails'
// import Managefile from '@/components/administration/managecontract/Managefile'
// import Managefiledetails from '@/components/administration/managecontract/Managefiledetails'
**/
const Godepot = r => require.ensure([], () => r(require('../components/administration/goods/Godepot')), 'Godepot')
const Godepotdetails = r => require.ensure([], () => r(require('../components/administration/goods/Godepotdetails')), 'Godepotdetails')
const Customer = r => require.ensure([], () => r(require('../components/administration/goods/Customer')), 'Customer')
const Customerdetails = r => require.ensure([], () => r(require('../components/administration/goods/Customerdetails')), 'Customerdetails')
const Goods = r => require.ensure([], () => r(require('../components/administration/goods/Goods')), 'Goods')
const Goodsdetails = r => require.ensure([], () => r(require('../components/administration/goods/Goodsdetails')), 'Goodsdetails')
const Billlist = r => require.ensure([], () => r(require('../components/administration/goodsmanagement/Bill_list')), 'Billlist')
const Goodsslist = r => require.ensure([], () => r(require('../components/administration/goodsmanagement/Goodsslist')), 'Goodsslist')
const Goodm = r => require.ensure([], () => r(require('../components/administration/goodsmanagement/Goodm')), 'Goodm')
const Goodmdetails = r => require.ensure([], () => r(require('../components/administration/goodsmanagement/Goodmdetails')), 'Goodmdetails')
const Goodmuse = r => require.ensure([], () => r(require('../components/administration/goodsmanagement/Goodmuse')), 'Goodmuse')
const Goodmusedetails = r => require.ensure([], () => r(require('../components/administration/goodsmanagement/Goodmusedetails')), 'Goodmusedetails')
const Goodmcall = r => require.ensure([], () => r(require('../components/administration/goodsmanagement/Goodmcall')), 'Goodmcall')
const Goodmcalldetails = r => require.ensure([], () => r(require('../components/administration/goodsmanagement/Goodmcalldetails')), 'Goodmcalldetails')
const Goodmsearch = r => require.ensure([], () => r(require('../components/administration/goodsmanagement/Goodmsearch')), 'Goodmsearch')
const Assetm = r => require.ensure([], () => r(require('../components/administration/assetm/Assetm')), 'Assetm')
const Assetmdetails = r => require.ensure([], () => r(require('../components/administration/assetm/Assetmdetails')), 'Assetmdetails')
const Fininfom = r => require.ensure([], () => r(require('../components/administration/fininfom/Fininfom')), 'Fininfom')
const Fininfomdetails = r => require.ensure([], () => r(require('../components/administration/fininfom/Fininfomdetails')), 'Fininfomdetails')
const Payment = r => require.ensure([], () => r(require('../components/administration/payment/Payment')), 'Payment')
const Paymentdetails = r => require.ensure([], () => r(require('../components/administration/payment/Paymentdetails')), 'Paymentdetails')
const Seal = r => require.ensure([], () => r(require('../components/administration/seal/Seal')), 'Seal')
const Sealdetails = r => require.ensure([], () => r(require('../components/administration/seal/Sealdetails')), 'Sealdetails')
const Sealapl = r => require.ensure([], () => r(require('../components/administration/sealapl/Sealapl')), 'Sealapl')
const Sealapldetails = r => require.ensure([], () => r(require('../components/administration/sealapl/Sealapldetails')), 'Sealapldetails')
const Managecontract = r => require.ensure([], () => r(require('../components/administration/managecontract/Managecontract')), 'Managecontract')
const Managecontractdetails = r => require.ensure([], () => r(require('../components/administration/managecontract/Managecontractdetails')), 'Managecontractdetails')
const Managefile = r => require.ensure([], () => r(require('../components/administration/managecontract/Managefile')), 'Managefile')
const Managefiledetails = r => require.ensure([], () => r(require('../components/administration/managecontract/Managefiledetails')), 'Managefiledetails')

Vue.use(Router)
export default [
  // 仓库管理
  {
    path: '/godepot',
    name: 'Godepot',
    component: Godepot,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 仓库管理详情
  {
    path: '/godepotdetails',
    name: 'Godepotdetails',
    component: Godepotdetails
  },
  // 仓库管理
  {
    path: '/customer',
    name: 'Customer',
    component: Customer,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 仓库管理详情
  {
    path: '/customerdetails',
    name: 'Customerdetails',
    component: Customerdetails
  },
  // 物品列表
  {
    path: '/goods',
    name: 'Goods',
    component: Goods,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 物品列表详情
  {
    path: '/goodsdetails',
    name: 'Goodsdetails',
    component: Goodsdetails
  },
  // 出入库
  {
    path: '/bill_list',
    name: 'Billlist',
    component: Billlist
  },
  // 出入库详情
  {
    path: '/goodsslist',
    name: 'Goodsslist',
    component: Goodsslist
  },
  // 物品采购
  {
    path: '/goodm',
    name: 'Goodm',
    component: Goodm,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 物品采购详情
  {
    path: '/goodmdetails',
    name: 'Goodmdetails',
    component: Goodmdetails
  },
  // 物品领用
  {
    path: '/goodmuse',
    name: 'Goodmuse',
    component: Goodmuse,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 物品领用详情
  {
    path: '/goodmusedetails',
    name: 'Goodmusedetails',
    component: Goodmusedetails
  },
  // 物品调拨
  {
    path: '/goodmcall',
    name: 'Goodmcall',
    component: Goodmcall,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 物品调拨详情
  {
    path: '/goodmcalldetails',
    name: 'Goodmcalldetails',
    component: Goodmcalldetails
  },
  // 物品盘点
  {
    path: '/goodmsearch',
    name: 'Goodmsearch',
    component: Goodmsearch
  },
  // 固定资产
  {
    path: '/assetm',
    name: 'Assetm',
    component: Assetm,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 固定资产详情
  {
    path: '/assetmdetails',
    name: 'Assetmdetails',
    component: Assetmdetails
  },
  // 费用报销
  {
    path: '/fininfom',
    name: 'Fininfom',
    component: Fininfom,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 费用报销详情
  {
    path: '/fininfomdetails',
    name: 'Fininfomdetails',
    component: Fininfomdetails
  },
  // 付款申请
  {
    path: '/payment',
    name: 'Payment',
    component: Payment,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 付款申请详情
  {
    path: '/paymentdetails',
    name: 'Paymentdetails',
    component: Paymentdetails
  },
  // 印章证照
  {
    path: '/seal',
    name: 'Seal',
    component: Seal,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 印章证照详情
  {
    path: '/sealdetails',
    name: 'Sealdetails',
    component: Sealdetails
  },
  // 印章证照使用
  {
    path: '/sealapl',
    name: 'Sealapl',
    component: Sealapl,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 印章证照使用详情
  {
    path: '/sealapldetails',
    name: 'Sealapldetails',
    component: Sealapldetails
  },
  // 合同档案管理
  {
    path: '/managecontract',
    name: 'Managecontract',
    component: Managecontract,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 合同档案管理详情
  {
    path: '/managecontractdetails',
    name: 'Managecontractdetails',
    component: Managecontractdetails
  },
  // 文件档案管理
  {
    path: '/managefile',
    name: 'Managefile',
    component: Managefile,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 文件档案管理详情
  {
    path: '/managefiledetails',
    name: 'Managefiledetails',
    component: Managefiledetails
  }
]
