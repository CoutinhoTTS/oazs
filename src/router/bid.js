import Vue from 'vue'
import Router from 'vue-router'

/**
 * // import Bidbond from '@/components/bid/bidbond/Bidbond'
// import Bidbonddetails from '@/components/bid/bidbond/Bidbonddetails'
// import Bidsum from '@/components/bid/bidsum/Bidsum'
// import Bidsumdetails from '@/components/bid/bidsum/Bidsumdetails'
// import Bidcooperation from '@/components/bid/bidcooperation/Bidcooperation'
// import Bidcooperationdetails from '@/components/bid/bidcooperation/Bidcooperationdetails'
// import Bidlist from '@/components/bid/bidlist/Bidlist'
// import Bidlistdetails from '@/components/bid/bidlist/Bidlistdetails'
// import Bidmywork from '@/components/bid/bidwork/Bidmywork'
// import Bidallwork from '@/components/bid/bidwork/Bidallwork'
// import Bidworkdetails from '@/components/bid/bidwork/Bidworkdetails'
// import Bidallcos from '@/components/bid/bidallcos/Bidallcos'
// import Bidallcosdetails from '@/components/bid/bidallcos/Bidallcosdetails'
// import Bidindex from '@/components/bid/bidindex/Bidindex'
**/
const Bidbond = r => require.ensure([], () => r(require('../components/bid/bidbond/Bidbond')), 'Bidbond')
const Bidbonddetails = r => require.ensure([], () => r(require('../components/bid/bidbond/Bidbonddetails')), 'Bidbonddetails')
const Bidsum = r => require.ensure([], () => r(require('../components/bid/bidsum/Bidsum')), 'Bidsum')
const Bidsumdetails = r => require.ensure([], () => r(require('../components/bid/bidsum/Bidsumdetails')), 'Bidsumdetails')
const Bidcooperation = r => require.ensure([], () => r(require('../components/bid/bidcooperation/Bidcooperation')), 'Bidcooperation')
const Bidcooperationdetails = r => require.ensure([], () => r(require('../components/bid/bidcooperation/Bidcooperationdetails')), 'Bidcooperationdetails')
const Bidlist = r => require.ensure([], () => r(require('../components/bid/bidlist/Bidlist')), 'Bidlist')
const Bidlistdetails = r => require.ensure([], () => r(require('../components/bid/bidlist/Bidlistdetails')), 'Bidlistdetails')
const Bidmywork = r => require.ensure([], () => r(require('../components/bid/bidwork/Bidmywork')), 'Bidmywork')
const Bidallwork = r => require.ensure([], () => r(require('../components/bid/bidwork/Bidallwork')), 'Bidallwork')
const Bidworkdetails = r => require.ensure([], () => r(require('../components/bid/bidwork/Bidworkdetails')), 'Bidworkdetails')
const Bidallcos = r => require.ensure([], () => r(require('../components/bid/bidallcos/Bidallcos')), 'Bidallcos')
const Bidallcosdetails = r => require.ensure([], () => r(require('../components/bid/bidallcos/Bidallcosdetails')), 'Bidallcosdetails')
const Bidindex = r => require.ensure([], () => r(require('../components/bid/bidindex/Bidindex')), 'Bidindex')

Vue.use(Router)
export default [
  // 保证金管理
  {
    path: '/bidbond',
    name: 'Bidbond',
    component: Bidbond,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  {
    path: '/bidbonddetails',
    name: 'Bidbonddetails',
    component: Bidbonddetails
  },
  //  投标总结
  {
    path: '/bidsum',
    name: 'Bidsum',
    component: Bidsum,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  {
    path: '/bidsumdetails',
    name: 'Bidsumdetails',
    component: Bidsumdetails
  },
  //  合作企业管理
  {
    path: '/bidcooperation',
    name: 'Bidcooperation',
    component: Bidcooperation,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  {
    path: '/bidcooperationdetails',
    name: 'Bidcooperationdetails',
    component: Bidcooperationdetails
  },
  // 投标信息
  {
    path: '/bidlist',
    name: 'Bidlist',
    component: Bidlist,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  {
    path: '/bidlistdetails',
    name: 'Bidlistdetails',
    component: Bidlistdetails
  },
  //  我的任务
  {
    path: '/bidmywork',
    name: 'Bidmywork',
    component: Bidmywork,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 所有的任务
  {
    path: '/bidallwork',
    name: 'Bidallwork',
    component: Bidallwork,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 任务详情
  {
    path: '/bidworkdetails',
    name: 'Bidworkdetails',
    component: Bidworkdetails
  },
  // 投标费用
  {
    path: '/bidallcos',
    name: 'Bidallcos',
    component: Bidallcos,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 投标费用详情
  {
    path: '/bidallcosdetails',
    name: 'Bidallcosdetails',
    component: Bidallcosdetails
  },
  // 投标看板
  {
    path: '/bidindex',
    name: 'Bidindex',
    component: Bidindex
  }
]
