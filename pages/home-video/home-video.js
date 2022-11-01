import { getTopMv } from '../../service/video'

Page({
  data: {
    topMvs: [],
    offset: 0,
    reachBottom: false
  },

  onLoad() {
    this.fetchTopMv()
  },

  async fetchTopMv(isReset = false) {
    const res = await getTopMv(this.data.offset)

    if (res.data) {
      this.setData({
        topMvs: isReset ? res.data : [...this.data.topMvs, ...res.data]
      })
    } else {
      this.setData({
        reachBottom: true
      })
    }
  },

  onReachBottom() {
    this.data.offset = this.data.topMvs.length
    this.fetchTopMv()
  },

  async onPullDownRefresh() {
    this.data.offset = 0
    this.data.reachBottom = false
    await this.fetchTopMv(true)
    wx.stopPullDownRefresh()
  }
})