<template lang="html">
  <div class="index-wrap">
    <SearchBox></SearchBox>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
import SearchBox from '@/components/SearchBox'
export default {
  name: 'IndexPage',
  components: {
    SearchBox
  },
  created () {
    this.$bus.$emit('profile', {profile: {}})
  },
  beforeDestroy () {
    this.$bus.$off('profile')
  }
}
</script>

<style lang="scss" scoped>
.ins-wrap {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  margin: 20px auto;
  // background-color: RGBA(248, 249, 250, 1.00);
}
</style>
