function http(method,params,url,message,callback,error) {
  if(message) {
    wx.showLoading({
      title: message,
    })
  }
  wx.request({
    method:method,
    url: 'http://iwenwiki.com:3002'+url,
    data:params,
    header: {
      'content-type': 'application/x-www-form-urlencoded' // post默认值
    },
    success:res=>{
      if(res.data.status==200){
        wx.showToast({
          title: '数据加载完毕',
        })
        callback(res.data);
      }
      else{
        error('没有数据')
      }
    },
    fail:err=>{
      error('请求失败');
    },
    complete:function(){
      wx.hideLoading();
    }
  })
}
module.exports=http;