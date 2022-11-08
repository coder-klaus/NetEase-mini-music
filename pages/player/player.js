import {
  getDetailByIds,
  getLyricById
} from '../../service/play'

const app = getApp()

Page({
  data: {
    song: {},
    clientHeight: 0,
    activeIndex: 0,
    tabs: ['歌曲', '歌词']
  },

  onLoad(options) {
    const id = options.id
    this.fetchDetail(id)
    // this.fetchLyric(id)

    this.setData({
      clientHeight: app.globalData.clientHeight
    })
  },

  async fetchDetail(id) {
    const res = await getDetailByIds(id) 
    
    this.setData({
      song: res.songs[0]
    })
  },

  async fetchLyric(id) {
    const res = await getLyricById(id)
    console.log(res.lrc.lyric);
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
  }
})