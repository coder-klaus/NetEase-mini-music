import { observable, action } from 'mobx-miniprogram'
import { fetchRankById } from '../service/rank'

const ids = [3779629, 2884035, 19723756]

export const rankingStore =  observable({
  ranks: [],
  rank: {},

  fetchRankingAction: action(async function() {
    const res = await Promise.all(ids.map(id => fetchRankById(id) ))
    this.ranks = res.map(rank => rank.playlist)
  }),

  findCurrentRankAction: action(function(name) {
    this.rank = this.ranks.find(rank => rank.name === name)
    return this.rank.name
  })
})