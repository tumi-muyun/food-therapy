// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    num:1
  },
  swiperChange:function(e){
    // console.log(e);
    this.setData({
      num:e.detail.current+1
    })
  }
})
