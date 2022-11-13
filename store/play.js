import { observable } from 'mobx-miniprogram'

const playStore = observable({
  list: [],
  activeSongIndex: 0,

  postPlayListAction({list = [], currentIndex = 0}) {
    this.list = list
    this.activeSongIndex = currentIndex
  },

  changePlayListIndex(index = 0) {
    this.activeSongIndex = index
  }
})

export {
  playStore
}