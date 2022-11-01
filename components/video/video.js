Component({
  properties: {
    mv: {
      type: Object,
      value: {}
    }
  },

  methods: {
    handleTap() {
      wx.navigateTo({
        url: `/pages/video-detail/video-detail?id=${this.properties.mv.id}`
      })
    }
  }
})