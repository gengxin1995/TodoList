import { CategoryModel } from '../../model/category.js';

let categoryModel = new CategoryModel();

//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    cates: []
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  onShow: function () {
    let cates = categoryModel.getCategories();
    this.setData({
      cates
    })
  },

  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  onAdd: function (e) {
    wx.navigateTo({
      url: `/pages/cate/cate?cate=${JSON.stringify(e.currentTarget.dataset.cate) || ''}`,
    })
  },

  // showLists: function (e) {
  //   wx.navigateTo({
  //     url: `/pages/lists/lists?cate=${e.currentTarget.dataset.cate}`,
  //   })
  // }
})
