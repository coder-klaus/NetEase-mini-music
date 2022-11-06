import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { rankingStore, songStore } from '../../store/index'

Page({
  data: {
    type: '',
  },

  async onLoad(options) {
    this.rankStoreBindings = createStoreBindings(this, {
      store: rankingStore,
      fields: ['rank'],
      actions: ['findCurrentRankAction']
    })

    this.songStoreBindings = createStoreBindings(this, {
      store: songStore,
      fields: ['recommends']
    })

    this.setData({
      type: options.type
    })

    wx.setNavigationBarTitle({
      title: this.data.type === 'rank' ? this.findCurrentRankAction(options.name) : '推荐歌曲',
    })
  },

  onUnload() {
    this.rankStoreBindings.destoryStoreBindings()
    this.songStoreBindings.destoryStoreBindings()
  }
})