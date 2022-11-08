import api from './index'

export function getDetailByIds(ids) {
  return api.get('song/detail', {
    data: {
      ids
    }
  })
}

export function getLyricById(id) {
  return api.get('lyric', {
    data: {
      id
    }
  })
}