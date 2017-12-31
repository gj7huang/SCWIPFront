<template lang="html">
  <div class="aqi-wrap">
    <h2>AQI 排行榜</h2>
    <b-button class="search-btn" @click="reverseList">反轉</b-button>
    <ul class="aqi-list">
      <li class="item" v-for="i in info">
        <div class="aqi-index">{{i.aqi_index}}</div>
        <div class="aqi-area">{{i.aqi_area}}</div>
        <div class="aqi-pubdate">{{i.aqi_pubdate}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import {axios} from '@/lib'
import Vue from 'vue'
import { Button } from 'bootstrap-vue/es/components'

Vue.use(Button)

export default {
  name: 'TopInsPage',
  data () {
    return {
      info: []
    }
  },
  methods: {
    reverseList () {
      this.info = this.info.reverse()
      console.log(this.info)
    }
  },
  created () {
    axios({
      method: 'get',
      url: `/api/list-all-aqi/`
    })
    .then(response => {
      // JSON responses are automatically parsed.
      // this.info = response.data
      this.info = response.data.sort(function (a, b) {
        return a.aqi_index > b.aqi_index ? 1 : -1
      })
      // console.log(this.info)
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>

<style lang="scss" scoped>
.search-btn {
  background-color: RGBA(71, 183, 132, 1.00);
  border-radius: 10%;
  border: none;

  &:hover {
    background-color: RGBA(100, 200, 150, 1.00);
  }
  &:active {
    background-color: RGBA(55, 71, 87, 1.00);
  }
}
.aqi-wrap {
  // margin-top: 100px;
  h2 {
    display: inline-block;
    height: 30px;
    text-align: center;
    margin-top: 20px;
  }
  .aqi-list {
    display: flex;
    flex-direction: column;

    .item {
      display: flex;
      justify-content: center;
      list-style-type:none;
      align-items: center;
      .aqi-index {
        font-size: 30px;
      }
      .aqi-index, .aqi-area, .aqi-pubdate {
        margin: 10px 5px;
      }
    }
  }
}


</style>
