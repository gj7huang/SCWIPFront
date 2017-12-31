<template lang="html">
  <div class="profile-wrap">
    <div class="pic">
      <img src="../assets/delight.svg" alt="">
    </div>
    <div class="info">
      <p>{{ profile.username }}</p>
      <p>{{ profile.email }}</p>
      <p>你好</p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Button } from 'bootstrap-vue/es/components'
// import {axios} from '@/lib'

Vue.use(Button)

export default {
  name: 'Profile',
  data () {
    return {
      profile: {},
      favorite: [],
      errors: []
    }
  },
  created () {
    this.$bus.$on('profile', event => {
      // const {id, name, email} = event
      this.profile = event.profile
      console.log('p頁面')
    })
    // console.log(this.profile)

    // Favorite profile
    // this.getFavorite()
  },
  // mounted () {
  //   const {id, name, email} = this.$bus.$data
  //   console.log('-=-=-==-=-=-', id, name)
  //   console.log(this.$bus)
  //   if (id && name && email) {
  //     this.profile = {
  //       id,
  //       name,
  //       email
  //     }
  //   }
  // },
  beforeDestroy () {
    // this.$bus.$off('profile')
  }
}
</script>

<style lang="scss" scoped>
.profile-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .pic {
    border-radius: 50px;
    width: 100px;
    height: 200px;
  }
}
</style>
