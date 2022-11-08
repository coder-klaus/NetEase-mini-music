import { NAV_BAR_HEIGHT } from './configs/index'

App({
  globalData: {
    clientHeight: 0
  },

  onLaunch() {
    wx.getSystemInfo({
      success: res => {
        this.globalData.clientHeight = res.screenHeight - res.statusBarHeight - NAV_BAR_HEIGHT
      }
    })
  }
})