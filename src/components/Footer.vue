<template lang="html">
  <div class="footer-wrap">
    <router-link class="about-page" :to="{ name: 'AboutPage'}">關於我們</router-link>
    <a href="https://github.com/" target="_blank">
      <img src="../assets/github.svg" width="15" height="15">
    </a>
    <p>Copyright © 2017 {{holder}}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      holder: 'xxx'
    }
  }
}
</script>

<style lang="scss" scoped>
.footer-wrap {
  // display: flex;
  // flex-direction: column;
  color: #fff;
  background-color: RGBA(114, 127, 128, 1.00);
  margin-top: 20px;
  padding-top: 20px;
  font-size: 14px;
  .about-page {
    color: #fff;
    text-decoration: none;
    &:hover {
      color: RGBA(34, 44, 47, 1.00);
    }
  }
}
</style>
