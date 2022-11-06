import { getCategories, getTopPlayList } from '../../service/song'

Page({
  data: {
    menuList: []
  },

  onLoad() {
    this.getMenuList()
  },

  async getMenuList() {
    const res = await getCategories()
    const tags = res.tags.map(tag => tag.name)

    const menuList = await Promise.all(tags.map(async tag => await getTopPlayList({ cat: tag })))
    this.setData({
      menuList
    })
  }
})