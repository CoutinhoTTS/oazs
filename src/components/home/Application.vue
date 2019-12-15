<template>
  <div class="application">
    <Title :Tname="Tname" :isshow = 'isshow' :num="num"></Title>
    <van-list>
      <div class="appliclist" v-for="(item, index) in list" :key="index" @click="engindetails(item.id, item.modenum, item.modejs, item.modename)">
        <span>[{{item.modename}}]</span>
        <span>单号:{{item.sericnum}},</span>
        <span>日期:{{item.applydt}},</span>
        <span v-html="item.nstatustext"></span>
      </div>
    </van-list>
  </div>
</template>

<script>
import Title from '@/components/title/Title'
import {mysheet} from '../../api/Api'
export default {
  name: 'Application',
  components: {
    Title
  },
  data () {
    return {
      token: '',
      list: [],
      Tname: '我的申请',
      isshow: true,
      num: 'mysheet'
    }
  },
  created () {
    this.token = this.$store.state.token
    let params = {
      token: this.token,
      page: 1,
      pagesize: 5,
      type: 1
    }
    mysheet(params).then((res) => {
      if (res.data.code === 2000) {
        this.list = res.data.data.data.data
      }
    })
  },
  methods: {
    engindetails (id, mun, mo, mod) {
      if (mo !== 'schedulepage') {
        this.$router.push({
          path: `/${mo}details`,
          query: {
            id: id,
            modenum: mun,
            tit: mod
          }
        })
      } else {
        this.$router.push({
          path: `/${mo}`,
          query: {
            modenum: mun
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.application{
  width: 100%;
  margin-top: 1rem;
  background-color: #fff;
}
  .appliclist{
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    border-bottom: 0.065rem solid #eeeeee;
  }
</style>
