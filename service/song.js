import api from './index'

export function getRecommendSongs(id) {
  return api.get('playlist/detail', {
    data: {
      id
    }
  })
}

export function getTopPlayList({ cat = '全部', limit=6, offset=0, order="hot" } = {}) {
  return api.get('top/playlist', {
    data: {
      cat,
      limit, 
      offset,
      order
    }
  })
}

export function getCategories() {
  return api.get('playlist/hot')
}