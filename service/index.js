import { baseURL } from "./config"

class Api {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  request(options) {
    const { url } = options
    return new Promise((resolve, reject) => {
      wx.request({
        ...options,
        url: this.baseURL + url,
        success: res => resolve(res.data),
        fail: reject
      })
    })
  }

  get(url = '', options) {
    return this.request({ url, ...options, method: "get" })
  }
  
  post(url = '', options) {
    return this.request({ url, ...options, method: "post" })
  }
}

export default new Api(baseURL)
