// pages/goods_list/index.js
/**
 * 用户上滑，触底加载新数据
 */
import { request } from '../../request/index.js' 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    // 用于展示goods的数组
    goodsList:[]
  },
  QueryList:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  // 总条数
  totalPages:1,
  // 总页数
  pagesSum:1,
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryList.cid = options.cid
    // console.log(options);
    // 直接获取
    // 判断是否出现等待的标志 在请求前出现，在请求结束之后就消失
    this.getGoodsList()
  },
  handleTabsItemChange(e){
    const {index} = e.detail
    let {tabs} = this.data
    // console.log(tabs)
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tabs
    })
  },
  async getGoodsList(){
    const res = await request({url:'/goods/search',data:this.QueryList})
    const totalPages = res.data.message.total
    // 总条数
    // this.totalPages = totalPages
    // 获取总页数
    const pages = Math.ceil( totalPages/this.QueryList.pagesize )
    this.pagesSum = pages
    this.setData({
      // 并不能直接替代，而是要累加 
      // 需要注意变量所处的位置 进行解构合并
      goodsList:[...this.data.goodsList,...res.data.message.goods]
    })
    // console.log(this.pagesSum)
    // 关闭下拉刷新窗口
    wx.stopPullDownRefresh()
  },
  // 触及底部的内容实现 因为下面自带 属于生命周期
  onReachBottom(){
    // 判断是否还有下一页
    if(this.QueryList.pagenum >= this.pagesSum){
      // 已经没有下一步了
      wx.showToast({
        title: '已经到底了~',
      })
    }else{
      // 如果还有下一页 页数++ 重新请求
      this.QueryList.pagenum++
      this.getGoodsList()
    }
    console.log("已经到底部了");
  },
  onPullDownRefresh(){
    // 重置数组
    this.setData({
      goodsList:[]
    })
    // 重置页码
    this.QueryList.pagenum = 1
    // 重新发送请求
    this.getGoodsList()
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})