export default {
  install: function (Vue) {
    Vue.directive('scroll-load', function (number) {
      return 'loadmore'
    })
  }
}
