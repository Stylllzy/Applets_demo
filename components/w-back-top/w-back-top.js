// components/w-back-top/w-back-top.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    topPosition: 0,
    showBackTop: false,
    tabControlTop: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onBackTop() {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      })
      
      this.setData({
        showBackTop: false,
        topPosition: 0,
        tabControlTop: 0
      })
    }
  }
})
