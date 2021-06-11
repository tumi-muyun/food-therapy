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
    wx.request({
      url: 'http://iwenwiki.com:3002/api/foods/list',
      data:{
        city:this.data.location,
        page:1
      },
      success:res=>{
        console.log(res.data);
        if(res.data.status==200){
          this.setData({
            listArr:res.data.data.result
          })
        }
        else{
          console.log('请求无数据');
        }
      }
    })
  },


  onShow: function () {
    // 小程序启动，或从后台进入前台显示时触发
    //获取本地存储----------------------------------------
    var cityname=wx.getStorageSync('cityName');
    // console.log('onshow切换页面',cityname);
    if(cityname){
      this.setData({
        location:cityname
      })
      wx.request({
        url: 'http://iwenwiki.com:3002/api/foods/list',
        data:{
          city:cityname,
          page:1
        },
        success:res=>{
          if(res.data.status==200){
            this.setData({
              listArr:res.data.data.result
            })
          }else{
            this.setData({
              listArr:[]
            })
          }
        }
      })
    }
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
    console.log('下拉刷新页面数据');

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('下拉到页面底部，加载更多数据');
    this.data.num++;
    wx.request({
      url: 'http://iwenwiki.com:3002/api/foods/list',
      data:{
        city:this.data.location,
        page:this.data.num
      },
      success:res=>{
        if(res.data.status==200){
          this.setData({
            listArr:this.data.listArr.concat(res.data.data.result)
          })
        }
        else{
          this.setData({
            msg:'我是有底线的，没有更多数据'
          })
        }
      }
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})