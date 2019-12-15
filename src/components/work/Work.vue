<template>
  <div class="work_all" ref="wrapper">
    <div class="work_" v-for="(item, index) in Tname" :key="index">
      <Title :Tname = 'item.name' :isshow = 'isshow__' ></Title>
      <van-row class="functiontwo" v-for="(item01, index01) in row_work[index]" :key="index01">
        <van-col
          span="6"
          v-for="(item02, index02) in row_work[index][index01]"
          :class="[(item02.children && item02.children.length <= 3) ? 'haschild': (item02.children && item02.children.length) <= 6 ? 'haschild_' : (item02.children && item02.children.length) <= 10 ? 'haschild__': (item02.children && item02.children.length <= 20) ? 'haschild___': '']"
          :key="index02"
          @click.native="Funthree(index, index01, index02, item02)"
        >
          <i class="funTbiao" :class="'fa fa-'+item02.micons" :style="'color:'+item02.color"></i><span>{{item02.name}}</span></van-col>
      </van-row>
    </div>
    <van-popup v-model="show"  class="popthreew">
      <div>
        <van-row type="flex" class="functiontwo"  v-for="(item, index) in row_workthree" :key="index">
          <van-col @click.native="Funthree_to(item01.modejs,item01.modenum)" span="8" v-for="(item01, index01) in row_workthree[index]" :key="index01" ><i :class="'fa fa-'+item01.micons" :style="'background-color:'+item01.color"> </i><span class="funname">{{item01.name}}</span></van-col>
        </van-row>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Title from '@/components/title/Title'
import {usermenu} from '../../api/Api'
export default {
  name: 'Work',
  components: {
    Title
  },
  data () {
    return {
      Tname: [],
      row_work: [],
      // 图标
      icon: [],
      isshow__: false,
      token: '',
      // 三级功能
      row_workthree: [],
      // 模态框
      show: false,
      scrollTop: ''
    }
  },
  created () {
    this.$store.dispatch('isshow', true)
    this.$store.dispatch('isshow_', true)
    this.token = this.$store.state.token
    let params = {
      token: this.token
    }
    usermenu(params).then((res) => {
      console.log(res)
      if (res.data.code === 2000) {
        this.Tname = res.data.data
        var s
        for (var n = 0; n < this.Tname.length; n++) {
          if (this.Tname[n].name === '系统') {
            s = n
          }
        }
        this.Tname.splice(s, 1)
        for (var i = 0; i < this.Tname.length; i++) {
          this.row_work.push([])
          if (this.Tname[i].children.length > 0) {
            var len = (this.Tname[i].children.length) / 4
            if (parseInt(len) < len) {
              len = parseInt(len) + 1
            } else if (parseInt(len) === len) {
              len = parseInt(len)
            }
            for (var k = 0; k < len; k++) {
              this.row_work[i].push([])
            }
            for (var l = 0; l < this.row_work[i].length; l++) {
              for (var j = (l * 4); j < (l * 4) + 4; j++) {
                if (this.Tname[i].children[j]) {
                  this.row_work[i][l].push(this.Tname[i].children[j])
                }
              }
            }
          }
        }
      }
    })
  },
  methods: {
    Funthree: function (index, index01, index02, item) {
      this.row_workthree = []
      if (this.row_work[index][index01][index02].children && this.row_work[index][index01][index02].children.length > 0) {
        var threeFun = this.row_work[index][index01][index02].children
        var len = threeFun.length / 3
        if (parseInt(len) < len) {
          len = parseInt(len) + 1
        } else if (parseInt(len) === len) {
          len = parseInt(len)
        }
        for (var i = 0; i < len; i++) {
          this.row_workthree.push([])
        }
        for (var j = 0; j < this.row_workthree.length; j++) {
          for (var k = (j * 3); k < (j * 3) + 3; k++) {
            if (threeFun[k]) {
              this.row_workthree[j].push(threeFun[k])
            }
          }
        }
        this.show = true
      } else {
        this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        if (item.modenum) {
          this.$router.push({
            path: `/${item.modejs}`,
            query: {
              modenum: item.modenum
            }
          })
        } else {
          if (item.modejs !== 'cshome') {
            this.$router.push(`/${item.modejs}`)
          } else {
            this.$toast('该功能待开发！！！')
          }
        }
      }
    },
    Funthree_to (e, a) {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (e === 'own') {
        this.$router.push({
          path: `/ChangePassword`
        })
      } else {
        this.$router.push({
          path: `/${e}`,
          query: {
            modenum: a
          }
        })
      }
    }
  },
  activated () {
    document.documentElement.scrollTop = this.scrollTop
    document.body.scrollTop = this.scrollTop
  }
}
</script>

<style scoped>
.work_all{
  width: 100%;
  margin-bottom: 3.125rem;
}
.functiontwo_all{
  width: 100vw;
  margin-top: 1rem;
  background-color: #fff;
}
.functiontwo>div{
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-top:0.5rem;
  /*color: #fff;*/
}
.functiontwo{
  margin: 1rem auto;
}
.functiontwo>div>i{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 2.8125rem;
  height: 2.8125rem;
  font-size: 1.3rem;
  border-radius: 0.3rem;
  color: white;
  background-color: #2dd5ff
}
.functiontwo>div>span{
  font-size: 0.7rem;
  margin: 0.5rem auto;
}
.functiontwo_bgc1{
  background-color: #36d296;
}
.functiontwo_bgc2{
  background-color: #2dd5ff;
}
.functiontwo_bgc3{
  background-color: #ff8e42;
}
.functiontwo_bgc4{
  background-color: #d2c810;
}
.functiontwo_bgc5{
  color: #5c5c5c !important;
  border:1px solid #a6a6a6;
}
.popthreew{
  width: 90vw;
  height: 90vw;
  margin: 0 auto;
  border-radius: 0.5rem;
  overflow: hidden auto;
  background-color: rgba(255, 255, 255, 0.91);
}
.popthreew>div{
  width: 100%;
  /*height: 100%;*/
}
.popthreew>div>div>div{
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-top:0.5rem;
  /*background-color: #fff;*/
}
.popthreew>div>div>div>i{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 2.8125rem;
  height: 2.8125rem;
  font-size: 1.3rem;
  border-radius: 0.3rem;
  /*color: white;*/
}
.popthreew>div>div>div>span{
  font-size: 0.8rem;
  margin: 0.5rem auto;
  /*color: white;*/
}
  .haschild>i{
    text-align: center;
    background-color: #ff8e42!important;
  }
.haschild_>i{
  text-align: center;
  background-color: #36d296!important;
}
.haschild__>i{
  text-align: center;
  background-color: #5eda6d!important;
}
.haschild___>i{
  text-align: center;
  background-color: #ffb0f6 !important;
}
  .funname{
    max-width: 90%;
    white-space: nowrap;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
