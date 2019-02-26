class CategoryModel {
  addCategory(cate) {
    let cates = this.getCategories();
    let hasCate = cates.some(function(item) {
      return item.text == cate;
    })

    if (hasCate) {
      return;
    }
    cates.push({
      text: cate,
      id: new Date().getTime()
    });
    wx.setStorageSync('categories', cates);
  }

  editCategory(id, text) {
    let cates = this.getCategories();
    cates.forEach(function(item) {
      if (item.id === id) {
        item.text = text;
      }
    })
    wx.setStorageSync('categories', cates);
  }

  deleteCategory(id) {
    let cates = this.getCategories();
    cates.forEach(function(item, index) {
      if (item.id === id) {
        cates.splice(index, 1);
      }
    })
    wx.setStorageSync('categories', cates);
  }

  findCategory(cate) {
    let cates = this.getCategories();
    cate = cates.filter(function(item) {
      return item.text == cate;
    })
    return cate;
  }

  getCategories() {
    let cates = wx.getStorageSync('categories') || [];
    if (!cates.length) {
      cates.push({
        text: '默认',
        id: new Date().getTime()
      });
      wx.setStorageSync('categories', cates);
    }
    return cates;
  }
}

export { CategoryModel }