<template lang="html">
  <p>top</p>
</template>

<script>
import {axios} from '@/lib'

export default {
  name: 'TopInsPage',
  data () {
    return {
      topList: []
    }
  },
  created () {
    axios({
    //   method: 'get',
    //   url: `/api/list-ins_aqi/${this.selectedCap}/`,
    // })
    // .then(response => {
    //   // JSON responses are automatically parsed.
    //   this.info = response.data
    // })
    // .catch(e => {
    //   this.errors.push(e)
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
