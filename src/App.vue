<template>
  <div id="app" class="kaweb-wrap">
    <Menus :active="currentTab" />
    <router-view></router-view>
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
