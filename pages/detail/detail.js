import { ListModel } from '../../model/list.js';
import { CategoryModel} from '../../model/category.js';
import util from '../../utils/util.js';

let listModel = new ListModel();
let categoryModel = new CategoryModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    todo: {},
    check_url: '/images/icon/checked.png',
    uncheck_url: '/images/icon/unchecked.png',
    categories: [],
    date: '',
    cate: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.tid;
    let todo = listModel.getTodoDetail(id);
    
    let categories = categoryModel.getCategories();
    categories = categories.map(function(item) {
      return item.text
    })

    this.setData({
      todo,
      categories,
      index: todo.index || 0,
      date: util.formatTime((new Date(todo.date)), 1),
      cate: todo.category
    })
  },

  bindDateChange: function (event) {
    let date = event.detail.value;
    date = new Date(date).getTime();
    this.setData({
      date: util.formatTime((new Date(date)), 1)
    })
    this.data.todo.date = date;
  },

  bindPickerChange: function (event) {
    let id = event.detail.value;
    let cate = this.data.categories[id];
    this.setData({
      cate
    })
    let todo = this.data.todo;
    todo.category = cate;
  },

  onChangeText:function (event) {
    let text = event.detail.value;
    this.data.todo.text = text;
  },

  onDelete: function (event) {
    let id = this.data.todo.id;
    listModel.deleteTodo(id);
    wx.navigateBack();
  },

  onChangeDesc: function (event) {
    let desc = event.detail.value;
    this.data.todo.desc = desc;
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onUnload: function () {
    listModel.updateLists(this.data.todo);
  }
})