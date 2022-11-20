import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { playStore} from '../../../../../store/index'

const app = getApp()

Component({
  behaviors: [storeBindingsBehavior],

  storeBindings: {
    store: playStore,

    fields: [
      'lyrics',
      'currentLyricIndex'
    ]
  },

  data: {
    offset: app.globalData.clientHeight * 2 / 5
  }
})