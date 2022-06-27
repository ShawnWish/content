// pages/goods_detail/index.js
import { request } from '../../request/index'
Page({

  data: {
    goodsDetail:{}
  },
  goodsImages:[],
  goodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options
    this.getGoodsDetail(goods_id)
  },
  async getGoodsDetail(goods_id){
    const goodsDetail = await request({url:"/goods/detail",data:{goods_id}})
    this.goodsImages = goodsDetail.data.message.pics
    this.goodsInfo = goodsDetail.data.message
    console.log(goodsDetail.data.message)
    this.setData({
      goodsDetail:{
        pics:goodsDetail.data.message.pics,
        goods_price:goodsDetail.data.message.goods_price,
        goods_name:goodsDetail.data.message.goods_name,
        goods_introduce:goodsDetail.data.message.goods_introduce
      }
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

  },
  handlePreviewPic(e){
    console.log(e)
    const {index} = e.currentTarget.dataset
    const urls = this.goodsImages.map(v=>v.pics_mid)
    // console.log(urls)
    wx.previewImage({
      urls: urls,
      current: urls[index],
    })
  },
  // 添加购物车
  addCart(){
    // 首先获取内存中的内容
    const items = wx.getStorageSync('cart') || []
    // 判断是否包含该商品的Id
    let index = items.findIndex(v=>v.goods_id === this.goodsInfo.goods_id)
    if(index === -1){
      // 购物车里未包含内容  加入内容
      this.goodsInfo.num = 1
      this.goodsInfo.checked = true
      items.push(this.goodsInfo)
    }else{
      // 购物车内已经包含内容，数量++ 缓存数量
      items[index].num++
    }
    wx.setStorageSync('cart', items)
    wx.showToast({
      title: '添加成功',
      icon:"success"
    })
  }
})