import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { getBanners } from '../../service/video'
import { getTopPlayList } from '../../service/song'
import { querySelector } from '../../utils/index'
import { songStore, playStore } from '../../store/index'

Page({
  data: {
    swiperHeight: 150,
    isInitSwiper: false,
    keyword: '',
    banners: [],
    hotSongs: [],
    popularSongs: [],
    recommends: [],
    recommendSongs: []
  },

  async onLoad() {
    this.fetchBanners()
    this.fetchHotSongMenu()
    this.fetchPopularSongMenu()
    this.storeBindings()

    this.data.recommends = await this.fetchRecommendSongsAction()

    this.setData({
      recommendSongs: this.data.recommends.slice(0, 6)
    })
  },

  onUnload() {
    this.playStoreBindings.destroyStoreBindings()
    this.songStoreBindings.destroyStoreBindings()
  },

  storeBindings() {
    this.playStoreBindings = createStoreBindings(this, {
      store: playStore,
      actions: ['postPlayListAction']
    })

    this.songStoreBindings = createStoreBindings(this, {
      store: songStore,
      fields: ['recommends'],
      actions: ['fetchRecommendSongsAction']
    })
  },

  async fetchBanners() {
    const res = await getBanners()
    this.setData({ banners: res.banners })
  },

  onClick() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

  getCurrentIndex(e) {
    this.postPlayListAction({
      list: this.data.recommends,
      currentIndex: e.detail
    })
  },

  async handleImageLoad() {
    if (this.data.isInitSwiper) return

    this.data.isInitSwiper = true

    const { height } = await querySelector('.swiper-image')
    this.setData({
      swiperHeight: height
    })
  },

  async fetchHotSongMenu() {
    const res = await getTopPlayList()
    this.setData({
      hotSongs: res.playlists
    })
  },

  async fetchPopularSongMenu() {
    const res = await getTopPlayList({
      cat: '流行'
    })
    this.setData({
      popularSongs: res.playlists
    })
  }
})