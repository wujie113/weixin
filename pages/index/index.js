//index.js
//获取应用实例
const util = require('../../utils/util.js');
console.log(util.formatTime(new Date()));
const app = getApp();
console.log(app.globalData);
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    text:"init data",
    num:0,
    array: [{ text:'init data'}],
    object:{
      text:'init data'
    },
    // array:[{msg:'1'},{msg:'2'}],
    name: 'WeChat'
  },
  changeText:function(){
   //this.data.text = "change data";//不能直接修改this.data
  //  应该使用setData
   this.setData({
     text:'change data'
   })
  },
  changeNum:function(){
     // 或者，可以修改 this.data 之后马上用 setData 设置一下修改了的字段
    this.data.num = 1;
    this.setData({
      num: this.data.num
    }) 
  },
  changeItemArray:function(){
 // 对于对象或数组字段，可以直接修改一个其下的子字段，这样做通常比修改整个对象或数组更好
    this.setData({
      'array[0].text':'changed data'
    })
 },
  changeItemObject:function(){
    this.setData({
      'object.text':'change object data'
    })
  },
  addNewField:function(){
    this.setData({
      'newField.text':'new'
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  clcikMe:function(){ 
    this.setData({msg:"Hello world"});
  },
  changeName:function(e){
        this.setData({
          name:'MUKE'
        })
  },
  // 只有定义了此事件处理函数,右上角菜单栏才会显示"转发"按钮
  onShareAppMessage:function(res){
      if(res.from === 'button'){
          // 来自页面的转发按钮
        console.log(res.target);
      }
      return {
        title:'自定义转发辩题',
        path:'/page/user?id=123'
      }
  }

})
