<template>
  <div>
    <div class="NavBar">
      <NavBar :titles="tit" >
      </NavBar>
    </div>
    <!--列表-->
    <van-pull-refresh v-model="isLoading_" @refresh="onRefresh" class="datails_pull">
      <div class="datailsList">
        <div><div>资产编号:</div><div>{{list.num}}</div></div>
        <div class="imgs_"><div>封面图片:</div><div><img class="imgs" v-for="(img, index) in imageList" v-lazy="img" :key="index"></div></div>
        <div><div>资产名称:</div><div>{{list.title}}</div></div>
        <div><div>资产分类:</div><div>{{list.type_name}}</div></div>
        <div><div>品牌:</div><div>{{list.brand}}</div></div>
        <div><div>规格模型:</div><div>{{list.model}}</div></div>
        <div><div>来源:</div><div>{{list.laiyuan}}</div></div>
        <div><div>所属部门:</div><div>{{list.shuname}}</div></div>
        <div><div>仓库:</div><div>{{list.ck_name}}</div></div>
        <div><div>状态:</div><div>{{list.status_name}}</div></div>
        <div><div>购进日期:</div><div>{{list.buydt}}</div></div>
        <div><div>价格:</div><div>{{list.price}}</div></div>
        <div><div>使用人:</div><div>{{list.usename}}</div></div>
      </div>
      <!--文件-->
      <van-panel title="说明:" >
        <div class="explian">{{list.explain}}</div>
      </van-panel>
      <File ref="files"></File>
      <!--审核，游览-->
      <Datailsliu ref="getreadsandlog" ></Datailsliu>
    </van-pull-refresh>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
import Datailsliu from '@/components/com/datails_liu'
import File from '@/components/com/file'
import {assetmshow, getreadsandlog} from '../../../api/Api'
export default {
  name: 'Assetmdetails',
  components: {
    NavBar,
    Datailsliu,
    File
  },
  data () {
    return {
      tit: '人员xiangq',
      isLoading_: false,
      token: '',
      id: '',
      modenum: '',
      // 详情数据
      list: '',
      active: 0,
      issticky: true,
      isoffsettop: 46,
      getreadsandlog: '',
      //  证书专业
      mon: [],
      imageList: []
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
    assetmshow(params).then((res) => {
      if (res.data.code === 2000) {
        this.list = res.data.data.data
        if (this.list.fengmian) {
          this.imageList = [`http://www.oazs.com/${this.list.fengmian}`]
        }
        this.$refs.files.files(res.data.data.file)
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
        this.$refs.getreadsandlog.datails_liu(this.getreadsandlog, this.modenum, this.id, this.token)
        this.isLoading_ = false
      }
    })
  },
  methods: {
    onRefresh () {
      let params = {
        token: this.token,
        id: this.id
      }
      assetmshow(params).then((res) => {
        if (res.data.code === 2000) {
          this.isLoading_ = false
          this.list = res.data.data.data
          let params_ = {
            token: this.token,
            modenum: this.modenum,
            mid: this.id
          }
          this.$refs.files.files(res.data.data.file)
          getreadsandlog(params_).then((res) => {
            if (res.data.code === 2000) {
              this.getreadsandlog = res.data.data
              this.$refs.getreadsandlog.datails_liu(this.getreadsandlog, this.modenum, this.id, this.token)
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .imgs{
    width: 50%;
  }
  .imgs_>div:nth-child(2){
    text-align: right;
  }
</style>
