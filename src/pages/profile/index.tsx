import { View, Text, Image, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useStore } from '../../store'
import './index.scss'

export default function Profile() {
  const { user, pets, activePetId, login, logout } = useStore()
  const activePet = pets.find(p => p.id === activePetId)

  if (!user) {
    return (
      <View className="profile__login">
        <View className="profile__login-icon-wrapper">
          <Text className="profile__login-icon">🐾</Text>
        </View>
        <View className="profile__login-title"><Text>欢迎来到萌宠PK</Text></View>
        <View className="profile__login-subtitle"><Text>记录爱宠点滴，与全城铲屎官一起PK互动</Text></View>
        <View 
          onClick={login}
          className="profile__login-btn"
        >
          <Text className="profile__login-btn-text">微信一键登录</Text>
        </View>
      </View>
    )
  }

  const navigateToHealth = () => {
    Taro.navigateTo({ url: '/pages/health/index' })
  }

  return (
    <View className="profile">
      {/* User Header */}
      <View className="profile__header">
        {/* Floating background elements */}
        <View className="profile__header-bg-element profile__header-bg-element--1"></View>
        <View className="profile__header-bg-element profile__header-bg-element--2"></View>

        <View className="profile__header-settings">
          <Text>⚙️</Text>
        </View>
        
        <View className="profile__user-info">
          <View className="profile__avatar-wrapper">
            <Image src={user.avatar} className="profile__avatar" />
            <View className="profile__status-dot"></View>
          </View>
          <View className="profile__user-details">
            <View className="profile__nickname"><Text>{user.nickname}</Text></View>
            <View className="profile__activity-badge">
              <Text>✨ 已在社区活跃 128 天</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Pet Profiles */}
      <View className="profile__pets-section">
        <View className="profile__pets-header">
          <View className="profile__pets-title"><Text>我的宠物</Text></View>
          <View 
            className="profile__pets-add-btn"
            onClick={() => Taro.navigateTo({ url: '/pages/pet-add/index' })}
          >
            <Text>+ 添加</Text>
          </View>
        </View>
        
        <ScrollView scrollX className="profile__pets-scroll" style={{ width: '100%' }}>
          <View className="profile__pets-scroll-inner">
            {pets.map(pet => (
              <View 
                key={pet.id} 
                onClick={() => Taro.navigateTo({ url: `/pages/pet-detail/index?id=${pet.id}` })}
                className={`profile__pet-card ${pet.id === activePetId ? 'profile__pet-card--active' : ''}`}
              >
                {pet.id === activePetId && (
                  <View className="profile__pet-card-glow"></View>
                )}
                <Image src={pet.avatar} className={`profile__pet-avatar ${pet.id === activePetId ? 'profile__pet-avatar--active' : ''}`} mode="aspectFill" />
                <View className="profile__pet-name"><Text>{pet.name}</Text></View>
                <View className={`profile__pet-cuteness ${pet.id === activePetId ? 'profile__pet-cuteness--active' : ''}`}>
                  <Text>萌力 {pet.cuteness}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Menus */}
      <View className="profile__menus-section">
        <View className="profile__menu-card">
          <View 
            onClick={navigateToHealth} 
            className="profile__menu-item"
          >
            <View className="profile__menu-content">
              <View className="profile__menu-icon-wrapper profile__menu-icon-wrapper--health">
                <Text className="profile__menu-icon profile__menu-icon--health">📈</Text>
              </View>
              <View className="profile__menu-title"><Text>健康体重追踪</Text></View>
            </View>
            <View className="profile__menu-arrow"><Text>{'>'}</Text></View>
          </View>
        </View>
        
        <View className="profile__menu-card">
          <View 
            onClick={logout}
            className="profile__menu-item"
          >
            <View className="profile__menu-content">
              <View className="profile__menu-icon-wrapper profile__menu-icon-wrapper--logout">
                <Text className="profile__menu-icon">🚪</Text>
              </View>
              <View className="profile__menu-title"><Text>退出登录</Text></View>
            </View>
            <View className="profile__menu-arrow"><Text>{'>'}</Text></View>
          </View>
        </View>
      </View>
    </View>
  )
}