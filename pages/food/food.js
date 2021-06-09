// pages/food/food.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    location:'上海',
    num:1,//当前的页面数据
    listArr:[],//列表信息
    msg:'',//页面加载更多数据提示信息
    navBarArr:[
      {
        id:0,
        imgUrl:'../../images/item1.jpg',
        name:'美容养颜'
      },
      {
        id: 1,
        imgUrl: '../../images/item2.jpg',
        name: '保健调养'
      },
      {
        id: 2,
        imgUrl: '../../images/item3.jpg',
        name: '补养'
      },
      {
        id: 3,
        imgUrl: '../../images/item4.jpg',
        name: '减肥'
      },
      {
        id: 4,
        imgUrl: '../../images/item5.jpg',
        name: '母婴'
      },
      {
        id: 5,
        imgUrl: '../../images/item6.jpg',
        name: '气节'
      },
      {
        id: 6,
        imgUrl: '../../images/item7.jpg',
        name: '常见食疗'
      }, {
        id: 7,
        imgUrl: '../../images/item8.jpg',
        name: '维生素'
      }
    ]
  },

  onLoad: function (options) {
    
  },


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