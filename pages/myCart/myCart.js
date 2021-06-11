// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    active:false,
    // isSeleted:false,//当前这个选项是否选中
    isSeletedAll:false,//全选状态
    startX:'',//开始的位置坐标点x轴
    list:[],//购物车列表信息
    num:0,//选中的个数   num>0 控制结算的状态的颜色
    totalPrice:'0.00',//总价格
    isShow:false,//控制结算的状态的颜色
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
    var index=e.currentTarget.dataset.index;
    console.log('滑动的是第几个元素',index);
    var list=this.data.list;

    var startX=this.data.startX;
    var moveX=e.touches[0].clientX;

    if(moveX < startX){//左滑
        list[index].active=true;//给当前的元素赋值属性true
    }else{
      list[index].active=false;
    }
    //修改当前的list后---同步更新数据data里面的变量list
    this.setData({
      list:list
    })
  },

  onLoad() {
    //this.getShop();
  },
 
  getShop:function(){
    var isSeletedAll=this.data.isSeletedAll;
    wx.request({
      url: 'http://iwenwiki.com:3002/api/cart/list',
      success:res=>{
        if(res.data.status==200){
          if(isSeletedAll){
            var list=res.data.data.result;
            for(var i=0;i<list.length;i++){
              list[i].isSeleted=true;
            }
            this.setData({
              list:list
            })
          }else{
            this.setData({
              list:res.data.data.result
            })
          }
        }else{
          console.log('购物车没有数据');
        }
      }
    })
  },
  selectedList:function(e){
    var index=e.currentTarget.dataset.index;
    var list=this.data.list;
    var num=this.data.num;
    list[index].isSeleted=!list[index].isSeleted;
    if(list[index].isSeleted){
      num++;
    }else{
      num--;
    }
    console.log('目前选中的个数',num);
    if(num==list.length){
      this.setData({
        isSeletedAll:true
      })
    }else{
      this.setData({
        isSeletedAll:false
      })
    }
    this.setData({
      list:list,
      num:num
    })
    this.gototalPrice();
  },
  gototalPrice:function(){
    var list=this.data.list;
    var sum=0;
    for(var i=0;i<list.length;i++){
      if(list[i].isSeleted){
        sum+=list[i].price*list[i].num;
      }
    }
    this.setData({
      totalPrice:sum.toFixed(2)
    })
  },
  seletedAll:function(){
    var isSeletedAll=!this.data.isSeletedAll;
    var list=this.data.list;
    var num=this.data.num;
    for(var i=0;i<list.length;i++){
      list[i].isSeleted=isSeletedAll;
    }
    if(isSeletedAll){
      num=list.length;
    }else{
      num=0;
    }
    this.setData({
      list:list,
      isSeletedAll:isSeletedAll,
      num:num
    })
    this.gototalPrice();
  },
  reduce:function(e){
    var list=this.data.list;
    var index=e.currentTarget.dataset.index;
    var num=list[index].num;
    num--;
    if(num<1){
      wx.showToast({
        title: '数量最少为1',
        icon:'none'
      })
      return;
    }
    //修改
    console.log('减少后的属性',num);
      list[index].num=num;
      //3.请求接口
      wx.request({
        url: 'http://iwenwiki.com:3002/api/cart/update',
        data:{
          id:list[index].id,
          num:num
        },
        success:res=>{
          console.log(res.data);
          if(res.data.status==200){//修改 数量
            this.setData({
              list:list
            })
          }
        }
      })
      // 获取总的价格
      this.gototalPrice()
  },
  add:function(e){
    //1.获取当前的操作的元素   2.获取列表容器list 
    var list=this.data.list;
    var index=e.currentTarget.dataset.index;
    // console.log(index);
    //获取当前的元素的目前的数量
    var num=list[index].num;

    //2.点击当前的数量 num++   提交后台接口
    num++;
    console.log('增加的属性',num);
    list[index].num=num;
    //3.请求接口
    wx.request({
      url: 'http://iwenwiki.com:3002/api/cart/update',
      data:{
        id:list[index].id,
        num:num
      },
      success:res=>{
        console.log(res.data);
        if(res.data.status==200){//修改 数量
          this.setData({
            list:list
          })
        }
      }
    })

    // 获取总的价格
    this.gototalPrice()
},
delete:function(e){
  var index=e.currentTarget.dataset.index;
  var list=this.data.list;

  //执行删除---接口
  wx.request({
    url: 'http://iwenwiki.com:3002/api/cart/delete',
    data:{
      id:list[index].id
    },
    success:res=>{
      console.log(res.data);
      if(res.data.status==200){
        wx.showToast({
          title: '删除成功',
          icon:'none'
        })
        //界面：数据消失-----
        //直接删除本地的数据data里面的list容器 对应的这个数据 
        list.splice(index,1);//删除 splice(index下标,1删除个数)
        //修改list 
        this.setData({
          list:list
        })

        // //获取价格：
        this.gototalPrice();
      }
    }
  })

},
onShow: function () {
  this.getShop();//进入页面===重新获取最新购物车信息 

}
})
