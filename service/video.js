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

export function getVideoById(id) {
  return api.get(`video/url`, {
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

export function getVideoDetailById(id) {
  return api.get('video/detail', {
    data: {
      id
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

export function getBanners() {
  return api.get('banner', {
    type: 2
  })
}