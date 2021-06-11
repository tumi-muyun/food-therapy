// pages/citys/citys.js
var app=getApp();

Page({
  data: {
    hotCitys:[],//热门城市
  },
  getLocation:function(){
    wx.getLocation({
      success:function(res){
        // console.log(res);
        wx.request({
          url: 'http://iwenwiki.com:3002/api/lbs/location',
          data:{
            latitude:res.latitude,
            longitude:res.longitude
          },
          success:res=>{
            console.log(res.data.result.ad_info.city);
            //获取当前的位置的城市 名字---返回到食疗坊界面--切换城市 
            var citys = res.data.result.ad_info.city;
            var cityName = citys.slice(0, citys.length-1);
            console.log(cityName);
            wx.setStorageSync('cityName', cityName);
              wx.switchTab({
                url: '../food/food',
              })  
          }
        })
      }
    })
  },
  onLoad: function (options) {
    wx.request({
      url: 'http://iwenwiki.com:3002/api/hot/city',
      success:res=>{
        console.log(res.data);
        this.setData({
          hotCitys:res.data.data
        })
      }
    })
  },
  selectCity:function(e){
    // console.log(e);
    wx.setStorageSync('cityName',e.currentTarget.dataset.val);
    wx.switchTab({
      url: '../food/food',
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