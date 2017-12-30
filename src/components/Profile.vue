<template lang="html">
  <div class="profile-wrap">
    <p>{{ profile }}</p>
  </div>
</template>

<script>
import Vue from 'vue'
import { Button } from 'bootstrap-vue/es/components'
import {axios} from '@/lib'

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
    this.getFavorite()
  },
  method: {
    getFavorite () {
      axios({
        method: 'get',
        url: `/api/list-favorite/${this.profile.pk}/`
      })
      .then(response => {
        // JSON responses are automatically parsed.
        this.favorite = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
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

</style>
