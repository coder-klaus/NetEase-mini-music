Component({
  properties: {
    rank: {
      type: Object,
      value: {}
    }
  },

  methods: {
    onTap(e) {
      wx.navigateTo({
        url: `/pages/detail/detail?type=rank&name=${e.currentTarget.dataset.name}`,
      })
    }
  }
})