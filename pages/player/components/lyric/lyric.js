const app = getApp()

Component({
  properties: {
    lyrics: {
      type: Array,
      value: []
    },

    currentLyricIndex: {
      type: Number,
      value: 0
    }
  },

  data: {
    offset: app.globalData.clientHeight * 2 / 5
  }
})