import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  hfshow: false,
  hfshow_: false,
  token: '',
  companyname: '',
  logo: ''
}
const mutations = {
  hfshow (state, isshow) {
    state.hfshow = isshow
  },
  hfshow_ (state, isshow) {
    state.hfshow_ = isshow
  },
  tokens (state, tokens) {
    state.token = tokens
  },
  companyname (state, companyname) {
    state.companyname = companyname
  },
  logo (state, logo) {
    state.logo = logo
  }
}
const actions = {
  isshow (context, isshow) {
    context.commit('hfshow', isshow)
  },
  isshow_ (context, isshow) {
    context.commit('hfshow_', isshow)
  },
  tokens (context, tokens) {
    context.commit('tokens', tokens)
  },
  companyname (context, name) {
    context.commit('companyname', name)
  },
  companylogo (context, logo) {
    context.commit('logo', logo)
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})
