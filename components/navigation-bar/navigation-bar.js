Component({
  data: {
    statusBarHeight: 0
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
  }
})