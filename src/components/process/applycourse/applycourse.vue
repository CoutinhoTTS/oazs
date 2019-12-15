<template>
  <div style="padding: 2.845rem 0 3.125rem">
    <div class="NavBar">
      <NavBar :titles="tit">
      </NavBar>
    </div>
    <div class="addsys">
      <div @click="jingdu">
        <div>
          <van-icon name="todo-list-o"/>
          <span>
              进度填报
            </span>
        </div>
      </div>
      <div @click="shigong">
       <div>
         <van-icon name="records"/>
         <span>
              施工日志
            </span>
       </div>
      </div>
      <div @click="anquan">
        <div>
          <van-icon name="notes-o"/>
          <span>
              安全日志
            </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
export default {
  name: 'applycourse',
  components: {
    NavBar
  },
  data () {
    return {
      tit: '流程申请'
    }
  },
  created () {
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
  },
  methods: {
    jingdu () {
      this.$router.push({
        path: '/addprogress',
        query: {
          modenum: 'enginspeed'
        }
      })
    },
    shigong () {
      this.$router.push({
        path: '/addconstruction',
        query: {
          modenum: 'conprocessbuildlog'
        }
      })
    },
    anquan () {
      this.$router.push({
        path: '/addsecurity',
        query: {
          modenum: 'enginseclog'
        }
      })
    }
  }
}
</script>

<style scoped>
.addsys{
  margin: 20vh auto 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.addsys>div{
  width: 80%;
  border-radius: 1rem;
  margin: 0.5rem auto;
  padding: 1rem 0.5rem;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-size: 1.2rem;
}
.addsys>div:first-child{
  background-color: #30b1ff;
}
.addsys>div:nth-child(2){
  background-color: #f61f41;
}
.addsys>div:nth-child(3){
  background-color: #ff8e42;
}
</style>
