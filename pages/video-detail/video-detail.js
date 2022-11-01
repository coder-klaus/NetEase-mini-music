import { getMvVideoById, getMvDetailById, getRelatedVideosById } from '../../service/video'

Page({
  data: {
    id: 0,
    mvUrl: '',
    detail: {},
    relatedVideos: []
  },

  onLoad(option) {
    this.setData({ id: option.id })

    Promise.all([
      this.fetchMv(), 
      this.fetchMvDetailById(), 
      this.fetchRelatedVideosById()
    ])
  },

  async fetchMv() {
    const res = await getMvVideoById(this.data.id)

    this.setData({
      mvUrl: res.data.url
    })
  },

  async fetchMvDetailById() {
    const res = await getMvDetailById(this.data.id)
    this.setData({ detail: res.data })
  },

  async fetchRelatedVideosById() {
    const res = await getRelatedVideosById(this.data.id)
    this.setData({
      relatedVideos: res.data
    })
  }
})