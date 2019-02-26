// components/list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    todo: Object,
    index: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    check_url: '/images/icon/checked.png',
    uncheck_url: '/images/icon/unchecked.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function (event) {
      let todo = this.properties.todo;
      todo.done = !todo.done;
      this.triggerEvent('state', {
        todo
      }, {})
    },

    onTapView: function (event) {
      wx.navigateTo({
        url: `/pages/detail/detail?tid=${this.properties.todo.id}`,
      })
    },

    onDel: function (event) {
      let id = this.properties.todo.id;
      this.triggerEvent('delete', {
        id
      }, {})
    }
  }
})
