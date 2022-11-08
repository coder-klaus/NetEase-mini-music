Component({
  properties: {
    tabs: {
      type: Array,
      value: []
    },

    activeIndex: {
      type: Number,
      value: 0
    }
  },

  methods: {
    changeSwiperItem(e) {
      this.triggerEvent('changeSwiperItem', e.currentTarget.dataset.index)
    }
  }
})