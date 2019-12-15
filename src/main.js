// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import { Button, Row, Col, Lazyload, Icon, List, Cell, Tab, Tabs, Toast, Panel, Popup, NavBar, Collapse, CollapseItem, PullRefresh, Field, CellGroup, DatetimePicker, TreeSelect,
  Picker, Search, NoticeBar, ImagePreview, RadioGroup, Radio, DropdownMenu, DropdownItem, Dialog, Switch, Loading, Uploader, Pagination} from 'vant'
import axios from 'axios'
import 'font-awesome/css/font-awesome.min.css'
import store from './store/store'
import './assets/icon/iconfont.css'
import animate from 'animate.css'
import cookieUtil from './router/token'
import promise from 'es6-promise'
// import Vconsole from 'vconsole'
import Mui from 'vue-awesome-mui'
Vue.use(Mui)
// const vconsole = new Vconsole()
promise.polyfill()
// Vue.use(vconsole)
Vue.use(animate)
Vue.use(Button).use(Row).use(Col).use(Lazyload).use(Icon).use(List).use(Cell).use(Tab).use(Tabs).use(Toast).use(Panel).use(Popup)
  .use(NavBar).use(Collapse).use(CollapseItem).use(PullRefresh).use(Field).use(CellGroup).use(DatetimePicker).use(TreeSelect).use(Picker).use(Search)
  .use(NoticeBar).use(ImagePreview).use(RadioGroup).use(Radio).use(DropdownMenu).use(DropdownItem).use(Dialog).use(Switch).use(Loading).use(Uploader)
  .use(Pagination)
Vue.config.productionTip = false
axios.defaults.baseURL = process.env.API_HOST
router.beforeEach((to, from, next) => {
  let arr = cookieUtil.getCookies('token')
  if (arr === 'token') {
    arr = ''
  } else if (!arr) {
    cookieUtil.setCookies('token', '')
  }
  var istoken = ''
  if (arr) {
    istoken = unescape(arr)
  }
  if (to.path !== '/' && !istoken) {
    next()
    router.push('/')
  } else {
    if (to.path === '/' && istoken) {
      // router.push('/Home')
      next('/Home')
    } else {
      axios.post(`/v1/index/index`, {token: istoken}).then((res) => {
        if (res.data.code === 2000) {
          store.dispatch('isshow', true)
          store.dispatch('isshow_', true)
          store.dispatch('tokens', istoken)
          store.dispatch('companyname', res.data.data.userinfo.comname)
          store.dispatch('companylogo', res.data.data.userinfo.logo)
          next()
        } else {
          if (istoken) {
            router.go(0)
          }
          cookieUtil.setCookies('token', '')
          next()
          router.push({
            path: '/'
          })
        }
      })
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
