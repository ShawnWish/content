export const showModal = ({content})=>{
  return new Promise((reslove,reject)=>{
    wx.showModal({
      title:'警告',
      content:content,
      success:(res)=>{
        reslove(res)
        // if(res.confirm){
        //   reslove(res)
        // }else if(res.cancel){
        //   console.log('用户点击取消')
        // }
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}
export const showToast = ({title})=>{
   return new Promise((reslove,reject)=>{
     wx.showToast({
       title: title,
       icon:"none",
       success:(res)=>{
         reslove(res)
       },
       fail:(res)=>{
          reject(res)
       }
     })
   })
}
export const login = ()=>{
  return new Promise((reslove,reject)=>{
    wx.login({
      timeout: 10000,
      success
    })
  })
}