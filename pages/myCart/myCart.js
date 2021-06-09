// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    active:false,
    isSeletedAll:false,//全选状态
    startX:'',//开始的位置坐标点x轴
    num:1
  },
  
  //第一步：滑动出现删除-========================================================
  touchStart:function(e){
    console.log(e);
    this.setData({
      startX:e.touches[0].clientX
    })

  },
  //移动事件-==================================================================
  touchMove:function(e){

    var startX=this.data.startX;
    var moveX=e.touches[0].clientX;

    if(moveX < startX){//左滑
        this.data.active=true;//给当前的元素赋值属性true
    }else{
      this.data.active=false;
    }
    //修改当前的list后---同步更新数据data里面的变量list
    this.setData({
      active:this.data.active
    })
  },

  onLoad() {
    
  },
  getUserProfile(e) {
   
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    
  }
})
