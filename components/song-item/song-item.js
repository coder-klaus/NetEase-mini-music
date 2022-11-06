Component({
  properties: {
    song: {
      type: Object,
      value: {}
    }
  },

  methods: {
    handleTap() {
      wx.navigateTo({
        url: `/pages/detail/detail?type=menu&id=${this.data.song.id}`
      })
    }
  }
})