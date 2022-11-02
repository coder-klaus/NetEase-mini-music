import { 
  getMvVideoById, 
  getMvDetailById, 
  getRelatedVideosById,
  getVideoById,
  getVideoDetailById
} from '../../service/video'

Page({
  data: {
    id: 0,
    mvUrl: '',
    detail: {},
    relatedVideos: []
  },

  onLoad(option) {
    this.setData({ id: option.id })

    if (!!option.relatedvideo) {
      Promise.all([
        this.fetchVideo(),
        this.fetchVideoDetail(),
        this.fetchRelatedVideosById()
      ])
    } else {
      Promise.all([
        this.fetchMv(), 
        this.fetchMvDetailById(), 
        this.fetchRelatedVideosById()
      ])
    }
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
  },

  async fetchVideo() {
    const res = await getVideoById(this.data.id)

    this.setData({
      mvUrl: res.urls[0].url
    })
  },

  async fetchVideoDetail() {
    const res = await getVideoDetailById(this.data.id)
    
    this.setData({
      detail: {
        name: res.data.title,
        artistName: res.data.creator.nickname
      }
    })
  },

  handleRecommendTap(e) {
    wx.navigateTo({
      url: `/pages/video-detail/video-detail?id=${e.currentTarget.dataset.id}&relatedvideo=true`
    })
  }
})