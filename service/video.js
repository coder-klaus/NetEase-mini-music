import api from './index'

export function getTopMv(
  offset = 0,
  limit = 20,
  area = ''
) {
  return api.get({
    url: 'top/mv',
    data: {
      limit,
      offset,
      area
    }
  })
}