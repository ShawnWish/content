// pages/category/index.js
import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单数据
    leftList:[],
    // 右侧菜单数据
    rightList:[],
    // 被点击左侧的菜单
    currentIndex:0,
    // 距离顶部的距离
    scrollTop:0,
  },
  // 不放置在data里面是因为其捕鱼渲染层交互，只是临时存储，省资源
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    /**
     * 先判断一下本地存储中有没有旧的数据 
     * 
     * 没有旧数据发送请求，如果有旧使用旧数据
     *  */  
    const Cats = wx.getStorageSync("cates")
    if(!Cats){
      this.getPages()
    }else{
      // 有旧的时间，定义过期时间，10s改成5分钟
      // console.log(Date.now()-Cats.time)
      if((Date.now()-Cats.time) < 1000 * 20){
        const Cates = wx.getStorageSync('cates')
        this.Cates = Cates.data
        let leftList = this.Cates.map(v=>v.cat_name)
        let rightList = this.Cates[0].children
        this.setData({
          leftList:leftList,
          rightList:rightList
        })

      }else{
        this.getPages()
      }
    }
  },
// 获取分类数据
  async getPages(){
    // request({
    //   url:"/categories"
    // }).then(result=>{
    //   // console.log(result)
    //   // this.setData({
    //   //   categoryList:result.data.message
    //   // })
    //   // setData只有在data{}内部才可以使用
    //   this.Cates = result.data.message
    //   wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
    //   // 构造左侧的菜单数据
    //   let leftList = this.Cates.map(v=>v.cat_name)
    //   // 构造右侧的商品数据
    //   let rightList = this.Cates[0].children
    //   this.setData({
    //     leftList:leftList,
    //     rightList:rightList
    //   })
    // })
    // 使用es7的async 和 await进行请求
    const result = await request({url:"/categories"})
    this.Cates = result.data.message
    wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
    let leftList = this.Cates.map(v=>v.cat_name)
    let rightList = this.Cates[0].children
    this.setData({
      leftList:leftList,
      rightList:rightList
    })
  },
  handleMenu(e){
    // console.log(e);
    const {index} = e.currentTarget.dataset
    let rightList = this.Cates[index].children
    this.setData({
      currentIndex:index,
      rightList:rightList,
      scrollTop:0
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