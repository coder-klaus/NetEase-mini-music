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
        url: `/video-detail/pages/video-detail/video-detail?id=${this.properties.mv.id}`
      })
    }
  }
})