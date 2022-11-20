import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { rankingStore, songStore, playStore } from '../../store/index'
import { fetchRankById } from '../../service/rank'

Page({
  data: {
    type: '',
    info: {},
    ranks: []
  },

  async onLoad(options) {
    let title =  ''

    if (options.type === 'rank') {
      this.rankStoreBindings = createStoreBindings(this, {
        store: rankingStore,
        actions: ['findCurrentRankAction']
      })

      const { name, rank } = this.findCurrentRankAction(options.name)

      title = name

      this.setData({
        ranks: rank.tracks
      })
    }

    if (options.type === 'recommend') {
      this.songStoreBindings = createStoreBindings(this, {
        store: songStore,
        actions: ['getRecommendsAction']
      })

      title = '推荐歌曲'
      
      this.setData({
        ranks: this.getRecommendsAction()
      })
    }

    if (options.type === 'menu') {
      const { playlist } = await fetchRankById(options.id)
      title = playlist.name

      this.setData({
        info: playlist,
        ranks: playlist.tracks
      })
    }

    this.playStoreBindings = createStoreBindings(this,  {
      store: playStore,
      actions: ['postPlayListAction']
    })

    this.setData({
      type: options.type
    })

    wx.setNavigationBarTitle({
      title
    })
  },

  onUnload() {
    if (this.data.type === 'rank') {
      this.rankStoreBindings.destroyStoreBindings()
    }

    if (this.data.type === 'recommend') {
      this.songStoreBindings.destroyStoreBindings()
    }
  },

  playMusic(e) {
    this.postPlayListAction({
      list: this.data.ranks,
      currentIndex: e.currentTarget.dataset.index
    })

    wx.navigateTo({
      url: `/player/pages/player/player?id=${e.currentTarget.dataset.id}`
    })
  }
})