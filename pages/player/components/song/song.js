import { throttle } from 'underscore'

const audioContext = wx.createInnerAudioContext()

const initData = {
  isPlaying: true,
  isMoving: false,
  currentIndex: 0,
  currentTime: 0,
  durationTime: 0,
  audioProgress: 0,
  currentLyric: '',
  modeNames: ['order', 'repeat', 'random']
}

Component({
  properties: {
    song: {
      type: Object,
      value: {}
    },

    lyrics: {
      type: Array,
      value: []
    },

    playMode: {
      type: Number,
      value: 0
    }
  },

  data: initData,

  observers: {
    currentTime(v) {
      this.setData({
        audioProgress: v / this.data.durationTime * 100
      })
    },

    'song.id'() {
      this.playMusic()
    },

    playMode(v) {
      audioContext.loop = v === 1
    }
  },

  lifetimes: {
    attached() {
      this.playMusic()
    }
  },

  methods: {
    changePlayerStatus() {
      this.setData({
        isPlaying: !this.data.isPlaying
      })

      if (this.data.isPlaying) {
        audioContext.play()
      } else {
        audioContext.pause()
      }
    },

    changePlayMode() {
      let playMode = this.data.playMode + 1

      if (playMode >= this.data.modeNames.length) {
        playMode = 0
      }

      this.triggerEvent('changePlayMode', playMode)
    },

    async playMusic() {
      this.setData({
        durationTime: this.properties.song.dt
      })

      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${this.properties.song.id}.mp3`
      audioContext.autoplay = true

      audioContext.onError(err => {
        console.log('audioContext error', err);
      })

      audioContext.onTimeUpdate(() => {
        // if (audioContext.buffered !== audioContext.currentTime) {
        //   return
        // }

        if (!this.data.isMoving) {
          this.setData({
            currentTime: audioContext.currentTime * 1000
          })

          this.matchCurrentMusic()
        }
      })

      audioContext.onWaiting(() => {
        audioContext.pause()
      })

      audioContext.onCanplay(() => {
        // 如果原本处于播放中 则继续播放音频
        // 如果原本处于暂停中 则更新歌词
        if (this.data.isPlaying) {
          audioContext.play()
        } else {
          this.matchCurrentMusic()
        }
      })

      audioContext.onEnded(() => {
        if (this.data.playMode !== 1) {
          this.nextSong()
        }
      })
    },

    sliderBindchange(e) {
      const progress = e.detail.value

      this.setData({
        audioProgress: progress
      })

      const currentTime = this.data.durationTime * progress / 100

      audioContext.seek(currentTime / 1000)

      this.data.isMoving = false
    },

    sliderBindchanging: throttle(function(e) {
      this.data.isMoving = true
      this.setData({
        currentTime: this.data.durationTime * e.detail.value / 100
      })
    }, 500),

    matchCurrentMusic() {
      let currentTime = 0

      // 当音频停止播放后 拖到进度条的时候
      // 此时再次设置seek后，获取到的currentTime是错误的
      // 需要手动进行计算
      if (this.data.isPlaying) {
        currentTime = parseInt(audioContext.currentTime * 1000)
      } else {
        currentTime = this.data.durationTime * this.data.audioProgress / 100
      }

      let currentIndex = this.properties.lyrics.length - 1

      for (const index in this.properties.lyrics) {
        const lyric = this.properties.lyrics[index]

        if (lyric.time < currentTime) {
          currentIndex = index  
        }
      }

      if (this.data.currentIndex !== currentIndex) {
        this.data.currentIndex = currentIndex

        this.triggerEvent('changeCurrentLyricIndex', currentIndex)

        this.setData({
          currentLyric: this.properties.lyrics[currentIndex].lyric  
        })
      }
    },

    prevSong() {
      this.initPlay()
      this.triggerEvent('changeSong', -1)
    },

    nextSong() {
      this.initPlay()
      this.triggerEvent('changeSong', 1)
    },

    initPlay() {
      this.setData(initData)
    }
  }
})