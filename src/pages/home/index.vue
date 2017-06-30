<template>
  <div class="kaweb-main-wrap">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
  import {Menus} from '@/components/'
  import {TABNAMES} from '@/core/'

  export default {
    data () {
      return {
        'currentTab': TABNAMES.MY
      }
    },
    computed: {
    },
    mounted () {
    },
    methods: {
    },
    filters: {
    },
    components: {
      Menus
    }
  }
</script>
