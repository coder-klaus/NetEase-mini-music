import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { playStore } from '../../../../store/index'

Component({
  behaviors: [storeBindingsBehavior],

  storeBindings: {
    store: playStore,
    fields: {
      isPlaying: 'isPlaying'
    },
    actions: {
      changeStoreField: 'changeStoreField',
      playMusicAction: 'playMusicAction'
    }
  },

  properties: {
    song: {
      type: Object,
      value: {}
    }
  },

  observers: {
    'song.id'() {
      this.playMusicAction()
    }
  },

  methods: {
    changeStatus() {
      this.changeStoreField('isPlaying', !this.data.isPlaying)
    },

    goDetail() {
      wx.navigateTo({
        url: '/player/pages/player/player',
      })
    }
  }
})