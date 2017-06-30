<template>
  <div class="kaweb-menu" >
    <ul> 
      <router-link tag="li" v-for="tab in tabs" :key="tab.name" :to="tab.link" :class="[{active: tab.active}]">
        <span :class="['menu-icon', tab.icon, {selected: tab.active}]"></span>
        <span>{{tab.text}}</span>
      </router-link>
    </ul>
  </div>
</template>
<script>
  import '@/assets/scss/menu.scss'
  import {TABNAMES} from '@/core/consts'

  export default {
    name: 'my-menues',
    props: {
      active: String
    },
    data () {
      return {
        tabs: [
        {'name': TABNAMES.DAREN, 'text': '牛人', 'icon': 'niu-icon', 'active': TABNAMES.DAREN === this.active, 'link': '/daren'},
        {'name': TABNAMES.QUESTION, 'text': '问题', 'icon': 'zhida-icon', 'active': TABNAMES.QUESTION === this.active, 'link': '/question'},
        {'name': TABNAMES.XUANKE, 'text': '微课', 'icon': 'weike-icon', 'active': TABNAMES.WEIKE === this.active, 'link': '/weike'},
        {'name': TABNAMES.MY, 'text': '我的', 'icon': 'my-icon', 'active': TABNAMES.MY === this.active, 'link': '/my'}
        ]
      }
    },
    created () {

    },
    methods: {
      isActive: function (current) {
        return current === this.active
      }
    }
  }
</script>
