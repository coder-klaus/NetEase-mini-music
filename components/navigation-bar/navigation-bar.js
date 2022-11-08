import { NAV_BAR_HEIGHT } from '../../configs/index'

Component({
  options: {
    multipleSlots: true
  },

  properties: {
    title: {
      type: String,
      value: '默认标题'
    }
  },

  data: {
    statusBarHeight: 0,
    currentPageLength: 0,
    navHeight: NAV_BAR_HEIGHT
  },

  lifetimes: {
    attached() {
      wx.getSystemInfo({
        success: res => {
          this.setData({
            statusBarHeight: res.statusBarHeight
          })
        } 
      })
    }
  },

  methods: {
    back() {
      // 返回上一页，如果无法返回(第一页)的时候直接跳转到首页
      wx.navigateBack({
        fail() {
          wx.switchTab({
            url: '/pages/home-music/home-music'
          })
        }
      })

    }
  }
})