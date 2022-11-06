import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { rankingStore } from '../../../../store/index'

Component({
  behaviors: [storeBindingsBehavior],

  storeBindings: {
    store: rankingStore,

    fields: {
      ranks: 'ranks'
    },
    
    actions: {
      fetchRankingAction: 'fetchRankingAction'
    }
  },

  lifetimes: {
    created() {
      this.fetchRankingAction()
    }
  }
})