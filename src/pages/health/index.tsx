import { View, Text, Image, Input, Button, Form } from '@tarojs/components'
import { useState } from 'react'
import Taro from '@tarojs/taro'
import { useStore } from '../../store'
import './index.scss'

export default function HealthTracking() {
  const { pets, activePetId, addWeightRecord } = useStore()
  const activePet = pets.find(p => p.id === activePetId)
  const [showForm, setShowForm] = useState(false)
  const [weight, setWeight] = useState('')

  if (!activePet) return null

  const handleAdd = (e: any) => {
    e.preventDefault()
    if (!weight) return
    
    const today = new Date()
    const dateStr = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    
    addWeightRecord(activePet.id, {
      date: dateStr,
      weight: parseFloat(weight)
    })
    
    setWeight('')
    setShowForm(false)
  }

  const handleBack = () => {
    Taro.navigateBack()
  }

  return (
    <View className="health-page">
      {/* Header */}
      <View className="health-page__header">
        <View onClick={handleBack} className="health-page__back-btn">
          <Text>⬅️</Text>
        </View>
        <View className="health-page__title">
          <Text>体重追踪</Text>
        </View>
      </View>

      <View className="health-page__content">
        <View className="health-page__card">
          <View className="health-page__pet-info">
            <View className="health-page__pet-profile">
              <Image src={activePet.avatar} className="health-page__pet-avatar" mode="aspectFill" />
              <View className="health-page__pet-details">
                <View className="health-page__pet-name"><Text>{activePet.name} 的体重曲线</Text></View>
                <View className="health-page__pet-unit"><Text>单位：kg</Text></View>
              </View>
            </View>
            <View className="health-page__current-weight">
              <Text>{(activePet.weightRecords.length > 0 && activePet.weightRecords[activePet.weightRecords.length - 1].weight) ? activePet.weightRecords[activePet.weightRecords.length - 1].weight : '--'}</Text>
            </View>
          </View>
          
          <View className="health-page__records-board">
            <View className="health-page__records-list">
              {activePet.weightRecords.length > 0 ? (
                activePet.weightRecords.slice(-6).map((record: any, index: number) => {
                  return (
                    <View 
                      key={index} 
                      className={`health-page__record-item health-page__record-item--color-${index % 6} health-page__record-item--rotate-${index % 6}`}
                    >
                      <View className="health-page__record-tape"></View>
                      <Text className="health-page__record-date">{record.date}</Text>
                      <Text className="health-page__record-weight">{record.weight} <Text className="health-page__record-weight-unit">kg</Text></Text>
                    </View>
                  )
                })
              ) : (
                <View className="health-page__record-item--empty">
                  <Text>暂无体重记录，快来添加吧~</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {!showForm ? (
          <View 
            onClick={() => setShowForm(true)}
            className="health-page__add-btn"
          >
            <Text>+ 记录今日体重</Text>
          </View>
        ) : (
          <Form onSubmit={handleAdd} className="health-page__form">
            <View className="health-page__form-title"><Text>记录体重 (kg)</Text></View>
            <Input 
              type="digit" 
              value={weight}
              onInput={(e) => setWeight(e.detail.value)}
              placeholder="请输入体重，如：4.5"
              className="health-page__form-input"
              autoFocus
            />
            <View className="health-page__form-actions">
              <Button 
                onClick={() => setShowForm(false)}
                className="health-page__btn health-page__btn--cancel"
              >
                <Text>取消</Text>
              </Button>
              <Button 
                formType="submit"
                className="health-page__btn health-page__btn--submit"
              >
                <Text>保存</Text>
              </Button>
            </View>
          </Form>
        )}
      </View>
    </View>
  )
}
