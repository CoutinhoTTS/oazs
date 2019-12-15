import Vue from 'vue'
import Router from 'vue-router'
/**
// import Financebank from '@/components/finance/financebank/Financebank'
// import Financebankdetails from '@/components/finance/financebank/Financebankdetails'
// import Financedealcom from '@/components/finance/financedealcom/Financedealcom'
// import Financedealcomdetails from '@/components/finance/financedealcom/Financedealcomdetails'
// import Cosfininfom from '@/components/finance/cosfininfom/Cosfininfom'
// import Cospayment from '@/components/finance/cosfininfom/Cospayment'
// import Coscertcos from '@/components/finance/coscertcos/Coscertcos'
// import Cosbidallcos from '@/components/finance/cosbidallcos/Cosbidallcos'
// import Cosbidbond from '@/components/finance/cosbidallcos/Cosbidbond'
// import Cosengininvoicecollec from '@/components/finance/objectcost/Cosengininvoicecollec'
// import Cosengininvoiceopen from '@/components/finance/objectcost/Cosengininvoiceopen'
// import Cosincomecollect from '@/components/finance/objectcost/Cosincomecollect'
// import Coslabourpayment from '@/components/finance/objectcost/Coslabourpayment'
// import Cosleasepayment from '@/components/finance/objectcost/Cosleasepayment'
// import Cosstuffpayment from '@/components/finance/objectcost/Cosstuffpayment'
// import Cossubpackpayment from '@/components/finance/objectcost/Cossubpackpayment'
**/
const Financebank = r => require.ensure([], () => r(require('../components/finance/financebank/Financebank')), 'Financebank')
const Financebankdetails = r => require.ensure([], () => r(require('../components/finance/financebank/Financebankdetails')), 'Financebankdetails')
const Financedealcom = r => require.ensure([], () => r(require('../components/finance/financedealcom/Financedealcom')), 'Financedealcom')
const Financedealcomdetails = r => require.ensure([], () => r(require('../components/finance/financedealcom/Financedealcomdetails')), 'Financedealcomdetails')
const Cosfininfom = r => require.ensure([], () => r(require('../components/finance/cosfininfom/Cosfininfom')), 'Cosfininfom')
const Cospayment = r => require.ensure([], () => r(require('../components/finance/cosfininfom/Cospayment')), 'Cospayment')
const Coscertcos = r => require.ensure([], () => r(require('../components/finance/coscertcos/Coscertcos')), 'Coscertcos')
const Cosbidallcos = r => require.ensure([], () => r(require('../components/finance/cosbidallcos/Cosbidallcos')), 'Cosbidallcos')
const Cosbidbond = r => require.ensure([], () => r(require('../components/finance/cosbidallcos/Cosbidbond')), 'Cosbidbond')
const Cosengininvoicecollec = r => require.ensure([], () => r(require('../components/finance/objectcost/Cosengininvoicecollec')), 'Cosengininvoicecollec')
const Cosengininvoiceopen = r => require.ensure([], () => r(require('../components/finance/objectcost/Cosengininvoiceopen')), 'Cosengininvoiceopen')
const Cosincomecollect = r => require.ensure([], () => r(require('../components/finance/objectcost/Cosincomecollect')), 'Cosincomecollect')
const Coslabourpayment = r => require.ensure([], () => r(require('../components/finance/objectcost/Coslabourpayment')), 'Coslabourpayment')
const Cosleasepayment = r => require.ensure([], () => r(require('../components/finance/objectcost/Cosleasepayment')), 'Cosleasepayment')
const Cosstuffpayment = r => require.ensure([], () => r(require('../components/finance/objectcost/Cosstuffpayment')), 'Cosstuffpayment')
const Cossubpackpayment = r => require.ensure([], () => r(require('../components/finance/objectcost/Cossubpackpayment')), 'Cossubpackpayment')

Vue.use(Router)
export default [
  // 银行信息
  {
    path: '/financebank',
    name: 'Financebank',
    component: Financebank,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 银行信息详情
  {
    path: '/financebankdetails',
    name: 'Financebankdetails',
    component: Financebankdetails
  },
  // 单位来往
  {
    path: '/financedealcom',
    name: 'Financedealcom',
    component: Financedealcom,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 单位来往详情
  {
    path: '/financedealcomdetails',
    name: 'Financedealcomdetails',
    component: Financedealcomdetails
  },
  // 费用报销
  {
    path: '/cosfininfom',
    name: 'Cosfininfom',
    component: Cosfininfom,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 付款申请
  {
    path: '/cospayment',
    name: 'Cospayment',
    component: Cospayment,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 证书费用
  {
    path: '/coscertcos',
    name: 'Coscertcos',
    component: Coscertcos,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 投标费用
  {
    path: '/cosbidallcos',
    name: 'Cosbidallcos',
    component: Cosbidallcos,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 投标保障金管理
  {
    path: '/cosbidbond',
    name: 'Cosbidbond',
    component: Cosbidbond,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  /**
   * **********************************项目费用**/
  {
    path: '/cosengininvoicecollec',
    name: 'Cosengininvoicecollec',
    component: Cosengininvoicecollec,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  {
    path: '/cosengininvoiceopen',
    name: 'Cosengininvoiceopen',
    component: Cosengininvoiceopen,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  {
    path: '/cosincomecollect',
    name: 'Cosincomecollect',
    component: Cosincomecollect,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  {
    path: '/coslabourpayment',
    name: 'Coslabourpayment',
    component: Coslabourpayment,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  {
    path: '/cosleasepayment',
    name: 'Cosleasepayment',
    component: Cosleasepayment,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  {
    path: '/cosstuffpayment',
    name: 'Cosstuffpayment',
    component: Cosstuffpayment,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  {
    path: '/cossubpackpayment',
    name: 'Cossubpackpayment',
    component: Cossubpackpayment,
    meta: {
      keepAlive: true,
      isBack: false
    }
  }
]
