// index.js
// 获取应用实例
var http=require('../../utils/http.js');

Page({
  data: {
    num:1,
    bannerArr:[],
    list:[],
  },
  swiperChange:function(e){
    // console.log(e);
    this.setData({
      num:e.detail.current+1
    })
  },
  onLoad:function(){
    http('get','','/api/banner','加载中',res=>{
      this.setData({
        bannerArr:res.data
      })
    })
    http('get','','/api/indexlist','数据拼命加载中',res=>{
      // console.log(res);
      this.setData({
        list:res.data
      })
    })
  },
  tiao:function(e){
    // console.log(e);
    // console.log(e.currentTarget.dataset.mark);
    wx.navigateTo({
      url: '../indexDetail/indexDetail?id='+e.currentTarget.dataset.mark,
    })
  }
})
