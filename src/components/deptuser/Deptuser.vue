<template>
  <van-tree-select
    :items="items"
    :main-active-index="mainActiveIndex"
    :active-id="activeId"
    @navclick="onNavClick"
    @itemclick="onItemClick"
  />
</template>

<script>
import {deptuser} from '../../api/Api'
export default {
  name: 'Deptuser',
  data () {
    return {
      token: '',
      items: [],
      // 左侧高亮元素的index
      mainActiveIndex: 0,
      // 被选中元素的id
      activeId: 1
    }
  },
  created () {
    var arrtoken = (document.cookie || '').split('=')
    this.token = arrtoken[1]
    let pramas = {
      token: this.token
    }
    deptuser(pramas).then((res) => {
      console.log(res)
      console.log(res.data.data)
      if (res.data.code === 2000) {
      }
    })
  },
  methods: {
    onNavClick () {
    },
    onItemClick () {
    }
  }
}
</script>

<style scoped>

</style>
