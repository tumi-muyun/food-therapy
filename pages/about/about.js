// logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    active:false,
    logs: []
  },
  tiao:function(){
    this.setData({
      active:!this.data.active
    })
  },
  onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return {
          date: util.formatTime(new Date(log)),
          timeStamp: log
        }
      })
    })
  }
})
