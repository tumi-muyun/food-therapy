const http = require("../../utils/http")

// pages/productDetail/productDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    wx.request({
      url: 'http://iwenwiki.com:3002/api/foods/list/detail?id='+options.codeId,
      success:res=>{
        console.log(res.data);
        if(res.data.status==200){
          this.setData({
            info:res.data.data[0]
          })
        }
      }
    })
  },
  gomyCart:function(){
    wx.switchTab({
      url: '../myCart/myCart',
    })
  },
  addShop:function(){
    var info=this.data.info;
     wx.request({
       url: 'http://iwenwiki.com:3002/api/cart/add',
       data:{
        name:info.name,
        pic:info.pic,
        num:1,//传递的数量  1 
        info:info.description,
        price:info.price
       },
       success:res=>{
        //  console.log(res.data);
         if(res.data.status==200){
           wx.showToast({
             title: '加入成功',
             icon:'none'
           })
         }
       }
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