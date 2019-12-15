<template>
  <div class="home">
    <Functionone></Functionone>
    <Functiontwo></Functiontwo>
    <Notice></Notice>
    <Application></Application>
    <Schedule></Schedule>
  </div>

</template>

<script>
import Functionone from '@/components/home/Functionone'
import Functiontwo from '@/components/home/Functiontwo'
import Notice from '@/components/home/Notice'
import Application from '@/components/home/Application'
import Schedule from '@/components/home/Schedule'
export default {
  name: 'home',
  components: {
    Functionone,
    Functiontwo,
    Notice,
    Application,
    Schedule
  },
  data () {
    return {
      scrollTop: ''
    }
  },
  created () {
    this.$store.dispatch('isshow', true)
    this.$store.dispatch('isshow_', true)
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === '') {
      from.meta.keepAlive = false
    } else {
      from.meta.keepAlive = true
    }
    next()
  },
  activated () {
    this.$store.dispatch('isshow', true)
    this.$store.dispatch('isshow_', true)
    document.documentElement.scrollTop = this.scrollTop
  },
  deactivated () {
    document.documentElement.scrollTop = 0
  }
}
</script>

<style scoped>
  .home{
    background-color: #F2F2F2;
    width: 100%;
    overflow: hidden;
  }

</style>
