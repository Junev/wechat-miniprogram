// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false

    touchStop: false
  },
  // 事件处理函数
  // bindViewTap() {
  //   // wx.navigateTo({
  //   //   url: '../logs/logs',
  //   // })
  // },
  bindTouchStart() {
    this.touchStop = false;

    const opacityVariation = 0.1;
    const rotateVariation = 360;
    const timeSpan = 1000;
    let currentFrame = { opacity: 1.0, rotate: 0, backgroundColor: '#FF0000' };
    let nextFrame = {
      opacity: currentFrame.opacity - opacityVariation,
      rotate: currentFrame.rotate + rotateVariation,
      backgroundColor: '#00FF00'
    };
    this.animate('#container-view',
      [currentFrame, nextFrame],
      timeSpan,
      function nextAnimate() {
        if (this.touchStop) {
          return
        }
        currentFrame = { ...nextFrame };
        nextFrame.opacity -= opacityVariation;
        nextFrame.rotate += rotateVariation;
        // console.log([currentFrame, nextFrame])
        this.animate('#container-view', [currentFrame, nextFrame], timeSpan, nextAnimate.bind(this))
      }.bind(this)
    )
  },
  bindTouchEnd() {
    this.touchStop = true;
    this.clearContainerViewAnimation()
  },
  clearContainerViewAnimation() {
    this.clearAnimation('#container-view', { opacity: true, rotate: true }, function () {
      console.log("清除了#container上的opacity和rotate属性")
    });
  },
  onLoad() {
    // @ts-ignore
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e: any) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
