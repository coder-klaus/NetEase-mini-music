import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { songStore } from '../../store/index'

Page({
  data: {
    recommends: [],
    storeBindings: null
  },

  onLoad() {
    this.storeBindings = createStoreBindings(this, {
      store: songStore,
      fields: ['recommends']
    })
  },

  onUnload() {
    this.storeBindings.destoryStoreBindings()
  }
})