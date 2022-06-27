// pages/cart/index.js
/**
 * 1. 获取
 */
import {showModal,showToast} from '../../utils/asyncWx.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
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
  // 进行数量和金钱的总计 totalSum totalPay
  // 注意只算已选中的
  onShow: function () {
    const address = wx.getStorageSync('address')
    let cart = wx.getStorageSync('cart')
    this.setData({
      address,
    })
    this.setCart(cart)
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
  // 点击添加地址按钮，然后跳转到添加地址页面
  handleAddAddress(){
    console.log("获取地址")
    wx.chooseAddress({
      success: (result) => {
        result.all = result.provinceName+result.cityName+result.countyName+result.detailInfo
        wx.setStorageSync('address', result)
      },
    })
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
  // 当用户按下加减按钮时
  // 点击结算 即结算功能
  /**
   * 1 首先判断购物车是否为空
   * 2 判断收货地址是否为空
   * 3 点击跳转到订单页面
   */
  async hanldeSettle(){
    // let cart = wx.getStorageSync('cart')
    let {address,totalNum} = this.data

    if(address === ""){
      // 地址为空
      const res = await showToast({title:"您尚未添加地址"})
      return;
    }
    else if(totalNum === 0){
      const res = await showToast({title:"您尚未添加商品"})
      return;
    }
    // 跳转页面
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  },
  // 修改全选的选值
  handleAllChecked(e){
    let {allChecked,cart} = this.data
    // 设置
    // allChecked = !allChecked
    // 遍历所有内部的值
    cart.forEach(v=>{
      v.checked = !allChecked
    })
    this.setCart(cart)
  },
  // 修改选择的选值
  handleChangeCheck(e){
    let {id} = e.currentTarget.dataset
    // console.log(id)
    let {cart} = this.data
    const index = cart.findIndex(v=>v.goods_id === id)
    // 能够找到
    // console.log(index)
    if(index !== -1){
      cart[index].checked = !cart[index].checked
    }
    this.setCart(cart)
  },
  // 修改+ - 事件
  async handleItemSumChange(e){
    let {id,operation} = e.currentTarget.dataset
    // console.log(id)
    let { cart } = this.data
    // console.log(cart)
    const index = cart.findIndex(v=>v.goods_id === id)
    // console.log(index)
    if(index !== -1 && cart.length > 0){
      // 数量++ 或者 -- 
      if(cart[index].num === 1 && operation == -1){
        // 展示弹窗
        const res = await showModal({content:"您确定要删除该商品嘛？"})
        if(res.confirm){
          // 删除商品
          cart.splice(index,1)
          this.setCart(cart)
        }
      }
      cart[index].num += parseInt(operation)
      // console.log(cart[index].num)
      this.setCart(cart)
    }
  }

})