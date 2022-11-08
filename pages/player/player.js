import {
  getDetailByIds,
  getLyricById
} from '../../service/play'

Page({
  data: {
    song: {}
  },

  onLoad(options) {
    const id = options.id
    this.fetchDetail(id)
    // this.fetchLyric(id)
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
  }
})