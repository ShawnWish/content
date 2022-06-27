// 0 引入 用来发送请求的方法 一定要把路径补全
import { request } from '../../request/index.js'
Page({
  data: {
    // 轮播图数组
    swiperList:[],
    cateList:[],
    floorList:[]
  },

  /**
   * 页面开始加载就会触发
   */
  onLoad: function (options) {
    // 1.发送异步请求获取轮播图数据 优化的手段可以通过es6的 promise来解决这个问题
    // wx-wx.request({
    //   // url 请求路径
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   // 要发送什么数据给后台 data
    //   // 数据的返回值类型 dataType
    //   success: (result) => {
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   },
    //   // 失败的回调函数
    //   // fail: (res) => {},
    //   // 成功或失败都会回调
    //   // complete: (res) => {},
    // })
    // 因为没有涉及到先后次序，因此可以不使用async
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },
  // 获取轮播图数据
  getSwiperList(){
    request({url:"/home/swiperdata"}).then(result=>{
      this.setData({
        swiperList:result.data.message
      })
    })
    // const result = await request({url:"/home/swiperdata"})
    // this.setData({
    //   swiperList:result.data.message
    // })
  },
  // 获取图标数据
  getCateList(){
    request({url:"/home/catitems"}).then(result=>{
      this.setData({
        cateList:result.data.message
      })
    })
    // const result = await request({url:"/home/catitems"})
    // this.setData({
    //   cateList:result.data.message
    // })
  },
  getFloorList(){
    request({url:"/home/floordata"}).then(result=>{
      this.setData({
        floorList:result.data.message
      })
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
