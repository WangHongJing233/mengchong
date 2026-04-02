import { View, Text, Image, ScrollView, Button } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useStore } from '../../store'
import './index.scss'

export default function PetDetail() {
  const router = useRouter()
  const { id } = router.params
  const { pets, activePetId, setActivePet } = useStore()
  
  // Use passed id or fallback to active pet
  const targetId = id || activePetId
  const pet = pets.find(p => p.id === targetId)

  if (!pet) {
    return (
      <View className="pet-detail__empty">
        <Text className="pet-detail__empty-text">找不到该宠物信息</Text>
      </View>
    )
  }

  const handleBack = () => {
    Taro.navigateBack()
  }

  const handleSetActive = () => {
    setActivePet(pet.id)
    Taro.showToast({ title: '已设为当前活跃', icon: 'success' })
  }

  return (
    <View className="pet-detail">
      {/* Header */}
      <View className="pet-detail__header">
        <View onClick={handleBack} className="pet-detail__back-btn">
          <Text>⬅️</Text>
        </View>
        <View className="pet-detail__title">
          <Text>宠物档案</Text>
        </View>
      </View>

      <ScrollView scrollY className="pet-detail__scroll">
        <View className="pet-detail__content">
          {/* Main Card */}
          <View className="pet-card pet-card--main">
            <View className="pet-card__deco pet-card__deco--top"></View>
            <View className="pet-card__deco pet-card__deco--bottom"></View>
            
            <View className="pet-card__profile">
              <View className="pet-card__avatar-wrapper">
                <Image 
                  src={pet.avatar} 
                  className="pet-card__avatar" 
                  mode="aspectFill" 
                />
                <View className="pet-card__type-badge">
                  <Text className="pet-card__type-icon">{pet.type === 'dog' ? '🐶' : '🐱'}</Text>
                </View>
              </View>
              <View className="pet-card__name">
                <Text>{pet.name}</Text>
              </View>
              <View className="pet-card__star-badge">
                <Text>✨ 萌宠之星</Text>
              </View>
            </View>

            {/* Stats */}
            <View className="pet-card__stats">
              <View className="pet-card__stat-item">
                <Text className="pet-card__stat-label">总萌力</Text>
                <Text className="pet-card__stat-value pet-card__stat-value--primary">{pet.cuteness}</Text>
              </View>
              <View className="pet-card__stat-item">
                <Text className="pet-card__stat-label">颜值分</Text>
                <Text className="pet-card__stat-value">{pet.appearanceScore}</Text>
              </View>
              <View className="pet-card__stat-item">
                <Text className="pet-card__stat-label">活跃度</Text>
                <Text className="pet-card__stat-value">{pet.activityScore}</Text>
              </View>
            </View>
          </View>

          {/* Details */}
          <View className="pet-info">
            <View className="pet-info__header">
              <Text className="pet-info__icon">📋</Text>
              <Text>基本信息</Text>
            </View>
            
            <View className="pet-info__list">
              <View className="pet-info__item">
                <Text className="pet-info__label">品种</Text>
                <Text className="pet-info__value">{pet.type === 'dog' ? '未知犬种' : '未知猫种'}</Text>
              </View>
              <View className="pet-info__item">
                <Text className="pet-info__label">最新体重</Text>
                <Text className="pet-info__value pet-info__value--blue">
                  {pet.weightRecords.length > 0 
                    ? `${pet.weightRecords[pet.weightRecords.length - 1].weight} kg` 
                    : '暂无记录'}
                </Text>
              </View>
              <View className="pet-info__item">
                <Text className="pet-info__label">入驻天数</Text>
                <Text className="pet-info__value pet-info__value--green">98 天</Text>
              </View>
            </View>
          </View>

          {/* Action Button */}
          <View className="pet-actions">
            {pet.id !== activePetId && (
              <Button 
                className="pet-actions__btn pet-actions__btn--secondary"
                onClick={handleSetActive}
              >
                设为当前活跃宠物
              </Button>
            )}
            <Button 
              className="pet-actions__btn pet-actions__btn--primary"
              onClick={() => {
                Taro.showToast({ title: '已分享给好友', icon: 'success' })
              }}
            >
              分享档案
            </Button>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
