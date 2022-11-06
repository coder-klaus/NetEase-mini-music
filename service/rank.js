import api from './index'

export function fetchRankById(id) {
  return api.get('playlist/detail', {
    data: {
      id
    }
  })
}