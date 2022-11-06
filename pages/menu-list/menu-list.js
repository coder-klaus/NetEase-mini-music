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
    const list = []

    // 请求到一个分类数据就进行setData，以便于在页面进行展示
    // 而不是等到所有的分类数据全部获取到后，统一进行setData
    // 以避免页面出现长时间的白屏现象
    tags.map(async (tag, index) => {
      list[index] = await getTopPlayList({ cat: tag })
      
      this.setData({
        menuList: list
      })
    })
  }
})