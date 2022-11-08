Component({
  properties: {
    song: {
      type: Object,
      value: {}
    }
  },

  data: {
    isPlaying: false,
  },

  methods: {
    changePlayerStatus() {
      this.setData({
        isPlaying: !this.data.isPlaying
      })
    }
  }
})