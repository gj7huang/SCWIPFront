<template lang="html">
  <div class="ins-list-wrap">
    <router-link class="link" v-for="(i, index) in showIns" :to="'/ins/' + i.ins_id" :key="i.ins_id" tag="li">
      <div class="ins-box">
        <div class="item">{{i.ins_type}}</div>
        <div class="item2">{{i.ins_name}}</div>
        <div class="item">{{i.agent}}</div>
      </div>
    </router-link>
    <!-- {{ins}} -->
    <p class="showNone">{{showNone}}</p>
  </div>
</template>

<script>
// import axios from 'axios'
import {axios} from '@/lib'

export default {
  data () {
    return {
      ins: [],
      showIns: [],
      errors: []
    }
  },
  computed: {
    showNone () {
      if (!this.showIns.length) {
        return '沒有更多的項目'
      } else {
        return ''
      }
    }
  },
  methods: {
    // getInsInfo (list) {
    //   this.$bus.$emit('ins', list)
    // },
    getAllIns () {
      // axiox
      axios({
        method: 'get',
        url: '/api/list-institution/'
      })
      .then(response => {
        // JSON responses are automatically parsed.
        this.ins = response.data
        this.choiceInsMethod()
        this.showIns = response.data
        // console.log(response.data)
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    getCityIns (areaList, sInput) {
      // axiox
      // axios.get(``)
      let result = []
      if (sInput) {
        result = this.ins.filter(obj => ((areaList.includes(obj.city) && (obj.ins_name.indexOf(sInput) > -1))))
      } else {
        result = this.ins.filter(obj => (areaList.includes(obj.city)))
      }
      return result
      // this.ins = 'city ins'
    },
    getAreaIns (area, sInput) {
      // axiox
      // console.log(c)
      let result = []
      if (sInput) {
        result = this.ins.filter(function (obj) {
          return ((obj.city === area) && (obj.ins_name.indexOf(sInput) > -1))
        })
      } else {
        result = this.ins.filter(function (obj) {
          return (obj.city === area)
        })
      }
      // console.log(result)
      return result
      // this.ins = 'area ins'
    },
    getIns (sInput) {
      return (sInput) ? this.ins.filter(obj => (obj.ins_name.indexOf(sInput) > -1)) : this.ins
    },
    choiceInsMethod () {
      this.$bus.$on('cityArea', event => {
        // const {id, name, email} = event
        // console.log([event.searchInput, event.selectedCity, event.selectedArea])
        if (!event.selectedGroup.selectedCity && !event.selectedGroup.selectedArea) {
          // console.log(1)
          this.showIns = this.getIns(event.selectedGroup.searchInput)
        } else if (event.selectedGroup.selectedCity && event.selectedGroup.selectedArea === null) {
          // console.log(2)
          this.showIns = this.getCityIns(event.opt2, event.selectedGroup.searchInput)
        } else if (event.selectedGroup.selectedArea) {
          // console.log(3)
          this.showIns = this.getAreaIns(event.selectedGroup.selectedArea, event.selectedGroup.searchInput)
        }
      })
    },
    searchInsName () {
    }
  },
  created () {
    this.getAllIns()
    this.choiceInsMethod()
  },
  beforeDestroy () {
    // this.$bus.$off('cityArea')
  }
}
</script>

<style lang="scss" scoped>
.ins-list-wrap {
  // width: 80%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  // align-items: center;
  justify-content: center;
  list-style-type: none;
  .link {
    color: #000;
    &:active, &:focus &:hover {
      text-decoration: none;
    }
    .ins-box {
      width: 300px;
      // display: flex;
      cursor: pointer;
      // align-items: center;
      // justify-content: center;
      margin: 10px;
      border: #eee 1px solid;
      border-left: RGBA(71, 183, 132, 1.00) 3px solid;
      padding: 10px;
      &:hover {
        box-shadow:4px 4px rgba(20%,20%,40%,0.5);
        border-left: RGBA(71, 183, 132, 1.00) 5px solid;
      }
      .item2 {
        font-size: 30px;
      }
    }
  }
}
.showNone {
  font-size: 30px;
  color: RGBA(71, 183, 132, 0.50);
}

@media(max-width: 650px) {
  .ins-box {
    width: 500px;
  }
}
</style>
