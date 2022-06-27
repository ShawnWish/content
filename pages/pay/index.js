// pages/pay/index.js
import {showModal,showToast} from '../../utils/asyncWx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    newCart:[],
    allChecked:false,
    totalNum:0,
    totalPay:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    const address = wx.getStorageSync('address')
    let cart = wx.getStorageSync('cart')
    // 在这里进行过滤
    let newCart = cart.filter(v=>v.checked)
    let totalNum=0
    let totalPay=0
    // every存在问题，空数组也是true 需要排除[]的影响
    newCart.forEach(v=>{
        totalPay += v.num * v.goods_price
        totalNum += v.num
    })
    // 获取商品信息 cart
    // 当只有一个商品时，可以设置checked
    this.setData({
      address,
      newCart,
      totalNum,
      totalPay
    })
    // 现在的问题就是 newCart 
    wx.setStorageSync("newCart",newCart)
    // this.setCart(cart)
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

  },
  setCart(cart){
    let allChecked = true
    let totalNum=0
    let totalPay=0
    // every存在问题，空数组也是true 需要排除[]的影响
    cart.forEach(v=>{
      // 已选中
      if(v.checked){
        totalPay += v.num * v.goods_price
        totalNum += v.num
      }else{
        allChecked = false
      }
    })
    allChecked = cart.length!=0?allChecked:false
    // 获取商品信息 cart
    // 当只有一个商品时，可以设置checked
    this.setData({
      cart,
      allChecked,
      totalNum,
      totalPay
    })
    wx.setStorageSync("cart",cart)
  },
  // 真实支付
  handlePay(){
    // 需要过滤掉没有未选择的
    // 跳转到订单页面
    wx.navigateTo({
      url: '/pages/auth/index',
    })
  }
})