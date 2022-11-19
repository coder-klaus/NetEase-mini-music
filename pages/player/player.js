import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { playStore } from '../../store/index'

const app = getApp()

Page({
  data: {
    clientHeight: 0,
    activeIndex: 0,
    tabs: ['歌曲', '歌词']
  },

  onLoad(options) {
    this.playStoreBindings = createStoreBindings(this, {
      store: playStore,
      fields: [
        'list', 
        'activeSongIndex', 
        'lyrics', 
        'activeSong'
      ],
      actions: [
        'fetchSongInfoAction',
        'changeStoreField',
      ]
    })

    this.setData({
      clientHeight: app.globalData.clientHeight
    })
    
    const id = options.id

    if (id) {
      this.fetchSongInfoAction(id)
    }
  },

  onUnload() {
    this.playStoreBindings.destroyStoreBindings()
  },

  changeSwiperItem(e) {
    this.setData({
      activeIndex: e.detail
    })
  },

  handleSwiperChange(e) {
    this.setData({
      activeIndex: e.detail.current
    })
  },
})