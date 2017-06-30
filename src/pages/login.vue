<template>
  <form name="form" method="post" novalidator role="form" @submit.prevent="login(data)">
    <div class="bg-white ph10 pv15">
      登录
    </div>
  </form>
</template>
<script>

export default {
  name: 'login',
  data () {
    return {
    }
  },
  created () {
    this.redirect = this.$route.query.redirect || '/home'
  },
  methods: {
    login () {
    },
    blurEvent (event) {
    },
    updateValidator () {
    },
    sendCaptcha () {
      console.log('sendCaptcha')
    }
  }
}
</script>
