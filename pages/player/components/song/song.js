import { throttle } from 'underscore'
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { playStore} from '../../../../store/index'

Component({
  behaviors: [storeBindingsBehavior],

  storeBindings: {
    store: playStore,
    fields: {
      currentTime: 'currentTime', 
      durationTime: 'durationTime',
      currentLyric: 'currentLyric',
      modeNames: 'modeNames',
      lyrics: 'lyrics',
      song: 'activeSong',
      playMode: 'playMode',
      isPlaying: 'isPlaying',
      audioProgress: 'audioProgress'
    },
    actions: {
      playMusicAction: 'playMusicAction',
      seekTimeAction: 'seekTimeAction',
      matchCurrentLyric: 'matchCurrentLyricAction',
      changeStoreField: 'changeStoreField',
      changeActiveSongAction: 'changeActiveSongAction',
      changePlayModeAction: 'changePlayModeAction'
    }
  },

  observers: {
    'song.id'() {
      this.playMusicAction()
    }
  },

  lifetimes: {
    attached() {
      this.playMusicAction()
    }
  },

  methods: {
    changePlayerStatus() {
      this.changeStoreField('isPlaying', !this.data.isPlaying)
    },

    sliderBindchange(e) {
      const progress = e.detail.value
      const currentTime = this.data.durationTime * progress / 100

      this.seekTimeAction(currentTime / 1000)
      this.changeStoreField('currentTime', this.data.durationTime * e.detail.value / 100)
      this.changeStoreField('isMoving', false)
    },

    sliderBindchanging: throttle(function(e) {
      this.changeStoreField('isMoving',true)
    }, 500),

    prevSong() {
      this.changeActiveSongAction(-1)
    },

    nextSong() {
      this.changeActiveSongAction(1)
    }
  }
})