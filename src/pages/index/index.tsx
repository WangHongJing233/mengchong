import { View, Text, Image } from '@tarojs/components'
import { useState } from 'react'
import { useStore } from '../../store'
import './index.scss'

export default function Index() {
  const { pets, activePetId, checkIn, playWithPet } = useStore()
  const activePet = pets.find(p => p.id === activePetId)
  const [showPK, setShowPK] = useState(false)
  const [pkResult, setPkResult] = useState<any>(null)
  const [showReward, setShowReward] = useState(false)

  if (!activePet) return <View className="home__empty-state">请先添加宠物</View>

  const handlePK = () => {
    setShowPK(true)
    setTimeout(() => {
      const isWin = Math.random() > 0.5
      setPkResult({ isWin, reward: isWin ? 50 : 10 })
    }, 2000)
  }

  const closePK = () => {
    setShowPK(false)
    setPkResult(null)
  }

  const handleInteraction = (action: 'checkIn' | 'play') => {
    if (action === 'checkIn') checkIn()
    else playWithPet()
    
    setShowReward(true)
    setTimeout(() => setShowReward(false), 1500)
  }

  return (
    <View className="home">
      {/* Global Glowing Background Elements */}
      <View className="home__bg-glow home__bg-glow--primary"></View>
      <View className="home__bg-glow home__bg-glow--secondary"></View>
      <View className="home__bg-glow home__bg-glow--tertiary"></View>

      {/* Header Stats */}
      <View className="home__header">
        <View className="home__header-info">
          <View className="home__header-title">
            <Text>{activePet.name}</Text>
            <View className="home__header-level">
              <Text>Lv. 5</Text>
            </View>
          </View>
          <View className="home__header-subtitle"><Text>今天也要开心哦喵~</Text></View>
        </View>
        <View className="home__header-stats">
          <View className="home__stat-item home__stat-item--orange">
            <Text className="home__stat-value">萌力 {activePet.cuteness}</Text>
          </View>
          <View className="home__stat-item home__stat-item--blue">
            <Text className="home__stat-value">颜值 {activePet.appearanceScore}</Text>
          </View>
        </View>
      </View>

      {/* Pet Display Area */}
      <View className="home__pet-display">
        {/* Background glow behind pet */}
        <View className="home__pet-glow home__pet-glow--inner"></View>
        <View className="home__pet-glow home__pet-glow--outer"></View>
        
        {/* Glowing Base Stage */}
        <View className="home__pet-stage home__pet-stage--bottom"></View>
        <View className="home__pet-stage home__pet-stage--middle"></View>
        <View className="home__pet-stage home__pet-stage--top"></View>

        <View className="home__pet-avatar-container">
          <View className="home__pet-avatar-wrapper">
            <View className="home__pet-avatar-inner">
              <Image 
                src={activePet.avatar} 
                className="home__pet-avatar-img"
                mode="aspectFill"
              />
            </View>
            
            {showReward && (
              <View className="home__pet-reward">
                <Text>+10 萌力</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="home__actions">
        <View className="home__actions-container">
          <View 
            onClick={() => handleInteraction('checkIn')}
            className="home__action-item"
          >
            <View className="home__action-icon home__action-icon--blue">
              <Text>🐾</Text>
            </View>
            <Text className="home__action-text">日常打卡</Text>
          </View>
          <View 
            onClick={() => handleInteraction('play')}
            className="home__action-item"
          >
            <View className="home__action-icon home__action-icon--emerald">
              <Text>🎾</Text>
            </View>
            <Text className="home__action-text">互动玩耍</Text>
          </View>
          <View 
            onClick={handlePK}
            className="home__action-item"
          >
            <View className="home__action-icon home__action-icon--rose">
              <Text>⚔️</Text>
            </View>
            <Text className="home__action-text">匹配PK</Text>
          </View>
        </View>
      </View>

      {/* Big PK Button */}
      <View className="home__pk-action">
        <View 
          onClick={handlePK}
          className="home__pk-btn"
        >
          <Text>✨ 开启萌宠对决 ✨</Text>
        </View>
      </View>

      {/* PK Modal */}
      {showPK && (
        <View className="home__modal">
          <View className="home__modal-content">
            {!pkResult ? (
              <View className="home__modal-loading">
                <View className="home__modal-spinner"></View>
                <View className="home__modal-title"><Text>正在匹配对手...</Text></View>
                <View className="home__modal-desc"><Text>综合颜值、萌力值与活跃度评估中</Text></View>
              </View>
            ) : (
              <View className="home__modal-result">
                <View className="home__modal-icon"><Text>{pkResult.isWin ? '🏆' : '🫂'}</Text></View>
                <View className={`home__modal-result-title ${pkResult.isWin ? 'home__modal-result-title--win' : 'home__modal-result-title--lose'}`}>
                  <Text>{pkResult.isWin ? 'PK 胜利！' : '再接再厉！'}</Text>
                </View>
                <View className="home__modal-result-desc">
                  <Text>{pkResult.isWin ? '你的宝贝太迷人了，对手甘拜下风' : '对方也是个小可爱呢，差一点点就赢了'}</Text>
                </View>
                
                <View className="home__modal-reward">
                  <View className="home__modal-reward-label"><Text>获得萌力值奖励</Text></View>
                  <View className="home__modal-reward-value">
                    <Text>+{pkResult.reward}</Text>
                  </View>
                </View>

                <View 
                  onClick={closePK}
                  className="home__modal-btn"
                >
                  <Text>开心收下</Text>
                </View>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  )
}
