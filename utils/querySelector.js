export function querySelector(selector) {
  return new Promise((resolve, reject) => {
    try {
      const query = wx.createSelectorQuery()
      query.select(selector).boundingClientRect()
      query.exec(res => resolve(res[0]))
    } catch (e) {
      reject(e)
    }
  })
}