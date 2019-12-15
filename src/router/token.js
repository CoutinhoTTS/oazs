export default {
  setCookies (token, loginInfo) {
    window.localStorage.setItem(token, loginInfo)
  },
  getCookies (token) {
    let loginInfo = window.localStorage.getItem(token)
    if (loginInfo === null) {
      return token
    } else {
      return loginInfo
    }
  }
}
