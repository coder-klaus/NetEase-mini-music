const app = getApp()

Component({
  properties: {
    title: {
      type: String,
      value: '默认歌单'
    },

    songs: {
      type: Array,
      value: []
    }
  },

  methods: {
    showMore() {
      wx.navigateTo({
        url: '/pages/menu-list/menu-list',
      })
    }
  }
})