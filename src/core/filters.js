import * as utils from './utils'

export default {
  install: (Vue) => {
    Vue.filter('floorNumber', (number) => {
      return utils.floorNumber(number)
    })
    Vue.filter('parseFloatNumber', (number) => {
      return utils.parseFloatNumber(number)
    })
    Vue.filter('GetAvatarImageFilter', (imageUrl, width, height) => {
      return utils.GetAvatarImageFilter(imageUrl, width, height)
    })
    Vue.filter('friendlyDateFilter', (time) => {
      return utils.friendlyDateFilter(time)
    })
    Vue.filter('GetXuanThumbnailFilter', (imageUrl, version) => {
      return utils.GetXuanThumbnailFilter(imageUrl, version)
    })
    Vue.filter('dateToString', (time, format) => {
      return utils.dateToString(time, format)
    })
    Vue.filter('stringToDate', (text) => {
      return utils.stringToDate(text)
    })
  }
}
