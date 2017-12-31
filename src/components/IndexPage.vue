<template lang="html">
  <div class="index-wrap">
    <SearchBox id="aaa"></SearchBox>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
    <!-- <a href="#aaa"><img src="../assets/arrow-up-on-a-black-circle-background.svg" alt=""></a> -->
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

a {
  display: block;
  width: 60px;
  height: 60px;
  background-color: RGBA(71, 183, 132, 1.00);
  // background-image: url('../assets/arrow-up-on-a-black-circle-background.svg')
  border-radius: 50px;
  position: fixed;
  z-index: 9998;
  bottom: 58px;
  right: 5px;
}

.ins-wrap {
  // width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  margin: 20px auto;
  // background-color: RGBA(248, 249, 250, 1.00);
}
</style>
