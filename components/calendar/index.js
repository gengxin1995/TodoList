// components/calendar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    todo: {
      type: Array,
      value: [],
      observer: '_dataChange'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    clickedDate: new Date(),
    weeks: ['日', '一', '二', '三', '四', '五', '六'],
    dates: [],
  },

  attached: function () {
    let date = new Date();
    this._renderByDate(date);
  },
  /**
   * 组件的方法列表
   */
  methods: {
    prevMonth: function (e) {
      let day = this.data.clickedDate;
      let date = new Date(day.year, day.month - 1, day.date);

      date.setMonth(date.getMonth() - 1);
      while (date.getMonth() + 1 === day.month) {
        date.setDate(date.getDate() - 1);
      }
      this._renderByDate(date);
      this.triggerEvent('changed', {
        date
      }, {});
    },
    nextMonth: function (e) {
      let day = this.data.clickedDate;
      let date = new Date(day.year, day.month - 1, day.date);
      
      date.setMonth(date.getMonth() + 1);
      while (date.getMonth() + 1 === day.month) {
        date.setDate(date.getDate() + 1);
      }
      this._renderByDate(date);
      this.triggerEvent('changed', {
        date
      }, {});
    },
    dateChange: function (e) {
      let date = e.detail.value;
      date = new Date(date);
      this.setData({
        year: date.getFullYear(),
        month: date.getMonth() + 1
      })
      this._renderByDate(date);
      this.triggerEvent('changed', {
        date
      }, {});
    },
    selectDay: function (e) {
      let day = e.currentTarget.dataset.day;
      let date = new Date(day.year, day.month - 1, day.date);

      this._renderByDate(date);

      // this.triggerEvent('todos', {
      //   day
      // }, {});
    },
    _dataChange: function (newValue, oldValue) {
      this.setData({
        todo: newValue
      })
      // let dates = this.data.dates;
      // let month = this.data.month
  
      // for (let i = 0; i < dates.length; i++) {
      //   for (let j = 0; j < 6; j++) {
      //     if (dates[i][j].month !== month) break;
      //     if (oldValue.indexOf(dates[i][j].date) !== -1) {
      //       dates[i][j].todo = false;
      //     }         
      //     if (newValue.indexOf(dates[i][j].date) !== -1) {
      //       dates[i][j].todo = true;
      //     }
      //   }
      // }
      // this.setData({
      //   dates
      // })
      let day = this.data.clickedDate;
      let date = new Date(day.year, day.month - 1, day.date);
      this._renderByDate(date);
    },

    _renderByDate: function (date) {
      let dat = new Date(date);
      dat.setDate(dat.getDate() - date.getDate() + 1);
      dat.setDate(dat.getDate() - dat.getDay());
      let dates = [];
      for (let i = 0; i < 6; i++) {
        if ((i === 5) && (dat.getMonth() !== date.getMonth())) {
          break;
        }
        dates[i] = [];
        for (let j = 0; j < 7; j++) {
          let day = {
            year: dat.getFullYear(),
            month: dat.getMonth() + 1,
            date: dat.getDate(),
            color: '#000',
            background: '#fff'
          }
          if (dat.getMonth() !== date.getMonth()) {
            day.color = '#999';
          } else {
            if (this.data.todo.indexOf(day.date) !== -1) {
              day.todo = true;
            }
          }
          if (dat.getTime() === date.getTime()) {
            day.background = '#333';
            day.color = '#fff';
            this.setData({
              clickedDate: day,
              year: day.year,
              month: day.month
            });
            this.triggerEvent('todos', {
              day
            }, {});
          }
          
          dates[i].push(day);
          dat.setDate(dat.getDate() + 1);
        }
      }
      this.setData({
        dates
      })
    }
  }
})
