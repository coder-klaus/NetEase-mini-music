import { observable, action } from 'mobx-miniprogram'
import { fetchRankById } from '../service/rank'

const ids = [3779629, 2884035, 19723756]

export const rankingStore =  observable({
  ranks: [],

  fetchRankingAction: action(async function() {
    const res = await Promise.all(ids.map(id => fetchRankById(id) ))
    this.ranks = res.map(rank => rank.playlist)
  })
})