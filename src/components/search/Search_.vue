<template>
  <van-search
    v-model="value"
    :placeholder="placeholder"
    show-action
    shape="round"
    @search="onSearch"
    @blur="onblur"
  >
    <div slot="action" @click="onSearch">搜索</div>
  </van-search>
</template>

<script>
export default {
  name: 'Search_',
  data () {
    return {
      value: '',
      placeholder: '请输入搜索关键词'
    }
  },
  methods: {
    onSearch () {
      this.$emit('thiskeyword', this.value)
    },
    clkeyword (e) {
      this.value = e
    },
    placehold (data) {
      this.placeholder = data
    },
    onblur (e) {
      this.$emit('thiskeywords', e.path[0].value)
    }
  }
}
</script>

<style scoped>
  input::-webkit-input-placeholder{
    font-size: 0.6rem;
  }
</style>
