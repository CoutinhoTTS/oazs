<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit">
      </NavBar>
    </div>
    <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="certbox">
      <van-list
        v-model="loading_"
        :error.sync="error_"
        :finished="finished_"
        error-text="请求失败，点击重新加载"
        finished-text="加载完成"
        :offset="offset_"
        @load="onLoad"
      >
        <div class="certboxlist" v-for="(item, index) in list" :key="index" :data-id ="item.id" >
          <div><div><i class="fa fa-inbox"></i><span>{{item.name}}</span></div><div><span>地址:</span><span>{{item.address}}</span></div>
          <div><span>编号:</span><span>{{item.num}}</span></div></div>
          <div>
            <div><span>管理员:</span><span>[{{item.cgname}}]</span></div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import {certboxlist} from '../../../api/Api'
export default {
  name: 'Certbox',
  components: {
    NavBar
  },
  data () {
    return {
      token: '',
      tit: '文件柜',
      // 证书列表
      isLoading_: false,
      finished_: true,
      error_: false,
      loading_: false,
      offset_: 1,
      list: []
    }
  },
  created () {
    this.token = this.$store.state.token
    let params = {
      token: this.token
    }
    certboxlist(params).then((res) => {
      if (res.data.code === 2000) {
        this.list = res.data.data
      }
    })
  },
  methods: {
    onRefresh () {
      let params = {
        token: this.token
      }
      certboxlist(params).then((res) => {
        if (res.data.code === 2000) {
          this.list = res.data.data
          this.isLoading_ = false
        }
      })
    },
    onLoad () {
    }
  }
}
</script>

<style scoped>
.certbox{
  width: 100%;
  margin-bottom: 3.125rem;
}
  .certboxlist{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid #ededed;
  }
.certboxlist>div{
  margin: 0.5rem auto;
}
.certboxlist>div:first-child{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
}
.certboxlist>div:first-child>div:first-child{
  width: 30%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.certboxlist>div:first-child>div:first-child>span:first-child{
  font-size: 1rem
}
.certboxlist>div:first-child>div:first-child>span:nth-child(2){
  margin-left: 0.5rem;
}

.certboxlist>div:first-child>div:nth-child(2){
  width: 30%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.certboxlist>div:first-child>div:nth-child(2)>span:last-child{
  font-size: 0.6rem;
  margin-left: 0.4rem;
}
.certboxlist>div:first-child>div:nth-child(3){
  width: 30%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.certboxlist>div:first-child>div:nth-child(3)>span:last-child{
 font-size: 0.6rem;
  margin-left: 0.4rem;
}
  .certboxlist>div:last-child{
    width: 100%;
    text-align: left;
    font-size: 0.8rem;
  }
.certboxlist>div:last-child>div>span:last-child{
  margin-left: 0.4rem;
  font-size: 0.6rem;
  color: #2dd5ff;
}
</style>
