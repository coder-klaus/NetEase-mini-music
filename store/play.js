import { throttle } from 'underscore'
import { observable } from 'mobx-miniprogram'
import { getLyricById, getDetailByIds } from '../service/play'

const audioContext = wx.createInnerAudioContext()

const initData = {
  playMode: 0,
  currentTime: 0,
  durationTime: 0,
  audioProgress: 0,
  currentIndex: 0,
  activeSongIndex: 0,
  currentLyricIndex: 0,
  currentLyric: '',
  isPlaying: true,
  isMoving: false,
  activeSong: {},
  list: [],
  lyrics: [],
  modeNames: ['order', 'repeat', 'random'],
}

const playStore = observable({
  ...initData,

  postPlayListAction({list = [], currentIndex = 0}) {
    this.list = list
    this.activeSongIndex = currentIndex
  },

  async fetchSongAction(id) {
    const res = await getDetailByIds(id) 
    this.activeSong = res.songs[0]
  },

  async fetchLyricAction(id) {
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

    this.lyrics = lyrics
  },

  fetchSongInfoAction(id) {
    this.fetchSongAction(id)
    this.fetchLyricAction(id)
  },

  playMusicAction() {
    this.durationTime = this.activeSong.dt

    audioContext.stop()
    audioContext.src = `https://music.163.com/song/media/outer/url?id=${this.activeSong.id}.mp3`
    audioContext.autoplay = true

    audioContext.onError(err => console.log('audioContext error', err))

    audioContext.onTimeUpdate(throttle(() => {
      const currentTime = audioContext.currentTime * 1000
      const progress = currentTime / this.durationTime * 100

      if (!this.isMoving) {
        this.matchCurrentLyricAction()

        this.currentTime = currentTime
        this.audioProgress = progress
      }
    }, 500))

    audioContext.onWaiting(() => {
      audioContext.pause()
    })

    audioContext.onCanplay(() => {
      // 如果原本处于播放中 则继续播放音频
      // 如果原本处于暂停中 则更新歌词
      if (this.isPlaying) {
        audioContext.play()
      } else {
        this.matchCurrentLyricAction()
      }
    })

    audioContext.onEnded(() => {
      if (this.playMode !== 1) {
        this.changeActiveSongAction(1)
      }
    })
  },

  changePlayModeAction() {  
    this.playMode += 1

    if (this.playMode >= this.modeNames.length) {
      this.playMode = 0
    }

    audioContext.loop = this.playMode === 1
  },

  seekTimeAction(time = 0) {
    audioContext.seek(time)
  },

  matchCurrentLyricAction() {
    let currentTime = parseInt(audioContext.currentTime * 1000)
    let currentLyricIndex = this.lyrics.length - 1
    let index = Array.from(this.lyrics).findIndex(lyric => lyric.time > currentTime, this.currentLyricIndex)

    if (index !== -1) {
      currentLyricIndex = index - 1 < 0 ? 0 :index - 1
    }

    if (this.currentLyricIndex !== currentLyricIndex) {
      this.currentLyricIndex = currentLyricIndex
      this.currentLyric = this.lyrics[currentLyricIndex].lyric  
    }
  },

  changeStoreField(key, value) {
    this[key] = value

    if (key === 'isPlaying') {
      this.changePlayStatus(value)
    }
  },

  changePlayStatus(isPlaying) {
    this.isPlaying = isPlaying

    if (this.isPlaying) {
      audioContext.play()
    } else {
      audioContext.pause()
    }
  },

  changeActiveSongAction(step) {
    const length = this.list.length

    this.initPlayAction()

    switch(this.playMode) {
      case 0:
      case 1:
        this.activeSongIndex += step

        if (this.activeSongIndex >= length) {
          this.activeSongIndex = 0
        }
    
        if (this.activeSongIndex < 0) {
          this.activeSongIndex = length - 1
        }

        break
      case 2: 
        let oldIndex = this.activeSongIndex

        // 排除下一首 随机到自身的可能性
        while (oldIndex === this.activeSongIndex) {
          this.activeSongIndex = Math.floor(Math.random() * length)
        }
        break
    }

    const id = this.list[this.activeSongIndex].id
    this.fetchSongInfoAction(id)
  },

  initPlayAction() {
    const whiteArr = [
      'list', 
      'modeNames', 
      'playMode', 
      'activeSongIndex',
      'isBuffered'
    ]

    for(const key of Object.keys(initData)) {
      if (whiteArr.includes(key)) continue
      this[key] = initData[key]
    }

    console.log(initData.audioProgress);
  }
})

export {
  playStore
}