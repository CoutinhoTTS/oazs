<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit">
      </NavBar>
    </div>
    <!--列表-->
    <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="datails_pull">
      <div class="datailsList">
        <div><div>培训名称:</div><div>{{list.title}}</div></div>
        <div><div>培训内容:</div><div>{{list.content}}</div></div>
        <div><div>培训机构:</div><div>{{list.mechanism}}</div></div>
        <div><div>培训地点:</div><div>{{list.address}}</div></div>
        <div><div>报名时间:</div><div>{{list.enroll_startdt}}至{{list.enroll_enddt}}</div></div>
        <div><div>培训时间:</div><div>{{list.train_startdt}}至{{list.train_enddt}}</div></div>
        <div><div>领取准考证时间:</div><div>{{list.receive_startdt}}至{{list.receive_enddt}}</div></div>
        <div><div>考试时间:</div><div>{{list.exam_startdt}}至{{list.exam_enddt}}</div></div>
        <div><div>是否报名:</div><div>{{list.isenroll}}</div></div>
        <div><div>培训费(元):</div><div>{{list.money}}</div></div>
        <div><div>其他费用(元):</div><div>{{list.other_money}}</div></div>
        <div><div>报名网站:</div><div>{{list.enroll_url}}</div></div>
        <div><div>参加人员:</div>
          <div>
          <div v-for="(item, index) in mon" :key="index" class="trainper">
            <span>{{item.name}}</span><span :class="[item.idok === '未通过'? 'bgcs' : 'bgcn']">{{item.idok}}</span>
          </div>
         </div>
        </div>
      </div>
      <van-panel title="备注:" >
        <div class="explian">{{list.explain}}</div>
      </van-panel>
      <!--文件-->
      <File ref="files"></File>
      <!--审核，游览-->
      <Datailsliu ref="getreadsandlog"></Datailsliu>
    </van-pull-refresh>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import Datailsliu from '@/components/com/datails_liu'
import File from '@/components/com/file'
import {trainshow, getreadsandlog} from '../../../api/Api'
export default {
  name: 'certalldatails',
  components: {
    NavBar,
    Datailsliu,
    File
  },
  data () {
    return {
      tit: '证书详情',
      isLoading_: false,
      token: '',
      id: '',
      modenum: '',
      // 详情数据
      list: '',
      getreadsandlog: '',
      mon: []
    }
  },
  created () {
    this.id = this.$route.query.id
    this.modenum = this.$route.query.modenum
    this.tit = `${this.$route.query.tit}详情`
    this.token = this.$store.state.token
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
    let params = {
      token: this.token,
      id: this.id
    }
    trainshow(params).then((res) => {
      if (res.data.code === 2000) {
        this.list = res.data.data.data
        this.$refs.files.files(res.data.data.file)
        if (this.list.isenroll === 1) {
          this.list.isenroll = '已报名'
        } else {
          this.list.isenroll = '未报名'
        }
        for (var i = 0; i < this.list.trains.length; i++) {
          this.mon.push({
            name: this.list.trains[i].personname,
            idok: this.list.trains[i].examsituation
          })
        }
      }
    })
    let params_ = {
      token: this.token,
      modenum: this.modenum,
      mid: this.id
    }
    getreadsandlog(params_).then((res) => {
      if (res.data.code === 2000) {
        this.getreadsandlog = res.data.data
        this.$refs.getreadsandlog.datails_liu(this.getreadsandlog)
      }
    })
  },
  methods: {
    onRefresh () {
      let params = {
        token: this.token,
        id: this.id
      }
      trainshow(params).then((res) => {
        if (res.data.code === 2000) {
          this.list = res.data.data.data
          let params_ = {
            token: this.token,
            modenum: this.modenum,
            mid: this.id
          }
          getreadsandlog(params_).then((res) => {
            if (res.data.code === 2000) {
              this.getreadsandlog = res.data.data
              this.$refs.getreadsandlog.datails_liu(this.getreadsandlog)
              this.isLoading_ = false
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .trainper{
    text-align: right;
    margin-top: 0.5rem;
  }
  .bgcs{
    background-color: #f61f41;
    color: white;
    padding: 0.1rem;
    border-radius: 0.2rem;
    margin-left: 0.3rem;
  }
  .bgcn{
    background-color: #008ddd;
    color: white;
    padding: 0.1rem;
    border-radius: 0.2rem;
    margin-left: 0.3rem;
  }
</style>
