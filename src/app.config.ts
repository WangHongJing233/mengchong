export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/rank/index',
    'pages/community/index',
    'pages/profile/index',
    'pages/health/index',
    'pages/pet-detail/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#9ca3af',
    selectedColor: '#ff8f0a',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/tabbar/home.png',
        selectedIconPath: 'assets/tabbar/home-active.png'
      },
      {
        pagePath: 'pages/community/index',
        text: '社区',
        iconPath: 'assets/tabbar/community.png',
        selectedIconPath: 'assets/tabbar/community-active.png'
      },
      {
        pagePath: 'pages/rank/index',
        text: '榜单',
        iconPath: 'assets/tabbar/rank.png',
        selectedIconPath: 'assets/tabbar/rank-active.png'
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
        iconPath: 'assets/tabbar/profile.png',
        selectedIconPath: 'assets/tabbar/profile-active.png'
      }
    ]
  }
})