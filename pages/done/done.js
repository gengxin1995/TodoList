import { ListModel } from '../../model/list.js';
import { CategoryModel } from '../../model/category.js';

let listModel = new ListModel();
let categoryModel = new CategoryModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    completed: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   let completed = listModel.getCompleted();
  //   this.setData({
  //     completed
  //   })
  // },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let completed = listModel.getCompleted();
    this.setData({
      completed
    })
  },

  onStateChange: function (event) {
    let todo = event.detail.todo;
    let completed = this.data.completed;
    completed = completed.filter(function (item) {
      return item.id !== todo.id;
    })
    this.setData({
      completed
    })
    listModel.updateLists(todo);
  }
})