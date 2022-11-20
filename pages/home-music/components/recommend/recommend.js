 Component({
  properties: {
    songs: {
      type: Array,
      value: []
    }
  },

   methods: {
    showMore() {
      wx.navigateTo({
        url: '/pages/detail/detail?type=recommend'
      })
    },

    playMusic(e) {
      this.triggerEvent('getCurrentIndex', e.currentTarget.dataset.index)

      wx.navigateTo({
        url: `/player/pages/player/player?id=${e.currentTarget.dataset.song.id}`,
      })
    }
   }
 })