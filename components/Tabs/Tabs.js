// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  // 接收父元素的数据
  properties: {
    tabs:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // component 上面才有methods属性
    handleItemTap(e){
      // 获取点击的索引
      
      // const {index} = e.currentTarget.dataset
      // console.log(e);
      const { index } = e.currentTarget.dataset

      this.triggerEvent("tabsItemChange",{index})
    }
  }
})
