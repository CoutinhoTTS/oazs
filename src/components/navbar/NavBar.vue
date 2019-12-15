<template>
  <van-nav-bar
    :title="titles"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  >
  <i @click="showprops" v-if="barisshow" class="fa fa-bars" slot="right"></i>
</van-nav-bar>
</template>

<script>
export default {
  name: 'NavBar',
  props: [
    'titles',
    'barisshow'
  ],
  data () {
    return {
      showprop: true
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    showprops () {
      this.$emit('showprop', this.showprop)
    }
  },
  black_ () {
    this.onClickLeft()
  }
}
</script>

<style scoped>

</style>
