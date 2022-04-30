// pages/home/home.js
import {
  getMultiData,
  getGoodsData
} from '../../service/home.js'

const types = ['pop','new','sell']

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommends: [],
    titles: ['流行','新款','精选'],
    goods: {
      'pop': {page: 0,list: []},
      'new': {page: 0,list: []},
      'sell': {page: 0,list: []},
    },
    currentType: 'pop',
    showBackTop: false,
    isTabFixed: false,
    tabScrollTop: 0
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getMultidata(),
    this._getGoodsdate('pop')
    this._getGoodsdate('new')
    this._getGoodsdate('sell')
  },

  _getGoodsdate(type) {
    // 获取页码
    const page = this.data.goods[type].page + 1;

    getGoodsData(type,page).then(res => {
      const list = res.data.data.list;
      // 将数据设置到对于type的list下
      const oldList = this.data.goods[type].list;
      oldList.push(...list)
      // 将数据设置到data中的goods中
      const typeKey = `goods.${type}.list`
      const pageKey = `goods.${type}.page`
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page
      })
    })
  },
  _getMultidata() {
    getMultiData().then(res => {
      const banners = res.data.data.banner.list;
      // console.log(banners)
      const recommend = res.data.data.recommend.list;

      this.setData({
        banners: banners,
        recommends: recommend
      })
    })
  },
  handleTabClick(event) {
    // 取出index
    const index = event.detail.index

    // 设置 currentType
    const type = types[index]
    this.setData({
      currentType: type
    })
  },
  onPageScroll(options) {
    const scrollTop = options.scrollTop
    const flag = scrollTop >= 500
    if (flag != this.data.showBackTop) {
      this.setData({
        showBackTop: flag
      })
    }

    //修改 isTabFixed
    const flag1 = scrollTop >= this.data.tabScrollTop
    if (flag1 != this.data.isTabFixed) {
      this.setData({
        isTabFixed: flag1
      })
    }
  },
  handleImageLoad() {
    // console.log('加载完成')
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      // console.log(rect)
      this.data.tabScrollTop = rect.top
    }).exec()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 上拉加载
    this._getGoodsdate(this.data.currentType)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})