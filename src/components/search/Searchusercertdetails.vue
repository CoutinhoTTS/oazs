<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit" >
      </NavBar>
    </div>
    <!--列表-->
    <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="datails_pull">
      <div class="datailsList" v-if="listisok">
        <div><div>姓名:</div><div>{{list[0].realname}}</div></div>
        <div><div>性别:</div><div>{{list[0].sex}}</div></div>
        <div><div>证件类型:</div><div>身份证</div></div>
        <div><div>证件号码:</div><div>{{list[0].id_card}}</div></div>
        <div><div>所属单位:</div><div>{{list[0].com_name}}</div></div>
      </div>
      <div class="certsdetails">
        <h4>证书信息</h4>
        <div v-for="(item, index) in list" :key="index">
          <div><div>证书名称:</div><div>{{item.cert_tec_name}}</div></div>
          <div><div>注册专业:</div><div>{{item.reg_major}}</div></div>
          <div><div>证书编号:</div><div>{{item.cert_code}}</div></div>
          <div><div>执业印章号:</div><div>{{item.reg_cert_code}}</div></div>
          <div><div>有效期:</div><div>{{item.end_time}}</div></div>
          <div><div>注册单位:</div><div>{{item.com_name}}</div></div>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import {usershow} from '../../api/Api'
export default {
  name: 'Searchusercertdetails',
  components: {
    NavBar
  },
  data () {
    return {
      token: '',
      id: '',
      tit: '',
      isLoading_: false,
      list: [],
      listisok: false
    }
  },
  created () {
    this.id = this.$route.query.id
    this.tit = `${this.$route.query.tit}详情`
    this.token = this.$store.state.token
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
    this.thisperdetails()
  },
  methods: {
    onRefresh () {
      this.thisperdetails()
    },
    thisperdetails () {
      let param = {
        cert_id: this.id,
        token: this.token
      }
      usershow(param).then((res) => {
        if (res.data.code === 2000) {
          this.list = res.data.data.cert
          if (this.list[0].sex === 1) {
            this.list[0].sex = '男'
          } else if (this.list[0].sex === 0) {
            this.list[0].sex = '女'
          }
          this.listisok = true
          this.isLoading_ = false
        }
      })
    }
  }
}
</script>

<style scoped>
.certsdetails{
  font-size: 0.8rem;
  padding: 0.5rem 1rem;
}
.certsdetails>div{
  background-color: #dddddd;
  border-radius: 0.3rem;
  padding: 0.5rem;
}
  .certsdetails>div>div{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0.2rem 0;
  }
</style>
