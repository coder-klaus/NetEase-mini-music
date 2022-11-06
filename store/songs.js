import { observable, action } from 'mobx-miniprogram'
import { getRecommendSongs } from '../service/song'

export const songStore = observable({
  recommends: [],

  fetchRecommendSongsAction: action(async function() {
    const res = await getRecommendSongs(3778678)
    this.recommends = res.playlist.tracks
  })
})