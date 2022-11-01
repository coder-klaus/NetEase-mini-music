import api from './index'

export function getTopMv(
  offset = 0,
  limit = 20,
  area = ''
) {
  return api.get('top/mv',{
    data: {
      limit,
      offset,
      area
    }
  })
}

export function getMvVideoById(id) {
  return api.get(`mv/url`, {
    data: {
      id
    }
  })
}

export function getMvDetailById(mvid) {
  return api.get('mv/detail', {
    data: {
      mvid
    }
  })
}

export function getRelatedVideosById(id) {
  return api.get('related/allvideo', {
    data: {
      id
    }
  })
}