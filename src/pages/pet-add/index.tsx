import { View, Text, Image, Input, Button, Picker } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'
import './index.scss'

export default function PetAdd() {
  const [petName, setPetName] = useState('')
  const [petType, setPetType] = useState('dog')
  const [petBreed, setPetBreed] = useState('')
  const [petWeight, setPetWeight] = useState('')

  const handleBack = () => {
    Taro.navigateBack()
  }

  const handleSave = () => {
    if (!petName.trim()) {
      Taro.showToast({ title: '请输入宠物昵称', icon: 'none' })
      return
    }
    // 模拟保存
    Taro.showLoading({ title: '正在保存...' })
    setTimeout(() => {
      Taro.hideLoading()
      Taro.showToast({ title: '添加成功', icon: 'success' })
      setTimeout(() => {
        Taro.navigateBack()
      }, 1500)
    }, 1000)
  }

  return (
    <View className="pet-add-page">
      <View className="pet-add-page__content">
        {/* Avatar Upload */}
        <View className="pet-add-page__avatar-section">
          <View className="pet-add-page__avatar-upload">
            <Text className="pet-add-page__camera-icon">📷</Text>
          </View>
          <Text className="pet-add-page__avatar-hint">上传宠物头像</Text>
        </View>

        {/* Form */}
        <View className="pet-add-page__form">
          <View className="pet-add-page__form-item">
            <Text className="pet-add-page__label">宠物昵称</Text>
            <Input 
              className="pet-add-page__input" 
              placeholder="请输入主子的大名" 
              placeholderClass="pet-add-page__placeholder"
              value={petName}
              onInput={(e) => setPetName(e.detail.value)}
            />
          </View>

          <View className="pet-add-page__form-item">
            <Text className="pet-add-page__label">种类</Text>
            <View className="pet-add-page__type-selector">
              <View 
                className={`pet-add-page__type-btn ${petType === 'dog' ? 'pet-add-page__type-btn--active' : ''}`}
                onClick={() => setPetType('dog')}
              >
                <Text>🐶 狗狗</Text>
              </View>
              <View 
                className={`pet-add-page__type-btn ${petType === 'cat' ? 'pet-add-page__type-btn--active' : ''}`}
                onClick={() => setPetType('cat')}
              >
                <Text>🐱 猫咪</Text>
              </View>
            </View>
          </View>

          <View className="pet-add-page__form-item">
            <Text className="pet-add-page__label">品种</Text>
            <Input 
              className="pet-add-page__input" 
              placeholder="例如：金毛、橘猫" 
              placeholderClass="pet-add-page__placeholder"
              value={petBreed}
              onInput={(e) => setPetBreed(e.detail.value)}
            />
          </View>

          <View className="pet-add-page__form-item">
            <Text className="pet-add-page__label">当前体重 (kg)</Text>
            <Input 
              className="pet-add-page__input" 
              type="digit"
              placeholder="例如：5.2" 
              placeholderClass="pet-add-page__placeholder"
              value={petWeight}
              onInput={(e) => setPetWeight(e.detail.value)}
            />
          </View>
        </View>

        {/* Big Submit Button */}
        <Button className="pet-add-page__submit" onClick={handleSave}>
          完成添加
        </Button>
      </View>
    </View>
  )
}