<template lang="html">
  <div class="search-wrap">
    <!-- <p>找到所有能幫助你的資訊</p> -->
    <div class="search-container">
      <b-form-input v-model="selectedGroup.searchInput"
                  type="text"
                  placeholder="Search Institution Name" class="search-input"></b-form-input>
      <!-- <p>Value: {{ text1 }}</p> -->

      <b-form-select v-model="selectedGroup.selectedCity" class="mb-3 search-box" :options="options1">
        <template slot="first">
          <!-- this slot appears above the options from 'options' prop -->
          <option :value="null">--ALL City--</option>
        </template>
      </b-form-select>
      <b-form-select v-model="selectedGroup.selectedArea" class="mb-3 search-box" :options="options2">
        <template slot="first">
          <!-- this slot appears above the options from 'options' prop -->
          <option :value="null">--ALL Area--</option>
        </template>
      </b-form-select>
      <b-button class="search-btn" @click="searchIns">馬上搜尋</b-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
// import axios from 'axios'
import {axios} from '@/lib'
import { FormInput, FormSelect, Button } from 'bootstrap-vue/es/components'

Vue.use(Button)
Vue.use(FormSelect)
Vue.use(FormInput)

export default {
  data () {
    return {
      selectedGroup: {
        searchInput: '',
        selectedCity: null,
        selectedArea: null
      },
      options1: [],
      cities: [],
      ins: [],
      errors: []
    }
  },
  computed: {
    options2 () {
      let areasList = []
      for (let c of this.cities) {
        if (c.city_name === this.selectedGroup.selectedCity) {
          areasList.push({text: c.area_name, value: c.city_id})
        }
      }
      // console.log(areasList)
      if (areasList.length) {
        this.selectedGroup.selectedArea = null
      }
      return areasList
    }
  },
  methods: {
    searchIns () {
      let opt2 = this.options2.map(obj => obj.value)
      console.log(this.selectedGroup)
      this.$bus.$emit('cityArea', {selectedGroup: this.selectedGroup, opt2: opt2})
      this.$router.push('/')
    },
    getCity () {
      // axiox
      // axios.get(`/api/list-city/`)
      axios({
        method: 'get',
        url: '/api/list-city/'
      })
      .then(response => {
        // JSON responses are automatically parsed.
        this.cities = response.data
        // console.log(this.cities)

        this.options1 = this.cities.map(function (obj) {
          // console.log(obj.city_name)
          return obj.city_name
        })
        .filter(function (el, i, arr) {
          return arr.indexOf(el) === i
        })
        // console.log(this.options1)
      })
      .catch(e => {
        this.errors.push(e)
      })

      // this.options1 = this.cities.map(function (obj) {
      //   // console.log(obj.city_name)
      //   return obj.city_name
      // })
      // this.options1 = this.options1.filter(function (el, i, arr) {
      //   return arr.indexOf(el) === i
      // })
    }
  },
  created () {
    this.getCity()
  }
}
</script>

<style lang="scss" scoped>
.search-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 250px;
  // opacity:0.4;
  background-image: url('../assets/search_bg.jpg');
  background-repeat: no-repeat;
  background-position: center;
  .search-container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: nowrap;
    background-color: RGBA(114, 127, 128, 0.5);
    border-radius: 25px;
    width: 60%;
    padding: 0 20px;
    .search-box {
      display: flex;
      justify-content: center;
      margin: 20px 5px 0px 5px;
      width: 130px;
      text-align: center;
    },
    .search-input {
      margin: 20px 5px 5px 5px;
      width: 700px;
    }
    .search-btn {
      background-color: RGBA(71, 183, 132, 1.00);
      border-radius: 10%;
      border: none;
      margin: 20px 0px 0px 0px;
      &:hover {
        background-color: RGBA(100, 200, 150, 1.00);
      }
      &:active {
        background-color: RGBA(55, 71, 87, 1.00);
      }
    }
  }
  @media(max-width: 768px) {
    .search-container {
      width: 80%;
      display: flex;
      flex-wrap: wrap;
      .search-input {
        width: 90%;
      }
      .search-box {
        width: 35%;
      }
    }
  }
  @media(max-width: 500px) {
.search-wrap {
  height: 250px;
}
    .search-container {
      width: 90%;
      flex-wrap: wrap;
      .search-box {
        width: 100%;
        margin: 0px 5px 0px 5px;
      }
      .search-input {
        width: 100%;
        margin: 15px 5px 15px 5px;
      }
      .search-btn {
        width: 100%;
        margin: 0px 5px 10px 10px;
      }
    }
  }

}
</style>
