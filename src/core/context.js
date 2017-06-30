// console.log(window.yxt)
// const config = {
//   isApp: false,
//   isWx: false,
//   android: window.yxt.android,
//   ios: window.yxt.android
// }

const storage = {
  openId: null,
  orgId: null,
  sourceType: 30,
  token: null,
  unionId: null,
  userId: null
}

const setStorageContext = (context) => {
  for (let item in context) {
    if (this.storage[item] !== undefined) {
      this.storage[item] = context[item]
    }
  }
}

const setAppInfo = (type) => {
  console.log(type)
}

export { storage, setStorageContext, setAppInfo }
