 import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
 import { songStore } from '../../../../store/index'
 
 Component({
  behaviors: [storeBindingsBehavior],

  storeBindings: {
    store: songStore,

    fields: {
      recommends: 'recommends'
    },

    actions: {
      fetchRecommendSongsAction: 'fetchRecommendSongsAction'
    }
  },

  data: {
    songs: []
  },

  observers: {
    recommends(v) {
      if (v.length) {
        this.setData({
          songs: v.slice(0, 6)
        })
      }
    }
  },

  lifetimes: {
    created() {
      this.fetchRecommendSongsAction()
    }
  },

   methods: {
    showMore() {
      wx.navigateTo({
        url: '/pages/recommend/recommend'
      })
    }
   }
 })