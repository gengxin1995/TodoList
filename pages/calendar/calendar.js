import { ListModel } from '../../model/list.js';

let listModel = new ListModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    days: [],
    todos: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let date = new Date();
    // let lists = listModel.getTodosOfDate(date);

    // this.setData({
    //   todos: lists
    // })

    // let days = listModel.getTodoDays({
    //   year: date.getFullYear(),
    //   month: date.getMonth() + 1
    // });

    // this.setData({
    //   days
    // })
  },

  getTodos: function (event) {
    let day = event.detail.day;
    let date = new Date(day.year, day.month - 1, day.date);
    let todos = listModel.getTodosOfDate(date);
    if (todos) {
      this.setData({
        todos
      })
    }
  },

  getDays: function (event) {
    let date = event.detail.date;
  
    let days = listModel.getTodoDays({
      year: date.getFullYear(),
      month: date.getMonth() + 1
    });
    
    this.setData({
      days
    })
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
    let date = new Date();
    let lists = listModel.getTodosOfDate(date);

    if (lists) {
      this.setData({
        todos: lists
      })
    }

    let days = listModel.getTodoDays({
      year: date.getFullYear(),
      month: date.getMonth() + 1
    });

    this.setData({
      days
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})