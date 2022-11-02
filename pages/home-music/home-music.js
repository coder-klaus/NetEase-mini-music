import { getBanners } from '../../service/video'
import { querySelector } from '../../utils/index'

Page({
  data: {
    swiperHeight: 150,
    isInitSwiper: false,
    keyword: '',
    banners: []
  },

  onLoad() {
    this.fetchBanners()
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
  }
})