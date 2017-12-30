<template lang="html">
  <div class="ins-wrap">
    <!-- <p>{{$route.params.id}}</p> -->
    <div class="insInfo">
      <table style="width:100%">
        <tr>
          <th>機構名稱</th>
          <th>{{ insInfo.ins_name }}</th>
        </tr>
        <tr>
          <td>編號</td>
          <td>{{ insInfo.ins_id }}</td>
        </tr>
        <tr>
          <td>屬性</td>
          <td>{{ insInfo.ins_type }}</td>
        </tr>
        <tr>
          <td>負責人</td>
          <td>{{ insInfo.agent }}</td>
        </tr>
        <tr>
          <td>電話</td>
          <td>{{ insInfo.phone }}</td>
        </tr>
        <tr>
          <td>地址</td>
          <td>{{ insInfo.address }}</td>
        </tr>
        <tr>
          <td>收容類型</td>
          <td>
            <a v-for="c in insCap">
              <a>{{c.text}}</a>
              <!-- <div v-bind:class="" id="heart"></div> -->
              <a>加入最愛 ♥ </a>
            </a>
          </td>
        </tr>
      </table>
    </div>
    <!-- {{insInfo}} -->

    <b-button class="comment-btn" @click="showModal = true">留言</b-button>
    <p>{{ error }}</p>
    <CommentModal v-if="showModal && isLogin" @close="showModal = false" :insCap="insCap">
      <h3 slot="header">回饋</h3>
      <div class="body" slot="body">
      <!-- <button type="button" class="fb-signin-button" @click="login">使用 Facebook 帳號登入</button> -->
      </div>
      <div class="footer" slot="footer"></div>
    </CommentModal>

    <div class="comment-wrap">
      <div class="comment" v-for="c in insCom">
        <div class="item">{{c.com_created}}</div>
        <div class="item">{{c.com_title}}</div>
        <div class="item">{{c.com_con}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {axios} from '@/lib'
import CommentModal from '@/components/CommentModal'

export default {
  components: {
    CommentModal
  },
  data () {
    return {
      insInfo: {},
      insCap: [],
      insCom: [],
      // insUnit: {},
      errors: [],
      error: '',
      isLogin: false,
      showModal: false
    }
  },
  method: {
    addFav () {
      axios({
        method: 'post',
        url: `/api/add-favorite/${this.$route.params.id}/`,
        data: {}
      })
      .then(response => {
        // this.insInfo = response.data[0]
        console.log('成功加入最愛')
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  },
  // computed: {
  //   error () {
  //
  //   }
  // },
  created () {
    this.$bus.$on('profile', event => {
      if (event.profile.pk) {
        this.isLogin = true
        console.log(event.profile.pk)
        this.error = ''
      } else {
        this.isLogin = false
        this.error = '請先登入'
      }
    })
    axios({
      method: 'get',
      url: `/api/institution-detail/${this.$route.params.id}/`
    })
    .then(response => {
      this.insInfo = response.data[0]
      console.log(this.insInfo)
    })
    .catch(e => {
      this.errors.push(e)
    })

    axios({
      method: 'get',
      url: `/api/list-ins_unit/${this.$route.params.id}/`
    })
    .then(response => {
      // this.insUnit = response.data
      for (let obj of response.data) {
        this.insCap.push({text: obj.Cap_id.cap_name, value: obj.id})
      }
    })
    .catch(e => {
      this.errors.push(e)
    })

    axios({
      method: 'get',
      url: `/api/list-ins_comment/${this.$route.params.id}/`
    })
    .then(response => {
      this.insCom = response.data
      console.log(this.insCom)
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>

<style lang="scss" scoped>
.ins-wrap {
  .insInfo {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
  }
  .comment-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    .comment {
      display: flex;
      justify-content: center;
      .item {
        margin: 10px;
      }
    }
  }
}
.sm {
  margin: 0 5px;
}

.comment-btn {
  background-color: RGBA(71, 183, 132, 1.00);
  border-radius: 10%;
  border: none;
  margin-top: 20px;
  &:hover {
    background-color: RGBA(100, 200, 150, 1.00);
  }
  &:active {
    background-color: RGBA(55, 71, 87, 1.00);
  }
}
.add {
  background: red;
}
#heart {
  display: inline;
  position: relative;
  width: 100px;
  height: 90px;
}
#heart:before,
#heart:after {
  position: absolute;
  content: "";
  left: 10px;
  top: 0;
  width: 10px;
  height: 16px;
  background: red;
  -moz-border-radius: 50px 50px 0 0;
  border-radius: 50px 50px 0 0;
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-transform-origin: 0 100%;
  -moz-transform-origin: 0 100%;
  -ms-transform-origin: 0 100%;
  -o-transform-origin: 0 100%;
  transform-origin: 0 100%;
}
#heart:after {
  left: 0;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
  -webkit-transform-origin: 100% 100%;
  -moz-transform-origin: 100% 100%;
  -ms-transform-origin: 100% 100%;
  -o-transform-origin: 100% 100%;
  transform-origin :100% 100%;
}
</style>
