<template>
  <div style="padding: 2.875rem 0 3.125rem">
    <div class="NavBar">
      <NavBar :titles="tit" >
      </NavBar>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/navbar/NavBar'
export default {
  name: 'Userinfo',
  components: {
    NavBar
  },
  data () {
    return {
      tit: '个人质料',
      token: ''
    }
  },
  created () {
    this.token = this.$store.state.token
    this.$store.dispatch('isshow', false)
    this.$store.dispatch('isshow_', true)
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
