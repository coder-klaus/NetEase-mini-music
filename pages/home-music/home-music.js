import { getBanners } from '../../service/video'
import { getTopPlayList } from '../../service/song'
import { querySelector } from '../../utils/index'

Page({
  data: {
    swiperHeight: 150,
    isInitSwiper: false,
    keyword: '',
    banners: [],
    hotSongs: [],
    popularSongs: [],
  },

  onLoad() {
    this.fetchBanners()
    this.fetchHotSongMenu()
    this.fetchPopularSongMenu()
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