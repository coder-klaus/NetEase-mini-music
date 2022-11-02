Component({
  properties: {
    title: {
      type: String,
      value: '默认标题'
    },

    showMore: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    showMore() {
      this.triggerEvent('showMore')
    }
  }
})