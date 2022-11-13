import { createStoreBindings } from 'mobx-miniprogram-bindings'
import {
  getDetailByIds,
  getLyricById
} from '../../service/play'
import { playStore } from '../../store/index'

const app = getApp()

Page({
  data: {
    song: {},
    clientHeight: 0,
    activeIndex: 0,
    currentLyricIndex: 0,
    playMode: 0,
    lyrics: [],
    tabs: ['歌曲', '歌词']
  },

  onLoad(options) {
    const id = options.id
    this.fetchDetail(id)
    this.fetchLyric(id)

    this.setData({
      clientHeight: app.globalData.clientHeight
    })

    this.playStoreBindings = createStoreBindings(this, {
      store: playStore,
      fields: ['list', 'activeSongIndex'],
      actions: ['changePlayListIndex']
    })
  },

  onUnload() {
    this.playStoreBindings.destroyStoreBindings()
  },

  async fetchDetail(id) {
    const res = await getDetailByIds(id) 

    this.setData({
      song: res.songs[0]
    })
  },

  async fetchLyric(id) {
    const res = await getLyricById(id)
    const lyricList = res.lrc.lyric.split('\n')
    const lyrics = []
    
    for (const lyric of lyricList) {
      if (!lyric.length) {
        continue
      }

      const [, minute = '00', second = '00', millisecond = '000', word = ''] 
        = lyric.match(/^\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/) ?? []
      
        lyrics.push({
        lyric: word,
        time: minute * 60 * 1000 + second * 1000 + +millisecond.padEnd(3, '0')
      })
    }

    this.setData({
      lyrics
    })
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

  changeCurrentLyricIndex(e) {
    this.setData({
      currentLyricIndex: +e.detail
    })
  },

  changePlayMode(e) {
    this.setData({
      playMode: e.detail
    })
  },

  changeSong(e) {
    const length = this.data.list.length
    let index = this.data.activeSongIndex

    switch(this.data.playMode) {
      case 0:
      case 1:
        index += e.detail

        if (index >= length) {
          index = 0
        }
    
        if (index < 0) {
          index = length - 1
        }
        break
      case 2: 
        let oldIndex = index

        // 排除下一首 随机到自身的可能性
        while (oldIndex === index) {
          index = Math.floor(Math.random() * length)
        }
        break
    }

    this.changePlayListIndex(index)
    
    const id = this.data.list[index].id
    this.fetchDetail(id)
    this.fetchLyric(id)
  }
})